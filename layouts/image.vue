<template>
  <AtlasPage content-class="image-layout-content">
    <AtlasImage class="h-full" visual-class="rounded-md" :image="image" :fit="fit" :caption="caption" />

    <div class="image-layout-overlay">
      <slot />
    </div>
  </AtlasPage>
</template>

<script setup lang="ts">
import AtlasPage from '../components/AtlasPage.vue'
import AtlasImage from '../components/AtlasImage.vue'

defineProps({
  image: { type: String, default: '', },
  fit: { type: String, default: 'cover', },
  caption: { type: String, default: '', },
})
</script>

<style>
/* Image Layout */
.image-layout-content {
  @apply relative overflow-hidden;
}

.image-layout-content .component-image-pane {
  @apply absolute inset-0;
}

.image-layout-overlay {
  @apply relative z-10 h-full w-full p-8 box-border;
}
</style>
