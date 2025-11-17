<template>
  <div class="container py-4 convert-bg text-black">
    <!-- 1. Welcome -->
    <div class="text-center mb-5 fade-in">
      <h1 class="display-5 fw-bold premium-heading">Welcome, New Muslim!</h1>
      <p class="lead">Your journey begins here. We're here to support you every step of the way.</p>
    </div>

    <!-- Progress Tracker -->
    <div class="card mb-5 shadow-sm convert-card fade-in">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 class="card-title mb-0"><i class="bi bi-bar-chart-steps me-2 accent-primary"></i>Your Journey Progress</h2>
          <button class="btn btn-outline-danger btn-sm" @click="resetProgress" title="Reset all progress"><i class="bi bi-arrow-counterclockwise"></i> Reset</button>
        </div>
        <div class="mb-3">
          <div class="progress progress-tracker">
            <div class="progress-bar progress-tracker-bar" :style="{width: progressPercent + '%'}" role="progressbar" :aria-valuenow="progressPercent" aria-valuemin="0" aria-valuemax="100">
              {{ progressPercent }}%
            </div>
          </div>
        </div>
        <ul class="list-group list-group-flush">
          <li v-for="(step, i) in journeySteps" :key="i" class="list-group-item bg-white text-black d-flex align-items-center">
            <input type="checkbox" class="form-check-input me-2" v-model="step.completed" @change="updateProgress" :id="'journey-step-' + i">
            <label :for="'journey-step-' + i" class="mb-0">{{ step.label }}</label>
          </li>
        </ul>
      </div>
    </div>

    <!-- Testimonials Carousel -->
    <div class="card mb-5 shadow-sm convert-card fade-in">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 class="card-title mb-0"><i class="bi bi-chat-quote-fill me-2 accent-primary"></i>Testimonials</h2>
          <button class="btn btn-outline-primary btn-sm" @click="shareTestimonial" title="Share this testimonial"><i class="bi bi-share"></i> Share</button>
        </div>
        <div id="testimonialCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div v-for="(testimonial, i) in testimonials" :key="i" :class="['carousel-item', {active: i === testimonialIndex}]">
              <div class="d-flex flex-column align-items-center">
                <img :src="testimonial.avatar" class="rounded-circle mb-3 testimonial-avatar">
                <blockquote class="blockquote text-center">
                  <p class="mb-2">"{{ testimonial.text }}"</p>
                  <footer class="blockquote-footer">{{ testimonial.name }} from {{ testimonial.country }}</footer>
                </blockquote>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" @click="prevTestimonial" title="Previous testimonial">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" @click="nextTestimonial" title="Next testimonial">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Interactive Quiz -->
    <div class="card mb-5 shadow-sm convert-card fade-in">
      <div class="card-body">
        <h2 class="card-title mb-3"><i class="bi bi-question-circle-fill me-2 accent-primary"></i>Islam Basics Quiz</h2>
        <div v-if="quizCompleted" class="alert alert-success">You scored {{ quizScore }}/{{ quizQuestions.length }}! <button class="btn btn-link p-0" @click="resetQuiz">Try Again</button></div>
        <div v-else>
          <div v-for="(q, i) in quizQuestions" :key="i" class="mb-4">
            <div class="fw-bold mb-2">{{ i+1 }}. {{ q.question }}</div>
            <div class="d-flex flex-column gap-2">
              <button v-for="(option, j) in q.options" :key="j" class="btn btn-outline-primary btn-sm text-start convert-btn-outline" :class="{'active': q.userAnswer === option}" @click="selectQuizAnswer(i, option)" :disabled="quizCompleted" :title="'Select answer: ' + option">{{ option }}</button>
            </div>
            <div v-if="quizCompleted && q.userAnswer">
              <span v-if="q.userAnswer === q.answer" class="text-success"><i class="bi bi-check-circle-fill"></i> Correct</span>
              <span v-else class="text-danger"><i class="bi bi-x-circle-fill"></i> Incorrect (Correct: {{ q.answer }})</span>
            </div>
          </div>
          <button class="btn btn-success convert-btn" @click="submitQuiz" :disabled="quizQuestions.some(q => !q.userAnswer)" title="Submit quiz">Submit Quiz</button>
        </div>
      </div>
    </div>

    <!-- 2. Shahada -->
    <div class="card mb-5 shadow-sm convert-card fade-in">
      <div class="card-body">
        <h2 class="card-title mb-3"><i class="bi bi-star-fill me-2 accent-teal"></i>Step 1: The Shahada</h2>
        <p>The testimony of faith is the first step to becoming a Muslim.</p>
        <audio controls class="w-100 mb-2">
          <source :src="shahadaAudio" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
        <a :href="shahadaCertificate" class="btn convert-btn btn-sm" download title="Download Shahada certificate">Download Shahada Certificate</a>
      </div>
    </div>

    <!-- 3. First Steps Checklist -->
    <div class="card mb-5 shadow-sm convert-card fade-in">
      <div class="card-body">
        <h2 class="card-title mb-3"><i class="bi bi-list-check me-2 accent-teal"></i>Step 2: Your First Steps</h2>
        <ul class="list-group list-group-flush mb-3">
          <li v-for="(step, i) in firstSteps" :key="i" class="list-group-item bg-white text-black d-flex align-items-center">
            <i class="bi bi-check-circle-fill me-2 accent-teal"></i>{{ step }}
          </li>
        </ul>
        <div class="accordion" id="faqAccordion">
          <div class="accordion-item" v-for="(faq, i) in faqs" :key="i">
            <h2 class="accordion-header" :id="'faq'+i">
              <button class="accordion-button" :class="{'collapsed': i!==0}" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+i">
                {{ faq.q }}
              </button>
            </h2>
            <div :id="'collapse'+i" class="accordion-collapse collapse" :class="{'show': i===0}" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                {{ faq.a }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Learning the Basics -->
    <div class="row row-cols-1 row-cols-md-2 g-4 mb-5 fade-in">
      <div class="col" v-for="(basic, i) in basics" :key="i">
        <div class="card h-100 convert-card">
          <div class="card-body">
            <h5 class="card-title"><i :class="basic.icon" class="me-2 accent-teal"></i>{{ basic.title }}</h5>
            <a :href="basic.link" class="btn btn-outline-primary btn-sm convert-btn-outline" :download="basic.download || false" target="_blank" :title="basic.cta">{{ basic.cta }}</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Community & Support -->
    <div class="card mb-5 shadow-sm convert-card fade-in">
      <div class="card-body">
        <h2 class="card-title mb-3"><i class="bi bi-people-fill me-2 accent-teal"></i>Find Community</h2>
        <p>Connect with other Muslims near you and online.</p>
        <div class="ratio ratio-16x9 mb-3">
          <iframe :src="communityMap" allowfullscreen></iframe>
        </div>
        <div class="d-flex flex-wrap gap-3 mb-3">
          <a v-for="(group, i) in communityGroups" :key="i" :href="group.link" class="btn btn-info btn-sm convert-btn" target="_blank" :title="'Join ' + group.name">
            <i :class="group.icon" class="me-1"></i>{{ group.name }}
          </a>
        </div>
        <div class="d-flex flex-wrap gap-3">
          <a v-for="(org, i) in organizations" :key="i" :href="org.link" class="btn btn-outline-dark btn-sm" target="_blank" :title="'Visit ' + org.name">
            <i :class="org.icon" class="me-1"></i>{{ org.name }}
          </a>
        </div>
      </div>
    </div>

    <!-- 6. Resources -->
    <div class="card mb-5 shadow-sm convert-card fade-in">
      <div class="card-body">
        <h2 class="card-title mb-3"><i class="bi bi-journal-richtext me-2 accent-primary"></i>Resources</h2>
        <div class="row row-cols-1 row-cols-md-2 g-4">
          <div class="col" v-for="(resource, i) in resources" :key="i">
            <div class="card h-100 border-0">
              <div class="card-body">
                <h5 class="card-title"><i :class="resource.icon" class="me-2 accent-primary"></i>{{ resource.title }}</h5>
                <p class="card-text">{{ resource.desc }}</p>
                <a :href="resource.link" class="btn btn-outline-primary btn-sm convert-btn-outline" :download="resource.download || false" target="_blank" :title="resource.cta">{{ resource.cta }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 7. Ask a Question -->
    <div class="card mb-5 shadow-sm convert-card fade-in">
      <div class="card-body">
        <h2 class="card-title mb-3"><i class="bi bi-question-circle-fill me-2 accent-primary"></i>Need Help?</h2>
        <form @submit.prevent="submitQuestion">
          <div class="mb-3">
            <label for="question" class="form-label">Ask us anything</label>
            <textarea class="form-control" id="question" v-model="question" rows="2" :disabled="questionLoading"></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-sm convert-btn" :disabled="questionLoading" title="Send your question">{{ questionLoading ? 'Sending...' : 'Send' }}</button>
        </form>
        <div v-if="questionSent" class="alert alert-success mt-2" role="alert">
          Thank you for your question! We'll get back to you soon.
        </div>
        <div v-if="questionError" class="alert alert-danger mt-2" role="alert">
          {{ questionError }}
        </div>
      </div>
    </div>

    <!-- 8. Events & Meetups -->
    <div class="card mb-5 shadow-sm convert-card fade-in">
      <div class="card-body">
        <h2 class="card-title mb-3"><i class="bi bi-calendar-event-fill me-2 accent-primary"></i>Upcoming Events</h2>
        <ul class="list-group">
          <li v-for="(event, i) in events" :key="i" class="list-group-item d-flex justify-content-between align-items-center bg-white text-black">
            <span><i class="bi bi-calendar2-week me-2 accent-primary"></i>{{ event.title }}</span>
            <span class="badge rounded-pill" :class="event.badgeClass">{{ event.badge }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 9. Feedback -->
    <div class="card mb-5 shadow-sm convert-card fade-in">
      <div class="card-body">
        <h2 class="card-title mb-3"><i class="bi bi-chat-dots-fill me-2 accent-teal"></i>Feedback</h2>
        <form @submit.prevent="submitFeedback">
          <div class="mb-3">
            <label for="feedback" class="form-label">Your feedback</label>
            <textarea class="form-control" id="feedback" v-model="feedback" rows="2" :disabled="feedbackLoading"></textarea>
          </div>
          <button type="submit" class="btn btn-secondary btn-sm convert-btn" :disabled="feedbackLoading" title="Submit feedback">{{ feedbackLoading ? 'Submitting...' : 'Submit' }}</button>
        </form>
        <div v-if="feedbackSent" class="alert alert-success mt-2" role="alert">
          Thank you for your feedback!
        </div>
        <div v-if="feedbackError" class="alert alert-danger mt-2" role="alert">
          {{ feedbackError }}
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="card mb-5 shadow-sm convert-card fade-in">
      <div class="card-body text-center">
        <h2 class="card-title mb-3 accent-heading accent-heading--primary"><i class="bi bi-megaphone-fill me-2 accent-primary"></i>Get Involved!</h2>
        <p class="mb-3">Share your story to inspire others, or book a 1:1 session with a mentor for personalized support.</p>
        <div class="d-flex flex-column flex-md-row justify-content-center gap-3 action-row action-row--spaced">
          <a href="mailto:stories@islamicconnect.com" class="premium-action-button premium-action-button--outline"
            title="Share your story">
            <span class="action-row__icon"><i class="bi bi-pencil-square" aria-hidden="true"></i></span>
            <span class="action-row__label">Share Your Story</span>
          </a>
          <a href="https://calendly.com/mentor-session" target="_blank" class="premium-action-button premium-action-button--primary"
            title="Book a mentor session">
            <span class="action-row__icon"><i class="bi bi-person-video3" aria-hidden="true"></i></span>
            <span class="action-row__label">Book 1:1 Mentor Session</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Progress Tracker
      journeySteps: [
        { label: 'Take the Shahada', completed: false },
        { label: 'Learn to Pray (Salah)', completed: false },
        { label: 'Learn to Make Wudu', completed: false },
        { label: 'Fast in Ramadan', completed: false },
        { label: 'Give Zakat', completed: false },
        { label: 'Read a Surah', completed: false },
        { label: 'Join a Community Group', completed: false },
        { label: 'Attend a Mosque Event', completed: false },
        { label: 'Connect with a Mentor', completed: false },
        { label: 'Share Your Story', completed: false },
      ],
      // Testimonials
      testimonials: [
        { name: 'Aisha', country: 'UK', text: 'Islam gave me peace and purpose. The support I found here was life-changing.', avatar: '/images/testimonials/aisha.jpg' },
        { name: 'Omar', country: 'USA', text: 'The community welcomed me with open arms. I never felt alone on my journey.', avatar: '/images/testimonials/omar.jpg' },
        { name: 'Fatima', country: 'Canada', text: 'Learning to pray was challenging, but the guides and mentors made it easy.', avatar: '/images/testimonials/fatima.jpg' },
        { name: 'Yusuf', country: 'Australia', text: 'I found answers to all my questions and made lifelong friends.', avatar: '/images/testimonials/yusuf.jpg' },
      ],
      testimonialIndex: 0,
      // Quiz
      quizQuestions: [
        { question: 'What is the first pillar of Islam?', options: ['Prayer', 'Shahada', 'Fasting', 'Charity'], answer: 'Shahada', userAnswer: null },
        { question: 'How many daily prayers are there?', options: ['3', '4', '5', '6'], answer: '5', userAnswer: null },
        { question: 'What is the holy book of Islam?', options: ['Bible', 'Torah', 'Quran', 'Vedas'], answer: 'Quran', userAnswer: null },
        { question: 'What month do Muslims fast?', options: ['Muharram', 'Ramadan', 'Shawwal', 'Dhul Hijjah'], answer: 'Ramadan', userAnswer: null },
        { question: 'What is Zakat?', options: ['Pilgrimage', 'Charity', 'Prayer', 'Fasting'], answer: 'Charity', userAnswer: null },
      ],
      quizCompleted: false,
      quizScore: 0,
      // Shahada
      shahadaAudio: '/audio/shahada.mp3',
      shahadaCertificate: '/downloads/shahada-certificate.pdf',
      // First Steps
      firstSteps: [
        'Download a prayer app (e.g., Muslim Pro, Pillars)',
        'Find your local mosque and visit',
        'Connect with a mentor or support group',
        'Set a daily learning goal',
        'Learn basic duas (supplications)',
        'Read about the Five Pillars of Islam',
        'Watch a video on how to pray',
        'Join a WhatsApp/Telegram group for new Muslims',
      ],
      // FAQs
      faqs: [
        { q: 'How do I tell my family I became Muslim?', a: 'Take your time. Seek advice from converts and mentors. Honesty and patience are key.' },
        { q: 'What if I make a mistake in prayer?', a: 'Mistakes are normal. Allah is Most Forgiving. Keep learning and improving.' },
        { q: 'How do I fast in Ramadan?', a: 'Fasting is from dawn to sunset. Start with intention, avoid food/drink, and break fast at sunset.' },
        { q: 'How do I find halal food?', a: 'Look for halal certification, ask at local stores, or use halal restaurant apps.' },
        { q: 'Can I pray in English?', a: 'You can start with English while learning Arabic. Try to learn the basics over time.' },
        { q: 'How do I make Muslim friends?', a: 'Attend mosque events, join online groups, and reach out to local communities.' },
        { q: 'What are the Five Pillars?', a: 'Shahada (faith), Salah (prayer), Zakat (charity), Sawm (fasting), Hajj (pilgrimage).' },
        { q: 'What is the best way to learn more?', a: 'Read, watch videos, ask questions, and connect with mentors.' },
      ],
      // Basics
      basics: [
        { title: 'How to Pray (Salah)', link: '/downloads/prayer-guide.pdf', cta: 'Download Guide', icon: 'bi bi-journal-check', download: true },
        { title: 'How to Make Wudu', link: '/videos/wudu-video.mp4', cta: 'Watch Video', icon: 'bi bi-droplet-fill', download: false },
        { title: 'How to Fast in Ramadan', link: '/downloads/ramadan-guide.pdf', cta: 'Download Ramadan Guide', icon: 'bi bi-calendar2-date', download: true },
        { title: 'How to Give Zakat', link: '/downloads/zakat-guide.pdf', cta: 'Download Zakat Guide', icon: 'bi bi-cash-coin', download: true },
        { title: 'Islamic Months & Holidays', link: '/downloads/islamic-calendar.pdf', cta: 'Download Calendar', icon: 'bi bi-calendar3', download: true },
        { title: 'Glossary of Islamic Terms', link: '/downloads/islamic-glossary.pdf', cta: 'Download Glossary', icon: 'bi bi-book-half', download: true },
        { title: 'Daily Duas', link: '/downloads/daily-duas.pdf', cta: 'Download Duas', icon: 'bi bi-bookmark-heart-fill', download: true },
        { title: 'Short Surahs to Memorize', link: '/downloads/short-surahs.pdf', cta: 'Download Surahs', icon: 'bi bi-book-half', download: true },
      ],
      // Community
      communityMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537363153169!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f0f7b1%3A0x5045675218ce6e0!2sMosque!5e0!3m2!1sen!2sau!4v1611812345678!5m2!1sen!2sau',
      communityGroups: [
        { name: 'Telegram Group', link: 'https://t.me/yourgroup', icon: 'bi bi-telegram' },
        { name: 'WhatsApp Group', link: 'https://wa.me/1234567890', icon: 'bi bi-whatsapp' },
        { name: 'Discord Server', link: 'https://discord.gg/yourserver', icon: 'bi bi-discord' },
      ],
      organizations: [
        { name: 'New Muslim Academy', link: 'https://newmuslimacademy.org/', icon: 'bi bi-globe' },
        { name: 'WhyIslam', link: 'https://www.whyislam.org/', icon: 'bi bi-question-circle' },
        { name: 'Muslim Converts', link: 'https://muslimconverts.com/', icon: 'bi bi-people' },
        { name: 'Islamic Society of North America', link: 'https://isna.net/', icon: 'bi bi-building' },
      ],
      // Resources
      resources: [
        { title: 'Prayer Guide (PDF)', link: '/downloads/prayer-guide.pdf', cta: 'Download', icon: 'bi bi-journal-check', desc: 'Step-by-step guide to performing Salah (prayer).', download: true },
        { title: 'Ramadan Guide', link: '/downloads/ramadan-guide.pdf', cta: 'Download', icon: 'bi bi-calendar2-date', desc: 'Everything you need to know about fasting in Ramadan.', download: true },
        { title: 'Zakat Guide', link: '/downloads/zakat-guide.pdf', cta: 'Download', icon: 'bi bi-cash-coin', desc: 'How to calculate and give Zakat (charity).', download: true },
        { title: 'Islamic Calendar', link: '/downloads/islamic-calendar.pdf', cta: 'Download', icon: 'bi bi-calendar3', desc: 'Islamic months, holidays, and important dates.', download: true },
        { title: 'Islamic Glossary', link: '/downloads/islamic-glossary.pdf', cta: 'Download', icon: 'bi bi-book-half', desc: 'Key Islamic terms and their meanings.', download: true },
        { title: 'Daily Duas', link: '/downloads/daily-duas.pdf', cta: 'Download', icon: 'bi bi-bookmark-heart-fill', desc: 'Essential daily supplications for every Muslim.', download: true },
        { title: 'Short Surahs', link: '/downloads/short-surahs.pdf', cta: 'Download', icon: 'bi bi-book-half', desc: 'Short chapters of the Quran to memorize.', download: true },
        { title: 'Video Playlist', link: 'https://www.youtube.com/playlist?list=PL1234567890', cta: 'Watch', icon: 'bi bi-youtube', desc: 'Curated YouTube playlist for new Muslims.', download: false },
        { title: 'Podcast: New Muslim Stories', link: 'https://podcasts.com/newmuslimstories', cta: 'Listen', icon: 'bi bi-mic', desc: 'Inspiring stories from converts around the world.', download: false },
        { title: 'eBook: Islam for Beginners', link: '/downloads/islam-for-beginners.pdf', cta: 'Download', icon: 'bi bi-book', desc: 'Comprehensive introduction to Islam.', download: true },
      ],
      // Events
      events: [
        { title: 'New Muslim Meetup', badge: 'RSVP', badgeClass: 'bg-success text-white' },
        { title: 'Online Q&A Session', badge: 'Join', badgeClass: 'bg-primary text-white' },
        { title: 'Ramadan Preparation Webinar', badge: 'Register', badgeClass: 'bg-warning text-dark' },
        { title: 'Weekly Study Circle', badge: 'Join', badgeClass: 'bg-info text-white' },
        { title: 'Mosque Open Day', badge: 'Visit', badgeClass: 'bg-secondary text-white' },
      ],
      // Ask/Feedback
      question: '',
      questionSent: false,
      questionLoading: false,
      questionError: '',
      feedback: '',
      feedbackSent: false,
      feedbackLoading: false,
      feedbackError: '',
    };
  },
  computed: {
    progressPercent() {
      const total = this.journeySteps.length;
      const completed = this.journeySteps.filter(s => s.completed).length;
      return Math.round((completed / total) * 100);
    },
  },
  mounted() {
    // Load progress tracker from localStorage
    const savedProgress = localStorage.getItem('convertProgress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        if (Array.isArray(parsed) && parsed.length === this.journeySteps.length) {
          this.journeySteps.forEach((step, i) => { step.completed = parsed[i].completed; });
        }
      } catch {}
    }
    // Load quiz answers from localStorage
    const savedQuiz = localStorage.getItem('convertQuiz');
    if (savedQuiz) {
      try {
        const parsed = JSON.parse(savedQuiz);
        if (Array.isArray(parsed) && parsed.length === this.quizQuestions.length) {
          this.quizQuestions.forEach((q, i) => { q.userAnswer = parsed[i].userAnswer; });
        }
      } catch {}
    }
  },
  watch: {
    journeySteps: {
      handler(val) {
        localStorage.setItem('convertProgress', JSON.stringify(val));
      },
      deep: true
    },
    quizQuestions: {
      handler(val) {
        localStorage.setItem('convertQuiz', JSON.stringify(val));
      },
      deep: true
    }
  },
  methods: {
    updateProgress() {
      // Just triggers computed property update
    },
    resetProgress() {
      this.journeySteps.forEach(s => { s.completed = false; });
      localStorage.removeItem('convertProgress');
    },
    prevTestimonial() {
      this.testimonialIndex = (this.testimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
    },
    nextTestimonial() {
      this.testimonialIndex = (this.testimonialIndex + 1) % this.testimonials.length;
    },
    shareTestimonial() {
      const t = this.testimonials[this.testimonialIndex];
      const text = `"${t.text}" - ${t.name} from ${t.country}`;
      if (navigator.share) {
        navigator.share({ title: 'Convert Story', text });
      } else {
        navigator.clipboard.writeText(text);
        alert('Testimonial copied to clipboard!');
      }
    },
    selectQuizAnswer(qIdx, option) {
      if (this.quizCompleted) return;
      this.quizQuestions[qIdx].userAnswer = option;
    },
    submitQuiz() {
      let score = 0;
      this.quizQuestions.forEach(q => {
        if (q.userAnswer === q.answer) score++;
      });
      this.quizScore = score;
      this.quizCompleted = true;
    },
    resetQuiz() {
      this.quizQuestions.forEach(q => { q.userAnswer = null; });
      this.quizCompleted = false;
      this.quizScore = 0;
      localStorage.removeItem('convertQuiz');
    },
    submitQuestion() {
      if (!this.question.trim()) {
        this.questionError = 'Please enter your question.';
        return;
      }
      this.questionLoading = true;
      this.questionError = '';
      setTimeout(() => {
        this.questionSent = true;
        this.questionLoading = false;
        this.question = '';
        setTimeout(() => (this.questionSent = false), 4000);
      }, 1200);
    },
    submitFeedback() {
      if (!this.feedback.trim()) {
        this.feedbackError = 'Please enter your feedback.';
        return;
      }
      this.feedbackLoading = true;
      this.feedbackError = '';
      setTimeout(() => {
        this.feedbackSent = true;
        this.feedbackLoading = false;
        this.feedback = '';
        setTimeout(() => (this.feedbackSent = false), 4000);
      }, 1200);
    },
  },
};
</script>

<style scoped>
.convert-bg {
  background: linear-gradient(180deg, #f5f7fb 0%, #eef2f7 100%);
  color: #0f172a;
}

.convert-card {
  background: #fff;
  color: #0f172a;
  border-radius: 24px;
  border: none;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.1);
}

.card-title {
  font-weight: 700;
  color: #0f172a;
}

.convert-btn {
  border-radius: 999px;
  padding: 0.45rem 1.4rem;
  font-weight: 600;
  min-width: 160px;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.15);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.convert-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.convert-btn-outline {
  border-radius: 16px;
  border-width: 1px;
  border-color: rgba(0, 191, 166, 0.4);
  background: #fff;
  color: #0f3d3b;
  padding: 0.5rem 1rem;
  box-shadow: 0 10px 18px rgba(15, 23, 42, 0.1);
  transition: background 0.25s ease, color 0.25s ease;
}

.convert-btn-outline:hover {
  background: rgba(0, 191, 166, 0.12);
  color: #005247;
}

.progress-tracker {
  height: 30px;
  border-radius: 18px;
  overflow: hidden;
  background: rgba(34, 139, 34, 0.12);
  box-shadow: inset 0 2px 6px rgba(15, 23, 42, 0.12);
}

.progress-tracker-bar {
  background: linear-gradient(135deg, #00bfa6, #1a5f7a);
  border-radius: 18px;
}

.testimonial-avatar {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 2px solid rgba(34, 139, 34, 0.35);
  box-shadow: 0 12px 18px rgba(15, 23, 42, 0.2);
}

.fade-in {
  animation: fadeIn 0.8s ease-in both;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
