<template>
  <section
    ref="cardEl"
    class="mission-map-card"
    :class="{
      'mission-map-card--fullscreen': isFullscreen || isFullscreenFallback,
    }"
    aria-labelledby="mission-map-heading"
  >
    <header class="mission-map-card__header">
      <div class="mission-map-card__copy">
        <p class="mission-map-card__eyebrow">Seerah Geography</p>
        <h3 id="mission-map-heading" class="mission-map-card__title">Mission Map</h3>
        <p class="mission-map-card__subtitle">
          Timeline events mapped to key locations from Makkah to Madinah.
        </p>
      </div>
      <div class="mission-map-card__meta">
        <div class="mission-map-card__controls" role="group" aria-label="Map display controls">
          <button
            class="mission-map-card__icon-btn"
            type="button"
            :title="isMapVisible ? 'Hide map' : 'Show map'"
            :aria-label="isMapVisible ? 'Hide map' : 'Show map'"
            :aria-pressed="isMapVisible ? 'true' : 'false'"
            @click="toggleMapVisibility"
          >
            <svg v-if="isMapVisible" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M2 12s3.7-6 10-6 10 6 10 6-3.7 6-10 6-10-6-10-6Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="12" cy="12" r="2.6" fill="none" stroke="currentColor" stroke-width="1.9" />
            </svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M2 12s3.7-6 10-6c2.2 0 4.1.7 5.7 1.7M22 12s-3.7 6-10 6c-2.2 0-4.1-.7-5.7-1.7" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M4 4 20 20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" />
            </svg>
          </button>

          <button
            class="mission-map-card__icon-btn"
            type="button"
            :title="isFullscreen || isFullscreenFallback ? 'Exit full screen' : 'Open full screen'"
            :aria-label="isFullscreen || isFullscreenFallback ? 'Exit full screen' : 'Open full screen'"
            :aria-pressed="isFullscreen || isFullscreenFallback ? 'true' : 'false'"
            :disabled="!isMapVisible"
            @click="toggleFullscreen"
          >
            <svg v-if="!(isFullscreen || isFullscreenFallback)" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M9 9H4V4M15 9h5V4M9 15H4v5M15 15h5v5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <div v-show="isMapVisible">
      <div ref="mapEl" class="mission-map-card__canvas"></div>
      <div v-if="loading" class="mission-map-card__state" role="status">
        Loading location data...
      </div>
      <div v-else-if="!points.length" class="mission-map-card__state" role="status">
        No mapped locations are available right now.
      </div>

      <p class="mission-map-card__note">
        {{ error || "Select a map marker to jump to its timeline event." }}
      </p>
    </div>
  </section>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DEFAULT_CENTER = [23.8859, 45.0792];
const DEFAULT_ZOOM = 8;
const DETAIL_ZOOM = 12;
const TERRAIN_TILE_URL = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
const TERRAIN_TILE_ATTRIBUTION = 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)';

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default {
  name: 'SeerahMapComponent',
  props: {
    points: {
      type: Array,
      default: () => [],
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
  },
  emits: ['point-selected'],
  data() {
    return {
      map: null,
      markers: [],
      markerByEventIndex: new Map(),
      isMapVisible: true,
      isFullscreen: false,
      isFullscreenFallback: false,
      invalidateTimer: null,
    };
  },
  mounted() {
    this.initMap();
    this.renderPoints();
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.onFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.onFullscreenChange);
    window.addEventListener('resize', this.invalidateMap);
  },
  beforeUnmount() {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.onFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.onFullscreenChange);
    window.removeEventListener('resize', this.invalidateMap);
    this.clearInvalidateTimer();
    this.isFullscreenFallback = false;
    document.body.classList.remove('mission-map-fullscreen-open');
    this.destroyMap();
  },
  watch: {
    points: {
      handler() {
        this.renderPoints();
      },
      deep: true,
    },
    loading(newValue) {
      if (!newValue) {
        this.$nextTick(() => {
          this.initMap();
          this.renderPoints();
        });
      }
    },
    activeIndex() {
      this.updateActiveMarker(true);
    },
  },
  methods: {
    clearInvalidateTimer() {
      if (this.invalidateTimer) {
        clearTimeout(this.invalidateTimer);
        this.invalidateTimer = null;
      }
    },
    scheduleInvalidate() {
      this.clearInvalidateTimer();
      this.$nextTick(() => {
        requestAnimationFrame(() => {
          this.invalidateMap();
          this.invalidateTimer = setTimeout(() => {
            this.invalidateMap();
          }, 250);
        });
      });
    },
    getFullscreenElement() {
      return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        null
      );
    },
    requestFullscreen(target) {
      const fn =
        target.requestFullscreen ||
        target.webkitRequestFullscreen ||
        target.msRequestFullscreen;
      return typeof fn === 'function' ? fn.call(target) : null;
    },
    exitFullscreenMode() {
      const fn =
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen;
      return typeof fn === 'function' ? fn.call(document) : null;
    },
    enableFullscreenFallback() {
      this.isFullscreenFallback = true;
      document.body.classList.add('mission-map-fullscreen-open');
      this.scheduleInvalidate();
    },
    disableFullscreenFallback() {
      this.isFullscreenFallback = false;
      document.body.classList.remove('mission-map-fullscreen-open');
      this.scheduleInvalidate();
    },
    onFullscreenChange() {
      const card = this.$refs.cardEl;
      this.isFullscreen = !!card && this.getFullscreenElement() === card;
      this.scheduleInvalidate();
    },
    toggleMapVisibility() {
      this.isMapVisible = !this.isMapVisible;
      if (!this.isMapVisible && (this.isFullscreen || this.isFullscreenFallback)) {
        this.toggleFullscreen();
      }
      this.scheduleInvalidate();
    },
    async toggleFullscreen() {
      if (!this.isMapVisible) return;
      const card = this.$refs.cardEl;
      if (!card) return;

      const fullscreenElement = this.getFullscreenElement();
      const isCardInFullscreen = fullscreenElement === card;

      if (isCardInFullscreen || this.isFullscreenFallback) {
        if (isCardInFullscreen) {
          try {
            await this.exitFullscreenMode();
          } catch (_) {
            // Ignore and fallback to local fullscreen state reset.
          }
        }
        this.disableFullscreenFallback();
        return;
      }

      const supportsNativeFullscreen = typeof (
        card.requestFullscreen ||
        card.webkitRequestFullscreen ||
        card.msRequestFullscreen
      ) === 'function';

      if (!supportsNativeFullscreen) {
        this.enableFullscreenFallback();
        return;
      }

      try {
        const maybePromise = this.requestFullscreen(card);
        if (maybePromise && typeof maybePromise.catch === 'function') {
          await maybePromise.catch(() => {
            this.enableFullscreenFallback();
          });
        }
      } catch (_) {
        this.enableFullscreenFallback();
      } finally {
        this.scheduleInvalidate();
      }
    },
    getHistoricalContext(point) {
      const text = `${point?.title || ''} ${point?.locationName || ''}`.toLowerCase();
      if (/(madinah|medina|nabawi|quba|yathrib)/.test(text)) {
        return 'Historical context: Madinah was known as Yathrib before Hijrah.';
      }
      if (/(makkah|mecca|kaaba|hira|safa|shi b|fath)/.test(text)) {
        return 'Historical context: Makkah (Bakkah in early sources) was Arabia\'s sanctuary and trade center.';
      }
      if (/(jerusalem|aqsa|bayt al|isra|miraj)/.test(text)) {
        return 'Historical context: Jerusalem was known as Bayt al-Maqdis (Iliya in late antiquity).';
      }
      if (/(badr)/.test(text)) {
        return 'Historical context: Badr sat on a major caravan route southwest of Madinah.';
      }
      if (/(uhud)/.test(text)) {
        return 'Historical context: Uhud is the volcanic ridge north of Madinah.';
      }
      if (/(hudaybiyyah|hudaibiyah)/.test(text)) {
        return 'Historical context: Hudaybiyyah marked a key approach between Makkah and the coast.';
      }
      if (/(khaybar)/.test(text)) {
        return 'Historical context: Khaybar was a fortified oasis zone north of Madinah.';
      }
      if (/(tabuk)/.test(text)) {
        return 'Historical context: Tabuk was a strategic northern frontier corridor.';
      }
      if (/(ta if|taif|hunayn|arafat|mina)/.test(text)) {
        return 'Historical context: This site sat on key Hijaz movement routes around Makkah.';
      }
      return 'Historical context: This location was part of the wider Hijaz mission landscape.';
    },
    getEmojiForPoint(point) {
      const text = `${point?.title || ''} ${point?.year || ''} ${point?.locationName || ''}`.toLowerCase();
      if (/(birth|born|halima|childhood|shepherd)/.test(text)) return '👣';
      if (/(mother passes|year of sorrow|abu talib|passing|death|highest companion)/.test(text)) return '🕊️';
      if (/(marriage|khadijah)/.test(text)) return '💠';
      if (/(revelation|iqra|quran|read|private|public call|da wah|dawah)/.test(text)) return '📜';
      if (/(isra|miraj|night journey|aqsa|jerusalem)/.test(text)) return '🌌';
      if (/(hijrah|migration)/.test(text)) return '🐪';
      if (/(masjid|mosque|nabawi|quba)/.test(text)) return '🕌';
      if (/(battle|badr|uhud|trench|khandaq|hunayn|khaybar|expedition|tabuk)/.test(text)) return '🛡️';
      if (/(treaty|hudaybiyyah|peace|delegations|letters|constitution|brotherhood)/.test(text)) return '⚖️';
      if (/(hajj|pilgrimage|farewell|kaaba|makkah|mecca)/.test(text)) return '🕋';
      if (/(passing|death|return to the highest companion)/.test(text)) return '🕊️';
      return '🧭';
    },
    createMarkerIcon(point, isActive) {
      const emoji = this.getEmojiForPoint(point);
      return L.divIcon({
        className: isActive ? 'seerah-map-pin seerah-map-pin--active' : 'seerah-map-pin',
        html: `<span class="seerah-map-pin__emoji" aria-hidden="true">${emoji}</span>`,
        iconSize: isActive ? [44, 44] : [38, 38],
        iconAnchor: isActive ? [22, 22] : [19, 19],
        popupAnchor: [0, -12],
      });
    },
    spreadOverlappingPoints(points) {
      const groups = new Map();
      points.forEach((point) => {
        const key = `${Number(point.lat).toFixed(5)},${Number(point.lng).toFixed(5)}`;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(point);
      });

      const expanded = [];
      groups.forEach((group) => {
        if (group.length === 1) {
          expanded.push(group[0]);
          return;
        }

        const baseLat = Number(group[0].lat);
        const baseLng = Number(group[0].lng);
        const baseLngFactor = Math.max(Math.cos((baseLat * Math.PI) / 180), 0.2);
        const ringSize = group.length;
        // Keep offsets tiny so points remain geographically accurate while avoiding exact overlap.
        const ringRadiusMeters = Math.min(120, 40 + ringSize * 8);

        group.forEach((point, index) => {
          const angle = (2 * Math.PI * index) / ringSize;
          const latOffset = (ringRadiusMeters / 111320) * Math.sin(angle);
          const lngOffset = (ringRadiusMeters / (111320 * baseLngFactor)) * Math.cos(angle);
          expanded.push({
            ...point,
            _displayLat: baseLat + latOffset,
            _displayLng: baseLng + lngOffset,
          });
        });
      });

      return expanded;
    },
    initMap() {
      if (!this.$refs.mapEl || this.map) return;
      this.map = L.map(this.$refs.mapEl, {
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: true,
        zoomAnimation: true,
        fadeAnimation: false,
        markerZoomAnimation: false,
        inertia: true,
        inertiaDeceleration: 2800,
        inertiaMaxSpeed: 1800,
        zoomSnap: 0.5,
        zoomDelta: 0.5,
        wheelPxPerZoomLevel: 130,
        worldCopyJump: true,
      });
      this.map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      L.tileLayer(TERRAIN_TILE_URL, {
        maxZoom: 18,
        maxNativeZoom: 17,
        detectRetina: true,
        attribution: TERRAIN_TILE_ATTRIBUTION,
      }).addTo(this.map);
    },
    destroyMap() {
      this.markers = [];
      this.markerByEventIndex = new Map();
      if (!this.map) return;
      this.map.off();
      this.map.remove();
      this.map = null;
    },
    invalidateMap() {
      if (!this.map) return;
      this.map.invalidateSize({ pan: false });
    },
    clearMarkers() {
      this.markers.forEach(({ marker }) => marker.remove());
      this.markers = [];
      this.markerByEventIndex = new Map();
    },
    renderPoints() {
      if (!this.map) return;
      this.clearMarkers();

      const validPoints = (this.points || []).filter((point) =>
        Number.isFinite(Number(point.lat)) &&
        Number.isFinite(Number(point.lng))
      );

      if (!validPoints.length) {
        this.map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
        this.invalidateMap();
        return;
      }

      const displayPoints = this.spreadOverlappingPoints(validPoints);
      const bounds = L.latLngBounds([]);
      displayPoints.forEach((point) => {
        const lat = Number(point._displayLat ?? point.lat);
        const lng = Number(point._displayLng ?? point.lng);
        const isActive = point.eventIndex === this.activeIndex;
        const marker = L.marker([lat, lng], {
          icon: this.createMarkerIcon(point, isActive),
          keyboard: true,
          title: point.title || 'Seerah event',
        }).addTo(this.map);

        const popupLines = [];
        if (point.title) popupLines.push(escapeHtml(point.title));
        if (point.year) popupLines.push(escapeHtml(point.year));
        if (point.locationName) popupLines.push(escapeHtml(point.locationName));
        popupLines.push(`<span class="seerah-map-popup__context">${escapeHtml(this.getHistoricalContext(point))}</span>`);
        marker.bindPopup(popupLines.join('<br>'));

        marker.on('click', () => {
          if (typeof point.eventIndex === 'number') {
            this.$emit('point-selected', point.eventIndex);
          }
        });

        this.markers.push({ marker, point });
        if (
          typeof point.eventIndex === 'number' &&
          !this.markerByEventIndex.has(point.eventIndex)
        ) {
          this.markerByEventIndex.set(point.eventIndex, marker);
        }
        bounds.extend([lat, lng]);
      });

      if (displayPoints.length === 1) {
        const only = displayPoints[0];
        this.map.setView([Number(only._displayLat ?? only.lat), Number(only._displayLng ?? only.lng)], DETAIL_ZOOM);
      } else {
        this.map.fitBounds(bounds.pad(0.11), { maxZoom: 10, animate: true, duration: 0.75 });
      }

      this.invalidateMap();
      this.updateActiveMarker(true);
    },
    updateActiveMarker(shouldPan) {
      if (!this.map || !this.markers.length) return;

      this.markers.forEach(({ marker, point }) => {
        const isActive = point.eventIndex === this.activeIndex;
        marker.setIcon(this.createMarkerIcon(point, isActive));
      });

      const activeMarker = this.markerByEventIndex.get(this.activeIndex);
      if (!activeMarker || !shouldPan) return;
      const currentZoom = Math.max(this.map.getZoom(), DETAIL_ZOOM);
      this.map.flyTo(activeMarker.getLatLng(), currentZoom, { duration: 0.6, easeLinearity: 0.25, noMoveStart: true });
    },
  },
};
</script>

<style scoped>
.mission-map-card {
  border-radius: 22px;
  border: 1px solid rgba(11, 128, 111, 0.2);
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.98), rgba(244, 248, 246, 0.95));
  box-shadow: 0 18px 36px rgba(15, 41, 32, 0.12);
  overflow: hidden;
}

.mission-map-card__header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1rem 0.25rem;
  align-items: flex-start;
}

.mission-map-card__meta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.mission-map-card__copy {
  min-width: 0;
}

.mission-map-card__eyebrow {
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(11, 102, 95, 0.9);
}

.mission-map-card__title {
  margin: 0.2rem 0 0.2rem;
  font-size: clamp(1.2rem, 2vw, 1.45rem);
  color: #13231f;
}

.mission-map-card__subtitle {
  margin: 0;
  color: #4b5563;
  font-size: 0.95rem;
}

.mission-map-card__controls {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.mission-map-card__icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(11, 128, 111, 0.26);
  background: rgba(255, 255, 255, 0.88);
  color: #0f5a4f;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.mission-map-card__icon-btn svg {
  width: 18px;
  height: 18px;
}

.mission-map-card__icon-btn:hover,
.mission-map-card__icon-btn:focus-visible {
  background: #ffffff;
  color: #0a4a41;
  transform: translateY(-1px);
  box-shadow: 0 8px 16px rgba(15, 41, 32, 0.16);
}

.mission-map-card__icon-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.mission-map-card__canvas {
  height: clamp(300px, 56vh, 640px);
  margin: 0.65rem 0.9rem 0.65rem;
  border-radius: 16px;
  border: 1px solid rgba(11, 128, 111, 0.2);
  overflow: hidden;
  transition: height 220ms ease;
}

.mission-map-card--fullscreen {
  width: 100%;
  height: 100%;
  border-radius: 0;
  border: none;
  box-shadow: none;
}

.mission-map-card--fullscreen .mission-map-card__header {
  padding: 0.85rem 0.95rem 0.35rem;
}

.mission-map-card--fullscreen .mission-map-card__canvas {
  height: calc(100vh - 172px);
  margin-inline: 0.95rem;
}

:global(body.mission-map-fullscreen-open) {
  overflow: hidden;
}

.mission-map-card.mission-map-card--fullscreen {
  position: fixed;
  inset: 0;
  z-index: 3000;
  background: linear-gradient(160deg, #fdfefe, #f4f8f6);
}

.mission-map-card__state {
  margin: 0.65rem 0.9rem 0.65rem;
  padding: 1rem;
  border-radius: 14px;
  border: 1px dashed rgba(11, 128, 111, 0.25);
  background: rgba(255, 255, 255, 0.78);
  color: #0f3d37;
  font-weight: 600;
}

.mission-map-card__note {
  margin: 0 1rem 0.95rem;
  font-size: 0.85rem;
  color: #4b5563;
}

:deep(.leaflet-control-zoom a) {
  border-radius: 10px;
  color: #124a43;
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 12px;
}

:deep(.seerah-map-popup__context) {
  display: inline-block;
  margin-top: 0.2rem;
  color: #4b5563;
  font-size: 0.8rem;
  line-height: 1.35;
}

:deep(.seerah-map-pin) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 20%, #fffef8 0%, #f7edd8 70%, #eedab8 100%);
  border: 2px solid rgba(114, 82, 36, 0.68);
  box-shadow: 0 5px 16px rgba(15, 41, 32, 0.24);
  transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
}

:deep(.seerah-map-pin:hover) {
  transform: translateY(-1px) scale(1.04);
  box-shadow: 0 8px 18px rgba(15, 41, 32, 0.28);
}

:deep(.seerah-map-pin__emoji) {
  font-size: 1.02rem;
  line-height: 1;
  transform: translateY(0.2px);
}

:deep(.seerah-map-pin--active) {
  width: 44px;
  height: 44px;
  border: 2px solid rgba(180, 93, 25, 0.95);
  box-shadow: 0 0 0 6px rgba(230, 163, 50, 0.28), 0 8px 20px rgba(15, 41, 32, 0.32);
  z-index: 3000 !important;
}

@media (max-width: 767px) {
  .mission-map-card__header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
