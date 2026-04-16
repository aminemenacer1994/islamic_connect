<template>
  <div>
    <!-- HERO -->
    <section class="hero-premium">
      <div class="hero-bg-shape"></div>
      <div class="hero-pattern"></div>
      <div class="hero-inner">
        <div class="hero-badge">
          <i class="fas fa-check-circle" style="margin-right: 6px"></i>
          Scholarly Verified Content
        </div>
        <h1 class="hero-title">
          <span class="title-icon">🕌</span> Discover Islam
        </h1>
        <p class="hero-subtitle">
          A comprehensive, scholar-verified guide to understanding Islam — its beliefs,
          practices, and way of life.
        </p>

        <!-- Search -->
        <div class="search-wrapper">
          <div class="search-box">
            <i class="fas fa-search search-icon"></i>
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              placeholder="Search Islam, pillars, prophets, prayers…"
              autocomplete="off"
              @keydown.escape="searchQuery = ''"
            />
            <button class="search-btn" @click="triggerSearch">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>

          <!-- Search results (Vue-powered) -->
          <div
            v-if="filteredSections.length > 0"
            class="search-results active"
          >
            <div
              v-for="h in filteredSections"
              :key="h.id"
              class="search-result-item"
              @click="scrollToSection(h.id)"
            >
              <i :class="h.icon"></i>
              <div>
                <div class="search-result-title">{{ h.title }}</div>
                <div class="search-result-excerpt">{{ h.excerpt }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hero Stats -->
        <div class="hero-stats">
          <div class="hero-stat">
            <div class="hero-stat-circle"><i class="fas fa-star-of-life"></i></div>
            <span>6 Pillars of Faith</span>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-circle"><i class="fas fa-pray"></i></div>
            <span>5 Pillars of Islam</span>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-circle"><i class="fas fa-book-open"></i></div>
            <span>114 Surahs</span>
          </div>
        </div>
      </div>

      <!-- Wave -->
      <div class="hero-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="#fdfbf7" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,53.3C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>

    <div class="main-container">
      <!-- DISCLAIMER -->
      <div class="disclaimer">
        <i class="fas fa-shield-alt"></i>
        <p>
          <strong>Scholarly Verified Disclaimer:</strong> This page presents Islamic teachings based on the Quran,
          authentic Hadith collections (Sahih Bukhari, Sahih Muslim), and scholarly consensus. Content aims to be accurate,
          respectful, and accessible to all seekers of knowledge. For personal religious rulings, please consult a qualified
          Islamic scholar.
        </p>
      </div>

      <!-- SECTION 1: What is Islam -->
      <section class="section-premium" id="basics">
        <div class="section-header">
          <div class="section-icon"><i class="fas fa-star-of-life"></i></div>
          <div>
            <h2>What is Islam?</h2>
            <p>The complete way of life — submission to the will of Allah</p>
          </div>
        </div>
        <div class="row">
          <div class="col-half">
            <div class="card">
              <div class="card-head">
                <i class="fas fa-heart"></i>
                <h3>Core Beliefs (Iman)</h3>
              </div>
              <div class="card-body">
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Belief in Allah – the One God</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Belief in the Angels (Mala'ika)</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Belief in the Revealed Books (Kutub)</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Belief in the Prophets and Messengers (Rusul)</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Belief in the Day of Judgement (Yawm al-Qiyama)</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Belief in Divine Decree (Qadar) — good and bad</span></div>
                <div class="ref-box"><i class="fas fa-book"></i><span>Reference: Sahih Muslim 8 – Hadith of Jibril</span></div>
              </div>
            </div>
          </div>
          <div class="col-half">
            <div class="card">
              <div class="card-head">
                <i class="fas fa-pray"></i>
                <h3>Core Practices (5 Pillars)</h3>
              </div>
              <div class="card-body">
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Shahada – Declaration of Faith</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Salah – Five Daily Prayers</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Zakat – Obligatory Charity (2.5% of savings)</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Sawm – Fasting during Ramadan</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Hajj – Pilgrimage to Makkah (once if able)</span></div>
                <div class="ref-box"><i class="fas fa-book"></i><span>Reference: Sahih Bukhari 8 – Pillars of Islam</span></div>
              </div>
            </div>
          </div>
        </div>

        <div class="img-grid">
          <div class="img-grid-item">
            <img src="https://images.pexels.com/photos/2715373/pexels-photo-2715373.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Islamic architecture – Mosque" loading="lazy" />
            <div class="img-overlay">Sacred Architecture</div>
          </div>
          <div class="img-grid-item">
            <img src="https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Quran recitation" loading="lazy" />
            <div class="img-overlay">Divine Revelation</div>
          </div>
        </div>

        <div class="video-wrap">
          <iframe src="https://www.youtube.com/embed/1w2KtO13m_4?rel=0" title="Introduction to Islam" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
          <div class="video-caption"><i class="fas fa-play-circle"></i> Video: Introduction to Islam | Scholarly verified</div>
        </div>
      </section>

      <!-- SECTION 2: Shahada -->
      <section class="section-premium" id="shahada">
        <div class="section-header">
          <div class="section-icon"><i class="fas fa-certificate"></i></div>
          <div>
            <h2>The Shahada – Declaration of Faith</h2>
            <p>The first and most fundamental pillar of Islam</p>
          </div>
        </div>
        <div class="shahada-block">
          <div class="shahada-content">
            <div class="shahada-arabic">أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ</div>
            <div class="shahada-transliteration">Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan rasulullah</div>
            <div class="shahada-translation">"I bear witness that there is no god but Allah, and I bear witness that Muhammad is the messenger of Allah."</div>
            <p class="shahada-explanation">The Shahada is the gateway into Islam. Uttering it with sincere conviction — understanding that Allah alone deserves worship and that Muhammad ﷺ is His final messenger — makes one a Muslim. It is also proclaimed in the call to prayer (Adhan) five times a day.</p>
            <div class="ref-box"><i class="fas fa-book"></i><span>Reference: Sahih Bukhari 1 – Revelation; the Shahada's conditions discussed by scholars including Imam an-Nawawi</span></div>
          </div>
          <div class="shahada-img">
            <img src="https://images.pexels.com/photos/2899727/pexels-photo-2899727.jpeg?auto=compress&cs=tinysrgb&w=700" alt="Prayer at mosque" loading="lazy" />
          </div>
        </div>
      </section>

      <!-- SECTION 3: Allah -->
      <section class="section-premium" id="allah">
        <div class="section-header">
          <div class="section-icon gold"><i class="fas fa-sun"></i></div>
          <div>
            <h2>Who is Allah?</h2>
            <p>Understanding the concept of God in Islam</p>
          </div>
        </div>
        <div class="row">
          <div class="col-7">
            <div class="card">
              <div class="card-body">
                <p class="lead-text">Allah is the Arabic word for God — the One, Unique, Eternal Creator of all existence. Islam teaches that Allah has no partners, no children, no equals, and is unlike anything in creation. He is all-knowing (Al-'Alim), all-powerful (Al-Qadir), and ever-merciful (Ar-Rahman, Ar-Rahim). Allah communicates with humanity through prophets and revealed scriptures.</p>
                <h4 style="margin-top:1.25rem;margin-bottom:0.75rem;color:var(--green-deep)">99 Beautiful Names of Allah</h4>
                <div class="names-grid">
                  <span class="name-badge">Ar-Rahman</span><span class="name-badge">Ar-Rahim</span>
                  <span class="name-badge">Al-Malik</span><span class="name-badge">Al-Quddus</span>
                  <span class="name-badge">As-Salam</span><span class="name-badge">Al-Mu'min</span>
                  <span class="name-badge">Al-'Aziz</span><span class="name-badge">Al-Jabbar</span>
                  <span class="name-badge">Al-Khaliq</span><span class="name-badge">Al-Razzaq</span>
                  <span class="name-badge">Al-Hayy</span><span class="name-badge">Al-Qayyum</span>
                  <span class="name-badge">Al-'Alim</span><span class="name-badge">Al-Qadir</span>
                  <span class="name-badge">Al-Wadud</span><span class="name-badge">Al-Ghafur</span>
                  <span class="name-badge">Al-Latif</span><span class="name-badge">Al-Hakim</span>
                </div>
                <div class="quran-box"><i class="fas fa-book-open"></i><span>Quran 59:22-24 – "He is Allah, other than whom there is no deity, Knower of the unseen and the witnessed. He is the Entirely Merciful, the Especially Merciful."</span></div>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="img-card">
              <img src="https://images.pexels.com/photos/1703311/pexels-photo-1703311.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Night sky – contemplation of the divine" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 4: Prophet Muhammad ﷺ -->
      <section class="section-premium" id="prophet">
        <div class="section-header">
          <div class="section-icon"><i class="fas fa-star"></i></div>
          <div>
            <h2>Prophet Muhammad ﷺ</h2>
            <p>The final messenger of Allah to all of humanity</p>
          </div>
        </div>
        <div class="row">
          <div class="col-half">
            <div class="card">
              <div class="card-body">
                <p style="margin-bottom:1rem;line-height:1.75;font-size:0.93rem;">Muhammad ibn Abdullah ﷺ was born in Makkah in 570 CE. At the age of 40, he received his first revelation from Allah through the Angel Jibreel (Gabriel). Over 23 years, he conveyed the complete message of Islam. He is the Seal of the Prophets — no prophet or messenger will come after him. His life (Seerah) and sayings (Hadith) provide a practical model for all believers.</p>
                <h4 style="margin-bottom:0.75rem;color:var(--green-deep)">Key Teachings of the Prophet ﷺ</h4>
                <div class="list-item"><i class="fas fa-star text-gold"></i><span>Monotheism — worship Allah alone without partners</span></div>
                <div class="list-item"><i class="fas fa-star text-gold"></i><span>Kindness to family, neighbours, and all creation</span></div>
                <div class="list-item"><i class="fas fa-star text-gold"></i><span>Honesty and trustworthiness in all dealings</span></div>
                <div class="list-item"><i class="fas fa-star text-gold"></i><span>Justice, equality, and the rights of the poor</span></div>
                <div class="list-item"><i class="fas fa-star text-gold"></i><span>Seeking knowledge as a duty upon every Muslim</span></div>
                <div class="list-item"><i class="fas fa-star text-gold"></i><span>Mercy — "I was only sent as a mercy to the worlds"</span></div>
              </div>
            </div>
          </div>
          <div class="col-half">
            <div class="img-card">
              <img src="https://images.pexels.com/photos/2170756/pexels-photo-2170756.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Masjid an-Nabawi – Medina" loading="lazy" />
            </div>
          </div>
        </div>
        <div class="row" style="margin-top:1rem">
          <div class="col-half">
            <div class="quran-box"><i class="fas fa-book-open"></i><span>Quran 21:107 – "And We have not sent you, [O Muhammad], except as a mercy to the worlds."</span></div>
          </div>
          <div class="col-half">
            <div class="ref-box"><i class="fas fa-book"></i><span>Hadith: Sahih Muslim 2564 – "None of you truly believes until he loves for his brother what he loves for himself."</span></div>
          </div>
        </div>
      </section>

      <!-- SECTION 5: Quran -->
      <section class="section-premium" id="quran">
        <div class="section-header">
          <div class="section-icon"><i class="fas fa-book-open"></i></div>
          <div>
            <h2>The Holy Quran</h2>
            <p>The literal word of Allah, revealed to Prophet Muhammad ﷺ</p>
          </div>
        </div>
        <div class="row">
          <div class="col-half">
            <div class="card">
              <div class="card-body">
                <p style="margin-bottom:1rem;line-height:1.75;font-size:0.93rem;">The Quran is the central religious text of Islam, believed to be the direct word of Allah (SWT) revealed to Prophet Muhammad ﷺ over 23 years through the Angel Jibreel. It is the primary source of Islamic law, ethics, spirituality, and guidance. Memorised by millions of Muslims worldwide (Huffaz), it is the most widely read and memorised book in human history.</p>
                <h4 style="margin-bottom:0.75rem;color:var(--green-deep)">Key Facts about the Quran</h4>
                <div class="list-item"><i class="fas fa-book-open text-green"></i><span>114 Surahs (chapters) and 6,236 Ayaat (verses)</span></div>
                <div class="list-item"><i class="fas fa-book-open text-green"></i><span>Revealed in Arabic — the original language is preserved</span></div>
                <div class="list-item"><i class="fas fa-book-open text-green"></i><span>Divided into 30 equal parts (Juz) for easy memorisation</span></div>
                <div class="list-item"><i class="fas fa-book-open text-green"></i><span>Covers theology, law, history, ethics, and eschatology</span></div>
                <div class="list-item"><i class="fas fa-book-open text-green"></i><span>First word revealed: "Iqra" (Read) – Quran 96:1</span></div>
                <div class="list-item"><i class="fas fa-book-open text-green"></i><span>Over 10 million Huffaz (memorisers) exist worldwide today</span></div>
                <div class="quran-box"><i class="fas fa-book-open"></i><span>Quran 2:2 – "This is the Book about which there is no doubt, a guidance for those conscious of Allah."</span></div>
              </div>
            </div>
          </div>
          <div class="col-half">
            <div class="img-card" style="margin-bottom:1rem">
              <img src="https://images.pexels.com/photos/3832028/pexels-photo-3832028.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Open Quran" loading="lazy" />
            </div>
            <div class="video-wrap video-sm">
              <iframe src="https://www.youtube.com/embed/YDNT2R5_nbE?rel=0" title="Quran Recitation" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
              <div class="video-caption"><i class="fas fa-play-circle"></i> Beautiful Quran recitation</div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 6: Salah -->
      <section class="section-premium" id="salah">
        <div class="section-header">
          <div class="section-icon"><i class="fas fa-pray"></i></div>
          <div>
            <h2>Salah – The Five Daily Prayers</h2>
            <p>The second pillar — a direct connection between the believer and Allah</p>
          </div>
        </div>
        <div class="row">
          <div class="col-half">
            <div class="card">
              <div class="card-body">
                <p style="margin-bottom:1rem;font-size:0.93rem;line-height:1.75">Salah is the ritual prayer performed five times daily at prescribed times. It involves specific postures, recitations from the Quran, and remembrance of Allah. Before prayer, ritual purity (Wudu – ablution) must be observed. Salah is performed facing the Qiblah (direction of the Ka'bah in Makkah).</p>
                <div class="table-wrap">
                  <table>
                    <thead>
                      <tr><th>Prayer</th><th>Time</th><th>Rak'ahs</th></tr>
                    </thead>
                    <tbody>
                      <tr><td><strong>Fajr</strong></td><td>Dawn (before sunrise)</td><td>2</td></tr>
                      <tr><td><strong>Dhuhr</strong></td><td>Midday (after solar noon)</td><td>4</td></tr>
                      <tr><td><strong>Asr</strong></td><td>Afternoon</td><td>4</td></tr>
                      <tr><td><strong>Maghrib</strong></td><td>Just after sunset</td><td>3</td></tr>
                      <tr><td><strong>Isha</strong></td><td>Night</td><td>4</td></tr>
                    </tbody>
                  </table>
                </div>
                <div class="quran-box"><i class="fas fa-book-open"></i><span>Quran 2:238 – "Maintain with care the [obligatory] prayers and [in particular] the middle prayer and stand before Allah, devoutly obedient."</span></div>
              </div>
            </div>
          </div>
          <div class="col-half">
            <div class="img-card" style="margin-bottom:1rem">
              <img src="https://images.pexels.com/photos/2695984/pexels-photo-2695984.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Muslim praying" loading="lazy" />
            </div>
            <div class="video-wrap video-sm">
              <iframe src="https://www.youtube.com/embed/-K6HlXzJegk?rel=0" title="How to Pray in Islam" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
              <div class="video-caption"><i class="fas fa-play-circle"></i> How to perform Salah — step by step</div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 7: Zakat -->
      <section class="section-premium" id="zakat">
        <div class="section-header">
          <div class="section-icon"><i class="fas fa-hand-holding-heart"></i></div>
          <div>
            <h2>Zakat – Obligatory Charity</h2>
            <p>The third pillar — purification of wealth and care for those in need</p>
          </div>
        </div>
        <div class="row">
          <div class="col-7">
            <div class="card">
              <div class="card-body">
                <p style="margin-bottom:1rem;font-size:0.93rem;line-height:1.75">Zakat is the compulsory giving of 2.5% of one's total accumulated wealth above the Nisab threshold (minimum amount — approximately the value of 87.48g of gold) to eligible recipients. It is due once a year and is meant to purify one's wealth, reduce inequality, and foster solidarity in the Muslim community. It is distinct from voluntary charity (Sadaqah).</p>
                <h4 style="margin-bottom:0.75rem;color:var(--green-deep)">Eligible Recipients (8 Categories — Quran 9:60)</h4>
                <div class="row">
                  <div class="col-half" style="flex:1 1 140px">
                    <div class="list-item"><i class="fas fa-users text-green"></i><span>The poor (Fuqara)</span></div>
                    <div class="list-item"><i class="fas fa-users text-green"></i><span>The needy (Masakin)</span></div>
                    <div class="list-item"><i class="fas fa-users text-green"></i><span>Zakat administrators</span></div>
                    <div class="list-item"><i class="fas fa-users text-green"></i><span>Those whose hearts are to be reconciled</span></div>
                  </div>
                  <div class="col-half" style="flex:1 1 140px">
                    <div class="list-item"><i class="fas fa-users text-green"></i><span>To free captives / slaves</span></div>
                    <div class="list-item"><i class="fas fa-users text-green"></i><span>Those in debt (Gharimin)</span></div>
                    <div class="list-item"><i class="fas fa-users text-green"></i><span>In the cause of Allah (Fi Sabilillah)</span></div>
                    <div class="list-item"><i class="fas fa-users text-green"></i><span>The stranded traveller (Ibn as-Sabil)</span></div>
                  </div>
                </div>
                <div class="quran-box"><i class="fas fa-book-open"></i><span>Quran 9:103 – "Take from their wealth a charity by which you purify them and cause them to increase, and invoke [Allah's blessings] upon them."</span></div>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="img-card">
              <img src="https://images.pexels.com/photos/6646946/pexels-photo-6646946.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Giving charity" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 8: Sawm -->
      <section class="section-premium" id="sawm">
        <div class="section-header">
          <div class="section-icon"><i class="fas fa-moon"></i></div>
          <div>
            <h2>Sawm – Fasting in Ramadan</h2>
            <p>The fourth pillar — a month of spiritual renewal, self-discipline, and gratitude</p>
          </div>
        </div>
        <div class="row">
          <div class="col-half">
            <div class="card">
              <div class="card-body">
                <p style="margin-bottom:1rem;font-size:0.93rem;line-height:1.75">Sawm refers to the obligatory fast during the Islamic lunar month of Ramadan — the 9th month of the Hijri calendar. Muslims abstain from food, drink, smoking, and sexual relations from Fajr (dawn) to Maghrib (sunset). The fast is broken each evening with Iftar, traditionally starting with dates and water, followed by a meal. Ramadan ends with the celebration of Eid al-Fitr.</p>
                <h4 style="margin-bottom:0.75rem;color:var(--green-deep)">Benefits of Fasting</h4>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Spiritual purification and increased closeness to Allah</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Development of self-discipline and gratitude</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Empathy for those who suffer from hunger and poverty</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Night of Decree (Laylat al-Qadr) — better than 1,000 months</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Increased recitation of the Quran and Tarawih prayers</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Community gathering and spiritual renewal</span></div>
                <div class="quran-box"><i class="fas fa-book-open"></i><span>Quran 2:183 – "O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous."</span></div>
              </div>
            </div>
          </div>
          <div class="col-half">
            <div class="img-card">
              <img src="https://images.pexels.com/photos/2804380/pexels-photo-2804380.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Iftar meal at sunset" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 9: Hajj -->
      <section class="section-premium" id="hajj">
        <div class="section-header">
          <div class="section-icon"><i class="fas fa-mosque"></i></div>
          <div>
            <h2>Hajj – The Pilgrimage to Makkah</h2>
            <p>The fifth pillar — a once-in-a-lifetime journey of spiritual culmination</p>
          </div>
        </div>
        <div class="row">
          <div class="col-half">
            <div class="card">
              <div class="card-body">
                <p style="margin-bottom:1rem;font-size:0.93rem;line-height:1.75">Hajj is the annual pilgrimage to Makkah in the Arabian Peninsula. It is obligatory at least once in a lifetime for every adult Muslim who is physically and financially able. Hajj takes place during the Islamic month of Dhul Hijjah (12th month). It commemorates the trials of Prophet Ibrahim (Abraham) and his family. Pilgrims wear simple white garments (Ihram) symbolising equality before Allah.</p>
                <h4 style="margin-bottom:0.75rem;color:var(--green-deep)">Key Rituals of Hajj</h4>
                <div class="row">
                  <div class="col-half" style="flex:1 1 140px">
                    <div class="list-item"><i class="fas fa-shoe-prints text-green"></i><span>Entering Ihram state</span></div>
                    <div class="list-item"><i class="fas fa-shoe-prints text-green"></i><span>Tawaf – circling the Ka'bah 7 times</span></div>
                    <div class="list-item"><i class="fas fa-shoe-prints text-green"></i><span>Sa'i – walking between Safa & Marwa</span></div>
                  </div>
                  <div class="col-half" style="flex:1 1 140px">
                    <div class="list-item"><i class="fas fa-shoe-prints text-green"></i><span>Standing at Arafat (Day of Arafah)</span></div>
                    <div class="list-item"><i class="fas fa-shoe-prints text-green"></i><span>Muzdalifah – overnight stay</span></div>
                    <div class="list-item"><i class="fas fa-shoe-prints text-green"></i><span>Stoning of the Jamarat (Devil)</span></div>
                  </div>
                </div>
                <div class="quran-box"><i class="fas fa-book-open"></i><span>Quran 3:97 – "And [due] to Allah from the people is a pilgrimage to the House — for whoever is able to find thereto a way."</span></div>
              </div>
            </div>
          </div>
          <div class="col-half">
            <div class="img-card">
              <img src="https://images.pexels.com/photos/5997945/pexels-photo-5997945.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Ka'bah – Makkah" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 10: Afterlife -->
      <section class="section-premium" id="afterlife">
        <div class="section-header">
          <div class="section-icon gold"><i class="fas fa-hourglass-half"></i></div>
          <div>
            <h2>The Afterlife (Akhirah)</h2>
            <p>The eternal dimension — belief in life after death</p>
          </div>
        </div>
        <div class="row">
          <div class="col-7">
            <div class="card">
              <div class="card-body">
                <p class="lead-text" style="margin-bottom:1rem">Islam teaches that this worldly life is temporary and that every soul will be resurrected and judged for their deeds on the Day of Judgement (Yawm al-Qiyama). The afterlife (Akhirah) is eternal and far greater than this world. The Quran describes heaven (Jannah) as a place of unimaginable bliss and hell (Jahannam) as a place of punishment.</p>
                <h4 style="margin-bottom:0.75rem;color:var(--green-deep)">Stages of the Afterlife</h4>
                <div class="row">
                  <div class="col-half" style="flex:1 1 140px">
                    <div class="list-item"><i class="fas fa-hourglass-half text-green"></i><span>Barzakh – the intermediate state (grave)</span></div>
                    <div class="list-item"><i class="fas fa-hourglass-half text-green"></i><span>The Trumpet Blow – end of the world</span></div>
                    <div class="list-item"><i class="fas fa-hourglass-half text-green"></i><span>Resurrection (Ba'ath)</span></div>
                    <div class="list-item"><i class="fas fa-hourglass-half text-green"></i><span>The Gathering (Hashr)</span></div>
                  </div>
                  <div class="col-half" style="flex:1 1 140px">
                    <div class="list-item"><i class="fas fa-hourglass-half text-green"></i><span>The Reckoning (Hisab)</span></div>
                    <div class="list-item"><i class="fas fa-hourglass-half text-green"></i><span>The Scales of Deeds (Mizan)</span></div>
                    <div class="list-item"><i class="fas fa-hourglass-half text-green"></i><span>Al-Sirat – the bridge over Hell</span></div>
                    <div class="list-item"><i class="fas fa-hourglass-half text-green"></i><span>Jannah (Paradise) or Jahannam (Hell)</span></div>
                  </div>
                </div>
                <div class="quran-box"><i class="fas fa-book-open"></i><span>Quran 3:185 – "Every soul will taste death, and you will only be given your full compensation on the Day of Resurrection."</span></div>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="img-card">
              <img src="https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Stars – eternity and the cosmos" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 11: Do's & Don'ts -->
      <section class="section-premium" id="dosdonts">
        <div class="section-header">
          <div class="section-icon"><i class="fas fa-clipboard-list"></i></div>
          <div>
            <h2>Do's &amp; Don'ts in Islam</h2>
            <p>Recommended practices and prohibitions in Islamic law</p>
          </div>
        </div>
        <div class="row">
          <div class="col-half">
            <div class="card">
              <div class="card-head green-grad">
                <i class="fas fa-check-circle"></i>
                <h3>Recommended (Mustahabb / Fard)</h3>
              </div>
              <div class="card-body">
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Pray the five daily prayers on time</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Recite Bismillah before beginning any action</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Greet others with "As-salamu alaykum"</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Be kind and respectful to parents</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Give in charity — both obligatory and voluntary</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Maintain family ties (Silat ar-Rahim)</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Seek knowledge throughout one's life</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Eat only Halal food prepared in accordance with Islamic law</span></div>
                <div class="list-item"><i class="fas fa-check-circle text-green"></i><span>Maintain ritual purity (Taharah)</span></div>
              </div>
            </div>
          </div>
          <div class="col-half">
            <div class="card">
              <div class="card-head red">
                <i class="fas fa-times-circle"></i>
                <h3>Prohibited (Haram)</h3>
              </div>
              <div class="card-body">
                <div class="list-item"><i class="fas fa-times-circle text-red"></i><span>Associating partners with Allah (Shirk)</span></div>
                <div class="list-item"><i class="fas fa-times-circle text-red"></i><span>Consuming alcohol, intoxicants, or pork</span></div>
                <div class="list-item"><i class="fas fa-times-circle text-red"></i><span>Riba (interest/usury) in financial dealings</span></div>
                <div class="list-item"><i class="fas fa-times-circle text-red"></i><span>Zina (adultery / fornication)</span></div>
                <div class="list-item"><i class="fas fa-times-circle text-red"></i><span>Stealing, cheating, or dishonest dealings</span></div>
                <div class="list-item"><i class="fas fa-times-circle text-red"></i><span>Backbiting (Gheebah) and slander</span></div>
                <div class="list-item"><i class="fas fa-times-circle text-red"></i><span>Murder or harming innocent people</span></div>
                <div class="list-item"><i class="fas fa-times-circle text-red"></i><span>Arrogance and pride (Kibr)</span></div>
                <div class="list-item"><i class="fas fa-times-circle text-red"></i><span>Breaking family ties without justified cause</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 12: FAQ -->
      <section class="section-premium" id="faq">
        <div class="section-header">
          <div class="section-icon"><i class="fas fa-question-circle"></i></div>
          <div>
            <h2>Frequently Asked Questions</h2>
            <p>Common questions about Islam answered with care and scholarship</p>
          </div>
        </div>
        <div class="faq-list">
          <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
            <button
              class="faq-btn"
              :class="{ open: faq.open }"
              @click="toggleFaq(index)"
            >
              <i class="fas fa-plus-circle"></i> {{ faq.question }}
            </button>
            <div class="faq-answer" :class="{ open: faq.open }">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 13: Resources -->
      <section class="section-premium" id="resources">
        <div class="section-header">
          <div class="section-icon"><i class="fas fa-mobile-alt"></i></div>
          <div>
            <h2>Apps &amp; Learning Resources</h2>
            <p>Trusted tools to deepen your knowledge and practice</p>
          </div>
        </div>
        <div class="row">
          <div class="col-half">
            <div class="card">
              <div class="card-head">
                <i class="fas fa-mobile-alt"></i>
                <h3>Recommended Apps</h3>
              </div>
              <div class="card-body">
                <div class="resource-item">
                  <i class="fas fa-download"></i>
                  <div><strong>Muslim Pro</strong><div class="small">Prayer times, Quran, Qibla direction, Adhan</div></div>
                </div>
                <div class="resource-item">
                  <i class="fas fa-download"></i>
                  <div><strong>Quran Companion</strong><div class="small">Memorisation tools, Tajweed lessons, progress tracking</div></div>
                </div>
                <div class="resource-item">
                  <i class="fas fa-download"></i>
                  <div><strong>Seerah App</strong><div class="small">Life of the Prophet ﷺ in detail</div></div>
                </div>
                <div class="resource-item">
                  <i class="fas fa-download"></i>
                  <div><strong>Tarteel AI</strong><div class="small">AI-powered Quran recitation correction</div></div>
                </div>
                <div class="resource-item">
                  <i class="fas fa-download"></i>
                  <div><strong>Athan (Azan)</strong><div class="small">Prayer times, Quran audio, Dhikr counter</div></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-half">
            <div class="card">
              <div class="card-head">
                <i class="fas fa-globe"></i>
                <h3>Trusted Websites &amp; Channels</h3>
              </div>
              <div class="card-body">
                <div class="resource-item"><i class="fas fa-external-link-alt"></i><a href="https://islamqa.info" target="_blank" rel="noopener">islamqa.info</a></div>
                <div class="resource-item"><i class="fas fa-external-link-alt"></i><a href="https://sunnah.com" target="_blank" rel="noopener">sunnah.com</a></div>
                <div class="resource-item"><i class="fas fa-external-link-alt"></i><a href="https://quran.com" target="_blank" rel="noopener">quran.com</a></div>
                <div class="resource-item"><i class="fas fa-external-link-alt"></i><a href="https://yaqeeninstitute.org" target="_blank" rel="noopener">yaqeeninstitute.org</a></div>
                <div class="resource-item"><i class="fas fa-external-link-alt"></i><a href="https://seekersguidance.org" target="_blank" rel="noopener">seekersguidance.org</a></div>
                <h4 style="margin-top:1rem;margin-bottom:0.5rem;color:var(--green-deep);font-size:0.95rem">YouTube Channels</h4>
                <div class="resource-item"><i class="fab fa-youtube"></i><a href="https://www.youtube.com/@NoManLeftBehind" target="_blank" rel="noopener">No Man Left Behind</a></div>
                <div class="resource-item"><i class="fab fa-youtube"></i><a href="https://www.youtube.com/@yaqeeninstitute" target="_blank" rel="noopener">Yaqeen Institute</a></div>
                <div class="resource-item"><i class="fab fa-youtube"></i><a href="https://www.youtube.com/@BayyinahInstitute" target="_blank" rel="noopener">Bayyinah Institute</a></div>
                <div class="resource-item"><i class="fab fa-youtube"></i><a href="https://www.youtube.com/@OnePath" target="_blank" rel="noopener">One Path Network</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CLOSING -->
      <div class="closing-block">
        <i class="fas fa-pray"></i>
        <p>"Whoever treads a path seeking knowledge, Allah will make easy for him a path to Paradise." — Prophet Muhammad ﷺ (Sahih Muslim 2699)</p>
      </div>
      <div class="attribution">
        Content compiled from the Quran, Sahih Bukhari, Sahih Muslim, and scholarly consensus. This page is for educational purposes. Please consult a qualified Islamic scholar for personal religious guidance. | Discover Islam Guide
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiscoverIslam',
  data() {
    return {
      searchQuery: '',
      sections: [
        { id: 'basics', title: 'What is Islam?', icon: 'fas fa-star-of-life', excerpt: 'The complete way of life — submission to the will of Allah, covering core beliefs and the five pillars.' },
        { id: 'shahada', title: 'The Shahada', icon: 'fas fa-certificate', excerpt: 'The declaration of faith — the first and most fundamental pillar of Islam.' },
        { id: 'allah', title: 'Who is Allah?', icon: 'fas fa-sun', excerpt: 'Understanding the concept of God in Islam — the One, Unique, Eternal Creator.' },
        { id: 'prophet', title: 'Prophet Muhammad ﷺ', icon: 'fas fa-star', excerpt: 'The final messenger of Allah to all of humanity, born in Makkah 570 CE.' },
        { id: 'quran', title: 'The Holy Quran', icon: 'fas fa-book-open', excerpt: 'The literal word of Allah, 114 chapters, revealed over 23 years.' },
        { id: 'salah', title: 'Salah – Five Daily Prayers', icon: 'fas fa-pray', excerpt: 'Prayer performed five times daily — Fajr, Dhuhr, Asr, Maghrib, Isha.' },
        { id: 'zakat', title: 'Zakat – Obligatory Charity', icon: 'fas fa-hand-holding-heart', excerpt: 'Compulsory giving of 2.5% of savings to those in need, purifying wealth.' },
        { id: 'sawm', title: 'Sawm – Fasting in Ramadan', icon: 'fas fa-moon', excerpt: 'Month-long fast in the Islamic lunar month of Ramadan, the 9th month.' },
        { id: 'hajj', title: 'Hajj – Pilgrimage to Makkah', icon: 'fas fa-mosque', excerpt: 'Annual pilgrimage, once-in-a-lifetime for all able Muslims, in Dhul Hijjah.' },
        { id: 'afterlife', title: 'The Afterlife (Akhirah)', icon: 'fas fa-hourglass-half', excerpt: 'Resurrection, Judgement Day, Jannah (Paradise) and Jahannam (Hell).' },
        { id: 'dosdonts', title: "Do's & Don'ts", icon: 'fas fa-clipboard-list', excerpt: 'Recommended and prohibited actions in Islamic law.' },
        { id: 'faq', title: 'FAQ – Common Questions', icon: 'fas fa-question-circle', excerpt: 'Meaning of Islam, Jihad, women in Islam, becoming Muslim and more.' },
        { id: 'resources', title: 'Apps & Resources', icon: 'fas fa-mobile-alt', excerpt: 'Muslim Pro, Quran.com, SeekersGuidance, Yaqeen Institute and more.' }
      ],
      faqs: [
        {
          question: 'What does "Islam" mean?',
          answer: 'The word "Islam" comes from the Arabic root "S-L-M" which means peace and submission. Islam means "submission to the will of Allah (God)." A Muslim is one who submits to Allah. The word is closely related to "Salam" meaning peace — thus Islam is often described as the path to peace through submission to God.',
          open: false
        },
        {
          question: 'Is Allah different from the God of Christianity and Judaism?',
          answer: 'Muslims believe in the same God worshipped by Abraham, Moses, and Jesus (peace be upon them all). "Allah" is simply the Arabic word for God — Arab Christians also use the word "Allah" for God. While there are theological differences between the Abrahamic faiths, Islam affirms that there is only One God, the Creator of all things, who sent prophets including Abraham, Moses, Jesus, and Muhammad (peace be upon them all).',
          open: false
        },
        {
          question: 'Do Muslims worship Muhammad ﷺ?',
          answer: 'No. Muslims do not worship Prophet Muhammad ﷺ. He is revered as the final messenger and prophet of Allah, and Muslims follow his example (Sunnah) closely. But worship (Ibadah) is directed solely to Allah. The Shahada itself states: "There is no god but Allah, and Muhammad is the messenger of Allah" — clearly distinguishing between God and His messenger.',
          open: false
        },
        {
          question: 'What is Jihad?',
          answer: 'The Arabic word "Jihad" means "struggle" or "striving." The greatest form of Jihad, according to Islamic tradition, is the inner struggle against one\'s own ego, desires, and moral shortcomings (Jihad an-nafs). It also refers to striving in the cause of Allah — which can include community work, education, and justice. Armed Jihad, when it exists, is subject to strict ethical rules in Islamic law and is only permissible under very specific conditions to protect the community from oppression.',
          open: false
        },
        {
          question: 'What is the role of women in Islam?',
          answer: 'Islam affirms the spiritual equality of men and women before Allah — both are equally accountable and equally deserving of Paradise. Islamic scholarship recognises the complementary and equally honoured roles of men and women. Women have the right to own property, pursue education, engage in business, and express their opinions. The Quran and Hadith contain extensive guidance on the rights and dignities afforded to women. Cultural practices that oppress women are often contrary to authentic Islamic teaching.',
          open: false
        },
        {
          question: 'How do I become a Muslim?',
          answer: 'Becoming a Muslim requires sincerely believing in and declaring the Shahada: "I bear witness that there is no god but Allah, and I bear witness that Muhammad is the messenger of Allah." It is recommended (though not strictly required) to say this in front of witnesses and to perform a ritual bath (Ghusl) as a symbol of purification and new beginning. Many mosques and Islamic centres offer support and guidance for new Muslims (reverts).',
          open: false
        },
        {
          question: 'What is the difference between Sunni and Shia Islam?',
          answer: 'The split between Sunni and Shia Islam arose after the death of Prophet Muhammad ﷺ, primarily over the question of leadership of the Muslim community. Sunni Muslims (approximately 85-90% of Muslims globally) believe the community chose Abu Bakr as the rightful first Caliph. Shia Muslims believe leadership should have passed directly to Ali ibn Abi Talib, the Prophet\'s cousin and son-in-law. Despite some differences in practice and jurisprudence, both share the core beliefs and pillars of Islam.',
          open: false
        },
        {
          question: 'What is Halal food?',
          answer: 'Halal (meaning "permissible" in Arabic) food refers to food that is lawful for Muslims to consume according to Islamic law. For meat, the animal must be slaughtered in a specific humane way while the name of Allah is invoked (Bismillah). Pork and its by-products are strictly forbidden (Haram), as is alcohol and any intoxicating substance. Halal certification is widely available on food products globally.',
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
      // Optional: can be used for mobile "Go" button if needed
      if (this.filteredSections.length > 0) {
        this.scrollToSection(this.filteredSections[0].id)
      }
    },
    scrollToSection(id) {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      this.searchQuery = ''
    },
    toggleFaq(index) {
      const wasOpen = this.faqs[index].open
      // Close all others
      this.faqs.forEach(faq => { faq.open = false })
      // Toggle the clicked one
      if (!wasOpen) {
        this.faqs[index].open = true
      }
    }
  },
  mounted() {
    // Scroll animations (exact same logic as original)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    })

    const sectionElements = document.querySelectorAll('.section-premium')
    sectionElements.forEach((el) => {
      el.style.transitionDelay = '0.05s'
      observer.observe(el)
    })

    // Optional: close search when clicking outside (mirrors original behavior)
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-wrapper') && this.searchQuery) {
        this.searchQuery = ''
      }
    })
  }
}
</script>

<style>
  /* ==================== ALL ORIGINAL STYLES COPIED VERBATIM ==================== */
  :root {
    --green-deep: #1a4d1f;
    --green-primary: #2d6a2f;
    --green-soft: #4a8b4d;
    --green-light: #e8f3e8;
    --green-pale: #f0f7f0;
    --beige-deep: #c9b896;
    --beige-primary: #dfd0b2;
    --beige-soft: #f5efe2;
    --beige-light: #fef9ef;
    --cream: #fdfbf7;
    --white: #ffffff;
    --gold: #d4af37;
    --shadow-sm: 0 4px 12px rgba(0,0,0,0.05);
    --shadow-md: 0 8px 24px rgba(0,0,0,0.08);
    --shadow-lg: 0 16px 40px rgba(0,0,0,0.12);
    --shadow-xl: 0 24px 56px rgba(0,0,0,0.16);
    --radius-sm: 12px;
    --radius-md: 20px;
    --radius-lg: 28px;
    --radius-xl: 36px;
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
  }
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--cream);
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #2c3e2f;
    overflow-x: hidden;
  }
  h1, h2, h3, h4, h5 {
    font-family: 'Playfair Display', Georgia, serif;
  }
  /* ===== HERO ===== */
  .hero-premium {
    background: linear-gradient(135deg, var(--green-deep) 0%, #3a6b20 50%, var(--beige-deep) 100%);
    position: relative;
    padding: 5rem 1.5rem 7rem;
    color: white;
    overflow: hidden;
    text-align: center;
  }
  .hero-bg-shape {
    position: absolute;
    top: -30%;
    right: -10%;
    width: 60%;
    height: 80%;
    background: radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
  .hero-pattern {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' opacity='0.04'%3E%3Ccircle cx='40' cy='40' r='1.5' fill='white'/%3E%3Ccircle cx='0' cy='0' r='1.5' fill='white'/%3E%3Ccircle cx='80' cy='0' r='1.5' fill='white'/%3E%3Ccircle cx='0' cy='80' r='1.5' fill='white'/%3E%3Ccircle cx='80' cy='80' r='1.5' fill='white'/%3E%3C/svg%3E");
    background-size: 80px 80px;
    pointer-events: none;
  }
  .hero-inner {
    position: relative;
    z-index: 2;
    max-width: 720px;
    margin: 0 auto;
  }
  .hero-badge {
    display: inline-block;
    background: rgba(255,255,255,0.14);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    padding: 0.45rem 1.25rem;
    border-radius: 60px;
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    margin-bottom: 1.5rem;
  }
  .hero-title {
    font-size: clamp(2rem, 5vw, 3.6rem);
    font-weight: 800;
    margin-bottom: 1rem;
    line-height: 1.15;
  }
  .title-icon { margin-right: 0.5rem; }
  .hero-subtitle {
    font-size: 1.1rem;
    opacity: 0.88;
    margin-bottom: 2.25rem;
    max-width: 560px;
    margin-left: auto;
    margin-right: auto;
  }
  /* Search */
  .search-wrapper {
    max-width: 540px;
    margin: 0 auto 2.5rem;
    position: relative;
  }
  .search-box {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 60px;
    padding: 0.25rem;
    box-shadow: var(--shadow-xl);
    transition: var(--transition-normal);
  }
  .search-box:focus-within { box-shadow: 0 0 0 3px rgba(45,106,47,0.35), var(--shadow-xl); }
  .search-icon { color: #aaa; margin-left: 1.25rem; font-size: 1rem; }
  .search-input {
    flex: 1;
    border: none;
    padding: 0.85rem 0.75rem;
    font-size: 0.95rem;
    outline: none;
    background: transparent;
    font-family: inherit;
    color: #333;
  }
  .search-btn {
    background: var(--green-primary);
    border: none;
    color: white;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    cursor: pointer;
    transition: var(--transition-normal);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
  }
  .search-btn:hover { background: var(--green-deep); transform: scale(1.05); }
  .search-results {
    position: absolute;
    top: calc(100% + 0.75rem);
    left: 0;
    right: 0;
    background: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    border: 1px solid rgba(0,0,0,0.06);
    overflow: hidden;
    z-index: 100;
    display: none;
  }
  .search-results.active { display: block; }
  .search-result-item {
    padding: 0.9rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.85rem;
    cursor: pointer;
    transition: var(--transition-fast);
    border-bottom: 1px solid #f5f5f5;
    text-align: left;
  }
  .search-result-item:last-child { border-bottom: none; }
  .search-result-item:hover { background: var(--green-pale); }
  .search-result-item i { color: var(--green-primary); font-size: 1.1rem; width: 24px; }
  .search-result-title { font-weight: 600; color: var(--green-deep); font-size: 0.9rem; }
  .search-result-excerpt { font-size: 0.75rem; color: #999; margin-top: 0.15rem; }
  /* Hero Stats */
  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 2.5rem;
    flex-wrap: wrap;
  }
  .hero-stat { text-align: center; }
  .hero-stat-circle {
    width: 54px;
    height: 54px;
    background: rgba(255,255,255,0.14);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    margin: 0 auto 0.5rem;
    transition: var(--transition-normal);
  }
  .hero-stat:hover .hero-stat-circle {
    background: rgba(255,255,255,0.24);
    transform: translateY(-3px);
  }
  .hero-stat span { font-size: 0.82rem; font-weight: 500; opacity: 0.9; }
  /* Wave */
  .hero-wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 0;
  }
  .hero-wave svg { width: 100%; height: 70px; }
  /* ===== MAIN ===== */
  .main-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 1.5rem 4rem;
  }
  /* Disclaimer */
  .disclaimer {
    background: var(--beige-soft);
    border-radius: var(--radius-md);
    padding: 1rem 1.5rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 3.5rem;
    border-left: 4px solid var(--green-primary);
  }
  .disclaimer i { color: var(--green-primary); font-size: 1.1rem; margin-top: 0.1rem; flex-shrink: 0; }
  .disclaimer p { font-size: 0.83rem; color: #5a4a2a; line-height: 1.5; }
  .disclaimer strong { color: var(--green-deep); }
  /* ===== SECTIONS ===== */
  .section-premium {
    margin-bottom: 5rem;
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .section-premium.visible { opacity: 1; transform: translateY(0); }
  .section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .section-icon {
    width: 62px;
    height: 62px;
    background: linear-gradient(135deg, var(--green-primary), var(--green-soft));
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-md);
    flex-shrink: 0;
  }
  .section-icon i { font-size: 1.6rem; color: white; }
  .section-icon.red { background: linear-gradient(135deg, #c0392b, #e74c3c); }
  .section-icon.gold { background: linear-gradient(135deg, #b8860b, var(--gold)); }
  .section-header h2 {
    font-size: clamp(1.4rem, 3vw, 1.85rem);
    font-weight: 700;
    color: var(--green-deep);
    margin: 0;
  }
  .section-header p {
    color: #7a8b7b;
    font-size: 0.9rem;
    margin-top: 0.2rem;
  }
  /* ===== CARDS ===== */
  .card {
    background: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    transition: var(--transition-normal);
    height: 100%;
  }
  .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .card-head {
    padding: 1.2rem 1.5rem;
    background: var(--green-pale);
    border-bottom: 1px solid rgba(0,0,0,0.05);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .card-head i { font-size: 1.3rem; color: var(--green-primary); }
  .card-head h3 { font-size: 1.1rem; font-weight: 600; color: var(--green-deep); margin: 0; }
  .card-head.red { background: linear-gradient(135deg, #c0392b, #e74c3c); }
  .card-head.red i, .card-head.red h3 { color: white; }
  .card-head.green-grad { background: linear-gradient(135deg, var(--green-primary), var(--green-soft)); }
  .card-head.green-grad i, .card-head.green-grad h3 { color: white; }
  .card-body { padding: 1.5rem; }
  /* List Items */
  .list-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    font-size: 0.93rem;
    line-height: 1.5;
  }
  .list-item i { width: 18px; font-size: 0.85rem; margin-top: 0.2rem; flex-shrink: 0; }
  .text-green { color: var(--green-primary); }
  .text-gold { color: var(--gold); }
  .text-red { color: #c0392b; }
  /* Reference */
  .ref-box {
    background: var(--beige-soft);
    padding: 0.7rem 1rem;
    border-radius: var(--radius-sm);
    font-size: 0.78rem;
    display: flex;
    gap: 0.6rem;
    align-items: flex-start;
    margin-top: 1.25rem;
  }
  .ref-box i { color: var(--green-primary); flex-shrink: 0; margin-top: 0.1rem; }
  .quran-box {
    background: var(--green-pale);
    padding: 0.9rem 1rem;
    border-radius: var(--radius-sm);
    font-size: 0.88rem;
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    border-left: 3px solid var(--green-primary);
    margin-top: 1.25rem;
  }
  .quran-box i { color: var(--green-primary); font-size: 1rem; flex-shrink: 0; }
  /* ===== GRID ===== */
  .row { display: flex; flex-wrap: wrap; gap: 1.25rem; }
  .col-half { flex: 1 1 280px; min-width: 0; }
  .col-7 { flex: 1.2 1 320px; min-width: 0; }
  .col-5 { flex: 0.8 1 240px; min-width: 0; }
  /* ===== IMAGE ===== */
  .img-card {
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }
  .img-card img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
  .img-card:hover img { transform: scale(1.03); }
  .img-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 1.25rem;
  }
  .img-grid-item {
    position: relative;
    border-radius: var(--radius-md);
    overflow: hidden;
    cursor: pointer;
  }
  .img-grid-item img {
    width: 100%;
    height: 210px;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
  .img-grid-item:hover img { transform: scale(1.04); }
  .img-overlay {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.65), transparent);
    padding: 0.85rem;
    color: white;
    font-size: 0.82rem;
    font-weight: 500;
  }
  /* ===== VIDEO ===== */
  .video-wrap {
    border-radius: var(--radius-md);
    overflow: hidden;
    margin-top: 1.25rem;
    box-shadow: var(--shadow-md);
  }
  .video-wrap iframe {
    display: block;
    width: 100%;
    height: 360px;
    border: none;
  }
  .video-caption {
    padding: 0.6rem 1rem;
    font-size: 0.75rem;
    color: #888;
    background: var(--beige-soft);
    text-align: center;
  }
  .video-sm iframe { height: 200px; }
  /* ===== SHAHADA ===== */
  .shahada-block {
    background: linear-gradient(135deg, var(--green-pale), var(--beige-soft));
    border-radius: var(--radius-xl);
    display: grid;
    grid-template-columns: 1fr 0.75fr;
    overflow: hidden;
    box-shadow: var(--shadow-md);
  }
  .shahada-content { padding: 2.25rem; }
  .shahada-arabic {
    font-family: 'Amiri', 'Traditional Arabic', serif;
    font-size: clamp(1.4rem, 3vw, 2.1rem);
    color: var(--green-deep);
    margin-bottom: 0.85rem;
    line-height: 1.5;
    direction: rtl;
  }
  .shahada-transliteration { font-size: 0.95rem; color: var(--green-primary); font-weight: 600; margin-bottom: 0.4rem; }
  .shahada-translation { font-style: italic; color: #666; margin-bottom: 1rem; font-size: 0.9rem; }
  .shahada-explanation { color: #4a5a4b; font-size: 0.9rem; line-height: 1.7; margin-bottom: 1rem; }
  .shahada-img { background: #0f2a12; }
  .shahada-img img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; display: block; }
  /* ===== NAMES GRID ===== */
  .names-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
  }
  .name-badge {
    background: var(--green-light);
    color: var(--green-primary);
    padding: 0.35rem 0.9rem;
    border-radius: 60px;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: default;
    transition: var(--transition-fast);
  }
  .name-badge:hover { background: var(--green-primary); color: white; transform: translateY(-2px); }
  /* ===== TABLE ===== */
  .table-wrap { overflow-x: auto; margin: 1rem 0; }
  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: var(--radius-sm);
    overflow: hidden;
  }
  thead th {
    background: var(--green-primary);
    color: white;
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
  }
  tbody td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #eee;
    font-size: 0.88rem;
  }
  tbody tr:last-child td { border-bottom: none; }
  tbody tr:hover td { background: var(--green-pale); }
  /* ===== FAQ ===== */
  .faq-list {
    background: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
  }
  .faq-item { border-bottom: 1px solid #eee; }
  .faq-item:last-child { border-bottom: none; }
  .faq-btn {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 1.5rem;
    font-weight: 600;
    color: var(--green-deep);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.85rem;
    transition: var(--transition-fast);
    font-size: 0.95rem;
    font-family: 'DM Sans', sans-serif;
  }
  .faq-btn:hover { background: var(--green-pale); }
  .faq-btn i { color: var(--green-primary); font-size: 1rem; flex-shrink: 0; transition: transform 0.3s ease; }
  .faq-btn.open i { transform: rotate(45deg); }
  .faq-answer {
    display: none;
    padding: 0 1.5rem 1.4rem 3.4rem;
    color: #555;
    font-size: 0.9rem;
    line-height: 1.75;
  }
  .faq-answer.open { display: block; }
  /* ===== RESOURCES ===== */
  .resource-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0.6rem;
    border-radius: var(--radius-sm);
    margin-bottom: 0.6rem;
    transition: var(--transition-fast);
    font-size: 0.88rem;
  }
  .resource-item:hover { background: var(--green-pale); }
  .resource-item i { color: var(--green-primary); width: 20px; }
  .resource-item a { color: var(--green-primary); text-decoration: none; font-weight: 500; }
  .resource-item a:hover { text-decoration: underline; }
  .resource-item .small { font-size: 0.76rem; color: #888; margin-top: 0.1rem; }
  .fab.fa-youtube { color: #c0392b !important; }
  /* ===== CLOSING ===== */
  .closing-block {
    background: linear-gradient(135deg, var(--green-light), var(--beige-soft));
    padding: 2.25rem;
    border-radius: var(--radius-xl);
    text-align: center;
    margin: 3.5rem 0 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .closing-block i { font-size: 2.25rem; color: var(--green-primary); }
  .closing-block p { font-size: 1.05rem; color: var(--green-deep); font-weight: 500; font-family: 'Playfair Display', serif; font-style: italic; }
  .attribution {
    text-align: center;
    font-size: 0.7rem;
    color: #aaa;
    padding: 1rem;
  }
  /* ===== LEAD TEXT ===== */
  .lead-text { font-size: 1rem; line-height: 1.75; color: #3a4a3b; }
  /* ===== RESPONSIVE ===== */
  @media (max-width: 768px) {
    .shahada-block { grid-template-columns: 1fr; }
    .shahada-img { height: 220px; }
    .img-grid { grid-template-columns: 1fr; }
    .section-header { flex-direction: column; text-align: center; }
    .section-icon { margin: 0 auto; }
    .section-header h2 { text-align: center; }
    .hero-stats { gap: 1.5rem; }
    .video-wrap iframe { height: 220px; }
  }
  @media (max-width: 540px) {
    .hero-premium { padding: 3.5rem 1rem 6rem; }
    .hero-badge { font-size: 0.74rem; }
    .main-container { padding: 2rem 1rem 3rem; }
    .card-body { padding: 1.2rem; }
    .shahada-content { padding: 1.5rem; }
    .faq-btn { padding: 1rem; font-size: 0.88rem; }
    .faq-answer { padding: 0 1rem 1.2rem 2.8rem; }
  }
</style>