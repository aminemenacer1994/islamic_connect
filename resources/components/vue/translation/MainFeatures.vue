<template>
  <div>
    <div class="icon-container w-100 hide-on-mobile pb-3">
      <i
        class="bi bi-file-earmark-text text-right mr-2 h4"
        aria-expanded="false"
        data-bs-placement="top"
        title="Write a note"
        @click="openModal('translationNote')"
        style="color: rgba(0, 191, 166); cursor: pointer"
      ></i>
      <TranslationNote ref="translationNote" :information="information.translation" />
      <WhatsAppShareTranslation :translationToShare="information.translation" />
      <TwitterShareTranslation :targetElementRef="'targetElement'" :translationText="information.translation" />
      <BookmarkTranslation :information="information" />
      <CopyTranslationText :textToCopy="information.translation" />
      <ScreenTranslationCapture :targetTranslationRef="'targetTranslationElement'" />
      <i
        title="Report a bug"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        class="bi bi-bug text-right mr-2 h4"
        aria-expanded="false"
        data-bs-placement="top"
        style="color: rgba(0, 191, 166); cursor: pointer"
      ></i>
      <i
        class="bi bi-arrows-fullscreen h4"
        style="color: rgb(0, 191, 166); cursor: pointer"
        @click="toggleFullScreen"
        title="Full screen"
      ></i>
      <i
        class="bi bi-info-circle h4"
        style="color: rgb(0, 191, 166); cursor: pointer"
        data-bs-target="#translationInfo"
        aria-expanded="false"
        data-bs-toggle="modal"
        data-bs-placement="top"
        title="Surah info"
      ></i>
    </div>
    <div v-if="showAlert" class="alert alert-success">Bookmark saved!</div>
    <div v-if="showErrorAlert" class="alert alert-danger">Error saving bookmark.</div>
  </div>
</template>

<script defer>
import axios from 'axios';

export default {
  name: 'IconContainer',
  props: {
    information: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showAlert: false,
      showErrorAlert: false,
      filteredSurah: [],
      selectedSurah: null,
      selectedAyahId: null,
      surahs: [],
      ayat: [],
      expanded: false,
      touchStartX: 0,
      touchEndX: 0,
      touchStartY: 0,
      touchEndY: 0,
      touchStartTime: 0,
      selectedIndexAyah: 0,
      dropdownHidden: true,
      isCardVisible: false,
      isFullScreen: false,
      showAlertText: false,
      showAlertTextNote: false,
      verseNumber: null,
      searchTerm: '',
      selectedAyah: null,
      bookmarkSubmitted: {}
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
    submitForm() {
      const formData = {
        surah_name: this.information.ayah.surah.name_en,
        ayah_num: this.information.ayah_id,
        ayah_verse_ar: this.information.ayah.ayah_text,
        ayah_verse_en: this.information.translation,
      };

      axios.post('/bookmarks', formData)
        .then(response => {
          console.log(response.data.message);
          localStorage.setItem(`bookmarkSubmitted_${this.information.ayah_id}`, true);
          this.showAlert = true;
          this.hideAlertAfterDelay();
        })
        .catch(error => {
          console.error(error);
          this.showErrorAlert = true;
          this.hideAlertAfterDelay();
        });
    },
    hideAlertAfterDelay() {
      setTimeout(() => {
        this.showAlert = false;
        this.showErrorAlert = false;
      }, 3000);
    },
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    updateInformation(newInformation) {
      this.$emit('update:information', newInformation);
    },
    updateTafseer(newTafseer) {
      this.$emit('update:tafseer', newTafseer);
    },
    updateFilteredSurah(results) {
      this.filteredSurah = results;
    },
    handleClearResults() {
      this.filteredSurah = [];
    },
    handleSelectSurah(surahId) {
      this.selectedSurah = surahId;
      this.filteredSurah = [];
    },
    selectSurahFromResults(surah) {
      this.selectedSurah = surah.id;
      this.filteredSurah = [];
    },
    handleScrollToAyah(verseNumber) {
      this.$nextTick(() => {
        const ayahElement = this.$refs.ayahContainer.querySelector(`#ayah-${verseNumber}`);
        if (ayahElement) {
          ayahElement.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.error('Ayah not found:', verseNumber);
        }
      });
    },
    handleAyahChange(newAyahId) {
      this.selectedAyahId = newAyahId;
    },
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    getSelectedSurahAyat() {
      if (this.surahs[this.surah]) {
        return this.surahs[this.surah].ayat;
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
      const touchDuration = Date.now() - this.touchStartTime;
      const deltaX = this.touchEndX - this.touchStartX;
      const deltaY = this.touchEndY - this.touchStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          this.handleSwipeLeft();
        } else {
          this.handleSwipeRight();
        }
      }
    },
    handleSwipeLeft() {
      console.log('Swiped left');
    },
    handleSwipeRight() {
      console.log('Swiped right');
    },
    async searchSurahs() {
      try {
        const response = await axios.get('api/search/surahs', {
          params: { searchTerm: this.searchTerm }
        });
        this.filteredSurah = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    updateSelectedSurah(surah) {
      this.selectedSurah = surah;
      this.filteredSurah = [];
    },
    updateSelectedAyahId(newSelectedAyahId) {
      this.selectedAyahId = newSelectedAyahId;
    }
  }
};
</script>

<style scoped>
.icon-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-container i {
  margin-right: 10px;
  cursor: pointer;
}

.alert {
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;
  z-index: 1000;
}
</style>
