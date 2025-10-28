<template>
    <div id="app">
        <div class="py-4 text-center ">
            <Title />
            <!-- <ChatBot /> -->
            <h1 class="text-center container mb-4 lead" style="line-height: 1.6em;">
                The Quran Companion page utilizes AI tools and accessibility features to enrich your learning
                experience. It offers text-to-speech, speech-to-text, and synchronized highlighting and more.
            </h1>
            <div v-if="!isVisible" class="shadow-md">
                <!-- <h4 class="fw-bold text-center pt-2 mb-2 container" v-if="information != null">Search for a word in the
                    Quran...</h4> -->
                <AdvancedSearch @input-change="handleInputChange" v-if="information != null" />

            </div>
            <!-- <custom-surah-selection v-if="information != null" :customSurat="customSuratList" v-model="selectedSurah"></custom-surah-selection> -->


            <!-- accordion headers -->
            <div class="row ">
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


                <div class="col-md-4 pt-2">
                    <h5 id="surah-select-label" class="fw-bold text-left -2 ">Select a Surah:</h5>
                    <SurahDropdown aria-labelledby="surah-select-label" class="col-md-12" :selectedSurah="selectedSurahId" :filteredSurah="filteredSurah"
                        :surat="surat" @update:selectedSurah="updateSelectedSurah" @fetchAyat="getAyat" />

                    <!-- <FilteredSurahList :filteredSurah="filteredSurah" @select-surah="selectSurahFromResults" /> -->
                   

                    <!-- <AddBookmark /> -->
                    <!-- </div> -->
                    <h5 id="ayah-select-label" class="fw-bold text-left mb-2" v-if="information != null">Select a Verse:</h5>
                    <!-- <form class="d-flex pb-2 container hide-on-mobile-tablet" v-if="information != null" role="search"
                        @submit.prevent="scrollToAyah">
                        <input class="form-control me-2" style="border: 3px solid #31464338; border-radius: 10px; "
                            type="number" placeholder="Enter Verse Number" v-model="verseNumber" required />
                        <button class="btn btn-success mb-1 ml-1" style="background: #0b5d4b;border-radius: 5px;"
                            type="submit">
                            Search
                        </button>
                    </form> -->
                    <AyahDropdown aria-labelledby="ayah-select-label" :selectedSurahId="selectedSurahId" :dropdownHidden="dropdownHidden"
                        @update-information="updateInformation" @update-tafseer="updateTafseer"
                        v-if="ayah == null && !dropdownHidden"
                        class="ayah-dropdown-hidden-on-desktop d-block d-md-none" />

                    <!-- List of Ayat for Surah (desktop) -->
                    <div class="tab-content hide-on-mobile-tablet" id="nav-tabContent"
                        v-if="ayah == null && !dropdownHidden">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel"
                            aria-labelledby="nav-home-tab" v-if="ayah == null">

                            <!-- Error alert -->
                            <ErrorAlert :showError="showError" @dismiss-error="dismissError" />

                            <div class="row ">

                                <div class="custom-scrollbar pb-3 w-100" style="
                                    overflow-y: auto; cursor: pointer;                             
                                    border: 1px solid #31464338; border-radius: 8px;
                                    max-height: 600px;
                                    background: white;">


                                    <ul class="col-md-12 list-group root" id="toggle" ref="ayahList"
                                        role="listbox" tabindex="0" :aria-activedescendant="selectedIndexAyah >= 0 ? `ayah-option-${selectedIndexAyah}` : null" aria-label="Ayah list" aria-controls="ayah-content"
                                        style="list-style-type: none">

                                        <li v-for="(ayah, index) in ayat" :key="ayah.id || index" @click="selectAyah(index)"
                                            role="option"
                                            :id="`ayah-option-${index}`"
                                            :aria-selected="selectedIndexAyah === index"
                                            :tabindex="selectedIndexAyah === index ? 0 : -1"
                                            @keydown.enter.prevent="selectAyah(index)"
                                            @keydown.space.prevent="selectAyah(index)"
                                            :class="{
                                                selected:
                                                    selectedIndexAyah === index ||
                                                    (verseNumber &&
                                                        parseInt(verseNumber) ===
                                                        ayah.ayah_id),
                                            }" style="
                                            padding: 8px;
                                            border-radius: 15px;">
                                            <h5 class="text-right" style="display: flex; font-weight: bold;">
                                                Verse: {{ ayah.ayah_id }}
                                            </h5>
                                            <h5 class="text-right">
                                                {{ ayah.ayah_text }}
                                            </h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 pt-2 card-hide text-left pr-4">
                    <Welcome v-if="information == null" />
                    
                    <div class="mb-2" v-else>
                        <!-- <h4 class="fw-bold text-center" >Verse Breakdown...</h4> -->
                        <!-- breakdown content here -->
                         
                    </div>
                    <div class="card content" >
                        <div  v-if="information != null">
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

                            <div class="card-body content">
                                <div class="tab-content text-center">
                                    <!-- <Welcome :information="information" /> -->

                                    <!-- Translation Section -->
                                    <div class="tab-pane active content " id="home" role="tabpanel"
                                        v-if="information != null">
                                        <!-- Screen reader live region for announcing selection changes -->
                                        <div class="visually-hidden" aria-live="polite" aria-atomic="true">{{ screenReaderMessage }}</div>
                                        <div id="ayah-content" :selectedSurahId="selectedSurah" @update-tafseer="updateTafseer"
                                            @update-information="updateInformation" :style="{


                                            }" class="icon-container hide-on-mobile mb-3">
                                            <div class="text-center icon-text" role="group" aria-label="Verse navigation controls" :aria-hidden="isMobile">
                                                <i class="bi bi-skip-start-fill h2 pt- custom-prev-ayah"
                                                    role="button" aria-label="Go to first verse" :tabindex="isMobile ? -1 : 0"
                                                    @keydown.enter.prevent="goToFirstAyah" @keydown.space.prevent="goToFirstAyah"
                                                    style="cursor: pointer" @click="goToFirstAyah"
                                                    title="First verse"></i>
                                                <div class="large">First verse</div>
                                            </div>
                                            <div class="text-center" role="group" aria-label="Previous verse" :aria-hidden="isMobile">
                                                <i class="bi bi-arrow-left-circle-fill pt-2 h4 custom-prev-ayah desktop-icon"
                                                    role="button" aria-label="Go to previous verse" :tabindex="isMobile ? -1 : 0"
                                                    @keydown.enter.prevent="goToPreviousAyah" @keydown.space.prevent="goToPreviousAyah"
                                                    style="cursor: pointer" @click="goToPreviousAyah"
                                                    title="Previous verse"></i>
                                                <div class="large">Previous verse</div>
                                            </div>
                                            <div class="text-center" role="group" aria-label="Next verse" :aria-hidden="isMobile">
                                                <i class="bi bi-arrow-right-circle-fill pt-2 h4 custom-prev-ayah desktop-icon"
                                                    role="button" aria-label="Go to next verse" :tabindex="isMobile ? -1 : 0"
                                                    @keydown.enter.prevent="goToNextAyah" @keydown.space.prevent="goToNextAyah"
                                                    style="cursor: pointer" @click="goToNextAyah"
                                                    title="Next verse"></i>
                                                <div class="large">Next verse</div>
                                            </div>
                                            <div class="text-center" role="group" aria-label="Last verse" :aria-hidden="isMobile">
                                                <i class="bi bi-skip-end-fill pt-2 h2 custom-prev-ayah desktop-icon"
                                                    role="button" aria-label="Go to last verse" :tabindex="isMobile ? -1 : 0"
                                                    @keydown.enter.prevent="goToLastAyah" @keydown.space.prevent="goToLastAyah"
                                                    style="cursor: pointer" @click="goToLastAyah"
                                                    title="Last verse"></i>
                                                <div class="large">Last verse</div>
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
                                                                data-bs-placement="top"
                                                                title="Write a note"
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
                                                <hr style="border: 2px solid #333" />
                                            </div>
                                        </div>

                                        <!-- mobile navigation  -->
                                        <div class="dropdown mobile-only pb-2" :aria-hidden="!isMobile">
                                            <div :style="iconStyle" class="icon-container" role="group" aria-label="Verse navigation controls (mobile)">

                                                <i class="bi bi-chevron-bar-left h4" style="cursor: pointer"
                                                    role="button" aria-label="Go to first verse" :tabindex="isMobile ? 0 : -1"
                                                    @keydown.enter.prevent="goToFirstAyah" @keydown.space.prevent="goToFirstAyah"
                                                    @click="goToFirstAyah()" title="First verse"></i>
                                                <i class="bi bi-arrow-left-circle h4" style="cursor: pointer"
                                                    role="button" aria-label="Go to previous verse" :tabindex="isMobile ? 0 : -1"
                                                    @keydown.enter.prevent="goToPreviousAyah" @keydown.space.prevent="goToPreviousAyah"
                                                    @click="goToPreviousAyah()" title="Previous verse"></i>
                                                <!-- <i @click="submitForm" class="bi bi-bookmark mb-2 h4"
                                                    aria-expanded="false" data-bs-placement="top"
                                                    title="Bookmark verse"></i> -->
                                                <i class="bi bi-arrow-right-circle h4" style="cursor: pointer"
                                                    role="button" aria-label="Go to next verse" :tabindex="isMobile ? 0 : -1"
                                                    @keydown.enter.prevent="goToNextAyah" @keydown.space.prevent="goToNextAyah"
                                                    @click="goToNextAyah()" title="Next verse"></i>
                                                <i class="bi bi-chevron-bar-right h4" style="cursor: pointer"
                                                    role="button" aria-label="Go to last verse" :tabindex="isMobile ? 0 : -1"
                                                    @keydown.enter.prevent="goToLastAyah" @keydown.space.prevent="goToLastAyah"
                                                    @click="goToLastAyah()" title="Last verse"></i>
                                            </div>
                                            <!-- Mobile/Tablet tip: swipe between verses -->
                                            <div v-if="showSwipeTip" class="swipe-tip alert py-2 mt-2 d-flex align-items-center justify-content-between mb-0 d-xxl-none" role="alert">
                                                <div class="d-flex align-items-center overflow-hidden">
                                                    <span class="text-truncate">Swipe left or right to change verses</span>
                                                </div>
                                                <button type="button" class="btn-close ms-2 flex-shrink-0" aria-label="Close" @click="dismissSwipeTip"></button>
                                            </div>
                                        </div>
                                        <!-- dropdown mobile content -->
                                        <div>
                                            <div class="pt-2" ref="targetTranslationElement"
                                                 @touchstart="handleTouchStart($event)"
                                                 @touchmove.passive="handleTouchMove"
                                                 @touchend="handleTouchEnd($event)"
                                                 @pointerdown.passive="handlePointerDown"
                                                 @pointermove.passive="handlePointerMove"
                                                 @pointerup.passive="handlePointerUp"
                                                 @wheel.passive="handleWheel">
                                                <TranslationSection ref="translationSection" :currentAyah="currentAyah" :isVisible="!isVisible"
                                                    :information="information" :isFullScreen="isFullScreen"
                                                    :expanded="expanded" :showMoreLink="showMoreLink"
                                                    :showAlertText="showAlertText" :showAlert="showAlert"
                                                    :showErrorAlert="showErrorAlert" :showAlertTextNote="showAlertTextNote
                                                        " :isPlaying="isPlaying" @highlightText="highlightText"
                                                    @clearHighlight="clearHighlight" @toggle-change="saveToggleState"
                                                    @toggle-full-screen="toggleFullScreen
                                                    " @toggle-expand="toggleExpand" @close-alert-text="closeAlertText
                                                    " @toggle-audio="toggleAudioPlayback
                                                    " @update-success-message="updateSuccessMessage
                                                    " />
                                            </div>

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
                                                        :translation="translation" @open-modal="openModal"
                                                        @submit-form="submitForm" @toggle-audio="toggleAudioPlayback
                                                        " :isPlaying="isPlaying"></TranslationActions>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tafseer Section -->
                                    <div class="tab-pane content" id="profile" role="tabpanel"
                                        v-if="information != null">
                                        <div>
                                            <div :selectedSurahId="selectedSurah" @update-tafseer="updateTafseer"
                                                @update-information="updateInformation"
                                                class="icon-container hide-on-mobile mb-3" :aria-hidden="isMobile">
                                                <div class="text-center" role="group" aria-label="Verse navigation controls (desktop)">
                                                    <i class="bi bi-skip-start-fill h2 pt- custom-prev-ayah"
                                                        role="button" aria-label="Go to first verse" :tabindex="isMobile ? -1 : 0"
                                                        @keydown.enter.prevent="goToFirstAyah" @keydown.space.prevent="goToFirstAyah"
                                                        style="cursor: pointer" @click="goToFirstAyah"
                                                        title="First verse"></i>
                                                    <div class="large">First verse</div>
                                                </div>
                                                <div class="text-center" role="group" aria-label="Previous verse">
                                                    <i class="bi bi-arrow-left-circle-fill pt-2 h4 custom-prev-ayah desktop-icon"
                                                        role="button" aria-label="Go to previous verse" :tabindex="isMobile ? -1 : 0"
                                                        @keydown.enter.prevent="goToPreviousAyah" @keydown.space.prevent="goToPreviousAyah"
                                                        style="cursor: pointer" @click="goToPreviousAyah"
                                                        title="Previous verse"></i>
                                                    <div class="large">Previous verse</div>
                                                </div>
                                                <div class="text-center" role="group" aria-label="Next verse">
                                                    <i class="bi bi-arrow-right-circle-fill pt-2 h4 custom-prev-ayah desktop-icon"
                                                        role="button" aria-label="Go to next verse" :tabindex="isMobile ? -1 : 0"
                                                        @keydown.enter.prevent="goToNextAyah" @keydown.space.prevent="goToNextAyah"
                                                        style="cursor: pointer" @click="goToNextAyah"
                                                        title="Next verse"></i>
                                                    <div class="large">Next verse</div>
                                                </div>
                                                <div class="text-center" role="group" aria-label="Last verse">
                                                    <i class="bi bi-skip-end-fill pt-2 h2 custom-prev-ayah desktop-icon"
                                                        role="button" aria-label="Go to last verse" :tabindex="isMobile ? -1 : 0"
                                                        @keydown.enter.prevent="goToLastAyah" @keydown.space.prevent="goToLastAyah"
                                                        style="cursor: pointer" @click="goToLastAyah"
                                                        title="Last verse"></i>
                                                    <div class="large">Last verse</div>
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
                                                    <hr style="
                                                        border: 2px solid #333;
                                                    " />
                                                </div>
                                            </div>

                                            <!-- mobile navigation  -->
                                            <div class="dropdown mobile-only">
                                                <div :style="iconStyle" class="icon-container pb-2">

                                                    <i class="bi bi-chevron-bar-left h4" style="cursor: pointer"
                                                        @click="goToFirstAyah()" title="Last verse"></i>
                                                    <i class="bi bi-arrow-left-circle h4" style="cursor: pointer"
                                                        @click="goToPreviousAyah()" title="Previous verse"></i>
                                                    <!-- <i @click="submitFormTafseer" class="bi bi-bookmark mb-2 h4"
                                                        aria-expanded="false" data-bs-placement="top"
                                                        title="Bookmark verse"></i> -->
                                                    <i class="bi bi-arrow-right-circle h4" style="cursor: pointer"
                                                        @click="goToNextAyah()" title="Next verse"></i>
                                                    <i class="bi bi-chevron-bar-right h4" style="cursor: pointer"
                                                        @click="goToLastAyah()" title="End verse"></i>
                                                </div>
                                                <!-- Mobile/Tablet tip: swipe between verses -->
                                                <div v-if="showSwipeTip" class="swipe-tip alert py-2 d-flex align-items-center justify-content-between mb-0 d-xxl-none" role="alert">
                                                    <div class="d-flex align-items-center overflow-hidden">
                                                        <span class="text-truncate">Swipe left or right to change verses</span>
                                                    </div>
                                                    <button type="button" class="btn-close ms-2 flex-shrink-0" aria-label="Close" @click="dismissSwipeTip"></button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Main content  -->
                                          <div class="pt-2" ref="targetTafseerElement"
                                              @touchstart="handleTouchStart($event)"
                                              @touchmove.passive="handleTouchMove"
                                              @touchend="handleTouchEnd($event)"
                                              @pointerdown.passive="handlePointerDown"
                                              @pointermove.passive="handlePointerMove"
                                              @pointerup.passive="handlePointerUp"
                                              @wheel.passive="handleWheel">
                                            <TafseerSection ref="tafseerSection" :currentAyah="currentAyah" :isVisible="!isVisible"
                                                :information="information" :isFullScreen="isFullScreen"
                                                :expanded="expanded" :showMoreLink="showMoreLink"
                                                :showAlertText="showAlertText" :showAlert="showAlert"
                                                :showErrorAlert="showErrorAlert" :showAlertTextNote="showAlertTextNote
                                                    " :isPlaying="isPlaying" @highlightText="highlightText"
                                                @clearHighlight="clearHighlight" @toggle-change="saveToggleState"
                                                @toggle-full-screen="toggleFullScreen
                                                " @toggle-expand="toggleExpand" @close-alert-text="closeAlertText"
                                                @toggle-audio="toggleAudioPlayback" @update-success-message="updateSuccessMessage
                                                " />
                                        </div>

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
                                                <TafseerActions :targetTranslationRef="'targetTranslationElement'"
                                                    :translation="translation" @open-modal="openModal"
                                                    @submit-form="submitFormTafseer" @toggle-audio="toggleAudioPlayback
                                                    " :isPlaying="isPlaying" />
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
                                                <div :selectedSurahId="selectedSurah" @update-tafseer="updateTafseer"
                                                    @update-information="updateInformation"
                                                    class="icon-container hide-on-mobile mb-3">
                                                    <div class="text-center">
                                                        <i class="bi bi-skip-start-fill icon-container h2 pt- custom-prev-ayah"
                                                            style="cursor: pointer" @click="goToFirstAyah"
                                                            title="First verse"></i>
                                                        <div class="large">First verse</div>
                                                    </div>
                                                    <div class="text-center">
                                                        <i class="bi bi-arrow-left-circle-fill icon-container pt-2 h4 custom-prev-ayah desktop-icon"
                                                            style="cursor: pointer" @click="goToPreviousAyah"
                                                            title="Previous verse"></i>
                                                        <div class="large">Previous verse</div>
                                                    </div>
                                                    <div class="text-center">
                                                        <i class="bi bi-arrow-right-circle-fill icon-container pt-2 h4 custom-prev-ayah desktop-icon"
                                                            style="cursor: pointer" @click="goToNextAyah"
                                                            title="Next verse"></i>
                                                        <div class="large">Next verse</div>
                                                    </div>
                                                    <div class="text-center">
                                                        <i class="bi bi-skip-end-fill pt-2 h2 icon-container custom-prev-ayah desktop-icon"
                                                            style="cursor: pointer" @click="goToLastAyah"
                                                            title="Last verse"></i>
                                                        <div class="large">Last verse</div>
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
                                                        <hr style="
                                                            border: 2px solid
                                                                #333;
                                                        " />
                                                    </div>
                                                </div>

                                                <!-- mobile navigation -->
                                                <div class="dropdown mobile-only">
                                                    <div :style="iconStyle" class="icon-container">

                                                        <i class="bi bi-chevron-bar-left h4" style="cursor: pointer"
                                                            @click="goToFirstAyah()" title="Last verse"></i>
                                                        <i class="bi bi-arrow-left-circle h4" style="cursor: pointer"
                                                            @click="goToPreviousAyah()" title="Previous verse"></i>
                                                        <!-- <i @click="submitFormTransliteration"
                                                            class="bi bi-bookmark mb-2 h4" aria-expanded="false"
                                                            data-bs-placement="top" title="Bookmark verse"></i> -->
                                                        <i class="bi bi-arrow-right-circle h4" style="cursor: pointer"
                                                            @click="goToNextAyah()" title="Next verse"></i>
                                                        <i class="bi bi-chevron-bar-right h4" style="cursor: pointer"
                                                            @click="goToLastAyah()" title="End verse"></i>
                                                    </div>
                                                    <!-- Mobile/Tablet tip: swipe between verses -->
                                                    <div v-if="showSwipeTip" class="swipe-tip alert py-2 mt-2 d-flex align-items-center justify-content-between mb-0 d-xxl-none" role="alert">
                                                        <div class="d-flex align-items-center overflow-hidden">
                                                            <span class="text-truncate">Swipe left or right to change verses</span>
                                                        </div>
                                                        <button type="button" class="btn-close ms-2 flex-shrink-0" aria-label="Close" @click="dismissSwipeTip"></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div ref="targetTransliterationElement"
                                                 @touchstart="handleTouchStart($event)"
                                                 @touchmove.passive="handleTouchMove"
                                                 @touchend="handleTouchEnd($event)"
                                                 @pointerdown.passive="handlePointerDown"
                                                 @pointermove.passive="handlePointerMove"
                                                 @pointerup.passive="handlePointerUp"
                                                 @wheel.passive="handleWheel">
                                                <TransliterationSection ref="transliterationSection" :currentAyah="currentAyah"
                                                    :isVisible="!isVisible" :information="information"
                                                    :isFullScreen="isFullScreen" :expanded="expanded"
                                                    :showMoreLink="showMoreLink" :showAlertText="showAlertText"
                                                    :showAlert="showAlert" :showErrorAlert="showErrorAlert"
                                                    :showAlertTextNote="showAlertTextNote
                                                        " :isPlaying="isPlaying" @highlightText="highlightText"
                                                    @clearHighlight="clearHighlight" @toggle-change="saveToggleState"
                                                    @toggle-full-screen="toggleFullScreen
                                                    " @toggle-expand="toggleExpand" @close-alert-text="closeAlertText
                                                    " @toggle-audio="toggleAudioPlayback
                                                    " />
                                            </div>

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
                                                        :targetTranslationRef="'targetTranslationElement'"
                                                        :translation="translation" @open-modal="openModal" @submit-form="submitFormTransliteration
                                                        " @toggle-audio="toggleAudioPlayback
                                                        " :isPlaying="isPlaying" />
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
import html2canvas from "html2canvas";
import ChatBot from './translation/ChatBot.vue';

import DarkModeToggle from './DarkModeToggle.vue';
import CustomSurahSelection from "./surah_selection/CustomSurahSelection.vue";
import SearchForm from "./search/SearchForm.vue";
import SurahList from "./search/SurahList.vue";
import SurahDropdown from "./search/SurahDropdown.vue";
import BookmarksAndNotes from "./bookmark_and_notes_links/BookmarksAndNotes.vue";
import AlertModal from "./modals/AlertModal.vue";
import Welcome from "./Intro/Welcome.vue";
import Title from "./intro/Title.vue";
import CorrectionModal from "./modals/CorrectionModal.vue";
import Donation from "./intro/Donation.vue";
import NavTabs from "./tabs/NavTabs.vue";
import AyahInfo from "./translation/AyahInfo.vue";
import MainAyah from "./translation/MainAyah.vue";
import EnglishTranslation from "./translation/EnglishTranslation.vue";
import Translator from "./translation/Translator.vue";
import AyahSearchVerseNum from "./search/AyahSearchVerseNum.vue";
import ErrorAlert from "./search/ErrorAlert.vue";
import AyahDropdown from "./search/AyahDropdown.vue";
import ScreenTranslationCapture from "./translation/features/screen_capture/ScreenTranslationCapture.vue";
import ScreenTafseerCapture from "./translation/features/screen_capture/ScreenTafseerCapture.vue";
import ScreenTransliterationCapture from "./translation/features/screen_capture/ScreenTransliterationCapture.vue";
import SurahInfoModal from "./modals/SurahInfoModal.vue";
import TranslationNote from "./translation/features/notes/TranslationNote.vue";
import TafseerNote from "./translation/features/notes/TafseerNote.vue";
import TransliterationNote from "./translation/features/notes/TransliterationNote.vue";
import BookmarkTranslation from "./translation/features/bookmarking/BookmarkTranslation.vue";
import FilteredSurahList from "./search/FilteredSurahList.vue";
import TafseerSection from "./TafseerSection.vue";
import TranslationSection from "./TranslationSection.vue";
import TransliterationSection from "./TransliterationSection";
import TranslationActions from "./TranslationActions.vue";
import TafseerActions from "./TafseerActions.vue";
import TransliterationActions from "./TransliterationActions.vue";
import SpeechRecognition from "./translation/features/speech_recognition/SpeechRecognition.vue";
// import PdfDownload from './pdf/PdfDownload.vue'
// import PdfDownloadTafsser from './pdf/PdfDownloadTafsser.vue'
// import PdfDownloadTransliteration from './pdf/PdfDownloadTransliteration.vue'
import AdvancedSearch from "./search/AdvancedSearch.vue";
import KeyboardNavigation from "./accesibility/KeyboardNavigation.vue";
import FolderSelectionModal from "./folder_manager/FolderSelectionModal.vue";
import ScreenReader from "./accesibility/ScreenReader.vue";
import AyahSelector from "./search/AyahSelector.vue";
import SearchContent from "./content/searchContent.vue";
import AyahOfTheDay from './translation/AyahOfTheDay.vue';
import PrayerTimes from "./translation/PrayerTimes.vue";
import HelpGuideModal from "./translation/HelpGuideModal.vue";



export default {
    name: "QuranComponent",
    props: {},
    components: {
        HelpGuideModal,
        ChatBot,
        DarkModeToggle,
        PrayerTimes,
        AyahOfTheDay,
        SearchContent,
        CustomSurahSelection,
        AyahSelector,
        SurahList,
        SurahDropdown,
        BookmarksAndNotes,
        AlertModal,
        Welcome,
        CorrectionModal,
        Donation,
        NavTabs,
        Title,
        SearchForm,
        AyahInfo,
        MainAyah,
        EnglishTranslation,
        Translator,
        AyahSearchVerseNum,
        ErrorAlert,
        AyahDropdown,
        ScreenTranslationCapture,
        ScreenTafseerCapture,
        ScreenTransliterationCapture,
        SurahInfoModal,
        TranslationNote,
        TafseerNote,
        TransliterationNote,
        BookmarkTranslation,
        FilteredSurahList,
        TafseerSection,
        TranslationSection,
        TransliterationSection,
        TranslationActions,
        TafseerActions,
        TransliterationActions,
        SpeechRecognition,
        // PdfDownload,
        FolderSelectionModal,
        // PdfDownloadTransliteration,
        // PdfDownloadTafsser,
        AdvancedSearch,
        KeyboardNavigation,
        ScreenReader,
    },

    mounted() {
        
        const savedState = localStorage.getItem("toggleState");
        if (savedState !== null) {
            this.isVisible = JSON.parse(savedState);
        }
        // Debounced initial fetch to avoid duplicate triggers from watchers
        this.scheduleFetchAyat();
       
        this.getSurat(); // Call getSurat to populate the surah list
        this.prepareAyahText();

        // Keyboard navigation for ayah list within this component only
        const win = (typeof globalThis !== 'undefined' && globalThis.window) ? globalThis.window : (typeof window !== 'undefined' ? window : null);
        win?.addEventListener?.("keydown", this.onKeydown);

        // Responsive a11y: track mobile viewport to toggle focusability of duplicate controls
        this.updateIsMobile();
        // Create a debounced resize handler to reduce layout thrash
        this.debouncedUpdateIsMobile = this.debounce(this.updateIsMobile, 150);
        win?.addEventListener?.('resize', this.debouncedUpdateIsMobile, { passive: true });
        // Gesture gating for tablets/phones only
        this.updateInputModalityGestureGate();
        try {
            if (this._coarseMql && this._coarseMql.addEventListener) {
                this._coarseMql.addEventListener('change', this.updateInputModalityGestureGate, { passive: true });
            } else if (this._coarseMql && this._coarseMql.addListener) {
                this._coarseMql.addListener(this.updateInputModalityGestureGate);
            }
        } catch(_) {}

        // Track Bootstrap tab changes to stop previous audio and set active tab
        try {
            if (typeof document !== 'undefined') {
                this._onTabShown = (e) => {
                    let id = e.target?.getAttribute?.('data-bs-target') || e.target?.getAttribute?.('href') || '';
                    if (id && id.startsWith('#')) id = id.slice(1);
                    if (id) this.activeTab = id;
                    this.stopAllAudio && this.stopAllAudio();
                    console.log('[Audio] tab switched, activeTab=', this.activeTab);
                };
                document.addEventListener('shown.bs.tab', this._onTabShown);
            }
        } catch(_) {}

        // Attach a window wheel listener only if gestures are enabled (coarse pointer)
        if (this.allowGestures && typeof window !== 'undefined') {
            this._onWindowWheel = (e) => {
                const areaTaf = this.$refs && this.$refs.targetTafseerElement;
                const areaTrn = this.$refs && this.$refs.targetTranslationElement;
                const areaTrl = this.$refs && this.$refs.targetTransliterationElement;
                const path = (e.composedPath && e.composedPath()) || [];
                const within = [areaTaf, areaTrn, areaTrl]
                    .filter(Boolean)
                    .some((el) => path.includes(el) || (e.target && el.contains && el.contains(e.target)));
                if (!within) return;
                this.handleWheel(e);
            };
            window.addEventListener('wheel', this._onWindowWheel, { passive: true });
            console.log('[Swipe] window wheel listener attached (tafseer/translation/transliteration)');
        }

        // Swipe tip persisted dismissal
        try {
            const dismissed = localStorage.getItem('swipeTipDismissed');
            if (dismissed === '1') {
                this.showSwipeTip = false;
            } else {
                this.showSwipeTip = true;
            }
        } catch(_) { this.showSwipeTip = true; }
    },
    // Ensure listeners are cleaned up when the component is destroyed
    beforeUnmount() {
        const win = (typeof globalThis !== 'undefined' && globalThis.window) ? globalThis.window : (typeof window !== 'undefined' ? window : null);
        win?.removeEventListener?.("keydown", this.onKeydown);
        win?.removeEventListener?.('resize', this.debouncedUpdateIsMobile || this.updateIsMobile);
        try {
            if (this._coarseMql && this._coarseMql.removeEventListener) {
                this._coarseMql.removeEventListener('change', this.updateInputModalityGestureGate);
            } else if (this._coarseMql && this._coarseMql.removeListener) {
                this._coarseMql.removeListener(this.updateInputModalityGestureGate);
            }
        } catch(_) {}
        if (typeof window !== 'undefined' && this._onWindowWheel) {
            window.removeEventListener('wheel', this._onWindowWheel, { passive: true });
            this._onWindowWheel = null;
        }
    },
    // Vue 2 fallback (in case this project uses Vue 2)
    beforeDestroy() {
        const win2 = (typeof globalThis !== 'undefined' && globalThis.window) ? globalThis.window : (typeof window !== 'undefined' ? window : null);
        win2?.removeEventListener?.("keydown", this.onKeydown);
        win2?.removeEventListener?.('resize', this.debouncedUpdateIsMobile || this.updateIsMobile);
    },

    data() {
        return {
            // Cache ayat per surah to avoid redundant fetches
            ayahCache: {},
            lastFetchedSurahId: null,
            fetchAyatTimer: null,
            ayatInflight: null,
            debouncedUpdateIsMobile: null,
            surahs: [], // List of all Surahs
            reciters: [], // List of all Reciters
            translations: [], // List of all Translations
            selectedSurah: "", // Selected Surah number
            selectedReciter: "", // Default reciter
            selectedTranslation: "", // Default translation
            selectedSurahId: 1,
            isDarkMode: false,
            showAudio: false,
            userIsLoggedIn: true,
            newThemeName: "",
            savedThemes: [],
            selectedTheme: null,
            isAdvancedSearchVisible: false, // Controls the visibility of AdvancedSearch
            searchTerm: "",
            results: [],
            filteredResults: [],
            selectedSurah: null,
            selectedAyah: null,
            selectedTafseer: null,
            userId: null,
            bookmarkSubmitted: false, // Set initial state
            selectedFolderId: null,
            isVisible1: false,
            isOpen: false,
            recognition: null,
            isListening: false,
            transcript: "",
            isVisible: false,
            showSuccessMessage: false, // Controls visibility of success messag
            selectedStyle: null,
            
            
            // Text transformation and alignment
            textTransform: "none",
            textAlign: "left",
            // For showing success message
            showSuccessMessage: false,
            isCollapsed: false,
            showSuccessMessage: false,
            showMessage: false,
            filteredSurah: [],
            //twitter/whatsapp
            information: {
                translation: "",
                transliteration: "", // Example translated text
            },
            selectedSurahIndex: null,
            tafseer: "",
            //custom surah collection
            customSuratList: [],
            // track selected id
            selectedSurahId: null,
            selectedAyahId: 0,
            // initialize empty arrays
            data: [],
            surat: [],
            ayat: [],
            tafseers: [],
            currentSurah: null,
            currentVerse: null,
            currentTafseer: "",
            // storage
            information: null,
            tafseer: null,
            surah: null,
            ayah_id: null,
            // ayah controls
            surat: 0,
            selectedIndexAyah: 0,
            //expand text
            expanded: false,
            //full screen toggle
            isFullScreen: false,
            
            // auth login
            isLoggedIn: false,
            // main search
            showClearButton: false,
            searchTerm: "",
            filteredSurah: [],
            // main card visibility
            isCardVisible: false,
            // select ayah dropdown
            selectedIndexAyah: -1,
            selectedIndexAyah: null,
            selectedAyah: null,
            dropdownHidden: true,
            verseNumber: null,
            //alerts
            showError: false,
            showAlert1: false,
            showAlertText: false,
            showAlert: false,
            showErrorAlert: false,
            showAlertTextNote: false,
            maxLength: 400,
            alertMessage: "",
            alertType: "",

            // correction modal
            form: new Form({
                id: "",
                name: "",
                email: "",
                mistake_type: "",
                added_notes: "",
                ayah_num: "",
            }),

            // search
            searchFilters: new Form({
                name_en: "",
                name_ar: "",
            }),
            loading: false,
            // Accessibility: live region message
            screenReaderMessage: "",
            // Track viewport for responsive ARIA handling
            isMobile: false,
            // Swipe tracking
            touchStartX: 0,
            touchStartY: 0,
            touchEndX: 0,
            touchEndY: 0,
            touchStartTime: 0,
            
            // Pointer tracking (for non-touch devices)
            pointerStartX: 0,
            pointerStartY: 0,
            pointerEndX: 0,
            pointerEndY: 0,
            pointerStartTime: 0,
            pointerActive: false,
            // Wheel tracking (for trackpads)
            wheelAccumX: 0,
            wheelAccumY: 0,
            wheelLastTime: 0,
            // Tunable thresholds
            // Gesture thresholds (relaxed for reliability on mobile/tablets)
            swipeMinDistance: 35,
            swipeMaxDuration: 600,
            wheelThreshold: 35,
            wheelVertLeak: 30,
            wheelResetMs: 160,
            // Debounce multiple triggers
            gestureCooldownMs: 300,
            lastGestureTs: 0,
            // Environment gating
            isCoarsePointer: false,
            allowGestures: true,
            _coarseMql: null,
            activeTab: 'home',
            // UI: swipe tip visibility (mobile/tablet only)
            showSwipeTip: true
        };
    },
    computed: {
        // Filter ayahs based on search query
        filteredAyahs() {
            if (!this.surahDetails) return [];
            if (!this.searchQuery) return this.surahDetails.ayahs;

            const query = this.searchQuery.toLowerCase();
            return this.surahDetails.ayahs.filter(
                (ayah) =>
                    ayah.text.toLowerCase().includes(query) ||
                    ayah.translation.toLowerCase().includes(query)
            );
        },
        combinedText() {
            // Check if ayah_text and translation have nested structure
            const translation =
                typeof this.information.translation === "object"
                    ? this.information.translation.text
                    : this.information.translation;
            return `Translation: ${translation}`;
        },
        
    },
    methods: {
        // Thresholds can be tweaked here directly if needed.
        
        handleDarkModeChange(isDarkMode) {
            this.isDarkMode = isDarkMode;
        },
        dismissSwipeTip() {
            this.showSwipeTip = false;
            try { localStorage.setItem('swipeTipDismissed','1'); } catch(_) {}
        },
        // Handle keyboard navigation for ayat
        onKeydown(e) {
            // Ignore when typing in form fields or contenteditable areas
            const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
            const isEditable = e.target && (e.target.isContentEditable || ["input", "textarea", "select"].includes(tag));
            if (isEditable) return;

            // No ayat loaded or no selection context
            if (!Array.isArray(this.ayat) || this.ayat.length === 0) return;

            switch (e.key) {
                case "ArrowRight":
                case "ArrowDown":
                    e.preventDefault();
                    this.goToNextAyah();
                    break;
                case "ArrowLeft":
                case "ArrowUp":
                    e.preventDefault();
                    this.goToPreviousAyah();
                    break;
                case "Home":
                    e.preventDefault();
                    this.goToFirstAyah();
                    break;
                case "End":
                    e.preventDefault();
                    this.goToLastAyah();
                    break;
                default:
                    break;
            }
        },
        prepareAyahText() {
            if (!this.ayah || !this.ayah.text) {
                console.error("prepareAyahText: ayah.text is missing!", this.ayah);
                return;
            }

            this.words = this.ayah.text.split(" ");
            this.timestamps = this.words.map((_, index) => index * 0.5);
            this.highlightedAyah = this.words.join(" ");

            console.log("Highlighted Ayah Text:", this.highlightedAyah); // Debugging log
        },
        // Fetch all Surahs
        async fetchSurahs() {
            try {
                const response = await fetch("https://api.alquran.cloud/v1/surah");
                if (!response.ok) throw new Error("Failed to fetch Surahs");
                const data = await response.json();
                this.surahs = data.data;
            } catch (error) {
                console.error("Error fetching Surahs:", error);
            }
        },

        async fetchReciters() {
            try {
                const response = await fetch("https://api.alquran.cloud/v1/edition/format/audio");
                if (!response.ok) throw new Error("Failed to fetch Reciters");

                const data = await response.json();
                this.reciters = data.data
                    .filter((reciter) => reciter.identifier && reciter.englishName)
                    .map((reciter) => ({
                        identifier: reciter.identifier,
                        englishName: reciter.englishName || "Unknown Reciter",
                    }));
            } catch (error) {
                console.error("Error fetching Reciters:", error);
            }
        },

        // Fetch all Translations
        async fetchTranslations() {
            try {
                const response = await fetch("https://api.alquran.cloud/v1/edition/type/translation");
                if (!response.ok) throw new Error("Failed to fetch Translations");
                const data = await response.json();
                this.translations = data.data;
            } catch (error) {
                console.error("Error fetching Translations:", error);
            }
        },

        async fetchSurahDetails() {
            if (!this.selectedSurah) return;

            try {
                const response = await fetch(
                    `https://api.alquran.cloud/v1/surah/${this.selectedSurah}/editions/${this.selectedReciter},${this.selectedTranslation}`
                );
                if (!response.ok) throw new Error("Failed to fetch Surah details");

                const data = await response.json();

                const arabicText = data.data[0];
                const translation = data.data[1];

                this.surahDetails = {
                    surahNumber: this.selectedSurah,
                    englishName: arabicText.englishName,
                    name: arabicText.name,
                    ayahs: arabicText.ayahs.map((ayah, index) => ({
                        number: ayah.number,
                        text: ayah.text,
                        translation: translation.ayahs[index]?.text || "Translation not available",
                        audio: ayah.audio || "",
                    })),
                };
            } catch (error) {
                console.error("Error fetching Surah details:", error);
            }
        },

        setSelectedSurah(value) {
            console.log(value);
            this.selectedSurah = value;
        },
        saveToggleState() {
            // Save the toggle state to localStorage
            localStorage.setItem("toggleState", JSON.stringify(this.isVisible));
        },
        updateAyah(newAyah) {
            this.currentAyah = newAyah;
        },
        highlightText(charIndex, currentWord) {
            this.$refs.translationSection.highlightText(charIndex, currentWord);
        },
        clearHighlight() {
            this.$nextTick(() => {
                if (this.currentAyah && this.currentAyah.translation) {
                    this.renderedText = `<span>${this.currentAyah.translation}</span>`;
                }
            });
        },
        updateIsMobile() {
            try {
                const w = (typeof globalThis !== 'undefined' && globalThis.window) ? globalThis.window : (typeof window !== 'undefined' ? window : null);
                if (w && typeof w.matchMedia === 'function') {
                    this.isMobile = w.matchMedia('(max-width: 767px)').matches;
                } else if (w && typeof w.innerWidth === 'number') {
                    this.isMobile = w.innerWidth <= 767;
                } else {
                    this.isMobile = false;
                }
            } catch (e) {
                this.isMobile = false;
            }
        },
        // Simple debounce utility
        debounce(fn, delay = 150) {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => fn.apply(this, args), delay);
            };
        },
        // Schedule ayah fetch with debounce to avoid duplicate triggers
        scheduleFetchAyat(surahId) {
            const id = surahId || this.selectedSurahId;
            if (this.fetchAyatTimer) clearTimeout(this.fetchAyatTimer);
            this.fetchAyatTimer = setTimeout(() => this.fetchAyat(id), 150);
        },
        async fetchAyat(surahIdArg) {
            const surahId = surahIdArg || this.selectedSurahId;
            if (!surahId) return;
            // Serve from cache if present
            if (this.ayahCache[surahId]) {
                this.ayat = this.ayahCache[surahId];
                this.dropdownHidden = false;
                return;
            }
            // Prevent overlapping requests
            if (this.ayatInflight) return;
            try {
                this.isLoading = true;
                this.ayatInflight = axios.get("/get_ayat", { params: { surah_id: surahId } });
                const response = await this.ayatInflight;
                this.ayat = response.data;
                this.ayahCache[surahId] = response.data;
                this.lastFetchedSurahId = surahId;
                this.dropdownHidden = false;
                // Select first ayah only if nothing is selected yet
                if (this.ayat.length > 0 && (this.selectedAyahId === null || this.selectedAyahId === 0 || this.selectedAyahId === "")) {
                    this.selectedAyahId = this.ayat[0].id;
                    this.handleAyahChange();
                }
            } catch (error) {
                console.error("Error fetching ayat:", error);
            } finally {
                this.isLoading = false;
                this.ayatInflight = null;
            }
        },
        updateInformation(info) {
            this.information = info;
        },
        updateTafseer(tafseerData) {
            this.tafseer = tafseerData;
        },
        toggleAudioPlayback() {
            // Prefer toggling the active section if present; fall back to all
            const sections = [
                this.$refs.tafseerSection,
                this.$refs.translationSection,
                this.$refs.transliterationSection,
            ].filter(Boolean);
            let toggled = false;
            for (const sec of sections) {
                if (typeof sec?.toggleSpeech === 'function') {
                    try {
                        sec.toggleSpeech();
                        toggled = true;
                    } catch (e) {
                        console.warn('toggleSpeech failed on section', e);
                    }
                }
            }
            if (!toggled) {
                console.warn('No section available to toggle audio');
            }
        },
        showSettingsOffcanvas() {
            // Select the offcanvas element by its ID
            const settingsOffcanvasElement =
                document.getElementById("settingsOffcanvas");
            // Initialize the Bootstrap Offcanvas component
            const offcanvas = new bootstrap.Offcanvas(
                settingsOffcanvasElement,
                {
                    backdrop: true, // Adds a backdrop behind the off-canvas
                    keyboard: true, // Allows closing with the keyboard (Escape key)
                }
            );
            // Show the offcanvas
            offcanvas.show();
        },
        handleItemSelected(selectedItem) {
            alert(`Selected item: ${selectedItem}`);
        },

        submitForm() {
            const formData = {
                surah_name: this.information.ayah.surah.name_en,
                ayah_num: this.information.ayah_id,
                ayah_verse_ar: this.information.ayah.ayah_text,
                ayah_verse_en: this.information.translation,
                user_id: this.userId,
            };

            axios
                .post("/bookmarks", formData)
                .then((response) => {
                    // Successfully bookmarked
                    this.showAlert = true;
                    this.alertMessage = "Ayah bookmarked successfully!";
                    this.alertType = "success"; // Success alert for logged-in users
                    localStorage.setItem(
                        `bookmarkSubmitted_${this.information.ayah_id}`,
                        true
                    );
                    this.hideAlertAfterDelay();
                })
                .catch((error) => {
                    // Error during bookmark submission
                    console.error("Error submitting bookmark:", error);
                    this.showErrorAlert = true; // Danger alert for request failure
                    this.hideAlertAfterDelayError();
                });
        },

        submitFormTafseer() {
            const formData1 = {
                surah_name: this.information.ayah.surah.name_en,
                ayah_num: this.information.ayah_id,
                ayah_verse_ar: this.information.ayah.ayah_text,
                ayah_verse_en: this.tafseer,
                user_id: this.userId,
            };

            axios
                .post("/bookmarks", formData1)
                .then((response) => {
                    this.showAlert = true;
                    this.alertMessage = "Tafseer bookmarked successfully!";
                    this.alertType = "success";
                    localStorage.setItem(
                        `bookmarkSubmitted_${this.information.ayah_id}`,
                        true
                    );
                    this.hideAlertAfterDelay();
                })
                .catch((error) => {
                    console.error("Error submitting bookmark:", error);
                    this.showErrorAlert = true;
                    this.hideAlertAfterDelayError();
                });
        },

        submitFormTransliteration() {
            const formData2 = {
                surah_name: this.information.ayah.surah.name_en,
                ayah_num: this.information.ayah_id,
                ayah_verse_ar: this.information.ayah.ayah_text,
                ayah_verse_en: this.information.transliteration,
                user_id: this.userId,
            };

            axios
                .post("/bookmarks", formData2)
                .then((response) => {
                    this.showAlert = true;
                    this.alertMessage =
                        "Transliteration bookmarked successfully!";
                    this.alertType = "success";
                    localStorage.setItem(
                        `bookmarkSubmitted_${this.information.ayah_id}`,
                        true
                    );
                    this.hideAlertAfterDelay();
                })
                .catch((error) => {
                    console.error("Error submitting bookmark:", error);
                    this.showErrorAlert = true;
                    this.hideAlertAfterDelayError();
                });
        },

        hideAlertAfterDelay() {
            setTimeout(() => {
                this.showAlert = false;
            }, 3000); // Hide the alert after 3 seconds
        },

        hideAlertAfterDelayError() {
            setTimeout(() => {
                this.showErrorAlert = false;
            }, 3000); // Hide the alert after 3 seconds
        },

        toggleAdvancedSearch() {
            this.isAdvancedSearchVisible = !this.isAdvancedSearchVisible; // Toggle the visibility
        },
        async fetchSurahs() {
            try {
                const response = await fetch("/get_surat"); // Adjust the API endpoint as needed
                this.surat = await response.json();
            } catch (error) {
                console.error("Error fetching surahs:", error);
            }
        },

        toggleContent1() {
            this.isVisible1 = !this.isVisible1; // Toggle the visibility
        },
        toggleContent() {
            this.isOpen = !this.isOpen; // Toggle the content's visibility
        },
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        },
        openModal(modalRef) {
            // Ensure the ref exists
            if (!this.$refs[modalRef]) {
                console.error(`Modal reference '${modalRef}' not found.`);
                return;
            }
            const modalComponent = this.$refs[modalRef];
            // Ensure the component has a `showModal` method
            if (typeof modalComponent.showModal !== "function") {
                console.error(`showModal is not a function in '${modalRef}'.`);
                return;
            }
            // Call the `showModal` method
            modalComponent.showModal();
        },
        showModal() {
            const modal = new bootstrap.Modal(
                document.getElementById("styleModal")
            );
            modal.show();
            this.successMessage = ""; // Reset the success message when the modal is opened
        },
        applyStyle() {
            if (this.selectedStyle) {
                this.bgColor =
                    this.selectedStyle.backgroundColor || this.bgColor;
                this.textColor = this.selectedStyle.textColor || this.textColor;
                this.iconColor = this.selectedStyle.iconColor || this.iconColor;
                this.fontFamily =
                    this.selectedStyle.fontStyle || this.fontFamily;
            }
        },
        
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        },
        handleTranscript(transcript) {
            this.transcript = transcript;
        },
        openModal(modalRef) {
            const modalComponent = this.$refs[modalRef];
            if (
                modalComponent &&
                typeof modalComponent.showModal === "function"
            ) {
                modalComponent.showModal();
            } else {
                console.error(
                    `Modal reference '${modalRef}' not found or showModal is not a function.`
                );
            }
        },
        updateSelectedSurah(newSurahId) {
            this.selectedSurahId = newSurahId; // Sync emitted value to local state
        },
        updateSelectedSurah(id) {
            console.log("1 -> compo: " + id, this.dropdownHidden);

            this.selectedSurahId = id;
            this.dropdownHidden = false; // Ensure dropdown is visible when a Surah is selected

            console.log("quran compo: " + id, this.dropdownHidden);
            this.getAyat(id);
        },
        updateSelectedSurah(surah) {
            this.selectedSurah = surah;
            this.selectedSurahId = surah.id; // Assuming `surah` object has an `id` field
            console.log("selectedSurahId: ", surah, this.selectedSurahId);
        },
        updateSelectedSurah(newSurah) {
            this.selectedSurah = newSurah;
        },
        updateInformation(newInformation) {
            this.information = newInformation;
        },
        updateTafseer(newTafseer) {
            this.tafseer = newTafseer;
        },
        handleUpdateResults(results) {
            this.filteredSurah = results;
        },
        handleClearResults() {
            this.filteredSurah = [];
        },
        handleSelectSurah(surahId) {
            this.selectedSurah = surahId;
            this.filteredSurah = []; // Hide the search results list
        },
        selectSurahFromResults(surah) {
            this.selectedSurah = surah.id;
            this.filteredSurah = []; // Hide the search results list
        },
        handleScrollToAyah(verseNumber) {
            this.$nextTick(() => {
                const ayahElement = this.$refs.ayahContainer.querySelector(
                    `#ayah-${verseNumber}`
                );
                if (ayahElement) {
                    ayahElement.scrollIntoView({
                        behavior: "smooth",
                    });
                } else {
                    console.error("Ayah not found:", verseNumber);
                }
            });
        },
        toggleExpand() {
            this.expanded = !this.expanded;
        },
        getSelectedSurahAyat() {
            const surahData = this.surat.find(
                (surah) => surah.id === parseInt(this.surah)
            );
            return surahData ? surahData.ayat : [];
            if (this.surat[this.surah]) {
                return this.surat[this.surah].ayat;
            }
            return [];
        },
        updateAyah(newIndex) {
            this.selectedIndexAyah = newIndex;
            console.log(`Selected Ayah: ${newIndex}`);
        },
        closeAlertText() {
            this.showAlertText = false;
        },
        triggerBookmarkSuccess() {
            this.showAlert = true;
        },
        triggerLoginError() {
            this.showErrorAlert = true;
        },
        triggerNoteLoginError() {
            this.showAlertTextNote = true;
        },
        toggleFullScreen() {
            this.isFullScreen = !this.isFullScreen;
        },
        toggleFullScreen() {
            this.isFullScreen = !this.isFullScreen;
        },
        // Utility: ignore interactive targets and selections
        isInteractiveTarget(el) {
            if (!el) return false;
            const interactiveSelector = 'a, button, input, textarea, select, [role="button"], [contenteditable="true"]';
            if (el.closest && el.closest(interactiveSelector)) return true;
            try {
                const sel = (typeof window !== 'undefined' && window.getSelection) ? window.getSelection() : null;
                if (sel && sel.type === 'Range' && String(sel).length > 0) return true;
            } catch (_) {}
            return false;
        },

        handleTouchStart(event) {
            if (!this.allowGestures) return;
            const touch = event.changedTouches ? event.changedTouches[0] : event;
            if (this.isInteractiveTarget(event.target)) return;
            this.touchStartX = touch.screenX;
            this.touchStartY = touch.screenY;
            this.touchStartTime = Date.now();
        },
        handleTouchMove(event) {
            if (!this.allowGestures) return;
            const touch = event.changedTouches ? event.changedTouches[0] : event;
            if (this.isInteractiveTarget(event.target)) return;
            this.touchEndX = touch.screenX;
            this.touchEndY = touch.screenY;
        },
        handleTouchEnd(event) {
            if (!this.allowGestures) { console.log('[Swipe] touchend ignored (gestures disabled)'); return; }
            const touchEndTime = Date.now();
            const timeDiff = touchEndTime - this.touchStartTime;
            const deltaX = (this.touchEndX || this.touchStartX) - this.touchStartX;
            const deltaY = (this.touchEndY || this.touchStartY) - this.touchStartY;
            const minSwipeDistance = this.swipeMinDistance;
            const maxSwipeDuration = this.swipeMaxDuration;

            // Swipe gesture detection
            if (
                Math.abs(deltaX) > minSwipeDistance &&
                Math.abs(deltaY) < this.wheelVertLeak &&
                timeDiff < maxSwipeDuration
            ) {
                if (deltaX > 0) {
                    console.log('[Swipe] touchend → RIGHT', { deltaX, timeDiff });
                    this.onSwipeRight();
                } else {
                    console.log('[Swipe] touchend → LEFT', { deltaX, timeDiff });
                    this.onSwipeLeft();
                }
            }
        },
        onSwipeRight() {
            const now = Date.now();
            if (now - this.lastGestureTs < this.gestureCooldownMs) {
                console.log('[Swipe] RIGHT ignored (cooldown)');
                return;
            }
            this.lastGestureTs = now;
            console.log('[Swipe] ACTION: NEXT VERSE');
            this.goToNextAyah();
        },
        onSwipeLeft() {
            const now = Date.now();
            if (now - this.lastGestureTs < this.gestureCooldownMs) {
                console.log('[Swipe] LEFT ignored (cooldown)');
                return;
            }
            this.lastGestureTs = now;
            console.log('[Swipe] ACTION: PREVIOUS VERSE');
            this.goToPreviousAyah();
        },
        // Pointer events (covers some laptops/tablets)
        handlePointerDown(e) {
            if (!this.allowGestures) return;
            if (this.isInteractiveTarget(e.target)) return;
            // Do not handle desktop mouse drags; allow touch/pen only
            if (e.pointerType === 'mouse') return;
            this.pointerActive = true;
            this.pointerStartX = e.screenX;
            this.pointerStartY = e.screenY;
            this.pointerStartTime = Date.now();
            console.log('[Swipe] pointerdown', { x: this.pointerStartX, y: this.pointerStartY, type: e.pointerType });
        },
        handlePointerMove(e) {
            if (!this.allowGestures) return;
            if (!this.pointerActive) return;
            if (this.isInteractiveTarget(e.target)) return;
            this.pointerEndX = e.screenX;
            this.pointerEndY = e.screenY;
            console.log('[Swipe] pointermove', { x: this.pointerEndX, y: this.pointerEndY });
        },
        handlePointerUp(e) {
            if (!this.allowGestures) return;
            if (!this.pointerActive) return;
            this.pointerActive = false;
            const timeDiff = Date.now() - this.pointerStartTime;
            const endX = (this.pointerEndX || e.screenX);
            const endY = (this.pointerEndY || e.screenY);
            const deltaX = endX - this.pointerStartX;
            const deltaY = endY - this.pointerStartY;
            const minSwipeDistance = this.swipeMinDistance;
            const maxSwipeDuration = this.swipeMaxDuration;
            const vertLeak = this.wheelVertLeak; // reuse vertical tolerance
            if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaY) < vertLeak && timeDiff < maxSwipeDuration) {
                if (deltaX > 0) {
                    console.log('[Swipe] pointerup → RIGHT', { deltaX, deltaY, timeDiff });
                    this.onSwipeRight();
                } else {
                    console.log('[Swipe] pointerup → LEFT', { deltaX, deltaY, timeDiff });
                    this.onSwipeLeft();
                }
            } else {
                // ignore non-swipe pointerup
                }
        },
        // Trackpad horizontal gestures via wheel
        handleWheel(e) {
            if (!this.allowGestures) return;
            if (this.isInteractiveTarget(e.target)) return;
            // Normalize delta based on deltaMode: 0=pixel,1=line,2=page
            const unit = e.deltaMode === 1 ? 16 : (e.deltaMode === 2 ? window.innerHeight : 1);
            const dx = e.deltaX * unit;
            const dy = e.deltaY * unit;
            const now = Date.now();
            const dt = now - (this.wheelLastTime || now);
            this.wheelLastTime = now;

            // Reset accumulation if pause is long
            if (dt > this.wheelResetMs) {
                this.wheelAccumX = 0;
                this.wheelAccumY = 0;
            }

            this.wheelAccumX += dx;
            this.wheelAccumY += dy;

            const horiz = Math.abs(this.wheelAccumX);
            const vert = Math.abs(this.wheelAccumY);
            const threshold = this.wheelThreshold; // strong horizontal swipe
            const vertLeak = this.wheelVertLeak;  // ignore if mostly vertical

            if (horiz > threshold && vert < vertLeak) {
                if (this.wheelAccumX > 0) {
                    console.log('[Swipe] trackpad wheel → LEFT (prev)', { accumX: this.wheelAccumX, accumY: this.wheelAccumY });
                    this.onSwipeLeft();
                } else {
                    console.log('[Swipe] trackpad wheel → RIGHT (next)', { accumX: this.wheelAccumX, accumY: this.wheelAccumY });
                    this.onSwipeRight();
                }
                // Reset after action
                this.wheelAccumX = 0;
                this.wheelAccumY = 0;
            } else {
                // Verbose debug for tuning
                console.log('[Swipe] wheel accumulate', { x: this.wheelAccumX, y: this.wheelAccumY, dt, mode: e.deltaMode });
            }
        },
        
        // Detect whether device uses coarse pointer (touch/tablet) and gate gestures
        updateInputModalityGestureGate() {
            try {
                const w = (typeof globalThis !== 'undefined' && globalThis.window) ? globalThis.window : (typeof window !== 'undefined' ? window : null);
                if (!w || !w.matchMedia) {
                    this.isCoarsePointer = false;
                    this.allowGestures = false;
                    return;
                }
                this._coarseMql = this._coarseMql || w.matchMedia('(pointer: coarse)');
                this.isCoarsePointer = !!this._coarseMql.matches;
                const ua = (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent : '';
                const iOSoriPadOS = /iPad|iPhone|iPod/.test(ua) || (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                const smallOrTabletWidth = (w.innerWidth || 0) <= 1200; // includes tablets and most laptops in tablet mode
                this.allowGestures = this.isCoarsePointer || iOSoriPadOS || smallOrTabletWidth;
                console.log('[Swipe] modality gate', { isCoarsePointer: this.isCoarsePointer, iOSoriPadOS, smallOrTabletWidth, allowGestures: this.allowGestures });
            } catch (_) {
                this.isCoarsePointer = false;
                this.allowGestures = false;
            }
        },
        cancelHold() {
            this.touchStartTime = 0; // Reset hold detection
        },
        goToFirstAyah() {
            this.selectAyah(0);
        },
        goToPreviousAyah() {
            this.clearHighlight();
            if (this.selectedIndexAyah > 0) {
                this.selectAyah(this.selectedIndexAyah - 1);
            } else {
                this.selectAyah(this.ayat.length - 1);
            }
        },
        goToNextAyah() {
            this.clearHighlight();
            if (this.selectedIndexAyah < this.ayat.length - 1) {
                this.selectAyah(this.selectedIndexAyah + 1);
            } else {
                this.selectAyah(0);
            }
        },
        goToLastAyah() {
            this.clearHighlight();
            this.selectAyah(this.ayat.length - 1);
        },

        
        handleNoteClick() {
            if (this.isLoggedIn) {
                this.showAlertTextNote = false;
                $("#exampleModal1").modal("show");
            } else {
                this.showAlertTextNote = true;
            }
        },
        submitCat() {
            const formData = {
                surah_name: this.information.ayah.surah.name_en,
                ayah_num: this.information.ayah_id,
                ayah_verse_ar: this.information.ayah.ayah_text,
                ayah_verse_en: this.information.translation,
                category_id: this.selectedCategory,
            };
            axios.post("/submit_category", formData);
        },
        scrollToAyah() {
            const verseNum = parseInt(this.verseNumber);
            if (
                !isNaN(verseNum) &&
                verseNum >= 1 &&
                verseNum <= this.ayat.length
            ) {
                const ayahElement =
                    this.$refs.ayahList.querySelectorAll("li")[verseNum - 1];
                if (ayahElement) {
                    ayahElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            } else {
                this.showError = true;
                setTimeout(() => {
                    this.showError = false;
                }, 5000);
            }
        },
        async getSurat() {
            try {
                const response = await axios.get("/get_surat"); // Ensure this URL is correct
                this.surat = response.data;
            } catch (error) {
                console.error("Error fetching surahs:", error);
            }
        },
        async getAyat() {
            if (this.selectedSurahId > 0) {
                this.scheduleFetchAyat(this.selectedSurahId);
            } else {
                this.ayat = [];
                this.dropdownHidden = true;
            }
        },
        async handleAyahChange() {
            const selectedAyahIndex = parseInt(this.selectedAyahId);
            const selectedAyah = this.ayat[selectedAyahIndex];
            if (selectedAyah) {
                const ayahId = selectedAyah.id; // Assuming ayah has 'id' field
                try {
                    const [tafseerResponse, infoResponse] = await Promise.all([
                        axios.get(`/tafseer/${ayahId}/fetch`),
                        axios.get("/get_informations", { params: { id: ayahId } }),
                    ]);
                    this.tafseer = tafseerResponse.data;
                    this.information = infoResponse.data;
                } catch (error) {
                    console.error("Error fetching information or tafseer:", error);
                }
            }
        },
        showCard() {
            this.isCardVisible = true; // Show the card when button is clicked
        },

        updateCardSection(ayah) {
            // Assuming you have properties like 'ayahTranslation', 'ayahTafseer', etc. bound to the card section
            this.ayahTranslation = ayah.translation;
            this.ayahTafseer = ayah.tafseer;
            this.ayahTransliteration = ayah.transliteration;
            // Add any additional data you want to show in the card section
        },

        selectAyah(index) {
            this.selectedIndexAyah = index;
            this.updateCardSection(this.ayat[index]);
            this.scrollToSelectedAyah();
            this.getTafseers(this.ayat[index].id, index);
            // Update screen reader announcement
            try {
                const verseNum = (this.ayat[index] && (this.ayat[index].ayah_id || this.ayat[index].id)) || index + 1;
                const surahName = (this.information && this.information.ayah && this.information.ayah.surah && (this.information.ayah.surah.name_en || this.information.ayah.surah.name_ar)) || "";
                this.screenReaderMessage = `Selected verse ${verseNum}${surahName ? ` from ${surahName}` : ''}.`;
            } catch (e) {
                this.screenReaderMessage = `Selected verse ${index + 1}.`;
            }
        },
        scrollToSelectedAyah() {
            this.$nextTick(() => {
                const selectedAyah =
                    this.$refs.ayahList.querySelector(".selected");
                if (selectedAyah) {
                    selectedAyah.scrollIntoView({
                        behavior: "smooth",
                    });
                } else {
                    // Display error alert if no ayah is selected
                    this.showError = true;
                    // Automatically dismiss the alert after 5 seconds
                    setTimeout(() => {
                        this.dismissError();
                    }, 1000);
                }
            });
        },
        determineNextAyah() {
            const currentIndex = this.ayat.findIndex(
                (ayah) => ayah.id === this.selectedAyah.id
            );
            if (currentIndex !== -1 && currentIndex < this.ayat.length - 1) {
                return this.ayat[currentIndex + 1];
            }
            return null;
        },
        determinePreviousAyah() {
            const currentIndex = this.ayat.findIndex(
                (ayah) => ayah.id === this.selectedAyah.id
            );
            if (currentIndex > 0) {
                return this.ayat[currentIndex - 1];
            }
            return null;
        },
        selectSurah() {
            this.ayat = this.fetchAyatForSurah(this.surah); // Replace with actual logic
            this.selectedAyah = this.ayat.length > 0 ? "0" : "0"; // Select the first ayah
        },
        selectSurah(surahId) {
            this.surah = surahId;
            this.searchTerm = "";
            this.filteredSurah = [];
            this.showClearButton = false;
            this.getAyat();

            this.$nextTick(() => {
                this.autoHighlightFirstAyah();
            });
        },
        autoHighlightFirstAyah() {
            if (this.ayat.length > 0) {
                this.selectedIndexAyah = 0; // Select the first Ayah
                this.scrollToSelectedAyah(); // Scroll to the first Ayah (optional)
                this.getTafseers(this.ayat[0].id, 0); // Fetch Tafseer, translation, etc. for the first Ayah
                this.updateCardSection(this.ayat[0]); // Update card with first Ayah data
            }
        },
        getTafseers: function (id, index) {
            this.selectedIndexAyah = index;
            Promise.all([
                axios.get(`/tafseer/${id}/fetch`),
                axios.get("/get_informations", { params: { id } }),
            ])
                .then(([tafseerResp, infoResp]) => {
                    this.selectedAyah = id;
                    this.tafseer = tafseerResp.data;
                    this.information = infoResp.data;
                    this.updateCardSection(this.ayat[index]);
                })
                .catch((err) => {
                    console.error("Error fetching tafseer/information:", err);
                });
        },
    },
    created() {
        this.userId = localStorage.getItem("userId");
        this.fetchSurahs();
        this.fetchReciters();
        this.fetchTranslations();
    },
    mounted() {
        // One-time debug: show current gesture thresholds
        try {
            // Ensure gesture gating is evaluated at mount
            this.updateInputModalityGestureGate && this.updateInputModalityGestureGate();
            console.log('[Swipe] thresholds', {
                swipeMinDistance: this.swipeMinDistance,
                swipeMaxDuration: this.swipeMaxDuration,
                wheelThreshold: this.wheelThreshold,
                wheelVertLeak: this.wheelVertLeak,
                wheelResetMs: this.wheelResetMs,
            });
            // Fallback: listen on window for wheel events and scope them to Tafseer area
            if (typeof window !== 'undefined') {
                this._onWindowWheel = (e) => {
                    const areaTaf = this.$refs && this.$refs.targetTafseerElement;
                    const areaTrn = this.$refs && this.$refs.targetTranslationElement;
                    const areaTrl = this.$refs && this.$refs.targetTransliterationElement;
                    const path = (e.composedPath && e.composedPath()) || [];
                    const within = [areaTaf, areaTrn, areaTrl]
                        .filter(Boolean)
                        .some((el) => path.includes(el) || (e.target && el.contains && el.contains(e.target)));
                    if (!within) return; // ignore events outside the content areas
                    this.handleWheel(e);
                };
                window.addEventListener('wheel', this._onWindowWheel, { passive: true });
                console.log('[Swipe] window wheel listener attached (tafseer/translation/transliteration)');
            }
        } catch (_) {}
    },
    beforeUnmount() {
        if (typeof window !== 'undefined' && this._onWindowWheel) {
            window.removeEventListener('wheel', this._onWindowWheel, { passive: true });
            this._onWindowWheel = null;
        }
    },
    watch: {
        ayah: {
            handler(newAyah) {
                console.log("Ayah received:", newAyah); // Debugging log
                if (newAyah && newAyah.text) {
                    this.prepareAyahText();
                }
            },
            immediate: true,
        },
        selectedSurah(newSurah) {
            this.selectedSurahId = newSurah;
            this.getAyat();
        },
        selectedSurahId: {
            handler(newValue) {
                if (newValue) {
                    this.selectedAyahId = ""; // Reset selected Ayah when Surah changes
                    this.fetchAyat(); // Fetch Ayah for the new Surah
                }
            },
            immediate: true,
        },
        selectedSurahId(newVal) {
            if (newVal) {
                this.fetchAyat();
                this.selectedIndexAyah = 0; // Highlight the first verse
            }
        },
        "information.ayah.surah.name_ar": "updateFileName",
        verseNumber(newVal, oldVal) {
            if (newVal !== oldVal && parseInt(newVal)) {
                this.selectedIndexAyah = parseInt(newVal) - 1;
            }
        },
    },
};
</script>

<style scoped src="./css/styles.css">
</style>
<style scoped>
.swipe-tip {
  background-color: #e7f1ff; /* light blue */
  border: 1px solid #b6d4fe; /* blue border */
  color: #0a58ca; /* primary blue text */
  border-radius: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
</style>
