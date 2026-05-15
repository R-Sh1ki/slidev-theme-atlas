<template>
  <AtlasPage :content-class="['two-cols-header-layout-content', props.layoutClass]">
    <div class="two-cols-header-layout-header">
      <slot />
    </div>

    <div class="two-cols-header-layout-column" :class="props.class">
      <slot name="left" />
    </div>

    <div class="two-cols-header-layout-column" :class="props.class">
      <slot name="right" />
    </div>

    <div class="two-cols-header-layout-bottom" :class="props.class">
      <slot name="bottom" />
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
/* Two Columns Header Layout */
.two-cols-header-layout-content {
  @apply grid content-start gap-x-8 gap-y-2;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: auto auto auto;
}

.two-cols-header-layout-header {
  @apply col-span-2 min-w-0;
}

.two-cols-header-layout-column {
  @apply min-w-0 min-h-0 overflow-auto;
}

.two-cols-header-layout-bottom {
  @apply col-span-2 min-w-0;
}
</style>
