<script setup lang="ts">
withDefaults(
  defineProps<{
    scheme?: string
  }>(),
  { scheme: 'primary' },
)
</script>

<template>
  <div class="component-eyebrow" :class="`atlas-${scheme}-scheme`">
    <slot />
  </div>
</template>

<style scoped>
.component-eyebrow {
  @apply mb-3 text-sm font-bold uppercase leading-none tracking-[0.22em];
  font-family: var(--font-mono);
  color: var(--atlas-scheme-highlight);
}
</style>
