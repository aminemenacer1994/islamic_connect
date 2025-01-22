<template>
  <div>
    <!-- header -->
    <div
      class="jumbotron"
      style="
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        position: relative;
        height: 100%;
        background-image: url('images/banner-img.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        color: white;
      "
    >
      <!-- Dark Overlay -->
      <div
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 1;
        "
      ></div>

      <!-- Content -->
      <div class="container-fluid" style="position: relative; z-index: 2">
        <div class="container-fluid text-center">
          <div class="row">
            <div class="col-md-12">
              <h2 class="display-5 mt-2 fw-bold text-center container">
                Empowering Islamic Teachings Through AI
              </h2>
              <h2
                class="lead container pt-3 text-center"
                style="line-height: 1.8em"
              >
                <strong>
                  Experience the transformative power of AI in revolutionizing
                  access to Islamic knowledge, fostering spiritual growth, and
                  uniting the global Muslim community. Discover a new era of
                  learning, connection, and service as we leverage cutting-edge
                  technology to bring the teachings of Islam closer to
                  you.</strong
                >
              </h2>
            </div>
          </div>
          <div class="row justify-content-center text-center py-5">
            <div class="col-lg-12">
              <div
                class="d-flex justify-content-center gap-4 py-2"
                style="gap: 4rem"
              >
                <a
                  class="btn btn-lg"
                  style="background-color: rgb(53, 163, 139); color: white"
                  href="/quran"
                  >Get Started</a
                >
                <a
                  class="btn btn-lg"
                  style="background-color: rgb(53, 163, 139); color: white"
                  href="/support"
                  >Donate Now</a
                >
              </div>
            </div>
          </div>
        </div>
        <!-- <PrayerTimes /> -->
        <!-- <HijriCalendar /> -->
      </div>
    </div>

    <!-- AI tools & features -->
    <section class="py-5">
      <div class="container">
        <div class="row justify-content-center text-center mb-3">
          <div class="col-lg-8 col-xl-7">
            <h1 class="display-5 mb-3 fw-bold">AI Tools and Their Impact</h1>
          </div>
        </div>
        <div class="row pt-3 g-4 g-md-5">
          <h3
            class="lead container pt-3 text-center"
            style="line-height: 1.8em"
          >
            By leveraging advanced AI tools, the platform is designed to cater
            to diverse learning needs and abilities, ensuring an inclusive and
            enriching experience for all. Our mission is to become the leading
            Islamic digital platform worldwide, driven by innovation,
            accessibility, and knowledge-sharing. Here’s a detailed explanation
            of the AI tools being used and developed on Islamic Connect, and how
            they benefit users:
          </h3>
          <div class="col-md-6">
            <div class="d-flex">
              <div class="text-primary me-4">
                <img src="images/podcasting.png" width="50px" />
              </div>
              <div>
                <h4 class="mb-2 mb-lg-3 fw-bold">
                  Speech-to-Text for Islamic Notes and Reflections
                </h4>
                <p>
                  Capture your spoken reflections, making it easier to document
                  your thoughts and reflections on Islamic teachings, while
                  ensuring accessibility for those who prefer audio to written
                  text.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex">
              <div class="text-primary me-4">
                <img src="images/voice-recognition.png" width="60px" />
              </div>
              <div>
                <h4 class="mb-2 mb-lg-3 fw-bold">
                  Speak, explore, and connect deeply with Quranic teachings.
                </h4>
                <p>
                  Effortlessly search Quranic verses, teachings, and guidance
                  using your voice. Experience a seamless, accessible way to
                  connect with Islam.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex">
              <div class="text-primary me-4">
                <img src="images/elearning.png" width="50px" />
              </div>
              <div>
                <h4 class="mb-2 mb-lg-3 fw-bold">
                  Versatile Note Editor with Advanced Customization Features
                </h4>
                <p>
                  A powerful and adaptable note editor designed to meet diverse
                  user needs, combining advanced editing capabilities with
                  extensive customization options. This tool emphasizes seamless
                  accessibility.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex">
              <div class="text-primary me-4">
                <img src="images/attached-file.png" width="50px" />
              </div>
              <div>
                <h4 class="mb-2 mb-lg-3 fw-bold">
                  Export Quranic Verses in multiple file Formats
                </h4>
                <p>
                  Easily export Quranic verses in multiple formats for study,
                  research, and sharing, offering flexibility and convenience
                  for personal reflection or educational purposes.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex">
              <div class="text-primary me-4">
                <img src="images/highlighter.png" width="50px" />
              </div>
              <div>
                <h4 class="mb-2 mb-lg-3 fw-bold">
                  Audio Synchronization with Word-by-Word Quranic Highlighting
                </h4>
                <p>
                  Enhance the Quranic recitation experience by synchronizing the
                  audio with the Quranic text. Each word is highlighted as it is
                  recited, helping users follow along with the pronunciation and
                  meaning of the words.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex">
              <div class="text-primary me-4">
                <img src="images/chat.png" width="50px" />
              </div>
              <div>
                <h4 class="mb-2 mb-lg-3 fw-bold">
                  Text-to-Speech for English Translation and Tafsir
                </h4>
                <p>
                  High-quality, spoken translations and Tafsir of the Quranic
                  verses, making the Divine message more accessible, gaining a
                  clearer understanding of the meanings and scholarly
                  interpretations of the Quran and enriching connection to the
                  sacred text.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- about us -->
    <section
      class="py-5"
      style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
    >
      <div class="container">
        <div class="row gx-4 pt-3 align-items-center justify-content-between">
          <div class="col-md-6 order-1">
            <div class="mt-3 mt-md-0 text-center">
              <h4 class="display-5 fw-bold">
                Why This Platform has been built?
              </h4>
              <p class="lead">
                Islamic Connect was built with the belief that knowledge is the
                key to understanding, and understanding forms the foundation of
                acceptance. The platform is designed to be a welcoming and
                inclusive space where English-speaking individuals from all
                backgrounds can come together to learn and grow.
              </p>
              <p class="lead">
                The mission is to empower everyone to explore Islam with
                confidence and clarity, free from fear or confusion. Islamic
                Connect is here to provide the support and guidance needed on
                this journey.
              </p>
            </div>
          </div>
          <div class="col-md-6 order-2 pb-1">
            <img src="/images/group.png" width="100%" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
    <!-- donation -->
    <div
      class="jumbotron"
      style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
    >
      <div class="container pt-3">
        <div class="row gx-4 align-items-center justify-content-between">
          <div class="col-md-6">
            <img src="/images/money1.png" width="100%" />
          </div>
          <div class="col-md-6 pb-3">
            <div class="mt-3 mt-md-0">
              <h2 class="display-5 fw-bold pb-3">Support Us</h2>
              <p class="lead">
                At Islamic Connect, we are committed to breaking down barriers
                and making Islamic knowledge freely accessible to Muslims
                everywhere. Your donation helps us expand our platform, improve
                our resources, and ensure that every Muslim can engage with the
                Quran and Islamic teachings, no matter their circumstances.
              </p>
              <p class="lead">
                Your Impact: Provide free, accessible tools for Muslims
                worldwide, Expand our platform to reach more individuals and
                Develop innovative features that enhance the learning
                experience.
              </p>
              <p class="lead">
                Together, we can create a future where Islamic knowledge is
                available to everyone. Every contribution brings us closer to
                this goal.
              </p>

              <!-- Donate Button -->
              <button
                class="container form-control"
                style="background: #00bfa6; color: white"
                onclick="window.location.href='https://donate.stripe.com/6oE5kY84oc3q7fy145';"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- contact -->
    <section class="py-5">
      <div class="container-fluid">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8 col-xxl-7">
            <h2 class="display-5 fw-bold mb-3">Contact Us</h2>
            <b class="lead">
              Have questions or need assistance? We're here to help! Reach out
              to Islamic Connect via email for support, feedback or inquiries
              about our content and services.
            </b>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-10 col-lg-6 mt-2">
            <form @reset="reset" @submit.prevent="sendMessage()">
              <div class="row justify-content-center">
                <div class="col-md-6">
                  <div class="mb-3">
                    <input
                      class="form-control bg-light"
                      v-model="form.firstname"
                      name="firstname"
                      placeholder="First name"
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <input
                      class="form-control bg-light"
                      v-model="form.lastname"
                      name="lastname"
                      placeholder="Last name"
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <input
                      class="form-control bg-light"
                      v-model="form.email"
                      name="email"
                      placeholder="Email Adress"
                      type="email"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <input
                      class="form-control bg-light"
                      v-model="form.subject"
                      name="subject"
                      placeholder="subject"
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <input
                      class="form-control bg-light"
                      v-model="form.mobile"
                      name="mobile"
                      placeholder="Phone number"
                      type="number"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <textarea
                      class="form-control bg-light"
                      v-model="form.message"
                      name="message"
                      placeholder="Your message"
                      rows="4"
                    ></textarea>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="d-grid">
                    <button
                      class="form-control"
                      style="background: #00bfa6; color: white"
                      type="submit"
                    >
                      Send message
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- mailing list -->
    <section
      class="py-5"
      style="
        background: #00bfa6;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      "
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="display-5 fw-bold text-center text-white">
              Subscribe to Mailing List
            </h2>
            <div class="mx-auto mt-3">
              <h3
                class="lead container pt-1 text-center text-white"
                style="line-height: 1.8em"
              >
                <b>
                  Sign up for our mailing list to receive the latest updates,
                  content, and educational resources directly in your inbox.</b
                >
              </h3>
              <form
                class="container row g-3 pb-3"
                @reset="reset"
                @submit.prevent="submitMail()"
              >
                <div class="col-md-4">
                  <input
                    class="form-control bg-light"
                    v-model="form.name"
                    placeholder="Full name"
                    type="text"
                  />
                </div>
                <div class="col-md-4">
                  <input
                    class="form-control bg-light"
                    v-model="form.email"
                    placeholder="Email address"
                    type="text"
                  />
                </div>
                <div class="col-md-4">
                  <div class="d-grid">
                    <button
                      class="form-control"
                      style="background: #00bfa6; color: white"
                      type="submit"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- footer -->
    <section
      class="py-3"
      style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
    >
      <footer>
        <div class="container">
          <div class="d-lg-flex justify-content-between py-lg-2">
            <div class="md mb-2 mb-lg-0">
              <p class="mb-0 me-5">
                <b>© 2024 islamiconnect All rights reserved.</b>
              </p>
            </div>
            <!-- Social icons container, aligned to the right -->
            <div class="d-flex justify-content-end ms-3">
              <div class="me-3">
                <a
                  class="me-2"
                  href="https://www.instagram.com/islamicconnect24/"
                  ><i
                    class="bi bi-instagram h4"
                    style="color: rgb(0, 191, 166)"
                  ></i
                ></a>
              </div>
              <div class="me-3">
                <a class="me-2" href=""
                  ><i
                    class="bi bi-tiktok h4"
                    style="color: rgb(0, 191, 166)"
                  ></i
                ></a>
              </div>
              <div class="me-3">
                <a
                  class="me-2"
                  href="https://www.linkedin.com/company/islamic-connect/?viewAsMember=true"
                  ><i
                    class="bi bi-linkedin h4"
                    style="color: rgb(0, 191, 166)"
                  ></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  </div>
</template>
<style scoped>
.jumbotron-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
}
.jumbotron-content {
  position: relative;
  z-index: 2;
  color: white;
}

/* CSS */
.button-37 {
  background-color: rgb(53, 163, 139);
  border: 1px solid rgb(53, 163, 139);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: "Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont,
    sans-serif;
  font-size: 16px;
  font-weight: 400;
  outline: none;
  outline: 0;
  padding: 10px 25px;
  text-align: center;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-37:hover {
  box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;
  transform: translateY(-2px);
}

@media (min-width: 768px) {
  .button-37 {
    padding: 10px 30px;
  }
}
</style>
<script defer>
import axios from "axios";
import PrayerTimes from "./translation/PrayerTimes.vue";
// import HijriCalendar from "./translation/HijriCalendar.vue";
export default {
  components: {
    // HijriCalendar
    PrayerTimes,
  },
  data() {
    return {
      mailing: {},
      feedback: {},
      form: new Form({
        name: "",
        email: "",
      }),
      form: new Form({
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        mobile: "",
        message: "",
      }),
    };
  },
  methods: {
    sendMessage() {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to send the message !",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Send message!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("/api/send-message", this.form)
            .then((res) => {
              if (!res.data.success) {
                Swal.fire({
                  position: "top-end",

                  icon: "success",
                  title: "Message sent successfully ",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.form.reset();
                $("#addNew").hide();
              } else if (res.data.success) {
                Swal.fire("Error!", "Unable to send message.", "error");
                this.form.reset();
                self.close();
              }
            })
            .catch(function (err) {});
        }
      });
    },
    submitMail() {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to join the mailing list !",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Submit",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("/api/submit-mail", this.form)
            .then((res) => {
              if (!res.data.success) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Mailing List Subscription Successful",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.form.reset();
                $("#addNew").hide();
              } else if (res.data.success) {
                Swal.fire("Error!", "Unable to send message.", "error");
                this.form.reset();
                self.close();
              }
            })
            .catch(function (err) {});
        }
      });
    },
  },
};
</script>

