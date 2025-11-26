<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Donation Goals & Presets
    |--------------------------------------------------------------------------
    |
    | These values drive the frontend donation recommendations and analytics.
    | You can override them via environment variables for different campaigns.
    |
    */
    'goal' => (float) env('DONATION_GOAL_GBP', 15000),
    'preset_amounts' => array_filter(array_map('intval', explode(',', env('DONATION_PRESET_AMOUNTS', '10,25,50,100')))),
];
