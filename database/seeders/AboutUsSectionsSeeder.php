<?php

namespace Database\Seeders;

use App\Models\AboutUsSection;
use Illuminate\Database\Seeder;

class AboutUsSectionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AboutUsSection::truncate();

        AboutUsSection::create([
            'section_group' => 'hero',
            'column_name' => 'full',
            'column_class' => 'col-lg-12',
            'label' => 'Accessible Islamic hub',
            'heading' => 'Islamic Connect: Quran, Knowledge & Community Tools',
            'heading_tag' => 'h1',
            'layout' => 'hero',
            'order' => 1,
            'content' => [
                [
                    'text' => 'Islamic Connect is the home base for Quran readers, dua seekers, and community volunteers who need reverent clarity plus modern convenience. We host guided study rooms, contextual tafsir notes, dua collections, and translated multimedia that can be accessed immediately whether you are on a phone, tablet, or desktop.',
                    'classes' => 'lead text-muted mb-4',
                ],
                [
                    'text' => 'Everything is optimized for low-bandwidth access: lightweight HTML, server-rendered SEO copy, and clear navigation so visitors instantly understand the experience—practical resources, scholastic insight, and compassionate community support tailored to a global Muslim life.',
                    'classes' => 'text-muted mb-3',
                ],
            ],
        ]);

        AboutUsSection::create([
            'section_group' => 'learning-community',
            'column_name' => 'left',
            'column_class' => 'col-lg-8',
            'heading' => 'Guided Quran Learning with Context',
            'heading_tag' => 'h2',
            'layout' => 'two-column',
            'order' => 2,
            'content' => [
                [
                'text' => 'Our guided Quran learning tracks walk readers from the first page of Fatiha through each Surah with context cards, transliterations, and short audio that reinforce accurate tajweed. Teachers, parents, and self-directed students toggle translations, highlight lessons, and queue readings that respect both devotional rhythm and modern schedules. Every module pairs summaries with actionable prompts so visitors do not just memorize verses but internalize values like mercy, justice, and gratitude.',
                    'classes' => 'text-muted',
                ],
                [
                'text' => 'The same space houses scholar-led roundups, curated playlists, and practical essays on topics such as ethical finance, civic responsibility, and mental health. Whether it is a soundbite that explains a classical commentary or a deeper article with citations, every resource points readers toward trusted scholars and follow-up study without leaving the platform.',
                    'classes' => 'text-muted mb-4',
                ],
            ],
        ]);

        AboutUsSection::create([
            'section_group' => 'learning-community',
            'column_name' => 'right',
            'column_class' => 'col-lg-4',
            'heading' => 'Community Support & Accessibility',
            'heading_tag' => 'h3',
            'layout' => 'two-column',
            'order' => 3,
            'content' => [
                [
                'text' => 'Community support is woven into every layout decision. We maintain 24/7 moderated chat rooms, volunteer mentors, and regional translators so Muslims across time zones can share questions, recordings, and dua requests. Accessibility features include keyboard-first navigation, focus indicators, descriptive alt text, high-contrast controls, and automatic text scaling so readers with sight differences stay engaged. Lightweight caching and offline-friendly assets help those with intermittent connections.',
                    'classes' => 'text-muted',
                ],
            ],
        ]);

        AboutUsSection::create([
            'section_group' => 'tools-service',
            'column_name' => 'left',
            'column_class' => 'col-lg-6',
            'heading' => 'Modern Tools Rooted in Tradition',
            'heading_tag' => 'h3',
            'layout' => 'two-column',
            'order' => 4,
            'content' => [
                [
                'text' => 'Modern tools do not mean abandoning tradition; instead we wrap historical wisdom in familiar interfaces. Our dua builder helps users assemble verified supplications, add personal notes, and export reminders for travel or Ramadan. The travel planner blends fiqh guidance with prayer times, qibla data, and community updates so pilgrims are not juggling multiple apps. Logistics features include step-by-step summaries so families coordinate deliveries, donations, and study groups without endless meetings.',
                    'classes' => 'text-muted mb-3',
                ],
                [
                'text' => 'That same mindset extends to our media studio, where volunteers script explainers, fact-check hadith references, and caption videos in multiple languages. Each release ships with a transcript, keywords, and discussion prompts so imams, educators, and youth leaders can turn a five-minute clip into a classroom conversation or family tafsir circle.',
                    'classes' => 'text-muted',
                ],
            ],
        ]);

        AboutUsSection::create([
            'section_group' => 'tools-service',
            'column_name' => 'right',
            'column_class' => 'col-lg-6',
            'heading' => 'Volunteer-Led Service & Responsible Giving',
            'heading_tag' => 'h2',
            'layout' => 'two-column',
            'order' => 5,
            'content' => [
                [
                'text' => 'Volunteer-led service keeps the platform accountable. Local volunteers verify events, support content creation, and answer direct queries so the digital experience stays human. Every donation is tracked and receipts explain whether the impact reaches education, infrastructure, or new research so supporters can trust their contributions align with the values communicated on this page.',
                    'classes' => 'text-muted mb-3',
                ],
                [
                    'text' => 'We also publish quarterly mission-impact stories to share how new prayer areas, education stipends, or accessible audio loops reached underserved communities. These narratives describe measurable results, such as study groups launched, scholars hosted, or tools translated, so stakeholders can celebrate wins and suggest improvements.',
                    'classes' => 'text-muted mb-0',
                ],
            ],
        ]);

        AboutUsSection::create([
            'section_group' => 'closing',
            'column_name' => 'full',
            'column_class' => 'col-lg-12',
            'heading' => null,
            'heading_tag' => 'h3',
            'layout' => 'full-width',
            'order' => 6,
            'content' => [
                [
                'text' => 'This narrative depth is layered before interactive components so search engines index meaningful signals and visitors can savour a coherent story. Every headline, sentence, and paragraph reinforces the promises we deliver—Quran clarity, scholarly insight, and community tools that adapt to modern life.',
                    'classes' => 'text-muted mb-0',
                ],
            ],
        ]);
    }
}
