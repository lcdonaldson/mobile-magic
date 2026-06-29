# Why This System Exists

## The Problem We Are Preventing

Most React Native apps decay into:

- copy-pasted inline styles,
- color drift between screens,
- inconsistent dark mode behavior,
- one-off component variants no one can reason about later.

## Mobile Magic Response

Mobile Magic is intentionally small and strict:

1. **Skins** define semantic color identity with a fixed 4-property contract:
   - `bg`
   - `fg`
   - `border`
   - `pressed`
2. **Tokens** define static design decisions once (`spacing`, `radii`, `typography`, `shadows`, `motion`).
3. **Provider + theme** centralize mode and theme overrides.
4. **Components** consume the same rules so behavior stays predictable.

## Why This Scales Better

- A theme shift is centralized instead of a grep exercise.
- Accessibility minimums (`MIN_TOUCH`, roles, reduced motion) become default behavior.
- New components can be added without inventing new styling philosophies.
- Consumers can still build anything not shipped using `useTheme()` + tokens.

## What We Avoid by Design

- Framework-specific coupling in core exports.
- Huge prop-heavy abstractions that replace every native primitive.
- Features added for novelty instead of repeated product need.

The goal is not the biggest component catalog.
The goal is the most trustworthy mobile UI foundation.
