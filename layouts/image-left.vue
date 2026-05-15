<template>
  <AtlasPage content-class="image-side-layout-content">
    <AtlasImage class="h-full" :image="image" :fit="fit" :caption="caption" />

    <div class="image-side-layout-text" :class="props.class">
      <slot />
    </div>
  </AtlasPage>
</template>

<script setup lang="ts">
import AtlasPage from '../components/AtlasPage.vue'
import AtlasImage from '../components/AtlasImage.vue'


const props = defineProps({
  image: {
    type: String,
    default: '',
  },
  class: {
    type: String,
    default: '',
  },
  fit: {
    type: String,
    default: 'cover',
  },
  caption: {
    type: String,
    default: '',
  },
})
</script>

<style>
/* Image Side Layout */
.image-side-layout-content {
  @apply grid gap-8;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.image-side-layout-text {
  @apply min-w-0 min-h-0 overflow-auto;
}
</style>
