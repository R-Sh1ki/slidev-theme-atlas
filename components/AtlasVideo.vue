<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    src?: string
    poster?: string
    fit?: 'contain' | 'cover'
    caption?: string
    autoplay?: boolean
    controls?: boolean
    loop?: boolean
    muted?: boolean
    playsinline?: boolean
    visualClass?: string
    videoClass?: string
    captionClass?: string
  }>(),
  {
    src: '',
    poster: '',
    fit: 'contain',
    caption: '',
    autoplay: false,
    controls: true,
    loop: false,
    muted: true,
    playsinline: true,
    visualClass: '',
    videoClass: '',
    captionClass: '',
  },
)

const attrs = useAttrs()

function withBase(path: string) {
  if (!path || /^(https?:|data:|blob:)/i.test(path))
    return path
  if (!path.startsWith('/'))
    return path

  const base = (import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/'
  if (base === '/' || path.startsWith(base))
    return path
  return base.replace(/\/$/, '') + path
}

const videoSrc = computed(() => withBase(props.src))
const posterSrc = computed(() => withBase(props.poster))
const caption = computed(() => props.caption)

const videoClass = computed(() => {
  return [
    props.fit === 'cover'
      ? 'component-video-object-cover'
      : 'component-video-object-contain',
    props.videoClass,
  ]
})

const visualClass = computed(() => {
  return [
    props.fit === 'cover'
      ? 'component-video-visual-cover'
      : 'component-video-visual-contain',
    props.visualClass,
  ]
})
</script>

<template>
  <figure
    class="component-video-pane"
    :class="props.fit === 'cover' ? 'component-video-pane-cover' : 'component-video-pane-contain'"
    v-bind="attrs"
  >
    <div class="component-video-visual" :class="visualClass">
      <video
        v-if="videoSrc"
        class="component-video-object"
        :class="videoClass"
        :src="videoSrc"
        :poster="posterSrc || undefined"
        :autoplay="props.autoplay"
        :controls="props.controls"
        :loop="props.loop"
        :muted="props.muted"
        :playsinline="props.playsinline"
        preload="metadata"
      />
    </div>
    <figcaption v-if="caption" class="component-video-caption" :class="props.captionClass">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.component-video-pane {
  @apply w-full min-h-0 m-0;
  @apply flex flex-col items-center gap-1 overflow-hidden;
  grid-template-rows: minmax(0, 1fr) auto;
  row-gap: 0.25rem;
}

.component-video-pane-cover {
  @apply justify-start;
}

.component-video-pane-contain {
  @apply justify-center;
}

.component-video-visual {
  @apply flex min-h-0 w-full items-center justify-center overflow-hidden;
}

.component-video-visual-cover {
  @apply flex-1;
}

.component-video-visual-contain {
  @apply flex-1;
}

.component-video-object {
  @apply block overflow-hidden;
}

.component-video-object-contain {
  @apply w-full h-auto max-h-full object-contain;
}

.component-video-object-cover {
  @apply h-full w-full object-cover;
}

.component-video-caption {
  @apply min-h-0 px-3 py-0.5 text-center;
}
</style>
