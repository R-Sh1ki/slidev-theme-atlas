<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  url: {
    type: String,
    default: '',
  },
  scale: {
    type: Number,
    default: undefined,
  },
  caption: {
    type: String,
    default: '',
  },
  visualClass: {
    type: String,
    default: '',
  },
  iframeClass: {
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

// Scale the iframe while preserving the original layout box.
const scalePercent = computed(() => `${(1 / (props.scale || 1)) * 100}%`)

const iframeStyle = computed(() => {
  if (!props.scale)
    return {}

  return {
    transform: `scale(${props.scale})`,
    transformOrigin: 'top left',
  }
})

</script>

<template>
  <figure class="component-iframe-pane" v-bind="attrs">
    <div class="component-iframe-visual" :class="props.visualClass">
      <div class="component-iframe-scaler" :style="{ width: scalePercent, height: scalePercent }">
        <iframe class="component-iframe" :class="props.iframeClass" :src="url" :style="iframeStyle" />
      </div>
    </div>
    <figcaption v-if="caption" class="component-iframe-caption" :class="props.captionClass">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.component-iframe-pane {
  @apply w-full min-h-0 m-0;
  @apply flex flex-col items-center justify-start gap-1 overflow-hidden;
}

.component-iframe-visual {
  @apply flex-1 min-h-0 max-h-full w-full overflow-hidden;
}

.component-iframe-scaler {
  @apply h-full w-full;
}

.component-iframe {
  @apply h-full w-full border-0;
}

.component-iframe-caption {
  @apply min-h-0 px-3 py-0.5 text-center;
}
</style>
