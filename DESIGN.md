---
name: Modern Fiscal Intelligence
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: auto
  max-width: 1280px
---

## Brand & Style
The brand personality of the design system is anchored in **stability, clarity, and precision**. It aims to evoke an emotional response of security and control, essential for a personal finance application. 

The design style is **Corporate / Modern Minimalism**. It prioritizes high-quality typography and strategic whitespace to reduce cognitive load during complex financial tasks. By utilizing a "Content-First" approach, the UI recedes to let the user's financial data take center stage. The aesthetic is professional and grounded, avoiding unnecessary flourishes in favor of a systematic, reliable interface that feels like a premium financial institution.

## Colors
This design system utilizes a palette designed for high legibility and semantic clarity.

- **Primary (Deep Navy):** Used for core branding, navigation backgrounds, and primary headings to establish authority and trust.
- **Secondary (Professional Blue):** Used for interactive elements, links, and selection states.
- **Success (Green):** Specifically reserved for positive financial trends, income, and completed goals.
- **Error (Red):** Reserved for expenses, over-budget alerts, and critical system errors.
- **Neutral (Slate Grays):** A scale of soft grays used for borders, secondary text, and background surfaces to provide a calm, low-contrast environment.

The default state is **Light Mode**, featuring a crisp off-white background (`#F8FAFC`) to ensure the deep navy text maintains an optimal contrast ratio for accessibility.

## Typography
The design system relies exclusively on **Inter**, a typeface engineered for screen readability and data density. 

- **Scale:** The type scale follows a strict hierarchy. Display sizes are used for dashboard overviews (e.g., Total Balance), while smaller, medium-weight labels are used for data table headers.
- **Readability:** For financial figures, use tabular numbers (tnum) where possible to ensure that decimal points and digits align vertically in lists and tables.
- **Weight:** Font weights are used sparingly—SemiBold (600) for headers and Medium (500) for labels—to maintain a clean look without over-emphasizing secondary information.

## Layout & Spacing
The layout philosophy is built on a **Fixed-Width Grid** for desktop and a **Fluid Grid** for mobile devices.

- **Grid System:** A 12-column grid is used for desktop (max-width 1280px) to maintain a structured, professional feel. Gutters are fixed at 24px to provide ample breathing room between financial modules.
- **Spacing Rhythm:** All spacing is based on an 8px root unit. This creates a predictable visual cadence. Use 16px (md) for internal card padding and 24px (lg) for vertical section spacing.
- **Mobile Adaptation:** On mobile, the grid collapses to a single column with 16px side margins. Cards become full-width or slightly inset to maximize screen real estate for data entry.

## Elevation & Depth
To convey hierarchy without clutter, this design system uses **Ambient Shadows** and **Tonal Layers**.

- **Surface Strategy:** The primary background is the lowest layer. Cards and containers sit on top of this surface using a pure white background.
- **Shadows:** Use extremely soft, low-opacity shadows (e.g., `0px 4px 12px rgba(15, 23, 42, 0.05)`). Shadows should feel like a subtle lift rather than a floating object.
- **Tonal Depth:** For secondary UI elements like inactive tabs or sidebars, use subtle gray fills (`#F1F5F9`) instead of shadows to indicate they are "behind" the primary content area.
- **Interactive States:** On hover, cards should slightly increase their shadow spread to provide tactile feedback to the user.

## Shapes
The shape language is defined as **Rounded (Level 2)**. 

Standard UI elements like buttons and input fields utilize a **0.5rem (8px)** corner radius. For larger containers and dashboard cards, use **1rem (16px)** to create a softer, more approachable look that balances the professional navy color palette. 

Small utility components, such as status tags or notification dots, may use "Full" roundedness (pill-shaped) to distinguish them from actionable buttons.

## Components

- **Buttons:** 
  - *Primary:* Solid Deep Navy with white text. High contrast for main actions like "Add Transaction."
  - *Secondary:* Ghost style with a Slate Gray border and Professional Blue text for less urgent actions.
- **Input Fields:** Use a 1px border (`#E2E8F0`). On focus, the border transitions to Professional Blue with a 2px soft glow. Labels sit strictly above the input for maximum clarity.
- **Cards:** The workhorse of the design system. Cards should have 24px internal padding, a subtle 1px border in light gray, and the defined ambient shadow.
- **Data Tables:** Clean and borderless. Use subtle horizontal dividers (`#F1F5F9`) only. Headers should be in `label-sm` (uppercase) with a Slate Gray color to distinguish them from the data rows.
- **Chips/Tags:** Used for categorization (e.g., "Groceries", "Rent"). These use a low-opacity background tint of the category color with high-contrast text for legibility.
- **Progress Bars:** For budget tracking, use thick, rounded bars. The background track is light gray, while the progress fill uses the Success or Error colors based on the budget status.