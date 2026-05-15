<template>
  <AtlasPage :content-class="['two-cols-layout-content', props.layoutClass]">
    <div class="two-cols-layout-column" :class="props.class">
      <slot />
      <slot name="left" />
    </div>

    <div class="two-cols-layout-column" :class="props.class">
      <slot name="right" />
    </div>
  </AtlasPage>
</template>

<script setup lang="ts">
import AtlasPage from '../components/AtlasPage.vue'

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  layoutClass: {
    type: String,
    default: '',
  },
})
</script>

<style>
/* Two Columns Layout */
.two-cols-layout-content {
  @apply grid gap-8;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.two-cols-layout-column {
  @apply min-w-0 min-h-0 overflow-auto;
}
</style>
