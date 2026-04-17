<template>
  <div class="youth-zone" :class="{ 'search-active': searchQuery.length > 0 }">

    <!-- ░░ AMBIENT BACKGROUND GEOMETRY ░░ -->
    <div class="ambient-bg" aria-hidden="true">
      <svg class="geo-pattern" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="stars" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <polygon points="30,2 36.5,20 56,20 41,31 47,49 30,38 13,49 19,31 4,20 23.5,20" fill="none" stroke="rgba(182,139,64,0.08)" stroke-width="1"/>
          </pattern>
          <radialGradient id="meshGrad" cx="30%" cy="20%">
            <stop offset="0%" stop-color="#1a4a2e" stop-opacity="0.95"/>
            <stop offset="60%" stop-color="#0d2318" stop-opacity="1"/>
            <stop offset="100%" stop-color="#060f0b" stop-opacity="1"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#meshGrad)"/>
        <rect width="100%" height="100%" fill="url(#stars)"/>
      </svg>
    </div>

    <!-- ░░ DISCLAIMER STRIP ░░ -->
    <div class="disclaimer-strip">
      <div class="inner">
        <span class="disc-icon">⟡</span>
        <span>All content is sourced from five verified Islamic scholarly authorities — IslamQA · IslamWeb · SeekersGuidance · Yaqeen Institute · AlMaghrib Institute. For educational purposes only.</span>
      </div>
    </div>

    <!-- ░░ NAVIGATION ░░ -->
    <nav class="site-nav" :class="{ scrolled: isScrolled }">
      <div class="nav-inner">
        <div class="brand">
          <span class="brand-arabic">منطقة الشباب</span>
          <span class="brand-en">Youth Zone</span>
        </div>
        <ul class="nav-links">
          <li><a href="#glossary" @click.prevent="scrollTo('glossary')">Glossary</a></li>
          <li><a href="#hub" @click.prevent="scrollTo('hub')">Learn</a></li>
          <li><a href="#tools" @click.prevent="scrollTo('tools')">Tools</a></li>
          <li><a href="#faq" @click.prevent="scrollTo('faq')">FAQ</a></li>
        </ul>
        <div class="nav-search">
          <button class="search-toggle" @click="searchOpen = !searchOpen" aria-label="Toggle search">
            <svg v-if="!searchOpen" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <svg v-else width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
      <transition name="search-drop">
        <div class="nav-search-bar" v-if="searchOpen">
          <input ref="searchInput" v-model="searchQuery" type="text" placeholder="Search topics, terms, or questions…" @keydown.escape="searchOpen = false; searchQuery = ''"/>
          <span class="search-count" v-if="searchQuery">{{ totalSearchResults }} results</span>
        </div>
      </transition>
    </nav>

    <!-- ░░ HERO ░░ -->
    <header class="hero" id="hero">
      <div class="hero-content">
        <p class="hero-kicker">بسم الله الرحمن الرحيم</p>
        <h1 class="hero-title">
          <span class="line">Curated Knowledge</span>
          <span class="line accent">for the Western</span>
          <span class="line">Muslim Soul</span>
        </h1>
        <p class="hero-sub">Bite-sized · Scholarly verified · Made for you</p>
        <div class="hero-actions">
          <button class="btn-primary" @click="scrollTo('hub')">
            <span>Start Learning</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <button class="btn-ghost" @click="scrollTo('glossary')">Explore Glossary</button>
        </div>
        <div class="hero-stats">
          <div class="stat" v-for="s in heroStats" :key="s.label">
            <span class="stat-val">{{ s.val }}</span>
            <span class="stat-label">{{ s.label }}</span>
          </div>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="medallion">
          <svg viewBox="0 0 300 300">
            <defs>
              <radialGradient id="medGrad" cx="50%" cy="50%">
                <stop offset="0%" stop-color="#b68b40"/>
                <stop offset="100%" stop-color="#7a5c20"/>
              </radialGradient>
            </defs>
            <circle cx="150" cy="150" r="148" fill="none" stroke="url(#medGrad)" stroke-width="1" opacity="0.4"/>
            <circle cx="150" cy="150" r="120" fill="none" stroke="url(#medGrad)" stroke-width="0.5" opacity="0.3"/>
            <!-- 8-point star -->
            <path d="M150,40 L162,108 L220,60 L172,118 L240,130 L172,142 L220,200 L162,152 L150,220 L138,152 L80,200 L128,142 L60,130 L128,118 L80,60 L138,108 Z" fill="none" stroke="url(#medGrad)" stroke-width="1" opacity="0.5"/>
            <text x="150" y="158" text-anchor="middle" font-family="'Amiri', serif" font-size="36" fill="#b68b40" opacity="0.8">الله</text>
          </svg>
        </div>
      </div>
      <div class="scroll-hint" @click="scrollTo('glossary')">
        <span>Scroll</span>
        <div class="scroll-line"></div>
      </div>
    </header>

    <!-- ░░ GLOSSARY ░░ -->
    <section class="section glossary-section" id="glossary">
      <div class="section-label">01 / Essential Terms</div>
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">Integrated <em>Glossary</em></h2>
          <p class="section-desc">Foundational vocabulary of Islam, sourced from verified scholars and explained for a modern context.</p>
        </div>
        <div class="glossary-grid">
          <div
            class="glossary-card"
            v-for="(term, i) in filteredGlossary"
            :key="term.term"
            :style="{ '--delay': i * 80 + 'ms' }"
            @click="activeGlossary = activeGlossary === term.term ? null : term.term"
            :class="{ expanded: activeGlossary === term.term }"
          >
            <div class="gc-arabic">{{ term.arabic }}</div>
            <div class="gc-term">{{ term.term }}</div>
            <div class="gc-def">{{ term.definition }}</div>
            <div class="gc-footer">
              <span class="gc-source">{{ term.source }}</span>
              <span class="gc-verified">✓ Verified</span>
            </div>
            <transition name="expand">
              <div class="gc-expand" v-if="activeGlossary === term.term">
                <p>{{ term.extended }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ░░ CONTENT HUB ░░ -->
    <section class="section content-hub" id="hub">
      <div class="section-label">02 / Curated Content</div>
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">Learn at Your <em>Own Pace</em></h2>
          <p class="section-desc">Articles, short video clips, and audio reflections crafted for the modern Western Muslim.</p>
        </div>

        <!-- Tab Switcher -->
        <div class="tab-switcher">
          <button
            v-for="tab in contentTabs"
            :key="tab.id"
            class="tab-btn"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            {{ tab.label }}
          </button>
        </div>

        <!-- Articles -->
        <transition name="tab-fade" mode="out-in">
          <div v-if="activeTab === 'articles'" key="articles" class="articles-grid">
            <article
              class="article-card"
              v-for="(a, i) in filteredArticles"
              :key="a.id"
              :class="{ featured: i === 0 }"
              :style="{ '--delay': i * 100 + 'ms' }"
            >
              <div class="ac-image">
                <img :src="a.image" :alt="a.title" loading="lazy"/>
                <div class="ac-overlay">
                  <span class="ac-category">{{ a.category }}</span>
                </div>
              </div>
              <div class="ac-body">
                <div class="ac-meta">
                  <span class="ac-time">{{ a.readTime }}</span>
                  <span class="ac-ref">{{ a.reference }}</span>
                </div>
                <h3 class="ac-title">{{ a.title }}</h3>
                <p class="ac-excerpt">{{ a.excerpt }}</p>
                <button class="ac-read">
                  Read Article
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            </article>
          </div>

          <!-- Videos -->
          <div v-else-if="activeTab === 'videos'" key="videos" class="videos-grid">
            <div class="video-card" v-for="v in filteredVideos" :key="v.id">
              <div class="vc-embed">
                <iframe :src="v.embedUrl" :title="v.title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
              <div class="vc-body">
                <h4 class="vc-title">{{ v.title }}</h4>
                <div class="vc-meta">
                  <span class="vc-speaker">{{ v.speaker }}</span>
                  <span class="vc-source">{{ v.source }}</span>
                </div>
                <div class="vc-footer">
                  <span class="tag-verified">✓ Scholar Verified</span>
                  <span class="vc-likes">♡ {{ v.likes }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Audio -->
          <div v-else-if="activeTab === 'audio'" key="audio" class="audio-list">
            <div class="audio-item" v-for="(a, i) in filteredAudio" :key="a.id" :style="{ '--delay': i * 80 + 'ms' }">
              <div class="ai-num">{{ String(i + 1).padStart(2, '0') }}</div>
              <div class="ai-info">
                <h4 class="ai-title">{{ a.title }}</h4>
                <div class="ai-meta">
                  <span>{{ a.scholar }}</span>
                  <span class="ai-dot">·</span>
                  <span>{{ a.duration }}</span>
                  <span class="ai-dot">·</span>
                  <span>{{ a.ref }}</span>
                </div>
                <audio controls class="ai-player">
                  <source :src="a.src" type="audio/mpeg"/>
                </audio>
              </div>
              <div class="ai-icon">🎙</div>
            </div>
          </div>
        </transition>
      </div>
    </section>

    <!-- ░░ DOS & DON'TS + TOOLS ░░ -->
    <section class="section tools-section" id="tools">
      <div class="section-label">03 / Guidance & Tools</div>
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">Daily <em>Compass</em></h2>
          <p class="section-desc">Practical guidance and tools to anchor your day in deen.</p>
        </div>

        <div class="tools-grid">
          <!-- Dos & Donts -->
          <div class="panel dos-panel">
            <h3 class="panel-title">Do's & Don'ts for Youth</h3>
            <div class="dd-grid">
              <div class="dd-col dos">
                <div class="dd-header">
                  <span class="dd-icon">✅</span>
                  <h4>Do's</h4>
                </div>
                <ul>
                  <li v-for="d in dosItems" :key="d">
                    <span class="dd-check">→</span>
                    {{ d }}
                  </li>
                </ul>
              </div>
              <div class="dd-divider"></div>
              <div class="dd-col donts">
                <div class="dd-header">
                  <span class="dd-icon">⛔</span>
                  <h4>Don'ts</h4>
                </div>
                <ul>
                  <li v-for="d in dontsItems" :key="d">
                    <span class="dd-x">✕</span>
                    {{ d }}
                  </li>
                </ul>
              </div>
            </div>
            <p class="panel-ref">Based on IslamQA & SeekersGuidance guidelines</p>
          </div>

          <!-- Tools -->
          <div class="panel tools-panel">
            <h3 class="panel-title">Interactive Tools</h3>

            <!-- Daily Reminder -->
            <div class="tool-block reminder-block">
              <div class="tool-block-head">
                <span>💡</span> Daily Reminder
              </div>
              <blockquote class="hadith-quote">
                "Whoever follows a path in pursuit of knowledge, Allah makes easy for him a path to Paradise."
                <cite>— Sahih Muslim</cite>
              </blockquote>
              <button class="btn-outline-sm" @click="nextHadith">Next Hadith →</button>
            </div>

            <!-- Prayer Times Placeholder -->
            <div class="tool-block prayer-block">
              <div class="tool-block-head">
                <span>🕌</span> Prayer Times & Qibla
              </div>
              <div class="prayer-times">
                <div class="pt-item" v-for="p in prayerTimes" :key="p.name" :class="{ current: p.current }">
                  <span class="pt-name">{{ p.name }}</span>
                  <span class="pt-time">{{ p.time }}</span>
                  <span class="pt-dot" v-if="p.current">●</span>
                </div>
              </div>
              <small class="prayer-note">Times shown are approximate. Use IslamicFinder or Athan Pro for precise local times.</small>
            </div>

            <!-- Recommended Apps -->
            <div class="tool-block apps-block">
              <div class="tool-block-head">
                <span>📱</span> Recommended Apps
              </div>
              <div class="app-tags">
                <span class="app-tag" v-for="app in recommendedApps" :key="app">{{ app }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ░░ FAQ ░░ -->
    <section class="section faq-section" id="faq">
      <div class="section-label">04 / Questions</div>
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">Frequently <em>Asked</em></h2>
          <p class="section-desc">Honest, scholarly-backed answers to real questions from Western Muslim youth.</p>
        </div>
        <div class="faq-list">
          <div
            class="faq-item"
            v-for="(faq, i) in filteredFaqs"
            :key="i"
            :class="{ open: activeFaq === i }"
            @click="activeFaq = activeFaq === i ? null : i"
          >
            <div class="faq-q">
              <span class="faq-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="faq-text">{{ faq.question }}</span>
              <span class="faq-toggle">{{ activeFaq === i ? '−' : '+' }}</span>
            </div>
            <transition name="faq-open">
              <div class="faq-a" v-if="activeFaq === i">
                <p>{{ faq.answer }}</p>
                <cite>— {{ faq.source }}</cite>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ░░ FOOTER ░░ -->
    <footer class="site-footer">
      <div class="footer-geo" aria-hidden="true">
        <svg viewBox="0 0 400 120" preserveAspectRatio="none">
          <path d="M0,60 Q100,0 200,60 Q300,120 400,60 L400,120 L0,120 Z" fill="rgba(182,139,64,0.06)"/>
        </svg>
      </div>
      <div class="container footer-inner">
        <div class="footer-brand">
          <span class="footer-arabic">منطقة الشباب</span>
          <p>Curated Islamic knowledge for Western Muslim Youth.</p>
          <p class="footer-dua">🌿 May Allah increase us in beneficial knowledge. Ameen.</p>
        </div>
        <div class="footer-refs">
          <h5>Scholarly Sources</h5>
          <ol>
            <li>IslamQA.info — Scholarly Fatawa</li>
            <li>IslamWeb.net — Authenticated Articles</li>
            <li>SeekersGuidance.org — Courses & Answers</li>
            <li>YaqeenInstitute.org — Research & Papers</li>
            <li>AlMaghrib Institute — Seminar Notes</li>
          </ol>
        </div>
        <div class="footer-note">
          <p>All multimedia for educational purposes only.</p>
          <p>Images courtesy of Pexels. Videos courtesy of YouTube.</p>
          <p class="footer-copy">© {{ new Date().getFullYear() }} Islamic Connect · Youth Zone</p>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'YouthZoneGuide',
  data() {
    return {
      isScrolled: false,
      searchOpen: false,
      searchQuery: '',
      activeTab: 'articles',
      activeGlossary: null,
      activeFaq: null,
      currentHadithIndex: 0,

      heroStats: [
        { val: '5', label: 'Verified Sources' },
        { val: '50+', label: 'Curated Articles' },
        { val: '100%', label: 'Scholar Backed' },
      ],

      contentTabs: [
        { id: 'articles', label: 'Articles', icon: '📄' },
        { id: 'videos', label: 'Short Clips', icon: '🎬' },
        { id: 'audio', label: 'Audio', icon: '🎙' },
      ],

      hadiths: [
        { text: '"Whoever follows a path in pursuit of knowledge, Allah makes easy for him a path to Paradise."', cite: 'Sahih Muslim' },
        { text: '"The best of you are those who learn the Quran and teach it."', cite: 'Sahih al-Bukhari' },
        { text: '"Make things easy and do not make them difficult."', cite: 'Bukhari & Muslim' },
        { text: '"Speak good or remain silent."', cite: 'Sahih al-Bukhari' },
      ],

      prayerTimes: [
        { name: 'Fajr', time: '04:12', current: false },
        { name: 'Dhuhr', time: '13:05', current: true },
        { name: 'Asr', time: '16:47', current: false },
        { name: 'Maghrib', time: '20:18', current: false },
        { name: 'Isha', time: '21:52', current: false },
      ],

      recommendedApps: ['Quran.com', 'Athan Pro', 'Dhikr & Dua', 'Yaqeen Institute', 'SeekersGuidance', 'AlMaghrib Gateway'],

      dosItems: [
        'Maintain daily Salah even when busy',
        'Seek knowledge from credible scholars',
        'Honour parents and elders',
        'Engage in halal entertainment',
        'Make dhikr a daily habit',
      ],

      dontsItems: [
        'Avoid unnecessary free-mixing',
        'Never delay Salah intentionally',
        'Refrain from backbiting (Gheebah)',
        'Avoid music with foul content',
        'Dont neglect family ties (Silat al-Rahim)',
      ],

      glossaryTerms: [
        {
          term: 'Tawheed',
          arabic: 'توحيد',
          definition: 'The Oneness and Uniqueness of Allah in His Lordship, Names, and Worship.',
          extended: 'Tawheed is the central concept of Islam. It encompasses Rububiyyah (Lordship), Uluhiyyah (Worship), and al-Asma wa al-Sifat (Names and Attributes). Upholding Tawheed is the first and most important obligation on every Muslim.',
          source: 'IslamQA',
        },
        {
          term: 'Sunnah',
          arabic: 'سنة',
          definition: 'The teachings, actions, and approvals of Prophet Muhammad ﷺ.',
          extended: 'The Sunnah is the second primary source of Islamic law after the Quran. It includes the Prophet\'s words (Hadith), his actions, and what he permitted or disapproved of in others.',
          source: 'IslamWeb',
        },
        {
          term: 'Fiqh',
          arabic: 'فقه',
          definition: 'Islamic jurisprudence; the science of understanding divine law.',
          extended: 'Fiqh is derived from the Quran and Sunnah through the methodology of Usul al-Fiqh. The four major schools (Madhabs) — Hanafi, Maliki, Shafi\'i, and Hanbali — represent scholarly traditions within Sunni Islam.',
          source: 'SeekersGuidance',
        },
        {
          term: 'Ihsan',
          arabic: 'إحسان',
          definition: 'Worshipping Allah as if you see Him; the station of spiritual excellence.',
          extended: 'Ihsan is the highest of the three levels of the religion (Islam, Iman, Ihsan). It is defined in a famous hadith of Jibril as "worshipping Allah as though you see Him, and if you cannot see Him, know that He sees you."',
          source: 'Yaqeen Institute',
        },
        {
          term: 'Bid\'ah',
          arabic: 'بدعة',
          definition: 'Innovation in religious matters that has no basis in the Quran or Sunnah.',
          extended: 'Scholars distinguish between religious bid\'ah (prohibited) and worldly innovations (permissible). Religious bid\'ah refers to inventing acts of worship that the Prophet ﷺ did not legislate.',
          source: 'IslamQA',
        },
        {
          term: 'Zuhd',
          arabic: 'زهد',
          definition: 'Asceticism or detachment from worldly desires for the sake of the hereafter.',
          extended: 'Zuhd does not mean abandoning the world entirely, but rather not allowing it to dominate the heart. Ibn al-Qayyim described the zahid as one who possesses the world without the world possessing him.',
          source: 'AlMaghrib',
        },
        {
          term: 'Tawakkul',
          arabic: 'توكل',
          definition: 'Complete reliance and trust in Allah after taking necessary means.',
          extended: 'Tawakkul is often misunderstood. True tawakkul requires taking the appropriate worldly means first (tying the camel) and then placing one\'s trust in Allah for the outcome.',
          source: 'SeekersGuidance',
        },
        {
          term: 'Istighfar',
          arabic: 'استغفار',
          definition: 'Seeking forgiveness from Allah through repentance and supplication.',
          extended: 'The Prophet ﷺ was reported to seek forgiveness more than seventy times a day. Istighfar is not only for major sins — it is a continuous act of turning the heart back to Allah and recognising one\'s need for His mercy.',
          source: 'IslamWeb',
        },
      ],

      curatedArticles: [
        {
          id: 1,
          title: 'Balancing Deen & Dunya in the West',
          excerpt: 'Practical, scholar-backed strategies to maintain your faith while navigating modern Western society — from university to the workplace.',
          category: 'Lifestyle',
          readTime: '4 min',
          reference: 'IslamWeb 22345',
          image: 'https://images.pexels.com/photos/7249318/pexels-photo-7249318.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
        {
          id: 2,
          title: 'A Complete Guide to Wudu',
          excerpt: 'A concise, illustrated guide to purification for prayer, covering obligations, sunnahs, and the most common mistakes made by youth.',
          category: 'Fiqh',
          readTime: '3 min',
          reference: 'IslamQA 12834',
          image: 'https://images.pexels.com/photos/5996832/pexels-photo-5996832.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
        {
          id: 3,
          title: 'Navigating Gender Interactions',
          excerpt: 'Scholarly guidance on maintaining Islamic modesty while functioning confidently in co-ed professional and academic environments.',
          category: 'Ethics',
          readTime: '5 min',
          reference: 'SeekersGuidance',
          image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
        {
          id: 4,
          title: 'Understanding Your Identity as a Western Muslim',
          excerpt: 'How to embrace both your Muslim identity and Western upbringing without compromise — a reflection from Yaqeen Institute researchers.',
          category: 'Identity',
          readTime: '6 min',
          reference: 'Yaqeen Institute',
          image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
        {
          id: 5,
          title: 'The Fiqh of Social Media',
          excerpt: 'What does Islam say about content creation, following celebrities, and managing screen time? A modern fiqh breakdown.',
          category: 'Digital Life',
          readTime: '5 min',
          reference: 'AlMaghrib Institute',
          image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
        {
          id: 6,
          title: 'Making Du\'a That is Accepted',
          excerpt: 'Conditions, manners, and best times for supplication — a comprehensive guide sourced from Quran, Sunnah, and scholarly commentary.',
          category: 'Ibadah',
          readTime: '4 min',
          reference: 'IslamWeb 30120',
          image: 'https://images.pexels.com/photos/1022922/pexels-photo-1022922.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
      ],

      videoClips: [
        {
          id: 1,
          title: 'The Purpose of Life',
          speaker: 'Sh. Omar Suleiman',
          embedUrl: 'https://www.youtube.com/embed/7d16CpWp-ok',
          source: 'Yaqeen Institute',
          likes: '1.2k',
        },
        {
          id: 2,
          title: 'How to Focus in Salah',
          speaker: 'Sh. Yahya Ibrahim',
          embedUrl: 'https://www.youtube.com/embed/3bEJ6mZz7jE',
          source: 'AlMaghrib Institute',
          likes: '980',
        },
      ],

      audioClips: [
        {
          id: 1,
          title: 'Reflections on Surah Al-Asr',
          scholar: 'Mufti Menk',
          duration: '12:34',
          ref: 'IslamWeb Audio',
          src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        },
        {
          id: 2,
          title: 'The Virtues of Dhikr',
          scholar: 'Sh. Ahmad Deedat',
          duration: '08:22',
          ref: 'SeekersGuidance',
          src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        },
        {
          id: 3,
          title: 'Youth & Identity in the Modern World',
          scholar: 'Sh. Omar Suleiman',
          duration: '15:08',
          ref: 'Yaqeen Institute',
          src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        },
      ],

      faqs: [
        {
          question: 'Is it permissible to celebrate birthdays?',
          answer: 'Scholars differ on this. The majority view holds that celebrating birthdays with religious intention constitutes bid\'ah (innovation). A cultural gathering without religious elements is a matter of scholarly debate. For youth seeking caution, focusing on Islamic occasions is recommended.',
          source: 'IslamQA 1027',
        },
        {
          question: 'Can I listen to music?',
          answer: 'The majority of classical scholars hold that musical instruments are impermissible except the duff in specific circumstances. As an alternative, nasheeds without instruments or beneficial podcasts and Quran recitation are widely recommended for Western Muslim youth.',
          source: 'IslamWeb 827',
        },
        {
          question: 'How do I deal with peer pressure around dating?',
          answer: 'Islam prohibits unmarried romantic relationships due to the risk of falling into zina. Scholars advise maintaining firm, respectful boundaries and, when ready for marriage, pursuing it through family involvement and proper channels such as supervised settings.',
          source: 'SeekersGuidance',
        },
        {
          question: 'Is it okay to have non-Muslim friends?',
          answer: 'Yes. Islam permits friendships with non-Muslims based on justice and common humanity. The prohibition is regarding close allegiances that could compromise your deen or lead to haram. Being a good neighbour and colleague is an act of da\'wah.',
          source: 'IslamWeb',
        },
        {
          question: 'How do I stay motivated after Ramadan?',
          answer: 'Scholars advise treating Ramadan as a launchpad, not a finish line. Maintain at least one consistent act of worship — such as six fasts of Shawwal, night prayers on Friday, or consistent Quran recitation — to anchor your spiritual momentum.',
          source: 'AlMaghrib Institute',
        },
        {
          question: 'What does Islam say about mental health?',
          answer: 'Islam recognises both spiritual and psychological dimensions of wellbeing. Seeking professional help is not a sign of weak faith — it is a form of taking means (tawakkul). Many scholars actively encourage therapy alongside spiritual practices.',
          source: 'Yaqeen Institute',
        },
      ],
    }
  },

  computed: {
    currentHadith() {
      return this.hadiths[this.currentHadithIndex]
    },
    filteredGlossary() {
      if (!this.searchQuery) return this.glossaryTerms
      const q = this.searchQuery.toLowerCase()
      return this.glossaryTerms.filter(t =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
      )
    },
    filteredArticles() {
      if (!this.searchQuery) return this.curatedArticles
      const q = this.searchQuery.toLowerCase()
      return this.curatedArticles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      )
    },
    filteredVideos() {
      if (!this.searchQuery) return this.videoClips
      const q = this.searchQuery.toLowerCase()
      return this.videoClips.filter(v =>
        v.title.toLowerCase().includes(q) ||
        v.speaker.toLowerCase().includes(q)
      )
    },
    filteredAudio() {
      if (!this.searchQuery) return this.audioClips
      const q = this.searchQuery.toLowerCase()
      return this.audioClips.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.scholar.toLowerCase().includes(q)
      )
    },
    filteredFaqs() {
      if (!this.searchQuery) return this.faqs
      const q = this.searchQuery.toLowerCase()
      return this.faqs.filter(f =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
      )
    },
    totalSearchResults() {
      return (
        this.filteredGlossary.length +
        this.filteredArticles.length +
        this.filteredVideos.length +
        this.filteredAudio.length +
        this.filteredFaqs.length
      )
    },
  },

  methods: {
    scrollTo(id) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 60
    },
    nextHadith() {
      this.currentHadithIndex = (this.currentHadithIndex + 1) % this.hadiths.length
    },
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
/* ═══════════════════════════════════════════
   TOKENS
═══════════════════════════════════════════ */
:root {
  --g-deep:    #0a1f12;
  --g-forest:  #0f2e1b;
  --g-mid:     #1a4a2e;
  --g-soft:    #2d6a48;
  --g-muted:   #4c9a6e;
  --gold:      #b68b40;
  --gold-lt:   #d4a95a;
  --gold-xlt:  #e8cfa0;
  --ivory:     #f7f3ec;
  --ivory-dk:  #ede5d5;
  --beige:     #f0ead8;
  --text-dk:   #1a1a14;
  --text-md:   #3d3d30;
  --text-lt:   #6b6b58;
  --white:     #ffffff;

  --font-display: 'Georgia', 'Times New Roman', serif;
  --font-body: 'Segoe UI', 'Helvetica Neue', sans-serif;
  --font-arabic: 'Traditional Arabic', 'Amiri', 'Scheherazade New', serif;

  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 40px;

  --shadow-sm: 0 2px 12px rgba(0,0,0,0.06);
  --shadow-md: 0 8px 32px rgba(0,0,0,0.10);
  --shadow-lg: 0 20px 60px rgba(0,0,0,0.14);
  --shadow-gold: 0 4px 24px rgba(182,139,64,0.18);

  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ═══════════════════════════════════════════
   RESET & BASE
═══════════════════════════════════════════ */
.youth-zone *,
.youth-zone *::before,
.youth-zone *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.youth-zone {
  font-family: var(--font-body);
  background: var(--ivory);
  color: var(--text-dk);
  line-height: 1.6;
  overflow-x: hidden;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

/* ═══════════════════════════════════════════
   AMBIENT BACKGROUND
═══════════════════════════════════════════ */
.ambient-bg {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: -1;
  pointer-events: none;
}
.geo-pattern {
  width: 100%;
  height: 100%;
  opacity: 0.03;
}

/* ═══════════════════════════════════════════
   DISCLAIMER STRIP
═══════════════════════════════════════════ */
.disclaimer-strip {
  background: var(--g-forest);
  color: var(--gold-xlt);
  font-size: 0.78rem;
  padding: 8px 32px;
  border-bottom: 1px solid rgba(182,139,64,0.2);
}
.disclaimer-strip .inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
}
.disc-icon {
  color: var(--gold);
  font-size: 1rem;
  flex-shrink: 0;
}

/* ═══════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════ */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 31, 18, 0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(182,139,64,0.15);
  transition: var(--transition);
}
.site-nav.scrolled {
  background: rgba(10, 31, 18, 0.98);
  box-shadow: 0 4px 30px rgba(0,0,0,0.3);
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 40px;
}
.brand {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  flex-shrink: 0;
}
.brand-arabic {
  font-family: var(--font-arabic);
  font-size: 1rem;
  color: var(--gold);
}
.brand-en {
  font-size: 0.65rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
}
.nav-links {
  display: flex;
  list-style: none;
  gap: 8px;
  flex: 1;
}
.nav-links a {
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  padding: 6px 14px;
  border-radius: 100px;
  transition: var(--transition);
}
.nav-links a:hover {
  color: var(--white);
  background: rgba(182,139,64,0.12);
}
.search-toggle {
  background: none;
  border: 1px solid rgba(182,139,64,0.3);
  border-radius: 50%;
  width: 36px; height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--gold-lt);
  transition: var(--transition);
}
.search-toggle:hover {
  background: rgba(182,139,64,0.12);
  border-color: var(--gold);
}
.nav-search-bar {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.nav-search-bar input {
  flex: 1;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(182,139,64,0.25);
  border-radius: 100px;
  padding: 10px 20px;
  color: var(--white);
  font-size: 0.9rem;
  outline: none;
  transition: var(--transition);
}
.nav-search-bar input:focus {
  border-color: var(--gold);
  background: rgba(255,255,255,0.09);
}
.nav-search-bar input::placeholder { color: rgba(255,255,255,0.4); }
.search-count {
  color: var(--gold-lt);
  font-size: 0.8rem;
  white-space: nowrap;
}

/* Search drop transition */
.search-drop-enter-active,
.search-drop-leave-active { transition: all 0.25s ease; }
.search-drop-enter-from,
.search-drop-leave-to { opacity: 0; transform: translateY(-8px); }

/* ═══════════════════════════════════════════
   HERO
═══════════════════════════════════════════ */
.hero {
  min-height: 100vh;
  background: linear-gradient(150deg, var(--g-deep) 0%, var(--g-forest) 40%, var(--g-mid) 100%);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 60px;
  padding: 80px 60px 100px;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 70% at 80% 50%, rgba(182,139,64,0.08) 0%, transparent 70%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 560px;
}
.hero-kicker {
  font-family: var(--font-arabic);
  font-size: 1.4rem;
  color: var(--gold);
  margin-bottom: 28px;
  letter-spacing: 2px;
  opacity: 0.9;
}
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4.2rem);
  font-weight: 400;
  line-height: 1.15;
  color: var(--white);
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}
.hero-title .line { display: block; }
.hero-title .accent {
  color: var(--gold-lt);
  font-style: italic;
}
.hero-sub {
  color: rgba(255,255,255,0.55);
  font-size: 0.95rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 40px;
}
.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 56px;
}
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--gold);
  color: var(--g-deep);
  border: none;
  border-radius: 100px;
  padding: 14px 28px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.3px;
  transition: var(--transition);
  box-shadow: var(--shadow-gold);
}
.btn-primary:hover {
  background: var(--gold-lt);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(182,139,64,0.35);
}
.btn-ghost {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: rgba(255,255,255,0.75);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 100px;
  padding: 14px 28px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
}
.btn-ghost:hover {
  border-color: var(--gold);
  color: var(--gold-xlt);
}
.hero-stats {
  display: flex;
  gap: 40px;
}
.stat { display: flex; flex-direction: column; }
.stat-val {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--gold);
  line-height: 1;
}
.stat-label {
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-top: 4px;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
}
.medallion {
  width: clamp(260px, 35vw, 380px);
  animation: rotate-slow 60s linear infinite;
  opacity: 0.7;
  filter: drop-shadow(0 0 40px rgba(182,139,64,0.15));
}
@keyframes rotate-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.scroll-hint {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: rgba(255,255,255,0.3);
  font-size: 0.65rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  transition: var(--transition);
}
.scroll-hint:hover { color: var(--gold); }
.scroll-line {
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, rgba(182,139,64,0.6), transparent);
  animation: pulse-line 2s ease-in-out infinite;
}
@keyframes pulse-line {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* ═══════════════════════════════════════════
   SECTIONS
═══════════════════════════════════════════ */
.section {
  padding: 100px 0;
  position: relative;
}
.section:nth-child(even) {
  background: var(--beige);
}
.section-label {
  position: absolute;
  top: 40px;
  right: 32px;
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--g-muted);
  font-weight: 600;
}
.section-head {
  margin-bottom: 60px;
}
.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 400;
  color: var(--g-forest);
  line-height: 1.2;
  margin-bottom: 16px;
}
.section-title em {
  font-style: italic;
  color: var(--gold);
}
.section-desc {
  color: var(--text-lt);
  font-size: 1rem;
  max-width: 520px;
  line-height: 1.7;
}

/* ═══════════════════════════════════════════
   GLOSSARY
═══════════════════════════════════════════ */
.glossary-section { background: var(--g-deep); }
.glossary-section .section-label { color: var(--g-muted); }
.glossary-section .section-title { color: var(--ivory); }
.glossary-section .section-title em { color: var(--gold); }
.glossary-section .section-desc { color: rgba(255,255,255,0.45); }

.glossary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.glossary-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(182,139,64,0.15);
  border-radius: var(--radius-md);
  padding: 28px;
  cursor: pointer;
  transition: var(--transition);
  animation: card-fade-in 0.5s ease both;
  animation-delay: var(--delay, 0ms);
}
.glossary-card:hover,
.glossary-card.expanded {
  background: rgba(182,139,64,0.07);
  border-color: rgba(182,139,64,0.4);
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.3);
}
.gc-arabic {
  font-family: var(--font-arabic);
  font-size: 2.4rem;
  color: var(--gold);
  line-height: 1.2;
  margin-bottom: 8px;
}
.gc-term {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold-xlt);
  margin-bottom: 12px;
}
.gc-def {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.6;
  margin-bottom: 16px;
}
.gc-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.gc-source {
  font-size: 0.72rem;
  color: var(--gold);
  background: rgba(182,139,64,0.1);
  padding: 3px 10px;
  border-radius: 100px;
  border: 1px solid rgba(182,139,64,0.2);
}
.gc-verified {
  font-size: 0.72rem;
  color: rgba(100,220,130,0.7);
}
.gc-expand {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(182,139,64,0.15);
  font-size: 0.84rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
}

.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.expand-enter-from, .expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.expand-enter-to, .expand-leave-from {
  opacity: 1;
  max-height: 200px;
}

/* ═══════════════════════════════════════════
   CONTENT HUB
═══════════════════════════════════════════ */
.content-hub { background: var(--ivory); }

.tab-switcher {
  display: flex;
  gap: 8px;
  margin-bottom: 40px;
  border-bottom: 1px solid var(--ivory-dk);
  padding-bottom: 0;
}
.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 12px 20px;
  font-size: 0.88rem;
  color: var(--text-lt);
  cursor: pointer;
  transition: var(--transition);
  margin-bottom: -1px;
}
.tab-btn:hover { color: var(--g-forest); }
.tab-btn.active {
  color: var(--g-forest);
  border-bottom-color: var(--gold);
  font-weight: 600;
}
.tab-icon { font-size: 1rem; }

/* Tab transitions */
.tab-fade-enter-active,
.tab-fade-leave-active { transition: all 0.2s ease; }
.tab-fade-enter-from,
.tab-fade-leave-to { opacity: 0; transform: translateY(6px); }

/* Articles */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.article-card {
  background: var(--white);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--ivory-dk);
  transition: var(--transition);
  animation: card-fade-in 0.4s ease both;
  animation-delay: var(--delay, 0ms);
  display: flex;
  flex-direction: column;
}
.article-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}
.article-card.featured {
  grid-column: span 2;
}
.article-card.featured .ac-image { height: 260px; }
.ac-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}
.ac-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.article-card:hover .ac-image img { transform: scale(1.04); }
.ac-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,31,18,0.6) 0%, transparent 60%);
  display: flex;
  align-items: flex-end;
  padding: 16px;
}
.ac-category {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold-xlt);
  background: rgba(10,31,18,0.6);
  padding: 4px 10px;
  border-radius: 100px;
  border: 1px solid rgba(182,139,64,0.3);
}
.ac-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.ac-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.ac-time {
  font-size: 0.75rem;
  color: var(--text-lt);
}
.ac-ref {
  font-size: 0.72rem;
  color: var(--gold);
}
.ac-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 400;
  color: var(--g-forest);
  line-height: 1.4;
  margin-bottom: 10px;
}
.ac-excerpt {
  font-size: 0.84rem;
  color: var(--text-lt);
  line-height: 1.65;
  flex: 1;
  margin-bottom: 20px;
}
.ac-read {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid var(--gold);
  border-radius: 100px;
  color: var(--gold);
  padding: 7px 16px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  align-self: flex-start;
}
.ac-read:hover {
  background: var(--gold);
  color: var(--g-deep);
}

/* Videos */
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
}
.video-card {
  background: var(--white);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--ivory-dk);
}
.vc-embed {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}
.vc-embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.vc-body { padding: 20px; }
.vc-title {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--g-forest);
  margin-bottom: 8px;
  font-weight: 400;
}
.vc-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}
.vc-speaker { font-size: 0.82rem; color: var(--text-md); }
.vc-source {
  font-size: 0.78rem;
  color: var(--gold);
  background: rgba(182,139,64,0.08);
  padding: 2px 8px;
  border-radius: 100px;
}
.vc-footer { display: flex; justify-content: space-between; align-items: center; }
.tag-verified {
  font-size: 0.72rem;
  color: #3a9960;
  background: rgba(58,153,96,0.1);
  padding: 3px 10px;
  border-radius: 100px;
}
.vc-likes { font-size: 0.8rem; color: var(--text-lt); }

/* Audio */
.audio-list { display: flex; flex-direction: column; gap: 16px; }
.audio-item {
  background: var(--white);
  border: 1px solid var(--ivory-dk);
  border-radius: var(--radius-md);
  padding: 24px;
  display: flex;
  align-items: flex-start;
  gap: 24px;
  transition: var(--transition);
  animation: card-fade-in 0.4s ease both;
  animation-delay: var(--delay, 0ms);
}
.audio-item:hover {
  box-shadow: var(--shadow-sm);
  border-color: rgba(182,139,64,0.3);
}
.ai-num {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--ivory-dk);
  font-weight: 400;
  line-height: 1;
  flex-shrink: 0;
  width: 52px;
}
.ai-info { flex: 1; }
.ai-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 400;
  color: var(--g-forest);
  margin-bottom: 6px;
}
.ai-meta {
  font-size: 0.78rem;
  color: var(--text-lt);
  margin-bottom: 12px;
  display: flex;
  gap: 6px;
  align-items: center;
}
.ai-dot { color: var(--ivory-dk); }
.ai-player {
  width: 100%;
  height: 36px;
  accent-color: var(--gold);
}
.ai-icon { font-size: 1.6rem; flex-shrink: 0; opacity: 0.3; }

/* ═══════════════════════════════════════════
   TOOLS SECTION
═══════════════════════════════════════════ */
.tools-section { background: var(--g-forest); }
.tools-section .section-label { color: rgba(182,139,64,0.5); }
.tools-section .section-title { color: var(--ivory); }
.tools-section .section-title em { color: var(--gold); }
.tools-section .section-desc { color: rgba(255,255,255,0.45); }

.tools-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.panel {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(182,139,64,0.15);
  border-radius: var(--radius-lg);
  padding: 40px;
}
.panel-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--ivory);
  margin-bottom: 28px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(182,139,64,0.15);
}
.dd-grid {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 24px;
}
.dd-divider { background: rgba(182,139,64,0.15); }
.dd-col {}
.dd-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.dd-icon { font-size: 1rem; }
.dd-col h4 {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.dos h4 { color: #6abf82; }
.donts h4 { color: #e07070; }
.dd-col ul { list-style: none; }
.dd-col li {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  font-size: 0.83rem;
  color: rgba(255,255,255,0.6);
  margin-bottom: 12px;
  line-height: 1.5;
}
.dd-check { color: #6abf82; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
.dd-x { color: #e07070; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
.panel-ref {
  margin-top: 24px;
  font-size: 0.73rem;
  color: rgba(255,255,255,0.25);
  font-style: italic;
}

.tool-block {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(182,139,64,0.1);
  border-radius: var(--radius-md);
  padding: 20px;
  margin-bottom: 16px;
}
.tool-block:last-child { margin-bottom: 0; }
.tool-block-head {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--gold-lt);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.hadith-quote {
  font-family: var(--font-display);
  font-size: 0.92rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.65;
  border-left: 2px solid var(--gold);
  padding-left: 16px;
  font-style: italic;
  margin-bottom: 14px;
}
.hadith-quote cite {
  display: block;
  font-size: 0.75rem;
  color: var(--gold);
  font-style: normal;
  margin-top: 8px;
}
.btn-outline-sm {
  background: none;
  border: 1px solid rgba(182,139,64,0.4);
  color: var(--gold-lt);
  border-radius: 100px;
  padding: 6px 16px;
  font-size: 0.78rem;
  cursor: pointer;
  transition: var(--transition);
}
.btn-outline-sm:hover {
  border-color: var(--gold);
  background: rgba(182,139,64,0.1);
}

.prayer-times {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.pt-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  position: relative;
}
.pt-name {
  font-size: 0.68rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
}
.pt-time {
  font-family: var(--font-display);
  font-size: 0.95rem;
  color: rgba(255,255,255,0.55);
}
.pt-item.current .pt-name { color: var(--gold-lt); }
.pt-item.current .pt-time { color: var(--gold); font-weight: 700; }
.pt-dot {
  font-size: 0.4rem;
  color: var(--gold);
  position: absolute;
  bottom: -8px;
}
.prayer-note {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.25);
  font-style: italic;
}

.app-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.app-tag {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.55);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(182,139,64,0.15);
  border-radius: 100px;
  padding: 5px 14px;
  transition: var(--transition);
  cursor: default;
}
.app-tag:hover {
  border-color: rgba(182,139,64,0.4);
  color: var(--gold-xlt);
}

/* ═══════════════════════════════════════════
   FAQ
═══════════════════════════════════════════ */
.faq-section { background: var(--ivory); }

.faq-list { max-width: 740px; }
.faq-item {
  border-bottom: 1px solid var(--ivory-dk);
  cursor: pointer;
  transition: var(--transition);
}
.faq-item.open { border-bottom-color: rgba(182,139,64,0.3); }
.faq-q {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 0;
}
.faq-num {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--gold);
  flex-shrink: 0;
  width: 28px;
}
.faq-text {
  flex: 1;
  font-size: 1rem;
  color: var(--g-forest);
  font-weight: 500;
  line-height: 1.4;
}
.faq-item.open .faq-text { color: var(--g-mid); }
.faq-toggle {
  font-size: 1.3rem;
  color: var(--gold);
  flex-shrink: 0;
  width: 24px;
  text-align: center;
  font-weight: 300;
}
.faq-a {
  padding: 0 0 24px 48px;
  overflow: hidden;
}
.faq-a p {
  font-size: 0.9rem;
  color: var(--text-md);
  line-height: 1.7;
  margin-bottom: 12px;
}
.faq-a cite {
  font-size: 0.76rem;
  color: var(--gold);
  font-style: normal;
}

/* FAQ transition */
.faq-open-enter-active,
.faq-open-leave-active { transition: all 0.3s ease; }
.faq-open-enter-from,
.faq-open-leave-to { opacity: 0; transform: translateY(-8px); }

/* ═══════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════ */
.site-footer {
  background: var(--g-deep);
  position: relative;
  padding: 80px 0 48px;
  border-top: 1px solid rgba(182,139,64,0.15);
}
.footer-geo {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 120px;
}
.footer-geo svg { width: 100%; height: 100%; }
.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr;
  gap: 48px;
  position: relative;
}
.footer-arabic {
  font-family: var(--font-arabic);
  font-size: 2.4rem;
  color: var(--gold);
  display: block;
  margin-bottom: 16px;
}
.footer-brand p {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.65;
  margin-bottom: 8px;
}
.footer-dua {
  font-style: italic;
  color: rgba(255,255,255,0.3) !important;
  margin-top: 16px;
  font-size: 0.82rem !important;
}
.footer-refs h5,
.footer-note h5 {
  font-size: 0.72rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 16px;
}
.footer-refs ol {
  padding-left: 18px;
}
.footer-refs li {
  font-size: 0.81rem;
  color: rgba(255,255,255,0.35);
  margin-bottom: 8px;
  line-height: 1.4;
}
.footer-note p {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.3);
  margin-bottom: 8px;
  line-height: 1.5;
}
.footer-copy {
  font-size: 0.72rem !important;
  color: rgba(255,255,255,0.2) !important;
  margin-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 16px;
}

/* ═══════════════════════════════════════════
   ANIMATIONS
═══════════════════════════════════════════ */
@keyframes card-fade-in {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ═══════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════ */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 80px 40px;
    text-align: center;
    min-height: auto;
  }
  .hero-visual { display: none; }
  .hero-actions { justify-content: center; }
  .hero-stats { justify-content: center; }
  .section-desc { max-width: 100%; }
  .articles-grid { grid-template-columns: repeat(2, 1fr); }
  .article-card.featured { grid-column: span 2; }
  .tools-grid { grid-template-columns: 1fr; }
  .footer-inner { grid-template-columns: 1fr 1fr; }
  .footer-note { grid-column: span 2; }
}

@media (max-width: 768px) {
  .container { padding: 0 20px; }
  .section { padding: 72px 0; }
  .nav-links { display: none; }
  .hero { padding: 60px 20px; }
  .hero-title { font-size: 2.2rem; }
  .hero-actions { flex-direction: column; align-items: center; }
  .glossary-grid { grid-template-columns: 1fr; }
  .articles-grid { grid-template-columns: 1fr; }
  .article-card.featured { grid-column: span 1; }
  .article-card.featured .ac-image { height: 200px; }
  .videos-grid { grid-template-columns: 1fr; }
  .dd-grid { grid-template-columns: 1fr; }
  .dd-divider { height: 1px; width: 100%; }
  .tools-grid { grid-template-columns: 1fr; }
  .panel { padding: 24px; }
  .footer-inner { grid-template-columns: 1fr; }
  .footer-note { grid-column: span 1; }
  .faq-list { max-width: 100%; }
  .section-label { display: none; }
}
</style>