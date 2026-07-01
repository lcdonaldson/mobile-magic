import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { spacing, radii, typography as scales } from './tokens';
import { useTheme, resolveSkin } from './provider';
import type { SkinProp } from './skins';

export interface BadgeProps {
  children: React.ReactNode;
  /** Skin name or custom Skin object. Default: 'secondary' */
  skin?: SkinProp;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function Badge({
  children,
  skin: skinProp = 'secondary',
  size = 'md',
  style,
}: BadgeProps) {
  const theme = useTheme();
  const skin = resolveSkin(skinProp, theme);

  const label = typeof children === 'string' ? (
    <Text style={[styles.label, labelSizes[size], { color: skin.fg }]}>{children}</Text>
  ) : children;

  return (
    <View
      style={[
        styles.badge,
        containerSizes[size],
        { backgroundColor: skin.bg, borderColor: skin.border },
        style,
      ]}
    >
      {label}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs / 2,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.full,
    borderWidth: 1,
  },
  label: {
    fontWeight: '600',
  },
});

const containerSizes = StyleSheet.create({
  sm: {
    paddingVertical: spacing.xs / 3,
    paddingHorizontal: spacing.xs + spacing.xs / 2,
  },
  md: {
    paddingVertical: spacing.xs / 2,
    paddingHorizontal: spacing.sm,
  },
  lg: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md - spacing.xs / 2,
  },
});

const labelSizes = StyleSheet.create({
  sm: { fontSize: scales.caption.fontSize },
  md: { fontSize: scales.caption.fontSize + 1 },
  lg: { fontSize: scales.label.fontSize },
});
