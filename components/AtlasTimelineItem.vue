<script setup lang="ts">
withDefaults(
  defineProps<{
    when?: string | number
    scheme?: string
  }>(),
  { when: '', scheme: '' },
)
</script>

<template>
  <div class="component-timeline-item" :class="scheme ? `atlas-${scheme}-scheme` : ''">
    <div class="component-timeline-item-dot"></div>
    <div v-if="when" class="component-timeline-item-when">
      {{ when }}
    </div>
    <div class="component-timeline-item-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.component-timeline-item {
  @apply relative mb-5;
}

.component-timeline-item-dot {
  @apply absolute left-0 top-[0.36em] rounded-full border-2;
  width: 0.75em;
  height: 0.75em;
  border-color: var(--atlas-scheme-surface-border);
  background: var(--atlas-scheme-surface-bg);
}

.component-timeline-item-when {
  @apply mb-1 text-sm font-bold pl-5;
  color: var(--atlas-scheme-highlight);
}

.component-timeline-item-content {
  @apply pl-5 leading-5;
}
</style>
