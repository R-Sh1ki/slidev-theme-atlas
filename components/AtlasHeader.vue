<template>
  <header class="component-header">
    <div class="component-header-inner">
      <span class="component-header-title">{{ props.sectionTitle || '' }}</span>
      <img v-if="props.logo" :src="props.logo" class="component-header-logo" />
    </div>
  </header>
</template>

<script setup lang="ts">
// The header shows the current section title and an optional logo.
const props = defineProps({
  sectionTitle: { type: String },
  logo: { type: String },
})
</script>

<style scoped>
.component-header {
  @apply fixed top-0 left-0 right-0 z-50;
  @apply h-[var(--header-height)] w-full;
}

.component-header-inner {
  @apply flex flex-row items-center justify-between h-full w-full m-0 px-6;
  @apply bg-[var(--atlas-scheme-bg-alt)];
}

.component-header-logo {
  @apply h-full w-auto max-w-[7rem] py-2 object-contain;
}

.component-header-title {
  @apply text-left text-3xl text-[var(--atlas-scheme-text-alt)];
  @apply font-[var(--font-header-section-title)] font-bold;
}
</style>
