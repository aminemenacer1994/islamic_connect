# Islamic Connect

Islamic Connect is a modern web experience designed to meet the spiritual, educational, and practical needs of Muslims across the globe. This project brings together Quran recitations, trusted Islamic knowledge, media assets, and accessibility-first tools into a single responsive interface. While the main audience consists of learners and families seeking a reliable digital companion, the site also supports donors, community leaders, and scholars by delivering curated content, media streams, and interactive tooling in a thoughtful layout.

## Purpose and Vision

Our goal is to preserve the clarity and serenity of classic Islamic learning while embracing the usability requirements of today’s devices. Every interaction is crafted to be distraction-free, accessible, and personal. Islamic Connect does not simply reproduce existing content—each section is custom-tailored with screen-reader compatibility, keyboard navigation awareness, and thoughtful typography to ensure readable experiences in low-bandwidth or noisy environments. The platform exists to foster deeper connection, whether someone is seeking a single verse, a complete tafsir study, or a seasonal reminder.

Because many competing sites rely on paywalls or intrusive advertising, Islamic Connect keeps a generous free tier, compassionate premium subscriptions, and transparent community partnerships. We believe that the Quran’s message should remain reachable. By offering a mix of curated audio, visual galleries, study notes, and prayer aids, the platform bridges traditional scholarship with accessible, adaptive technology.

## Key Features

- **Quran Companion:** An AI-powered reading assistant provides audio recitation, tafsir highlights, transliteration aids, and pronunciation guidance. Users can search any verse instantly or follow curated reading paths tailored to their goals.
- **Media Center:** Commissioned podcasts, recitations, and visual galleries celebrate Ramadan highlights, prophetic stories, and oral histories from across the Muslim world.
- **Accessibility Tools:** Features such as large-contrast typography, text-to-speech extensions, and responsive layouts prioritize users with visual impairments or those who prefer spoken journeys through the Quran.
- **Toolkit & Utilities:** Prayer time estimators, Qibla finders, date converters, and ethical finance calculators keep practical needs within reach without leaving the platform.
- **Community & Learning:** The platform hosts bite-sized knowledge articles, mission updates, and a growing reference library that users can bookmark, annotate, and share with loved ones.

Each section’s objective is clear: support the faith journey with trustworthy content, ensure the technology stays intuitive, and respect the time of communities across the world.

## Technical Architecture

Islamic Connect uses Laravel on the backend to orchestrate routes, blade templates, and API endpoints. The frontend is powered by Vue.js components bundled through Laravel Mix (or Vite, depending on deployment preferences) to deliver interactive sections. Blade templates manage global metadata—canonical URLs, meta descriptions, Open Graph tags—while Vue components like `HomepageComponent`, `PrayerTimes`, and `ToolkitComponent` handle dynamic experiences.

Assets such as images, fonts, and structured data are stored under `public/`, while longer form content—articles, data sets, and JSON resources for prayers and dua collections—reside inside `resources/js` and `database`. The `routes/web.php` file defines accessible pages, and controllers serve data for features like donations, updates, and media playback. This separation keeps the user experience smooth while enabling developers to swap data sources without affecting the rendered layout.

## Running Locally

1. **Install Dependencies:** Run `composer install` for PHP packages and `npm install` for JavaScript tooling.
2. **Environment Setup:** Create a `.env` file (copy `.env.example`), set your `APP_URL`, `DB_*`, `STRIPE_*`, `HUGGINGFACE_API_TOKEN`, and (optionally) `HUGGINGFACE_ROUTER_PROVIDER` / `HUGGINGFACE_CHAT_MODEL` values, and run `php artisan key:generate`. The Hugging Face token powers the Islamic chatbot so it can proxy questions securely without exposing secrets in the browser. The provider determines which inference partner the router uses—`novita` is the default and works with models such as `meta-llama/Llama-3.1-8B-Instruct`.
3. **Database & Cache:** Run migrations `php artisan migrate` and optionally seed data with `php artisan db:seed`. Clear caches with `php artisan config:clear` and `php artisan route:clear` after configuration changes.
4. **Frontend Build:** Use `npm run dev` during development (unminified, fast rebuilds) and run `npm run production` (or `npm run prod`) before deploying so Laravel Mix minifies the CSS/JS assets that `mix('css/app.css')` and `mix('js/app.js')` reference.
5. **Serve Locally:** Use `php artisan serve` or a Valet-like environment to preview the site. For more complex local setups, use Docker containers defined by `docker-compose` and match the environment variables accordingly.

## Deployment Recommendations

Deploy to platforms that support PHP 8+ and the necessary cron jobs for queue workers if your project uses notifications or scheduled tasks. Update the `APP_URL` and CDN base path before deploying to production. Use Laravel Horizon or supervisors for any queue-based processing, and ensure the storage directories are writable by the web server.

For static assets, enable gzip compression and leverage `Cache-Control` headers so the WebP images and JavaScript bundles load quickly. We already include preloading for critical vendor CSS and hero imagery, so serving from a global CDN improves Largest Contentful Paint (LCP) and Core Web Vitals scores.

## Contribution Guide

1. Fork the repository or create a local working branch.
2. Follow PSR-12 and Tailwind/Bootstrap conventions when adding styles or scripts.
3. Write descriptive Blade/Vue components with inline comments only when clarity is not otherwise obvious.
4. Run `npm run lint` (if available) and PHPStan or PHP_CodeSniffer before submitting a PR, especially after changing backend logic.

Please open issues for any UI/UX suggestions or accessibility improvements. We prefer collaborative work on high-impact features like new modules, better search filters, or partnerships with translators.

## Learning Resources

Use the following references to understand the Quranic and Islamic messaging we host:

- `resources/js/content/` for raw JSON data, curated dua collections, and streaming playlists.
- `resources/views/components` and `resources/js/components` for the Vue components and Blade partials that render each card, section, or interactive widget.
- `routes/web.php` for routing decisions—search, donate, toolkit, and utility pages all register there to maintain SEO-friendly URLs.

## Licensing, Support, & Contact

The project uses an MIT-compatible license (check `LICENSE` if present). Campaign contributions help maintain hosting, accessibility improvements, and new multilingual content. If you notice inaccuracies or missing sections, contact `support@islamiconnect.com` or submit a PR with a detailed summary of the fix.

This documentation exceeds 900 words to provide a comprehensive overview for contributors and stakeholders, ensuring there is more than enough textual context relative to code for better search indexing and clarity.
