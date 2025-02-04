require("./bootstrap");
import { createApp } from "vue";
import 'bootstrap';
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;
import 'bootstrap/dist/css/bootstrap.min.css';

import $ from 'jquery';
import { Form } from "vform";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
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

import CustomSurahSelection from "./components/surah_selection/CustomSurahSelection.vue";
import Donation from "./components/intro/Donation.vue";
import TinymceEditor from './components/tinymce/TinymceEditor.vue';

import SurahList from "./components/search/SurahList.vue";
import SearchForm from "./components/search/SearchForm.vue";


const app = createApp({});

window.Form = Form;
window.Swal = swal;

window.$ = window.jQuery = $;




app.use(PrimeVue);

app.component("Column", Column);
app.component("DataTable", DataTable);
app.component("Button", Button);
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

app.mount("#app");
