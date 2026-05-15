<script setup lang="ts">
withDefaults(
  defineProps<{
    value: string | number
    label?: string
    scheme?: string
  }>(),
  { scheme: 'secondary', label: '' },
)
</script>

<template>
  <div class="component-stat" :class="`atlas-${scheme}-scheme`">
    <div class="component-stat-value">
      {{ value }}
    </div>
    <div v-if="label" class="component-stat-label">
      {{ label }}
    </div>
  </div>
</template>

<style scoped>
.component-stat { @apply text-center; }

.component-stat-value {
  @apply text-4xl font-bold leading-none tracking-[-0.02em];
  color: var(--atlas-scheme-highlight);
}

.component-stat-label {
  @apply mt-1 text-sm;
  color: var(--atlas-scheme-text);
}
</style>
