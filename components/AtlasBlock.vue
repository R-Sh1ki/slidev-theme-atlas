<script setup lang="ts">
import { computed } from 'vue'
import { colors } from '@unocss/preset-mini/colors'

const props = defineProps({
  kind: {
    type: String,
    default: 'block',
  },
  title: {
    type: String,
    default: '',
  },
  scheme: {
    type: String,
    default: '',
  },
})

const defaultTitleMap: Record<string, string> = {
  block: 'Block',
  definition: 'Definition',
  theorem: 'Theorem',
  lemma: 'Lemma',
  proposition: 'Proposition',
  corollary: 'Corollary',
  proof: 'Proof',
  formula: 'Formula',
  example: 'Example',
  remark: 'Remark',
  note: 'Note',
  alert: 'Alert',
}

const defaultSchemeMap: Record<string, string> = {
  block: 'primary',
  definition: 'teal',
  theorem: 'primary',
  lemma: 'primary',
  proposition: 'primary',
  corollary: 'primary',
  proof: 'slate',
  formula: 'amber',
  example: 'green',
  remark: 'slate',
  note: 'slate',
  alert: 'secondary',
}

const blockKind = computed(() => {
  const kind = props.kind.trim().toLowerCase()
  return defaultTitleMap[kind] ? kind : 'block'
})

const blockTitle = computed(() => {
  return props.title || defaultTitleMap[blockKind.value]
})

const blockScheme = computed(() => {
  return props.scheme || defaultSchemeMap[blockKind.value] || 'primary'
})

const customPaletteMap: Record<string, Record<number, string>> = {
  primary: {
    100: 'var(--atlas-primary-100)',
    200: 'var(--atlas-primary-200)',
    600: 'var(--atlas-primary-600)',
    700: 'var(--atlas-primary-700)',
  },
  secondary: {
    100: 'var(--atlas-secondary-100)',
    200: 'var(--atlas-secondary-200)',
    600: 'var(--atlas-secondary-600)',
    700: 'var(--atlas-secondary-700)',
  },
}

function getPaletteColor(name: string, shade: 100 | 200 | 600 | 700) {
  if (customPaletteMap[name])
    return customPaletteMap[name][shade]

  const palette = colors[name as keyof typeof colors] as Record<number, string> | undefined
  return palette?.[shade] ?? colors.blue[shade]
}

const blockStyle = computed(() => {
  const scheme = blockScheme.value
  return {
    '--atlas-block-bg': getPaletteColor(scheme, 100),
    '--atlas-block-border': getPaletteColor(scheme, 700),
    '--atlas-block-header-bg': getPaletteColor(scheme, 600),
    '--atlas-block-header-dot': getPaletteColor(scheme, 200),
    '--atlas-block-text': '#111111',
    '--atlas-block-title': '#ffffff',
  }
})
</script>

<template>
  <aside class="component-block" :style="blockStyle">
    <div class="component-block-header">
      <span class="component-block-title">{{ blockTitle }}</span>
    </div>

    <div class="component-block-body">
      <slot />
    </div>
  </aside>
</template>

<style scoped>
.component-block {
  @apply overflow-hidden border border-solid rounded-[0.25rem];
  background: var(--atlas-block-bg);
  border-color: var(--atlas-block-border);
  color: var(--atlas-block-text);
}

.component-block-header {
  @apply flex items-center px-4 py-1;
  background: var(--atlas-block-header-bg);
}

.component-block-header::before {
  @apply mr-2 h-3 w-3 rounded-full;
  content: '';
  background: var(--atlas-block-header-dot);
}

.component-block-body {
  @apply px-4 py-2;
}

.component-block-body :deep(> :first-child) {
  @apply mt-0;
}

.component-block-body :deep(> :last-child) {
  @apply mb-0;
}

.component-block-title {
  @apply text-base font-bold tracking-[0.03em];
  @apply font-[var(--font-display)];
  color: var(--atlas-block-title);
}

.component-block-body :deep(p) {
  @apply my-1.5;
}

.component-block-body :deep(ul),
.component-block-body :deep(ol) {
  @apply my-1.5;
}

.component-block-body :deep(.katex-display) {
  @apply my-2;
}

.component-block-body :deep(code) {
  @apply text-[var(--atlas-block-text)];
}
</style>
