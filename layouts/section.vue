<template>
  <div class="slidev-layout section-layout">
    <main class="section-layout-main">
      <div class="section-layout-header">
        <div class="section-layout-label">SECTION</div>
        <h1 class="section-layout-title">{{ sectionTitle }}</h1>
      </div>

      <div v-if="hasSummary" class="section-layout-meta">
        <div class="section-layout-content">
          <slot />
        </div>
      </div>
      <div class="section-layout-index-wrap" aria-hidden="true">
        <div class="section-layout-index">
          {{ sectionIndex }}
        </div>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'

const nav = useNav()
const { $frontmatter } = useSlideContext()
const slots = useSlots()

const sectionTitle = computed(() => String($frontmatter?.section ?? 'Section'))
const hasSummary = computed(() => Boolean(slots.default))

const sectionIndex = computed(() => {
  const seen = new Set<string>()
  const current = sectionTitle.value

  for (const slide of nav.slides.value) {
    const frontmatter = slide.meta?.slide?.frontmatter
    const section = frontmatter?.section ? String(frontmatter.section) : ''

    if (!section || seen.has(section))
      continue

    seen.add(section)

    if (section === current)
      return String(seen.size).padStart(2, '0')
  }

  return '01'
})
</script>

<style scoped>
.section-layout {
  @apply absolute flex h-full w-full items-center justify-center;
  @apply bg-[var(--atlas-scheme-bg)];
}

.section-layout-main {
  @apply relative h-[70%] w-[80%] overflow-hidden -translate-y-[0%];
}

.section-layout-header {
  @apply relative w-full overflow-hidden;
  @apply flex flex-col justify-start px-8 pb-0;
}

.section-layout-label {
  @apply inline-flex items-center gap-4;
  @apply font-[var(--font-mono)] font-bold uppercase;
  @apply text-xl text-[var(--atlas-scheme-highlight-soft)] tracking-[0.24em] opacity-[0.9];
}

.section-layout-label::after {
  content: '';
  @apply block h-px w-16;
  background: var(--atlas-scheme-highlight-soft);
}

.section-layout-title {
  @apply font-[var(--font-section-title)];
  @apply mt-4 text-[2.5rem] text-[var(--atlas-scheme-heading)];
}

.section-layout-meta {
  @apply mt-2 pl-8 justify-start;
}

.section-layout-content {
  @apply max-w-[72%] p-1 text-[var(--atlas-scheme-text-soft)] text-justify px-2;
  text-wrap: pretty;
  hyphens: auto;
  border-left: 4px solid var(--atlas-scheme-border);
}

.section-layout-content :deep(p) {
  @apply m-0 text-base;
}

.section-layout-index-wrap {
  @apply absolute right-6 bottom-2 inline-block;
}

.section-layout-index {
  @apply relative font-[var(--font-mono)];
  font-size: clamp(8rem, 16vw, 13rem);
  font-weight: 700;
  line-height: 0.84;
  letter-spacing: -0.1em;
  color: color-mix(in srgb, var(--atlas-scheme-text-soft) 16%, var(--atlas-scheme-bg));
  user-select: none;
}
</style>
