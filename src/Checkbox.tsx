import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { MIN_TOUCH, radii, spacing, typography as scales } from './tokens';
import { resolveSkin, useTheme } from './provider';
import type { SkinProp } from './skins';

export interface CheckboxProps {
  children?: React.ReactNode;
  /** Controlled checked state */
  checked?: boolean;
  /** Uncontrolled initial checked state */
  defaultChecked?: boolean;
  /** Visual mixed state */
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  skin?: SkinProp;
  disabled?: boolean;
  style?: ViewStyle;
  onCheckedChange?: (next: boolean) => void;
}

export function Checkbox({
  children,
  checked: checkedProp,
  defaultChecked = false,
  indeterminate = false,
  size = 'md',
  skin: skinProp = 'primary',
  disabled = false,
  style,
  onCheckedChange,
}: CheckboxProps) {
  const theme = useTheme();
  const skin = resolveSkin(skinProp, theme);
  const isControlled = checkedProp !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = isControlled ? checkedProp : internalChecked;

  function setChecked(next: boolean) {
    if (!isControlled) {
      setInternalChecked(next);
    }
    onCheckedChange?.(next);
  }

  function handlePress() {
    if (disabled) {
      return;
    }
    const next = indeterminate ? true : !checked;
    setChecked(next);
  }

  const selected = checked || indeterminate;
  const label = typeof children === 'string'
    ? <Text style={[scales.body, styles.label, { color: theme.text }]}>{children}</Text>
    : children;

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ disabled, checked: indeterminate ? 'mixed' : checked }}
      disabled={disabled}
      onPress={handlePress}
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
          styles.box,
          boxSizes[size],
          {
            backgroundColor: selected ? skin.bg : theme.bg,
            borderColor: selected ? skin.border : theme.border,
          },
        ]}
      >
        {checked && !indeterminate ? (
          <View style={[checkSizes[size], { borderColor: skin.fg }]} />
        ) : null}
        {indeterminate ? (
          <View style={[mixedSizes[size], { backgroundColor: skin.fg }]} />
        ) : null}
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
  box: {
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
    minHeight: MIN_TOUCH,
    gap: spacing.xs + spacing.xs / 2,
  },
  md: {
    minHeight: MIN_TOUCH,
    gap: spacing.sm,
  },
  lg: {
    minHeight: MIN_TOUCH,
    gap: spacing.md - spacing.xs / 2,
  },
});

const boxSizes = StyleSheet.create({
  sm: {
    width: spacing.md + spacing.xs / 2,
    height: spacing.md + spacing.xs / 2,
    borderRadius: radii.sm,
  },
  md: {
    width: spacing.lg,
    height: spacing.lg,
    borderRadius: radii.sm,
  },
  lg: {
    width: spacing.lg + spacing.xs,
    height: spacing.lg + spacing.xs,
    borderRadius: radii.md,
  },
});

const checkSizes = StyleSheet.create({
  sm: {
    width: spacing.xs + spacing.xs / 4,
    height: spacing.sm,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '45deg' }],
    marginTop: -1,
  },
  md: {
    width: spacing.xs + spacing.xs / 2,
    height: spacing.sm + spacing.xs / 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '45deg' }],
    marginTop: -1,
  },
  lg: {
    width: spacing.sm + spacing.xs / 2,
    height: spacing.md,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '45deg' }],
    marginTop: -1,
  },
});

const mixedSizes = StyleSheet.create({
  sm: {
    width: spacing.sm + spacing.xs / 2,
    height: spacing.xs / 2,
    borderRadius: radii.full,
  },
  md: {
    width: spacing.md,
    height: spacing.xs / 2,
    borderRadius: radii.full,
  },
  lg: {
    width: spacing.md + spacing.xs,
    height: spacing.xs / 2 + 1,
    borderRadius: radii.full,
  },
});
