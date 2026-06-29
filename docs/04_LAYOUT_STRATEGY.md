# Layout Strategy

Mobile Magic intentionally keeps layout ownership with the app.

## Boundary

- **Library owns:** tokens, skins, component internals.
- **App owns:** screen composition, spacing rhythm, navigation structure.

That means you should combine exported tokens with native layout primitives:

```tsx
import { View } from 'react-native';
import { Card, Type, spacing } from 'mobile-magic';

function Example() {
  return (
    <View style={{ flex: 1, padding: spacing.md, gap: spacing.md }}>
      <Card>
        <Type scale="h3">Section A</Type>
      </Card>
      <Card>
        <Type scale="h3">Section B</Type>
      </Card>
    </View>
  );
}
```

## Practical Patterns

### Vertical stacks

Use `gap` + token spacing for most screen flows:

```tsx
<View style={{ gap: spacing.sm }}>
  <Field label="Email" />
  <Field label="Password" secureTextEntry />
</View>
```

### Row with trailing action

Use `ListRow` for common settings/profile rows:

```tsx
<ListRow
  label="Dark mode"
  trailing={<Switch value={enabled} onValueChange={setEnabled} />}
/>
```

### Avoid ad-hoc visual values

Prefer `spacing`, `radii`, and `shadows` over hardcoded numbers so custom screens feel native to the same system.

## Rule of Thumb

If you are solving **structure**, do it in app code.
If you are solving **visual consistency**, do it with Mobile Magic tokens/skins.
