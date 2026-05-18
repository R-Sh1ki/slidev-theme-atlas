<h1 align="center">slidev-theme-atlas</h1>

<p align="center">
  A structured Slidev theme for academic and technical presentations.
</p>

<p align="center">
  <img alt="Slidev Theme" src="https://img.shields.io/badge/Slidev-Theme-0ea5e9?style=flat-square" />
  <img alt="Presentation Style" src="https://img.shields.io/badge/Style-Academic%20%26%20Technical-334155?style=flat-square" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-16a34a?style=flat-square" />
</p>

ATLAS is a structured [Slidev](https://sli.dev/) theme for academic and technical presentations. It preserves Slidev’s native Markdown workflow while providing a consistent visual frame, reusable layouts, scheme-based components, and a customizable brand color system for institutions, laboratories, and research groups.

## Preview

|                                                          Cover                                                          |                                                  Component Schemes                                                   |
| :---------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: |
|    ![ATLAS cover preview](https://raw.githubusercontent.com/R-Sh1ki/slidev-theme-atlas/main/docs/previews/cover.png)    | ![ATLAS scheme preview](https://raw.githubusercontent.com/R-Sh1ki/slidev-theme-atlas/main/docs/previews/schemes.png) |
|                                                   Timeline Components                                                   |                                                   Media Components                                                   |
| ![ATLAS timeline preview](https://raw.githubusercontent.com/R-Sh1ki/slidev-theme-atlas/main/docs/previews/timeline.png) |  ![ATLAS media preview](https://raw.githubusercontent.com/R-Sh1ki/slidev-theme-atlas/main/docs/previews/image.png)   |
|                                                     Layout Overview                                                     |                                                      End Layout                                                      |
|  ![ATLAS layout preview](https://raw.githubusercontent.com/R-Sh1ki/slidev-theme-atlas/main/docs/previews/layouts.png)   |    ![ATLAS end preview](https://raw.githubusercontent.com/R-Sh1ki/slidev-theme-atlas/main/docs/previews/end.png)     |

## Features

- **Academic Style:** paper-style cover metadata, structured sectioning, shared headers and footers, and a contact-oriented end page
- **Comprehensive Layouts:** fixed, content, and framed layouts for common presentation patterns
- **Rich Components:** reusable components with one shared `scheme` color API
- **Light/Dark Support:** consistent adaptation across both color modes
- **Brand Customization:** editable `primary` and `secondary` palette families
- **Media Support:** image, video, iframe, and background components for technical presentations

### Academic and Technical Presentation Support

ATLAS is designed for research talks, internal reviews, lecture decks, and technical presentations that need more structure than a generic slide theme. It includes a paper-style cover, section pages, a consistent header and footer frame for content layouts, and an end page that presents contact information and institutional links in a compact academic format.

The theme supports:

- title, subtitle, presenter, email, conference, location, and date metadata
- optional author and institution lists on the cover
- logos on the cover, header, and end page
- structured contact and link items on the end page
- section pages and framed layouts for transitions, statements, facts, and quotations

### Layout Overview

ATLAS layouts are organized into three groups:

| Category        | Layouts                                                                                                                           | Notes                                                                        |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Fixed layouts   | `cover`, `section`, `toc`, `end`                                                                                                  | Fully structured pages for sectioning, navigation, and metadata-heavy slides |
| Content layouts | `default`, `center`, `two-cols`, `two-cols-header`, `image`, `image-left`, `image-right`, `iframe`, `iframe-left`, `iframe-right` | Standard layouts for author-controlled slide content                         |
| Framed layouts  | `intro`, `fact`, `statement`, `quote`                                                                                             | More opinionated layouts with a defined visual role                          |

### Component Overview

ATLAS provides a reusable component set for technical slide content:

| Category            | Components                                                                   |
| ------------------- | ---------------------------------------------------------------------------- |
| Inline              | `AtlasEyebrow`, `AtlasPill`, `AtlasDot`, `AtlasKbd`, `AtlasStep`             |
| Content             | `AtlasCard`, `AtlasBlock`, `AtlasCallout`, `AtlasTool`                       |
| Data and comparison | `AtlasStat`, `AtlasMetric`, `AtlasPros`, `AtlasCons`, `AtlasCompare`         |
| Timeline            | `AtlasTimeline`, `AtlasTimelineItem`, `AtlasTimelineH`, `AtlasTimelineHItem` |
| Media               | `AtlasImage`, `AtlasVideo`, `AtlasIframe`, `AtlasBackground`                 |

All visual components share the same `scheme` API. This keeps color treatment consistent across categories and allows the same component usage to adapt naturally between light and dark themes.

### Color System

ATLAS provides four theme-level schemes: `default`, `primary`, `secondary`, and `ink`. It also supports the Tailwind color families from `slate` through `rose`. Because the `scheme` interface is shared, one palette choice can be applied consistently across cards, callouts, metrics, tags, timelines, and media containers.

ATLAS is also designed to be adapted. The full `--atlas-primary-*` and `--atlas-secondary-*` token families are defined in [`styles/layout.css`](styles/layout.css), so the theme can be aligned with an institutional visual identity without redesigning the layout and component system.

## Usage

### Installation

Install the theme in a Slidev deck:

```bash
npm install -D slidev-theme-atlas
```

Enable it in slide frontmatter:

```yaml
---
theme: atlas
---
```

For local development before publishing, a relative path also works:

```yaml
---
theme: ../slidev-theme-atlas
---
```

### Theme-Specific Configuration

#### Cover Layout

Cover metadata is configured through frontmatter:

```yaml
---
theme: atlas
title: ATLAS Theme Preview
subtitle: A structured Slidev theme for academic presentations
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
```

The principal theme-specific frontmatter fields are listed below:

|     Field      | Purpose                                         |
| :------------: | ----------------------------------------------- |
|    `title`     | Presentation title used by the cover and footer |
|   `subtitle`   | Optional subtitle                               |
|   `reporter`   | Footer left slot and cover presenter line       |
|    `email`     | Cover email link                                |
|  `conference`  | Cover conference metadata                       |
|   `location`   | Cover conference metadata                       |
|    `logos`     | Logos shown on the cover and end page           |
|  `headerlogo`  | Logo shown in the shared header                 |
|   `authors`    | Optional author list for paper-style cover      |
| `institutions` | Optional institution list matched by `inst_id`  |
|  `showHeader`  | Per-slide override for the shared header        |
|  `showFooter`  | Per-slide override for the shared footer        |

#### End Layout

The end layout supports structured contact and link items through `end_items`:

```yaml
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
```

Supported icon keys include:

| Icon key   | Expected `value` format                             | Resolved behavior                              |
| ---------- | --------------------------------------------------- | ---------------------------------------------- |
| `github`   | `owner/repo` or `github.com/owner/repo`             | Converts to a GitHub repository link           |
| `email`    | `name@example.com`                                  | Converts to a `mailto:` link                   |
| `website`  | `example.com` or full URL                           | Converts to an external website link           |
| `homepage` | `example.com` or full URL                           | Converts to an external website link           |
| `link`     | `example.com` or full URL                           | Converts to a generic external link            |
| `repo`     | `example.com` or full URL                           | Converts to a repository-style external link   |
| `discord`  | invite code, `discord.gg/...`, or `discord.com/...` | Converts to a Discord invite link              |
| `wechat`   | QR image path                                       | Renders a QR code block instead of a text link |
| `zenodo`   | record id, `records/...`, or `zenodo.org/...`       | Converts to a Zenodo record link               |
| `contact`  | free text or URL                                    | Uses a generic contact icon; link is optional  |

For most cases, the compact tuple form is sufficient:

```yaml
- [Label, icon, value]
```

### Component Usage

ATLAS components are designed to be used directly inside Markdown slides, with a shared `scheme` interface:

```html
<AtlasCard scheme="secondary" body-class="px-4 py-3">
  This card uses the shared secondary scheme.
</AtlasCard>

<AtlasPill scheme="violet">Draft</AtlasPill>

<AtlasMetric
  scheme="primary"
  value="24"
  label="Components"
  delta="+4"
  trend="up"
/>
```

The same `scheme` value can be reused across content, annotation, metric, timeline, and media components without changing the surrounding layout logic.

### Theme Customization

The theme is intended to be customized primarily through its color tokens. The full `primary` and `secondary` families can be updated in [`styles/layout.css`](styles/layout.css):

```css
:root {
  --atlas-primary-50: #f4f7fb;
  --atlas-primary-100: #dfe8f5;
  --atlas-primary-200: #c0d3ee;
  --atlas-primary-300: #94b6e3;
  --atlas-primary-400: #5f8fd2;
  --atlas-primary-500: #336bbf;
  --atlas-primary-600: #1f54a5;
  --atlas-primary-700: #0b3d7a;
  --atlas-primary-800: #082f5d;
  --atlas-primary-900: #051f3e;
  --atlas-primary-950: #031226;

  --atlas-secondary-50: #fdf3f2;
  --atlas-secondary-100: #f9e1df;
  --atlas-secondary-200: #f1c0ba;
  --atlas-secondary-300: #e58f85;
  --atlas-secondary-400: #d86254;
  --atlas-secondary-500: #c84534;
  --atlas-secondary-600: #b53324;
  --atlas-secondary-700: #952416;
  --atlas-secondary-800: #73180e;
  --atlas-secondary-900: #4f0e08;
  --atlas-secondary-950: #320804;
}
```

For theme development and preview:

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run export
npm run screenshot -- --output docs/screenshots
```

For more detailed component and layout usage examples, refer to [`example.md`](/Users/shiki/workspace/slidev-theme-atlas/example.md).
