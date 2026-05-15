<template>
  <AtlasPage content-class="default-layout-content">
    <slot />
  </AtlasPage>
</template>

<script setup lang="ts">
import AtlasPage from '../components/AtlasPage.vue'
</script>

<style>
/* Default Layout */
.default-layout-content {
  @apply text-justify;
}
</style>
