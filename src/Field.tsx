import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import type { ViewStyle, TextInputProps } from 'react-native';
import { spacing, radii, typography as scales } from './tokens';
import { useTheme } from './provider';

export interface FieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  hint?: string;
  error?: string;
  style?: ViewStyle;
}

export function Field({ label, hint, error, style, ...inputProps }: FieldProps) {
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
          scales.body,
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
    paddingVertical: spacing.md - 4,
    paddingHorizontal: spacing.md,
    borderRadius: radii.lg,
  },
  error: {
    marginTop: spacing.xs,
  },
  hint: {
    marginTop: spacing.xs,
  },
});
