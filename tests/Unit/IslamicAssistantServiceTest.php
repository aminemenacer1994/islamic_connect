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
        Config::set('services.ai_rag.smart_evidence_mode', true);
        Config::set('services.ai_rag.debug_mode', false);
    }

    public function test_answer_returns_islamhouse_backed_response_with_references(): void
    {
        $requests = [];

        Http::fake(function ($request) use (&$requests) {
            $requests[] = $request->url();

            if (str_contains($request->url(), 'api3.islamhouse.com/v3/items')) {
                return Http::response([
                    'data' => [
                        'items' => [
                            [
                                'title' => 'Music and scholarly difference',
                                'description' => 'Scholars differ on this issue and discuss the evidences with nuance.',
                                'type' => 'article',
                                'url' => 'https://islamhouse.com/en/articles/123',
                            ],
                        ],
                    ],
                ], 200);
            }

            return Http::response([], 404);
        });

        /** @var IslamicAssistantService $service */
        $service = app(IslamicAssistantService::class);
        $result = $service->answer('What is the Islamic ruling on music?', 'en');

        $this->assertTrue($result['sourced']);
        $this->assertSame('Verified Source', $result['evidence_level']);
        $this->assertSame(75, $result['confidence_score']);
        $this->assertSame('Verified', $result['confidence_badge']);
        $this->assertSame('IslamHouse Source', $result['ui_badge']);
        $this->assertStringNotContainsString('[Confidence Badge:', $result['message']);
        $this->assertStringNotContainsString('Sources', $result['message']);
        $this->assertTrue(collect($result['references'])->contains(
            fn ($reference) => str_contains($reference['label'], 'IslamHouse:')
        ));
        $this->assertFalse(collect($requests)->contains(fn ($url) => str_contains($url, 'quranenc')));
        $this->assertFalse(collect($requests)->contains(fn ($url) => str_contains($url, 'hadeethenc')));
        $this->assertFalse(collect($requests)->contains(fn ($url) => str_contains($url, 'hadithapi')));
    }

    public function test_answer_falls_back_cleanly_when_no_islamhouse_source_is_found(): void
    {
        Http::fake([
            'https://api3.islamhouse.com/*' => Http::response(['data' => []], 200),
            '*' => Http::response([], 404),
        ]);

        /** @var IslamicAssistantService $service */
        $service = app(IslamicAssistantService::class);
        $result = $service->answer('Tell me something very obscure with no direct match', 'en');

        $this->assertFalse($result['sourced']);
        $this->assertSame('No Verified Source', $result['evidence_level']);
        $this->assertSame(0, $result['confidence_score']);
        $this->assertSame('Unavailable', $result['confidence_badge']);
        $this->assertSame('No Verified Source', $result['ui_badge']);
        $this->assertSame([], $result['references']);
        $this->assertSame(
            'I could not find a verified IslamHouse source for this question. Please try a narrower topic or different wording. Allah knows best.',
            $result['message']
        );
    }

    public function test_answer_does_not_crash_when_islamhouse_returns_non_json_body(): void
    {
        Http::fake([
            'https://api3.islamhouse.com/*' => Http::response('upstream temporarily unavailable', 502, [
                'Content-Type' => 'text/plain',
            ]),
            '*' => Http::response([], 404),
        ]);

        /** @var IslamicAssistantService $service */
        $service = app(IslamicAssistantService::class);
        $result = $service->answer('What do scholars say about music?', 'en');

        $this->assertFalse($result['sourced']);
        $this->assertSame(
            'I could not find a verified IslamHouse source for this question. Please try a narrower topic or different wording. Allah knows best.',
            $result['message']
        );
    }

    public function test_answer_falls_back_to_islamhouse_website_search_when_api_returns_404(): void
    {
        Http::fake(function ($request) {
            if (str_contains($request->url(), 'api3.islamhouse.com/v3/items')) {
                return Http::response([], 404);
            }

            if ($request->url() === 'https://islamhouse.com/search/search.php') {
                return Http::response([
                    'items' => [
                        [
                            'id' => '430103',
                            'lang' => 'en',
                            'type' => 'articles',
                            'title' => '<a href="https://islamhouse.com/430103" target="_blank">Anger management in Islam</a>',
                            'nabza' => 'Anger must be managed in an acceptable way, with examples from the Quran and the traditions of Prophet Muhammad.',
                        ],
                    ],
                ], 200);
            }

            return Http::response([], 404);
        });

        /** @var IslamicAssistantService $service */
        $service = app(IslamicAssistantService::class);
        $result = $service->answer('What is the Islamic guidance on controlling anger?', 'en');

        $this->assertTrue($result['sourced']);
        $this->assertSame('Verified Source', $result['evidence_level']);
        $this->assertNotEmpty($result['references']);
        $this->assertStringContainsString('Anger management in Islam', $result['references'][0]['label']);
    }

    public function test_retrieval_requests_are_cached_for_repeat_queries(): void
    {
        $requestCount = 0;

        Http::fake(function ($request) use (&$requestCount) {
            $requestCount++;

            if (str_contains($request->url(), 'api3.islamhouse.com/v3/items')) {
                return Http::response([
                    'data' => [
                        'items' => [
                            [
                                'title' => 'Trust in Allah',
                                'description' => 'A concise IslamHouse reminder about reliance upon Allah.',
                                'type' => 'article',
                            ],
                        ],
                    ],
                ], 200);
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

    public function test_retrieval_uses_normalized_islamhouse_search_variants(): void
    {
        $searches = [];

        Http::fake(function ($request) use (&$searches) {
            $url = $request->url();

            if (str_contains($url, 'api3.islamhouse.com/v3/items')) {
                parse_str((string) parse_url($url, PHP_URL_QUERY), $query);
                $searches[] = $query['search'] ?? null;

                if (($query['search'] ?? null) === 'music') {
                    return Http::response([
                        'data' => [
                            'items' => [
                                [
                                    'title' => 'Music and scholarly difference',
                                    'description' => 'Scholars differ on this issue and discuss the evidences with nuance.',
                                    'type' => 'article',
                                ],
                            ],
                        ],
                    ], 200);
                }

                return Http::response(['data' => []], 200);
            }

            return Http::response([], 404);
        });

        /** @var IslamicAssistantService $service */
        $service = app(IslamicAssistantService::class);
        $result = $service->answer('What do scholars say about music?', 'en');

        $this->assertTrue($result['sourced']);
        $this->assertSame('Verified Source', $result['evidence_level']);
        $this->assertContains('what do scholars say about music', $searches);
        $this->assertContains('music', $searches);
        $this->assertContains('music ruling', $searches);
        $this->assertTrue(collect($result['references'])->contains(
            fn ($reference) => str_contains($reference['label'], 'IslamHouse:')
        ));
    }

    public function test_retrieval_parses_data_list_payload_and_ranks_more_relevant_items_first(): void
    {
        Http::fake(function ($request) {
            if (str_contains($request->url(), 'api3.islamhouse.com/v3/items')) {
                return Http::response([
                    'data' => [
                        [
                            'title' => 'General etiquette',
                            'description' => 'A broad reminder with no direct relation to music.',
                            'type' => 'article',
                        ],
                        [
                            'title' => 'Music ruling in Islam',
                            'description' => 'A focused fatwa discussing music and the scholarly ruling.',
                            'type' => 'fatwa',
                        ],
                    ],
                ], 200);
            }

            return Http::response([], 404);
        });

        /** @var IslamicAssistantService $service */
        $service = app(IslamicAssistantService::class);
        $result = $service->answer('What do scholars say about music?', 'en');

        $this->assertTrue($result['sourced']);
        $this->assertNotEmpty($result['references']);
        $this->assertStringContainsString('Music ruling in Islam', $result['references'][0]['label']);
    }

    public function test_debug_mode_returns_only_islamhouse_raw_responses(): void
    {
        Http::fake(function ($request) {
            if (str_contains($request->url(), 'api3.islamhouse.com/v3/items')) {
                return Http::response([
                    'data' => [
                        'items' => [
                            [
                                'title' => 'Prayer in Islam',
                                'description' => 'A short IslamHouse explanation about prayer.',
                                'type' => 'article',
                            ],
                        ],
                    ],
                ], 200);
            }

            return Http::response([], 404);
        });

        /** @var IslamicAssistantService $service */
        $service = app(IslamicAssistantService::class);
        $result = $service->answer('Explain prayer in Islam', 'en', [
            'debug_mode' => true,
        ]);

        $this->assertTrue($result['debug_mode']);
        $this->assertSame('Debug mode enabled. Raw API responses returned before AI processing.', $result['message']);
        $this->assertTrue(collect($result['debug']['hard_tests'])->has('islamhouse'));
        $this->assertFalse(collect($result['debug']['hard_tests'])->has('quranenc'));
        $this->assertFalse(collect($result['debug']['hard_tests'])->has('hadithenc'));
        $this->assertNotEmpty($result['debug']['raw_responses']);
        $this->assertTrue(collect($result['debug']['raw_responses'])->every(
            fn ($entry) => ($entry['label'] ?? null) === 'ISLAMHOUSE_RAW_RESPONSE'
        ));
    }
}
