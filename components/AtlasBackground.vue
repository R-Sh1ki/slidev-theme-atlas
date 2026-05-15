<script setup lang="ts">
import { computed, useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    type?: 'auto' | 'image' | 'video'
    overlay?: boolean | number
    overlayColor?: string
    poster?: string
    fit?: 'cover' | 'contain'
    autoplay?: boolean
    controls?: boolean
    loop?: boolean
    muted?: boolean
    z?: number
  }>(),
  {
    type: 'auto',
    overlay: true,
    overlayColor: 'auto',
    poster: '',
    fit: 'cover',
    autoplay: true,
    controls: false,
    loop: true,
    muted: true,
    z: 0,
  },
)

const slots = useSlots()

const kind = computed<'image' | 'video'>(() => {
  if (props.type !== 'auto')
    return props.type

  return /\.(mp4|webm|mov|ogv|m4v)(\?|#|$)/i.test(props.src)
    ? 'video'
    : 'image'
})

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

const resolvedSrc = computed(() => withBase(props.src))
const resolvedPoster = computed(() => withBase(props.poster))

const overlayOpacity = computed(() => {
  if (props.overlay === false)
    return 0
  if (props.overlay === true)
    return 0.5

  const value = Number(props.overlay)
  return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0.5
})

const resolvedOverlayColor = computed(() => {
  if (props.overlayColor !== 'auto')
    return props.overlayColor
  return 'var(--atlas-scheme-bg)'
})
</script>

<template>
  <div class="component-background" :style="{ zIndex: z }">
    <div class="component-background-layer" :class="{ 'component-background-layer-interactive': kind === 'video' && props.controls }">
      <video
        v-if="kind === 'video'"
        class="component-background-media"
        :style="{ objectFit: fit }"
        :src="resolvedSrc"
        :poster="resolvedPoster || undefined"
        :autoplay="props.autoplay"
        :muted="props.muted"
        :loop="props.loop"
        :controls="props.controls"
        playsinline
        preload="auto"
      />
      <img
        v-else
        class="component-background-media"
        :style="{ objectFit: fit }"
        :src="resolvedSrc"
        alt=""
        aria-hidden="true"
      />
      <div
        v-if="overlayOpacity > 0"
        class="component-background-overlay"
        :style="{ background: resolvedOverlayColor, opacity: overlayOpacity }"
      ></div>
    </div>
    <div v-if="slots.default" class="component-background-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.component-background,
.component-background-layer,
.component-background-media,
.component-background-overlay {
  @apply m-0 border-0 p-0;
  box-sizing: border-box;
}

.component-background {
  @apply relative w-full min-h-0 overflow-hidden;
}

.component-background-layer {
  @apply absolute inset-0 overflow-hidden;
  pointer-events: none;
}

.component-background-layer-interactive {
  pointer-events: auto;
}

.component-background-media {
  @apply absolute inset-0 h-full w-full;
  display: block;
}

.component-background-overlay {
  @apply absolute inset-[-1px];
  pointer-events: none;
}

.component-background-content {
  @apply relative z-10 h-full w-full;
  pointer-events: none;
}
</style>
