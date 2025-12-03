# Mastergo Design Tokens & Component Baseline

This document maintains the Mastergo design tokens and component baselines for the core conversational product surfaces. Values are expressed in CSS-friendly units so that Mastergo handoff matches engineering implementation.

## Design Tokens

### Color
- `color.surface.primary`: `#0B1B2B`
- `color.surface.elevated`: `#11273C`
- `color.surface.inset`: `#0E2032`
- `color.border.subtle`: `rgba(255,255,255,0.08)`
- `color.border.strong`: `rgba(255,255,255,0.16)`
- `color.text.primary`: `#F5F8FF`
- `color.text.secondary`: `rgba(245,248,255,0.72)`
- `color.text.muted`: `rgba(245,248,255,0.56)`
- `color.accent.brand`: `#5BC2F4`
- `color.accent.brand-strong`: `#2AA0D6`
- `color.state.success`: `#5CD7B7`
- `color.state.warning`: `#FFC861`
- `color.state.error`: `#FF7B92`
- `color.state.info`: `#7EC5FF`

### Typography
- `font.family.primary`: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif
- `font.weight.regular`: 400
- `font.weight.medium`: 500
- `font.weight.semibold`: 600
- `font.size.xs`: 12px
- `font.size.sm`: 14px
- `font.size.md`: 16px
- `font.size.lg`: 18px

### Spacing & Layout
- `space.2xs`: 4px
- `space.xs`: 8px
- `space.sm`: 12px
- `space.md`: 16px
- `space.lg`: 20px
- `space.xl`: 24px
- `space.2xl`: 32px
- `radius.sm`: 6px
- `radius.md`: 10px
- `radius.lg`: 14px
- `shadow.card`: 0 10px 30px rgba(0,0,0,0.24)
- `shadow.popover`: 0 8px 20px rgba(0,0,0,0.28)

### Interaction States
- `state.hover.tint`: rgba(255,255,255,0.04)
- `state.active.tint`: rgba(255,255,255,0.08)
- `state.focus.outline`: 2px solid #5BC2F4
- `state.disabled.opacity`: 0.48

## Component Baselines

### Buttons
- **Primary**: Height 40px; padding `space.md` horizontal; background `color.accent.brand`; text `color.surface.primary`; radius `radius.md`; shadow `shadow.card` on focus; hover tint `state.hover.tint` overlay; active tint `state.active.tint` overlay; disabled opacity `state.disabled.opacity`.
- **Secondary**: Height 40px; padding `space.md` horizontal; background `color.surface.inset`; text `color.text.primary`; border `1px solid color.border.strong`; hover uses `state.hover.tint` overlay; active uses `state.active.tint`; disabled uses `state.disabled.opacity`.
- **Ghost**: Height 36px; padding `space.sm` horizontal; text `color.text.secondary`; hover `state.hover.tint`; active `state.active.tint`; focus outline `state.focus.outline` with radius `radius.md`.

### Inputs
- **Text Field**: Height 44px; padding `0 space.md`; background `color.surface.inset`; border `1px solid color.border.subtle`; focus border `color.accent.brand`; placeholder `color.text.muted`; text `color.text.primary`; radius `radius.md`; shadow none.
- **Search Field**: Height 40px; left icon padding `space.sm`; background `color.surface.inset`; border `1px solid color.border.strong`; focus ring `state.focus.outline`; clear icon uses `color.text.secondary`.

### Message Bubbles
- **User**: Background `linear-gradient(135deg, #183652 0%, #10263D 100%)`; text `color.text.primary`; padding `space.md`; radius `radius.lg` with `radius.md` on tail corners; max width 680px; timestamp `color.text.muted` at `font.size.xs`.
- **AI/Assistant**: Background `color.surface.inset`; text `color.text.primary`; padding `space.md`; radius `radius.lg`; divider between chunks uses `color.border.subtle` at `1px`.
- **System/Callouts**: Background `rgba(123,197,255,0.12)`; text `color.text.primary`; border `1px solid color.accent.brand`; icon color `color.accent.brand`.

### Dialog Layouts
- **Modal Shell**: Width 640px; max-height 80vh; padding `space.xl`; background `color.surface.elevated`; border `1px solid color.border.strong`; radius `radius.lg`; shadow `shadow.card`.
- **Header**: Title uses `font.size.lg` + `font.weight.semibold`; description uses `font.size.sm` + `color.text.secondary`; close icon `color.text.secondary`.
- **Content**: Vertical spacing `space.md`; field stack gap `space.sm`; divider `color.border.subtle`.
- **Footer**: Right-aligned primary and secondary buttons with gap `space.sm`; top border `color.border.subtle`.

## Usage Notes
- Tokens are defined to balance readability on dark surfaces; avoid introducing lighter backgrounds without verifying contrast ratios.
- Components inherit spacing tokens to ensure alignment with chat list densities.
- When extending variants, reuse existing tokens before creating new ones to keep the system cohesive.
