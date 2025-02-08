<template>
  <div class="container mt-4">
    <h1 class="display-5 fw-bold text-center mb-4">Islamic Podcasts</h1>
    <p class="text-center container mb-4">
      Explore and discover the latest Islamic podcasts, featuring insightful discussions, inspiring content, and topics
      to deepen your understanding and connection with Islam.
    </p>

    <!-- Bookmarks Section -->
    <!-- <div v-if="bookmarks.length || favourites.length" class="mb-4">
      <h4 class="display-6 pb-2 fw-bold fs-4 fs-md-3 fs-lg-2">
        Bookmark Podcasts
        <span class="badge bg-secondary ms-2">{{ bookmarks.length }}</span>
        <button class="btn btn-link btn-sm ms-3" type="button" data-bs-toggle="collapse"
          data-bs-target="#bookmarksCollapse" aria-expanded="false" aria-controls="bookmarksCollapse">
          <i class="bi bi-chevron-down"></i>
        </button>
      </h4>
      <div id="bookmarksCollapse" class="collapse">
        <div v-if="bookmarks.length" class="list-group">
          <div v-for="podcast in bookmarks" :key="podcast.title"
            class="list-group-item d-flex justify-content-between align-items-center row">
            <div class="col-12 col-md-6">
              <span class="fs-6">{{ podcast.title }}</span>
            </div>
            <div class="col-12 col-md-6 text-md-end">
              <button @click="goToPodcast(podcast)" class="btn btn-sm btn-outline-primary me-2">
                <i class="bi bi-play-circle"></i> Play Podcast
              </button>
              <button @click="removeBookmark(podcast)" class="btn btn-sm btn-outline-danger">
                <i class="bi bi-trash-fill"></i> Remove Bookmark
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="alert alert-info" role="alert">No bookmarked podcasts found.</div>
        </div>
      </div> -->

    <!-- Favourites -->
    <!-- <h4 class="display-6 fw-bold fs-4 fs-md-3 fs-lg-2 mt-4">
        Favourite Podcasts
        <span class="badge bg-secondary ms-2">{{ favourites.length }}</span>
        <button class="btn btn-link btn-sm ms-3" type="button" data-bs-toggle="collapse"
          data-bs-target="#favouritesCollapse" aria-expanded="false" aria-controls="favouritesCollapse">
          <i class="bi bi-chevron-down"></i>
        </button>
      </h4>
      <div id="favouritesCollapse" class="collapse">
        <div v-if="favourites.length" class="list-group">
          <div v-for="podcast in favourites" :key="podcast.title"
            class="list-group-item d-flex justify-content-between align-items-center row">
            <div class="col-12 col-md-6">
              <span class="fs-6">{{ podcast.title }}</span>
            </div>
            <div class="col-12 col-md-6 text-md-end">
              <button @click="goToPodcast(podcast)" class="btn btn-sm btn-outline-primary me-2">
                <i class="bi bi-play-circle"></i> Play Podcast
              </button>
              <button @click="removeFavourite(podcast)" class="btn btn-sm btn-outline-danger">
                <i class="bi bi-trash-fill"></i> Remove Favourite
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="alert alert-info" role="alert">No favourite podcasts found.</div>
        </div>
      </div> -->
    <!-- </div> -->


    
    <!-- Podcast Selection Dropdown -->
    <div class="d-flex align-items-center justify-content-between pb-3">
      <h4>Select a Podcast:</h4>
      <select class="form-select w-30" v-model="selectedPodcast" @change="fetchPodcasts">
        <option disabled value="">Select a podcast</option>
        <option v-for="podcast in islamicPodcasts" :key="podcast.rssUrl" :value="podcast">
          {{ podcast.name }}
        </option>
      </select>
    </div>

    <div v-if="selectedPodcast" class="d-flex align-items-start pt-3">
      <div>
        <p class="fw-bold display-5">{{ selectedPodcast.name }}</p>
        <p class="col-md-9 display-7">{{ selectedPodcast.desc }}</p>
      </div>      
      <img :src="selectedPodcast.image" :alt="selectedPodcast.name" class="selected-podcast-img" style="align-items: center; text-align: center;">

    </div>

    <div class="row">
      <div class="col-md-3" v-if="selectedPodcast">
        <select class="form-select" v-model="sortBy" @change="sortPodcasts">
          <option value="most-viewed">Most Viewed</option>
          <option value="least-viewed">Least Viewed</option>
        </select>
      </div>
      <div class="col-md-3 mb-3" v-if="selectedPodcast">
        <select class="form-select" v-model="durationFilter" @change="filterPodcasts">
          <option value="">All Durations</option>
          <option value="longest">Longest</option>
          <option value="shortest">Shortest</option>
          <option value="0-10">0 - 10 min</option>
          <option value="10-30">10 - 30 min</option>
          <option value="30-60">30 - 60 min</option>
          <option value="more-than-60">More than 1 hour</option>
        </select>
      </div>
      <div class="mb-3 col-md-6" v-if="selectedPodcast">
        <input type="search" class="form-control" placeholder="Search podcasts..." v-model="searchQuery"
          @input="onSearch" />
      </div>
    </div>

    <!-- Loading Spinner Appears Only When Podcasts Are Loading -->
    <div v-if="loading" class="d-flex align-items-center justify-content-center my-4">
      <div class="spinner-border text-success me-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <span class="text-muted">Podcasts are loading, please wait...</span>
    </div>

    <!-- Podcast Cards -->
    <div v-else-if="paginatedPodcasts.length">
      <div class="row row-cols-1 row-cols-sm-3 row-cols-md-3 g-4 mb-2">
        <div v-for="podcast in paginatedPodcasts" :key="podcast.title" class="col">
          <div class="card h-100"
            style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
            <div class="card-body">
              <h4 class="card-title display-5 fw-bold" v-html="highlightText(podcast.title)"></h4><br /><br />
              <p class="text-muted">Views: {{ podcast.views }}</p>
              <p class="text-muted">Published on: {{ formatDate(podcast.pubDate) }}</p>
              <div class="container text-center d-flex justify-content-between" style="bottom: 0;">
                <i :class="isBookmarked(podcast) ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'"
                  @click="toggleBookmark(podcast)" style="cursor: pointer; font-size: 1.5rem;"></i>
                <i :class="isFavourite(podcast) ? 'bi bi-heart-fill' : 'bi bi-heart'" @click="toggleFavourite(podcast)"
                  style="cursor: pointer; font-size: 1.5rem;"></i>
                <i class="bi bi-share" style="cursor: pointer; font-size: 1.5rem;" @click="shareOnWhatsApp(podcast)">
                </i>
                <i class="bi bi-download" style="cursor: pointer; font-size: 1.5rem;" @click="downloadAudio(podcast)">
                </i>
              </div>
            </div>
            <audio ref="audioPlayer" :controls="true" :src="podcast.audioUrl" v-if="podcast.audioUrl"
              class="w-100 audio" style="border-radius: 0; background: rgb(13, 182, 145);">
              Your browser does not support the audio element.
            </audio>
            <p v-else>No audio available for this podcast.</p>
          </div>
        </div>
      </div>

      <nav aria-label="Podcast pagination" class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
          </li>
          <li v-for="page in pages" :key="page" class="page-item" :class="{ 'active': currentPage === page }">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>

    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      podcastMeta: new Map(),
      ddurationFilter: "",
      selectedYear: "",
      selectedMonth: "",
      selectedWeek: "",
      selectedDay: "",
      years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weeks: ['1-7 days', '8-14 days', '15-21 days', '22-31 days'],
      days: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      selectedDateFilter: 'Select a Date filter',
      currentDate: new Date(),
      sortBy: 'most-viewed',
      selectedDateFilter: 'select date filter',
      selectedPodcast: "",
      islamicPodcasts:[
        {
          name: "Abdur-Raheem McCarthy",
          rssUrl: "https://muslimcentral.com/audio/abdur-raheem-mccarthy/feed/",
          desc: "Shaykh Abdur-Raheem McCarthy is a well-known Islamic speaker and educator with a unique ability to connect with people from diverse backgrounds. Born and raised in the United States, he converted to Islam and pursued Islamic studies in the Middle East. His lectures focus on practical applications of Islamic teachings, covering topics such as faith, character development, family life, and navigating the challenges of modern society. With a straightforward and engaging style, he emphasizes the importance of authentic knowledge, spiritual growth, and the balance between deen and dunya. His thought-provoking talks inspire listeners to implement Islamic values in their daily lives.",
          image: ('./images/abdur-raheem-mccarthy-150x150.jpg')
        },
        {
          name: "Hamza Tzortzis",
          rssUrl: "https://muslimcentral.com/audio/hamza-tzortzis/feed/",
          desc: "Ustadh Hamza Tzortzis is a prominent Muslim intellectual and da'ee specializing in Islamic philosophy, theology, and contemporary ideological challenges. As a former atheist who embraced Islam, he brings deep insights into debates on atheism, secularism, and the existence of God. His lectures explore the rational foundations of Islamic belief, demonstrating how faith is not just spiritual but intellectually fulfilling. Hamza engages with scholars, academics, and students, breaking down complex ideas into simple concepts, and empowering Muslims with confidence in their faith. His work with iERA (Islamic Education and Research Academy) has contributed significantly to da’wah efforts worldwide.",
          image: "https://muslimcentral.com/wp-content/uploads/2020/06/Hamza-Tzortzis.jpg"
        },
        {
          name: "Mikaeel Smith",
          rssUrl: "https://muslimcentral.com/audio/mikaeel-smith/feed/",
          desc: "Ustadh Mikaeel Smith is a scholar, teacher, and author focusing on Islamic character development, emotional intelligence, and the prophetic way of living. His lectures delve into the spiritual and psychological dimensions of Islam, exploring how faith can nurture inner peace, resilience, and positive relationships. He passionately emphasizes the importance of prophetic manners (akhlaq), dealing with emotions through an Islamic lens, and fostering a strong connection with Allah through love and mindfulness. With a soothing and empathetic teaching style, he helps listeners connect with their faith on a personal and transformative level.",
          image: "https://muslimcentral.com/wp-content/uploads/2020/06/Mikaeel-Smith.jpg"
        },
        {
          name: "Jamal Abdinasir",
          rssUrl: "https://muslimcentral.com/audio/jamal-abdinasir/feed/",
          desc: "Sheikh Jamal Abdinasir is an inspiring speaker known for his ability to make Islamic teachings accessible and applicable to everyday life. His lectures focus on self-improvement, spirituality, and family values, helping listeners build a stronger connection with their faith. He frequently addresses issues faced by Muslim youth, offering practical advice on navigating modern challenges while remaining steadfast in Islam. His engaging and motivational talks resonate with audiences seeking a deeper understanding of their faith.",
          image: "https://muslimcentral.com/wp-content/uploads/2020/06/Jamal-Abdinasir.jpg"
        },
        {
          name: "Ikram Sanaullah",
          rssUrl: "https://muslimcentral.com/audio/ikram-sanaullah/feed/",
          desc: "Ustadh Ikram Sanaullah is a passionate speaker dedicated to strengthening the faith of young Muslims. His lectures highlight the importance of Islamic identity, community involvement, and developing good character. Through storytelling and real-life examples, he connects with listeners on a personal level, encouraging them to embody Islamic values in their daily lives. His talks serve as a source of motivation for youth facing societal pressures, providing them with a strong foundation in Islamic teachings.",
          image: "https://muslimcentral.com/wp-content/uploads/2020/06/Ikram-Sanaullah.jpg"
        },
        {
          name: "Iqbal Gora",
          rssUrl: "https://muslimcentral.com/audio/iqbal-gora/feed/",
          desc: "Sheikh Iqbal Gora delivers insightful lectures on Islamic spirituality, the meaning of worship, and the significance of maintaining a strong relationship with Allah. His talks focus on personal development, patience, and gratitude as key aspects of a fulfilling Islamic life. He emphasizes the transformative power of faith, encouraging Muslims to develop sincerity in their worship and excellence in their daily interactions.",
          image: "https://muslimcentral.com/wp-content/uploads/2020/06/Iqbal-Gora.jpg"
        },
        {
          name: "Isam Rajab",
          rssUrl: "https://muslimcentral.com/audio/isam-rajab/feed/",
          desc: "Dr. Isam Rajab is a distinguished Islamic scholar specializing in Fiqh (Islamic jurisprudence) and ethics. His lectures provide detailed discussions on various aspects of Islamic law, including halal and haram, financial ethics, and family issues. He simplifies complex rulings for a broad audience, making Islamic law more accessible and practical for everyday life. His scholarly approach blends traditional Islamic knowledge with modern-day applications.",
          image: "https://muslimcentral.com/wp-content/uploads/2020/06/Isam-Rajab.jpg"
        },
        {
          name: "Khalid Yasin",
          rssUrl: "https://muslimcentral.com/audio/khalid-yasin/feed/",
          desc: "Sheikh Khalid Yasin is a renowned da'ee known for his passionate and thought-provoking lectures on Islam. His powerful speeches cover topics such as Tawheed (the oneness of Allah), the purpose of life, and the role of Muslims in contemporary society. He has traveled extensively, giving lectures and debates that address misconceptions about Islam, while inviting people to explore the truth of the religion. His lectures leave a lasting impact on both Muslims and non-Muslims alike.",
          image: "https://muslimcentral.com/wp-content/uploads/2020/06/Khalid-Yasin.jpg",
        },
      ],
      durationFilter: "",
      sortBy: "most-viewed",
      selectedDateFilter: "",
      selectedPodcast: "", // Stores the selected podcast object
      isDownloading: false,
      showToast: false,
      toastType: '',
      podcasts: [],
      filteredPodcasts: [],
      loading: false,
      rssUrl: 'https://themadmamluks.libsyn.com/rss',
      searchQuery: '',
      currentPage: 1,
      podcastsPerPage: 7,
      bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
      favourites: JSON.parse(localStorage.getItem('favourites')) || [],
      sortOption: 'mostViewed',
      dateFilter: 'weekly',
      durationFilter: 'longest',
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.filteredPodcasts.length / this.podcastsPerPage);
    },
    pages() {
      return Array.from({ length: Math.min(this.totalPages, 8) }, (_, i) => i + 1);
    },
    paginatedPodcasts() {
      const start = (this.currentPage - 1) * this.podcastsPerPage;
      return this.filteredPodcasts.slice(start, start + this.podcastsPerPage);
    },
    filteredPodcasts() {
      // Filter out podcasts with the specific phrase in the description
      return this.islamicPodcasts.filter(podcast =>
        !podcast.description.includes("No audio available for this podcast.")
      );
    },
    sortedPodcasts() {
      return this.applySorting([...this.filteredPodcasts]);
    }
  },

  methods: {
    applyFilters() {
      let filtered = [...this.podcasts];

      // Apply Duration Filter
      if (this.durationFilter) {
        filtered = filtered.filter(podcast => {
          if (this.durationFilter === "short") return podcast.duration <= 10;
          if (this.durationFilter === "medium") return podcast.duration > 10 && podcast.duration <= 30;
          if (this.durationFilter === "long") return podcast.duration > 30 && podcast.duration <= 60;
          if (this.durationFilter === "veryLong") return podcast.duration > 60;
          return true;
        });
      }

      // Apply Date Filter
      if (this.selectedDateFilter) {
        const now = new Date();
        filtered = filtered.filter(podcast => {
          const pubDate = new Date(podcast.pubDate);
          if (this.selectedDateFilter === "yearly") return pubDate.getFullYear() === now.getFullYear();
          if (this.selectedDateFilter === "monthly") return pubDate.getFullYear() === now.getFullYear() && pubDate.getMonth() === now.getMonth();
          if (this.selectedDateFilter === "weekly") return (now - pubDate) <= 7 * 24 * 60 * 60 * 1000;
          if (this.selectedDateFilter === "daily") return now.toDateString() === pubDate.toDateString();
          return true;
        });
      }

      // Apply Sorting by Views
      if (this.sortBy === "most-viewed") {
        filtered.sort((a, b) => b.views - a.views);
      } else if (this.sortBy === "least-viewed") {
        filtered.sort((a, b) => a.views - b.views);
      }

      this.filteredPodcasts = filtered;
    },
    shareOnWhatsApp(podcast) {
      if (!podcast || !podcast.audioUrl) {
        alert("Podcast information is missing!");
        return;
      }

      const text = `Listen to this Podcast:\n\n ${podcast.title}\n\n Listen here: ${podcast.audioUrl}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    },

    downloadAudio(podcast) {
      if (!podcast || !podcast.audioUrl) {
        alert("No audio available for download!");
        return;
      }

      // Create an anchor element dynamically
      const link = document.createElement("a");
      link.href = podcast.audioUrl; // Direct link to the MP3 file
      link.download = podcast.title ? `${podcast.title}.mp3` : "podcast.mp3"; // Set a filename
      link.style.display = "none";

      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link); // Cleanup
    },
    // When a year is selected, reset other filters and update podcasts
    onYearSelect() {
      this.selectedMonth = "";
      this.selectedWeek = "";
      this.selectedDay = "";
      this.updatePodcasts();
    },

    // When a month is selected, reset week/day and update podcasts
    onMonthSelect() {
      this.selectedWeek = "";
      this.selectedDay = "";
      this.updatePodcasts();
    },

    // When a week is selected, reset day and update podcasts
    onWeekSelect() {
      this.selectedDay = "";
      this.updatePodcasts();
    },

    // Fetch and update podcasts when filters change
    updatePodcasts() {
      console.log("Updating podcasts...");
      console.log("Year:", this.selectedYear);
      console.log("Month:", this.selectedMonth);
      console.log("Week:", this.selectedWeek);
      console.log("Day:", this.selectedDay);

      // Fetch the updated podcast list based on selected filters
      this.fetchPodcasts();
    },

    fetchPodcasts() {
      let filter = {
        year: this.selectedYear,
        month: this.selectedMonth,
        week: this.selectedWeek,
        day: this.selectedDay
      };

      console.log("Fetching podcasts with filter:", filter);
      // TODO: Replace with actual API call
    },

    sortPodcasts() {
      this.filteredPodcasts = this.applySorting(this.filteredPodcasts);
    },
    filterPodcasts() {
      this.filteredPodcasts = this.applyDurationFilter([...this.podcasts]);
    },

    applySorting(filtered) {
      switch (this.sortBy) {
        case "most-viewed":
          return filtered.sort((a, b) => b.views - a.views);
        case "least-viewed":
          return filtered.sort((a, b) => a.views - b.views);
        default:
          return filtered;
      }
    },

    updatePodcasts() {
      console.log("Updating podcasts...");
      this.fetchPodcasts();
    },

    applyDateFilter(filtered) {
      const now = new Date();
      return filtered.filter(podcast => {
        const pubDate = new Date(podcast.pubDate);
        switch (this.selectedDateFilter) {
          case "yearly":
            return pubDate.getFullYear() === now.getFullYear();
          case "monthly":
            return pubDate.getFullYear() === now.getFullYear() && pubDate.getMonth() === now.getMonth();
          case "weekly":
            return now - pubDate <= 7 * 24 * 60 * 60 * 1000;
          case "daily":
            return now.toDateString() === pubDate.toDateString();
          default:
            return true;
        }
      });
    },

    updatePodcasts() {
      console.log("Updating podcasts...");
      console.log("Selected Year:", this.selectedYear);
      console.log("Selected Month:", this.selectedMonth);
      console.log("Selected Week:", this.selectedWeek);
      console.log("Selected Day:", this.selectedDay);

      // Fetch audio podcasts based on selected filters
      this.fetchPodcasts();
    },

    async fetchPodcasts() {
      if (!this.selectedPodcast) return;

      this.loading = true;
      this.podcasts = [];
      this.rssUrl = this.selectedPodcast.rssUrl;

      try {
        // Use a CORS proxy to fetch the RSS feed
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(this.rssUrl)}`);
        const data = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");
        const items = xmlDoc.getElementsByTagName("item");

        this.podcasts = Array.from(items)
          .map(item => ({
            title: item.getElementsByTagName("title")[0]?.textContent || "No title",
            pubDate: item.getElementsByTagName("pubDate")[0]?.textContent || "Unknown",
            description: item.getElementsByTagName("description")[0]?.textContent || "No description available.",
            audioUrl: item.getElementsByTagName("enclosure")[0]?.getAttribute("url") || null,
            // audioUrl: this.getAudioUrl(item),

            views: Math.floor(Math.random() * 1000),
            duration: Math.floor(Math.random() * 60) + 5, // Simulated duration
            language: this.detectLanguage(item.getElementsByTagName("title")[0]?.textContent || '') // Detect language
          })).filter(podcast => podcast.audioUrl); // Remove items without audio

        this.applyFilters(); // Apply filters after fetching
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        this.loading = false;
      }
    },

    // getAudioUrl(item) {
    //   const enclosure = item.getElementsByTagName("enclosure")[0];
    //   return enclosure ? enclosure.getAttribute("url") : null;
    // },

    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', options); // Using 'en-GB' for British date format
    },

    applyFilters() {
      let filtered = [...this.podcasts];

      // Apply language filter
      if (this.selectedLanguageFilter) {
        filtered = filtered.filter(podcast => podcast.language === this.selectedLanguageFilter);
      }

      // Apply date filter
      if (this.selectedDateFilter) {
        filtered = this.applyDateFilter(filtered);
      }

      // Apply duration filter
      if (this.durationFilter) {
        filtered = this.applyDurationFilter(filtered);
      }

      // Apply sorting
      if (this.sortOption) {
        filtered = this.applySorting(filtered);
      }

      this.filteredPodcasts = filtered; // Update filtered podcasts
    },

    detectLanguage(text) {
      if (/[؀-ۿ]/.test(text)) {
        return 'Arabic';
      } else if (/[A-Za-z]/.test(text)) {
        return 'English';
      } else {
        return 'Unknown';
      }
    },

    applyDateFilter(filtered) {
      const currentDate = new Date();

      if (this.selectedDateFilter === 'yearly' && this.selectedYear) {
        return filtered.filter(podcast => new Date(podcast.pubDate).getFullYear() === this.selectedYear);
      } else if (this.selectedDateFilter === 'monthly' && this.selectedMonth) {
        const monthIndex = this.months.indexOf(this.selectedMonth);
        return filtered.filter(podcast => new Date(podcast.pubDate).getMonth() === monthIndex);
      } else if (this.selectedDateFilter === 'weekly' && this.selectedWeek) {
        // Handle weekly logic here if applicable
        return filtered; // Update with weekly logic
      } else if (this.selectedDateFilter === 'daily' && this.selectedDay) {
        return filtered.filter(podcast => new Date(podcast.pubDate).getDate() === parseInt(this.selectedDay));
      }
      return filtered; // Return unmodified if no valid filter
    },

    applyDurationFilter(podcasts) {
      switch (this.durationFilter) {
        case "longest":
          return podcasts.slice().sort((a, b) => b.duration - a.duration);
        case "shortest":
          return podcasts.slice().sort((a, b) => a.duration - b.duration);
        case "0-10":
          return podcasts.filter(podcast => podcast.duration <= 10);
        case "10-30":
          return podcasts.filter(podcast => podcast.duration > 10 && podcast.duration <= 30);
        case "30-60":
          return podcasts.filter(podcast => podcast.duration > 30 && podcast.duration <= 60);
        case "more-than-60":
          return podcasts.filter(podcast => podcast.duration > 60);
        default:
          return podcasts;
      }
    },

    processRSSFeed(rssText) {
      // TODO: Implement RSS parsing logic
      console.log("Processing RSS Feed...");
    },

    selectPodcast(podcast) {
      this.selectedPodcast = podcast;
      this.fetchPodcasts();
    },

    onSearch() {
      this.currentPage = 1;
      const query = this.searchQuery.toLowerCase();
      this.filteredPodcasts = this.podcasts.filter(podcast => podcast.title.toLowerCase().includes(query));
    },

    highlightText(title) {
      if (!this.searchQuery) return title;
      return title.replace(
        new RegExp(`(${this.searchQuery})`, "gi"),
        `<span style="background-color: rgba(0, 191, 166, 0.6); padding: 4px; border-radius: 5px;">$1</span>`
      );
    },

    toggleBookmark(podcast) {
      const index = this.bookmarks.findIndex(item => item.title === podcast.title);
      if (index > -1) this.bookmarks.splice(index, 1);
      else this.bookmarks.push(podcast);
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    },

    toggleFavourite(podcast) {
      const index = this.favourites.findIndex(item => item.title === podcast.title);
      if (index > -1) this.favourites.splice(index, 1);
      else this.favourites.push(podcast);
      localStorage.setItem('favourites', JSON.stringify(this.favourites));
    },

    isBookmarked(podcast) {
      return this.bookmarks.some(bookmark => bookmark.title === podcast.title);
    },

    isFavourite(podcast) {
      return this.favourites.some(fav => fav.title === podcast.title);
    },

    changePage(page) {
      if (page !== '...') this.currentPage = page;
    },
  },

  mounted() {
    this.fetchPodcasts().then(() => {
      this.applyFilters(); // Apply filters once podcasts are loaded
    });
  },

  watch: {
    searchQuery: "onSearch",
    selectedYear: 'applyFilters',
    selectedMonth: 'applyFilters',
    selectedWeek: 'applyFilters',
    selectedDay: 'applyFilters',
    sortOption: 'applyFilters',
    durationFilter: 'applyFilters',
    dateFilter: 'applyFilters',
  }
};
</script>

<style scoped>
@media (max-width: 576px) {
  .pagination {
    /* display: flex; */
    flex-wrap: nowrap;
    /* Prevent wrapping */
    justify-content: center;
    /* Centre the pagination */
  }
}

.spinner-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
}

.toast-container {
  z-index: 1050;
}

.audio {
  border-radius: 0 !important;
}

audio::-webkit-media-controls-panel {
  background: rgb(13, 182, 145)
}

.card {
  height: 100%;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  color: #333;
}

.pagination .page-item.disabled .page-link {
  cursor: not-allowed;
}

.pagination .page-link {
  cursor: pointer;
}

@media (max-width: 767px) {
  .pagination {
    /* display: block; */
    text-align: center;
  }
}
</style>
