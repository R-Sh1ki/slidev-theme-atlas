<template>
  <div class="slidev-layout cover-layout">
    <div class="cover-layout-header">
      <div class="cover-layout-logos">
        <img v-for="(logo, i) in logos" :key="i" class="cover-layout-logo" :src="logo.src" />
      </div>

      <div class="cover-layout-heading">
        <div v-if="title" class="cover-layout-title">{{ title }}</div>
        <div v-if="subtitle" class="cover-layout-subtitle">{{ subtitle }}</div>
      </div>
    </div>
    <div class="cover-layout-body">
      <div v-if="authors.length || institutions.length" class="cover-layout-paper">
        <div v-if="authors.length" class="cover-layout-authors">
          <div v-for="(author, i) in authors" :key="i">
            <span class="cover-layout-author">{{ author.name }}</span>
            <sup v-if="institutions.length > 1" class="cover-layout-sup">
              {{ author.inst_id.map(getInstIdx).filter(Boolean).join(',') }}
            </sup>
          </div>

        </div>
        <div v-if="institutions.length" class="cover-layout-institutions">
          <div v-for="(inst, i) in institutions" :key="i">
            <sup v-if="institutions.length > 1" class="cover-layout-sup">{{ inst.id }}</sup>
            <span class="cover-layout-institution">{{ inst.name }}</span>
          </div>
        </div>
      </div>

      <div class="cover-layout-report">
        <div v-if="reporter" class="cover-layout-reporter">{{ reporter }}</div>
        <a v-if="email" class="cover-layout-email" :href="emailHref">{{ email }}</a>
        <div class="cover-layout-meta">
          <span v-if="conference" class="cover-layout-meta-item">{{ conference }}</span>
          <span v-if="location" class="cover-layout-meta-item">{{ location }}</span>
          <span class="cover-layout-meta-item">{{ formattedDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SlideInfo } from '@slidev/types'
import { useSlideContext } from '@slidev/client'

const i18n = {
  zh: {
    locale: 'zh-CN',
  },
  en: {
    locale: 'en-US',
  },
}

const { $slidev } = useSlideContext()

// Get the frontmatter of the cover page.
const frontmatter = computed(() => {
  return $slidev.configs as SlideInfo['frontmatter']
})

const isEn = computed(() => frontmatter.value.isEn ?? true)
const t = computed(() => (isEn.value ? i18n.en : i18n.zh))

// The logos displayed.
const logos = computed(() => frontmatter.value.logos || [])

// The title and subtitle of the presentation.
const title = computed(() => frontmatter.value.title ?? '')
const subtitle = computed(() => frontmatter.value.subtitle ?? '')

// The authors and their institutions.
const authors = computed(() => frontmatter.value.authors || [])
const institutions = computed(() => frontmatter.value.institutions || [])

// The report information.
const reporter = computed(() => frontmatter.value.reporter ?? '')
const email = computed(() => frontmatter.value.email ?? '')
const emailHref = computed(() => {
  const value = String(email.value).trim()
  if (!value)
    return ''
  return value.startsWith('mailto:') ? value : `mailto:${value}`
})

const conference = computed(() => frontmatter.value.conference ?? '')
const location = computed(() => frontmatter.value.location ?? '')

const getInstIdx = (id: number) => {
  const idx = institutions.value.findIndex((inst: { id: number }) => inst.id === id)
  return idx !== -1 ? idx + 1 : null
}

const formattedDate = computed(() => {
  return new Date().toLocaleDateString(t.value.locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})
</script>

<style scoped>
/* Cover Layout */
.cover-layout-header {
  @apply flex flex-col gap-10;
  @apply min-h-[50%] w-full px-10 py-6;
  @apply bg-[var(--atlas-scheme-bg-alt)];
}

.cover-layout-logos {
  @apply flex flex-row justify-between items-center gap-8;
}

.cover-layout-logo {
  @apply h-8 w-auto justify-center items-center object-contain max-w-[20rem];
}

.cover-layout-heading {
  @apply flex flex-col mt-auto mb-0 max-w-4xl items-center;
}

.cover-layout-title {
  @apply flex flex-wrap pb-3 justify-center text-wrap;
}

.cover-layout-subtitle {
  @apply flex flex-wrap justify-center text-wrap text-[var(--atlas-scheme-text-alt-soft)];
}

.cover-layout-body {
  @apply flex flex-col items-center justify-center gap-8;
  @apply min-h-[45%] px-20 pt-6 pb-15;
  @apply bg-[var(--atlas-scheme-bg)];
}

.cover-layout-paper {
  @apply flex flex-col items-center justify-center gap-2;
}

.cover-layout-authors {
  @apply flex flex-row gap-4;
}

.cover-layout-sup {
  @apply ml-1 not-italic;
  @apply color-[var(--atlas-scheme-highlight)];
}

.cover-layout-report {
  @apply flex flex-col items-center justify-center gap-2;
}

.cover-layout-meta {
  @apply flex flex-row items-center justify-center;
  @apply overflow-hidden;
}

.cover-layout-meta-item {
  @apply relative px-[0.8rem] py-0;
}

.cover-layout-meta-item:first-child {
  @apply pl-0;
}

.cover-layout-meta-item+.cover-layout-meta-item::before {
  @apply absolute left-0 top-0;
  @apply content-['|'];
  @apply text-[var(--atlas-scheme-highlight)];
}

/* Typography */
.cover-layout-title {
  @apply font-bold text-2xl/10 md:text-4xl/12 text-center text-[var(--atlas-scheme-text-alt)];
  @apply font-[var(--font-cover-title)] font-not-italic tracking-[0.02em];
}

.cover-layout-subtitle {
  @apply text-xl text-center text-[var(--atlas-scheme-text-alt-soft)];
  @apply font-[var(--font-cover-subtitle)] font-not-italic tracking-[0.02em];
}

.cover-layout-authors,
.cover-layout-institutions {
  @apply text-base text-center;
}

.cover-layout-author,
.cover-layout-institution {
  @apply font-[var(--font-cover-paper)];
}

.cover-layout-author {
  @apply font-italic;
}

.cover-layout-sup {
  @apply font-[var(--font-cover-paper)];
}

.cover-layout-reporter,
.cover-layout-email,
.cover-layout-meta-item {
  @apply font-[var(--font-cover-report)] font-not-italic font-bold tracking-[0.012em] text-sm;
}
</style>
