<template>
  <div class="admin-page">
    <div class="pt-4">
      <div class="search-toolbar-panel mb-3">
        <div class="toolbar-row">
          <div class="admin-search-wrapper">
            <div class="input-group admin-search">
              <span class="input-group-text"><i class="bi bi-search"></i></span>
              <input v-model="query" class="form-control" placeholder="Search pinned/saved ayat..." />
            </div>
          </div>
          <div class="filters d-flex align-items-center gap-2">
            <select v-model="surahFilter" class="form-select">
              <option value="all">All surahs</option>
              <option v-for="(surah, idx) in surahFilterOptions" :key="`surah-${surah}-${idx}`" :value="surah">
                {{ surah }}
              </option>
            </select>
            <select v-model="sortBy" class="form-select">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
            <select v-model="scopeFilter" class="form-select">
              <option value="all">Pinned + Saved</option>
              <option value="pinned">Pinned only</option>
              <option value="saved">Saved only</option>
            </select>
          </div>
        </div>
      </div>

      <h3 class="pb-3 text-center admin-count">
        <span class="count-label">Pins</span>
        <span class="count-pill">{{ filteredPins.length }}</span>
      </h3>

      <div class="notes-grid-wrapper">
        <div v-if="loading" class="py-5 text-center text-muted">
          <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
          Loading saved ayat and pins...
        </div>
        <div v-else-if="error && !filteredPins.length" class="alert alert-warning mb-0">{{ error }}</div>
        <div v-else-if="!filteredPins.length" class="py-5 text-center text-muted">
          No pinned or saved ayat found.
        </div>

        <div v-else class="row">
          <div v-if="error" class="col-12 mb-3">
            <div class="alert alert-warning mb-0">{{ error }}</div>
          </div>
          <div class="col-md-4 mb-4" v-for="pin in filteredPins" :key="pin.key">
            <div class="note-card">
              <div class="note-chip">
                <i :class="pin.isPinned ? 'bi bi-pin-angle-fill' : 'bi bi-bookmark-star-fill'" class="me-1"></i>
                {{ pin.isPinned ? "Pinned Ayah" : "Saved Ayah" }}
              </div>
              <div class="note-title" v-html="highlightMatches(pin.referenceLabel)"></div>
              <div class="note-reference">
                <span>{{ displaySurahName(pin.surah_name) }}</span>
                <span v-if="pin.ayah_number"> • Ayah {{ pin.ayah_number }}</span>
                <span class="pin-source ms-auto">{{ pin.isPinned ? "Pinned" : "Saved" }}</span>
              </div>
              <div class="note-body" v-html="highlightMatches(pin.preview)"></div>
              <div class="note-meta">
                <span class="date">
                  <i class="bi bi-calendar3 me-1"></i>{{ extractDate(pin.sortDate) }}
                </span>
              </div>
              <div class="note-actions" role="group" aria-label="Pin actions">
                <button type="button" class="btn btn-icon btn-ghost" @click="viewModal(pin)" title="View"
                  aria-label="View pin">
                  <i class="bi bi-eye"></i>
                </button>
                <button type="button" class="btn btn-icon btn-success outline" @click="openInReader(pin)"
                  title="Open in Reader" aria-label="Open ayah in reader">
                  <i class="bi bi-box-arrow-up-right"></i>
                </button>
                <button type="button" class="btn btn-icon btn-ghost" @click="copyPinToClipboard(pin)"
                  title="Copy ayah" aria-label="Copy ayah">
                  <i class="bi bi-clipboard"></i>
                </button>
                <button type="button" class="btn btn-icon btn-ghost" @click="sharePinOnWhatsApp(pin)"
                  title="Share on WhatsApp" aria-label="Share on WhatsApp">
                  <i class="bi bi-whatsapp"></i>
                </button>
                <button type="button" class="btn btn-icon btn-danger outline" :disabled="isBusy(pin.key)"
                  @click="removePin(pin)" :title="removeActionTitle(pin)"
                  :aria-label="removeActionTitle(pin)">
                  <span v-if="isBusy(pin.key)" class="spinner-border spinner-border-sm"></span>
                  <i v-else :class="pin.isPinned ? 'bi bi-pin-angle' : 'bi bi-trash'"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <teleport to="body">
      <div class="modal fade" id="viewPin" tabindex="-1" aria-labelledby="viewPinLabel" aria-hidden="true"
        data-bs-backdrop="true">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-dark" id="viewPinLabel"><b>View Pin</b></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="container" v-if="selectedPin">
                <div class="mb-3">
                  <label class="form-label"><strong>Reference:</strong></label>
                  <p class="mt-2 text-dark text-left mb-1">{{ selectedPin.referenceLabel }}</p>
                  <small class="text-muted">{{ displaySurahName(selectedPin.surah_name) }} • Ayah {{
                    selectedPin.ayah_number }}</small>
                </div>
                <div class="mb-3" v-if="selectedPin.ayah_verse_ar">
                  <label class="form-label"><strong>Arabic:</strong></label>
                  <p class="mt-2 text-dark text-end quran-text">{{ selectedPin.ayah_verse_ar }}</p>
                </div>
                <div class="mb-3" v-if="selectedPin.ayah_verse_en">
                  <label class="form-label"><strong>Translation:</strong></label>
                  <p class="mt-2 text-dark text-left">{{ selectedPin.ayah_verse_en }}</p>
                </div>
                <div class="mb-3" v-if="!selectedPin.ayah_verse_ar && !selectedPin.ayah_verse_en">
                  <label class="form-label"><strong>Preview:</strong></label>
                  <p class="mt-2 text-dark text-left">{{ selectedPin.preview }}</p>
                </div>
                <div class="mb-3">
                  <label class="form-label"><strong>Saved/Pinned Date:</strong></label>
                  <p class="mt-2 text-dark text-left">{{ extractDate(selectedPin.sortDate) }}</p>
                </div>
              </div>
            </div>
            <div class="modal-footer flex-wrap gap-2">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { fetchUserIdFromApi } from "../../utils/bookmarkAuth";

const PINNED_AYAH_STORAGE_KEY_BASE = "ic_surat_pinned_ayahs";

export default {
  name: "PinsComponent",
  data() {
    return {
      pins: [],
      userId: null,
      query: "",
      sortBy: "newest",
      surahFilter: "all",
      scopeFilter: "all",
      loading: false,
      error: "",
      busy: {},
      selectedPin: null,
      bookmarkEventHandler: null,
      bookmarkStorageHandler: null,
    };
  },
  computed: {
    surahFilterOptions() {
      const set = new Set();
      this.pins.forEach((pin) => {
        const name = this.displaySurahName(pin.surah_name);
        if (name) set.add(name);
      });
      return Array.from(set).sort((a, b) => a.localeCompare(b));
    },
    filteredPins() {
      const query = String(this.query || "").trim().toLowerCase();
      let rows = [...this.pins];

      if (this.scopeFilter === "pinned") {
        rows = rows.filter((pin) => pin.isPinned);
      } else if (this.scopeFilter === "saved") {
        rows = rows.filter((pin) => pin.isSaved);
      }

      if (this.surahFilter !== "all") {
        const selected = this.surahFilter.toLowerCase();
        rows = rows.filter((pin) => this.displaySurahName(pin.surah_name).toLowerCase() === selected);
      }

      if (query) {
        rows = rows.filter((pin) => {
          const haystack = [
            pin.referenceLabel,
            pin.surah_name,
            pin.ayah_verse_ar,
            pin.ayah_verse_en,
            pin.preview,
          ]
            .map((value) => String(value || "").toLowerCase())
            .join(" ");
          return haystack.includes(query);
        });
      }

      rows.sort((a, b) => {
        const da = new Date(a.sortDate || 0).getTime();
        const db = new Date(b.sortDate || 0).getTime();
        return this.sortBy === "newest" ? db - da : da - db;
      });

      return rows;
    },
  },
  async mounted() {
    await this.initializeUser();
    this.bookmarkEventHandler = () => this.fetchPins();
    this.bookmarkStorageHandler = (event) => this.handleStorageUpdate(event);
    window.addEventListener("bookmarks-updated", this.bookmarkEventHandler);
    window.addEventListener("storage", this.bookmarkStorageHandler);
  },
  beforeUnmount() {
    if (this.bookmarkEventHandler) {
      window.removeEventListener("bookmarks-updated", this.bookmarkEventHandler);
    }
    if (this.bookmarkStorageHandler) {
      window.removeEventListener("storage", this.bookmarkStorageHandler);
    }
  },
  methods: {
    async initializeUser() {
      try {
        this.userId = await fetchUserIdFromApi();
      } catch (_) {
        this.userId = null;
      }
      await this.fetchPins();
    },
    handleStorageUpdate(event) {
      const scopedKey = this.getPinnedStorageKey();
      if (event.key === "bookmarkRefresh" || (scopedKey && event.key === scopedKey)) {
        this.fetchPins();
      }
    },
    buildAyahKey(surahNumber, ayahNumber) {
      const surah = Number(surahNumber || 0);
      const ayah = Number(ayahNumber || 0);
      return surah && ayah ? `${surah}:${ayah}` : "";
    },
    getPinnedStorageKey() {
      if (!this.userId) return "";
      return `${PINNED_AYAH_STORAGE_KEY_BASE}_user_${this.userId}`;
    },
    normalizePinnedEntries(raw) {
      if (!raw || typeof raw !== "object") return [];
      const source = Array.isArray(raw)
        ? raw.reduce((acc, item) => {
          if (!item || typeof item !== "object") return acc;
          const key = this.buildAyahKey(item.surahNumber, item.ayahNumber);
          if (key) acc[key] = item;
          return acc;
        }, {})
        : raw;

      return Object.entries(source)
        .map(([rawKey, value]) => {
          if (!value || typeof value !== "object") return null;
          const keyParts = String(rawKey || "").split(":");
          const surahNumber = Number(value.surahNumber || keyParts[0] || 0);
          const ayahNumber = Number(value.ayahNumber || keyParts[1] || 0);
          if (!surahNumber || !ayahNumber) return null;

          const localKey = this.buildAyahKey(surahNumber, ayahNumber);
          const translation = String(value.translation || "").trim();
          const text = String(value.text || "").trim();
          const preview = String(value.preview || translation || text || "").trim();
          const surahName = String(value.surahEnglishName || value.surahName || "").trim();
          return {
            localKey,
            key: localKey,
            surah_number: surahNumber,
            ayah_number: ayahNumber,
            surah_name: surahName || `Surah ${surahNumber}`,
            ayah_verse_ar: text,
            ayah_verse_en: translation,
            preview: preview || `Surah ${surahNumber}, Ayah ${ayahNumber}`,
            pinned_at: Number(value.pinnedAt || value.createdAt || 0) || null,
            isPinned: true,
            isSaved: false,
            id: null,
            created_at: null,
          };
        })
        .filter(Boolean);
    },
    loadPinnedEntriesFromStorage() {
      if (typeof window === "undefined") return [];
      const scopedKey = this.getPinnedStorageKey();
      if (!scopedKey) return [];
      try {
        const raw = localStorage.getItem(scopedKey);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return this.normalizePinnedEntries(parsed);
      } catch (_) {
        return [];
      }
    },
    normalizeSavedAyahs(rows) {
      return (rows || [])
        .map((row) => {
          const surahNumber = Number(row?.surah_number || row?.surahNumber || row?.ayah?.surah_id || 0);
          const ayahNumber = Number(row?.ayah_number || row?.ayah_num || row?.ayah?.ayah_id || 0);
          if (!surahNumber || !ayahNumber) return null;
          const key = this.buildAyahKey(surahNumber, ayahNumber);
          return {
            key,
            localKey: key,
            id: row?.id || null,
            surah_number: surahNumber,
            ayah_number: ayahNumber,
            surah_name: String(row?.surah_name || row?.surahName || `Surah ${surahNumber}`),
            ayah_verse_ar: String(row?.ayah_verse_ar || row?.ayah?.text || ""),
            ayah_verse_en: String(row?.ayah_verse_en || row?.ayah?.translation || ""),
            preview: this.pickPreview(row),
            created_at: row?.created_at || row?.createdAt || null,
            pinned_at: null,
            isPinned: false,
            isSaved: true,
          };
        })
        .filter(Boolean);
    },
    mergePinnedAndSaved(pinnedEntries, savedEntries) {
      const merged = new Map();

      savedEntries.forEach((entry) => {
        merged.set(entry.key, {
          ...entry,
          referenceLabel: `${entry.surah_number}:${entry.ayah_number} \u2022 ${this.displaySurahName(entry.surah_name)}`,
          sortDate: entry.created_at,
        });
      });

      pinnedEntries.forEach((entry) => {
        const existing = merged.get(entry.key);
        if (existing) {
          merged.set(entry.key, {
            ...existing,
            isPinned: true,
            pinned_at: entry.pinned_at,
            preview: entry.preview || existing.preview,
            ayah_verse_ar: entry.ayah_verse_ar || existing.ayah_verse_ar,
            ayah_verse_en: entry.ayah_verse_en || existing.ayah_verse_en,
            surah_name: entry.surah_name || existing.surah_name,
            sortDate: entry.pinned_at || existing.sortDate,
            referenceLabel: `${existing.surah_number}:${existing.ayah_number} \u2022 ${this.displaySurahName(
              entry.surah_name || existing.surah_name
            )}`,
          });
          return;
        }

        merged.set(entry.key, {
          ...entry,
          referenceLabel: `${entry.surah_number}:${entry.ayah_number} \u2022 ${this.displaySurahName(entry.surah_name)}`,
          sortDate: entry.pinned_at,
        });
      });

      return Array.from(merged.values());
    },
    async fetchPins() {
      this.loading = true;
      this.error = "";
      try {
        const { data } = await axios.get("/api/ayah-bookmarks");
        const savedRows = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
        const savedEntries = this.normalizeSavedAyahs(savedRows);
        const pinnedEntries = this.loadPinnedEntriesFromStorage();

        this.pins = this.mergePinnedAndSaved(pinnedEntries, savedEntries);
        if (!this.pins.some((item) => item.isPinned) && this.scopeFilter === "pinned") {
          this.scopeFilter = "all";
        }
      } catch (error) {
        this.error = error?.response?.data?.message || "Could not load pins right now.";
        this.pins = this.mergePinnedAndSaved(this.loadPinnedEntriesFromStorage(), []);
      } finally {
        this.loading = false;
      }
    },
    pickPreview(row) {
      const en = String(row?.ayah_verse_en || row?.ayah?.translation || "").replace(/\s+/g, " ").trim();
      const ar = String(row?.ayah_verse_ar || row?.ayah?.text || "").replace(/\s+/g, " ").trim();
      const source = en || ar;
      return source.length > 220 ? `${source.slice(0, 217).trimEnd()}...` : source;
    },
    stripHtmlTags(text) {
      if (!text) return "";
      const div = document.createElement("div");
      div.innerHTML = text;
      return div.textContent || div.innerText || "";
    },
    displaySurahName(name) {
      const cleaned = String(name || "")
        .replace(/^\s*\d+\s*[-\u2013\u2014]\s*/, "")
        .trim();
      return cleaned || String(name || "Surah");
    },
    extractDate(dateTimeString) {
      if (!dateTimeString) return "";
      try {
        const d = new Date(dateTimeString);
        if (!Number.isNaN(d.getTime())) {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          return `${y}-${m}-${day}`;
        }
      } catch (_) {
        // fallback
      }
      return String(dateTimeString).split("T")[0];
    },
    openInReader(pin) {
      const surah = Number(pin?.surah_number || 0);
      const ayah = Number(pin?.ayah_number || 0);
      if (!surah || !ayah) return;
      window.location.href = `/surat?surah=${surah}&ayah=${ayah}`;
    },
    viewModal(pin) {
      this.selectedPin = pin;
      this.$nextTick(() => {
        try {
          const modalEl = document.getElementById("viewPin");
          if (modalEl && window.bootstrap?.Modal) {
            const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
          }
        } catch (_) {
          // ignore bootstrap modal errors
        }
      });
    },
    composePinText(pin) {
      const surah = this.displaySurahName(pin?.surah_name);
      const ayahNumber = pin?.ayah_number ? `Ayah ${pin.ayah_number}` : "";
      const reference = [surah, ayahNumber].filter(Boolean).join(" • ");
      const arabic = this.stripHtmlTags(pin?.ayah_verse_ar || "");
      const translation = this.stripHtmlTags(pin?.ayah_verse_en || "");
      const preview = this.stripHtmlTags(pin?.preview || "");
      return [reference, arabic, translation, preview]
        .filter((part, idx, arr) => part && (idx < 2 || part !== arr[idx - 1]))
        .join("\n\n");
    },
    async copyPinToClipboard(pin) {
      const text = this.composePinText(pin);
      if (!text) return;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }
        Swal.fire({ icon: "success", title: "Copied to clipboard", timer: 1200, showConfirmButton: false });
      } catch (_) {
        Swal.fire({ icon: "error", title: "Unable to copy", timer: 1200, showConfirmButton: false });
      }
    },
    sharePinOnWhatsApp(pin) {
      const text = this.composePinText(pin);
      if (!text) return;
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener");
    },
    removeActionTitle(pin) {
      if (pin?.isPinned) return "Remove pin";
      return "Delete saved ayah";
    },
    isBusy(key) {
      return !!this.busy[key];
    },
    async removePin(pin) {
      if (!pin) return;
      const key = pin.key || `${pin.surah_number}:${pin.ayah_number}`;
      this.busy[key] = true;
      try {
        if (pin.isPinned) {
          await this.removeFromPinnedStorage(pin);
          await this.fetchPins();
          Swal.fire({ icon: "success", title: "Pin removed", timer: 1200, showConfirmButton: false });
          return;
        }

        if (pin.id) {
          const result = await Swal.fire({
            title: "Delete saved ayah?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#b00020",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Delete",
          });

          if (!result.isConfirmed) return;

          await axios.delete(`/api/ayah-bookmarks/${pin.id}`);
          await this.fetchPins();
          Swal.fire({ icon: "success", title: "Saved ayah deleted", timer: 1200, showConfirmButton: false });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error?.response?.data?.message || "Unable to remove item",
          timer: 1400,
          showConfirmButton: false,
        });
      } finally {
        this.busy[key] = false;
      }
    },
    async removeFromPinnedStorage(pin) {
      if (typeof window === "undefined") return;
      const scopedKey = this.getPinnedStorageKey();
      if (!scopedKey) return;

      const targetKey = String(pin?.localKey || pin?.key || "");
      if (!targetKey) return;

      try {
        const raw = localStorage.getItem(scopedKey);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const next = parsed.filter((item) => {
            const surahNumber = Number(item?.surahNumber || 0);
            const ayahNumber = Number(item?.ayahNumber || 0);
            return this.buildAyahKey(surahNumber, ayahNumber) !== targetKey;
          });
          localStorage.setItem(scopedKey, JSON.stringify(next));
          return;
        }

        if (parsed && typeof parsed === "object") {
          const next = { ...parsed };
          delete next[targetKey];
          localStorage.setItem(scopedKey, JSON.stringify(next));
        }
      } catch (_) {
        // ignore local storage parsing issues
      }
    },
    escapeHtml(value = "") {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    },
    escapeRegExp(value = "") {
      return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    },
    highlightMatches(text = "") {
      const escaped = this.escapeHtml(text);
      const query = String(this.query || "").trim();
      if (!query) {
        return escaped;
      }
      const regex = new RegExp(`(${this.escapeRegExp(query)})`, "gi");
      return escaped.replace(regex, '<mark class="search-highlight">$1</mark>');
    },
  },
};
</script>

<style scoped>
.admin-search {
  max-width: 460px;
  width: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), #eef8f4);
  border-radius: 28px;
  padding: 0.25rem 0.35rem;
  box-shadow: 0 15px 40px rgba(4, 120, 87, 0.15);
  border: 1px solid rgba(15, 110, 99, 0.14);
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.admin-search:focus-within {
  border-color: rgba(15, 110, 99, 0.6);
  transform: translateY(-1px);
}

.admin-search .input-group-text {
  background: transparent;
  border: none;
  color: #0f766e;
  font-size: 1.1rem;
}

.admin-search .form-control {
  border: none;
  background: transparent;
  box-shadow: none;
  font-size: 1rem;
  font-weight: 500;
  color: #0f172a;
  padding-left: 0;
  letter-spacing: 0.01em;
}

.admin-search .form-control::placeholder {
  color: #657483;
  opacity: 1;
  font-weight: 400;
}

.admin-search .form-control:focus {
  outline: none;
  box-shadow: none;
}

.search-toolbar-panel {
  border-radius: 30px;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(232, 245, 240, 0.95));
  border: 1px solid rgba(15, 110, 99, 0.18);
  box-shadow: 0 20px 50px rgba(4, 120, 87, 0.15);
  margin-bottom: 1.5rem;
}

.filters {
  margin-left: auto;
}

.admin-search-wrapper {
  flex: 1 1 320px;
  min-width: 450px;
}

.admin-count {
  font-size: 1.7rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  color: #0f2f23;
}

.count-pill {
  background: rgba(15, 118, 110, 0.12);
  padding: 0.2rem 0.85rem;
  border-radius: 999px;
  font-weight: 700;
  border: 1px solid rgba(15, 118, 110, 0.3);
}

.count-label {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: #526066;
}

.toolbar-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.toolbar-row .filters {
  margin-left: auto;
}

.note-card {
  position: relative;
  background: var(--admin-card);
  border: 1px solid var(--admin-border);
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: default;
  overflow: hidden;
}

.note-card:before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 18px;
  padding: 1px;
  background: linear-gradient(120deg, rgba(15, 110, 99, 0.35), rgba(15, 110, 99, 0) 45%, rgba(12, 92, 83, 0.18));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.notes-grid-wrapper {
  background: #fff;
  border-radius: 32px;
  padding: 2rem;
  border: 1px solid rgba(15, 110, 99, 0.15);
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.08);
  margin-bottom: 2rem;
}

.note-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
}

.note-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--admin-ink);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-reference {
  font-size: 0.85rem;
  color: var(--admin-muted);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.pin-source {
  background: rgba(15, 110, 99, 0.12);
  color: var(--admin-accent-strong);
  border: 1px solid rgba(15, 110, 99, 0.3);
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 3px 8px;
  text-transform: uppercase;
}

.note-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(15, 110, 99, 0.12);
  color: var(--admin-accent-strong);
  border: 1px solid rgba(15, 110, 99, 0.3);
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 4px 10px;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.note-body {
  color: var(--admin-ink);
  min-height: 96px;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  color: var(--admin-muted);
  font-size: 0.85rem;
}

.note-actions {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 12px;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.search-highlight {
  background: rgba(15, 110, 99, 0.15);
  color: #0f6e63;
  padding: 1px 4px;
  border-radius: 4px;
}

.btn-icon {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.btn-icon:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.12);
}

.btn-icon:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-success.outline {
  background: #fff !important;
  color: var(--admin-accent-strong) !important;
  border: 1px solid rgba(15, 110, 99, 0.5) !important;
  box-shadow: none;
}

.btn-success.outline:hover:not(:disabled) {
  background: rgba(15, 110, 99, 0.12) !important;
  color: var(--admin-accent-strong) !important;
}

.btn-danger.outline {
  background: #fff !important;
  color: #b42318 !important;
  border: 1px solid rgba(180, 35, 24, 0.5) !important;
  box-shadow: none;
}

.btn-danger.outline:hover:not(:disabled) {
  background: rgba(180, 35, 24, 0.1) !important;
  color: #b42318 !important;
}

.btn-ghost {
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.12);
  color: var(--admin-ink);
}

.btn-ghost:hover {
  background: #f7fbfa;
  border-color: rgba(15, 110, 99, 0.3);
  color: var(--admin-accent-strong);
}

.quran-text {
  line-height: 2;
  font-size: 1.15rem;
}

@media (max-width: 992px) {
  .admin-search-wrapper {
    min-width: 100%;
  }
}

@media (max-width: 768px) {
  .notes-grid-wrapper {
    padding: 1rem;
    border-radius: 20px;
  }
}
</style>
