// Core
export { MagicProvider, useTheme } from './provider';

// Skins & Theme
export { light, dark } from './skins';
export type { Skin, SkinProp, Theme } from './skins';
export { createTheme } from './createTheme';
export type { ThemeOverrides } from './createTheme';

// Tokens
export { spacing, radii, typography, shadows, motion, MIN_TOUCH } from './tokens';
export type { TypographyScale } from './tokens';

// Components
export { Type } from './Type';
export { Button } from './Button';
export { Card } from './Card';
export { Field } from './Field';
export { Badge } from './Badge';
export { Switch } from './Switch';
export { ListRow } from './ListRow';
export { Checkbox } from './Checkbox';
export { RadioButton } from './RadioButton';
export { Avatar } from './Avatar';
export { ProgressBar } from './ProgressBar';
export { StackView } from './StackView';

// Hooks
export { useReduceMotion } from './hooks/useReduceMotion';
export { useBreakpoint } from './hooks/useBreakpoint';
