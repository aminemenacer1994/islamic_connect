<!-- NavTabs.vue -->
<template>
<div class="overflow-auto">
 <ul class="nav nav-tabs text-left justify-content-start pt-3 flex-nowrap" style="white-space: nowrap;" role="tablist">
  <li class="nav-item">
   <a class="nav-link active" data-bs-toggle="tab" href="#home" role="tab">
    <b>Translation</b>
   </a>
  </li>
  <li class="nav-item">
   <a class="nav-link" data-bs-toggle="tab" href="#profile" role="tab">
    <b>Tafseer</b>
   </a>
  </li>
  <li class="nav-item">
   <a class="nav-link" data-bs-toggle="tab" href="#messages" role="tab">
    <b>Transliteration</b>
   </a>
  </li>
  <!-- <li class="nav-item">
   <a class="nav-link" data-bs-toggle="tab" href="#data" role="tab">
    <b>Overview</b>
   </a>
  </li> -->
 </ul>
</div>
</template>

<script defer>
export default {
 name: 'NavTabs'
}
</script>

<style scoped>
.nav-item .nav-link,
.nav-tabs .nav-link {
 -webkit-transition: all 300ms ease 0s;
 -moz-transition: all 300ms ease 0s;
 -o-transition: all 300ms ease 0s;
 -ms-transition: all 300ms ease 0s;
 transition: all 300ms ease 0s;
}

.nav-tabs>.nav-item>.nav-link {
 color: #888888;
 margin: 0;
 margin-right: 5px;
 background-color: transparent;
 border: 1px solid transparent;
 font-size: 16px;
 line-height: 1.5;
}

.nav-tabs>.nav-item>.nav-link:hover {
 background-color: transparent;
}

.nav-tabs>.nav-item>.nav-link.active {
 background-color: rgba(0, 191, 166, 0.233);
 color: rgb(7, 6, 6);
 border-radius:8px;
 padding-bottom: 8%;
 box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.nav-tabs>.nav-item>.nav-link i.now-ui-icons {
 font-size: 16px;
 position: relative;
 top: 1px;
 margin-right: 3px;
}

.nav-tabs.nav-tabs-neutral>.nav-item>.nav-link {
 color: #ffffff;
}

.nav-tabs.nav-tabs-neutral>.nav-item>.nav-link.active {
 background-color: rgba(255, 255, 255, 0.2);
 color: #ffffff;
}
</style>