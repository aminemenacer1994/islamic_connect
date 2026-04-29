require("./bootstrap");
import { createApp, defineAsyncComponent } from "vue";
import { Form } from "vform";
import swal from "sweetalert2";
import PrimeVue from "primevue/config";
import { ref, onMounted } from 'vue';

// Removed session milestone tracking

const DARK_MODE_STORAGE_KEY = 'darkMode';
const IS_DEV = process.env.NODE_ENV !== 'production';

const prefersDarkColorScheme = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const resolveInitialDarkMode = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    const storedMode = window.localStorage.getItem(DARK_MODE_STORAGE_KEY);
    if (storedMode === null) {
      return prefersDarkColorScheme();
    }
    return storedMode === 'true';
  } catch (_) {
    return prefersDarkColorScheme();
  }
};

const applyGlobalThemePreference = (isDarkMode) => {
  if (typeof document === 'undefined') {
    return;
  }
  if (!document.body) {
    return;
  }
  const body = document.body;
  if (
    !body.classList.contains('home-route-page') &&
    !body.classList.contains('surat-route-page') &&
    !body.classList.contains('radio-route-page') &&
    !body.classList.contains('islamic-blog-route-page')
  ) {
    return;
  }
  const theme = isDarkMode ? 'dark' : 'light';
  const root = document.documentElement;
  const RADIO_BG = '#232529';

  if (root) {
    root.classList.toggle('dark-mode', !!isDarkMode);
    root.setAttribute('data-bs-theme', theme);
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
  }

  if (body) {
    body.classList.toggle('dark-mode', !!isDarkMode);
    if (body.classList.contains('surat-route-page')) {
      body.classList.toggle('surat-page-shell-dark', !!isDarkMode);
    }
    body.setAttribute('data-bs-theme', theme);
    body.setAttribute('data-theme', theme);
    body.style.colorScheme = theme;
  }

  if (body && body.classList.contains('radio-route-page')) {
    if (root) root.style.backgroundColor = isDarkMode ? RADIO_BG : '';
    body.style.backgroundColor = isDarkMode ? RADIO_BG : '';
  }
};

const app = createApp({
  setup() {
    const isAuthenticated = ref(!!document.querySelector('meta[name="user"]'));
    onMounted(() => {
        isAuthenticated.value = !!document.querySelector('meta[name="user"]');
    });
    return { isAuthenticated };
  },
  data() {
    return {
      darkModeState: {
        isDarkMode: resolveInitialDarkMode(),
        setDarkMode: this.setDarkMode, // Method to update dark mode state
      },
    };
  },
  created() {
    if (typeof window !== 'undefined' && window.IC_THEME && typeof window.IC_THEME.getTheme === 'function') {
      this.darkModeState.isDarkMode = window.IC_THEME.getTheme() === 'dark';
      return;
    }
    applyGlobalThemePreference(this.darkModeState.isDarkMode);
  },
  mounted() {
    if (typeof window !== 'undefined' && window.IC_THEME && typeof window.IC_THEME.getTheme === 'function') {
      this.darkModeState.isDarkMode = window.IC_THEME.getTheme() === 'dark';
      window.addEventListener('ic-theme-change', this.syncDarkModeStateFromEvent);
      return;
    }
    applyGlobalThemePreference(this.darkModeState.isDarkMode);
    if (typeof window !== 'undefined') {
      window.addEventListener('ic-theme-change', this.syncDarkModeStateFromEvent);
    }
  },
  methods: {
    syncDarkModeStateFromEvent(event) {
      const nextValue = !!event?.detail?.isDark;
      this.darkModeState.isDarkMode = nextValue;
      applyGlobalThemePreference(nextValue);
    },
    setDarkMode(isDarkMode) {
      const nextValue = !!isDarkMode;
      const theme = nextValue ? 'dark' : 'light';
      this.darkModeState.isDarkMode = nextValue;
      // Prefer the global theme helper from the layout when available (keeps
      // Home/Radio/Surat theme behavior consistent and dispatches the same event).
      try {
        if (window.IC_THEME && typeof window.IC_THEME.setTheme === 'function') {
          window.IC_THEME.setTheme(theme);
          return;
        }
      } catch (_) {}

      applyGlobalThemePreference(nextValue);
      try { window.localStorage.setItem(DARK_MODE_STORAGE_KEY, String(nextValue)); } catch (_) {}
      try { window.localStorage.setItem('suratThemeMode', theme); } catch (_) {}
      try { window.localStorage.setItem('radioThemeMode', theme); } catch (_) {}
      try {
        window.dispatchEvent(new CustomEvent('ic-theme-change', { detail: { theme, isDark: nextValue } }));
      } catch (_) {}
    },
    // Removed startSessionMilestones method
  },
  provide() {
    // Provide the dark mode state to all child components
    return {
      darkModeState: this.darkModeState,
    };
  },
});



window.Form = Form;
window.Swal = swal;


app.use(PrimeVue);

const installOptionalRoutePlugins = async () => {
  const stripeKey =
    document.querySelector('meta[name="stripe-key"]')?.getAttribute('content') ||
    process.env.MIX_STRIPE_PUBLISHABLE_KEY ||
    "";
  if (!stripeKey) {
    return;
  }

  try {
    const stripeModule = await import('vue-stripe-elements-plus');
    const StripePlugin =
      stripeModule?.StripePlugin || stripeModule?.default || stripeModule;
    if (
      StripePlugin &&
      (typeof StripePlugin === 'function' || typeof StripePlugin.install === 'function')
    ) {
      app.use(StripePlugin, { key: stripeKey });
    } else if (IS_DEV) {
      console.log('[Stripe] Plugin not compatible with current Vue build; skipping');
    }
  } catch (e) {
    if (IS_DEV) {
      console.debug('[Stripe] Skipped plugin registration:', e?.message || e);
    }
  }
};

const asyncComponentLoaders = {
  "Column": () => import("primevue/column"),
  "DataTable": () => import("primevue/datatable"),
  "Button": () => import("primevue/button"),
  "Dropdown": () => import("primevue/dropdown"),
  "InputText": () => import("primevue/inputtext"),
  "AccordionTab": () => import("primevue/accordiontab"),
  "Accordion": () => import("primevue/accordion"),
  "Card": () => import("primevue/card"),
  "TabView": () => import("primevue/tabview"),
  "TabPanel": () => import("primevue/tabpanel"),
  "ListBox": () => import("primevue/listbox"),
  "Fieldset": () => import("primevue/fieldset"),
  "Panel": () => import("primevue/panel"),
  "Dialog": () => import("primevue/dialog"),
  "Image": () => import("primevue/image"),
  "Editor": () => import("primevue/editor"),
  "subscription-component": () => import("./components/SubscriptionComponent.vue"),
  "dark-mode-toggle": () => import("./components/DarkModeToggle.vue"),
  "users-component": () => import("./components/admin_panels/UsersComponent.vue"),
  "mailing-list-component": () => import("./components/admin_panels/MailingListComponent.vue"),
  "feedback-component": () => import("./components/admin_panels/FeedbackComponent.vue"),
  "payment-component": () => import("./components/admin_panels/PaymentComponent.vue"),
  "donation-component": () => import("./components/admin_panels/DonationComponent.vue"),
  "profile-component": () => import("./components/admin_panels/ProfileComponent.vue"),
  "dashboard-component": () => import("./components/admin_panels/DashboardComponent.vue"),
  "ai-reports-component": () => import("./components/admin_panels/AiReportsComponent.vue"),
  "homepage-component": () => import("./components/HomepageComponent.vue"),
  "pricing-component": () => import("./components/PricingComponent.vue"),
  "contact-component": () => import("./components/ContactComponent.vue"),
  "charity-component": () => import("./components/CharityComponent.vue"),
  "volunteer-component": () => import("./components/VolunteerComponent.vue"),
  "digital-library-component": () => import("./components/DigitalLibraryComponent.vue"),
  "ahadith-component": () => import("./components/AhadithComponent.vue"),
  "correction-component": () => import("./components/admin_panels/CorrectionComponent.vue"),
  "quran-component": () => import("./components/QuranComponent.vue"),
  "about-component": () => import("./components/AboutComponent.vue"),
  "about-us-component": () => import("./components/AboutUsComponent.vue"),
  "bookmark-component": () => import("./components/admin_panels/BookmarkComponent.vue"),
  "playlist-component": () => import("./components/admin_panels/PlaylistComponent.vue"),
  "pins-component": () => import("./components/admin_panels/PinsComponent.vue"),
  "updates-component": () => import("./components/UpdatesComponent.vue"),
  "join_us-component": () => import("./components/JoinUsComponent.vue"),
  "notes-component": () => import("./components/admin_panels/NotesComponent.vue"),
  "group-notes-component": () => import("./components/admin_panels/GroupNotesComponent.vue"),
  "mission-component": () => import("./components/MissionComponent.vue"),
  "access-component": () => import("./components/AccessComponent.vue"),
  "content-component": () => import("./components/ContentComponent.vue"),
  "surat-component": () => import("./components/SuratComponent.vue"),
  "review-queue-component": () => import("./components/ReviewQueueComponent.vue"),
  "search-component": () => import("./components/surah_selection/CustomSurahSelection.vue"),
  "surah-list-component": () => import("./components/search/SurahList.vue"),
  "donations-component": () => import("./components/intro/Donation.vue"),
  "collection-component": () => import("./components/admin_panels/CollectionComponent.vue"),
  "TinymceEditor": () => import("./components/tinymce/TinymceEditor.vue"),
  "faq-component": () => import("./components/FaqComponent.vue"),
  "support-component": () => import("./components/SupportComponent.vue"),
  "dua-component": () => import("./components/DuaComponent.vue"),
  "radio-component": () => import("./components/RadioComponent.vue"),
  "guide-component": () => import("./components/GuideComponent.vue"),
  "streaming-component": () => import("./components/StreamingComponent.vue"),
  "toolkit-component": () => import("./components/ToolkitComponent.vue"),
  "video-component": () => import("./components/VideoComponent.vue"),
  "zakat-component": () => import("./components/ZakatComponent.vue"),
  "qibla-component": () => import("./components/QiblaComponent.vue"),
  "mosque-component": () => import("./components/MosqueComponent.vue"),
  "calendar-component": () => import("./components/CalendarComponent.vue"),
  "date-component": () => import("./components/DateComponent.vue"),
  "hadith-component": () => import("./components/HadithComponent.vue"),
  "shop-component": () => import("./components/ShopComponent.vue"),
  "tasbeeh-component": () => import("./components/TasbeehComponent.vue"),
  "athkar-component": () => import("./components/AthkarComponenet.vue"),
  "finance-component": () => import("./components/FinanceComponent.vue"),
  "umrah-component": () => import("./components/UmrahComponent.vue"),
  "name-component": () => import("./components/NameComponent.vue"),
  "prayer-component": () => import("./components/PrayerComponent.vue"),
  "travel-component": () => import("./components/TravelComponent.vue"),
  "media-component": () => import("./components/MediaComponent.vue"),
  "knowledge-component": () => import("./components/KnowledgeComponent.vue"),
  "services-component": () => import("./components/ServicesComponent.vue"),
  "store-component": () => import("./components/StoreComponent.vue"),
  "food-component": () => import("./components/FoodComponent.vue"),
  "school-component": () => import("./components/SchoolComponent.vue"),
  "welfare-component": () => import("./components/WelfareComponent.vue"),
  "books-component": () => import("./components/BooksComponent.vue"),
  "convert-component": () => import("./components/ConvertComponent.vue"),
  "holy-component": () => import("./components/HolyComponent.vue"),
  "history-component": () => import("./components/HistoryComponent.vue"),
  "payment-methods-component": () => import("./components/PaymentMethodsComponent.vue"),
  "read-component": () => import("./components/ReadComponent.vue"),
  "islamic-blog-component": () => import("./components/IslamicBlogComponent.vue"),
  "revert-component": () => import("./components/RevertComponent.vue"),
  "muslim-component": () => import("./components/MuslimComponent.vue"),
  "bookmark-manager": () => import("./components/bookmarks/BookmarkManager.vue"),
  "shared-folder-view": () => import("./components/bookmarks/SharedFolderView.vue"),
  "resources-component": () => import("./components/ResourcesComponent.vue"),
  "ramadan-2026-component": () => import("./components/Ramadan2026Component.vue"),
  "hajj-component": () => import("../components/vue/HajjComponent.vue"),
  "ai-component": () => import("./components/AiComponent.vue"),
  "islam-component": () => import("./components/IslamComponent.vue"),
  "youth-component": () => import("./components/YouthComponent.vue"),
  "parenting-component": () => import("./components/ParentingComponent.vue"),

};

const registerAsyncComponent = (name, loader) => {
  app.component(
    name,
    defineAsyncComponent({
      loader: () => loader().then((module) => module?.default || module),
      suspensible: false,
      delay: 150,
      timeout: 30000,
    })
  );
};

Object.entries(asyncComponentLoaders).forEach(([name, loader]) => registerAsyncComponent(name, loader));

const mountApp = async () => {
  await installOptionalRoutePlugins();
  const target = document.getElementById('app');
  if (!target) {
    if (IS_DEV) {
      console.warn('[Vue] mount target #app not found yet; retrying after DOMContentLoaded');
    }
    document.addEventListener('DOMContentLoaded', () => {
      const t2 = document.getElementById('app');
      if (t2) {
        app.mount('#app');
      } else {
        console.error('[Vue] mount failed: #app missing on DOMContentLoaded');
      }
    }, { once: true });
    return;
  }
  app.mount('#app');
};

(async () => {
  try {
    await mountApp();
  } catch (e) {
    console.error('[Vue] mount failed:', e);
    try {
      const root = document.getElementById('app');
      if (root) root.innerHTML = '<div style="padding:16px;color:#b00020;">App failed to initialize. Check console for details.</div>';
    } catch(_) {}
  }
})();

if (IS_DEV) {
  window.addEventListener('error', (e) => {
    console.error('[GlobalError]', e?.message || e);
  });
  window.addEventListener('unhandledrejection', (e) => {
    console.error('[UnhandledRejection]', e?.reason || e);
  });
}
