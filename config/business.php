<?php

return [
    'name' => env('BUSINESS_NAME', 'Islamic Connect'),
    'description' => env(
        'BUSINESS_DESCRIPTION',
        'Islamic Connect delivers Quran recitations, dua wisdom, and adaptive tools that empower modern Muslims.'
    ),
    'url' => env('BUSINESS_URL', env('APP_URL', 'https://islamiconnect.com')),
    'logo' => env('BUSINESS_LOGO_URL', '/images/logo_main.png'),
    'telephone' => env('BUSINESS_PHONE', ''),
    'email' => env('BUSINESS_EMAIL', 'support@islamiconnect.com'),
    'address' => [
        'street' => env('BUSINESS_ADDRESS_STREET', ''),
        'locality' => env('BUSINESS_ADDRESS_LOCALITY', ''),
        'region' => env('BUSINESS_ADDRESS_REGION', ''),
        'postal_code' => env('BUSINESS_ADDRESS_POSTAL_CODE', ''),
        'country' => env('BUSINESS_ADDRESS_COUNTRY', ''),
    ],
    'social_profiles' => [
        'https://www.facebook.com/profile.php?id=61560313385599',
        'https://x.com/islamiconnect24',
        'https://www.linkedin.com/company/islamic-connect/',
        'https://www.instagram.com/islamicconnect24/',
    ],
];
