<template>
  <div class="pg">
    <div class="main-container">
      <header class="hero fade-in-section">
        <div class="hero-copy">
          <p class="hero-arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <span class="hero-kicker">Hajj & Umrah Guide</span>
          <h1 class="hero-title">A cleaner, sourced guide for Hajj and Umrah.</h1>
          <p class="hero-subtitle">
            This page focuses on the core rites, common mistakes, official health guidance, and a more careful
            reference trail. Primary texts and official Saudi resources remain the standard, while short videos
            are treated as supplementary refreshers only.
          </p>

          <div class="hero-actions">
            <button class="btn-primary" @click="scrollToSection('guides')">Download real guides</button>
            <button class="btn-secondary" @click="scrollToSection('umrah')">Review the rites</button>
          </div>

          <div class="hero-trust">
            <div class="trust-item">
              <strong>Primary texts</strong>
              <span>Qur'an and hadith references shown inside the page.</span>
            </div>
            <div class="trust-item">
              <strong>Official travel guidance</strong>
              <span>Nusuk and Saudi MOH sources included below.</span>
            </div>
            <div class="trust-item">
              <strong>Cleaner presentation</strong>
              <span>Less noise, more whitespace, fewer distracting links.</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <img :src="heroImage.src" :alt="heroImage.alt" loading="lazy">
          <div class="hero-image-overlay"></div>
        </div>
      </header>

      <section class="sec fade-in-section" id="guides">
        <div class="sec-hd sec-hd-center">
          <span class="eyebrow">Downloads</span>
          <h2 class="sec-title">Real PDF guides</h2>
          <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
          <p class="sec-desc">
            These buttons now point to actual guides and official health documents instead of dummy files.
          </p>
        </div>

        <div class="pdf-grid">
          <article v-for="guide in pdfGuides" :key="guide.url" class="pdf-card hover-lift">
            <span class="pdf-label">{{ guide.label }}</span>
            <h3>{{ guide.title }}</h3>
            <p>{{ guide.desc }}</p>
            <button class="download-btn" @click="downloadPdf(guide)">
              Download PDF
            </button>
          </article>
        </div>
      </section>

      <section class="sec alt fade-in-section" id="basics">
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">Chapter I</span>
            <h2 class="sec-title">Foundations before the journey</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">
              Learn the obligation, the categories of Hajj, and the difference between foundational rulings and
              personal cases that still require a scholar.
            </p>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.basics.src" :alt="sectionImages.basics.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ sectionImages.basics.credit }}</div>
          </div>
        </div>

        <div class="cards-grid">
          <article v-for="card in basicsCards" :key="card.num" class="card hover-lift">
            <span class="card-num">{{ card.num }}</span>
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
            <div class="card-note">{{ card.note }}</div>
          </article>
        </div>

        <div class="types-grid">
          <article v-for="type in hajjTypes" :key="type.title" class="type-card hover-lift">
            <h3>{{ type.title }}</h3>
            <p>{{ type.desc }}</p>
            <div class="type-note">{{ type.note }}</div>
          </article>
        </div>

        <div class="reference-panel">
          <h4>Key references</h4>
          <div class="reference-list">
            <div v-for="item in sectionReferences.basics" :key="item.title" class="reference-item">
              <strong>{{ item.title }}</strong>
              <span>{{ item.url }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="sec fade-in-section" id="umrah">
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">Chapter II</span>
            <h2 class="sec-title">Umrah step by step</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">
              The Umrah sequence is short, but mistakes usually happen through haste, crowd pressure, or
              uncertainty at the miqat and during tawaf.
            </p>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.umrah.src" :alt="sectionImages.umrah.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ sectionImages.umrah.credit }}</div>
          </div>
        </div>

        <div class="tl">
          <article v-for="(step, index) in umrahSteps" :key="step.num" class="tl-item">
            <div class="tl-left">
              <div class="tl-num">{{ step.num }}</div>
              <div v-if="index !== umrahSteps.length - 1" class="tl-line"></div>
            </div>
            <div class="tl-body">
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
              <div class="tl-tip">{{ step.tip }}</div>
              <div class="tl-ref">{{ step.ref }}</div>
            </div>
          </article>
        </div>

        <div class="conclusion">
          <h4>After Umrah</h4>
          <p>
            When the hair is trimmed or shaved, Ihram ends. For Tamattu', the pilgrim remains out of Ihram
            until entering Ihram again for Hajj on the 8th of Dhul-Hijjah.
          </p>
        </div>

        <div class="reference-panel">
          <h4>Key references</h4>
          <div class="reference-list">
            <div v-for="item in sectionReferences.umrah" :key="item.title" class="reference-item">
              <strong>{{ item.title }}</strong>
              <span>{{ item.url }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="sec alt fade-in-section" id="hajj">
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">Chapter III</span>
            <h2 class="sec-title">The major days of Hajj</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">
              The order of the days matters, but the greatest misunderstanding is forgetting that Arafah is the
              center of the pilgrimage.
            </p>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.hajj.src" :alt="sectionImages.hajj.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ sectionImages.hajj.credit }}</div>
          </div>
        </div>

        <div class="days-grid">
          <article v-for="day in hajjDays" :key="day.date" class="day-card hover-lift">
            <div class="day-head">
              <span class="day-date">{{ day.date }}</span>
              <h3>{{ day.title }}</h3>
            </div>
            <div class="day-body">
              <p>{{ day.desc }}</p>
              <div class="day-reminder">{{ day.reminder }}</div>
              <div class="day-ref">{{ day.ref }}</div>
            </div>
          </article>
        </div>

        <div class="farewell">
          <div class="farewell-arabic">طواف الوداع</div>
          <h4>Farewell Tawaf</h4>
          <p>
            Before leaving Makkah, the pilgrim makes a final tawaf unless exempted by a recognized reason such
            as menstruation. Keep the ending dignified and avoid turning it into a rushed photo stop.
          </p>
          <cite>Reference: Sahih Muslim 1327</cite>
        </div>

        <div class="reference-panel">
          <h4>Key references</h4>
          <div class="reference-list">
            <div v-for="item in sectionReferences.hajj" :key="item.title" class="reference-item">
              <strong>{{ item.title }}</strong>
              <span>{{ item.url }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="sec fade-in-section" id="mistakes">
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">Chapter IV</span>
            <h2 class="sec-title">Common mistakes to avoid</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">
              These are recurring problems that do not come from lack of sincerity, but from poor preparation,
              pressure, and imitation without knowledge.
            </p>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.mistakes.src" :alt="sectionImages.mistakes.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ sectionImages.mistakes.credit }}</div>
          </div>
        </div>

        <div class="cards-grid">
          <article v-for="item in commonMistakes" :key="item.title" class="card hover-lift">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="card-note">{{ item.note }}</div>
          </article>
        </div>

        <div class="reference-panel">
          <h4>Key references</h4>
          <div class="reference-list">
            <div v-for="item in sectionReferences.mistakes" :key="item.title" class="reference-item">
              <strong>{{ item.title }}</strong>
              <span>{{ item.url }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="sec alt fade-in-section" id="health">
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">Chapter V</span>
            <h2 class="sec-title">Health, safety, and readiness</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">
              Physical ability and official health requirements are part of real-world Hajj preparation, not an
              afterthought. Recheck them close to travel because they can change.
            </p>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.health.src" :alt="sectionImages.health.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ sectionImages.health.credit }}</div>
          </div>
        </div>

        <div class="rules-grid">
          <article v-for="group in healthReadiness" :key="group.title" class="rules-card">
            <div class="rules-hdr pos">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 3 7v5c0 5.1 3.4 9.8 9 11 5.6-1.2 9-5.9 9-11V7zm-1 14-4-4 1.4-1.4 2.6 2.6 5.6-5.6L18 9z"/></svg>
              {{ group.title }}
            </div>
            <ul class="rules-list">
              <li v-for="item in group.items" :key="item">
                <span class="dot-y">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
                </span>
                {{ item }}
              </li>
            </ul>
          </article>
        </div>

        <div class="section-note">
          Official vaccination rules, seasonal public-health measures, and entry conditions must be checked
          against the Saudi Ministry of Health and Nusuk near departure.
        </div>

        <div class="reference-panel">
          <h4>Key references</h4>
          <div class="reference-list">
            <div v-for="item in sectionReferences.health" :key="item.title" class="reference-item">
              <strong>{{ item.title }}</strong>
              <span>{{ item.url }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="sec fade-in-section" id="rules">
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">Chapter VI</span>
            <h2 class="sec-title">Ihram rules and etiquette</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">
              Know the difference between what remains permitted, what is prohibited, and what should be taken
              to a scholar when an error happens.
            </p>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.rules.src" :alt="sectionImages.rules.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ sectionImages.rules.credit }}</div>
          </div>
        </div>

        <div class="rules-grid">
          <article class="rules-card">
            <div class="rules-hdr pos">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
              Permissible acts
            </div>
            <ul class="rules-list">
              <li v-for="item in rules.permissible" :key="item">
                <span class="dot-y">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
                </span>
                {{ item }}
              </li>
            </ul>
          </article>

          <article class="rules-card">
            <div class="rules-hdr neg">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="m19 6.41-1.41-1.41L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              Prohibited acts
            </div>
            <ul class="rules-list">
              <li v-for="item in rules.prohibited" :key="item">
                <span class="dot-n">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="m19 6.41-1.41-1.41L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </span>
                {{ item }}
              </li>
            </ul>
          </article>
        </div>

        <div class="section-note">
          If an error happened because of illness, forgetfulness, or necessity, do not improvise the ruling.
          Ask a qualified scholar about validity, fidyah, and what must be repeated.
        </div>

        <div class="reference-panel">
          <h4>Key references</h4>
          <div class="reference-list">
            <div v-for="item in sectionReferences.rules" :key="item.title" class="reference-item">
              <strong>{{ item.title }}</strong>
              <span>{{ item.url }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="sec alt fade-in-section" id="spiritual">
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">Chapter VII</span>
            <h2 class="sec-title">Spiritual preparation</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">
              The outward rites are stronger when repentance, humility, patience, and learning have already
              started before travel.
            </p>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.spiritual.src" :alt="sectionImages.spiritual.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ sectionImages.spiritual.credit }}</div>
          </div>
        </div>

        <div class="cards-grid">
          <article v-for="item in spiritualPrep" :key="item.step" class="card hover-lift">
            <span class="card-num">Step {{ item.step }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="card-note">{{ item.ref }}</div>
          </article>
        </div>

        <div class="reference-panel">
          <h4>Key references</h4>
          <div class="reference-list">
            <div v-for="item in sectionReferences.spiritual" :key="item.title" class="reference-item">
              <strong>{{ item.title }}</strong>
              <span>{{ item.url }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="sec fade-in-section" id="shorts">
        <div class="sec-hd sec-hd-center">
          <span class="eyebrow">Supplementary Media</span>
          <h2 class="sec-title">Short visual refreshers</h2>
          <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
          <p class="sec-desc">
            These short videos are supplementary visual refreshers only. They are not the standard for legal
            rulings. Keep the Qur'an, hadith, and the PDF guides below above any short clip.
          </p>
        </div>

        <div class="shorts-grid">
          <article v-for="video in shorts" :key="video.id" class="short-card">
            <div class="short-frame">
              <iframe
                :src="`https://www.youtube-nocookie.com/embed/${video.id}`"
                :title="video.title"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div class="short-copy">
              <span class="resource-label">{{ video.channel }}</span>
              <h3>{{ video.title }}</h3>
              <p>{{ video.note }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="sec alt fade-in-section" id="resources">
        <div class="sec-hd sec-hd-center">
          <span class="eyebrow">Chapter VIII</span>
          <h2 class="sec-title">Key references and official resources</h2>
          <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
          <p class="sec-desc">
            These are intentionally displayed as non-clickable reference blocks, so the page behaves more like a
            study guide than a link directory. The PDF buttons above remain downloadable.
          </p>
        </div>

        <div class="resource-grid">
          <article v-for="resource in resources" :key="resource.title" class="resource-card hover-lift">
            <span class="resource-label">{{ resource.label }}</span>
            <h3>{{ resource.title }}</h3>
            <p>{{ resource.desc }}</p>
            <div class="resource-url">{{ resource.url }}</div>
          </article>
        </div>

        <div class="faq-wrap">
          <h4>Common questions</h4>
          <div v-for="(faq, index) in faqs" :key="faq.q" class="faq-item" :class="{ open: activeFaq === index }">
            <button class="faq-q" @click="toggleFaq(index)">
              <span>{{ faq.q }}</span>
              <svg viewBox="0 0 24 24"><path d="m7 10 5 5 5-5z"/></svg>
            </button>
            <div class="faq-a">
              <p>{{ faq.a }}</p>
              <div class="faq-ref">{{ faq.ref }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="sec fade-in-section" id="post-hajj">
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">Closing</span>
            <h2 class="sec-title">Returning home with acceptance in mind</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">
              The journey is not measured by photographs or stories, but by repentance, steadier prayer, better
              conduct, and a sincere hope that Allah accepted it.
            </p>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.postHajj.src" :alt="sectionImages.postHajj.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ sectionImages.postHajj.credit }}</div>
          </div>
        </div>

        <div class="tl">
          <article v-for="(step, index) in postHajjSteps" :key="step.num" class="tl-item">
            <div class="tl-left">
              <div class="tl-num">{{ step.num }}</div>
              <div v-if="index !== postHajjSteps.length - 1" class="tl-line"></div>
            </div>
            <div class="tl-body">
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
              <div class="tl-tip">{{ step.tip }}</div>
              <div class="tl-ref">{{ step.ref }}</div>
            </div>
          </article>
        </div>
      </section>

      <div class="disclaimer-section fade-in-section">
        <div class="disclaimer-box">
          <h4>Scope of this page</h4>
          <p class="ref-text">
            This guide aims to stay close to primary texts, established instructional guides, and official Saudi
            health and logistics sources. It does not replace a scholar for illness, menstruation, fidyah,
            missed rites, disputes between madhhabs, or complicated travel restrictions.
          </p>
          <ul class="ref-list">
            <li>Qur'anic anchors used here: 3:97, 2:158, 2:196, 2:203, 2:127.</li>
            <li>Hadith anchors used here: Bukhari 1524, Ibn Majah 3015, Muslim 1327, Nasa'i 3062, Nasa'i 2622.</li>
            <li>Official operational guidance used here: Nusuk and Saudi Ministry of Health documents current for 1447H / 2026.</li>
          </ul>
        </div>

        <div class="warning-box">
          <div class="warning-icon">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm11-3h-1v-1h1zm0-3h-1v-4h1z"/></svg>
          </div>
          <div class="warning-content">
            <h4>Important note</h4>
            <p>
              “Scholarly approved” in practice still means verifying your personal case with a qualified scholar.
              This page gives the mainstream structure and source trail, not a personalized fatwa.
            </p>
          </div>
        </div>
      </div>

      <div class="closing fade-in-section">
        <div class="closing-arabic">رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ</div>
        <div class="closing-div"><span class="sec-ornament-dot"></span></div>
        <p class="closing-en">Our Lord, accept this from us. You are the All-Hearing, the All-Knowing.</p>
        <span class="closing-ref">Qur'an 2:127</span>
        <p class="closing-msg">
          May Allah grant every pilgrim a sound journey, a valid pilgrimage, and a return marked by humility,
          gratitude, and firmer obedience.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const heroImage = {
  src: 'https://images.pexels.com/photos/28209449/pexels-photo-28209449.jpeg?cs=srgb&dl=pexels-neo-evenger-1772575973-28209449.jpg&fm=jpg',
  alt: 'Pilgrims in prayer near the sacred sanctuary'
};

const sectionImages = {
  basics: {
    src: 'https://images.pexels.com/photos/28209449/pexels-photo-28209449.jpeg?cs=srgb&dl=pexels-neo-evenger-1772575973-28209449.jpg&fm=jpg',
    alt: 'Pilgrims gathered for worship near the Grand Mosque',
    credit: 'Image source: Pexels'
  },
  umrah: {
    src: 'https://images.pexels.com/photos/13459175/pexels-photo-13459175.jpeg?cs=srgb&dl=pexels-busrasahjn-13459175.jpg&fm=jpg',
    alt: 'Mosque and courtyard scene suited to worship and reflection',
    credit: 'Image source: Pexels'
  },
  hajj: {
    src: 'https://images.pexels.com/photos/12662176/pexels-photo-12662176.jpeg?cs=srgb&dl=pexels-muhammad-abdullah-2002371-12662176.jpg&fm=jpg',
    alt: 'Large gathering of worshippers in congregational prayer',
    credit: 'Image source: Pexels'
  },
  mistakes: {
    src: 'https://images.pexels.com/photos/19657349/pexels-photo-19657349.jpeg?cs=srgb&dl=pexels-bilalfurkankosar-19657349.jpg&fm=jpg',
    alt: 'Worshippers praying inside a mosque',
    credit: 'Image source: Pexels'
  },
  health: {
    src: 'https://images.pexels.com/photos/28209449/pexels-photo-28209449.jpeg?cs=srgb&dl=pexels-neo-evenger-1772575973-28209449.jpg&fm=jpg',
    alt: 'Pilgrims resting and moving carefully in a sacred setting',
    credit: 'Image source: Pexels'
  },
  rules: {
    src: 'https://images.pexels.com/photos/13459175/pexels-photo-13459175.jpeg?cs=srgb&dl=pexels-busrasahjn-13459175.jpg&fm=jpg',
    alt: 'Mosque architecture and calm prayer environment',
    credit: 'Image source: Pexels'
  },
  spiritual: {
    src: 'https://images.pexels.com/photos/19657349/pexels-photo-19657349.jpeg?cs=srgb&dl=pexels-bilalfurkankosar-19657349.jpg&fm=jpg',
    alt: 'Interior mosque scene suitable to reflection and worship',
    credit: 'Image source: Pexels'
  },
  postHajj: {
    src: 'https://images.pexels.com/photos/12662176/pexels-photo-12662176.jpeg?cs=srgb&dl=pexels-muhammad-abdullah-2002371-12662176.jpg&fm=jpg',
    alt: 'Congregational prayer after a gathering of worshippers',
    credit: 'Image source: Pexels'
  }
};

const pdfGuides = [
  {
    label: 'Scholarly guide',
    title: 'Hajj and Umrah step by step',
    desc: 'A practical rites guide hosted by IslamHouse.',
    url: 'https://d1.islamhouse.com/data/en/ih_books/single2/en-hajj-umrah.pdf',
    filename: 'hajj-umrah-step-by-step.pdf'
  },
  {
    label: 'Detailed manual',
    title: "How to perform the rituals of Hajj, Umrah and visiting the Prophet's Masjid",
    desc: 'A longer instructional manual hosted by IslamHouse.',
    url: 'https://d1.islamhouse.com/data/en/ih_books/single/en-dalil-98.pdf',
    filename: 'rituals-of-hajj-umrah-and-visiting-the-prophets-masjid.pdf'
  },
  {
    label: 'Official health PDF',
    title: 'Saudi Hajj health requirements 1447H / 2026',
    desc: 'Official Ministry of Health requirements and recommendations.',
    url: 'https://www.moh.gov.sa/HealthAwareness/Pilgrims-Health/Documents/Hajj-Health-Requirements-English-language.pdf',
    filename: 'saudi-hajj-health-requirements-1447H-2026.pdf'
  },
  {
    label: 'Official health guide',
    title: 'General guide for health of Hajj and Umrah pilgrims',
    desc: 'A practical English health guide from the Saudi Ministry of Health.',
    url: 'https://www.moh.gov.sa/HealthAwareness/Pilgrims-Health/Documents/English.pdf',
    filename: 'general-guide-for-health-of-hajj-and-umrah-pilgrims.pdf'
  }
];

const basicsCards = [
  {
    num: '01',
    title: 'Hajj is obligatory for the one who is able',
    desc: 'The obligation is tied to ability: physical capacity, financial capacity, and a workable route to the pilgrimage.',
    note: "Reference: Qur'an 3:97."
  },
  {
    num: '02',
    title: 'Umrah is not casual travel',
    desc: "The Qur'an joins Hajj and Umrah in one verse, and the jurists discuss its exact legal weight. In any case, it is a legislated act of worship, not tourism.",
    note: "Reference: Qur'an 2:196."
  },
  {
    num: '03',
    title: 'Accepted Hajj brings immense reward',
    desc: 'The Prophet taught that an accepted Hajj has no reward except Paradise, and one Umrah to the next expiates what came between them.',
    note: "Reference: Sunan an-Nasa'i 2622."
  },
  {
    num: '04',
    title: 'Learning the rites is part of the rite',
    desc: 'A pilgrim should not rely on crowd movement alone. Study before travel and ask when the issue affects validity or fidyah.',
    note: "Reference: Sunan an-Nasa'i 3062."
  }
];

const hajjTypes = [
  {
    title: "Tamattu'",
    desc: "Perform Umrah in the months of Hajj, leave Ihram, then re-enter Ihram for Hajj on the 8th of Dhul-Hijjah.",
    note: 'Often the clearest path for many first-time pilgrims.'
  },
  {
    title: 'Qiran',
    desc: 'Enter Ihram for Umrah and Hajj together and remain in Ihram until the major rites are completed.',
    note: 'Useful in some travel plans, but it keeps the pilgrim in Ihram longer.'
  },
  {
    title: 'Ifrad',
    desc: 'Enter Ihram for Hajj alone without combining Umrah into the same Ihram.',
    note: 'The practical choice depends on circumstances, group planning, and fiqh guidance.'
  }
];

const umrahSteps = [
  {
    num: '01',
    title: 'Enter Ihram at the miqat',
    desc: 'Make intention and begin Talbiyah at or before the appointed miqat. Do not cross the miqat casually and plan to fix it later.',
    tip: 'Prepare clothing and intention before reaching the boundary if you are flying or moving with a group.',
    ref: 'Reference: Sahih al-Bukhari 1524.'
  },
  {
    num: '02',
    title: 'Perform Tawaf with calmness',
    desc: 'Circle the Kaaba seven times, beginning from the Black Stone area. The purpose is worship, not speed or crowd aggression.',
    tip: 'If reaching the Black Stone is difficult, pointing from a distance is enough. Do not harm others.',
    ref: "Reference: General Prophetic rite sequence and the instruction to learn the rituals in Sunan an-Nasa'i 3062."
  },
  {
    num: '03',
    title: "Complete Sa'i between Safa and Marwah",
    desc: "Walk the required lengths between Safa and Marwah. The Qur'an names them among the symbols of Allah.",
    tip: 'Keep your dua and dhikr steady even when the space is crowded.',
    ref: "Reference: Qur'an 2:158."
  },
  {
    num: '04',
    title: 'Trim or shave the hair',
    desc: 'Men shave or shorten the hair; women cut a small amount from the ends. This ends the state of Ihram for Umrah.',
    tip: 'Do not leave this until confusion sets in. It is the closing act of the Umrah.',
    ref: 'Reference: Established Prophetic practice in the rites.'
  }
];

const hajjDays = [
  {
    date: '8 Dhul-Hijjah',
    title: 'Mina',
    desc: "Pilgrims go to Mina and spend the day and night there in prayer and preparation. Tamattu' pilgrims enter Ihram for Hajj on this day.",
    reminder: 'Use the day to settle your mind before Arafah.',
    ref: 'Reference: The Farewell Pilgrimage sequence in the hadith corpus.'
  },
  {
    date: '9 Dhul-Hijjah',
    title: 'Arafah',
    desc: 'Standing at Arafah is the central pillar of Hajj. The pilgrim remains within the boundaries of Arafah until sunset in repentance and supplication.',
    reminder: 'Missing Arafah is not a small mistake. It is the defining station of Hajj.',
    ref: "Reference: 'Hajj is Arafah' in Sunan Ibn Majah 3015."
  },
  {
    date: 'Night of 10 Dhul-Hijjah',
    title: 'Muzdalifah',
    desc: 'After sunset, pilgrims move to Muzdalifah, combine Maghrib and Isha there, rest, and prepare for the next day.',
    reminder: 'Stay with your group safely and keep movement orderly.',
    ref: 'Reference: The Farewell Pilgrimage sequence in the hadith corpus.'
  },
  {
    date: '10 Dhul-Hijjah',
    title: 'Stoning, sacrifice, shaving, and Tawaf al-Ifadah',
    desc: 'Pilgrims stone Jamrat al-Aqabah, arrange sacrifice where due, shave or trim the hair, and perform Tawaf al-Ifadah, with Sa\'i where due.',
    reminder: 'Some ordering concessions exist in the Sunnah, but specific cases should still be checked carefully.',
    ref: "Reference: Qur'an 2:196 and the Prophetic rite sequence."
  },
  {
    date: '11 to 13 Dhul-Hijjah',
    title: 'Days of Tashriq',
    desc: 'The pilgrim stays in Mina and stones the three Jamarat on the appointed days while continuing remembrance of Allah.',
    reminder: "The Qur'an allows leaving after two days or staying for a third.",
    ref: "Reference: Qur'an 2:203."
  }
];

const commonMistakes = [
  {
    title: 'Crossing the miqat without entering Ihram',
    desc: 'This is one of the most common practical mistakes for travellers who are distracted, unprepared, or following a group loosely.',
    note: 'Fixing this can involve more than simply making intention later. Ask a scholar promptly.'
  },
  {
    title: 'Treating crowd pressure as permission to harm others',
    desc: 'The rites do not become more valid because they were done aggressively. Pushing and elbowing at the Black Stone area is not devotion.',
    note: 'Preserving worship and preserving people both matter.'
  },
  {
    title: 'Copying rituals without knowing what is essential',
    desc: 'Many pilgrims imitate others without knowing whether an act is a pillar, a duty, or a recommended Sunnah.',
    note: "Reference trail: use the guides and hadith anchors on this page instead of crowd imitation."
  },
  {
    title: 'Assuming every violation invalidates the pilgrimage',
    desc: 'Some mistakes require repentance, some require fidyah, and some affect validity more seriously than others. These are not all the same.',
    note: 'This is exactly where qualified scholarly advice becomes necessary.'
  }
];

const healthReadiness = [
  {
    title: 'Official readiness checks',
    items: [
      'Check current Saudi vaccination and public-health requirements close to departure.',
      'Review whether age, pregnancy, severe illness, or chronic conditions affect your ability to travel.',
      'Keep official booking, visa, and identification records organized before departure.'
    ]
  },
  {
    title: 'On-the-ground practical care',
    items: [
      'Hydrate consistently and avoid leaving basic fatigue or heat stress untreated.',
      'Use unscented hygiene items if you will be in Ihram.',
      'Carry only what you can realistically manage in crowds and long walks.',
      'If you are medically vulnerable, speak to your doctor and your scholar before travel.'
    ]
  }
];

const rules = {
  permissible: [
    'Using an umbrella, belt, bag, watch, glasses, and shade.',
    'Bathing and washing with unscented products when needed.',
    'Seeking medical care, rest, and crowd safety.',
    'Reciting Qur\'an, making dua, and helping fellow pilgrims.'
  ],
  prohibited: [
    'Applying perfume after entering Ihram.',
    'Cutting hair or trimming nails without a recognized excuse and ruling.',
    'Marital relations and conduct leading directly to them.',
    'For men: stitched regular clothing and covering the head.',
    'For women: treating the niqab and gloves as Ihram wear.',
    'Hunting land game while in the sacred state.'
  ]
};

const spiritualPrep = [
  {
    step: '01',
    title: 'Repair wrongs before travel',
    desc: 'Return what belongs to people, settle what you can, and ask forgiveness where you have harmed others.',
    ref: 'A sacred journey should not begin carelessly with neglected rights.'
  },
  {
    step: '02',
    title: 'Learn the rituals before the crowd teaches you badly',
    desc: 'Study the order, the common errors, and the places where you must stop and ask a scholar.',
    ref: "Reference: 'Learn your rituals from me' in Sunan an-Nasa'i 3062."
  },
  {
    step: '03',
    title: 'Train for patience',
    desc: 'Crowds, heat, waiting, and exhaustion are part of the test. The heart should prepare for restraint before the body arrives there.',
    ref: 'Accepted Hajj is tied to upright conduct, not just outward movement.'
  },
  {
    step: '04',
    title: 'Keep the intention simple',
    desc: 'Do not turn pilgrimage into a performance, travel trophy, or social showcase. Intend worship, repentance, and acceptance.',
    ref: "Reference: Qur'an 2:127 as a model dua for acceptance."
  }
];

const shorts = [
  {
    id: 'HfUhWfYsnsA',
    channel: 'Tajweed Online',
    title: 'Step by step guide on how to perform Umrah',
    note: 'Useful as a visual refresher for sequence. Check fiqh details against the PDF guides and textual references.'
  },
  {
    id: 'xIgK2ahrXL8',
    channel: 'Brief visual guide',
    title: 'How to perform Umrah step by step',
    note: 'Included as a short visual walkthrough, not as an independent legal authority.'
  },
  {
    id: 'T0SNUkkg9pw',
    channel: 'Aaj TV Official',
    title: 'Pilgrims gather in Arafat for the Day of Arafah',
    note: 'Useful for visual context around one of the central days of Hajj. Do not use it as a fiqh source.'
  }
];

const resources = [
  {
    label: 'Primary text',
    title: "Qur'an 3:97",
    desc: 'The foundational verse for the obligation of Hajj upon the one who is able.',
    url: 'https://quran.com/3/97'
  },
  {
    label: 'Primary text',
    title: "Qur'an 2:158, 2:196, 2:203",
    desc: 'Key verses for Sa\'i, completion of Hajj and Umrah, and the appointed days in Mina.',
    url: 'https://quran.com/2/158 • https://quran.com/2/196 • https://quran.com/2/203'
  },
  {
    label: 'Hadith',
    title: 'Bukhari 1524, Ibn Majah 3015, Muslim 1327, Nasa\'i 3062, Nasa\'i 2622',
    desc: 'Miqat, Arafah, farewell tawaf, learning the rites, and the reward of accepted Hajj.',
    url: 'https://sunnah.com/bukhari:1524 • https://sunnah.com/ibnmajah:3015 • https://sunnah.com/muslim:1327 • https://sunnah.com/nasai:3062 • https://sunnah.com/nasai:2622'
  },
  {
    label: 'Official planning',
    title: 'Nusuk and Nusuk Hajj',
    desc: 'Official Saudi planning and registration resources for Umrah and Hajj services.',
    url: 'https://www.nusuk.sa/en • https://hajj.nusuk.sa/?language=en'
  },
  {
    label: 'Official health',
    title: 'Saudi Ministry of Health pilgrim guidance',
    desc: 'Current health pages and official health documents for pilgrims.',
    url: 'https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/pages/default.aspx'
  }
];

const faqs = [
  {
    q: 'What if I miss standing at Arafah?',
    a: 'Standing at Arafah is central to Hajj. A pilgrim who misses it faces a serious validity issue and should seek immediate scholarly guidance about what follows.',
    ref: "Reference: 'Hajj is Arafah' in Sunan Ibn Majah 3015."
  },
  {
    q: 'Can I leave Mina after two days?',
    a: 'Yes. The Qur\'an allows departure after two days of the appointed days or staying longer without sin when done properly.',
    ref: "Reference: Qur'an 2:203."
  },
  {
    q: 'Are the short videos enough to learn the rites?',
    a: 'No. They can help you visualize the sequence, but they should not replace the Qur\'an, hadith, trusted scholars, and structured written guides.',
    ref: 'Use the short videos only as supplementary refreshers.'
  },
  {
    q: 'Where should I verify health and travel rules near departure?',
    a: 'Check Nusuk and the Saudi Ministry of Health close to your travel date. Do not rely on old screenshots or old group messages.',
    ref: 'Operational guidance can change from season to season.'
  }
];

const postHajjSteps = [
  {
    num: '01',
    title: 'Ask for acceptance, not praise',
    desc: 'The right response after worship is humility and dua that Allah accepted it.',
    tip: 'Keep the dua of acceptance on your tongue.',
    ref: "Reference: Qur'an 2:127."
  },
  {
    num: '02',
    title: 'Protect the obligations first',
    desc: 'The strongest sign of benefit is steadier prayer, better honesty, and more guarded speech when you return.',
    tip: 'Start with salah, family rights, and daily dhikr.',
    ref: 'Accepted Hajj should leave a trace in conduct.'
  },
  {
    num: '03',
    title: 'Carry the manners of pilgrimage home',
    desc: 'Patience, gentleness, and restraint in crowded sacred places should not disappear at the airport.',
    tip: 'Bring the softened character home, not just souvenirs and stories.',
    ref: "Reference: Sunan an-Nasa'i 2622 for the reward of accepted Hajj."
  }
];

const sectionReferences = {
  basics: [
    { title: "Qur'an 3:97", url: 'https://quran.com/3/97' },
    { title: "Qur'an 2:196", url: 'https://quran.com/2/196' },
    { title: "Sunan an-Nasa'i 2622", url: 'https://sunnah.com/nasai:2622' },
    { title: "Sunan an-Nasa'i 3062", url: 'https://sunnah.com/nasai:3062' }
  ],
  umrah: [
    { title: 'Sahih al-Bukhari 1524', url: 'https://sunnah.com/bukhari:1524' },
    { title: "Qur'an 2:158", url: 'https://quran.com/2/158' },
    { title: "Sunan an-Nasa'i 3062", url: 'https://sunnah.com/nasai:3062' }
  ],
  hajj: [
    { title: 'Sunan Ibn Majah 3015', url: 'https://sunnah.com/ibnmajah:3015' },
    { title: "Qur'an 2:196", url: 'https://quran.com/2/196' },
    { title: "Qur'an 2:203", url: 'https://quran.com/2/203' },
    { title: 'Sahih Muslim 1327', url: 'https://sunnah.com/muslim:1327' }
  ],
  mistakes: [
    { title: 'IslamHouse step-by-step guide', url: 'https://d1.islamhouse.com/data/en/ih_books/single2/en-hajj-umrah.pdf' },
    { title: "Sunan an-Nasa'i 3062", url: 'https://sunnah.com/nasai:3062' }
  ],
  health: [
    { title: 'Saudi MOH pilgrim health page', url: 'https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/pages/default.aspx' },
    { title: 'Saudi Hajj Health Requirements PDF', url: 'https://www.moh.gov.sa/HealthAwareness/Pilgrims-Health/Documents/Hajj-Health-Requirements-English-language.pdf' },
    { title: 'General Guide for Health of Hajj and Umrah Pilgrims PDF', url: 'https://www.moh.gov.sa/HealthAwareness/Pilgrims-Health/Documents/English.pdf' }
  ],
  rules: [
    { title: "Qur'an 2:196", url: 'https://quran.com/2/196' },
    { title: "Sunan an-Nasa'i 3062", url: 'https://sunnah.com/nasai:3062' }
  ],
  spiritual: [
    { title: "Sunan an-Nasa'i 3062", url: 'https://sunnah.com/nasai:3062' },
    { title: "Sunan an-Nasa'i 2622", url: 'https://sunnah.com/nasai:2622' },
    { title: "Qur'an 2:127", url: 'https://quran.com/2/127' }
  ]
};

const activeFaq = ref(0);

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

const downloadPdf = (guide) => {
  const link = document.createElement('a');
  link.href = guide.url;
  link.download = guide.filename;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

let sectionObserver;

onMounted(() => {
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.fade-in-section').forEach((element) => {
    sectionObserver.observe(element);
  });
});

onBeforeUnmount(() => {
  if (sectionObserver) {
    sectionObserver.disconnect();
  }
});
</script>

<style scoped>
.pg {
  --green: #1b5b39;
  --green-dark: #123622;
  --green-soft: #eef6ef;
  --green-line: #d7e6d8;
  --paper: #fffdf9;
  --cream: #f6f0e7;
  --sand: #e9dfd0;
  --gold: #9a7338;
  --text: #1c2822;
  --text-muted: #5d6d62;
  --text-soft: #77857c;
  --danger: #8a4c33;
  --danger-soft: #fbf2ee;
  --shadow-sm: 0 8px 24px rgba(18, 54, 34, 0.06);
  --shadow-md: 0 18px 42px rgba(18, 54, 34, 0.1);

  min-height: 100%;
  background: linear-gradient(180deg, var(--paper) 0%, var(--cream) 100%);
  color: var(--text);
  font-family: Georgia, var(--font-serif, serif);
  font-size: 18px;
  line-height: 1.7;
}

.main-container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 2rem 5rem;
}

.fade-in-section {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}

.fade-in-section.visible {
  opacity: 1;
  transform: none;
}

.hover-lift {
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
  gap: 2.5rem;
  align-items: center;
  padding: 4.75rem 0 3.5rem;
}

.hero-arabic {
  margin: 0 0 0.9rem;
  color: var(--green-dark);
  font-size: 1.8rem;
  line-height: 1.55;
}

.hero-kicker,
.eyebrow,
.resource-label,
.pdf-label,
.card-num,
.day-date {
  display: inline-block;
  color: var(--green);
  font-family: system-ui, sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hero-kicker {
  margin-bottom: 0.8rem;
}

.hero-title {
  margin: 0 0 1rem;
  color: var(--green-dark);
  font-size: clamp(2.7rem, 5vw, 4.8rem);
  line-height: 1.03;
  font-style: italic;
  font-weight: 500;
}

.hero-subtitle,
.sec-desc,
.card p,
.type-card p,
.day-body,
.tl-body p,
.resource-card p,
.pdf-card p,
.ref-text,
.faq-a p,
.warning-content p,
.closing-msg {
  margin: 0;
  color: var(--text-muted);
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin: 1.8rem 0 1.6rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.download-btn {
  border-radius: 999px;
  padding: 0.95rem 1.35rem;
  border: 1px solid transparent;
  font-family: system-ui, sans-serif;
  font-size: 0.96rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.btn-primary,
.download-btn {
  background: var(--green);
  color: #fff;
}

.btn-primary:hover,
.download-btn:hover {
  transform: translateY(-1px);
  background: var(--green-dark);
}

.btn-secondary {
  background: #fff;
  color: var(--green-dark);
  border-color: var(--green-line);
}

.btn-secondary:hover {
  transform: translateY(-1px);
  background: var(--green-soft);
}

.hero-trust {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.trust-item,
.reference-item,
.resource-url,
.tl-ref,
.faq-ref,
.day-ref,
.card-note,
.type-note,
.section-note,
.tl-tip,
.day-reminder {
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid var(--green-line);
  border-radius: 16px;
  padding: 0.95rem 1rem;
  font-family: system-ui, sans-serif;
}

.trust-item strong,
.reference-item strong {
  display: block;
  margin-bottom: 0.4rem;
  color: var(--green-dark);
  font-size: 0.92rem;
}

.trust-item span,
.reference-item span {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.7;
  word-break: break-word;
}

.hero-visual,
.sec-image {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: var(--sand);
  box-shadow: var(--shadow-sm);
}

.hero-visual {
  min-height: 420px;
}

.hero-visual img,
.sec-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-image-overlay,
.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(18, 54, 34, 0.05), rgba(18, 54, 34, 0.18));
  pointer-events: none;
}

.sec {
  padding: 4.4rem 0;
}

.sec.alt {
  border-top: 1px solid var(--green-line);
  border-bottom: 1px solid var(--green-line);
}

.sec-header-with-image {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(300px, 0.92fr);
  gap: 2.8rem;
  align-items: center;
  margin-bottom: 2.5rem;
}

.sec-hd {
  text-align: left;
}

.sec-hd-center {
  max-width: 760px;
  margin: 0 auto 2.4rem;
  text-align: center;
}

.sec-title {
  margin: 0 0 1rem;
  color: var(--text);
  font-size: clamp(2rem, 3.6vw, 3rem);
  line-height: 1.08;
  font-style: italic;
  font-weight: 500;
}

.sec-ornament,
.closing-div {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  justify-content: flex-start;
  margin: 0 0 1.25rem;
}

.sec-hd-center .sec-ornament,
.closing-div {
  justify-content: center;
}

.sec-ornament::before,
.sec-ornament::after,
.closing-div::before,
.closing-div::after {
  content: '';
  width: 72px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.sec-ornament-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gold);
}

.sec-desc {
  max-width: 640px;
}

.sec-hd-center .sec-desc {
  margin: 0 auto;
}

.sec-image {
  aspect-ratio: 4 / 3;
}

.image-credit {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  padding: 0.45rem 0.7rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 999px;
  color: var(--green-dark);
  font-family: system-ui, sans-serif;
  font-size: 0.75rem;
}

.cards-grid,
.types-grid,
.days-grid,
.rules-grid,
.resource-grid,
.pdf-grid,
.shorts-grid {
  display: grid;
  gap: 1.3rem;
}

.cards-grid,
.types-grid,
.days-grid,
.rules-grid,
.resource-grid,
.pdf-grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.shorts-grid {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.card,
.type-card,
.day-card,
.rules-card,
.resource-card,
.pdf-card,
.conclusion,
.farewell,
.short-card,
.disclaimer-box,
.warning-box {
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(215, 230, 216, 0.9);
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
}

.card,
.type-card,
.resource-card,
.pdf-card,
.short-copy {
  padding: 1.6rem;
}

.card h3,
.type-card h3,
.resource-card h3,
.pdf-card h3,
.short-copy h3,
.tl-body h3,
.day-head h3,
.conclusion h4,
.farewell h4,
.faq-wrap h4,
.disclaimer-box h4,
.warning-box h4 {
  margin: 0 0 0.75rem;
  color: var(--text);
  font-size: 1.5rem;
  line-height: 1.25;
  font-style: italic;
  font-weight: 500;
}

.card-note,
.type-note,
.section-note,
.tl-tip,
.day-reminder,
.tl-ref,
.faq-ref,
.day-ref,
.resource-url {
  margin-top: 1rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.7;
  word-break: break-word;
}

.type-note,
.day-reminder {
  background: #fbf6ed;
  border-color: #e8d7bb;
  color: #6c5220;
}

.tl {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.tl-item {
  display: grid;
  grid-template-columns: 66px minmax(0, 1fr);
  padding: 0 0 2rem;
}

.tl-item:last-child {
  padding-bottom: 0;
}

.tl-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tl-num {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid var(--green-line);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--green);
  font-family: system-ui, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
}

.tl-line {
  width: 1px;
  flex: 1;
  margin-top: 0.75rem;
  background: linear-gradient(180deg, var(--gold), rgba(154, 115, 56, 0));
}

.tl-body {
  padding-left: 1rem;
}

.conclusion,
.farewell,
.disclaimer-box,
.warning-box {
  padding: 1.7rem;
}

.farewell {
  margin-top: 2rem;
  text-align: center;
}

.farewell-arabic,
.closing-arabic {
  color: var(--green-dark);
  font-size: 2rem;
  line-height: 1.6;
}

.farewell cite,
.closing-ref {
  display: block;
  margin-top: 0.7rem;
  color: var(--text-soft);
  font-family: system-ui, sans-serif;
  font-size: 0.82rem;
  font-style: normal;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.day-card {
  overflow: hidden;
}

.day-head {
  padding: 1.3rem 1.4rem 1rem;
  border-bottom: 1px solid var(--green-line);
  background: rgba(238, 246, 239, 0.7);
}

.day-body {
  padding: 1.4rem;
}

.rules-hdr {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1rem 1.25rem;
  font-family: system-ui, sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.rules-hdr svg {
  width: 18px;
  height: 18px;
}

.rules-hdr.pos {
  background: var(--green-soft);
  color: var(--green-dark);
}

.rules-hdr.neg {
  background: var(--danger-soft);
  color: var(--danger);
}

.rules-list {
  list-style: none;
  margin: 0;
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.rules-list li {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  color: var(--text-muted);
  font-family: system-ui, sans-serif;
  font-size: 0.97rem;
  line-height: 1.7;
}

.dot-y,
.dot-n {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  flex-shrink: 0;
}

.dot-y {
  color: var(--green);
}

.dot-n {
  color: var(--danger);
}

.dot-y svg,
.dot-n svg {
  width: 16px;
  height: 16px;
}

.pdf-card {
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.pdf-card .download-btn {
  margin-top: auto;
  width: fit-content;
}

.reference-panel {
  margin-top: 2rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--green-line);
}

.reference-panel h4 {
  margin: 0 0 0.9rem;
  color: var(--green-dark);
  font-family: system-ui, sans-serif;
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.reference-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.9rem;
}

.resource-url {
  background: rgba(255, 255, 255, 0.7);
  user-select: all;
}

.faq-wrap {
  margin-top: 2.8rem;
}

.faq-item {
  border-top: 1px solid var(--green-line);
}

.faq-q {
  width: 100%;
  padding: 1.2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 0;
  background: transparent;
  color: var(--text);
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.faq-q svg {
  width: 20px;
  height: 20px;
  fill: var(--text-soft);
  transition: transform 0.2s ease, fill 0.2s ease;
  flex-shrink: 0;
}

.faq-item.open .faq-q svg {
  transform: rotate(180deg);
  fill: var(--green);
}

.faq-a {
  display: none;
  padding-bottom: 1.2rem;
}

.faq-item.open .faq-a {
  display: block;
}

.short-card {
  overflow: hidden;
}

.short-frame {
  position: relative;
  aspect-ratio: 9 / 16;
  background: #000;
}

.short-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.disclaimer-section {
  padding: 4rem 0 2rem;
}

.ref-list {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
  color: var(--text-muted);
  font-family: system-ui, sans-serif;
  font-size: 0.95rem;
  line-height: 1.8;
}

.warning-box {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  background: var(--danger-soft);
  border-color: rgba(138, 76, 51, 0.15);
}

.warning-icon {
  color: var(--danger);
  flex-shrink: 0;
}

.warning-icon svg {
  width: 26px;
  height: 26px;
}

.warning-content h4,
.warning-content p {
  color: var(--danger);
}

.closing {
  padding: 4rem 0 1rem;
  text-align: center;
}

.closing-en {
  margin: 0;
  color: var(--text-muted);
  font-size: 1.1rem;
  font-style: italic;
}

@media (max-width: 1024px) {
  .main-container {
    padding: 0 1.5rem 4rem;
  }

  .hero,
  .sec-header-with-image {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    min-height: 340px;
  }
}

@media (max-width: 768px) {
  .main-container {
    padding: 0 1.2rem 3.5rem;
  }

  .hero {
    padding: 4rem 0 3rem;
  }

  .hero-title {
    font-size: 2.6rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary,
  .download-btn {
    width: 100%;
  }

  .sec {
    padding: 3.7rem 0;
  }

  .card,
  .type-card,
  .resource-card,
  .pdf-card,
  .short-copy,
  .conclusion,
  .farewell,
  .disclaimer-box,
  .warning-box {
    padding: 1.35rem;
  }

  .tl-item {
    grid-template-columns: 56px minmax(0, 1fr);
  }

  .tl-num {
    width: 40px;
    height: 40px;
    font-size: 0.88rem;
  }

  .farewell-arabic,
  .closing-arabic {
    font-size: 1.7rem;
  }

  .warning-box {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.25rem;
  }

  .reference-list {
    grid-template-columns: 1fr;
  }
}
</style>
