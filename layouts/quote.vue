<template>
  <AtlasPage content-class="quote-layout-content">
    <div class="quote-layout-card">
      <div class="quote-layout-body">
        <slot />
      </div>

      <div v-if="author" class="quote-layout-author">
        ——— {{ author }}
      </div>
    </div>
  </AtlasPage>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import AtlasPage from '../components/AtlasPage.vue'

const { $frontmatter } = useSlideContext()

const author = computed(() => $frontmatter?.author ?? '')
</script>

<style>
.quote-layout-content {
  @apply flex items-center justify-center;
}

.quote-layout-card {
  @apply flex flex-col w-[90%] max-w-6xl px-8 py-6 border-l-[6px];
  background: var(--atlas-scheme-surface-bg);
  border-left-color: var(--atlas-scheme-surface-border);
}

.quote-layout-body {
  @apply text-justify;
  @apply font-[var(--font-quote)] hyphens-auto;
}

.quote-layout-body p,
.quote-layout-body em,
.quote-layout-body strong,
.quote-layout-body li {
  @apply text-lg font-medium line-height-relaxed;
}

.quote-layout-author {
  @apply mt-6 text-right text-[0.925rem] mr-8;
  @apply font-[var(--font-default-body)];
  color: var(--atlas-scheme-text-soft);
}
</style>
