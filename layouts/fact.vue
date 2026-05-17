<template>
  <AtlasPage content-class="fact-layout-content">
    <div class="fact-layout-inner">
      <slot />
    </div>
  </AtlasPage>
</template>

<script setup lang="ts">
import AtlasPage from '../components/AtlasPage.vue'
</script>

<style>
/* Fact Layout */
.fact-layout-content {
  @apply flex items-center justify-center text-center;
}

.fact-layout-inner {
  @apply w-full max-w-4xl px-14;
}

/* Typography */
.fact-layout-inner :is(h1, h2, h3, h4, h5) {
  @apply text-[var(--atlas-scheme-highlight)];
}

.fact-layout-inner h1 {
  @apply text-3xl;
}

.fact-layout-inner h2 {
  @apply text-2xl;
}

.fact-layout-inner h3 {
  @apply text-xl;
}

.fact-layout-content h4,
.fact-layout-inner h5 {
  @apply text-lg;
}

.fact-layout-inner h6 {
  @apply text-base;
}


.fact-layout-content .fact-layout-inner p {
  @apply mx-auto text-base leading-relaxed text-[var(--atlas-scheme-text-soft)];
}

.fact-layout-inner :is(h1, h2, h3, h4, h5, h6)+p {
  @apply mt-4;
}
</style>
