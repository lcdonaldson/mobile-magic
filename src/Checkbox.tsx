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
        disabled && styles.disabled,
        style,
      ]}
    >
      <View
        style={[
          styles.box,
          {
            backgroundColor: selected ? skin.bg : theme.bg,
            borderColor: selected ? skin.border : theme.border,
          },
        ]}
      >
        {checked && !indeterminate ? (
          <View style={[styles.check, { borderColor: skin.fg }]} />
        ) : null}
        {indeterminate ? (
          <View style={[styles.mixed, { backgroundColor: skin.fg }]} />
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
    width: spacing.lg,
    height: spacing.lg,
    borderRadius: radii.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    width: spacing.xs + spacing.xs / 2,
    height: spacing.sm + spacing.xs / 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '45deg' }],
    marginTop: -1,
  },
  mixed: {
    width: spacing.md,
    height: spacing.xs / 2,
    borderRadius: radii.full,
  },
  label: {
    flexShrink: 1,
  },
  disabled: {
    opacity: 0.5,
  },
});
