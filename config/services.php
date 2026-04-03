<?php

$islamHouseApiKey = trim((string) env('ISLAMHOUSE_API_KEY', ''));

if ($islamHouseApiKey === '' || in_array(strtolower($islamHouseApiKey), ['your_real_key', 'changeme', 'null'], true)) {
    $islamHouseApiKey = trim((string) env('ISLAMHOUSE_KEY', 'paV29H2gm56kvLP'));
}

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'github' => [
        'client_id' => env('GITHUB_CLIENT_ID'),
        'client_secret' => env('GITHUB_CLIENT_SECRET'),
        'redirect' => env('GITHUB_REDIRECT_URI'),
    ],
    
    'linkedin' => [
        'client_id' => env('LINKEDIN_CLIENT_ID'),
        'client_secret' => env('LINKEDIN_CLIENT_SECRET'),
        'redirect' => env('LINKEDIN_REDIRECT_URI'),
    ],

    'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_REDIRECT_URI'),
    ],

    'facebook' => [
        'client_id' => env('FACEBOOK_CLIENT_ID'),
        'client_secret' => env('FACEBOOK_CLIENT_SECRET'),
        'redirect' => env('FACEBOOK_REDIRECT_URI'),
    ],
    
    'facebook_pixel' => [
        'pixel_id' => env('FACEBOOK_PIXEL_ID'),
    ],
       
    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'stripe' => [
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
        'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),
        'price_id' => env('STRIPE_PRICE_ID'),
        'donation_price_id' => env('STRIPE_DONATION_PRICE_ID'),
        'prices' => [
            'monthly' => env('STRIPE_PRICE_MONTHLY'),
            'yearly' => env('STRIPE_PRICE_YEARLY'),
            'lifetime' => env('STRIPE_PRICE_LIFETIME'),
        ],
        'webhook' => [
            'secret' => env('STRIPE_WEBHOOK_SECRET'),
            'tolerance' => env('STRIPE_WEBHOOK_TOLERANCE', 300),
        ],
        'model' => App\Models\User::class,
    ],
    'huggingface' => [
        'model' => env('HUGGINGFACE_CHAT_MODEL', 'meta-llama/Llama-3.1-8B-Instruct'),
        'token' => env('HUGGINGFACE_API_TOKEN'),
        'router_provider' => env('HUGGINGFACE_ROUTER_PROVIDER', 'novita'),
    ],
    'criterion' => [
        'base' => env('CRITERION_API_BASE', 'https://criterion.life/api/v1'),
        'prefer_local_corpus' => env('CRITERION_PREFER_LOCAL_CORPUS', true),
        'local_data_path' => env('CRITERION_LOCAL_DATA_PATH', base_path('criterion-local/data')),
        'quran_search_endpoint' => env('CRITERION_QURAN_SEARCH_ENDPOINT', '/quran/search'),
        'hadith_search_endpoint' => env('CRITERION_HADITH_SEARCH_ENDPOINT', '/hadith/search'),
        'quran_limit' => env('CRITERION_QURAN_LIMIT', 5),
        'hadith_limit' => env('CRITERION_HADITH_LIMIT', 5),
        'hadith_grade' => env('CRITERION_HADITH_GRADE', 'sahih-and-hasan'),
        'timeout' => env('CRITERION_TIMEOUT_SECONDS', 12),
    ],
    'islamhouse' => [
        'key' => $islamHouseApiKey,
        'base' => env('ISLAMHOUSE_API_BASE', 'https://api3.islamhouse.com/v3'),
        'version' => env('ISLAMHOUSE_API_VERSION', 'v3'),
    ],

    'islamic_content_api' => [
        'base' => env('ISLAMIC_CONTENT_API_BASE'),
        'key' => env('ISLAMIC_CONTENT_API_KEY'),
        'key_header' => env('ISLAMIC_CONTENT_API_KEY_HEADER', 'X-API-Key'),
        'articles_search_endpoint' => env('ISLAMIC_CONTENT_API_ARTICLES_SEARCH_ENDPOINT', '/search'),
        'articles_endpoint' => env('ISLAMIC_CONTENT_API_ARTICLES_ENDPOINT', '/articles'),
        'hadith_search_endpoint' => env('ISLAMIC_CONTENT_API_HADITH_SEARCH_ENDPOINT', '/hadith/search'),
        'hadith_search_endpoints' => [
            '/hadith/search',
            '/hadiths/search',
            '/api/hadith/search',
            '/search',
        ],
    ],

    'aladhan' => [
        'base' => env('ALADHAN_API_BASE', 'https://api.aladhan.com/v1'),
        'country' => env('ALADHAN_DEFAULT_COUNTRY', 'United Kingdom'),
        'method' => env('ALADHAN_DEFAULT_METHOD', 2),
        'school' => env('ALADHAN_DEFAULT_SCHOOL', 0),
    ],

    'sunnah' => [
        'base' => env('SUNNAH_API_BASE', 'https://api.sunnah.com/v1'),
        'key' => env('SUNNAH_API_KEY'),
    ],

    'quran_gading' => [
        'base' => env('QURAN_GADING_API_BASE', 'https://api.quran.gading.dev'),
    ],

    'quran_com' => [
        'base' => env('QURAN_COM_API_BASE', 'https://api.quran.com/api/v4'),
        'search_size' => env('QURAN_COM_SEARCH_SIZE', 20),
        'tafsir_resource_ids' => env('QURAN_COM_TAFSIR_RESOURCE_IDS', '169,168'),
    ],

    'ktauchathuranga_quran' => [
        'base' => env('KTAUCHATHURANGA_QURAN_API_BASE'),
        'key' => env('KTAUCHATHURANGA_QURAN_API_KEY'),
        'key_header' => env('KTAUCHATHURANGA_QURAN_API_KEY_HEADER', 'X-API-Key'),
        'search_endpoint' => env('KTAUCHATHURANGA_QURAN_SEARCH_ENDPOINT', '/search'),
        'search_endpoints' => [
            '/search',
            '/v1/search',
            '/verses/search',
        ],
        'ayah_endpoint' => env('KTAUCHATHURANGA_QURAN_AYAH_ENDPOINT', '/ayah/{surah}/{ayah}'),
        'ayah_endpoints' => [
            '/ayah/{surah}/{ayah}',
            '/ayah/{ayah_id}',
            '/verse/{surah}/{ayah}',
            '/verses/{ayah_id}',
        ],
    ],

    'quran_foundation' => [
        'base' => env('QURAN_FOUNDATION_API_BASE'),
        'key' => env('QURAN_FOUNDATION_API_KEY'),
        'key_header' => env('QURAN_FOUNDATION_API_KEY_HEADER', 'X-API-Key'),
        'bearer_token' => env('QURAN_FOUNDATION_API_BEARER_TOKEN'),
        'search_endpoint' => env('QURAN_FOUNDATION_SEARCH_ENDPOINT', '/search'),
        'search_endpoints' => [
            '/search',
            '/api/search',
            '/v1/search',
            '/verses/search',
        ],
        'ayah_endpoint' => env('QURAN_FOUNDATION_AYAH_ENDPOINT', '/ayah/{surah}/{ayah}'),
        'ayah_endpoints' => [
            '/ayah/{surah}/{ayah}',
            '/verses/{surah}:{ayah}',
            '/api/ayah/{surah}/{ayah}',
            '/v1/ayah/{surah}/{ayah}',
        ],
    ],

    'quran_mcp' => [
        'base' => env('QURAN_MCP_BASE'),
        'search_endpoint' => env('QURAN_MCP_SEARCH_ENDPOINT', '/search'),
        'ayah_endpoint' => env('QURAN_MCP_AYAH_ENDPOINT', '/ayah'),
        'key' => env('QURAN_MCP_API_KEY'),
        'key_header' => env('QURAN_MCP_API_KEY_HEADER', 'X-API-Key'),
        'bearer_token' => env('QURAN_MCP_BEARER_TOKEN'),
    ],

    'quranenc' => [
        'base' => env('QURANENC_API_BASE', 'https://api.quranenc.com/api/v1'),
        'key' => env('QURANENC_API_KEY'),
        'translate_endpoint' => env('QURANENC_TRANSLATE_ENDPOINT', '/translation/translate'),
        'fallback_translation_key' => env('QURANENC_FALLBACK_TRANSLATION_KEY', 'english_saheeh'),
        'tafsir_key' => env('QURANENC_TAFSIR_KEY', 'english_mokhtasar'),
        'legacy_base' => env('QURANENC_LEGACY_API_BASE', 'https://quranenc.com/api/v1'),
    ],

    'hadithenc' => [
        'base' => env('HADITHENC_API_BASE', 'https://hadithapi.com/api'),
        'key' => env('HADITHENC_API_KEY'),
        'endpoint' => env('HADITHENC_API_ENDPOINT', '/hadiths'),
    ],

    'hadeethenc' => [
        'base' => env('HADEETHENC_API_BASE', 'https://hadeethenc.com/api/v1'),
        'language' => env('HADEETHENC_DEFAULT_LANGUAGE', 'en'),
    ],

    'deen_api' => [
        'base' => env('DEEN_API_BASE'),
        'key' => env('DEEN_API_KEY'),
        'key_header' => env('DEEN_API_KEY_HEADER', 'X-API-Key'),
        'hadith_search_endpoint' => env('DEEN_API_HADITH_SEARCH_ENDPOINT', '/hadith/search'),
        'hadith_search_endpoints' => [
            '/hadith/search',
            '/api/hadith/search',
            '/hadiths/search',
            '/search',
        ],
    ],

    'hadith_json' => [
        'base' => env(
            'HADITH_JSON_API_BASE',
            'https://raw.githubusercontent.com/AhmedBaset/hadith-json/main/db/by_book/the_9_books'
        ),
        'legacy_base' => env(
            'HADITH_JSON_LEGACY_BASE',
            'https://raw.githubusercontent.com/islamic-network/hadith-json/main'
        ),
    ],

    'ai_rag' => [
        'query_cache_hours' => env('AI_RAG_QUERY_CACHE_HOURS', 24),
        'document_cache_hours' => env('AI_RAG_DOCUMENT_CACHE_HOURS', 72),
        'vector_candidate_limit' => env('AI_RAG_VECTOR_CANDIDATE_LIMIT', 500),
        'vector_store_enabled' => env('AI_RAG_VECTOR_STORE_ENABLED', true),
        'smart_evidence_mode' => env('AI_RAG_SMART_EVIDENCE_MODE', true),
        'debug_mode' => env('AI_RAG_DEBUG_MODE', false),
    ],
    
    // GA4 analytics config removed

];
