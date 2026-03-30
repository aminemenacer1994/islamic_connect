<?php

namespace Tests\Unit;

use App\Services\IslamicAssistantService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class IslamicAssistantServiceTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Cache::flush();
        Config::set('services.huggingface.token', '');
        Config::set('services.huggingface.model', '');
        Config::set('services.islamhouse.key', 'test-key');
        Config::set('services.islamhouse.base', 'https://api3.islamhouse.com/v3');
        Config::set('services.quranenc.base', 'https://quranenc.com/api/v1');
        Config::set('services.quranenc.fallback_translation_key', 'english_saheeh');
        Config::set('services.quranenc.tafsir_key', 'english_mokhtasar');
        Config::set('services.hadeethenc.base', 'https://hadeethenc.com/api/v1');
    }

    public function test_answer_returns_source_backed_response_with_grouped_references(): void
    {
        Http::fake(function ($request) {
            $url = $request->url();

            if (str_contains($url, 'quranenc.com/api/v1/search/english_saheeh')) {
                return Http::response([
                    'result' => [
                        ['sura' => 2, 'aya' => 153, 'translation' => 'Seek help through patience and prayer.'],
                    ],
                ], 200);
            }

            if (str_contains($url, 'quranenc.com/api/v1/translation/aya/english_saheeh/2/153')) {
                return Http::response([
                    'result' => [
                        'sura' => 2,
                        'aya' => 153,
                        'translation' => 'O believers, seek help through patience and prayer. Allah is with the patient.',
                    ],
                ], 200);
            }

            if (str_contains($url, 'quranenc.com/api/v1/translation/aya/english_mokhtasar/2/153')) {
                return Http::response([
                    'result' => [
                        'sura' => 2,
                        'aya' => 153,
                        'translation' => 'This verse commands the believers to seek strength through patient obedience and prayer.',
                    ],
                ], 200);
            }

            if (str_contains($url, 'hadeethenc.com/api/v1/categories/root')) {
                return Http::response([
                    'data' => [
                        ['id' => 5, 'title' => 'Patience'],
                    ],
                ], 200);
            }

            if (str_contains($url, 'hadeethenc.com/api/v1/categories/list')) {
                return Http::response(['data' => []], 200);
            }

            if (str_contains($url, 'hadeethenc.com/api/v1/hadeeths/list')) {
                return Http::response([
                    'data' => [
                        ['id' => 77, 'title' => 'Patience at the first strike'],
                    ],
                ], 200);
            }

            if (str_contains($url, 'hadeethenc.com/api/v1/hadeeths/one')) {
                return Http::response([
                    'data' => [
                        'id' => 77,
                        'title' => 'Patience at the first strike',
                        'hadeeth' => 'Patience is at the first strike of calamity.',
                        'explanation' => 'The believer is praised for showing patience as soon as hardship arrives.',
                        'attribution' => 'Sahih al-Bukhari',
                        'grade' => 'Sahih',
                    ],
                ], 200);
            }

            if (str_contains($url, 'api3.islamhouse.com/v3/items')) {
                return Http::response([
                    'data' => [
                        ['title' => 'Patience in Times of Trial', 'description' => 'A concise reminder on sabr during hardship.', 'url' => 'https://islamhouse.com/en/articles/1'],
                    ],
                ], 200);
            }

            return Http::response([], 404);
        });

        /** @var IslamicAssistantService $service */
        $service = app(IslamicAssistantService::class);
        $result = $service->answer('What does Islam teach about patience in hardship?', 'en');

        $this->assertTrue($result['sourced']);
        $this->assertStringContainsString('Allah knows best', $result['message']);
        $this->assertStringContainsString('Answer', $result['message']);
        $this->assertStringContainsString('Evidence Structure', $result['message']);
        $this->assertNotEmpty($result['references']);
        $this->assertSame('Quran (verses + translations + references)', $result['context_sections'][0]['title']);
        $this->assertTrue(collect($result['references'])->contains(fn ($reference) => str_contains($reference['label'], 'Quran:')));
        $this->assertTrue(collect($result['references'])->contains(fn ($reference) => str_contains($reference['label'], 'Hadith:')));
        $this->assertTrue(collect($result['references'])->contains(fn ($reference) => str_contains($reference['label'], 'IslamHouse:')));
    }

    public function test_answer_falls_back_when_no_strong_sources_are_found(): void
    {
        Http::fake([
            'https://quranenc.com/*' => Http::response(['result' => []], 200),
            'https://hadeethenc.com/*' => Http::response(['data' => []], 200),
            'https://api3.islamhouse.com/*' => Http::response(['data' => []], 200),
            '*' => Http::response([], 404),
        ]);

        /** @var IslamicAssistantService $service */
        $service = app(IslamicAssistantService::class);
        $result = $service->answer('Tell me something very obscure with no direct match', 'en');

        $this->assertFalse($result['sourced']);
        $this->assertSame([], $result['references']);
        $this->assertStringContainsString('Answer', $result['message']);
        $this->assertStringContainsString('General guidance (not directly sourced from Quran, Hadith, or IslamHouse):', $result['message']);
    }

    public function test_retrieval_requests_are_cached_for_repeat_queries(): void
    {
        $requestCount = 0;

        Http::fake(function ($request) use (&$requestCount) {
            $requestCount++;
            $url = $request->url();

            if (str_contains($url, 'quranenc.com/api/v1/search/english_saheeh')) {
                return Http::response([
                    'result' => [
                        ['sura' => 3, 'aya' => 159, 'translation' => 'Then rely upon Allah.'],
                    ],
                ], 200);
            }

            if (str_contains($url, 'quranenc.com/api/v1/translation/aya/english_saheeh/3/159')) {
                return Http::response([
                    'result' => ['sura' => 3, 'aya' => 159, 'translation' => 'And when you decide, put your trust in Allah.'],
                ], 200);
            }

            if (str_contains($url, 'quranenc.com/api/v1/translation/aya/english_mokhtasar/3/159')) {
                return Http::response([
                    'result' => ['sura' => 3, 'aya' => 159, 'translation' => 'This verse teaches reliance upon Allah after taking proper means.'],
                ], 200);
            }

            if (str_contains($url, 'hadeethenc.com/api/v1/categories/root')) {
                return Http::response(['data' => []], 200);
            }

            if (str_contains($url, 'api3.islamhouse.com/v3/items')) {
                return Http::response(['data' => []], 200);
            }

            return Http::response([], 404);
        });

        /** @var IslamicAssistantService $service */
        $service = app(IslamicAssistantService::class);

        $service->answer('How do I build tawakkul?', 'en');
        $afterFirstCall = $requestCount;

        $service->answer('How do I build tawakkul?', 'en');

        $this->assertGreaterThan(0, $afterFirstCall);
        $this->assertSame($afterFirstCall, $requestCount);
    }

    public function test_weak_hadith_is_excluded_by_default(): void
    {
        Http::fake(function ($request) {
            $url = $request->url();

            if (str_contains($url, 'quranenc.com/api/v1/search/english_saheeh')) {
                return Http::response(['result' => []], 200);
            }

            if (str_contains($url, 'hadeethenc.com/api/v1/search')) {
                return Http::response([
                    'data' => [
                        [
                            'id' => 90,
                            'title' => 'Weak narration',
                            'hadeeth' => 'A weak narration about patience.',
                            'grade' => 'Daif',
                            'attribution' => 'Some collection',
                        ],
                    ],
                ], 200);
            }

            if (str_contains($url, 'hadeethenc.com/api/v1/categories/root')) {
                return Http::response(['data' => []], 200);
            }

            if (str_contains($url, 'api3.islamhouse.com/v3/items')) {
                return Http::response(['data' => []], 200);
            }

            return Http::response([], 404);
        });

        /** @var IslamicAssistantService $service */
        $service = app(IslamicAssistantService::class);
        $result = $service->answer('Share a hadith about patience', 'en');

        $this->assertFalse(collect($result['references'])->contains(
            fn ($reference) => str_contains($reference['label'], 'Weak')
        ));
    }
}
