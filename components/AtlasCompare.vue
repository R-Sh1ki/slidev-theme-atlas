<script setup lang="ts">
withDefaults(
  defineProps<{
    leftLabel?: string
    rightLabel?: string
    leftScheme?: string
    rightScheme?: string
  }>(),
  {
    leftLabel: '',
    rightLabel: '',
    leftScheme: 'primary',
    rightScheme: 'secondary',
  },
)
</script>

<template>
  <div class="component-compare">
    <div class="component-compare-column">
      <div v-if="leftLabel" class="component-compare-label" :class="`atlas-${leftScheme}-scheme`">
        {{ leftLabel }}
      </div>
      <slot name="left" />
    </div>

    <div class="component-compare-divider"></div>

    <div class="component-compare-column">
      <div v-if="rightLabel" class="component-compare-label" :class="`atlas-${rightScheme}-scheme`">
        {{ rightLabel }}
      </div>
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.component-compare {
  @apply grid items-stretch gap-6;
  grid-template-columns: minmax(0, 1fr) 1px minmax(0, 1fr);
}

.component-compare-divider {
  background: var(--atlas-scheme-surface-border);
}


.component-compare-label {
  @apply mb-3 text-xs font-bold uppercase tracking-[0.12em];
  color: var(--atlas-scheme-highlight);
}
</style>
