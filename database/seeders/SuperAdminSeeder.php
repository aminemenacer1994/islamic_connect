<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        // Always ensure the requested super admin exists
        $this->ensureUser('eazmm@hotmail.com', '11111111', 'amine', 'admin');
        $this->ensureUser('admin@example.com', 'admin123', 'admin', 'admin');

        // Preferred: SUPERADMIN_CREDENTIALS supports multiple pairs: email:password,email2:password2
        $pairs = array_filter(array_map('trim', explode(',', (string) env('SUPERADMIN_CREDENTIALS'))));
        foreach ($pairs as $pair) {
            [$email, $password] = array_map('trim', array_pad(explode(':', $pair, 2), 2, ''));
            if (!$email || !$password) { continue; }
            $this->ensureUser($email, $password, 'Super Admin', 'admin');
        }

        // Backwards compatibility: single SUPERADMIN_EMAIL + SUPERADMIN_PASSWORD
        $singleEmail = env('SUPERADMIN_EMAIL');
        $singlePass = env('SUPERADMIN_PASSWORD');
        if ($singleEmail && $singlePass) {
            $this->ensureUser($singleEmail, $singlePass, 'Super Admin', 'admin');
        }
    }

    protected function ensureUser(string $email, string $password, string $name = 'Super Admin', string $role = 'admin'): void
    {
        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'role' => $role,
            ]
        );

        // Ensure desired attributes and update password
        $changed = false;
        if ($user->name !== $name) {
            $user->name = $name;
            $changed = true;
        }
        if ($user->role !== $role) {
            $user->role = $role;
            $changed = true;
        }
        $user->password = Hash::make($password);
        $changed = true;

        if ($changed) {
            $user->save();
        }
    }
}
