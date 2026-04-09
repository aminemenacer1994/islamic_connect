<template>
  <div class="pg">
    <div class="main-container">
      <header class="hero fade-in-section">
        <div class="hero-copy">
          <p class="hero-arabic">{{ hero.arabic }}</p>
          <span class="hero-kicker">{{ hero.kicker }}</span>
          <h1 class="hero-title">{{ hero.title }}</h1>
          <p class="hero-subtitle">{{ hero.subtitle }}</p>

          <div class="hero-proof">
            <span v-for="item in hero.proofPills" :key="item" class="hero-proof-pill">{{ item }}</span>
          </div>

          <div class="hero-actions">
            <button class="hero-btn-primary" @click="scrollToSection(hero.primaryButton.target)">{{ hero.primaryButton.label }}</button>
            <button class="hero-btn-secondary" @click="scrollToSection(hero.secondaryButton.target)">{{ hero.secondaryButton.label }}</button>
          </div>

          <div class="hero-trust">
            <div v-for="item in hero.trustItems" :key="item.title" class="trust-item">
              <strong>{{ item.title }}</strong>
              <span>{{ item.text }}</span>
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
          <span class="eyebrow">{{ guidesSection.eyebrow }}</span>
          <h2 class="sec-title">{{ guidesSection.title }}</h2>
          <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
          <p class="sec-desc">{{ guidesSection.description }}</p>
        </div>

        <div class="pdf-grid">
          <article v-for="guide in pdfGuides" :key="guide.url" class="pdf-card hover-lift">
            <span class="pdf-label">{{ guide.label }}</span>
            <h3>{{ guide.title }}</h3>
            <p>{{ guide.desc }}</p>
            <button class="download-btn" @click="downloadPdf(guide)">{{ labels.downloadPdf }}</button>
          </article>
        </div>
      </section>

      <section
        id="basics"
        class="sec alt fade-in-section study-section"
        :class="{ 'print-target': printSectionId === 'basics' }"
        :style="getSectionStyle('basics')"
      >
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">{{ sections.basics.eyebrow }}</span>
            <h2 class="sec-title">{{ sections.basics.title }}</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">{{ sections.basics.description }}</p>
            <div class="section-tools" data-section-tools>
              <button class="section-tool-btn section-tool-btn--whatsapp" @click="shareSectionOnWhatsApp('basics', sections.basics.title)">
                <span class="tool-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"/></svg>
                </span>
                <span>{{ labels.shareWhatsApp }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--copy" @click="copySectionText('basics')">
                <span class="tool-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"/></svg>
                </span>
                <span>{{ copiedSectionId === 'basics' ? labels.copied : labels.copyToClipboard }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--print" @click="printSection('basics')">
                <span class="tool-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg>
                </span>
                <span>{{ labels.printSection }}</span>
              </button>
              <div class="font-controls">
                <div class="font-chip">
                  <span class="tool-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"/></svg>
                  </span>
                  <span class="font-label">{{ labels.textSize }}</span>
                </div>
                <div class="font-actions">
                  <button
                    class="font-btn"
                    :disabled="getSectionScale('basics') <= MIN_SECTION_FONT_SCALE"
                    :aria-label="`Decrease text size for ${sections.basics.title}`"
                    @click="changeSectionFontSize('basics', -SECTION_FONT_STEP)"
                  >
                    {{ labels.decreaseTextSize }}
                  </button>
                  <span class="font-scale">{{ formatSectionScale('basics') }}</span>
                  <button
                    class="font-btn"
                    :disabled="getSectionScale('basics') >= MAX_SECTION_FONT_SCALE"
                    :aria-label="`Increase text size for ${sections.basics.title}`"
                    @click="changeSectionFontSize('basics', SECTION_FONT_STEP)"
                  >
                    {{ labels.increaseTextSize }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.basics.src" :alt="sectionImages.basics.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ labels.imageCreditPrefix }} {{ sectionImages.basics.credit }}</div>
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
          <h4>{{ labels.keyReferences }}</h4>
          <div class="reference-list">
            <div v-for="item in sectionReferences.basics" :key="item.title" class="reference-item">
              <strong>{{ item.title }}</strong>
              <span>{{ item.url }}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="umrah"
        class="sec fade-in-section study-section"
        :class="{ 'print-target': printSectionId === 'umrah' }"
        :style="getSectionStyle('umrah')"
      >
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">{{ sections.umrah.eyebrow }}</span>
            <h2 class="sec-title">{{ sections.umrah.title }}</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">{{ sections.umrah.description }}</p>
            <div class="section-tools" data-section-tools>
              <button class="section-tool-btn section-tool-btn--whatsapp" @click="shareSectionOnWhatsApp('umrah', sections.umrah.title)">
                <span class="tool-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"/></svg>
                </span>
                <span>{{ labels.shareWhatsApp }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--copy" @click="copySectionText('umrah')">
                <span class="tool-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"/></svg>
                </span>
                <span>{{ copiedSectionId === 'umrah' ? labels.copied : labels.copyToClipboard }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--print" @click="printSection('umrah')">
                <span class="tool-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg>
                </span>
                <span>{{ labels.printSection }}</span>
              </button>
              <div class="font-controls">
                <div class="font-chip">
                  <span class="tool-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"/></svg>
                  </span>
                  <span class="font-label">{{ labels.textSize }}</span>
                </div>
                <div class="font-actions">
                  <button
                    class="font-btn"
                    :disabled="getSectionScale('umrah') <= MIN_SECTION_FONT_SCALE"
                    :aria-label="`Decrease text size for ${sections.umrah.title}`"
                    @click="changeSectionFontSize('umrah', -SECTION_FONT_STEP)"
                  >
                    {{ labels.decreaseTextSize }}
                  </button>
                  <span class="font-scale">{{ formatSectionScale('umrah') }}</span>
                  <button
                    class="font-btn"
                    :disabled="getSectionScale('umrah') >= MAX_SECTION_FONT_SCALE"
                    :aria-label="`Increase text size for ${sections.umrah.title}`"
                    @click="changeSectionFontSize('umrah', SECTION_FONT_STEP)"
                  >
                    {{ labels.increaseTextSize }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.umrah.src" :alt="sectionImages.umrah.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ labels.imageCreditPrefix }} {{ sectionImages.umrah.credit }}</div>
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
          <h4>{{ sections.umrah.conclusion.title }}</h4>
          <p>{{ sections.umrah.conclusion.text }}</p>
        </div>

        <div class="reference-panel">
          <h4>{{ labels.keyReferences }}</h4>
          <div class="reference-list">
            <div v-for="item in sectionReferences.umrah" :key="item.title" class="reference-item">
              <strong>{{ item.title }}</strong>
              <span>{{ item.url }}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="hajj"
        class="sec alt fade-in-section study-section"
        :class="{ 'print-target': printSectionId === 'hajj' }"
        :style="getSectionStyle('hajj')"
      >
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">{{ sections.hajj.eyebrow }}</span>
            <h2 class="sec-title">{{ sections.hajj.title }}</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">{{ sections.hajj.description }}</p>
            <div class="section-tools" data-section-tools>
              <button class="section-tool-btn section-tool-btn--whatsapp" @click="shareSectionOnWhatsApp('hajj', sections.hajj.title)">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"/></svg></span>
                <span>{{ labels.shareWhatsApp }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--copy" @click="copySectionText('hajj')">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"/></svg></span>
                <span>{{ copiedSectionId === 'hajj' ? labels.copied : labels.copyToClipboard }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--print" @click="printSection('hajj')">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg></span>
                <span>{{ labels.printSection }}</span>
              </button>
              <div class="font-controls">
                <div class="font-chip">
                  <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"/></svg></span>
                  <span class="font-label">{{ labels.textSize }}</span>
                </div>
                <div class="font-actions">
                  <button class="font-btn" :disabled="getSectionScale('hajj') <= MIN_SECTION_FONT_SCALE" :aria-label="`Decrease text size for ${sections.hajj.title}`" @click="changeSectionFontSize('hajj', -SECTION_FONT_STEP)">
                    {{ labels.decreaseTextSize }}
                  </button>
                  <span class="font-scale">{{ formatSectionScale('hajj') }}</span>
                  <button class="font-btn" :disabled="getSectionScale('hajj') >= MAX_SECTION_FONT_SCALE" :aria-label="`Increase text size for ${sections.hajj.title}`" @click="changeSectionFontSize('hajj', SECTION_FONT_STEP)">
                    {{ labels.increaseTextSize }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.hajj.src" :alt="sectionImages.hajj.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ labels.imageCreditPrefix }} {{ sectionImages.hajj.credit }}</div>
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
          <div class="farewell-arabic">{{ sections.hajj.farewell.arabic }}</div>
          <h4>{{ sections.hajj.farewell.title }}</h4>
          <p>{{ sections.hajj.farewell.text }}</p>
          <cite>{{ sections.hajj.farewell.reference }}</cite>
        </div>

        <div class="reference-panel">
          <h4>{{ labels.keyReferences }}</h4>
          <div class="reference-list">
            <div v-for="item in sectionReferences.hajj" :key="item.title" class="reference-item">
              <strong>{{ item.title }}</strong>
              <span>{{ item.url }}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="mistakes"
        class="sec fade-in-section study-section"
        :class="{ 'print-target': printSectionId === 'mistakes' }"
        :style="getSectionStyle('mistakes')"
      >
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">{{ sections.mistakes.eyebrow }}</span>
            <h2 class="sec-title">{{ sections.mistakes.title }}</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">{{ sections.mistakes.description }}</p>
            <div class="section-tools" data-section-tools>
              <button class="section-tool-btn section-tool-btn--whatsapp" @click="shareSectionOnWhatsApp('mistakes', sections.mistakes.title)">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"/></svg></span>
                <span>{{ labels.shareWhatsApp }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--copy" @click="copySectionText('mistakes')">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"/></svg></span>
                <span>{{ copiedSectionId === 'mistakes' ? labels.copied : labels.copyToClipboard }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--print" @click="printSection('mistakes')">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg></span>
                <span>{{ labels.printSection }}</span>
              </button>
              <div class="font-controls">
                <div class="font-chip">
                  <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"/></svg></span>
                  <span class="font-label">{{ labels.textSize }}</span>
                </div>
                <div class="font-actions">
                  <button class="font-btn" :disabled="getSectionScale('mistakes') <= MIN_SECTION_FONT_SCALE" :aria-label="`Decrease text size for ${sections.mistakes.title}`" @click="changeSectionFontSize('mistakes', -SECTION_FONT_STEP)">
                    {{ labels.decreaseTextSize }}
                  </button>
                  <span class="font-scale">{{ formatSectionScale('mistakes') }}</span>
                  <button class="font-btn" :disabled="getSectionScale('mistakes') >= MAX_SECTION_FONT_SCALE" :aria-label="`Increase text size for ${sections.mistakes.title}`" @click="changeSectionFontSize('mistakes', SECTION_FONT_STEP)">
                    {{ labels.increaseTextSize }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.mistakes.src" :alt="sectionImages.mistakes.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ labels.imageCreditPrefix }} {{ sectionImages.mistakes.credit }}</div>
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
          <h4>{{ labels.keyReferences }}</h4>
          <div class="reference-list">
            <div v-for="item in sectionReferences.mistakes" :key="item.title" class="reference-item">
              <strong>{{ item.title }}</strong>
              <span>{{ item.url }}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="health"
        class="sec alt fade-in-section study-section"
        :class="{ 'print-target': printSectionId === 'health' }"
        :style="getSectionStyle('health')"
      >
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">{{ sections.health.eyebrow }}</span>
            <h2 class="sec-title">{{ sections.health.title }}</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">{{ sections.health.description }}</p>
            <div class="section-tools" data-section-tools>
              <button class="section-tool-btn section-tool-btn--whatsapp" @click="shareSectionOnWhatsApp('health', sections.health.title)">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"/></svg></span>
                <span>{{ labels.shareWhatsApp }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--copy" @click="copySectionText('health')">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"/></svg></span>
                <span>{{ copiedSectionId === 'health' ? labels.copied : labels.copyToClipboard }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--print" @click="printSection('health')">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg></span>
                <span>{{ labels.printSection }}</span>
              </button>
              <div class="font-controls">
                <div class="font-chip">
                  <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"/></svg></span>
                  <span class="font-label">{{ labels.textSize }}</span>
                </div>
                <div class="font-actions">
                  <button class="font-btn" :disabled="getSectionScale('health') <= MIN_SECTION_FONT_SCALE" :aria-label="`Decrease text size for ${sections.health.title}`" @click="changeSectionFontSize('health', -SECTION_FONT_STEP)">
                    {{ labels.decreaseTextSize }}
                  </button>
                  <span class="font-scale">{{ formatSectionScale('health') }}</span>
                  <button class="font-btn" :disabled="getSectionScale('health') >= MAX_SECTION_FONT_SCALE" :aria-label="`Increase text size for ${sections.health.title}`" @click="changeSectionFontSize('health', SECTION_FONT_STEP)">
                    {{ labels.increaseTextSize }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.health.src" :alt="sectionImages.health.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ labels.imageCreditPrefix }} {{ sectionImages.health.credit }}</div>
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

        <div class="section-note">{{ sections.health.note }}</div>

        <div class="reference-panel">
          <h4>{{ labels.keyReferences }}</h4>
          <div class="reference-list">
            <div v-for="item in sectionReferences.health" :key="item.title" class="reference-item">
              <strong>{{ item.title }}</strong>
              <span>{{ item.url }}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="rules"
        class="sec fade-in-section study-section"
        :class="{ 'print-target': printSectionId === 'rules' }"
        :style="getSectionStyle('rules')"
      >
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">{{ sections.rules.eyebrow }}</span>
            <h2 class="sec-title">{{ sections.rules.title }}</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">{{ sections.rules.description }}</p>
            <div class="section-tools" data-section-tools>
              <button class="section-tool-btn section-tool-btn--whatsapp" @click="shareSectionOnWhatsApp('rules', sections.rules.title)">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"/></svg></span>
                <span>{{ labels.shareWhatsApp }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--copy" @click="copySectionText('rules')">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"/></svg></span>
                <span>{{ copiedSectionId === 'rules' ? labels.copied : labels.copyToClipboard }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--print" @click="printSection('rules')">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg></span>
                <span>{{ labels.printSection }}</span>
              </button>
              <div class="font-controls">
                <div class="font-chip">
                  <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"/></svg></span>
                  <span class="font-label">{{ labels.textSize }}</span>
                </div>
                <div class="font-actions">
                  <button class="font-btn" :disabled="getSectionScale('rules') <= MIN_SECTION_FONT_SCALE" :aria-label="`Decrease text size for ${sections.rules.title}`" @click="changeSectionFontSize('rules', -SECTION_FONT_STEP)">
                    {{ labels.decreaseTextSize }}
                  </button>
                  <span class="font-scale">{{ formatSectionScale('rules') }}</span>
                  <button class="font-btn" :disabled="getSectionScale('rules') >= MAX_SECTION_FONT_SCALE" :aria-label="`Increase text size for ${sections.rules.title}`" @click="changeSectionFontSize('rules', SECTION_FONT_STEP)">
                    {{ labels.increaseTextSize }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.rules.src" :alt="sectionImages.rules.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ labels.imageCreditPrefix }} {{ sectionImages.rules.credit }}</div>
          </div>
        </div>

        <div class="rules-grid">
          <article class="rules-card">
            <div class="rules-hdr pos">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
              {{ sections.rules.permissibleTitle }}
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
              {{ sections.rules.prohibitedTitle }}
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

        <div class="section-note">{{ sections.rules.note }}</div>

        <div class="reference-panel">
          <h4>{{ labels.keyReferences }}</h4>
          <div class="reference-list">
            <div v-for="item in sectionReferences.rules" :key="item.title" class="reference-item">
              <strong>{{ item.title }}</strong>
              <span>{{ item.url }}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="spiritual"
        class="sec alt fade-in-section study-section"
        :class="{ 'print-target': printSectionId === 'spiritual' }"
        :style="getSectionStyle('spiritual')"
      >
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">{{ sections.spiritual.eyebrow }}</span>
            <h2 class="sec-title">{{ sections.spiritual.title }}</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">{{ sections.spiritual.description }}</p>
            <div class="section-tools" data-section-tools>
              <button class="section-tool-btn section-tool-btn--whatsapp" @click="shareSectionOnWhatsApp('spiritual', sections.spiritual.title)">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"/></svg></span>
                <span>{{ labels.shareWhatsApp }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--copy" @click="copySectionText('spiritual')">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"/></svg></span>
                <span>{{ copiedSectionId === 'spiritual' ? labels.copied : labels.copyToClipboard }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--print" @click="printSection('spiritual')">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg></span>
                <span>{{ labels.printSection }}</span>
              </button>
              <div class="font-controls">
                <div class="font-chip">
                  <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"/></svg></span>
                  <span class="font-label">{{ labels.textSize }}</span>
                </div>
                <div class="font-actions">
                  <button class="font-btn" :disabled="getSectionScale('spiritual') <= MIN_SECTION_FONT_SCALE" :aria-label="`Decrease text size for ${sections.spiritual.title}`" @click="changeSectionFontSize('spiritual', -SECTION_FONT_STEP)">
                    {{ labels.decreaseTextSize }}
                  </button>
                  <span class="font-scale">{{ formatSectionScale('spiritual') }}</span>
                  <button class="font-btn" :disabled="getSectionScale('spiritual') >= MAX_SECTION_FONT_SCALE" :aria-label="`Increase text size for ${sections.spiritual.title}`" @click="changeSectionFontSize('spiritual', SECTION_FONT_STEP)">
                    {{ labels.increaseTextSize }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.spiritual.src" :alt="sectionImages.spiritual.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ labels.imageCreditPrefix }} {{ sectionImages.spiritual.credit }}</div>
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
          <h4>{{ labels.keyReferences }}</h4>
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
          <span class="eyebrow">{{ sections.shorts.eyebrow }}</span>
          <h2 class="sec-title">{{ sections.shorts.title }}</h2>
          <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
          <p class="sec-desc">{{ sections.shorts.description }}</p>
        </div>

        <div class="shorts-grid">
          <article v-for="video in shorts" :key="video.id" class="short-card">
            <div class="short-frame">
              <iframe
                :src="`https://www.youtube-nocookie.com/embed/${video.id}`"
                :title="video.title"
                loading="lazy"
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

      <section
        id="resources"
        class="sec alt fade-in-section study-section"
        :class="{ 'print-target': printSectionId === 'resources' }"
        :style="getSectionStyle('resources')"
      >
        <div class="sec-hd sec-hd-center">
          <span class="eyebrow">{{ sections.resources.eyebrow }}</span>
          <h2 class="sec-title">{{ sections.resources.title }}</h2>
          <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
          <p class="sec-desc">{{ sections.resources.description }}</p>
          <div class="section-tools section-tools-center" data-section-tools>
            <button class="section-tool-btn section-tool-btn--whatsapp" @click="shareSectionOnWhatsApp('resources', sections.resources.title)">
              <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"/></svg></span>
              <span>{{ labels.shareWhatsApp }}</span>
            </button>
            <button class="section-tool-btn section-tool-btn--copy" @click="copySectionText('resources')">
              <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"/></svg></span>
              <span>{{ copiedSectionId === 'resources' ? labels.copied : labels.copyToClipboard }}</span>
            </button>
            <button class="section-tool-btn section-tool-btn--print" @click="printSection('resources')">
              <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg></span>
              <span>{{ labels.printSection }}</span>
            </button>
            <div class="font-controls">
              <div class="font-chip">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"/></svg></span>
                <span class="font-label">{{ labels.textSize }}</span>
              </div>
              <div class="font-actions">
                <button class="font-btn" :disabled="getSectionScale('resources') <= MIN_SECTION_FONT_SCALE" :aria-label="`Decrease text size for ${sections.resources.title}`" @click="changeSectionFontSize('resources', -SECTION_FONT_STEP)">
                  {{ labels.decreaseTextSize }}
                </button>
                <span class="font-scale">{{ formatSectionScale('resources') }}</span>
                <button class="font-btn" :disabled="getSectionScale('resources') >= MAX_SECTION_FONT_SCALE" :aria-label="`Increase text size for ${sections.resources.title}`" @click="changeSectionFontSize('resources', SECTION_FONT_STEP)">
                  {{ labels.increaseTextSize }}
                </button>
              </div>
            </div>
          </div>
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
          <h4>{{ labels.faqTitle }}</h4>
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

      <section
        id="post-hajj"
        class="sec fade-in-section study-section"
        :class="{ 'print-target': printSectionId === 'post-hajj' }"
        :style="getSectionStyle('post-hajj')"
      >
        <div class="sec-header-with-image">
          <div class="sec-hd">
            <span class="eyebrow">{{ sections.postHajj.eyebrow }}</span>
            <h2 class="sec-title">{{ sections.postHajj.title }}</h2>
            <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
            <p class="sec-desc">{{ sections.postHajj.description }}</p>
            <div class="section-tools" data-section-tools>
              <button class="section-tool-btn section-tool-btn--whatsapp" @click="shareSectionOnWhatsApp('post-hajj', sections.postHajj.title)">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"/></svg></span>
                <span>{{ labels.shareWhatsApp }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--copy" @click="copySectionText('post-hajj')">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"/></svg></span>
                <span>{{ copiedSectionId === 'post-hajj' ? labels.copied : labels.copyToClipboard }}</span>
              </button>
              <button class="section-tool-btn section-tool-btn--print" @click="printSection('post-hajj')">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg></span>
                <span>{{ labels.printSection }}</span>
              </button>
              <div class="font-controls">
                <div class="font-chip">
                  <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"/></svg></span>
                  <span class="font-label">{{ labels.textSize }}</span>
                </div>
                <div class="font-actions">
                  <button class="font-btn" :disabled="getSectionScale('post-hajj') <= MIN_SECTION_FONT_SCALE" :aria-label="`Decrease text size for ${sections.postHajj.title}`" @click="changeSectionFontSize('post-hajj', -SECTION_FONT_STEP)">
                    {{ labels.decreaseTextSize }}
                  </button>
                  <span class="font-scale">{{ formatSectionScale('post-hajj') }}</span>
                  <button class="font-btn" :disabled="getSectionScale('post-hajj') >= MAX_SECTION_FONT_SCALE" :aria-label="`Increase text size for ${sections.postHajj.title}`" @click="changeSectionFontSize('post-hajj', SECTION_FONT_STEP)">
                    {{ labels.increaseTextSize }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="sec-image">
            <img :src="sectionImages.postHajj.src" :alt="sectionImages.postHajj.alt" loading="lazy">
            <div class="image-overlay"></div>
            <div class="image-credit">{{ labels.imageCreditPrefix }} {{ sectionImages.postHajj.credit }}</div>
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

      <section class="sec alt fade-in-section summary-end" id="summary">
        <div class="sec-hd sec-hd-center">
          <span class="eyebrow">{{ sections.summary.eyebrow }}</span>
          <h2 class="sec-title">{{ sections.summary.title }}</h2>
          <div class="sec-ornament"><span class="sec-ornament-dot"></span></div>
          <p class="sec-desc">{{ sections.summary.description }}</p>
          <div class="summary-pills">
            <span class="summary-pill">
              <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 4h14v2H5Zm0 7h14v2H5Zm0 7h10v2H5Z"/></svg></span>
              {{ summaryMetrics.words }} words
            </span>
            <span class="summary-pill">
              <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm1 11.4 4.1 2.4-1 1.7L11 13V6h2Z"/></svg></span>
              {{ summaryMetrics.readTime }} min read
            </span>
          </div>
        </div>

        <div class="summary-card">
          <span class="resource-label">{{ summarySection.kicker }}</span>
          <p class="summary-intro">{{ summarySection.intro }}</p>
          <div class="summary-points">
            <article v-for="point in summarySection.points" :key="point" class="summary-point">
              <span class="summary-point-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
              </span>
              <p>{{ point }}</p>
            </article>
          </div>
          <div class="summary-footer">{{ summarySection.footer }}</div>
        </div>
      </section>

      <div class="disclaimer-section fade-in-section">
        <div class="disclaimer-box">
          <h4>{{ disclaimer.title }}</h4>
          <p class="ref-text">{{ disclaimer.text }}</p>
          <ul class="ref-list">
            <li v-for="item in disclaimer.items" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="warning-box">
          <div class="warning-icon">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm11-3h-1v-1h1zm0-3h-1v-4h1z"/></svg>
          </div>
          <div class="warning-content">
            <h4>{{ disclaimer.warningTitle }}</h4>
            <p>{{ disclaimer.warningText }}</p>
          </div>
        </div>
      </div>

      <div class="closing fade-in-section">
        <div class="closing-arabic">{{ closing.arabic }}</div>
        <div class="closing-div"><span class="sec-ornament-dot"></span></div>
        <p class="closing-en">{{ closing.translation }}</p>
        <span class="closing-ref">{{ closing.reference }}</span>
        <p class="closing-msg">{{ closing.message }}</p>
      </div>
    </div>

    <button class="ai-summary-fab" :class="{ active: isAiSummaryOpen && !isAiSummaryMinimized }" :aria-label="labels.aiSummaryFab" @click="toggleAiSummary">
      <span class="tool-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 9.6 8.1 3 10.5l6.1 2.4L12 19l2.9-6.1L21 10.5l-6.1-2.4Z"/></svg>
      </span>
      <span class="ai-summary-fab-label">{{ labels.aiSummaryFab }}</span>
    </button>

    <aside v-if="isAiSummaryOpen" class="ai-summary-panel" :class="{ minimized: isAiSummaryMinimized, maximized: isAiSummaryMaximized }">
      <div class="ai-summary-header">
        <div>
          <span class="resource-label">{{ summarySection.kicker }}</span>
          <h3>{{ summarySection.title }}</h3>
        </div>
        <div class="ai-summary-controls">
          <button class="ai-summary-control" @click="toggleAiSummaryMinimize" :aria-label="isAiSummaryMinimized ? 'Restore AI summary' : 'Minimize AI summary'">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 11h12v2H6z"/></svg>
          </button>
          <button class="ai-summary-control" @click="toggleAiSummaryMaximize" :aria-label="isAiSummaryMaximized ? 'Restore AI summary size' : 'Maximize AI summary'">
            <svg v-if="!isAiSummaryMaximized" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10v10H7zm2 2v6h6V9z"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor"><path d="M8 8h8v8H8zm-2 2H4V4h6v2H6zm14 0V6h-4V4h6v6zm-10 10H4v-6h2v4h4zm10 0h-6v-2h4v-4h2z"/></svg>
          </button>
          <button class="ai-summary-control ai-summary-control--close" @click="closeAiSummary" aria-label="Close AI summary">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="m18.3 5.7-1.4-1.4L12 9.2 7.1 4.3 5.7 5.7 10.6 10.6 5.7 15.5l1.4 1.4 4.9-4.9 4.9 4.9 1.4-1.4-4.9-4.9z"/></svg>
          </button>
        </div>
      </div>

      <div v-if="!isAiSummaryMinimized" class="ai-summary-body">
        <div class="summary-pills">
          <span class="summary-pill">
            <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 4h14v2H5Zm0 7h14v2H5Zm0 7h10v2H5Z"/></svg></span>
            {{ summaryMetrics.words }} words
          </span>
          <span class="summary-pill">
            <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm1 11.4 4.1 2.4-1 1.7L11 13V6h2Z"/></svg></span>
            {{ summaryMetrics.readTime }} min read
          </span>
        </div>
        <p class="summary-intro">{{ summarySection.intro }}</p>
        <div class="ai-summary-points">
          <div v-for="point in summarySection.points" :key="point" class="ai-summary-point">
            <span class="summary-point-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
            </span>
            <p>{{ point }}</p>
          </div>
        </div>
        <div class="ai-summary-footer">{{ summarySection.footer }}</div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import hajjUmrahContent from '../../data/hajj-umrah-content.json';

const content = hajjUmrahContent;
const labels = content.labels;
const hero = content.hero;
const heroImage = content.heroImage;
const guidesSection = content.guidesSection;
const sections = content.sections;
const sectionImages = content.sectionImages;
const pdfGuides = content.pdfGuides;
const basicsCards = content.basicsCards;
const hajjTypes = content.hajjTypes;
const umrahSteps = content.umrahSteps;
const hajjDays = content.hajjDays;
const commonMistakes = content.commonMistakes;
const healthReadiness = content.healthReadiness;
const rules = content.rules;
const spiritualPrep = content.spiritualPrep;
const shorts = content.shorts;
const resources = content.resources;
const faqs = content.faqs;
const postHajjSteps = content.postHajjSteps;
const summarySection = content.summarySection;
const sectionReferences = content.sectionReferences;
const disclaimer = content.disclaimer;
const closing = content.closing;

const DEFAULT_SECTION_FONT_SCALE = 1;
const MIN_SECTION_FONT_SCALE = 0.9;
const MAX_SECTION_FONT_SCALE = 1.2;
const SECTION_FONT_STEP = 0.08;
const sectionIds = ['basics', 'umrah', 'hajj', 'mistakes', 'health', 'rules', 'spiritual', 'resources', 'post-hajj'];

const activeFaq = ref(0);
const copiedSectionId = ref(null);
const printSectionId = ref(null);
const isAiSummaryOpen = ref(false);
const isAiSummaryMinimized = ref(false);
const isAiSummaryMaximized = ref(false);
const sectionFontScales = ref(
  sectionIds.reduce((accumulator, id) => {
    accumulator[id] = DEFAULT_SECTION_FONT_SCALE;
    return accumulator;
  }, {})
);

let copyFeedbackTimeout;

const summaryMetrics = computed(() => {
  const text = [summarySection.intro, ...summarySection.points, summarySection.footer].join(' ').trim();
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  const readTime = Math.max(1, Math.ceil(words / 180));

  return {
    words,
    readTime
  };
});

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

const getSectionScale = (sectionId) => sectionFontScales.value[sectionId] ?? DEFAULT_SECTION_FONT_SCALE;

const getSectionStyle = (sectionId) => ({
  '--section-font-scale': getSectionScale(sectionId)
});

const formatSectionScale = (sectionId) => `${Math.round(getSectionScale(sectionId) * 100)}%`;

const changeSectionFontSize = (sectionId, delta) => {
  const nextScale = Math.min(
    MAX_SECTION_FONT_SCALE,
    Math.max(MIN_SECTION_FONT_SCALE, Number((getSectionScale(sectionId) + delta).toFixed(2)))
  );

  sectionFontScales.value = {
    ...sectionFontScales.value,
    [sectionId]: nextScale
  };
};

const getSectionElement = (sectionId) => document.getElementById(sectionId);

const getSectionDescription = (sectionId) => {
  const section = getSectionElement(sectionId);
  return section?.querySelector('.sec-desc')?.textContent?.trim() ?? '';
};

const buildSectionText = (sectionId) => {
  const section = getSectionElement(sectionId);
  if (!section) {
    return '';
  }

  const clone = section.cloneNode(true);
  clone.querySelectorAll('[data-section-tools], .image-credit').forEach((element) => element.remove());

  return clone.innerText.replace(/\n{3,}/g, '\n\n').trim();
};

const fallbackCopyText = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

const setCopiedState = (sectionId) => {
  copiedSectionId.value = sectionId;
  window.clearTimeout(copyFeedbackTimeout);
  copyFeedbackTimeout = window.setTimeout(() => {
    copiedSectionId.value = null;
  }, 1800);
};

const copySectionText = async (sectionId) => {
  const text = buildSectionText(sectionId);
  if (!text) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    fallbackCopyText(text);
  }

  setCopiedState(sectionId);
};

const shareSectionOnWhatsApp = (sectionId, title) => {
  const description = getSectionDescription(sectionId);
  const baseUrl = window.location.href.split('#')[0];
  const shareUrl = `${baseUrl}#${sectionId}`;
  const text = description ? `${title}\n\n${description}\n\n${shareUrl}` : `${title}\n\n${shareUrl}`;
  window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
};

const clearPrintTarget = () => {
  printSectionId.value = null;
};

const printSection = (sectionId) => {
  printSectionId.value = sectionId;
  window.setTimeout(() => {
    window.print();
  }, 80);
};

const openAiSummary = () => {
  isAiSummaryOpen.value = true;
  isAiSummaryMinimized.value = false;
};

const toggleAiSummary = () => {
  if (!isAiSummaryOpen.value) {
    openAiSummary();
    return;
  }

  if (isAiSummaryMinimized.value) {
    isAiSummaryMinimized.value = false;
    return;
  }

  isAiSummaryOpen.value = false;
  isAiSummaryMaximized.value = false;
};

const toggleAiSummaryMinimize = () => {
  if (!isAiSummaryOpen.value) {
    openAiSummary();
    return;
  }

  isAiSummaryMinimized.value = !isAiSummaryMinimized.value;
  if (isAiSummaryMinimized.value) {
    isAiSummaryMaximized.value = false;
  }
};

const toggleAiSummaryMaximize = () => {
  if (!isAiSummaryOpen.value) {
    openAiSummary();
  }

  isAiSummaryMinimized.value = false;
  isAiSummaryMaximized.value = !isAiSummaryMaximized.value;
};

const closeAiSummary = () => {
  isAiSummaryOpen.value = false;
  isAiSummaryMinimized.value = false;
  isAiSummaryMaximized.value = false;
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
  window.addEventListener('afterprint', clearPrintTarget);

  const animatedSections = Array.from(document.querySelectorAll('.fade-in-section'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const compactViewport = window.matchMedia('(max-width: 768px)').matches;

  if (prefersReducedMotion || compactViewport) {
    animatedSections.forEach((element) => {
      element.classList.add('visible');
    });
    return;
  }

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

  animatedSections.forEach((element) => {
    sectionObserver.observe(element);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('afterprint', clearPrintTarget);

  if (sectionObserver) {
    sectionObserver.disconnect();
  }

  window.clearTimeout(copyFeedbackTimeout);
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
  overflow-x: clip;
}

.main-container {
  max-width: 1460px;
  margin: 0 auto;
  padding: 0 2rem 5rem;
}

.fade-in-section {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.fade-in-section.visible {
  opacity: 1;
  transform: none;
}

.sec,
.disclaimer-section,
.closing {
  content-visibility: auto;
  contain-intrinsic-size: 780px;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.42fr) minmax(420px, 0.9fr);
  gap: 3.75rem;
  align-items: center;
  padding: 3.75rem 4rem;
  margin-top: 1.4rem;
  background:
    radial-gradient(circle at top left, rgba(233, 223, 208, 0.45), transparent 34%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(246, 240, 231, 0.92));
  border: 1px solid rgba(215, 230, 216, 0.95);
  border-radius: 34px;
  box-shadow: var(--shadow-md);
  scroll-margin-top: 7rem;
}

.hero-copy {
  max-width: 860px;
  position: relative;
  z-index: 1;
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
  max-width: 10.6ch;
  font-size: clamp(3.15rem, 5.2vw, 5.45rem);
  line-height: 0.97;
  letter-spacing: -0.03em;
  font-style: italic;
  font-weight: 500;
  text-wrap: balance;
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

.hero-subtitle {
  max-width: 720px;
}

.hero-proof {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.15rem;
}

.hero-proof-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0.8rem;
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid var(--green-line);
  border-radius: 999px;
  color: var(--green-dark);
  font-family: system-ui, sans-serif;
  font-size: 0.84rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin: 2rem 0 1.8rem;
  flex-wrap: wrap;
}

.hero-btn-primary,
.hero-btn-secondary,
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

.hero-btn-primary,
.download-btn {
  background: var(--green);
  color: #fff;
  box-shadow: 0 14px 30px rgba(27, 91, 57, 0.16);
}

.hero-btn-primary:hover,
.hero-btn-primary:focus,
.hero-btn-primary:active,
.download-btn:hover {
  transform: translateY(-1px);
  background: var(--green-dark);
}

.hero-btn-primary {
  background: var(--green) !important;
  border-color: var(--green) !important;
  color: #fff !important;
}

.hero-btn-primary:hover,
.hero-btn-primary:focus,
.hero-btn-primary:active {
  background: var(--green-dark) !important;
  border-color: var(--green-dark) !important;
  color: #fff !important;
}

.hero-btn-secondary {
  background: #fff;
  color: var(--green-dark);
  border-color: var(--green-line);
}

.hero-btn-secondary:hover,
.hero-btn-secondary:focus,
.hero-btn-secondary:active {
  transform: translateY(-1px);
  background: var(--green-soft);
}

.hero-btn-secondary {
  background: #fff !important;
  border-color: var(--green-line) !important;
  color: var(--green-dark) !important;
}

.hero-trust {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
  min-height: 560px;
  align-self: stretch;
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
  scroll-margin-top: 7rem;
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

.study-section {
  --section-font-scale: 1;
}

.study-section .sec-desc,
.study-section .card p,
.study-section .type-card p,
.study-section .day-body,
.study-section .tl-body p,
.study-section .resource-card p,
.study-section .ref-text,
.study-section .faq-a p,
.study-section .warning-content p,
.study-section .closing-msg,
.study-section .rules-list li {
  font-size: calc(1rem * var(--section-font-scale));
}

.study-section .card h3,
.study-section .type-card h3,
.study-section .resource-card h3,
.study-section .tl-body h3,
.study-section .day-head h3,
.study-section .conclusion h4,
.study-section .farewell h4,
.study-section .faq-wrap h4,
.study-section .warning-box h4 {
  font-size: calc(1.5rem * var(--section-font-scale));
}

.study-section .card-note,
.study-section .type-note,
.study-section .section-note,
.study-section .tl-tip,
.study-section .day-reminder,
.study-section .tl-ref,
.study-section .faq-ref,
.study-section .day-ref,
.study-section .resource-url,
.study-section .trust-item span,
.study-section .reference-item span {
  font-size: calc(0.9rem * var(--section-font-scale));
}

.study-section .faq-q {
  font-size: calc(1rem * var(--section-font-scale));
}

.section-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.4rem;
}

.section-tools-center {
  justify-content: center;
  margin: 1.4rem auto 0;
}

.section-tool-btn,
.font-btn {
  border: 1px solid rgba(18, 54, 34, 0.12);
  background: rgba(255, 255, 255, 0.95);
  color: var(--green-dark);
  font-family: system-ui, sans-serif;
  font-size: 0.84rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  min-width: 0;
}

.section-tool-btn {
  min-height: 46px;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  text-align: center;
}

.section-tool-btn:hover,
.font-btn:hover {
  transform: translateY(-1px);
  background: #fff;
}

.section-tool-btn:disabled,
.font-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
}

.section-tool-btn--whatsapp {
  color: #127955;
  border-color: rgba(18, 121, 85, 0.34);
  background: rgba(18, 121, 85, 0.05);
}

.section-tool-btn--copy {
  color: #1860ad;
  border-color: rgba(24, 96, 173, 0.28);
  background: rgba(24, 96, 173, 0.05);
}

.section-tool-btn--print {
  color: #1f2937;
  border-color: rgba(31, 41, 55, 0.18);
  background: rgba(31, 41, 55, 0.04);
}

.tool-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 0.95rem;
  height: 0.95rem;
  flex-shrink: 0;
}

.tool-icon svg {
  width: 100%;
  height: 100%;
}

.font-controls {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 46px;
  padding: 0 0 0 0.1rem;
  background: transparent;
  border: 0;
  border-radius: 0;
  font-family: system-ui, sans-serif;
}

.font-chip {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
  padding: 0 0.15rem;
}

.font-label {
  color: var(--green-dark);
  font-size: 0.84rem;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
}

.font-actions {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: nowrap;
  min-width: 0;
}

.font-scale {
  min-width: 2.35rem;
  padding: 0.1rem 0;
  text-align: center;
  color: var(--green-dark);
  font-size: 0.84rem;
  font-weight: 700;
  white-space: nowrap;
}

.font-btn {
  min-width: 46px;
  min-height: 46px;
  padding: 0 0.7rem;
  border-radius: 999px;
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

.pdf-grid {
  align-items: start;
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
.short-copy {
  padding: 1.6rem;
}

.pdf-card {
  display: grid;
  gap: 1rem;
  align-content: start;
  padding: 1.85rem;
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

.pdf-card h3 {
  max-width: 14ch;
  margin-bottom: 0.2rem;
  text-wrap: balance;
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
  padding: 1.85rem;
  gap: 1rem;
  border-radius: 24px;
}

.pdf-card .download-btn {
  margin-top: 0.35rem;
  width: fit-content;
  padding: 0.85rem 1.2rem;
  border-radius: 18px;
  box-shadow: none;
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

.summary-end {
  position: relative;
}

.summary-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1.2rem;
}

.summary-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1rem;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid var(--green-line);
  border-radius: 999px;
  color: var(--green-dark);
  font-family: system-ui, sans-serif;
  font-size: 0.84rem;
  font-weight: 700;
  box-shadow: var(--shadow-sm);
}

.summary-card,
.ai-summary-panel {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(215, 230, 216, 0.95);
  border-radius: 26px;
  box-shadow: var(--shadow-md);
}

.summary-card {
  margin-top: 2rem;
  padding: 2rem;
}

.summary-intro,
.summary-point p,
.ai-summary-point p,
.summary-footer,
.ai-summary-footer {
  margin: 0;
  color: var(--text-muted);
  font-family: system-ui, sans-serif;
  line-height: 1.8;
}

.summary-intro {
  margin-top: 0.9rem;
  font-size: 1rem;
}

.summary-points,
.ai-summary-points {
  display: grid;
  gap: 0.9rem;
  margin-top: 1.35rem;
}

.summary-points {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.summary-point,
.ai-summary-point {
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
  padding: 1rem 1.05rem;
  background: rgba(238, 246, 239, 0.65);
  border: 1px solid rgba(215, 230, 216, 0.95);
  border-radius: 18px;
}

.summary-point-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.2rem;
  height: 1.2rem;
  color: var(--green);
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.summary-point-icon svg {
  width: 100%;
  height: 100%;
}

.summary-footer,
.ai-summary-footer {
  margin-top: 1.2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--green-line);
  font-size: 0.94rem;
}

.ai-summary-fab {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  z-index: 2500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-height: 54px;
  padding: 0.7rem 1rem 0.7rem 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.96);
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, #2b7a4f, var(--green-dark));
  color: #fff;
  box-shadow: 0 18px 36px rgba(18, 54, 34, 0.26);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.ai-summary-fab:hover {
  transform: translateY(-2px);
  box-shadow: 0 24px 40px rgba(18, 54, 34, 0.32);
}

.ai-summary-fab.active {
  background: radial-gradient(circle at 30% 30%, #327f55, #183f29);
}

.ai-summary-fab .tool-icon {
  width: 1.1rem;
  height: 1.1rem;
}

.ai-summary-fab-label {
  font-family: system-ui, sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.ai-summary-panel {
  position: fixed;
  right: 1.4rem;
  bottom: 5.8rem;
  top: 5.5rem;
  z-index: 2499;
  width: min(400px, calc(100vw - 2rem));
  max-height: calc(100vh - 11.8rem);
  overflow: hidden;
}

.ai-summary-panel.maximized {
  width: min(640px, calc(100vw - 2rem));
}

.ai-summary-panel.minimized {
  width: min(360px, calc(100vw - 2rem));
}

.ai-summary-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.2rem 1.2rem 1rem;
  border-bottom: 1px solid var(--green-line);
}

.ai-summary-header h3 {
  margin: 0.35rem 0 0;
  color: var(--green-dark);
  font-size: 1.35rem;
  line-height: 1.2;
  font-style: italic;
  font-weight: 500;
}

.ai-summary-controls {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.ai-summary-control {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--green-line);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.96);
  color: var(--green-dark);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.ai-summary-control:hover {
  background: var(--green-soft);
  transform: translateY(-1px);
}

.ai-summary-control--close {
  color: var(--danger);
}

.ai-summary-control svg {
  width: 18px;
  height: 18px;
}

.ai-summary-body {
  padding: 1.2rem;
  max-height: calc(100vh - 14rem);
  overflow: auto;
}

@media (hover: hover) and (pointer: fine) {
  .hover-lift {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
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

  .hero {
    padding: 2.75rem;
    gap: 2rem;
  }

  .hero-visual {
    min-height: 420px;
  }

  .ai-summary-panel.maximized {
    width: min(560px, calc(100vw - 2rem));
  }
}

@media (max-width: 768px) {
  .main-container {
    padding: 0 1.2rem 3.5rem;
  }

  .hero {
    padding: 2rem 1.7rem;
    margin-top: 1rem;
    border-radius: 28px;
  }

  .hero-title {
    max-width: none;
    font-size: 2.95rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-proof {
    justify-content: flex-start;
  }

  .hero-btn-primary,
  .hero-btn-secondary,
  .download-btn {
    width: 100%;
  }

  .section-tools {
    gap: 0.6rem;
  }

  .section-tool-btn,
  .font-controls {
    width: auto;
    max-width: 100%;
  }

  .font-controls {
    justify-content: center;
    flex-wrap: wrap;
  }

  .summary-card {
    padding: 1.45rem;
  }

  .summary-points {
    grid-template-columns: 1fr;
  }

  .ai-summary-fab {
    right: 1rem;
    left: auto;
    bottom: 1rem;
    min-height: 50px;
    padding: 0.65rem 0.9rem 0.65rem 0.8rem;
  }

  .ai-summary-panel,
  .ai-summary-panel.maximized,
  .ai-summary-panel.minimized {
    right: 1rem;
    left: 1rem;
    top: 5rem;
    bottom: 5.6rem;
    width: auto;
    max-height: none;
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

  .hero {
    padding: 1.35rem;
  }

  .reference-list {
    grid-template-columns: 1fr;
  }

  .summary-pill {
    width: 100%;
    justify-content: center;
  }

  .section-tool-btn {
    min-height: 42px;
    padding-inline: 0.85rem;
  }

  .font-actions {
    gap: 0.5rem;
  }

  .font-btn {
    min-width: 42px;
    min-height: 42px;
  }

  .ai-summary-header {
    flex-direction: column;
  }

  .ai-summary-controls {
    width: 100%;
    justify-content: flex-end;
  }

  .hero-visual {
    min-height: 360px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fade-in-section,
  .fade-in-section.visible,
  .section-tool-btn,
  .font-btn,
  .hero-btn-primary,
  .hero-btn-secondary,
  .download-btn,
  .ai-summary-fab,
  .ai-summary-control {
    transition: none !important;
    transform: none !important;
  }
}

@media print {
  .pg {
    background: #fff;
  }

  .main-container {
    max-width: none;
    padding: 0;
  }

  .main-container > * {
    display: none !important;
  }

  .main-container > .sec.print-target {
    display: block !important;
    padding: 0 !important;
    border: 0 !important;
  }

  .fade-in-section,
  .fade-in-section.visible {
    opacity: 1 !important;
    transform: none !important;
  }

  .sec.print-target .section-tools,
  .sec.print-target .sec-image,
  .sec.print-target .image-credit,
  .sec.print-target .image-overlay,
  .ai-summary-fab,
  .ai-summary-panel {
    display: none !important;
  }

  .sec.print-target .sec-header-with-image {
    display: block;
  }

  .sec.print-target .card,
  .sec.print-target .type-card,
  .sec.print-target .day-card,
  .sec.print-target .rules-card,
  .sec.print-target .resource-card,
  .sec.print-target .conclusion,
  .sec.print-target .farewell,
  .sec.print-target .warning-box,
  .sec.print-target .disclaimer-box {
    box-shadow: none;
    background: #fff;
    border-color: #d9d9d9;
  }
}
</style>
