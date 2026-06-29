# Animation Patterns

Use motion deliberately. Consistency and accessibility matter more than flashy effects.

## Token Source

```tsx
import { motion } from 'mobile-magic';
```

- `motion.fast` = `150`
- `motion.base` = `200`
- `motion.slow` = `300`

## Current Consumers

The library already uses motion tokens in production components:

- `Switch` animation timing
- `ProgressBar` fill animation

Both also respect reduced motion.

## Pattern for Custom Animations

```tsx
import { Animated } from 'react-native';
import { motion, useReduceMotion } from 'mobile-magic';

function useDuration() {
  const reduceMotion = useReduceMotion();
  return reduceMotion ? 0 : motion.base;
}
```

Apply the derived duration to any `Animated.timing`/Reanimated timing call.

## Guidelines

- Never hardcode random durations if a motion token fits.
- Keep most UI motion under 300ms.
- If animation communicates no state change, skip it.
- Honor reduced motion preferences every time.
