
import axios from "axios";
import { defineAsyncComponent } from 'vue';
import AiComponent from "../vue/AiComponent.vue";
// Lazy-load heavier child components to improve initial render
const PrayerTimes = defineAsyncComponent(() => import('../vue/translation/PrayerTimes.vue'));
const AyahOfTheDay = defineAsyncComponent(() => import('../vue/translation/AyahOfTheDay.vue'));

export default {
  components: {
    // HijriCalendar
    PrayerTimes,
    AyahOfTheDay,
    AiComponent,
  },
  data() {
    return {
      amount: 10,
      carouselReady: false,
      partners: [
        { name: "Ana Atlou", icon: "/images/aatlout.webp" },
        { name: "Noor Taibah", icon: "/images/algerian.png" },
        { name: "Algerian Quran", icon: "/images/aatlout.webp" },
        { name: "Islamic Connect", icon: "/images/algerian.png" }
      ],
      chunkSize: 4,
      mailing: {},
      feedback: {},
      seoStats: [
        { value: "100%", label: "Accessibility score" },
        { value: "85+", label: "Countries served" },
        { value: "650+", label: "Cities reached" }
      ],
      seoCards: [
        { title: "Quran Explorer", desc: "Open Quran translations, tafsir, and audio helpers.", href: "/quran" },
        { title: "Dua Collections", desc: "Search authentic supplications for gratitude and travel.", href: "/dua" },
        { title: "Audio Podcasts", desc: "Study modern spirituality of islamic audio podcasts.", href: "/content" },
        { title: "Seerah Timeline", desc: "Discover global impact of the prophet Muhammad.", href: "/mission" },
      ],
      externalLinks: [
        { href: "https://quran.com", title: "Quran.com complete Quran translations", text: "Quran.com   Complete Quran text and translations" },
        { href: "https://sunnah.com", title: "Sunnah.com searchable hadiths", text: "Sunnah.com   Hadith collections in searchable format" },
        { href: "https://islamicfinder.org", title: "IslamicFinder global prayer data", text: "IslamicFinder.org   Prayer times, mosque locators, and event calendars" }
      ],
      subjectOptions: [
        { value: "enquiry", label: "General enquiry" },
        { value: "bug report", label: "Bug report" },
        { value: "feature request", label: "Feature request" },
        { value: "comment", label: "Comment" },
        { value: "question", label: "Question" }
      ],
      // Unified reactive form object (avoid duplicate keys)
      form: new Form({
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        message: "",
      }),
      confirmDialog: {
        visible: false,
        title: "",
        message: "",
        confirmLabel: "Confirm",
        action: null,
      },
      toast: {
        visible: false,
        title: "",
        message: "",
        type: "success",
      },
      toastTimer: null,
      isSubmitting: false,
      hifdhSchedulerStorageKey: "ic_hifdh_scheduler_v1",
      hifdhAuthStorageKey: "ic_hifdh_auth_user_v1",
      hifdhDueTodayCount: 0,
      hifdhStorageSyncHandler: null,
      currentUserId: null,
    };
  },
  computed: {
    isAuthenticated() {
      return !!this.currentUserId;
    },
    chunkedPartners() {
      const chunks = [];
      for (let i = 0; i < this.partners.length; i += this.chunkSize) {
        chunks.push(this.partners.slice(i, i + this.chunkSize));
      }
      return chunks;
    },
    finalAmount() {
      return this.amount;
    },
    isValidAmount() {
      return this.finalAmount > 0;
    },
    impactMessage() {
      if (this.amount >= 100) return 'Major platform enhancement';
      if (this.amount >= 50) return 'Content development for many users';
      if (this.amount >= 25) return 'Supports multiple users monthly';
      return 'Helps maintain basic access';
    },
    stripeUrl() {
      const amountInCents = this.finalAmount * 100;
      return `https://donate.stripe.com/6oE5kY84oc3q7fy145?amount=${amountInCents}`;
    },
    currentYear() {
      return new Date().getFullYear();
    }
  },
  mounted() {
    if (typeof window !== "undefined") {
      const userIdFromLaravel = window?.Laravel?.userId;
      this.currentUserId = userIdFromLaravel ? Number(userIdFromLaravel) : null;
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.carouselReady = true;
        }, 400);
      });
      this.refreshHifdhDueTodayCount();
      this.hifdhStorageSyncHandler = () => this.refreshHifdhDueTodayCount();
      window.addEventListener("storage", this.hifdhStorageSyncHandler);
      window.addEventListener("focus", this.hifdhStorageSyncHandler);
      document.addEventListener("visibilitychange", this.hifdhStorageSyncHandler);
    } else {
      this.carouselReady = true;
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined" && this.hifdhStorageSyncHandler) {
      window.removeEventListener("storage", this.hifdhStorageSyncHandler);
      window.removeEventListener("focus", this.hifdhStorageSyncHandler);
      document.removeEventListener("visibilitychange", this.hifdhStorageSyncHandler);
    }
  },
  methods: {
    toDateKey(input) {
      const date = input instanceof Date ? input : new Date(input);
      if (Number.isNaN(date.getTime())) return "";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    refreshHifdhDueTodayCount() {
      if (typeof window === "undefined") {
        this.hifdhDueTodayCount = 0;
        return;
      }
      if (!this.isAuthenticated) {
        this.hifdhDueTodayCount = 0;
        return;
      }
      try {
        const ownerId = window.localStorage.getItem(this.hifdhAuthStorageKey);
        if (String(ownerId || "") !== String(this.currentUserId)) {
          this.hifdhDueTodayCount = 0;
          return;
        }
        const raw = window.localStorage.getItem(this.hifdhSchedulerStorageKey);
        if (!raw) {
          this.hifdhDueTodayCount = 0;
          return;
        }
        const parsed = JSON.parse(raw);
        const entries = Array.isArray(parsed?.entries) ? parsed.entries : [];
        const todayKey = this.toDateKey(new Date());
        this.hifdhDueTodayCount = entries.filter((entry) => {
          if (!entry || entry.status === "completed") return false;
          return String(entry.scheduledDate || "") <= todayKey;
        }).length;
      } catch (_) {
        this.hifdhDueTodayCount = 0;
      }
    },
    goTo(path) {
      if (typeof window !== 'undefined' && window?.location) {
        window.location.href = path;
      }
    },
    processDonation() {
      if (!this.isValidAmount) {
        this.showToast("error", "Select an amount", "Please choose a contribution amount before continuing.");
        return;
      }

      window.location.href = this.stripeUrl;
    },
    sendMessage() {
      if (this.isSubmitting) {
        return;
      }
      this.showConfirm({
        title: "Ready to send your message?",
        message: "We'll route this message to the correct team and share a thoughtful reply within 24 hours.",
        confirmLabel: "Send message",
        action: () => {
          this.postForm("/api/send-message", "Message sent successfully", "We received your message and will respond shortly.");
        },
      });
    },
    submitMail() {
      if (this.isSubmitting) {
        return;
      }
      this.showConfirm({
        title: "Join the mailing list?",
        message: "Stay in the loop with updates, launches, and new resources from the Islamic Connect mission.",
        confirmLabel: "Subscribe",
        action: () => {
          this.postForm("/api/submit-mail", "Mailing List Subscribed", "Thank you for joining our email community.");
        },
      });
    },
    async postForm(url, toastTitle, toastMessage) {
      if (this.isSubmitting) {
        return;
      }
      this.isSubmitting = true;
      try {
        await axios.post(url, this.form);
        this.showToast("success", toastTitle, toastMessage);
        this.form.reset();
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Please try again later.";
        this.showToast("error", "Something went wrong", errorMessage);
      } finally {
        this.isSubmitting = false;
      }
    },
    showConfirm({ title, message, confirmLabel = "Confirm", action }) {
      this.confirmDialog = {
        visible: true,
        title,
        message,
        confirmLabel,
        action,
      };
    },
    handleCancel() {
      if (this.isSubmitting) {
        return;
      }
      this.confirmDialog.visible = false;
      this.confirmDialog.action = null;
    },
    handleConfirm() {
      if (this.isSubmitting) {
        return;
      }
      const action = this.confirmDialog.action;
      this.handleCancel();
      if (typeof action === "function") {
        action();
      }
    },
    showToast(type, title, message) {
      if (this.toastTimer) {
        clearTimeout(this.toastTimer);
      }
      this.toast = {
        visible: true,
        type,
        title,
        message,
      };
      this.toastTimer = setTimeout(() => {
        this.toast.visible = false;
        this.toastTimer = null;
      }, 3200);
    },
    dismissToast() {
      if (this.toastTimer) {
        clearTimeout(this.toastTimer);
        this.toastTimer = null;
      }
      this.toast.visible = false;
    },
  },
};
