<script setup lang="ts">
withDefaults(defineProps<{ scheme?: string }>(), {
  scheme: 'primary',
})
</script>

<template>
  <div class="component-timeline" :class="`atlas-${scheme}-scheme`">
    <slot />
  </div>
</template>

<style scoped>
.component-timeline {
  @apply relative min-h-0;
}

.component-timeline::before {
  content: '';
  @apply absolute bottom-0 top-0 border-l border-dashed;
  left: calc(0.375em - 1px);
  border-color: var(--atlas-scheme-surface-border);
}
</style>
