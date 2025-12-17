# Figma Key Page Flows

These flows define the core screens that should be kept in sync between Mastergo tokens/components and Figma prototypes.

## Conversation List
- **Entry point**: Left rail visible on desktop; collapsible to icons on narrow widths.
- **States**: Default, hover, selected. Selected uses `color.surface.inset` with border `color.border.strong`.
- **Content**: Avatar/initials, title at `font.size.md`, subtitle at `font.size.sm` with `color.text.secondary`, timestamp at `font.size.xs`.
- **Empty**: Shows call-to-action card with ghost button and illustration placeholder.

## Chat Panel
- **Header**: Thread title, participant chips, secondary actions (search, pin, share). Buttons use the secondary style from the Mastergo baseline.
- **Transcript**: Alternating message bubbles (user/assistant/system) using the defined tokens; max width 720px with center alignment; inline code and lists inherit typography tokens.
- **Composer**: Text field uses the input baseline; attachments and quick actions use ghost buttons; enter-to-send toggle lives in settings.
- **Typing/Streaming**: Assistant bubble shows animated ellipsis and uses `color.state.info` for the indicator.

## Settings / Preferences Panel
- **Sections**: Account, Notifications, Shortcuts, Accessibility, Experiments.
- **Controls**: Toggle switches, checkboxes, select, and text inputs all inherit shared tokens; destructive actions reuse the secondary button with `color.state.error` applied to label.
- **Layout**: Two-column grid for desktop, stacked cards for narrow widths; sticky footer with Save/Cancel aligned right.

## Error / Empty States
- **Network Error**: Full-width banner at top of chat panel using `color.state.error` background with white text and retry button (secondary style).
- **Empty Inbox**: Conversation list shows illustration, headline at `font.size.lg`, supporting copy at `font.size.md`, and primary button to start a chat.
- **No Search Results**: Within conversation list search, show muted copy and link to clear filters.

## Notes for Figma Delivery
- Create shared libraries for tokens and components to ensure cross-file updates.
- Attach annotations for spacing and interaction states so engineering can map them to the tokens in `design/mastergo.md`.
- Keep page flows aligned with the dialog layout baseline for modals within settings or error acknowledgements.
