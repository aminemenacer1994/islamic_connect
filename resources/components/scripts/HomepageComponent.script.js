import axios from "axios";
import { Form } from "vform";

const createConfirmDialog = () => ({
  visible: false,
  title: "",
  message: "",
  confirmLabel: "Confirm",
  action: null,
});

const createToast = () => ({
  visible: false,
  title: "",
  message: "",
  type: "success",
});

export default {
  data() {
    return {
      trustHighlights: [
        { icon: "fas fa-shield-alt", label: "Secure and privacy-first" },
        { icon: "fas fa-bolt", label: "Fast, no signup needed" },
        { icon: "fas fa-universal-access", label: "Built for accessibility" },
      ],
      seoStats: [
        { value: "100%", label: "Accessibility score" },
        { value: "85+", label: "Countries reached" },
        { value: "650+", label: "Cities served" },
      ],
      seoCards: [
        {
          title: "Quran Explorer",
          desc: "Read verses with translation, tafsir, and audio in one interface.",
          href: "/quran",
          cta: "Open Quran",
        },
        {
          title: "Dua Collections",
          desc: "Search authentic duas by topic and daily context.",
          href: "/dua",
          cta: "Browse Duas",
        },
        {
          title: "Knowledge Library",
          desc: "Study seerah, articles, and practical guidance from trusted sources.",
          href: "/knowledge",
          cta: "Visit Library",
        },
        {
          title: "Media Center",
          desc: "Listen to podcasts and Islamic audio reflections while on the move.",
          href: "/media",
          cta: "Play Media",
        },
      ],
      objectives: [
        {
          index: "01",
          icon: "fas fa-book-open",
          title: "Advance Public Education",
          desc: "Provide clear, reliable resources on Islamic teachings, history, and values.",
        },
        {
          index: "02",
          icon: "fas fa-users",
          title: "Promote Harmony",
          desc: "Encourage understanding and challenge prejudice through practical education.",
        },
        {
          index: "03",
          icon: "fas fa-laptop-code",
          title: "Build Digital Access",
          desc: "Maintain tools, platforms, and AI-assisted workflows that support everyday learning.",
        },
      ],
      features: [
        {
          title: "Explore with Ease",
          desc: "Find Quran, dua, and seerah content quickly with focused discovery tools.",
          image: "/images/galaxy.png",
          imageAlt: "Magnifying glass icon for content discovery",
          href: "/surat",
          cta: "Start Exploring",
        },
        {
          title: "Listen and Reflect",
          desc: "Access recitations, podcasts, and media content for daily reflection.",
          image: "/images/watching.png",
          imageAlt: "Headphones icon for Islamic audio content",
          href: "/media",
          cta: "Open Media",
        },
        {
          title: "Learn Accessibly",
          desc: "Use keyboard-friendly, screen-reader-aware tools for consistent learning.",
          image: "/images/school.png",
          imageAlt: "Graduation cap icon for education",
          href: "/access",
          cta: "View Access Tools",
        },
      ],
      communityPoints: [
        "Daily reminders and Quran-focused updates",
        "Quick announcements for new tools and content",
        "Free access with simple one-tap joining",
      ],
      communityChannels: [
        {
          type: "whatsapp",
          icon: "fab fa-whatsapp",
          name: "WhatsApp Channel",
          caption: "Daily verses and instant reminders",
          cta: "Join WhatsApp",
          href: "https://whatsapp.com/channel/0029VbAsOvp59PwIp2zwyB1m",
        },
        {
          type: "telegram",
          icon: "fab fa-telegram",
          name: "Telegram Community",
          caption: "Long-form reflections and discussions",
          cta: "Join Telegram",
          href: "https://t.me/+r81Q3SEAa-M5ZWI0",
        },
      ],
      subjectOptions: [
        { value: "enquiry", label: "General enquiry" },
        { value: "bug report", label: "Bug report" },
        { value: "feature request", label: "Feature request" },
        { value: "comment", label: "Comment" },
        { value: "question", label: "Question" },
      ],
      form: new Form({
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        message: "",
      }),
      confirmDialog: createConfirmDialog(),
      toast: createToast(),
      toastTimer: null,
      isSubmitting: false,
      maxMessageLength: 1200,
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
    messageCharacterCount() {
      return String(this.form.message || "").length;
    },
    isContactFormValid() {
      return (
        this.normalizeField(this.form.firstname).length >= 2 &&
        this.normalizeField(this.form.lastname).length >= 2 &&
        this.validateEmail(this.form.email) &&
        this.normalizeField(this.form.subject).length > 0 &&
        this.normalizeField(this.form.message).length >= 10 &&
        this.messageCharacterCount <= this.maxMessageLength
      );
    },
  },
  watch: {
    "confirmDialog.visible"(isVisible) {
      if (typeof document === "undefined") return;
      document.body.classList.toggle("ic-dialog-open", isVisible);
      if (isVisible) {
        this.$nextTick(() => {
          this.$refs.confirmPrimaryButton?.focus();
        });
      }
    },
  },
  mounted() {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", this.handleGlobalKeydown);
    }
  },
  beforeUnmount() {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
      this.toastTimer = null;
    }
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", this.handleGlobalKeydown);
    }
    if (typeof document !== "undefined") {
      document.body.classList.remove("ic-dialog-open");
    }
  },
  methods: {
    normalizeField(value) {
      return String(value || "")
        .replace(/\s+/g, " ")
        .trim();
    },
    validateEmail(value) {
      const normalized = this.normalizeField(value).toLowerCase();
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
    },
    buildPayload() {
      return {
        firstname: this.normalizeField(this.form.firstname),
        lastname: this.normalizeField(this.form.lastname),
        email: this.normalizeField(this.form.email).toLowerCase(),
        subject: this.normalizeField(this.form.subject),
        message: this.normalizeField(this.form.message),
      };
    },
    handleGlobalKeydown(event) {
      if (event.key === "Escape" && this.confirmDialog.visible && !this.isSubmitting) {
        this.handleCancel();
      }
    },
    reset() {
      this.form.reset();
      if (typeof this.form.clear === "function") {
        this.form.clear();
      }
    },
    sendMessage() {
      if (this.isSubmitting) {
        return;
      }
      if (!this.isContactFormValid) {
        this.showToast("error", "Check your details", "Please complete all required fields before sending.");
        return;
      }

      this.showConfirm({
        title: "Send this message now?",
        message: "We will route it to the right team and respond as soon as possible.",
        confirmLabel: "Send message",
        action: () => {
          this.postForm(
            "/api/send-message",
            "Message sent successfully",
            "Thanks for reaching out. We received your message."
          );
        },
      });
    },
    async postForm(url, toastTitle, toastMessage) {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;
      try {
        const payload = this.buildPayload();
        await axios.post(url, payload, {
          headers: {
            Accept: "application/json",
          },
        });
        this.showToast("success", toastTitle, toastMessage);
        this.reset();
      } catch (error) {
        const errorMessage = error?.response?.data?.message || "Please try again later.";
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

      this.confirmDialog = createConfirmDialog();
    },
    handleConfirm() {
      if (this.isSubmitting) {
        return;
      }

      const action = this.confirmDialog.action;
      this.confirmDialog = createConfirmDialog();
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
