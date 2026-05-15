<template>
  <AtlasPage content-class="iframe-side-content">
    <AtlasIframe class="h-full" visual-class="border border-[var(--atlas-scheme-surface-border)] rounded-md" :url="url"
      :scale="scale" :caption="caption" />

    <div class="iframe-side-text">
      <slot />
    </div>
  </AtlasPage>
</template>

<script setup lang="ts">
import AtlasPage from '../components/AtlasPage.vue'
import AtlasIframe from '../components/AtlasIframe.vue'

defineProps({
  url: { type: String, default: '', },
  scale: { type: Number, default: undefined, },
  caption: { type: String, default: '', },
})
</script>

<style>
/* Iframe Side Layout */
.iframe-side-content {
  @apply grid gap-8;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.iframe-side-text {
  @apply min-w-0 min-h-0 overflow-auto;
}
</style>
