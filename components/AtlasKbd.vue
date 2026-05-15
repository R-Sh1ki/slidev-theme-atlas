<script setup lang="ts">
withDefaults(
  defineProps<{
    scheme?: string
  }>(),
  {
    scheme: 'default',
  },
)
</script>

<template>
  <kbd class="component-kbd" :class="scheme ? `atlas-${scheme}-scheme` : ''">
    <slot />
  </kbd>
</template>

<style scoped>
.component-kbd {
  @apply inline-block rounded border px-[0.5em] py-[0.1em] text-[0.8em] font-medium leading-5;
  font-family: var(--font-mono);
  background: var(--atlas-scheme-surface-bg);
  border-color: var(--atlas-scheme-surface-border);
  color: var(--atlas-scheme-surface-text);
  box-shadow: inset 0 -2px 0 color-mix(in srgb, var(--atlas-scheme-surface-border) 36%, transparent);
}
</style>
