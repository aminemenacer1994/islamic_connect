<template>
  <div v-if="information !== null">
    <div class="row" style="padding:10px">
      <div class="text-center">
        <hr>
        <div :style="{ color: iconColor }">
          <h3>{{ information.title }}</h3>
          <p>{{ information.content }}</p>
        </div>
        <div class="row">
          <div class="col">
            <a href="/bookmarks" class="h4">
              <i :style="{ color: iconColor }" class="bi bi-bookmark h4"></i>
            </a>
          </div>
          <div class="col">
            <a href="/notes" class="h4">
              <i :style="{ color: iconColor }" class="bi bi-file-earmark-text h4"></i>
            </a>
          </div>
          <!-- <div class="col">
            <a href="/group_notes" class="h4">
              <i :style="{ color: iconColor }" class="bi bi-boxes h3"></i>
            </a>
          </div> -->
          <div class="col">
            <a href="/profile" class="h2">
              <i :style="{ color: iconColor }" class="bi bi-person h2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script defer>
export default {
  name: 'BookmarksAndNotes',
  props: {
    information: {
      type: Object,
      default: null,
    },
    iconColor: {
      type: String,
      default: '',
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

