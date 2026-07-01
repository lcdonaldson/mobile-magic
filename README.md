# mobile-magic

A skin-and-token system for React Native. Dark mode, swappable color palettes, and twelve components that cover core app primitives. Everything else, you build with native `View`, `Text`, `Pressable` — using our tokens and theme.

## Pre-1.0 Notice

`mobile-magic` is currently `0.0.2` and pre-stable. APIs may change as real app usage drives refinement.

## Install

```
npm install mobile-magic
```

Peer dependencies: `react`, `react-native`.

## Setup

Wrap your app once:

```tsx
import { MagicProvider } from 'mobile-magic';

export default function App() {
  return (
    <MagicProvider>
      {/* your app */}
    </MagicProvider>
  );
}
```

That's it. Light/dark mode follows the device automatically.

```tsx
// Force a mode:
<MagicProvider mode="dark">

// Override theme colors:
<MagicProvider theme={{ primary: { bg: '#A855F7', fg: '#FFF', border: '#A855F7', pressed: '#9333EA' } }}>

// Set app-wide font family (after loading fonts in your app):
<MagicProvider theme={{ fontFamily: 'Inter_400Regular' }}>
```

---

## Customization Boundary

Mobile Magic owns:
- color identity (skins)
- typography scales (`typography`)
- spacing, radii, shadows, motion

You own:
- fonts (via `theme.fontFamily` on `MagicProvider`)
- layout (via each component's `style` prop)
- any component or pattern we do not ship

If a component is not in the library, build it with `useTheme()` + tokens so it stays consistent with the same system.

---

## Components

### Button

```tsx
import { Button } from 'mobile-magic';

<Button onPress={submit}>Submit</Button>
<Button skin="danger" onPress={del}>Delete</Button>
<Button skin="ghost" size="sm">Cancel</Button>
<Button icon={<MyIcon />} iconPosition="right">Next</Button>
<Button icon={<MyIcon />} />
<Button disabled>Unavailable</Button>
```

| Prop | Type | Default |
|------|------|---------|
| `icon` | `React.ReactNode` | — |
| `iconPosition` | `'left'` \| `'right'` | `'left'` |
| `skin` | `'primary'` \| `'secondary'` \| `'danger'` \| `'ghost'` \| `'surface'` \| `Skin` | `'primary'` |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` |
| `disabled` | `boolean` | `false` |
| `style` | `ViewStyle` | — |
| `onPress` | `() => void` | — |

### Type

Theme-aware text with scale presets. Reads the active theme color automatically.

```tsx
import { Type } from 'mobile-magic';

<Type scale="h1">Big Heading</Type>
<Type scale="body">Paragraph text</Type>
<Type scale="caption" muted>Helper text</Type>
<Type skin="primary">Text on a primary surface</Type>
```

| Prop | Type | Default |
|------|------|---------|
| `scale` | `'h1'` \| `'h2'` \| `'h3'` \| `'body'` \| `'label'` \| `'caption'` | `'body'` |
| `muted` | `boolean` | `false` |
| `skin` | `SkinProp` | — (uses theme text color) |

Extends all `TextProps`.

### Card

A skinned container with border and shadow.

```tsx
import { Card, Type } from 'mobile-magic';

<Card>
  <Type scale="h3">Title</Type>
  <Type muted>Description goes here</Type>
</Card>

<Card skin="primary">
  <Type skin="primary">White text on primary background</Type>
</Card>

<Card size="sm" elevation="lg">
  <Type scale="label">Compact but lifted</Type>
</Card>
```

| Prop | Type | Default |
|------|------|---------|
| `skin` | `SkinProp` | `'surface'` |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` |
| `elevation` | `'none'` \| `'sm'` \| `'md'` \| `'lg'` | matches `size` |
| `style` | `ViewStyle` | — |

### Field

A form input with label and error display.

```tsx
import { Field } from 'mobile-magic';

<Field label="Email" placeholder="you@example.com" keyboardType="email-address" />
<Field label="Password" secureTextEntry error="Must be 8+ characters" />
<Field label="Search" size="lg" placeholder="Larger input text" />
```

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `hint` | `string` | — |
| `error` | `string` | — |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` |
| `style` | `ViewStyle` | — |

Extends all `TextInputProps` (placeholder, secureTextEntry, keyboardType, etc).

### Switch

Theme-aware toggle with controlled and uncontrolled support. Uses native iOS `Switch` and custom Android rendering.

```tsx
import { Switch } from 'mobile-magic';

<Switch value={enabled} onValueChange={setEnabled} />
<Switch defaultValue skin="success" />
<Switch disabled />
```

| Prop | Type | Default |
|------|------|---------|
| `value` | `boolean` | — (controlled) |
| `defaultValue` | `boolean` | `false` |
| `skin` | `SkinProp` | `'primary'` |
| `disabled` | `boolean` | `false` |
| `style` | `ViewStyle` | — |
| `onValueChange` | `(next: boolean) => void` | — |

### ListRow

Universal mobile row primitive with leading and trailing slots.

```tsx
import { ListRow, Badge, Switch } from 'mobile-magic';

<ListRow
  label="Notifications"
  sublabel="Push alerts and reminders"
  leading={<Badge skin="info">i</Badge>}
  trailing={<Switch value={enabled} onValueChange={setEnabled} />}
  onPress={openNotifications}
/>
```

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `sublabel` | `string` | — |
| `leading` | `React.ReactNode` | — |
| `trailing` | `React.ReactNode` | — |
| `skin` | `SkinProp` | `'surface'` |
| `disabled` | `boolean` | `false` |
| `style` | `ViewStyle` | — |
| `onPress` | `() => void` | — |

### Checkbox

Theme-aware checkbox with controlled/uncontrolled support and optional indeterminate state.

```tsx
import { Checkbox } from 'mobile-magic';

<Checkbox checked={accepted} onCheckedChange={setAccepted}>
  Accept terms
</Checkbox>

<Checkbox defaultChecked skin="success">
  Marketing emails
</Checkbox>

<Checkbox indeterminate>
  Partially selected
</Checkbox>
```

| Prop | Type | Default |
|------|------|---------|
| `children` | `React.ReactNode` | — |
| `checked` | `boolean` | — (controlled) |
| `defaultChecked` | `boolean` | `false` |
| `indeterminate` | `boolean` | `false` |
| `skin` | `SkinProp` | `'primary'` |
| `disabled` | `boolean` | `false` |
| `style` | `ViewStyle` | — |
| `onCheckedChange` | `(next: boolean) => void` | — |

### RadioButton

Controlled-only radio button for grouped selection.

```tsx
import { RadioButton, Type } from 'mobile-magic';

const [plan, setPlan] = useState<'starter' | 'pro'>('starter');

<RadioButton selected={plan === 'starter'} onPress={() => setPlan('starter')}>
  Starter Plan
</RadioButton>

<RadioButton selected={plan === 'pro'} onPress={() => setPlan('pro')} skin="success">
  Pro Plan
</RadioButton>
```

| Prop | Type | Default |
|------|------|---------|
| `selected` | `boolean` | — |
| `children` | `React.ReactNode` | — |
| `skin` | `SkinProp` | `'primary'` |
| `disabled` | `boolean` | `false` |
| `style` | `ViewStyle` | — |
| `onPress` | `() => void` | — |

### Avatar

Circular avatar with image support and initials fallback.

```tsx
import { Avatar } from 'mobile-magic';

<Avatar name="Ari Bell" />
<Avatar name="Ari Bell" source={{ uri: user.photoUrl }} />
<Avatar name="Ari Bell" size="lg" skin="info" />
```

| Prop | Type | Default |
|------|------|---------|
| `name` | `string` | — |
| `source` | `ImageSourcePropType` | — |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` |
| `skin` | `SkinProp` | `'secondary'` |
| `style` | `ViewStyle` | — |

### ProgressBar

Linear progress indicator for loading and completion states.

```tsx
import { ProgressBar } from 'mobile-magic';

<ProgressBar value={0.35} />
<ProgressBar value={uploadProgress} skin="success" />
```

| Prop | Type | Default |
|------|------|---------|
| `value` | `number` (0 to 1) | — |
| `skin` | `SkinProp` | `'primary'` |
| `style` | `ViewStyle` | — |

### StackView

Layout wrapper for spacing between direct children without repeating inline margin wrappers.

```tsx
import { StackView, Type, Button, ProgressBar } from 'mobile-magic';

<StackView gap="md">
  <Type muted>Status</Type>
  <Button>Continue</Button>
  <ProgressBar value={0.5} />
</StackView>
```

| Prop | Type | Default |
|------|------|---------|
| `gap` | `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `number` | `'md'` |
| `direction` | `'vertical'` \| `'horizontal'` | `'vertical'` |
| `style` | `ViewStyle` | — |

---

## Skins

A skin is 4 colors:

```tsx
import type { Skin } from 'mobile-magic';

const brandOrange: Skin = {
  bg: '#FF9500',
  fg: '#FFFFFF',
  border: '#FF9500',
  pressed: '#CC7700',
};

<Button skin={brandOrange}>Custom</Button>
<Card skin={brandOrange}>
  <Type skin={brandOrange}>On orange</Type>
</Card>
```

Built-in skins: `primary`, `secondary`, `danger`, `ghost`, `surface`, `success`, `warning`, `info`. Pass them as strings — they resolve from the active theme.

Any component that accepts `skin` works with any skin (built-in or custom). That's the whole point.

---

## Tokens

Static values that never change with theme. Import and use directly.

```tsx
import { spacing, radii, shadows, motion, typography } from 'mobile-magic';

// Use with native RN components
<View style={{ padding: spacing.lg, borderRadius: radii.md, ...shadows.sm }}>
  <Text style={[typography.h2, { color: theme.text }]}>Native + tokens</Text>
</View>
```

**Spacing:** `xs(4)` `sm(8)` `md(16)` `lg(24)` `xl(32)`
**Radii:** `sm(4)` `md(8)` `lg(12)` `xl(16)` `full(9999)`
**Shadows:** `sm` `md` `lg` (platform-split: iOS shadow props, Android elevation)
**Motion:** `fast(150ms)` `base(200ms)` `slow(300ms)`
**Typography scales:** `h1` `h2` `h3` `body` `label` `caption` (pre-composed StyleSheet objects)

---

## useTheme()

Access the active theme for custom components:

```tsx
import { useTheme, spacing } from 'mobile-magic';

function MyCustomThing() {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.primary.bg, padding: spacing.md }}>
      <Text style={{ color: theme.primary.fg }}>Custom</Text>
    </View>
  );
}
```

The theme object has:
- `bg`, `text`, `textMuted`, `border` — ambient colors
- `primary`, `secondary`, `danger`, `ghost`, `surface`, `success`, `warning`, `info` — named `Skin` objects

---

## Navigation

mobile-magic does not ship a framework-specific navigation bridge. Use exported theme values to map into your navigation library.

```bash
npm install @react-navigation/native react-native-screens react-native-safe-area-context
```

```tsx
import { light, dark } from 'mobile-magic';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const LightNavigationTheme = {
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

const DarkNavigationTheme = {
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

export default function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkNavigationTheme : LightNavigationTheme}>
      {/* navigators */}
    </NavigationContainer>
  );
}
```

---

## Hooks

```tsx
import { useReduceMotion, useBreakpoint } from 'mobile-magic';

const reduceMotion = useReduceMotion();  // true if system "Reduce Motion" is on
const breakpoint = useBreakpoint();       // 'phone' | 'tablet' | 'desktop'
```

---

## Local Development

Use this when validating the package in another local app (for example, an Expo demo app):

```bash
npm run pack:local
```

This runs a build and creates a local `.tgz` package you can install in a consumer app.
These tarballs are local validation artifacts only and should not be committed (the repo already ignores `*.tgz`).

---

## Publish Reminder

Run final npm publish manually from your own terminal session:

```bash
npm publish --access public
```

This account uses biometric/2FA approval (fingerprint flow), so automated publish attempts from agents may fail with OTP/approval prompts.

---

## Where This Stands

mobile-magic v0.1 is an architecture, not a finished product. These are the questions every future iteration must answer:

**Does the Skin contract hold?** 4 properties (`bg`, `fg`, `border`, `pressed`) covers most components. But does it break for toggles, gradients, multi-state surfaces? If it needs a 5th property, what is it — and can we resist adding a 6th?

**What components are missing?** Button, Type, Card, Field, Badge, Switch, ListRow, Checkbox, RadioButton, Avatar, ProgressBar, and StackView cover core app primitives today. Real apps will still reveal gaps: screen wrappers, modal patterns, and stateful composites. Each new component must *earn* its place — if it can be built in <5 lines with `View` + `useTheme()` + tokens, it doesn't belong here.

**Does it feel native?** Motion is now in live use (`Switch` and `ProgressBar` both consume `motion` tokens and respect reduced motion). The next step is not "add animation for animation's sake," but to add reusable animation primitives only when repeated product patterns justify them.

**Would you reach for this over alternatives?**
- Over **NativeWind/Tailwind**: NativeWind has ecosystem momentum, but it ports a web concept to mobile. We work *with* React Native instead of against it. That's the long-term edge.
- Over **NativeBase/Tamagui**: They wrap every RN primitive with prop-heavy abstractions. We don't. We provide a value system, not a component replacement.
- Over **raw StyleSheet**: No system means style drift, color sprawl, and dark mode nightmares at scale. We solve that with <500 lines of code.

**The bar for v1.0:**
- Has been used in a real shipped app
- Every component has been stress-tested in both themes on both platforms
- An example app or Storybook exists so developers can see before adopting
- Another developer (or AI) can pick it up and build with it, no questions asked

The motto: **no instructions needed.** We're not there yet. But the architecture is honest, the surface area is small, and everything that exists is load-bearing. That's a foundation worth building on.
