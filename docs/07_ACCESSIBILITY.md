# Accessibility

Accessibility is part of the default component contract, not optional polish.

## Current Baseline in Library

- Interactive controls target `MIN_TOUCH` (`44`) minimum sizing.
- Interactive components set appropriate accessibility roles/states (button, switch, checkbox, radio, progressbar).
- `Switch` and `ProgressBar` respect reduced motion behavior.

## Custom Component Checklist

When building your own component with `useTheme()` + tokens:

1. Use semantic role and state:
   - `accessibilityRole`
   - `accessibilityState`
2. Keep touch targets >= `MIN_TOUCH`.
3. Use theme-driven colors (contrast consistency).
4. Respect reduced motion preference.

## Reduced Motion Hook

```tsx
import { useReduceMotion, motion } from 'mobile-magic';

function Example() {
  const reduceMotion = useReduceMotion();
  const duration = reduceMotion ? 0 : motion.fast;
  // use duration in Animated/Reanimated calls
}
```

## Practical Rule

If a control can be interacted with, it must:

- announce itself correctly to assistive tech,
- have sufficient touch area,
- and avoid forced motion when the OS says not to animate.
