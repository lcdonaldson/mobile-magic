# Non-Goals

Things `mobile-magic` intentionally does not do, and why. This list exists so that neither a future session, a future contributor, nor future-you accidentally drifts into chasing another library's feature checklist instead of solving real developer problems.

If something on this list should change, that's fine — but it requires a new entry in `docs/DECISIONS.md` explaining what evidence changed, not a silent reversal.

---

## Meta non-goal

We do not treat "tool X has feature Y" as sufficient justification to build Y. Every addition must trace to a real, observed developer/app need (see `docs/DECISIONS.md`). Comparisons against other libraries are useful for *finding* gaps, never for *justifying* filling them.

We are not trying to win a 1:1 feature-parity race with NativeBase, Tamagui, React Native Paper, or similar. The goal is developer trust earned through correct, unsurprising decisions — not matching someone else's surface area.

---

## Standing non-goals

- **Individual color props** (`textColor`, `backgroundColor`, `borderColor`, etc.) — superseded entirely by `skin`. Fragmenting the Skin contract with per-color props was the first thing `.cursorrules` ruled out.
- **Wrapping `View`/`Text`/`Pressable`** just to rename them or bolt on trivial default props — this is NativeBase's own documented mistake; we don't repeat it.
- **`TouchableOpacity` / `TouchableHighlight`** — `Pressable` only, always.
- **Web-style utility-class/cascade theming** (Tailwind/NativeWind-shaped APIs) — different problem, different tool. Not our lane.
- **Adding a 5th Skin property casually** — any expansion beyond `bg` / `fg` / `border` / `pressed` requires explicit architectural review and a `DECISIONS.md` entry, not incremental prop creep component-by-component.
- **Composite/workflow components as free-core primitives** — multi-step form wizards, settings frameworks, app shells, dashboard scaffolds. These are scoped as premium-tier candidates per `Premium_Pathway.md`, not v1 core primitives.
- **Adding a component just because it's easy** — anything buildable in under 5 lines with `View` + `useTheme()` + tokens (e.g. a bare `Divider`) doesn't automatically get a component. Evaluate each on its own merits; "other systems ship it" is not sufficient.
- **Growing the library for its own sake** — per `.cursorrules` §1, this system is a value system, not a component-replacement library. Surface area is a cost, not a feature.

---

## How to add to this list

When we explicitly decide *not* to build something, add an entry here with real reasoning (not just "no"). Cross-reference the corresponding `docs/DECISIONS.md` entry if the rejection happened alongside an approval (e.g. rejecting one API shape while approving another).
