<template>
  <div class="slidev-layout">
    <AtlasHeader v-if="showHeader" :section-title="sectionTitle" :logo="logo" />

    <main ref="pageBodyRef" :class="['component-page-body', props.pageClass]" :style="pageStyle">
      <div ref="pageContentRef" :class="['component-page-content', props.contentClass]" :style="props.contentStyle">
        <slot />
      </div>
    </main>

    <AtlasFooter v-if="showFooter" :left="reporter" :center="title" :right="pageNumber" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { PropType, StyleValue } from 'vue'
import type { SlideInfo } from '@slidev/types'
import { useNav, useSlideContext } from '@slidev/client'
import AtlasFooter from './AtlasFooter.vue'
import AtlasHeader from './AtlasHeader.vue'

const props = defineProps({
  pageClass: {
    type: [String, Array, Object] as PropType<string | unknown[] | Record<string, boolean>>,
    default: '',
  },
  contentClass: {
    type: [String, Array, Object] as PropType<string | unknown[] | Record<string, boolean>>,
    default: '',
  },
  contentStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: undefined,
  },
})

const nav = useNav()
const { $slidev, $frontmatter, $page } = useSlideContext()
const pageBodyRef = ref<HTMLElement>()
const pageContentRef = ref<HTMLElement>()
const footnotesHeight = ref(0)
const footnotesBodyHeight = ref(0)
const footnotesSepHeight = ref(0)

let footnotesResizeObserver: ResizeObserver | undefined
let contentMutationObserver: MutationObserver | undefined

// The headmatter provides shared defaults for the common page frame.
const headmatter = computed(() => {
  return $slidev.configs as SlideInfo['frontmatter']
})

// Shared frame metadata used by the footer and header.
const reporter = computed(() => headmatter.value?.reporter ?? '')
const title = computed(() => headmatter.value?.title ?? '')
const logo = computed(() => headmatter.value?.headerlogo ?? '')

// Page-level switches override defaults.
const showHeader = computed(() => $frontmatter?.showHeader ?? headmatter.value?.showHeader ?? true)
const showFooter = computed(() => $frontmatter?.showFooter ?? headmatter.value?.showFooter ?? true)
const currentPageNo = computed(() => Number($page?.value ?? nav.currentPage.value ?? 1))
const pageNumber = computed(() => currentPageNo.value || '')

// Remove reserved header/footer space when either region is hidden.
const pageStyle = computed<StyleValue>(() => ({
  top: showHeader.value ? 'var(--header-height)' : '0',
  bottom: showFooter.value ? 'var(--footer-height)' : '0',
  '--page-footnotes-height': `${footnotesHeight.value}px`,
  '--page-footnotes-body-height': `${footnotesBodyHeight.value}px`,
  '--page-footnotes-sep-height': `${footnotesSepHeight.value}px`,
}))

const slides = computed(() => nav.slides.value)

// Use the current slide section first, then inherit the nearest previous section title.
const sectionTitle = computed(() => {
  const slideIndex = Math.max(0, Math.min(slides.value.length - 1, currentPageNo.value - 1))
  const slideFrontmatter = slides.value[slideIndex]?.meta?.slide?.frontmatter

  if (slideFrontmatter?.section)
    return String(slideFrontmatter.section)

  for (let i = slideIndex; i >= 0; i--) {
    const prevFrontmatter = slides.value[i]?.meta?.slide?.frontmatter
    if (prevFrontmatter?.section)
      return String(prevFrontmatter.section)
  }

  return ''
})

const updateFootnotesLayout = async () => {
  await nextTick()

  const contentEl = pageContentRef.value

  if (!contentEl)
    return

  const footnotesEl = contentEl.querySelector<HTMLElement>('.footnotes')
  const footnotesSepEl = contentEl.querySelector<HTMLElement>('.footnotes-sep')

  footnotesResizeObserver?.disconnect()

  if (!footnotesEl && !footnotesSepEl) {
    footnotesHeight.value = 0
    footnotesBodyHeight.value = 0
    footnotesSepHeight.value = 0
    return
  }

  const setHeight = () => {
    const footnotesRect = footnotesEl?.getBoundingClientRect()
    const sepRect = footnotesSepEl?.getBoundingClientRect()
    const bodyHeight = footnotesRect?.height ? Math.ceil(footnotesRect.height) : 0
    const sepHeight = sepRect?.height ? Math.ceil(sepRect.height) : 0

    footnotesBodyHeight.value = bodyHeight
    footnotesSepHeight.value = sepHeight
    footnotesHeight.value = bodyHeight > 0 || sepHeight > 0
      ? bodyHeight + sepHeight + 8
      : 0
  }

  setHeight()

  footnotesResizeObserver = new ResizeObserver(() => {
    setHeight()
  })

  if (footnotesEl)
    footnotesResizeObserver.observe(footnotesEl)
  if (footnotesSepEl)
    footnotesResizeObserver.observe(footnotesSepEl)
}

onMounted(() => {
  updateFootnotesLayout()

  if (pageContentRef.value) {
    contentMutationObserver = new MutationObserver(() => {
      updateFootnotesLayout()
    })

    contentMutationObserver.observe(pageContentRef.value, {
      childList: true,
      subtree: true,
    })
  }
})

watch(() => currentPageNo.value, () => {
  updateFootnotesLayout()
})

onBeforeUnmount(() => {
  footnotesResizeObserver?.disconnect()
  contentMutationObserver?.disconnect()
})
</script>

<style scoped>
.component-page-body {
  @apply absolute left-0 right-0 flex flex-col overflow-hidden box-border;
  @apply px-[var(--page-gutter-x)] py-[var(--page-gutter-y)];
}

.component-page-content {
  @apply relative flex-1 min-h-0 overflow-auto box-border text-justify;
  padding-bottom: var(--page-footnotes-height, 0px);
}

.component-page-body :deep(.footnotes) {
  @apply absolute left-0 right-0;
  bottom: 0;
}

.component-page-body :deep(.footnotes-sep) {
  @apply absolute left-0 right-0 m-0 p-0 pb-1;
  bottom: var(--page-footnotes-body-height);
  border-color: var(--atlas-scheme-border-soft);
  opacity: 30%;
}
</style>
