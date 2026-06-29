# Mobile Magic Docs

This folder contains project docs for the current `mobile-magic` architecture.

## Start Here

- [MVP Tutorial (Web Page)](./mvp-tutorial.html)
- [01 Overview](./01_OVERVIEW.md)
- [02 Components](./02_COMPONENTS.md)
- [03 Tokens](./03_TOKENS.md)
- [04 Layout Strategy](./04_LAYOUT_STRATEGY.md)
- [05 Why Our System](./05_WHY_OUR_SYSTEM.md)
- [06 Navigation Theming](./06_NAVIGATION_THEMING.md)
- [07 Accessibility](./07_ACCESSIBILITY.md)
- [08 Platform Differences](./08_PLATFORM_DIFFERENCES.md)
- [09 Animation Patterns](./09_ANIMATION_PATTERNS.md)

## Canonical Source

For runnable API truth, always defer to:

- `src/index.ts` (public exports)
- `src/provider.tsx` (theme provider + skin resolution)
- `src/skins.ts` (theme and skin contracts)
- `src/tokens.ts` (token definitions)

## Notes

- Docs are aligned to current shipped API (no `useThemeColors`, no `variant` API, no framework-specific navigation export).
- Navigation integration is intentionally manual and shown as a bridging pattern.
