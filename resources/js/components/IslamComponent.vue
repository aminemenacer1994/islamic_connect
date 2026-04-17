<template>
  <div class="discover-islam">

    <!-- ─── HERO ─── -->
    <section class="di-hero">
      <div class="hero-geo-bg">
        <svg class="geo-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="star-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="none"
                stroke="rgba(255,255,255,0.10)" stroke-width="0.8" />
              <polygon points="50,15 58,38 82,38 63,52 70,75 50,62 30,75 37,52 18,38 42,38" fill="none"
                stroke="rgba(255,255,255,0.05)" stroke-width="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#star-pattern)" />
        </svg>
        <div class="hero-orb orb-1"></div>
        <div class="hero-orb orb-2"></div>
        <div class="hero-orb orb-3"></div>
      </div>

      <div class="container-fluid hero-container">
        <div class="hero-grid">
          <div class="hero-content">
            <div class="hero-eyebrow">
              <span class="eyebrow-line"></span>
              <span class="eyebrow-text">{{ configData.hero.badge }}</span>
              <span class="eyebrow-line"></span>
            </div>

            <h1 class="hero-headline">
              <span class="headline-arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
              <span class="headline-main">Discover<br><em>{{ configData.hero.title }}</em></span>
            </h1>

            <p class="hero-desc">
              {{ configData.hero.subtitle }}
            </p>
          </div>

          <div class="hero-actions">
            <!-- Search -->
            <div class="hero-search-wrap">
              <div class="hero-search-box" :class="{ focused: searchFocused }">
                <svg class="search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input v-model="searchQuery" type="text" class="search-inp"
                  placeholder="Search pillars, prayers, prophets…" @focus="searchFocused = true"
                  @blur="searchFocused = false" @keydown.escape="searchQuery = ''" />
                <button class="search-go" @click="triggerSearch">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <transition name="dropdown">
                <div v-if="filteredSections.length > 0" class="search-dropdown">
                  <div v-for="h in filteredSections" :key="h.id" class="search-hit" @click="scrollToSection(h.id)">
                    <span class="hit-icon">{{ h.emoji }}</span>
                    <div class="hit-info">
                      <div class="hit-title">{{ h.title }}</div>
                      <div class="hit-excerpt">{{ h.excerpt }}</div>
                    </div>
                    <svg class="hit-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Stats -->
            <div class="hero-pillars">
              <div class="pillar-chip" v-for="chip in configData.hero.stats" :key="chip.label">
                <span class="chip-num text-white">{{ chip.num }}</span>
                <span class="chip-label text-white">{{ chip.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-scroll-hint">
        <div class="scroll-dot"></div>
        <span>Scroll to explore</span>
      </div>

      <div class="hero-wave-bottom">
        <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C240,90 480,10 720,50 C960,90 1200,20 1440,60 L1440,100 L0,100Z" fill="#f4f9f5" />
        </svg>
      </div>
    </section>

    <!-- ─── MAIN ─── -->
    <main class="di-main">

      <!-- Disclaimer -->
      <div class="di-disclaimer">
        <span class="disclaimer-shield">🛡</span>
        <strong>Scholarly Verified:</strong><h5 class="line-height:1.5rem"> {{ configData.disclaimer.text }}</h5>
      </div>
      

      <!-- ── WHAT IS ISLAM ── -->
      <section class="di-section" id="basics">
        <div class="section-label-row">
          <span class="section-num">01</span>
          <span class="section-rule"></span>
          <span class="section-tag">Foundation</span>
        </div>
        <h2 class="section-title">What is <em>Islam?</em></h2>
        <p class="section-lead">{{ configData.basics.description }}</p>

        <div class="twin-grid">
          <div class="twin-card card-faith">
            <div class="twin-card-header">
              <span class="tc-icon">✦</span>
              <h3>{{ configData.basics.coreBeliefs.title }}</h3>
            </div>
            <ul class="check-list">
              <li v-for="item in configData.basics.coreBeliefs.items" :key="item"><span class="cl-dot"></span>{{ item }}
              </li>
            </ul>
            <div class="ref-pill">{{ configData.basics.coreBeliefs.reference }}</div>
          </div>
          <div class="twin-card card-pillars">
            <div class="twin-card-header">
              <span class="tc-icon">🕌</span>
              <h3>{{ configData.basics.corePractices.title }}</h3>
            </div>
            <ul class="check-list">
              <li v-for="item in configData.basics.corePractices.items" :key="item"><span class="cl-dot gold"></span>{{
                item }}</li>
            </ul>
            <div class="ref-pill">{{ configData.basics.corePractices.reference }}</div>
          </div>
        </div>

        
      </section>

      <!-- ── SHAHADA ── -->
      <section class="di-section" id="shahada">
        <div class="section-label-row">
          <span class="section-num">02</span>
          <span class="section-rule"></span>
          <span class="section-tag">First Pillar</span>
        </div>
        <h2 class="section-title">The <em>Shahada</em></h2>

        <div class="section-tools" aria-label="Section tools">
          <button type="button" class="tool-pill tool-pill--wa" @click="shareWhatsApp('shahada')">WhatsApp</button>
          <button type="button" class="tool-pill tool-pill--copy" @click="copyToClipboard('shahada')">{{ copiedSectionId
            === 'shahada' ? 'Copied' : 'Copy' }}</button>
          <!-- <button type="button" class="tool-pill tool-pill--print" @click="printSection('shahada')">Print</button> -->
          <button type="button" class="tool-pill tool-pill--pdf" @click="downloadPdf('shahada')">Download PDF</button>
          <button type="button" class="tool-pill tool-pill--report" @click="reportSection('shahada')">Report</button>
          <button type="button" class="tool-circle" @click="decreaseFont('shahada')">A-</button>
          <button type="button" class="tool-circle" @click="increaseFont('shahada')">A+</button>
          <button type="button" class="tool-pill tool-pill--ai" @click="toggleAiSummary('shahada')">{{
            aiSummarySectionId === 'shahada' ? 'Hide Summary' : 'AI Summary' }}</button>
        </div>
        <div v-if="aiSummarySectionId === 'shahada'" class="ai-summary-inline" role="note">
          <div class="ai-summary-title">Summary</div>
          <ul class="ai-summary-points">
            <li v-for="p in aiSummaryPoints" :key="p">{{ p }}</li>
          </ul>
        </div>

        <div ref="tool_shahada" class="shahada-monument section-tool-target"
          :style="{ '--tool-scale': sectionFontScale.shahada }">
          <div class="shahada-geo-ring"></div>
          <div class="shahada-inner">
            <p class="shd-arabic">{{ configData.shahada.arabic }}</p>
            <p class="shd-roman">{{ configData.shahada.transliteration }}</p>
            <p class="shd-trans">{{ configData.shahada.translation }}</p>
            <p class="shd-body">{{ configData.shahada.explanation }}</p>
            <div class="ref-pill centered">📖 {{ configData.shahada.reference }}</div>
          </div>
        </div>
      </section>

      <!-- ── ALLAH ── -->
      <section class="di-section" id="allah">
        <div class="section-label-row">
          <span class="section-num">03</span>
          <span class="section-rule"></span>
          <span class="section-tag">Theology</span>
        </div>
        <h2 class="section-title">Who is <em>Allah?</em></h2>

        <div class="split-layout section-tool-target" ref="tool_allah_quote"
          :style="{ '--tool-scale': sectionFontScale.allah_quote }">
          <div class="split-text">
            <p class="section-lead">{{ configData.allah.description }}</p>
            <p class="body-copy">He is all-knowing (Al-ʿAlim), all-powerful (Al-Qadir), and ever-merciful (Ar-Rahman,
              Ar-Rahim). Allah communicates with humanity through prophets and revealed scriptures.</p>
            <div class="section-tools section-tools--compact" aria-label="Quote tools">
              <button type="button" class="tool-pill tool-pill--wa"
                @click="shareWhatsApp('allah_quote')">WhatsApp</button>
              <button type="button" class="tool-pill tool-pill--copy" @click="copyToClipboard('allah_quote')">{{
                copiedSectionId === 'allah_quote' ? 'Copied' : 'Copy' }}</button>
              <!-- <button type="button" class="tool-pill tool-pill--print"
                @click="printSection('allah_quote')">Print</button> -->
              <button type="button" class="tool-pill tool-pill--pdf" @click="downloadPdf('allah_quote')">Download
                PDF</button>
              <button type="button" class="tool-pill tool-pill--report"
                @click="reportSection('allah_quote')">Report</button>
              <button type="button" class="tool-circle" @click="decreaseFont('allah_quote')">A-</button>
              <button type="button" class="tool-circle" @click="increaseFont('allah_quote')">A+</button>
            </div>
            <div class="quran-quote">
              <span class="qq-mark">"</span>
              <p>{{ configData.allah.quranReference }}</p>
            </div>
          </div>
          <div class="split-names">
            <h4 class="names-title">{{ configData.asmaUlHusna.title }}</h4>
            <div class="names-cloud">
              <span class="name-tag" v-for="name in configData.asmaUlHusna.names" :key="name.ar" :title="name.en">
                <span class="name-ar">{{ name.ar }}</span>
                <span class="name-en">{{ name.en }}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── PROPHET ── -->
      <section class="di-section" id="prophet">
        <div class="section-label-row">
          <span class="section-num">04</span>
          <span class="section-rule"></span>
          <span class="section-tag">Prophethood</span>
        </div>
        <h2 class="section-title">Prophet <em>Muhammad ﷺ</em></h2>

        <div class="section-tools" aria-label="Section tools">
          <button type="button" class="tool-pill tool-pill--wa" @click="shareWhatsApp('prophet')">WhatsApp</button>
          <button type="button" class="tool-pill tool-pill--copy" @click="copyToClipboard('prophet')">{{ copiedSectionId
            === 'prophet' ? 'Copied' : 'Copy' }}</button>
          <!-- <button type="button" class="tool-pill tool-pill--print" @click="printSection('prophet')">Print</button> -->
          <button type="button" class="tool-pill tool-pill--pdf" @click="downloadPdf('prophet')">Download PDF</button>
          <button type="button" class="tool-pill tool-pill--report" @click="reportSection('prophet')">Report</button>
          <button type="button" class="tool-circle" @click="decreaseFont('prophet')">A-</button>
          <button type="button" class="tool-circle" @click="increaseFont('prophet')">A+</button>
          <button type="button" class="tool-pill tool-pill--ai" @click="toggleAiSummary('prophet')">{{
            aiSummarySectionId === 'prophet' ? 'Hide Summary' : 'AI Summary' }}</button>
        </div>
        <div v-if="aiSummarySectionId === 'prophet'" class="ai-summary-inline" role="note">
          <div class="ai-summary-title">Summary</div>
          <ul class="ai-summary-points">
            <li v-for="p in aiSummaryPoints" :key="p">{{ p }}</li>
          </ul>
        </div>

        <div ref="tool_prophet" class="prophet-layout section-tool-target"
          :style="{ '--tool-scale': sectionFontScale.prophet }">
          <div class="prophet-img-col">
            <div class="prophet-img-frame">
              <img :src="configData.prophet.image" alt="Masjid an-Nabawi" loading="lazy" />
              <div class="img-caption-overlay">Masjid an-Nabawi — Madinah</div>
            </div>
          </div>
          <div class="prophet-text-col">
            <p class="body-copy">{{ configData.prophet.description }}</p>
            <h4 class="sub-heading">Key Teachings ﷺ</h4>
            <ul class="star-list">
              <li v-for="teaching in configData.prophet.keyTeachings" :key="teaching">{{ teaching }}</li>
            </ul>
            <div class="twin-refs">
              <div class="ref-pill">📖 {{ configData.prophet.quranReference }}</div>
              <div class="ref-pill">📖 {{ configData.prophet.hadithReference }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── QURAN ── -->
      <section class="di-section" id="quran">
        <div class="section-label-row">
          <span class="section-num">05</span>
          <span class="section-rule"></span>
          <span class="section-tag">Scripture</span>
        </div>
        <h2 class="section-title">The Holy <em>Quran</em></h2>

        <div class="section-tools" aria-label="Section tools">
          <button type="button" class="tool-pill tool-pill--wa" @click="shareWhatsApp('quran')">WhatsApp</button>
          <button type="button" class="tool-pill tool-pill--copy" @click="copyToClipboard('quran')">{{ copiedSectionId
            === 'quran' ? 'Copied' : 'Copy' }}</button>
          <!-- <button type="button" class="tool-pill tool-pill--print" @click="printSection('quran')">Print</button> -->
          <button type="button" class="tool-pill tool-pill--pdf" @click="downloadPdf('quran')">Download PDF</button>
          <button type="button" class="tool-pill tool-pill--report" @click="reportSection('quran')">Report</button>
          <button type="button" class="tool-circle" @click="decreaseFont('quran')">A-</button>
          <button type="button" class="tool-circle" @click="increaseFont('quran')">A+</button>
          <button type="button" class="tool-pill tool-pill--ai" @click="toggleAiSummary('quran')">{{ aiSummarySectionId
            === 'quran' ? 'Hide Summary' : 'AI Summary' }}</button>
        </div>
        <div v-if="aiSummarySectionId === 'quran'" class="ai-summary-inline" role="note">
          <div class="ai-summary-title">Summary</div>
          <ul class="ai-summary-points">
            <li v-for="p in aiSummaryPoints" :key="p">{{ p }}</li>
          </ul>
        </div>

        <div ref="tool_quran" class="split-layout reverse section-tool-target"
          :style="{ '--tool-scale': sectionFontScale.quran }">
          <div class="split-text">
            <p class="section-lead">{{ configData.quran.description }}</p>
            <ul class="fact-strips">
              <li v-for="fact in configData.quran.facts" :key="fact">
                <span class="fs-num">{{ fact.split(' ')[0] }}</span>
                <span class="fs-label">{{ fact.split(' ').slice(1).join(' ') }}</span>
              </li>
            </ul>
            <div class="quran-quote">
              <span class="qq-mark">"</span>
              <p>{{ configData.quran.reference }}</p>
            </div>
          </div>
          <div class="split-img">
            <div class="img-frame-green">
              <img :src="configData.quran.image" alt="Open Quran" loading="lazy" />
            </div>
          </div>
        </div>

        
      </section>

      <!-- ── SALAH ── -->
      <section class="di-section" id="salah">
        <div class="section-label-row">
          <span class="section-num">06</span>
          <span class="section-rule"></span>
          <span class="section-tag">Second Pillar</span>
        </div>
        <h2 class="section-title"><em>Salah</em> — Five Daily Prayers</h2>

        <div class="section-tools" aria-label="Section tools">
          <button type="button" class="tool-pill tool-pill--wa" @click="shareWhatsApp('salah')">WhatsApp</button>
          <button type="button" class="tool-pill tool-pill--copy" @click="copyToClipboard('salah')">{{ copiedSectionId
            === 'salah' ? 'Copied' : 'Copy' }}</button>
          <!-- <button type="button" class="tool-pill tool-pill--print" @click="printSection('salah')">Print</button> -->
          <button type="button" class="tool-pill tool-pill--pdf" @click="downloadPdf('salah')">Download PDF</button>
          <button type="button" class="tool-pill tool-pill--report" @click="reportSection('salah')">Report</button>
          <button type="button" class="tool-circle" @click="decreaseFont('salah')">A-</button>
          <button type="button" class="tool-circle" @click="increaseFont('salah')">A+</button>
          <button type="button" class="tool-pill tool-pill--ai" @click="toggleAiSummary('salah')">{{ aiSummarySectionId
            === 'salah' ? 'Hide Summary' : 'AI Summary' }}</button>
        </div>
        <div v-if="aiSummarySectionId === 'salah'" class="ai-summary-inline" role="note">
          <div class="ai-summary-title">Summary</div>
          <ul class="ai-summary-points">
            <li v-for="p in aiSummaryPoints" :key="p">{{ p }}</li>
          </ul>
        </div>

        <div ref="tool_salah" class="section-tool-target"
          :style="{ '--tool-scale': sectionFontScale.salah }">
          <div class="prayer-timeline">
            <div class="prayer-card" v-for="prayer in configData.salah.prayers" :key="prayer.name"
              :style="{ '--prayer-color': prayer.color, '--prayer-bg': prayer.bg }">
              <div class="prayer-sky">{{ prayer.sky }}</div>
              <div class="prayer-time-badge">{{ prayer.time }}</div>
              <div class="prayer-name">{{ prayer.name }}</div>
              <div class="prayer-arabic">{{ prayer.arabic }}</div>
              <div class="prayer-rakah">{{ prayer.rakah }} Rak'ahs</div>
            </div>
          </div>

          <div class="split-layout" style="margin-top: 3rem">
            <div class="split-text">
              <p class="body-copy">{{ configData.salah.description }}</p>
              <div class="quran-quote">
                <span class="qq-mark">"</span>
                <p>{{ configData.salah.reference }}</p>
              </div>
            </div>
            <div class="split-img">
              <div class="img-frame-green">
                <img :src="configData.salah.image" alt="Muslim praying" loading="lazy" />
              </div>
            </div>
          </div>

          
        </div>
      </section>

      <!-- ── ZAKAT ── -->
      <section class="di-section" id="zakat">
        <div class="section-label-row">
          <span class="section-num">07</span>
          <span class="section-rule"></span>
          <span class="section-tag">Third Pillar</span>
        </div>
        <h2 class="section-title"><em>Zakat</em> — Obligatory Charity</h2>

        <div class="section-tools" aria-label="Section tools">
          <button type="button" class="tool-pill tool-pill--wa" @click="shareWhatsApp('zakat')">WhatsApp</button>
          <button type="button" class="tool-pill tool-pill--copy" @click="copyToClipboard('zakat')">{{ copiedSectionId
            === 'zakat' ? 'Copied' : 'Copy' }}</button>
          <!-- <button type="button" class="tool-pill tool-pill--print" @click="printSection('zakat')">Print</button> -->
          <button type="button" class="tool-pill tool-pill--pdf" @click="downloadPdf('zakat')">Download PDF</button>
          <button type="button" class="tool-pill tool-pill--report" @click="reportSection('zakat')">Report</button>
          <button type="button" class="tool-circle" @click="decreaseFont('zakat')">A-</button>
          <button type="button" class="tool-circle" @click="increaseFont('zakat')">A+</button>
          <button type="button" class="tool-pill tool-pill--ai" @click="toggleAiSummary('zakat')">{{ aiSummarySectionId
            === 'zakat' ? 'Hide Summary' : 'AI Summary' }}</button>
        </div>
        <div v-if="aiSummarySectionId === 'zakat'" class="ai-summary-inline" role="note">
          <div class="ai-summary-title">Summary</div>
          <ul class="ai-summary-points">
            <li v-for="p in aiSummaryPoints" :key="p">{{ p }}</li>
          </ul>
        </div>

        <div ref="tool_zakat" class="split-layout section-tool-target"
          :style="{ '--tool-scale': sectionFontScale.zakat }">
          <div class="split-text">
            <p class="section-lead">{{ configData.zakat.description }}</p>
            <p class="body-copy">It is due once a year and distinct from voluntary charity (Sadaqah). The Nisab
              threshold equals approximately 87.48g of gold in value.</p>
            <div class="quran-quote">
              <span class="qq-mark">"</span>
              <p>{{ configData.zakat.reference }}</p>
            </div>
          </div>
          <div class="split-text">
            <h4 class="sub-heading">8 Eligible Recipients <em>(Quran 9:60)</em></h4>
            <ul class="zakat-grid">
              <li v-for="recipient in configData.zakat.eligibleRecipients" :key="recipient">{{ recipient }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ── SAWM ── -->
      <section class="di-section" id="sawm">
        <div class="section-label-row">
          <span class="section-num">08</span>
          <span class="section-rule"></span>
          <span class="section-tag">Fourth Pillar</span>
        </div>
        <h2 class="section-title"><em>Sawm</em> — Fasting in Ramadan</h2>

        <div class="section-tools" aria-label="Section tools">
          <button type="button" class="tool-pill tool-pill--wa" @click="shareWhatsApp('sawm')">WhatsApp</button>
          <button type="button" class="tool-pill tool-pill--copy" @click="copyToClipboard('sawm')">{{ copiedSectionId
            === 'sawm' ? 'Copied' : 'Copy' }}</button>
          <!-- <button type="button" class="tool-pill tool-pill--print" @click="printSection('sawm')">Print</button> -->
          <button type="button" class="tool-pill tool-pill--pdf" @click="downloadPdf('sawm')">Download PDF</button>
          <button type="button" class="tool-pill tool-pill--report" @click="reportSection('sawm')">Report</button>
          <button type="button" class="tool-circle" @click="decreaseFont('sawm')">A-</button>
          <button type="button" class="tool-circle" @click="increaseFont('sawm')">A+</button>
          <button type="button" class="tool-pill tool-pill--ai" @click="toggleAiSummary('sawm')">{{ aiSummarySectionId
            === 'sawm' ? 'Hide Summary' : 'AI Summary' }}</button>
        </div>
        <div v-if="aiSummarySectionId === 'sawm'" class="ai-summary-inline" role="note">
          <div class="ai-summary-title">Summary</div>
          <ul class="ai-summary-points">
            <li v-for="p in aiSummaryPoints" :key="p">{{ p }}</li>
          </ul>
        </div>

        <div ref="tool_sawm" class="split-layout reverse section-tool-target"
          :style="{ '--tool-scale': sectionFontScale.sawm }">
          <div class="split-text">
            <p class="section-lead">{{ configData.sawm.description }}</p>
            <ul class="star-list">
              <li v-for="benefit in configData.sawm.benefits" :key="benefit">{{ benefit }}</li>
            </ul>
            <div class="quran-quote">
              <span class="qq-mark">"</span>
              <p>{{ configData.sawm.reference }}</p>
            </div>
          </div>
          <div class="split-img">
            <div class="img-frame-green">
              <img :src="configData.sawm.image" alt="Iftar meal at sunset" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <!-- ── HAJJ ── -->
      <section class="di-section" id="hajj">
        <div class="section-label-row">
          <span class="section-num">09</span>
          <span class="section-rule"></span>
          <span class="section-tag">Fifth Pillar</span>
        </div>
        <h2 class="section-title"><em>Hajj</em> — Pilgrimage to Makkah</h2>

        <div class="section-tools" aria-label="Section tools">
          <button type="button" class="tool-pill tool-pill--wa" @click="shareWhatsApp('hajj')">WhatsApp</button>
          <button type="button" class="tool-pill tool-pill--copy" @click="copyToClipboard('hajj')">{{ copiedSectionId
            === 'hajj' ? 'Copied' : 'Copy' }}</button>
          <!-- <button type="button" class="tool-pill tool-pill--print" @click="printSection('hajj')">Print</button> -->
          <button type="button" class="tool-pill tool-pill--pdf" @click="downloadPdf('hajj')">Download PDF</button>
          <button type="button" class="tool-pill tool-pill--report" @click="reportSection('hajj')">Report</button>
          <button type="button" class="tool-circle" @click="decreaseFont('hajj')">A-</button>
          <button type="button" class="tool-circle" @click="increaseFont('hajj')">A+</button>
          <button type="button" class="tool-pill tool-pill--ai" @click="toggleAiSummary('hajj')">{{ aiSummarySectionId
            === 'hajj' ? 'Hide Summary' : 'AI Summary' }}</button>
        </div>
        <div v-if="aiSummarySectionId === 'hajj'" class="ai-summary-inline" role="note">
          <div class="ai-summary-title">Summary</div>
          <ul class="ai-summary-points">
            <li v-for="p in aiSummaryPoints" :key="p">{{ p }}</li>
          </ul>
        </div>

        <div ref="tool_hajj" class="section-tool-target"
          :style="{ '--tool-scale': sectionFontScale.hajj }">
          <div class="split-layout">
            <div class="split-text">
              <p class="section-lead">{{ configData.hajj.description }}</p>
              <p class="body-copy">Pilgrims wear simple white garments (Ihram) symbolising equality before Allah,
                commemorating the trials of Prophet Ibrahim ﷺ and his family.</p>
              <div class="quran-quote">
                <span class="qq-mark">"</span>
                <p>{{ configData.hajj.reference }}</p>
              </div>
            </div>
            <div class="split-text">
              <h4 class="sub-heading">Key Rituals</h4>
              <ul class="hajj-steps">
                <li v-for="(step, i) in configData.hajj.keyRituals" :key="step">
                  <span class="step-num">{{ i + 1 }}</span>
                  <span>{{ step }}</span>
                </li>
              </ul>
            </div>
          </div>

          <figure class="hero-photo">
            <img :src="configData.hajj.image" alt="Ka'bah – Makkah" loading="lazy" />
            <figcaption>The Ka'bah — Al-Masjid Al-Haram, Makkah</figcaption>
          </figure>
        </div>
      </section>

      <!-- ── AFTERLIFE ── -->
      <section class="di-section" id="afterlife">
        <div class="section-label-row">
          <span class="section-num">10</span>
          <span class="section-rule"></span>
          <span class="section-tag">Eschatology</span>
        </div>
        <h2 class="section-title">The <em>Afterlife</em> (Akhirah)</h2>

        <div class="section-tools" aria-label="Section tools">
          <button type="button" class="tool-pill tool-pill--wa" @click="shareWhatsApp('afterlife')">WhatsApp</button>
          <button type="button" class="tool-pill tool-pill--copy" @click="copyToClipboard('afterlife')">{{
            copiedSectionId === 'afterlife' ? 'Copied' : 'Copy' }}</button>
          <!-- <button type="button" class="tool-pill tool-pill--print" @click="printSection('afterlife')">Print</button> -->
          <button type="button" class="tool-pill tool-pill--pdf" @click="downloadPdf('afterlife')">Download PDF</button>
          <button type="button" class="tool-pill tool-pill--report" @click="reportSection('afterlife')">Report</button>
          <button type="button" class="tool-circle" @click="decreaseFont('afterlife')">A-</button>
          <button type="button" class="tool-circle" @click="increaseFont('afterlife')">A+</button>
          <button type="button" class="tool-pill tool-pill--ai" @click="toggleAiSummary('afterlife')">{{
            aiSummarySectionId === 'afterlife' ? 'Hide Summary' : 'AI Summary' }}</button>
        </div>
        <div v-if="aiSummarySectionId === 'afterlife'" class="ai-summary-inline" role="note">
          <div class="ai-summary-title">Summary</div>
          <ul class="ai-summary-points">
            <li v-for="p in aiSummaryPoints" :key="p">{{ p }}</li>
          </ul>
        </div>

        <div ref="tool_afterlife" class="split-layout reverse section-tool-target"
          :style="{ '--tool-scale': sectionFontScale.afterlife }">
          <div class="split-text">
            <p class="section-lead">{{ configData.afterlife.description }}</p>
            <p class="body-copy">The afterlife (Akhirah) is eternal and far greater than this world. The Quran describes
              Jannah (Paradise) as a place of unimaginable bliss and Jahannam (Hell) as a place of punishment.</p>
            <div class="quran-quote">
              <span class="qq-mark">"</span>
              <p>{{ configData.afterlife.reference }}</p>
            </div>
          </div>
          <div class="split-text">
            <h4 class="sub-heading">Stages of the Afterlife</h4>
            <ul class="afterlife-stages">
              <li v-for="stage in configData.afterlife.concepts" :key="stage.name">
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
      <section class="di-section" id="dosdonts">
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
              <li v-for="item in configData.dosAndDonts.dos" :key="item"><span class="cl-dot"></span>{{ item }}</li>
            </ul>
          </div>
          <div class="twin-card card-donts">
            <div class="twin-card-header">
              <span class="tc-icon red">✕</span>
              <h3>Prohibited <em>(Haram)</em></h3>
            </div>
            <ul class="check-list">
              <li v-for="item in configData.dosAndDonts.donts" :key="item"><span class="cl-dot red"></span>{{ item }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ── FAQ ── -->
      <section class="di-section" id="faq">
        <div class="section-label-row">
          <span class="section-num">12</span>
          <span class="section-rule"></span>
          <span class="section-tag">Questions</span>
        </div>
        <h2 class="section-title">Common <em>Questions</em></h2>
        <p class="section-lead" style="margin-bottom: 2.5rem">Answered with care, nuance, and scholarly grounding.</p>

        <div class="faq-accordion">
          <div v-for="(faq, i) in faqsList" :key="i" class="faq-entry" :class="{ open: faq.open }">
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
      <section class="di-section" id="resources">
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
              <li v-for="app in configData.appsAndResources.apps" :key="app.name">
                <div class="res-icon">{{ app.icon }}</div>
                <div>
                  <strong>{{ app.name }}</strong>
                  <p>{{ app.description }}</p>
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
              <li v-for="site in websitesList" :key="site.name">
                <div class="res-icon">{{ site.icon }}</div>
                <div>
                  <a :href="site.url" target="_blank" rel="noopener">{{ site.name }}</a>
                  <p>{{ site.description }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

    </main>

    <button v-if="showScrollTop" type="button" class="scroll-top-fab" aria-label="Scroll to top" @click="scrollToTop">
      ↑
    </button>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import configData from '../../data/discover-islam-content.json'

export default {
  name: 'DiscoverIslam',
  data() {
    return {
      configData: configData,
      navScrolled: false,
      mobileMenuOpen: false,
      searchQuery: '',
      searchFocused: false,
      copiedSectionId: null,
      showScrollTop: false,
      aiSummarySectionId: null,
      aiSummaryPoints: [],
      // Fixed: single definition with intended default scale
      sectionFontScale: {
        shahada: 1.15,
        allah_quote: 1.15,
        prophet: 1.15,
        quran: 1.15,
        salah: 1.15,
        zakat: 1.15,
        sawm: 1.15,
        hajj: 1.15,
        afterlife: 1.15,
      },
      // Fixed: reactive FAQs (was mutating a computed property)
      faqs: configData.faqs ? configData.faqs.map(faq => ({ ...faq, open: false })) : [],
      sections: configData.searchSections || []
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
    },

    // Fixed: now returns the reactive data array
    faqsList() {
      return this.faqs
    },

    websitesList() {
      const sites = []
      if (this.configData.appsAndResources && this.configData.appsAndResources.websites) {
        sites.push(...this.configData.appsAndResources.websites.map(site => ({ ...site, icon: '🌐' })))
      }
      if (this.configData.sources) {
        sites.push(...this.configData.sources.map(source => ({ ...source, icon: '📚', description: 'Authoritative source' })))
      }
      return sites
    }
  },

  methods: {
    getToolEl(id) {
      const map = {
        shahada: 'tool_shahada',
        allah_quote: 'tool_allah_quote',
        prophet: 'tool_prophet',
        quran: 'tool_quran',
        salah: 'tool_salah',
        zakat: 'tool_zakat',
        sawm: 'tool_sawm',
        hajj: 'tool_hajj',
        afterlife: 'tool_afterlife',
      }
      const refKey = map[id]
      return refKey ? this.$refs[refKey] : null
    },
    getToolText(id) {
      const el = this.getToolEl(id)
      if (!el) return ''
      return (el.innerText || '').trim()
    },
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
    // Fixed: now mutates the reactive data array instead of computed
    toggleFaq(index) {
      const wasOpen = this.faqs[index].open
      this.faqs.forEach(f => f.open = false)
      if (!wasOpen) this.faqs[index].open = true
    },
    shareWhatsApp(sectionId) {
      const text = this.getToolText(sectionId)
      const url = `${window.location.origin}${window.location.pathname}#${sectionId === 'allah_quote' ? 'allah' : sectionId}`
      const payload = [text, '', url].filter(Boolean).join('\n')
      window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(payload)}`, '_blank', 'noopener,noreferrer')
    },
    async copyToClipboard(sectionId) {
      const text = this.getToolText(sectionId)
      if (!text) return
      try {
        await navigator.clipboard.writeText(text)
        this.copiedSectionId = sectionId
        window.setTimeout(() => {
          if (this.copiedSectionId === sectionId) this.copiedSectionId = null
        }, 1400)
      } catch (_) {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        try { document.execCommand('copy') } catch (_) { }
        document.body.removeChild(ta)
        this.copiedSectionId = sectionId
        window.setTimeout(() => {
          if (this.copiedSectionId === sectionId) this.copiedSectionId = null
        }, 1400)
      }
    },

    printSection(sectionId) {
      const targetEl = this.getToolEl(sectionId)
      if (!targetEl) return
      const section = targetEl.closest('.di-section')
      if (!section) return

      // Clone the section for printing
      const cloneSection = section.cloneNode(true)
      cloneSection.style.display = 'block'
      cloneSection.style.padding = '20px'
      cloneSection.style.backgroundColor = '#ffffff'
      
      // Create print container
      const printContainer = document.createElement('div')
      printContainer.id = 'print-container'
      printContainer.appendChild(cloneSection)
      
      // Remove existing print container if any
      const existingContainer = document.getElementById('print-container')
      if (existingContainer) existingContainer.remove()
      
      document.body.appendChild(printContainer)
      
      // Add print styles
      let printStyles = document.getElementById('temp-print-styles')
      if (!printStyles) {
        printStyles = document.createElement('style')
        printStyles.id = 'temp-print-styles'
        document.head.appendChild(printStyles)
      }
      
      printStyles.textContent = `
        @media print {
          body * {
            visibility: hidden !important;
          }
          #print-container, #print-container * {
            visibility: visible !important;
          }
          #print-container {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
          }
          .section-tools, .ai-summary-inline, .scroll-top-fab, .tool-pill, .tool-circle {
            display: none !important;
          }
          img {
            max-width: 100% !important;
            height: auto !important;
          }
        }
      `
      
      // Fixed: use afterprint event for reliable cleanup (prevents blank page)
      const cleanupPrint = () => {
        printContainer.remove()
        if (printStyles) printStyles.remove()
      }
      window.addEventListener('afterprint', cleanupPrint, { once: true })
      
      // Trigger print
      window.print()
    },

    async downloadPdf(sectionId) {
      const el = this.getToolEl(sectionId)
      if (!el) return

      // Fixed: only hide videos/iframes — keep images visible and included in PDF
      const mediaToHide = el.querySelectorAll('iframe, video')
      mediaToHide.forEach(media => {
        media.dataset.origDisplay = media.style.display
        media.style.display = 'none'
      })

      // Save original styles
      const origPadding = el.style.padding
      const origBg = el.style.background
      el.style.padding = '32px'
      el.style.background = '#ffffff'

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        ignoreElements: (element) => {
          // Fixed: only ignore videos/iframes (images are now captured)
          return element.tagName === 'IFRAME' || element.tagName === 'VIDEO'
        }
      })

      // Restore everything
      el.style.padding = origPadding
      el.style.background = origBg
      mediaToHide.forEach(media => {
        media.style.display = media.dataset.origDisplay || ''
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'pt', 'a4')
      const margin = 48
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // Draw title
      const titleMap = {
        shahada: 'The Shahada — First Pillar',
        allah_quote: 'Who is Allah? — Theology',
        prophet: 'Prophet Muhammad ﷺ — Prophethood',
        quran: 'The Holy Quran — Scripture',
        salah: 'Salah — Five Daily Prayers',
        zakat: 'Zakat — Obligatory Charity',
        sawm: 'Sawm — Fasting in Ramadan',
        hajj: 'Hajj — Pilgrimage to Makkah',
        afterlife: 'The Afterlife (Akhirah)',
      }
      const title = titleMap[sectionId] || sectionId

      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(16)
      pdf.setTextColor(22, 101, 52) // green-800
      pdf.text(title, margin, margin)

      pdf.setDrawColor(22, 101, 52)
      pdf.setLineWidth(0.5)
      pdf.line(margin, margin + 8, pageWidth - margin, margin + 8)

      const contentY = margin + 24
      const availableWidth = pageWidth - margin * 2
      const availableHeight = pageHeight - contentY - margin
      const ratio = Math.min(availableWidth / canvas.width, availableHeight / canvas.height)
      const imgWidth = canvas.width * ratio

      // Paginate slices
      let sourceY = 0
      let firstPage = true
      const sliceHeightPx = availableHeight / ratio

      while (sourceY < canvas.height) {
        if (!firstPage) {
          pdf.addPage()
          pdf.setFont('helvetica', 'bold')
          pdf.setFontSize(11)
          pdf.setTextColor(150, 150, 150)
          pdf.text(title, margin, margin - 12)
        }

        const startY = firstPage ? contentY : margin
        firstPage = false

        const remainingSource = canvas.height - sourceY
        const thisSliceH = Math.min(sliceHeightPx, remainingSource)

        const sliceCanvas = document.createElement('canvas')
        sliceCanvas.width = canvas.width
        sliceCanvas.height = thisSliceH
        const ctx = sliceCanvas.getContext('2d')
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height)
        ctx.drawImage(canvas, 0, sourceY, canvas.width, thisSliceH, 0, 0, canvas.width, thisSliceH)

        const sliceData = sliceCanvas.toDataURL('image/png')
        const renderedH = thisSliceH * ratio
        pdf.addImage(sliceData, 'PNG', margin, startY, imgWidth, renderedH)
        sourceY += thisSliceH
      }

      const safeName = sectionId.replace(/[^a-z0-9_-]/gi, '_').toLowerCase()
      pdf.save(`discover-islam-${safeName}.pdf`)
    },
    increaseFont(sectionId) {
      const cur = this.sectionFontScale[sectionId] || 1
      this.sectionFontScale[sectionId] = Math.min(1.25, Math.round((cur + 0.05) * 100) / 100)
    },
    decreaseFont(sectionId) {
      const cur = this.sectionFontScale[sectionId] || 1
      this.sectionFontScale[sectionId] = Math.max(0.9, Math.round((cur - 0.05) * 100) / 100)
    },
    toggleAiSummary(sectionId) {
      if (this.aiSummarySectionId === sectionId) {
        this.aiSummarySectionId = null
        this.aiSummaryPoints = []
        return
      }
      const text = this.getToolText(sectionId)
      const cleaned = text.replace(/\s+/g, ' ').trim()
      const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean)
      const points = []
      // Fixed: removed ellipsis truncation — now shows full sentences (no "...")
      for (const s of sentences.slice(0, 5)) {
        const fullSentence = s.trim()
        if (fullSentence && !points.includes(fullSentence)) points.push(fullSentence)
      }
      this.aiSummarySectionId = sectionId
      this.aiSummaryPoints = points.length ? points : ['No summary available for this section yet.']
    },
    reportSection(sectionId) {
      const text = this.getToolText(sectionId).slice(0, 1200)
      const title = sectionId === 'allah_quote' ? 'Quran quote' : sectionId
      const url = `${window.location.origin}${window.location.pathname}#${sectionId === 'allah_quote' ? 'allah' : sectionId}`
      const params = new URLSearchParams({
        subject: `Report issue: ${title}`,
        message: `${url}\n\n${text}`,
      })
      window.location.href = `/contact?${params.toString()}`
    },
    handleScroll() {
      this.navScrolled = window.scrollY > 60
      this.showScrollTop = window.scrollY > 700
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },

  mounted() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Restore saved scroll position
    const savedScroll = sessionStorage.getItem('discover-islam-scroll')
    if (savedScroll && !window.location.hash) {
      this.$nextTick(() => {
        window.scrollTo(0, parseInt(savedScroll))
      })
    }

    // Save scroll position before page unload/refresh
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('discover-islam-scroll', window.scrollY)
    })

    // Also save on scroll with debounce
    let scrollTimer
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        sessionStorage.setItem('discover-islam-scroll', window.scrollY)
      }, 200)
    })

    // Handle hash links (don't override manual scroll)
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1)
      setTimeout(() => {
        const target = document.getElementById(targetId)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }

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

.section-tool-target {
  transform: scale(var(--tool-scale, 1));
  transform-origin: top left;
}

.discover-islam {
  /* ── Islamic Green Palette ── */
  --forest: #163c2b;
  --green-deep: #1a5440;
  --green-mid: #1f6d4a;
  --green: #248b5b;
  --green-med: #2ea26f;
  --green-light: #55b98a;
  --green-pale: #b8e8d0;
  --green-mist: #dff3eb;
  --green-frost: #eef8f3;
  --green-ice: #f4f9f5;

  /* ── Gold Accents ── */
  --gold: #b8902a;
  --gold-warm: #d4a832;
  --gold-bright: #e8c04a;
  --gold-pale: #fdf3d0;
  --gold-mist: #fef9ec;

  /* ── Neutral Tones ── */
  --ink: #0f1f16;
  --text-main: #1a2e22;
  --text-soft: #3d5c49;
  --text-muted: #7a9e8a;
  --text-light: #a8c4b4;

  /* ── Surface Colors ── */
  --white: #ffffff;
  --surface: #f8fdf9;
  --surface-2: #f0f9f4;
  --surface-3: #e6f4ec;
  --border: #c8e4d4;
  --border-soft: #ddf0e7;

  /* ── Semantic ── */
  --rust: #c44a2a;
  --rust-light: #fde8e0;
  --rust-pale: #fff5f2;

  /* ── Fonts ── */
  --ff-display: 'Cormorant Garamond', Georgia, serif;
  --ff-body: 'Plus Jakarta Sans', -apple-system, sans-serif;
  --ff-arabic: 'Amiri', serif;

  /* ── Radii ── */
  --r-sm: 8px;
  --r-md: 14px;
  --r-lg: 22px;
  --r-xl: 32px;
  --r-2xl: 48px;

  /* ── Shadows ── */
  --shadow-green: 0 6px 24px rgba(45, 149, 100, 0.14);
  --shadow-sm: 0 2px 12px rgba(26, 71, 49, 0.08);
  --shadow-md: 0 6px 28px rgba(26, 71, 49, 0.10);
  --shadow-lg: 0 16px 56px rgba(26, 71, 49, 0.14);
  --shadow-xl: 0 28px 80px rgba(26, 71, 49, 0.18);
}

.discover-islam,
.discover-islam * {
  box-sizing: border-box;
}

.discover-islam {
  scroll-behavior: smooth;
}

.discover-islam {
  background: var(--green-ice);
  font-family: var(--ff-body);
  color: var(--text-main);
  line-height: 1.7;
  overflow-x: hidden;
}

.discover-islam h1,
.discover-islam h2,
.discover-islam h3,
.discover-islam h4,
.discover-islam blockquote {
  font-family: var(--ff-display);
  font-weight: 600;
}

.section-tool-target {
  font-size: calc(1rem * var(--tool-scale, 1));
  transition: font-size 0.15s ease;
}

/* Ensure children inherit the scaled size */
.section-tool-target p,
.section-tool-target li,
.section-tool-target div,
.section-tool-target span {
  font-size: inherit;
}

/* ──────────────────────────────
   Section tools (WhatsApp/Copy/Print/PDF/Report/Font)
   ────────────────────────────── */
.section-tools {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.9rem;
  align-items: center;
  margin: 1.15rem 0 0.9rem;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.section-tools::-webkit-scrollbar {
  display: none;
}

.section-tools--secondary {
  margin-top: 0.35rem;
}

.section-tools--compact {
  margin: 1rem 0 0.75rem;
  gap: 0.75rem;
}

.tool-pill {
  border: 1px solid rgba(15, 23, 42, 0.10);
  background: rgba(255, 255, 255, 0.86);
  color: var(--text-main);
  border-radius: 999px;
  padding: 0.65rem 1.25rem;
  font-weight: 700;
  font-size: 0.98rem;
  line-height: 1;
  box-shadow: var(--shadow-sm);
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, border-color 0.18s ease;
  white-space: nowrap;
}

.tool-pill:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.tool-pill:active {
  transform: translateY(0);
}

.tool-pill--wa {
  border-color: rgba(34, 197, 94, 0.28);
  background: rgba(34, 197, 94, 0.10);
  color: #0f5132;
}

.tool-pill--copy {
  border-color: rgba(59, 130, 246, 0.28);
  background: rgba(59, 130, 246, 0.10);
  color: #0b4aa3;
}

.tool-pill--print {
  border-color: rgba(15, 23, 42, 0.12);
  background: rgba(15, 23, 42, 0.04);
  color: rgba(15, 23, 42, 0.88);
}

.tool-pill--pdf {
  border-color: rgba(239, 68, 68, 0.28);
  background: rgba(239, 68, 68, 0.10);
  color: #991b1b;
}

.tool-pill--report {
  display: none !important;
}

.tool-pill--ai {
  border-color: rgba(85, 185, 138, 0.38);
  background: rgba(85, 185, 138, 0.12);
  color: var(--forest);
}

.tool-circle {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.10);
  background: rgba(255, 255, 255, 0.92);
  font-weight: 800;
  color: var(--forest);
  box-shadow: var(--shadow-sm);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  flex: 0 0 auto;
}

.tool-circle:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

:root[data-theme="dark"] .tool-pill,
:root[data-theme="dark"] .tool-circle {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(15, 24, 20, 0.75);
  color: rgba(255, 255, 255, 0.90);
}

:root[data-theme="dark"] .tool-pill--wa {
  background: rgba(34, 197, 94, 0.14);
  color: rgba(255, 255, 255, 0.92);
}

:root[data-theme="dark"] .tool-pill--copy {
  background: rgba(59, 130, 246, 0.16);
  color: rgba(255, 255, 255, 0.92);
}

:root[data-theme="dark"] .tool-pill--pdf {
  background: rgba(239, 68, 68, 0.16);
  color: rgba(255, 255, 255, 0.92);
}

:root[data-theme="dark"] .tool-pill--report {
  background: rgba(245, 158, 11, 0.16);
  color: rgba(255, 255, 255, 0.92);
}

:root[data-theme="dark"] .tool-pill--ai {
  background: rgba(99, 209, 161, 0.18);
  color: rgba(255, 255, 255, 0.92);
}

.ai-summary-inline {
  border: 1px solid var(--border-soft);
  background: var(--green-frost);
  border-radius: var(--r-lg);
  padding: 1rem 1.15rem;
  margin: 0 0 1.25rem;
}

.ai-summary-title {
  font-weight: 800;
  color: var(--forest);
  margin-bottom: 0.5rem;
}

.ai-summary-points {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--text-soft);
}

.ai-summary-points li {
  margin: 0.25rem 0;
}

/* Scroll-to-top FAB */
.scroll-top-fab {
  position: fixed;
  right: 18px;
  bottom: 18px;
  width: 54px;
  height: 54px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: linear-gradient(135deg, var(--forest) 0%, var(--green-mid) 100%);
  color: rgba(255, 255, 255, 0.92);
  box-shadow: var(--shadow-xl);
  z-index: 999;
  font-weight: 900;
  font-size: 1.15rem;
}

.scroll-top-fab:hover {
  transform: translateY(-2px);
}

@media print {
  body:not(.print-mode) * {
    display: none !important;
  }

  body.print-mode * {
    display: none !important;
  }

  body.print-mode .print-target,
  body.print-mode .print-target * {
    display: revert !important;
  }

  body.print-mode .print-target {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    padding: 24px !important;
    background: #fff !important;
    color: #000 !important;
  }

  /* Never print buttons, toolbars, nav */
  .section-tools,
  .scroll-top-fab,
  .di-hero,
  .di-disclaimer {
    display: none !important;
  }
}

.section-lead {
  font-size: 1.25rem;
  /* was ~1rem */
  line-height: 1.75;
}

.body-copy {
  font-size: 1.125rem;
  /* was ~1rem */
  line-height: 1.8;
}

.check-list li,
.star-list li,
.zakat-grid li,
.hajj-steps li,
.afterlife-stages li p,
.resource-list li p {
  font-size: 1.0625rem;
  /* 17px */
  line-height: 1.7;
}

.faq-body {
  font-size: 1.0625rem;
  line-height: 1.8;
}

.shd-body {
  font-size: 1.125rem;
  line-height: 1.8;
}

.prayer-name {
  font-size: 1.125rem;
}

.prayer-rakah {
  font-size: 1rem;
}

/* ──────────────────────────────
   HERO — Rich Islamic Green
   ────────────────────────────── */
.di-hero {
  background: linear-gradient(150deg, var(--forest) 0%, var(--green-deep) 40%, #1a4a38 70%, #0f2e1e 100%);
  min-height: min(72svh, 720px);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(4rem, 5.8vw, 6rem) 1.25rem clamp(3.5rem, 4.8vw, 5rem);
  text-align: center;
  overflow: hidden;
}

.hero-geo-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.geo-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(58, 173, 120, 0.22) 0%, transparent 70%);
  top: -15%;
  right: -8%;
  animation: orb-drift 14s ease-in-out infinite alternate;
}

.orb-2 {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(212, 168, 50, 0.12) 0%, transparent 70%);
  bottom: 0%;
  left: -10%;
  animation: orb-drift 18s ease-in-out infinite alternate-reverse;
}

.orb-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(85, 185, 138, 0.16) 0%, transparent 70%);
  top: 45%;
  left: 25%;
  animation: orb-drift 22s ease-in-out infinite alternate;
}

@keyframes orb-drift {
  from {
    transform: translate(0, 0) scale(1);
  }

  to {
    transform: translate(40px, 25px) scale(1.12);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  width: 100%;
}

.hero-container {
  position: relative;
  z-index: 2;
  max-width: 1240px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 2.75rem;
  align-items: center;
}

.hero-actions {
  width: 100%;
}

.hero-actions .hero-search-wrap {
  margin: 0 0 1.5rem;
  max-width: 100%;
}

.hero-actions .hero-pillars {
  justify-content: flex-start;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  margin-bottom: 2.5rem;
}

.eyebrow-line {
  flex: 1;
  max-width: 80px;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(212, 168, 50, 0.7));
}

.eyebrow-line:last-child {
  background: linear-gradient(to left, transparent, rgba(212, 168, 50, 0.7));
}

.eyebrow-text {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold-bright);
}

.hero-headline {
  margin-bottom: 1.75rem;
}

.headline-arabic {
  display: block;
  font-family: var(--ff-arabic);
  font-size: clamp(1.1rem, 3vw, 1.75rem);
  color: rgba(212, 168, 50, 0.85);
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

.headline-main em {
  font-style: italic;
  color: var(--green-light);
}

.hero-desc {
  color: rgba(255, 255, 255, 0.62);
  font-size: 1.05rem;
  line-height: 1.75;
  max-width: 560px;
  margin: 0 auto 3rem;
}

/* Search */
.hero-search-wrap {
  position: relative;
  max-width: 560px;
  margin: 0 auto 3.5rem;
}

.hero-search-box {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(85, 185, 138, 0.30);
  border-radius: 60px;
  padding: 0.4rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(12px);
}

.hero-search-box.focused {
  border-color: var(--green-light);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 0 4px rgba(85, 185, 138, 0.12), 0 20px 60px rgba(0, 0, 0, 0.3);
}

.search-ico {
  color: rgba(255, 255, 255, 0.4);
  width: 18px;
  margin: 0 0.8rem;
  flex-shrink: 0;
}

.search-inp {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: white;
  font-family: var(--ff-body);
  font-size: 0.93rem;
  padding: 0.75rem 0.5rem;
}

.search-inp::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.search-go {
  background: var(--green-med);
  border: none;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.25s ease;
}

.search-go svg {
  width: 16px;
  color: white;
}

.search-go:hover {
  background: var(--green-light);
  transform: scale(1.06);
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 0.8rem);
  left: 0;
  right: 0;
  background: rgba(12, 26, 19, 0.92);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-xl);
  overflow: auto;
  z-index: 200;
  border: 1px solid rgba(255, 255, 255, 0.10);
  max-height: 320px;
  backdrop-filter: blur(14px);
}

.search-dropdown::-webkit-scrollbar {
  width: 8px;
}

.search-dropdown::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.06);
}

.search-dropdown::-webkit-scrollbar-thumb {
  background: rgba(85, 185, 138, 0.35);
  border-radius: 999px;
}

.search-dropdown::-webkit-scrollbar-thumb:hover {
  background: rgba(85, 185, 138, 0.50);
}

.search-hit {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: background 0.18s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-align: left;
}

.search-hit:last-child {
  border-bottom: none;
}

.search-hit:hover {
  background: rgba(85, 185, 138, 0.12);
}

.hit-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
  width: 30px;
  text-align: center;
}

.hit-info {
  flex: 1;
  min-width: 0;
}

.hit-title {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.98rem;
}

.hit-excerpt {
  font-size: 0.86rem;
  color: rgba(255, 255, 255, 0.70);
  margin-top: 0.12rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hit-arrow {
  width: 15px;
  color: var(--green-med);
  flex-shrink: 0;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Chips */
.hero-pillars {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.pillar-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(85, 185, 138, 0.22);
  border-radius: var(--r-md);
  padding: 1.1rem 1.6rem;
  backdrop-filter: blur(10px);
  transition: all 0.25s ease;
}

.pillar-chip:hover {
  border-color: var(--green-light);
  background: rgba(85, 185, 138, 0.12);
  transform: translateY(-4px);
  box-shadow: var(--shadow-green);
}

.chip-num {
  font-family: var(--ff-display);
  font-size: 2.1rem;
  font-weight: 700;
  color: var(--green-light);
  line-height: 1;
}

.chip-label {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 0.35rem;
  letter-spacing: 0.3px;
}

.hero-scroll-hint {
  position: absolute;
  bottom: 4.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.28);
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  z-index: 2;
}

.scroll-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green-light);
  animation: bounce-dot 2s ease-in-out infinite;
}

@keyframes bounce-dot {

  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }

  50% {
    transform: translateY(9px);
    opacity: 0.35;
  }
}

.hero-wave-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 0;
  z-index: 1;
}

.hero-wave-bottom svg {
  width: 100%;
  height: 80px;
}

.hero-wave-bottom path {
  fill: var(--green-ice) !important;
}

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
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 5rem;
  box-shadow: var(--shadow-sm);
}

.disclaimer-shield {
  font-size: 1.15rem;
  flex-shrink: 0;
  margin-top: 0.05rem;
}

.di-disclaimer p {
  font-size: 0.82rem;
  color: var(--text-soft);
  line-height: 1.6;
}

.di-disclaimer strong {
  color: var(--forest);
}

/* ──────────────────────────────
   SECTIONS
   ────────────────────────────── */
.di-section {
  margin-bottom: 7rem;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.75s cubic-bezier(.22, .68, 0, 1.15), transform 0.75s cubic-bezier(.22, .68, 0, 1.15);
}

.di-section.in-view {
  opacity: 1;
  transform: translateY(0);
}

.section-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.1rem;
}

.section-num {
  font-family: var(--ff-display);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--green-med);
  letter-spacing: 1.5px;
}

.section-rule {
  flex: 0 0 50px;
  height: 1.5px;
  background: var(--green-pale);
  border-radius: 2px;
}

.section-tag {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--text-muted);
}

.section-title {
  font-family: var(--ff-display);
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 700;
  color: var(--forest);
  line-height: 1.12;
  margin-bottom: 1.4rem;
}

.section-title em {
  font-style: italic;
  color: var(--green-mid);
}

.section-lead {
  font-size: 1.05rem;
  color: var(--text-soft);
  line-height: 1.8;
  max-width: 700px;
  margin-bottom: 1.5rem;
}

.body-copy {
  font-size: 0.95rem;
  color: var(--text-soft);
  line-height: 1.8;
  margin-bottom: 1.4rem;
}

/* ── Twin Grid ── */
.twin-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
  margin-bottom: 2.5rem;
}

.twin-card {
  background: var(--white);
  border-radius: var(--r-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-soft);
  transition: all 0.3s ease;
}

.twin-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.twin-card-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.35rem 1.6rem;
}

.card-faith .twin-card-header {
  background: linear-gradient(135deg, var(--forest) 0%, var(--green-deep) 100%);
}

.card-pillars .twin-card-header {
  background: linear-gradient(135deg, #1c4030 0%, #2d7050 100%);
}

.card-dos .twin-card-header {
  background: linear-gradient(135deg, #0d2d1e 0%, var(--green-mid) 100%);
}

.card-donts .twin-card-header {
  background: linear-gradient(135deg, #3a0d0d 0%, #8b1a1a 100%);
}

.twin-card-header:not(.card-faith .twin-card-header):not(.card-pillars .twin-card-header):not(.card-dos .twin-card-header):not(.card-donts .twin-card-header) {
  background: linear-gradient(135deg, var(--forest) 0%, var(--green-mid) 100%);
}

.tc-icon {
  font-size: 1.35rem;
}

.tc-icon.red {
  color: #f8a0a0;
}

.twin-card-header h3 {
  font-family: var(--ff-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.twin-card-header h3 em {
  font-style: italic;
  opacity: 0.7;
}

.check-list {
  list-style: none;
  padding: 0.5rem 1.6rem 1rem;
}

.check-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--green-ice);
  font-size: 0.88rem;
  color: var(--text-soft);
  line-height: 1.5;
}

.check-list li:last-child {
  border-bottom: none;
}

.cl-dot {
  flex-shrink: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green-med);
  margin-top: 0.48rem;
}

.cl-dot.gold {
  background: var(--gold-warm);
}

.cl-dot.red {
  background: var(--rust);
}

/* Ref pill */
.ref-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--green-frost);
  border: 1px solid var(--border-soft);
  border-radius: 30px;
  padding: 15px;
  font-size: 0.74rem;
  color: var(--text-muted);
}

.ref-pill.centered {
  display: flex;
  justify-content: center;
  margin: 1.75rem auto 0;
  width: fit-content;
}

/* ── Photo duo ── */
.photo-duo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.75rem;
}

.photo-fig {
  border-radius: var(--r-md);
  overflow: hidden;
  position: relative;
}

.photo-fig img {
  width: 100%;
  height: 270px;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.photo-fig:hover img {
  transform: scale(1.05);
}

.photo-fig figcaption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(15, 35, 22, 0.85), transparent);
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.77rem;
  font-weight: 500;
  letter-spacing: 0.4px;
  padding: 2rem 1rem 0.9rem;
}

/* ── Video ── */
.video-embed {
  border-radius: var(--r-md);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  margin-bottom: 1.75rem;
}

.video-embed.compact {
  margin-top: 2.5rem;
}

.video-embed iframe {
  display: block;
  width: 100%;
  height: 400px;
  border: none;
}

.video-label {
  background: var(--forest);
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.75rem;
  padding: 0.7rem 1.2rem;
  text-align: center;
  letter-spacing: 0.3px;
}

/* ── Shahada ── */
.shahada-monument {
  background: linear-gradient(150deg, var(--forest) 0%, var(--green-deep) 50%, #0f2e1e 100%);
  border-radius: var(--r-2xl);
  padding: 5rem 3.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.shahada-geo-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  padding-top: 110%;
  border-radius: 50%;
  border: 1px solid rgba(85, 185, 138, 0.10);
  pointer-events: none;
}

.shahada-inner {
  position: relative;
  z-index: 2;
  max-width: 740px;
  margin: 0 auto;
}

.shd-arabic {
  font-family: var(--ff-arabic);
  font-size: clamp(1.6rem, 4vw, 2.9rem);
  color: var(--green-light);
  line-height: 1.7;
  margin-bottom: 1.4rem;
  direction: rtl;
}

.shd-roman {
  font-family: var(--ff-body);
  font-size: 0.98rem;
  color: var(--gold-bright);
  font-weight: 500;
  letter-spacing: 0.4px;
  margin-bottom: 0.7rem;
}

.shd-trans {
  font-family: var(--ff-display);
  font-style: italic;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.75rem;
}

.shd-body {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.85;
  max-width: 580px;
  margin: 0 auto;
}

/* ── Split Layout ── */
.split-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.split-layout.reverse .split-img {
  order: -1;
}

/* ── Quran Quote ── */
.quran-quote {
  background: var(--green-frost);
  border-left: 3px solid var(--green-med);
  border-radius: 0 var(--r-sm) var(--r-sm) 0;
  padding: 1.4rem 1.4rem 1.4rem 1.75rem;
  margin-top: 1.5rem;
  position: relative;
}

.qq-mark {
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  font-family: var(--ff-display);
  font-size: 3.5rem;
  color: var(--green-pale);
  line-height: 1;
}

.quran-quote p {
  font-family: var(--ff-display);
  font-style: italic;
  font-size: 1.02rem;
  color: var(--forest);
  line-height: 1.75;
  margin-bottom: 0.6rem;
}

.quran-quote cite {
  font-size: 0.77rem;
  color: var(--green-mid);
  font-style: normal;
  font-weight: 600;
}

/* ── 99 Names ── */
.split-names {
  background: var(--white);
  border-radius: var(--r-lg);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-soft);
  max-height: 560px;
  overflow-y: auto;
}

.split-names::-webkit-scrollbar {
  width: 4px;
}

.split-names::-webkit-scrollbar-track {
  background: var(--green-ice);
}

.split-names::-webkit-scrollbar-thumb {
  background: var(--green-pale);
  border-radius: 4px;
}

.names-title {
  font-family: var(--ff-display);
  font-size: 1.1rem;
  color: var(--forest);
  margin-bottom: 1.25rem;
  line-height: 1.3;
  position: sticky;
  top: 0;
  background: var(--white);
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-soft);
}

.names-title em {
  font-style: italic;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.names-cloud {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.name-tag {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.9rem;
  border-radius: var(--r-sm);
  cursor: default;
  transition: all 0.18s ease;
  border-bottom: 1px solid var(--green-ice);
}

.name-tag:last-child {
  border-bottom: none;
}

.name-tag:hover {
  background: var(--green-frost);
}

.name-ar {
  font-family: var(--ff-arabic);
  font-size: 1.1rem;
  color: var(--forest);
  direction: rtl;
  line-height: 1.5;
}

.name-en {
  font-size: 0.74rem;
  color: var(--text-muted);
  text-align: right;
  line-height: 1.4;
  max-width: 55%;
  font-weight: 500;
}

/* ── Image Frames ── */
.split-img {
  border-radius: var(--r-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.img-frame-green {
  border-radius: var(--r-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 3px solid var(--green-pale);
}

.img-frame-green img,
.split-img img {
  width: 100%;
  height: 330px;
  object-fit: cover;
  display: block;
  transition: transform 0.55s ease;
}

.img-frame-green:hover img,
.split-img:hover img {
  transform: scale(1.04);
}

/* ── Prophet Layout ── */
.prophet-layout {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 3rem;
  align-items: start;
}

.prophet-img-frame {
  border-radius: var(--r-lg);
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-lg);
}

.prophet-img-frame img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}

.img-caption-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(15, 30, 20, 0.88), transparent);
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.8rem;
  padding: 2.5rem 1.1rem 0.9rem;
  letter-spacing: 0.3px;
}

.sub-heading {
  font-family: var(--ff-display);
  font-size: 1.1rem;
  color: var(--forest);
  margin: 1.5rem 0 0.85rem;
}

.star-list {
  list-style: none;
}

.star-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid var(--green-ice);
  font-size: 0.9rem;
  color: var(--text-soft);
  line-height: 1.55;
}

.star-list li::before {
  content: '✦';
  color: var(--green-med);
  font-size: 0.65rem;
  flex-shrink: 0;
  margin-top: 0.32rem;
}

.star-list li:last-child {
  border-bottom: none;
}

.twin-refs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.4rem;
}

/* ── Fact Strips ── */
.fact-strips {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1.4rem 0;
}

.fact-strips li {
  background: linear-gradient(135deg, var(--forest) 0%, var(--green-mid) 100%);
  border-radius: var(--r-md);
  padding: 1.25rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.fs-num {
  font-family: var(--ff-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--green-light);
  line-height: 1;
}

.fs-label {
  font-size: 0.73rem;
  color: rgba(255, 255, 255, 0.5);
}

/* ── Prayer Timeline ── */
.prayer-timeline {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.1rem;
}

.prayer-card {
  background: var(--white);
  border-radius: var(--r-md);
  padding: 1.6rem 1rem;
  text-align: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-soft);
  border-top: 3px solid var(--prayer-color, var(--green-med));
  transition: all 0.3s ease;
}

.prayer-card:hover {
  transform: translateY(-7px);
  box-shadow: var(--shadow-lg);
}

.prayer-sky {
  font-size: 1.6rem;
  margin-bottom: 0.75rem;
}

.prayer-time-badge {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

.prayer-name {
  font-family: var(--ff-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--forest);
  margin-bottom: 0.25rem;
}

.prayer-arabic {
  font-family: var(--ff-arabic);
  font-size: 1.1rem;
  color: var(--green-mid);
  margin-bottom: 0.55rem;
  direction: rtl;
}

.prayer-rakah {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--prayer-color, var(--green-mid));
}

/* ── Zakat Grid ── */
.zakat-grid {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}

.zakat-grid li {
  background: var(--green-frost);
  border-radius: var(--r-sm);
  padding: 0.7rem 0.95rem;
  font-size: 0.84rem;
  color: var(--text-soft);
  border: 1px solid var(--border-soft);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.zakat-grid li::before {
  content: '◆';
  color: var(--green-med);
  font-size: 0.45rem;
  flex-shrink: 0;
}

/* ── Hajj Steps ── */
.hajj-steps {
  list-style: none;
}

.hajj-steps li {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--green-ice);
  font-size: 0.9rem;
  color: var(--text-soft);
  line-height: 1.55;
}

.hajj-steps li:last-child {
  border-bottom: none;
}

.step-num {
  flex-shrink: 0;
  width: 27px;
  height: 27px;
  background: var(--forest);
  color: var(--green-light);
  border-radius: 50%;
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Hero Photo ── */
.hero-photo {
  border-radius: var(--r-xl);
  overflow: hidden;
  margin-top: 2.5rem;
  box-shadow: var(--shadow-xl);
  position: relative;
}

.hero-photo img {
  width: 100%;
  height: 440px;
  object-fit: cover;
  display: block;
}

.hero-photo figcaption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(15, 35, 22, 0.78), transparent);
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.82rem;
  padding: 3rem 1.5rem 1.1rem;
  letter-spacing: 0.3px;
}

/* ── Afterlife Stages ── */
.afterlife-stages {
  list-style: none;
}

.afterlife-stages li {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--green-ice);
}

.afterlife-stages li:last-child {
  border-bottom: none;
}

.stage-icon {
  font-size: 1.35rem;
  flex-shrink: 0;
  width: 30px;
  text-align: center;
  margin-top: 0.1rem;
}

.afterlife-stages strong {
  display: block;
  color: var(--forest);
  font-size: 0.92rem;
  margin-bottom: 0.2rem;
}

.afterlife-stages p {
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.55;
}

/* Add to your component's styles (in the style section, not scoped if using global) */
.di-section .body-copy,
.di-section .section-lead,
.di-section .shd-body,
.di-section .faq-body,
.di-section .check-list li,
.di-section .star-list li,
.di-section .prayer-name,
.di-section .names-cloud .name-en {
  font-size: 1.1rem;
  line-height: 1.7;
}

/* For even larger text on mobile */
@media (max-width: 768px) {

  .di-section .body-copy,
  .di-section .section-lead {
    font-size: 1rem;
  }
}

/* ── Resource List ── */
.resource-list {
  list-style: none;
  padding: 0.5rem 1.6rem 1rem;
}

.resource-list li {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.85rem 0.7rem;
  border-radius: var(--r-sm);
  border-bottom: 1px solid var(--green-ice);
  transition: background 0.18s ease;
  font-size: 0.88rem;
}

.resource-list li:hover {
  background: var(--green-ice);
}

.resource-list li:last-child {
  border-bottom: none;
}

.res-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.resource-list strong {
  display: block;
  color: var(--forest);
  margin-bottom: 0.15rem;
  font-weight: 600;
}

.resource-list p {
  font-size: 0.74rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.resource-list a {
  color: var(--green-mid);
  text-decoration: none;
  font-weight: 600;
}

.resource-list a:hover {
  color: var(--forest);
  text-decoration: underline;
}

/* ── FAQ ── */
.faq-accordion {
  background: var(--white);
  border-radius: var(--r-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-soft);
}

.faq-entry {
  border-bottom: 1px solid var(--green-ice);
}

.faq-entry:last-child {
  border-bottom: none;
}

.faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem 1.9rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s ease;
}

.faq-trigger:hover {
  background: var(--green-ice);
}

.faq-entry.open .faq-trigger {
  background: var(--green-frost);
}

.faq-q-num {
  font-family: var(--ff-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--green-med);
  flex-shrink: 0;
  width: 30px;
}

.faq-q-text {
  flex: 1;
  font-family: var(--ff-display);
  font-size: 1.08rem;
  font-weight: 600;
  color: var(--forest);
  line-height: 1.4;
}

.faq-toggle-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  background: var(--forest);
  color: var(--green-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  line-height: 1;
  transition: all 0.25s ease;
}

.faq-entry.open .faq-toggle-icon {
  background: var(--green-med);
  color: white;
}

.faq-body {
  padding: 0 1.9rem 1.75rem 4.5rem;
  font-size: 0.91rem;
  color: var(--text-soft);
  line-height: 1.85;
}

.faq-expand-enter-active,
.faq-expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.faq-expand-enter-from,
.faq-expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-bottom: 0;
}

.faq-expand-enter-to,
.faq-expand-leave-from {
  max-height: 300px;
  opacity: 1;
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .twin-grid {
    grid-template-columns: 1fr;
  }

  .split-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .split-layout.reverse .split-img {
    order: 0;
  }

  .prophet-layout {
    grid-template-columns: 1fr;
  }

  .prayer-timeline {
    grid-template-columns: repeat(3, 1fr);
  }

  .fact-strips {
    grid-template-columns: 1fr 1fr;
  }

  .split-names {
    max-height: none;
  }
}

@media (max-width: 680px) {
  .hero-headline {
    letter-spacing: -1px;
  }

  .prayer-timeline {
    grid-template-columns: 1fr 1fr;
  }

  .photo-duo {
    grid-template-columns: 1fr;
  }

  .zakat-grid {
    grid-template-columns: 1fr;
  }

  .shahada-monument {
    padding: 3rem 1.75rem;
  }

  .hero-pillars {
    gap: 0.75rem;
  }

  .pillar-chip {
    padding: 0.9rem 1.15rem;
  }

  .video-embed iframe {
    height: 240px;
  }

  .di-main {
    padding: 3.5rem 1.5rem 5rem;
  }
}

@media (max-width: 980px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-actions .hero-pillars {
    justify-content: center;
  }

  .hero-actions .hero-search-wrap {
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 480px) {
  .prayer-timeline {
    grid-template-columns: 1fr;
  }

  .faq-trigger {
    padding: 1.1rem 1.25rem;
    gap: 0.75rem;
  }

  .faq-body {
    padding: 0 1.25rem 1.4rem 3rem;
  }

  .fact-strips {
    grid-template-columns: 1fr;
  }

  .names-cloud {
    gap: 0;
  }
}
</style>
