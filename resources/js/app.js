console.log('[Vue] app.js start');
require("./bootstrap");
import { createApp, defineAsyncComponent } from "vue";
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;
import $ from 'jquery';
import { Form } from "vform";
import swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Listbox from "primevue/listbox";
import Fieldset from "primevue/fieldset";
import Panel from "primevue/panel";
import Dialog from "primevue/dialog";
import Image from "primevue/image";
import Editor from 'primevue/editor';

import UsersComponent from "./components/admin_panels/UsersComponent.vue";
import MailingListComponent from "./components/admin_panels/MailingListComponent.vue";
import FeedbackComponent from "./components/admin_panels/FeedbackComponent.vue";
import PaymentComponent from "./components/admin_panels/PaymentComponent.vue";
import DonationComponent from "./components/admin_panels/DonationComponent.vue";
import ProfileComponent from "./components/admin_panels/ProfileComponent.vue";
import DashboardComponent from "./components/admin_panels/DashboardComponent.vue";
import PricingComponent from "./components/PricingComponent.vue";
import SubscriptionForm from './components/SubscriptionForm.vue';

import { StripePlugin } from 'vue-stripe-elements-plus';
import { ref, onMounted } from 'vue';
// Removed session milestone tracking

const app = createApp({
  components: { SubscriptionForm },
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
        isDarkMode: false,
        setDarkMode: this.setDarkMode, // Method to update dark mode state
      },
    };
  },
  created() {
    // Load dark mode preference from localStorage on app creation
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      this.darkModeState.isDarkMode = savedMode === 'true';
    }
  },
  methods: {
    setDarkMode(isDarkMode) {
      this.darkModeState.isDarkMode = isDarkMode;
      // Save the preference to localStorage
      localStorage.setItem('darkMode', isDarkMode);
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

window.$ = window.jQuery = $;




app.use(PrimeVue);
// Protect against plugins that don't expose install with Vue 3 build
try {
  if (StripePlugin && (typeof StripePlugin === 'function' || typeof StripePlugin.install === 'function')) {
    app.use(StripePlugin, { key: process.env.MIX_STRIPE_PUBLISHABLE_KEY });
  } else {
    console.log('[Stripe] Plugin not compatible with current Vue build; skipping');
  }
} catch (e) {
  console.debug('[Stripe] Skipped plugin registration:', e?.message || e);
}
app.component("Column", Column);
app.component("DataTable", DataTable);
app.component("Button", Button);
app.component("Dropdown", Dropdown);
app.component("InputText", InputText);
app.component("AccordionTab", AccordionTab);
app.component("Accordion", Accordion);
app.component("Card", Card);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("ListBox", Listbox);
app.component("Fieldset", Fieldset);
app.component("Panel", Panel);
app.component("Dialog", Dialog);
app.component("Image", Image);
app.component("Editor", Editor);

const asyncComponentLoaders = {
  "subscription-component": () => import("./components/SubscriptionComponent.vue"),
  "dark-mode-toggle": () => import("./components/DarkModeToggle.vue"),
  "users-component": () => import("./components/admin_panels/UsersComponent.vue"),
  "mailing-list-component": () => import("./components/admin_panels/MailingListComponent.vue"),
  "feedback-component": () => import("./components/admin_panels/FeedbackComponent.vue"),
  "payment-component": () => import("./components/admin_panels/PaymentComponent.vue"),
  "donation-component": () => import("./components/admin_panels/DonationComponent.vue"),
  "profile-component": () => import("./components/admin_panels/ProfileComponent.vue"),
  "dashboard-component": () => import("./components/admin_panels/DashboardComponent.vue"),
  "homepage-component": () => import("./components/HomepageComponent.vue"),
  "pricing-component": () => import("./components/PricingComponent.vue"),
  "contact-component": () => import("./components/ContactComponent.vue"),
  "charity-component": () => import("./components/CharityComponent.vue"),
  "volunteer-component": () => import("./components/VolunteerComponent.vue"),
  "ahadith-component": () => import("./components/AhadithComponent.vue"),
  "correction-component": () => import("./components/admin_panels/CorrectionComponent.vue"),
  "quran-component": () => import("./components/QuranComponent.vue"),
  "quran-pages-component": () => import("./components/QuranPagesComponent.vue"),
  "about-component": () => import("./components/AboutComponent.vue"),
  "about-us-component": () => import("./components/AboutUsComponent.vue"),
  "bookmark-component": () => import("./components/admin_panels/BookmarkComponent.vue"),
  "updates-component": () => import("./components/UpdatesComponent.vue"),
  "join_us-component": () => import("./components/JoinUsComponent.vue"),
  "notes-component": () => import("./components/admin_panels/NotesComponent.vue"),
  "group-notes-component": () => import("./components/admin_panels/GroupNotesComponent.vue"),
  "mission-component": () => import("./components/MissionComponent.vue"),
  "ai-component": () => import("./components/AiComponent.vue"),
  "access-component": () => import("./components/AccessComponent.vue"),
  "content-component": () => import("./components/ContentComponent.vue"),
  "surat-component": () => import("./components/SuratComponent.vue"),
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
  "revert-component": () => import("./components/RevertComponent.vue"),
  "muslim-component": () => import("./components/MuslimComponent.vue"),
  "bookmark-manager": () => import("./components/bookmarks/BookmarkManager.vue"),
  "shared-folder-view": () => import("./components/bookmarks/SharedFolderView.vue"),
  "resources-component": () => import("./components/ResourcesComponent.vue"),


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

const mountApp = () => {
  const target = document.getElementById('app');
  if (!target) {
    console.warn('[Vue] mount target #app not found yet; retrying after DOMContentLoaded');
    document.addEventListener('DOMContentLoaded', () => {
      const t2 = document.getElementById('app');
      if (t2) {
        app.mount('#app');
        console.log('[Vue] mounted on #app (after DOMContentLoaded)');
      } else {
        console.error('[Vue] mount failed: #app missing on DOMContentLoaded');
      }
    }, { once: true });
    return;
  }
  app.mount('#app');
  console.log('[Vue] mounted on #app');
};

try { mountApp(); } catch (e) {
  console.error('[Vue] mount failed:', e);
  try {
    const root = document.getElementById('app');
    if (root) root.innerHTML = '<div style="padding:16px;color:#b00020;">App failed to initialize. Check console for details.</div>';
  } catch(_) {}
}

// Global error diagnostics to surface silent failures
window.addEventListener('error', (e) => {
  console.error('[GlobalError]', e?.message || e);
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('[UnhandledRejection]', e?.reason || e);
});
