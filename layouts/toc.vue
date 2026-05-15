<template>
  <div class="slidev-layout">
    <AtlasHeader section-title="Table of Contents" :logo="logo" />

    <main class="toc-layout-body">
      <div class="toc-layout-card">
        <div class="toc-layout-kicker">Overview</div>
        <div class="toc-layout-rule"></div>

        <div :class="['section-list', { 'section-list-two-cols': useTwoColumns }]">
          <button v-for="(item, index) in sections" :key="item.page" type="button" class="section-list-item"
            @click="nav.go(item.page)">
            <span class="item-main">
              <span class="item-index">{{ formatNumber(index + 1) }}</span>
              <span class="item-title">{{ item.title }}</span>
            </span>

            <span class="item-page">Page {{ item.page }}</span>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SlideInfo } from '@slidev/types'
import { useNav, useSlideContext } from '@slidev/client'
import AtlasHeader from '../components/AtlasHeader.vue'

const nav = useNav()
const { $slidev } = useSlideContext()

const frontmatter = computed(() => {
  return $slidev.configs as SlideInfo['frontmatter']
})

const logo = computed(() => frontmatter.value?.headerlogo ?? '')
const slides = computed(() => nav.slides.value)

const sections = computed(() => {
  const sectionMap = new Map<string, { page: number, title: string, hasSectionPage: boolean }>()

  slides.value.forEach((slide) => {
    const slideFrontmatter = slide.meta?.slide?.frontmatter
    const sectionTitle = slideFrontmatter?.section

    if (!sectionTitle)
      return

    const title = String(sectionTitle)
    const isSectionPage = slideFrontmatter?.layout === 'section'
    const existing = sectionMap.get(title)

    if (!existing || (isSectionPage && !existing.hasSectionPage)) {
      sectionMap.set(title, {
        page: slide.no,
        title,
        hasSectionPage: isSectionPage,
      })
    }
  })

  return Array.from(sectionMap.values())
})

const aspectRatio = computed(() => $slidev.configs.aspectRatio)

const twoColumnsThreshold = computed(() => {
  const ratio = aspectRatio.value

  // 4:3 pages are taller, so two columns can start earlier.
  if (ratio <= 4 / 3 + 0.01)
    return 8

  // 16:9 pages are wider and can keep a single column longer.
  return 5
})

const useTwoColumns = computed(() => sections.value.length > twoColumnsThreshold.value)

const formatNumber = (num: number) => String(num).padStart(2, '0')
</script>

<style scoped>
/* Toc Layout */
.toc-layout-body {
  @apply absolute left-0 right-0 top-[var(--header-height)] bottom-0;
  @apply px-[var(--page-gutter-x)] py-[var(--page-gutter-y)];
  @apply flex justify-center box-border;
}

.toc-layout-card {
  @apply relative top-0 grid w-[75%] px-8 py-6;
  @apply min-h-[80%];
  grid-template-rows: auto auto minmax(0, 1fr);
  @apply rounded-lg border-2;
  background: var(--atlas-scheme-bg);
  border-color: var(--atlas-scheme-surface-border);
}

.toc-layout-kicker {
  @apply uppercase tracking-[0.24em] text-lg font-semibold text-[var(--atlas-scheme-text-soft)];
}

.toc-layout-rule {
  @apply h-[2px] w-full rounded-full;
  @apply my-4;
  background-color: var(--atlas-scheme-highlight);
}


.section-list {
  @apply flex flex-col gap-4 items-center;
  @apply min-h-0 py-4;
}

.section-list-item {
  @apply flex flex-row items-center justify-between;
  @apply border;
  @apply w-[80%] max-w-[80%];
  background: var(--atlas-scheme-surface-bg);
  border-color: var(--atlas-scheme-border-alt-soft);
}

.section-list-item:hover {
  border-color: var(--atlas-scheme-hover);
}

.item-main {
  @apply flex items-center gap-4;
}

.item-index {
  @apply inline-flex items-center justify-between px-2 py-2;
  @apply font-[var(--font-mono)] font-bold tracking-[0.04em];
  @apply text-2xl;
  background: var(--atlas-scheme-bg-alt);
  color: var(--atlas-scheme-text-alt);
  border: 1px solid var(--atlas-scheme-bg-alt);
}

.item-title {
  @apply inline-flex items-center justify-center;
  @apply text-lg font-bold;
  color: var(--atlas-scheme-heading);
}

.item-page {
  @apply items-center justify-right pr-4;
  @apply text-[0.72rem] uppercase tracking-[0.14em] text-[var(--atlas-scheme-text-soft)];
  @apply font-[var(--font-toc-meta)];
}

.section-list-two-cols {
  @apply grid gap-x-4 gap-y-5 w-[98%] mx-auto;
  @apply min-h-0 py-4 content-start justify-center;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.section-list-two-cols .section-list-item {
  @apply w-full max-w-full;
}

.section-list-two-cols .item-main {
  @apply gap-2;
}

.section-list-two-cols .item-index {
  @apply text-xl px-1.5;
}

.section-list-two-cols .item-title {
  @apply text-base;
}

.section-list-two-cols .item-page {
  @apply text-[0.6em] pr-2;
}
</style>
