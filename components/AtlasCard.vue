<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  scheme: { type: String as PropType<string>, default: 'default', },
  bodyClass: { type: String as PropType<string>, default: 'px-4 py-2', },
})
</script>

<template>
  <div class="component-card" :class="`atlas-${props.scheme}-scheme`">
    <div class="component-card-body" :class="props.bodyClass">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.component-card {
  @apply relative flex h-auto min-h-0 flex-col overflow-hidden border;
  background: var(--atlas-scheme-bg);
  border-color: var(--atlas-scheme-border);
  color: var(--atlas-scheme-text);
  font: inherit;
  line-height: inherit;
}

.component-card-body {}

.component-card :deep(code) {
  @apply rounded px-1.5 py-0.5 font-[var(--font-mono)];
  background: var(--atlas-scheme-surface-bg);
  color: var(--atlas-scheme-surface-text);
  font-size: inherit;
}

.component-card :deep(pre) {
  @apply overflow-hidden border p-3;
  background: var(--atlas-scheme-surface-bg);
  color: var(--atlas-scheme-surface-text);
  border-color: var(--atlas-scheme-surface-border);
  font-size: inherit;
  line-height: inherit;
}

.component-card :deep(pre code) {
  @apply p-0 rounded-none;
  background: transparent;
  color: inherit;
  font-size: inherit;
}

.component-card :deep(pre.shiki),
.component-card :deep(pre.shiki code),
.component-card :deep(pre.shiki span) {
  color: var(--shiki-light, var(--atlas-scheme-surface-text)) !important;
}

html.dark .component-card :deep(pre.shiki),
html.dark .component-card :deep(pre.shiki code),
html.dark .component-card :deep(pre.shiki span) {
  color: var(--shiki-dark, var(--atlas-scheme-surface-text)) !important;
}

.component-card :deep(> :first-child) {
  @apply mt-0;
}

.component-card :deep(> :last-child) {
  @apply mb-0;
}

.component-card :deep(h1),
.component-card :deep(h2),
.component-card :deep(h3),
.component-card :deep(h4),
.component-card :deep(h5),
.component-card :deep(h6),
.component-card :deep(th) {
  color: var(--atlas-scheme-heading);
}

.component-card :deep(strong),
.component-card :deep(ol > li::before),
.component-card :deep(ul > li::before) {
  color: var(--atlas-scheme-highlight);
}

.component-card :deep(blockquote) {
  border-color: var(--atlas-scheme-surface-border);
  background-color: var(--atlas-scheme-surface-bg);
  color: var(--atlas-scheme-surface-text);
}

.component-card :deep(blockquote > p) {
  color: var(--atlas-scheme-surface-text);
}

.component-card :deep(table) {
  @apply w-full border-collapse;
}

.component-card :deep(th),
.component-card :deep(td) {
  border-color: var(--atlas-scheme-surface-border);
}

.component-card :deep(thead th) {
  background: var(--atlas-scheme-surface-bg);
  color: var(--atlas-scheme-heading);
}

.component-card :deep(a) {
  color: var(--atlas-scheme-highlight);
}

.component-card :deep(a:hover) {
  color: var(--atlas-scheme-hover);
}
</style>
