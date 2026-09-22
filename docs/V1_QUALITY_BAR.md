# V1.0 Quality Bar

By v1.0, every shipped feature needs to be something worth recommending without bias — not just something that compiles and typechecks. This doc defines what that means in checkable terms, and tracks how the current library actually measures up.

This complements `docs/DECISIONS.md` (governs *what* gets built) and `docs/NON_GOALS.md` (governs what we deliberately don't build). This document governs *how well* each already-built thing has to perform before it counts toward v1.

## What this audit can and can't verify

Source-level review can rigorously check correctness, edge-case handling, API ergonomics, accessibility semantics, cross-platform branching, and adherence to `.cursorrules`. It cannot verify "does this feel native" or "is the motion timing right" — that needs a real device. Findings below are all source-verifiable; anything requiring hands-on/device verification is called out separately and should still go through `docs/COMPONENT_QA_CHECKLIST.md`.

## The Rubric

A component clears the v1 bar when:

1. **Correct in both themes, both platforms** — actually traced through the iOS/Android branches and light/dark values, not assumed.
2. **Edge cases don't break it** — long text, empty/undefined props, out-of-range values, broken image sources, zero-width containers.
3. **Accessibility is meaningful, not decorative** — the combination of role/state/label produces sane screen-reader output, and consumers can actually attach their own labels/hints.
4. **No surprising API interactions** — props compose sanely instead of fighting each other or silently doing nothing.
5. **Passes `.cursorrules`, not just typechecks** — structure/skin separation actually held, no hardcoded values snuck in.
6. **Clears the README's own bar**: "would you reach for this over hand-rolling it in 5 lines." If a component barely clears that, it's filler, not v1-worthy.

---

## Findings — first pass, 2026-09-21

Scope: all 12 exported components plus `provider.tsx`, `skins.ts`, `tokens.ts`, `createTheme.ts`, `index.ts`, both hooks.

### Systemic (affects most/all components)

**1. Most components don't extend or spread their underlying native component's props.**
`Button`, `Card`, `Badge`, `Switch`, `ListRow`, `Checkbox`, `RadioButton`, `Avatar`, and `ProgressBar` all use closed prop interfaces that neither extend `PressableProps`/`ViewProps`/`ImageProps` nor spread `...rest`. Concretely, a consumer cannot pass `testID`, `accessibilityLabel`, `accessibilityHint`, `hitSlop`, or `onLayout` to any of them. `Field` (extends `TextInputProps`), `Typography`/`Type` (extends `TextProps`), and `StackView` (extends `ViewProps`, spreads `...props`) got this right — the rest didn't. This fails rubric #3 (can't attach real accessibility labels) and #4 (silent, unexplained API gap). Logged as `docs/DECISIONS.md` #002 since fixing it touches the public prop surface of 9 components.

**2. Prop-type interfaces aren't exported.**
Only `TypographyProps`/`TypeProps` are exported from `index.ts`. `ButtonProps`, `CardProps`, `FieldProps`, `BadgeProps`, `SwitchProps`, `ListRowProps`, `CheckboxProps`, `RadioButtonProps`, `AvatarProps`, `ProgressBarProps`, and `StackViewProps` are all defined but never exported. Since only `dist/` ships to consumers, there is currently no way to import most of these types at all. This violates `.cursorrules` §11 ("every component's props have a named interface exported") and §12 (everything public goes through `index.ts`). Blocks building typed wrappers or typed config/data-driven component lists — a normal thing to do in a real app. Bundled into `docs/DECISIONS.md` #002.

**3. `SkinName` isn't exported**, despite being the documented set of built-in skin names in `.cursorrules`. Same bundle.

### Confirmed bugs

**4. `Badge` crashes on numeric children.**
`Badge` only special-cases `typeof children === 'string'`. `Button` correctly handles both `'string'` and `'number'`. `<Badge skin="danger">{unreadCount}</Badge>` — a very common notification-count pattern — passes a bare number as a child of `View`, which React Native rejects at runtime with "Text strings must be rendered within a `<Text>` component." This is a real, reproducible crash, not a style nit.

### Real gaps (not crashes, but genuinely limit real usage)

**5. `Field` has no ref forwarding.** Can't call `.focus()` on it externally — blocks "auto-focus next field on submit" and "scroll to and focus the first invalid field," both common in real multi-field forms.

**6. `Field` doesn't special-case `multiline`.** No `minHeight` growth behavior and no Android `textAlignVertical: 'top'` handling — a textarea use case will render wrong out of the box.

**7. `Checkbox` and `RadioButton` don't guarantee a 44dp-wide touch target when rendered without a label** (e.g. `<Checkbox checked={x} onCheckedChange={setX} />` with no children). `Switch` handles this correctly (`minWidth: MIN_TOUCH` in `hitArea`); `Checkbox`/`RadioButton`'s `rootSizes` only set `minHeight`/`gap`, so a label-less instance's tap target can be as narrow as its box (~24dp) — under the 44dp guidance `.cursorrules` itself sets.

**8. Icon-only `Button` reuses text-button padding**, which is tuned for label width, not a square icon touch target — likely renders visually too wide/asymmetric. The README explicitly documents `<Button icon={<MyIcon />} />` as supported, so this needs to actually look right, not just render without error.

### Minor / polish

**9.** `createTheme`'s `darkenHex` silently no-ops (`pressed` ends up identical to `bg`) for any non-hex color format (`rgb()`, named colors). No dev-time warning, and the README never states the hex-only constraint. Low severity since most consumers use hex, but worth at least a dev warning.

**10.** `useBreakpoint`'s `768`/`1024` thresholds are hardcoded in the hook rather than living in `tokens.ts` — a small inconsistency with the project's own "never hardcode, always import from tokens" rule.

**11.** `Avatar`'s initials-fallback branch sets `accessibilityRole="image"` on the wrapping `View` but doesn't set an explicit `accessibilityLabel` in that branch. Worth verifying actual screen-reader output rather than assuming the child `Text` gets announced.

### What's already genuinely good

Worth naming, since this audit isn't just a complaint list:
- `Switch`'s iOS/Android split (native `Switch` on iOS, custom animated implementation elsewhere) with explicit double-toggle-bounce prevention is a mature, well-considered solution to a real cross-platform pain point.
- `ProgressBar`'s value clamping, reduced-motion respect, and accessibility value reporting are all correct and complete.
- `createTheme`'s deep-merge plus auto-derived `pressed` (for hex input) is a genuine ergonomics win over hand-writing every skin property.
- The Skin/token/provider architecture itself holds up under this pass — no drift found, no per-component hardcoded colors found anywhere.

## Status

This is a findings list, not a fix list — nothing here has been changed yet. Systemic finding #1/#2/#3 needs an explicit decision before touching every component file, since it changes the public prop surface of most of the library. See `docs/DECISIONS.md` #002.
