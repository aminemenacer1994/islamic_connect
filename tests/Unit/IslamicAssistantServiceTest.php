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
        Config::set('services.quranenc.key', null);
        Config::set('services.hadithenc.key', null);
        Config::set('services.islamhouse.key', 'test-key');
        Config::set('services.islamhouse.base', 'https://api3.islamhouse.com/v3');
        Config::set('services.ai_rag.vector_store_enabled', false);
        Config::set('services.ai_rag.smart_evidence_mode', true);
        Config::set('services.ai_rag.debug_mode', false);
    }

    public function test_answer_returns_islamhouse_backed_response_with_references(): void
    {
        Http::fake(function ($request) {
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
        $this->assertSame('Scholarly Opinion', $result['evidence_level']);
        $this->assertSame(75, $result['confidence_score']);
        $this->assertSame('Supported by Islamic Sources', $result['confidence_badge']);
        $this->assertSame('Supported by Islamic Sources', $result['ui_badge']);
        $this->assertStringNotContainsString('[Confidence Badge:', $result['message']);
        $this->assertStringNotContainsString('Sources', $result['message']);
        $this->assertTrue(collect($result['references'])->contains(
            fn ($reference) => str_contains($reference['label'], 'IslamHouse:')
        ));
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
        $this->assertSame('Weak', $result['evidence_level']);
        $this->assertSame(0, $result['confidence_score']);
        $this->assertSame('Low', $result['confidence_badge']);
        $this->assertSame('No Verified Source', $result['ui_badge']);
        $this->assertSame([], $result['references']);
        $this->assertSame(
            'I could not find verified Quran, Hadith, or IslamHouse sources for this question. Please try a narrower topic or different wording. Allah knows best.',
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
            'I could not find verified Quran, Hadith, or IslamHouse sources for this question. Please try a narrower topic or different wording. Allah knows best.',
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
        $this->assertSame('Scholarly Opinion', $result['evidence_level']);
        $this->assertNotEmpty($result['references']);
        $this->assertStringContainsString('Anger management in Islam', $result['references'][0]['label']);
    }

    public function test_scholarly_only_answers_do_not_use_model_generated_religious_claims(): void
    {
        $modelRequests = 0;

        Config::set('services.huggingface.token', 'test-token');
        Config::set('services.huggingface.model', 'test-model');

        Http::fake(function ($request) use (&$modelRequests) {
            $url = $request->url();

            if (str_contains($url, 'api3.islamhouse.com/v3/items')) {
                return Http::response([
                    'data' => [
                        'items' => [
                            [
                                'title' => 'The Spirit of Worship in Islam',
                                'description' => 'A scholarly explanation of sincerity in worship and pure intention for Allah alone.',
                                'type' => 'article',
                                'url' => 'https://islamhouse.com/en/articles/456',
                            ],
                        ],
                    ],
                ], 200);
            }

            if (str_contains($url, 'router.huggingface.co/v1/chat/completions')) {
                $modelRequests++;

                return Http::response([
                    'choices' => [
                        [
                            'message' => [
                                'content' => 'Invented answer with Quran 98:5 and an unsourced hadith.',
                            ],
                        ],
                    ],
                ], 200);
            }

            return Http::response([], 404);
        });

        /** @var IslamicAssistantService $service */
        $service = app(IslamicAssistantService::class);
        $result = $service->answer('Explain sincerity in worship.', 'en');

        $this->assertTrue($result['sourced']);
        $this->assertSame('Scholarly Opinion', $result['evidence_level']);
        $this->assertSame(0, $modelRequests);
        $this->assertStringContainsString('The Spirit of Worship in Islam', $result['message']);
        $this->assertStringContainsString('Allah knows best.', $result['message']);
        $this->assertStringNotContainsString('Quran 98:5', $result['message']);
        $this->assertStringNotContainsString('unsourced hadith', $result['message']);
    }

    public function test_answer_combines_quran_hadith_and_islamhouse_sources(): void
    {
        Http::fake(function ($request) {
            $url = $request->url();

            if (str_contains($url, 'quranenc.com/api/v1/search/english_saheeh')) {
                return Http::response([
                    [
                        'sura' => 3,
                        'aya' => 134,
                    ],
                ], 200);
            }

            if (str_contains($url, 'quranenc.com/api/v1/translation/aya/english_saheeh/3/134')) {
                return Http::response([
                    'result' => [
                        'translation' => 'Those who restrain anger and pardon the people.',
                    ],
                ], 200);
            }

            if (str_contains($url, 'quranenc.com/api/v1/translation/aya/english_mokhtasar/3/134')) {
                return Http::response([
                    'result' => [
                        'translation' => 'They control themselves when angry and forgive others.',
                    ],
                ], 200);
            }

            if (
                str_contains($url, 'hadeethenc.com/api/v1/search/')
                || str_contains($url, 'hadeethenc.com/api/v1/search?')
                || str_contains($url, 'hadeethenc.com/api/v1/hadeeths/search/')
            ) {
                return Http::response([
                    'data' => [
                        [
                            'id' => '611',
                            'title' => 'Sahih al-Bukhari',
                            'hadeeth' => 'Do not become angry.',
                            'grade' => 'Sahih',
                            'attribution' => 'Sahih al-Bukhari',
                        ],
                    ],
                ], 200);
            }

            if (str_contains($url, 'hadeethenc.com/api/v1/categories/root/')) {
                return Http::response(['data' => []], 200);
            }

            if (str_contains($url, 'api3.islamhouse.com/v3/items')) {
                return Http::response([
                    'data' => [
                        'items' => [
                            [
                                'title' => 'Anger management in Islam',
                                'description' => 'A concise scholarly explanation about controlling anger.',
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
        $result = $service->answer('What is the Islamic guidance on controlling anger?', 'en');

        $this->assertTrue($result['sourced']);
        $this->assertSame('Very Strong', $result['evidence_level']);
        $this->assertSame(100, $result['confidence_score']);
        $this->assertSame('100% Evidence-Based', $result['confidence_badge']);
        $this->assertTrue(collect($result['references'])->contains(
            fn ($reference) => str_starts_with($reference['label'], 'Quran:')
        ));
        $this->assertTrue(collect($result['references'])->contains(
            fn ($reference) => str_starts_with($reference['label'], 'Hadith:')
        ));
        $this->assertTrue(collect($result['references'])->contains(
            fn ($reference) => str_starts_with($reference['label'], 'IslamHouse:')
        ));
    }

    public function test_prayer_question_uses_quran_and_hadith_without_optional_api_keys(): void
    {
        Http::fake(function ($request) {
            $url = $request->url();

            if (str_contains($url, 'api.quranenc.com/api/v1/translation/translate')) {
                parse_str((string) parse_url($url, PHP_URL_QUERY), $query);

                if (($query['sura'] ?? null) == 2 && ($query['aya'] ?? null) == 45) {
                    return Http::response([
                        'result' => [
                            'translation' => 'And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive [to Allah].',
                        ],
                    ], 200);
                }

                if (($query['sura'] ?? null) == 29 && ($query['aya'] ?? null) == 45) {
                    return Http::response([
                        'result' => [
                            'translation' => 'Establish prayer. Indeed, prayer prohibits immorality and wrongdoing.',
                        ],
                    ], 200);
                }
            }

            if (str_contains($url, 'quranenc.com/api/v1/search/english_saheeh')) {
                return Http::response([], 404);
            }

            if (str_contains($url, 'quranenc.com/api/v1/translation/aya/english_saheeh/2/45')) {
                return Http::response([
                    'result' => [
                        'translation' => 'And seek help through patience and prayer.',
                    ],
                ], 200);
            }

            if (str_contains($url, 'quranenc.com/api/v1/translation/aya/english_mokhtasar/2/45')) {
                return Http::response([
                    'result' => [
                        'translation' => 'Seek aid through patience and prayer.',
                    ],
                ], 200);
            }

            if (str_contains($url, 'hadithapi.com/api/hadiths')) {
                parse_str((string) parse_url($url, PHP_URL_QUERY), $query);

                if (in_array(($query['query'] ?? ''), ['prayer', 'salah', 'salat', 'islam built on five'], true)) {
                    return Http::response([
                        'data' => [
                            [
                                'hadithNumber' => '16',
                                'heading' => 'Prayer is among the foundations of Islam',
                                'hadithEnglish' => 'Islam is built on five: testimony that there is no god but Allah and Muhammad is the Messenger of Allah, establishing prayer, giving zakah, pilgrimage, and fasting Ramadan.',
                                'status' => 'Sahih',
                                'book' => [
                                    'bookName' => 'Sahih Muslim',
                                ],
                            ],
                        ],
                    ], 200);
                }

                return Http::response(['data' => []], 200);
            }

            if (str_contains($url, 'api3.islamhouse.com/v3/items')) {
                return Http::response([
                    'data' => [
                        'items' => [
                            [
                                'title' => 'The Importance of Prayer',
                                'description' => 'Prayer is a unique training and developmental program for the Muslim.',
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
        $result = $service->answer('How important is prayer according to Quran and Hadith?', 'en');

        $this->assertTrue($result['sourced']);
        $this->assertSame('Very Strong', $result['evidence_level']);
        $this->assertSame('100% Evidence-Based', $result['ui_badge']);
        $this->assertStringContainsString('Surah Al-Baqarah, Ayah 45', $result['message']);
        $this->assertStringContainsString('Sahih Muslim 16', $result['message']);
        $this->assertTrue(collect($result['references'])->contains(
            fn ($reference) => str_starts_with($reference['label'], 'Quran:')
        ));
        $this->assertTrue(collect($result['references'])->contains(
            fn ($reference) => str_starts_with($reference['label'], 'Hadith:')
        ));
    }

    public function test_quran_only_answer_does_not_claim_hadith_and_drops_junk_islamhouse_items(): void
    {
        Http::fake(function ($request) {
            $url = $request->url();

            if (str_contains($url, 'api.quranenc.com/api/v1/translation/translate')) {
                parse_str((string) parse_url($url, PHP_URL_QUERY), $query);

                if (($query['sura'] ?? null) == 2 && ($query['aya'] ?? null) == 45) {
                    return Http::response([
                        'result' => [
                            'translation' => 'And seek help through patience and prayer; and indeed, it is difficult except for the humbly submissive [to Allah].',
                        ],
                    ], 200);
                }

                if (($query['sura'] ?? null) == 29 && ($query['aya'] ?? null) == 45) {
                    return Http::response([
                        'result' => [
                            'translation' => 'Establish prayer. Indeed, prayer prohibits immorality and wrongdoing.',
                        ],
                    ], 200);
                }
            }

            if (str_contains($url, 'quranenc.com/api/v1/search/english_saheeh')) {
                return Http::response([], 404);
            }

            if (str_contains($url, 'quranenc.com/api/v1/translation/aya/english_saheeh/2/45')) {
                return Http::response([
                    'result' => [
                        'translation' => 'And seek help through patience and prayer.',
                    ],
                ], 200);
            }

            if (str_contains($url, 'quranenc.com/api/v1/translation/aya/english_mokhtasar/2/45')) {
                return Http::response([
                    'result' => [
                        'translation' => 'Seek aid through patience and prayer.',
                    ],
                ], 200);
            }

            if (str_contains($url, 'hadithapi.com/api/hadiths')) {
                return Http::response(['data' => []], 200);
            }

            if (str_contains($url, 'hadeethenc.com/api/v1')) {
                return Http::response([], 404);
            }

            if (str_contains($url, 'api3.islamhouse.com/v3/items')) {
                return Http::response([
                    'data' => [
                        'items' => [
                            [
                                'title' => 'Islamhouse important links',
                                'description' => 'Islamhouse important links',
                                'type' => 'article',
                            ],
                            [
                                'title' => 'The Importance of Prayer',
                                'description' => 'Prayer in Islam: How and why Muslims pray.',
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
        $result = $service->answer('How important is prayer according to Quran and Hadith?', 'en');

        $this->assertTrue($result['sourced']);
        $this->assertSame('Strong (Quran-based)', $result['evidence_level']);
        $this->assertStringContainsString('Based on the retrieved Quran evidence', $result['message']);
        $this->assertStringNotContainsString('Quran and Hadith evidence', $result['message']);
        $this->assertStringNotContainsString('Islamhouse important links', $result['message']);
    }

    public function test_references_are_deduped_by_label(): void
    {
        Http::fake(function ($request) {
            if (str_contains($request->url(), 'api3.islamhouse.com/v3/items')) {
                return Http::response([
                    'data' => [
                        'items' => [
                            [
                                'title' => 'Prayer in Islam',
                                'description' => 'How and why Muslims pray.',
                                'type' => 'article',
                                'url' => 'https://islamhouse.com/en/articles/1',
                            ],
                            [
                                'title' => 'Prayer in Islam',
                                'description' => 'How and why Muslims pray.',
                                'type' => 'article',
                                'url' => 'https://islamhouse.com/en/articles/2',
                            ],
                        ],
                    ],
                ], 200);
            }

            return Http::response([], 404);
        });

        /** @var IslamicAssistantService $service */
        $service = app(IslamicAssistantService::class);
        $result = $service->answer('Explain prayer in Islam', 'en');

        $labels = array_map(fn ($reference) => $reference['label'], $result['references']);

        $this->assertCount(1, $labels);
        $this->assertSame('IslamHouse: Prayer in Islam (Article)', $labels[0]);
    }

    public function test_music_ruling_query_does_not_use_generic_halal_haram_quran_verses(): void
    {
        Http::fake(function ($request) {
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
        $result = $service->answer('is music halal or haram ?', 'en');

        $this->assertTrue($result['sourced']);
        $this->assertSame('Scholarly Opinion', $result['evidence_level']);
        $this->assertStringContainsString('verified IslamHouse scholarly sources', $result['message']);
        $this->assertStringNotContainsString('Surah Al-Baqarah, Ayah 168', $result['message']);
        $this->assertStringNotContainsString('Surah Al-Araf, Ayah 33', $result['message']);
        $this->assertFalse(collect($result['references'])->contains(
            fn ($reference) => str_starts_with($reference['label'], 'Quran:')
        ));
    }

    public function test_music_ruling_query_filters_irrelevant_islamhouse_matches(): void
    {
        Http::fake(function ($request) {
            if (str_contains($request->url(), 'api3.islamhouse.com/v3/items')) {
                return Http::response([
                    'data' => [
                        'items' => [
                            [
                                'title' => 'Funeral Provision - www.gph.gov.sa - The General Presidency of Haram Masjid and Nabawi Masjid Affairs Website',
                                'description' => 'Funeral Provision',
                                'type' => 'article',
                            ],
                            [
                                'title' => 'Ways of Gaining Provision from Allah',
                                'description' => 'How to increase your provision the halal way',
                                'type' => 'article',
                            ],
                            [
                                'title' => 'Music and scholarly difference',
                                'description' => 'Scholars differ on this issue and discuss the evidences with nuance.',
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
        $result = $service->answer('is music halal or haram ?', 'en');

        $this->assertTrue($result['sourced']);
        $this->assertSame('Scholarly Opinion', $result['evidence_level']);
        $this->assertStringContainsString('Music and scholarly difference', $result['message']);
        $this->assertStringNotContainsString('Funeral Provision', $result['message']);
        $this->assertStringNotContainsString('Ways of Gaining Provision from Allah', $result['message']);
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
        $this->assertSame('Scholarly Opinion', $result['evidence_level']);
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
        $this->assertTrue(collect($result['debug']['hard_tests'])->has('quran'));
        $this->assertTrue(collect($result['debug']['hard_tests'])->has('hadith'));
        $this->assertNotEmpty($result['debug']['raw_responses']);
        $this->assertTrue(collect($result['debug']['raw_responses'])->contains(
            fn ($entry) => ($entry['label'] ?? null) === 'ISLAMHOUSE_RAW_RESPONSE'
        ));
        $this->assertTrue(collect($result['debug']['raw_responses'])->contains(
            fn ($entry) => ($entry['label'] ?? null) === 'QURANENC_RAW_RESPONSE'
        ));
        $this->assertTrue(collect($result['debug']['raw_responses'])->contains(
            fn ($entry) => ($entry['label'] ?? null) === 'HADITHENC_RAW_RESPONSE'
        ));
    }
}
