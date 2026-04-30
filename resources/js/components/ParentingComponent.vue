<template>
  <div id="islamic-connect-app">
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="hero-copy">
          <div class="hero-badge">Family guidance hub</div>
          <h1 class="hero-title">Parenting in Islam</h1>
          <p class="hero-sub">A practical guide for Muslim families navigating respect, boundaries, culture, conflict,
            marriage, faith, and emotional pressure in the West.</p>
          <div class="hero-search-shell">
            <div class="hero-search-wrap">
              <i class="bi bi-search" aria-hidden="true"></i>
              <input v-model="searchQuery" v-on:keyup.enter="doSearch" type="text" class="hero-search"
                placeholder="Search strict parents, marriage, boundaries..." aria-label="Search parenting topics" />
              <button class="hero-search-btn" v-on:click="doSearch">Search</button>
            </div>
            <div v-if="searchResults.length > 0" class="search-results-dropdown">
              <button v-for="result in searchResults" :key="result.id" class="search-result-item"
                v-on:click="scrollToChapter(result.id)">
                <span class="result-icon">{{ result.icon }}</span>
                <span>{{ result.title }}</span>
              </button>
            </div>
          </div>
          <div class="hero-actions">
            <button class="primary-action" v-on:click="scrollToChapter('ch1')">
              <i class="bi bi-play-fill" aria-hidden="true"></i>
              Start the guide
            </button>
            <button class="secondary-action" v-on:click="scrollToChapter('ch16')">
              <i class="bi bi-tools" aria-hidden="true"></i>
              Open tools
            </button>
          </div>
          <div class="hero-stats" aria-label="Guide summary">
            <div class="stat-pill"><strong>16</strong><span>Chapters</span></div>
            <div class="stat-pill"><strong>5</strong><span>Trusted sources</span></div>
            <div class="stat-pill"><strong>100+</strong><span>Practical tips</span></div>
          </div>
        </div>
        <aside class="hero-panel" aria-label="Recommended starting points">
          <div class="panel-kicker">Start with what you need today</div>
          <button v-for="item in featuredStarts" :key="item.id" class="hero-topic" v-on:click="scrollToChapter(item.id)">
            <span>{{ item.icon }}</span>
            <span>
              <strong>{{ item.shortTitle }}</strong>
              <small>{{ item.prompt }}</small>
            </span>
          </button>
          <div class="hero-note">
            <i class="bi bi-shield-check" aria-hidden="true"></i>
            Educational guidance with source notes throughout. For personal rulings or safety concerns, speak to a
            qualified scholar or trusted professional.
          </div>
        </aside>
      </div>
    </section>

    <nav class="chapter-nav sticky-nav">
      <div class="nav-inner">
        <button v-for="ch in chapters" :key="ch.id" class="nav-tab" :class="{ active: activeChapter === ch.id }"
          v-on:click="activeChapter = ch.id; scrollToChapter(ch.id)">
          <span class="nav-icon">{{ ch.icon }}</span>
          <span class="nav-label">{{ ch.shortTitle }}</span>
        </button>
        <button class="nav-tab" :class="{ active: activeChapter === 'resources' }" v-on:click="scrollToChapter('resources')">
          <span class="nav-icon">📱</span>
          <span class="nav-label">Resources</span>
        </button>
      </div>
    </nav>

    <div class="container-fluid parenting-layout">
      <aside class="page-rail" aria-label="Chapter index">
        <div class="rail-card">
          <div class="rail-title">Guide Sections</div>
          <button v-for="ch in chapters" :key="'rail-' + ch.id" class="rail-link"
            :class="{ active: activeChapter === ch.id }" v-on:click="scrollToChapter(ch.id)">
            <span>{{ ch.icon }}</span>
            <span>{{ ch.shortTitle }}</span>
          </button>
          <button class="rail-link" :class="{ active: activeChapter === 'resources' }" v-on:click="scrollToChapter('resources')">
            <span>📱</span>
            <span>Resources</span>
          </button>
        </div>
      </aside>

      <main class="main-content">
        <div class="disclaimer-banner">
          <i class="bi bi-info-circle" aria-hidden="true"></i>
          <span><strong>Disclaimer:</strong> This guide is educational and does not replace qualified scholarly,
            counselling, medical, or safeguarding advice. Sources are cited throughout.</span>
        </div>

      <!-- QUICK STATS BAR -->
      <div class="stats-bar">
        <div class="stat-card">
          <div class="stat-num">114</div>
          <div class="stat-lbl">Quranic Chapters</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">16</div>
          <div class="stat-lbl">Guide Chapters</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">5</div>
          <div class="stat-lbl">Trusted Sources</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">100+</div>
          <div class="stat-lbl">Practical Tips</div>
        </div>
      </div>

      <!-- ============ CHAPTER 1 ============ -->
      <section class="chapter-section" id="ch1">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">🏛️</div>
          <div>
            <div class="chapter-num">Chapter 1</div>
            <h2 class="chapter-title">Foundations of Parenting in Islam</h2>
          </div>
        </div>

        <div class="content-grid">
          <div class="content-card">
            <h3>Rights of Parents</h3>
            <p>Allah commands honouring parents immediately after Tawheed (monotheism) — placing this duty second only
              to worshipping Him alone. This is mentioned in Surah Al-Isra (17:23): <em>"Your Lord has decreed that you
                worship none but Him, and that you be kind to parents."</em></p>
            <div class="quran-block">
              <div class="quran-arabic">وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا
              </div>
              <div class="quran-ref">Surah Al-Isra 17:23 | Source: Quran.com</div>
            </div>
            <div class="tip-box">
              <strong>📌 Bite-Sized Reminder:</strong> The Prophet ﷺ was asked who deserves best companionship three
              times — each time he said "your mother," then "your father." (Sahih Bukhari 5971 | Source: Sunnah.com)
            </div>
          </div>

          <div class="content-card">
            <h3>Intention (Niyyah) in Family Life</h3>
            <p>Every act in your household — helping, speaking kindly, enduring difficulty — becomes an act of worship
              if done with sincere intention for Allah's sake. The Prophet ﷺ said: <em>"Actions are by intentions."</em>
              (Sahih Bukhari 1 | Source: Sunnah.com)</p>
            <div class="reminder-pill">💡 Reframe difficult moments: "I'm doing this for Allah, not just for them."
            </div>
          </div>

          <div class="content-card">
            <h3>Obedience vs Boundaries</h3>
            <p>Obedience to parents is obligatory <strong>except</strong> when they command disobedience to Allah. The
              Prophet ﷺ said: <em>"There is no obedience to creation in disobedience to the Creator."</em> (Ahmad |
              Source: Sunnah.com)</p>
            <div class="dos-donts">
              <div class="dos">
                <div class="dd-title">✅ Do</div>
                <ul>
                  <li>Obey in permissible matters</li>
                  <li>Explain your concerns calmly</li>
                  <li>Seek mediation from a scholar</li>
                  <li>Make dua for them</li>
                </ul>
              </div>
              <div class="donts">
                <div class="dd-title">❌ Don't</div>
                <ul>
                  <li>Obey in clear haram actions</li>
                  <li>Be rude in your refusal</li>
                  <li>Publicly shame them</li>
                  <li>Cut off ties</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="content-card full-width">
            <h3>Mercy, Respect & Ihsan</h3>
            <p><em>Ihsan</em> means excellence — doing more than the minimum. In family life, this means going beyond
              obligation to show genuine love, care, and kindness even when it's difficult. The Quran instructs us not
              to even say "uff" (a sound of irritation) to parents.</p>
          </div>
        </div>

        <div class="source-block">
          <strong>Sources:</strong> Quran.com (Surah Al-Isra 17:23), Sunnah.com (Sahih Bukhari 5971, Hadith on niyyah),
          SeekersGuidance.org (article on honouring parents)
        </div>

        <!-- FAQ -->
        <div class="faq-section">
          <h3 class="faq-title">Frequently Asked Questions</h3>
          <div v-for="(faq, i) in ch1Faqs" class="faq-item">
            <div class="faq-question" v-on:click="toggleFaq('ch1', i)">
              {{ faq.q }}
              <span class="faq-arrow">{{ faqOpen['ch1_' + i] ? '▲' : '▼' }}</span>
            </div>
            <div class="faq-answer" v-if="faqOpen['ch1_' + i]">{{ faq.a }}</div>
          </div>
        </div>
      </section>

      <!-- ============ CHAPTER 2 ============ -->
      <section class="chapter-section" id="ch2">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">💬</div>
          <div>
            <div class="chapter-num">Chapter 2</div>
            <h2 class="chapter-title">Communication with Parents</h2>
          </div>
        </div>

        <div class="content-grid">
          <div class="content-card">
            <h3>How to Talk Without Disrespect</h3>
            <p>The Quran instructs us to speak to parents with <em>qawlan kariman</em> — noble, dignified speech. This
              means choosing words carefully, keeping your tone soft, and never raising your voice in contempt.</p>
            <div class="script-box">
              <div class="script-title">📝 Practical Script</div>
              <p><em>"Baba/Mama, I want to talk about something. Can we find a good time? I want to understand your view
                  and share mine respectfully."</em></p>
            </div>
          </div>

          <div class="content-card">
            <h3>Handling Disagreements Calmly</h3>
            <p>The Prophet ﷺ never raised his voice in anger in his household. Seeking silence when heated, making wudu,
              and changing physical position (sitting if standing) are all prophetic remedies for anger. (Source:
              IslamQA.info)</p>
            <div class="steps-list">
              <div class="step"><span class="step-num">1</span> Pause — don't respond immediately when angry</div>
              <div class="step"><span class="step-num">2</span> Make wudu to cool down</div>
              <div class="step"><span class="step-num">3</span> Return to the conversation after emotions settle</div>
              <div class="step"><span class="step-num">4</span> Use "I feel..." statements, not blame</div>
            </div>
          </div>

          <div class="content-card">
            <h3>When Parents Don't Understand You</h3>
            <p>This is one of the most common struggles for Western Muslim youth. Your parents may have grown up in a
              completely different world. Their resistance often comes from love and fear, not malice.</p>
            <div class="empathy-box">
              <div class="empathy-item"><span>💚</span> Try to understand their fears first</div>
              <div class="empathy-item"><span>💚</span> Find common ground in Islamic values</div>
              <div class="empathy-item"><span>💚</span> Involve a trusted imam or elder if needed</div>
              <div class="empathy-item"><span>💚</span> Be patient — understanding takes time</div>
            </div>
          </div>

          <div class="content-card full-width">
            <h3>Video: Communication in Muslim Families</h3>
            <div class="video-row">
              <div class="video-wrap">
                <iframe src="https://www.youtube.com/embed/N4QeKnfSP3s" title="Muslim family communication"
                  frameborder="0" allowfullscreen class="yt-embed"></iframe>
                <div class="vid-label">Navigating Difficult Family Conversations — SeekersGuidance</div>
              </div>
              <div class="video-wrap">
                <iframe src="https://www.youtube.com/embed/CYe1wfPx4dU" title="Youth and parents in Islam"
                  frameborder="0" allowfullscreen class="yt-embed"></iframe>
                <div class="vid-label">How to Talk to Your Parents — Islamic Perspective</div>
              </div>
            </div>
          </div>

          
        </div>

        <div class="interactive-tool">
          <h3>🛠️ Conflict Phrase Generator</h3>
          <p>Select a situation and get an Islamically framed response:</p>
          <select v-model="conflictSituation" class="tool-select">
            <option value="">— Choose a situation —</option>
            <option value="curfew">Parents set an early curfew</option>
            <option value="career">Parents push a specific career</option>
            <option value="friends">Parents disapprove of your friends</option>
            <option value="marriage">Parents want to rush marriage</option>
          </select>
          <div v-if="conflictScript" class="script-output">
            <div class="script-title">Suggested Response:</div>
            <p>{{ conflictScript }}</p>
          </div>
        </div>

        <div class="source-block">
          <strong>Sources:</strong> Quran.com (Surah Al-Isra 17:23 — qawlan kariman), IslamQA.info (anger management in
          Islam), SeekersGuidance.org (family communication)
        </div>
      </section>

      <!-- ============ CHAPTER 3 ============ -->
      <section class="chapter-section" id="ch3">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">⚖️</div>
          <div>
            <div class="chapter-num">Chapter 3</div>
            <h2 class="chapter-title">Culture vs Islam</h2>
          </div>
        </div>

        <div class="culture-vs-islam-grid">
          <div class="cvi-card culture">
            <div class="cvi-header">Cultural Norms</div>
            <ul>
              <li>Honour/shame-based decisions</li>
              <li>"What will people say?"</li>
              <li>Gender double-standards</li>
              <li>Forced career paths</li>
              <li>Marrying from same village/tribe only</li>
            </ul>
          </div>
          <div class="cvi-vs">VS</div>
          <div class="cvi-card islam">
            <div class="cvi-header">Islamic Teachings</div>
            <ul>
              <li>Decisions based on taqwa, not shame</li>
              <li>Allah's pleasure over people's opinions</li>
              <li>Equal accountability for men & women</li>
              <li>Consultation and choice in career</li>
              <li>Piety as the basis for marriage</li>
            </ul>
          </div>
        </div>

        <div class="content-grid" style="margin-top:1.5rem">
          <div class="content-card">
            <h3>"My parents say it's haram but is it?"</h3>
            <p>Many things labelled "haram" by parents are actually cultural preferences, not Islamic rulings. Always
              verify with a qualified scholar. Trusted resources: <strong>IslamQA.info</strong>,
              <strong>SeekersGuidance.org</strong>, <strong>Islamweb.net</strong>.
            </p>
            <div class="warning-note">⚠️ <strong>Note:</strong> Don't use "it's not haram" to justify genuinely
              forbidden things. Check with sincerity.</div>
          </div>

          <div class="content-card">
            <h3>Breaking Toxic Cultural Norms Respectfully</h3>
            <div class="dos-donts">
              <div class="dos">
                <div class="dd-title">✅ Do</div>
                <ul>
                  <li>Use Islamic evidence calmly</li>
                  <li>Involve respected community figures</li>
                  <li>Make gradual, respectful change</li>
                </ul>
              </div>
              <div class="donts">
                <div class="dd-title">❌ Don't</div>
                <ul>
                  <li>Publicly embarrass parents</li>
                  <li>Use Western norms as argument</li>
                  <li>Make it a power struggle</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="content-card full-width">
            <h3>Video: Culture vs. Islam for Western Muslims</h3>
            <div class="video-row">
              <div class="video-wrap">
                <iframe src="https://www.youtube.com/embed/rQIBLnMhHJo" title="Culture vs Islam" frameborder="0"
                  allowfullscreen class="yt-embed"></iframe>
                <div class="vid-label">Culture vs. Islam — Sh. Omar Suleiman</div>
              </div>
              <div class="video-wrap">
                <iframe src="https://www.youtube.com/embed/WYrSP6vOPaI" title="Generational gaps Islam" frameborder="0"
                  allowfullscreen class="yt-embed"></iframe>
                <div class="vid-label">Generational Gaps in Muslim Families</div>
              </div>
            </div>
          </div>
        </div>

        <div class="interactive-tool">
          <h3>🛠️ Culture Check: Is It Islam or Culture?</h3>
          <p>Select a situation to see its Islamic ruling:</p>
          <div class="culture-checks">
            <div v-for="item in cultureChecks" class="cc-item" v-on:click="selectedCheck = item">
              <span>{{ item.label }}</span>
              <span class="cc-tag" :class="item.type">{{ item.type }}</span>
            </div>
          </div>
          <div v-if="selectedCheck" class="cc-detail">
            <strong>{{ selectedCheck.label }}</strong><br />
            <span>{{ selectedCheck.detail }}</span>
            <div class="cc-source">Source: {{ selectedCheck.source }}</div>
          </div>
        </div>

        <div class="source-block">
          <strong>Sources:</strong> IslamQA.info (cultural practices in Islam), SeekersGuidance.org (culture vs.
          shariah), Islamweb.net (tribal/racial discrimination in marriage)
        </div>
      </section>

      <!-- ============ CHAPTER 4 ============ -->
      <section class="chapter-section" id="ch4">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">😤</div>
          <div>
            <div class="chapter-num">Chapter 4</div>
            <h2 class="chapter-title">Conflict & Arguments</h2>
          </div>
        </div>

        <div class="content-grid">
          <div class="content-card">
            <h3>What Islam Says About Shouting & Anger</h3>
            <p>The Prophet ﷺ repeated "Don't be angry" three times when asked for advice. Uncontrolled anger is
              described as coming from Shaytan. Physically, changing posture, making wudu, or leaving the room
              temporarily are all recommended. (Source: Sunnah.com — Sahih Bukhari 6116)</p>
            <div class="hadith-block">
              <div class="hadith-text">"The strong person is not the one who can wrestle someone down, but the one who
                controls himself when angry."</div>
              <div class="hadith-ref">Sahih Bukhari 6114 | Source: Sunnah.com</div>
            </div>
          </div>

          <div class="content-card">
            <h3>Dealing with Strict Parents</h3>
            <div class="steps-list">
              <div class="step"><span class="step-num">1</span> Understand strictness often comes from fear</div>
              <div class="step"><span class="step-num">2</span> Build trust with small consistent actions</div>
              <div class="step"><span class="step-num">3</span> Show responsibility before asking for freedom</div>
              <div class="step"><span class="step-num">4</span> Request mediation from a trusted person</div>
              <div class="step"><span class="step-num">5</span> Make dua — hearts are in Allah's hands</div>
            </div>
          </div>

          

          <div class="content-card">
            <h3>Feeling Controlled or Misunderstood</h3>
            <p>Feeling suffocated is a real and valid experience. Islam acknowledges that oppressive treatment even from
              parents does not nullify your dignity. Seek counsel from a scholar or counsellor if you feel trapped.</p>
            <div class="tip-box">💡 <strong>Micro Tip:</strong> Say one sentence that de-escalates: <em>"I respect you,
                and I just need you to hear me."</em></div>
          </div>
        </div>

        <!-- INTERACTIVE ANGER TRACKER -->
        <div class="interactive-tool">
          <h3>🛠️ Anger Level Check-In</h3>
          <p>Before responding to your parents, check your anger level:</p>
          <div class="anger-meter">
            <input type="range" min="1" max="10" v-model="angerLevel" class="anger-slider" />
            <div class="anger-labels">
              <span>Calm</span>
              <span>Moderate</span>
              <span>Very Angry</span>
            </div>
            <div class="anger-advice" :class="angerAdviceClass">
              {{ angerAdvice }}
            </div>
          </div>
        </div>

        <div class="source-block">
          <strong>Sources:</strong> Sunnah.com (Sahih Bukhari 6114, 6116 — anger), SeekersGuidance.org (conflict in
          Islamic family life)
        </div>
      </section>

      <!-- ============ CHAPTER 5 ============ -->
      <section class="chapter-section" id="ch5">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">❤️</div>
          <div>
            <div class="chapter-num">Chapter 5</div>
            <h2 class="chapter-title">Emotional Struggles with Parents</h2>
          </div>
        </div>

        <div class="content-grid">
          <div class="content-card">
            <h3>Feeling Unloved or Unappreciated</h3>
            <p>Many Muslim parents express love through provision and protection, not verbal affirmation — a cultural
              and generational pattern. This doesn't mean they don't love you. However, your emotional need for
              acknowledgment is valid in Islam too.</p>
            <div class="reminder-pill">💚 Allah knows what is in the hearts — seek His acknowledgment first.</div>
          </div>

          <div class="content-card">
            <h3>Pressure to Meet Expectations</h3>
            <p>Excessive pressure contradicts the Islamic principle of <em>la tukallafu nafsan illa wus'aha</em> —
              "Allah does not burden a soul beyond what it can bear." (Quran 2:286 | Source: Quran.com)</p>
            <div class="quran-block">
              <div class="quran-arabic">لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا</div>
              <div class="quran-ref">Surah Al-Baqarah 2:286 | Source: Quran.com</div>
            </div>
          </div>

          <div class="content-card">
            <h3>Comparison with Siblings/Others</h3>
            <p>The Prophet ﷺ warned against partiality among children. Comparison is often used as "motivation" but can
              cause lasting harm. Know your own worth — in Islam, you are valued for your taqwa, not your grades or
              status.</p>
            <div class="tip-box">💡 Remind yourself: <em>"My worth is with Allah, not in comparison to anyone
                else."</em></div>
          </div>

          <div class="content-card">
            <h3>Healing Parent-Child Relationships</h3>
            <div class="steps-list">
              <div class="step"><span class="step-num">1</span> Forgive — for your own sake, not only theirs</div>
              <div class="step"><span class="step-num">2</span> Start small: a smile, a cup of tea</div>
              <div class="step"><span class="step-num">3</span> Dua — sincerely ask Allah to mend hearts</div>
              <div class="step"><span class="step-num">4</span> Seek family counselling if needed</div>
            </div>
          </div>
        </div>

        <div class="source-block">
          <strong>Sources:</strong> Quran.com (2:286), SeekersGuidance.org (emotional well-being in Islam), IslamQA.info
          (dealing with parental pressure)
        </div>

        <div class="faq-section">
          <h3 class="faq-title">Frequently Asked Questions</h3>
          <div v-for="(faq, i) in ch5Faqs" class="faq-item">
            <div class="faq-question" v-on:click="toggleFaq('ch5', i)">
              {{ faq.q }}
              <span class="faq-arrow">{{ faqOpen['ch5_' + i] ? '▲' : '▼' }}</span>
            </div>
            <div class="faq-answer" v-if="faqOpen['ch5_' + i]">{{ faq.a }}</div>
          </div>
        </div>
      </section>

      <!-- ============ CHAPTER 6 ============ -->
      <section class="chapter-section" id="ch6">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">🧠</div>
          <div>
            <div class="chapter-num">Chapter 6</div>
            <h2 class="chapter-title">Boundaries in Islam</h2>
          </div>
        </div>

        <div class="content-grid">
          <div class="content-card">
            <h3>Is It Allowed to Say No?</h3>
            <p>Yes — in Islam, obedience to parents is not unconditional. You may decline requests that are clearly
              sinful, harmful to you, or beyond your capacity. The key is <em>how</em> you decline: with respect,
              gentleness, and an explanation.</p>
          </div>

          <div class="content-card">
            <h3>Privacy & Independence</h3>
            <p>Islam recognises the concept of <em>awra</em> (privacy) and individual accountability. Adults are
              responsible for their own deeds before Allah — this implies a level of personal autonomy. Parents may
              guide, but cannot control every decision of an adult child.</p>
          </div>

          <div class="content-card">
            <h3>Toxic or Unfair Treatment</h3>
            <p>Islam forbids oppression (dhulm) from anyone — including parents. The Prophet ﷺ said: <em>"There is no
                harm and no causing harm."</em> (Ibn Majah 2341 | Source: Sunnah.com). Enduring harmful treatment in
              silence is not required by Islam.</p>
            <div class="warning-note">⚠️ If you are experiencing abuse, seek help from a trusted imam, counsellor, or
              community organisation.</div>
          </div>

          <div class="content-card">
            <h3>Respect vs Self-Respect Balance</h3>
            <div class="dos-donts">
              <div class="dos">
                <div class="dd-title">✅ Respectful</div>
                <ul>
                  <li>Disagreeing calmly</li>
                  <li>Expressing your limits kindly</li>
                  <li>Asking for space politely</li>
                </ul>
              </div>
              <div class="donts">
                <div class="dd-title">❌ Disrespectful</div>
                <ul>
                  <li>Yelling or slamming doors</li>
                  <li>Posting family issues publicly</li>
                  <li>Complete silent treatment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="source-block">
          <strong>Sources:</strong> Sunnah.com (Ibn Majah 2341 — la darar), SeekersGuidance.org (boundaries in Islamic
          family), IslamQA.info (refusing haram requests from parents)
        </div>
      </section>

      <!-- ============ CHAPTER 7 ============ -->
      <section class="chapter-section" id="ch7">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">🌍</div>
          <div>
            <div class="chapter-num">Chapter 7</div>
            <h2 class="chapter-title">Growing Up in Western Society</h2>
          </div>
        </div>

        <div class="content-grid">
          <div class="content-card">
            <h3>The Double Identity</h3>
            <p>Many Western Muslim youth feel torn between two worlds: the home (with cultural/Islamic expectations) and
              outside (with peer and societal pressure). This "double life" feeling is common and does not make you a
              bad Muslim.</p>
            <div class="reminder-pill">🌟 Your identity as a Muslim is not threatened by living in the West — it is
              tested and strengthened.</div>
          </div>

          <div class="content-card">
            <h3>Freedom vs Protection</h3>
            <p>Parents in the West often over-protect out of fear of the environment. Islam encourages balance — trust
              must be built gradually. The Prophet ﷺ gave companions independence as they demonstrated responsibility.
              (Source: SeekersGuidance.org)</p>
          </div>

          <div class="content-card full-width">
            <h3>Video: Being Muslim in the West</h3>
            <div class="video-row">
              <div class="video-wrap">
                <iframe src="https://www.youtube.com/embed/W5p1bYyNEE8" title="Muslim identity in the West"
                  frameborder="0" allowfullscreen class="yt-embed"></iframe>
                <div class="vid-label">Muslim Identity in the West — Yaqeen Institute</div>
              </div>
              <div class="video-wrap">
                <iframe src="https://www.youtube.com/embed/hNFbITGIkjQ" title="Growing up Muslim in the West"
                  frameborder="0" allowfullscreen class="yt-embed"></iframe>
                <div class="vid-label">Growing Up Muslim in the West</div>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h3>"You're Too Western" or "Too Strict"</h3>
            <p>Being labelled either way shows you exist at an intersection. This is not a flaw — Islam is for all times
              and places. The key is grounding yourself in Islamic principles while being able to navigate any
              environment.</p>
            <div class="tip-box">💡 <em>"I am Muslim first — that doesn't change based on geography."</em></div>
          </div>
        </div>

        <div class="source-block">
          <strong>Sources:</strong> SeekersGuidance.org (Muslim identity in the West), Yaqeen Institute research on
          Western Muslim youth
        </div>
      </section>

      <!-- ============ CHAPTER 8 ============ -->
      <section class="chapter-section" id="ch8">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">📚</div>
          <div>
            <div class="chapter-num">Chapter 8</div>
            <h2 class="chapter-title">Education, Career & Life Choices</h2>
          </div>
        </div>

        <div class="content-grid">
          <div class="content-card">
            <h3>Parents Forcing Careers</h3>
            <p>A parent's influence on career is permissible as guidance — but not as compulsion. Islam upholds the
              principle of <em>shura</em> (consultation) and individual accountability. You will answer to Allah for
              your life choices, not your parents.</p>
          </div>

          <div class="content-card">
            <h3>Passion vs Parental Expectations</h3>
            <p>The Prophet ﷺ is reported to have said: <em>"Allah loves that when one of you does a job, they do it with
                excellence (itqan)."</em> (Al-Bayhaqi | Source: IslamQA.info). Excellence is possible in any halal field
              — pursue what you can do with itqan.</p>
            <div class="dos-donts">
              <div class="dos">
                <div class="dd-title">✅ Do</div>
                <ul>
                  <li>Research Islamic perspectives on your field</li>
                  <li>Show your parents success stories</li>
                  <li>Make istikhara before big decisions</li>
                </ul>
              </div>
              <div class="donts">
                <div class="dd-title">❌ Don't</div>
                <ul>
                  <li>Choose a haram field to prove a point</li>
                  <li>Give up without trying to explain</li>
                  <li>Neglect parental input entirely</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h3>Moving Out for Study/Work</h3>
            <p>Moving out for legitimate educational or professional reasons is permissible and has precedent in Islamic
              history. However, maintaining ties with parents — regular calls, visits, financial support if able — is
              obligatory.</p>
            <div class="steps-list">
              <div class="step"><span class="step-num">1</span> Have an honest family discussion</div>
              <div class="step"><span class="step-num">2</span> Reassure them of continued contact</div>
              <div class="step"><span class="step-num">3</span> Commit to regular check-ins</div>
              <div class="step"><span class="step-num">4</span> Maintain halal living arrangements</div>
            </div>
          </div>

          <div class="content-card">
            <h3>Istikhara — Seeking Allah's Guidance</h3>
            <p>For any major life decision, perform Salah al-Istikhara and make sincere dua. This is not about receiving
              a dream — it is about submitting the decision to Allah and then moving forward with tawakkul (reliance on
              Allah).</p>
            <div class="reminder-pill">🤲 Istikhara Guide: Sunnah.com — Search "Salat al-Istikhara"</div>
          </div>
        </div>

        <div class="source-block">
          <strong>Sources:</strong> IslamQA.info (career choices in Islam, istikhara), Sunnah.com (du'a of istikhara),
          SeekersGuidance.org (moving out of the family home)
        </div>
      </section>

      <!-- ============ CHAPTER 9 ============ -->
      <section class="chapter-section" id="ch9">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">💑</div>
          <div>
            <div class="chapter-num">Chapter 9</div>
            <h2 class="chapter-title">Marriage & Relationships</h2>
          </div>
        </div>

        <div class="content-grid">
          <div class="content-card">
            <h3>Islamic Rights in Marriage Choice</h3>
            <p>Islam grants both men and women the right to consent to marriage. No valid marriage exists without the
              consent of both parties. (Source: IslamQA.info, based on Sahih Bukhari 5136). A wali (guardian) has the
              role of protection, not possession.</p>
            <div class="hadith-block">
              <div class="hadith-text">"A woman who has been previously married has more right to decide about herself
                than her guardian, and a virgin's consent must be sought."</div>
              <div class="hadith-ref">Sahih Muslim 1421 | Source: Sunnah.com</div>
            </div>
          </div>

          <div class="content-card">
            <h3>Cultural Barriers to Marriage</h3>
            <p>Refusing marriage proposals purely based on race or tribe contradicts the Prophetic teaching: <em>"If
                someone comes to you whose deen and character pleases you, then marry him."</em> (Tirmidhi 1084 |
              Source: Sunnah.com). Tribal pride is a sin in Islam.</p>
          </div>

          <div class="content-card">
            <h3>Love vs Arranged Marriage</h3>
            <p>Islam does not prohibit a person from expressing interest in marriage to someone — it prohibits unlawful
              relationships (khalwa, zina). Approaching a potential match through proper channels with the wali's
              involvement is halal and encouraged.</p>
            <div class="tip-box">💡 There is no "arranged" vs "love" dichotomy in Islam — there is only the halal
              process, which can include your input.</div>
          </div>

          <div class="content-card">
            <h3>Talking to Parents About Relationships</h3>
            <div class="script-box">
              <div class="script-title">📝 Opening Script</div>
              <p><em>"Baba/Mama, I've met someone I believe would be a good spouse based on their deen and character.
                  I'd like to discuss this with you and follow the proper process."</em></p>
            </div>
            <div class="dos-donts" style="margin-top:1rem">
              <div class="dos">
                <div class="dd-title">✅ Do</div>
                <ul>
                  <li>Be transparent early</li>
                  <li>Involve a trusted elder</li>
                  <li>Follow Islamic steps</li>
                </ul>
              </div>
              <div class="donts">
                <div class="dd-title">❌ Don't</div>
                <ul>
                  <li>Hide a relationship</li>
                  <li>Meet in private (khalwa)</li>
                  <li>Issue ultimatums</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="content-card full-width">
            <h3>Video: Marriage & Parents in Islam</h3>
            <div class="video-row">
              <div class="video-wrap">
                <iframe src="https://www.youtube.com/embed/gEfFwsQHJ-E" title="Marriage in Islam" frameborder="0"
                  allowfullscreen class="yt-embed"></iframe>
                <div class="vid-label">Talking to Parents About Marriage — Mufti Menk</div>
              </div>
              <div class="video-wrap">
                <iframe src="https://www.youtube.com/embed/3V7HqsMtXso" title="Halal relationships" frameborder="0"
                  allowfullscreen class="yt-embed"></iframe>
                <div class="vid-label">Navigating Halal Relationships for Youth</div>
              </div>
            </div>
          </div>
        </div>

        <div class="source-block">
          <strong>Sources:</strong> Sunnah.com (Sahih Bukhari 5136, Sahih Muslim 1421, Tirmidhi 1084), IslamQA.info
          (forced marriage in Islam), SeekersGuidance.org (marriage process)
        </div>

        <div class="faq-section">
          <h3 class="faq-title">Frequently Asked Questions</h3>
          <div v-for="(faq, i) in ch9Faqs" class="faq-item">
            <div class="faq-question" v-on:click="toggleFaq('ch9', i)">
              {{ faq.q }}
              <span class="faq-arrow">{{ faqOpen['ch9_' + i] ? '▲' : '▼' }}</span>
            </div>
            <div class="faq-answer" v-if="faqOpen['ch9_' + i]">{{ faq.a }}</div>
          </div>
        </div>
      </section>

      <!-- ============ CHAPTER 10 ============ -->
      <section class="chapter-section" id="ch10">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">🕌</div>
          <div>
            <div class="chapter-num">Chapter 10</div>
            <h2 class="chapter-title">Practising Islam with Parents</h2>
          </div>
        </div>

        <div class="content-grid">
          <div class="content-card">
            <h3>When Parents Are Less Practising</h3>
            <p>This is a test — not an excuse to be arrogant. The Prophet ﷺ's approach was always gentleness, example,
              and sincere love. You cannot force hidaya (guidance) — only Allah guides hearts.</p>
            <div class="reminder-pill">💡 Your job is to be an example, not a preacher in your own home.</div>
          </div>

          <div class="content-card">
            <h3>When You Become More Practising Than Them</h3>
            <div class="dos-donts">
              <div class="dos">
                <div class="dd-title">✅ Do</div>
                <ul>
                  <li>Lead by action and character</li>
                  <li>Make dua for their guidance</li>
                  <li>Share knowledge gently if asked</li>
                  <li>Maintain respect regardless</li>
                </ul>
              </div>
              <div class="donts">
                <div class="dd-title">❌ Don't</div>
                <ul>
                  <li>Lecture them at every opportunity</li>
                  <li>Look down on their level</li>
                  <li>Use religion as a weapon in arguments</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h3>Family Religious Habits to Build</h3>
            <div class="steps-list">
              <div class="step"><span class="step-num">1</span> Pray together when possible</div>
              <div class="step"><span class="step-num">2</span> Read Quran aloud at home</div>
              <div class="step"><span class="step-num">3</span> Share beneficial content casually</div>
              <div class="step"><span class="step-num">4</span> Celebrate Islamic occasions as a family</div>
              <div class="step"><span class="step-num">5</span> Make morning/evening adhkar a family habit</div>
            </div>
          </div>

          
        </div>

        <div class="source-block">
          <strong>Sources:</strong> SeekersGuidance.org (being more practising than parents), IslamQA.info (inviting
          family to Islam), Sunnah.com (family adhkar)
        </div>
      </section>

      <!-- ============ CHAPTER 11 ============ -->
      <section class="chapter-section" id="ch11">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">🤲</div>
          <div>
            <div class="chapter-num">Chapter 11</div>
            <h2 class="chapter-title">Du'as & Spiritual Approach</h2>
          </div>
        </div>

        <div class="dua-grid">
          <div class="dua-card" v-for="dua in duas">
            <div class="dua-arabic">{{ dua.arabic }}</div>
            <div class="dua-translation text-black">{{ dua.translation }}</div>
            <div class="dua-ref text-black">{{ dua.ref }}</div>
          </div>
        </div>

        <div class="content-grid" style="margin-top:1.5rem">
          <div class="content-card">
            <h3>Sabr (Patience) in Family Hardship</h3>
            <p>Sabr is not passive acceptance — it is active endurance with trust in Allah. The Quran tells us Allah is
              with those who are patient. (Quran 2:153 | Source: Quran.com). Every difficult family moment endured with
              sabr earns reward.</p>
          </div>

          <div class="content-card">
            <h3>Barakah in Respecting Parents</h3>
            <p>The Prophet ﷺ said that whoever wishes for an extended, blessed life and increase in provision should
              maintain family ties and honour parents. (Sahih Bukhari 5986 | Source: Sunnah.com)</p>
            <div class="reminder-pill">🌟 Barakah (blessing) is unlocked through parental du'a for you.</div>
          </div>
        </div>

        <div class="source-block">
          <strong>Sources:</strong> Quran.com (2:153, 14:40–41), Sunnah.com (Sahih Bukhari 5986), SeekersGuidance.org
          (du'a for parents)
        </div>
      </section>

      <!-- ============ CHAPTER 12 ============ -->
      <section class="chapter-section" id="ch12">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">🔒</div>
          <div>
            <div class="chapter-num">Chapter 12</div>
            <h2 class="chapter-title">Difficult & Sensitive Situations</h2>
          </div>
        </div>

        <div class="serious-notice">
          ⚠️ This chapter addresses serious situations. If you are in immediate danger, contact emergency services. For
          Islamic support, reach out to a trusted imam or Muslim counselling service.
        </div>

        <div class="content-grid">
          <div class="content-card">
            <h3>Toxic or Abusive Households</h3>
            <p>Islam explicitly forbids dhulm (oppression and injustice) from anyone — including parents. The Prophet ﷺ
              said: <em>"Beware of oppression, for oppression will be darkness on the Day of Judgement."</em> (Sahih
              Muslim 2578 | Source: Sunnah.com). Leaving an abusive situation is not disobedience.</p>
          </div>

          <div class="content-card">
            <h3>When to Seek Help</h3>
            <div class="steps-list">
              <div class="step"><span class="step-num">1</span> Speak to a trusted imam privately</div>
              <div class="step"><span class="step-num">2</span> Contact a Muslim counselling service</div>
              <div class="step"><span class="step-num">3</span> Reach out to a trustworthy adult outside the home</div>
              <div class="step"><span class="step-num">4</span> If in danger — contact services or authorities</div>
            </div>
          </div>

          <div class="content-card">
            <h3>Islamic Limits of Obedience</h3>
            <p>The scholars are unanimous: obedience to parents is obligatory only in permissible matters. When parents
              command disobedience to Allah, or when obeying them causes you clear physical or spiritual harm, the
              obligation ends. (Source: IslamQA.info, Islamweb.net)</p>
          </div>

          <div class="content-card">
            <h3>Emotional Neglect</h3>
            <p>Emotional neglect is a real harm. Islam's emphasis on <em>rahma</em> (mercy) in families means that a
              parent who consistently neglects a child's emotional wellbeing is falling short of their Islamic duty.
              Seek support — this is not ingratitude.</p>
            <div class="warning-note">⚠️ Your wellbeing matters. Getting help is an act of self-care, not betrayal.
            </div>
          </div>
        </div>

        <div class="source-block">
          <strong>Sources:</strong> Sunnah.com (Sahih Muslim 2578 — dhulm), IslamQA.info (limits of obedience),
          Islamweb.net (family abuse in Islam)
        </div>
      </section>

      <!-- ============ CHAPTER 13 ============ -->
      <section class="chapter-section" id="ch13">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">🤝</div>
          <div>
            <div class="chapter-num">Chapter 13</div>
            <h2 class="chapter-title">Building a Better Relationship</h2>
          </div>
        </div>

        <div class="content-grid">
          <div class="content-card">
            <h3>Small Actions with Big Impact</h3>
            <div class="empathy-box">
              <div class="empathy-item"><span>☕</span> Bring them tea/coffee without being asked</div>
              <div class="empathy-item"><span>📞</span> Call when you're away — just to check in</div>
              <div class="empathy-item"><span>🙏</span> Ask for their du'a before exams/big events</div>
              <div class="empathy-item"><span>🛒</span> Offer to help with errands</div>
              <div class="empathy-item"><span>💬</span> Sit with them in the evening</div>
            </div>
          </div>

          <div class="content-card">
            <h3>Becoming the "Cool-Headed One"</h3>
            <p>In family conflict, someone has to be the mature one. Islam encourages us to be that person. The Prophet
              ﷺ said the best among people is the one who benefits others. (Source: Sunnah.com). Choose to de-escalate,
              not escalate.</p>
            <div class="script-box">
              <div class="script-title">1 Sentence That De-escalates</div>
              <p><em>"I don't want to argue with you — I love you and I just want us to understand each other."</em></p>
            </div>
          </div>

          <div class="content-card">
            <h3>Rebuilding Trust</h3>
            <div class="steps-list">
              <div class="step"><span class="step-num">1</span> Be consistent — say what you do, do what you say</div>
              <div class="step"><span class="step-num">2</span> Apologise genuinely when you're wrong</div>
              <div class="step"><span class="step-num">3</span> Show improvement — don't just talk about it</div>
              <div class="step"><span class="step-num">4</span> Give it time — trust takes time to rebuild</div>
            </div>
          </div>

          <div class="content-card">
            <h3>Showing Appreciation</h3>
            <div class="tip-box">💡 <strong>3 Ways to Earn Barakah at Home:</strong><br />
              1. Say "JazakAllah khair" to your parents genuinely<br />
              2. Include them in your du'a by name<br />
              3. Speak well of them to others
            </div>
          </div>
        </div>

        <div class="source-block">
          <strong>Sources:</strong> Sunnah.com (best among people hadith), SeekersGuidance.org (rebuilding family
          relationships in Islam)
        </div>
      </section>

      <!-- ============ CHAPTER 14 ============ -->
      <section class="chapter-section" id="ch14">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">⚡</div>
          <div>
            <div class="chapter-num">Chapter 14</div>
            <h2 class="chapter-title">Quick Advice / Micro Content</h2>
          </div>
        </div>

        <div class="micro-grid">
          <div class="micro-card" v-for="tip in microTips">
            <div class="micro-icon">{{ tip.icon }}</div>
            <div class="micro-title">{{ tip.title }}</div>
            <div class="micro-body">{{ tip.body }}</div>
          </div>
        </div>

        <div class="interactive-tool">
          <h3>🛠️ Daily Habit Tracker</h3>
          <p>Track your daily relationship-building habits:</p>
          <div class="habit-tracker">
            <div v-for="habit in habits" class="habit-row">
              <label class="habit-label">
                <input type="checkbox" v-model="habit.done" class="habit-check" />
                <span :class="{ 'done-habit': habit.done }">{{ habit.label }}</span>
              </label>
              <span class="habit-reward" v-if="habit.done">+Barakah ✓</span>
            </div>
          </div>
          <div class="habit-score">
            Habits completed today: <strong>{{ completedHabits }}/{{ habits.length }}</strong>
            <span v-if="completedHabits === habits.length"> 🌟 SubhanAllah! Full day of goodness!</span>
          </div>
        </div>
      </section>

      <!-- ============ CHAPTER 15 ============ -->
      <section class="chapter-section" id="ch15">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">🎥</div>
          <div>
            <div class="chapter-num">Chapter 15</div>
            <h2 class="chapter-title">Real Stories & Scenarios</h2>
          </div>
        </div>

        <div class="stories-grid">
          <div class="story-card" v-for="story in stories">
            <div class="story-tag">Real Situation</div>
            <div class="story-title">{{ story.title }}</div>
            <div class="story-body">{{ story.body }}</div>
            <div class="story-response">
              <strong>Islamic Perspective:</strong> {{ story.response }}
            </div>
            <div class="story-source">Source: {{ story.source }}</div>
          </div>
        </div>

        <div class="interactive-tool">
          <h3>📬 Share Your Story (Anonymous)</h3>
          <p>Sharing your experience helps others feel less alone. This is a safe, moderated space.</p>
          <textarea v-model="userStory" class="story-textarea"
            placeholder="Write your situation anonymously... (e.g. 'My parents won't let me choose my career...')"></textarea>
          <button class="submit-btn" v-on:click="submitStory">Submit Anonymously</button>
          <div v-if="storySubmitted" class="success-notice">JazakAllah khair — your story has been noted. May Allah ease
            your situation.</div>
        </div>
      </section>

      <!-- ============ CHAPTER 16 ============ -->
      <section class="chapter-section" id="ch16">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">🧩</div>
          <div>
            <div class="chapter-num">Chapter 16</div>
            <h2 class="chapter-title">Interactive Content</h2>
          </div>
        </div>

        <!-- QUIZ -->
        <div class="interactive-tool">
          <h3>🛠️ "Are You Wrong Here?" — Scenario Quiz</h3>
          <p>Read the scenario and decide:</p>
          <div v-if="!quizDone">
            <div class="quiz-scenario">{{ currentScenario.scenario }}</div>
            <div class="quiz-options">
              <button class="quiz-btn" v-on:click="answerQuiz('youth')">Youth is Wrong</button>
              <button class="quiz-btn" v-on:click="answerQuiz('parent')">Parent is Wrong</button>
              <button class="quiz-btn" v-on:click="answerQuiz('both')">Both Have a Point</button>
            </div>
            <div v-if="quizFeedback" class="quiz-feedback">
              <strong>Feedback:</strong> {{ quizFeedback }}
              <br /><button class="next-btn" v-on:click="nextScenario">Next Scenario →</button>
            </div>
          </div>
          <div v-else class="quiz-done">
            <strong>Quiz Complete! Jazakum Allahu Khayran.</strong><br />
            Your score: {{ quizScore }}/{{ scenarios.length }} — Remember, understanding both sides is the goal.
            <br /><button class="next-btn" v-on:click="resetQuiz">Try Again</button>
          </div>
        </div>

        <!-- POLL -->
        <div class="interactive-tool">
          <h3>📊 Community Poll: How Strict Were Your Parents?</h3>
          <div class="poll-options">
            <div v-for="opt in pollOptions" class="poll-row">
              <button class="poll-btn" :class="{ selected: pollVote === opt.id }" v-on:click="castVote(opt.id)">
                {{ opt.label }}
              </button>
              <div class="poll-bar-wrap">
                <div class="poll-bar" :style="{ width: getPollPercent(opt.id) + '%' }"></div>
                <span class="poll-pct">{{ getPollPercent(opt.id) }}%</span>
              </div>
            </div>
          </div>
          <div v-if="pollVote" class="poll-note">JazakAllah for voting! ({{ totalPollVotes }} total responses)</div>
        </div>

        <!-- WHAT WOULD YOU DO -->
        <div class="interactive-tool">
          <h3>❓ "What Would You Do?" Situations</h3>
          <div v-for="(wyd, i) in wydSituations" class="wyd-item">
            <div class="wyd-q">{{ wyd.q }}</div>
            <div class="wyd-choices">
              <button v-for="choice in wyd.choices" class="wyd-btn"
                :class="{ selected: wydAnswers[i] === choice.val, correct: wydAnswers[i] && choice.correct }"
                v-on:click="wydAnswers[i] = choice.val; wydAnswers = [...wydAnswers]">
                {{ choice.label }}
              </button>
            </div>
            <div v-if="wydAnswers[i]" class="wyd-feedback">{{ wyd.feedback }}</div>
          </div>
        </div>
      </section>

      <!-- ============ APPS & RESOURCES ============ -->
      <section class="chapter-section" id="resources">
        <div class="chapter-header">
          <div class="chapter-icon-wrap">📱</div>
          <div>
            <div class="chapter-num">Resources</div>
            <h2 class="chapter-title">Apps & Learning Resources</h2>
          </div>
        </div>

        <div class="resources-grid">
          <div class="resource-card" v-for="res in resources">
            <div class="res-icon">{{ res.icon }}</div>
            <div class="res-name">{{ res.name }}</div>
            <div class="res-desc">{{ res.desc }}</div>
            <div class="res-type">{{ res.type }}</div>
          </div>
        </div>

        <div class="trusted-sources">
          <h3>Our 5 Trusted Islamic Sources</h3>
          <div class="sources-list">
            <div class="source-item" v-for="src in trustedSources">
              <div class="src-num">{{ src.num }}</div>
              <div>
                <div class="src-name">{{ src.name }}</div>
                <div class="src-url">{{ src.url }}</div>
                <div class="src-why">{{ src.why }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IslamicConnect',
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      activeChapter: 'ch1',
      chapterObserver: null,
      faqOpen: {},
      conflictSituation: '',
      selectedCheck: null,
      angerLevel: 3,
      userStory: '',
      storySubmitted: false,
      pollVote: null,
      pollCounts: { relaxed: 5, moderate: 12, strict: 18, veryStrict: 8 },
      quizIndex: 0,
      quizFeedback: '',
      quizScore: 0,
      quizDone: false,
      wydAnswers: [null, null, null],
      duas: [
        { arabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ', translation: 'My Lord, forgive me and my parents.', ref: 'Quran 71:28 | Quran.com', copied: false },
        { arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا', translation: 'My Lord, have mercy on them as they raised me when I was small.', ref: 'Quran 17:24 | Quran.com', copied: false },
        { arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ', translation: 'Our Lord, grant us from our spouses and offspring comfort to our eyes.', ref: 'Quran 25:74 | Quran.com', copied: false }
      ],
      habits: [
        { label: 'Made du\'a for parents after Salah', done: false },
        { label: 'Said something kind to a family member', done: false },
        { label: 'Helped without being asked', done: false },
        { label: 'Controlled my temper in a difficult moment', done: false },
        { label: 'Made istighfar for family conflicts', done: false }
      ],
      microTips: [
        { icon: '😤', title: 'When Your Parents Are Angry', body: 'Go quiet. Don\'t respond immediately. Let them finish. Then calmly say: "I hear you, can we talk about this when things are calm?"' },
        { icon: '🔥', title: '1 Sentence That De-escalates', body: '"I don\'t want to argue — I want us to understand each other." This works almost every time.' },
        { icon: '🚫', title: 'Never Say This', body: '"You don\'t understand anything." — This shuts down any chance of real communication instantly.' },
        { icon: '✨', title: '3 Ways to Earn Barakah at Home', body: '1. Smile first. 2. Do something helpful unprompted. 3. Make du\'a for them by name.' },
        { icon: '📵', title: 'Phone-Free Family Time', body: 'Put your phone away during family meals/gatherings. This single act can transform your relationship.' },
        { icon: '🤲', title: 'Morning Du\'a for Peace at Home', body: 'Start each day with du\'a for Allah to put love and harmony in your home.' }
      ],
      stories: [
        { title: '"My parents don\'t understand me…"', body: 'A 19-year-old university student feels her parents see her through a cultural lens, not who she really is. She loves her deen but feels suffocated at home.', response: 'This is not unusual. Cultural blind spots are real. The Islamic approach is to seek understanding through compassion and proper channels — not conflict. Dua and patience are real tools here.', source: 'Composite — SeekersGuidance.org community questions' },
        { title: '"I want to move out but feel guilty"', body: 'A 22-year-old male wants to move out for his career but feels he\'s abandoning his family duty. He can\'t afford a clear head at home.', response: 'Moving out for legitimate reasons is permissible in Islam. The obligation is to maintain ties and support — not physical proximity. Communicate your plan clearly and reassure your family.', source: 'IslamQA.info — question on moving out' },
        { title: '"They won\'t let me marry who I choose"', body: 'A Muslim woman wants to marry a practising man from a different background. Her parents refuse due to cultural reasons.', response: 'This is a well-documented issue in fiqh. Cultural-only refusal of a suitable, practising match contradicts the Sunnah. A scholar or Muslim mediator can help in this case.', source: 'Sunnah.com (Tirmidhi 1084), IslamQA.info' }
      ],
      pollOptions: [
        { id: 'relaxed', label: 'Very Relaxed' },
        { id: 'moderate', label: 'Moderate' },
        { id: 'strict', label: 'Strict' },
        { id: 'veryStrict', label: 'Very Strict' }
      ],
      scenarios: [
        { scenario: 'A 17-year-old wants to attend a mixed-gender school trip. Their parents refuse because "it\'s haram." Islamic schools allow mixed academic environments. Who is right?', correct: 'both', feedback: 'Both have a point. Parents\' caution is valid, but labelling all mixed educational settings as haram is not an established Islamic ruling. A conversation with a scholar would help.' },
        { scenario: 'A parent shouts and uses hurtful language at their 20-year-old child whenever they express an opinion. The child responds by going silent for weeks.', correct: 'both', feedback: 'The parent\'s behaviour contradicts Islamic adab. The child\'s extended silence (sulking) also needs addressing. Both need reflection. Seek mediation.' },
        { scenario: 'A 23-year-old is told they must marry their cousin. They refuse. Their parents say they are disobeying Allah.', correct: 'parent', feedback: 'The parents are wrong here. Forced marriage is haram in Islam. There is no Islamic obligation to marry a cousin. The child has the right to refuse.' }
      ],
      wydSituations: [
        { q: 'Your parent says something hurtful in anger. What do you do?', choices: [{ val: 'A', label: 'Argue back immediately', correct: false }, { val: 'B', label: 'Go quiet and address it later calmly', correct: true }, { val: 'C', label: 'Leave and don\'t speak for days', correct: false }], feedback: 'Option B is the prophetic approach. Address hurt feelings, but when emotions are calm — not in the heat of the moment.' },
        { q: 'Your parents forbid you from attending a halal Islamic event because they\'re worried. What do you do?', choices: [{ val: 'A', label: 'Go anyway without telling them', correct: false }, { val: 'B', label: 'Share details about the event and ask again', correct: true }, { val: 'C', label: 'Give up and never try', correct: false }], feedback: 'Option B — provide them with information to ease their worry. Build trust gradually.' },
        { q: 'You disagree with your parents on a non-religious matter. What is your Islamic right?', choices: [{ val: 'A', label: 'Obey regardless — no discussion allowed', correct: false }, { val: 'B', label: 'Disagree respectfully and express your view', correct: true }, { val: 'C', label: 'Ignore them and do what you want', correct: false }], feedback: 'Option B — shura (consultation) is encouraged in Islam. You have the right to express yourself respectfully.' }
      ],
      resources: [
        { icon: '📖', name: 'Quran.com', desc: 'Read and search the Quran in Arabic with translations and tafsir.', type: 'Website & App' },
        { icon: '📚', name: 'Sunnah.com', desc: 'Browse authenticated hadiths from the major collections.', type: 'Website' },
        { icon: '🎓', name: 'SeekersGuidance.org', desc: 'Free online Islamic courses and Q&A with verified scholars.', type: 'Website & Courses' },
        { icon: '❓', name: 'IslamQA.info', desc: 'Thousands of verified Q&As from Sh. Muhammad al-Munajjid.', type: 'Q&A Website' },
        { icon: '💬', name: 'Islamweb.net', desc: 'Fatwa centre, prayer times, and Islamic resources.', type: 'Website' },
        { icon: '📿', name: 'Muslim Pro', desc: 'Prayer times, Quran, dhikr counter, and qibla direction.', type: 'Mobile App' },
        { icon: '🌙', name: 'Athan App', desc: 'Adhan alerts, Quran, and daily Islamic reminders.', type: 'Mobile App' },
        { icon: '🎙️', name: 'Yaqeen Institute Podcast', desc: 'Research-based Islamic content for Western Muslim youth.', type: 'Podcast' }
      ],
      trustedSources: [
        { num: '01', name: 'Quran.com', url: 'quran.com', why: 'The most widely used Quran platform globally with multiple translations and tafsir.' },
        { num: '02', name: 'Sunnah.com', url: 'sunnah.com', why: 'Direct access to authenticated hadith collections (Bukhari, Muslim, Abu Dawud, etc.).' },
        { num: '03', name: 'SeekersGuidance.org', url: 'seekersguidance.org', why: 'Verified scholars, free courses, Q&A — widely trusted by Western Muslim communities.' },
        { num: '04', name: 'IslamQA.info', url: 'islamqa.info', why: 'One of the largest fatwa databases, reviewed by Sheikh Muhammad al-Munajjid.' },
        { num: '05', name: 'Islamweb.net', url: 'islamweb.net', why: 'Scholarly fatwa centre from Qatar with broad coverage of family and youth issues.' }
      ],
      chapters: [
        { id: 'ch1', icon: '🏛️', shortTitle: 'Foundations', title: 'Foundations of Parenting in Islam' },
        { id: 'ch2', icon: '💬', shortTitle: 'Communication', title: 'Communication with Parents' },
        { id: 'ch3', icon: '⚖️', shortTitle: 'Culture vs Islam', title: 'Culture vs Islam' },
        { id: 'ch4', icon: '😤', shortTitle: 'Conflict', title: 'Conflict & Arguments' },
        { id: 'ch5', icon: '❤️', shortTitle: 'Emotions', title: 'Emotional Struggles' },
        { id: 'ch6', icon: '🧠', shortTitle: 'Boundaries', title: 'Boundaries in Islam' },
        { id: 'ch7', icon: '🌍', shortTitle: 'Western Life', title: 'Growing Up in the West' },
        { id: 'ch8', icon: '📚', shortTitle: 'Career', title: 'Education & Career' },
        { id: 'ch9', icon: '💑', shortTitle: 'Marriage', title: 'Marriage & Relationships' },
        { id: 'ch10', icon: '🕌', shortTitle: 'Deen', title: 'Practising Islam' },
        { id: 'ch11', icon: '🤲', shortTitle: 'Duas', title: 'Duas & Spirituality' },
        { id: 'ch12', icon: '🔒', shortTitle: 'Serious Issues', title: 'Difficult Situations' },
        { id: 'ch13', icon: '🤝', shortTitle: 'Relationship', title: 'Building Better Bonds' },
        { id: 'ch14', icon: '⚡', shortTitle: 'Quick Tips', title: 'Quick Advice' },
        { id: 'ch15', icon: '🎥', shortTitle: 'Stories', title: 'Real Stories' },
        { id: 'ch16', icon: '🧩', shortTitle: 'Interactive', title: 'Interactive' }
      ],
      cultureChecks: [
        { label: 'Marrying only from same country/tribe', type: 'Culture', detail: 'Islam permits marriage to any suitable Muslim regardless of ethnicity or origin. Tribal exclusivity has no Islamic basis.', source: 'Islamweb.net — discrimination in marriage' },
        { label: 'Hijab for girls only, no modesty standard for boys', type: 'Culture', detail: 'Islam commands modesty (ghadd al-basar) for both men and women. The double standard is cultural, not Islamic.', source: 'IslamQA.info — modesty in Islam' },
        { label: 'Women cannot work outside the home', type: 'Mixed', detail: 'Islam permits women to work in halal environments. Khadijah (RA) was a businesswoman. Cultural restrictions vary but are not universal Islamic rulings.', source: 'SeekersGuidance.org' },
        { label: 'Praying 5 times a day', type: 'Islam', detail: 'This is a clear Islamic obligation (fard) — not culture. The five daily prayers are one of the five pillars of Islam.', source: 'Quran.com — Surah Al-Baqarah 2:43' },
        { label: 'Not allowed to have any friends of opposite gender', type: 'Mixed', detail: 'Islam prohibits khalwa (seclusion) and illicit relationships. However, professional/academic interaction with modesty and boundaries is generally permitted.', source: 'IslamQA.info — mixed interaction' }
      ],
      ch1Faqs: [
        { q: 'Does honouring parents mean doing everything they say?', a: 'No. Obedience to parents is obligatory in permissible matters but not in what contradicts Islamic law or causes you clear harm. The scholars are unanimous on this.' },
        { q: 'What if my parents are not Muslim?', a: 'You still owe them kindness, respect, and good companionship in all permissible matters. The Quran mentions this in Surah Luqman (31:15). You do not obey them in shirk, but you maintain the relationship with love.' },
        { q: 'Can I disagree with my parents?', a: 'Yes, respectfully. Islam encourages shura (consultation) and does not require you to suppress your opinion. The manner of disagreement matters greatly.' }
      ],
      ch5Faqs: [
        { q: 'Is it normal to feel emotionally disconnected from my parents?', a: 'Yes — many youth experience this, especially across cultural and generational gaps. It does not make you a bad Muslim. Seek to understand them while also setting healthy limits.' },
        { q: 'My parents compare me to my siblings constantly. What can I do?', a: 'Communicate how it affects you using "I feel" language. If it continues, a trusted family member or counsellor may help mediate.' }
      ],
      ch9Faqs: [
        { q: 'Can my parents force me to marry someone?', a: 'No. Forced marriage is haram in Islam. Both parties must consent for the marriage to be valid. A wali\'s role is protective, not coercive.' },
        { q: 'Is it haram to talk to a potential spouse?', a: 'Supervised, purposeful interaction to assess suitability for marriage is permitted. Khalwa (seclusion), inappropriate communication, and romantic relationships before marriage are not.' },
        { q: 'My parents refuse all proposals. What do I do?', a: 'Seek the help of a trusted imam or family elder. If your wali is unjustly preventing a valid marriage, a judge or imam may step in as wali in some madhabs. Consult a local scholar.' }
      ],
      conflictScripts: {
        curfew: '"Baba/Mama, I understand your concern about my safety. Can we discuss a curfew that works for both of us? I want you to feel comfortable while also being able to participate in normal activities."',
        career: '"I hear your vision for me, and I respect it. Can I show you some research about the path I\'m passionate about? I want to find something we both feel good about."',
        friends: '"I understand you have concerns. Would you be willing to meet my friends so you can see who they actually are? I value your opinion and want you to have all the information."',
        marriage: '"I know this is sensitive. Can we sit down and talk about what qualities you\'d want in my future spouse? I want your blessing and your guidance in this process."'
      },
      quizAnswerKey: ['both', 'both', 'parent']
    }
  },
  computed: {
    featuredStarts() {
      return [
        { ...this.chapters[0], prompt: 'Build the foundation first' },
        { ...this.chapters[3], prompt: 'Calm conflict before it grows' },
        { ...this.chapters[5], prompt: 'Respectful limits and privacy' },
        { ...this.chapters[8], prompt: 'Marriage pressure and choice' }
      ]
    },
    completedHabits() {
      return this.habits.filter(h => h.done).length
    },
    totalPollVotes() {
      return Object.values(this.pollCounts).reduce((a, b) => a + b, 0)
    },
    angerAdvice() {
      const lvl = parseInt(this.angerLevel)
      if (lvl <= 3) return '✅ Good level — you can have a productive conversation now.'
      if (lvl <= 6) return '⚠️ Moderate — take 5 deep breaths before responding.'
      return '🛑 Too angry — make wudu, change your position, and wait before speaking.'
    },
    angerAdviceClass() {
      const lvl = parseInt(this.angerLevel)
      if (lvl <= 3) return 'advice-good'
      if (lvl <= 6) return 'advice-warn'
      return 'advice-stop'
    },
    conflictScript() {
      return this.conflictScripts[this.conflictSituation] || ''
    },
    currentScenario() {
      return this.scenarios[this.quizIndex] || this.scenarios[0]
    }
  },
  mounted() {
    this.setupChapterObserver()
  },
  beforeUnmount() {
    if (this.chapterObserver) {
      this.chapterObserver.disconnect()
    }
  },
  methods: {
    doSearch() {
      const q = this.searchQuery.toLowerCase()
      if (!q) { this.searchResults = []; return }
      this.searchResults = this.chapters.filter(ch =>
        ch.title.toLowerCase().includes(q) || ch.shortTitle.toLowerCase().includes(q)
      ).slice(0, 6)
    },
    scrollToChapter(id) {
      this.activeChapter = id
      this.searchResults = []
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    toggleFaq(ch, i) {
      const key = ch + '_' + i
      this.faqOpen = {
        ...this.faqOpen,
        [key]: !this.faqOpen[key]
      }
    },
    copyDua(dua) {
      navigator.clipboard.writeText(dua.arabic + '\n' + dua.translation)
      dua.copied = true
      setTimeout(() => { dua.copied = false }, 2000)
    },
    castVote(id) {
      if (!this.pollVote) {
        this.pollVote = id
        this.pollCounts = {
          ...this.pollCounts,
          [id]: this.pollCounts[id] + 1
        }
      }
    },
    getPollPercent(id) {
      const total = this.totalPollVotes
      if (!total) return 0
      return Math.round((this.pollCounts[id] / total) * 100)
    },
    answerQuiz(answer) {
      const correct = this.quizAnswerKey[this.quizIndex]
      if (answer === correct) {
        this.quizScore++
        this.quizFeedback = '✅ Correct! ' + this.currentScenario.feedback
      } else {
        this.quizFeedback = '🤔 Not quite. ' + this.currentScenario.feedback
      }
    },
    nextScenario() {
      this.quizFeedback = ''
      if (this.quizIndex < this.scenarios.length - 1) {
        this.quizIndex++
      } else {
        this.quizDone = true
      }
    },
    resetQuiz() {
      this.quizIndex = 0
      this.quizFeedback = ''
      this.quizScore = 0
      this.quizDone = false
    },
    submitStory() {
      if (this.userStory.trim().length > 10) {
        this.storySubmitted = true
        this.userStory = ''
      }
    },
    setupChapterObserver() {
      if (typeof IntersectionObserver === 'undefined') return

      const sections = [...document.querySelectorAll('#islamic-connect-app .chapter-section')]
      if (!sections.length) return

      this.chapterObserver = new IntersectionObserver((entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target?.id) {
          this.activeChapter = visible.target.id
        }
      }, {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.15, 0.35, 0.6]
      })

      sections.forEach(section => this.chapterObserver.observe(section))
    }
  }
}
</script>

<style>
/* ===== ISLAMIC COLOR PALETTE ===== */
:root {
  --ic-green: #0f766e;
  --ic-green-light: #14b8a6;
  --ic-green-pale: #e9fbf6;
  --ic-green-border: #99f6e4;
  --ic-gold: #0e7490;
  --ic-gold-light: #67e8f9;
  --ic-gold-pale: #ecfeff;
  --ic-gold-border: #a5f3fc;
  --ic-navy: #0f2742;
  --ic-navy-light: #164e63;
  --ic-cream: #f3fbf9;
  --ic-white: #ffffff;
  --ic-text: #102522;
  --ic-text-muted: #56716d;
  --ic-text-light: #7f9994;
  --ic-danger: #0f5f66;
  --ic-danger-pale: #e6fffb;
  --ic-warn: #0e5f6f;
  --ic-warn-pale: #ecfeff;
  --ic-border: #d2ebe6;
  --ic-shadow: rgba(15, 118, 110, 0.08);
  --radius: 12px;
  --radius-sm: 8px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#islamic-connect-app {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: var(--ic-cream);
  color: var(--ic-text);
  line-height: 1.7;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* DISCLAIMER */
.disclaimer-banner {
  background: var(--ic-gold-pale);
  border-bottom: 1px solid var(--ic-gold-border);
  padding: 0.75rem 1.5rem;
  font-size: 0.8rem;
  color: var(--ic-warn);
  text-align: center;
}

/* HERO */
.hero-section {
  background: linear-gradient(135deg, var(--ic-navy) 0%, var(--ic-green) 60%, var(--ic-green-light) 100%);
  position: relative;
  padding: 5rem 0 4rem;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.hero-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  padding: 0.35rem 1.25rem;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}

.hero-title {
  color: #fff;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-highlight {
  color: var(--ic-gold-light);
}

.hero-sub {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.hero-search-wrap {
  display: flex;
  gap: 0;
  max-width: 540px;
  margin: 0 auto 1rem;
  position: relative;
}

.hero-search {
  flex: 1;
  padding: 0.85rem 1.25rem;
  border: none;
  border-radius: var(--radius) 0 0 var(--radius);
  font-size: 0.95rem;
  outline: none;
  background: rgba(255, 255, 255, 0.95);
  color: var(--ic-text);
}

.hero-search-btn {
  background: var(--ic-green-light);
  color: #fff;
  border: none;
  padding: 0.85rem 1.5rem;
  border-radius: 0 var(--radius) var(--radius) 0;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.hero-search-btn:hover {
  background: var(--ic-gold-light);
}

.search-results-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 0 0 var(--radius) var(--radius);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 100;
  margin-top: 0.25rem;
}

.search-result-item {
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--ic-text);
  border-bottom: 1px solid var(--ic-border);
  transition: background 0.15s;
}

.search-result-item:hover {
  background: var(--ic-green-pale);
}

.result-icon {
  font-size: 1.1rem;
}

.hero-stats {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.stat-pill {
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 0.35rem 1rem;
  font-size: 0.82rem;
}

/* NAV */
.sticky-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--ic-green);
  border-bottom: 2px solid var(--ic-green-light);
  overflow-x: auto;
}

.nav-inner {
  display: flex;
  gap: 0;
  padding: 0;
  white-space: nowrap;
}

.nav-tab {
  background: none;
  border: none;
  padding: 0.7rem 1rem;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 0.8rem;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
  white-space: nowrap;
}

.nav-tab:hover {
  color: #fff;
  /* background: rgba(255, 255, 255, 0.08); */
}

.nav-tab.active {
  color: var(--ic-gold-light);
  border-bottom-color: var(--ic-gold-light);
  background: rgba(255, 255, 255, 0.05);
}

.nav-label {
  display: none;
}

@media (min-width: 768px) {
  .nav-label {
    display: inline;
    margin-left: 0.35rem;
  }
}

/* STATS BAR */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 2rem 0;
}

.stat-card {
  background: var(--ic-white);
  border: 1px solid var(--ic-border);
  border-radius: var(--radius);
  padding: 1.25rem;
  text-align: center;
  border-top: 3px solid var(--ic-green);
}

.stat-num {
  font-size: 2rem;
  font-weight: 700;
  color: var(--ic-green);
}

.stat-lbl {
  font-size: 0.8rem;
  color: var(--ic-text-muted);
  margin-top: 0.25rem;
}

/* MAIN CONTENT */
.main-content {
  padding: 1rem 0 3rem;
}

/* CHAPTER */
.chapter-section {
  background: var(--ic-white);
  border: 1px solid var(--ic-border);
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 2rem;
  scroll-margin-top: 60px;
}

.chapter-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 2px solid var(--ic-green-pale);
  padding-bottom: 1.25rem;
  margin-bottom: 1.75rem;
}

.chapter-icon-wrap {
  font-size: 2rem;
  width: 56px;
  height: 56px;
  background: var(--ic-green-pale);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--ic-green-border);
  flex-shrink: 0;
}

.chapter-num {
  font-size: 0.75rem;
  color: var(--ic-text-light);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.chapter-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ic-navy);
}

/* CONTENT GRID */
.content-grid {
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); */
  gap: 1.25rem;
}

.content-card {
  background: var(--ic-cream);
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  padding: 1.25rem;
}

.content-card.full-width {
  grid-column: 1 / -1;
}

.content-card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ic-navy);
  margin-bottom: 0.75rem;
}

.content-card p {
  font-size: 0.92rem;
  color: var(--ic-text);
  line-height: 1.7;
}

/* QURAN / HADITH BLOCKS */
.quran-block {
  background: var(--ic-gold-pale);
  border-left: 4px solid var(--ic-gold);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 1rem 1.25rem;
  margin-top: 1rem;
}

.quran-arabic {
  font-size: 1.5rem;
  text-align: right;
  color: var(--ic-green);
  line-height: 2;
  direction: rtl;
  font-family: 'Amiri', 'Traditional Arabic', serif;
}

.quran-ref {
  font-size: 0.78rem;
  color: var(--ic-warn);
  margin-top: 0.5rem;
}

.hadith-block {
  background: var(--ic-green-pale);
  border-left: 4px solid var(--ic-green);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 1rem 1.25rem;
  margin-top: 1rem;
}

.hadith-text {
  font-style: italic;
  color: var(--ic-navy);
  font-size: 0.92rem;
}

.hadith-ref {
  font-size: 0.78rem;
  color: var(--ic-green);
  margin-top: 0.5rem;
}

/* TIP / REMINDER */
.tip-box {
  background: var(--ic-gold-pale);
  border: 1px solid var(--ic-gold-border);
  border-radius: var(--radius-sm);
  padding: 0.85rem 1rem;
  margin-top: 1rem;
  font-size: 0.88rem;
  color: var(--ic-warn);
}

.reminder-pill {
  display: inline-block;
  background: var(--ic-green-pale);
  border: 1px solid var(--ic-green-border);
  border-radius: 50px;
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  color: var(--ic-green);
  margin-top: 0.75rem;
}

.warning-note {
  background: var(--ic-danger-pale);
  border: 1px solid #f5c6c6;
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  font-size: 0.88rem;
  color: var(--ic-danger);
  margin-top: 1rem;
}

/* DOS & DONTS */
.dos-donts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 1rem;
}

.dos {
  background: var(--ic-green-pale);
  border: 1px solid var(--ic-green-border);
  border-radius: var(--radius-sm);
  padding: 0.85rem;
}

.donts {
  background: var(--ic-danger-pale);
  border: 1px solid #f5c6c6;
  border-radius: var(--radius-sm);
  padding: 0.85rem;
}

.dd-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.dos .dd-title {
  color: var(--ic-green);
}

.donts .dd-title {
  color: var(--ic-danger);
}

.dos ul,
.donts ul {
  padding-left: 1.1rem;
  font-size: 0.85rem;
}

.dos li {
  color: var(--ic-green);
}

.donts li {
  color: var(--ic-danger);
}

/* STEPS */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9rem;
}

.step-num {
  background: var(--ic-green);
  color: #fff;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

/* SCRIPTS */
.script-box {
  background: var(--ic-navy);
  border-radius: var(--radius-sm);
  padding: 1rem 1.25rem;
  margin-top: 1rem;
}

.script-title {
  font-size: 0.78rem;
  color: var(--ic-gold-light);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}

.script-box p {
  font-style: italic;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
}

/* EMPATHY BOX */
.empathy-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.empathy-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  padding: 0.5rem;
  background: var(--ic-green-pale);
  border-radius: var(--radius-sm);
}

/* IMAGES */
.image-block {
  margin-top: 0.75rem;
}

.section-img {
  width: 100%;
  border-radius: var(--radius-sm);
  object-fit: cover;
  max-height: 300px;
}

.img-credit {
  font-size: 0.72rem;
  color: var(--ic-text-light);
  margin-top: 0.35rem;
}

/* VIDEOS */
.video-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.video-wrap {
  display: flex;
  flex-direction: column;
}

.yt-embed {
  width: 100%;
  height: 220px;
  border-radius: var(--radius-sm);
  border: none;
}

.vid-label {
  font-size: 0.8rem;
  color: var(--ic-text-muted);
  margin-top: 0.4rem;
  text-align: center;
}

/* SOURCE BLOCK */
.source-block {
  background: var(--ic-cream);
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  font-size: 0.78rem;
  color: var(--ic-text-muted);
  margin-top: 1.5rem;
}

/* FAQ */
.faq-section {
  margin-top: 1.5rem;
}

.faq-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ic-navy);
  margin-bottom: 0.75rem;
}

.faq-item {
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.faq-question {
  padding: 0.85rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ic-navy);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--ic-white);
  transition: background 0.15s;
}

.faq-question:hover {
  background: var(--ic-green-pale);
}

.faq-arrow {
  color: var(--ic-green);
  font-size: 0.75rem;
}

.faq-answer {
  padding: 0.85rem 1rem;
  font-size: 0.88rem;
  background: var(--ic-cream);
  color: var(--ic-text);
  border-top: 1px solid var(--ic-border);
}

/* INTERACTIVE TOOL */
.interactive-tool {
  background: linear-gradient(135deg, var(--ic-green-pale), var(--ic-gold-pale));
  border: 1px solid var(--ic-green-border);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.interactive-tool h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ic-navy);
  margin-bottom: 0.5rem;
}

.interactive-tool p {
  font-size: 0.88rem;
  color: var(--ic-text-muted);
  margin-bottom: 1rem;
}

.tool-select {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  background: var(--ic-white);
  color: var(--ic-text);
  margin-bottom: 1rem;
}

.script-output {
  background: var(--ic-white);
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  padding: 1rem;
  font-size: 0.9rem;
  font-style: italic;
  color: var(--ic-navy);
}

/* CULTURE VS ISLAM */
.culture-vs-islam-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
}

.cvi-card {
  background: var(--ic-white);
  border-radius: var(--radius-sm);
  padding: 1.25rem;
}

.cvi-card.culture {
  border: 2px solid #e0c06b;
}

.cvi-card.islam {
  border: 2px solid var(--ic-green);
}

.cvi-header {
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.cvi-card.culture .cvi-header {
  color: var(--ic-gold);
}

.cvi-card.islam .cvi-header {
  color: var(--ic-green);
}

.cvi-card ul {
  padding-left: 1.1rem;
  font-size: 0.85rem;
}

.cvi-card li {
  margin-bottom: 0.35rem;
}

.cvi-vs {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ic-text-muted);
  text-align: center;
}

/* CULTURE CHECKS */
.culture-checks {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.cc-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1rem;
  background: var(--ic-white);
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.88rem;
  transition: background 0.15s;
}

.cc-item:hover {
  background: var(--ic-green-pale);
}

.cc-tag {
  padding: 0.2rem 0.65rem;
  border-radius: 50px;
  font-size: 0.72rem;
  font-weight: 600;
}

.cc-tag.Culture {
  background: var(--ic-gold-pale);
  color: var(--ic-gold);
  border: 1px solid var(--ic-gold-border);
}

.cc-tag.Islam {
  background: var(--ic-green-pale);
  color: var(--ic-green);
  border: 1px solid var(--ic-green-border);
}

.cc-tag.Mixed {
  background: #e8f0ff;
  color: #2a4099;
  border: 1px solid #b8caf5;
}

.cc-detail {
  background: var(--ic-white);
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  padding: 1rem;
  font-size: 0.88rem;
}

.cc-source {
  font-size: 0.75rem;
  color: var(--ic-text-light);
  margin-top: 0.5rem;
}

/* ANGER METER */
.anger-slider {
  width: 100%;
  margin: 0.75rem 0;
}

.anger-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--ic-text-muted);
  margin-bottom: 0.75rem;
}

.anger-advice {
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
}

.advice-good {
  background: var(--ic-green-pale);
  color: var(--ic-green);
  border: 1px solid var(--ic-green-border);
}

.advice-warn {
  background: var(--ic-warn-pale);
  color: var(--ic-warn);
  border: 1px solid var(--ic-gold-border);
}

.advice-stop {
  background: var(--ic-danger-pale);
  color: var(--ic-danger);
  border: 1px solid #f5c6c6;
}

/* DUA GRID */
.dua-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.dua-card {
  background: linear-gradient(135deg, var(--ic-navy), var(--ic-green));
  border-radius: var(--radius);
  padding: 1.5rem;
  color: #fff;
}

.dua-arabic {
  font-size: 1.4rem;
  text-align: right;
  direction: rtl;
  line-height: 2;
  font-family: 'Amiri', 'Traditional Arabic', serif;
  color: var(--ic-gold-light);
  margin-bottom: 0.75rem;
}

.dua-translation {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
  margin-bottom: 0.5rem;
}

.dua-ref {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
}

.dua-copy-btn {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.2s;
}

.dua-copy-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* SERIOUS NOTICE */
.serious-notice {
  background: var(--ic-danger-pale);
  border: 2px solid var(--ic-danger);
  border-radius: var(--radius-sm);
  padding: 1rem 1.25rem;
  color: var(--ic-danger);
  font-weight: 500;
  margin-bottom: 1.5rem;
  font-size: 0.92rem;
}

/* MICRO CONTENT */
.micro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.micro-card {
  background: var(--ic-white);
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  padding: 1.25rem;
  border-top: 3px solid var(--ic-gold);
}

.micro-icon {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.micro-title {
  font-weight: 600;
  font-size: 0.88rem;
  color: var(--ic-navy);
  margin-bottom: 0.5rem;
}

.micro-body {
  font-size: 0.82rem;
  color: var(--ic-text-muted);
  line-height: 1.6;
}

/* HABIT TRACKER */
.habit-tracker {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.habit-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0.85rem;
  background: var(--ic-white);
  border-radius: var(--radius-sm);
  border: 1px solid var(--ic-border);
}

.habit-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.88rem;
}

.habit-check {
  width: 16px;
  height: 16px;
  accent-color: var(--ic-green);
}

.done-habit {
  text-decoration: line-through;
  color: var(--ic-text-muted);
}

.habit-reward {
  font-size: 0.75rem;
  color: var(--ic-green);
  font-weight: 600;
}

.habit-score {
  font-size: 0.9rem;
  color: var(--ic-navy);
  padding: 0.75rem;
  background: var(--ic-white);
  border-radius: var(--radius-sm);
  text-align: center;
}

/* STORIES */
.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.story-card {
  background: var(--ic-white);
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  padding: 1.25rem;
  border-left: 4px solid var(--ic-green);
}

.story-tag {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ic-green);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.story-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ic-navy);
  margin-bottom: 0.65rem;
}

.story-body {
  font-size: 0.88rem;
  color: var(--ic-text-muted);
  margin-bottom: 0.75rem;
  font-style: italic;
}

.story-response {
  font-size: 0.85rem;
  color: var(--ic-text);
  background: var(--ic-green-pale);
  border-radius: var(--radius-sm);
  padding: 0.65rem 0.85rem;
  margin-bottom: 0.5rem;
}

.story-source {
  font-size: 0.72rem;
  color: var(--ic-text-light);
}

.story-textarea {
  width: 100%;
  min-height: 100px;
  padding: 0.75rem;
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  font-family: inherit;
  background: var(--ic-white);
  color: var(--ic-text);
  resize: vertical;
  margin-bottom: 0.75rem;
}

.submit-btn {
  background: var(--ic-green);
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: var(--ic-green-light);
}

.success-notice {
  background: var(--ic-green-pale);
  border: 1px solid var(--ic-green-border);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  color: var(--ic-green);
  font-size: 0.88rem;
  margin-top: 0.75rem;
}

/* QUIZ / POLL */
.quiz-scenario {
  background: var(--ic-white);
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  padding: 1rem;
  font-size: 0.9rem;
  color: var(--ic-text);
  margin-bottom: 1rem;
}

.quiz-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.quiz-btn {
  background: var(--ic-white);
  border: 1px solid var(--ic-green-border);
  border-radius: var(--radius-sm);
  padding: 0.6rem 1.25rem;
  color: var(--ic-green);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s;
}

.quiz-btn:hover {
  background: var(--ic-green);
  color: #fff;
}

.quiz-feedback {
  margin-top: 1rem;
  background: var(--ic-cream);
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  padding: 0.85rem 1rem;
  font-size: 0.88rem;
}

.next-btn {
  margin-top: 0.75rem;
  background: var(--ic-green);
  color: #fff;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.85rem;
}

.quiz-done {
  text-align: center;
  font-size: 0.95rem;
  padding: 1.5rem;
}

.poll-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.poll-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.poll-btn {
  min-width: 120px;
  padding: 0.5rem 1rem;
  background: var(--ic-white);
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.2s;
}

.poll-btn.selected {
  background: var(--ic-green);
  color: #fff;
  border-color: var(--ic-green);
}

.poll-bar-wrap {
  flex: 1;
  background: var(--ic-border);
  border-radius: 50px;
  height: 12px;
  position: relative;
}

.poll-bar {
  height: 100%;
  background: var(--ic-green);
  border-radius: 50px;
  transition: width 0.4s;
}

.poll-pct {
  position: absolute;
  right: -32px;
  top: -4px;
  font-size: 0.72rem;
  color: var(--ic-text-muted);
}

.poll-note {
  font-size: 0.8rem;
  color: var(--ic-text-muted);
  margin-top: 0.75rem;
}

/* WYD */
.wyd-item {
  background: var(--ic-white);
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  padding: 1rem;
  margin-bottom: 0.75rem;
}

.wyd-q {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ic-navy);
  margin-bottom: 0.75rem;
}

.wyd-choices {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.wyd-btn {
  background: var(--ic-cream);
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  padding: 0.45rem 0.9rem;
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.2s;
}

.wyd-btn.selected {
  background: var(--ic-navy);
  color: #fff;
}

.wyd-btn.correct {
  background: var(--ic-green);
  color: #fff;
  border-color: var(--ic-green);
}

.wyd-feedback {
  margin-top: 0.65rem;
  font-size: 0.83rem;
  color: var(--ic-green);
  background: var(--ic-green-pale);
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
}

/* RESOURCES */
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.resource-card {
  background: var(--ic-white);
  border: 1px solid var(--ic-border);
  border-radius: var(--radius-sm);
  padding: 1.25rem;
  text-align: center;
}

.res-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.res-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--ic-navy);
  margin-bottom: 0.35rem;
}

.res-desc {
  font-size: 0.8rem;
  color: var(--ic-text-muted);
  margin-bottom: 0.5rem;
}

.res-type {
  display: inline-block;
  background: var(--ic-green-pale);
  color: var(--ic-green);
  border: 1px solid var(--ic-green-border);
  border-radius: 50px;
  padding: 0.2rem 0.65rem;
  font-size: 0.72rem;
  font-weight: 600;
}

/* TRUSTED SOURCES */
.trusted-sources {
  background: var(--ic-navy);
  border-radius: var(--radius);
  padding: 2rem;
}

.trusted-sources h3 {
  color: var(--ic-gold-light);
  font-size: 1.1rem;
  margin-bottom: 1.25rem;
}

.sources-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.source-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.src-num {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ic-gold-light);
  min-width: 32px;
}

.src-name {
  font-weight: 600;
  color: #fff;
  font-size: 0.95rem;
}

.src-url {
  font-size: 0.8rem;
  color: var(--ic-gold-light);
}

.src-why {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.25rem;
}

/* FOOTER */
.ic-footer {
  background: var(--ic-navy);
  color: rgba(255, 255, 255, 0.8);
  padding: 2.5rem 0;
  text-align: center;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ic-gold-light);
  margin-bottom: 0.35rem;
}

.footer-tagline {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
}

.footer-disclaimer {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.5);
  max-width: 700px;
  margin: 0 auto 1rem;
  line-height: 1.6;
}

.footer-copy {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.4);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
  }

  .video-row {
    grid-template-columns: 1fr;
  }

  .culture-vs-islam-grid {
    grid-template-columns: 1fr;
  }

  .cvi-vs {
    text-align: center;
    font-size: 1.2rem;
  }

  .dos-donts {
    grid-template-columns: 1fr;
  }

  .chapter-section {
    padding: 1.25rem;
  }
}
</style>

<style>
#islamic-connect-app {
  --ic-green: #0f766e;
  --ic-green-light: #14b8a6;
  --ic-green-pale: #e9fbf6;
  --ic-green-border: #99f6e4;
  --ic-gold: #0e7490;
  --ic-gold-light: #67e8f9;
  --ic-gold-pale: #ecfeff;
  --ic-gold-border: #a5f3fc;
  --ic-coral: #0f5f66;
  --ic-coral-pale: #e6fffb;
  --ic-navy: #0f2742;
  --ic-navy-light: #164e63;
  --ic-cream: #f3fbf9;
  --ic-white: #ffffff;
  --ic-text: #102522;
  --ic-text-muted: #56716d;
  --ic-text-light: #7f9994;
  --ic-danger: #0f5f66;
  --ic-danger-pale: #e6fffb;
  --ic-warn: #0e5f6f;
  --ic-warn-pale: #ecfeff;
  --ic-border: #d2ebe6;
  --ic-shadow: 0 18px 50px rgba(15, 118, 110, 0.12);
  --radius: 8px;
  --radius-sm: 8px;
  min-height: 100vh;
  background:
    linear-gradient(180deg, rgba(243, 251, 249, 0) 0, #f3fbf9 520px),
    #f3fbf9;
  color: var(--ic-text);
  font-family: Inter, Manrope, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.65;
}

#islamic-connect-app .container {
  width: min(100%, 1180px);
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}

#islamic-connect-app button,
#islamic-connect-app input,
#islamic-connect-app select,
#islamic-connect-app textarea {
  font: inherit;
}

#islamic-connect-app button {
  touch-action: manipulation;
}

#islamic-connect-app .hero-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 72px 0 54px;
  background:
    linear-gradient(115deg, rgba(15, 39, 66, 0.94) 0%, rgba(15, 118, 110, 0.92) 58%, rgba(20, 184, 166, 0.82) 100%),
    url("/images/ilm.jpg") center / cover;
}

#islamic-connect-app .hero-overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.055) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.75) 62%, transparent 100%);
}

#islamic-connect-app .hero-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 32px;
  align-items: center;
}

#islamic-connect-app .hero-copy {
  text-align: left;
  max-width: 760px;
}

#islamic-connect-app .hero-badge,
#islamic-connect-app .panel-kicker,
#islamic-connect-app .chapter-num,
#islamic-connect-app .story-tag,
#islamic-connect-app .script-title {
  letter-spacing: 0;
  text-transform: uppercase;
}

#islamic-connect-app .hero-badge {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 34px;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: #ecfeff;
  font-size: 0.78rem;
  font-weight: 800;
  backdrop-filter: blur(10px);
}

#islamic-connect-app .hero-title {
  margin: 16px 0 14px;
  color: #fff;
  background: none;
  background-image: none;
  -webkit-background-clip: initial;
  background-clip: initial;
  -webkit-text-fill-color: #fff;
  font-size: 5rem;
  font-weight: 900;
  line-height: 0.98;
}

#islamic-connect-app .hero-sub {
  max-width: 680px;
  margin: 0 0 26px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.18rem;
  line-height: 1.7;
}

#islamic-connect-app .hero-search-shell {
  position: relative;
  max-width: 720px;
}

#islamic-connect-app .hero-search-wrap {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  min-height: 62px;
  margin: 0;
  padding: 8px 8px 8px 18px;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);
}

#islamic-connect-app .hero-search-wrap i {
  color: var(--ic-green);
  font-size: 1.1rem;
}

#islamic-connect-app .hero-search {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  outline: none;
  background: transparent;
  color: var(--ic-text);
  font-size: 0.98rem;
}

#islamic-connect-app .hero-search-btn,
#islamic-connect-app .primary-action,
#islamic-connect-app .secondary-action,
#islamic-connect-app .submit-btn,
#islamic-connect-app .next-btn,
#islamic-connect-app .dua-copy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 800;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, border-color 0.18s ease;
}

#islamic-connect-app .hero-search-btn {
  padding: 0 20px;
  background: var(--ic-navy);
  color: #fff;
}

#islamic-connect-app .hero-search-btn:hover,
#islamic-connect-app .primary-action:hover,
#islamic-connect-app .submit-btn:hover,
#islamic-connect-app .next-btn:hover {
  transform: translateY(-1px);
  background: #0c5f58;
  box-shadow: 0 12px 26px rgba(20, 33, 61, 0.18);
}

#islamic-connect-app .search-results-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 40;
  max-height: 320px;
  overflow: auto;
  border: 1px solid rgba(20, 33, 61, 0.12);
  border-radius: 8px;
  background: #fff;
  box-shadow: var(--ic-shadow);
}

#islamic-connect-app .search-result-item {
  width: 100%;
  padding: 13px 16px;
  border: 0;
  border-bottom: 1px solid var(--ic-border);
  background: #fff;
  color: var(--ic-text);
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
}

#islamic-connect-app .search-result-item:hover {
  background: var(--ic-green-pale);
}

#islamic-connect-app .hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

#islamic-connect-app .primary-action {
  padding: 0 18px;
  background: #fff;
  color: var(--ic-navy);
}

#islamic-connect-app .secondary-action {
  padding: 0 18px;
  border-color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.13);
  color: #fff;
  backdrop-filter: blur(10px);
}

#islamic-connect-app .secondary-action:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

#islamic-connect-app .hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  max-width: 640px;
  gap: 10px;
  margin-top: 22px;
}

#islamic-connect-app .stat-pill {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-height: 72px;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.26);
  background: rgba(255, 255, 255, 0.13);
  color: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(10px);
}

#islamic-connect-app .stat-pill strong {
  color: #fff;
  font-size: 1.3rem;
  line-height: 1;
}

#islamic-connect-app .stat-pill span {
  font-size: 0.8rem;
}

#islamic-connect-app .hero-panel {
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 8px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.2);
}

#islamic-connect-app .panel-kicker {
  color: var(--ic-green);
  font-size: 0.76rem;
  font-weight: 900;
  margin-bottom: 10px;
}

#islamic-connect-app .hero-topic {
  width: 100%;
  min-height: 74px;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--ic-border);
  border-radius: 8px;
  background: #fff;
  color: var(--ic-text);
  text-align: left;
  margin-top: 10px;
}

#islamic-connect-app .hero-topic:hover,
#islamic-connect-app .rail-link:hover,
#islamic-connect-app .nav-tab:hover,
#islamic-connect-app .cc-item:hover,
#islamic-connect-app .faq-question:hover {
  border-color: var(--ic-green-border);
  background: var(--ic-green-pale);
}

#islamic-connect-app .hero-topic > span:first-child {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: var(--ic-green-pale);
}

#islamic-connect-app .hero-topic strong,
#islamic-connect-app .hero-topic small {
  display: block;
}

#islamic-connect-app .hero-topic small {
  color: var(--ic-text-muted);
  font-size: 0.8rem;
}

#islamic-connect-app .hero-note {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  gap: 10px;
  margin-top: 14px;
  padding: 12px;
  border-radius: 8px;
  background: var(--ic-gold-pale);
  color: var(--ic-warn);
  font-size: 0.82rem;
  line-height: 1.55;
}

#islamic-connect-app .sticky-nav {
  position: sticky;
  top: 0;
  z-index: 35;
  background: rgba(255, 255, 255, 0.92);
  border-bottom: 1px solid var(--ic-border);
  box-shadow: 0 10px 28px rgba(20, 33, 61, 0.08);
  backdrop-filter: blur(14px);
}

#islamic-connect-app .nav-inner {
  width: min(100%, 1280px);
  margin: 0 auto;
  padding: 8px 18px;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: thin;
}

#islamic-connect-app .nav-tab {
  min-height: 42px;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--ic-text-muted);
  font-size: 0.85rem;
  font-weight: 800;
}

#islamic-connect-app .nav-tab.active {
  background: var(--ic-navy);
  color: #fff;
  border-color: var(--ic-navy);
}

#islamic-connect-app .nav-icon {
  font-size: 1rem;
}

#islamic-connect-app .parenting-layout {
  width: 100%;
  max-width: none;
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr);
  gap: 24px;
  align-items: start;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 30px;
  padding-bottom: 56px;
}

#islamic-connect-app .page-rail {
  position: sticky;
  top: 72px;
  display: block;
}

#islamic-connect-app .rail-card {
  padding: 12px;
  border: 1px solid var(--ic-border);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 16px 38px rgba(20, 33, 61, 0.08);
}

#islamic-connect-app .rail-title {
  padding: 4px 8px 10px;
  color: var(--ic-navy);
  font-size: 0.82rem;
  font-weight: 900;
}

#islamic-connect-app .rail-link {
  width: 100%;
  min-height: 38px;
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  padding: 7px 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--ic-text-muted);
  text-align: left;
  font-size: 0.84rem;
  font-weight: 700;
}

#islamic-connect-app .rail-link.active {
  background: var(--ic-green-pale);
  border-color: var(--ic-green-border);
  color: var(--ic-green);
}

#islamic-connect-app .main-content {
  min-width: 0;
  padding: 0;
}

#islamic-connect-app .disclaimer-banner {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  margin-bottom: 18px;
  padding: 14px 16px;
  border: 1px solid var(--ic-gold-border);
  border-radius: 8px;
  background: var(--ic-gold-pale);
  color: var(--ic-warn);
  font-size: 0.86rem;
  text-align: left;
}

#islamic-connect-app .stats-bar {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin: 0 0 20px;
}

#islamic-connect-app .stat-card,
#islamic-connect-app .content-card,
#islamic-connect-app .resource-card,
#islamic-connect-app .micro-card,
#islamic-connect-app .story-card,
#islamic-connect-app .interactive-tool,
#islamic-connect-app .faq-item,
#islamic-connect-app .source-block,
#islamic-connect-app .cvi-card,
#islamic-connect-app .trusted-sources,
#islamic-connect-app .dua-card {
  border-radius: 8px;
}

#islamic-connect-app .stat-card {
  min-height: 108px;
  padding: 18px;
  border: 1px solid var(--ic-border);
  border-top: 4px solid var(--ic-green);
  background: #fff;
  text-align: left;
  box-shadow: 0 12px 28px rgba(20, 33, 61, 0.06);
}

#islamic-connect-app .stat-num {
  color: var(--ic-navy);
  font-size: 2.25rem;
  line-height: 1;
  font-weight: 900;
}

#islamic-connect-app .stat-lbl {
  margin-top: 8px;
  color: var(--ic-text-muted);
  font-size: 0.84rem;
  font-weight: 700;
}

#islamic-connect-app .chapter-section {
  position: relative;
  margin-bottom: 22px;
  padding: clamp(18px, 3vw, 30px);
  border: 1px solid var(--ic-border);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 14px 40px rgba(20, 33, 61, 0.07);
  scroll-margin-top: 82px;
}

#islamic-connect-app .chapter-section::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 5px;
  border-radius: 8px 0 0 8px;
  background: linear-gradient(180deg, var(--ic-green), var(--ic-gold-light));
}

#islamic-connect-app .chapter-header {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--ic-border);
}

#islamic-connect-app .chapter-icon-wrap {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border: 1px solid var(--ic-green-border);
  border-radius: 8px;
  background: var(--ic-green-pale);
  font-size: 1.65rem;
}

#islamic-connect-app .chapter-num {
  color: var(--ic-green);
  font-size: 0.76rem;
  font-weight: 900;
}

#islamic-connect-app .chapter-title {
  margin: 2px 0 0;
  color: var(--ic-navy);
  font-size: 1.9rem;
  font-weight: 900;
  line-height: 1.18;
}

#islamic-connect-app .content-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

#islamic-connect-app .content-card {
  min-width: 0;
  padding: 18px;
  border: 1px solid var(--ic-border);
  background: #fff;
  box-shadow: 0 8px 24px rgba(20, 33, 61, 0.05);
}

#islamic-connect-app .content-card.full-width {
  grid-column: 1 / -1;
}

#islamic-connect-app .content-card h3,
#islamic-connect-app .interactive-tool h3,
#islamic-connect-app .faq-title,
#islamic-connect-app .trusted-sources h3 {
  margin: 0 0 10px;
  color: var(--ic-navy);
  font-size: 1.05rem;
  font-weight: 900;
  line-height: 1.25;
}

#islamic-connect-app .content-card p,
#islamic-connect-app .interactive-tool p,
#islamic-connect-app .content-card li,
#islamic-connect-app .source-block,
#islamic-connect-app .faq-answer,
#islamic-connect-app .quiz-scenario,
#islamic-connect-app .story-body,
#islamic-connect-app .story-response {
  color: var(--ic-text-muted);
  font-size: 0.93rem;
  line-height: 1.72;
}

#islamic-connect-app .quran-block,
#islamic-connect-app .hadith-block,
#islamic-connect-app .tip-box,
#islamic-connect-app .reminder-pill,
#islamic-connect-app .warning-note,
#islamic-connect-app .script-output,
#islamic-connect-app .cc-detail,
#islamic-connect-app .wyd-feedback,
#islamic-connect-app .quiz-feedback,
#islamic-connect-app .success-notice,
#islamic-connect-app .habit-score,
#islamic-connect-app .serious-notice {
  border-radius: 8px;
}

#islamic-connect-app .quran-block,
#islamic-connect-app .hadith-block {
  margin-top: 14px;
  padding: 16px;
  border-left-width: 5px;
  background: var(--ic-gold-pale);
}

#islamic-connect-app .hadith-block {
  background: var(--ic-green-pale);
}

#islamic-connect-app .quran-arabic,
#islamic-connect-app .dua-arabic {
  color: var(--ic-green);
  font-family: Amiri, "Noto Naskh Arabic", serif;
  font-size: 1.65rem;
  line-height: 2;
}

#islamic-connect-app .quran-ref,
#islamic-connect-app .hadith-ref,
#islamic-connect-app .story-source,
#islamic-connect-app .cc-source,
#islamic-connect-app .vid-label {
  color: var(--ic-text-light);
  font-size: 0.78rem;
}

#islamic-connect-app .tip-box,
#islamic-connect-app .warning-note,
#islamic-connect-app .reminder-pill {
  display: block;
  padding: 12px 14px;
  margin-top: 14px;
  border: 1px solid var(--ic-gold-border);
  background: var(--ic-gold-pale);
  color: var(--ic-warn);
  font-size: 0.88rem;
}

#islamic-connect-app .warning-note {
  border-color: rgba(20, 184, 166, 0.38);
  background: var(--ic-coral-pale);
  color: var(--ic-coral);
}

#islamic-connect-app .reminder-pill {
  border-color: var(--ic-green-border);
  background: var(--ic-green-pale);
  color: var(--ic-green);
}

#islamic-connect-app .dos-donts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 14px;
}

#islamic-connect-app .dos,
#islamic-connect-app .donts {
  padding: 14px;
  border-radius: 8px;
}

#islamic-connect-app .dos {
  border: 1px solid var(--ic-green-border);
  background: var(--ic-green-pale);
}

#islamic-connect-app .donts {
  border: 1px solid rgba(20, 184, 166, 0.32);
  background: var(--ic-coral-pale);
}

#islamic-connect-app .dd-title {
  margin-bottom: 8px;
  font-weight: 900;
}

#islamic-connect-app .steps-list,
#islamic-connect-app .empathy-box,
#islamic-connect-app .culture-checks,
#islamic-connect-app .habit-tracker,
#islamic-connect-app .poll-options,
#islamic-connect-app .sources-list {
  display: grid;
  gap: 10px;
}

#islamic-connect-app .step,
#islamic-connect-app .empathy-item,
#islamic-connect-app .habit-row,
#islamic-connect-app .cc-item,
#islamic-connect-app .wyd-item,
#islamic-connect-app .quiz-scenario,
#islamic-connect-app .poll-row {
  border: 1px solid var(--ic-border);
  border-radius: 8px;
  background: #fff;
}

#islamic-connect-app .step,
#islamic-connect-app .empathy-item,
#islamic-connect-app .habit-row,
#islamic-connect-app .cc-item {
  padding: 10px 12px;
}

#islamic-connect-app .step {
  align-items: flex-start;
}

#islamic-connect-app .step-num {
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background: var(--ic-green);
  color: #fff;
  font-size: 0.74rem;
}

#islamic-connect-app .script-box {
  padding: 16px;
  border-radius: 8px;
  background: var(--ic-navy);
}

#islamic-connect-app .script-title {
  color: var(--ic-gold-light);
  font-size: 0.76rem;
  font-weight: 900;
}

#islamic-connect-app .script-box p {
  color: rgba(255, 255, 255, 0.86);
}

#islamic-connect-app .video-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

#islamic-connect-app .yt-embed {
  width: 100%;
  aspect-ratio: 16 / 9;
  height: auto;
  border: 0;
  border-radius: 8px;
  background: var(--ic-navy);
}

#islamic-connect-app .source-block {
  margin-top: 16px;
  padding: 12px 14px;
  border: 1px dashed var(--ic-border);
  background: #fbfcfb;
}

#islamic-connect-app .faq-section {
  margin-top: 18px;
}

#islamic-connect-app .faq-item {
  margin-bottom: 8px;
  overflow: hidden;
  border: 1px solid var(--ic-border);
  background: #fff;
}

#islamic-connect-app .faq-question {
  width: 100%;
  min-height: 50px;
  padding: 12px 14px;
  border: 0;
  background: #fff;
  color: var(--ic-navy);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-weight: 800;
  text-align: left;
  cursor: pointer;
}

#islamic-connect-app .faq-answer {
  padding: 14px;
  border-top: 1px solid var(--ic-border);
  background: #fbfcfb;
}

#islamic-connect-app .interactive-tool {
  margin-top: 16px;
  padding: 18px;
  border: 1px solid var(--ic-green-border);
  background:
    linear-gradient(135deg, rgba(233, 251, 246, 0.86), rgba(255, 247, 223, 0.72)),
    #fff;
}

#islamic-connect-app .tool-select,
#islamic-connect-app .story-textarea {
  width: 100%;
  border: 1px solid var(--ic-border);
  border-radius: 8px;
  background: #fff;
  color: var(--ic-text);
  outline: none;
}

#islamic-connect-app .tool-select {
  min-height: 46px;
  padding: 0 12px;
}

#islamic-connect-app .story-textarea {
  min-height: 120px;
  padding: 12px;
  resize: vertical;
}

#islamic-connect-app .tool-select:focus,
#islamic-connect-app .story-textarea:focus,
#islamic-connect-app .hero-search:focus {
  box-shadow: 0 0 0 3px rgba(20, 160, 133, 0.18);
}

#islamic-connect-app .culture-vs-islam-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 56px minmax(0, 1fr);
  gap: 14px;
  align-items: stretch;
}

#islamic-connect-app .cvi-card {
  padding: 18px;
  background: #fff;
}

#islamic-connect-app .cvi-card.culture {
  border: 1px solid var(--ic-gold-border);
}

#islamic-connect-app .cvi-card.islam {
  border: 1px solid var(--ic-green-border);
}

#islamic-connect-app .cvi-header {
  margin-bottom: 10px;
  font-weight: 900;
}

#islamic-connect-app .cvi-vs {
  display: grid;
  place-items: center;
  min-height: 56px;
  border-radius: 8px;
  background: var(--ic-navy);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 900;
}

#islamic-connect-app .cc-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

#islamic-connect-app .cc-tag,
#islamic-connect-app .res-type {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 900;
}

#islamic-connect-app .anger-slider,
#islamic-connect-app input[type="range"] {
  width: 100%;
  accent-color: var(--ic-green);
}

#islamic-connect-app .anger-advice {
  padding: 12px 14px;
  font-weight: 800;
}

#islamic-connect-app .dua-grid,
#islamic-connect-app .micro-grid,
#islamic-connect-app .stories-grid,
#islamic-connect-app .resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 14px;
}

#islamic-connect-app .dua-card {
  padding: 18px;
  background: linear-gradient(135deg, var(--ic-navy), var(--ic-green));
  color: #fff;
}

#islamic-connect-app .dua-translation,
#islamic-connect-app .dua-ref {
  color: rgba(255, 255, 255, 0.78);
}

#islamic-connect-app .dua-copy-btn {
  min-height: 38px;
  padding: 0 12px;
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

#islamic-connect-app .micro-card,
#islamic-connect-app .story-card,
#islamic-connect-app .resource-card {
  padding: 18px;
  border: 1px solid var(--ic-border);
  background: #fff;
  box-shadow: 0 8px 24px rgba(20, 33, 61, 0.05);
}

#islamic-connect-app .micro-card {
  border-top: 4px solid var(--ic-gold-light);
}

#islamic-connect-app .story-card {
  border-left: 4px solid var(--ic-green);
}

#islamic-connect-app .resource-card {
  text-align: left;
}

#islamic-connect-app .micro-icon,
#islamic-connect-app .res-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  margin-bottom: 12px;
  border-radius: 8px;
  background: var(--ic-green-pale);
  font-size: 1.35rem;
}

#islamic-connect-app .micro-title,
#islamic-connect-app .story-title,
#islamic-connect-app .res-name,
#islamic-connect-app .src-name,
#islamic-connect-app .wyd-q {
  color: var(--ic-navy);
  font-weight: 900;
}

#islamic-connect-app .micro-body,
#islamic-connect-app .res-desc,
#islamic-connect-app .src-why,
#islamic-connect-app .poll-note {
  color: var(--ic-text-muted);
  font-size: 0.88rem;
}

#islamic-connect-app .habit-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#islamic-connect-app .habit-label {
  display: flex;
  align-items: center;
  gap: 10px;
}

#islamic-connect-app .habit-check {
  accent-color: var(--ic-green);
}

#islamic-connect-app .quiz-options,
#islamic-connect-app .wyd-choices {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

#islamic-connect-app .quiz-btn,
#islamic-connect-app .poll-btn,
#islamic-connect-app .wyd-btn {
  min-height: 40px;
  padding: 0 12px;
  border: 1px solid var(--ic-border);
  border-radius: 8px;
  background: #fff;
  color: var(--ic-text);
  cursor: pointer;
  font-weight: 800;
}

#islamic-connect-app .quiz-btn:hover,
#islamic-connect-app .poll-btn:hover,
#islamic-connect-app .wyd-btn:hover,
#islamic-connect-app .quiz-btn.selected,
#islamic-connect-app .poll-btn.selected,
#islamic-connect-app .wyd-btn.selected {
  border-color: var(--ic-green);
  background: var(--ic-green);
  color: #fff;
}

#islamic-connect-app .wyd-btn.correct {
  border-color: var(--ic-green);
  background: var(--ic-green-pale);
  color: var(--ic-green);
}

#islamic-connect-app .poll-row {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  padding: 10px;
}

#islamic-connect-app .poll-btn {
  width: 100%;
}

#islamic-connect-app .poll-bar-wrap {
  min-width: 0;
  height: 12px;
  border-radius: 999px;
  background: #e6eeeb;
  position: relative;
}

#islamic-connect-app .poll-bar {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--ic-green), var(--ic-gold-light));
}

#islamic-connect-app .poll-pct {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(44px, -50%);
  color: var(--ic-text-muted);
  font-size: 0.76rem;
  font-weight: 900;
}

#islamic-connect-app .submit-btn,
#islamic-connect-app .next-btn {
  min-height: 42px;
  padding: 0 16px;
  background: var(--ic-green);
  color: #fff;
}

#islamic-connect-app .trusted-sources {
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: var(--ic-navy);
}

#islamic-connect-app .trusted-sources h3,
#islamic-connect-app .src-url {
  color: var(--ic-gold-light);
}

#islamic-connect-app .source-item {
  display: grid;
  grid-template-columns: 46px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
}

#islamic-connect-app .src-num {
  color: var(--ic-gold-light);
  font-size: 1.35rem;
  font-weight: 900;
  line-height: 1;
}

#islamic-connect-app .trusted-sources .src-name {
  color: #fff;
}

#islamic-connect-app .src-url {
  font-size: 0.82rem;
}

#islamic-connect-app .trusted-sources .src-why {
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 1100px) {
  #islamic-connect-app .hero-content,
  #islamic-connect-app .parenting-layout {
    grid-template-columns: 1fr;
  }

  #islamic-connect-app .page-rail {
    display: none;
  }

  #islamic-connect-app .hero-panel {
    max-width: 760px;
  }
}

@media (max-width: 820px) {
  #islamic-connect-app .container {
    padding: 0 16px;
  }

  #islamic-connect-app .parenting-layout {
    padding-left: 16px;
    padding-right: 16px;
  }

  #islamic-connect-app .hero-section {
    padding: 48px 0 36px;
  }

  #islamic-connect-app .hero-stats,
  #islamic-connect-app .stats-bar,
  #islamic-connect-app .content-grid,
  #islamic-connect-app .video-row,
  #islamic-connect-app .culture-vs-islam-grid,
  #islamic-connect-app .dos-donts {
    grid-template-columns: 1fr;
  }

  #islamic-connect-app .hero-panel {
    display: none;
  }

  #islamic-connect-app .hero-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  #islamic-connect-app .stat-pill {
    min-height: 58px;
    padding: 10px;
  }

  #islamic-connect-app .hero-search-wrap {
    grid-template-columns: 22px minmax(0, 1fr);
    padding: 12px;
  }

  #islamic-connect-app .hero-search {
    font-size: 0.95rem;
  }

  #islamic-connect-app .hero-search::placeholder {
    font-size: 0.88rem;
  }

  #islamic-connect-app .hero-search-btn {
    grid-column: 1 / -1;
    width: 100%;
  }

  #islamic-connect-app .hero-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  #islamic-connect-app .primary-action,
  #islamic-connect-app .secondary-action {
    width: 100%;
  }

  #islamic-connect-app .nav-label {
    display: inline;
  }

  #islamic-connect-app .chapter-section {
    padding: 18px;
  }

  #islamic-connect-app .hero-title {
    font-size: 3.1rem;
  }

  #islamic-connect-app .hero-sub {
    font-size: 1rem;
  }

  #islamic-connect-app .stat-num {
    font-size: 1.85rem;
  }

  #islamic-connect-app .chapter-title {
    font-size: 1.45rem;
  }

  #islamic-connect-app .quran-arabic,
  #islamic-connect-app .dua-arabic {
    font-size: 1.35rem;
  }

  #islamic-connect-app .chapter-header {
    grid-template-columns: 48px minmax(0, 1fr);
  }

  #islamic-connect-app .chapter-icon-wrap {
    width: 48px;
    height: 48px;
    font-size: 1.35rem;
  }

  #islamic-connect-app .poll-row {
    grid-template-columns: 1fr;
  }

  #islamic-connect-app .poll-pct {
    right: 8px;
    transform: translateY(-50%);
  }
}

@media (max-width: 520px) {
  #islamic-connect-app .hero-title {
    font-size: 2.35rem;
  }

  #islamic-connect-app .hero-panel,
  #islamic-connect-app .content-card,
  #islamic-connect-app .interactive-tool {
    padding: 14px;
  }

  #islamic-connect-app .nav-inner {
    padding: 8px 12px;
  }

  #islamic-connect-app .nav-tab {
    min-height: 38px;
    padding: 0 10px;
    font-size: 0.8rem;
  }
}
</style>
