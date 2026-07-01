import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import type { ViewStyle, TextInputProps } from 'react-native';
import { spacing, radii, typography as scales } from './tokens';
import { useTheme } from './provider';

export interface FieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  hint?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function Field({
  label,
  hint,
  error,
  size = 'md',
  style,
  ...inputProps
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const theme = useTheme();
  const errorColor = theme.danger.bg;

  const borderColor = error
    ? errorColor
    : focused
      ? theme.primary.bg
      : theme.border;

  return (
    <View style={style}>
      {label && (
        <Text
          style={[
            scales.label,
            { color: focused ? theme.primary.bg : theme.textMuted },
            fieldStyles.label,
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        placeholderTextColor={theme.textMuted}
        onFocus={(e) => { setFocused(true); inputProps.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); inputProps.onBlur?.(e); }}
        style={[
          fieldStyles.input,
          inputTypeScales[size],
          inputSizes[size],
          {
            color: theme.text,
            backgroundColor: theme.bg,
            borderColor,
            borderWidth: focused ? 2 : 1,
          },
        ]}
        {...inputProps}
      />
      {error && (
        <Text accessibilityRole="alert" style={[scales.caption, fieldStyles.error, { color: errorColor }]}>
          {error}
        </Text>
      )}
      {!error && hint ? (
        <Text style={[scales.caption, fieldStyles.hint, { color: theme.textMuted }]}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
}

const fieldStyles = StyleSheet.create({
  label: {
    marginBottom: spacing.xs,
  },
  input: {
    borderRadius: radii.md,
  },
  error: {
    marginTop: spacing.xs,
  },
  hint: {
    marginTop: spacing.xs,
  },
});

const inputSizes = StyleSheet.create({
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm + spacing.xs / 2,
    borderRadius: radii.md,
  },
  md: {
    paddingVertical: spacing.md - 4,
    paddingHorizontal: spacing.md,
    borderRadius: radii.lg,
  },
  lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg - spacing.xs,
    borderRadius: radii.xl,
  },
});

const fieldTypeStyles = StyleSheet.create({
  lg: {
    fontSize: scales.h3.fontSize,
    fontWeight: '400',
    lineHeight: scales.h3.lineHeight,
  },
});

const inputTypeScales = {
  sm: scales.label,
  md: scales.body,
  lg: fieldTypeStyles.lg,
} as const;
