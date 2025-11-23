<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class ClearHomeCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cache:home-page';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear the cached homepage HTML so the next hit renders fresh content.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $cleared = Cache::forget('home.page.html');

        $this->info($cleared ? 'Homepage cache cleared.' : 'Homepage cache already empty.');

        return 0;
    }
}
