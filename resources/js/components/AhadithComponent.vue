<template>
<div id="app">
 <!-- correction modal -->
 <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
   <div class="modal-content form">
    <div class="modal-header">
     <h5 class="modal-title" id="exampleModalLabel">
      <b>Report a Mistake</b>
     </h5>
    </div>
    <div class="modal-body">
     <form @submit.prevent="createCorrection()">
      <div class="row container">
       <div class="col">
        <input v-model="form.name" type="text" class="form-control" name="name" placeholder="First name (Optional)" aria-label="First name" />
       </div>
       <div class="col">
        <input v-model="form.email" type="text" class="form-control" name="email" placeholder="Email Address (Optional)" aria-label="Email Address" />
       </div>
      </div>
      <div class="row mt-3 container">
       <div class="col">
        <input v-model="form.hadith_num" type="text" class="form-control" name="hadith_num" placeholder="Hadith number" aria-label="Hadith number" />
       </div>

       <div class="col">
        <select class="form-control" name="mistake_type" v-model="form.mistake_type">
         <option value="" disabled>
          Select Type
         </option>
         <option value="Spelling mistakes">
          Spelling mistakes
         </option>
         <option value="Translation error">
          Translation error
         </option>
         <option value="Reference mismatch">
          Reference mismatch
         </option>
        </select>
       </div>
      </div>
      <div class="row container mt-3">
       <textarea v-model="form.added_notes" class="form-control container mb-3" name="added_notes" placeholder="Explain to us exactly what the problem is" id="added_comments" rows="5"></textarea>
      </div>
      <div class="modal-footer">
       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Close
       </button>
       <button type="submit" class="btn btn-success">
        Save changes
       </button>
      </div>
     </form>
    </div>
   </div>
  </div>
 </div>

 <div class="row">
  <div class="col-md-3"></div>
  <div class="col-md-6" style="display: flex; text-align: center">
   <div class="card-header text-center">
    <h1 class="card-text" style="font-family:inter">
     Hadith Collection
    </h1>

    <h5 class="card-text lead text-muted mb-0 " style="line-height: 1.7em; ; ">
     Hadiths are the recorded sayings, actions, and approvals of Prophet Muhammad (peace be upon him) in Islam.
    </h5>
   </div>
  </div>
  <div class="col-md-3"></div>
 </div>

 <div class="conainer">
  <div class="row">
   <!-- left side ahadith list -->
   <div class="col-md-8">
    <!-- search -->
    <form class="mb-3 mt-3 col-md-12" style="display: flex" @submit.prevent="search()" v-if="ahadith != null">
     <input style="padding: 12px" class="form-control mr-2 icon col-lg-12" type="search" id="search" name="search" @keyup="search" v-model="searchFilters.hadith_en" placeholder="Search for Keywords, sentences or paragraphs " aria-label="Search" />
    </form>

    <div class="row custom-scrollbar" v-if="ahadith != null">
     <div class="container-fluid col-md-12" style="display: flex; border-radius: 10px" v-for="hadith in ahadith" :key="hadith.id" :value="hadith.id">
      <div class="card-body mb-2">
       <div class="row container">
        <div class="col-md-11">
         <h3 style="display: flex;">
          <img src="/images/.png" class="mb-1 pr-3 pb-4" loading="lazy"/>{{ hadith.chapter.chapter_text  }}
         </h3>
        </div>
        <div class="col-md-1" style="display: flex">
         
        </div>
       </div>
       <hr />
       <div class="container-fluid">
        <h5 style="line-height: 1.6em" class="text-right">
         {{ hadith.hadith_ar }}
        </h5>
        <br />
        <h5 style="line-height: 1.6em;">
         {{ hadith.hadith_en }}
        </h5>

       </div>
       <hr />
       <div class="row">
        <div class="col-9" style="background: lighgrey">
         <h6 style="background: lighgrey;">
          <b class="pr-2">Reference:</b> Book
          {{ hadith.chapter_id }}
         </h6>
         <h6 style="background: lighgrey;">
          <b class="pr-2">Hadith Num:</b>
          {{ hadith.id }}
         </h6>

        </div>
        <div class="col-3" style="background: lighgrey">
         <h6 class="report-mistake" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <i class="fas fa-fw fa-edit mr-2"></i>Report Mistake
         </h6>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>

   <!-- right side chapter list -->
   <div class="col-md-4 ">

    <div class=" row container-fluid" style="flex-direction: column">
     <form class="mt-3 mb-2">
      <select class="form-control" v-model="imam" @change="getChapters()">
       <option value="0">
        <!-- <span>Select Imam</span> -->
       </option>
       <option v-for="data in imams" :key="data.id" :value="data.id">
        {{ data.imam_name }}
       </option>
      </select>
     </form>

     <div class="custom-scrollbar">
      <h5 class="text-left lead  mb-2">
       <!-- <h4 style="">Books:</h4> -->
      </h5>

      <ul class="col-md-4 list-group container-fluid" v-for="(chapter, chapterId) in chapters" :key="chapterId" @click="getAhadiths(chapter.chapter_id)" :class="{ 'selected': selectedIndex === chapterId }">

       <li class="list-group-item container-fluid min-width:100%" id="toggle">
        <h5 class="lead mb-2" style="">
         {{ chapter.chapter_text }}
        </h5>
       </li>
      </ul>
     </div>
    </div>
   </div>
  </div>
 </div>
</div>
</template>

 <!-- multiple input sections 
    <div class="row  mt-3 text-center pt-3 container-fluid">
      <div class="col-md-12 pt-3 text-center" style="box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,rgba(0, 0, 0, 0.24) 0px 1px 2px;border-radius: 10px;background: transparent;border: 3px solid #c3e6cb;">
        <div class="row">
          <div class="col-md-12 container" style="display: flex; text-align: center">
            
            <label class="pt-2 pl-3 pr-2" style="display: flex">Imam:</label>
            <form class="col-md-3">
              <select class="form-control" v-model="imam" @change="getChapters()">
                <option value="0">
                  <span>Select Imam</span>
                </option>
                <option v-for="data in imams" :key="data.id" :value="data.id">
                  {{ data.imam_name }}
                </option>
              </select>
            </form>

            <label class="pt-2 pl-3 pr-3">Chapter:</label>
            <form class="col-md-3">
              <select class="form-control" v-model="chapter_id" @change="getAhadiths()">
                <option value="0">
                  <span>Select Chapter</span>
                </option>
                <option v-for="data in chapters" :key="data.id" :value="data.id">
                  {{ data.chapter_text }}
                </option>
              </select>
            </form>

            <form class="mb-4 col-md-4" style="display: flex" @submit.prevent="search()">
              <input style="padding: 12px" class="form-control mr-2 icon col-lg-12" type="search" id="search" name="search" @keyup="search" v-model="searchFilters.hadith_en" placeholder="Search for Keyword" aria-label="Search" />
            </form>
            <hr />
          </div>
        </div>
      </div>
    </div> 
  -->

<style scoped>

.list-group-item{
  cursor: pointer; 
  background: transparent; 
  padding:15px;
}

.list-group{
  min-width: 100%; 
  cursor: pointer
}

.form-control{
  border: 4px solid #c3e6cb;
  border-radius: 8px;
  padding-bottom:8px
}

.report-mistake{
  background: lighgrey;
  cursor: pointer;
}

img{
  width: 50px;
  margin-right:10px;
}
.card-body{
 background: white; 
 padding:30px;
 border-radius: 10px; 
 box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.selected {
 background-color: #c3e6cb;
}

.custom-scrollbar {
 background-color: transparent;
 height: 1000px;
 width: 100%;
 border-radius: 6px;
 box-shadow: 0 4px 28px rgba(123, 151, 158, 0.25);
 border: 1px solid #d6dee1;
 padding: 1rem;
 border-radius: 6px;
 border: 1px solid #d6dee1;
 padding: 1rem;
 background-color: transparent;
 outline: 1px solid #c3e6cb;
 overflow: scroll;
 border: 5px solid #c3e6cb;
 border-radius: 8px;
}

.custom-scrollbar-chapters {
 background-color: transparent;
 height: 600px;
 width: 100%;
 border-radius: 6px;
 box-shadow: 0 4px 28px rgba(123, 151, 158, 0.25);
 border: 1px solid #d6dee1;
 padding: 1rem;
 border-radius: 6px;
 border: 1px solid #d6dee1;
 padding: 1rem;
 background-color: transparent;
 outline: 1px solid #c3e6cb;
 overflow: scroll;
}

.highlighted {
 background-color: yellow;
 font-weight: bold;
}

.red {
 background: red;
}
</style>

<script defer>
import axios from "axios";

export default {
 mounted() {
  this.getImams();
  // this.getAhadiths();
 },
 data() {
  return {
   selectedIndex: null,
   chapterId: null,

   data: [],
   imams: [],
   chapters: [],

   imam: null,
   chapter: null,
   chapter_id: 0,
   imam: 0,
   ahadith: null,
   hadith_en: "",
   chapter_text: "",

   form: new Form({
    id: "",
    name: "",
    email: "",
    mistake_type: "",
    added_notes: "",
    hadith_num: "",
   }),

   searchFilters: new Form({
    id: "",
    hadith_en: "",
   }),

  };
 },
 methods: {
  getAhadiths: function (chapterId) {
   this.selectedIndex = chapterId - 1;
   axios
    .get("/get_ahadiths", {
     params: {
      chapterId: chapterId,
     },
    })
    .then(
     function (response) {
      this.selectedHadith = chapterId;
      this.ahadith = response.data;
     }.bind(this)
    );
  },

  search() {
   var filteredHadiths = [];
   axios
    .post("/search", this.searchFilters)
    .then((data) => {
     filteredHadiths = data.data;
    })
    .catch(function (err) {
     console.log(err);
    })
    .finally((data) => {
     this.ahadith = filteredHadiths;
    });
  },

  createCorrection() {
   Swal.fire({
    title: "Are you sure?",
    text: "You want to create a new Correction !",
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "#d33",
    confirmButtonText: "Create correction!",
   }).then((result) => {
    if (result.isConfirmed) {
     axios
      .post("/api/submit-correction", this.form)
      .then((res) => {
       if (!res.data.success) {
        Swal.fire({
         position: "top-end",
         icon: "success",
         title: "Correction created successfully ",
         showConfirmButton: false,
         timer: 1500,
        });
        $("#exampleModal").modal("hide");
       } else if (res.data.success) {
        Swal.fire(
         "Error!",
         "Unable to create correction.",
         "error"
        );
       }
      })
      .catch(function (err) {});
    }
   });
  },

  getImams: function () {
   axios
    .get("/get_imams", {
     params: {
      id: this.imam,
     },
    })
    .then(
     function (response) {
      this.imams = response.data;
     }.bind(this)
    );
  },

  getChapters: function () {
   axios
    .get("/get_chapters", {
     params: {
      imam_id: this.imam,
     },
    })
    .then(
     function (response) {
      this.chapters = response.data;
     }.bind(this)
    );
  },
 },
};
</script>
