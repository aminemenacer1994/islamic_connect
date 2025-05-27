<script setup>
import { Head, Link } from '@inertiajs/vue3';
</script>

<template>
  <Head title="Home" />
  <div class="flex flex-col min-h-screen items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <header class="w-full flex justify-end p-6">
      <Link :href="route('login')" class="mr-4 hover:underline">Log in</Link>
      <Link :href="route('register')" class="hover:underline">Register</Link>
    </header>

    <main class="text-center max-w-2xl px-4">
      <h1 class="text-4xl font-bold mb-4">Welcome to Dellys</h1>
      <p class="text-lg text-gray-700 dark:text-gray-300">
        Find a home that suits your lifestyle. (banner)
      </p>

      <div class="mt-6">
        <Link
          :href="route('dashboard')"
          class="inline-block rounded bg-blue-600 text-white px-6 py-2 text-sm font-medium hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      </div>

      <div class="mt-8 space-y-6">
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h2 class="text-xl font-semibold mb-2">Banner</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Discover your featured property
          </p>
        </div>

        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h2 class="text-xl font-semibold mb-2">Info about dellys</h2>
          <p class="text-gray-600 dark:text-gray-400">
            The experts in local and international property
          </p>
        </div>

        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h2 class="text-xl font-semibold mb-2">Testimonials</h2>
          <p class="text-gray-600 dark:text-gray-400">
            What Our Residents Say About Us!
          </p>
        </div>

        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h2 class="text-xl font-semibold mb-2">Contact us</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Putting a plan to action, to assure your satisfaction!           
          </p>
        </div>
      </div>
    </main>
  </div>
</template>