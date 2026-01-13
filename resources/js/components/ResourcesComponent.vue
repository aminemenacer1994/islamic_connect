<template>
  <div id="app">
    <div class="container py-5">
      <div class="row justify-content-center text-center ">
        <div class="col-lg-10 col-xl-10">
          <h1 class="display-5 fw-bold" style="color:#0b1320;letter-spacing:-.02em;margin-bottom:.25rem;">Islamic
            Resources</h1>
          <p class="lead" style="color:#475569;max-width:920px;margin:0 auto;">Discover live Quranic reciters stations
            from renowned reciters worldwide.</p>
        </div>
      </div>
    <div class="resources-page">
      <div class="resource-card">
        <div class="resource-card__header">
          <div class="resource-card__icon">
            <i class="bi bi-brightness-high"></i>
          </div>
          <h2 class="resource-card__title">Focus of This Lesson</h2>
        </div>
        <p class="resource-card__body">
          To understand the definitive Islamic descriptions of Paradise and Hell their nature, inhabitants,
          conditions for entry, and the profound implications these eternal realities should have on our present lives.
        </p>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ResourcesComponent',
};
</script>
<style scoped>
.resources-page {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.resource-card {
  width: min(720px, 100%);
  padding: 1rem 1.25rem 1.75rem;
  border-radius: 1.5rem;
  background: linear-gradient(180deg, #ffffff 0%, #f8f8fb 100%);
  box-shadow: 0 20px 35px rgba(76, 95, 138, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.resource-card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.resource-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: #f4f4ff;
  display: grid;
  place-items: center;
  font-size: 1.35rem;
  color: #1f1e43;
}

.resource-card__title {
  flex: 1;
  margin: 0;
  font-size: 1.65rem;
  font-weight: 600;
  color: #121020;
}

.resource-card__controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  border: none;
  border-radius: 999px;
  padding: 0.4rem 0.75rem;
  font-weight: 600;
  background: #fff;
  box-shadow: inset 0 0 0 1px rgba(17, 24, 39, 0.15);
  color: #1f1e43;
  cursor: default;
}

.resource-card__body {
  margin: 0;
  padding: 1rem 1.25rem;
  border-radius: 1.25rem;
  background: #fff;
  line-height: 1.6;
  color: #4a4a5a;
  font-size: 1rem;
  box-shadow: inset 0 0 0 1px rgba(17, 24, 39, 0.08);
}
</style>
