<template>
  <div class="">

    <!-- ─── HERO ─── -->
    <section class="di-hero">
      <div class="hero-geo-bg">
        <svg class="geo-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="star-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="0.8"/>
              <polygon points="50,15 58,38 82,38 63,52 70,75 50,62 30,75 37,52 18,38 42,38" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#star-pattern)"/>
        </svg>
        <div class="hero-orb orb-1"></div>
        <div class="hero-orb orb-2"></div>
        <div class="hero-orb orb-3"></div>
      </div>

      <div class="hero-content">
        <div class="hero-eyebrow">
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text">Scholar-Verified Guide</span>
          <span class="eyebrow-line"></span>
        </div>

        <h1 class="hero-headline">
          <span class="headline-arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
          <span class="headline-main">Discover<br><em>Islam</em></span>
        </h1>

        <p class="hero-desc">
          A comprehensive, deeply researched guide to understanding Islam — its beliefs, pillars, practices, and eternal wisdom.
        </p>

        <!-- Search -->
        <div class="hero-search-wrap">
          <div class="hero-search-box" :class="{ focused: searchFocused }">
            <svg class="search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              v-model="searchQuery"
              type="text"
              class="search-inp"
              placeholder="Search pillars, prayers, prophets…"
              @focus="searchFocused = true"
              @blur="searchFocused = false"
              @keydown.escape="searchQuery = ''"
            />
            <button class="search-go" @click="triggerSearch">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
          <transition name="dropdown">
            <div v-if="filteredSections.length > 0" class="search-dropdown">
              <div
                v-for="h in filteredSections"
                :key="h.id"
                class="search-hit"
                @click="scrollToSection(h.id)"
              >
                <span class="hit-icon">{{ h.emoji }}</span>
                <div class="hit-info">
                  <div class="hit-title">{{ h.title }}</div>
                  <div class="hit-excerpt">{{ h.excerpt }}</div>
                </div>
                <svg class="hit-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </transition>
        </div>

        <!-- Stats -->
        <div class="hero-pillars">
          <div class="pillar-chip" v-for="chip in heroChips" :key="chip.label">
            <span class="chip-num">{{ chip.num }}</span>
            <span class="chip-label">{{ chip.label }}</span>
          </div>
        </div>
      </div>

      <div class="hero-scroll-hint">
        <div class="scroll-dot"></div>
        <span>Scroll to explore</span>
      </div>

      <div class="hero-wave-bottom">
        <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C240,90 480,10 720,50 C960,90 1200,20 1440,60 L1440,100 L0,100Z" fill="#f4f9f5"/>
        </svg>
      </div>
    </section>

    <!-- ─── MAIN ─── -->
    <main class="di-main">

      <!-- Disclaimer -->
      <div class="di-disclaimer">
        <span class="disclaimer-shield">🛡</span>
        <p><strong>Scholarly Verified:</strong> Content drawn from the Quran, Sahih Bukhari, Sahih Muslim, and established scholarly consensus. For personal rulings, consult a qualified Islamic scholar.</p>
      </div>

      <!-- ── WHAT IS ISLAM ── -->
      <section class="di-section" id="basics" ref="sectionEls">
        <div class="section-label-row">
          <span class="section-num">01</span>
          <span class="section-rule"></span>
          <span class="section-tag">Foundation</span>
        </div>
        <h2 class="section-title">What is <em>Islam?</em></h2>
        <p class="section-lead">The word Islam comes from the Arabic root S-L-M — meaning <strong>peace</strong> and <strong>submission</strong>. It is a complete way of life centred on submission to the will of Allah (God).</p>

        <div class="twin-grid">
          <div class="twin-card card-faith">
            <div class="twin-card-header">
              <span class="tc-icon">✦</span>
              <h3>6 Pillars of Faith <em>(Iman)</em></h3>
            </div>
            <ul class="check-list">
              <li><span class="cl-dot"></span>Belief in Allah — the One God</li>
              <li><span class="cl-dot"></span>Belief in the Angels (Mala'ika)</li>
              <li><span class="cl-dot"></span>Belief in the Revealed Books (Kutub)</li>
              <li><span class="cl-dot"></span>Belief in the Prophets &amp; Messengers</li>
              <li><span class="cl-dot"></span>Belief in the Day of Judgement</li>
              <li><span class="cl-dot"></span>Belief in Divine Decree (Qadar)</li>
            </ul>
            <div class="ref-pill">📖 Sahih Muslim 8 — Hadith of Jibril</div>
          </div>
          <div class="twin-card card-pillars">
            <div class="twin-card-header">
              <span class="tc-icon">🕌</span>
              <h3>5 Pillars of Islam <em>(Arkan)</em></h3>
            </div>
            <ul class="check-list">
              <li><span class="cl-dot gold"></span>Shahada — Declaration of Faith</li>
              <li><span class="cl-dot gold"></span>Salah — Five Daily Prayers</li>
              <li><span class="cl-dot gold"></span>Zakat — Obligatory Charity (2.5%)</li>
              <li><span class="cl-dot gold"></span>Sawm — Fasting during Ramadan</li>
              <li><span class="cl-dot gold"></span>Hajj — Pilgrimage to Makkah</li>
            </ul>
            <div class="ref-pill">📖 Sahih Bukhari 8 — Pillars of Islam</div>
          </div>
        </div>

        <div class="photo-duo">
          <figure class="photo-fig">
            <img src="https://images.pexels.com/photos/2715373/pexels-photo-2715373.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Mosque architecture" loading="lazy" />
            <figcaption>Sacred Architecture</figcaption>
          </figure>
          <figure class="photo-fig">
            <img src="https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Quran recitation" loading="lazy" />
            <figcaption>Divine Revelation</figcaption>
          </figure>
        </div>

        <div class="video-embed">
          <iframe src="https://www.youtube.com/embed/1w2KtO13m_4?rel=0" title="Introduction to Islam" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
          <div class="video-label">▶ Introduction to Islam — Scholar Verified</div>
        </div>
      </section>

      <!-- ── SHAHADA ── -->
      <section class="di-section" id="shahada" ref="sectionEls">
        <div class="section-label-row">
          <span class="section-num">02</span>
          <span class="section-rule"></span>
          <span class="section-tag">First Pillar</span>
        </div>
        <h2 class="section-title">The <em>Shahada</em></h2>

        <div class="shahada-monument">
          <div class="shahada-geo-ring"></div>
          <div class="shahada-inner">
            <p class="shd-arabic">أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ</p>
            <p class="shd-roman">Ash-hadu an lā ilāha illallāh, wa ash-hadu anna Muḥammadan rasūlullāh</p>
            <p class="shd-trans">"I bear witness that there is no god but Allah, and I bear witness that Muhammad is the messenger of Allah."</p>
            <p class="shd-body">The Shahada is the gateway into Islam. Uttering it with sincere conviction — understanding that Allah alone deserves worship and that Muhammad ﷺ is His final messenger — makes one a Muslim. It echoes through the Adhan five times daily.</p>
            <div class="ref-pill centered">📖 Sahih Bukhari 1 — Conditions discussed by Imam an-Nawawi</div>
          </div>
        </div>
      </section>

      <!-- ── ALLAH ── -->
      <section class="di-section" id="allah" ref="sectionEls">
        <div class="section-label-row">
          <span class="section-num">03</span>
          <span class="section-rule"></span>
          <span class="section-tag">Theology</span>
        </div>
        <h2 class="section-title">Who is <em>Allah?</em></h2>

        <div class="split-layout">
          <div class="split-text">
            <p class="section-lead">Allah is the Arabic word for God — the One, Unique, Eternal Creator of all existence. Islam teaches that Allah has no partners, no children, no equals, and is unlike anything in creation.</p>
            <p class="body-copy">He is all-knowing (Al-ʿAlim), all-powerful (Al-Qadir), and ever-merciful (Ar-Rahman, Ar-Rahim). Allah communicates with humanity through prophets and revealed scriptures.</p>
            <div class="quran-quote">
              <span class="qq-mark">"</span>
              <p>He is Allah, other than whom there is no deity, Knower of the unseen and the witnessed. He is the Entirely Merciful, the Especially Merciful.</p>
              <cite>— Quran 59:22</cite>
            </div>
          </div>
          <div class="split-names">
            <h4 class="names-title">99 Beautiful Names <em>(Asma ul-Husna)</em></h4>
            <div class="names-cloud">
              <span class="name-tag" v-for="name in allahNames" :key="name.ar" :title="name.en">
                <span class="name-ar">{{ name.ar }}</span>
                <span class="name-en">{{ name.en }}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── PROPHET ── -->
      <section class="di-section" id="prophet" ref="sectionEls">
        <div class="section-label-row">
          <span class="section-num">04</span>
          <span class="section-rule"></span>
          <span class="section-tag">Prophethood</span>
        </div>
        <h2 class="section-title">Prophet <em>Muhammad ﷺ</em></h2>

        <div class="prophet-layout">
          <div class="prophet-img-col">
            <div class="prophet-img-frame">
              <img src="https://images.pexels.com/photos/2170756/pexels-photo-2170756.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Masjid an-Nabawi" loading="lazy" />
              <div class="img-caption-overlay">Masjid an-Nabawi — Madinah</div>
            </div>
          </div>
          <div class="prophet-text-col">
            <p class="body-copy">Muhammad ibn Abdullah ﷺ was born in Makkah in 570 CE. At 40, he received his first revelation through Angel Jibreel. Over 23 years he conveyed the complete message of Islam. He is the Seal of the Prophets — no messenger will come after him.</p>
            <h4 class="sub-heading">Key Teachings ﷺ</h4>
            <ul class="star-list">
              <li>Monotheism — worship Allah alone without partners</li>
              <li>Kindness to family, neighbours, and all creation</li>
              <li>Honesty and trustworthiness in all dealings</li>
              <li>Justice, equality, and the rights of the poor</li>
              <li>Seeking knowledge as a duty upon every Muslim</li>
              <li>"I was only sent as a mercy to the worlds"</li>
            </ul>
            <div class="twin-refs">
              <div class="ref-pill">📖 Quran 21:107 — Mercy to the worlds</div>
              <div class="ref-pill">📖 Sahih Muslim 2564 — Love for others</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── QURAN ── -->
      <section class="di-section" id="quran" ref="sectionEls">
        <div class="section-label-row">
          <span class="section-num">05</span>
          <span class="section-rule"></span>
          <span class="section-tag">Scripture</span>
        </div>
        <h2 class="section-title">The Holy <em>Quran</em></h2>

        <div class="split-layout reverse">
          <div class="split-text">
            <p class="section-lead">The Quran is the literal word of Allah (SWT), revealed to Prophet Muhammad ﷺ over 23 years through Angel Jibreel — the primary source of Islamic law, ethics, and spiritual guidance.</p>
            <ul class="fact-strips">
              <li><span class="fs-num">114</span><span class="fs-label">Surahs (Chapters)</span></li>
              <li><span class="fs-num">6,236</span><span class="fs-label">Ayaat (Verses)</span></li>
              <li><span class="fs-num">30</span><span class="fs-label">Juz (Parts)</span></li>
              <li><span class="fs-num">10M+</span><span class="fs-label">Huffaz worldwide</span></li>
            </ul>
            <div class="quran-quote">
              <span class="qq-mark">"</span>
              <p>This is the Book about which there is no doubt, a guidance for those conscious of Allah.</p>
              <cite>— Quran 2:2</cite>
            </div>
          </div>
          <div class="split-img">
            <div class="img-frame-green">
              <img src="https://images.pexels.com/photos/3832028/pexels-photo-3832028.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Open Quran" loading="lazy" />
            </div>
          </div>
        </div>

        <div class="video-embed">
          <iframe src="https://www.youtube.com/embed/YDNT2R5_nbE?rel=0" title="Quran Recitation" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
          <div class="video-label">▶ Beautiful Quran Recitation</div>
        </div>
      </section>

      <!-- ── SALAH ── -->
      <section class="di-section" id="salah" ref="sectionEls">
        <div class="section-label-row">
          <span class="section-num">06</span>
          <span class="section-rule"></span>
          <span class="section-tag">Second Pillar</span>
        </div>
        <h2 class="section-title"><em>Salah</em> — Five Daily Prayers</h2>

        <div class="prayer-timeline">
          <div class="prayer-card" v-for="prayer in prayers" :key="prayer.name" :style="{ '--prayer-color': prayer.color, '--prayer-bg': prayer.bg }">
            <div class="prayer-sky">{{ prayer.sky }}</div>
            <div class="prayer-time-badge">{{ prayer.time }}</div>
            <div class="prayer-name">{{ prayer.name }}</div>
            <div class="prayer-arabic">{{ prayer.arabic }}</div>
            <div class="prayer-rakah">{{ prayer.rakah }} Rak'ahs</div>
          </div>
        </div>

        <div class="split-layout" style="margin-top: 3rem">
          <div class="split-text">
            <p class="body-copy">Salah is the ritual prayer performed five times daily at prescribed times, involving specific postures, Quranic recitations, and remembrance of Allah. Wudu (ritual ablution) must be observed beforehand. Prayer faces the Qiblah — the direction of the Ka'bah in Makkah.</p>
            <div class="quran-quote">
              <span class="qq-mark">"</span>
              <p>Maintain with care the [obligatory] prayers and stand before Allah, devoutly obedient.</p>
              <cite>— Quran 2:238</cite>
            </div>
          </div>
          <div class="split-img">
            <div class="img-frame-green">
              <img src="https://images.pexels.com/photos/2695984/pexels-photo-2695984.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Muslim praying" loading="lazy" />
            </div>
          </div>
        </div>

        <div class="video-embed compact">
          <iframe src="https://www.youtube.com/embed/-K6HlXzJegk?rel=0" title="How to Pray" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
          <div class="video-label">▶ How to Perform Salah — Step by Step</div>
        </div>
      </section>

      <!-- ── ZAKAT ── -->
      <section class="di-section" id="zakat" ref="sectionEls">
        <div class="section-label-row">
          <span class="section-num">07</span>
          <span class="section-rule"></span>
          <span class="section-tag">Third Pillar</span>
        </div>
        <h2 class="section-title"><em>Zakat</em> — Obligatory Charity</h2>

        <div class="split-layout">
          <div class="split-text">
            <p class="section-lead">Zakat is the compulsory giving of <strong>2.5%</strong> of one's total accumulated wealth above the Nisab threshold to eligible recipients — purifying wealth and reducing inequality.</p>
            <p class="body-copy">It is due once a year and distinct from voluntary charity (Sadaqah). The Nisab threshold equals approximately 87.48g of gold in value.</p>
            <div class="quran-quote">
              <span class="qq-mark">"</span>
              <p>Take from their wealth a charity by which you purify them and cause them to increase.</p>
              <cite>— Quran 9:103</cite>
            </div>
          </div>
          <div class="split-text">
            <h4 class="sub-heading">8 Eligible Recipients <em>(Quran 9:60)</em></h4>
            <ul class="zakat-grid">
              <li v-for="recipient in zakatRecipients" :key="recipient">{{ recipient }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ── SAWM ── -->
      <section class="di-section" id="sawm" ref="sectionEls">
        <div class="section-label-row">
          <span class="section-num">08</span>
          <span class="section-rule"></span>
          <span class="section-tag">Fourth Pillar</span>
        </div>
        <h2 class="section-title"><em>Sawm</em> — Fasting in Ramadan</h2>

        <div class="split-layout reverse">
          <div class="split-text">
            <p class="section-lead">Muslims abstain from food, drink, smoking, and sexual relations from Fajr (dawn) to Maghrib (sunset) during Ramadan — the 9th month of the Hijri calendar.</p>
            <ul class="star-list">
              <li>Spiritual purification and closeness to Allah</li>
              <li>Development of self-discipline and gratitude</li>
              <li>Empathy for those who suffer from hunger</li>
              <li>Laylat al-Qadr — better than 1,000 months</li>
              <li>Increased Quran recitation and Tarawih prayers</li>
              <li>Community gathering and spiritual renewal</li>
            </ul>
            <div class="quran-quote">
              <span class="qq-mark">"</span>
              <p>Decreed upon you is fasting as it was decreed upon those before you that you may become righteous.</p>
              <cite>— Quran 2:183</cite>
            </div>
          </div>
          <div class="split-img">
            <div class="img-frame-green">
              <img src="https://images.pexels.com/photos/2804380/pexels-photo-2804380.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Iftar meal at sunset" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <!-- ── HAJJ ── -->
      <section class="di-section" id="hajj" ref="sectionEls">
        <div class="section-label-row">
          <span class="section-num">09</span>
          <span class="section-rule"></span>
          <span class="section-tag">Fifth Pillar</span>
        </div>
        <h2 class="section-title"><em>Hajj</em> — Pilgrimage to Makkah</h2>

        <div class="split-layout">
          <div class="split-text">
            <p class="section-lead">Obligatory at least once in a lifetime for every adult Muslim who is physically and financially able, Hajj takes place in Dhul Hijjah — the 12th Islamic month.</p>
            <p class="body-copy">Pilgrims wear simple white garments (Ihram) symbolising equality before Allah, commemorating the trials of Prophet Ibrahim ﷺ and his family.</p>
            <div class="quran-quote">
              <span class="qq-mark">"</span>
              <p>And [due] to Allah from the people is a pilgrimage to the House — for whoever is able to find thereto a way.</p>
              <cite>— Quran 3:97</cite>
            </div>
          </div>
          <div class="split-text">
            <h4 class="sub-heading">Key Rituals</h4>
            <ul class="hajj-steps">
              <li v-for="(step, i) in hajjSteps" :key="step">
                <span class="step-num">{{ i + 1 }}</span>
                <span>{{ step }}</span>
              </li>
            </ul>
          </div>
        </div>

        <figure class="hero-photo">
          <img src="https://images.pexels.com/photos/5997945/pexels-photo-5997945.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Ka'bah – Makkah" loading="lazy" />
          <figcaption>The Ka'bah — Al-Masjid Al-Haram, Makkah</figcaption>
        </figure>
      </section>

      <!-- ── AFTERLIFE ── -->
      <section class="di-section" id="afterlife" ref="sectionEls">
        <div class="section-label-row">
          <span class="section-num">10</span>
          <span class="section-rule"></span>
          <span class="section-tag">Eschatology</span>
        </div>
        <h2 class="section-title">The <em>Afterlife</em> (Akhirah)</h2>

        <div class="split-layout reverse">
          <div class="split-text">
            <p class="section-lead">Islam teaches that this worldly life is temporary and that every soul will be resurrected and judged for their deeds on the Day of Judgement (Yawm al-Qiyama).</p>
            <p class="body-copy">The afterlife (Akhirah) is eternal and far greater than this world. The Quran describes Jannah (Paradise) as a place of unimaginable bliss and Jahannam (Hell) as a place of punishment.</p>
            <div class="quran-quote">
              <span class="qq-mark">"</span>
              <p>Every soul will taste death, and you will only be given your full compensation on the Day of Resurrection.</p>
              <cite>— Quran 3:185</cite>
            </div>
          </div>
          <div class="split-text">
            <h4 class="sub-heading">Stages of the Afterlife</h4>
            <ul class="afterlife-stages">
              <li v-for="stage in afterlifeStages" :key="stage.name">
                <span class="stage-icon">{{ stage.icon }}</span>
                <div>
                  <strong>{{ stage.name }}</strong>
                  <p>{{ stage.desc }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ── DO'S & DON'TS ── -->
      <section class="di-section" id="dosdonts" ref="sectionEls">
        <div class="section-label-row">
          <span class="section-num">11</span>
          <span class="section-rule"></span>
          <span class="section-tag">Islamic Law</span>
        </div>
        <h2 class="section-title">Do's &amp; <em>Don'ts</em></h2>

        <div class="twin-grid">
          <div class="twin-card card-dos">
            <div class="twin-card-header">
              <span class="tc-icon">✓</span>
              <h3>Recommended <em>(Mustahabb / Fard)</em></h3>
            </div>
            <ul class="check-list">
              <li v-for="item in dosList" :key="item"><span class="cl-dot"></span>{{ item }}</li>
            </ul>
          </div>
          <div class="twin-card card-donts">
            <div class="twin-card-header">
              <span class="tc-icon red">✕</span>
              <h3>Prohibited <em>(Haram)</em></h3>
            </div>
            <ul class="check-list">
              <li v-for="item in dontsList" :key="item"><span class="cl-dot red"></span>{{ item }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ── FAQ ── -->
      <section class="di-section" id="faq" ref="sectionEls">
        <div class="section-label-row">
          <span class="section-num">12</span>
          <span class="section-rule"></span>
          <span class="section-tag">Questions</span>
        </div>
        <h2 class="section-title">Common <em>Questions</em></h2>
        <p class="section-lead" style="margin-bottom: 2.5rem">Answered with care, nuance, and scholarly grounding.</p>

        <div class="faq-accordion">
          <div v-for="(faq, i) in faqs" :key="i" class="faq-entry" :class="{ open: faq.open }">
            <button class="faq-trigger" @click="toggleFaq(i)">
              <span class="faq-q-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="faq-q-text">{{ faq.question }}</span>
              <span class="faq-toggle-icon">{{ faq.open ? '−' : '+' }}</span>
            </button>
            <transition name="faq-expand">
              <div v-if="faq.open" class="faq-body">{{ faq.answer }}</div>
            </transition>
          </div>
        </div>
      </section>

      <!-- ── RESOURCES ── -->
      <section class="di-section" id="resources" ref="sectionEls">
        <div class="section-label-row">
          <span class="section-num">13</span>
          <span class="section-rule"></span>
          <span class="section-tag">Resources</span>
        </div>
        <h2 class="section-title">Apps &amp; <em>Learning Resources</em></h2>

        <div class="twin-grid">
          <div class="twin-card">
            <div class="twin-card-header">
              <span class="tc-icon">📱</span>
              <h3>Recommended Apps</h3>
            </div>
            <ul class="resource-list">
              <li v-for="app in apps" :key="app.name">
                <div class="res-icon">{{ app.icon }}</div>
                <div>
                  <strong>{{ app.name }}</strong>
                  <p>{{ app.desc }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="twin-card">
            <div class="twin-card-header">
              <span class="tc-icon">🌐</span>
              <h3>Trusted Websites &amp; Channels</h3>
            </div>
            <ul class="resource-list">
              <li v-for="site in websites" :key="site.name">
                <div class="res-icon">{{ site.icon }}</div>
                <div>
                  <a :href="site.url" target="_blank" rel="noopener">{{ site.name }}</a>
                  <p>{{ site.desc }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ── CLOSING ── -->
      <div class="di-closing">
        <div class="closing-geo"></div>
        <span class="closing-crescent">☽</span>
        <blockquote>
          "Whoever treads a path seeking knowledge, Allah will make easy for him a path to Paradise."
        </blockquote>
        <cite>— Prophet Muhammad ﷺ &nbsp;|&nbsp; Sahih Muslim 2699</cite>
        <p class="closing-attribution">Content compiled from the Quran, Sahih Bukhari, Sahih Muslim, and scholarly consensus. For educational purposes only. Please consult a qualified Islamic scholar for personal religious guidance.</p>
      </div>

    </main>
  </div>
</template>

<script>
export default {
  name: 'DiscoverIslam',
  data() {
    return {
      navScrolled: false,
      mobileMenuOpen: false,
      searchQuery: '',
      searchFocused: false,

      heroChips: [
        { num: '6', label: 'Pillars of Faith' },
        { num: '5', label: 'Pillars of Islam' },
        { num: '114', label: 'Surahs in Quran' },
        { num: '99', label: 'Names of Allah' },
      ],

      sections: [
        { id: 'basics', emoji: '☪', title: 'What is Islam?', excerpt: 'The complete way of life — submission to Allah, covering core beliefs and five pillars.' },
        { id: 'shahada', emoji: '🌙', title: 'The Shahada', excerpt: 'The declaration of faith — the first and most fundamental pillar.' },
        { id: 'allah', emoji: '✦', title: 'Who is Allah?', excerpt: 'The One, Unique, Eternal Creator — 99 names, no partners.' },
        { id: 'prophet', emoji: '⭐', title: 'Prophet Muhammad ﷺ', excerpt: 'The final messenger of Allah, born in Makkah 570 CE.' },
        { id: 'quran', emoji: '📖', title: 'The Holy Quran', excerpt: '114 chapters, 6,236 verses — literal word of Allah.' },
        { id: 'salah', emoji: '🕌', title: 'Salah — Daily Prayers', excerpt: 'Five prayers daily: Fajr, Dhuhr, Asr, Maghrib, Isha.' },
        { id: 'zakat', emoji: '💛', title: 'Zakat — Charity', excerpt: '2.5% of savings given to those in need each year.' },
        { id: 'sawm', emoji: '🌙', title: 'Sawm — Fasting', excerpt: 'Month-long fast during Ramadan, the 9th Islamic month.' },
        { id: 'hajj', emoji: '🕋', title: 'Hajj — Pilgrimage', excerpt: 'Once-in-a-lifetime journey to Makkah in Dhul Hijjah.' },
        { id: 'afterlife', emoji: '⏳', title: 'The Afterlife', excerpt: 'Resurrection, Judgement, Jannah and Jahannam.' },
        { id: 'dosdonts', emoji: '📋', title: "Do's & Don'ts", excerpt: 'Recommended and prohibited actions in Islamic law.' },
        { id: 'faq', emoji: '❓', title: 'FAQ', excerpt: 'Common questions answered with scholarly grounding.' },
        { id: 'resources', emoji: '📱', title: 'Apps & Resources', excerpt: 'Muslim Pro, Quran.com, SeekersGuidance, Yaqeen and more.' },
      ],

      // All 99 Names of Allah with Arabic and English transliterations
      allahNames: [
        { ar: 'الرَّحْمَٰن', en: 'Ar-Rahman — The Most Gracious' },
        { ar: 'الرَّحِيم', en: 'Ar-Rahim — The Most Merciful' },
        { ar: 'الْمَلِك', en: 'Al-Malik — The King' },
        { ar: 'الْقُدُّوس', en: 'Al-Quddus — The Most Holy' },
        { ar: 'السَّلَام', en: 'As-Salam — The Source of Peace' },
        { ar: 'الْمُؤْمِن', en: 'Al-Mumin — The Guardian of Faith' },
        { ar: 'الْمُهَيْمِن', en: 'Al-Muhaymin — The Protector' },
        { ar: 'الْعَزِيز', en: 'Al-Aziz — The Almighty' },
        { ar: 'الْجَبَّار', en: 'Al-Jabbar — The Compeller' },
        { ar: 'الْمُتَكَبِّر', en: 'Al-Mutakabbir — The Majestic' },
        { ar: 'الْخَالِق', en: 'Al-Khaliq — The Creator' },
        { ar: 'الْبَارِئ', en: "Al-Bari' — The Originator" },
        { ar: 'الْمُصَوِّر', en: 'Al-Musawwir — The Fashioner' },
        { ar: 'الْغَفَّار', en: 'Al-Ghaffar — The Forgiving' },
        { ar: 'الْقَهَّار', en: 'Al-Qahhar — The Subduer' },
        { ar: 'الْوَهَّاب', en: 'Al-Wahhab — The Bestower' },
        { ar: 'الرَّزَّاق', en: 'Ar-Razzaq — The Provider' },
        { ar: 'الْفَتَّاح', en: 'Al-Fattah — The Opener' },
        { ar: 'الْعَلِيم', en: "Al-'Alim — The All-Knowing" },
        { ar: 'الْقَابِض', en: 'Al-Qabid — The Withholder' },
        { ar: 'الْبَاسِط', en: 'Al-Basit — The Extender' },
        { ar: 'الْخَافِض', en: 'Al-Khafid — The Reducer' },
        { ar: 'الرَّافِع', en: "Al-Rafi' — The Exalter" },
        { ar: 'الْمُعِزّ', en: "Al-Mu'izz — The Honourer" },
        { ar: 'الْمُذِلّ', en: 'Al-Mudhill — The Humiliator' },
        { ar: 'السَّمِيع', en: 'As-Sami — The All-Hearing' },
        { ar: 'الْبَصِير', en: 'Al-Basir — The All-Seeing' },
        { ar: 'الْحَكَم', en: 'Al-Hakam — The Judge' },
        { ar: 'الْعَدْل', en: 'Al-Adl — The Just' },
        { ar: 'اللَّطِيف', en: 'Al-Latif — The Subtle' },
        { ar: 'الْخَبِير', en: 'Al-Khabir — The Aware' },
        { ar: 'الْحَلِيم', en: 'Al-Halim — The Forbearing' },
        { ar: 'الْعَظِيم', en: 'Al-Azim — The Magnificent' },
        { ar: 'الْغَفُور', en: 'Al-Ghafur — The Forgiving' },
        { ar: 'الشَّكُور', en: 'Ash-Shakur — The Appreciative' },
        { ar: 'الْعَلِيّ', en: "Al-'Ali — The Most High" },
        { ar: 'الْكَبِير', en: 'Al-Kabir — The Grand' },
        { ar: 'الْحَفِيظ', en: 'Al-Hafiz — The Preserver' },
        { ar: 'الْمُقِيت', en: 'Al-Muqit — The Sustainer' },
        { ar: 'الْحَسِيب', en: 'Al-Hasib — The Reckoner' },
        { ar: 'الْجَلِيل', en: 'Al-Jalil — The Majestic' },
        { ar: 'الْكَرِيم', en: 'Al-Karim — The Generous' },
        { ar: 'الرَّقِيب', en: 'Ar-Raqib — The Watchful' },
        { ar: 'الْمُجِيب', en: 'Al-Mujib — The Responder' },
        { ar: 'الْوَاسِع', en: 'Al-Wasi — The Vast' },
        { ar: 'الْحَكِيم', en: 'Al-Hakim — The Wise' },
        { ar: 'الْوَدُود', en: 'Al-Wadud — The Loving' },
        { ar: 'الْمَجِيد', en: 'Al-Majid — The Glorious' },
        { ar: 'الْبَاعِث', en: 'Al-Baith — The Resurrector' },
        { ar: 'الشَّهِيد', en: 'Ash-Shahid — The Witness' },
        { ar: 'الْحَقّ', en: 'Al-Haqq — The Truth' },
        { ar: 'الْوَكِيل', en: 'Al-Wakil — The Trustee' },
        { ar: 'الْقَوِيّ', en: "Al-Qawiyy — The Strong" },
        { ar: 'الْمَتِين', en: 'Al-Matin — The Firm' },
        { ar: 'الْوَلِيّ', en: "Al-Waliyy — The Protecting Friend" },
        { ar: 'الْحَمِيد', en: 'Al-Hamid — The Praiseworthy' },
        { ar: 'الْمُحْصِي', en: 'Al-Muhsi — The Counter' },
        { ar: 'الْمُبْدِئ', en: "Al-Mubdi' — The Originator" },
        { ar: 'الْمُعِيد', en: 'Al-Muid — The Restorer' },
        { ar: 'الْمُحْيِي', en: 'Al-Muhyi — The Giver of Life' },
        { ar: 'الْمُمِيت', en: 'Al-Mumit — The Taker of Life' },
        { ar: 'الْحَيّ', en: 'Al-Hayy — The Ever-Living' },
        { ar: 'الْقَيُّوم', en: 'Al-Qayyum — The Self-Subsisting' },
        { ar: 'الْوَاجِد', en: 'Al-Wajid — The Finder' },
        { ar: 'الْمَاجِد', en: 'Al-Majid — The Noble' },
        { ar: 'الْوَاحِد', en: 'Al-Wahid — The One' },
        { ar: 'الصَّمَد', en: 'As-Samad — The Eternal' },
        { ar: 'الْقَادِر', en: 'Al-Qadir — The Able' },
        { ar: 'الْمُقْتَدِر', en: 'Al-Muqtadir — The Powerful' },
        { ar: 'الْمُقَدِّم', en: 'Al-Muqaddim — The Expediter' },
        { ar: 'الْمُؤَخِّر', en: 'Al-Muakhkhir — The Delayer' },
        { ar: 'الأَوَّل', en: 'Al-Awwal — The First' },
        { ar: 'الآخِر', en: 'Al-Akhir — The Last' },
        { ar: 'الظَّاهِر', en: 'Az-Zahir — The Manifest' },
        { ar: 'الْبَاطِن', en: 'Al-Batin — The Hidden' },
        { ar: 'الْوَالِي', en: 'Al-Wali — The Governor' },
        { ar: 'الْمُتَعَالِي', en: "Al-Muta'ali — The Most Exalted" },
        { ar: 'الْبَرّ', en: 'Al-Barr — The Source of Goodness' },
        { ar: 'التَّوَّاب', en: 'At-Tawwab — The Ever-Pardoning' },
        { ar: 'الْمُنْتَقِم', en: 'Al-Muntaqim — The Avenger' },
        { ar: 'الْعَفُوّ', en: "Al-'Afuww — The Pardoner" },
        { ar: 'الرَّؤُوف', en: "Ar-Ra'uf — The Compassionate" },
        { ar: 'مَالِكُ الْمُلْك', en: 'Malik-ul-Mulk — Master of the Kingdom' },
        { ar: 'ذُو الْجَلَال', en: 'Dhul Jalali — Lord of Majesty' },
        { ar: 'الْمُقْسِط', en: 'Al-Muqsit — The Equitable' },
        { ar: 'الْجَامِع', en: "Al-Jami' — The Gatherer" },
        { ar: 'الْغَنِيّ', en: 'Al-Ghani — The Self-Sufficient' },
        { ar: 'الْمُغْنِي', en: 'Al-Mughni — The Enricher' },
        { ar: 'الْمَانِع', en: "Al-Mani' — The Preventer" },
        { ar: 'الضَّارّ', en: 'Ad-Darr — The Distresser' },
        { ar: 'النَّافِع', en: 'An-Nafi — The Propitious' },
        { ar: 'النُّور', en: 'An-Nur — The Light' },
        { ar: 'الْهَادِي', en: 'Al-Hadi — The Guide' },
        { ar: 'الْبَدِيع', en: "Al-Badi' — The Originator" },
        { ar: 'الْبَاقِي', en: 'Al-Baqi — The Everlasting' },
        { ar: 'الْوَارِث', en: 'Al-Warith — The Inheritor' },
        { ar: 'الرَّشِيد', en: 'Ar-Rashid — The Righteous Teacher' },
        { ar: 'الصَّبُور', en: 'As-Sabur — The Patient' },
      ],

      prayers: [
        { name: 'Fajr', arabic: 'الفجر', time: 'Dawn', rakah: 2, sky: '🌤', color: '#e8956d', bg: '#fff5ef' },
        { name: 'Dhuhr', arabic: 'الظهر', time: 'Midday', rakah: 4, sky: '☀️', color: '#c49a1a', bg: '#fffbec' },
        { name: 'Asr', arabic: 'العصر', time: 'Afternoon', rakah: 4, sky: '🌅', color: '#d47a44', bg: '#fff3e8' },
        { name: 'Maghrib', arabic: 'المغرب', time: 'Sunset', rakah: 3, sky: '🌆', color: '#9d60d4', bg: '#f8f0ff' },
        { name: 'Isha', arabic: 'العشاء', time: 'Night', rakah: 4, sky: '🌙', color: '#3a5fa8', bg: '#eef3ff' },
      ],

      zakatRecipients: [
        'The poor (Fuqara)', 'The needy (Masakin)', 'Zakat administrators',
        'Those to be reconciled', 'To free captives', 'Those in debt (Gharimin)',
        'In the cause of Allah', 'The stranded traveller',
      ],

      hajjSteps: [
        'Entering Ihram — sacred state of purity',
        'Tawaf — circling the Ka\'bah 7 times',
        'Sa\'i — walking between Safa & Marwa',
        'Standing at Arafat — Day of Arafah',
        'Overnight stay at Muzdalifah',
        'Stoning of the Jamarat',
      ],

      afterlifeStages: [
        { icon: '⚰', name: 'Barzakh', desc: 'The intermediate state in the grave after death.' },
        { icon: '📯', name: 'The Trumpet Blow', desc: 'The end of this world — all creation perishes.' },
        { icon: '🌅', name: 'Resurrection', desc: 'All souls raised on the plains of Mahshar.' },
        { icon: '⚖', name: 'The Scales', desc: 'Deeds weighed on the Mizan with perfect justice.' },
        { icon: '🌉', name: 'Al-Sirat', desc: 'The bridge over Hell crossed by all souls.' },
        { icon: '🌺', name: 'Jannah or Jahannam', desc: 'Eternal Paradise or Hell based on the reckoning.' },
      ],

      dosList: [
        'Pray the five daily prayers on time',
        'Recite Bismillah before any action',
        'Greet others with "As-salamu alaykum"',
        'Be kind and respectful to parents',
        'Give in charity — obligatory and voluntary',
        'Maintain family ties (Silat ar-Rahim)',
        'Seek knowledge throughout life',
        'Eat only Halal food',
        'Maintain ritual purity (Taharah)',
      ],

      dontsList: [
        'Associating partners with Allah (Shirk)',
        'Consuming alcohol, intoxicants, or pork',
        'Riba (interest/usury) in financial dealings',
        'Zina (adultery or fornication)',
        'Stealing, cheating, or dishonest dealings',
        'Backbiting (Gheebah) and slander',
        'Murder or harming innocent people',
        'Arrogance and pride (Kibr)',
        'Breaking family ties without just cause',
      ],

      apps: [
        { icon: '🕌', name: 'Muslim Pro', desc: 'Prayer times, Quran, Qibla, Adhan alerts' },
        { icon: '📖', name: 'Quran Companion', desc: 'Memorisation tools, Tajweed, progress tracking' },
        { icon: '⭐', name: 'Seerah App', desc: 'Life of the Prophet ﷺ in full detail' },
        { icon: '🤖', name: 'Tarteel AI', desc: 'AI-powered Quran recitation correction' },
        { icon: '🔔', name: 'Athan (Azan)', desc: 'Prayer times, Quran audio, Dhikr counter' },
      ],

      websites: [
        { icon: '📚', name: 'islamqa.info', url: 'https://islamqa.info', desc: 'Scholarly Q&A — fatawa and rulings' },
        { icon: '📜', name: 'sunnah.com', url: 'https://sunnah.com', desc: 'Complete Hadith collections online' },
        { icon: '📖', name: 'quran.com', url: 'https://quran.com', desc: 'Quran with translation and tafsir' },
        { icon: '🎓', name: 'yaqeeninstitute.org', url: 'https://yaqeeninstitute.org', desc: 'Academic Islamic research papers' },
        { icon: '🌿', name: 'seekersguidance.org', url: 'https://seekersguidance.org', desc: 'Free Islamic learning courses' },
      ],

      faqs: [
        {
          question: 'What does "Islam" mean?',
          answer: 'The word "Islam" comes from the Arabic root "S-L-M" which means peace and submission. Islam means "submission to the will of Allah (God)." A Muslim is one who submits to Allah. The word is closely related to "Salam" (peace) — thus Islam is often described as the path to peace through submission to God.',
          open: false
        },
        {
          question: 'Is Allah different from the God of Christianity and Judaism?',
          answer: 'Muslims believe in the same God worshipped by Abraham, Moses, and Jesus (peace be upon them all). "Allah" is simply the Arabic word for God — Arab Christians also use the word "Allah." While theological differences exist between the Abrahamic faiths, Islam affirms One God, the Creator of all, who sent prophets including Abraham, Moses, Jesus, and Muhammad ﷺ.',
          open: false
        },
        {
          question: 'Do Muslims worship Muhammad ﷺ?',
          answer: 'No. Muslims do not worship Prophet Muhammad ﷺ. He is revered as the final messenger of Allah, and Muslims follow his example (Sunnah) closely. But worship (Ibadah) is directed solely to Allah. The Shahada itself distinguishes clearly: "There is no god but Allah, and Muhammad is the messenger of Allah."',
          open: false
        },
        {
          question: 'What is Jihad?',
          answer: 'The Arabic word "Jihad" means "struggle" or "striving." The greatest form, per Islamic tradition, is the inner struggle against one\'s own ego and desires (Jihad an-nafs). It also refers to striving in the cause of Allah — community work, education, and justice. Armed Jihad is subject to strict ethical rules in Islamic law and permissible only under very specific conditions.',
          open: false
        },
        {
          question: 'What is the role of women in Islam?',
          answer: 'Islam affirms the spiritual equality of men and women before Allah — both equally accountable and equally deserving of Paradise. Women have the right to own property, pursue education, engage in business, and express their opinions. Cultural practices that oppress women are often contrary to authentic Islamic teaching.',
          open: false
        },
        {
          question: 'How do I become a Muslim?',
          answer: 'Becoming a Muslim requires sincerely believing in and declaring the Shahada: "I bear witness that there is no god but Allah, and I bear witness that Muhammad is the messenger of Allah." It is recommended to say this in front of witnesses and perform a ritual bath (Ghusl). Many mosques and Islamic centres offer support for new Muslims (reverts).',
          open: false
        },
        {
          question: 'What is the difference between Sunni and Shia Islam?',
          answer: 'The split arose after the Prophet\'s ﷺ death, primarily over community leadership. Sunni Muslims (~85–90% globally) believe Abu Bakr was the rightful first Caliph. Shia Muslims believe leadership should have passed to Ali ibn Abi Talib. Despite differences in practice and jurisprudence, both share the core beliefs and pillars of Islam.',
          open: false
        },
        {
          question: 'What is Halal food?',
          answer: 'Halal (meaning "permissible") food is lawful for Muslims under Islamic law. Meat must be slaughtered humanely with Allah\'s name invoked. Pork, alcohol, and intoxicants are strictly forbidden (Haram). Halal certification is widely available on food products globally.',
          open: false
        }
      ]
    }
  },

  computed: {
    filteredSections() {
      const q = this.searchQuery.trim().toLowerCase()
      if (!q) return []
      return this.sections
        .filter(s =>
          s.title.toLowerCase().includes(q) ||
          s.excerpt.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
        )
        .slice(0, 5)
    }
  },

  methods: {
    triggerSearch() {
      if (this.filteredSections.length > 0) {
        this.scrollToSection(this.filteredSections[0].id)
      }
    },
    scrollToSection(id) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      this.searchQuery = ''
      this.mobileMenuOpen = false
    },
    toggleFaq(index) {
      const wasOpen = this.faqs[index].open
      this.faqs.forEach(f => f.open = false)
      if (!wasOpen) this.faqs[index].open = true
    },
    handleScroll() {
      this.navScrolled = window.scrollY > 60
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.06, rootMargin: '0px 0px -50px 0px' })

    document.querySelectorAll('.di-section').forEach(el => io.observe(el))

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.hero-search-wrap')) this.searchQuery = ''
    })
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
/* ══════════════════════════════════════════════
   DESIGN SYSTEM — Light Islamic Green Palette
   ══════════════════════════════════════════════ */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Amiri:ital@0;1&display=swap');

:root {
  /* ── Islamic Green Palette ── */
  --forest:      #1a4731;
  --green-deep:  #1e5c3e;
  --green-mid:   #267a50;
  --green:       #2d9564;
  --green-med:   #3aad78;
  --green-light: #5ec697;
  --green-pale:  #b8e8d0;
  --green-mist:  #dff3eb;
  --green-frost: #eef8f3;
  --green-ice:   #f4f9f5;

  /* ── Gold Accents ── */
  --gold:        #b8902a;
  --gold-warm:   #d4a832;
  --gold-bright: #e8c04a;
  --gold-pale:   #fdf3d0;
  --gold-mist:   #fef9ec;

  /* ── Neutral Tones ── */
  --ink:         #0f1f16;
  --text-main:   #1a2e22;
  --text-soft:   #3d5c49;
  --text-muted:  #7a9e8a;
  --text-light:  #a8c4b4;

  /* ── Surface Colors ── */
  --white:       #ffffff;
  --surface:     #f8fdf9;
  --surface-2:   #f0f9f4;
  --surface-3:   #e6f4ec;
  --border:      #c8e4d4;
  --border-soft: #ddf0e7;

  /* ── Semantic ── */
  --rust:        #c44a2a;
  --rust-light:  #fde8e0;
  --rust-pale:   #fff5f2;

  /* ── Fonts ── */
  --ff-display:  'Cormorant Garamond', Georgia, serif;
  --ff-body:     'Plus Jakarta Sans', -apple-system, sans-serif;
  --ff-arabic:   'Amiri', serif;

  /* ── Radii ── */
  --r-sm:  8px;
  --r-md:  14px;
  --r-lg:  22px;
  --r-xl:  32px;
  --r-2xl: 48px;

  /* ── Shadows ── */
  --shadow-green: 0 6px 24px rgba(45,149,100,0.14);
  --shadow-sm:    0 2px 12px rgba(26,71,49,0.08);
  --shadow-md:    0 6px 28px rgba(26,71,49,0.10);
  --shadow-lg:    0 16px 56px rgba(26,71,49,0.14);
  --shadow-xl:    0 28px 80px rgba(26,71,49,0.18);
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  background: var(--green-ice);
  font-family: var(--ff-body);
  color: var(--text-main);
  line-height: 1.7;
  overflow-x: hidden;
}

h1, h2, h3, h4, blockquote {
  font-family: var(--ff-display);
  font-weight: 600;
}

/* ──────────────────────────────
   HERO — Rich Islamic Green
   ────────────────────────────── */
.di-hero {
  background: linear-gradient(150deg, var(--forest) 0%, var(--green-deep) 40%, #1a4a38 70%, #0f2e1e 100%);
  min-height: 100svh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 9rem 2rem 8rem;
  text-align: center;
  overflow: hidden;
}

.hero-geo-bg { position: absolute; inset: 0; pointer-events: none; }
.geo-svg { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.6; }

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.orb-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(58,173,120,0.22) 0%, transparent 70%);
  top: -15%; right: -8%;
  animation: orb-drift 14s ease-in-out infinite alternate;
}
.orb-2 {
  width: 450px; height: 450px;
  background: radial-gradient(circle, rgba(212,168,50,0.12) 0%, transparent 70%);
  bottom: 0%; left: -10%;
  animation: orb-drift 18s ease-in-out infinite alternate-reverse;
}
.orb-3 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(94,198,151,0.15) 0%, transparent 70%);
  top: 45%; left: 25%;
  animation: orb-drift 22s ease-in-out infinite alternate;
}
@keyframes orb-drift {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(40px,25px) scale(1.12); }
}

.hero-content { position: relative; z-index: 2; max-width: 800px; width: 100%; }

.hero-eyebrow {
  display: flex; align-items: center; justify-content: center;
  gap: 1.2rem; margin-bottom: 2.5rem;
}
.eyebrow-line { flex: 1; max-width: 80px; height: 1px; background: linear-gradient(to right, transparent, rgba(212,168,50,0.7)); }
.eyebrow-line:last-child { background: linear-gradient(to left, transparent, rgba(212,168,50,0.7)); }
.eyebrow-text {
  font-size: 0.7rem; font-weight: 600; letter-spacing: 3px;
  text-transform: uppercase; color: var(--gold-bright);
}

.hero-headline { margin-bottom: 1.75rem; }
.headline-arabic {
  display: block;
  font-family: var(--ff-arabic);
  font-size: clamp(1.1rem, 3vw, 1.75rem);
  color: rgba(212,168,50,0.85);
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
  direction: rtl;
}
.headline-main {
  display: block;
  font-family: var(--ff-display);
  font-size: clamp(3.2rem, 8.5vw, 7rem);
  font-weight: 700;
  color: var(--white);
  line-height: 0.95;
  letter-spacing: -2px;
}
.headline-main em { font-style: italic; color: var(--green-light); }

.hero-desc {
  color: rgba(255,255,255,0.62);
  font-size: 1.05rem;
  line-height: 1.75;
  max-width: 560px;
  margin: 0 auto 3rem;
}

/* Search */
.hero-search-wrap { position: relative; max-width: 560px; margin: 0 auto 3.5rem; }
.hero-search-box {
  display: flex; align-items: center;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(94,198,151,0.3);
  border-radius: 60px; padding: 0.4rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(12px);
}
.hero-search-box.focused {
  border-color: var(--green-light);
  background: rgba(255,255,255,0.12);
  box-shadow: 0 0 0 4px rgba(94,198,151,0.12), 0 20px 60px rgba(0,0,0,0.3);
}
.search-ico { color: rgba(255,255,255,0.4); width: 18px; margin: 0 0.8rem; flex-shrink: 0; }
.search-inp {
  flex: 1; background: none; border: none; outline: none;
  color: white; font-family: var(--ff-body); font-size: 0.93rem;
  padding: 0.75rem 0.5rem;
}
.search-inp::placeholder { color: rgba(255,255,255,0.3); }
.search-go {
  background: var(--green-med); border: none;
  width: 46px; height: 46px; border-radius: 50%;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: all 0.25s ease;
}
.search-go svg { width: 16px; color: white; }
.search-go:hover { background: var(--green-light); transform: scale(1.06); }

.search-dropdown {
  position: absolute; top: calc(100% + 0.8rem); left: 0; right: 0;
  background: var(--white); border-radius: var(--r-lg);
  box-shadow: var(--shadow-xl); overflow: hidden; z-index: 200;
  border: 1px solid var(--border-soft);
}
.search-hit {
  display: flex; align-items: center; gap: 1rem;
  padding: 1rem 1.25rem; cursor: pointer;
  transition: background 0.18s ease;
  border-bottom: 1px solid var(--green-frost);
  text-align: left;
}
.search-hit:last-child { border-bottom: none; }
.search-hit:hover { background: var(--green-frost); }
.hit-icon { font-size: 1.3rem; flex-shrink: 0; width: 30px; text-align: center; }
.hit-info { flex: 1; min-width: 0; }
.hit-title { font-weight: 600; color: var(--forest); font-size: 0.88rem; }
.hit-excerpt { font-size: 0.73rem; color: var(--text-muted); margin-top: 0.1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hit-arrow { width: 15px; color: var(--green-med); flex-shrink: 0; }

.dropdown-enter-active, .dropdown-leave-active { transition: all 0.2s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-8px); }

/* Chips */
.hero-pillars {
  display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;
}
.pillar-chip {
  display: flex; flex-direction: column; align-items: center;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(94,198,151,0.22);
  border-radius: var(--r-md);
  padding: 1.1rem 1.6rem;
  backdrop-filter: blur(10px);
  transition: all 0.25s ease;
}
.pillar-chip:hover {
  border-color: var(--green-light);
  background: rgba(94,198,151,0.12);
  transform: translateY(-4px);
  box-shadow: var(--shadow-green);
}
.chip-num {
  font-family: var(--ff-display); font-size: 2.1rem;
  font-weight: 700; color: var(--green-light); line-height: 1;
}
.chip-label { font-size: 0.7rem; color: rgba(255,255,255,0.55); margin-top: 0.35rem; letter-spacing: 0.3px; }

.hero-scroll-hint {
  position: absolute; bottom: 4.5rem; left: 50%;
  transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center;
  gap: 0.5rem; color: rgba(255,255,255,0.28);
  font-size: 0.7rem; letter-spacing: 1.5px; text-transform: uppercase; z-index: 2;
}
.scroll-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--green-light);
  animation: bounce-dot 2s ease-in-out infinite;
}
@keyframes bounce-dot {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(9px); opacity: 0.35; }
}

.hero-wave-bottom {
  position: absolute; bottom: 0; left: 0; right: 0;
  line-height: 0; z-index: 1;
}
.hero-wave-bottom svg { width: 100%; height: 80px; }

/* ──────────────────────────────
   MAIN CONTENT
   ────────────────────────────── */
.di-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem 7rem;
}

/* Disclaimer */
.di-disclaimer {
  background: linear-gradient(135deg, var(--green-mist) 0%, #d6f0e5 100%);
  border-radius: var(--r-md);
  border-left: 4px solid var(--green-med);
  padding: 1.2rem 1.6rem;
  display: flex; align-items: flex-start; gap: 1rem;
  margin-bottom: 5rem;
  box-shadow: var(--shadow-sm);
}
.disclaimer-shield { font-size: 1.15rem; flex-shrink: 0; margin-top: 0.05rem; }
.di-disclaimer p { font-size: 0.82rem; color: var(--text-soft); line-height: 1.6; }
.di-disclaimer strong { color: var(--forest); }

/* ──────────────────────────────
   SECTIONS
   ────────────────────────────── */
.di-section {
  margin-bottom: 7rem;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.75s cubic-bezier(.22,.68,0,1.15), transform 0.75s cubic-bezier(.22,.68,0,1.15);
}
.di-section.in-view { opacity: 1; transform: translateY(0); }

.section-label-row {
  display: flex; align-items: center; gap: 1rem; margin-bottom: 1.1rem;
}
.section-num {
  font-family: var(--ff-display); font-size: 0.78rem;
  font-weight: 700; color: var(--green-med); letter-spacing: 1.5px;
}
.section-rule { flex: 0 0 50px; height: 1.5px; background: var(--green-pale); border-radius: 2px; }
.section-tag {
  font-size: 0.68rem; font-weight: 700; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--text-muted);
}

.section-title {
  font-family: var(--ff-display);
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 700; color: var(--forest); line-height: 1.12;
  margin-bottom: 1.4rem;
}
.section-title em { font-style: italic; color: var(--green-mid); }
.section-lead {
  font-size: 1.05rem; color: var(--text-soft);
  line-height: 1.8; max-width: 700px; margin-bottom: 1.5rem;
}
.body-copy {
  font-size: 0.95rem; color: var(--text-soft);
  line-height: 1.8; margin-bottom: 1.4rem;
}

/* ── Twin Grid ── */
.twin-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 1.75rem; margin-bottom: 2.5rem;
}
.twin-card {
  background: var(--white); border-radius: var(--r-lg);
  overflow: hidden; box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-soft);
  transition: all 0.3s ease;
}
.twin-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }

.twin-card-header {
  display: flex; align-items: center; gap: 0.8rem;
  padding: 1.35rem 1.6rem;
}
.card-faith .twin-card-header { background: linear-gradient(135deg, var(--forest) 0%, var(--green-deep) 100%); }
.card-pillars .twin-card-header { background: linear-gradient(135deg, #1c4030 0%, #2d7050 100%); }
.card-dos .twin-card-header { background: linear-gradient(135deg, #0d2d1e 0%, var(--green-mid) 100%); }
.card-donts .twin-card-header { background: linear-gradient(135deg, #3a0d0d 0%, #8b1a1a 100%); }
.twin-card-header:not(.card-faith .twin-card-header):not(.card-pillars .twin-card-header):not(.card-dos .twin-card-header):not(.card-donts .twin-card-header) {
  background: linear-gradient(135deg, var(--forest) 0%, var(--green-mid) 100%);
}

.tc-icon { font-size: 1.35rem; }
.tc-icon.red { color: #f8a0a0; }
.twin-card-header h3 {
  font-family: var(--ff-display); font-size: 1.1rem;
  font-weight: 600; color: white; margin: 0;
}
.twin-card-header h3 em { font-style: italic; opacity: 0.7; }

.check-list { list-style: none; padding: 0.5rem 1.6rem 1rem; }
.check-list li {
  display: flex; align-items: flex-start; gap: 0.8rem;
  padding: 0.6rem 0; border-bottom: 1px solid var(--green-ice);
  font-size: 0.88rem; color: var(--text-soft); line-height: 1.5;
}
.check-list li:last-child { border-bottom: none; }
.cl-dot {
  flex-shrink: 0; width: 7px; height: 7px;
  border-radius: 50%; background: var(--green-med); margin-top: 0.48rem;
}
.cl-dot.gold { background: var(--gold-warm); }
.cl-dot.red { background: var(--rust); }

/* Ref pill */
.ref-pill {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: var(--green-frost); border: 1px solid var(--border-soft);
  border-radius: 60px; padding: 0.4rem 1rem;
  font-size: 0.74rem; color: var(--text-muted);
  margin: 0.5rem 1.6rem 1.4rem;
}
.ref-pill.centered {
  display: flex; justify-content: center;
  margin: 1.75rem auto 0; width: fit-content;
}

/* ── Photo duo ── */
.photo-duo {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 1.25rem; margin-bottom: 1.75rem;
}
.photo-fig { border-radius: var(--r-md); overflow: hidden; position: relative; }
.photo-fig img {
  width: 100%; height: 270px; object-fit: cover; display: block;
  transition: transform 0.6s ease;
}
.photo-fig:hover img { transform: scale(1.05); }
.photo-fig figcaption {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(to top, rgba(15,35,22,0.85), transparent);
  color: rgba(255,255,255,0.92); font-size: 0.77rem;
  font-weight: 500; letter-spacing: 0.4px;
  padding: 2rem 1rem 0.9rem;
}

/* ── Video ── */
.video-embed { border-radius: var(--r-md); overflow: hidden; box-shadow: var(--shadow-lg); margin-bottom: 1.75rem; }
.video-embed.compact { margin-top: 2.5rem; }
.video-embed iframe { display: block; width: 100%; height: 400px; border: none; }
.video-label {
  background: var(--forest); color: rgba(255,255,255,0.55);
  font-size: 0.75rem; padding: 0.7rem 1.2rem;
  text-align: center; letter-spacing: 0.3px;
}

/* ── Shahada ── */
.shahada-monument {
  background: linear-gradient(150deg, var(--forest) 0%, var(--green-deep) 50%, #0f2e1e 100%);
  border-radius: var(--r-2xl);
  padding: 5rem 3.5rem;
  text-align: center; position: relative; overflow: hidden;
  box-shadow: var(--shadow-xl);
}
.shahada-geo-ring {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 110%; padding-top: 110%; border-radius: 50%;
  border: 1px solid rgba(94,198,151,0.08);
  pointer-events: none;
}
.shahada-inner { position: relative; z-index: 2; max-width: 740px; margin: 0 auto; }
.shd-arabic {
  font-family: var(--ff-arabic);
  font-size: clamp(1.6rem, 4vw, 2.9rem);
  color: var(--green-light); line-height: 1.7;
  margin-bottom: 1.4rem; direction: rtl;
}
.shd-roman {
  font-family: var(--ff-body); font-size: 0.98rem;
  color: var(--gold-bright); font-weight: 500;
  letter-spacing: 0.4px; margin-bottom: 0.7rem;
}
.shd-trans {
  font-family: var(--ff-display); font-style: italic;
  font-size: 1.2rem; color: rgba(255,255,255,0.8);
  margin-bottom: 1.75rem;
}
.shd-body {
  font-size: 0.92rem; color: rgba(255,255,255,0.5);
  line-height: 1.85; max-width: 580px; margin: 0 auto;
}

/* ── Split Layout ── */
.split-layout {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 3rem; align-items: start;
}
.split-layout.reverse .split-img { order: -1; }

/* ── Quran Quote ── */
.quran-quote {
  background: var(--green-frost);
  border-left: 3px solid var(--green-med);
  border-radius: 0 var(--r-sm) var(--r-sm) 0;
  padding: 1.4rem 1.4rem 1.4rem 1.75rem;
  margin-top: 1.5rem; position: relative;
}
.qq-mark {
  position: absolute; top: -0.5rem; left: 1rem;
  font-family: var(--ff-display); font-size: 3.5rem;
  color: var(--green-pale); line-height: 1;
}
.quran-quote p {
  font-family: var(--ff-display); font-style: italic;
  font-size: 1.02rem; color: var(--forest); line-height: 1.75;
  margin-bottom: 0.6rem;
}
.quran-quote cite { font-size: 0.77rem; color: var(--green-mid); font-style: normal; font-weight: 600; }

/* ── 99 Names ── */
.split-names {
  background: var(--white); border-radius: var(--r-lg);
  padding: 2rem; box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-soft);
  max-height: 560px; overflow-y: auto;
}
.split-names::-webkit-scrollbar { width: 4px; }
.split-names::-webkit-scrollbar-track { background: var(--green-ice); }
.split-names::-webkit-scrollbar-thumb { background: var(--green-pale); border-radius: 4px; }

.names-title {
  font-family: var(--ff-display); font-size: 1.1rem;
  color: var(--forest); margin-bottom: 1.25rem; line-height: 1.3;
  position: sticky; top: 0; background: var(--white);
  padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-soft);
}
.names-title em { font-style: italic; color: var(--text-muted); font-size: 0.95rem; }

.names-cloud { display: flex; flex-direction: column; gap: 0; }
.name-tag {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.6rem 0.9rem; border-radius: var(--r-sm);
  cursor: default; transition: all 0.18s ease;
  border-bottom: 1px solid var(--green-ice);
}
.name-tag:last-child { border-bottom: none; }
.name-tag:hover { background: var(--green-frost); }
.name-ar {
  font-family: var(--ff-arabic); font-size: 1.1rem;
  color: var(--forest); direction: rtl; line-height: 1.5;
}
.name-en {
  font-size: 0.74rem; color: var(--text-muted);
  text-align: right; line-height: 1.4; max-width: 55%;
  font-weight: 500;
}

/* ── Image Frames ── */
.split-img { border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--shadow-lg); }
.img-frame-green {
  border-radius: var(--r-lg); overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 3px solid var(--green-pale);
}
.img-frame-green img, .split-img img {
  width: 100%; height: 330px; object-fit: cover;
  display: block; transition: transform 0.55s ease;
}
.img-frame-green:hover img, .split-img:hover img { transform: scale(1.04); }

/* ── Prophet Layout ── */
.prophet-layout {
  display: grid; grid-template-columns: 1fr 1.35fr;
  gap: 3rem; align-items: start;
}
.prophet-img-frame { border-radius: var(--r-lg); overflow: hidden; position: relative; box-shadow: var(--shadow-lg); }
.prophet-img-frame img { width: 100%; height: 400px; object-fit: cover; display: block; }
.img-caption-overlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(to top, rgba(15,30,20,0.88), transparent);
  color: rgba(255,255,255,0.88); font-size: 0.8rem;
  padding: 2.5rem 1.1rem 0.9rem; letter-spacing: 0.3px;
}

.sub-heading {
  font-family: var(--ff-display); font-size: 1.1rem;
  color: var(--forest); margin: 1.5rem 0 0.85rem;
}

.star-list { list-style: none; }
.star-list li {
  display: flex; align-items: flex-start; gap: 0.85rem;
  padding: 0.55rem 0; border-bottom: 1px solid var(--green-ice);
  font-size: 0.9rem; color: var(--text-soft); line-height: 1.55;
}
.star-list li::before {
  content: '✦'; color: var(--green-med); font-size: 0.65rem;
  flex-shrink: 0; margin-top: 0.32rem;
}
.star-list li:last-child { border-bottom: none; }
.twin-refs { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.4rem; }

/* ── Fact Strips ── */
.fact-strips {
  list-style: none; display: grid; grid-template-columns: 1fr 1fr;
  gap: 1rem; margin: 1.4rem 0;
}
.fact-strips li {
  background: linear-gradient(135deg, var(--forest) 0%, var(--green-mid) 100%);
  border-radius: var(--r-md); padding: 1.25rem 1.4rem;
  display: flex; flex-direction: column; gap: 0.25rem;
}
.fs-num {
  font-family: var(--ff-display); font-size: 2rem;
  font-weight: 700; color: var(--green-light); line-height: 1;
}
.fs-label { font-size: 0.73rem; color: rgba(255,255,255,0.5); }

/* ── Prayer Timeline ── */
.prayer-timeline { display: grid; grid-template-columns: repeat(5,1fr); gap: 1.1rem; }
.prayer-card {
  background: var(--white);
  border-radius: var(--r-md); padding: 1.6rem 1rem;
  text-align: center; box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-soft);
  border-top: 3px solid var(--prayer-color, var(--green-med));
  transition: all 0.3s ease;
}
.prayer-card:hover { transform: translateY(-7px); box-shadow: var(--shadow-lg); }
.prayer-sky { font-size: 1.6rem; margin-bottom: 0.75rem; }
.prayer-time-badge {
  font-size: 0.65rem; font-weight: 700; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.4rem;
}
.prayer-name {
  font-family: var(--ff-display); font-size: 1.35rem;
  font-weight: 700; color: var(--forest); margin-bottom: 0.25rem;
}
.prayer-arabic {
  font-family: var(--ff-arabic); font-size: 1.1rem;
  color: var(--green-mid); margin-bottom: 0.55rem;
  direction: rtl;
}
.prayer-rakah { font-size: 0.78rem; font-weight: 600; color: var(--prayer-color, var(--green-mid)); }

/* ── Zakat Grid ── */
.zakat-grid { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
.zakat-grid li {
  background: var(--green-frost); border-radius: var(--r-sm);
  padding: 0.7rem 0.95rem; font-size: 0.84rem;
  color: var(--text-soft); border: 1px solid var(--border-soft);
  display: flex; align-items: center; gap: 0.5rem;
}
.zakat-grid li::before { content: '◆'; color: var(--green-med); font-size: 0.45rem; flex-shrink: 0; }

/* ── Hajj Steps ── */
.hajj-steps { list-style: none; }
.hajj-steps li {
  display: flex; align-items: flex-start; gap: 1rem;
  padding: 0.85rem 0; border-bottom: 1px solid var(--green-ice);
  font-size: 0.9rem; color: var(--text-soft); line-height: 1.55;
}
.hajj-steps li:last-child { border-bottom: none; }
.step-num {
  flex-shrink: 0; width: 27px; height: 27px;
  background: var(--forest); color: var(--green-light);
  border-radius: 50%; font-size: 0.72rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}

/* ── Hero Photo ── */
.hero-photo {
  border-radius: var(--r-xl); overflow: hidden;
  margin-top: 2.5rem; box-shadow: var(--shadow-xl); position: relative;
}
.hero-photo img { width: 100%; height: 440px; object-fit: cover; display: block; }
.hero-photo figcaption {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(to top, rgba(15,35,22,0.78), transparent);
  color: rgba(255,255,255,0.85); font-size: 0.82rem;
  padding: 3rem 1.5rem 1.1rem; letter-spacing: 0.3px;
}

/* ── Afterlife Stages ── */
.afterlife-stages { list-style: none; }
.afterlife-stages li {
  display: flex; align-items: flex-start; gap: 1rem;
  padding: 1rem 0; border-bottom: 1px solid var(--green-ice);
}
.afterlife-stages li:last-child { border-bottom: none; }
.stage-icon { font-size: 1.35rem; flex-shrink: 0; width: 30px; text-align: center; margin-top: 0.1rem; }
.afterlife-stages strong { display: block; color: var(--forest); font-size: 0.92rem; margin-bottom: 0.2rem; }
.afterlife-stages p { font-size: 0.82rem; color: var(--text-muted); line-height: 1.55; }

/* ── Resource List ── */
.resource-list { list-style: none; padding: 0.5rem 1.6rem 1rem; }
.resource-list li {
  display: flex; align-items: flex-start; gap: 1rem;
  padding: 0.85rem 0.7rem; border-radius: var(--r-sm);
  border-bottom: 1px solid var(--green-ice);
  transition: background 0.18s ease; font-size: 0.88rem;
}
.resource-list li:hover { background: var(--green-ice); }
.resource-list li:last-child { border-bottom: none; }
.res-icon { font-size: 1.3rem; flex-shrink: 0; }
.resource-list strong { display: block; color: var(--forest); margin-bottom: 0.15rem; font-weight: 600; }
.resource-list p { font-size: 0.74rem; color: var(--text-muted); line-height: 1.4; }
.resource-list a { color: var(--green-mid); text-decoration: none; font-weight: 600; }
.resource-list a:hover { color: var(--forest); text-decoration: underline; }

/* ── FAQ ── */
.faq-accordion {
  background: var(--white); border-radius: var(--r-xl);
  overflow: hidden; box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-soft);
}
.faq-entry { border-bottom: 1px solid var(--green-ice); }
.faq-entry:last-child { border-bottom: none; }
.faq-trigger {
  width: 100%; display: flex; align-items: center;
  gap: 1.25rem; padding: 1.5rem 1.9rem;
  background: none; border: none; cursor: pointer;
  text-align: left; transition: background 0.2s ease;
}
.faq-trigger:hover { background: var(--green-ice); }
.faq-entry.open .faq-trigger { background: var(--green-frost); }
.faq-q-num {
  font-family: var(--ff-display); font-size: 1.05rem;
  font-weight: 700; color: var(--green-med); flex-shrink: 0; width: 30px;
}
.faq-q-text {
  flex: 1; font-family: var(--ff-display);
  font-size: 1.08rem; font-weight: 600; color: var(--forest);
  line-height: 1.4;
}
.faq-toggle-icon {
  flex-shrink: 0; width: 28px; height: 28px;
  background: var(--forest); color: var(--green-light);
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; font-size: 1.1rem; line-height: 1;
  transition: all 0.25s ease;
}
.faq-entry.open .faq-toggle-icon { background: var(--green-med); color: white; }
.faq-body {
  padding: 0 1.9rem 1.75rem 4.5rem;
  font-size: 0.91rem; color: var(--text-soft); line-height: 1.85;
}
.faq-expand-enter-active, .faq-expand-leave-active { transition: all 0.3s ease; overflow: hidden; }
.faq-expand-enter-from, .faq-expand-leave-to { max-height: 0; opacity: 0; padding-bottom: 0; }
.faq-expand-enter-to, .faq-expand-leave-from { max-height: 300px; opacity: 1; }

/* ── Closing ── */
.di-closing {
  background: linear-gradient(150deg, var(--forest) 0%, var(--green-deep) 60%, #0f2e1e 100%);
  border-radius: var(--r-2xl);
  padding: 5rem 3.5rem;
  text-align: center; position: relative; overflow: hidden;
  margin-top: 2rem; box-shadow: var(--shadow-xl);
}
.closing-geo {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' opacity='0.05'%3E%3Cpolygon points='40,4 51,29 78,29 55,46 63,71 40,55 17,71 25,46 2,29 29,29' fill='none' stroke='%235ec697' stroke-width='1'/%3E%3C/svg%3E");
  background-size: 80px 80px;
}
.closing-crescent {
  display: block; font-size: 2.8rem; color: var(--green-light);
  margin-bottom: 1.75rem; position: relative; z-index: 1;
}
.di-closing blockquote {
  font-family: var(--ff-display); font-style: italic;
  font-size: clamp(1.15rem, 2.5vw, 1.6rem);
  color: rgba(255,255,255,0.92); line-height: 1.65;
  max-width: 600px; margin: 0 auto 1.1rem;
  position: relative; z-index: 1;
}
.di-closing cite {
  font-size: 0.82rem; color: var(--green-light);
  font-style: normal; font-weight: 600; letter-spacing: 0.5px;
  position: relative; z-index: 1;
}
.closing-attribution {
  margin-top: 2.5rem; font-size: 0.72rem;
  color: rgba(255,255,255,0.28);
  max-width: 700px; margin-left: auto; margin-right: auto;
  line-height: 1.7; position: relative; z-index: 1;
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .twin-grid { grid-template-columns: 1fr; }
  .split-layout { grid-template-columns: 1fr; gap: 2rem; }
  .split-layout.reverse .split-img { order: 0; }
  .prophet-layout { grid-template-columns: 1fr; }
  .prayer-timeline { grid-template-columns: repeat(3,1fr); }
  .fact-strips { grid-template-columns: 1fr 1fr; }
  .split-names { max-height: none; }
}
@media (max-width: 680px) {
  .hero-headline { letter-spacing: -1px; }
  .prayer-timeline { grid-template-columns: 1fr 1fr; }
  .photo-duo { grid-template-columns: 1fr; }
  .zakat-grid { grid-template-columns: 1fr; }
  .shahada-monument, .di-closing { padding: 3rem 1.75rem; }
  .hero-pillars { gap: 0.75rem; }
  .pillar-chip { padding: 0.9rem 1.15rem; }
  .video-embed iframe { height: 240px; }
  .di-main { padding: 3.5rem 1.5rem 5rem; }
}
@media (max-width: 480px) {
  .prayer-timeline { grid-template-columns: 1fr; }
  .faq-trigger { padding: 1.1rem 1.25rem; gap: 0.75rem; }
  .faq-body { padding: 0 1.25rem 1.4rem 3rem; }
  .fact-strips { grid-template-columns: 1fr; }
  .names-cloud { gap: 0; }
}
</style>