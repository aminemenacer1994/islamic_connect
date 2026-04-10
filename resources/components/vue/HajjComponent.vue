<template>
  <div class="pg" :class="{ 'is-dark': isDarkMode }">
    <div class="main-container">
      <header class="hero fade-in-section">
        <div class="hero-shell">
          <div class="hero-copy hero-copy--full">
            <div class="hero-copy-inner">
              <div class="hero-heading-block">
                <div class="hero-topline">
                  <span class="hero-kicker">{{ hero.kicker }}</span>
                  <span class="hero-search-meta">Source-led guide</span>
                </div>
                <h1 class="hero-title">{{ hero.title }}</h1>
                <p class="hero-subtitle">{{ hero.subtitle }}</p>
                <div class="hero-proof" aria-label="Key references">
                  <span v-for="pill in hero.proofPills" :key="pill" class="hero-proof-pill">{{ pill }}</span>
                </div>
              </div>

              <div class="hero-actions">
                <button type="button" class="hero-btn-primary" @click="scrollToSection(hero.primaryButton.target)">{{ hero.primaryButton.label }}</button>
                <button type="button" class="hero-btn-secondary" @click="scrollToSection(hero.secondaryButton.target)">{{ hero.secondaryButton.label }}</button>
              </div>

              <div class="hero-tools-panel">
                <div class="hero-panel-head">
                  <div>
                    <span class="hero-search-kicker">Search the guide</span>
                    <p class="hero-panel-copy">Find a rite, rule, or health topic and jump straight to the first relevant section.</p>
                  </div>
                  <span class="hero-search-meta hero-search-meta--live">{{ searchMatchLabel }}</span>
                </div>
                <div class="hero-search-panel">
                  <div class="hero-search-field">
                    <span class="hero-search-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 4a6 6 0 1 0 3.9 10.56l4.27 4.27 1.41-1.41-4.27-4.27A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/></svg>
                    </span>
                    <input
                      v-model.trim="searchQuery"
                      type="search"
                      class="hero-search-input"
                      placeholder="Search rites, health, Ihram, Arafah..."
                      aria-label="Search this guide"
                      @keydown.enter.prevent="focusFirstSearchResult"
                    >
                    <button v-if="searchQuery" type="button" class="hero-search-clear" @click="clearSearch">
                      Clear
                    </button>
                  </div>
                  <div class="hero-search-feedback">
                    <span class="hero-search-hint">Press Enter to jump to the first match.</span>
                    <button
                      v-if="searchFirstMatchSectionId"
                      type="button"
                      class="hero-search-jump-btn"
                      @click="focusFirstSearchResult"
                    >
                      Jump to first result
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            <div class="pdf-card-copy">
              <span class="pdf-label">{{ guide.label }}</span>
              <h3>{{ guide.title }}</h3>
              <p>{{ guide.desc }}</p>
            </div>
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
              <button class="section-tool-btn section-tool-btn--pdf" @click="downloadSectionPdf('basics', sections.basics.title)">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"/></svg></span>
                <span>{{ labels.downloadPdf }}</span>
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
              <button class="section-tool-btn section-tool-btn--pdf" @click="downloadSectionPdf('umrah', sections.umrah.title)">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"/></svg></span>
                <span>{{ labels.downloadPdf }}</span>
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
              <button class="section-tool-btn section-tool-btn--pdf" @click="downloadSectionPdf('hajj', sections.hajj.title)">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"/></svg></span>
                <span>{{ labels.downloadPdf }}</span>
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
              <button class="section-tool-btn section-tool-btn--pdf" @click="downloadSectionPdf('mistakes', sections.mistakes.title)">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"/></svg></span>
                <span>{{ labels.downloadPdf }}</span>
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
              <button class="section-tool-btn section-tool-btn--pdf" @click="downloadSectionPdf('health', sections.health.title)">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"/></svg></span>
                <span>{{ labels.downloadPdf }}</span>
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
              <button class="section-tool-btn section-tool-btn--pdf" @click="downloadSectionPdf('rules', sections.rules.title)">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"/></svg></span>
                <span>{{ labels.downloadPdf }}</span>
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
              <button class="section-tool-btn section-tool-btn--pdf" @click="downloadSectionPdf('spiritual', sections.spiritual.title)">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"/></svg></span>
                <span>{{ labels.downloadPdf }}</span>
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
            <button class="section-tool-btn section-tool-btn--pdf" @click="downloadSectionPdf('resources', sections.resources.title)">
              <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"/></svg></span>
              <span>{{ labels.downloadPdf }}</span>
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
              <button class="section-tool-btn section-tool-btn--pdf" @click="downloadSectionPdf('post-hajj', sections.postHajj.title)">
                <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"/></svg></span>
                <span>{{ labels.downloadPdf }}</span>
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

    <button
      v-if="!isAiSummaryOpen"
      class="ai-summary-fab"
      :aria-label="labels.aiSummaryFab"
      @click="openAiSummary"
    >
      <span class="tool-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.8 1.9 5.3 5.3 1.9-5.3 1.9-1.9 5.3-1.9-5.3-5.3-1.9 5.3-1.9Zm6.2 10.9.9 2.5 2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9Z"/></svg>
      </span>
    </button>

    <aside
      v-else
      class="ai-summary-panel"
      :class="{ 'ai-summary-panel--maximized': isAiSummaryMaximized }"
    >
      <div class="ai-summary-panel-header">
        <div>
          <span class="eyebrow">{{ summarySection.kicker }}</span>
          <h3 class="ai-summary-panel-title">{{ summarySection.title }}</h3>
        </div>
        <div class="ai-summary-panel-actions">
          <button class="ai-summary-panel-btn" :aria-label="isAiSummaryMaximized ? 'Restore AI summary size' : 'Maximize AI summary'" @click="toggleAiSummaryMaximize">
            <svg v-if="!isAiSummaryMaximized" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10v10H7zm2 2v6h6V9z"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor"><path d="M7 10h7V3h3v11H7zm3 4h7v7H10zm-3 0h2v7H2v-7zm11-4h4v4h-2v-2h-2z"/></svg>
          </button>
          <button class="ai-summary-panel-btn ai-summary-panel-btn--close" aria-label="Close AI summary" @click="closeAiSummary">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="m18.3 5.7-1-1L12 10l-5.3-5.3-1 1L11 11l-5.3 5.3 1 1L12 12l5.3 5.3 1-1L13 11z"/></svg>
          </button>
        </div>
      </div>

      <div class="ai-summary-panel-body">
        <div class="summary-pills ai-summary-panel-pills">
          <span class="summary-pill">
            <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 4h14v2H5Zm0 7h14v2H5Zm0 7h10v2H5Z"/></svg></span>
            {{ summaryMetrics.words }} words
          </span>
          <span class="summary-pill">
            <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm1 11.4 4.1 2.4-1 1.7L11 13V6h2Z"/></svg></span>
            {{ summaryMetrics.readTime }} min read
          </span>
        </div>

        <div class="summary-card ai-summary-card">
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
      </div>
    </aside>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { jsPDF } from 'jspdf';
import hajjUmrahContent from '../../data/hajj-umrah-content.json';

const content = hajjUmrahContent;
const labels = {
  downloadPdf: 'Download PDF',
  keyReferences: 'Key references',
  imageCreditPrefix: 'Image source:',
  faqTitle: 'Common questions',
  shareWhatsApp: 'WhatsApp',
  copyToClipboard: 'Copy',
  copied: 'Copied',
  printSection: 'Print',
  aiSummaryFab: 'AI Summary',
  textSize: 'Text size',
  decreaseTextSize: 'A-',
  increaseTextSize: 'A+',
  wordCount: 'Word count',
  readTime: 'Read time',
  ...(content.labels || {})
};
const hero = {
  kicker: 'Hajj & Umrah Guide',
  title: 'The rites and references you actually need.',
  subtitle: '',
  proofPills: [],
  primaryButton: { label: 'Open guide', target: 'guides' },
  secondaryButton: { label: 'Start with Umrah', target: 'umrah' },
  trustItems: [],
  ...(content.hero || {})
};
const guidesSection = {
  eyebrow: 'Downloads',
  title: 'PDF guides',
  description: '',
  ...(content.guidesSection || {})
};
const sections = {
  basics: { eyebrow: '', title: 'Foundations', description: '' },
  umrah: { eyebrow: '', title: 'Umrah', description: '', conclusion: { title: '', text: '' } },
  hajj: { eyebrow: '', title: 'Hajj', description: '', farewell: { arabic: '', title: '', text: '', reference: '' } },
  mistakes: { eyebrow: '', title: 'Common mistakes', description: '' },
  health: { eyebrow: '', title: 'Health and readiness', description: '', note: '' },
  rules: { eyebrow: '', title: 'Ihram rules', description: '', permissibleTitle: '', prohibitedTitle: '', note: '' },
  spiritual: { eyebrow: '', title: 'Spiritual preparation', description: '' },
  shorts: { eyebrow: 'Shorts', title: 'Educational shorts', description: '' },
  resources: { eyebrow: '', title: 'Resources', description: '' },
  postHajj: { eyebrow: '', title: 'After Hajj', description: '' },
  summary: { eyebrow: '', title: '', description: '' },
  ...(content.sections || {})
};
const defaultSectionImage = {
  src: 'https://images.pexels.com/photos/13459175/pexels-photo-13459175.jpeg?cs=srgb&dl=pexels-busrasahjn-13459175.jpg&fm=jpg',
  alt: 'A mosque and courtyard scene suited to worship and reflection',
  credit: 'Pexels'
};
const sectionImages = {
  basics: defaultSectionImage,
  umrah: defaultSectionImage,
  hajj: defaultSectionImage,
  mistakes: defaultSectionImage,
  health: defaultSectionImage,
  rules: defaultSectionImage,
  spiritual: defaultSectionImage,
  postHajj: defaultSectionImage,
  ...(content.sectionImages || {})
};
const pdfGuides = content.pdfGuides || [];
const basicsCards = content.basicsCards || [];
const hajjTypes = content.hajjTypes || [];
const umrahSteps = content.umrahSteps || [];
const hajjDays = content.hajjDays || [];
const commonMistakes = content.commonMistakes || [];
const healthReadiness = content.healthReadiness || [];
const rules = {
  permissible: [],
  prohibited: [],
  ...(content.rules || {})
};
const spiritualPrep = content.spiritualPrep || [];
const shorts = content.shorts || [];
const resources = content.resources || [];
const faqs = content.faqs || [];
const postHajjSteps = content.postHajjSteps || [];
const summarySection = {
  kicker: 'Summary',
  title: 'The page in one clear recap',
  intro: '',
  points: [],
  footer: '',
  ...(content.summarySection || {})
};
const sectionReferences = {
  basics: [],
  umrah: [],
  hajj: [],
  mistakes: [],
  health: [],
  rules: [],
  spiritual: [],
  ...(content.sectionReferences || {})
};
const disclaimer = {
  title: '',
  text: '',
  items: [],
  warningTitle: '',
  warningText: '',
  ...(content.disclaimer || {})
};
const closing = {
  arabic: '',
  translation: '',
  reference: '',
  message: '',
  ...(content.closing || {})
};

const DEFAULT_SECTION_FONT_SCALE = 1;
const MIN_SECTION_FONT_SCALE = 0.9;
const MAX_SECTION_FONT_SCALE = 1.2;
const SECTION_FONT_STEP = 0.08;
const sectionIds = ['basics', 'umrah', 'hajj', 'mistakes', 'health', 'rules', 'spiritual', 'resources', 'post-hajj'];
const SEARCH_SKIP_SELECTOR = '.hero, .section-tools, .ai-summary-panel, .ai-summary-fab, button, a, input, textarea, select, svg, mark[data-search-highlight], script, style, noscript';

const activeFaq = ref(0);
const copiedSectionId = ref(null);
const printSectionId = ref(null);
const isDarkMode = ref(false);
const isAiSummaryOpen = ref(false);
const isAiSummaryMaximized = ref(false);
const searchQuery = ref('');
const searchMatchCount = ref(0);
const searchMatchedSectionIds = ref([]);
const searchFirstMatchSectionId = ref('');
const sectionFontScales = ref(
  sectionIds.reduce((accumulator, id) => {
    accumulator[id] = DEFAULT_SECTION_FONT_SCALE;
    return accumulator;
  }, {})
);

let copyFeedbackTimeout;
let themeObserver;

const searchableSectionIds = ['guides', 'basics', 'spiritual', 'umrah', 'hajj', 'rules', 'health', 'mistakes', 'resources', 'post-hajj', 'shorts'];

const searchMatchLabel = computed(() => {
  if (!searchQuery.value) {
    return 'Type one or more keywords to search the guide';
  }

  if (!searchMatchCount.value) {
    return 'No matches found';
  }

  const sectionCount = searchMatchedSectionIds.value.length;
  const sectionLabel = sectionCount ? ` across ${sectionCount} section${sectionCount === 1 ? '' : 's'}` : '';
  return `${searchMatchCount.value} match${searchMatchCount.value === 1 ? '' : 'es'} highlighted${sectionLabel}`;
});

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

const clearSearchHighlights = (root) => {
  if (!root) {
    return;
  }

  root.querySelectorAll('mark[data-search-highlight]').forEach((mark) => {
    const parent = mark.parentNode;
    if (!parent) {
      return;
    }

    parent.replaceChild(document.createTextNode(mark.textContent ?? ''), mark);
    parent.normalize();
  });
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const applySearchHighlights = () => {
  const root = document.querySelector('.main-container');
  if (!root) {
    searchMatchCount.value = 0;
    searchMatchedSectionIds.value = [];
    searchFirstMatchSectionId.value = '';
    return;
  }

  clearSearchHighlights(root);

  const term = searchQuery.value.trim();
  if (!term) {
    searchMatchCount.value = 0;
    searchMatchedSectionIds.value = [];
    searchFirstMatchSectionId.value = '';
    return;
  }

  const terms = Array.from(new Set(
    term
      .split(/\s+/)
      .map((item) => item.trim())
      .filter((item) => item.length >= 2)
  ));

  if (!terms.length) {
    searchMatchCount.value = 0;
    searchMatchedSectionIds.value = [];
    searchFirstMatchSectionId.value = '';
    return;
  }

  const pattern = new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'gi');
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;

      if (!parent || !node.textContent?.trim()) {
        return NodeFilter.FILTER_REJECT;
      }

      if (parent.closest(SEARCH_SKIP_SELECTOR)) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes = [];
  let currentNode = walker.nextNode();

  while (currentNode) {
    textNodes.push(currentNode);
    currentNode = walker.nextNode();
  }

  let matches = 0;
  const matchedSections = new Set();
  let firstMatchSectionId = '';

  textNodes.forEach((node) => {
    const text = node.textContent ?? '';
    if (!pattern.test(text)) {
      pattern.lastIndex = 0;
      return;
    }

    pattern.lastIndex = 0;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    text.replace(pattern, (match, _group, offset) => {
      if (offset > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)));
      }

      const mark = document.createElement('mark');
      mark.dataset.searchHighlight = 'true';
      mark.textContent = match;
      fragment.appendChild(mark);
      matches += 1;

      const section = node.parentElement?.closest('section[id]');
      const sectionId = section?.id;
      if (sectionId) {
        matchedSections.add(sectionId);
        if (!firstMatchSectionId) {
          firstMatchSectionId = sectionId;
        }
      }

      lastIndex = offset + match.length;

      return match;
    });

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    node.parentNode?.replaceChild(fragment, node);
  });

  searchMatchCount.value = matches;
  searchMatchedSectionIds.value = searchableSectionIds.filter((id) => matchedSections.has(id));
  searchFirstMatchSectionId.value = firstMatchSectionId;
};

const clearSearch = () => {
  searchQuery.value = '';
};

const focusFirstSearchResult = () => {
  if (!searchFirstMatchSectionId.value) {
    return;
  }

  scrollToSection(searchFirstMatchSectionId.value);
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

const slugifyFileName = (value) => value
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .replace(/-{2,}/g, '-');

const buildSectionText = (sectionId) => {
  const section = getSectionElement(sectionId);
  if (!section) {
    return '';
  }

  const clone = section.cloneNode(true);
  clone.querySelectorAll('[data-section-tools], .image-credit').forEach((element) => element.remove());

  return clone.innerText.replace(/\n{3,}/g, '\n\n').trim();
};

const normalizePdfText = (value) => value.replace(/\s+/g, ' ').trim();

const buildSectionPdfBlocks = (sectionId) => {
  const section = getSectionElement(sectionId);
  if (!section) {
    return [];
  }

  const clone = section.cloneNode(true);
  clone.querySelectorAll('[data-section-tools], .image-credit, .sec-head, .eyebrow, .sec-title, .sec-desc').forEach((element) => {
    element.remove();
  });

  const blocks = [];
  const pushBlock = (kind, lines) => {
    const text = (Array.isArray(lines) ? lines : [lines])
      .map((line) => normalizePdfText(String(line ?? '')))
      .filter(Boolean)
      .join('\n');

    if (text) {
      blocks.push({ kind, text });
    }
  };

  const readText = (element, selector) => normalizePdfText(selector ? (element.querySelector(selector)?.textContent ?? '') : (element?.textContent ?? ''));

  const addCardCollection = (container, noteLabel = 'Note') => {
    container.querySelectorAll('article').forEach((article) => {
      const number = readText(article, '.card-num, .tl-num, .day-date');
      const title = readText(article, 'h3');
      const body = readText(article, 'p');
      const note = readText(article, '.card-note, .type-note, .day-reminder, .tl-tip, .section-note, .resource-url');
      const reference = readText(article, '.tl-ref, .day-ref');

      pushBlock('body', [
        number && title ? `${number}. ${title}` : (title || number),
        body,
        note ? `${noteLabel}: ${note}` : '',
        reference ? `Reference: ${reference}` : ''
      ]);
    });
  };

  Array.from(clone.children).forEach((child) => {
    if (
      child.classList.contains('sec-header-with-image')
      || child.matches('[data-section-tools], .sec-image')
    ) {
      return;
    }

    if (child.classList.contains('cards-grid')) {
      addCardCollection(child);
      return;
    }

    if (child.classList.contains('types-grid')) {
      addCardCollection(child);
      return;
    }

    if (child.classList.contains('tl')) {
      addCardCollection(child, 'Reminder');
      return;
    }

    if (child.classList.contains('days-grid')) {
      addCardCollection(child, 'Reminder');
      return;
    }

    if (child.classList.contains('rules-grid')) {
      child.querySelectorAll('.rules-card').forEach((card) => {
        const heading = readText(card, '.rules-hdr');
        const items = Array.from(card.querySelectorAll('.rules-list li')).map((item) => `- ${readText(item)}`);
        pushBlock('body', [heading, ...items]);
      });
      return;
    }

    if (child.classList.contains('resource-grid')) {
      child.querySelectorAll('.resource-card').forEach((card) => {
        pushBlock('body', [
          readText(card, '.resource-label'),
          readText(card, 'h3'),
          readText(card, 'p'),
          readText(card, '.resource-url')
        ]);
      });
      return;
    }

    if (child.classList.contains('reference-panel')) {
      const heading = readText(child, 'h4');
      if (heading) {
        pushBlock('heading', heading);
      }
      child.querySelectorAll('.reference-item').forEach((item) => {
        pushBlock('reference', [
          readText(item, 'strong'),
          readText(item, 'span')
        ]);
      });
      return;
    }

    if (child.classList.contains('faq-wrap')) {
      const heading = readText(child, 'h4');
      if (heading) {
        pushBlock('heading', heading);
      }
      child.querySelectorAll('.faq-item').forEach((item) => {
        pushBlock('body', [
          `Q: ${readText(item, '.faq-q span')}`,
          `A: ${readText(item, '.faq-a p')}`,
          readText(item, '.faq-ref') ? `Reference: ${readText(item, '.faq-ref')}` : ''
        ]);
      });
      return;
    }

    if (child.classList.contains('conclusion') || child.classList.contains('farewell') || child.classList.contains('disclaimer-box') || child.classList.contains('warning-box')) {
      pushBlock('body', [
        readText(child, 'h4'),
        readText(child, '.farewell-arabic'),
        readText(child, '.ref-text, p'),
        ...Array.from(child.querySelectorAll('li')).map((item) => `- ${readText(item)}`),
        readText(child, 'cite, .closing-ref')
      ]);
      return;
    }

    if (child.classList.contains('section-note')) {
      pushBlock('note', child.textContent ?? '');
      return;
    }

    const fallbackText = normalizePdfText(child.textContent ?? '');
    if (fallbackText) {
      pushBlock('body', fallbackText);
    }
  });

  return blocks;
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

const downloadSectionPdf = (sectionId, title) => {
  const bodyBlocks = buildSectionPdfBlocks(sectionId);
  if (!bodyBlocks.length) {
    return;
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 52;
  const contentWidth = pageWidth - (margin * 2);
  const pageInnerBottom = pageHeight - margin;
  const baseLineHeight = 18;
  let cursorY = margin;
  const baseUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
  const sectionUrl = baseUrl ? `${baseUrl}#${sectionId}` : '';

  const ensureSpace = (heightNeeded = baseLineHeight) => {
    if (cursorY + heightNeeded <= pageInnerBottom) {
      return;
    }

    pdf.addPage();
    cursorY = margin;
  };

  const addWrappedText = (content, options = {}) => {
    const {
      fontSize = 12,
      fontStyle = 'normal',
      color = [28, 40, 34],
      gapAfter = 14,
      lineHeight = baseLineHeight
    } = options;

    pdf.setFont('helvetica', fontStyle);
    pdf.setFontSize(fontSize);
    pdf.setTextColor(...color);
    pdf.setLineHeightFactor(lineHeight / fontSize);

    const lines = pdf.splitTextToSize(content, contentWidth);
    const blockHeight = lines.length * lineHeight;

    ensureSpace(blockHeight + gapAfter);

    pdf.text(lines, margin, cursorY);
    cursorY += blockHeight + gapAfter;
  };

  pdf.setDrawColor(23, 102, 95);
  pdf.setFillColor(237, 246, 245);
  pdf.roundedRect(margin, cursorY, contentWidth, 56, 14, 14, 'FD');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(23, 102, 95);
  pdf.text('Islamic Connect', margin + 16, cursorY + 20);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9.5);
  pdf.setTextColor(93, 109, 98);
  pdf.text('Hajj & Umrah Guide', margin + 16, cursorY + 37);
  cursorY += 76;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(22);
  pdf.setTextColor(15, 73, 68);
  const titleLines = pdf.splitTextToSize(title, contentWidth);
  ensureSpace(titleLines.length * 26 + 12);
  pdf.text(titleLines, margin, cursorY);
  cursorY += (titleLines.length * 26) + 10;

  const description = getSectionDescription(sectionId);
  if (description) {
    addWrappedText(description, {
      fontSize: 11.5,
      color: [93, 109, 98],
      gapAfter: 18,
      lineHeight: 17
    });
  }

  pdf.setDrawColor(210, 227, 223);
  pdf.line(margin, cursorY, margin + contentWidth, cursorY);
  cursorY += 18;

  bodyBlocks.forEach((block) => {
    if (block.kind === 'heading') {
      addWrappedText(block.text, {
        fontSize: 13,
        fontStyle: 'bold',
        color: [15, 73, 68],
        gapAfter: 10,
        lineHeight: 17
      });
      return;
    }

    if (block.kind === 'reference') {
      addWrappedText(block.text, {
        fontSize: 10.5,
        color: [93, 109, 98],
        gapAfter: 12,
        lineHeight: 15
      });
      return;
    }

    if (block.kind === 'note') {
      addWrappedText(block.text, {
        fontSize: 11,
        color: [93, 109, 98],
        gapAfter: 14,
        lineHeight: 16
      });
      return;
    }

    addWrappedText(block.text, {
      fontSize: 11.5,
      color: [28, 40, 34],
      gapAfter: 14,
      lineHeight: 17
    });
  });

  if (sectionUrl) {
    cursorY += 4;
    ensureSpace(30);
    pdf.setDrawColor(210, 227, 223);
    pdf.line(margin, cursorY, margin + contentWidth, cursorY);
    cursorY += 18;
    addWrappedText(`Section link: ${sectionUrl}`, {
      fontSize: 10,
      color: [93, 109, 98],
      gapAfter: 0,
      lineHeight: 14
    });
  }

  const pageCount = pdf.getNumberOfPages();
  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
    pdf.setPage(pageNumber);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9.5);
    pdf.setTextColor(120, 132, 125);
    pdf.text(`${title}  •  Page ${pageNumber} of ${pageCount}`, margin, pageHeight - 24);
  }

  pdf.save(`${slugifyFileName(title)}.pdf`);
};

const openAiSummary = () => {
  isAiSummaryOpen.value = true;
};

const closeAiSummary = () => {
  isAiSummaryOpen.value = false;
  isAiSummaryMaximized.value = false;
};

const toggleAiSummaryMaximize = () => {
  isAiSummaryMaximized.value = !isAiSummaryMaximized.value;
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

const syncDarkMode = () => {
  const rootTheme = document.documentElement.getAttribute('data-bs-theme');
  isDarkMode.value = document.body?.classList.contains('dark-mode')
    || document.documentElement.classList.contains('dark-mode')
    || rootTheme === 'dark';
};

let sectionObserver;

onMounted(() => {
  syncDarkMode();
  window.addEventListener('afterprint', clearPrintTarget);

  themeObserver = new MutationObserver(() => {
    syncDarkMode();
  });

  if (document.body) {
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-bs-theme', 'data-theme'] });
  }

  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-bs-theme', 'data-theme'] });

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

watch(searchQuery, async () => {
  await nextTick();
  applySearchHighlights();
});

watch(activeFaq, async () => {
  if (!searchQuery.value) {
    return;
  }

  await nextTick();
  applySearchHighlights();
});

onBeforeUnmount(() => {
  window.removeEventListener('afterprint', clearPrintTarget);

  clearSearchHighlights(document.querySelector('.main-container'));

  if (themeObserver) {
    themeObserver.disconnect();
  }

  if (sectionObserver) {
    sectionObserver.disconnect();
  }

  window.clearTimeout(copyFeedbackTimeout);
});
</script>

<style scoped>
.pg {
  --green: #17665f;
  --green-dark: #0f4944;
  --green-soft: #edf6f5;
  --green-line: #d2e3df;
  --paper: #fffdf9;
  --cream: #f6f0e7;
  --sand: #e9dfd0;
  --gold: #9a7338;
  --text: #1c2822;
  --text-muted: #5d6d62;
  --text-soft: #77857c;
  --danger: #8a4c33;
  --danger-soft: #fbf2ee;
  --hero-panel-bg: rgba(255, 255, 255, 0.74);
  --hero-panel-border: rgba(18, 54, 34, 0.08);
  --hero-input-bg: rgba(255, 255, 255, 0.92);
  --hero-input-border: rgba(18, 54, 34, 0.12);
  --hero-pill-bg: rgba(255, 255, 255, 0.88);
  --hero-highlight-bg: #f4e39b;
  --hero-highlight-text: #233026;
  --page-gutter: clamp(1rem, 2.4vw, 2.8rem);
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

.pg.is-dark {
  --green: #4a9b92;
  --green-dark: #f2f7f4;
  --green-soft: rgba(74, 155, 146, 0.16);
  --green-line: rgba(255, 255, 255, 0.12);
  --paper: #232529;
  --cream: #1c1f23;
  --sand: #2b3035;
  --gold: #d0b27a;
  --text: #f2f7f4;
  --text-muted: #c6d0ca;
  --text-soft: #97a59e;
  --danger: #f0b297;
  --danger-soft: rgba(138, 76, 51, 0.16);
  --hero-panel-bg: rgba(255, 255, 255, 0.04);
  --hero-panel-border: rgba(255, 255, 255, 0.1);
  --hero-input-bg: rgba(16, 19, 22, 0.86);
  --hero-input-border: rgba(255, 255, 255, 0.12);
  --hero-pill-bg: rgba(255, 255, 255, 0.05);
  --hero-highlight-bg: rgba(208, 178, 122, 0.34);
  --hero-highlight-text: #fff8e8;
  --shadow-sm: 0 10px 24px rgba(0, 0, 0, 0.24);
  --shadow-md: 0 24px 54px rgba(0, 0, 0, 0.34);
  background: linear-gradient(180deg, var(--paper) 0%, var(--cream) 100%);
}

.pg.is-dark .hero,
.pg.is-dark .card,
.pg.is-dark .type-card,
.pg.is-dark .day-card,
.pg.is-dark .rules-card,
.pg.is-dark .resource-card,
.pg.is-dark .pdf-card,
.pg.is-dark .short-card,
.pg.is-dark .conclusion,
.pg.is-dark .farewell,
.pg.is-dark .disclaimer-box,
.pg.is-dark .warning-box,
.pg.is-dark .summary-card,
.pg.is-dark .ai-summary-panel {
  background: rgba(32, 36, 40, 0.92);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-md);
}

.pg.is-dark .hero {
  background:
    radial-gradient(circle at top left, rgba(105, 198, 162, 0.1), transparent 34%),
    radial-gradient(circle at 82% 18%, rgba(208, 178, 122, 0.08), transparent 24%),
    linear-gradient(135deg, rgba(34, 38, 43, 0.98), rgba(27, 30, 34, 0.94));
}

.pg.is-dark .hero-copy-inner {
  background: none;
  box-shadow: none;
}

.pg.is-dark .hero-tools-panel {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.22);
}

.pg.is-dark .hero-search-field {
  background: rgba(15, 18, 21, 0.9);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
}

.pg.is-dark .hero-jump-pill,
.pg.is-dark .hero-search-clear,
.pg.is-dark .hero-search-jump-btn,
.pg.is-dark .hero-search-result-pill,
.pg.is-dark .hero-btn-secondary {
  background: rgba(255, 255, 255, 0.06);
  border-color: transparent;
  color: var(--text);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.16);
}

.pg.is-dark .hero-jump-pill:hover,
.pg.is-dark .hero-jump-pill:focus,
.pg.is-dark .hero-search-clear:hover,
.pg.is-dark .hero-search-clear:focus {
  background: rgba(105, 198, 162, 0.12);
}

.pg.is-dark .hero-proof-pill,
.pg.is-dark .trust-item,
.pg.is-dark .reference-item,
.pg.is-dark .resource-url,
.pg.is-dark .tl-ref,
.pg.is-dark .faq-ref,
.pg.is-dark .day-ref,
.pg.is-dark .card-note,
.pg.is-dark .type-note,
.pg.is-dark .section-note,
.pg.is-dark .tl-tip,
.pg.is-dark .day-reminder,
.pg.is-dark .summary-point,
.pg.is-dark .summary-pill {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
}

.pg.is-dark .hero-btn-secondary,
.pg.is-dark .section-tool-btn,
.pg.is-dark .font-btn,
.pg.is-dark .ai-summary-panel-btn {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
  color: var(--text);
}

.pg.is-dark .section-tool-btn--copy {
  color: #8fc5ff;
  border-color: rgba(143, 197, 255, 0.28);
  background: rgba(143, 197, 255, 0.08);
}

.pg.is-dark .section-tool-btn--whatsapp {
  color: #7fc6bc;
  border-color: rgba(127, 198, 188, 0.28);
  background: rgba(127, 198, 188, 0.1);
}

.pg.is-dark .section-tool-btn--print {
  color: #f2f7f4;
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.05);
}

.pg.is-dark .section-tool-btn--pdf {
  color: #ffaba3;
  border-color: rgba(255, 171, 163, 0.26);
  background: rgba(180, 35, 24, 0.16);
}

.pg.is-dark .day-head {
  background: rgba(105, 198, 162, 0.08);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.pg.is-dark .rules-hdr.pos {
  background: rgba(105, 198, 162, 0.12);
}

.pg.is-dark .rules-hdr.neg {
  background: rgba(240, 178, 151, 0.14);
}

.pg.is-dark .image-credit,
.pg.is-dark .ai-summary-fab {
  border-color: rgba(255, 255, 255, 0.12);
}

.pg.is-dark .faq-item,
.pg.is-dark .reference-panel,
.pg.is-dark .summary-footer {
  border-color: rgba(255, 255, 255, 0.1);
}

.pg.is-dark .ai-summary-panel {
  box-shadow:
    0 28px 64px rgba(0, 0, 0, 0.42),
    0 0 0 1px rgba(255, 255, 255, 0.06),
    0 0 0 10px rgba(0, 0, 0, 0.18);
}

.main-container {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 var(--page-gutter) 5rem;
  display: flex;
  flex-direction: column;
}

.hero {
  order: 1;
}

.main-container > #basics {
  order: 2;
}

.main-container > #guides {
  order: 3;
}

.main-container > #spiritual {
  order: 4;
}

.main-container > #umrah {
  order: 5;
}

.main-container > #hajj {
  order: 6;
}

.main-container > #rules {
  order: 7;
}

.main-container > #health {
  order: 8;
}

.main-container > #mistakes {
  order: 9;
}

.main-container > #resources {
  order: 10;
}

.main-container > #post-hajj {
  order: 11;
}

.main-container > #shorts {
  order: 12;
}

.main-container > .disclaimer-section {
  order: 13;
}

.main-container > .closing {
  order: 14;
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
  position: relative;
  width: calc(100vw - (var(--page-gutter) * 2));
  margin-left: calc(50% - 50vw + var(--page-gutter));
  margin-right: calc(50% - 50vw + var(--page-gutter));
  padding: 0;
  margin-top: 0;
  background:
    radial-gradient(circle at top left, rgba(233, 223, 208, 0.44), transparent 32%),
    radial-gradient(circle at 82% 18%, rgba(27, 91, 57, 0.1), transparent 26%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(246, 240, 231, 0.95));
  border: 0;
  border-radius: 42px;
  box-shadow:
    0 24px 56px rgba(18, 54, 34, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.5);
  scroll-margin-top: 7rem;
  overflow: hidden;
}

.hero-shell {
  display: block;
  padding: clamp(1.7rem, 3vw, 3rem) clamp(1rem, 2vw, 1.6rem);
}

.hero-copy {
  width: 100%;
  position: relative;
  z-index: 1;
}

.hero-copy--full {
  max-width: 1120px;
  margin: 0 auto;
}

.hero-copy-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: clamp(1.15rem, 1.8vw, 1.9rem) 0;
  border-radius: 0;
  background: none;
  border: 0;
  backdrop-filter: none;
  box-shadow: none;
}

.hero-heading-block {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}

.hero-arabic {
  margin: 0 0 0.55rem;
  color: var(--green-dark);
  font-size: clamp(1.4rem, 2vw, 1.82rem);
  line-height: 1.45;
}

.hero-topline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.9rem;
}

.hero-kicker,
.hero-search-kicker,
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
  margin-bottom: 0;
}

.hero-search-meta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  border: 0;
  color: var(--green-dark);
  font-family: system-ui, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 10px 20px rgba(18, 54, 34, 0.08);
}

.hero-search-meta--live {
  border: 1px solid rgba(18, 54, 34, 0.08);
  background: rgba(255, 255, 255, 0.92);
}

.hero-title {
  margin: 0;
  color: #123622 !important;
  max-width: none;
  width: 100%;
  font-size: clamp(2.8rem, 4.8vw, 5.6rem);
  line-height: 1;
  letter-spacing: -0.03em;
  font-style: italic;
  font-weight: 500;
  text-wrap: balance;
  text-shadow: none;
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
  max-width: min(72ch, 100%);
  font-size: 1.02rem;
  line-height: 1.8;
  color: var(--text-muted);
  margin: 0.95rem auto 0;
  text-align: center;
}

.hero-proof {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1rem;
}

.hero-proof-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0.42rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(18, 54, 34, 0.08);
  box-shadow: 0 10px 20px rgba(18, 54, 34, 0.06);
  color: var(--green-dark);
  font-family: system-ui, sans-serif;
  font-size: 0.84rem;
  font-weight: 700;
  line-height: 1.2;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 1.25rem;
  justify-content: center;
}

.hero-tools-panel {
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  margin-top: 1.35rem;
  padding: 1.15rem;
  width: 100%;
  max-width: 980px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(18, 54, 34, 0.08);
  border-radius: 24px;
  backdrop-filter: blur(14px);
  box-shadow: 0 20px 38px rgba(18, 54, 34, 0.08);
}

.hero-search-panel,
.hero-jump-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.hero-panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  text-align: left;
}

.hero-panel-copy {
  margin: 0.25rem 0 0;
  color: var(--text-muted);
  font-family: system-ui, sans-serif;
  font-size: 0.9rem;
  line-height: 1.6;
}

.hero-search-field {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 56px;
  padding: 0.65rem 0.8rem;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(18, 54, 34, 0.08);
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(18, 54, 34, 0.05);
}

.hero-search-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--green);
  flex-shrink: 0;
}

.hero-search-icon svg {
  width: 20px;
  height: 20px;
}

.hero-search-input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  padding: 0;
  background: transparent;
  color: var(--text);
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.5;
}

.hero-search-input::placeholder {
  color: var(--text-soft);
}

.hero-search-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-height: 34px;
  padding: 0.35rem 0.72rem;
  border: 0;
  border-radius: 999px;
  background: rgba(23, 102, 95, 0.08);
  color: var(--green-dark);
  font-family: system-ui, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  box-shadow: none;
}

.hero-search-clear:hover,
.hero-search-clear:focus {
  transform: translateY(-1px);
  background: rgba(23, 102, 95, 0.16);
}

.hero-search-feedback {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.hero-search-hint,
.hero-search-status,
.hero-search-results-label {
  color: var(--text-muted);
  font-family: system-ui, sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
}

.hero-search-jump-btn,
.hero-search-result-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0.38rem 0.72rem;
  border: 1px solid rgba(18, 54, 34, 0.1);
  border-radius: 999px;
  background: rgba(23, 102, 95, 0.08);
  color: var(--green-dark);
  font-family: system-ui, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.2;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

.hero-search-jump-btn:hover,
.hero-search-jump-btn:focus,
.hero-search-result-pill:hover,
.hero-search-result-pill:focus {
  transform: translateY(-1px);
  background: rgba(23, 102, 95, 0.16);
}

.hero-search-results {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.hero-search-result-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.hero-jump-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.hero-jump-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0.38rem 0.72rem;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.84);
  color: var(--green-dark);
  font-family: system-ui, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.2;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  box-shadow: 0 10px 18px rgba(18, 54, 34, 0.06);
}

.hero-jump-pill:hover,
.hero-jump-pill:focus {
  transform: translateY(-1px);
  background: var(--green-soft);
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
  min-height: clamp(280px, 54vh, 460px);
  max-height: clamp(280px, 54vh, 460px);
  align-self: stretch;
  border-radius: 34px;
  border: 0;
  box-shadow: 0 22px 40px rgba(18, 54, 34, 0.12);
}

.hero-visual-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0.45rem 0.85rem;
  background: rgba(255, 253, 249, 0.9);
  border: 1px solid rgba(18, 54, 34, 0.08);
  border-radius: 999px;
  color: var(--green-dark);
  font-family: system-ui, sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: 0 12px 24px rgba(18, 54, 34, 0.12);
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

mark[data-search-highlight] {
  padding: 0.06em 0.22em;
  border-radius: 0.32em;
  background: var(--hero-highlight-bg);
  color: var(--hero-highlight-text);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.03);
}

.sec {
  padding: 4.4rem 0;
  scroll-margin-top: 7rem;
}

.sec.alt {
  border-top: 0;
  border-bottom: 0;
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
  min-height: 40px;
  padding: 0.38rem 0.78rem;
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
  color: #17665f;
  border-color: rgba(23, 102, 95, 0.3);
  background: rgba(23, 102, 95, 0.06);
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

.section-tool-btn--pdf {
  color: #b42318;
  border-color: rgba(180, 35, 24, 0.24);
  background: rgba(180, 35, 24, 0.06);
}

.tool-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 0.88rem;
  height: 0.88rem;
  flex-shrink: 0;
}

.tool-icon svg {
  width: 100%;
  height: 100%;
}

.font-controls {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 40px;
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: 0;
  font-family: system-ui, sans-serif;
}

.font-chip {
  display: none;
}

.font-label {
  display: none;
}

.font-actions {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: nowrap;
  min-width: 0;
}

.font-scale {
  display: none;
}

.font-btn {
  min-width: 40px;
  min-height: 40px;
  padding: 0 0.55rem;
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
  align-items: stretch;
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.85rem;
  height: 100%;
}

.pdf-card-copy {
  display: grid;
  gap: 0.9rem;
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
  margin-top: auto;
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
  display: flex;
  flex-direction: column;
}

.short-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: none;
  background: #000;
}

.short-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
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

.summary-card {
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
.summary-footer,
.summary-footer {
  margin: 0;
  color: var(--text-muted);
  font-family: system-ui, sans-serif;
  line-height: 1.8;
}

.summary-intro {
  margin-top: 0.9rem;
  font-size: 1rem;
}

.summary-points {
  display: grid;
  gap: 0.9rem;
  margin-top: 1.35rem;
}

.summary-points {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.summary-point {
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

.summary-footer {
  margin-top: 1.2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--green-line);
  font-size: 0.94rem;
}

.ai-summary-fab {
  position: fixed;
  right: 1.4rem;
  bottom: 1.4rem;
  z-index: 2600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.96);
  border-radius: 18px;
  background: radial-gradient(circle at 30% 30%, #2b837a, var(--green-dark));
  color: #fff;
  box-shadow: 0 18px 36px rgba(18, 54, 34, 0.26);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ai-summary-fab:hover {
  transform: translateY(-2px);
  box-shadow: 0 24px 42px rgba(18, 54, 34, 0.32);
}

.ai-summary-fab .tool-icon {
  width: 1.15rem;
  height: 1.15rem;
}

.ai-summary-panel {
  position: fixed;
  right: 1.4rem;
  bottom: 1.4rem;
  z-index: 2600;
  width: min(430px, calc(100vw - 2.8rem));
  height: min(88vh, 920px);
  max-height: min(88vh, 920px);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.96);
  border-radius: 24px;
  background: rgba(255, 253, 249, 0.98);
  box-shadow:
    0 28px 64px rgba(18, 54, 34, 0.22),
    0 0 0 1px rgba(18, 54, 34, 0.06),
    0 0 0 10px rgba(255, 253, 249, 0.22);
  backdrop-filter: blur(12px);
  overflow: hidden;
  overscroll-behavior: contain;
}

.ai-summary-panel--maximized {
  width: min(620px, calc(100vw - 2.8rem));
  height: min(92vh, 1080px);
  max-height: min(92vh, 1080px);
}

.ai-summary-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.1rem 0.85rem;
  border-bottom: 1px solid var(--green-line);
}

.ai-summary-panel-title {
  margin: 0.35rem 0 0;
  color: var(--green-dark);
  font-size: 1.55rem;
  line-height: 1.1;
  font-style: italic;
  font-weight: 500;
  max-width: 12ch;
}

.ai-summary-panel-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
}

.ai-summary-panel-btn {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--green-line);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--green-dark);
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.ai-summary-panel-btn:hover {
  transform: translateY(-1px);
  background: #fff;
}

.ai-summary-panel-btn svg {
  width: 18px;
  height: 18px;
}

.ai-summary-panel-btn--close {
  color: var(--danger);
}

.ai-summary-panel-body {
  padding: 0 1.1rem 1.1rem;
  overflow-y: auto;
  scrollbar-gutter: stable;
}

.ai-summary-panel-pills {
  justify-content: flex-start;
}

.ai-summary-card {
  margin-top: 1rem;
}

.pg.is-dark {
  background: linear-gradient(180deg, var(--paper) 0%, var(--cream) 100%);
  color: var(--text);
}

.pg.is-dark .hero,
.pg.is-dark .card,
.pg.is-dark .type-card,
.pg.is-dark .day-card,
.pg.is-dark .rules-card,
.pg.is-dark .resource-card,
.pg.is-dark .pdf-card,
.pg.is-dark .short-card,
.pg.is-dark .conclusion,
.pg.is-dark .farewell,
.pg.is-dark .disclaimer-box,
.pg.is-dark .warning-box,
.pg.is-dark .summary-card,
.pg.is-dark .ai-summary-panel {
  background: rgba(32, 36, 40, 0.94) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  box-shadow: var(--shadow-md) !important;
}

.pg.is-dark .hero {
  background:
    radial-gradient(circle at top left, rgba(105, 198, 162, 0.1), transparent 34%),
    linear-gradient(135deg, rgba(34, 38, 43, 0.98), rgba(27, 30, 34, 0.94)) !important;
}

.pg.is-dark .hero-title,
.pg.is-dark .sec-title,
.pg.is-dark .card h3,
.pg.is-dark .type-card h3,
.pg.is-dark .resource-card h3,
.pg.is-dark .pdf-card h3,
.pg.is-dark .short-copy h3,
.pg.is-dark .tl-body h3,
.pg.is-dark .day-head h3,
.pg.is-dark .conclusion h4,
.pg.is-dark .farewell h4,
.pg.is-dark .faq-wrap h4,
.pg.is-dark .disclaimer-box h4,
.pg.is-dark .warning-box h4,
.pg.is-dark .farewell-arabic,
.pg.is-dark .closing-arabic,
.pg.is-dark .hero-arabic,
.pg.is-dark .trust-item strong,
.pg.is-dark .reference-item strong {
  color: var(--text) !important;
}

.pg.is-dark .hero-title {
  color: #ffffff !important;
  text-shadow: none !important;
}

.pg.is-dark .hero-subtitle,
.pg.is-dark .sec-desc,
.pg.is-dark .card p,
.pg.is-dark .type-card p,
.pg.is-dark .day-body,
.pg.is-dark .tl-body p,
.pg.is-dark .resource-card p,
.pg.is-dark .pdf-card p,
.pg.is-dark .ref-text,
.pg.is-dark .faq-a p,
.pg.is-dark .warning-content p,
.pg.is-dark .closing-msg,
.pg.is-dark .trust-item span,
.pg.is-dark .reference-item span,
.pg.is-dark .summary-intro,
.pg.is-dark .summary-point p,
.pg.is-dark .summary-footer,
.pg.is-dark .farewell cite,
.pg.is-dark .farewell p,
.pg.is-dark .closing-ref,
.pg.is-dark .faq-q,
.pg.is-dark .rules-list li {
  color: var(--text-muted) !important;
}

.pg.is-dark .hero-proof-pill,
.pg.is-dark .trust-item,
.pg.is-dark .reference-item,
.pg.is-dark .resource-url,
.pg.is-dark .tl-ref,
.pg.is-dark .faq-ref,
.pg.is-dark .day-ref,
.pg.is-dark .card-note,
.pg.is-dark .type-note,
.pg.is-dark .section-note,
.pg.is-dark .tl-tip,
.pg.is-dark .day-reminder,
.pg.is-dark .summary-point,
.pg.is-dark .summary-pill {
  background: rgba(255, 255, 255, 0.04) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.pg.is-dark .hero-search-meta {
  background: rgba(255, 255, 255, 0.06) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: var(--text) !important;
  box-shadow: none !important;
}

.pg.is-dark .type-note,
.pg.is-dark .day-reminder,
.pg.is-dark .tl-ref,
.pg.is-dark .faq-ref,
.pg.is-dark .day-ref,
.pg.is-dark .card-note,
.pg.is-dark .resource-url,
.pg.is-dark .summary-pill {
  color: var(--text-muted) !important;
}

.pg.is-dark .hero-btn-primary,
.pg.is-dark .download-btn {
  background: linear-gradient(135deg, #2f8077, #1e5f59) !important;
  border-color: #2f8077 !important;
  color: #ffffff !important;
  box-shadow: 0 14px 30px rgba(18, 63, 58, 0.32) !important;
}

.pg.is-dark .hero-btn-primary:hover,
.pg.is-dark .hero-btn-primary:focus,
.pg.is-dark .hero-btn-primary:active,
.pg.is-dark .download-btn:hover {
  background: linear-gradient(135deg, #389087, #236964) !important;
  border-color: #389087 !important;
  color: #ffffff !important;
}

.pg.is-dark .hero-btn-secondary {
  background: rgba(255, 255, 255, 0.06) !important;
  border-color: rgba(255, 255, 255, 0.14) !important;
  color: var(--text) !important;
}

.pg.is-dark .hero-btn-secondary:hover,
.pg.is-dark .hero-btn-secondary:focus,
.pg.is-dark .hero-btn-secondary:active {
  background: rgba(255, 255, 255, 0.1) !important;
}

.pg.is-dark .section-tool-btn,
.pg.is-dark .font-btn,
.pg.is-dark .ai-summary-panel-btn {
  background: rgba(255, 255, 255, 0.05) !important;
  border-color: rgba(255, 255, 255, 0.12) !important;
  color: var(--text) !important;
}

.pg.is-dark .section-tool-btn--copy {
  color: #9bcfff !important;
  border-color: rgba(155, 207, 255, 0.25) !important;
  background: rgba(155, 207, 255, 0.08) !important;
}

.pg.is-dark .section-tool-btn--whatsapp {
  color: #7fc6bc !important;
  border-color: rgba(127, 198, 188, 0.26) !important;
  background: rgba(127, 198, 188, 0.1) !important;
}

.pg.is-dark .section-tool-btn--print {
  color: #e8efeb !important;
  border-color: rgba(255, 255, 255, 0.12) !important;
  background: rgba(255, 255, 255, 0.05) !important;
}

.pg.is-dark .section-tool-btn--pdf {
  color: #ffaba3 !important;
  border-color: rgba(255, 171, 163, 0.26) !important;
  background: rgba(180, 35, 24, 0.16) !important;
}

.pg.is-dark .image-credit {
  background: rgba(22, 25, 28, 0.82) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: var(--text) !important;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.24) !important;
}

.pg.is-dark .hero-visual-badge {
  background: rgba(22, 25, 28, 0.82) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: var(--text) !important;
}

.pg.is-dark .hero-search-input {
  color: var(--text) !important;
}

.pg.is-dark .hero-search-input::placeholder {
  color: var(--text-soft) !important;
}

.pg.is-dark .hero-search-hint {
  color: var(--text-muted) !important;
}

.pg.is-dark .tl-num {
  background: rgba(255, 255, 255, 0.96) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
  color: #2f8077 !important;
}

.pg.is-dark .tl-line {
  background: linear-gradient(180deg, rgba(208, 178, 122, 0.9), rgba(208, 178, 122, 0.15)) !important;
}

.pg.is-dark .day-head {
  background: rgba(74, 155, 146, 0.1) !important;
  border-bottom-color: rgba(255, 255, 255, 0.1) !important;
}

.pg.is-dark .rules-hdr.pos {
  background: rgba(105, 198, 162, 0.14) !important;
  color: #dff6eb !important;
}

.pg.is-dark .rules-hdr.neg {
  background: rgba(240, 178, 151, 0.14) !important;
  color: #f3c3ad !important;
}

.pg.is-dark .faq-item,
.pg.is-dark .reference-panel,
.pg.is-dark .summary-footer {
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.pg.is-dark .hero,
.pg.is-dark .card,
.pg.is-dark .type-card,
.pg.is-dark .day-card,
.pg.is-dark .rules-card,
.pg.is-dark .resource-card,
.pg.is-dark .pdf-card,
.pg.is-dark .short-card,
.pg.is-dark .conclusion,
.pg.is-dark .farewell,
.pg.is-dark .disclaimer-box,
.pg.is-dark .warning-box,
.pg.is-dark .summary-card {
  border-color: rgba(255, 255, 255, 0.06) !important;
}

.pg.is-dark .day-head,
.pg.is-dark .faq-item,
.pg.is-dark .reference-panel,
.pg.is-dark .summary-footer,
.pg.is-dark .farewell {
  border-color: rgba(255, 255, 255, 0.06) !important;
}

.pg.is-dark .faq-q svg,
.pg.is-dark .summary-point-icon,
.pg.is-dark .dot-y {
  color: #7dd4aa !important;
  fill: currentColor !important;
}

.pg.is-dark .dot-n {
  color: #f0b297 !important;
}

.pg.is-dark .ai-summary-fab {
  border-color: rgba(255, 255, 255, 0.14) !important;
  box-shadow:
    0 18px 36px rgba(0, 0, 0, 0.34),
    0 0 0 1px rgba(255, 255, 255, 0.06) !important;
}

.pg.is-dark .ai-summary-panel {
  background: rgba(28, 31, 35, 0.98) !important;
  border-color: rgba(255, 255, 255, 0.12) !important;
  box-shadow:
    0 28px 64px rgba(0, 0, 0, 0.42),
    0 0 0 1px rgba(255, 255, 255, 0.06),
    0 0 0 10px rgba(0, 0, 0, 0.18) !important;
}

.pg .hero-title {
  color: #1b5b39 !important;
  -webkit-text-fill-color: #1b5b39 !important;
}

.pg.is-dark .hero-title {
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
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
  .pg {
    --page-gutter: 1.25rem;
  }

  .main-container {
    padding: 0 var(--page-gutter) 4rem;
  }

  .hero-shell,
  .sec-header-with-image {
    grid-template-columns: 1fr;
  }

  .hero {
    border-radius: 34px;
  }

  .hero-copy-inner {
    padding: 1rem;
  }

  .hero-visual {
    min-height: 340px;
    max-height: 340px;
  }

  .hero-utility-grid {
    grid-template-columns: 1fr;
  }

  .hero-trust {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }

}

@media (max-width: 768px) {
  .pg {
    --page-gutter: 0.95rem;
  }

  .main-container {
    padding: 0 var(--page-gutter) 3.5rem;
  }

  .hero {
    margin-top: 0;
    border-radius: 28px;
  }

  .hero-copy-inner {
    padding: 0.95rem;
    border-radius: 24px;
  }

  .hero-title {
    max-width: none;
    font-size: 3rem;
  }

  .hero-subtitle {
    max-width: 100%;
  }

  .hero-topline {
    align-items: center;
    justify-content: center;
  }

  .hero-panel-head {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .hero-utility-grid {
    margin-top: 1.35rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-proof {
    justify-content: center;
  }

  .hero-btn-primary,
  .hero-btn-secondary,
  .download-btn {
    width: 100%;
  }

  .hero-search-panel,
  .hero-jump-panel {
    padding: 0.95rem;
    border-radius: 20px;
  }

  .hero-search-field {
    min-height: 54px;
  }

  .hero-trust {
    grid-template-columns: 1fr;
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

  .ai-summary-panel {
    right: 1rem;
    bottom: 1rem;
    width: min(400px, calc(100vw - 2rem));
    height: min(86vh, 860px);
    max-height: min(86vh, 860px);
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

  .hero-subtitle {
    max-width: 100%;
  }

  .hero {
    border-radius: 24px;
  }

  .hero-copy-inner {
    padding: 0.85rem;
  }

  .hero-topline {
    flex-direction: column;
    align-items: center;
  }

  .hero-search-meta {
    min-height: 34px;
    padding-inline: 0.75rem;
  }

  .hero-search-field {
    flex-wrap: wrap;
    padding: 0.75rem;
  }

  .hero-search-clear {
    width: 100%;
    justify-content: center;
  }

  .hero-proof {
    gap: 0.5rem;
  }

  .hero-proof-pill,
  .hero-search-meta--live {
    width: 100%;
  }

  .hero-jump-pills {
    gap: 0.5rem;
  }

  .hero-jump-pill {
    font-size: 0.84rem;
    padding: 0.52rem 0.78rem;
  }

  .reference-list {
    grid-template-columns: 1fr;
  }

  .summary-pill {
    width: 100%;
    justify-content: center;
  }

  .ai-summary-fab {
    right: 0.75rem;
    bottom: 0.75rem;
    width: 48px;
    height: 48px;
  }

  .ai-summary-panel,
  .ai-summary-panel--maximized {
    right: 0.75rem;
    left: 0.75rem;
    bottom: 0.75rem;
    width: auto;
    height: 88vh;
    max-height: 88vh;
  }

  .ai-summary-panel-header {
    padding: 1rem;
  }

  .ai-summary-panel-body {
    padding: 0 1rem 1rem;
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

  .hero-visual {
    min-height: 280px;
    max-height: 280px;
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
  .ai-summary-panel-btn {
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
