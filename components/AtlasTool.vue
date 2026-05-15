<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  name: string
  logo?: string
  href?: string
  note?: string
  scheme?: string
}>()

const hasLogoError = ref(false)
const initial = computed(() => props.name.trim().charAt(0).toUpperCase())
const showLogo = computed(() => !!props.logo && !hasLogoError.value)
</script>

<template>
  <component :is="href ? 'a' : 'div'" :href="href" :target="href ? '_blank' : undefined" class="component-tool"
    :class="`atlas-${props.scheme || 'primary'}-scheme`">
    <img v-if="showLogo" :src="logo" :alt="name" class="component-tool-logo" @error="hasLogoError = true" />
    <div v-else class="component-tool-initial">{{ initial }}</div>
    <div class="component-tool-body">
      <div class="component-tool-name">{{ name }}</div>
      <div v-if="note" class="component-tool-note">{{ note }}</div>
    </div>
  </component>
</template>

<style scoped>
.component-tool {
  @apply flex items-center gap-3 rounded-lg border px-4 py-3 no-underline transition-colors;
  background: var(--atlas-scheme-bg);
  border: none;
  border-color: var(--atlas-scheme-surface-border);
  color: inherit;
}

.component-tool:hover {
  border-color: var(--atlas-scheme-hover);
  border: 1px solid;
  background: color-mix(in srgb, var(--atlas-scheme-bg) 82%, var(--atlas-scheme-hover) 18%);
}

.component-tool-logo,
.component-tool-initial {
  @apply h-7 w-7 shrink-0;
}

.component-tool-logo {
  @apply object-contain;
}

.component-tool-initial {
  @apply grid place-items-center rounded-md text-sm font-bold;
  background: var(--atlas-scheme-surface-bg);
  color: var(--atlas-scheme-highlight);
}

.component-tool-name {
  @apply font-semibold leading-5;
  color: var(--atlas-scheme-heading);
}

.component-tool-note {
  @apply text-xs leading-4;
  color: var(--atlas-scheme-text);
}
</style>
