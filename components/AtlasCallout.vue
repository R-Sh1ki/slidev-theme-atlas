<script setup lang="ts">
withDefaults(
  defineProps<{
    scheme?: string
    title?: string
  }>(),
  { scheme: 'primary', title: '' },
)
</script>

<template>
  <aside class="component-callout" :class="`atlas-${scheme}-scheme`">
    <div v-if="title" class="component-callout-title">
      {{ title }}
    </div>
    <div class="component-callout-body">
      <slot />
    </div>
  </aside>
</template>

<style scoped>
.component-callout {
  @apply my-4 border px-4 py-2 text-xs;
  border-left-width: 5px;
  background: var(--atlas-scheme-surface-bg);
  border-color: var(--atlas-scheme-surface-border);
  border-left-color: var(--atlas-scheme-highlight);
  color: var(--atlas-scheme-text);
}

.component-callout-title {
  @apply mb-1 text-sm font-bold uppercase tracking-[0.08em];
  color: var(--atlas-scheme-heading);
}

.component-callout-body :deep(> :first-child) {
  @apply mt-0;
}

.component-callout-body :deep(> :last-child) {
  @apply mb-0;
}
</style>
