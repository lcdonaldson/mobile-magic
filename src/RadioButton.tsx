import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { MIN_TOUCH, radii, spacing, typography as scales } from './tokens';
import { resolveSkin, useTheme } from './provider';
import type { SkinProp } from './skins';

export interface RadioButtonProps {
  selected: boolean;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  skin?: SkinProp;
  disabled?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}

export function RadioButton({
  selected,
  children,
  size = 'md',
  skin: skinProp = 'primary',
  disabled = false,
  style,
  onPress,
}: RadioButtonProps) {
  const theme = useTheme();
  const skin = resolveSkin(skinProp, theme);

  const label = typeof children === 'string'
    ? <Text style={[scales.body, styles.label, { color: theme.text }]}>{children}</Text>
    : children;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ disabled, checked: selected }}
      disabled={disabled}
      onPress={onPress}
      android_ripple={{ color: skin.pressed, borderless: false }}
      style={[
        styles.root,
        rootSizes[size],
        disabled && styles.disabled,
        style,
      ]}
    >
      <View
        style={[
          styles.outer,
          outerSizes[size],
          {
            borderColor: selected ? skin.border : theme.border,
            backgroundColor: theme.bg,
          },
        ]}
      >
        {selected ? <View style={[innerSizes[size], { backgroundColor: skin.bg }]} /> : null}
      </View>
      {label}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    minHeight: MIN_TOUCH,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: radii.md,
  },
  outer: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flexShrink: 1,
  },
  disabled: {
    opacity: 0.5,
  },
});

const rootSizes = StyleSheet.create({
  sm: {
    gap: spacing.xs + spacing.xs / 2,
  },
  md: {
    gap: spacing.sm,
  },
  lg: {
    gap: spacing.md - spacing.xs / 2,
  },
});

const outerSizes = StyleSheet.create({
  sm: {
    width: spacing.md + spacing.xs / 2,
    height: spacing.md + spacing.xs / 2,
    borderRadius: radii.full,
  },
  md: {
    width: spacing.lg,
    height: spacing.lg,
    borderRadius: radii.full,
  },
  lg: {
    width: spacing.lg + spacing.xs,
    height: spacing.lg + spacing.xs,
    borderRadius: radii.full,
  },
});

const innerSizes = StyleSheet.create({
  sm: {
    width: spacing.sm + spacing.xs / 2,
    height: spacing.sm + spacing.xs / 2,
    borderRadius: radii.full,
  },
  md: {
    width: spacing.md - spacing.xs,
    height: spacing.md - spacing.xs,
    borderRadius: radii.full,
  },
  lg: {
    width: spacing.md,
    height: spacing.md,
    borderRadius: radii.full,
  },
});
