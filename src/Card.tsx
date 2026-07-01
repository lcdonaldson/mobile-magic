import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { spacing, radii, shadows } from './tokens';
import { useTheme, resolveSkin } from './provider';
import type { SkinProp } from './skins';

export interface CardProps {
  children: React.ReactNode;
  /** Skin name or custom Skin object. Default: 'surface' */
  skin?: SkinProp;
  size?: 'sm' | 'md' | 'lg';
  /** Visual depth independent from size. Default: matches `size`. */
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function Card({
  children,
  skin: skinProp = 'surface',
  size = 'md',
  elevation,
  style,
}: CardProps) {
  const theme = useTheme();
  const skin = resolveSkin(skinProp, theme);
  const depth = elevations[elevation ?? size];

  return (
    <View
      style={[
        styles.card,
        depth,
        sizes[size],
        {
          backgroundColor: skin.bg,
          borderColor: skin.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
});

const sizes = StyleSheet.create({
  sm: {
    borderRadius: radii.md,
    padding: spacing.md,
  },
  md: {
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  lg: {
    borderRadius: radii.xl,
    padding: spacing.xl,
  },
});

const elevations = {
  none: {},
  sm: shadows.sm,
  md: shadows.md,
  lg: shadows.lg,
} as const;
