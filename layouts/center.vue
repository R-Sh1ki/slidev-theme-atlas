<template>
  <AtlasPage content-class="center-layout-content">
    <div class="center-layout-inner">
      <slot />
    </div>
  </AtlasPage>
</template>

<script setup lang="ts">
import AtlasPage from '../components/AtlasPage.vue'
</script>

<style>
/* Center Layout */
.center-layout-content {
  @apply flex items-center justify-center;
}

.center-layout-inner {
  @apply max-w-4xl text-center;
}
</style>
