---
theme: ./
aspectRatio: 16/9
layout: cover
colorSchema: light
lineNumbers: true
drawings:
  persist: false
title: ATLAS Theme Preview
subtitle: A structured Slidev theme for academic presentation
reporter: ATLAS
email: atlas@example.com
conference: Theme Design Review
location: Beijing, China
logos:
  - src: /assets/atlas-test-logo.svg
  - src: /assets/atlas-test-logo.svg
  - src: /assets/atlas-test-logo.svg
authors:
  - name: Ryougi Shiki
    inst_id: [1]
  - name: Atlas Theme Team
    inst_id: [2]
institutions:
  - id: 1
    name: Atlas Lab
  - id: 2
    name: Slide Theme Group
headerlogo: /assets/atlas-test-logo.svg
---

---
layout: toc
---

---
layout: section
section: Markdown
---

This section shows how native Slidev Markdown is rendered inside `ATLAS`, from basic text structure to lists, code, tables, and mathematical notation.

---
layout: two-cols-header
---

# Text

`Slidev` supports native Markdown writing. This page shows the rendering effect of `ATLAS` theme's core text elements, including headings, emphasis, links, horizontal rules, and footnotes.

::left::

```md
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
******

**Strong emphasis**, *italic text*, and `inline code`.

[Reference links](https://sli.dev) and footnotes.[^1]

[^1]: This is a short footnote rendered by Slidev.
```

::right::

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

****** 

**Strong emphasis**, *italic text*, and `inline code`.

[Reference links](https://sli.dev) and footnotes.[^1]

[^1]: This is a short footnote rendered by Slidev.


---
layout: two-cols-header
---

# Lists and Quotes

Lists and quotations remain native Markdown in `Slidev`. This page shows how `ATLAS` styles unordered lists, ordered lists, task lists, and short block quotations in the theme.

::left::

```md
- point one
  - detail
    - note

1. phase one
   1. task
      1. check

- [x] draft
- [ ] review

> A short quotation can frame a key point.
```

::right::

- point one
  - detail
    - note

1. phase one
   1. task
      1. check

- [x] draft
- [ ] review

> A short quotation can frame a key point.

---
layout: two-cols-header
---

# Code, Tables, and Math

Code fences, tables, and mathematical expressions are also written through native `Slidev` Markdown. `ATLAS` provides the visual treatment so these technical elements stay consistent with the rest of the deck.

::left::

```md
The code example
  ``ts
  const score = w * x + b
  ``
  
The table example.
| Model | Score |
| :---: | :---: |
| Base  |  0.81 |
| ATLAS |  0.93 |

The score uses $s = w^\top x + b$.
  $$
  E = mc^2
  $$
```

::right::

The code block example.

```ts
const score = w * x + b
```

The table example.

| Model | Score |
| :---: | :---: |
| Base  |  0.81 |
| ATLAS |  0.93 |

The score uses $s = w^\top x + b$.

$$
E = mc^2
$$

---
layout: section
section: Components
---

This section introduces the reusable ATLAS component set, including shared schemes, inline annotations, structured content blocks, comparisons, timelines, and media helpers.

---
layout: two-cols-header
---

# Component Schemes

`ATLAS` provides a reusable component set for presentation slides. To keep the visual system consistent, all components share the same `scheme` color API. Components can adapt automatically to light and dark themes. In addition to the 22 Tailwind color families, `ATLAS` also provides four theme-level schemes: `default`, `primary`, `secondary`, and `ink`.

::left::

## Scheme Gallery 

<div class="grid grid-cols-5 gap-2">
  <atlas-card
    v-for="name in ['default', 'primary', 'secondary', 'ink', 'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']"
    :key="name"
    :scheme="name"
    class="rounded-lg"
    body-class="p-1 text-xs text-center"
  >
    {{ name }}
  </atlas-card>
</div>

::right::

## Example Code

```html
<atlas-card scheme="secondary" 
  body-class="px-2" class="rounded-lg">
 Secondary scheme
</atlas-card>

<atlas-pill scheme="violet">Draft</atlas-pill>
```

## Rendering Effect

<div class="flex flex-row pt-0 gap-4">
<atlas-card scheme="secondary" body-class="px-2 text-center" class="rounded-lg">
  Secondary scheme
</atlas-card>

<atlas-pill scheme="violet">Draft</atlas-pill>
</div>

---
layout: two-cols-header
---

# Inline Components

`ATLAS` provides `AtlasEyebrow`, `AtlasPill`, `AtlasDot`, `AtlasKbd`, and `AtlasStep` for lightweight inline annotation. They are intended for labels, markers, keyboard hints, and compact step indicators inside running text.

::left::

```html
<atlas-eyebrow scheme="primary">
  Methods
</atlas-eyebrow>

Status <atlas-pill scheme="violet">Draft</atlas-pill>

<atlas-dot></atlas-dot> Lightweight marker.

Press <atlas-kbd>Shift</atlas-kbd>.

<atlas-step :n="1">
  Collect data.
</atlas-step>
```

::right::

## Rendering Effect

<div class="space-y-4 px-6 pt-6">
  <atlas-eyebrow scheme="primary">
    Methods
  </atlas-eyebrow>

  Status <atlas-pill scheme="violet">Draft</atlas-pill>

  <atlas-dot></atlas-dot> Lightweight marker.

  Press <atlas-kbd>Shift</atlas-kbd>.

  <atlas-step :n="1">
    Collect data.
  </atlas-step>
</div>

---
layout: two-cols-header
---

# Card Component

`ATLAS` provides `AtlasCard` as a general container for grouped notes, local examples, and small reference content. The active `scheme` changes the card color treatment, while `body-class` adjusts internal spacing. A card can hold headings, formulas, quotations, and short lists without changing the writing pattern.

::left::

```html
<atlas-card body-class="px-4 py-3" class="rounded-md">
    
### ATLAS Card

The scoring term uses $s = w^\top x + b$.

> Keep local evidence close to the claim it supports.

- short note
- reference detail

*emph* and **strong** text.
</atlas-card>
```

::right::

## Rendering Effect

<atlas-card scheme="default" body-class="px-4 py-3" class="rounded-md">
  
  ### ATLAS Card

  The scoring term uses $s = w^\top x + b$.

  > Keep local evidence close to the claim it supports.

  - short note
  - reference detail

  *emph* and **strong** text.
</atlas-card>

---
layout: two-cols-header
---

# Block Component

`ATLAS` provides `AtlasBlock` for theorem-like content, definitions, notes, and other structured academic statements. It combines a labeled header with a quieter body region so formal content remains recognizable at a glance. Different `kind` values give the block a more specific academic role without changing the writing pattern.

::left::

```html
<atlas-block kind="definition">Define a concept.
</atlas-block>

<atlas-block kind="remark">Add a short remark.
</atlas-block>

<atlas-block kind="alert">Highlight one caution.
</atlas-block>

<atlas-block kind="formula" title="">

Equation: $E = mc^2$
</atlas-block>
```

::right::

## Rendering Effect

<div class="grid grid-cols-2 gap-x-4 gap-y-4">
<atlas-block kind="definition">
Define a concept clearly.
</atlas-block>

<atlas-block kind="remark">
  Add a short remark.
</atlas-block>

<atlas-block kind="alert">
  Highlight one caution.
</atlas-block>

<atlas-block kind="formula">

  Equation: $E = mc^2$
</atlas-block>

</div>

---
layout: two-cols-header
---

# Callout and Tool Components

`ATLAS` provides `AtlasCallout` for short notes, warnings, and framing statements that should stand apart from the main flow. `AtlasTool` presents frameworks, datasets, repositories, and external resources in a compact reference card.

::left::

```html
<atlas-callout 
  scheme="primary" 
  title="Callout"
>
  Keep short notes and framing statements visible.
</atlas-callout>

<atlas-tool
  name="Slidev"
  note="Framework used in the theme preview."
  href="https://sli.dev"
  scheme="secondary"
/>
```

::right::

## Rendering Effect

<div class="flex flex-col gap-2 px-6">
  <atlas-callout scheme="primary" title="Callout">
    Keep short notes and framing statements visible.
  </atlas-callout>

  <atlas-tool
    name="Slidev"
    note="Framework used in the theme preview."
    href="https://sli.dev"
    scheme="secondary"
  />
</div>

---
layout: two-cols-header
---

# Data Components

`ATLAS` provides `AtlasStat` and `AtlasMetric` for quantitative summaries. `Stat` works well for a single stable figure, while `Metric` can show trend, delta, and optional animation when the value needs more emphasis. In practice, a slide often uses both: one static figure for context and one metric for change or progression.

::left::

```html
<atlas-stat value="18" label="Layouts" s
  cheme="secondary" />

<atlas-metric value="12" label="Themes"
  scheme="primary" />

<atlas-metric
  value="24" label="Components"
  scheme="violet"
  :animate="true"
  :duration="800"
  trend="up" delta="100%"
/>
```

::right::

## Rendering Effect

<div class="grid h-30 grid-cols-3 items-center gap-4">
  <atlas-stat value="18" label="Layouts" scheme="secondary" />

  <atlas-metric
    value="12"
    label="Themes"
    scheme="primary"
  />

  <atlas-metric
    value="24"
    label="Components"
    scheme="violet"
    :animate="true"
    :duration="800"
    trend="up"
    delta="100%"
  />
</div>

---
layout: two-cols-header
---

# Comparison Components

`ATLAS` provides `AtlasPros`, `AtlasCons`, and `AtlasCompare` for paired evaluation. `Pros` and `Cons` can be used on their own for short lists, while `Compare` places two viewpoints side by side with a shared divider. This makes it easier to present strengths and risks, baselines and improvements, or any other paired reading of the same topic.

::left::

```html
<atlas-compare leftLabel="Strengths" rightLabel="Risks">
<template #left>
<atlas-pros title="Pros" scheme="primary">
- Rich components.
- Academic layouts.
</atlas-pros>
</template>
<template #right>
<atlas-cons title="Cons" scheme="secondary">
- Limited testing.
- Lack docs.
</atlas-cons>
</template>
</atlas-compare>
```

::right::

## Rendering Effect

<div class="pt-4">
<atlas-compare leftLabel="Strengths" rightLabel="Risks">

<template #left>
<atlas-pros title="Pros" scheme="primary">

- Rich components.
- Academic layouts.
</atlas-pros>
</template>

<template #right>
<atlas-cons title="Cons" scheme="secondary">

- Limited testing.
- Lack docs.
</atlas-cons>
</template>

</atlas-compare>
</div>

---
layout: two-cols-header
---

# Timeline Components

`ATLAS` provides two timeline components: the **vertical timeline** and the **horizontal timeline**. This page introduces the vertical timeline. `AtlasTimeline` provides the shared axis, and `AtlasTimelineItem` adds the `when` label and body text. Each item inherits the timeline scheme by default, but it can also override the scheme locally. The vertical timeline is designed for text content only.

::left::

```html
<atlas-timeline scheme="violet">
  <atlas-timeline-item when="2024">
    Plan the development schedule. 
  </atlas-timeline-item>
  
  <atlas-timeline-item when="2025" scheme="primary">
    Complete system funtion development.
  </atlas-timeline-item>

  <atlas-timeline-item when="2026" scheme="secondary">
    System testing and iteration.
  </atlas-timeline-item>
</atlas-timeline>
```

::right::

## Vertical Timeline

<atlas-timeline class="ml-10 pt-4" scheme="violet">
  <atlas-timeline-item when="2024">
    Plan the development schedule. 
  </atlas-timeline-item>
  
  <atlas-timeline-item when="2025" scheme="primary">
    Complete system funtion development.
  </atlas-timeline-item>

  <atlas-timeline-item when="2026" scheme="secondary">
    System testing and iteration.
  </atlas-timeline-item>
</atlas-timeline>

---
layout: two-cols-header
---

# Timeline Components

`ATLAS` also provides a horizontal timeline for wider milestones. Similarly, `AtlasTimelineH` defines the axis, and `AtlasTimelineHItem` combines a `when` label, optional image, title, and text. The content of each item is arranged in an alternating top-and-bottom pattern.

::left::

```html
<atlas-timeline-h scheme="primary">
  <atlas-timeline-h-item 
    title="Layout Design" when="2025" 
    image="https://picsum.photos/200/125">
    The first phase focused on page structure, 
    spacing rhythm, and a consistent academic frame.
  </atlas-timeline-h-item>

  <atlas-timeline-h-item title="Component Design"
    when="2026" image="https://picsum.photos/400/250"
    scheme="violet">
    The component library later unified repeated UI 
    patterns and the shared scheme-based API.
  </atlas-timeline-h-item>
</atlas-timeline-h>
```

::right::
## Horizontal Timeline

<div class="mx-2">
<atlas-timeline-h scheme="primary">
  <atlas-timeline-h-item
    when="2025"
    title="Layout Design"
    image="https://picsum.photos/200/110"
  >
    The first phase focused on page structure, spacing rhythm, and a consistent academic frame.
  </atlas-timeline-h-item>

  <atlas-timeline-h-item
    when="2026"
    title="Component Design"
    image="https://picsum.photos/400/220"
    scheme="violet"
  >
    The component library later unified repeated UI patterns and the shared scheme-based API.
  </atlas-timeline-h-item>
</atlas-timeline-h>
</div>

---
layout: two-cols-header
---

# Image Component

`ATLAS` provides `AtlasImage` for online and local images. It supports both `contain` and `cover`: `contain` keeps the whole image visible inside the frame, while `cover` fills the frame and may crop the image. It also accepts an optional `caption`, while `class`, `visual-class`, `image-class`, and `caption-class` can be used to style the outer box, the visual layer, the image element, and the caption.

::left::

```html
<atlas-image
  image="https://picsum.photos/200/120" 
  fit="contain" class="h-56"
  visual-class="rounded-md border border-blue" 
  image-class="rounded-md"
  caption="Contain keeps the full figure visible."/>

<atlas-image
  image="https://picsum.photos/200/120" 
  fit="cover" class="h-56"
  visual-class="rounded-md border border-blue" 
  caption-class="text-red"
  caption="Cover fills the frame and may crop."/>
```

::right::

## Rendering Effect

<div class="grid grid-cols-2 gap-4">
  <atlas-image
    image="https://picsum.photos/200/120" fit="contain" class="h-56"
    visual-class="border border-blue rounded-md" image-class="rounded-md"
    caption="Contain keeps the full figure visible."/>

  <atlas-image
    image="https://picsum.photos/200/120" fit="cover" class="h-56"
    visual-class="rounded-md border border-blue" caption-class="text-red"
    caption="Cover fills the frame and may crop."/>
  </div>

---
layout: two-cols-header
---

# Video Component

`ATLAS` provides `AtlasVideo` for video content. It follows the same general structure as `AtlasImage`, supports `contain` and `cover`, and accepts an optional `poster`. For playback, `autoplay` starts the video immediately, `controls` shows the native player UI, `loop` repeats the video, and `muted` controls whether audio is enabled.

::left::

```html
<atlas-video src="/assets/flower.mp4"
  poster="https://picsum.photos/200/120"
  class="h-56"
  visual-class="rounded-md border border-blue"
  caption="Poster is shown before video plays." />

<atlas-video src="/assets/flower.mp4"
  poster="https://picsum.photos/200/120"
  class="h-56" fit="cover"
  :autoplay="true" :controls="false"
  :loop="true" :muted="true"
  visual-class="rounded-md border border-blue"
  caption="Automatic loop playback without controls."
/>
```

::right::

## Rendering Effect

<div class="grid grid-cols-2 gap-4">
<atlas-video
  src="/assets/flower.mp4"
  poster="https://picsum.photos/200/120"
  class="h-56"
  visual-class="rounded-md border border-blue"
  caption="Poster is shown before video plays."
/>

<atlas-video
  src="/assets/flower.mp4"
  poster="https://picsum.photos/200/120"
  fit="cover"
  :autoplay="true"
  :controls="false"
  :loop="true"
  :muted="true"
  class="h-56"
  visual-class="rounded-md border border-blue"
  caption="Automatic loop playback without controls."
/>
</div>

---
layout: two-cols-header
---

# Iframe Component

`ATLAS` also provides `AtlasIframe` for embedded documentation, demos, and external tools. It accepts a `url`, an optional `caption`, and a `scale` value for zooming the embedded page inside the frame. As with `AtlasImage`, `class`, `visual-class`, `iframe-class`, and `caption-class` can be used to style the outer box, the visual layer, the iframe element, and the caption.

::left::

```html
<atlas-iframe class="h-56"
  :scale="0.25"
  url="https://sli.dev" 
  visual-class="rounded-md border border-blue"
  caption="Scale 0.25 keeps more of the page visible."
/>

<atlas-iframe class="h-56"
  :scale="1"
  url="https://sli.dev" 
  visual-class="rounded-md border border-blue"
  caption="Scale 1 uses the default embedded size."
/>
```

::right::

## Rendering Effect

<div class="grid grid-cols-2 gap-4">
<atlas-iframe
  url="https://sli.dev"
  :scale="0.25"
  class="h-56"
  visual-class="rounded-md border border-blue"
  caption="Scale 0.25 keeps more of the page visible."
/>

<atlas-iframe
  url="https://sli.dev"
  :scale="1"
  class="h-56"
  visual-class="rounded-md border border-blue"
  caption="Scale 1 uses the default embedded size."
/>
</div>

---
layout: two-cols-header
---

# Background Component

`ATLAS` provides `AtlasBackground` for hero regions, section openers, and other slides that need a controlled media backdrop behind foreground content. It accepts a `src`, detects image or video sources automatically, supports `cover` and `contain`, and allows the overlay intensity and overlay color to be adjusted.

::left::

```html
<atlas-background 
  class="h-56" 
  fit="cover" 
  src="https://picsum.photos/200/120" 
  :overlay="0.55" 
  overlayColor="white">
  <div class="flex h-full flex-col justify-end p-6">
    <AtlasEyebrow>AtlasBackground</AtlasEyebrow>
    <h1>Scoped media background</h1>
    Use it as a local media layer when a slide needs
    atmosphere without turning into a full background
    layout.
  </div>
</atlas-background>
```

::right::

## Rendering Effect

  <atlas-background
    class="h-56" fit="cover" 
    src="https://picsum.photos/200/120" 
    :overlay="0.55">
    <div class="flex h-full flex-col justify-end p-6">
      <AtlasEyebrow>AtlasBackground</AtlasEyebrow>
      <h1>Scoped media background</h1>
      Use it as a local media layer when a slide needs
      atmosphere without turning into a full background
      layout.
    </div>
  </atlas-background>

---
layout: two-cols-header
---

# Background Component

`ATLAS` also supports video backgrounds through `AtlasBackground`. When `src` points to a video, the component detects it automatically and renders a media layer behind foreground content. `poster` can be used as a fallback image before the video is ready, and autoplay can be disabled when you want the slide to start from a static cover frame.

::left::

```html
<atlas-background
  src="/assets/flower.mp4"
  poster="https://picsum.photos/200/120"
  :autoplay="false" 
  :controls="true"
  :loop="true" :muted="true" 
  :overlay="0.45" fit="cover">
  <div class="flex flex-col justify-start p-6">
    <AtlasEyebrow>AtlasBackground</AtlasEyebrow>
    <h1>Video background</h1>
    Poster is visible first, and the video starts 
    from the native play control.
  </div>
</atlas-background>
```

::right::

## Rendering Effect

  <atlas-background
    class="h-56"
    src="/assets/flower.mp4"
    poster="https://picsum.photos/200/120"
    :autoplay="false"
    :controls="true"
    :loop="true"
    :muted="true"
    :overlay="0.45"
    fit="cover">
    <div class="pointer-events-none flex h-full flex-col justify-start p-6">
      <AtlasEyebrow>AtlasBackground</AtlasEyebrow>
      <h1>Video background</h1>
      Poster is visible first, and the video starts from the native play control.
    </div>
  </atlas-background>

---
layout: section
section: Layouts
---

This section reviews the layout system of `ATLAS`, from fixed structural pages to content layouts and framed pages for emphasis.

---
layout: two-cols-header
---

# Layout Overview

`ATLAS` keeps the layout system intentionally small. Some layouts are fully fixed, some are used to organize ordinary slide content, and some provide a stronger page pattern while still leaving room for custom content.

::left::

### Fixed layouts

- `cover` displays title, subtitle, authors, and metadata.
- `end` is the last slide that provides contacts or references.
- `toc` provides a section overview.
- `section` marks chapter transitions.

### Framed layouts

- `intro` introduces a short transition.
- `fact` emphasizes one number or compact result.
- `statement` presents one thesis sentence with a short explanation.
- `quote` isolates one quotation or cited remark.

::right::

### Content layouts

- `default` provides the basic content frame.
- `center` centers one compact block of content.
- `two-cols` and `two-cols-header` organize comparisons.
- `image`, `image-left`, and `image-right` attach figures to a text region.
- `iframe`, `iframe-left`, and `iframe-right` embed live pages alongside text.

::bottom::



Layouts are selected in slide frontmatter, while the slide body stays plain Markdown or reusable Vue components.

---
layout: intro
---

# Intro Layout

`intro` layout introduces a short transition, a guiding question, or the next section of the argument. It works best when the slide needs one heading and one brief explanation before the deck moves on.

---
layout: fact
---

# Fact Layout 

centers one number, ratio, or compact result. It is useful when a single figure should dominate the page before any longer explanation appears.

---
layout: statement
---

# Statement layout keeps one thesis sentence in focus.

It is designed for one argument, one principle, or one transition claim, followed by one short explanation that clarifies how the sentence should be read.

---
layout: quote
author: ATLAS Theme
---

Quote layout presents one quotation or cited remark with minimal distraction.

---
layout: default
---

# Default Layout

`default` layout is the baseline page for headings, paragraphs, lists, code blocks, tables, and ordinary component composition.

- use it for most slides in the presentation
- rely on it when structure matters more than emphasis
- treat other layouts as focused variations on this frame

---
layout: center
---

# Center Layout

`center` layout places one compact block in the visual middle of the slide. It works well for a short statement, a compact definition, or a small piece of content that should stand alone without additional framing.

---
layout: two-cols
---

# Two-Cols Layout

`two-cols` layout provides two equal content areas without a shared header row. It is useful when both sides should carry similar visual weight.

## Usage Code

```md
---
layout: two-cols
---

# Left Content

::right::

# Right Content
```

::right::

# Example

`two-cols` works well when one side presents source material and the other side explains it.

- left side: code, notes, or a figure
- right side: interpretation or comparison
- both columns keep the same visual weight

---
layout: two-cols-header
---

# Two-Cols-Header Layout

`two-cols-header` layout adds a shared heading and an optional bottom region on top of the two-column structure. It works well for documentation pages, code-and-result slides, and structured comparisons.

::left::

## Usage Code

```md
---
layout: two-cols-header
---
# Shared Heading

::left::
# Left Content

::right::
# Right Content

::bottom::
# Shared Bottom
```

::right::

## Example

Left Column:
- source material
- setup notes
- short explanation

Right Column:
- rendered result
- comparison point
- brief conclusion

::bottom::

The bottom region can be used for a shared note, a citation, or a short conclusion that belongs to both columns.

---
layout: image
image: https://picsum.photos/1280/480
fit: cover
caption: Full-image layout with text overlay.
---

# Image Layout

Image Layout uses a full-page figure as the main visual field. Text can be layered on top when the figure needs a short title or explanation rather than a separate text column.

```md
---
layout: image
image: https://picsum.photos/240/240
fit: cover
caption: Full-image layout with text overlay.
---
```

---
layout: image-left
image: https://picsum.photos/260/240
fit: cover
caption: Example figure attached to the media area.
---

# Image-Left Layout

`image-left` layout places the figure on the left and reserves the right side for explanation. It is useful when the image should be seen first and the text should interpret it.

## Usage Code

```md
---
layout: image-left
image: https://picsum.photos/240/240
fit: cover
caption: Example figure attached to the media area.
---
```

---
layout: image-right
image: https://picsum.photos/240/240
fit: cover
caption: Example figure attached to the media area.
---

# Image-Right Layout

`image-right` layout mirrors the same structure and places the figure on the right. It is useful when the textual argument should lead and the figure should support it.

## Usage Code

```md
---
layout: image-right
image: https://picsum.photos/240/240
fit: cover
caption: Example figure attached to the media area.
---
```

---
layout: iframe
url: https://sli.dev
scale: 1
caption: "Iframe layout: Full-page embedded page."
---

---
layout: iframe-left
url: https://sli.dev
scale: 0.6
caption: Embedded page on the left.
---

# Iframe-Left Layout

`iframe-left` layout keeps the embedded page on the left and reserves the right side for explanation. This is a good fit for walkthroughs and narrated demos.

## Usage Code

```md
---
layout: iframe-left
url: https://sli.dev
scale: 0.6
caption: Embedded page on the left.
---
```

---
layout: iframe-right
url: https://sli.dev
scale: 0.6
caption: Embedded page on the right.
---

# Iframe-Right Layout

`iframe-right` layout mirrors the side-embed pattern and places the explanation on the left. It is useful when the narrative should read first and the demo should stay visible alongside it.

## Usage Code

```md
---
layout: iframe-right
url: https://sli.dev
scale: 0.6
caption: Embedded page on the right.
---
```

---
layout: end
end_items:
  - [GitHub, github, R-Sh1ki/slidev-theme-atlas]
  - [Email, email, atlas@example.com]
  - [Website, website, atlas.example.com]
  - [ATLAS LAB, wechat, /assets/atlas-test-qrcode.png]
---

# Thank you for listening!

## Question & Discussion
