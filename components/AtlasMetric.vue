<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useIsSlideActive } from '@slidev/client'

const props = withDefaults(
  defineProps<{
    value: string | number
    label?: string
    delta?: string
    trend?: 'up' | 'down' | 'flat'
    scheme?: string
    animate?: boolean
    from?: number
    duration?: number
  }>(),
  {
    label: '',
    delta: '',
    trend: 'flat',
    scheme: 'secondary',
    animate: false,
    from: 0,
    duration: 1500,
  },
)

type ParsedValue = {
  prefix: string
  number: number
  suffix: string
  decimals: number
}

function parseValue(value: string | number): ParsedValue {
  const text = String(value)
  const match = text.match(/^([^\d-]*)(-?[\d.,]+)(.*)$/)
  if (!match)
    return { prefix: '', number: Number.NaN, suffix: text, decimals: 0 }

  const [, prefix, rawNumber, suffix] = match
  const normalized = rawNumber.replace(/,/g, '')
  const decimals = (normalized.split('.')[1] || '').length
  return {
    prefix,
    number: Number.parseFloat(normalized),
    suffix,
    decimals,
  }
}

const parsedValue = computed(() => parseValue(props.value))
const canAnimate = computed(() => props.animate && Number.isFinite(parsedValue.value.number))
const isActive = canAnimate.value ? useIsSlideActive() : ref(true)
const displayValue = ref(String(props.value))
let frame: number | null = null

function formatValue(number: number) {
  const { prefix, suffix, decimals } = parsedValue.value
  return `${prefix}${number.toFixed(decimals)}${suffix}`
}

function stopAnimation() {
  if (frame !== null) {
    cancelAnimationFrame(frame)
    frame = null
  }
}

function runAnimation() {
  stopAnimation()
  const target = parsedValue.value.number
  const start = performance.now()
  const distance = target - props.from

  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / props.duration)
    const eased = 1 - (1 - progress) ** 3
    displayValue.value = formatValue(props.from + distance * eased)
    frame = progress < 1 ? requestAnimationFrame(tick) : null
  }

  frame = requestAnimationFrame(tick)
}

if (canAnimate.value) {
  watch(
    isActive,
    (active) => {
      if (active)
        runAnimation()
      else
        displayValue.value = formatValue(props.from)
    },
    { immediate: true },
  )
}
else {
  displayValue.value = String(props.value)
}

onBeforeUnmount(stopAnimation)
</script>

<template>
  <div class="component-metric" :class="`atlas-${scheme}-scheme`">
    <div class="component-metric-row">
      <div class="component-metric-value">
        {{ displayValue }}
      </div>
      <div v-if="delta" class="component-metric-delta" :class="`component-metric-delta-${trend}`">
        <span>{{ trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→' }}</span>
        {{ delta }}
      </div>
    </div>
    <div v-if="label" class="component-metric-label">
      {{ label }}
    </div>
  </div>
</template>

<style scoped>
.component-metric {
  @apply flex flex-col items-center text-center;
}

.component-metric-row {
  @apply flex items-baseline justify-center gap-2;
}

.component-metric-value {
  @apply text-4xl font-bold leading-none tracking-[-0.03em];
  font-variant-numeric: tabular-nums;
  color: var(--atlas-scheme-highlight);
}

.component-metric-delta {
  @apply inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold border;
  background: var(--atlas-scheme-surface-bg);
  color: var(--atlas-scheme-surface-text);
  border-color: var(--atlas-scheme-surface-border);
}

.component-metric-delta-down {
  opacity: 0.88;
}

.component-metric-label {
  @apply mt-1 text-sm;
  color: var(--atlas-scheme-text);
}
</style>
