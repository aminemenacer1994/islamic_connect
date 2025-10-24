<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        // Preferred: SUPERADMIN_CREDENTIALS supports multiple pairs: email:password,email2:password2
        $pairs = array_filter(array_map('trim', explode(',', (string) env('SUPERADMIN_CREDENTIALS'))));
        foreach ($pairs as $pair) {
            [$email, $password] = array_map('trim', array_pad(explode(':', $pair, 2), 2, ''));
            if (!$email || !$password) { continue; }
            $this->ensureUser($email, $password);
        }

        // Backwards compatibility: single SUPERADMIN_EMAIL + SUPERADMIN_PASSWORD
        $singleEmail = env('SUPERADMIN_EMAIL');
        $singlePass = env('SUPERADMIN_PASSWORD');
        if ($singleEmail && $singlePass) {
            $this->ensureUser($singleEmail, $singlePass);
        }
    }

    protected function ensureUser(string $email, string $password): void
    {
        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => 'Super Admin',
                'password' => Hash::make($password),
                'role' => 'admin',
            ]
        );

        // If user existed, ensure role and update password if env requires
        $changed = false;
        if ($user->role !== 'admin') {
            $user->role = 'admin';
            $changed = true;
        }
        // Update password only if not recently set; always update from env for explicit control
        $user->password = Hash::make($password);
        $changed = true;

        if ($changed) {
            $user->save();
        }
    }
}

