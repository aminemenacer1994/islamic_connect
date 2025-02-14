<template>
    <div id="app">

        <div class="pt-3 text-center">
            <Title />

            <div style="display: flex" class="container align-items-center"></div>
            <AdvancedSearch v-if="!isVisible" @input-change="handleInputChange" />
            <custom-surah-selection :customSurat="customSuratList" v-model="selectedSurah"></custom-surah-selection>


            <!-- accordion headers -->
            <div class="row container-fluid">
                <div class="col-md-4 container">
                    <FilteredSurahList :filteredSurah="filteredSurah" @select-surah="selectSurahFromResults" />

                    <div style="display: flex" class="row">
                        <AyahOfTheDay />
                        <SurahDropdown class="col-md-12 pt-2" :selectedSurah="selectedSurahId"
                            :filteredSurah="filteredSurah" :surat="surat" @update:selectedSurah="updateSelectedSurah"
                            @fetchAyat="getAyat" />

                        <AddBookmark />
                    </div>
                    <AyahDropdown :selectedSurahId="selectedSurahId" :dropdownHidden="dropdownHidden"
                        @update-information="updateInformation" @update-tafseer="updateTafseer"
                        v-if="ayah == null && !dropdownHidden"
                        class="ayah-dropdown-hidden-on-desktop d-block d-md-none" />


                    <!-- List of Ayat for Surah (desktop) -->
                    <div class="tab-content hide-on-mobile-tablet" id="nav-tabContent"
                        v-if="ayah == null && !dropdownHidden">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel"
                            aria-labelledby="nav-home-tab" v-if="ayah == null">
                            <form class="d-flex pb-2" role="search" @submit.prevent="scrollToAyah">
                                <input class="form-control me-2" type="number" placeholder="Enter Verse Number"
                                    v-model="verseNumber" required />
                                <button class="btn btn-success mb-1 ml-2" style="background: #00bfa6" type="submit">
                                    Search
                                </button>
                            </form>

                            <!-- Error alert -->
                            <ErrorAlert :showError="showError" @dismiss-error="dismissError" />

                            <div class="row container-fluid">
                                <hr class="container" style="height: 4px; background: lightgrey" />

                                <div :selectedSurahId="selectedSurah" @update-tafseer="updateTafseer"
                                    @update-information="updateInformation" :style="iconStyle"
                                    class="icon-container pb-2">
                                    <i class="bi bi-chevron-bar-left h4 custom-first-verse desktop-icon"
                                        style="cursor: pointer" @click="goToFirstAyah" title="First verse"></i>
                                    <i class="bi bi-arrow-left-circle h4 custom-prev-ayah desktop-icon"
                                        style="cursor: pointer" @click="goToPreviousAyah" title="Previous verse"></i>
                                    <i class="bi bi-arrow-right-circle h4 custom-next-ayah desktop-icon"
                                        style="cursor: pointer" @click="goToNextAyah" title="Next verse"></i>
                                    <i class="bi bi-chevron-bar-right h4 custom-last-verse desktop-icon"
                                        style="cursor: pointer" @click="goToLastAyah" title="Last verse"></i>
                                    <!-- <i class="bi bi-question-circle h4 custom-last-verse" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i> -->
                                </div>

                                <div class="custom-scrollbar pb-5" style="
                                    overflow-y: auto;
                                    max-height: 600px;
                                    background: white;
                                    border-radius: 10px;
                                    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px
                                            12px -2px,
                                        rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;">
                                    

                                   
                                        
                                    <ul class="col-md-12 list-group container-fluid root" id="toggle" ref="ayahList"
                                        style="list-style-type: none">
                                        <li v-for="(ayah, index) in ayat" :key="index" @click="selectAyah(index)"
                                            :class="{
                                                selected:
                                                    selectedIndexAyah === index ||
                                                    (verseNumber &&
                                                        parseInt(verseNumber) ===
                                                        ayah.ayah_id),
                                            }" style="
                                            padding: 10px;
                                            border-radius: 10px;">
                                            <h5 class="text-right" style="display: flex">
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

                <div class="col-md-8 card-hide">
                    <div class="card content" style="
                        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
                            rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;">
                        <div class="content">
                            <div class="container-fluid content" v-if="information != null">
                                <div class="row">
                                    <NavTabs />
                                    <!-- toogle between basic/advanced -->
                                    <div class="container text-center">
                                        <div
                                            class="row form-check form-switch d-flex justify-content-center align-items-center p-3 border rounded shadow-sm bg-light">
                                            <div class="col">
                                                <span class="fw-semibold text-muted">Advanced</span>
                                            </div>
                                            <div class="col">
                                                <div
                                                    class="form-check form-switch d-flex justify-content-center align-items-center">
                                                    <input
                                                        class="form-check-input pr-5 custom-switch shadow-lg text-center"
                                                        style="
                                                        border-color: #00bfa6;
                                                        color: #00bfa6;
                                                    " type="checkbox" role="switch" id="flexSwitchCheckDefault"
                                                        v-model="isVisible" @change="saveToggleState" />
                                                </div>
                                            </div>
                                            <div class="col">
                                                <span class="fw-semibold text-muted">Basic</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Surah info Modal -->
                                <div class="modal fade" id="translationInfo" tabindex="-1"
                                    aria-labelledby="surahInfoModalLabel" aria-hidden="true" @click.self="closeModal">
                                    <div class="modal-dialog modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="surahInfoModalLabel">
                                                    <strong>Surah Information</strong>
                                                </h1>
                                                <button type="button" class="btn-close" @click="closeModal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form class="container text-left">
                                                    <div class="mb-3 container" v-if="
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
                                                    <div class="mb-3 container" v-if="
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
                                </div>
                            </div>

                            <div class="card-body content" id="alertContainer">
                                <div class="tab-content text-center">
                                    <Welcome :information="information" />

                                    <!-- Translation Section -->
                                    <div class="tab-pane active content" id="home" role="tabpanel"
                                        v-if="information != null">
                                        <!-- desktop top features -->
                                        <div v-if="!isVisible" :style="iconStyle">
                                            <div class="col pb-2">
                                                <i :class="isOpen
                                                    ? 'bi bi-x-circle-fill'
                                                    : 'bi bi-plus-circle-fill'
                                                    " class="text-left hide-on-mobile h4" @click="toggleContent"></i>
                                            </div>
                                            <div v-if="isOpen" class="hide-on-mobile">
                                                <div class="text-center">
                                                    <div class="row pt-2">
                                                        <div class="col desktop-icon">
                                                            <i class="bi bi-file-earmark-text text-right mr-2 h4" style="
                                                                cursor: pointer;
                                                            " aria-expanded="false" data-bs-placement="top"
                                                                title="Write a note" @click="
                                                                    openModal(
                                                                        'translationNote'
                                                                    )
                                                                    "></i>
                                                        </div>
                                                        <div class="col desktop-icon">
                                                            <i @click="submitForm" style="
                                                                cursor: pointer;
                                                            " class="bi bi-bookmark text-right mr-2 h4"
                                                                aria-expanded="false" title="Bookmark verse"></i>
                                                        </div>
                                                        <!-- <div class="col desktop-icon"><ScreenTranslationCapture style="cursor:pointer" :targetTranslationRef="'targetTranslationElement'" /></div> -->
                                                        <!-- <div class="col" v-if="isVisible"><PdfDownload style="cursor:pointer" :targetTranslationRef="'targetTranslationElement'" /></div>                 -->
                                                        <!-- <div class="col"><VideoModal  @save-video-data="handleSave" /><i class="bi bi-play-circle h3" style="cursor:pointer" data-bs-toggle="modal" data-bs-target="#videoModal"></i></div> -->
                                                        <!-- <div class="col"><i class="bi bi-paint-bucket h2" data-bs-toggle="offcanvas" style="cursor:pointer" data-bs-target="#styleOffcanvas" aria-controls="styleOffcanvas"></i></div> -->
                                                        <div class="col desktop-icon">
                                                            <i style="
                                                                cursor: pointer;
                                                            " class="bi bi-info-circle h4 mr-2 pl-2"
                                                                data-bs-toggle="modal" data-bs-target="#translationInfo"
                                                                aria-expanded="false" data-bs-placement="top"
                                                                title="Surah info"></i>
                                                        </div>
                                                        <div class="col desktop-icon">
                                                            <i title="Give feedback" style="
                                                                cursor: pointer;
                                                            " data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                                class="bi bi-chat-left-text desktop-icon text-right mr-2 h4"
                                                                aria-expanded="false" data-bs-placement="top"></i>
                                                        </div>
                                                        <div class="col desktop-icon">
                                                            <i class="bi bi-arrows-fullscreen h4" style="
                                                                cursor: pointer;
                                                            " @click="toggleFullScreen
                                                                " title="Full screen"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr style="border: 2px solid #333" />
                                            </div>
                                        </div>

                                        <!-- mobile navigation  -->
                                        <div class="dropdown mobile-only pb-2">
                                            <div :style="iconStyle" class="icon-container">
                                                <i @click="submitForm" class="bi bi-bookmark mb-2 h4"
                                                    aria-expanded="false" data-bs-placement="top"
                                                    title="Bookmark verse"></i>
                                                <i class="bi bi-chevron-bar-left h4" style="cursor: pointer"
                                                    @click="goToFirstAyah()" title="Last verse"></i>
                                                <i class="bi bi-arrow-left-circle h4" style="cursor: pointer"
                                                    @click="goToPreviousAyah()" title="Previous verse"></i>
                                                <i class="bi bi-arrow-right-circle h4" style="cursor: pointer"
                                                    @click="goToNextAyah()" title="Next verse"></i>
                                                <i class="bi bi-chevron-bar-right h4" style="cursor: pointer"
                                                    @click="goToLastAyah()" title="End verse"></i>
                                                <!-- <i class="bi bi-question-circle h4 custom-last-verse" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i> -->
                                                <!-- <i class="bi bi-paint-bucket h1" style="cursor:pointer" data-bs-toggle="offcanvas" data-bs-target="#styleOffcanvas" aria-controls="styleOffcanvas"></i> -->
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

                                            <div v-if="!isVisible" class="container-fluid text-center mobile-only">
                                                <div class="row">
                                                    <div class="col">
                                                        <i :class="isOpen
                                                            ? 'bi bi-x-circle'
                                                            : 'bi bi-plus-circle-fill'
                                                            " class="text-center mobile-only h3 pt-3"
                                                            @click="toggleContent"></i>
                                                    </div>
                                                </div>
                                            </div>

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
                                            <!-- desktop top features -->
                                            <div v-if="!isVisible" :style="iconStyle">
                                                <div class="col pb-2">
                                                    <i :class="isOpen
                                                        ? 'bi bi-x-circle-fill'
                                                        : 'bi bi-plus-circle-fill'
                                                        " class="text-left hide-on-mobile h4"
                                                        @click="toggleContent"></i>
                                                </div>
                                                <div v-if="isOpen" class="icon-container-fluid hide-on-mobile">
                                                    <div class="text-center">
                                                        <div class="row pt-2">
                                                            <div class="col desktop-icon">
                                                                <i style="
                                                                    cursor: pointer;
                                                                " class="bi bi-file-earmark-text text-right mr-2 h4"
                                                                    aria-expanded="false" data-bs-placement="top"
                                                                    title="Write a note" @click="
                                                                        openModal(
                                                                            'tafseerNote'
                                                                        )
                                                                        "></i>
                                                            </div>
                                                            <div class="col desktop-icon">
                                                                <i @click="submitFormTafseer
                                                                    " style="
                                                                    cursor: pointer;
                                                                " class="bi bi-bookmark text-right mr-2 h4"
                                                                    aria-expanded="false" data-bs-placement="top"
                                                                    title="Bookmark verse"></i>
                                                            </div>
                                                            <!-- <div class="col desktop-icon"><ScreenTafseerCapture style="cursor:pointer"  :targetTafseerRef="'targetTafseerElement'" /></div> -->
                                                            <!-- <div class="col"><PdfDownloadTafsser style="cursor:pointer"  :targetTafseerRef="'targetTafseerElement'"/></div> -->
                                                            <div class="col desktop-icon">
                                                                <i style="
                                                                    cursor: pointer;
                                                                " class="bi bi-info-circle h4 mr-2 pl-2"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#translationInfo"
                                                                    aria-expanded="false" data-bs-placement="top"
                                                                    title="Surah info"></i>
                                                            </div>
                                                            <div class="col desktop-icon">
                                                                <i title="Give feedback" style="
                                                                    cursor: pointer;
                                                                " data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                                    class="bi bi-chat-left-text text-right mr-2 h4"
                                                                    aria-expanded="false" data-bs-placement="top"></i>
                                                            </div>
                                                            <div class="col desktop-icon">
                                                                <i class="bi bi-arrows-fullscreen h4" style="
                                                                    cursor: pointer;
                                                                " @click="toggleFullScreen
                                                                    " title="Full screen" aria-expanded="false"
                                                                    data-bs-placement="top"></i>
                                                            </div>
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
                                                    <i @click="submitFormTafseer" class="bi bi-bookmark mb-2 h4"
                                                        aria-expanded="false" data-bs-placement="top"
                                                        title="Bookmark verse"></i>
                                                    <i class="bi bi-chevron-bar-left h4" style="cursor: pointer"
                                                        @click="goToFirstAyah()" title="Last verse"></i>
                                                    <i class="bi bi-arrow-left-circle h4" style="cursor: pointer"
                                                        @click="goToPreviousAyah()" title="Previous verse"></i>
                                                    <i class="bi bi-arrow-right-circle h4" style="cursor: pointer"
                                                        @click="goToNextAyah()" title="Next verse"></i>
                                                    <i class="bi bi-chevron-bar-right h4" style="cursor: pointer"
                                                        @click="goToLastAyah()" title="End verse"></i>
                                                    <!-- <i class="bi bi-paint-bucket h1" style="cursor:pointer" data-bs-toggle="offcanvas" data-bs-target="#styleOffcanvas" aria-controls="styleOffcanvas"></i> -->
                                                    <!-- <i class="bi bi-question-circle h4 custom-last-verse" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i> -->
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

                                        <div v-if="!isVisible" class="container-fluid text-center mobile-only">
                                            <div class="row">
                                                <div class="col">
                                                    <i :class="isOpen
                                                        ? 'bi bi-x-circle'
                                                        : 'bi bi-plus-circle-fill'
                                                        " class="text-center mobile-only h3 pt-3"
                                                        @click="toggleContent"></i>
                                                </div>
                                            </div>
                                        </div>

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
                                                <!-- desktop top features -->
                                                <div :style="iconStyle">
                                                    <div v-if="!isVisible" class="col pb-2">
                                                        <i :class="isOpen
                                                            ? 'bi bi-x-circle-fill'
                                                            : 'bi bi-plus-circle-fill'
                                                            " class="text-left hide-on-mobile h4"
                                                            @click="toggleContent"></i>
                                                    </div>
                                                    <div v-if="isOpen" class="hide-on-mobile">
                                                        <div class="text-center">
                                                            <div class="row pt-2">
                                                                <div class="col desktop-icon">
                                                                    <i style="
                                                                        cursor: pointer;
                                                                    " class="bi bi-file-earmark-text text-right mr-2 h4"
                                                                        aria-expanded="false" data-bs-placement="top"
                                                                        title="Write a note" @click="
                                                                            openModal(
                                                                                'transliterationNote'
                                                                            )
                                                                            "></i>
                                                                </div>
                                                                <div class="col desktop-icon">
                                                                    <i @click="submitFormTransliteration
                                                                        " style="
                                                                        cursor: pointer;
                                                                    " class="bi bi-bookmark text-right mr-2 h4"
                                                                        aria-expanded="false"
                                                                        title="Bookmark verse"></i>
                                                                </div>
                                                                <div class="col desktop-icon">
                                                                    <i style="
                                                                        cursor: pointer;
                                                                    " class="bi bi-info-circle h4 mr-2 pl-2"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#translationInfo"
                                                                        aria-expanded="false" data-bs-placement="top"
                                                                        title="Surah info"></i>
                                                                </div>
                                                                <div class="col desktop-icon">
                                                                    <i title="Give feedback" style="
                                                                        cursor: pointer;
                                                                    " data-bs-toggle="modal"
                                                                        data-bs-target="#exampleModal"
                                                                        class="bi bi-chat-left-text text-right mr-2 h4"
                                                                        aria-expanded="false"
                                                                        data-bs-placement="top"></i>
                                                                </div>
                                                                <div class="col desktop-icon">
                                                                    <i class="bi bi-arrows-fullscreen h4" style="
                                                                        cursor: pointer;
                                                                    " @click="toggleFullScreen
                                                                        " title="Full screen"></i>
                                                                </div>
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
                                                        <i @click="submitFormTransliteration
                                                            " class="bi bi-bookmark mb-2 h4" aria-expanded="false"
                                                            data-bs-placement="top" title="Bookmark verse"></i>
                                                        <i class="bi bi-chevron-bar-left h4" style="cursor: pointer"
                                                            @click="goToFirstAyah()" title="Last verse"></i>
                                                        <i class="bi bi-arrow-left-circle h4" style="cursor: pointer"
                                                            @click="goToPreviousAyah()" title="Previous verse"></i>
                                                        <i class="bi bi-arrow-right-circle h4" style="cursor: pointer"
                                                            @click="goToNextAyah()" title="Next verse"></i>
                                                        <i class="bi bi-chevron-bar-right h4" style="cursor: pointer"
                                                            @click="goToLastAyah()" title="End verse"></i>
                                                        <!-- <i class="bi bi-paint-bucket h1" style="cursor:pointer" data-bs-toggle="offcanvas" data-bs-target="#styleOffcanvas" aria-controls="styleOffcanvas"></i> -->
                                                        <!-- <i class="bi bi-question-circle h4 custom-last-verse" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i> -->
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

                                            <div v-if="!isVisible" class="container-fluid text-center mobile-only">
                                                <div class="row">
                                                    <div class="col">
                                                        <i :class="isOpen
                                                            ? 'bi bi-x-circle'
                                                            : 'bi bi-plus-circle-fill'
                                                            " class="text-center mobile-only h3 pt-3"
                                                            @click="toggleContent"></i>
                                                    </div>
                                                </div>
                                            </div>

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
                        <!-- <audio v-if="information != null" 
                        ref="audioPlayer" 
                        :src="fullAudioLink"  
                        class="w-100 custom-audio" 
                        loop controls 
                        />  -->
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script defer>
import html2canvas from "html2canvas";
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



export default {
    name: "QuranComponent",
    props: {},
    components: {
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
        const themesFromStorage = localStorage.getItem("savedThemes");
        if (themesFromStorage) {
            this.savedThemes = JSON.parse(themesFromStorage);
        }
        this.loadSavedStyles();
        this.applyStylesToCards(); // Ensure styles are applied to cards initially
        this.getSurat(); // Call getSurat to populate the surah list
        if (this.defaultStyles.length > 0) {
            this.selectedStyle = this.defaultStyles[0];
            this.applyStyle();
        }
        this.loadBackgroundColor();
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
            isVisible: false,
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
            selectedStyle: null,
            defaultStyles: [
                {
                    name: "Default",
                    backgroundColor: "#ffffff",
                    iconColor: "#000000",
                    textColor: "#000000",
                    fontStyle: "Arial, sans-serif",
                    textShadow: "None",
                    shadow: "none",
                },
                {
                    name: "Dyslexia",
                    backgroundColor: "#FDFD96",
                    iconColor: "#000000",
                    textColor: "#000080",
                    fontStyle: "Arial, sans-serif",
                    textShadow: "None",
                    shadow: "none",
                },
                {
                    name: "Dysgraphia",
                    backgroundColor: "#FFFDD0",
                    iconColor: "#000000",
                    textColor: "#00008B",
                    fontStyle: "Arial, sans-serif",
                    textShadow: "None",
                    shadow: "none",
                },
                {
                    name: "Hyperlexia",
                    backgroundColor: "#F5F5DC",
                    iconColor: "#000000",
                    textColor: "#06402B",
                    fontStyle: "Arial, sans-serif",
                    textShadow: "None",
                    shadow: "none",
                },
                {
                    name: "Visual Proccesing disorder",
                    backgroundColor: "#fff",
                    iconColor: "#000000",
                    textColor: "black",
                    fontStyle: "Arial, sans-serif",
                    textShadow: "None",
                    shadow: "none",
                },
                {
                    name: "ADHD",
                    backgroundColor: "#ADD8E6",
                    iconColor: "#000000",
                    textColor: "#696969",
                    fontStyle: "Arial, sans-serif",
                    textShadow: "None",
                    shadow: "none",
                },
            ],
            fontFamilies: [
                "Arial, sans-serif",
                "Courier New, Courier, monospace",
                "Georgia, serif",
                "Times New Roman, Times, serif",
                "Verdana, sans-serif",
                "Trebuchet MS, sans-serif",
                "Tahoma, sans-serif",
                "Impact, sans-serif",
                "Comic Sans MS, cursive, sans-serif",
                "Helvetica, Arial, sans-serif",
            ],
            // List of shadow options
            shadows: [
                { name: "None", style: "none" },
                {
                    name: "Small Shadow",
                    style: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                },
                {
                    name: "Medium Shadow",
                    style: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                },
                {
                    name: "Large Shadow",
                    style: "4px 4px 8px rgba(0, 0, 0, 0.5)",
                },
                {
                    name: "Deep Shadow",
                    style: "6px 6px 12px rgba(0, 0, 0, 0.7)",
                },
                {
                    name: "Soft Glow",
                    style: "0px 0px 10px rgba(255, 255, 255, 0.7)",
                },
                { name: "Dark Glow", style: "0px 0px 10px rgba(0, 0, 0, 0.9)" },
            ],
            selectedStyle: {
                textColor: "#000",
                backgroundColor: "#fff",
                iconColor: "#000000",
            },
            // Initial styles
            fontFamily: "Arial, sans-serif",
            fontSize: 16,
            fontSpacing: 0,
            selectedShadow: "none",
            // Font style options
            isBold: false,
            isItalic: false,
            isLight: false,
            isUnderline: false,
            isStrikethrough: false,
            // Text transformation and alignment
            textTransform: "none",
            textAlign: "left",
            // For showing success message
            showSuccessMessage: false,
            isCollapsed: false,
            showSuccessMessage: false,
            showMessage: false,
            message: "Theme has been applied successfully!",
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
            //swipe gestures
            touchStartX: 0, // Starting X coordinate
            touchStartY: 0, // Starting Y coordinate (optional for vertical checks)
            touchEndX: 0, // Ending X coordinate
            touchEndY: 0, // Ending Y coordinate (optional for vertical checks)
            tapThreshold: 10, // Max distance for a tap
            swipeThreshold: 100, // Min distance for a swipe
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
        fullAudioLink() {
            if (this.information && this.information.ayah.audio_links) {
                return this.information.ayah.audio_links.startsWith("http")
                    ? this.information.ayah.audio_links
                    : `${window.location.origin}${this.information.ayah.audio_links}`;
            }
            return "";
        },
        containerStyle() {
            return {
                backgroundColor: this.bgColor,
                color: this.textColor,
                fontFamily: this.fontFamily,
                fontSize: `${this.fontSize}px`,
                letterSpacing: `${this.fontSpacing}px`,
                fontWeight: this.isBold
                    ? "bold"
                    : this.isLight
                        ? "300"
                        : "normal",
                fontStyle: this.isItalic ? "italic" : "normal",
                textShadow: this.selectedShadow,
                textDecoration: this.isUnderline
                    ? "underline"
                    : this.isStrikethrough
                        ? "line-through"
                        : "none",
                textTransform: this.textTransform,
                textAlign: this.textAlign,
            };
        },
        iconStyle() {
            return {
                color: this.iconColor,
                fill: this.iconColor, // Add this line for SVG icons
            };
        },
        textStyle() {
            return {
                color: this.textColor,
            };
        },
    },
    methods: {
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
        // fetchAyat() {
        //     // Fetch ayat for the selected surah and set the first ayah as highlighted
        //     // Example fetch request
        //     this.ayat = [];
        // },
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
        openModal(modalId) {
            const modalElement = this.$refs[modalId];
            if (modalElement) {
                const modalInstance =
                    Modal.getInstance(modalElement) || new Modal(modalElement);
                modalInstance.show();
            } else {
                console.error(`Modal reference '${modalId}' not found.`);
            }
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
        loadBackgroundColor() {
            // Check if a background color is saved in localStorage
            const savedBgColor = localStorage.getItem("bgColor");
            const savedtextColor = localStorage.getItem("textColor");
            const savediconColor = localStorage.getItem("iconColor");
            if (savedBgColor) {
                this.bgColor = savedBgColor; // Set the color picker to the saved color
                this.textColor = savedtextColor;
                this.iconColor = savediconColor;
            }
        },
        applyCustomStyles() {
            const settings = {
                bgColor: this.bgColor,
                textColor: this.textColor,
                fontFamily: this.fontFamily,
                fontSize: this.fontSize,
                fontSpacing: this.fontSpacing,
                selectedShadow: this.selectedShadow,
                isBold: this.isBold,
                isItalic: this.isItalic,
                isLight: this.isLight,
                isUnderline: this.isUnderline,
                isStrikethrough: this.isStrikethrough,
                textTransform: this.textTransform,
                textAlign: this.textAlign,
                iconColor: this.iconColor,
            };
            localStorage.setItem("textStyles", JSON.stringify(settings));
            localStorage.setItem("bgColor", this.bgColor);
            localStorage.setItem("textColor", this.textColor);
            localStorage.setItem("iconColor", this.iconColor);

            // Apply styles to the container
            // Object.assign(this.$el.style, this.containerStyle);

            // Apply icon color to all icons
            const icons = this.$el.querySelectorAll("i");
            icons.forEach((icon) => {
                icon.style.color = this.iconColor;
            });

            // Save settings to localStorage
            localStorage.setItem("textStyles", JSON.stringify(settings));

            // Apply styles to the card content
            this.applyStylesToCards(); // Ensure this method is defined and applied

            this.showSuccessMessage = true;

            setTimeout(() => {
                this.showSuccessMessage = false;

                // Find the modal element
                const modalElement = document.getElementById("styleModal");

                // Check for an existing modal instance or create a new one if not already initialized
                let modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (!modalInstance) {
                    modalInstance = new bootstrap.Modal(modalElement);
                }

                // Hide the modal
                modalInstance.hide();
            }, 3000);
        },
        applyStylesToCards() {
            // Example of applying styles to card elements
            const cards = document.querySelectorAll(".card");
            cards.forEach((card) => {
                card.style.backgroundColor = this.bgColor;
                card.style.color = this.textColor;
                card.style.fontFamily = this.fontFamily;
                card.style.fontSize = `${this.fontSize}px`;
                card.style.letterSpacing = `${this.fontSpacing}px`;
                card.style.fontWeight = this.isBold
                    ? "bold"
                    : this.isLight
                        ? "300"
                        : "normal";
                card.style.fontStyle = this.isItalic ? "italic" : "normal";
                card.style.textShadow = this.selectedShadow;
                card.style.textDecoration = this.isUnderline
                    ? "underline"
                    : this.isStrikethrough
                        ? "line-through"
                        : "none";
                card.style.textTransform = this.textTransform;
                card.style.textAlign = this.textAlign;
                card.style.iconColor = this.iconColor;
            });
        },
        loadSavedStyles() {
            const savedSettings = JSON.parse(
                localStorage.getItem("textStyles")
            );
            if (savedSettings) {
                this.bgColor = savedSettings.bgColor || this.bgColor;
                this.textColor = savedSettings.textColor || this.textColor;
                this.fontFamily = savedSettings.fontFamily || this.fontFamily;
                this.fontSize = savedSettings.fontSize || this.fontSize;
                this.fontSpacing =
                    savedSettings.fontSpacing || this.fontSpacing;
                this.selectedShadow =
                    savedSettings.selectedShadow || this.selectedShadow;
                this.isBold = savedSettings.isBold || this.isBold;
                this.isItalic = savedSettings.isItalic || this.isItalic;
                this.isLight = savedSettings.isLight || this.isLight;
                this.isUnderline =
                    savedSettings.isUnderline || this.isUnderline;
                this.isStrikethrough =
                    savedSettings.isStrikethrough || this.isStrikethrough;
                this.textTransform =
                    savedSettings.textTransform || this.textTransform;
                this.textAlign = savedSettings.textAlign || this.textAlign;
                this.iconColor = savedSettings.iconColor || this.iconColor;

                // Apply the loaded styles to the container
                this.applyCustomStyles(); // Ensure this applies the styles to the container
            }
        },
        saveStyle() {
            localStorage.setItem(
                "selectedStyle",
                JSON.stringify(this.selectedStyle)
            );
        },
        getStoredStyle() {
            const storedStyle = localStorage.getItem("selectedStyle");
            return storedStyle ? JSON.parse(storedStyle) : null;
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
        onSwipeLeft() {
            this.goToPreviousAyah();
            this.clearHighlight();
            console.log("Swiped left");
        },
        onSwipeRight() {
            this.goToNextAyah();
            this.clearHighlight();
            console.log("Swiped right");
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

        detectSwipe() {
            const swipeDistance = this.touchStartX - this.touchEndX;
            console.log("Swipe distance:", swipeDistance);
            if (swipeDistance > 50) {
                console.log("Swipe left detected");
                alert("Swipe left detected");
            } else if (swipeDistance < -50) {
                console.log("Swipe right detected");
                alert("Swipe right detected");
            }
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
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.badge.bg-premium {
    background: linear-gradient(45deg, #2B5797, #00DDEB);
    padding: 0.5rem 1rem;
}

.alert {
    padding: 10px;
    margin: 10px 0;
    border-radius: 4px;
    font-size: 14px;
}

.alert-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.alert-danger {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.custom-switch {
    width: 50px;
    height: 25px;
    background-color: #6c757d;
    border: none;
    transition: background-color 0.3s ease;
}

.custom-switch:checked {
    background-color: #0d6efd;
}

.custom-switch::before {
    background-color: #f8f9fa;
    width: 18px;
    height: 18px;
    transform: translateX(2px);
}

.selected {
    background-color: #e0f7fa;
}

.highlighted {
    background-color: rgba(0, 191, 166, 0.2);
    color: rgb(5, 32, 29);
    border: 1px solid rgba(0, 191, 166);
}

.selected {
    background-color: #d1e7dd;
    /* Change this to your selected color */
}

.custom-offcanvas {
    background-color: #10584f;
    color: white;
    width: 40%;
}

.custom-prev-ayah:hover {
    color: black;
    /* Default color */
    transition: color 0.3s ease;
    /* Smooth transition */
}

.custom-prev-ayah:hover {
    color: black;
    /* Default color */
    transition: color 0.3s ease;
    /* Smooth transition */
}

.custom-last-verse:hover {
    color: black;
    /* Default color */
    transition: color 0.3s ease;
    /* Smooth transition */
}

.highlight {
    background-color: yellow;
    font-weight: bold;
}

.result-item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

/* .button-33 {
  background-color: rgba(0, 191, 166, 0.2);
  color: rgb(255, 255, 255);
  border: 1px solid rgba(0, 191, 166);
} */

.top-toolbar-btn {
    background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
}

.pricing-cards {
    display: flex;
    gap: 2rem;
    justify-content: center;
    margin-top: 2rem;
}

.price-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    width: 300px;
    transition: transform 0.2s;
}

.price-card:hover {
    transform: translateY(-5px);
}

.price-card.featured {
    border-color: var(--accent-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.price {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--accent-color);
    margin: 1rem 0;
}

.savings {
    color: #28a745;
    font-weight: bold;
}



.premium-features {
    margin-top: 2rem;
}

.premium-features ul {
    list-style: none;
    padding: 0;
}

.premium-features li {
    margin: 0.5rem 0;
    color: #28a745;
}
</style>
