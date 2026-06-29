import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { MIN_TOUCH, radii, spacing, typography as scales } from './tokens';
import { resolveSkin, useTheme } from './provider';
import type { SkinProp } from './skins';

export interface RadioButtonProps {
  selected: boolean;
  children?: React.ReactNode;
  skin?: SkinProp;
  disabled?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}

const INNER_DOT_SIZE = spacing.md - spacing.xs;

export function RadioButton({
  selected,
  children,
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
        disabled && styles.disabled,
        style,
      ]}
    >
      <View
        style={[
          styles.outer,
          {
            borderColor: selected ? skin.border : theme.border,
            backgroundColor: theme.bg,
          },
        ]}
      >
        {selected ? <View style={[styles.inner, { backgroundColor: skin.bg }]} /> : null}
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
    width: spacing.lg,
    height: spacing.lg,
    borderRadius: radii.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: INNER_DOT_SIZE,
    height: INNER_DOT_SIZE,
    borderRadius: radii.full,
  },
  label: {
    flexShrink: 1,
  },
  disabled: {
    opacity: 0.5,
  },
});
