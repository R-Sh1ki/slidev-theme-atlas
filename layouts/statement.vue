<template>
  <AtlasPage content-class="statement-layout-content">
    <div class="statement-layout-inner">
      <div class="statement-layout-body">
        <slot />
      </div>
    </div>
  </AtlasPage>
</template>

<script setup lang="ts">
import AtlasPage from '../components/AtlasPage.vue'
</script>

<style>
/* Statement Layout */
.statement-layout-content {
  @apply flex items-center justify-center;
}

.statement-layout-inner {
  @apply w-full max-w-6xl px-14;
}

.statement-layout-body {
  @apply max-w-5xl;
}

/* Typography */
.statement-layout-body h1 {
  @apply m-0 leading-[1.08] font-bold text-[var(--atlas-scheme-heading)];
  @apply font-[var(--font-default-heading)];
}

.statement-layout-body p {
  @apply mt-5 max-w-4xl text-base leading-relaxed text-[var(--atlas-scheme-text-soft)];
}
</style>
