<template>
    <div id="app">

        <div class="py-4 position-relative" style="margin-top:10px">
            <div v-if="!isVisible" class="shadow-md pb3">
                <!-- <h4 class="fw-bold text-center pt-2 mb-2 container" v-if="information != null">Search for a word in the
                    Quran...</h4> -->
                <AdvancedSearch @input-change="handleInputChange" v-if="information != null" />
                <div v-if="information" class="next-step-card container" style="
                        position: relative;
                        background: linear-gradient(135deg, rgba(26, 95, 122, 0.10), rgba(11, 128, 111, 0.10));
                        border: 1px solid rgba(11, 128, 111, 0.18);
                        border-radius: 16px;
                        box-shadow: 0 8px 24px rgba(26, 95, 122, 0.12);
                        padding: 1.2rem 1.6rem;
                    ">
                    <button type="button" :title="nextStepMinimized ? 'Restore' : 'Minimize'"
                        :aria-label="nextStepMinimized ? 'Restore next step' : 'Minimize next step'"
                        @click="toggleNextStepMinimized"
                        style="position: absolute; right: 32px; top: 12px; opacity: 0.9; background: transparent; border: 0; color: #6b8b91; cursor: pointer;">
                        <i class="fas" :class="nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt'"
                            aria-hidden="true"></i>
                    </button>
                    <div class="d-flex align-items-start gap-3 text-start">
                        <div class="flex-shrink-0 mt-1">
                            <div style="
                                        border-radius: 50%;
                                        background: rgba(11, 128, 111, 0.18);
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        color: #0b806f;
                                        font-size: 1.25rem;
                                        width: 48px;
                                        height: 48px;
                                        box-shadow: inset 0 0 0 1px rgba(11, 128, 111, 0.2);
                                    ">
                                <i class="fas fa-headphones" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div style="flex:1;">
                            <p class="mb-2 fw-semibold text-uppercase"
                                style="letter-spacing: 0.1em; color: #1a5f7a; font-size: 0.78rem;">
                                NEXT STEP
                            </p>
                            <div v-show="nextStepMinimized" class="mb-2" style="color: #1f2933;">
                                <a href="/surat" class="fw-semibold text-decoration-none" style="color:#0b806f;">
                                    Listen to Qur’anic recitations
                                </a>
                                <i class="fas fa-arrow-up-right-from-square ms-1" style="color:#0b806f;"></i>
                            </div>
                            <p v-show="!nextStepMinimized" class="mb-3"
                                style="color: #1f2933; line-height: 1.7; font-size: 1.02rem;">
                                As-salaamu alaikum—if this is your first deep dive into Islam, let the verses you
                                just read continue to surround you. Slip over to our curated
                                <a href="/surat" class="fw-semibold text-decoration-none" style="color:#0b806f;">
                                    recitation list
                                </a>
                                and hear the Qur’an with translations that keep every word close.
                            </p>
                            <a v-show="!nextStepMinimized" href="/surat"
                                class="btn btn-sm fw-semibold text-white px-3 py-2" style="
                                        background: linear-gradient(135deg, #0b806f, #1a5f7a);
                                        border: none;
                                        border-radius: 999px;
                                        box-shadow: 0 10px 20px rgba(26, 95, 122, 0.25);
                                        transition: transform 0.2s ease, box-shadow 0.2s ease;
                                    "
                                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 14px 28px rgba(26, 95, 122, 0.28)';"
                                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 20px rgba(26, 95, 122, 0.25)';">
                                Listen Now
                                <i class="fas fa-arrow-up-right-from-square ms-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <custom-surah-selection v-if="information != null" :customSurat="customSuratList" v-model="selectedSurah"></custom-surah-selection> -->

            <!-- accordion headers -->
            <div class="row">
                <!-- <div class="row">
                    <div class="col-12 col-md-6">
                        <SurahDropdown v-if="!selectedSurahId" class="pt-1" :selectedSurah="selectedSurahId"
                            :filteredSurah="filteredSurah" :surat="surat" @update:selectedSurah="updateSelectedSurah"
                            @fetchAyat="getAyat" />
                    </div>
                    <div class="col-12 col-md-6">
                        <HelpGuideModal />
                    </div>
                </div> -->


                <div class="col-md-4">
                    <section class="pt-4" aria-label="Surah and verse selection">
                        <div class="selector-heading ">
                        </div>
                        <div class="selector-control">
                            <SurahDropdown aria-labelledby="surah-select-label" class="col-md-12"
                                :selectedSurah="selectedSurahId" :filteredSurah="filteredSurah" :surat="surat"
                                @update:selectedSurah="updateSelectedSurah" @fetchAyat="getAyat" />
                        </div>

                        <div v-if="information != null" class="mt-4">
                            <div class="selector-heading">
                                <h5 id="ayah-select-label" class="fw-bold text-left mb-1">Select a Verse</h5>
                                <p class="field-helper">
                                    Tap or click a verse below to focus the translation panel.
                                </p>
                            </div>
                        </div>

                        <AyahDropdown aria-labelledby="ayah-select-label" :selectedSurahId="selectedSurahId"
                            :dropdownHidden="dropdownHidden" @update-information="updateInformation"
                            @update-tafseer="updateTafseer" v-if="ayah == null && !dropdownHidden"
                            class="ayah-dropdown-hidden-on-desktop d-block d-md-none" />

                        <!-- List of Ayat for Surah (desktop) -->
                        <div class="tab-content hide-on-mobile-tablet" id="nav-tabContent"
                            v-if="ayah == null && !dropdownHidden">
                            <div class="tab-pane fade show active" id="nav-home" role="tabpanel"
                                aria-labelledby="nav-home-tab" v-if="ayah == null">

                                <!-- Error alert -->
                                <ErrorAlert :showError="showError" @dismiss-error="dismissError" />

                                <div class="row pb-2">

                                    <div class="custom-scrollbar pb-3 w-100 ayah-scroll">

                                        <ul class="col-md-12 pb-3 list-group root ayah-list" id="toggle" ref="ayahList"
                                            role="listbox" tabindex="0"
                                            :aria-activedescendant="selectedIndexAyah >= 0 ? `ayah-option-${selectedIndexAyah}` : null"
                                            aria-label="Ayah list" aria-controls="ayah-content">

                                            <li v-for="(ayah, index) in ayat" :key="ayah.id || index"
                                                @click="selectAyah(index)" role="option" :id="`ayah-option-${index}`"
                                                :aria-selected="selectedIndexAyah === index"
                                                :tabindex="selectedIndexAyah === index ? 0 : -1"
                                                @keydown.enter.prevent="selectAyah(index)"
                                                @keydown.space.prevent="selectAyah(index)" class="ayah-item" :class="{
                                                    selected:
                                                        selectedIndexAyah === index ||
                                                        (verseNumber &&
                                                            parseInt(verseNumber) ===
                                                            ayah.ayah_id),
                                                }">
                                                <h5 class="text-right ayah-label">
                                                    Verse: {{ ayah.ayah_id }}
                                                </h5>
                                                <h5 class="text-right ayah-text">
                                                    {{ ayah.ayah_text }}
                                                </h5>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="col-md-8 card-hide text-left pr-4 " style="scroll-margin-top:24px;">
                    <div v-if="information == null" class="companion-hero">
                        <div class="hero-inner d-flex">
                            <div class="hero-text">
                                <div class="hero-eyebrow fw-semibold text-uppercase">Quran Companion</div>
                                <h2 class="hero-title fw-bolder">Quran Explorer</h2>
                                <p class="hero-copy mb-0">
                                    The Quran Companion page utilizes AI tools and accessibility features to enrich your
                                    learning experience. It offers text-to-speech, speech-to-text, synchronized
                                    highlighting, and more.
                                </p>
                            </div>
                            <div class="hero-visual d-none d-md-flex">
                                <div class="hero-ring ring-1"></div>
                                <div class="hero-ring ring-2"></div>
                                <div class="hero-ring ring-3"></div>
                            </div>
                        </div>
                    </div>

                    <div class="mb-2" v-else>
                        <!-- <h4 class="fw-bold text-center" >Verse Breakdown...</h4> -->
                        <!-- breakdown content here -->

                    </div>

                    <div class="card card-teal"
                        style="background-color:#ffffff; border-radius:18px; border:1px solid rgba(2,6,23,0.06); box-shadow: 0 14px 36px rgba(15, 23, 42, 0.08); overflow:hidden; transition: box-shadow .2s ease;">
                        <div v-if="information != null">
                            <div class="container-fluid ">
                                <div class="row">
                                    <NavTabs />
                                    <!-- toogle between basic/advanced -->
                                    <!-- <div class="container text-center">
                                        <div
                                            class="row form-check form-switch d-flex justify-content-center align-items-center p-3 border rounded shadow-sm bg-light">
                                            -- Advanced Label --
                                            <div class="col">
                                                <span class="fw-semibold text-muted">Advanced</span>
                                            </div>

                                            -- Switch --
                                            <div class="col">
                                                <div
                                                    class="form-check form-switch d-flex justify-content-center align-items-center">
                                                    <input class="form-check-input h4 pr-5 shadow-lg text-center"
                                                        style="background-color: rgba(0, 191, 166); border-color: grey;"
                                                        type="checkbox" role="switch" id="flexSwitchCheckDefault"
                                                        v-model="isVisible" @change="saveToggleState" />
                                                </div>
                                            </div>

                                            -- Basic Label --
                                            <div class="col">
                                                <span class="fw-semibold text-muted">Basic</span>
                                            </div>
                                        </div>
                                    </div> -->
                                </div>
                                <!-- Surah info Modal -->
                                <!-- <div class="modal fade" id="translationInfo" tabindex="-1"
                                    aria-labelledby="surahInfoModalLabel" aria-hidden="true" @click.self="closeModal">
                                    <div class="modal-dialog modal-dialog-centered modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="surahInfoModalLabel">
                                                    <strong>Surah Information</strong>
                                                </h1>
                                                <button type="button" class="btn-close" @click="closeModal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form class=" text-left">
                                                    <div class="mb-3 " v-if="
                                                        information.ayah &&
                                                        information.ayah.surah
                                                    ">
                                                        <label for="formGroupExampleInput" class="form-label">Surah Name
                                                            (English):</label>
                                                        <p class="mt-2 text-dark text-left">
                                                            {{
                                                                information.ayah
                                                                    .surah.name_en
                                                            }}
                                                        </p>
                                                    </div>
                                                    <div class="mb-3 " v-if="
                                                        information.ayah &&
                                                        information.ayah.surah
                                                    ">
                                                        <label for="formGroupExampleInput"
                                                            class="form-label text-left">Surah
                                                            Information:</label>
                                                        <p class="text-left">
                                                            {{
                                                                information.ayah
                                                                    .surah.text
                                                            }}
                                                        </p>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                                    @click="closeModal">
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->
                            </div>

                            <div class="card-body content card-teal"
                                style="border-radius: 20px; padding: 16px 18px 18px 18px;">
                                <div class="tab-content text-center" style="border-radius: 20px; background:#ffffff;">
                                    <!-- <Welcome :information="information" /> -->

                                    <!-- Translation Section -->
                                    <div class="tab-pane active content " id="home" role="tabpanel"
                                        v-if="information != null">
                                        <!-- Screen reader live region for announcing selection changes -->
                                        <div class="visually-hidden" aria-live="polite" aria-atomic="true">{{
                                            screenReaderMessage }}</div>
                                        <div id="ayah-content" :selectedSurahId="selectedSurahId"
                                            @update-tafseer="updateTafseer" @update-information="updateInformation"
                                            :style="{
                                                display: 'flex',
                                                gap: '12px',
                                                justifyContent: 'space-around',
                                                alignItems: 'center',
                                                background: '#f8fafc',
                                                border: '1px solid rgba(2,6,23,0.06)',
                                                borderRadius: '12px'
                                            }" class="icon-container hide-on-mobile mb-3">
                                            <div class="text-center icon-text" role="group"
                                                aria-label="Verse navigation controls" :aria-hidden="isMobile">
                                                <i class="bi bi-skip-start-fill h2 pt- custom-prev-ayah verse-nav-icon"
                                                    role="button" aria-label="Go to first verse"
                                                    :tabindex="isMobile ? -1 : 0" @keydown.enter.prevent="goToFirstAyah"
                                                    @keydown.space.prevent="goToFirstAyah"
                                                    style="cursor: pointer; color:#1a5f7a; transition: transform .15s ease, color .15s ease;"
                                                    onmouseover="this.style.transform='translateY(-1px)'; this.style.color='#0b806f'"
                                                    onmouseout="this.style.transform='translateY(0)'; this.style.color='#1a5f7a'"
                                                    @click="goToFirstAyah" title="First verse"></i>
                                                <!-- <div class="large">First verse</div> -->
                                            </div>
                                            <div class="text-center" role="group" aria-label="Previous verse"
                                                :aria-hidden="isMobile">
                                                <i class="bi bi-arrow-left-circle-fill pt-2 h4 custom-prev-ayah desktop-icon verse-nav-icon"
                                                    role="button" aria-label="Go to previous verse"
                                                    :tabindex="isMobile ? -1 : 0"
                                                    @keydown.enter.prevent="goToPreviousAyah"
                                                    @keydown.space.prevent="goToPreviousAyah"
                                                    style="cursor: pointer; color:#1a5f7a; transition: transform .15s ease, color .15s ease;"
                                                    onmouseover="this.style.transform='translateY(-1px)'; this.style.color='#0b806f'"
                                                    onmouseout="this.style.transform='translateY(0)'; this.style.color='#1a5f7a'"
                                                    @click="goToPreviousAyah" title="Previous verse"></i>
                                                <!-- <div class="large">Previous verse</div> -->
                                            </div>
                                            <div class="text-center" role="group" aria-label="Next verse"
                                                :aria-hidden="isMobile">
                                                <i class="bi bi-arrow-right-circle-fill pt-2 h4 custom-prev-ayah desktop-icon verse-nav-icon"
                                                    role="button" aria-label="Go to next verse"
                                                    :tabindex="isMobile ? -1 : 0" @keydown.enter.prevent="goToNextAyah"
                                                    @keydown.space.prevent="goToNextAyah"
                                                    style="cursor: pointer; color:#1a5f7a; transition: transform .15s ease, color .15s ease;"
                                                    onmouseover="this.style.transform='translateY(-1px)'; this.style.color='#0b806f'"
                                                    onmouseout="this.style.transform='translateY(0)'; this.style.color='#1a5f7a'"
                                                    @click="goToNextAyah" title="Next verse"></i>
                                                <!-- <div class="large">Next verse</div> -->
                                            </div>
                                            <div class="text-center" role="group" aria-label="Last verse"
                                                :aria-hidden="isMobile">
                                                <i class="bi bi-skip-end-fill pt-2 h2 custom-prev-ayah desktop-icon verse-nav-icon"
                                                    role="button" aria-label="Go to last verse"
                                                    :tabindex="isMobile ? -1 : 0" @keydown.enter.prevent="goToLastAyah"
                                                    @keydown.space.prevent="goToLastAyah"
                                                    style="cursor: pointer; color:#1a5f7a; transition: transform .15s ease, color .15s ease;"
                                                    onmouseover="this.style.transform='translateY(-1px)'; this.style.color='#0b806f'"
                                                    onmouseout="this.style.transform='translateY(0)'; this.style.color='#1a5f7a'"
                                                    @click="goToLastAyah" title="Last verse"></i>
                                                <!-- <div class="large">Last verse</div> -->
                                            </div>
                                        </div>
                                        <!-- desktop top features -->
                                        <div v-if="!isVisible" :style="iconStyle">
                                            <!-- <div class="col pb-2">
                                                <i :class="isOpen
                                                    ? 'bi bi-x-circle-fill'
                                                    : 'bi bi-plus-circle-fill'
                                                    " class="text-left hide-on-mobile h4" @click="toggleContent"></i>
                                            </div> -->
                                            <div v-if="isOpen" class="hide-on-mobile">
                                                <div class="text-center">
                                                    <div class="row pt-2 text-center">
                                                        <div class="col desktop-icon" style="cursor: pointer;">
                                                            <i class="bi bi-file-earmark-text text-right mr-2 h4"
                                                                data-bs-placement="top" title="Write a note"
                                                                @click="openModal('translationNote')"></i>
                                                            <div class="icon-text pt-2">Write a Note</div>
                                                        </div>
                                                        <div class="col desktop-icon" style="cursor: pointer;">
                                                            <i @click="submitForm"
                                                                class="bi bi-bookmark text-right mr-2 h4"
                                                                title="Bookmark verse"></i>
                                                            <div class="icon-text pt-2">Bookmark</div>
                                                        </div>
                                                        <!-- <div class="col desktop-icon" style="cursor: pointer;">
                                                            <i class="bi bi-info-circle h4 mr-2 pl-2"
                                                                data-bs-toggle="modal" data-bs-target="#translationInfo"
                                                                aria-expanded="false" data-bs-placement="top"
                                                                title="Surah info"></i>
                                                            <div class="icon-text pt-2">Surah Info</div>
                                                        </div> -->
                                                        <div class="col desktop-icon" style="cursor: pointer;">
                                                            <i title="Give feedback" data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                                class="bi bi-chat-left-text desktop-icon text-right mr-2 h4"
                                                                data-bs-placement="top"></i>
                                                            <div class="icon-text pt-2">Feedback</div>
                                                        </div>
                                                        <!-- <div class="col desktop-icon" style="cursor: pointer;">
                                                            <i class="bi bi-arrows-fullscreen h4"
                                                                @click="toggleFullScreen" title="Full screen"></i>
                                                            <div class="icon-text pt-2 mb-2">Full Screen</div>
                                                        </div> -->
                                                    </div>

                                                </div>
                                                <hr style="border: 1px solid #e5e7eb; margin: 10px 0 0 0;" />
                                            </div>
                                        </div>

                                        <!-- mobile navigation  -->
                                        <div class="dropdown mobile-only pb-2" :aria-hidden="!isMobile">
                                            <!-- <div :style="iconStyle" class="icon-container" role="group"
                                                aria-label="Verse navigation controls (mobile)"
                                                style="background:#f8fafc; border:1px solid rgba(2,6,23,0.06); border-radius:12px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">

                                                <i class="bi bi-chevron-bar-left h4 verse-nav-icon"
                                                    style="cursor: pointer; color:#1a5f7a;" role="button" aria-label="Go to first verse"
                                                    :tabindex="isMobile ? 0 : -1" @keydown.enter.prevent="goToFirstAyah"
                                                    @keydown.space.prevent="goToFirstAyah" @click="goToFirstAyah()"
                                                    title="First verse"></i>
                                                <i class="bi bi-arrow-left-circle h4 verse-nav-icon"
                                                    style="cursor: pointer; color:#1a5f7a;" role="button"
                                                    aria-label="Go to previous verse" :tabindex="isMobile ? 0 : -1"
                                                    @keydown.enter.prevent="goToPreviousAyah"
                                                    @keydown.space.prevent="goToPreviousAyah"
                                                    @click="goToPreviousAyah()" title="Previous verse"></i>
                                                 <i @click="submitForm" class="bi bi-bookmark mb-2 h4"
                                                    aria-expanded="false" data-bs-placement="top"
                                                    title="Bookmark verse"></i> 
                                                <i class="bi bi-arrow-right-circle h4 verse-nav-icon"
                                                    style="cursor: pointer; color:#1a5f7a;" role="button" aria-label="Go to next verse"
                                                    :tabindex="isMobile ? 0 : -1" @keydown.enter.prevent="goToNextAyah"
                                                    @keydown.space.prevent="goToNextAyah" @click="goToNextAyah()"
                                                    title="Next verse"></i>
                                                <i class="bi bi-chevron-bar-right h4 verse-nav-icon"
                                                    style="cursor: pointer; color:#1a5f7a;" role="button" aria-label="Go to last verse"
                                                    :tabindex="isMobile ? 0 : -1" @keydown.enter.prevent="goToLastAyah"
                                                    @keydown.space.prevent="goToLastAyah" @click="goToLastAyah()"
                                                    title="Last verse"></i>
                                            </div> -->
                                            <!-- Mobile/Tablet tip: swipe between verses -->
                                            <div v-if="showSwipeTip"
                                                class="swipe-tip alert py-2 mt-2 d-flex align-items-center justify-content-between mb-0 d-xxl-none"
                                                role="alert">
                                                <div class="d-flex align-items-center overflow-hidden">
                                                    <span class="text-truncate">Swipe left or right to change
                                                        verses</span>
                                                </div>
                                                <button type="button" class="btn-close ms-2 flex-shrink-0"
                                                    aria-label="Close" @click="dismissSwipeTip"></button>
                                            </div>
                                            <!-- brief swipe success notice -->
                                            <div v-if="showSwipeNotice" class="swipe-notice"
                                                :class="swipeNoticeDir === 'next' ? 'right' : 'left'" role="status"
                                                aria-live="polite">
                                                <i
                                                    :class="swipeNoticeDir === 'next' ? 'bi bi-arrow-right-short' : 'bi bi-arrow-left-short'"></i>
                                                <span class="text">{{ swipeNoticeText }}</span>
                                            </div>
                                        </div>
                                        <!-- dropdown mobile content -->
                                        <div>
                                            <transition :name="lastSwipeDir === 'next' ? 'swipe-next' : 'swipe-prev'">
                                                <div class="pt-2 swipe-surface" ref="targetTranslationElement"
                                                    :key="selectedAyah" @touchstart="handleTouchStart($event)"
                                                    @touchmove="handleTouchMove" @touchend="handleTouchEnd($event)"
                                                    @touchcancel="handleTouchEnd($event)"
                                                    @pointerdown="handlePointerDown" @pointermove="handlePointerMove"
                                                    @pointerup="handlePointerUp"
                                                    @wheel.passive="handleWheelTranslation">
                                                    <TranslationSection ref="translationSection"
                                                        :currentAyah="currentAyah" :isVisible="!isVisible"
                                                        :information="information" :isFullScreen="isFullScreen"
                                                        :expanded="expanded" :showMoreLink="showMoreLink"
                                                        :showAlertText="showAlertText" :showAlert="showAlert"
                                                        :showErrorAlert="showErrorAlert" :showAlertTextNote="showAlertTextNote
                                                            " :isPlaying="isPlaying" @highlightText="highlightText"
                                                        @clearHighlight="clearHighlight"
                                                        @toggle-change="saveToggleState"
                                                        @toggle-full-screen="toggleFullScreen"
                                                        @toggle-expand="toggleExpand" @close-alert-text="closeAlertText"
                                                        @toggle-audio="toggleAudioPlayback"
                                                        @update-success-message="updateSuccessMessage" />
                                                </div>
                                            </transition>

                                            <!-- <div v-if="!isVisible" class="container-fluid text-center mobile-only">
                                                <div class="row">
                                                    <div class="col">
                                                        <i :class="isOpen
                                                            ? 'bi bi-x-circle'
                                                            : 'bi bi-plus-circle-fill'
                                                            " class="text-center mobile-only h3 pt-3"
                                                            @click="toggleContent"></i>
                                                    </div>
                                                </div>
                                            </div> -->

                                            <!-- toolbar mobile -->
                                            <div v-if="isOpen" class="collapse-content mobile-only">
                                                <div v-if="!isVisible" class="card text-bg-light card-body">
                                                    <TranslationActions
                                                        :targetTranslationRef="'targetTranslationElement'"
                                                        :translation="translation" :information="information"
                                                        @open-modal="openModal" @submit-form="submitForm"
                                                        @toggle-audio="toggleAudioPlayback" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tafseer Section -->
                                    <div class="tab-pane content" id="profile" role="tabpanel"
                                        v-if="information != null">
                                        <div>
                                            <div :selectedSurahId="selectedSurahId" @update-tafseer="updateTafseer"
                                                @update-information="updateInformation"
                                                class="icon-container hide-on-mobile mb-3" :aria-hidden="isMobile"
                                                style="display:flex; gap:12px; justify-content:space-around; align-items:center;  background:#f8fafc; border:1px solid rgba(2,6,23,0.06); border-radius:12px;">
                                                <div class="text-center" role="group"
                                                    aria-label="Verse navigation controls (desktop)">
                                                    <i class="bi bi-skip-start-fill h2 pt- custom-prev-ayah verse-nav-icon"
                                                        role="button" aria-label="Go to first verse"
                                                        :tabindex="isMobile ? -1 : 0"
                                                        @keydown.enter.prevent="goToFirstAyah"
                                                        @keydown.space.prevent="goToFirstAyah"
                                                        style="cursor: pointer;color:rgb(26, 95, 122)"
                                                        @click="goToFirstAyah" title="First verse"></i>
                                                </div>
                                                <div class="text-center" role="group" aria-label="Previous verse">
                                                    <i class="bi bi-arrow-left-circle-fill pt-2 h4 custom-prev-ayah desktop-icon verse-nav-icon"
                                                        role="button" aria-label="Go to previous verse"
                                                        :tabindex="isMobile ? -1 : 0"
                                                        @keydown.enter.prevent="goToPreviousAyah"
                                                        @keydown.space.prevent="goToPreviousAyah"
                                                        style="cursor: pointer; color:rgb(26, 95, 122)"
                                                        @click="goToPreviousAyah" title="Previous verse"></i>
                                                </div>
                                                <div class="text-center" role="group" aria-label="Next verse">
                                                    <i class="bi bi-arrow-right-circle-fill pt-2 h4 custom-prev-ayah desktop-icon verse-nav-icon"
                                                        role="button" aria-label="Go to next verse"
                                                        :tabindex="isMobile ? -1 : 0"
                                                        @keydown.enter.prevent="goToNextAyah"
                                                        @keydown.space.prevent="goToNextAyah"
                                                        style="cursor: pointer;color:rgb(26, 95, 122)"
                                                        @click="goToNextAyah" title="Next verse"></i>
                                                </div>
                                                <div class="text-center" role="group" aria-label="Last verse">
                                                    <i class="bi bi-skip-end-fill pt-2 h2 custom-prev-ayah desktop-icon verse-nav-icon"
                                                        role="button" aria-label="Go to last verse"
                                                        :tabindex="isMobile ? -1 : 0"
                                                        @keydown.enter.prevent="goToLastAyah"
                                                        @keydown.space.prevent="goToLastAyah"
                                                        style="cursor: pointer;color:rgb(26, 95, 122)"
                                                        @click="goToLastAyah" title="Last verse"></i>
                                                </div>
                                            </div>
                                            <!-- desktop top features -->
                                            <div v-if="!isVisible" :style="iconStyle">
                                                <!-- <div class="col pb-2">
                                                    <i :class="isOpen
                                                        ? 'bi bi-x-circle-fill'
                                                        : 'bi bi-plus-circle-fill'
                                                        " class="text-left hide-on-mobile h4"
                                                        @click="toggleContent"></i>
                                                </div> -->
                                                <div v-if="isOpen" class="icon-container-fluid hide-on-mobile">
                                                    <div class="text-center">
                                                        <div class="row pt-2">
                                                            <div class="col desktop-icon" style="cursor: pointer;">
                                                                <i class="bi bi-file-earmark-text text-right mr-2 h4"
                                                                    aria-expanded="false" data-bs-placement="top"
                                                                    title="Write a note" @click="
                                                                        openModal(
                                                                            'tafseerNote'
                                                                        )
                                                                        "></i>
                                                                <div class="col desktop-icon">
                                                                    <div class="icon-text pt-2 mb-2">Write a Note</div>
                                                                </div>
                                                            </div>
                                                            <div class="col desktop-icon" style="cursor: pointer;">
                                                                <i @click="submitFormTafseer
                                                                " class="bi bi-bookmark text-right mr-2 h4"
                                                                    aria-expanded="false" data-bs-placement="top"
                                                                    title="Bookmark verse"></i>
                                                                <div class="col desktop-icon">
                                                                    <div class="icon-text pt-2 mb-2">Bookmark</div>
                                                                </div>
                                                            </div>
                                                            <!-- <div class="col desktop-icon" style="cursor: pointer;">
                                                                <i class="bi bi-info-circle h4 mr-2 pl-2"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#translationInfo"
                                                                    aria-expanded="false" data-bs-placement="top"
                                                                    title="Surah info"></i>
                                                                <div class="col desktop-icon">
                                                                    <div class="icon-text pt-2 mb-2">Surah Info</div>
                                                                </div>
                                                            </div> -->
                                                            <div class="col desktop-icon" style="cursor: pointer;">
                                                                <i title="Give feedback" data-bs-toggle="modal"
                                                                    data-bs-target="#exampleModal"
                                                                    class="bi bi-chat-left-text text-right mr-2 h4"
                                                                    aria-expanded="false" data-bs-placement="top"></i>
                                                                <div class="col desktop-icon">
                                                                    <div class="icon-text pt-2 mb-2">Feedback</div>
                                                                </div>
                                                            </div>
                                                            <!-- <div class="col desktop-icon" style="cursor: pointer;">
                                                                <i class="bi bi-arrows-fullscreen h4" @click="toggleFullScreen
                                                                " title="Full screen" aria-expanded="false"
                                                                    data-bs-placement="top"></i>
                                                                <div class="col desktop-icon">
                                                                    <div class="icon-text pt-2 mb-2">Full Screen</div>
                                                                </div>
                                                            </div> -->
                                                        </div>
                                                    </div>
                                                    <hr style="border: 1px solid #e5e7eb; margin: 10px 0 0 0;" />
                                                </div>
                                            </div>

                                            <!-- mobile navigation  -->
                                            <div class="dropdown mobile-only">
                                                <!-- Mobile/Tablet tip: swipe between verses -->
                                                <div v-if="showSwipeTip"
                                                    class="swipe-tip alert py-2 mb-2 d-flex align-items-center justify-content-between mb-0 d-xxl-none"
                                                    role="alert">
                                                    <div class="d-flex align-items-center overflow-hidden">
                                                        <span class="text-truncate">Swipe left or right to change
                                                            verses</span>
                                                    </div>
                                                    <button type="button" class="btn-close ms-2 flex-shrink-0"
                                                        aria-label="Close" @click="dismissSwipeTip"></button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Main content  -->
                                        <transition :name="lastSwipeDir === 'next' ? 'swipe-next' : 'swipe-prev'">
                                            <div class="pt-2 swipe-surface" ref="targetTafseerElement"
                                                :key="selectedAyah" @touchstart="handleTouchStart($event)"
                                                @touchmove="handleTouchMove" @touchend="handleTouchEnd($event)"
                                                @pointerdown="handlePointerDown" @pointermove="handlePointerMove"
                                                @pointerup="handlePointerUp" @wheel.passive="handleWheelTafseer">
                                                <TafseerSection ref="tafseerSection" :currentAyah="currentAyah"
                                                    :isVisible="!isVisible" :information="information"
                                                    :isFullScreen="isFullScreen" :expanded="expanded"
                                                    :showMoreLink="showMoreLink" :showAlertText="showAlertText"
                                                    :showAlert="showAlert" :showErrorAlert="showErrorAlert"
                                                    :showAlertTextNote="showAlertTextNote
                                                        " :isPlaying="isPlaying" @highlightText="highlightText"
                                                    @clearHighlight="clearHighlight" @toggle-change="saveToggleState"
                                                    @toggle-full-screen="toggleFullScreen
                                                    " @toggle-expand="toggleExpand" @close-alert-text="closeAlertText"
                                                    @toggle-audio="toggleAudioPlayback" @update-success-message="updateSuccessMessage
                                                    " />
                                            </div>
                                        </transition>

                                        <!-- <div v-if="!isVisible" class="container-fluid text-center mobile-only">
                                            <div class="row">
                                                <div class="col">
                                                    <i :class="isOpen
                                                        ? 'bi bi-x-circle'
                                                        : 'bi bi-plus-circle-fill'
                                                        " class="text-center mobile-only h3 pt-3"
                                                        @click="toggleContent"></i>
                                                </div>
                                            </div>
                                        </div> -->

                                        <!-- toolbar mobile -->
                                        <div v-if="isOpen" class="collapse-content mobile-only">
                                            <div v-if="!isVisible" class="card text-bg-light card-body">
                                                <TafseerActions :targetTafseerRef="'targetTafseerElement'"
                                                    :tafseer="tafseer" :information="information"
                                                    @open-modal="openModal" @submit-form="submitFormTafseer"
                                                    @toggle-audio="toggleAudioPlayback" />
                                            </div>
                                        </div>

                                        <SurahInfoModal :information="information" />
                                    </div>

                                    <!-- Transliteration Section -->
                                    <div class="tab-pane content" id="messages" role="tabpanel"
                                        v-if="information != null">
                                        <div>
                                            <!-- Ayah Controls -->
                                            <div class="pb-3">
                                                <div :selectedSurahId="selectedSurahId" @update-tafseer="updateTafseer"
                                                    @update-information="updateInformation"
                                                    class="icon-container hide-on-mobile mb-3"
                                                    style="display:flex; gap:12px; justify-content:space-around; align-items:center; background:#f8fafc; border:1px solid rgba(2,6,23,0.06); border-radius:12px;">
                                                    <div class="text-center">
                                                        <i class="bi bi-skip-start-fill icon-container h2 pt- custom-prev-ayah verse-nav-icon"
                                                            style="cursor: pointer; color:#1a5f7a; transition: transform .15s ease, color .15s ease;"
                                                            @click="goToFirstAyah"
                                                            onmouseover="this.style.transform='translateY(-1px)'; this.style.color='#0b806f'"
                                                            onmouseout="this.style.transform='translateY(0)'; this.style.color='#1a5f7a'"
                                                            title="First verse"></i>
                                                    </div>
                                                    <div class="text-center">
                                                        <i class="bi bi-arrow-left-circle-fill icon-container pt-2 h4 custom-prev-ayah desktop-icon verse-nav-icon"
                                                            style="cursor: pointer; color:#1a5f7a; transition: transform .15s ease, color .15s ease;"
                                                            @click="goToPreviousAyah"
                                                            onmouseover="this.style.transform='translateY(-1px)'; this.style.color='#0b806f'"
                                                            onmouseout="this.style.transform='translateY(0)'; this.style.color='#1a5f7a'"
                                                            title="Previous verse"></i>
                                                    </div>
                                                    <div class="text-center">
                                                        <i class="bi bi-arrow-right-circle-fill icon-container pt-2 h4 custom-prev-ayah desktop-icon verse-nav-icon"
                                                            style="cursor: pointer; color:#1a5f7a; transition: transform .15s ease, color .15s ease;"
                                                            @click="goToNextAyah"
                                                            onmouseover="this.style.transform='translateY(-1px)'; this.style.color='#0b806f'"
                                                            onmouseout="this.style.transform='translateY(0)'; this.style.color='#1a5f7a'"
                                                            title="Next verse"></i>
                                                    </div>
                                                    <div class="text-center">
                                                        <i class="bi bi-skip-end-fill pt-2 h2 icon-container custom-prev-ayah desktop-icon verse-nav-icon"
                                                            style="cursor: pointer; color:#1a5f7a; transition: transform .15s ease, color .15s ease;"
                                                            @click="goToLastAyah"
                                                            onmouseover="this.style.transform='translateY(-1px)'; this.style.color='#0b806f'"
                                                            onmouseout="this.style.transform='translateY(0)'; this.style.color='#1a5f7a'"
                                                            title="Last verse"></i>
                                                    </div>
                                                </div>
                                                <!-- desktop top features -->
                                                <div :style="iconStyle">
                                                    <!-- <div v-if="!isVisible" class="col pb-2">
                                                        <i :class="isOpen
                                                            ? 'bi bi-x-circle-fill'
                                                            : 'bi bi-plus-circle-fill'
                                                            " class="text-left hide-on-mobile h4"
                                                            @click="toggleContent"></i>
                                                    </div> -->
                                                    <div v-if="isOpen" class="hide-on-mobile">
                                                        <div class="text-center">
                                                            <div class="row pt-2">
                                                                <div class="col desktop-icon" style="cursor: pointer;">
                                                                    <i class="bi bi-file-earmark-text text-right mr-2 h4"
                                                                        aria-expanded="false" data-bs-placement="top"
                                                                        title="Write a note" @click="
                                                                            openModal(
                                                                                'transliterationNote'
                                                                            )
                                                                            "></i>
                                                                    <div class="col desktop-icon">
                                                                        <div class="icon-text pt-2 mb-2">Write a Note
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col desktop-icon" style="
                                                                        cursor: pointer;
                                                                    ">
                                                                    <i @click="submitFormTransliteration
                                                                    " class="bi bi-bookmark text-right mr-2 h4"
                                                                        aria-expanded="false"
                                                                        title="Bookmark verse"></i>
                                                                    <div class="col desktop-icon">
                                                                        <div class="icon-text pt-2 mb-2">Bookmark</div>
                                                                    </div>
                                                                </div>
                                                                <!-- <div class="col desktop-icon" style="cursor: pointer;">
                                                                    <i class="bi bi-info-circle h4 mr-2 pl-2"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#translationInfo"
                                                                        aria-expanded="false" data-bs-placement="top"
                                                                        title="Surah info"></i>
                                                                    <div class="col desktop-icon">
                                                                        <div class="icon-text pt-2 mb-2">Surah Info
                                                                        </div>
                                                                    </div>
                                                                </div> -->
                                                                <div class="col desktop-icon" style="cursor: pointer;">
                                                                    <i title="Give feedback" data-bs-toggle="modal"
                                                                        data-bs-target="#exampleModal"
                                                                        class="bi bi-chat-left-text text-right mr-2 h4"
                                                                        aria-expanded="false"
                                                                        data-bs-placement="top"></i>
                                                                    <div class="col desktop-icon">
                                                                        <div class="icon-text pt-2 mb-2">Feedback</div>
                                                                    </div>
                                                                </div>
                                                                <!-- <div class="col desktop-icon" style="cursor: pointer;">
                                                                    <i class="bi bi-arrows-fullscreen h4" @click="toggleFullScreen
                                                                    " title="Full screen"></i>
                                                                    <div class="col desktop-icon">
                                                                        <div class="icon-text pt-2 mb-2">Full Screen
                                                                        </div>
                                                                    </div>
                                                                </div> -->
                                                            </div>
                                                        </div>
                                                        <hr style="border: 1px solid #e5e7eb; margin: 10px 0 0 0;" />
                                                    </div>
                                                </div>

                                                <!-- mobile navigation -->
                                                <div class="dropdown mobile-only">

                                                    <!-- Mobile/Tablet tip: swipe between verses -->
                                                    <div v-if="showSwipeTip"
                                                        class="swipe-tip alert py-2 pb-2 mt-2 d-flex align-items-center justify-content-between mb-0 d-xxl-none"
                                                        role="alert">
                                                        <div class="d-flex align-items-center overflow-hidden">
                                                            <span class="text-truncate">Swipe left or right to change
                                                                verses</span>
                                                        </div>
                                                        <button type="button" class="btn-close ms-2 flex-shrink-0"
                                                            aria-label="Close" @click="dismissSwipeTip"></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <transition :name="lastSwipeDir === 'next' ? 'swipe-next' : 'swipe-prev'">
                                                <div ref="targetTransliterationElement" class="swipe-surface"
                                                    :key="selectedAyah" @touchstart="handleTouchStart($event)"
                                                    @touchmove="handleTouchMove" @touchend="handleTouchEnd($event)"
                                                    @pointerdown="handlePointerDown" @pointermove="handlePointerMove"
                                                    @pointerup="handlePointerUp"
                                                    @wheel.passive="handleWheelTransliteration">
                                                    <TransliterationSection ref="transliterationSection"
                                                        :currentAyah="currentAyah" :isVisible="!isVisible"
                                                        :information="information" :isFullScreen="isFullScreen"
                                                        :expanded="expanded" :showMoreLink="showMoreLink"
                                                        :showAlertText="showAlertText" :showAlert="showAlert"
                                                        :showErrorAlert="showErrorAlert" :showAlertTextNote="showAlertTextNote
                                                            " :isPlaying="isPlaying" @highlightText="highlightText"
                                                        @clearHighlight="clearHighlight"
                                                        @toggle-change="saveToggleState" @toggle-full-screen="toggleFullScreen
                                                        " @toggle-expand="toggleExpand" @close-alert-text="closeAlertText
                                                        " @toggle-audio="toggleAudioPlayback
                                                        " />
                                                </div>
                                            </transition>

                                            <!-- <div v-if="!isVisible" class="container-fluid text-center mobile-only">
                                                <div class="row">
                                                    <div class="col">
                                                        <i :class="isOpen
                                                            ? 'bi bi-x-circle'
                                                            : 'bi bi-plus-circle-fill'
                                                            " class="text-center mobile-only h3 pt-3"
                                                            @click="toggleContent"></i>
                                                    </div>
                                                </div>
                                            </div> -->

                                            <!-- toolbar mobile -->
                                            <div v-if="isOpen" class="collapse-content mobile-only">
                                                <div v-if="!isVisible" class="card text-bg-light card-body">
                                                    <TransliterationActions
                                                        :targetTransliterationRef="'targetTransliterationElement'"
                                                        :transliteration="information ? information.transliteration : ''"
                                                        :isVisible="!isVisible" @open-modal="openModal"
                                                        @submit-form="submitFormTransliteration"
                                                        @toggle-audio="toggleAudioPlayback" />
                                                </div>
                                            </div>
                                            <!-- end toolbar mobile -->

                                            <SurahInfoModal :information="information" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <CorrectionModal />

                            <!-- Modals -->
                            <TranslationNote ref="translationNote" :information="modalInformation" />
                            <TafseerNote ref="tafseerNote" :information="modalInformation" />
                            <TransliterationNote ref="transliterationNote" :information="modalInformation" />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script defer>
import axios from "axios";
import Title from "./Intro/Title.vue";
import AdvancedSearch from "./search/AdvancedSearch.vue";
import SurahDropdown from "./search/SurahDropdown.vue";
import AyahDropdown from "./search/AyahDropdown.vue";
import ErrorAlert from "./search/ErrorAlert.vue";
import NavTabs from "./tabs/NavTabs.vue";
import TranslationSection from "./TranslationSection.vue";
import TafseerSection from "./TafseerSection.vue";
import TransliterationSection from "./TransliterationSection.vue";
import TranslationActions from "./TranslationActions.vue";
import TafseerActions from "./TafseerActions.vue";
import TransliterationActions from "./TransliterationActions.vue";
import TranslationNote from "./translation/features/notes/TranslationNote.vue";
import TafseerNote from "./translation/features/notes/TafseerNote.vue";
import TransliterationNote from "./translation/features/notes/TransliterationNote.vue";
import SurahInfoModal from "./modals/SurahInfoModal.vue";
import Welcome from "./Intro/Welcome.vue";
import HelpGuideModal from "./translation/HelpGuideModal.vue";

const STORAGE_KEYS = {
    toggle: "toggleState",
    swipeTip: "quran.swipeTipDismissed",
};

const PREFETCH_OFFSETS = [-2, -1, 1, 2];

function toNumber(value) {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
}

export default {
    name: "QuranComponent",
    components: {
        Title,
        AdvancedSearch,
        SurahDropdown,
        AyahDropdown,
        ErrorAlert,
        NavTabs,
        TranslationSection,
        TafseerSection,
        TransliterationSection,
        TranslationActions,
        TafseerActions,
        TransliterationActions,
        TranslationNote,
        TafseerNote,
        TransliterationNote,
        SurahInfoModal,
        Welcome,
        HelpGuideModal,
    },
    data() {
        return {
            // UI state
            isVisible: false,
            isOpen: false,
            isFullScreen: false,
            activeTab: "home",
            isMobile: false,
            isPlaying: false,
            expanded: false,
            showSwipeTip: false,
            showSwipeNotice: false,
            swipeNoticeText: "",
            swipeNoticeDir: "next",
            lastSwipeDir: "next",
            nextStepMinimized: false,
            screenReaderMessage: "",
            modalInformation: null,
            dropdownHidden: true,
            // Surah / Ayah data
            surat: [],
            filteredSurah: [],
            selectedSurahId: null,
            ayat: [],
            selectedIndexAyah: -1,
            selectedAyahId: null,
            selectedAyah: null,
            verseNumber: "",
            information: null,
            tafseer: null,
            translation: "",
            currentAyah: null,

            // Additional UI helpers consumed by child components
            showMoreLink: false,
            showAlertText: false,
            showAlert: false,
            showErrorAlert: false,
            showAlertTextNote: false,
            showAlert1: false,
            showError: false,

            // Network + cache state
            isLoading: false,
            ayahCache: Object.create(null),
            infoCache: Object.create(null),
            tafseerCache: Object.create(null),
            ayatInflight: null,
            fetchAyatTimer: null,

            // Alert + feedback
            alertMessage: "",
            alertType: "success",

            // Session data
            userId: null,

            // Gesture tracking
            allowGestures: true,
            activeSwipeSource: null,
            gestureHandled: false,
            touchStartX: 0,
            touchStartY: 0,
            touchEndX: 0,
            touchEndY: 0,
            touchStartTime: 0,
            pointerActive: false,
            pointerStartX: 0,
            pointerStartY: 0,
            pointerStartTime: 0,
            lastGestureTs: 0,
            wheelAccumX: 0,
            wheelLastTime: 0,
            swipeMinDistance: 20,
            swipeMaxDuration: 800,
            wheelThreshold: 35,
            wheelVertLeak: 30,
            wheelResetMs: 160,
            gestureCooldownMs: 300,
            // Next-step minimized state
        };
    },
    computed: {
        combinedText() {
            const translation = typeof this.information?.translation === "object"
                ? this.information.translation?.text
                : this.information?.translation;
            return translation ? `Translation: ${translation}` : "";
        },
    },
    created() {
        this.bootstrapComponent();
    },
    mounted() {
        this.updateIsMobile();
        this.updateInputModalityGestureGate();
        this.setupSwipeTip();

        this._onResize = () => {
            this.updateIsMobile();
            this.updateInputModalityGestureGate();
        };
        window.addEventListener("resize", this._onResize, { passive: true });

        this._onWheel = (event) => this.handleWindowWheel(event);
        window.addEventListener("wheel", this._onWheel, { passive: true });
    },
    beforeUnmount() {
        if (this._onResize) {
            window.removeEventListener("resize", this._onResize, { passive: true });
            this._onResize = null;
        }
        if (this._onWheel) {
            window.removeEventListener("wheel", this._onWheel, { passive: true });
            this._onWheel = null;
        }
        if (this.fetchAyatTimer) {
            clearTimeout(this.fetchAyatTimer);
            this.fetchAyatTimer = null;
        }
        if (this._swipeNoticeTimer) {
            clearTimeout(this._swipeNoticeTimer);
            this._swipeNoticeTimer = null;
        }
    },
    methods: {
        async bootstrapComponent() {
            this.restoreToggleState();
            this.userId = this.safeGetLocalStorage("userId");
            await this.fetchSurahList();
        },
        safeGetLocalStorage(key) {
            try {
                return window.localStorage.getItem(key);
            } catch (error) {
                return null;
            }
        },
        restoreToggleState() {
            const raw = this.safeGetLocalStorage(STORAGE_KEYS.toggle);
            if (raw !== null) {
                try {
                    this.isVisible = JSON.parse(raw);
                } catch (error) {
                    this.isVisible = raw === "true";
                }
            }
        },
        setupSwipeTip() {
            const dismissed = this.safeGetLocalStorage(STORAGE_KEYS.swipeTip);
            this.showSwipeTip = dismissed !== "1" && (this.isMobile || this.allowGestures);
        },
        async fetchSurahList() {
            try {
                const { data } = await axios.get("/get_surat");
                this.surat = Array.isArray(data) ? data : [];
                this.filteredSurah = this.surat;
            } catch (error) {
                console.error("Error fetching surahs:", error);
            }
        },
        saveToggleState() {
            try {
                window.localStorage.setItem(STORAGE_KEYS.toggle, JSON.stringify(this.isVisible));
            } catch (error) {
                // ignore storage issues gracefully
            }
        },
        toggleNextStepMinimized() {
            this.nextStepMinimized = !this.nextStepMinimized;
        },
        updateIsMobile() {
            this.isMobile = (window.innerWidth || 0) <= 767;
        },
        updateInputModalityGestureGate() {
            try {
                const hasTouch = "ontouchstart" in window || (navigator.maxTouchPoints || 0) > 0;
                this.allowGestures = hasTouch || this.isMobile;
            } catch (error) {
                this.allowGestures = this.isMobile;
            }
        },
        updateSelectedSurah(id) {
            const numeric = toNumber(id);
            if (!numeric || numeric === this.selectedSurahId) {
                return;
            }
            this.selectedSurahId = numeric;
            this.selectedIndexAyah = -1;
            this.selectedAyahId = null;
            this.selectedAyah = null;
            this.currentAyah = null;
            this.dropdownHidden = false;
            this.information = null;
            this.tafseer = null;
            this.scheduleFetchAyat(numeric);
        },
        scheduleFetchAyat(id = this.selectedSurahId) {
            if (!id) return;
            if (this.fetchAyatTimer) {
                clearTimeout(this.fetchAyatTimer);
            }
            this.fetchAyatTimer = setTimeout(() => this.fetchAyat(id), 150);
        },
        async fetchAyat(id = this.selectedSurahId) {
            if (!id) return;
            if (this.ayahCache[id]) {
                this.ayat = this.ayahCache[id];
                this.dropdownHidden = !this.ayat.length;
                if (this.ayat.length) {
                    this.selectAyah(Math.max(0, this.selectedIndexAyah));
                }
                return;
            }
            if (this.ayatInflight) return;
            try {
                this.isLoading = true;
                this.ayatInflight = axios.get("/get_ayat", { params: { surah_id: id } });
                const { data } = await this.ayatInflight;
                const ayat = Array.isArray(data) ? data : [];
                this.ayahCache[id] = ayat;
                this.ayat = ayat;
                this.dropdownHidden = !ayat.length;
                if (ayat.length) {
                    this.selectAyah(0);
                } else {
                    this.information = null;
                    this.tafseer = null;
                }
            } catch (error) {
                console.error("Error fetching ayat:", error);
            } finally {
                this.isLoading = false;
                this.ayatInflight = null;
            }
        },
        selectAyah(index) {
            if (!Array.isArray(this.ayat) || !this.ayat.length) return;
            const clamped = Math.max(0, Math.min(index, this.ayat.length - 1));
            if (this.selectedIndexAyah === clamped && this.information) {
                this.scrollToSelectedAyah();
                return;
            }
            this.selectedIndexAyah = clamped;
            const ayah = this.ayat[clamped];
            this.selectedAyah = ayah;
            this.currentAyah = ayah;
            this.selectedAyahId = ayah?.id ?? null;
            if (!ayah) return;
            this.updateCardSection(ayah);
            this.screenReaderMessage = `Selected verse ${ayah.ayah_id}`;
            this.scrollToSelectedAyah();
            this.ensureAyahPayload(ayah, clamped);
        },
        async ensureAyahPayload(ayah, index) {
            if (!ayah?.id) return;
            const cachedInfo = this.infoCache[ayah.id];
            const cachedTafseer = this.tafseerCache[ayah.id];
            if (cachedInfo && cachedTafseer) {
                this.applyAyahPayload(cachedInfo, cachedTafseer);
                this.prefetchAdjacentAyahData(index);
                return;
            }
            try {
                this.isLoading = true;
                const [info, tafseer] = await Promise.all([
                    this.fetchInformation(ayah.id),
                    this.fetchTafseer(ayah.id),
                ]);
                this.infoCache[ayah.id] = info;
                this.tafseerCache[ayah.id] = tafseer;
                this.applyAyahPayload(info, tafseer);
                this.prefetchAdjacentAyahData(index);
            } catch (error) {
                console.error("Error fetching ayah payload:", error);
            } finally {
                this.isLoading = false;
            }
        },
        applyAyahPayload(info, tafseer) {
            if (info) {
                this.information = info;
                this.modalInformation = info;
                this.translation = typeof info.translation === "object"
                    ? info.translation?.text
                    : info.translation;
            }
            if (tafseer) {
                this.tafseer = tafseer;
            }
        },
        prefetchAdjacentAyahData(index) {
            PREFETCH_OFFSETS.forEach((offset) => {
                const targetIndex = index + offset;
                if (targetIndex < 0 || targetIndex >= this.ayat.length) return;
                const target = this.ayat[targetIndex];
                if (!target?.id) return;
                if (!this.infoCache[target.id]) {
                    this.fetchInformation(target.id)
                        .then((info) => {
                            this.infoCache[target.id] = info;
                        })
                        .catch(() => { });
                }
                if (!this.tafseerCache[target.id]) {
                    this.fetchTafseer(target.id)
                        .then((tafseer) => {
                            this.tafseerCache[target.id] = tafseer;
                        })
                        .catch(() => { });
                }
            });
        },
        async fetchInformation(id) {
            const { data } = await axios.get("/get_informations", { params: { id } });
            return data;
        },
        async fetchTafseer(id) {
            const { data } = await axios.get(`/tafseer/${id}/fetch`);
            return data;
        },
        scrollToSelectedAyah() {
            this.$nextTick(() => {
                const list = this.$refs.ayahList;
                if (!list) return;
                const selected = list.querySelector(".selected");
                if (selected) {
                    selected.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
            });
        },
        updateCardSection(ayah) {
            this.currentAyah = ayah;
        },
        dismissError() {
            this.showError = false;
        },
        goToFirstAyah() {
            this.selectAyah(0);
        },
        goToPreviousAyah() {
            if (!this.ayat.length) return;
            const nextIndex = (this.selectedIndexAyah - 1 + this.ayat.length) % this.ayat.length;
            this.selectAyah(nextIndex);
        },
        goToNextAyah() {
            if (!this.ayat.length) return;
            const nextIndex = (this.selectedIndexAyah + 1) % this.ayat.length;
            this.selectAyah(nextIndex);
        },
        goToLastAyah() {
            if (!this.ayat.length) return;
            this.selectAyah(this.ayat.length - 1);
        },
        handleInputChange(payload) {
            if (payload && Array.isArray(payload.results)) {
                this.filteredResults = payload.results;
            }
        },
        toggleContent() {
            this.isOpen = !this.isOpen;
        },
        toggleExpand() {
            this.expanded = !this.expanded;
        },
        toggleFullScreen() {
            this.isFullScreen = !this.isFullScreen;
        },
        toggleAudioPlayback() {
            const sections = [
                this.$refs.translationSection,
                this.$refs.tafseerSection,
                this.$refs.transliterationSection,
            ].filter(Boolean);
            sections.forEach((section) => {
                if (typeof section?.toggleSpeech === "function") {
                    try {
                        section.toggleSpeech();
                    } catch (error) {
                        console.warn("toggleSpeech failed", error);
                    }
                }
            });
        },
        updateInformation(info) {
            if (!info) return;
            this.information = info;
            this.modalInformation = info;
            this.translation = typeof info.translation === "object"
                ? info.translation?.text
                : info.translation;
            if (info.ayah?.id) {
                this.infoCache[info.ayah.id] = info;
            }
        },
        updateTafseer(tafseer) {
            this.tafseer = tafseer;
            if (this.selectedAyahId) {
                this.tafseerCache[this.selectedAyahId] = tafseer;
            }
        },
        releaseSwipeSource(source) {
            if (this.activeSwipeSource === source) {
                this.activeSwipeSource = null;
            }
            const finalize = () => {
                this.touchEndX = 0;
                this.touchEndY = 0;
            };
            if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
                window.requestAnimationFrame(finalize);
            } else {
                setTimeout(finalize, 0);
            }
        },
        shouldProcessGesture() {
            const now = Date.now();
            if (now - this.lastGestureTs < this.gestureCooldownMs) {
                return false;
            }
            this.lastGestureTs = now;
            return true;
        },
        handleTouchStart(event) {
            if (!this.allowGestures) return;
            if (this.activeSwipeSource && this.activeSwipeSource !== "touch") return;
            this.activeSwipeSource = "touch";
            this.gestureHandled = false;
            const touch = event.changedTouches ? event.changedTouches[0] : event;
            this.touchStartX = touch.clientX ?? 0;
            this.touchStartY = touch.clientY ?? 0;
            this.touchStartTime = Date.now();
        },
        handleTouchMove(event) {
            if (!this.allowGestures || this.activeSwipeSource !== "touch") return;
            const touch = event.changedTouches ? event.changedTouches[0] : event;
            this.touchEndX = touch.clientX ?? 0;
            this.touchEndY = touch.clientY ?? 0;
        },
        handleTouchEnd(event) {
            if (!this.allowGestures || (this.activeSwipeSource && this.activeSwipeSource !== "touch")) return;
            const deltaX = (this.touchEndX || this.touchStartX) - this.touchStartX;
            const deltaY = (this.touchEndY || this.touchStartY) - this.touchStartY;
            const duration = Date.now() - this.touchStartTime;
            if (this.gestureHandled) {
                this.releaseSwipeSource("touch");
                return;
            }
            if (
                Math.abs(deltaX) < this.swipeMinDistance ||
                Math.abs(deltaY) > this.wheelVertLeak ||
                duration > this.swipeMaxDuration
            ) {
                this.releaseSwipeSource("touch");
                return;
            }
            if (!this.shouldProcessGesture()) {
                this.releaseSwipeSource("touch");
                return;
            }
            this.gestureHandled = true;
            if (event?.cancelable) {
                event.preventDefault();
            }
            event?.stopPropagation?.();
            // Swipe right (deltaX > 0) should advance to next; swipe left to previous
            if (deltaX > 0) {
                this.goToNextAyah();
                this.triggerSwipeFeedback("next");
            } else {
                this.goToPreviousAyah();
                this.triggerSwipeFeedback("prev");
            }
            this.releaseSwipeSource("touch");
        },
        handlePointerDown(event) {
            if (!this.allowGestures || event.pointerType === "mouse" || event.pointerType === "touch") return;
            if (this.activeSwipeSource && this.activeSwipeSource !== "pointer") return;
            this.activeSwipeSource = "pointer";
            this.pointerActive = true;
            this.gestureHandled = false;
            this.pointerStartX = event.clientX;
            this.pointerStartY = event.clientY;
            this.pointerStartTime = Date.now();
        },
        handlePointerMove(event) {
            if (
                !this.allowGestures ||
                !this.pointerActive ||
                this.activeSwipeSource !== "pointer" ||
                event.pointerType === "touch"
            ) {
                return;
            }
            this.touchEndX = event.clientX;
            this.touchEndY = event.clientY;
        },
        handlePointerUp(event) {
            if (
                !this.allowGestures ||
                !this.pointerActive ||
                this.activeSwipeSource !== "pointer" ||
                event.pointerType === "touch"
            ) {
                return;
            }
            this.pointerActive = false;
            const deltaX = (this.touchEndX || this.pointerStartX) - this.pointerStartX;
            const duration = Date.now() - this.pointerStartTime;
            if (this.gestureHandled) {
                this.releaseSwipeSource("pointer");
                return;
            }
            if (Math.abs(deltaX) < this.swipeMinDistance || duration > this.swipeMaxDuration) {
                this.releaseSwipeSource("pointer");
                return;
            }
            if (!this.shouldProcessGesture()) {
                this.releaseSwipeSource("pointer");
                return;
            }
            this.gestureHandled = true;
            // Swipe right (deltaX > 0) should advance to next; swipe left to previous
            if (deltaX > 0) {
                this.goToNextAyah();
                this.triggerSwipeFeedback("next");
            } else {
                this.goToPreviousAyah();
                this.triggerSwipeFeedback("prev");
            }
            this.releaseSwipeSource("pointer");
        },
        handleWindowWheel(event) {
            if (!this.allowGestures) return;
            const now = Date.now();
            if (now - this.wheelLastTime > this.wheelResetMs) {
                this.wheelAccumX = 0;
            }
            this.wheelAccumX += event.deltaX;
            this.wheelLastTime = now;
            if (Math.abs(this.wheelAccumX) < this.wheelThreshold) return;
            if (!this.shouldProcessGesture()) {
                this.wheelAccumX = 0;
                return;
            }
            if (this.wheelAccumX > 0) {
                this.goToNextAyah();
                this.triggerSwipeFeedback("next");
            } else {
                this.goToPreviousAyah();
                this.triggerSwipeFeedback("prev");
            }
            this.wheelAccumX = 0;
        },
        handleWheelTranslation(event) {
            this.handleWindowWheel(event);
        },
        handleWheelTafseer(event) {
            this.handleWindowWheel(event);
        },
        handleWheelTransliteration(event) {
            this.handleWindowWheel(event);
        },
        triggerSwipeFeedback(direction) {
            this.lastSwipeDir = direction;
            this.swipeNoticeDir = direction;
            this.swipeNoticeText = direction === "next" ? "Next verse" : "Previous verse";
            this.showSwipeNotice = true;
            if (this._swipeNoticeTimer) {
                clearTimeout(this._swipeNoticeTimer);
            }
            this._swipeNoticeTimer = setTimeout(() => {
                this.showSwipeNotice = false;
                this._swipeNoticeTimer = null;
            }, 500);
        },
        dismissSwipeTip() {
            this.showSwipeTip = false;
            try {
                window.localStorage.setItem(STORAGE_KEYS.swipeTip, "1");
            } catch (error) {
                // ignore
            }
        },
        clearHighlight() {
            // placeholder for child callback
        },
        highlightText(charIndex, currentWord) {
            if (this.$refs.translationSection?.highlightText) {
                this.$refs.translationSection.highlightText(charIndex, currentWord);
            }
        },
        closeModal() {
            this.modalInformation = null;
        },
        openModal(refName) {
            const ref = this.$refs[refName];
            if (ref && typeof ref.showModal === "function") {
                ref.showModal();
            }
        },
        closeAlertText() {
            this.showAlertText = false;
        },
        updateSuccessMessage(message) {
            this.alertMessage = message;
            this.showAlertText = !!message;
        },
        async sendBookmark(payload, successMessage) {
            try {
                await axios.post("/bookmarks", payload);
                this.alertMessage = successMessage;
                this.alertType = "success";
                this.showAlert = true;
                this.scheduleAlertDismiss();
            } catch (error) {
                console.error("Error submitting bookmark:", error);
                this.showErrorAlert = true;
                this.scheduleAlertDismiss("error");
            }
        },
        submitBookmarkPayload(content, successMessage) {
            const ayah = this.information?.ayah;
            if (!ayah || !content) {
                this.showErrorAlert = true;
                this.scheduleAlertDismiss("error");
                return;
            }
            const payload = {
                surah_name: ayah.surah?.name_en,
                ayah_num: this.information?.ayah_id,
                ayah_verse_ar: ayah.ayah_text,
                ayah_verse_en: content,
                user_id: this.userId,
            };
            this.sendBookmark(payload, successMessage);
        },
        submitForm() {
            this.submitBookmarkPayload(this.translation, "Ayah bookmarked successfully!");
        },
        submitFormTafseer() {
            this.submitBookmarkPayload(this.tafseer, "Tafseer bookmarked successfully!");
        },
        submitFormTransliteration() {
            const transliteration = this.information?.transliteration;
            this.submitBookmarkPayload(transliteration, "Transliteration bookmarked successfully!");
        },
        scheduleAlertDismiss(type = "success") {
            setTimeout(() => {
                if (type === "success") {
                    this.showAlert = false;
                } else {
                    this.showErrorAlert = false;
                }
            }, 3000);
        },
        getAyat() {
            this.scheduleFetchAyat();
        },
        selectSurahFromResults(surah) {
            if (!surah) return;
            this.updateSelectedSurah(surah.id || surah);
        },
    },
    watch: {
        ayat(newAyat) {
            if (Array.isArray(newAyat) && newAyat.length) {
                this.selectAyah(0);
            }
        },
        verseNumber(newVal, oldVal) {
            if (newVal !== oldVal) {
                const numeric = toNumber(newVal);
                if (numeric && numeric >= 1 && numeric <= this.ayat.length) {
                    this.selectAyah(numeric - 1);
                }
            }
        },
        selectedSurahId(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.scheduleFetchAyat(newVal);
            }
        },
    },
};
</script>

<style scoped src="./css/styles.css"></style>
<style scoped>
.card-teal {
    border-radius: 20px;
    border: 1px solid rgba(20, 184, 165, 0);
    box-shadow: 0 12px 28px rgba(2, 44, 34, 0.08);
    background: linear-gradient(180deg, #ffffff 0%, #f9fefd 60%, #f2fbfa 100%);
    transition: transform 160ms ease, box-shadow 160ms ease;
}

.card-teal:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 40px rgba(2, 44, 34, 0.12);
}

.companion-hero {
    background: linear-gradient(145deg, #f4f9f7, #fdfcf8);
    border: 1px solid rgba(11, 128, 111, 0.12);
    border-radius: 28px;
    padding: clamp(1.5rem, 4vw, 3rem);
    /* margin: 2.5rem auto 1rem; */
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
}

.hero-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2.5rem;
}

.hero-text {
    text-align: left;
    max-width: 640px;
}

.hero-eyebrow {
    letter-spacing: 0.3em;
    font-size: 0.78rem;
    color: #1a5f7a;
}

:deep(.hero-title) {
    color: #0f172a;
    font-size: clamp(2.4rem, 5vw, 3.5rem);
    margin-bottom: 1rem;
}

.hero-copy {
    color: #1f2933;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
}

.hero-visual {
    position: relative;
    width: 280px;
    aspect-ratio: 1 / 1;
    align-items: center;
    justify-content: center;
}

.hero-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(11, 128, 111, 0.35);
    box-shadow: 0 10px 25px rgba(11, 128, 111, 0.15);
    animation: heroPulse 8s ease-in-out infinite;
}

.ring-1 {
    width: 90%;
    height: 90%;
    animation-delay: 0s;
}

.ring-2 {
    width: 70%;
    height: 70%;
    animation-delay: 2s;
}

.ring-3 {
    width: 50%;
    height: 50%;
    animation-delay: 4s;
    background: radial-gradient(circle, rgba(11, 128, 111, 0.1), transparent 65%);
}

@keyframes heroPulse {

    0%,
    100% {
        transform: scale(1);
        opacity: 0.95;
    }

    50% {
        transform: scale(1.05);
        opacity: 0.6;
    }
}

.selector-card {
    background: transparent !important;
    border-radius: 20px;
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.06);
}

.selector-heading {
    margin-bottom: 0.75rem;
}

.field-helper {
    color: #5f6b7b;
    font-size: 0.92rem;
    margin-bottom: 0;
}

.selector-control {
    padding-right: 15px;
    border-radius: 20px;
    /* background: #f8fafc; */
}

.ayah-scroll {
    overflow-y: auto;
    cursor: pointer;
    border: 1px solid rgba(49, 70, 67, 0.22);
    border-radius: 18px;
    max-height: 600px;
    background: #ffffff;
    padding: 0.25rem 0.5rem;
}

.ayah-item {
    padding: 0.85rem 1rem;
    padding-bottom: 2px;
    border-radius: 16px;
    transition: background 0.2s ease, border 0.2s ease, transform 0.15s ease;
    border: 1px solid transparent;
    margin-bottom: 0.35rem;
}

.ayah-item:hover,
.ayah-item:focus-within {
    background: rgba(11, 128, 111, 0.05);
    border-color: rgba(11, 128, 111, 0.35);
}

.ayah-item.selected {
    background: rgba(11, 128, 111, 0.12);
    border-color: rgba(11, 128, 111, 0.45);
    box-shadow: 0 10px 30px rgba(11, 128, 111, 0.15);
}

.ayah-label {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.92rem;
    color: #0b5d4b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.ayah-text {
    font-weight: 600;
    color: #1f2a37;
    line-height: 1.6;
}

@media (max-width: 991px) {
    .hero-inner {
        flex-direction: column;
        text-align: center;
    }

    .hero-text {
        text-align: center;
    }

    .selector-card {
        padding: 1.25rem;
    }
}

@media (max-width: 576px) {
    .companion-hero {
        border-radius: 18px;
        padding: 1.5rem;
    }

    .hero-copy {
        font-size: 1rem;
    }

}

.swipe-tip {
    background-color: #e7f1ff;
    /* light blue */
    border: 1px solid #b6d4fe;
    /* blue border */
    color: #0a58ca;
    /* primary blue text */
    border-radius: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.swipe-tip .btn-close {
    width: .25rem;
    height: .25rem;
    padding: .25rem;
}

.swipe-tip .icon-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #0a58ca;
    color: #fff;
    font-size: 12px;
}

.swipe-surface {
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
}

/* Hint the compositor */
.swipe-surface {
    will-change: transform;
}

/* Direction-aware verse transition */
.swipe-next-enter-from {
    opacity: 0;
    transform: translateX(24px);
}

.swipe-next-enter-active {
    transition: transform 160ms ease, opacity 160ms ease;
}

.swipe-next-enter-to {
    opacity: 1;
    transform: translateX(0);
}

.swipe-prev-enter-from {
    opacity: 0;
    transform: translateX(-24px);
}

.swipe-prev-enter-active {
    transition: transform 160ms ease, opacity 160ms ease;
}

.swipe-prev-enter-to {
    opacity: 1;
    transform: translateX(0);
}

/* Swipe success notice */
.swipe-notice {
    position: fixed;
    left: 50%;
    top: 80px;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.85);
    color: #fff;
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    pointer-events: none;
    z-index: 1000;
    animation: swipeNoticeFade 500ms ease both;
}

.swipe-notice.right i {
    transform: translateY(1px);
}

.swipe-notice.left i {
    transform: translateY(1px);
}

@keyframes swipeNoticeFade {
    from {
        opacity: 0;
        transform: translate(-50%, -4px);
    }

    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}

.next-step-card {
    position: relative;
}

.next-step-close {
    position: absolute;
    top: 12px;
    right: 12px;
    filter: invert(35%) sepia(16%) saturate(640%) hue-rotate(133deg) brightness(94%) contrast(91%);
}
</style>
