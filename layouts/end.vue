<template>
  <div class="slidev-layout end-layout">
    <div class="end-layout-page">
      <div v-if="logos.length" class="end-layout-header">
        <img v-for="(logo, index) in logos" :key="`${logo.src}-${index}`" :src="logo.src" alt="logo"
          class="end-layout-logo" />
      </div>

      <div class="end-layout-content">
        <div class="end-layout-message">
          <slot />
        </div>
      </div>

      <div v-if="displayedEndItems.length" class="end-layout-links" :style="{
        gridTemplateColumns: `repeat(${endColumns}, 7.5rem)`,
        width: `min(100%, calc(${endColumns} * 7.5rem + ${(endColumns - 1)} * 0.75rem))`,
        maxWidth: `calc(${endColumns} * 7.5rem + ${(endColumns - 1)} * 0.75rem)`,
      }">
        <component :is="item.link ? 'a' : 'div'" v-for="(item, index) in displayedEndItems"
          :key="`${item.label}-${index}`" :href="item.link || undefined" :target="item.link ? '_blank' : undefined"
          :class="['end-layout-link', { 'end-layout-link-clickable': item.link }]">
          <div class="end-layout-link-label">{{ item.label }}</div>
          <img v-if="item.qr" :src="item.qr" :alt="item.label" class="end-layout-link-qr" />
          <div v-else class="end-layout-link-icon-frame">
            <i :class="['end-layout-link-icon', item.iconClass]"></i>
          </div>
          <div class="end-layout-link-value">{{ item.value }}</div>
        </component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SlideInfo } from '@slidev/types'
import { useNav, useSlideContext } from '@slidev/client'

const nav = useNav()
const { $slidev } = useSlideContext()

const currentFrontmatter = computed<Record<string, any>>(
  () => nav.currentSlideRoute.value?.meta?.slide?.frontmatter ?? {}
)

const frontmatter = computed(() => {
  return $slidev.configs as SlideInfo['frontmatter']
})

interface EndLogo {
  src: string
}

const logos = computed<EndLogo[]>(() => {
  const raw = frontmatter.value.logos
  if (Array.isArray(raw)) {
    return raw
      .map((item: unknown) => {
        if (item && typeof item === 'object' && 'src' in item) {
          const typed = item as { src: string }
          return { src: String(typed.src) }
        }
        return null
      })
      .filter((item): item is EndLogo => item !== null && !!item.src)
  }
  return []
})

type EndItemTuple = [string, string, string] | [string, string, string, string]

interface EndItemObject {
  label?: string
  icon?: string
  value?: string
  link?: string
  qr?: string
}

interface EndItem {
  label: string
  icon: string
  value: string
  link?: string
  qr?: string
  iconClass: string
}

const iconMap: Record<string, string> = {
  github: 'fa-brands fa-github',
  wechat: 'fa-brands fa-weixin',
  discord: 'fa-brands fa-discord',
  email: 'fa-regular fa-envelope',
  zenodo: 'fa-solid fa-book-open',
  homepage: 'fa-solid fa-house',
  website: 'fa-solid fa-globe',
  link: 'fa-solid fa-link',
  repo: 'fa-solid fa-code-branch',
  contact: 'fa-regular fa-address-card',
}

const normalizeUrl = (value: string) => value.replace(/^https?:\/\//i, '').replace(/^mailto:/i, '').trim()

const inferLink = (icon: string, value: string): string | undefined => {
  const normalizedIcon = icon.toLowerCase()
  const trimmedValue = value.trim()
  if (!trimmedValue)
    return undefined

  if (/^https?:\/\//i.test(trimmedValue))
    return trimmedValue

  if (normalizedIcon === 'email')
    return `mailto:${normalizeUrl(trimmedValue)}`

  if (normalizedIcon === 'github')
    return `https://github.com/${normalizeUrl(trimmedValue).replace(/^github\.com\//i, '')}`

  if (normalizedIcon === 'discord') {
    const normalized = normalizeUrl(trimmedValue)
    if (/^discord\.(gg|com)\//i.test(normalized))
      return `https://${normalized}`
    return `https://discord.gg/${normalized.replace(/^discord\.gg\//i, '')}`
  }

  if (normalizedIcon === 'zenodo') {
    const normalized = normalizeUrl(trimmedValue)
    if (/^zenodo\.org\//i.test(normalized))
      return `https://${normalized}`
    return `https://zenodo.org/records/${normalized.replace(/^records\//i, '')}`
  }

  if (['homepage', 'website', 'link', 'repo'].includes(normalizedIcon))
    return `https://${normalizeUrl(trimmedValue)}`

  return undefined
}

const resolveWechatQr = (icon: string, value: string, qr?: string) => {
  if (icon.toLowerCase() === 'wechat')
    return value.trim() || qr?.trim() || undefined
  return qr
}

const rawEndItems = computed(() => currentFrontmatter.value.end_items)

const normalizeEndItem = (item: EndItemTuple | EndItemObject): EndItem | null => {
  if (Array.isArray(item)) {
    const [label, icon, value, link] = item
    if (!label || !icon || !value)
      return null
    return {
      label,
      icon,
      value: icon.toLowerCase() === 'wechat' ? '' : value,
      link: icon.toLowerCase() === 'wechat' ? undefined : (link || inferLink(icon, value)),
      qr: resolveWechatQr(icon, value, link),
      iconClass: iconMap[icon.toLowerCase()] || iconMap.link,
    }
  }

  const label = String(item.label ?? '')
  const icon = String(item.icon ?? '')
  const value = String(item.value ?? '')
  const link = item.link ? String(item.link) : undefined
  const qr = item.qr ? String(item.qr) : undefined

  if (!label || !icon || !value)
    return null

  return {
    label,
    icon,
    value: icon.toLowerCase() === 'wechat' ? '' : value,
    link: icon.toLowerCase() === 'wechat' ? undefined : (link || inferLink(icon, value)),
    qr: resolveWechatQr(icon, value, qr),
    iconClass: iconMap[icon.toLowerCase()] || iconMap.link,
  }
}

const endItems = computed<EndItem[]>(() => {
  if (Array.isArray(rawEndItems.value)) {
    const normalized = rawEndItems.value
      .map(item => normalizeEndItem(item as EndItemTuple | EndItemObject))
      .filter((item): item is EndItem => item !== null)
    if (normalized.length)
      return normalized
  }
  return []
})

const displayedEndItems = computed(() => endItems.value.slice(0, 6))

const endColumns = computed(() => {
  const count = displayedEndItems.value.length
  if (count <= 0)
    return 1
  return Math.min(count, 6)
})
</script>

<style scoped>
/* End Layout */
.end-layout {
  @apply min-h-full relative overflow-hidden;
}

.end-layout-page {
  @apply relative z-10 h-full w-full px-10 py-6 flex flex-col bg-[var(--atlas-scheme-bg-alt)];
}

.end-layout-header {
  @apply flex flex-row justify-between items-center gap-8;
}

.end-layout-logo {
  @apply h-8 w-auto justify-center items-center object-contain max-w-[20rem];
}

.end-layout-content {
  @apply flex flex-col items-center justify-center text-center gap-6 px-12;
  flex: 0.5 1 auto;
  padding-top: clamp(0.8rem, 3.2vh, 2rem);
  padding-bottom: clamp(0.25rem, 1.2vh, 0.8rem);
}

.end-layout-message {
  @apply max-w-4xl text-[var(--atlas-scheme-text-alt)];
}

.end-layout-links {
  @apply grid gap-3 justify-center mx-auto;
}

.end-layout-link {
  @apply rounded-[6px] px-1 py-2 text-center;
  @apply grid grid-rows-[0.95rem_2.5rem_2rem] gap-y-[0.45rem] justify-items-center items-center;
  @apply w-[7.5rem] h-[7.5rem] min-w-0 box-border;
  @apply bg-[rgb(255_255_255_/_5%)] border border-solid border-[rgb(255_255_255_/_18%)] outline-none;
}

.end-layout-link:has(.end-layout-link-qr) {
  @apply grid-rows-[0.9rem_1fr] gap-y-[0.35rem];
}

.end-layout-link:focus,
.end-layout-link:focus-visible {
  @apply outline-none border-solid;
}

.end-layout-link-clickable {
  @apply no-underline;
}

.end-layout-link-icon-frame {
  @apply flex items-center justify-center rounded-[6px] shrink-0 self-center justify-self-center;
  @apply w-12 h-12 bg-[rgb(255_255_255_/_4%)] border border-solid border-[rgb(255_255_255_/_18%)];
}

.end-layout-link-qr {
  @apply rounded-[6px] object-cover shrink-0;
  @apply w-[5rem] h-[5rem] bg-white p-[0.18rem] self-center justify-self-center;
}

/* Typography */
.end-layout-message,
.end-layout-message :deep(h1),
.end-layout-message :deep(h2),
.end-layout-message :deep(h3),
.end-layout-message :deep(h4),
.end-layout-message :deep(p) {
  @apply font-[var(--font-end-message)] text-[var(--atlas-scheme-text-alt)];
}

.end-layout-message :deep(h1) {
  @apply text-4xl leading-tight font-bold;
  @apply tracking-[0.03em];
}

.end-layout-link-label {
  @apply text-[0.54rem] uppercase tracking-[0.12em] font-semibold whitespace-nowrap;
  @apply text-[var(--atlas-scheme-text-alt-soft)];
}

.end-layout-link-icon {
  @apply text-2xl text-[var(--atlas-scheme-text-alt)];
}

.end-layout-link-value {
  @apply flex h-8 w-full items-center justify-center text-[0.62rem] leading-snug font-semibold min-w-0;
  @apply text-[var(--atlas-scheme-text-alt)] whitespace-normal text-center font-[var(--font-end-link-value)];
  @apply [overflow-wrap:anywhere] [word-break:break-word];
  hyphens: none;
}
</style>
