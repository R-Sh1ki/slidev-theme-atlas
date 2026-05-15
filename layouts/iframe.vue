<template>
  <AtlasPage content-class="iframe-content">
    <AtlasIframe class="h-full" visual-class="border border-[var(--atlas-scheme-surface-border)] rounded-md" :url="url"
      :scale="scale" :caption="caption" />
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
/* Iframe Layout */
.iframe-content {
  @apply overflow-hidden;
}
</style>
