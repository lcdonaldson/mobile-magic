# Token Reference

Source of truth: `src/tokens.ts`

All values are React Native primitives (numbers / StyleSheet objects), not CSS variables.

## Imports

```tsx
import { spacing, radii, typography, shadows, motion, MIN_TOUCH } from 'mobile-magic';
```

## Spacing

```ts
spacing.xs // 4
spacing.sm // 8
spacing.md // 16
spacing.lg // 24
spacing.xl // 32
```

## Radius

```ts
radii.sm   // 4
radii.md   // 8
radii.lg   // 12
radii.xl   // 16
radii.full // 9999
```

## Typography Scales

`typography` is a `StyleSheet.create(...)` map:

```ts
typography.h1
typography.h2
typography.h3
typography.body
typography.label
typography.caption
```

The exported type is:

```ts
type TypographyScale = keyof typeof typography;
```

## Shadows

`shadows` is platform-aware (`shadow*` on iOS, `elevation` on Android):

```ts
shadows.sm
shadows.md
shadows.lg
```

## Motion

```ts
motion.fast // 150
motion.base // 200
motion.slow // 300
```

These values are currently consumed by shipped components like `Switch` and `ProgressBar`.

## Accessibility

```ts
MIN_TOUCH // 44
```

Use this as the minimum interactive hit target for custom controls.
