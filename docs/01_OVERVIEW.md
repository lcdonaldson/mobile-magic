# Mobile Magic Overview

`mobile-magic` is a token-driven React Native design system built around one core rule:

**structure stays stable, skin changes by theme.**

## Architecture at a Glance

- **Provider:** `MagicProvider` picks `light` / `dark` from system color scheme (or forced `mode`).
- **Theme access:** `useTheme()` returns ambient colors + named skins.
- **Skin contract:** every skin is `{ bg, fg, border, pressed }`.
- **Tokens:** `spacing`, `radii`, `typography`, `shadows`, `motion`, `MIN_TOUCH` are static constants.
- **Component model:** components accept `skin` (string or custom `Skin`) and optional `style` for layout control.

## Core API

```tsx
import {
  MagicProvider,
  useTheme,
  Button,
  Typography,
  spacing,
} from 'mobile-magic';
```

```tsx
export default function App() {
  return (
    <MagicProvider>
      <HomeScreen />
    </MagicProvider>
  );
}

function HomeScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, padding: spacing.md }}>
      <Typography scale="h2">Welcome</Typography>
      <Button skin="primary">Continue</Button>
    </View>
  );
}
```

## Theme Overrides

`MagicProvider` accepts a shallow `theme` override:

```tsx
<MagicProvider
  mode="dark"
  theme={{
    fontFamily: 'Inter_400Regular',
    primary: {
      bg: '#A855F7',
      fg: '#FFFFFF',
      border: '#A855F7',
      pressed: '#9333EA',
    },
  }}
>
  <App />
</MagicProvider>
```

## Philosophy Rules

- Do not hardcode visual values when a token/skin exists.
- Use `skin` for semantic color identity, not random inline colors.
- Use `style` prop for layout composition, not new visual systems.
- If a component is missing, build it with `useTheme()` + exported tokens first.

## Next Docs

- `02_COMPONENTS.md` for component-by-component usage.
- `03_TOKENS.md` for the exact token surface.
- `06_NAVIGATION_THEMING.md` for manual navigation theme mapping.
