<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    when?: string | number
    title?: string
    image?: string
    scheme?: string
  }>(),
  {
    when: '',
    title: '',
    image: '',
    scheme: 'primary',
  },
)
</script>

<template>
  <article class="component-timeline-horizontal-item" :class="`atlas-${props.scheme}-scheme`"
    :data-has-image="Boolean(props.image)">

    <div class="component-timeline-horizontal-item-media">
      <div :class="{ 'invisible h-0': !props.image }">
        <AtlasImage v-if="props.image" :image="props.image" fit="contain"
          visual-class="rounded-sm border-2 border-[var(--atlas-scheme-surface-border)]" />
      </div>
    </div>

    <div class="component-timeline-horizontal-item-node">
      <div class="component-timeline-horizontal-item-line"></div>
      <span class="component-timeline-horizontal-item-dot"></span>
      <div class="component-timeline-horizontal-item-when">
        <span class="component-timeline-horizontal-item-when-text" :class="{ 'invisible': !props.when }">
          {{ props.when }}
        </span>
      </div>
    </div>


    <div class="component-timeline-horizontal-item-content">
      <div class="component-timeline-horizontal-item-content-inner">
        <div class="component-timeline-horizontal-item-title"
          :class="{ 'component-timeline-horizontal-item-title-empty': !props.title }">
          {{ props.title }}
        </div>
        <div class="component-timeline-horizontal-item-body">
          <slot />
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.component-timeline-horizontal-item {
  @apply px-4;
}

.component-timeline-horizontal-item-media,
.component-timeline-horizontal-item-content {
  @apply flex justify-center text-center;
}

.component-timeline-horizontal-item-content-inner {
  @apply w-[90%];
}


.component-timeline-horizontal-item-title {
  @apply pb-2 text-[0.75rem] font-semibold leading-tight;
  color: var(--atlas-scheme-heading);
}

.component-timeline-horizontal-item-title-empty {
  @apply hidden;
}

.component-timeline-horizontal-item-body {
  @apply text-[0.62rem] leading-snug text-justify;
  color: var(--atlas-scheme-surface-text);
  text-align-last: left;
  text-wrap: pretty;
  overflow-wrap: break-word;
  hyphens: auto;
}

.component-timeline-horizontal-item-node {
  @apply grid grid-rows-3 items-center-safe justify-items-center-safe h-full;
  grid-template-rows: 1fr 12px 1fr;
}

.component-timeline-horizontal-item-line {
  @apply h-full w-[2px] self-center;
  background: var(--atlas-scheme-surface-border);
}

.component-timeline-horizontal-item-dot {
  @apply block rounded-full border-[2px] h-full aspect-ratio-square;
  border-color: var(--atlas-scheme-highlight);
  background: var(--atlas-scheme-bg);
}

.component-timeline-horizontal-item-when {
  @apply flex h-full items-center justify-center text-center;
}

.component-timeline-horizontal-item-when-text {
  @apply block text-[0.9rem] font-bold leading-none;
  color: var(--atlas-scheme-highlight);
}

.component-timeline-horizontal-item[data-has-image='false'] .component-timeline-horizontal-item-line {
  @apply invisible;
}

.component-timeline-horizontal-item:nth-of-type(odd) .component-timeline-horizontal-item-media {
  @apply row-start-1 row-end-2 items-end;
}

.component-timeline-horizontal-item:nth-of-type(odd) .component-timeline-horizontal-item-content {
  @apply row-start-3 row-end-4 items-start pt-4;
}

.component-timeline-horizontal-item:nth-of-type(odd) .component-timeline-horizontal-item-line {
  @apply row-start-1 row-end-2;
}

.component-timeline-horizontal-item:nth-of-type(odd) .component-timeline-horizontal-item-when {
  @apply row-start-3 row-end-4;
}

.component-timeline-horizontal-item:nth-of-type(even) .component-timeline-horizontal-item-content {
  @apply row-start-1 row-end-2 items-end pb-4;
}

.component-timeline-horizontal-item:nth-of-type(even) .component-timeline-horizontal-item-media {
  @apply row-start-3 row-end-4 items-start;
}

.component-timeline-horizontal-item:nth-of-type(even) .component-timeline-horizontal-item-when {
  @apply row-start-1 row-end-2;
}

.component-timeline-horizontal-item:nth-of-type(even) .component-timeline-horizontal-item-line {
  @apply row-start-3 row-end-4;
}
</style>
