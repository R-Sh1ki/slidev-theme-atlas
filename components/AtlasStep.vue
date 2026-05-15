<script setup lang="ts">
withDefaults(
  defineProps<{
    n?: string | number
    scheme?: string
  }>(),
  { scheme: 'primary', n: '' },
)
</script>

<template>
  <div class="component-step" :class="`atlas-${scheme}-scheme`">
    <div class="component-step-badge">
      <slot name="n">{{ n }}</slot>
    </div>
    <div class="component-step-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.component-step {
  @apply mb-1 flex items-center;
  gap: 0.75em;
  font: inherit;
  line-height: inherit;
  color: inherit;
}

.component-step-badge {
  @apply flex shrink-0 items-center justify-center rounded-full font-bold;
  width: 1.5em;
  height: 1.5em;
  font-size: 0.9em;
  line-height: 1;
  color: var(--atlas-scheme-bg);
  background: var(--atlas-scheme-highlight);
}

.component-step-body {
  @apply min-w-0;
  font: inherit;
  line-height: inherit;
  color: inherit;
}
</style>
