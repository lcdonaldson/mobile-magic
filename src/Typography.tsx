import React from 'react';
import { Text } from 'react-native';
import type { TextProps } from 'react-native';
import { typography as scales } from './tokens';
import type { TypographyScale } from './tokens';
import { useTheme, resolveSkin } from './provider';
import type { SkinProp } from './skins';

export interface TypographyProps extends TextProps {
  /** Typography scale preset. Default: 'body' */
  scale?: TypographyScale;
  /** Use muted (secondary) text color. */
  muted?: boolean;
  /** Inherit fg color from a skin (for text on colored surfaces). */
  skin?: SkinProp;
}

export function Typography({
  scale = 'body',
  muted = false,
  skin,
  style,
  ...props
}: TypographyProps) {
  const theme = useTheme();

  const color = skin
    ? resolveSkin(skin, theme).fg
    : muted
      ? theme.textMuted
      : theme.text;

  return (
    <Text style={[scales[scale], { color, fontFamily: theme.fontFamily }, style]} {...props} />
  );
}
