<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    scheme?: string
    bordered?: boolean
  }>(),
  {
    scheme: 'primary',
    bordered: false,
  },
)
</script>

<template>
  <span class="component-dot-item" :class="`atlas-${props.scheme}-scheme`">
    <span :class="[
      'component-dot-item-mark',
      props.bordered && 'component-dot-item-mark-bordered',
    ]"></span>
    <span class="component-dot-item-body">
      <slot />
    </span>
  </span>
</template>

<style scoped>
.component-dot-item {
  @apply inline-flex items-baseline gap-2 align-baseline pl-1;
}

.component-dot-item-mark {
  @apply inline-block shrink-0 rounded-full;
  width: 0.55em;
  height: 0.55em;
  background: var(--atlas-scheme-border);
}

.component-dot-item-mark-bordered {
  border-width: 0.1em;
  background: var(--atlas-scheme-surface-bg);
  border-color: var(--atlas-scheme-surface-border);
}

.component-dot-item-body {
  @apply inline;
}
</style>
