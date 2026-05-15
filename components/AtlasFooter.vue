<template>
  <footer class="component-footer">
    <div class="component-footer-inner">
      <p class="component-footer-item text-left">{{ props.left || '' }}</p>
      <p class="component-footer-item text-center">{{ props.center || '' }}</p>
      <p class="component-footer-item text-right">{{ props.right || '' }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// The footer renders three shared metadata slots in a fixed bar.
const props = defineProps({
  left: { type: [String, Number] },
  center: { type: [String, Number] },
  right: { type: [String, Number] },
})
</script>

<style scoped>
.component-footer {
  @apply fixed bottom-0 left-0 right-0 z-50 h-[var(--footer-height)] px-[var(--page-gutter-x)];
  @apply border-t-[2px] border-t-[var(--atlas-scheme-highlight)];
}

.component-footer-inner {
  @apply grid grid-cols-[1fr_auto_1fr] items-center;
  @apply h-full max-w-6xl mx-auto px-1;
  @apply text-[var(--atlas-scheme-text-soft)];
}

.component-footer-item {
  @apply text-xs font-bold tracking-[0.05em] uppercase whitespace-nowrap overflow-hidden text-ellipsis;
}
</style>
