<script setup lang="ts">
withDefaults(
  defineProps<{
    scheme?: string
  }>(),
  { scheme: 'primary' },
)
</script>

<template>
  <span class="component-pill" :class="`atlas-${scheme}-scheme`">
    <slot />
  </span>
</template>

<style scoped>
.component-pill {
  @apply inline-flex items-center rounded-[1em] border font-bold align-baseline ml-1 px-[0.55em] py-[0em] text-[0.8em];
  line-height: 1.65em;
  background: var(--atlas-scheme-surface-bg);
  border-color: var(--atlas-scheme-surface-border);
  color: var(--atlas-scheme-highlight);
}
</style>
