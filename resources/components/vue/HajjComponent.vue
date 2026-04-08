<template>
  <div class="pg">
    <div class="main-container">
      
      <!-- SIMPLIFIED HERO SECTION -->
      <header class="hero">
        <div class="hero-content">
          <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <h1 class="hero-title">Your Complete Guide to Hajj & Umrah</h1>
          <p class="hero-subtitle">Step-by-step guidance for the sacred pilgrimage, verified by Islamic scholars and updated for 1447 AH.</p>
          
          <div class="hero-actions">
            <button class="btn-primary" @click="scrollToSection('basics')">Begin Your Journey</button>
            <a :href="pdfs.completeGuide" download class="btn-secondary">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
              Download Full Guide
            </a>
          </div>
        </div>
      </header>

      <!-- Chapter I: Basics - TEXT LEFT, IMAGE RIGHT -->
      <div class="sec fade-in-section" id="basics">
        <div class="content-grid">
          <div class="text-content">
            <span class="eyebrow">Chapter I</span>
            <h2 class="sec-title">Understanding Hajj & Umrah</h2>
            <p class="lead-text">The pilgrimage to Makkah is one of the most profound acts of worship in Islam, representing the unity of Muslims worldwide and the submission to Allah's command.</p>
            
            <div class="content-block">
              <h3>What is Hajj?</h3>
              <p>Hajj is the fifth pillar of Islam and an obligatory act of worship for every Muslim who is physically and financially able to perform it at least once in their lifetime. It takes place during the Islamic month of Dhul Hijjah and commemorates the trials of Prophet Ibrahim (AS), his wife Hajar, and their son Ismail (AS).</p>
              <p>The pilgrimage involves a series of rituals performed over 5-6 days, including wearing the Ihram (sacred state), standing at Arafat, stoning the pillars representing Satan, and circumambulating the Kaaba.</p>
            </div>

            <div class="content-block">
              <h3>What is Umrah?</h3>
              <p>Umrah, often called the "minor pilgrimage," can be performed at any time of the year and is highly recommended (Sunnah Mu'akkadah). While shorter and less complex than Hajj, it carries immense spiritual reward and serves as a means of seeking forgiveness and drawing closer to Allah.</p>
              <p>Umrah consists of four main acts: entering Ihram, performing Tawaf (circumambulation of the Kaaba), Sa'i (walking between Safa and Marwa), and cutting or shaving the hair.</p>
            </div>

            <div class="key-differences">
              <h4>Key Differences</h4>
              <ul>
                <li><strong>Timing:</strong> Hajj is specific to Dhul Hijjah (8th-13th), while Umrah can be performed year-round</li>
                <li><strong>Duration:</strong> Hajj takes 5-6 days; Umrah can be completed in a few hours</li>
                <li><strong>Obligation:</strong> Hajj is obligatory once in a lifetime; Umrah is voluntary but highly rewarded</li>
                <li><strong>Rituals:</strong> Hajj includes additional rites like standing at Arafat and stoning at Mina</li>
              </ul>
            </div>
          </div>
          
          <div class="image-content">
            <img 
              src="https://images.pexels.com/photos/2347321/pexels-photo-2347321.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="The Holy Kaaba in Masjid al-Haram"
              loading="lazy"
            >
            <div class="image-caption">The Holy Kaaba - The focal point of Islamic worship</div>
          </div>
        </div>

        <div class="section-download">
          <a :href="pdfs.basicsGuide" download class="download-btn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            <span>Download Chapter 1: Basics (PDF)</span>
          </a>
        </div>
      </div>

      <!-- Chapter II: Umrah Steps - TEXT LEFT, IMAGE RIGHT -->
      <div class="sec alt fade-in-section" id="umrah">
        <div class="content-grid">
          <div class="text-content">
            <span class="eyebrow">Chapter II</span>
            <h2 class="sec-title">Performing Umrah: A Complete Guide</h2>
            <p class="lead-text">Umrah is a beautiful act of worship that purifies the soul and brings one closer to Allah. Follow these steps carefully to ensure your Umrah is performed correctly.</p>

            <div class="step-card">
              <div class="step-number">01</div>
              <div class="step-content">
                <h3>Ihram - The Sacred State</h3>
                <p>Before crossing the Miqat (boundary), purify yourself with ghusl (ritual bath), trim your nails, and remove scented products. Men wear two white unstitched cloths; women wear modest clothing covering the body except face and hands.</p>
                <p class="important-note"><strong>Important:</strong> Make your Niyyah (intention) for Umrah and recite the Talbiyah: "Labbayk Allahumma Umrah" (Here I am, O Allah, for Umrah).</p>
              </div>
            </div>

            <div class="step-card">
              <div class="step-number">02</div>
              <div class="step-content">
                <h3>Tawaf - Circumambulation</h3>
                <p>Upon entering Masjid al-Haram, proceed to the Kaaba and perform Tawaf - seven counter-clockwise circuits starting and ending at the Black Stone (Hajar al-Aswad). If possible, kiss or touch the Black Stone; otherwise, point to it and say "Bismillah, Allahu Akbar."</p>
                <p>During the first three circuits, men should perform Ramal (brisk walking with short steps). Recite Quran, make dhikr, or supplicate as you circle the House of Allah.</p>
              </div>
            </div>

            <div class="step-card">
              <div class="step-number">03</div>
              <div class="step-content">
                <h3>Sa'i - Walking Between Safa and Marwa</h3>
                <p>After Tawaf, pray two rak'at behind Maqam Ibrahim if possible. Then proceed to Safa and walk seven times between Safa and Marwa, commemorating Hajar's search for water for her son Ismail.</p>
                <p>Men should walk briskly between the green markers. Recite: "Indeed, Safa and Marwa are among the symbols of Allah" (Quran 2:158) when starting at each hill.</p>
              </div>
            </div>

            <div class="step-card">
              <div class="step-number">04</div>
              <div class="step-content">
                <h3>Tahallul - Exiting Ihram</h3>
                <p>Complete your Umrah by cutting or shaving your hair. Men are recommended to shave their heads completely (Halq), though trimming at least an inch is permissible (Taqsir). Women should trim about a fingertip's length.</p>
                <p>Once completed, you exit the state of Ihram and all restrictions are lifted. Your Umrah is now complete - may Allah accept it!</p>
              </div>
            </div>
          </div>
          
          <div class="image-content">
            <img 
              src="https://images.pexels.com/photos/1579426/pexels-photo-1579426.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Pilgrims performing Tawaf around the Kaaba"
              loading="lazy"
            >
            <div class="image-caption">Pilgrims performing Tawaf around the Kaaba</div>
          </div>
        </div>

        <div class="section-download">
          <a :href="pdfs.umrahGuide" download class="download-btn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            <span>Download Umrah Step-by-Step Guide (PDF)</span>
          </a>
        </div>
      </div>

      <!-- Chapter III: Hajj Days - TEXT LEFT, IMAGE RIGHT -->
      <div class="sec fade-in-section" id="hajj">
        <div class="content-grid">
          <div class="text-content">
            <span class="eyebrow">Chapter III</span>
            <h2 class="sec-title">The Days of Hajj</h2>
            <p class="lead-text">Hajj is performed over specific days in Dhul Hijjah. Each day carries unique rituals and spiritual significance.</p>

            <div class="day-card-detailed">
              <div class="day-header">
                <span class="day-number">Day 1</span>
                <span class="day-date">8th Dhul Hijjah - Day of Tarwiyah</span>
              </div>
              <div class="day-body">
                <p><strong>Morning:</strong> Enter Ihram from your location (Makkah if performing Tamattu). Make intention for Hajj and recite Talbiyah.</p>
                <p><strong>Afternoon:</strong> Travel to Mina (8km from Makkah). Spend the day and night in prayer, Quran recitation, and preparation for Arafat.</p>
                <p><strong>Prayers:</strong> Pray Dhuhr, Asr, Maghrib, Isha, and Fajr in Mina. Shorten the four-rak'at prayers to two rak'at each (Qasr) but do not combine them.</p>
              </div>
            </div>

            <div class="day-card-detailed">
              <div class="day-header">
                <span class="day-number">Day 2</span>
                <span class="day-date">9th Dhul Hijjah - Day of Arafah</span>
              </div>
              <div class="day-body">
                <p><strong>After Fajr:</strong> Remain in Mina until sunrise, then proceed to Arafat.</p>
                <p><strong>At Arafat:</strong> This is the most important day of Hajj. From after Dhuhr until sunset, stand in sincere supplication and remembrance of Allah. The Prophet (ﷺ) said: "Hajj is Arafah."</p>
                <p><strong>Dua:</strong> Raise your hands and make heartfelt dua. The best supplication is on the Day of Arafah. Recite: "La ilaha illallah wahdahu la sharika lah..."</p>
                <p><strong>After Sunset:</strong> Depart calmly to Muzdalifah. Do not pray Maghrib yet.</p>
              </div>
            </div>

            <div class="day-card-detailed">
              <div class="day-header">
                <span class="day-number">Night</span>
                <span class="day-date">9th-10th Dhul Hijjah - Night at Muzdalifah</span>
              </div>
              <div class="day-body">
                <p><strong>At Muzdalifah:</strong> Pray Maghrib and Isha combined (Maghrib 3 rak'at, Isha 2 rak'at with one salam). Rest under the open sky.</p>
                <p><strong>Collect Pebbles:</strong> Gather 49-70 small pebbles (about the size of a chickpea) for stoning the Jamarat. It's recommended to collect them at Muzdalifah.</p>
                <p><strong>Fajr:</strong> Pray Fajr early and remain in supplication until it's very light (Isfar), then depart for Mina before sunrise.</p>
              </div>
            </div>

            <div class="day-card-detailed">
              <div class="day-header">
                <span class="day-number">Day 3</span>
                <span class="day-date">10th Dhul Hijjah - Eid al-Adha</span>
              </div>
              <div class="day-body">
                <p><strong>At Mina:</strong> Stone Jamarat al-Aqabah (the largest pillar) with seven pebbles, saying "Allahu Akbar" with each throw.</p>
                <p><strong>Sacrifice:</strong> Perform or arrange the sacrifice (Qurbani/Hadi). This is obligatory for those performing Hajj Tamattu or Qiran.</p>
                <p><strong>Shave/Trim:</strong> Shave or trim your hair (this is the first Tahallul - partial release from Ihram).</p>
                <p><strong>Tawaf al-Ifadah:</strong> Go to Makkah and perform Tawaf al-Ifadah (also called Tawaf al-Ziyarah) - seven circuits around the Kaaba. This is a pillar of Hajj.</p>
                <p><strong>Sa'i:</strong> If you haven't done Sa'i for Hajj yet, perform it now (seven walks between Safa and Marwa).</p>
                <p><strong>Return to Mina:</strong> Go back to Mina to spend the night.</p>
              </div>
            </div>

            <div class="day-card-detailed">
              <div class="day-header">
                <span class="day-number">Days 4-5</span>
                <span class="day-date">11th-13th Dhul Hijjah - Days of Tashreeq</span>
              </div>
              <div class="day-body">
                <p><strong>Stoning:</strong> Each day after Dhuhr, stone all three Jamarat (small, medium, large) with seven pebbles each, starting with the smallest.</p>
                <p><strong>Supplication:</strong> After stoning the small and medium pillars, face the Qibla and make dua. Do not make dua after the largest pillar.</p>
                <p><strong>Departure:</strong> You may leave Mina on the 12th before sunset (Nafar Awwal) or stay until the 13th (Nafar Thani - more virtuous).</p>
              </div>
            </div>

            <div class="day-card-detailed">
              <div class="day-header">
                <span class="day-number">Final</span>
                <span class="day-date">Tawaf al-Wada - Farewell Tawaf</span>
              </div>
              <div class="day-body">
                <p>Before leaving Makkah, perform Tawaf al-Wada (Farewell Tawaf) - seven circuits around the Kaaba. This is obligatory for those living outside the Miqat boundaries.</p>
                <p>After this, depart with the hope of returning and the promise of a Hajj Mabroor (accepted pilgrimage).</p>
              </div>
            </div>
          </div>
          
          <div class="image-content">
            <img 
              src="https://images.pexels.com/photos/2347338/pexels-photo-2347338.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Pilgrims at Mount Arafat"
              loading="lazy"
            >
            <div class="image-caption">The plains of Arafat on the Day of Arafah</div>
          </div>
        </div>

        <div class="section-download">
          <a :href="pdfs.hajjGuide" download class="download-btn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            <span>Download Complete Hajj Guide (PDF)</span>
          </a>
        </div>
      </div>

      <!-- Chapter IV: Ihram Rules - TEXT LEFT, IMAGE RIGHT -->
      <div class="sec alt fade-in-section" id="ihram">
        <div class="content-grid">
          <div class="text-content">
            <span class="eyebrow">Chapter IV</span>
            <h2 class="sec-title">Ihram: Rules & Etiquette</h2>
            <p class="lead-text">When you enter the state of Ihram, certain acts become prohibited to maintain the sanctity of this sacred state.</p>

            <div class="rules-section">
              <h3>Prohibited Acts in Ihram</h3>
              <div class="rule-category">
                <h4>For Both Men and Women:</h4>
                <ul>
                  <li>Cutting hair or nails (any part of the body)</li>
                  <li>Using perfume or scented products (soap, shampoo, deodorant with fragrance)</li>
                  <li>Hunting land animals or assisting in hunting</li>
                  <li>Cutting or uprooting plants within the Haram boundaries</li>
                  <li>Sexual relations, marriage contracts, or proposing marriage</li>
                  <li>Wearing gloves (covering hands)</li>
                  <li>Arguing, fighting, or using foul language</li>
                </ul>
              </div>

              <div class="rule-category">
                <h4>Specifically for Men:</h4>
                <ul>
                  <li>Wearing stitched clothing (shirts, pants, underwear, turbans)</li>
                  <li>Covering the head with anything that touches it (caps, scarves, hoods)</li>
                  <li>Wearing shoes that cover the ankles</li>
                </ul>
              </div>

              <div class="rule-category">
                <h4>Specifically for Women:</h4>
                <ul>
                  <li>Covering the face with niqab or burqa (may use umbrella or lower gaze)</li>
                  <li>Wearing gloves</li>
                </ul>
              </div>
            </div>

            <div class="permitted-section">
              <h3>Permitted Acts in Ihram</h3>
              <ul class="permitted-list">
                <li>Showering or bathing with unscented soap</li>
                <li>Changing your Ihram garments</li>
                <li>Wearing a belt, money pouch, or watch</li>
                <li>Using an umbrella or seeking shade</li>
                <li>Wearing glasses or sunglasses</li>
                <li>Applying unscented medical ointments</li>
                <li>Killing harmful creatures (scorpions, snakes, rats, crows)</li>
                <li>Eating, drinking, and sleeping normally</li>
              </ul>
            </div>

            <div class="fidya-section">
              <h3>Fidyah (Expiation) for Violations</h3>
              <p>If you unintentionally violate any prohibition, you must offer Fidyah:</p>
              <ul>
                <li><strong>Minor violations:</strong> Feeding six poor people, or fasting three days, or sacrificing a sheep</li>
                <li><strong>Shaving hair due to illness:</strong> Fasting three days, feeding six poor people, or sacrificing a sheep</li>
                <li><strong>Sexual relations before first Tahallul:</strong> This invalidates Hajj and requires a major sacrifice (camel or cow), completing the Hajj, and repeating it the following year</li>
              </ul>
            </div>
          </div>
          
          <div class="image-content">
            <img 
              src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="White Ihram clothing for Hajj"
              loading="lazy"
            >
            <div class="image-caption">The simple white Ihram garments symbolizing equality before Allah</div>
          </div>
        </div>

        <div class="section-download">
          <a :href="pdfs.ihramRules" download class="download-btn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            <span>Download Ihram Rules Reference (PDF)</span>
          </a>
        </div>
      </div>

      <!-- Chapter V: Duas & Supplications - TEXT LEFT, IMAGE RIGHT -->
      <div class="sec fade-in-section" id="duas">
        <div class="content-grid">
          <div class="text-content">
            <span class="eyebrow">Chapter V</span>
            <h2 class="sec-title">Essential Duas for Hajj & Umrah</h2>
            <p class="lead-text">Supplication is the essence of worship. Here are the most important duas to recite during your pilgrimage.</p>

            <div class="dua-card">
              <div class="dua-header">
                <span class="dua-label">Talbiyah</span>
                <span class="dua-when">Recited continuously in Ihram</span>
              </div>
              <div class="dua-arabic">لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ</div>
              <div class="dua-transliteration">Labbayk Allahumma labbayk. Labbayka la sharika laka labbayk. Innal-hamda wan-ni'mata laka wal-mulk, la sharika lak.</div>
              <div class="dua-translation">"Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise and blessings are Yours, and all sovereignty, You have no partner."</div>
            </div>

            <div class="dua-card">
              <div class="dua-header">
                <span class="dua-label">Starting Tawaf</span>
                <span class="dua-when">At the Black Stone</span>
              </div>
              <div class="dua-arabic">بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ</div>
              <div class="dua-transliteration">Bismillah, Allahu Akbar</div>
              <div class="dua-translation">"In the name of Allah, and Allah is the Greatest"</div>
            </div>

            <div class="dua-card">
              <div class="dua-header">
                <span class="dua-label">Between Rukn Yamani and Black Stone</span>
                <span class="dua-when">During Tawaf</span>
              </div>
              <div class="dua-arabic">رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ</div>
              <div class="dua-transliteration">Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar</div>
              <div class="dua-translation">"Our Lord, give us in this world good and in the Hereafter good, and protect us from the punishment of the Fire" (Quran 2:201)</div>
            </div>

            <div class="dua-card">
              <div class="dua-header">
                <span class="dua-label">At Safa and Marwa</span>
                <span class="dua-when">Starting Sa'i</span>
              </div>
              <div class="dua-arabic">إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ ۖ فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَن يَطَّوَّفَ بِهِمَا</div>
              <div class="dua-transliteration">Innas-Safa wal-Marwata min sha'a'irillah. Faman hajjal-Bayta awi'tamara fala junaha 'alayhi an yattawwafa bihima</div>
              <div class="dua-translation">"Indeed, Safa and Marwa are among the symbols of Allah. So whoever makes Hajj to the House or performs Umrah - there is no blame upon him for walking between them" (Quran 2:158)</div>
            </div>

            <div class="dua-card">
              <div class="dua-header">
                <span class="dua-label">Day of Arafah</span>
                <span class="dua-when">Best supplication</span>
              </div>
              <div class="dua-arabic">لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ</div>
              <div class="dua-transliteration">La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu, wa huwa 'ala kulli shay'in qadir</div>
              <div class="dua-translation">"There is no god but Allah alone, He has no partner, to Him belongs the dominion and to Him belongs all praise, and He is over all things omnipotent"</div>
            </div>

            <div class="dua-card">
              <div class="dua-header">
                <span class="dua-label">At Stoning Jamarat</span>
                <span class="dua-when">With each pebble</span>
              </div>
              <div class="dua-arabic">اللَّهُ أَكْبَرُ</div>
              <div class="dua-transliteration">Allahu Akbar</div>
              <div class="dua-translation">"Allah is the Greatest"</div>
            </div>
          </div>
          
          <div class="image-content">
            <img 
              src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Quran and prayer beads"
              loading="lazy"
            >
            <div class="image-caption">The Quran - Your guide and companion during Hajj</div>
          </div>
        </div>

        <div class="section-download">
          <a :href="pdfs.duasCollection" download class="download-btn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            <span>Download Complete Duas Booklet (PDF)</span>
          </a>
        </div>
      </div>

      <!-- Chapter VI: Practical Tips - TEXT LEFT, IMAGE RIGHT -->
      <div class="sec alt fade-in-section" id="tips">
        <div class="content-grid">
          <div class="text-content">
            <span class="eyebrow">Chapter VI</span>
            <h2 class="sec-title">Practical Tips for a Smooth Pilgrimage</h2>
            <p class="lead-text">Prepare yourself physically, mentally, and spiritually for the journey ahead.</p>

            <div class="tip-category">
              <h3>Before You Travel</h3>
              <ul>
                <li><strong>Health Check:</strong> Visit your doctor for a check-up and required vaccinations (Meningitis ACWY is mandatory)</li>
                <li><strong>Physical Fitness:</strong> Start walking 5-10km daily to build stamina for the long walks</li>
                <li><strong>Learn the Rites:</strong> Study the rituals thoroughly before departure</li>
                <li><strong>Travel Insurance:</strong> Ensure you have comprehensive coverage</li>
                <li><strong>Documents:</strong> Keep copies of passport, visa, tickets, and hotel bookings</li>
                <li><strong>Money:</strong> Carry Saudi Riyals in small denominations</li>
              </ul>
            </div>

            <div class="tip-category">
              <h3>Packing Essentials</h3>
              <ul>
                <li><strong>Ihram:</strong> Two white unstitched cloths (men), modest clothing (women)</li>
                <li><strong>Footwear:</strong> Comfortable sandals that expose the ankle bone</li>
                <li><strong>Hygiene:</strong> Unscented soap, shampoo, toothpaste, and miswak</li>
                <li><strong>Medications:</strong> Personal prescriptions, pain relievers, band-aids, blister pads</li>
                <li><strong>Comfort:</strong> Umbrella (highly recommended for shade), water bottle, small backpack</li>
                <li><strong>Electronics:</strong> Phone charger, power bank, universal adapter</li>
                <li><strong>Important:</strong> Small Quran, dua book, prayer rug (optional)</li>
              </ul>
            </div>

            <div class="tip-category">
              <h3>During Hajj/Umrah</h3>
              <ul>
                <li><strong>Hydration:</strong> Drink Zamzam water and stay hydrated, especially in heat</li>
                <li><strong>Pace Yourself:</strong> Don't rush; the rituals can be performed calmly</li>
                <li><strong>Group Safety:</strong> Stay with your group and have a meeting point</li>
                <li><strong>Patience:</strong> Expect crowds and delays; maintain good character</li>
                <li><strong>Focus:</strong> Remember your intention - this is worship, not tourism</li>
                <li><strong>Rest:</strong> Sleep when possible; the schedule is demanding</li>
                <li><strong>Food:</strong> Eat light, nutritious meals; avoid heavy foods</li>
              </ul>
            </div>

            <div class="tip-category">
              <h3>Important Reminders</h3>
              <ul>
                <li><strong>Women's Health:</strong> If menstruation begins, continue all rites except Tawaf and Sa'i</li>
                <li><strong>Lost Items:</strong> Report immediately to authorities; keep valuables secure</li>
                <li><strong>Emergency:</strong> Save emergency numbers: 997 (Hajj hotline), 999 (police), 997 (ambulance)</li>
                <li><strong>Respect:</strong> Be mindful of other pilgrims; help the elderly and weak</li>
                <li><strong>Photography:</strong> Avoid taking photos of others without permission, especially during prayer</li>
              </ul>
            </div>
          </div>
          
          <div class="image-content">
            <img 
              src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Travel preparation and packing"
              loading="lazy"
            >
            <div class="image-caption">Proper preparation ensures a focused and peaceful pilgrimage</div>
          </div>
        </div>

        <div class="section-download">
          <a :href="pdfs.packingChecklist" download class="download-btn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            <span>Download Packing Checklist (PDF)</span>
          </a>
        </div>
      </div>

      <!-- Closing -->
      <div class="closing">
        <div class="closing-arabic">رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ</div>
        <p class="closing-en">"Our Lord, accept [this] from us. Indeed, You are the Hearing, the Knowing."</p>
        <span class="closing-ref">Surah Al-Baqarah 2:127</span>
        <p class="closing-msg">May Allah accept your pilgrimage, forgive your sins, and grant you a Hajj Mabroor (accepted pilgrimage). Ameen.</p>
        
        <div class="final-downloads">
          <a :href="pdfs.completeGuide" download class="download-all">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            <span>Download Complete Hajj & Umrah Guide (Full PDF)</span>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// PDF Links - Replace with your actual PDF URLs
const pdfs = {
  completeGuide: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  basicsGuide: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  umrahGuide: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  hajjGuide: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  ihramRules: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  duasCollection: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  packingChecklist: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
};

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Animation on scroll
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
});
</script>

<style scoped>
/* === VARIABLES === */
.pg {
  --green: #0f5132;
  --green-light: #e8f5ef;
  --green-mid: #2d8f63;
  --green-dark: #0a3022;
  --gold: #c5a059;
  --cream: #f8f6f2;
  --cream-dark: #f0ede6;
  --text: #1c2b24;
  --text-muted: #5a7a68;
  --text-hint: #8aaa96;
  --shadow-sm: 0 2px 8px rgba(15, 81, 50, 0.08);
  --shadow-md: 0 4px 16px rgba(15, 81, 50, 0.12);
  --shadow-lg: 0 8px 32px rgba(15, 81, 50, 0.18);
  
  font-family: 'Georgia', var(--font-serif, serif);
  background: linear-gradient(180deg, var(--cream) 0%, var(--cream-dark) 100%);
  color: var(--text);
  width: 100%;
  box-sizing: border-box;
  font-size: 17px;
  line-height: 1.7;
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* === ANIMATIONS === */
.fade-in-section {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.fade-in-section.visible {
  opacity: 1;
  transform: none;
}

/* === SIMPLIFIED HERO === */
.hero {
  padding: 5rem 2rem 4rem;
  text-align: center;
  background: linear-gradient(135deg, var(--green-light) 0%, var(--green) 100%);
  border-radius: 0 0 24px 24px;
  margin-bottom: 3rem;
  box-shadow: var(--shadow-lg);
}

.bismillah {
  font-size: 28px;
  color: var(--green-dark);
  margin-bottom: 1.5rem;
  display: block;
  font-family: 'Georgia', serif;
}

.hero-title {
  font-size: 48px;
  font-weight: 400;
  color: var(--green-dark);
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
  font-style: italic;
}

.hero-subtitle {
  font-size: 19px;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
  font-family: system-ui, sans-serif;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 16px 32px;
  background: var(--green);
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  background: var(--green-dark);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: #fff;
  color: var(--green);
  border: 2px solid var(--green);
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}
.btn-secondary:hover {
  background: var(--green-light);
  transform: translateY(-2px);
}

/* === CONTENT GRID (TEXT LEFT, IMAGE RIGHT) === */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;
  align-items: start;
  margin-bottom: 3rem;
}

.text-content {
  max-width: 100%;
}

.image-content {
  position: sticky;
  top: 2rem;
}

.image-content img {
  width: 100%;
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
  display: block;
}

.image-caption {
  text-align: center;
  font-size: 14px;
  color: var(--text-hint);
  margin-top: 0.75rem;
  font-style: italic;
  font-family: system-ui, sans-serif;
}

/* === TYPOGRAPHY === */
.eyebrow {
  font-size: 13px;
  letter-spacing: 0.15em;
  color: var(--green);
  text-transform: uppercase;
  font-family: system-ui, sans-serif;
  display: block;
  margin-bottom: 1rem;
  font-weight: 700;
}

.sec-title {
  font-size: 36px;
  font-weight: 400;
  color: var(--text);
  font-style: italic;
  font-family: 'Georgia', serif;
  margin-bottom: 1.5rem;
}

.lead-text {
  font-size: 19px;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  font-family: system-ui, sans-serif;
}

.content-block {
  margin-bottom: 2.5rem;
}

.content-block h3 {
  font-size: 24px;
  color: var(--green-dark);
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
  font-style: italic;
}

.content-block p {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.key-differences {
  background: var(--green-light);
  padding: 2rem;
  border-radius: 12px;
  margin-top: 2rem;
}

.key-differences h4 {
  font-size: 20px;
  color: var(--green-dark);
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
}

.key-differences ul {
  list-style: none;
  padding: 0;
}

.key-differences li {
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(15, 81, 50, 0.1);
  color: var(--text-muted);
  line-height: 1.6;
}

.key-differences li:last-child {
  border-bottom: none;
}

.key-differences strong {
  color: var(--green);
}

/* === STEP CARDS === */
.step-card {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--border);
}

.step-number {
  font-size: 48px;
  font-weight: 700;
  color: var(--green);
  opacity: 0.2;
  line-height: 1;
  flex-shrink: 0;
}

.step-content h3 {
  font-size: 22px;
  color: var(--green-dark);
  margin-bottom: 0.75rem;
  font-family: 'Georgia', serif;
}

.step-content p {
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 0.75rem;
}

.important-note {
  background: var(--green-light);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid var(--green);
  margin-top: 1rem;
}

/* === DAY CARDS === */
.day-card-detailed {
  background: var(--cream);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--green-light);
}

.day-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--green);
  opacity: 0.3;
}

.day-date {
  font-size: 16px;
  font-weight: 600;
  color: var(--green-dark);
  font-family: system-ui, sans-serif;
}

.day-body p {
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.day-body strong {
  color: var(--green);
}

/* === RULES SECTIONS === */
.rules-section, .permitted-section, .fidya-section {
  margin-bottom: 2.5rem;
}

.rules-section h3, .permitted-section h3, .fidya-section h3 {
  font-size: 24px;
  color: var(--green-dark);
  margin-bottom: 1.5rem;
  font-family: 'Georgia', serif;
}

.rule-category {
  margin-bottom: 2rem;
}

.rule-category h4 {
  font-size: 18px;
  color: var(--green);
  margin-bottom: 1rem;
  font-family: system-ui, sans-serif;
  font-weight: 600;
}

.rule-category ul {
  list-style: none;
  padding: 0;
}

.rule-category li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: var(--text-muted);
  line-height: 1.6;
}

.rule-category li:before {
  content: "•";
  color: var(--green);
  position: absolute;
  left: 0;
  font-weight: bold;
}

.permitted-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.permitted-list li {
  padding: 0.75rem 1rem;
  background: var(--green-light);
  border-radius: 8px;
  color: var(--green-dark);
  font-size: 15px;
}

.fidya-section ul {
  list-style: none;
  padding: 0;
}

.fidya-section li {
  padding: 1rem;
  background: #fff8f8;
  border-left: 4px solid #b84a2e;
  margin-bottom: 1rem;
  border-radius: 0 8px 8px 0;
  color: var(--text-muted);
  line-height: 1.6;
}

/* === DUA CARDS === */
.dua-card {
  background: var(--cream);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
}

.dua-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--green-light);
}

.dua-label {
  font-size: 20px;
  font-weight: 600;
  color: var(--green-dark);
  font-family: 'Georgia', serif;
}

.dua-when {
  font-size: 13px;
  color: var(--text-hint);
  font-family: system-ui, sans-serif;
  font-style: italic;
}

.dua-arabic {
  font-size: 26px;
  text-align: right;
  color: var(--green-dark);
  margin-bottom: 1rem;
  line-height: 2;
  font-family: 'Traditional Arabic', 'Arial', serif;
  direction: rtl;
}

.dua-transliteration {
  font-size: 15px;
  color: var(--text-muted);
  font-style: italic;
  margin-bottom: 0.75rem;
  font-family: system-ui, sans-serif;
}

.dua-translation {
  font-size: 16px;
  color: var(--text);
  line-height: 1.6;
  font-family: system-ui, sans-serif;
}

/* === TIP CATEGORIES === */
.tip-category {
  margin-bottom: 2.5rem;
}

.tip-category h3 {
  font-size: 22px;
  color: var(--green-dark);
  margin-bottom: 1.25rem;
  font-family: 'Georgia', serif;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--green-light);
}

.tip-category ul {
  list-style: none;
  padding: 0;
}

.tip-category li {
  padding: 0.75rem 0;
  color: var(--text-muted);
  line-height: 1.6;
  border-bottom: 1px solid rgba(15, 81, 50, 0.05);
}

.tip-category li:last-child {
  border-bottom: none;
}

.tip-category strong {
  color: var(--green);
}

/* === SECTIONS === */
.sec {
  padding: 5rem 0;
  border-bottom: 1px solid rgba(15, 81, 50, 0.06);
}

.sec.alt {
  background: transparent;
}

/* === PDF DOWNLOAD BUTTONS === */
.section-download {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px dashed rgba(15, 81, 50, 0.15);
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: var(--green);
  color: #fff;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
  border: none;
  cursor: pointer;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  background: var(--green-dark);
}

.download-btn svg {
  width: 20px;
  height: 20px;
}

/* === CLOSING === */
.closing {
  padding: 5rem 2rem;
  text-align: center;
  background: linear-gradient(180deg, var(--green-light) 0%, var(--cream) 100%);
  border-radius: 0 0 24px 24px;
  margin-top: 3rem;
}

.closing-arabic {
  font-family: 'Traditional Arabic', 'Georgia', serif;
  font-size: 36px;
  color: var(--green-dark);
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.closing-en {
  font-size: 19px;
  color: var(--text-muted);
  font-style: italic;
  font-family: 'Georgia', serif;
  margin-bottom: 1rem;
}

.closing-ref {
  font-size: 13px;
  color: var(--green);
  letter-spacing: 0.06em;
  font-family: system-ui, sans-serif;
  display: block;
  text-transform: uppercase;
  margin-bottom: 2rem;
  font-weight: 600;
}

.closing-msg {
  font-size: 17px;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.8;
  font-family: system-ui, sans-serif;
}

.final-downloads {
  margin-top: 2rem;
}

.download-all {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 36px;
  background: var(--green);
  color: #fff;
  border-radius: 50px;
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-lg);
}

.download-all:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(15, 81, 50, 0.3);
  background: var(--green-dark);
}

/* === RESPONSIVE === */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .image-content {
    position: relative;
    top: 0;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .hero-title {
    font-size: 40px;
  }
}

@media (max-width: 768px) {
  .main-container {
    padding: 0 1.5rem;
  }
  
  .hero {
    padding: 4rem 1.5rem 3rem;
  }
  
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 17px;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary, .btn-secondary {
    width: 100%;
    max-width: 320px;
    justify-content: center;
  }
  
  .sec-title {
    font-size: 28px;
  }
  
  .permitted-list {
    grid-template-columns: 1fr;
  }
  
  .step-card {
    flex-direction: column;
    gap: 1rem;
  }
  
  .step-number {
    font-size: 36px;
  }
  
  .dua-arabic {
    font-size: 22px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 28px;
  }
  
  .sec-title {
    font-size: 26px;
  }
  
  .day-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .day-number {
    font-size: 24px;
  }
}
</style>