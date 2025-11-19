console.log('[Vue] app.js start');
require("./bootstrap");
import "../css/premium.css";
import { createApp } from "vue";
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
import HomepageComponent from "./components/HomepageComponent.vue";
import PricingComponent from "./components/PricingComponent.vue";
import SupportComponent from "./components/SupportComponent.vue";
import ContactComponent from "./components/ContactComponent.vue";
import CharityComponent from "./components/CharityComponent.vue";
import VolunteerComponent from "./components/VolunteerComponent.vue";
import AhadithComponent from "./components/AhadithComponent.vue";
import CorrectionComponent from "./components/admin_panels/CorrectionComponent.vue";
import QuranComponent from "./components/QuranComponent.vue";
import AboutComponent from "./components/AboutComponent.vue";
import BookmarkComponent from "./components/admin_panels/BookmarkComponent.vue";
import UpdatesComponent from "./components/UpdatesComponent.vue";
import JoinUsComponent from "./components/JoinUsComponent.vue";
import NotesComponent from "./components/admin_panels/NotesComponent.vue";
import CollectionComponent from "./components/admin_panels/CollectionComponent.vue";
import FaqComponent from "./components/FaqComponent.vue";
import GroupNotesComponent from "./components/admin_panels/GroupNotesComponent.vue";
import MissionComponent from "./components/MissionComponent.vue";
import AiComponent from "./components/AiComponent.vue";
import AccessComponent from "./components/AccessComponent.vue";
import ContentComponent from "./components/ContentComponent.vue";
import SuratComponent from "./components/SuratComponent.vue";
import DuaComponent from "./components/DuaComponent.vue";
import RadioComponent from "./components/RadioComponent.vue";
import GuideComponent from "./components/GuideComponent.vue";
import StreamingComponent from "./components/StreamingComponent.vue";
import ToolkitComponent from "./components/ToolkitComponent.vue";
import VideoComponent from "./components/VideoComponent.vue";
import QiblaComponent from "./components/QiblaComponent.vue";
import MosqueComponent from "./components/MosqueComponent.vue";
import CalendarComponent from "./components/CalendarComponent.vue";
import DateComponent from "./components/DateComponent.vue";
import HadithComponent from "./components/HadithComponent.vue";
import ShopComponent from "./components/ShopComponent.vue";
import TasbeehComponent from "./components/TasbeehComponent.vue";
import UmrahComponent from "./components/UmrahComponent.vue";
import NameComponent from "./components/NameComponent.vue";
import PrayerComponent from "./components/PrayerComponent.vue";
import TravelComponent from "./components/TravelComponent.vue";
import MediaComponent from "./components/MediaComponent.vue";
import KnowledgeComponent from "./components/KnowledgeComponent.vue";
import ServicesComponent from "./components/ServicesComponent.vue";
import StoreComponent from "./components/StoreComponent.vue";
import FoodComponent from "./components/FoodComponent.vue";
import SchoolComponent from "./components/SchoolComponent.vue";
import WelfareComponent from "./components/WelfareComponent.vue";
import BooksComponent from "./components/BooksComponent.vue";

import CustomSurahSelection from "./components/surah_selection/CustomSurahSelection.vue";
import Donation from "./components/intro/Donation.vue";
import TinymceEditor from './components/tinymce/TinymceEditor.vue';

import SurahList from "./components/search/SurahList.vue";
import DarkModeToggle from "./components/DarkModeToggle.vue";
import AthkarComponenet from "./components/AthkarComponenet.vue";
import FinanceComponent from "./components/FinanceComponent.vue";
import ZakatComponent from "./components/ZakatComponent.vue";
import ConvertComponent from "./components/ConvertComponent.vue";
import HolyComponent from "./components/HolyComponent.vue";
import HistoryComponent from "./components/HistoryComponent.vue";
import PaymentMethodsComponent from "./components/PaymentMethodsComponent.vue";
import ReadComponent from "./components/ReadComponent.vue";
import SubscriptionForm from './components/SubscriptionForm.vue';
import SubscriptionComponent from './components/SubscriptionComponent.vue';

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

app.component('subscription-component', SubscriptionComponent);
app.component('dark-mode-toggle', DarkModeToggle);
app.component("users-component", UsersComponent);
app.component("mailing-list-component", MailingListComponent);
app.component("feedback-component", FeedbackComponent);
app.component("payment-component", PaymentComponent);
app.component("donation-component", DonationComponent);
app.component("profile-component", ProfileComponent);
app.component("dashboard-component", DashboardComponent);
app.component("homepage-component", HomepageComponent);
app.component("pricing-component", PricingComponent);
app.component("contact-component", ContactComponent);
app.component("charity-component", CharityComponent);
app.component("volunteer-component", VolunteerComponent);
app.component("ahadith-component", AhadithComponent);
app.component("correction-component", CorrectionComponent);
app.component("quran-component", QuranComponent);
app.component("about-component", AboutComponent);
app.component("bookmark-component", BookmarkComponent);
app.component("updates-component", UpdatesComponent);
app.component("join_us-component", JoinUsComponent);
app.component("notes-component", NotesComponent);
app.component("group-notes-component", GroupNotesComponent);
app.component("mission-component", MissionComponent);
app.component("ai-component", AiComponent);
app.component("access-component", AccessComponent);
app.component("content-component", ContentComponent);
app.component("surat-component", SuratComponent);
app.component("search-component", CustomSurahSelection);
app.component("surah-list-component", SurahList);
app.component("donations-component", Donation);
app.component("collection-component", CollectionComponent);
app.component('TinymceEditor', TinymceEditor);
app.component('faq-component', FaqComponent);
app.component('support-component', SupportComponent);
app.component('dua-component', DuaComponent);
app.component('radio-component', RadioComponent);
app.component('guide-component', GuideComponent);
app.component('streaming-component', StreamingComponent);
app.component('toolkit-component', ToolkitComponent);
app.component('video-component', VideoComponent);
// Some bundlers wrap SFCs under .default; use fallback resolver
const sfc = (m) => (m && m.default) ? m.default : m;
app.component('zakat-component', sfc(ZakatComponent));
app.component('qibla-component', QiblaComponent);
app.component('mosque-component', MosqueComponent);
app.component('calendar-component', sfc(CalendarComponent));
app.component('date-component', DateComponent);
app.component('hadith-component', HadithComponent);
app.component('shop-component', ShopComponent);
app.component('tasbeeh-component', TasbeehComponent);
app.component('athkar-component', AthkarComponenet);
app.component('finance-component', FinanceComponent);
app.component('umrah-component', UmrahComponent);
app.component('name-component', NameComponent);
app.component('prayer-component', PrayerComponent);
app.component('travel-component', TravelComponent);
app.component('media-component', MediaComponent);
app.component('knowledge-component', KnowledgeComponent);
app.component('services-component', ServicesComponent);
app.component('store-component', StoreComponent);
app.component('food-component', FoodComponent);
app.component('school-component', SchoolComponent);
app.component('welfare-component', WelfareComponent);
app.component('books-component', BooksComponent);
app.component('convert-component', ConvertComponent);
app.component('holy-component', HolyComponent);
app.component('history-component', HistoryComponent);
app.component('payment-methods-component', PaymentMethodsComponent);
app.component('read-component', ReadComponent);

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
