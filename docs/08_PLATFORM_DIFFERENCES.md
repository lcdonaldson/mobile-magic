# Platform Differences (iOS / Android)

Mobile Magic normalizes the biggest platform differences where it should, and leaves app-level choices where it must.

## Handled in Tokens/Components

### Shadows

`shadows` are platform-split in `tokens.ts`:

- iOS uses `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`.
- Android uses `elevation`.

Use `shadows.sm|md|lg` instead of hand-authoring per platform.

### Switch Rendering

`Switch` is intentionally platform-aware:

- iOS: native `Switch`.
- Android: custom track + thumb for visual consistency with skins.

### Press Feedback

Interactive components use:

- Android ripple on Android
- pressed-state color behavior for iOS parity

## App-Level Responsibilities

- Safe areas (`react-native-safe-area-context`) and screen layout structure.
- Navigation/header behavior by chosen routing library.
- Font loading strategy (Expo vs bare RN) if using `theme.fontFamily`.

## Rule

Prefer keeping platform differences in exported tokens and shared primitives.
Only branch per-platform in app code when behavior is genuinely product-specific.
