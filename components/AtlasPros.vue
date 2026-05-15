<script setup lang="ts">
withDefaults(defineProps<{ title?: string, scheme?: string }>(), {
  title: '',
  scheme: 'green',
})
</script>

<template>
  <section class="component-pros" :class="`atlas-${scheme}-scheme`">
    <div v-if="title" class="component-pros-title">{{ title }}</div>
    <div class="component-pros-body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.component-pros {
  @apply rounded-lg border px-4 py-2;
  background: var(--atlas-scheme-bg);
  border-color: var(--atlas-scheme-surface-border);
}

.component-pros-title {
  @apply mb-2 text-xs font-bold uppercase tracking-[0.08em];
  color: var(--atlas-scheme-heading);
}

.component-pros-body :deep(ul) {
  @apply m-0 list-none p-0 text-left;
}

.component-pros-body :deep(li) {
  @apply relative mb-1 pl-5;
}

.component-pros-body :deep(li)::before {
  content: '✔';
  @apply absolute left-0 top-0 font-bold;
  color: var(--atlas-scheme-highlight);
}
</style>
