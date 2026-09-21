import type { Skin, Theme } from './skins';

export type ThemeOverrides = {
  bg?: string;
  text?: string;
  textMuted?: string;
  border?: string;
  fontFamily?: string;
  extend?: Record<string, Partial<Skin>>;
  primary?: Partial<Skin>;
  secondary?: Partial<Skin>;
  danger?: Partial<Skin>;
  ghost?: Partial<Skin>;
  surface?: Partial<Skin>;
  success?: Partial<Skin>;
  warning?: Partial<Skin>;
  info?: Partial<Skin>;
};

type SkinKey = 'primary' | 'secondary' | 'danger' | 'ghost' | 'surface' | 'success' | 'warning' | 'info';

const SKIN_KEYS: SkinKey[] = [
  'primary',
  'secondary',
  'danger',
  'ghost',
  'surface',
  'success',
  'warning',
  'info',
];

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, value));
}

function darkenHex(hex: string, amount: number = 0.15): string {
  const shortHex = /^#([0-9a-fA-F]{3})$/;
  const longHex = /^#([0-9a-fA-F]{6})$/;

  if (shortHex.test(hex)) {
    const [, raw] = shortHex.exec(hex)!;
    const expanded = raw
      .split('')
      .map((char) => `${char}${char}`)
      .join('');
    return darkenHex(`#${expanded}`, amount);
  }

  if (!longHex.test(hex)) {
    return hex;
  }

  const [, raw] = longHex.exec(hex)!;
  const r = Number.parseInt(raw.slice(0, 2), 16);
  const g = Number.parseInt(raw.slice(2, 4), 16);
  const b = Number.parseInt(raw.slice(4, 6), 16);
  const scale = 1 - amount;

  const nextR = clampChannel(Math.round(r * scale));
  const nextG = clampChannel(Math.round(g * scale));
  const nextB = clampChannel(Math.round(b * scale));

  const toHex = (channel: number) => channel.toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(nextR)}${toHex(nextG)}${toHex(nextB)}`;
}

function mergeSkin(baseSkin: Skin, override?: Partial<Skin>): Skin {
  if (!override) {
    return baseSkin;
  }

  const bg = override.bg ?? baseSkin.bg;
  const fg = override.fg ?? baseSkin.fg;
  const border = override.border ?? baseSkin.border;

  let pressed = baseSkin.pressed;
  if (override.pressed !== undefined) {
    pressed = override.pressed;
  } else if (override.bg !== undefined) {
    pressed = darkenHex(override.bg, 0.15);
  }

  return {
    bg,
    fg,
    border,
    pressed,
  };
}

/**
 * Create a brand-customized theme while preserving full Theme shape.
 * @example const brandedLight = createTheme(light, { primary: { bg: '#0EA5E9' } });
 */
export function createTheme(base: Theme, overrides: ThemeOverrides): Theme {
  const merged: Theme = {
    bg: overrides.bg ?? base.bg,
    text: overrides.text ?? base.text,
    textMuted: overrides.textMuted ?? base.textMuted,
    border: overrides.border ?? base.border,
    primary: base.primary,
    secondary: base.secondary,
    danger: base.danger,
    ghost: base.ghost,
    surface: base.surface,
    success: base.success,
    warning: base.warning,
    info: base.info,
  };

  if (overrides.fontFamily !== undefined || base.fontFamily !== undefined) {
    merged.fontFamily = overrides.fontFamily ?? base.fontFamily;
  }

  for (const key of SKIN_KEYS) {
    merged[key] = mergeSkin(base[key], overrides[key]);
  }

  const baseCustom = base.custom ?? {};
  if (Object.keys(baseCustom).length > 0 || overrides.extend !== undefined) {
    merged.custom = { ...baseCustom };
    if (overrides.extend) {
      for (const [name, override] of Object.entries(overrides.extend)) {
        merged.custom[name] = mergeSkin(baseCustom[name] ?? base.surface, override);
      }
    }
  }

  return merged;
}
