<template>
  <div class="slidev-layout intro-layout">
    <main class="intro-layout-body">
      <div class="intro-layout-shell">
        <div class="intro-layout-kicker-row">
          <div class="intro-layout-kicker">INTRO</div>
          <div class="intro-layout-rule"></div>
        </div>
        <div class="intro-layout-content">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.intro-layout {
  @apply bg-[var(--atlas-scheme-bg)];
}

.intro-layout-body {
  @apply flex h-full w-full items-center px-[var(--page-gutter-x)] py-[var(--page-gutter-y)];
}

.intro-layout-shell {
  @apply flex w-full max-w-5xl flex-col gap-5;
}

.intro-layout-kicker-row {
  @apply flex items-center gap-5;
}

.intro-layout-kicker {
  @apply shrink-0 text-sm font-bold uppercase tracking-[0.28em];
  color: var(--atlas-scheme-highlight);
}

.intro-layout-rule {
  @apply h-px w-24;
  background: color-mix(in srgb, var(--atlas-scheme-highlight) 45%, transparent);
}

.intro-layout-content {
  @apply max-w-5xl;
  hyphens: auto;
}

.intro-layout-content :deep(h1) {
  @apply m-0 font-bold text-3xl;
  color: var(--atlas-scheme-heading);
  font-family: var(--font-default-heading);
  text-wrap: balance;
}

.intro-layout-content :deep(h2) {
  @apply text-2xl;
}

.intro-layout-content :deep(h3) {
  @apply text-xl;
}

.intro-layout-content :deep(h4) {
  @apply text-lg;
}

.intro-layout-content :deep(h5) {
  @apply text-lg;
}

.intro-layout-content :deep(h6) {
  @apply text-base;
}

.intro-layout-content :deep(p) {
  @apply mt-4 max-w-3xl leading-7 text-base;
  color: var(--atlas-scheme-text-soft);
  text-wrap: pretty;
}


.intro-layout-content :deep(p + p) {
  @apply mt-3 max-w-2xl leading-6;
  color: var(--atlas-scheme-text);
}
</style>
