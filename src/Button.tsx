import React from 'react';
import { Pressable, Text, StyleSheet, Platform, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { spacing, radii, typography as scales, MIN_TOUCH } from './tokens';
import { useTheme, resolveSkin } from './provider';
import type { SkinProp } from './skins';

export interface ButtonProps {
  children?: React.ReactNode;
  /** Skin name or custom Skin object. Default: 'primary' */
  skin?: SkinProp;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}

export function Button({
  children,
  skin: skinProp = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  style,
  onPress,
}: ButtonProps) {
  const theme = useTheme();
  const skin = resolveSkin(skinProp, theme);
  const hasChildren = children !== undefined && children !== null && children !== false;

  const label = typeof children === 'string' || typeof children === 'number' ? (
    <Text style={[styles.label, sizes[`label_${size}`], { color: skin.fg }]}>
      {children}
    </Text>
  ) : children;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      android_ripple={{ color: skin.pressed, borderless: false }}
      style={({ pressed }) => [
        styles.btn,
        sizes[size],
        {
          backgroundColor: Platform.OS === 'ios' && pressed ? skin.pressed : skin.bg,
          borderColor: skin.border,
        },
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.content}>
        {icon && iconPosition === 'left' ? icon : null}
        {hasChildren ? label : null}
        {icon && iconPosition === 'right' ? icon : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    minHeight: MIN_TOUCH,
  },
  label: {
    fontWeight: '600',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  disabled: {
    opacity: 0.4,
  },
});

const sizes = StyleSheet.create({
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  md: {
    paddingVertical: spacing.md - 4,
    paddingHorizontal: spacing.lg,
  },
  lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  label_sm: { fontSize: scales.label.fontSize },
  label_md: { fontSize: scales.body.fontSize },
  label_lg: { fontSize: scales.h3.fontSize },
});
