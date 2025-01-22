<template>
<div id="app">
  <div class="pt-3 pb-3 text-center">
    <Title />
    <search-form :surat="surat" @update-results="handleUpdateResults" @clear-results="handleClearResults" @select-surah="handleSelectSurah" />
    <custom-surah-selection :customSurat="customSuratList" v-model="selectedSurah"></custom-surah-selection>
  </div>
 
 <div class="row container-fluid">
  <!-- Search section -->
  <div class="col-md-4 container">
   <FilteredSurahList :filteredSurah="filteredSurah" @select-surah="selectSurahFromResults" />
   <Donation />
   <SurahDropdown :selectedSurah="selectedSurah" :filteredSurah="filteredSurah" :surat="surat" @update:selectedSurah="updateSelectedSurah" @change="getAyat"/>
   <AyahDropdown :selectedSurahId="selectedSurahId" :dropdownHidden="dropdownHidden" @update-information="updateInformation" @update-tafseer="updateTafseer" v-if="ayah != null" />
   <div class="tab-content hide-on-mobile-tablet" id="nav-tabContent" v-if="ayah == null && !dropdownHidden">
    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" v-if="ayah == null">
     <AyahSearchVerseNum :verseNumber="verseNumber" @submit="scrollToAyah" />
     <ErrorAlert :showError="showError" @dismiss-error="dismissError" />
     <hr>
     <NavigationIcons @go-to-first-ayah="goToFirstAyah" @go-to-previous-ayah="goToPreviousAyah" @go-to-next-ayah="goToNextAyah" @go-to-last-ayah="goToLastAyah"/>
     <AyahList :ayat="ayat" :selectedIndexAyah="selectedIndexAyah" :verseNumber="verseNumber" @select-ayah="selectAyah" />
    </div>
   </div>
  </div>

  <div class="col-md-8 pt-2 card-hide">
   <div class="card pt-2" style="box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;">

    <div class="container-fluid" v-if="information != null">
     <NavTabs />
    </div>

    <div class="card-body" id="alertContainer">
     <div class="tab-content text-center">
      <Welcome :information="information" />

      <!-- Translation Section -->
      <div class="tab-pane active" id="home" role="tabpanel" v-if="information != null">
       <div class="icon-container pb-3">
        <!-- Main features -->
        <div class="icon-container w-100 hide-on-mobile pb-3">
         <i class="bi bi-file-earmark-text text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Write a note" @click="openModal('translationNote')" style="color: rgba(0, 191, 166);cursor:pointer">
         </i>
         <TranslationNote ref="translationNote" :information="information.translation" />
         <WhatsAppShareTranslation :translationToShare="information.translation" />
         <TwitterShareTranslation :targetElementRef="'targetElement'" :translationText="information.translation" />
         <BookmarkTranslation :information="information" />
         <i @click="submitForm" class="bi bi-bookmark text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Bookmark verse" style="color: rgba(0, 191, 166);cursor:pointer"></i>
         <CopyTranslationText :textToCopy="information.translation" />
         <ScreenTranslationCapture :targetTranslationRef="'targetTranslationElement'" />
         <i title="Report a bug" data-bs-toggle="modal" data-bs-target="#exampleModal" class="bi bi-bug text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" style="color: rgba(0, 191, 166); cursor: pointer;"></i>
         <i class="bi bi-arrows-fullscreen h4" style="color: rgb(0, 191, 166);cursor:pointer" @click="toggleFullScreen" title="Full screen"></i>
         <i class="bi bi-info-circle h4" style="color: rgb(0, 191, 166);cursor:pointer" data-bs-target="#translationInfo" aria-expanded="false" data-bs-toggle="modal" data-bs-placement="top" title="Surah info"></i>
        </div>
        <!-- Dropdown Features -->
        <div class="dropdown mobile-only">
         <div class=" icon-container">
          <i class="bi bi-chevron-bar-left h5" style="color: rgb(0, 191, 166);" @click="goToFirstAyah()" title="First verse"></i>
          <i class="bi bi-arrow-left-circle h5" style="color: rgb(0, 191, 166);" @click="goToPreviousAyah()" title="Previous verse"></i>
          <i class="bi bi-arrow-right-circle h5" style="color: rgb(0, 191, 166);" @click="goToNextAyah()" title="Next verse"></i>
          <i class="bi bi-chevron-bar-right h5" style="color: rgb(0, 191, 166);" @click="goToLastAyah()" title="End verse"></i>
          <i class="bi bi-arrows-fullscreen h6" style="color: rgb(0, 191, 166);cursor:pointer" @click="toggleFullScreen" title="Full screen"></i>

          <i style="color:rgb(0, 191, 166); cursor:pointer" class="bi bi-three-dots-vertical h5 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
          <ul class="dropdown-menu">
           <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#translationNote"><i class="bi bi-file-earmark-text text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Write a note" style="color: rgba(0, 191, 166);"></i>Write a Note</a></li>
           <li><a class="dropdown-item" @click="shareTextViaWhatsApp3"><i class="bi bi-whatsapp text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Share on Whatsapp" style="color: rgba(0, 191, 166);"></i>Share via WhatsApp</a></li>
           <li><a class="dropdown-item" @click="shareHeadingOnTwitter3"><i style=" color:rgb(0, 191, 166); cursor:pointer" class="mr-2 bi bi-twitter-x text-right h4" aria-expanded="false" data-bs-placement="top" title="Share via X"></i>Share via X</a></li>
           <li><a class="dropdown-item" @click="submitForm"><i class="bi bi-bookmark text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Bookmark verse" style="color: rgba(0, 191, 166);"></i>Bookmark Verse</a></li>
           <li><a class="dropdown-item" @click="copyText3"><i class="bi bi-clipboard-check text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Copy verse" style="color: rgba(0, 191, 166);"></i>Copy Verse</a></li>
           <li><a class="dropdown-item" @click="captureScreenshot3"><i class="bi bi-camera text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Screenshot verse" style="color: rgba(0, 191, 166);"></i>Screenshot Verse</a></li>
           <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#translationInfo"><i class="bi bi-info-circle text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Surah info" style="color: rgba(0, 191, 166);"></i>Surah Info</a></li>
           <li><a class="dropdown-item" data-bs-placement="top" title="Report a bug" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-bug text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Report a bug" style="color: rgba(0, 191, 166);"></i>Report a bug</a></li>
          </ul>

         </div>
        </div>
       </div>

        <TranslationSection
          :information="information"
          :isFullScreen="isFullScreen"
          :expanded="expanded"
          :showMoreLink="showMoreLink"
          :showAlertText="showAlertText"
          :showAlert="showAlert"
          :showErrorAlert="showErrorAlert"
          :showAlertTextNote="showAlertTextNote"
          @toggle-full-screen="toggleFullScreen"
          @handle-touch-start="handleTouchStart"
          @handle-touch-move="handleTouchMove"
          @handle-touch-end="handleTouchEnd"
          @toggle-expand="toggleExpand"
          @close-alert-text="closeAlertText"
        />
       <!-- Surah Info Modal -->
       <SurahInfoModal :information="information" />
      </div>

      <!-- Tafseer Section -->
      <div class="tab-pane" id="profile" role="tabpanel" v-if="information != null">
       <div class="icon-container pb-3">

        <div class="icon-container w-100 hide-on-mobile pb-3">
         <i class="bi bi-file-earmark-text text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Write a note" @click="openModal('tafseerNote')" style="color: rgba(0, 191, 166);cursor:pointer">
         </i>
         <TafseerNote ref="tafseerNote" :information="tafseer" />
         <WhatsAppShareTafseer :tafseerToShare="tafseer" />
         <TwitterShareTafseer :targetElementRef="'targetElement'" :tafseerText="tafseer" />
         <i @click="submitForm" class="bi bi-bookmark text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Bookmark verse" style="color: rgba(0, 191, 166);cursor:pointer"></i>
         <CopyTafseerText :textToCopy="tafseer" />
         <ScreenTafseerCapture :targetTafseerRef="'targetTafseerElement'" />
         <i title="Report a bug" data-bs-toggle="modal" data-bs-target="#exampleModal" class="bi bi-bug text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" style="color: rgba(0, 191, 166); cursor: pointer;"></i>
         <i class="bi bi-arrows-fullscreen h4" style="color: rgb(0, 191, 166);cursor:pointer" @click="toggleFullScreen" title="Full screen"></i>
         <i class="bi bi-info-circle h4" style="color: rgb(0, 191, 166);cursor:pointer" data-bs-target="#tafseerInfo" aria-expanded="false" data-bs-toggle="modal" data-bs-placement="top" title="Surah info"></i>

        </div>

        <!-- Dropdown Features -->
        <div class="dropdown mobile-only">

         <div class="icon-container">
          <i class="bi bi-chevron-bar-left h5" style="color: rgb(0, 191, 166);" @click="goToEndAyah()" title="Last verse"></i>
          <i class="bi bi-arrow-left-circle h5" style="color: rgb(0, 191, 166);" @click="goToPreviousAyah()" title="Previous verse"></i>
          <i class="bi bi-arrow-right-circle h5" style="color: rgb(0, 191, 166);" @click="goToNextAyah()" title="Next verse"></i>
          <i class="bi bi-chevron-bar-right h5" style="color: rgb(0, 191, 166);" @click="goToLastAyah()" title="End verse"></i>
          <i class="bi bi-arrows-fullscreen h6" style="color: rgb(0, 191, 166);" @click="toggleFullScreen" title="Full screen"></i>

          <i style="color:rgb(0, 191, 166); cursor:pointer" class="bi bi-three-dots-vertical h5 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
          <ul class="dropdown-menu">
           <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#tafseerNote"><i class="bi bi-file-earmark-text text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Write a note" style="color: rgba(0, 191, 166);"></i>Write a Note</a></li>
           <li><a class="dropdown-item" @click="shareTextViaWhatsApp1"><i class="bi bi-whatsapp text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Share on Whatsapp" style="color: rgba(0, 191, 166);"></i>Share via WhatsApp</a></li>
           <li><a class="dropdown-item" @click="shareHeadingOnTwitter1"><i style="color:rgb(0, 191, 166); cursor:pointer" class="mr-2 bi bi-twitter-x text-right h4" aria-expanded="false" data-bs-placement="top" title="Share via X"></i>Share via X</a></li>
           <li><a class="dropdown-item" @click="submitForm"><i class="bi bi-bookmark text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Bookmark verse" style="color: rgba(0, 191, 166);"></i>Bookmark Verse</a></li>
           <CopyTafseerText :textToCopy="tafseer" />
           <li><a class="dropdown-item" @click="captureScreenshot1"><i class="bi bi-camera text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Screenshot verse" style="color: rgba(0, 191, 166);"></i>Screenshot Verse</a></li>
           <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#tafseerInfo"><i class="bi bi-info-circle text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Surah info" style="color: rgba(0, 191, 166);"></i>Surah Info</a></li>
           <li><a class="dropdown-item" data-bs-placement="top" title="Report a bug" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-bug text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Report a bug" style="color: rgba(0, 191, 166);"></i>Report a bug</a></li>

          </ul>
         </div>

        </div>
       </div>

       <!-- Main Content to Capture -->
       <div ref="targetTafseerElement" class="w-100 my-element" :class="{'full-screen': isFullScreen}">
        <button v-if="isFullScreen" @click="toggleFullScreen" class="close-button mb-3 text-left btn btn-secondary">Close</button>
        <AyahInfo :information="information" />
        <div @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" class="swipeable-div w-100">
         <!-- main stack top -->
         <div class="btn">
          <h5 class="text-right ayah-translation" name="ayah_text" style="line-height: 1.6em">
           {{ information.ayah.ayah_text }}
          </h5>
         </div>
         <!-- main stack below -->
         <h5 class="text-left ayah-translation" ref="heading1" style="line-height: 1.6em">
          {{ expanded ? tafseer : truncatedText(tafseer) }}
          <template v-if="showMoreLink">
           <a href="#" @click.prevent="toggleExpand">{{ expanded ? 'Show Less' : 'Show More' }}</a>
          </template>
         </h5>
         <h6 class="text-left mt-3"><strong>Tafseer: </strong>Ibn Kathir</h6>
         
         <!-- Include the AlertModal component -->
         <AlertModal :showAlertText="showAlertText" :showAlert="showAlert" :showErrorAlert="showErrorAlert" :showAlertTextNote="showAlertTextNote" @close-alert-text="closeAlertText" />
        </div>
       </div>

       <!-- Features -->
       <div class="text-right ">
        <!-- Surah Info Modal -->
        <SurahInfoModal :information="information.transliteration" />

       </div>

      </div>

      <!-- Transliteration Section -->
      <div class="tab-pane" id="messages" role="tabpanel" v-if="information != null">
       <div class="">
        <div>
         <!-- Ayah Controls -->
         <div class="icon-container pb-3">

          <div class="icon-container w-100 hide-on-mobile pb-3">
           <i class="bi bi-file-earmark-text text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Write a note" @click="openModal('transliterationNote')" style="color: rgba(0, 191, 166);cursor:pointer">
           </i>
           <TransliterationNote ref="transliterationNote" :information="information.transliteration" />
           <WhatsAppShareTransliteration :transliterationToShare="information.transliteration" />
           <TwitterShareTransliteration :targetElementRef="'targetElement'" :transliterationText="information.transliteration" />
           <i @click="submitForm" class="bi bi-bookmark text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Bookmark verse" style="color: rgba(0, 191, 166);cursor:pointer"></i>
           <CopyTransliterationText :textToCopy="information.transliteration" />
           <ScreenTransliterationCapture :targetTransliterationRef="'targetTransliterationElement'" />
           <i title="Report a bug" data-bs-toggle="modal" data-bs-target="#exampleModal" class="bi bi-bug text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" style="color: rgba(0, 191, 166); cursor: pointer;"></i>
           <i class="bi bi-arrows-fullscreen h4" style="color: rgb(0, 191, 166);cursor:pointer" @click="toggleFullScreen" title="Full screen"></i>
           <i class="bi bi-info-circle h4" style="color: rgb(0, 191, 166);cursor:pointer" data-bs-target="#transliterationInfo" aria-expanded="false" data-bs-toggle="modal" data-bs-placement="top" title="Surah info"></i>
          </div>

          <!-- Dropdown Features -->
          <div class="dropdown mobile-only">
           <div class="icon-container">
            <i class="bi bi-chevron-bar-left h5" style="color: rgb(0, 191, 166);" @click="goToEndAyah()" title="Last verse"></i>
            <i class="bi bi-arrow-left-circle h5" style="color: rgb(0, 191, 166);" @click="goToPreviousAyah()" title="Previous verse"></i>
            <i class="bi bi-arrow-right-circle h5" style="color: rgb(0, 191, 166);" @click="goToNextAyah()" title="Next verse"></i>
            <i class="bi bi-chevron-bar-right h5" style="color: rgb(0, 191, 166);" @click="goToLastAyah()" title="End verse"></i>
            <i class="bi bi-arrows-fullscreen h6" style="color: rgb(0, 191, 166);" @click="toggleFullScreen" title="Full screen"></i>
            <i style="color:rgb(0, 191, 166); cursor:pointer" class="bi bi-three-dots-vertical h5 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul class="dropdown-menu">
             <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#transliterationNote"><i class="bi bi-file-earmark-text text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Write a note" style="color: rgba(0, 191, 166);"></i>Write a Note</a></li>
             <li><a class="dropdown-item" @click="shareTextViaWhatsApp2"><i class="bi bi-whatsapp text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Share on Whatsapp" style="color: rgba(0, 191, 166);"></i>Share via WhatsApp</a></li>
             <li><a class="dropdown-item" @click="shareHeadingOnTwitter2"><i style=" color:rgb(0, 191, 166); cursor:pointer" class="bi bi-twitter-x text-right h4 mr-2" aria-expanded="false" data-bs-placement="top" title="Share via X"></i>Share via X</a></li>
             <li><a class="dropdown-item" @click="submitForm"><i class="bi bi-bookmark text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Bookmark verse" style="color: rgba(0, 191, 166);"></i>Bookmark Verse</a></li>
             <li><a class="dropdown-item" @click="copyText2"><i class="bi bi-clipboard-check text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Copy verse" style="color: rgba(0, 191, 166);"></i>Copy Verse</a></li>
             <li><a class="dropdown-item" data-bs-toggle="modal" @click="captureScreenshot2"><i class="bi bi-camera text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Screenshot verse" style="color: rgba(0, 191, 166);"></i>Screenshot Verse</a></li>
             <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#transliterationInfo"><i class="bi bi-info-circle text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Surah info" style="color: rgba(0, 191, 166);"></i>Surah Info</a></li>
             <li><a class="dropdown-item" data-bs-placement="top" title="Report a bug" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-bug text-right mr-2 h4" aria-expanded="false" data-bs-placement="top" title="Report a bug" style="color: rgba(0, 191, 166);"></i>Report a bug</a></li>
            </ul>
           </div>
          </div>
         </div>

         <div ref="targetElement2" class="w-100 my-element " :class="{'full-screen': isFullScreen}">
          <button v-if="isFullScreen" @click="toggleFullScreen" class="close-button mb-3 text-left btn btn-secondary">Close</button>

          <h5 class="mr-2">
           {{ information.ayah.surah.name_en }} {{ information.ayah.surah_id }}: {{ information.ayah.ayah_id }}
          </h5>
          <div @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" class="swipeable-div w-100">
           <!-- main stack top -->
           <div class="btn">
            <h5 class="text-right ayah-translation" name="ayah_text" style="line-height: 1.6em">
             {{ information.ayah.ayah_text }}
            </h5>
           </div>

           <!-- main stack below -->
           <h5 class="text-left ayah-translation" ref="heading2" style="line-height: 1.6em">
            {{ expanded ? information.transliteration : truncatedText(information.transliteration) }}
            <template v-if="showMoreLink">
             <a href="#" @click.prevent="toggleExpand">{{ expanded ? 'Show Less' : 'Show More' }}</a>
            </template>
           </h5>
           <h6 class="text-left mt-3"><strong>Transliteration: </strong>Saheeh International</h6>
          </div>
         </div>
         

         <!-- Include the AlertModal component -->
         <AlertModal :showAlertText="showAlertText" :showAlert="showAlert" :showErrorAlert="showErrorAlert" :showAlertTextNote="showAlertTextNote" @close-alert-text="closeAlertText" />

         <!-- Surah Info Modal -->
         <SurahInfoModal :information="information" />

        </div>
       </div>

      </div>

      <BookmarksAndNotes :information="information" />
      <CorrectionModal />

     </div>

     <!-- Modals -->
     <TranslationNote ref="translationNote" :information="modalInformation" />
     <TafseerNote ref="tafseerNote" :information="modalInformation" />
     <TransliterationNote ref="transliterationNote" :information="modalInformation" />

    </div>
   </div>
  </div>

 </div>
</div>
</template>

<script>
import html2canvas from 'html2canvas';
import CustomSurahSelection from './surah_selection/CustomSurahSelection.vue';
import SearchForm from './search/SearchForm.vue';
import SurahList from './search/SurahList.vue';
import SurahDropdown from './search/SurahDropdown.vue';
import ArrowControls from './arrowControls/ArrowControls.vue';
import BookmarksAndNotes from './bookmark_and_notes_links/BookmarksAndNotes.vue';
import AlertModal from './modals/AlertModal.vue';
import Welcome from './intro/Welcome.vue';
import Title from './intro/Title.vue';
import CorrectionModal from './modals/CorrectionModal.vue';
import Donation from './intro/Donation.vue'
import NavTabs from './tabs/NavTabs.vue';
import AyahInfo from './translation/AyahInfo.vue';
import MainAyah from './translation/MainAyah.vue';
import EnglishTranslation from './translation/EnglishTranslation.vue';
import Translator from './translation/Translator.vue';
import SwipeGestures from './swipe_gestures/SwipeGestures.vue';
import AyahSearchVerseNum from './search/AyahSearchVerseNum.vue';
import ErrorAlert from './search/ErrorAlert.vue';
import AyahDropdown from './search/AyahDropdown.vue';
import CopyTranslationText from './translation/features/copy_text/CopyTranslationText.vue';
import CopyTafseerText from './translation/features/copy_text/CopyTranslationText.vue';
import CopyTransliterationText from './translation/features/copy_text/CopyTransliterationText.vue';
import ScreenTranslationCapture from './translation/features/screen_capture/ScreenTranslationCapture.vue';
import ScreenTafseerCapture from './translation/features/screen_capture/ScreenTafseerCapture.vue';
import ScreenTransliterationCapture from './translation/features/screen_capture/ScreenTransliterationCapture.vue';
import SurahInfoModal from './modals/SurahInfoModal.vue';
import TwitterShareTranslation from './translation/features/twitter/TwitterShareTranslation.vue';
import TwitterShareTafseer from './translation/features/twitter/TwitterShareTafseer.vue';
import TwitterShareTransliteration from './translation/features/twitter/TwitterShareTransliteration.vue';
import WhatsAppShareTranslation from './translation/features/whatsapp/WhatsAppShareTranslation.vue';
import WhatsAppShareTafseer from './translation/features/whatsapp/WhatsAppShareTafseer.vue';
import WhatsAppShareTransliteration from './translation/features/whatsapp/WhatsAppShareTransliteration.vue';
import TranslationNote from './translation/features/notes/TranslationNote.vue';
import TafseerNote from './translation/features/notes/TafseerNote.vue';
import TransliterationNote from './translation/features/notes/TransliterationNote.vue';
import BookmarkTranslation from './translation/features/bookmarking/BookmarkTranslation.vue';
import FilteredSurahList from './search/FilteredSurahList.vue'
import NavigationIcons from './search/NavigationIcons.vue'
import AyahList from './search/AyahList.vue'
import TranslationSection from './TranslationSection.vue'


export default {
 name: 'QuranComponent',
 props: {},
 components: {
  CustomSurahSelection,
  SurahList,
  SurahDropdown,
  ArrowControls,
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
  SwipeGestures,
  AyahSearchVerseNum,
  ErrorAlert,
  AyahDropdown,
  CopyTranslationText,
  CopyTafseerText,
  CopyTransliterationText,
  ScreenTranslationCapture,
  ScreenTafseerCapture,
  ScreenTransliterationCapture,
  SurahInfoModal,
  TwitterShareTranslation,
  TwitterShareTransliteration,
  TwitterShareTafseer,
  WhatsAppShareTranslation,
  WhatsAppShareTafseer,
  WhatsAppShareTransliteration,
  TranslationNote,
  TafseerNote,
  TransliterationNote,
  BookmarkTranslation,
  FilteredSurahList,
  AyahSearchVerseNum,
  NavigationIcons,
  AyahList,
  TranslationSection
 },
 mounted() {
  this.getSurat(); // Call getSurat to populate the surah list
 },
 data() {
  return {
   filteredSurah: [],
   //twitter/whatsapp
   information: {
    translation: '',
    transliteration: '', // Example translated text
   },
   tafseer: '',
   //custom surah collection
   customSuratList: [],
   selectedSurah: 1,
   // track selected id
   selectedSurahId: 0,
   selectedAyahId: 0,
   // initialize empty arrays
   data: [],
   surat: [],
   ayat: [],
   tafseers: [],
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
   expanded: false,
   //swipe gestures
   touchStartX: 0,
   touchEndX: 0,
   touchStartY: 0,
   touchEndY: 0,
   touchStartTime: 0,
   threshold: 50,
   // auth login
   isLoggedIn: false,
   // main search
   showClearButton: false,
   searchTerm: '',
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
   showAlertText: false,
   showAlert: false,
   showErrorAlert: false,
   showAlertTextNote: false,
   maxLength: 400,
   // notes modal
   form1: new Form({
    id: "",
    surah_name: "",
    ayah_num: "",
    ayah_verse_ar: "",
    ayah_verse_en: "",
    ayah_notes: "",
   }),

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
    name_ar: ""
   }),
  };
 },
 methods: {
  openModal(modalRef) {
   const modalComponent = this.$refs[modalRef];
   if (modalComponent && typeof modalComponent.showModal === 'function') {
    modalComponent.showModal();
   } else {
    console.error(`Modal reference '${modalRef}' not found or showModal is not a function.`);
   }
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
    const ayahElement = this.$refs.ayahContainer.querySelector(`#ayah-${verseNumber}`);
    if (ayahElement) {
     ayahElement.scrollIntoView({
      behavior: 'smooth'
     });
    } else {
     console.error('Ayah not found:', verseNumber);
    }
   });
  },

  toggleExpand() {
   this.expanded = !this.expanded;
  },
  getSelectedSurahAyat() {
   if (this.surat[this.surah]) {
    return this.surat[this.surah].ayat;
   }
   return [];
  },
  updateAyah(newIndex) {
   this.selectedIndexAyah = newIndex;
   console.log(`Selected Ayah: ${newIndex}`);
  },

  getSelectedSurahAyat() {
   const surahData = this.surat.find(surah => surah.id === parseInt(this.surah));
   return surahData ? surahData.ayat : [];
  },
  closeAlertText() {
   this.showAlertText = false;
  },
  triggerBookmarkSuccess() {
   this.showAlert = true;
   setTimeout(() => {
    this.showAlert = false;
   }, 3000);
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
  handleTouchStart(event) {
   this.touchStartX = event.changedTouches[0].screenX;
   this.touchStartY = event.changedTouches[0].screenY;
   this.touchStartTime = Date.now();
  },
  handleTouchMove(event) {
   this.touchEndX = event.changedTouches[0].screenX;
   this.touchEndY = event.changedTouches[0].screenY;
  },
  handleTouchEnd() {
   const touchEndTime = Date.now();
   const timeDiff = touchEndTime - this.touchStartTime;
   const deltaX = this.touchEndX - this.touchStartX;
   const deltaY = this.touchEndY - this.touchStartY;

   const minSwipeDistance = 50; // Minimum distance in pixels to be considered a swipe
   const maxTapDistance = 10; // Maximum distance in pixels to be considered a tap
   const maxSwipeDuration = 500; // Maximum duration in ms to be considered a swipe
   const maxTapDuration = 200; // Maximum duration in ms to be considered a tap

   // Check if it's a tap
   if (Math.abs(deltaX) < maxTapDistance && Math.abs(deltaY) < maxTapDistance && timeDiff < maxTapDuration) {
    this.onTap();
   }
   // Check if it's a swipe
   else if (
    Math.abs(deltaX) > minSwipeDistance &&
    timeDiff < maxSwipeDuration &&
    Math.abs(deltaX) > Math.abs(deltaY) // Ensure it's a horizontal swipe
   ) {
    if (deltaX > 0) {
     this.onSwipeRight();
    } else {
     this.onSwipeLeft();
    }
   }
  },
  onSwipeLeft() {
   this.goToPreviousAyah();
   console.log('Swiped left');
  },
  onSwipeRight() {
   this.goToNextAyah();
   console.log('Swiped right');
  },
  goToFirstAyah() {
   this.selectAyah(0);
  },
  goToPreviousAyah() {
   if (this.selectedIndexAyah > 0) {
    this.selectAyah(this.selectedIndexAyah - 1);
   } else {
    this.selectAyah(this.ayat.length - 1);
   }
  },
  goToNextAyah() {
   if (this.selectedIndexAyah < this.ayat.length - 1) {
    this.selectAyah(this.selectedIndexAyah + 1);
   } else {
    this.selectAyah(0);
   }
  },
  goToLastAyah() {
   this.selectAyah(this.ayat.length - 1);
  },
  truncatedText(text) {
   if (!text) return '';
   return text.length > this.maxLength ? text.substring(0, this.maxLength) + '...' : text;
  },
  detectSwipe() {
   const swipeDistance = this.touchStartX - this.touchEndX;
   console.log('Swipe distance:', swipeDistance);
   if (swipeDistance > 50) {
    console.log('Swipe left detected');
    alert('Swipe left detected');
   } else if (swipeDistance < -50) {
    console.log('Swipe right detected');
    alert('Swipe right detected');
   }
  },
  handleNoteClick() {
   if (this.isLoggedIn) {
    this.showAlertTextNote = false;
    $('#exampleModal1').modal('show');
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
    category_id: this.selectedCategory
   };
   axios.post('/submit_category', formData);
  },
  scrollToAyah(verseNumber) {
   const verseNum = parseInt(this.verseNumber);
   if (!isNaN(verseNum) && verseNum >= 1 && verseNum <= this.ayat.length) {
    const ayahElement = this.$refs.ayahList.querySelectorAll("li")[verseNum - 1];
    if (ayahElement) {
     ayahElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
     });
    }
   } else {
    this.showError = true;
    setTimeout(() => {
     this.showError = false;
    }, 5000);
   }
  },


  hideAlertAfterDelay() {
   setTimeout(() => {
    this.showAlert = false;
    this.showAlertText = false;
    this.showErrorAlert = false;
   }, 3000);
  },

  async getSurat() {
   try {
    const response = await axios.get('/get_surat'); // Update the URL to match your backend
    this.surat = response.data;
   } catch (error) {
    console.error('Error fetching surahs:', error);
   }
  },
  async getAyat() {

   if (this.selectedSurahId > 0) {
    try {
     const response = await axios.get('/get_ayat', {
      params: {
       surah_id: this.selectedSurahId
      },
     });
     this.ayat = response.data;
     this.dropdownHidden = false; // Show Ayah dropdown after fetching
    } catch (error) {
     console.error('Error fetching ayat:', error);
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
    const ayahId = selectedAyah.ayah_id;
    try {
     const tafseerResponse = await axios.get(`/tafseer/${ayahId}/fetch`);
     this.tafseer = tafseerResponse.data;

     const infoResponse = await axios.get('/get_informations', {
      params: {
       id: ayahId
      },
     });
     this.information = infoResponse.data;
    } catch (error) {
     console.error('Error fetching information or tafseer:', error);
    }
   }
  },
  showCard() {
   this.isCardVisible = true; // Show the card when button is clicked
  },
  selectAyah(index) {
   this.selectedIndexAyah = index;
   this.scrollToSelectedAyah();
   this.getTafseers(this.ayat[index].id, index);
  },

  scrollToSelectedAyah() {
   this.$nextTick(() => {
    const selectedAyah = this.$refs.ayahList.querySelector('.selected');
    if (selectedAyah) {
     selectedAyah.scrollIntoView({
      behavior: 'smooth'
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
   const currentIndex = this.ayat.findIndex(ayah => ayah.id === this.selectedAyah.id);
   if (currentIndex !== -1 && currentIndex < this.ayat.length - 1) {
    return this.ayat[currentIndex + 1];
   }
   return null;
  },
  determinePreviousAyah() {
   const currentIndex = this.ayat.findIndex(ayah => ayah.id === this.selectedAyah.id);
   if (currentIndex > 0) {
    return this.ayat[currentIndex - 1];
   }
   return null;
  },

  selectSurah() {
   this.ayat = this.fetchAyatForSurah(this.surah); // Replace with actual logic
   this.selectedAyah = this.ayat.length > 0 ? '0' : '0'; // Select the first ayah
  },
  selectSurah(surahId) {
   this.surah = surahId;
   this.searchTerm = '';
   this.filteredSurah = [];
   this.showClearButton = false;
   this.getAyat();

  },

  getTafseers: function (id, index) {
   this.selectedIndexAyah = index;

   axios.get(`/tafseer/${id}/fetch`).then(
    function (response) {
     console.log(response);
     this.selectedAyah = id;
     this.tafseer = response.data;
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
  // Initialize submitted status for each bookmark
  this.ayat.forEach(ayah => {
   const submitted = localStorage.getItem(`bookmarkSubmitted_${ayah.id}`);
   if (submitted) {
    this.$set(this.bookmarkSubmitted, ayah.id, true);
   }
  });
 },

 watch: {
  selectedSurah(newSurah) {
   this.selectedSurahId = newSurah;
   this.getAyat();
  },

  'information.ayah.surah.name_ar': 'updateFileName',
  verseNumber(newVal, oldVal) {
   if (newVal !== oldVal && parseInt(newVal)) {
    this.selectedIndexAyah = parseInt(newVal) - 1;
   }
  },
 }
}
</script>

<style scoped src="./css/styles.css"></style>