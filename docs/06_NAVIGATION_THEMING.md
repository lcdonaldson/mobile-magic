# Navigation Theming

Mobile Magic does **not** ship a framework-specific navigation adapter.
Use exported `light` / `dark` theme values to bridge into your navigation library.

## React Navigation Example

```tsx
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { dark, light } from 'mobile-magic';

const lightNavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: light.primary.bg,
    background: light.bg,
    card: light.bg,
    text: light.text,
    border: light.border,
    notification: light.danger.bg,
  },
};

const darkNavTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: dark.primary.bg,
    background: dark.bg,
    card: dark.bg,
    text: dark.text,
    border: dark.border,
    notification: dark.danger.bg,
  },
};

export function AppNavigation() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? darkNavTheme : lightNavTheme}>
      {/* navigators */}
    </NavigationContainer>
  );
}
```

## Why This Approach

- Keeps the core package framework-agnostic.
- Prevents peer dependency coupling for users who do not use React Navigation.
- Lets each app map navigation semantics intentionally to the same design system values.
