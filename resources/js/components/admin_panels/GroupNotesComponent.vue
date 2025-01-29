<template>
<div>
 <h2 class="pt-4 pb-3 text-center"><strong>Notes & Reflections Board</strong></h2>
 <p class="lead container">This page is a space to share your personal Islamic reflections and insights with others. Together, we can inspire, learn, and grow in our faith, helping each other on our spiritual journeys through shared thoughts and reflections.</p>

 <div>
  <!-- Container visible only on mobile screens -->
  <div class="container text-center mt-3 d-md-none">
   <div class="row pb-2 text-center">
    <div class="col">
     <span class="badge h3" style="width:100%;font-size:18px;border-radius:10px; color:#B70D52;background:#ead1dc">
      <a href="/bookmarks" style="text-decoration:none;color:#B70D52;background:#ead1dc">Bookmarks</a>
     </span>
    </div>
    <div class="col">
     <span class="badge h3" style="width:100%;font-size:18px;border-radius:10px; color:#0263FF;background:#c2d8fb">
      <a href="/collection" style="text-decoration:none;color:#0263FF;background:#c2d8fb">Collections</a>
     </span>
    </div>
    <div class="col">
     <span class="badge h3" style="width:100%;font-size:18px;border-radius:10px; color:#3D8F67;background:#d1f4d0">
      <a href="/notes" style="text-decoration:none;color:#3D8F67;background:#d1f4d0">Notes</a>
     </span>
    </div>
   </div>
  </div>

  <div class="container text-center">
    <div class="row">
      
      <div class="col-md-6">
        <h5>
          <span
            v-for="option in filterOptions"
            :key="option.value"
            @click="handleFilterClick(option.value)"
            class="badge me-2 mb-2 p-2"
            :class="[
              selectedFilter === option.value 
                ? 'bg-primary-whatsapp text-white' 
                : 'bg-secondary-whatsapp text-white'
            ]"
            style="cursor: pointer; user-select: none;"
          >
            {{ option.label }}
          </span>
          
          <strong>The total amount of notes:</strong>
          <b style="color:rgb(0, 191, 166)">{{ notes.length }}</b>
         
        </h5>
      </div>
      <div class="col-md-6">
      <div class="row" >
        <input type="text" style="border: 1px solid #075E54" v-model="searchTerm" placeholder="Search notes keyword..." class="form-control mb-4" />
      </div>
      
      </div>
    </div>
  </div>

  <!-- Notes Container -->
  <div class="container container-notes">
    <div ref="targetTranslationElement" class="row collage">
        <div class="collage-item mb-4" v-for="(note, index) in filteredNotes" :key="note.id">
            <!-- Note Card -->
            <div class="card" style="border-radius:8px; padding:4px; background:white; border: 2px solid rgba(0, 191, 166);">
                <div class="card-body">
                    <div class="mt-2">
                        <h5><strong>Note:</strong></h5>
                        <p :ref="'targetElement-' + index" v-html="highlightText(truncatedHtml(note.ayah_notes))"></p> <!-- Dynamic ref -->
                    </div>
                    <h5><strong>Date created:</strong></h5>
                    <p>{{ formatDate(note.created_at) }}</p>
                    <!-- <hr /> -->
                    <div class="container text-center">
                        <form @submit.prevent="createNote">
                            <div class="row">
                                <div class="col">
                                  <i class="bi bi-eye me-3 h3" style="cursor: pointer;" @click="viewModal(note)" data-bs-toggle="modal" data-bs-target="#viewNotes"></i>
                                </div> 
                                <div class="col">
                                  <i class="bi bi-whatsapp h4 me-3 text-center" style="cursor: pointer;" @click="shareTextViaWhatsApp3(index)"></i> 
                                </div>
                                <div class="col">
                                  <i class="bi bi-file-earmark-text h4 me-3 text-center" style="cursor: pointer;" @click="createNote"></i>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>



  <!-- View Note Modal -->
<div class="modal fade" id="viewNotes" tabindex="-1" aria-labelledby="viewNotesLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-dark" id="viewNotesLabel"><b>View Note</b></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
          <!-- <div class="mb-3">
            <label class="form-label"><strong>Surah Name:</strong></label>
            <p class="mt-2 text-dark text-left">{{ form.surah_name }}</p>
          </div>
          <div class="mb-3">
            <label class="form-label"><strong>Ayah Verse Arabic:</strong></label>
            <p class="mt-2 text-dark text-left">{{ form.ayah_verse_ar }}</p>
          </div>
          <div class="mb-3">
            <label class="form-label"><strong>English Info:</strong></label>
            <p class="mt-2 text-dark text-left">{{ form.ayah_verse_en }}</p>
          </div> -->
          <div class="mb-3">
            <label class="form-label"><strong>Notes:</strong></label>
            <div class="mt-2 text-dark text-left" v-html="form.ayah_notes"></div>
          </div>
          <div class="mb-3">
            <label class="form-label"><strong>Date Created:</strong></label>
            <p class="mt-2 text-dark text-left">{{ extractDate(form.created_at) }}</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

 </div>
 
 </div>
</template>

<script>
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

["note"]
export default {
  
 data() {
  return {
   targetTranslationRef: 'targetTranslationElement',
   selectedNote: null,
   notes: [],
   selectedFilter: this.getStoredFilter() || '',
   searchTerm: "",
   startDate: '',
   endDate: '',
   selectedFilter: "all", // Default filter is "All"
   filterOptions: [{
     value: 'all',
     label: 'All Notes'
    },
    {
     value: 'today',
     label: 'Today'
    },
    {
     value: 'yesterday',
     label: 'Yesterday'
    },
    {
     value: 'lastWeek',
     label: 'Last Week'
    },
    {
     value: 'lastMonth',
     label: 'Last Month'
    }
   ],
   form: {
    surah_name: "",
    ayah_notes: "",
    created_at: "",
   },
  };
 },
  props:{
    targetTranslationRef: {
   type: String,
   default: 'targetTranslationElement'
    },
  },
 async mounted() {
  await this.fetchNotes();
 },
 computed: {
   
  filteredNotes() {
    const today = new Date();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const yesterday = new Date(today.getTime() - oneDayInMs);
    const oneWeekInMs = 7 * oneDayInMs;
    const oneMonthAgo = new Date(today.getTime() - 30 * oneDayInMs);

    const start = this.startDate ? new Date(this.startDate) : null;
    const end = this.endDate ? new Date(this.endDate) : null;
    const keyword = this.searchTerm ? this.searchTerm.toLowerCase() : null;

    return this.notes.filter(note => {
      const noteDate = new Date(note.created_at);

      // 1. Search term filtering
      let matchesSearch = true;
      if (keyword) {
        const surahName = note.surah_name ? note.surah_name.toLowerCase() : "";
        const ayahNotes = note.ayah_notes ? note.ayah_notes.toLowerCase() : "";
        matchesSearch = surahName.includes(keyword) || ayahNotes.includes(keyword);
      }

      // 2. Date range filtering (start and end date)
      let matchesDateRange = true;
      if (start && end) {
        matchesDateRange = noteDate >= start && noteDate <= end;
      }

      // 3. Time period filtering (today, yesterday, last week, last month)
      let matchesPeriod = true;
      if (this.selectedFilter) {
        switch (this.selectedFilter) {
          case "today":
            matchesPeriod = noteDate.toDateString() === today.toDateString();
            break;
          case "yesterday":
            matchesPeriod = noteDate.toDateString() === yesterday.toDateString();
            break;
          case "lastWeek":
            matchesPeriod = noteDate >= new Date(today.getTime() - oneWeekInMs);
            break;
          case "lastMonth":
            matchesPeriod = noteDate >= oneMonthAgo;
            break;
          default:
            matchesPeriod = true;
        }
      }

      // Return true only if the note matches all criteria
      return matchesSearch && matchesDateRange && matchesPeriod;
    });
  }
},
 methods: {
  
  handleFilterClick(value) {
    this.selectedFilter = value;
    localStorage.setItem('selectedFilter', value);
  },
  getStoredFilter() {
    return localStorage.getItem('selectedFilter');
  },
  
  highlightText(text) {
    if (!this.searchTerm || !text) {
      return text;
    }
    const keyword = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special chars
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  },
  
  async fetchNotes() {
    try {
      const response = await fetch(`/fetch-notes`);

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data = await response.json();
      console.log("Fetched notes:", data); // Check data in the console

      this.notes = data; // Bind the fetched data to the 'notes' property
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  },
  viewModal(note) {
    this.selectedNote = note; 
    // Populate the form data with the selected note's data
    this.form.surah_name = note.surah_name;
    this.form.ayah_verse_ar = note.ayah_verse_ar;
    this.form.ayah_verse_en = note.ayah_verse_en;
    this.form.ayah_notes = note.ayah_notes;
    this.form.created_at = note.created_at;
  },
  extractDate(dateTimeString) {
   return dateTimeString.split('T')[0];
  },
  truncatedHtml(html, maxLength = 400) {
   const div = document.createElement("div");
   div.innerHTML = html;
   const plainText = div.textContent || div.innerText || "";
   if (plainText.length > maxLength) {
    const truncatedText = plainText.substring(0, maxLength) + "...";
    return truncatedText;
   }
   return plainText;
  },
  formatDate(dateString) {
   const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
   };
   return new Date(dateString).toLocaleDateString(undefined, options);
  }
 },
 watch: {
  selectedFilter(newValue) {
   console.log("Selected filter changed:", newValue);
  },
  filteredNotes: {
   handler(newValue) {
    console.log("Filtered notes:", newValue);
   },
   deep: true
  }
 }
};
</script>

<style scoped>

i {
  color: #000; /* Default color of the icon */
  transition: color 0.3s ease; /* Smooth color transition on hover */
}

/* Change color on hover */
i:hover {
  color: #00bfa6; /* Change to your desired color */
}


.highlight {
  background-color: yellow;
}
.bg-primary-whatsapp {
 background-color: #00bfa6;
 /* WhatsApp green */
}

.bg-secondary-whatsapp {
 background-color: #075E54;
 /* WhatsApp dark green */
}

.text-green {
 color: #25D366;
 /* WhatsApp green */
}

.text-white {
 color: #FFFFFF;
}

.container-notes {
 column-count: 4;
 max-width: 1500px;
}

.row.collage {
 display: block;
}

.collage-item {
 break-inside: avoid;
}

.card {
 background-color: #ffffff;
 padding: 1em;
 margin-bottom: 1.5em;
}

@media (max-width: 992px) {
 .container {
  column-count: 2;
 }
}

@media (max-width: 576px) {
 .container {
  column-count: 1;
 }
}

.like-section {
 display: flex;
 align-items: center;
}

.bi-heart {
 font-size: 1.5rem;
}

.bi-heart-fill {
 font-size: 1.5rem;
}

.badge.active {
 background-color: rgba(0, 191, 166, 0.2);
 color: rgb(5, 32, 29);
 border: 1px solid rgba(0, 191, 166);
}



.close {
  float: right;
  cursor: pointer;
  font-size: 24px;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
