# Component Reference

This document reflects the current exported component surface from `src/index.ts`.

## Setup

```tsx
import { MagicProvider } from 'mobile-magic';

export function Root() {
  return (
    <MagicProvider>
      <App />
    </MagicProvider>
  );
}
```

## Display

### `Type`

```tsx
<Type scale="h1">Heading</Type>
<Type scale="body">Body text</Type>
<Type scale="caption" muted>Secondary text</Type>
<Type skin="primary">Text on primary surface</Type>
```

### `Badge`

```tsx
<Badge>Default</Badge>
<Badge skin="success">Live</Badge>
<Badge skin={{ bg: '#111', fg: '#fff', border: '#111', pressed: '#333' }}>Custom</Badge>
```

## Surfaces and Actions

### `Card`

```tsx
<Card>
  <Type scale="h3">Card title</Type>
  <Type muted>Card content</Type>
</Card>
```

### `Button`

```tsx
<Button onPress={save}>Save</Button>
<Button skin="danger" onPress={remove}>Delete</Button>
<Button icon={<Icon />} iconPosition="right">Next</Button>
<Button icon={<Icon />} />
```

## Inputs and Selection

### `Field`

```tsx
<Field label="Email" placeholder="you@example.com" />
<Field label="Password" secureTextEntry />
<Field label="Username" hint="3-20 characters" />
<Field label="Password" error="Must be at least 8 characters" />
```

### `Switch`

```tsx
<Switch value={enabled} onValueChange={setEnabled} />
<Switch defaultValue skin="success" />
<Switch disabled />
```

### `Checkbox`

```tsx
<Checkbox checked={accepted} onCheckedChange={setAccepted}>Accept terms</Checkbox>
<Checkbox defaultChecked>Email updates</Checkbox>
<Checkbox indeterminate>Partially selected</Checkbox>
```

### `RadioButton`

```tsx
<RadioButton selected={plan === 'free'} onPress={() => setPlan('free')}>Free</RadioButton>
<RadioButton selected={plan === 'pro'} onPress={() => setPlan('pro')}>Pro</RadioButton>
```

## Identity and Progress

### `Avatar`

```tsx
<Avatar name="Ari Bell" />
<Avatar name="Ari Bell" source={{ uri: photoUrl }} />
<Avatar name="Ari Bell" size="lg" skin="info" />
```

### `ProgressBar`

```tsx
<ProgressBar value={0.35} />
<ProgressBar value={uploadProgress} skin="success" />
```

## Layout Primitive

### `ListRow`

```tsx
<ListRow
  label="Notifications"
  sublabel="Push alerts and reminders"
  leading={<Avatar name="AB" size="sm" />}
  trailing={<Switch value={enabled} onValueChange={setEnabled} />}
  onPress={openNotifications}
/>
```

## Notes

- Every `skin` prop accepts either a named skin (`'primary'`, `'surface'`, etc.) or a custom `Skin` object.
- Accessibility roles and minimum touch sizing are built into interactive primitives.
- Motion-aware components (`Switch`, `ProgressBar`) respect `useReduceMotion`.
