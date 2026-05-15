<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  image: {
    type: String,
    default: '',
  },
  fit: {
    type: String,
    default: 'contain',
  },
  caption: {
    type: String,
    default: '',
  },
  visualClass: {
    type: String,
    default: '',
  },
  imageClass: {
    type: String,
    default: '',
  },
  captionClass: {
    type: String,
    default: '',
  },
})

const attrs = useAttrs()
const caption = computed(() => props.caption)

// Keep absolute theme assets working under a non-root Slidev base URL.
const resolveImageUrl = (url: string) => {
  if (url.startsWith('/')) {
    const baseUrl = (import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/'
    return baseUrl + url.slice(1)
  }
  return url
}

const imageUrl = computed(() => {
  if (!props.image)
    return ''
  return resolveImageUrl(props.image)
})

// Cover uses the full visual area; contain keeps the whole figure visible.
const imageClass = computed(() => {
  return [
    props.fit === 'cover'
      ? 'component-image-object-cover'
      : 'component-image-object-contain',
    props.imageClass,
  ]
})

const visualClass = computed(() => {
  return [
    props.fit === 'cover'
      ? 'component-image-visual-cover'
      : 'component-image-visual-contain',
    props.visualClass,
  ]
})
</script>

<template>
  <figure class="component-image-pane"
    :class="props.fit === 'cover' ? 'component-image-pane-cover' : 'component-image-pane-contain'" v-bind="attrs">
    <div class="component-image-visual" :class="visualClass">
      <img v-if="imageUrl" class="component-image-object" :class="imageClass" :src="imageUrl"
        alt="" />
    </div>
    <figcaption v-if="caption" class="component-image-caption" :class="props.captionClass">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.component-image-pane {
  @apply w-full min-h-0 m-0;
  @apply flex flex-col items-center gap-1 overflow-hidden;
  grid-template-rows: minmax(0, 1fr) auto;
  row-gap: 0.25rem;
}

.component-image-pane-cover {
  @apply justify-start;
}

.component-image-pane-contain {
  @apply justify-center;
}

.component-image-visual {
  @apply flex min-h-0 w-full items-center justify-center overflow-hidden;
}

.component-image-visual-cover {
  @apply flex-1;
}

.component-image-visual-contain {
  @apply flex-1;
}

.component-image-object {
  @apply block overflow-hidden;
}

.component-image-object-contain {
  @apply w-full h-auto max-h-full object-contain;
}

.component-image-object-cover {
  @apply h-full w-full object-cover;
}

.component-image-caption {
  @apply min-h-0 px-3 py-0.5 text-center;
}
</style>
