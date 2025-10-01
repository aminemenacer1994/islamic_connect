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
                    <h5 class="fw-bold text-left -2 ">Select a Surah:</h5>
                    <SurahDropdown class="col-md-12" :selectedSurah="selectedSurahId" :filteredSurah="filteredSurah"
                        :surat="surat" @update:selectedSurah="updateSelectedSurah" @fetchAyat="getAyat" />

                    <!-- <FilteredSurahList :filteredSurah="filteredSurah" @select-surah="selectSurahFromResults" /> -->
                   

                    <!-- <AddBookmark /> -->
                    <!-- </div> -->
                    <h5 class="fw-bold text-left mb-2" v-if="information != null">Select a Verse:</h5>
                    <!-- <form class="d-flex pb-2 container hide-on-mobile-tablet" v-if="information != null" role="search"
                        @submit.prevent="scrollToAyah">
                        <input class="form-control me-2" style="border: 3px solid #31464338; border-radius: 10px; "
                            type="number" placeholder="Enter Verse Number" v-model="verseNumber" required />
                        <button class="btn btn-success mb-1 ml-1" style="background: #00bfa6;border-radius: 5px;"
                            type="submit">
                            Search
                        </button>
                    </form> -->
                    <AyahDropdown :selectedSurahId="selectedSurahId" :dropdownHidden="dropdownHidden"
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
                                        style="list-style-type: none">

                                        <li v-for="(ayah, index) in ayat" :key="index" @click="selectAyah(index)"
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
                                        <div :selectedSurahId="selectedSurah" @update-tafseer="updateTafseer"
                                            @update-information="updateInformation" :style="{


                                            }" class="icon-container hide-on-mobile mb-3">
                                            <div class="text-center icon-text">
                                                <i class="bi bi-skip-start-fill h2 pt- custom-prev-ayah"
                                                    style="cursor: pointer" @click="goToFirstAyah"
                                                    title="First verse"></i>
                                                <div class="large">First verse</div>
                                            </div>
                                            <div class="text-center">
                                                <i class="bi bi-arrow-left-circle-fill pt-2 h4 custom-prev-ayah desktop-icon"
                                                    style="cursor: pointer" @click="goToPreviousAyah"
                                                    title="Previous verse"></i>
                                                <div class="large">Previous verse</div>
                                            </div>
                                            <div class="text-center">
                                                <i class="bi bi-arrow-right-circle-fill pt-2 h4 custom-prev-ayah desktop-icon"
                                                    style="cursor: pointer" @click="goToNextAyah"
                                                    title="Next verse"></i>
                                                <div class="large">Next verse</div>
                                            </div>
                                            <div class="text-center">
                                                <i class="bi bi-skip-end-fill pt-2 h2 custom-prev-ayah desktop-icon"
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
                                                                aria-expanded="false" data-bs-placement="top"
                                                                title="Write a note"
                                                                @click="openModal('translationNote')"></i>
                                                            <div class="icon-text pt-2">Write a Note</div>
                                                        </div>
                                                        <div class="col desktop-icon" style="cursor: pointer;">
                                                            <i @click="submitForm"
                                                                class="bi bi-bookmark text-right mr-2 h4"
                                                                aria-expanded="false" title="Bookmark verse"></i>
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
                                                                aria-expanded="false" data-bs-placement="top"></i>
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
                                        <div class="dropdown mobile-only pb-2">
                                            <div :style="iconStyle" class="icon-container">

                                                <i class="bi bi-chevron-bar-left h4" style="cursor: pointer"
                                                    @click="goToFirstAyah()" title="Last verse"></i>
                                                <i class="bi bi-arrow-left-circle h4" style="cursor: pointer"
                                                    @click="goToPreviousAyah()" title="Previous verse"></i>
                                                <!-- <i @click="submitForm" class="bi bi-bookmark mb-2 h4"
                                                    aria-expanded="false" data-bs-placement="top"
                                                    title="Bookmark verse"></i> -->
                                                <i class="bi bi-arrow-right-circle h4" style="cursor: pointer"
                                                    @click="goToNextAyah()" title="Next verse"></i>
                                                <i class="bi bi-chevron-bar-right h4" style="cursor: pointer"
                                                    @click="goToLastAyah()" title="End verse"></i>
                                            </div>
                                        </div>
                                        <!-- dropdown mobile content -->
                                        <div>
                                            <div class="pt-2" ref="targetTranslationElement">
                                                <TranslationSection :currentAyah="currentAyah" :isVisible="!isVisible"
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
                                                class="icon-container hide-on-mobile mb-3">
                                                <div class="text-center">
                                                    <i class="bi bi-skip-start-fill h2 pt- custom-prev-ayah"
                                                        style="cursor: pointer" @click="goToFirstAyah"
                                                        title="First verse"></i>
                                                    <div class="large">First verse</div>
                                                </div>
                                                <div class="text-center">
                                                    <i class="bi bi-arrow-left-circle-fill pt-2 h4 custom-prev-ayah desktop-icon"
                                                        style="cursor: pointer" @click="goToPreviousAyah"
                                                        title="Previous verse"></i>
                                                    <div class="large">Previous verse</div>
                                                </div>
                                                <div class="text-center">
                                                    <i class="bi bi-arrow-right-circle-fill pt-2 h4 custom-prev-ayah desktop-icon"
                                                        style="cursor: pointer" @click="goToNextAyah"
                                                        title="Next verse"></i>
                                                    <div class="large">Next verse</div>
                                                </div>
                                                <div class="text-center">
                                                    <i class="bi bi-skip-end-fill pt-2 h2 custom-prev-ayah desktop-icon"
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
                                            </div>
                                        </div>

                                        <!-- Main content  -->
                                        <div class="pt-2" ref="targetTafseerElement">
                                            <TafseerSection :currentAyah="currentAyah" :isVisible="!isVisible"
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
                                                </div>
                                            </div>

                                            <div ref="targetTransliterationElement">
                                                <TransliterationSection :currentAyah="currentAyah"
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
        this.fetchAyat();
       
        this.getSurat(); // Call getSurat to populate the surah list
        this.prepareAyahText();

    },

    data() {
        return {
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
            loading: false
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
        
        handleDarkModeChange(isDarkMode) {
            this.isDarkMode = isDarkMode;
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
        fetchAyat: async function () {

            try {
                this.isLoading = true;
                const response = await axios.get("/get_ayat", {
                    params: { surah_id: this.selectedSurahId },
                });
                this.ayat = response.data;

                // Automatically select and display the first Ayah if available
                if (this.ayat.length > 0) {
                    this.selectedAyahId = this.ayat[0].id; // Select the first Ayah by default
                    this.handleAyahChange(); // Trigger Ayah change to load its content
                }
            } catch (error) {
                console.error("Error fetching ayat:", error);
            } finally {
                this.isLoading = false;
            }
        },
        updateInformation(info) {
            this.information = info;
        },
        updateTafseer(tafseerData) {
            this.tafseer = tafseerData;
        },
        toggleAudioPlayback() {
            const audioPlayer = this.$refs.audioPlayer;
            if (audioPlayer) {
                audioPlayer.currentTime = 0;
                audioPlayer.play();
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
        handleTouchStart(event) {
            const touch = event.changedTouches
                ? event.changedTouches[0]
                : event;
            this.touchStartX = touch.screenX;
            this.touchStartTime = Date.now();
        },
        handleTouchMove(event) {
            const touch = event.changedTouches
                ? event.changedTouches[0]
                : event;
            this.touchEndX = touch.screenX;
        },
        handleTouchEnd() {
            const touchEndTime = Date.now();
            const timeDiff = touchEndTime - this.touchStartTime;
            const deltaX = this.touchEndX - this.touchStartX;
            const minSwipeDistance = 50; // Minimum distance in pixels to detect swipe
            const maxSwipeDuration = 500; // Maximum duration in ms for a swipe

            // Swipe gesture detection
            if (
                Math.abs(deltaX) > minSwipeDistance &&
                timeDiff < maxSwipeDuration
            ) {
                if (deltaX > 0) {
                    this.onSwipeRight();
                } else {
                    this.onSwipeLeft();
                }
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
                try {
                    const response = await axios.get("/get_ayat", {
                        params: {
                            surah_id: this.selectedSurahId,
                        },
                    });
                    this.ayat = response.data;
                    this.dropdownHidden = false; // Show Ayah dropdown after fetching
                } catch (error) {
                    console.error("Error fetching ayat:", error);
                    this.ayat = []; // Clear ayat on error
                    this.dropdownHidden = true; // Hide Ayah dropdown
                }
            } else {
                this.ayat = [];
                this.dropdownHidden = true; // Hide Ayah dropdown if no Surah is selected
            }
        },
        async handleAyahChange() {
            const selectedAyahIndex = parseInt(this.selectedAyahId);
            const selectedAyah = this.ayat[selectedAyahIndex];
            if (selectedAyah) {
                const ayahId = selectedAyah.id; // Assuming ayah has 'id' field, adjust if necessary
                try {
                    const tafseerResponse = await axios.get(
                        `/tafseer/${ayahId}/fetch`
                    );
                    this.tafseer = tafseerResponse.data;

                    const infoResponse = await axios.get("/get_informations", {
                        params: {
                            id: ayahId,
                        },
                    });
                    this.information = infoResponse.data;
                } catch (error) {
                    console.error(
                        "Error fetching information or tafseer:",
                        error
                    );
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
            axios.get(`/tafseer/${id}/fetch`).then(
                function (response) {
                    console.log(response);
                    this.selectedAyah = id;
                    this.tafseer = response.data;
                    this.updateCardSection(this.ayat[index]);
                }.bind(this)
            );
            axios
                .get("/get_informations", {
                    params: {
                        id: id,
                    },
                })
                .then(
                    function (response) {
                        this.selectedAyah = id;
                        this.information = response.data;
                    }.bind(this)
                );
        },
    },
    created() {
        this.userId = localStorage.getItem("userId");
        this.fetchSurahs();
        this.fetchReciters();
        this.fetchTranslations();
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