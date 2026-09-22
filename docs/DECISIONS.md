# Architecture & Feature Decision Log

This log exists to protect two commitments as `mobile-magic` moves toward v1.0:

1. **Decisions are evidence-driven**, not feature-chased. Every addition traces to a real, observed developer/app need — not "tool X has this."
2. **We are not racing to be a 1:1 competitor** with NativeBase/Tamagui/Paper/etc. Feature comparisons are allowed to *surface* gaps, but they never *justify* a decision on their own.

Log every non-trivial addition, rejection, or architectural call here — before or immediately after implementing it. Short entries are fine. The point is a paper trail, not prose.

---

## Template

```md
### <NNN> — <Feature/Change Name>
- Date:
- Trigger (real problem observed, not competitor-parity):
- Decision:
- Rejected alternatives:
- Architecture fit check (Skin contract / tokens / .cursorrules gates):
- Parity-chasing check (if inspired by a comparison, why this is still evidence-driven):
- Revisit trigger:
- Status: Approved / Implemented / Rejected
```

---

## Log

### 001 — Spinner primitive + `Button.loading`
- Date: 2026-09-21
- Trigger: Building a real app surfaced that `Button` has no way to represent in-flight state. Every async action (save, submit, delete) needs this in week one — there's no clean workaround without every consumer hand-rolling it. An apples-to-apples comparison against NativeBase named the gap, but it didn't originate the need — it was already obvious from trying to build real screens.
- Decision: Add a new exported `Spinner` primitive (color from `skin.fg`, sized against the existing size scale, respects `useReduceMotion`). Add `loading?: boolean` to `ButtonProps`. When `loading` is true: swap label/icon for `Spinner`, force interaction disabled, set `accessibilityState={{ busy: true, disabled: true }}`, and preserve the button's width/height so layout doesn't jump.
- Rejected alternatives:
  - Do nothing, leave it to consumer-level composition — rejected because this is baseline primitive behavior nearly every button needs, not app-specific logic.
  - Name the prop `isLoading` to mirror a specific competitor's API — rejected; naming should stay internally consistent with existing boolean props (`disabled`), not mirror another library's convention for its own sake.
- Architecture fit check: No new Skin property required (reuses `skin.fg`). No new token category required (reuses `motion`, `spacing`). Passes the `.cursorrules` "5-line" bar — real state, sizing-stability, and accessibility handling, not a trivial wrapper.
- Parity-chasing check: Passed. The comparison surfaced it; the justification stands independent of any competitor's feature list.
- Revisit trigger: If real usage shows the width/height-preservation approach causes problems with dynamic-width buttons, revisit the sizing strategy.
- Status: Approved, not yet implemented.

### 002 — Extend/spread native props across components + export missing Prop types
- Date: 2026-09-21
- Trigger: First `docs/V1_QUALITY_BAR.md` audit pass found that 9 of 12 components (`Button`, `Card`, `Badge`, `Switch`, `ListRow`, `Checkbox`, `RadioButton`, `Avatar`, `ProgressBar`) use closed prop interfaces that don't extend or spread their underlying native component's props, silently blocking `testID`, `accessibilityLabel`, `accessibilityHint`, `hitSlop`, and `onLayout` on all of them. Separately, only `TypographyProps` is exported from `index.ts` — every other component's prop interface (and `SkinName`) is defined but never exported, violating `.cursorrules` §11/§12.
- Decision: Proposed, not yet approved — touches the public prop surface of 9 components plus `index.ts` exports, which crosses the Human Review Checkpoint in `.cursorrules` §13. Two changes bundled: (a) extend/spread the relevant native prop type on each closed-interface component, (b) export every `ComponentNameProps` interface (and `SkinName`) from `index.ts`.
- Rejected alternatives: None yet — needs sign-off before implementation since it's an API-surface change, not an internal fix.
- Architecture fit check: Additive and backward-compatible — no existing prop is renamed or removed, only new pass-through props become available. Doesn't touch the Skin contract or tokens.
- Parity-chasing check: N/A — not sourced from a competitor comparison; found by reading the actual source against real usage needs (testing, accessibility labeling).
- Revisit trigger: N/A until implemented.
- Status: Proposed, pending approval.
