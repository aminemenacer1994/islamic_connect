<template>
    <div id="app">

        <div class="py-4 position-relative" style="margin-top:10px">
            <div v-if="!isVisible" class="shadow-md pb3">
                <!-- <h4 class="fw-bold text-center pt-2 mb-2 container" v-if="information != null">Search for a word in the
                    Quran...</h4> -->
                <AdvancedSearch @input-change="handleInputChange" v-if="information != null" />
                <div v-if="information" class="next-step-card container">
                    <button type="button" :title="nextStepMinimized ? 'Restore' : 'Minimize'"
                        :aria-label="nextStepMinimized ? 'Restore next step' : 'Minimize next step'"
                        @click="toggleNextStepMinimized" class="next-step-toggle">
                        <i class="bi" :class="nextStepMinimized ? 'bi-fullscreen' : 'bi-fullscreen-exit'"
                            aria-hidden="true"></i>
                    </button>
                    <div class="d-flex align-items-start gap-3 text-start">
                        <div class="flex-shrink-0 mt-1">
                            <div class="next-step-icon-circle">
                                <i class="bi bi-headphones" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            <p class="mb-2 fw-semibold text-uppercase next-step-eyebrow">
                                NEXT STEP
                            </p>
                            <div v-show="nextStepMinimized" class="mb-2 next-step-teaser">
                                <a href="/surat" class="fw-semibold text-decoration-none next-step-link">
                                    Listen to Qur’anic recitations
                                </a>
                                <i class="bi bi-box-arrow-up-right ms-1 next-step-link-icon"></i>
                            </div>
                            <p v-show="!nextStepMinimized" class="mb-3 next-step-text">
                                As-salaamu alaikum if this is your first deep dive into Islam, let the verses you
                                just read continue to surround you. Slip over to our curated
                                <a href="/surat" class="fw-semibold text-decoration-none next-step-link">
                                    recitation list
                                </a>
                                and hear the Qur’an with translations that keep every word close.
                            </p>
                            <a v-show="!nextStepMinimized" href="/surat"
                                class="btn btn-sm fw-semibold text-white px-3 py-2 next-step-cta">
                                Listen Now
                                <i class="bi bi-box-arrow-up-right ms-2"></i>
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
                        <div
                            v-if="selectedSurahMeta"
                            class="quran-selected-surah-identity"
                            role="status"
                            aria-live="polite"
                            aria-atomic="true">
                            <div class="quran-selected-surah-identity-inner d-flex align-items-center flex-nowrap">
                                <span
                                    v-if="selectedSurahMeta.arabicName"
                                    class="quran-selected-surah-identity-ar text-end"
                                    dir="rtl">
                                    {{ selectedSurahMeta.arabicName }}
                                </span>
                                <div class="quran-selected-surah-identity-en d-flex flex-column text-start flex-grow-1">
                                    <span class="quran-selected-surah-identity-en-main d-inline-flex align-items-center">
                                        <span
                                            v-if="selectedSurahMeta.number"
                                            class="quran-selected-surah-identity-number">
                                            {{ selectedSurahMeta.number }}.
                                        </span>
                                        <span class="quran-selected-surah-identity-title">
                                            {{ selectedSurahMeta.englishName }}
                                        </span>
                                    </span>
                                    <span
                                        v-if="selectedSurahMeta.translationName"
                                        class="quran-selected-surah-identity-en-sub">
                                        {{ selectedSurahMeta.translationName }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div v-if="selectedSurahId" class="quran-ayah-jump">
                            <div class="selector-heading">
                                <h5 id="ayah-jump-label" class="fw-bold text-left mb-1">Go to Ayah</h5>
                                <p class="field-helper">
                                    Enter an ayah number or range like 25 or 25-30.
                                    <span v-if="selectedSurahAyahTotal">
                                        This surah has {{ selectedSurahAyahTotal }} verses.
                                    </span>
                                </p>
                            </div>
                            <form class="quran-ayah-jump-form" @submit.prevent="submitAyahJump">
                                <label for="ayah-jump-input" class="visually-hidden">
                                    Enter ayah number or ayah range
                                </label>
                                <input
                                    id="ayah-jump-input"
                                    v-model.trim="ayahJumpInput"
                                    type="text"
                                    inputmode="numeric"
                                    autocomplete="off"
                                    class="form-control quran-ayah-jump-input"
                                    :class="{ 'is-invalid': ayahJumpError }"
                                    :disabled="!selectedSurahAyahTotal"
                                    aria-labelledby="ayah-jump-label"
                                    placeholder="e.g. 25 or 25-30"
                                    @input="clearAyahJumpError" />
                                <button
                                    type="submit"
                                    class="btn quran-ayah-jump-button"
                                    :disabled="!selectedSurahAyahTotal || !ayahJumpInput.trim()">
                                    Go to
                                </button>
                            </form>
                            <div v-if="ayahJumpError" class="invalid-feedback d-block">
                                {{ ayahJumpError }}
                            </div>
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

                    <div class="gesture-nav-toggle mb-3">
                        <div class="gesture-nav-toggle__copy text-start">
                            <p class="gesture-nav-toggle__title mb-1">Gesture Navigation</p>
                            <p id="gesture-navigation-hint" class="gesture-nav-toggle__hint mb-0">
                                Swipe left or right to move between verses.
                            </p>
                        </div>
                        <div class="form-check form-switch mb-0">
                            <input id="gesture-navigation-toggle" class="form-check-input gesture-nav-toggle__input"
                                type="checkbox" :checked="gestureNavigationEnabled"
                                aria-describedby="gesture-navigation-hint"
                                @change="handleGestureNavigationToggle" />
                            <label class="form-check-label gesture-nav-toggle__label ms-2"
                                for="gesture-navigation-toggle">
                                {{ gestureNavigationEnabled ? 'On' : 'Off' }}
                            </label>
                        </div>
                    </div>

                    <div class="card card-teal"
                        style="background-color:#ffffff; border-radius:18px; border:1px solid rgba(2,6,23,0.06); box-shadow: 0 14px 36px rgba(15, 23, 42, 0.08); overflow:hidden; transition: box-shadow .2s ease;">
                        <div v-if="information != null">
                            <div class="container-fluid ">
                                <div class="row">
                                    <NavTabs />

                                </div>

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
                                        <div class="desktop-actions hide-on-mobile mb-3" v-if="!isVisible">
                                            <div v-if="isOpen" class="text-center">
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
                                                    <div class="col desktop-icon" style="cursor: pointer;">
                                                        <i title="Give feedback" data-bs-toggle="modal"
                                                            data-bs-target="#exampleModal"
                                                            class="bi bi-chat-left-text desktop-icon text-right mr-2 h4"
                                                            data-bs-placement="top"></i>
                                                        <div class="icon-text pt-2">Feedback</div>
                                                    </div>
                                                </div>
                                                <hr style="border: 1px solid #e5e7eb; margin: 10px 0 0 0;" />
                                            </div>
                                        </div>

                                        <!-- mobile navigation  -->
                                        <div class="dropdown mobile-only pb-2" :aria-hidden="!isMobile">
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
                                            <div class="desktop-actions hide-on-mobile mb-3" v-if="!isVisible">
                                                <div v-if="isOpen" class="text-center">
                                                    <div class="row pt-2">
                                                        <div class="col desktop-icon" style="cursor: pointer;">
                                                            <i class="bi bi-file-earmark-text text-right mr-2 h4"
                                                                aria-expanded="false" data-bs-placement="top"
                                                                title="Write a note" @click="openModal('tafseerNote')"></i>
                                                            <div class="col desktop-icon">
                                                                <div class="icon-text pt-2 mb-2">Write a Note</div>
                                                            </div>
                                                        </div>
                                                        <div class="col desktop-icon" style="cursor: pointer;">
                                                            <i @click="submitFormTafseer" class="bi bi-bookmark text-right mr-2 h4"
                                                                aria-expanded="false" data-bs-placement="top"
                                                                title="Bookmark verse"></i>
                                                            <div class="col desktop-icon">
                                                                <div class="icon-text pt-2 mb-2">Bookmark</div>
                                                            </div>
                                                        </div>
                                                        <div class="col desktop-icon" style="cursor: pointer;">
                                                            <i title="Give feedback" data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                                class="bi bi-chat-left-text text-right mr-2 h4"
                                                                aria-expanded="false" data-bs-placement="top"></i>
                                                            <div class="col desktop-icon">
                                                                <div class="icon-text pt-2 mb-2">Feedback</div>
                                                            </div>
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
                                                <!-- desktop top features -->
                                            <div class="desktop-actions hide-on-mobile mb-3" v-if="!isVisible">
                                                <div v-if="isOpen" class="text-center">
                                                    <div class="row pt-2">
                                                        <div class="col desktop-icon" style="cursor: pointer;">
                                                            <i class="bi bi-file-earmark-text text-right mr-2 h4"
                                                                aria-expanded="false" data-bs-placement="top"
                                                                title="Write a note"
                                                                @click="openModal('transliterationNote')"></i>
                                                            <div class="col desktop-icon">
                                                                <div class="icon-text pt-2 mb-2">Write a Note</div>
                                                            </div>
                                                        </div>
                                                        <div class="col desktop-icon" style="cursor: pointer;">
                                                            <i @click="submitFormTransliteration" class="bi bi-bookmark text-right mr-2 h4"
                                                                aria-expanded="false" title="Bookmark verse"></i>
                                                            <div class="col desktop-icon">
                                                                <div class="icon-text pt-2 mb-2">Bookmark</div>
                                                            </div>
                                                        </div>
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

<script src="../scripts/QuranComponent.script.js"></script>
<style scoped src="../styles/css/styles.css"></style>
<style scoped src="../styles/QuranComponent.style.css"></style>
