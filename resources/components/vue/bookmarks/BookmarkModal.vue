<template>
  <teleport to="body">
    <div
      class="modal fade"
      id="bookmarkModal"
      tabindex="-1"
      aria-labelledby="bookmarkModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable bookmark-modal-dialog">
        <div class="modal-content bookmark-modal" :class="{ 'surat-dark-modal': darkTheme }">
          <div class="modal-header">
            <div class="bookmark-header-main">
              <span class="bookmark-header-icon" aria-hidden="true">
                <i class="bi bi-bookmark-star-fill"></i>
              </span>
              <div class="bookmark-header-copy">
                <span class="bookmark-header-kicker">Bookmark flow</span>
                <h5 class="modal-title" id="bookmarkModalLabel">Save this ayah</h5>
                <p class="modal-subtitle">
                  Choose a collection, create one if you need it, then confirm once.
                </p>
                <div class="bookmark-header-meta">
                  <span class="bookmark-meta-chip">
                    <i class="bi bi-folder2-open" aria-hidden="true"></i>
                    {{ folderCount }} collection{{ folderCount === 1 ? "" : "s" }}
                  </span>
                  <span class="bookmark-meta-chip">
                    <i class="bi bi-journal-text" aria-hidden="true"></i>
                    {{ ayahSurahLabel }}
                  </span>
                  <span class="bookmark-meta-chip is-accent">
                    <i class="bi bi-check2-circle" aria-hidden="true"></i>
                    {{ selectedCount }} selected
                  </span>
                </div>
              </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <div v-if="feedback" class="alert bookmark-alert" :class="feedbackClass" role="alert">
              <span class="bookmark-alert-icon" aria-hidden="true">
                <i :class="feedbackIcon"></i>
              </span>
              <span>{{ feedback }}</span>
            </div>

            <div v-if="pendingDelete" class="bookmark-delete-confirm">
              <div class="bookmark-delete-copy">
                <strong>{{ pendingDeleteTitle }}</strong>
                <span>Deleting a collection keeps the ayahs saved in All for later organisation.</span>
              </div>
              <div class="bookmark-delete-actions">
                <button type="button" class="btn btn-cancel" @click="cancelDelete">
                  <i class="bi bi-x-lg" aria-hidden="true"></i>
                  <span>Cancel</span>
                </button>
                <button type="button" class="btn btn-danger btn-delete-confirm" @click="confirmDelete">
                  <i class="bi bi-trash3" aria-hidden="true"></i>
                  <span>Delete</span>
                </button>
              </div>
            </div>

            <div class="bookmark-layout">
              <section class="section-card bookmark-section-main">
                <div class="section-head">
                  <div>
                    <span class="section-step">Step 1</span>
                    <h6>Choose a collection</h6>
                    <p class="section-description">
                      Pick one or more collections. Leave them empty if you only want this ayah saved in All.
                    </p>
                  </div>
                  <div class="section-actions">
                    <button
                      v-if="selectedCount"
                      type="button"
                      class="btn btn-link btn-clear"
                      @click="clearSelection">
                      Clear
                    </button>
                    <button
                      type="button"
                      class="btn btn-create-toggle"
                      :class="{ 'is-active': sectionOpen.create }"
                      @click="toggleCreateSection()">
                      <i class="bi" :class="sectionOpen.create ? 'bi-dash-lg' : 'bi-plus-lg'" aria-hidden="true"></i>
                      <span>{{ sectionOpen.create ? "Close" : "New collection" }}</span>
                    </button>
                  </div>
                </div>

                <div class="bookmark-search-row">
                  <label v-if="folders.length" class="bookmark-search-shell">
                    <span class="visually-hidden">Search collections</span>
                    <i class="bi bi-search" aria-hidden="true"></i>
                    <input
                      v-model.trim="folderSearch"
                      type="search"
                      class="form-control bookmark-search-input"
                      placeholder="Search collections" />
                  </label>
                </div>

                <div v-if="sectionOpen.create" class="bookmark-create-panel">
                  <div class="bookmark-create-grid">
                    <div class="bookmark-create-field bookmark-create-field-name">
                      <span class="bookmark-field-label">Collection name</span>
                      <input
                        ref="newCollectionInput"
                        v-model.trim="newFolder.name"
                        type="text"
                        class="form-control"
                        placeholder="Reflection gems" />
                    </div>
                    <div class="bookmark-create-field">
                      <span class="bookmark-field-label">Icon</span>
                      <div class="icon-presets">
                        <button
                          v-for="preset in iconPresets"
                          :key="preset.icon"
                          type="button"
                          class="icon-preset-btn"
                          :class="{ 'is-active': newFolder.icon === preset.icon }"
                          @click="setIcon(preset.icon)">
                          <i :class="preset.icon"></i>
                        </button>
                      </div>
                    </div>
                    <div class="bookmark-create-field">
                      <span class="bookmark-field-label">Color</span>
                      <div class="color-swatches">
                        <button
                          v-for="color in bootstrapColors"
                          :key="`swatch-${color}`"
                          type="button"
                          class="color-swatch-btn"
                          :class="{ 'is-active': newFolder.color === color }"
                          :style="{ background: `var(--bs-${color})` }"
                          @click="setColor(color)">
                          <span class="visually-hidden">{{ color }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="bookmark-create-actions">
                    <button class="btn btn-create" :disabled="isCreatingFolder" @click="createFolder">
                      <span v-if="isCreatingFolder" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <i v-else class="bi bi-plus-circle" aria-hidden="true"></i>
                      <span>{{ isCreatingFolder ? "Creating..." : "Create collection" }}</span>
                    </button>
                    <button
                      v-if="folders.length"
                      type="button"
                      class="btn btn-cancel"
                      @click="toggleCreateSection(false)">
                      <i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i>
                      <span>Use existing</span>
                    </button>
                  </div>
                </div>

                <div v-if="filteredFolders.length" class="folder-grid">
                  <button
                    v-for="folder in filteredFolders"
                    :key="folder.id"
                    type="button"
                    class="folder-pill"
                    :class="[
                      folder.color ? `pill-${folder.color}` : 'pill-neutral',
                      {
                        'is-selected': selectedFolderIds.includes(folder.id),
                        'is-disabled': folder.is_smart,
                      },
                    ]"
                    :aria-pressed="selectedFolderIds.includes(folder.id) ? 'true' : 'false'"
                    :disabled="folder.is_smart"
                    @click="toggleFolderSelection(folder)">
                    <span class="pill-icon" aria-hidden="true">
                      <i v-if="folder.icon" :class="folder.icon"></i>
                      <i v-else class="bi bi-folder2-open"></i>
                    </span>
                    <span class="pill-copy">
                      <span class="pill-title">{{ folder.name }}</span>
                      <span class="pill-count">{{ folder.ayah_count || 0 }} saved</span>
                    </span>
                    <span class="pill-check" aria-hidden="true">
                      <i class="bi bi-check-lg"></i>
                    </span>
                    <button
                      v-if="!folder.is_smart"
                      type="button"
                      class="pill-delete"
                      @click.stop.prevent="requestDeleteFolder(folder)"
                      :aria-label="`Delete ${folder.name}`">
                      <i class="bi bi-trash3" aria-hidden="true"></i>
                    </button>
                  </button>
                </div>
                <div v-else class="empty-state">
                  <i class="bi bi-folder2-open" aria-hidden="true"></i>
                  <span>{{ emptyCollectionsText }}</span>
                </div>
              </section>

              <aside class="section-card bookmark-section-summary">
                <div class="section-head section-head-summary">
                  <div>
                    <span class="section-step">Step 2</span>
                    <h6>Review and save</h6>
                    <p class="section-description">
                      One tap keeps this ayah ready to reopen from the reader toolbar.
                    </p>
                  </div>
                  <span class="bookmark-status-pill" :class="{ 'is-saved': hasExistingBookmark }">
                    {{ hasExistingBookmark ? "Already saved" : "New bookmark" }}
                  </span>
                </div>

                <div class="bookmark-ayah-preview">
                  <div class="bookmark-ayah-preview-head">
                    <div>
                      <span class="bookmark-ayah-kicker">{{ ayahSurahLabel }}</span>
                      <strong>{{ ayahNumberLabel }}</strong>
                    </div>
                    <span class="bookmark-ayah-preview-badge">
                      <i class="bi bi-stars" aria-hidden="true"></i>
                      Ready
                    </span>
                  </div>
                  <div class="bookmark-ayah-preview-ar" v-html="ayahPreviewArabic"></div>
                  <p v-if="ayahPreviewTranslation" class="bookmark-ayah-preview-en">
                    {{ ayahPreviewTranslation }}
                  </p>
                </div>

                <div class="bookmark-summary-block">
                  <strong class="bookmark-summary-title">Selected collections</strong>
                  <div v-if="selectedFoldersPreview.length" class="bookmark-summary-chips">
                    <span
                      v-for="folder in selectedFoldersPreview"
                      :key="`selected-folder-${folder.id}`"
                      class="bookmark-summary-chip">
                      <i :class="folder.icon || 'bi bi-folder2-open'" aria-hidden="true"></i>
                      <span>{{ folder.name }}</span>
                    </span>
                  </div>
                  <p v-else class="bookmark-summary-note">
                    No collection selected. This ayah will still be saved and stay visible in All.
                  </p>
                </div>

                <div class="bookmark-summary-block">
                  <strong class="bookmark-summary-title">What happens next</strong>
                  <ol class="bookmark-summary-list">
                    <li>We save this ayah to your bookmark list.</li>
                    <li v-if="selectedFoldersPreview.length">
                      The selected collections stay attached for quick filtering.
                    </li>
                    <li v-else>
                      You can organise it later without losing the saved ayah.
                    </li>
                    <li>Use Open bookmarks if you want a larger management view.</li>
                  </ol>
                </div>
              </aside>
            </div>

            <section v-if="showFolderContents" class="section-card bookmark-section-contents">
              <div class="section-head">
                <div>
                  <span class="section-step">Advanced</span>
                  <h6>Collection contents</h6>
                  <p class="section-description">
                    Review saved ayahs inside each collection and move them if needed.
                  </p>
                </div>
              </div>

              <div v-if="folders.length === 0" class="empty-state">
                <i class="bi bi-inboxes" aria-hidden="true"></i>
                <span>No collections to preview yet.</span>
              </div>

              <div v-else class="folder-contents">
                <article
                  v-for="folder in folders"
                  :key="`contents-${folder.id}`"
                  class="folder-content"
                  :class="{ 'is-open': folderExpanded[folder.id] }">
                  <div class="folder-toggle">
                    <button class="folder-toggle-main" type="button" @click="toggleFolderContents(folder)">
                      <span class="folder-toggle-title">
                        <span class="folder-toggle-icon" aria-hidden="true">
                          <i :class="folder.icon || 'bi bi-folder2-open'"></i>
                        </span>
                        <span>
                          <strong>{{ folder.name }}</strong>
                          <small>{{ folder.ayah_count || 0 }} saved</small>
                        </span>
                      </span>
                    </button>
                    <div class="folder-toggle-actions">
                      <button
                        type="button"
                        class="btn btn-cancel btn-folder-action"
                        :disabled="folder.is_smart"
                        @click="requestDeleteFolder(folder)">
                        <i class="bi bi-trash3" aria-hidden="true"></i>
                        <span>Delete</span>
                      </button>
                      <button class="btn btn-folder-toggle" type="button" @click="toggleFolderContents(folder)">
                        <i
                          class="bi"
                          :class="folderExpanded[folder.id] ? 'bi-chevron-up' : 'bi-chevron-down'"
                          aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>

                  <div v-if="folderExpanded[folder.id]" class="folder-items">
                    <div v-if="folderContents[folder.id]?.loading" class="folder-items-empty">
                      Loading saved ayahs...
                    </div>
                    <div v-else-if="!folderContents[folder.id]?.items?.length" class="folder-items-empty">
                      No ayahs saved in this collection yet.
                    </div>
                    <article
                      v-else
                      v-for="item in folderContents[folder.id].items"
                      :key="item.id"
                      class="folder-item">
                      <div class="folder-item-header">
                        <strong>{{ item.surah_name || "Surah" }} · Ayah {{ item.ayah?.ayah_id || item.ayah_number || item.ayah_num }}</strong>
                        <div class="folder-item-actions">
                          <select
                            class="form-select form-select-sm"
                            @change="moveAyahToFolder(item, folder, $event)"
                            :disabled="folder.is_smart">
                            <option value="" disabled selected>Move to...</option>
                            <option
                              v-for="target in moveTargetFolders(folder)"
                              :key="target.id"
                              :value="target.id">
                              {{ target.name }}
                            </option>
                          </select>
                          <button
                            type="button"
                            class="btn btn-cancel btn-folder-action"
                            :disabled="folder.is_smart"
                            @click="removeAyahFromFolder(item, folder)">
                            <i class="bi bi-dash-circle" aria-hidden="true"></i>
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                      <div class="folder-item-ar" v-html="item.ayah_verse_ar || item.ayah?.ayah_text"></div>
                      <p v-if="item.ayah_verse_en" class="folder-item-en mb-0">{{ item.ayah_verse_en }}</p>
                    </article>
                  </div>
                </article>
              </div>
            </section>
          </div>

          <div class="modal-footer">
            <div class="bookmark-footer-copy">
              <strong>{{ footerPrimaryText }}</strong>
              <span>{{ footerSecondaryText }}</span>
            </div>
            <div class="bookmark-footer-actions">
              <a href="/bookmarks" class="btn btn-manage">
                <i class="bi bi-layout-text-sidebar-reverse" aria-hidden="true"></i>
                <span>Open bookmarks</span>
              </a>
              <button type="button" class="btn btn-cancel" data-bs-dismiss="modal">
                <i class="bi bi-x-lg" aria-hidden="true"></i>
                <span>Cancel</span>
              </button>
              <button type="button" class="btn btn-save" :disabled="isSaving" @click="saveBookmark">
                <span v-if="isSaving" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <i v-else class="bi bi-bookmark-check" aria-hidden="true"></i>
                <span>{{ saveButtonText }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import axios from "axios";
import { Modal } from "bootstrap";
import { fetchUserIdFromApi } from "../../utils/bookmarkAuth";

export default {
  name: "BookmarkModal",
  emits: ["saved"],
  props: {
    ayah: {
      type: Object,
      default: null,
    },
    darkTheme: {
      type: Boolean,
      default: false,
    },
    showFolderContents: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      folders: [],
      selectedFolderIds: [],
      currentBookmark: null,
      newFolder: {
        name: "",
        icon: "bi-bookmark",
        color: "primary",
      },
      isSaving: false,
      isCreatingFolder: false,
      feedback: "",
      feedbackVariant: "success",
      feedbackTimer: null,
      feedbackDurationMs: 3800,
      closeTimer: null,
      authRedirectTimer: null,
      bootstrapColors: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"],
      folderExpanded: {},
      folderContents: {},
      sectionOpen: {
        create: false,
      },
      folderSearch: "",
      pendingDelete: null,
      iconPresets: [
        { icon: "bi-bookmark" },
        { icon: "bi-star" },
        { icon: "bi-heart" },
        { icon: "bi-book" },
        { icon: "bi-book-half" },
        { icon: "bi-leaf" },
        { icon: "bi-bank" },
        { icon: "bi-box-fill" },
      ],
    };
  },
  computed: {
    feedbackClass() {
      return this.feedbackVariant === "danger" ? "alert-danger" : "alert-success";
    },
    feedbackIcon() {
      return this.feedbackVariant === "danger" ? "bi bi-exclamation-triangle-fill" : "bi bi-check-circle-fill";
    },
    selectedCount() {
      return this.selectedFolderIds.length;
    },
    folderCount() {
      return this.folders.length;
    },
    filteredFolders() {
      const query = this.folderSearch.trim().toLowerCase();
      const source = query
        ? this.folders.filter((folder) => String(folder?.name || "").toLowerCase().includes(query))
        : [...this.folders];

      return source.sort((a, b) => {
        const aSelected = this.selectedFolderIds.includes(a.id) ? 1 : 0;
        const bSelected = this.selectedFolderIds.includes(b.id) ? 1 : 0;
        if (aSelected !== bSelected) {
          return bSelected - aSelected;
        }
        const aCount = Number(a?.ayah_count || 0);
        const bCount = Number(b?.ayah_count || 0);
        if (aCount !== bCount) {
          return bCount - aCount;
        }
        return String(a?.name || "").localeCompare(String(b?.name || ""));
      });
    },
    selectedFoldersPreview() {
      return this.selectedFolderIds
        .map((id) => this.folders.find((folder) => folder.id === id))
        .filter(Boolean);
    },
    hasExistingBookmark() {
      return !!this.currentBookmark?.id;
    },
    ayahSurahLabel() {
      return String(
        this.ayah?.surah_name ||
          this.ayah?.surah?.name_en ||
          this.currentBookmark?.surah_name ||
          "Selected ayah"
      ).trim();
    },
    ayahNumberLabel() {
      const ayahNumber = Number(
        this.ayah?.ayah_number ||
          this.ayah?.ayah_num ||
          this.currentBookmark?.ayah_number ||
          this.currentBookmark?.ayah_num ||
          0
      );
      return ayahNumber ? `Ayah ${ayahNumber}` : "Ayah";
    },
    ayahPreviewArabic() {
      return (
        this.ayah?.ayah_verse_ar ||
        this.ayah?.ayah?.ayah_text ||
        this.currentBookmark?.ayah_verse_ar ||
        "Arabic text will appear here."
      );
    },
    ayahPreviewTranslation() {
      return String(
        this.ayah?.ayah_verse_en ||
          this.ayah?.translation ||
          this.currentBookmark?.ayah_verse_en ||
          ""
      ).trim();
    },
    pendingDeleteTitle() {
      return this.pendingDelete?.name
        ? `Delete “${this.pendingDelete.name}”?`
        : "Delete this collection?";
    },
    emptyCollectionsText() {
      if (this.folders.length) {
        return "No collections match your search. Try another name or create a new one.";
      }
      return "No collections yet. Create one above, or save now and organise it later from All.";
    },
    footerPrimaryText() {
      if (this.selectedCount > 0) {
        return this.hasExistingBookmark
          ? "Update this bookmark's collection placement."
          : "Save this ayah into the selected collections.";
      }
      return this.hasExistingBookmark
        ? "Keep this bookmark saved without any collection."
        : "Save this ayah directly into All.";
    },
    footerSecondaryText() {
      if (this.selectedCount > 0) {
        return `${this.selectedCount} collection${this.selectedCount === 1 ? "" : "s"} selected.`;
      }
      return "You can sort it into collections later without losing the bookmark.";
    },
    saveButtonText() {
      if (this.isSaving) {
        return "Saving...";
      }
      if (!this.selectedCount) {
        return this.hasExistingBookmark ? "Update bookmark" : "Save to All";
      }
      if (this.selectedCount === 1) {
        return `Save to ${this.selectedFoldersPreview[0]?.name || "collection"}`;
      }
      return `Save to ${this.selectedCount} collections`;
    },
  },
  mounted() {
    const modalEl = document.getElementById("bookmarkModal");
    if (modalEl) {
      this.cleanupModalState();
      modalEl.addEventListener("show.bs.modal", this.onShow);
      modalEl.addEventListener("hidden.bs.modal", this.onHidden);
    }
  },
  beforeUnmount() {
    const modalEl = document.getElementById("bookmarkModal");
    if (modalEl) {
      modalEl.removeEventListener("show.bs.modal", this.onShow);
      modalEl.removeEventListener("hidden.bs.modal", this.onHidden);
      const instance = Modal.getInstance(modalEl);
      if (instance) instance.dispose();
    }
    clearTimeout(this.feedbackTimer);
    clearTimeout(this.closeTimer);
    clearTimeout(this.authRedirectTimer);
    this.cleanupModalState();
  },
  methods: {
    async onShow() {
      this.feedback = "";
      this.pendingDelete = null;
      this.folderSearch = "";
      this.selectedFolderIds = [];
      this.currentBookmark = null;
      this.sectionOpen.create = false;
      this.resetCreateForm();

      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;

      await this.fetchFolders();
      await this.fetchCurrentBookmark();

      if (!this.folders.length) {
        this.toggleCreateSection(true);
      }
    },
    onHidden() {
      clearTimeout(this.feedbackTimer);
      clearTimeout(this.closeTimer);
      clearTimeout(this.authRedirectTimer);
      this.cleanupModalState();
    },
    async ensureAuthenticated() {
      const userId = await fetchUserIdFromApi();
      if (userId) {
        return true;
      }
      this.setFeedback("Please log in to save bookmarks. Redirecting...", "danger");
      clearTimeout(this.authRedirectTimer);
      this.authRedirectTimer = setTimeout(() => {
        const redirect = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        window.location.href = `/login?redirect=${encodeURIComponent(redirect)}`;
      }, 1500);
      return false;
    },
    cleanupModalState() {
      const backdrops = Array.from(document.querySelectorAll(".modal-backdrop"));
      if (backdrops.length > 1) {
        backdrops.slice(0, -1).forEach((backdrop) => backdrop.parentNode?.removeChild?.(backdrop));
      }
      if (!document.querySelector(".modal.show")) {
        document.body.classList.remove("modal-open");
        document.body.style.removeProperty("padding-right");
      }
    },
    async fetchFolders() {
      try {
        const response = await axios.get("/api/folders");
        this.folders = Array.isArray(response.data?.data) ? response.data.data : [];
        this.normalizeSelectedFolders();
      } catch (_) {
        this.setFeedback("Unable to load collections right now.", "danger");
      }
    },
    async fetchCurrentBookmark() {
      const surahNumber = Number(this.ayah?.surah_number || this.ayah?.surah_id);
      const ayahNumber = Number(this.ayah?.ayah_number || this.ayah?.ayah_num);
      if (!this.ayah || !surahNumber || !ayahNumber) {
        return;
      }
      try {
        const response = await axios.get("/api/ayah-bookmarks", {
          params: {
            surah_number: surahNumber,
            ayah_number: ayahNumber,
          },
        });
        const bookmark = Array.isArray(response.data?.data) ? response.data.data[0] : null;
        this.currentBookmark = bookmark || null;
        if (bookmark?.folders) {
          this.selectedFolderIds = bookmark.folders.map((folder) => folder.id);
        }
        this.normalizeSelectedFolders();
      } catch (_) {
        this.currentBookmark = null;
      }
    },
    normalizeSelectedFolders() {
      if (!this.folders.length) return;
      const allowedIds = new Set(
        this.folders.filter((folder) => !folder.is_smart).map((folder) => folder.id)
      );
      this.selectedFolderIds = this.selectedFolderIds.filter((id) => allowedIds.has(id));
    },
    resetCreateForm() {
      this.newFolder = {
        name: "",
        icon: "bi-bookmark",
        color: "primary",
      };
    },
    toggleCreateSection(forceState = null) {
      this.sectionOpen.create =
        typeof forceState === "boolean" ? forceState : !this.sectionOpen.create;
      if (!this.sectionOpen.create) {
        this.resetCreateForm();
        return;
      }
      this.$nextTick(() => {
        this.$refs.newCollectionInput?.focus?.();
      });
    },
    toggleFolderSelection(folder) {
      if (!folder || folder.is_smart) {
        this.setFeedback("Smart folders cannot be edited manually.", "danger");
        return;
      }
      if (this.selectedFolderIds.includes(folder.id)) {
        this.selectedFolderIds = this.selectedFolderIds.filter((id) => id !== folder.id);
        return;
      }
      this.selectedFolderIds = [...this.selectedFolderIds, folder.id];
    },
    async createFolder() {
      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;

      const name = String(this.newFolder.name || "").trim();
      if (!name) {
        this.setFeedback("Collection name is required.", "danger");
        return;
      }

      const duplicate = this.folders.some(
        (folder) => String(folder?.name || "").trim().toLowerCase() === name.toLowerCase()
      );
      if (duplicate) {
        this.setFeedback("That collection already exists. Choose another name.", "danger");
        return;
      }

      this.isCreatingFolder = true;
      try {
        const response = await axios.post("/api/folders", {
          name,
          icon: this.newFolder.icon || null,
          color: this.newFolder.color || null,
        });
        const folder = response.data?.folder;
        if (folder) {
          this.folders = [
            {
              ...folder,
              ayah_count: 0,
            },
            ...this.folders,
          ];
          if (!this.selectedFolderIds.includes(folder.id)) {
            this.selectedFolderIds = [...this.selectedFolderIds, folder.id];
          }
          this.folderExpanded = {
            ...this.folderExpanded,
            [folder.id]: true,
          };
          this.folderContents = {
            ...this.folderContents,
            [folder.id]: { loading: false, items: [] },
          };
          this.toggleCreateSection(false);
          this.setFeedback("Collection created and selected.", "success");
        }
      } catch (error) {
        const apiMessage = error.response?.data?.message || error.response?.data?.errors?.name?.[0];
        this.setFeedback(apiMessage || "Failed to create collection.", "danger");
      } finally {
        this.isCreatingFolder = false;
      }
    },
    async saveBookmark() {
      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;

      const surahNumber = Number(this.ayah?.surah_number || this.ayah?.surah_id);
      const ayahNumber = Number(this.ayah?.ayah_number || this.ayah?.ayah_num);
      if (!this.ayah || !surahNumber || !ayahNumber) {
        this.setFeedback("Select an ayah first.", "danger");
        return;
      }

      this.isSaving = true;
      try {
        this.normalizeSelectedFolders();
        const selectedIds = Array.from(new Set(this.selectedFolderIds));
        const existingIds = this.currentBookmark?.folders?.map((folder) => folder.id) || [];
        const removableIds = existingIds.filter((id) => !selectedIds.includes(id));
        const addIds = selectedIds.filter((id) => !existingIds.includes(id));

        const payload = {
          surah_number: surahNumber,
          ayah_number: ayahNumber,
          surah_name: this.ayah.surah_name || this.ayah.surah?.name_en || "Surah",
          ayah_verse_ar: this.ayah.ayah_verse_ar || this.ayah.ayah?.ayah_text || "",
          ayah_verse_en: this.ayah.ayah_verse_en || this.ayah.translation || "",
          folder_ids: selectedIds,
        };

        const response = await axios.post("/api/ayah-bookmarks", payload);
        const bookmark = response.data?.bookmark || null;
        if (bookmark) {
          this.currentBookmark = bookmark;
        }

        let detachFailed = false;
        if (removableIds.length && this.currentBookmark?.id) {
          try {
            await Promise.all(
              removableIds.map((id) =>
                axios.delete(`/api/ayah-bookmarks/${this.currentBookmark.id}/folders/${id}`)
              )
            );
            removableIds.forEach((id) => {
              const folder = this.folders.find((item) => item.id === id);
              if (folder && folder.ayah_count > 0) {
                folder.ayah_count -= 1;
              }
            });
          } catch (_) {
            detachFailed = true;
          }
        }

        addIds.forEach((id) => {
          const folder = this.folders.find((item) => item.id === id);
          if (folder) {
            folder.ayah_count = Number(folder.ayah_count || 0) + 1;
          }
        });

        await this.fetchCurrentBookmark();

        const successMessage = selectedIds.length
          ? "Ayah saved to your selected collections."
          : "Ayah saved. It is available in All.";

        this.setFeedback(
          detachFailed
            ? "Bookmark updated, but some collection removals failed."
            : successMessage,
          "success",
          { autoClose: true }
        );

        this.$emit("saved", { ...payload, bookmark: this.currentBookmark });
      } catch (error) {
        const fallback = "Failed to save the bookmark.";
        const msg = error.response?.data?.message || fallback;
        this.setFeedback(msg, "danger");
      } finally {
        this.isSaving = false;
      }
    },
    setFeedback(message, variant, options = {}) {
      this.feedback = message;
      this.feedbackVariant = variant;
      clearTimeout(this.feedbackTimer);
      this.feedbackTimer = setTimeout(() => {
        this.feedback = "";
      }, this.feedbackDurationMs);
      if (options.autoClose) {
        clearTimeout(this.closeTimer);
        this.closeTimer = setTimeout(() => {
          this.hideModal();
        }, this.feedbackDurationMs);
      }
    },
    clearSelection() {
      this.selectedFolderIds = [];
    },
    requestDeleteFolder(folder) {
      if (!folder || folder.is_smart) {
        this.setFeedback("Smart folders cannot be deleted.", "danger");
        return;
      }
      this.pendingDelete = {
        ids: [folder.id],
        name: folder.name,
      };
    },
    async confirmDelete() {
      const ids = this.pendingDelete?.ids || [];
      if (!ids.length) {
        this.pendingDelete = null;
        return;
      }

      try {
        await Promise.all(ids.map((id) => axios.delete(`/api/folders/${id}`)));
        this.folders = this.folders.filter((folder) => !ids.includes(folder.id));
        this.selectedFolderIds = this.selectedFolderIds.filter((id) => !ids.includes(id));
        ids.forEach((id) => {
          const expanded = { ...this.folderExpanded };
          delete expanded[id];
          this.folderExpanded = expanded;
          const contents = { ...this.folderContents };
          delete contents[id];
          this.folderContents = contents;
        });
        this.pendingDelete = null;
        await this.fetchCurrentBookmark();
        this.setFeedback("Collection deleted. Saved ayahs stayed available in All.", "success");
      } catch (_) {
        this.setFeedback("Unable to delete this collection right now.", "danger");
      }
    },
    cancelDelete() {
      this.pendingDelete = null;
    },
    hideModal() {
      this.$nextTick(() => {
        const modalEl = document.getElementById("bookmarkModal");
        if (!modalEl) return;
        const instance = Modal.getInstance(modalEl) || new Modal(modalEl);
        instance.hide();
      });
    },
    async toggleFolderContents(folder) {
      const isOpen = !!this.folderExpanded[folder.id];
      this.folderExpanded = {
        ...this.folderExpanded,
        [folder.id]: !isOpen,
      };
      if (isOpen || this.folderContents[folder.id]?.items) {
        return;
      }

      this.folderContents = {
        ...this.folderContents,
        [folder.id]: { loading: true, items: [] },
      };

      try {
        const response = await axios.get("/api/ayah-bookmarks", {
          params: { folder_id: folder.id },
        });
        this.folderContents = {
          ...this.folderContents,
          [folder.id]: {
            loading: false,
            items: Array.isArray(response.data?.data) ? response.data.data : [],
          },
        };
      } catch (_) {
        this.folderContents = {
          ...this.folderContents,
          [folder.id]: { loading: false, items: [] },
        };
      }
    },
    async removeAyahFromFolder(bookmark, folder) {
      if (!bookmark?.id || folder?.is_smart) return;

      try {
        await axios.delete(`/api/ayah-bookmarks/${bookmark.id}/folders/${folder.id}`);
        const items = this.folderContents[folder.id]?.items || [];
        this.folderContents = {
          ...this.folderContents,
          [folder.id]: {
            loading: false,
            items: items.filter((item) => item.id !== bookmark.id),
          },
        };
        if (folder.ayah_count > 0) {
          folder.ayah_count -= 1;
        }
        if (this.currentBookmark?.id === bookmark.id) {
          this.selectedFolderIds = this.selectedFolderIds.filter((id) => id !== folder.id);
        }
        this.setFeedback("Ayah removed from the collection.", "success");
      } catch (_) {
        this.setFeedback("Unable to remove this ayah.", "danger");
      }
    },
    moveTargetFolders(folder) {
      return this.folders.filter((target) => !target.is_smart && target.id !== folder.id);
    },
    async moveAyahToFolder(bookmark, fromFolder, event) {
      const targetId = Number(event?.target?.value);
      if (!bookmark?.id || !targetId || fromFolder?.is_smart) return;

      try {
        await axios.post(`/api/ayah-bookmarks/${bookmark.id}/folders`, {
          folder_ids: [targetId],
        });
        await axios.delete(`/api/ayah-bookmarks/${bookmark.id}/folders/${fromFolder.id}`);

        const fromItems = this.folderContents[fromFolder.id]?.items || [];
        this.folderContents = {
          ...this.folderContents,
          [fromFolder.id]: {
            loading: false,
            items: fromItems.filter((item) => item.id !== bookmark.id),
          },
        };

        const targetFolder = this.folders.find((folder) => folder.id === targetId);
        if (targetFolder) {
          targetFolder.ayah_count = Number(targetFolder.ayah_count || 0) + 1;
          if (fromFolder.ayah_count > 0) {
            fromFolder.ayah_count -= 1;
          }
          if (this.folderContents[targetId]?.items) {
            this.folderContents = {
              ...this.folderContents,
              [targetId]: {
                loading: false,
                items: [bookmark, ...this.folderContents[targetId].items],
              },
            };
          }
        }

        if (event?.target) {
          event.target.value = "";
        }
        this.setFeedback("Ayah moved to another collection.", "success");
      } catch (_) {
        this.setFeedback("Unable to move this ayah.", "danger");
      }
    },
    setIcon(icon) {
      this.newFolder.icon = icon;
    },
    setColor(color) {
      this.newFolder.color = color;
    },
  },
};
</script>

<style scoped>
.bookmark-modal {
  --bookmark-accent: #0f766e;
  --bookmark-accent-strong: #115e59;
  --bookmark-accent-soft: rgba(15, 118, 110, 0.12);
  --bookmark-danger-soft: rgba(239, 68, 68, 0.12);
  --bookmark-ink: #0f172a;
  --bookmark-muted: #64748b;
  --bookmark-border: rgba(15, 23, 42, 0.1);
  --bookmark-surface: rgba(255, 255, 255, 0.98);
  --bookmark-surface-alt: rgba(248, 250, 252, 0.96);
  --bookmark-card: rgba(255, 255, 255, 0.92);
  --bookmark-toolbar: rgba(248, 250, 252, 0.9);
  --bookmark-shadow: 0 28px 70px rgba(15, 23, 42, 0.18);
  position: relative;
  border-radius: 28px;
  border: 1px solid var(--bookmark-border);
  background:
    radial-gradient(circle at top right, rgba(20, 184, 166, 0.14), transparent 30%),
    linear-gradient(180deg, var(--bookmark-surface), var(--bookmark-surface-alt));
  color: var(--bookmark-ink);
  box-shadow: var(--bookmark-shadow);
  overflow: hidden;
  font-family: "Manrope", "Plus Jakarta Sans", "Poppins", sans-serif;
}

.bookmark-modal-dialog {
  max-width: min(1080px, calc(100vw - 1.25rem));
}

.bookmark-modal .modal-header,
.bookmark-modal .modal-body,
.bookmark-modal .modal-footer {
  padding-left: 1.35rem;
  padding-right: 1.35rem;
}

.bookmark-modal .modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--bookmark-border);
  background: linear-gradient(180deg, rgba(15, 118, 110, 0.07), rgba(255, 255, 255, 0));
}

.bookmark-header-main {
  display: flex;
  align-items: flex-start;
  gap: 0.95rem;
  min-width: 0;
}

.bookmark-header-icon,
.bookmark-meta-chip,
.section-step,
.bookmark-ayah-preview-badge,
.bookmark-summary-chip,
.pill-icon,
.bookmark-alert-icon,
.folder-toggle-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.bookmark-header-icon {
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(15, 118, 110, 0.16), rgba(245, 158, 11, 0.14));
  color: var(--bookmark-accent);
  font-size: 1.15rem;
  flex-shrink: 0;
}

.bookmark-header-copy {
  min-width: 0;
}

.bookmark-header-kicker {
  display: inline-flex;
  margin-bottom: 0.32rem;
  padding: 0.16rem 0.52rem;
  border-radius: 999px;
  background: var(--bookmark-accent-soft);
  color: var(--bookmark-accent);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.bookmark-modal .modal-title {
  margin-bottom: 0.28rem;
  font-size: 1.48rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.bookmark-modal .modal-subtitle {
  margin: 0;
  color: var(--bookmark-muted);
  font-size: 0.92rem;
  line-height: 1.55;
}

.bookmark-header-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.72rem;
}

.bookmark-meta-chip,
.section-step,
.bookmark-ayah-preview-badge,
.bookmark-summary-chip {
  gap: 0.38rem;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 700;
}

.bookmark-meta-chip {
  padding: 0.34rem 0.62rem;
  border: 1px solid var(--bookmark-border);
  background: var(--bookmark-card);
  color: var(--bookmark-ink);
}

.bookmark-meta-chip.is-accent,
.section-step,
.bookmark-summary-chip {
  background: var(--bookmark-accent-soft);
  color: var(--bookmark-accent-strong);
  border: 1px solid rgba(15, 118, 110, 0.14);
}

.bookmark-modal .modal-body {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.bookmark-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(18rem, 0.9fr);
  gap: 1rem;
}

.section-card {
  border-radius: 22px;
  border: 1px solid var(--bookmark-border);
  background: var(--bookmark-card);
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08);
  padding: 1rem;
}

.section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.85rem;
  margin-bottom: 0.9rem;
}

.section-head h6 {
  margin: 0.22rem 0 0.16rem;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.section-head-summary {
  align-items: center;
}

.section-step {
  padding: 0.28rem 0.54rem;
}

.section-description {
  margin: 0;
  color: var(--bookmark-muted);
  font-size: 0.84rem;
  line-height: 1.55;
}

.section-actions,
.bookmark-search-row,
.bookmark-create-actions,
.bookmark-delete-actions,
.bookmark-footer-actions,
.folder-toggle-actions,
.folder-item-actions {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.btn-clear {
  padding: 0;
  color: var(--bookmark-accent);
  font-weight: 800;
  text-decoration: none;
}

.btn-clear:hover {
  color: var(--bookmark-accent-strong);
}

.btn-create-toggle,
.btn-manage,
.btn-cancel,
.btn-save,
.btn-create,
.btn-folder-toggle,
.btn-folder-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.48rem;
  border-radius: 999px;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.btn-create-toggle,
.btn-manage,
.btn-cancel,
.btn-folder-toggle,
.btn-folder-action {
  border: 1px solid var(--bookmark-border);
  background: var(--bookmark-toolbar);
  color: var(--bookmark-ink);
}

.btn-create-toggle {
  padding: 0.48rem 0.76rem;
  font-size: 0.8rem;
  font-weight: 700;
}

.btn-create-toggle.is-active {
  border-color: rgba(15, 118, 110, 0.28);
  background: var(--bookmark-accent-soft);
  color: var(--bookmark-accent-strong);
}

.btn-manage,
.btn-cancel,
.btn-save {
  padding: 0.64rem 0.92rem;
  font-weight: 700;
  text-decoration: none;
}

.btn-create {
  padding: 0.62rem 0.92rem;
  font-weight: 700;
}

.btn-create,
.btn-save {
  border: 0;
  background: linear-gradient(135deg, #0f766e, #115e59 72%);
  color: #fff;
  box-shadow: 0 14px 28px rgba(15, 118, 110, 0.24);
}

.btn-create:hover,
.btn-save:hover,
.btn-create-toggle:hover,
.btn-manage:hover,
.btn-cancel:hover,
.btn-folder-toggle:hover,
.btn-folder-action:hover,
.folder-pill:hover,
.folder-pill:focus-visible {
  transform: translateY(-1px);
}

.btn-create:disabled,
.btn-save:disabled {
  opacity: 0.72;
  box-shadow: none;
  transform: none;
}

.bookmark-search-shell {
  position: relative;
  flex: 1 1 auto;
}

.bookmark-search-shell i {
  position: absolute;
  top: 50%;
  left: 0.85rem;
  transform: translateY(-50%);
  color: var(--bookmark-muted);
}

.bookmark-search-input {
  padding-left: 2.45rem;
}

.bookmark-create-panel {
  margin-bottom: 0.95rem;
  padding: 0.95rem;
  border-radius: 20px;
  border: 1px solid var(--bookmark-border);
  background: linear-gradient(180deg, rgba(15, 118, 110, 0.05), rgba(255, 255, 255, 0));
}

.bookmark-create-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
}

.bookmark-create-field {
  min-width: 0;
}

.bookmark-field-label,
.bookmark-summary-title,
.bookmark-ayah-kicker {
  display: block;
  margin-bottom: 0.45rem;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.bookmark-field-label,
.bookmark-ayah-kicker {
  color: var(--bookmark-muted);
}

.icon-presets,
.color-swatches,
.bookmark-summary-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.icon-preset-btn,
.color-swatch-btn,
.pill-delete {
  border: 1px solid var(--bookmark-border);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.icon-preset-btn {
  width: 2.45rem;
  height: 2.45rem;
  border-radius: 14px;
  background: var(--bookmark-toolbar);
  color: var(--bookmark-accent);
}

.icon-preset-btn.is-active {
  border-color: rgba(15, 118, 110, 0.28);
  background: var(--bookmark-accent-soft);
  color: var(--bookmark-accent-strong);
}

.color-swatch-btn {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 999px;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.9);
}

.color-swatch-btn.is-active {
  box-shadow: 0 0 0 2px rgba(15, 118, 110, 0.24);
}

.folder-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.folder-pill {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.75rem;
  align-items: center;
  padding: 0.88rem 3rem 0.88rem 0.9rem;
  border-radius: 18px;
  border: 1px solid var(--bookmark-border);
  border-left: 4px solid var(--pill-accent, rgba(148, 163, 184, 0.44));
  background: var(--pill-bg, rgba(248, 250, 252, 0.8));
  text-align: left;
  color: var(--bookmark-ink);
}

.folder-pill.is-selected {
  border-color: rgba(15, 118, 110, 0.34);
  box-shadow: 0 14px 26px rgba(15, 118, 110, 0.12);
}

.folder-pill.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.pill-neutral {
  --pill-accent: rgba(148, 163, 184, 0.52);
  --pill-bg: rgba(248, 250, 252, 0.82);
}

.pill-primary {
  --pill-accent: var(--bs-primary);
  --pill-bg: rgba(13, 110, 253, 0.08);
}

.pill-secondary {
  --pill-accent: var(--bs-secondary);
  --pill-bg: rgba(108, 117, 125, 0.08);
}

.pill-success {
  --pill-accent: var(--bs-success);
  --pill-bg: rgba(25, 135, 84, 0.08);
}

.pill-danger {
  --pill-accent: var(--bs-danger);
  --pill-bg: rgba(220, 53, 69, 0.08);
}

.pill-warning {
  --pill-accent: var(--bs-warning);
  --pill-bg: rgba(255, 193, 7, 0.14);
}

.pill-info {
  --pill-accent: var(--bs-info);
  --pill-bg: rgba(13, 202, 240, 0.12);
}

.pill-light {
  --pill-accent: rgba(148, 163, 184, 0.52);
  --pill-bg: rgba(248, 250, 252, 0.82);
}

.pill-dark {
  --pill-accent: var(--bs-dark);
  --pill-bg: rgba(33, 37, 41, 0.08);
}

.pill-icon {
  width: 2.55rem;
  height: 2.55rem;
  border-radius: 16px;
  background: rgba(15, 118, 110, 0.12);
  color: var(--bookmark-accent);
  font-size: 1rem;
}

.pill-copy {
  min-width: 0;
}

.pill-title,
.pill-count {
  display: block;
}

.pill-title {
  font-size: 0.92rem;
  font-weight: 800;
  line-height: 1.3;
}

.pill-count {
  margin-top: 0.15rem;
  font-size: 0.76rem;
  color: var(--bookmark-muted);
}

.pill-check {
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.12);
  color: var(--bookmark-accent);
  opacity: 0;
  transform: scale(0.92);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.folder-pill.is-selected .pill-check {
  opacity: 1;
  transform: scale(1);
}

.pill-delete {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 999px;
  background: transparent;
  color: var(--bookmark-muted);
}

.pill-delete:hover {
  background: var(--bookmark-danger-soft);
  color: #b91c1c;
}

.bookmark-section-summary {
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
}

.bookmark-status-pill,
.bookmark-ayah-preview-badge {
  padding: 0.34rem 0.62rem;
  border-radius: 999px;
  border: 1px solid var(--bookmark-border);
  background: var(--bookmark-toolbar);
  color: var(--bookmark-muted);
  font-size: 0.74rem;
  font-weight: 800;
}

.bookmark-status-pill.is-saved {
  background: var(--bookmark-accent-soft);
  color: var(--bookmark-accent-strong);
  border-color: rgba(15, 118, 110, 0.14);
}

.bookmark-ayah-preview {
  padding: 0.95rem;
  border-radius: 20px;
  border: 1px solid var(--bookmark-border);
  background: linear-gradient(180deg, rgba(15, 118, 110, 0.05), rgba(255, 255, 255, 0));
}

.bookmark-ayah-preview-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.7rem;
}

.bookmark-ayah-preview-head strong {
  display: block;
  font-size: 1rem;
  font-weight: 800;
}

.bookmark-ayah-preview-ar {
  direction: rtl;
  text-align: right;
  font-size: 1.52rem;
  line-height: 1.9;
  color: var(--bookmark-ink);
  font-family: "Amiri", "Noto Naskh Arabic", serif;
}

.bookmark-ayah-preview-en {
  margin: 0.7rem 0 0;
  color: var(--bookmark-muted);
  line-height: 1.6;
  font-size: 0.9rem;
}

.bookmark-summary-block + .bookmark-summary-block {
  padding-top: 0.1rem;
}

.bookmark-summary-note,
.bookmark-summary-list {
  margin: 0;
  color: var(--bookmark-muted);
  font-size: 0.84rem;
  line-height: 1.6;
}

.bookmark-summary-list {
  padding-left: 1.15rem;
}

.bookmark-summary-list li + li {
  margin-top: 0.34rem;
}

.bookmark-alert,
.bookmark-delete-confirm,
.empty-state,
.folder-content,
.folder-item {
  border-radius: 18px;
  border: 1px solid var(--bookmark-border);
}

.bookmark-alert {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.95rem;
  background: var(--bookmark-card);
  font-weight: 700;
}

.bookmark-alert.alert-success {
  background: rgba(15, 118, 110, 0.12);
  color: var(--bookmark-accent-strong);
}

.bookmark-alert.alert-danger {
  background: rgba(220, 38, 38, 0.12);
  color: #991b1b;
}

.bookmark-alert-icon {
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.38);
}

.bookmark-delete-confirm {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  margin-bottom: 0.95rem;
  padding: 0.9rem 1rem;
  background: var(--bookmark-danger-soft);
}

.bookmark-delete-copy {
  display: flex;
  flex-direction: column;
  gap: 0.16rem;
}

.bookmark-delete-copy strong {
  color: #991b1b;
}

.bookmark-delete-copy span {
  color: #7f1d1d;
  font-size: 0.82rem;
}

.btn-delete-confirm {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border-radius: 999px;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 1rem;
  background: var(--bookmark-toolbar);
  color: var(--bookmark-muted);
  text-align: center;
}

.bookmark-section-contents {
  margin-top: 1rem;
}

.folder-contents {
  display: grid;
  gap: 0.75rem;
}

.folder-content {
  background: var(--bookmark-card);
  padding: 0.88rem;
}

.folder-content.is-open {
  border-color: rgba(15, 118, 110, 0.28);
}

.folder-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.folder-toggle-main {
  flex: 1 1 auto;
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
}

.folder-toggle-title {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.folder-toggle-title strong,
.folder-toggle-title small {
  display: block;
}

.folder-toggle-title small {
  color: var(--bookmark-muted);
  font-size: 0.76rem;
}

.folder-toggle-icon {
  width: 2.35rem;
  height: 2.35rem;
  border-radius: 16px;
  background: var(--bookmark-accent-soft);
  color: var(--bookmark-accent);
  flex-shrink: 0;
}

.btn-folder-toggle {
  width: 2.2rem;
  height: 2.2rem;
  padding: 0;
}

.btn-folder-action {
  padding: 0.46rem 0.72rem;
  font-size: 0.78rem;
  font-weight: 700;
}

.folder-items {
  display: grid;
  gap: 0.75rem;
  margin-top: 0.85rem;
}

.folder-items-empty {
  padding: 0.9rem;
  border-radius: 16px;
  background: var(--bookmark-toolbar);
  color: var(--bookmark-muted);
  text-align: center;
}

.folder-item {
  padding: 0.85rem 0.9rem;
  background: linear-gradient(180deg, rgba(15, 118, 110, 0.04), rgba(255, 255, 255, 0));
}

.folder-item-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.6rem;
}

.folder-item-header strong {
  font-size: 0.84rem;
  line-height: 1.5;
}

.folder-item-actions .form-select {
  min-width: 9rem;
}

.folder-item-ar {
  direction: rtl;
  text-align: right;
  font-size: 1.3rem;
  line-height: 1.9;
  color: var(--bookmark-ink);
  font-family: "Amiri", "Noto Naskh Arabic", serif;
}

.folder-item-en {
  color: var(--bookmark-muted);
  font-size: 0.86rem;
  line-height: 1.65;
}

.bookmark-modal .modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.95rem;
  padding-bottom: 1.2rem;
  border-top: 1px solid var(--bookmark-border);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(15, 118, 110, 0.04));
}

.bookmark-footer-copy {
  min-width: 0;
}

.bookmark-footer-copy strong,
.bookmark-footer-copy span {
  display: block;
}

.bookmark-footer-copy strong {
  font-size: 0.9rem;
  font-weight: 800;
}

.bookmark-footer-copy span {
  margin-top: 0.16rem;
  color: var(--bookmark-muted);
  font-size: 0.8rem;
}

.bookmark-modal .form-control,
.bookmark-modal .form-select {
  border-radius: 16px;
  border-color: var(--bookmark-border);
  background: rgba(255, 255, 255, 0.94);
  color: var(--bookmark-ink);
  box-shadow: none;
}

.bookmark-modal .form-control:focus,
.bookmark-modal .form-select:focus,
.bookmark-modal button:focus-visible,
.bookmark-modal .btn:focus-visible {
  border-color: rgba(15, 118, 110, 0.34);
  box-shadow: 0 0 0 0.18rem rgba(15, 118, 110, 0.12);
  outline: 0;
}

.bookmark-modal.surat-dark-modal {
  --bookmark-accent: #7dd3fc;
  --bookmark-accent-strong: #e0f2fe;
  --bookmark-accent-soft: rgba(125, 211, 252, 0.14);
  --bookmark-danger-soft: rgba(248, 113, 113, 0.14);
  --bookmark-ink: #f8fafc;
  --bookmark-muted: #cbd5e1;
  --bookmark-border: rgba(148, 163, 184, 0.22);
  --bookmark-surface: rgba(2, 6, 23, 0.97);
  --bookmark-surface-alt: rgba(15, 23, 42, 0.98);
  --bookmark-card: rgba(15, 23, 42, 0.88);
  --bookmark-toolbar: rgba(30, 41, 59, 0.9);
  --bookmark-shadow: 0 32px 80px rgba(2, 6, 23, 0.52);
}

.bookmark-modal.surat-dark-modal .bookmark-alert.alert-danger {
  color: #fecaca;
}

.bookmark-modal.surat-dark-modal .bookmark-delete-copy strong,
.bookmark-modal.surat-dark-modal .bookmark-delete-copy span {
  color: #fecaca;
}

.bookmark-modal.surat-dark-modal .form-control,
.bookmark-modal.surat-dark-modal .form-select,
.bookmark-modal.surat-dark-modal .btn-create-toggle,
.bookmark-modal.surat-dark-modal .btn-manage,
.bookmark-modal.surat-dark-modal .btn-cancel,
.bookmark-modal.surat-dark-modal .btn-folder-toggle,
.bookmark-modal.surat-dark-modal .btn-folder-action,
.bookmark-modal.surat-dark-modal .icon-preset-btn,
.bookmark-modal.surat-dark-modal .pill-delete {
  background: var(--bookmark-toolbar);
  color: var(--bookmark-ink);
}

.bookmark-modal.surat-dark-modal .form-control::placeholder {
  color: rgba(203, 213, 225, 0.68);
}

@media (max-width: 991.98px) {
  .bookmark-layout {
    grid-template-columns: 1fr;
  }

  .bookmark-create-grid {
    grid-template-columns: 1fr;
  }

  .folder-grid {
    grid-template-columns: 1fr;
  }

  .bookmark-modal .modal-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .bookmark-footer-actions {
    width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
}

@media (max-width: 767.98px) {
  .bookmark-modal-dialog {
    max-width: calc(100vw - 0.65rem);
    margin: 0.3rem auto;
  }

  .bookmark-modal {
    border-radius: 22px;
  }

  .bookmark-modal .modal-header,
  .bookmark-modal .modal-body,
  .bookmark-modal .modal-footer {
    padding-left: 0.95rem;
    padding-right: 0.95rem;
  }

  .bookmark-modal .modal-title {
    font-size: 1.24rem;
  }

  .bookmark-header-main,
  .section-head,
  .bookmark-delete-confirm,
  .folder-toggle,
  .folder-item-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .bookmark-header-meta,
  .section-actions,
  .bookmark-delete-actions,
  .bookmark-footer-actions,
  .folder-toggle-actions,
  .folder-item-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .btn-create-toggle,
  .btn-manage,
  .btn-cancel,
  .btn-save,
  .btn-create,
  .btn-folder-action,
  .folder-item-actions .form-select {
    width: 100%;
    justify-content: center;
  }

  .bookmark-search-shell,
  .bookmark-search-row {
    width: 100%;
  }

  .bookmark-search-row {
    flex-direction: column;
    align-items: stretch;
  }

  .bookmark-ayah-preview-head {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn-create-toggle,
  .btn-manage,
  .btn-cancel,
  .btn-save,
  .btn-create,
  .btn-folder-toggle,
  .btn-folder-action,
  .icon-preset-btn,
  .color-swatch-btn,
  .folder-pill,
  .pill-check,
  .pill-delete {
    transition: none;
  }
}
</style>
