import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import { colors } from '@unocss/preset-mini/colors'

type Shade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
type Palette = Record<Shade, string>

const atlasCustomPalettes = {
  primary: {
    50: 'var(--atlas-primary-50)',
    100: 'var(--atlas-primary-100)',
    200: 'var(--atlas-primary-200)',
    300: 'var(--atlas-primary-300)',
    400: 'var(--atlas-primary-400)',
    500: 'var(--atlas-primary-500)',
    600: 'var(--atlas-primary-600)',
    700: 'var(--atlas-primary-700)',
    800: 'var(--atlas-primary-800)',
    900: 'var(--atlas-primary-900)',
    950: 'var(--atlas-primary-950)',
  },
  secondary: {
    50: 'var(--atlas-secondary-50)',
    100: 'var(--atlas-secondary-100)',
    200: 'var(--atlas-secondary-200)',
    300: 'var(--atlas-secondary-300)',
    400: 'var(--atlas-secondary-400)',
    500: 'var(--atlas-secondary-500)',
    600: 'var(--atlas-secondary-600)',
    700: 'var(--atlas-secondary-700)',
    800: 'var(--atlas-secondary-800)',
    900: 'var(--atlas-secondary-900)',
    950: 'var(--atlas-secondary-950)',
  },
} as const satisfies Record<'primary' | 'secondary', Palette>

// Tailwind CSS colors: https://tailwind-css.colrlab.com/tailwind-css-colors/
const colornames = [
  'primary',
  'secondary',
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const

type ColorName = typeof colornames[number]

function resolveAtlasPalette(name: ColorName): Palette {
  if (name === 'primary' || name === 'secondary')
    return atlasCustomPalettes[name]

  return colors[name] as Palette
}

const palettes = Object.fromEntries(
  colornames.map(name => [name, resolveAtlasPalette(name)]),
) as Record<ColorName, Palette>

const atlasCssVariables = Object.fromEntries(
  [
    ...Object.entries(palettes).flatMap(([name, palette]) => [
      [`--atlas-${name}-light`, palette[100]],
      [`--atlas-${name}`, palette[500]],
    ]),
    ['--atlas-default-light', 'var(--atlas-default-light-bg)'],
    ['--atlas-default', 'var(--atlas-default-bg)'],
    ['--atlas-ink-light', colors.gray[50]],
    ['--atlas-ink', colors.gray[900]],
  ],
)

function createAtlasSchemeCSS() {
  const blocks: string[] = []

  function formatRule(selector: string, values: Record<string, string>) {
    return `${selector} {\n${Object.entries(values)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n')}\n}`
  }

  function addScheme(name: string, lightValues: Record<string, string>, darkValues: Record<string, string>) {
    blocks.push(formatRule(`.atlas-${name}-scheme`, lightValues))
    blocks.push(formatRule(`html.dark .atlas-${name}-scheme`, darkValues))
  }

  function createLightScheme(palette: Palette) {
    return {
      '--atlas-scheme-bg': palette[100],
      '--atlas-scheme-text': palette[600],
      '--atlas-scheme-border': palette[700],
      '--atlas-scheme-surface-bg': palette[200],
      '--atlas-scheme-surface-text': palette[600],
      '--atlas-scheme-surface-border': palette[700],
      '--atlas-scheme-heading': palette[600],
      '--atlas-scheme-highlight': palette[700],
      '--atlas-scheme-hover': palette[400],
    }
  }

  function createDarkScheme(palette: Palette) {
    return {
      '--atlas-scheme-bg': palette[500],
      '--atlas-scheme-text': palette[50],
      '--atlas-scheme-border': palette[200],
      '--atlas-scheme-surface-bg': palette[600],
      '--atlas-scheme-surface-text': palette[50],
      '--atlas-scheme-surface-border': palette[200],
      '--atlas-scheme-heading': palette[50],
      '--atlas-scheme-highlight': palette[200],
      '--atlas-scheme-hover': palette[100],
    }
  }

  Object.entries(palettes).forEach(([name, palette]) => {
    addScheme(name, createLightScheme(palette), createDarkScheme(palette))
  })

  const gray = colors.gray as Palette

  addScheme(
    'ink',
    {
      '--atlas-scheme-bg': '#ffffff',
      '--atlas-scheme-surface-bg': gray[100],
      '--atlas-scheme-surface-text': gray[700],
      '--atlas-scheme-text': gray[700],
      '--atlas-scheme-heading': gray[900],
      '--atlas-scheme-border': gray[300],
      '--atlas-scheme-surface-border': gray[300],
      '--atlas-scheme-highlight': gray[500],
      '--atlas-scheme-hover': gray[700],
    },
    {
      '--atlas-scheme-bg': gray[600],
      '--atlas-scheme-text': gray[50],
      '--atlas-scheme-border': gray[200],
      '--atlas-scheme-surface-bg': gray[700],
      '--atlas-scheme-surface-text': gray[50],
      '--atlas-scheme-surface-border': gray[400],
      '--atlas-scheme-heading': '#ffffff',
      '--atlas-scheme-highlight': gray[300],
      '--atlas-scheme-hover': gray[200],
    },
  )

  addScheme(
    'default',
    {
      '--atlas-scheme-bg': 'var(--atlas-default-light-bg)',
      '--atlas-scheme-surface-bg': 'var(--atlas-default-light-surface-bg)',
      '--atlas-scheme-surface-text': 'var(--atlas-default-light-surface-text)',
      '--atlas-scheme-text': 'var(--atlas-default-light-text)',
      '--atlas-scheme-heading': 'var(--atlas-default-light-heading)',
      '--atlas-scheme-border': 'var(--atlas-default-light-border)',
      '--atlas-scheme-surface-border': 'var(--atlas-default-light-surface-border)',
      '--atlas-scheme-highlight': 'var(--atlas-default-light-highlight)',
      '--atlas-scheme-hover': 'var(--atlas-default-light-hover)',
    },
    {
      '--atlas-scheme-bg': 'var(--atlas-default-bg)',
      '--atlas-scheme-surface-bg': 'var(--atlas-default-surface-bg)',
      '--atlas-scheme-surface-text': 'var(--atlas-default-surface-text)',
      '--atlas-scheme-text': 'var(--atlas-default-text)',
      '--atlas-scheme-heading': 'var(--atlas-default-heading)',
      '--atlas-scheme-border': 'var(--atlas-default-border)',
      '--atlas-scheme-surface-border': 'var(--atlas-default-surface-border)',
      '--atlas-scheme-highlight': 'var(--atlas-default-highlight)',
      '--atlas-scheme-hover': 'var(--atlas-default-hover)',
    },
  )

  return blocks.join('\n\n')
}

export default defineConfig({
  // ...
  shortcuts: {
    'bg-active': 'bg-[rgb(156_163_175_/_0.1)]',
    'prose': 'prose-default',
  },
  transformers: [
    transformerDirectives(),
  ],
  preflights: [
    {
      getCSS: () => `:root {\n${Object.entries(atlasCssVariables)
        .map(([key, value]) => `  ${key}: ${value};`)
        .join('\n')}\n}\n${createAtlasSchemeCSS()}`,
    },
  ],
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      gray: palettes.gray,
      ...Object.fromEntries(
        Object.keys(palettes)
          .filter(name => name !== 'primary' && name !== 'secondary')
          .map(name => [name, `var(--atlas-${name})`]),
      ),
    },
    fontFamily: {
      authors: [
        'Times New Roman',
        'Georgia',
        'serif',
      ].join(', '),
      title: [
        'Helvetica',
        'Helvetica Neue',
        'Arial',
        'Weibei SC',
        'Weibei TC',
        'STXingkai',
        'Microsoft YaHei',
        'sans-serif',
      ].join(', '),
      reportinfo: [
        'Noto Sans CJK SC',
        'Arial',
        'Microsoft YaHei',
      ].join(', '),
      tocitem: '"FiraCode Nerd Font Mono"',
    },
  },
})
