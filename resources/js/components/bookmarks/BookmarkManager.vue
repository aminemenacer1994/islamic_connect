<template>
    <div class="container-fluid bookmark-manager shadow-md">
        <div v-if="authResolved">
            <transition name="fade">
                <div v-if="!isAuthenticated" class="guest-nudge-banner">
                    <div class="container-fluid d-flex align-items-center justify-content-between">
                        <div class="nudge-text">
                            <i class="bi bi-info-circle-fill me-2"></i>
                            <span>You're browsing as a guest.
                                <a href="/login" class="fw-bold text-teal">Log in</a>
                                to sync bookmarks across devices.</span>
                        </div>
                        <button type="button" class="btn-close btn-close-white" @click="hideGuestNudge"></button>
                    </div>
                </div>
            </transition>
            <div class="row g-4 bookmark-layout align-items-start">
                <div class="col-12 col-lg-4 folder-col px-lg-0" :class="{ 'is-collapsed': isFolderCollapsed }"
                    :aria-hidden="isFolderCollapsed ? 'true' : 'false'">
                    <folder-list ref="folderList" @folder-selected="onFolderSelected" />
                </div>
                <div class="col-12 col-lg-8 panel-col ps-lg-3" :class="{ 'is-expanded': isFolderCollapsed }">
                    <div class="bookmark-panel" style="border-radius: 22px;">
                        <div class="panel-header">
                            <div>
                                <div class="panel-eyebrow">Collection</div>
                                <h5 class="panel-title">
                                    {{
                                        selectedFolder
                                            ? selectedFolder.name
                                            : "Folder contents"
                                    }}
                                </h5>
                                <div class="panel-subtitle">
                                    {{ panelCountLabel }} ·
                                    {{ folderDescriptor }}
                                </div>
                            </div>
                            <div class="panel-actions">
                                
                                <div class="dropdown export-dropdown ms-2">
                                    <button class="btn btn-sm btn-forest dropdown-toggle" type="button"
                                        id="bookmarkExportDropdown" data-bs-toggle="dropdown" aria-expanded="false"
                                        :disabled="!canExportFolder">
                                        <i class="bi bi-file-earmark-arrow-down-fill me-1"></i>
                                        Export folder
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end export-menu"
                                        aria-labelledby="bookmarkExportDropdown">
                                        <li>
                                            <button class="dropdown-item export-item" type="button"
                                                @click="exportFolder('pdf')" :disabled="!canExportFolder">
                                                <i class="bi bi-filetype-pdf icon"></i>
                                                PDF Document


                                            </button>
                                        </li>
                                        <li>
                                            <button class="dropdown-item export-item" type="button"
                                                @click="exportFolder('word')" :disabled="!canExportFolder">
                                                <i class="bi bi-filetype-doc icon"></i>
                                                Word Document

                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <a class="panel-cta" href="/surat">
                                    Go back to the Holy Quran
                                    <i class="bi bi-arrow-right ms-2"></i>
                                </a>
                                <button type="button" class="panel-toggle" @click="toggleFolderPane"
                                    :aria-pressed="!isFolderCollapsed" :aria-label="isFolderCollapsed
                                            ? 'Show folders'
                                            : 'Hide folders'
                                        " :title="isFolderCollapsed
                                            ? 'Show folders'
                                            : 'Hide folders'
                                        ">
                                    <i class="bi" :class="isFolderCollapsed
                                            ? 'bi-layout-sidebar-inset'
                                            : 'bi-layout-sidebar-inset-reverse'
                                        "></i>
                                </button>
                            </div>
                        </div>

                        <div class="panel-body" style="border-radius: 22px;">
                            <div v-if="panelMessage" class="panel-alert" :class="panelMessageVariant === 'danger'
                                    ? 'alert-danger'
                                    : 'alert-success'
                                ">
                                {{ panelMessage }}
                            </div>
                            <div class="panel-search">
                                <div class="input-group">
                                    <span class="input-group-text"><i class="bi bi-search"></i></span>
                                    <input v-model="query" class="form-control" placeholder="Search bookmarks..." />
                                    <button v-if="query" class="btn btn-outline-secondary" type="button"
                                        @click="clearSearch">
                                        Clear
                                    </button>
                                </div>
                            </div>
                            <div v-if="loading" class="loading-state">
                                Loading ayat...
                            </div>
                            <div v-else-if="filteredItems.length === 0" class="empty-state">
                                <div class="empty-title">
                                    No ayat match your search
                                </div>
                                <div class="empty-subtitle">
                                    Try different terms or clear the filters.
                                </div>
                            </div>

                            <!-- Selection Toolbar -->
                            <div v-if="
                                !loading &&
                                filteredItems.length > 0 &&
                                !isSmartSelected
                            " class="selection-toolbar">
                                <div class="toolbar-left">
                                    <button type="button" class="btn btn-sm btn-outline-success"
                                        @click="selectAllBookmarks" :disabled="allBookmarksSelected">
                                        <i class="bi bi-check-all me-1"></i>
                                        Select All
                                    </button>
                                    <button v-if="selectedBookmarkCount > 0" type="button" class="btn btn-sm btn-outline-secondary"
                                        @click="unselectAllBookmarks">
                                        <i class="bi bi-x-circle me-1"></i>
                                        Unselect All
                                    </button>
                                    <span v-if="selectedBookmarkCount > 0" class="selection-count">
                                        {{ selectedBookmarkCount }} selected
                                    </span>
                                </div>
                                <div class="toolbar-right">
                                    <button v-if="selectedBookmarkCount > 0" type="button" class="btn btn-sm btn-outline-danger"
                                        @click="openBulkDeleteConfirm" :disabled="bulkDeleteBusy">
                                        <span v-if="bulkDeleteBusy"
                                            class="spinner-border spinner-border-sm me-1"></span>
                                        <i v-else class="bi bi-trash me-1"></i>
                                        Delete Selected
                                    </button>
                                </div>
                            </div>

                            <div v-if="!loading && filteredItems.length > 0" class="list-wrapper">
                                <div class="list-group ayah-list">
                                    <div v-for="item in filteredItems" :key="item.row_key"
                                        class="list-group-item ayah-list-item">
                                        <div class="ayah-list-head">
                                            <div v-if="
                                                item.bookmark_id &&
                                                !isSmartSelected
                                            " class="ayah-checkbox">
                                                <input type="checkbox" style="width:20px;" :checked="selectedBookmarkIds.includes(
                                                    item.bookmark_id
                                                )
                                                    " @change="
                                                        toggleBookmarkSelection(
                                                            item.bookmark_id
                                                        )
                                                        " />
                                            </div>
                                            <div class="ayah-list-meta" v-html="formatMeta(item)"></div>
                                            <div class="ayah-list-actions">
                                                <select v-if="
                                                    canMoveFromSelectedFolder
                                                " class="form-select form-select-sm move-select" :disabled="movingBookmarkId ===
                                                        item.bookmark_id ||
                                                        moveTargets.length === 0
                                                        " @change="
                                                        moveBookmark(
                                                            item,
                                                            $event
                                                        )
                                                        ">
                                                    <option value="" selected disabled>
                                                        {{
                                                            moveTargets.length
                                                                ? "Move to..."
                                                                : "No other folders"
                                                        }}
                                                    </option>
                                                    <option v-for="folder in moveTargets" :key="`move-${folder.id}`"
                                                        :value="folder.id">
                                                        {{ folder.name }}
                                                    </option>
                                                </select>
                                                <!-- <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary bookmark-quick"
                      data-bs-toggle="modal"
                      data-bs-target="#bookmarkModal"
                      @click="prepareBookmark(item)"
                    >
                      <i class="bi bi-bookmark-plus"></i>
                    </button> -->
                                                <!-- <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary open-quick"
                      @click="openInSurat(item)"
                      title="Open in Quran"
                      aria-label="Open ayah in Quran"
                    >
                      <i class="bi bi-box-arrow-up-right"></i>
                    </button> -->
                                                <button type="button"
                                                    class="btn btn-sm btn-outline-secondary copy-quick"
                                                    @click="copyBookmark(item)" title="Copy" aria-label="Copy ayah">
                                                    <i class="bi bi-clipboard"></i>
                                                </button>
                                                <button type="button"
                                                    class="btn btn-sm btn-outline-secondary share-quick" @click="
                                                        shareBookmarkOnWhatsApp(
                                                            item
                                                        )
                                                        " title="Share via WhatsApp" aria-label="Share ayah via WhatsApp">
                                                    <i class="bi bi-whatsapp"></i>
                                                </button>
                                                <button type="button" class="btn btn-sm btn-outline-danger remove-quick"
                                                    :disabled="isDeleteBusy(
                                                        item.bookmark_id
                                                    ) || isSmartSelected
                                                        " :title="deleteTooltip" @click="
                                                        openRemoveConfirm(item)
                                                        ">
                                                    <span v-if="
                                                        isDeleteBusy(
                                                            item.bookmark_id
                                                        )
                                                    " class="spinner-border spinner-border-sm"></span>
                                                    <i v-else class="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="ayah-list-ar" v-html="highlightText(
                                            item.ayah_verse_ar,
                                            'arabic'
                                        )
                                            "></div>
                                        <div v-if="item.ayah_verse_en" class="ayah-list-en" v-html="highlightText(
                                            item.ayah_verse_en,
                                            'english'
                                        )
                                            "></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <bookmark-modal :ayah="activeAyah" @saved="onSaved" />

                <div v-if="removeConfirmOpen" class="modal-backdrop fade show"></div>
                <div v-if="removeConfirmOpen" class="modal fade show remove-confirm-modal" tabindex="-1" role="dialog"
                    aria-modal="true" style="display: block">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h6 class="modal-title">
                                    {{ removeConfirmTitle }}
                                </h6>
                                <button type="button" class="btn-close" aria-label="Close"
                                    @click="closeRemoveConfirm"></button>
                            </div>
                            <div class="modal-body">
                                <p class="mb-0">{{ removeConfirmMessage }}</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-secondary" @click="closeRemoveConfirm">
                                    Cancel
                                </button>
                                <button type="button" class="btn btn-danger" :disabled="removeBusy" @click="
                                    removeMode === 'bulk'
                                        ? confirmBulkDeleteBookmarks()
                                        : confirmRemoveBookmark()
                                    ">
                                    <span v-if="removeBusy" class="spinner-border spinner-border-sm me-2"></span>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import AyahRow from "./AyahRow.vue";
import FolderList from "./FolderList.vue";
import BookmarkModal from "./BookmarkModal.vue";
import { fetchUserIdFromApi } from "../../utils/bookmarkAuth";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, AlignmentType } from "docx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default {
    name: "BookmarkManager",
    components: {
        AyahRow,
        FolderList,
        BookmarkModal,
    },
    data() {
        return {
            selectedFolder: null,
            items: [],
            folders: [],
            source: "manual",
            loading: false,
            activeAyah: null,
            movingBookmarkId: null,
            deleteBusy: {},
            removeConfirmOpen: false,
            removeCandidate: null,
            removeMode: "folder",
            removeBusy: false,
            panelMessage: "",
            panelMessageVariant: "success",
            panelMessageTimer: null,
            isFolderCollapsed: false,
            query: "",
            isAuthenticated: false,
            authResolved: false,
            bookmarkInstanceId: `bm-${Math.random().toString(36).slice(2)}`,
            bookmarkEventHandler: null,
            bookmarkStorageHandler: null,
            visibilityHandler: null,
            showGuestNudge: true,
            selectedBookmarkIds: [],
            bulkDeleteBusy: false,
        };
    },
    computed: {
        sourceLabel() {
            if (this.source === "smart") return "Smart";
            if (this.source === "all") return "All";
            return "Manual";
        },
        normalizedItems() {
            if (!this.items.length) return [];
            return this.items.map((item) => {
                if (this.source === "smart") {
                    return {
                        row_key: `smart-${item.id}`,
                        bookmark_id: null,
                        surah_number: item.surah_id,
                        surah_name:
                            item.surah?.name_en || `Surah ${item.surah_id}`,
                        ayah_number: item.ayah_id,
                        ayah_verse_ar: item.ayah_text,
                        ayah_verse_en: "",
                    };
                }

                return {
                    row_key: `bookmark-${item.id}`,
                    bookmark_id: item.id,
                    surah_number: item.surah_number || item.ayah?.surah_id,
                    surah_name:
                        item.surah_name || item.ayah?.surah?.name_en || "Surah",
                    ayah_number:
                        item.ayah?.ayah_id || item.ayah_number || item.ayah_num,
                    ayah_verse_ar: item.ayah_verse_ar || item.ayah?.ayah_text,
                    ayah_verse_en: item.ayah_verse_en || "",
                };
            });
        },
        parsedQuery() {
            return this.parseQuery(this.query);
        },
        activeFieldKeys() {
            return ["surah", "ayah", "arabic", "english"];
        },
        highlightMap() {
            const map = {
                surah: [],
                ayah: [],
                arabic: [],
                english: [],
            };
            const tokens = this.parsedQuery.filter((token) => !token.exclude);
            tokens.forEach((token) => {
                let targets = token.field
                    ? this.mapFieldAlias(token.field)
                    : this.activeFieldKeys;
                if (!targets.length) {
                    targets = this.activeFieldKeys;
                }
                targets.forEach((fieldKey) => {
                    if (!map[fieldKey]) return;
                    map[fieldKey].push(token.term);
                });
            });
            Object.keys(map).forEach((key) => {
                const unique = Array.from(new Set(map[key].filter(Boolean)));
                map[key] = unique.sort((a, b) => b.length - a.length);
            });
            return map;
        },
        filteredItems() {
            const tokens = this.parsedQuery;
            const fieldKeys = this.activeFieldKeys;
            return this.normalizedItems.filter((item) =>
                this.matchesItem(item, tokens, fieldKeys)
            );
        },
        panelCountLabel() {
            if (!this.query) {
                return `${this.normalizedItems.length} ayat`;
            }
            return `${this.filteredItems.length} of ${this.normalizedItems.length} ayat`;
        },
        folderDescriptor() {
            if (!this.selectedFolder) return "Unified library";
            if (this.selectedFolder.isAll) return "Global collection";
            if (this.selectedFolder.is_smart) return "Smart folder";
            return "Curated collection";
        },
        canMoveFromSelectedFolder() {
            return (
                !!this.selectedFolder &&
                !this.selectedFolder.isAll &&
                !this.selectedFolder.is_smart
            );
        },
        isSmartSelected() {
            return !!this.selectedFolder?.is_smart;
        },
        deleteTooltip() {
            if (this.isSmartSelected) return "Smart folders cannot be edited.";
            if (this.selectedFolder?.isAll) return "Delete from all folders";
            return "Remove from this folder";
        },
        removeConfirmTitle() {
            if (this.removeMode === "bulk") {
                return `Delete ${this.selectedBookmarkCount} bookmark(s)?`;
            }
            return this.removeMode === "all"
                ? "Delete bookmark?"
                : "Remove from folder?";
        },
        removeConfirmMessage() {
            if (this.removeMode === "bulk") {
                return `Are you sure you want to delete ${this.selectedBookmarkCount} selected bookmark(s)? This action cannot be undone.`;
            }
            if (this.removeMode === "all") {
                return "Delete this bookmark from all folders?";
            }
            return "Remove this ayah from the current folder?";
        },
        moveTargets() {
            if (!this.canMoveFromSelectedFolder) return [];
            return this.folders.filter(
                (folder) =>
                    !folder.is_smart && folder.id !== this.selectedFolder.id
            );
        },
        selectedBookmarkCount() {
            return this.selectedBookmarkIds.length;
        },
        allBookmarksSelected() {
            if (this.filteredItems.length === 0) return false;
            const selectableIds = this.filteredItems
                .filter((item) => item.bookmark_id)
                .map((item) => item.bookmark_id);
            return (
                selectableIds.length > 0 &&
                selectableIds.every((id) =>
                    this.selectedBookmarkIds.includes(id)
                )
            );
        },
        someBookmarksSelected() {
            return (
                this.selectedBookmarkIds.length > 0 &&
                !this.allBookmarksSelected
            );
        },
        canExportFolder() {
            return !!this.selectedFolder && this.normalizedItems.length > 0;
        },
    },
    async mounted() {
        await this.initializeAuthentication();
        this.fetchFolders();
        this.bookmarkEventHandler = (event) =>
            this.handleBookmarksUpdated(event);
        this.bookmarkStorageHandler = (event) =>
            this.handleStorageBookmarksUpdated(event);
        this.visibilityHandler = () => this.handleVisibilityChange();
        window.addEventListener("bookmarks-updated", this.bookmarkEventHandler);
        window.addEventListener("storage", this.bookmarkStorageHandler);
        window.addEventListener("visibilitychange", this.visibilityHandler);
    },
    beforeUnmount() {
        clearTimeout(this.panelMessageTimer);
        if (this.bookmarkEventHandler)
            window.removeEventListener(
                "bookmarks-updated",
                this.bookmarkEventHandler
            );
        if (this.bookmarkStorageHandler)
            window.removeEventListener("storage", this.bookmarkStorageHandler);
        if (this.visibilityHandler)
            window.removeEventListener(
                "visibilitychange",
                this.visibilityHandler
            );
    },
    methods: {
        hideGuestNudge() {
            this.showGuestNudge = false;
        },
        clearSearch() {
            this.query = "";
        },
        stripHtmlTags(text) {
            if (!text) return "";
            const div = document.createElement("div");
            div.innerHTML = text;
            return div.textContent || div.innerText || "";
        },
        getBookmarkSurahLabel(item) {
            const name = this.stripHtmlTags(item?.surah_name || "");
            if (name) return name;
            if (item?.surah_number) return `Surah ${item.surah_number}`;
            return "Surah";
        },
        getBookmarkAyahNumber(item) {
            return item?.ayah_number || "";
        },
        buildBookmarkMessage(item) {
            if (!item) return "";
            const surahLabel = this.getBookmarkSurahLabel(item);
            const ayahNumber = this.getBookmarkAyahNumber(item);
            const header = ayahNumber
                ? `${surahLabel} (Ayah ${ayahNumber})`
                : surahLabel;
            const arabic = this.stripHtmlTags(item.ayah_verse_ar || "");
            const translation = this.stripHtmlTags(item.ayah_verse_en || "");
            const lines = [header];
            if (arabic) lines.push(`Arabic: ${arabic}`);
            if (translation) lines.push(`Translation: ${translation}`);
            return lines.join("\n\n");
        },
        async copyText(text) {
            if (!text) return false;
            if (
                typeof window !== "undefined" &&
                typeof navigator !== "undefined" &&
                navigator.clipboard?.writeText &&
                window.isSecureContext
            ) {
                try {
                    await navigator.clipboard.writeText(text);
                    return true;
                } catch (_) {
                    // fall back
                }
            }
            try {
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.setAttribute("readonly", "");
                textarea.style.position = "fixed";
                textarea.style.top = "-9999px";
                document.body.appendChild(textarea);
                textarea.select();
                const success = document.execCommand("copy");
                document.body.removeChild(textarea);
                return success;
            } catch (_) {
                return false;
            }
        },
        async copyBookmark(item) {
            const message = this.buildBookmarkMessage(item);
            if (!message) return;
            const ok = await this.copyText(message);
            if (ok) {
                this.setPanelMessage("Ayah copied to clipboard.", "success");
            } else {
                this.setPanelMessage("Unable to copy ayah.", "danger");
            }
        },
        shareBookmarkOnWhatsApp(item) {
            const message = this.buildBookmarkMessage(item);
            if (!message) return;
            const encodedMessage = encodeURIComponent(message);
            const whatsappLink = `https://api.whatsapp.com/send?text=${encodedMessage}`;
            window.open(whatsappLink, "_blank", "noopener,noreferrer");
        },
        openInSurat(item) {
            const surahNumber = Number(item?.surah_number || item?.surah_id);
            const ayahNumber = Number(
                item?.ayah_number || item?.ayah_num || item?.ayah_id
            );
            if (!surahNumber || !ayahNumber) {
                this.setPanelMessage("Unable to open this ayah.", "danger");
                return;
            }
            const url = `/surat?surah=${surahNumber}&ayah=${ayahNumber}`;
            window.open(url, "_blank", "noopener,noreferrer");
        },
        escapeHtml(text) {
            return (text || "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        },
        escapeRegExp(text) {
            return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        },
        parseQuery(query) {
            const tokens = [];
            if (!query) return tokens;
            const regex = /(-)?(?:(\w+):)?(?:"([^"]+)"|(\S+))/g;
            let match;
            while ((match = regex.exec(query)) !== null) {
                const exclude = !!match[1];
                const field = match[2] ? match[2].toLowerCase() : null;
                const term = (match[3] || match[4] || "").trim();
                if (!term) continue;
                tokens.push({ exclude, field, term });
            }
            return tokens;
        },
        mapFieldAlias(field) {
            const key = (field || "").toLowerCase();
            if (!key) return [];
            if (["surah", "s"].includes(key)) return ["surah"];
            if (["ayah", "a", "num", "number"].includes(key)) return ["ayah"];
            if (["ar", "arabic"].includes(key)) return ["arabic"];
            if (["en", "english"].includes(key)) return ["english"];
            if (["text", "verse"].includes(key)) return ["arabic", "english"];
            return [];
        },
        getFieldValue(item, fieldKey) {
            switch (fieldKey) {
                case "surah":
                    return item.surah_name || "";
                case "ayah":
                    return item.ayah?.ayah_id || item.ayah_number || "";
                case "arabic":
                    return item.ayah_verse_ar || "";
                case "english":
                    return item.ayah_verse_en || "";
                default:
                    return "";
            }
        },
        tokenMatchesItem(item, token, fieldKeys) {
            const term = token.term.toLowerCase();
            let fields = token.field
                ? this.mapFieldAlias(token.field)
                : fieldKeys;
            if (!fields.length) {
                fields = fieldKeys;
            }
            if (!fields.length) return false;
            return fields.some((fieldKey) => {
                const value = this.stripHtmlTags(
                    this.getFieldValue(item, fieldKey)
                ).toLowerCase();
                return value.includes(term);
            });
        },
        matchesItem(item, tokens, fieldKeys) {
            if (!tokens.length) return true;
            for (const token of tokens) {
                const matched = this.tokenMatchesItem(item, token, fieldKeys);
                if (token.exclude) {
                    if (matched) return false;
                } else {
                    if (!matched) return false;
                }
            }
            return true;
        },
        highlightText(text, fieldKey) {
            const clean = this.stripHtmlTags(text || "");
            const safe = this.escapeHtml(clean);
            const terms = this.highlightMap[fieldKey] || [];
            if (!terms.length) return safe;
            return terms.reduce((acc, term) => {
                const regex = new RegExp(`(${this.escapeRegExp(term)})`, "gi");
                return acc.replace(regex, '<mark class="search-hit">$1</mark>');
            }, safe);
        },
        formatMeta(item) {
            const surah = this.highlightText(item.surah_name || "", "surah");
            const ayah = this.highlightText(
                String(item.ayah?.ayah_id || item.ayah_number || ""),
                "ayah"
            );
            return `${surah} • Ayah ${ayah}`;
        },
        refreshFolderSidebar() {
            return this.$refs.folderList?.fetchFolders?.();
        },
        async initializeAuthentication() {
            this.isAuthenticated = !!(await fetchUserIdFromApi());
            this.authResolved = true;
        },
        notifyBookmarkChange(source = this.bookmarkInstanceId) {
            const token = `${Date.now()}-${source}`;
            try {
                localStorage.setItem("bookmarkRefresh", token);
            } catch (_) {
                // ignore storage errors (e.g., privacy mode)
            }
            window.dispatchEvent(
                new CustomEvent("bookmarks-updated", {
                    detail: { token, instance: source },
                })
            );
        },
        handleBookmarksUpdated(event) {
            if (event?.detail?.instance === this.bookmarkInstanceId) return;
            this.refreshAfterExternalUpdate();
        },
        handleStorageBookmarksUpdated(event) {
            if (event.key !== "bookmarkRefresh") return;
            this.refreshAfterExternalUpdate();
        },
        handleVisibilityChange() {
            if (document.visibilityState === "visible") {
                this.refreshAfterExternalUpdate();
            }
        },
        refreshAfterExternalUpdate() {
            if (this.loading) return;
            const folder = this.selectedFolder || {
                id: "all",
                name: "All bookmarks",
                isAll: true,
            };
            this.onFolderSelected(folder);
            this.refreshFolderSidebar();
        },
        toggleFolderPane() {
            this.isFolderCollapsed = !this.isFolderCollapsed;
        },
        async fetchFolders() {
            try {
                const response = await axios.get("/api/folders");
                this.folders = response.data?.data || [];
            } catch (_) {
                this.folders = [];
            }
        },
        async onFolderSelected(folder) {
            this.selectedFolder = folder;
            this.loading = true;
            try {
                const response = folder.isAll
                    ? await axios.get("/api/ayah-bookmarks")
                    : await axios.get("/api/ayah-bookmarks", {
                        params: { folder_id: folder.id },
                    });
                const payload =
                    response.data?.data ??
                    response.data?.bookmarks ??
                    response.data ??
                    [];
                this.items = Array.isArray(payload) ? payload : [];
                this.source = folder.isAll
                    ? "all"
                    : response.data?.source || "manual";
                this.fetchFolders();
            } catch (error) {
                this.items = [];
            } finally {
                this.loading = false;
            }
        },
        prepareBookmark(payload) {
            this.activeAyah = {
                surah_number: payload.surah_number,
                surah_name: payload.surah_name,
                ayah_number: payload.ayah_number,
                ayah_verse_ar: payload.ayah_verse_ar,
                ayah_verse_en: payload.ayah_verse_en,
            };
        },
        onSaved() {
            if (this.selectedFolder) {
                this.onFolderSelected(this.selectedFolder);
            }
            this.refreshFolderSidebar();
            this.notifyBookmarkChange();
        },
        async moveBookmark(item, event) {
            const targetId = Number(event?.target?.value);
            if (
                !targetId ||
                !item?.bookmark_id ||
                !this.canMoveFromSelectedFolder
            ) {
                if (event?.target) event.target.value = "";
                return;
            }
            this.movingBookmarkId = item.bookmark_id;
            try {
                await axios.post(
                    `/api/ayah-bookmarks/${item.bookmark_id}/folders`,
                    {
                        folder_ids: [targetId],
                    }
                );
                await axios.delete(
                    `/api/ayah-bookmarks/${item.bookmark_id}/folders/${this.selectedFolder.id}`
                );
                const targetName =
                    this.folders.find((folder) => folder.id === targetId)
                        ?.name || "folder";
                this.adjustFolderCount(this.selectedFolder.id, -1);
                this.adjustFolderCount(targetId, 1);
                if (this.source === "manual") {
                    this.items = this.items.filter(
                        (row) => row.id !== item.bookmark_id
                    );
                }
                this.setPanelMessage(`Moved to ${targetName}.`, "success");
            } catch (error) {
                this.setPanelMessage("Unable to move this ayah.", "danger");
            } finally {
                this.movingBookmarkId = null;
                if (event?.target) {
                    event.target.value = "";
                }
            }
        },
        adjustFolderCount(folderId, delta) {
            const folder = this.folders.find((item) => item.id === folderId);
            if (folder) {
                const nextCount = Math.max(0, (folder.ayah_count || 0) + delta);
                folder.ayah_count = nextCount;
            }
            this.$refs.folderList?.adjustFolderCount?.(folderId, delta);
        },
        setPanelMessage(message, variant) {
            this.panelMessage = message;
            this.panelMessageVariant = variant;
            clearTimeout(this.panelMessageTimer);
            this.panelMessageTimer = setTimeout(() => {
                this.panelMessage = "";
            }, 3000);
        },
        async exportFolder(format) {
            if (!this.canExportFolder) {
                this.setPanelMessage(
                    "Select a folder with bookmarks before exporting.",
                    "danger"
                );
                return;
            }
            const rows = this.buildExportRows();
            try {
                if (format === "pdf") {
                    await this.exportFolderPdf(rows);
                } else if (format === "word") {
                    await this.exportFolderDocx(rows);
                }
            } catch (error) {
                console.error("Folder export failed:", error);
                this.setPanelMessage("Unable to export folder.", "danger");
            }
        },
        buildExportRows() {
            return this.normalizedItems.map((item) => {
                const surahLabel =
                    item.surah_name ||
                    (item.surah_number
                        ? `Surah ${item.surah_number}`
                        : "Surah");
                return {
                    surah: this.stripHtmlTags(surahLabel).trim(),
                    ayah: item.ayah_number
                        ? String(item.ayah_number)
                        : "",
                    arabic: this.stripHtmlTags(item.ayah_verse_ar || "").trim(),
                    translation: this.stripHtmlTags(
                        item.ayah_verse_en || ""
                    ).trim(),
                };
            });
        },
        slugifyForFilename(value) {
            if (!value) return "";
            return value
                .toString()
                .normalize("NFKD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^\x00-\x7F]/g, "")
                .replace(/[^a-zA-Z0-9]+/g, "_")
                .replace(/^_+|_+$/g, "")
                .toLowerCase();
        },
        generateExportFileName(extension) {
            const folderName = this.selectedFolder?.name || "bookmarks";
            const dateStamp = new Date().toISOString().split("T")[0];
            const slug = this.slugifyForFilename(`${folderName}_${dateStamp}`);
            const safeName = slug || "bookmarks";
            return `${safeName}.${extension}`;
        },
        createExportPreview(rows) {
            const folderName = this.selectedFolder?.name || "Bookmarks";
            const wrapper = document.createElement("div");
            wrapper.className = "bookmark-export-preview";
            const rowsHtml = rows
                .map(
                    (row) => `
<tr>
  <td>${this.escapeHtml(row.surah)}</td>
  <td>${this.escapeHtml(row.ayah)}</td>
  <td class="arabic-col" dir="rtl">${this.escapeHtml(row.arabic)}</td>
  <td>${this.escapeHtml(row.translation)}</td>
</tr>`
                )
                .join("");
            wrapper.innerHTML = `
<div class="bookmark-export-sheet">
  <div class="export-header">
    <h1>Daily Reflections</h1>
    <p class="export-subtitle">${this.escapeHtml(folderName)} · ${rows.length} ayah(s)</p>
  </div>
  <table>
    <colgroup>
      <col class="col-surah" />
      <col class="col-ayah" />
      <col class="col-arabic" />
      <col class="col-translation" />
    </colgroup>
    <thead>
      <tr>
        <th>Surah</th>
        <th>Ayah</th>
        <th>Arabic</th>
        <th>Translation</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>
</div>`;
            return wrapper;
        },
        async exportFolderPdf(rows) {
            const preview = this.createExportPreview(rows);
            document.body.appendChild(preview);
            try {
                const canvas = await html2canvas(preview, {
                    scale: Math.min(window.devicePixelRatio || 1, 2),
                    backgroundColor: "#ffffff",
                    useCORS: true,
                });
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF({
                    orientation: "portrait",
                    unit: "pt",
                    format: "a4",
                });
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight =
                    (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                pdf.save(this.generateExportFileName("pdf"));
                this.setPanelMessage("Folder exported as PDF.", "success");
            } finally {
                if (preview.parentNode) {
                    preview.parentNode.removeChild(preview);
                }
            }
        },
        async exportFolderDocx(rows) {
            const sections = [
                new Paragraph({
                    text: "Daily Reflections",
                    heading: "Heading1",
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 300 },
                }),
            ];

            rows.forEach((row) => {
                const surahText = [
                    row.surah || "Surah",
                    row.ayah ? `• Ayah ${row.ayah}` : "",
                ]
                    .filter(Boolean)
                    .join(" ");
                sections.push(
                    new Paragraph({
                        text: surahText,
                        bold: true,
                        size: 26,
                        spacing: { after: 120 },
                    })
                );
                if (row.arabic) {
                    sections.push(
                        new Paragraph({
                            text: row.arabic,
                            size: 28,
                            alignment: AlignmentType.RIGHT,
                            bidi: true,
                            spacing: { after: 60 },
                        })
                    );
                }
                if (row.translation) {
                    sections.push(
                        new Paragraph({
                            text: row.translation,
                            size: 24,
                            spacing: { after: 120 },
                        })
                    );
                }
            });

            const doc = new Document({
                sections: [
                    {
                        properties: {},
                        children: sections,
                    },
                ],
            });

            const blob = await Packer.toBlob(doc);
            saveAs(blob, this.generateExportFileName("docx"));
            this.setPanelMessage("Folder exported as Word document.", "success");
        },
        isDeleteBusy(id) {
            return !!this.deleteBusy[id];
        },
        openRemoveConfirm(item) {
            if (!item?.bookmark_id || !this.selectedFolder) return;
            if (this.isSmartSelected) {
                this.setPanelMessage(
                    "Smart folders cannot be edited.",
                    "danger"
                );
                return;
            }
            this.removeCandidate = item;
            this.removeMode = this.selectedFolder.isAll ? "all" : "folder";
            this.removeConfirmOpen = true;
            document.body.classList.add("modal-open");
        },
        closeRemoveConfirm() {
            this.removeConfirmOpen = false;
            this.removeCandidate = null;
            this.removeBusy = false;
            document.body.classList.remove("modal-open");
        },
        async confirmRemoveBookmark() {
            if (!this.removeCandidate?.bookmark_id || !this.selectedFolder)
                return;
            this.removeBusy = true;
            const bookmarkId = this.removeCandidate.bookmark_id;
            this.deleteBusy = { ...this.deleteBusy, [bookmarkId]: true };
            try {
                if (this.removeMode === "all") {
                    await axios.delete(`/api/ayah-bookmarks/${bookmarkId}`);
                    this.items = this.items.filter(
                        (row) => row.id !== bookmarkId
                    );
                    this.setPanelMessage("Bookmark deleted.", "success");
                    await this.refreshFolderSidebar();
                } else {
                    await axios.delete(
                        `/api/ayah-bookmarks/${bookmarkId}/folders/${this.selectedFolder.id}`
                    );
                    this.items = this.items.filter(
                        (row) => row.id !== bookmarkId
                    );
                    this.adjustFolderCount(this.selectedFolder.id, -1);
                    this.setPanelMessage(
                        "Ayah removed from folder.",
                        "success"
                    );
                }
            } catch (error) {
                this.setPanelMessage("Unable to remove this ayah.", "danger");
            } finally {
                this.deleteBusy = { ...this.deleteBusy, [bookmarkId]: false };
                this.closeRemoveConfirm();
            }
        },
        toggleBookmarkSelection(bookmarkId) {
            if (!bookmarkId) return;
            const index = this.selectedBookmarkIds.indexOf(bookmarkId);
            if (index > -1) {
                this.selectedBookmarkIds.splice(index, 1);
            } else {
                this.selectedBookmarkIds.push(bookmarkId);
            }
        },
        selectAllBookmarks() {
            const selectableIds = this.filteredItems
                .filter((item) => item.bookmark_id)
                .map((item) => item.bookmark_id);
            this.selectedBookmarkIds = [...selectableIds];
        },
        unselectAllBookmarks() {
            this.selectedBookmarkIds = [];
        },
        openBulkDeleteConfirm() {
            if (this.selectedBookmarkIds.length === 0) {
                this.setPanelMessage("No bookmarks selected.", "danger");
                return;
            }
            if (this.isSmartSelected) {
                this.setPanelMessage(
                    "Smart folders cannot be edited.",
                    "danger"
                );
                return;
            }
            this.removeMode = this.selectedFolder?.isAll ? "all" : "bulk";
            this.removeConfirmOpen = true;
            document.body.classList.add("modal-open");
        },
        async confirmBulkDeleteBookmarks() {
            if (this.selectedBookmarkIds.length === 0) return;

            this.bulkDeleteBusy = true;
            this.removeBusy = true;

            try {
                const response = await axios.delete(
                    "/api/ayah-bookmarks/bulk",
                    {
                        data: { bookmark_ids: this.selectedBookmarkIds },
                    }
                );

                const deletedCount = response.data?.deleted_count || 0;

                // Remove deleted bookmarks from the list
                this.items = this.items.filter(
                    (item) => !this.selectedBookmarkIds.includes(item.id)
                );

                // Clear selection
                this.selectedBookmarkIds = [];

                this.setPanelMessage(
                    `Successfully deleted ${deletedCount} bookmark(s).`,
                    "success"
                );

                await this.refreshFolderSidebar();
            } catch (error) {
                const errorMsg =
                    error.response?.data?.message ||
                    "Failed to delete bookmarks.";
                this.setPanelMessage(errorMsg, "danger");
            } finally {
                this.bulkDeleteBusy = false;
                this.closeRemoveConfirm();
            }
        },
    },
};
</script>

<style scoped>
.bookmark-manager {
    padding: 1.5rem 1.25rem;
    background: transparent;
    border-radius: 20px;
}

.guest-nudge-banner {
    background: #00897b;
    color: white;
    padding: 12px 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(0, 137, 123, 0.2);
}

.nudge-text {
    font-size: 0.95rem;
    font-weight: 500;
}

.text-teal {
    color: #e0f2f1 !important;
}

.bookmark-manager>.row {
    position: relative;
    z-index: 1;
}

.bookmark-layout {
    align-items: stretch;
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 1.5rem;
}

.folder-col,
.panel-col {
    transition: flex-basis 0.3s cubic-bezier(0.22, 1, 0.36, 1),
        max-width 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease,
        transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: flex-basis, max-width, opacity, transform;
}

.panel-col {
    min-width: 0;
}

@media (min-width: 992px) {
    .folder-col {
        flex: 0 0 33.3333%;
        max-width: 33.3333%;
    }

    .panel-col {
        flex: 0 0 66.6667%;
        max-width: 66.6667%;
    }

    .folder-col.is-collapsed {
        flex: 0 0 0;
        max-width: 0;
        opacity: 0;
        transform: translateX(-12px);
        pointer-events: none;
        padding-left: 0;
        padding-right: 0;
        margin: 0;
    }

    .panel-col.is-expanded {
        flex: 0 0 100%;
        max-width: 100%;
    }
}

.bookmark-panel {
    border-radius: 30px;
    border: none;
    background: linear-gradient(180deg, #fdfefd, #eff9f1);
    box-shadow: 0 30px 60px rgba(15, 23, 42, 0.15);
    overflow: visible;
    position: relative;
    display: flex;
    flex-direction: column;
}

.panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 24px 32px;
    border-radius: 22px;
    border-bottom: 1px solid rgba(200, 226, 220, 0.8);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    position: relative;
    z-index: 3;
}

.panel-eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.3em;
    font-size: 0.78rem;
    color: #0f6e63;
    font-weight: 700;
}

.panel-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0.1rem 0 0.2rem;
}

.panel-subtitle {
    font-size: 0.85rem;
    color: #6b7280;
}

.panel-actions {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.panel-actions .panel-toggle {
    border-radius: 999px;
    border: none;
    background: #0f6e63;
    color: #fff;
    padding: 0.45rem 1.25rem;
    font-weight: 600;
    box-shadow: 0 12px 30px rgba(15, 110, 99, 0.25);
}

.panel-cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 12px;
    border: none;
    background: #0f6e63;
    color: #ffffff;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: none;
    text-decoration: none;
    box-shadow: 0 12px 24px rgba(15, 110, 99, 0.25);
}

.panel-cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 26px rgba(15, 110, 99, 0.3);
}

.panel-toggle {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1px solid rgba(148, 163, 184, 0.6);
    background: #ffffff;
    color: #0f5c50;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 14px rgba(15, 23, 42, 0.12);
}

.panel-toggle:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(15, 23, 42, 0.15);
    border-color: rgba(15, 110, 99, 0.4);
}

.panel-body {
    padding: 16px 24px 24px;
    overflow-y: auto;
    scrollbar-gutter: stable;
}

.list-wrapper {
    max-height: calc(100vh - 320px);
    overflow-y: auto;
    padding-right: 4px;
    background: #ffffff;
    border-radius: 24px;
    border: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow: inset 0 10px 20px rgba(15, 23, 42, 0.04);
}

.list-wrapper::-webkit-scrollbar {
    width: 8px;
}

.list-wrapper::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.06);
    border-radius: 999px;
}

.list-wrapper::-webkit-scrollbar-thumb {
    background: rgba(15, 110, 99, 0.4);
    border-radius: 999px;
}

.panel-body::-webkit-scrollbar {
    width: 8px;
}

.panel-body::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.06);
    border-radius: 999px;
}

.panel-body::-webkit-scrollbar-thumb {
    background: rgba(15, 110, 99, 0.4);
    border-radius: 999px;
}

/* Selection Toolbar */
.selection-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #f8fafc;
    border-radius: 12px;
    margin-bottom: 16px;
    border: 1px solid rgba(226, 232, 240, 0.8);
}

.toolbar-left,
.toolbar-right {
    display: flex;
    align-items: center;
    gap: 10px;
}

.selection-count {
    font-size: 0.9rem;
    font-weight: 600;
    color: #0f6e63;
    padding: 4px 12px;
    background: rgba(15, 110, 99, 0.1);
    border-radius: 20px;
}

.selection-toolbar .btn {
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.selection-toolbar .btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Checkbox Styling */
.ayah-checkbox {
    display: flex;
    align-items: center;
    margin-right: 12px;
}

.ayah-checkbox .form-check-input {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 2px solid #cbd5e1;
    cursor: pointer;
    transition: all 0.2s ease;
}

.ayah-checkbox .form-check-input:checked {
    background-color: #0f6e63;
    border-color: #0f6e63;
}

.ayah-checkbox .form-check-input:hover {
    border-color: #0f6e63;
}

.ayah-list-head {
    display: flex;
    align-items: center;
}

.panel-search {
    margin-bottom: 16px;
}

.panel-search .input-group {
    width: 100%;
    max-width: 100%;
    border-radius: 20px;
    background: #ffffff;
    border: 1px solid rgba(15, 110, 99, 0.15);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.1);
}

.panel-search .input-group-text {
    background: transparent;
    border: none;
    color: #8b93a7;
}

.panel-search .form-control {
    border: none;
    background: transparent;
    box-shadow: none;
}

.panel-search .form-control:focus {
    box-shadow: none;
}

.panel-search .btn-outline-secondary {
    border: none;
    background: transparent;
    color: #8b93a7;
}

.panel-alert {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 12px;
    border: 1px solid rgba(15, 23, 42, 0.08);
    background: #ffffff;
    color: #0f172a;
    font-weight: 600;
    margin-bottom: 14px;
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
}

.loading-state,
.empty-state {
    border-radius: 16px;
    padding: 22px;
    text-align: center;
    background: #ffffff;
    border: 1px solid rgba(226, 232, 240, 0.8);
    color: #6b7280;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
}

.empty-state {
    margin-bottom: 16px;
}

.remove-confirm-modal .modal-content {
    border-radius: 18px;
    border: 1px solid rgba(15, 23, 42, 0.12);
    box-shadow: 0 22px 40px rgba(15, 23, 42, 0.18);
    padding: 1rem;
}

:deep(.modal-backdrop) {
    background: rgba(15, 23, 42, 0.45);
}

.ayah-list {
    display: grid;
    gap: 12px;
}

.ayah-list-item {
    border: 1px solid rgba(15, 110, 99, 0.2);
    border-radius: 22px;
    padding: 20px 24px;
    background: linear-gradient(180deg, #ffffff, #f4fbf6);
    box-shadow: 0 18px 50px rgba(15, 23, 42, 0.1);
}

.ayah-list-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.ayah-list-meta {
    font-weight: 700;
    color: #0f172a;
}

.ayah-list-actions {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.move-select {
    min-width: 150px;
    border-radius: 16px;
    border: 1px solid rgba(226, 232, 240, 0.8);
    background: #f8fafc;
    color: #0f172a;
}

.ayah-list-ar {
    margin-top: 12px;
    font-size: 1.9rem;
    font-family: "Amiri", "Noto Naskh Arabic", serif;
    direction: rtl;
    text-align: right;
    color: #0f3a2f;
    line-height: 2;
}

.ayah-list-en {
    margin-top: 10px;
    color: #4b5563;
    line-height: 1.7;
}

@media (max-width: 1199.98px) {
    .bookmark-layout {
        --bs-gutter-x: 1rem;
        --bs-gutter-y: 1rem;
    }

    .panel-header {
        flex-wrap: wrap;
    }
}

@media (max-width: 768px) {
    .bookmark-manager {
        padding: 1.25rem 0.75rem;
    }

    .folder-col,
    .panel-col {
        flex: 0 0 100%;
        max-width: 100%;
    }

    .folder-col {
        order: -1;
    }

    .folder-col.is-collapsed {
        display: none;
    }

    .panel-col.is-expanded {
        max-width: 100%;
    }

    .panel-header {
        padding: 12px 18px;
    }

    .panel-body {
        padding: 14px 18px 20px;
    }

    .ayah-list-item {
        padding: 14px 18px;
    }
}

.bookmark-guest-state {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 260px;
    padding: 2rem 1rem;
}

.guest-card {
    max-width: 480px;
    width: 100%;
    padding: 2rem;
    border-radius: 24px;
    background: linear-gradient(135deg, #f3f9ff, #e2f4f2);
    text-align: center;
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.1);
}

.guest-icon {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
    color: #0f855a;
}

.guest-card h5 {
    margin-bottom: 0.5rem;
    font-weight: 700;
    color: #0f172a;
}

.guest-card p {
    margin-bottom: 1rem;
    color: #475467;
}

.guest-actions {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
}

.guest-actions .btn {
    min-width: 140px;
}

.bookmark-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 260px;
    gap: 0.75rem;
    color: #475467;
}

.loading-spinner {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 4px solid rgba(15, 23, 42, 0.15);
    border-top-color: #0f855a;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

:global(.bookmark-export-preview) {
    position: fixed;
    top: -9999px;
    left: -9999px;
    width: 960px;
    z-index: 9999;
}

:global(.bookmark-export-sheet) {
    width: 100%;
    padding: 32px;
    background: #ffffff;
    font-family: "Inter", "Segoe UI", system-ui, sans-serif;
    color: #0f172a;
    border: 1px solid rgba(15, 23, 42, 0.08);
    border-radius: 16px;
    box-shadow: 0 20px 48px rgba(15, 23, 42, 0.12);
}

:global(.bookmark-export-sheet h1) {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
}

:global(.bookmark-export-sheet .export-subtitle) {
    margin: 6px 0;
    color: #475467;
}

:global(.bookmark-export-sheet table) {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    font-size: 14px;
    table-layout: fixed;
}

:global(.bookmark-export-sheet .col-surah) {
    width: 18%;
}

:global(.bookmark-export-sheet .col-ayah) {
    width: 18%;
}

:global(.bookmark-export-sheet .col-arabic) {
    width: 33%;
}

:global(.bookmark-export-sheet .col-translation) {
    width: 33%;
}

:global(.bookmark-export-sheet th),
:global(.bookmark-export-sheet td) {
    padding: 10px 12px;
    border: 1px solid rgba(15, 23, 42, 0.12);
    word-break: break-word;
}

:global(.bookmark-export-sheet th) {
    background: #0f172a;
    color: #f8fafc;
    font-weight: 600;
    letter-spacing: 0.02em;
}

:global(.bookmark-export-sheet td.arabic-col) {
    font-family: "Amiri", "Noto Naskh Arabic", "Cairo", serif;
    text-align: right;
    direction: rtl;
}

.export-item:focus,
.export-item:active,
.export-item:hover {
    background: #f8fafc;
    color: #0f172a;
}

.export-dropdown .dropdown-toggle {
    border-radius: 10px;
    padding: 0.45rem 1.35rem;
    font-size: 0.95rem;
}

.btn-forest {
    border: 1px solid #0f6e63;
    background-color: #0f6e63;
    color: #f3fff2;
    font-weight: 600;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    box-shadow: 0 10px 25px rgba(15, 81, 50, 0.25);
}

.btn-forest:disabled {
    opacity: 0.5;
    box-shadow: none;
}

.btn-forest:not(:disabled):hover {
    background-color: #0f6e63;
    transform: translateY(-1px);
}

.export-dropdown .dropdown-menu {
    min-width: 18rem;
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    z-index: 2200;
}

.export-menu {
    min-width: 18rem;
    border-radius: 1rem;
    border: 1px solid rgba(15, 23, 42, 0.15);
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.15);
}

.export-item {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-weight: 600;
    color: #0f172a;
    background: transparent;
}

.export-item .badge {
    font-size: 0.65rem;
}

.export-item .icon {
    font-size: 1rem;
    color: #0f6e63;
}
</style>
