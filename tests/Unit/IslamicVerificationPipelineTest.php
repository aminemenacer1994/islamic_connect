<?php

namespace Tests\Unit;

use App\Services\IslamicVerificationPipeline;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class IslamicVerificationPipelineTest extends TestCase
{
    public function test_verify_response_returns_high_confidence_when_quran_match_exists(): void
    {
        Cache::flush();

        Http::fake([
            'https://api.quran.com/*' => Http::response([
                'search' => [
                    'total_results' => 1,
                    'results' => [
                        [
                            'verse_key' => '2:255',
                            'text' => 'Allah, there is no deity except Him, the Ever-Living.',
                        ],
                    ],
                ],
            ], 200),
            '*' => Http::response([], 404),
        ]);

        /** @var IslamicVerificationPipeline $pipeline */
        $pipeline = app(IslamicVerificationPipeline::class);
        $result = $pipeline->verifyResponse('What does the Quran say about Allah?');

        $this->assertTrue($result['verified']);
        $this->assertSame('high', $result['confidence']);
        $this->assertGreaterThan(0, $result['totalSources']);
        $this->assertNotEmpty($result['references']);
    }

    public function test_verify_response_returns_low_when_no_source_is_reachable(): void
    {
        Cache::flush();

        Http::fake([
            '*' => Http::response([], 500),
        ]);

        /** @var IslamicVerificationPipeline $pipeline */
        $pipeline = app(IslamicVerificationPipeline::class);
        $result = $pipeline->verifyResponse('zzzz unmatched query zzzz');

        $this->assertFalse($result['verified']);
        $this->assertSame('low', $result['confidence']);
    }

    public function test_existing_references_can_promote_verification_status(): void
    {
        Cache::flush();

        Http::fake([
            '*' => Http::response([], 500),
        ]);

        /** @var IslamicVerificationPipeline $pipeline */
        $pipeline = app(IslamicVerificationPipeline::class);
        $result = $pipeline->verifyResponse(
            'Question with internal reference only',
            null,
            [
                [
                    'label' => 'Surah Al-Baqarah 2:255',
                    'url' => 'https://quran.com/2:255',
                ],
            ],
        );

        $this->assertTrue($result['verified']);
        $this->assertSame('medium', $result['confidence']);
        $this->assertNotEmpty($result['references']);
    }

    public function test_quran_gading_backup_is_used_when_primary_quran_apis_fail(): void
    {
        Cache::flush();

        Http::fake([
            'https://api.quran.com/*' => Http::response([], 500),
            'https://api.alquran.cloud/*' => Http::response([], 500),
            'https://api.quran.gading.dev/*' => Http::response([
                'data' => [
                    [
                        'surah' => [
                            'number' => 2,
                            'name' => [
                                'transliteration' => ['en' => 'Al-Baqarah'],
                            ],
                        ],
                        'number' => ['inSurah' => 255],
                        'translation' => ['en' => 'Allah - there is no deity except Him, the Ever-Living.'],
                    ],
                ],
            ], 200),
            '*' => Http::response([], 404),
        ]);

        /** @var IslamicVerificationPipeline $pipeline */
        $pipeline = app(IslamicVerificationPipeline::class);
        $result = $pipeline->verifyResponse('What does the Quran say about Allah?');

        $this->assertTrue($result['verified']);
        $this->assertNotEmpty($result['references']);
    }

    public function test_hadith_json_fallback_is_used_when_local_and_sunnah_sources_miss(): void
    {
        Cache::flush();
        Config::set('services.sunnah.key', '');

        Http::fake([
            'https://raw.githubusercontent.com/AhmedBaset/hadith-json/*' => Http::response([
                'hadiths' => [
                    [
                        'hadith_number' => '1',
                        'english' => 'Actions are judged by intentions.',
                    ],
                ],
            ], 200),
            'https://raw.githubusercontent.com/islamic-network/hadith-json/*' => Http::response([], 404),
            '*' => Http::response([], 500),
        ]);

        /** @var IslamicVerificationPipeline $pipeline */
        $pipeline = app(IslamicVerificationPipeline::class);
        $result = $pipeline->verifyResponse('Hadith about intentions');

        $this->assertTrue($result['verified']);
        $this->assertGreaterThan(0, $result['totalSources']);
        $this->assertNotEmpty($result['references']);
    }
}
