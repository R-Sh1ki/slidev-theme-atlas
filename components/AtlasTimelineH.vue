<script setup lang="ts">
const props = withDefaults(defineProps<{ scheme?: string }>(), {
  scheme: 'primary',
})
</script>

<template>
  <div class="component-timeline-horizontal" :class="`atlas-${props.scheme}-scheme`">
    <div class="component-timeline-horizontal-items">
      <div class="component-timeline-horizontal-track"></div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.component-timeline-horizontal {
  @apply relative w-full;
  --timeline-horizontal-top-height: 6.5rem;
  --timeline-horizontal-node-height: 3.5rem;
  --timeline-horizontal-bottom-height: 6.5rem;
  --timeline-horizontal-axis-y: calc(var(--timeline-horizontal-top-height) + var(--timeline-horizontal-node-height) / 2);
}

.component-timeline-horizontal-items {
  @apply relative flex w-full gap-6 px-0 py-0;
}

.component-timeline-horizontal-track {
  @apply pointer-events-none absolute left-0 right-0 border-t-[2px] border-dashed;
  top: var(--timeline-horizontal-axis-y);
  border-color: var(--atlas-scheme-surface-border);
}

.component-timeline-horizontal-items :deep(.component-timeline-horizontal-item) {
  @apply relative min-w-0 flex-1 basis-0;
  display: grid;
  grid-template-rows:
    var(--timeline-horizontal-top-height) var(--timeline-horizontal-node-height) var(--timeline-horizontal-bottom-height);
}
</style>
