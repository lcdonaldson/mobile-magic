import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Switch as RNSwitch, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { MIN_TOUCH, motion, radii, spacing } from './tokens';
import { resolveSkin, useTheme } from './provider';
import type { SkinProp } from './skins';
import { useReduceMotion } from './hooks/useReduceMotion';

export interface SwitchProps {
  /** Controlled value */
  value?: boolean;
  /** Uncontrolled initial value */
  defaultValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  skin?: SkinProp;
  disabled?: boolean;
  style?: ViewStyle;
  onValueChange?: (next: boolean) => void;
}

const SWITCH_METRICS = {
  sm: {
    trackWidth: spacing.xl + spacing.md,
    trackHeight: spacing.md + spacing.xs,
    trackPadding: spacing.xs / 2,
    thumbSize: spacing.md - spacing.xs / 2,
  },
  md: {
    trackWidth: spacing.xl + spacing.lg,
    trackHeight: spacing.lg,
    trackPadding: spacing.xs / 2,
    thumbSize: spacing.md,
  },
  lg: {
    trackWidth: spacing.xl + spacing.lg + spacing.xs,
    trackHeight: spacing.lg + spacing.xs,
    trackPadding: spacing.xs / 2,
    thumbSize: spacing.md + spacing.xs / 2,
  },
} as const;

export function Switch({
  value: valueProp,
  defaultValue = false,
  size = 'md',
  skin: skinProp = 'primary',
  disabled = false,
  style,
  onValueChange,
}: SwitchProps) {
  const theme = useTheme();
  const skin = resolveSkin(skinProp, theme);
  const reduceMotion = useReduceMotion();
  const metrics = SWITCH_METRICS[size];
  const thumbTranslateX = metrics.trackWidth - metrics.thumbSize - metrics.trackPadding * 2;

  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? valueProp : internalValue;
  const thumbTranslate = useRef(new Animated.Value(value ? thumbTranslateX : 0)).current;

  useEffect(() => {
    // We render the custom switch on Android + web.
    if (Platform.OS === 'ios') {
      return;
    }

    Animated.timing(thumbTranslate, {
      toValue: value ? thumbTranslateX : 0,
      duration: reduceMotion ? 0 : motion.fast,
      useNativeDriver: true,
    }).start();
  }, [thumbTranslate, value, reduceMotion, thumbTranslateX]);

  function setValue(next: boolean) {
    if (!isControlled) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  }

  function handleNativeSwitchChange(next: boolean) {
    // Some runtimes fire both onChange and onValueChange (sometimes with
    // intermediate values). Ignore no-op updates to prevent visual bounce.
    if (next === value) {
      return;
    }
    setValue(next);
  }

  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.hitArea, disabled && styles.disabled, style]}>
        <RNSwitch
          accessibilityRole="switch"
          accessibilityState={{ disabled, checked: value }}
          disabled={disabled}
          value={value}
          onValueChange={handleNativeSwitchChange}
          onChange={(event) => handleNativeSwitchChange(event.nativeEvent.value)}
          trackColor={{ false: theme.border, true: skin.bg }}
          thumbColor={value ? skin.fg : theme.bg}
          ios_backgroundColor={theme.border}
        />
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ disabled, checked: value }}
      disabled={disabled}
      onPress={() => setValue(!value)}
      style={[styles.hitArea, disabled && styles.disabled, style]}
    >
      <View
        style={[
          styles.trackBase,
          {
            width: metrics.trackWidth,
            height: metrics.trackHeight,
            padding: metrics.trackPadding,
          },
          {
            backgroundColor: value ? skin.bg : theme.border,
            borderColor: value ? skin.border : theme.border,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumbBase,
            {
              width: metrics.thumbSize,
              height: metrics.thumbSize,
              backgroundColor: value ? skin.fg : theme.bg,
              transform: [{ translateX: thumbTranslate }],
            },
          ]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hitArea: {
    minHeight: MIN_TOUCH,
    minWidth: MIN_TOUCH,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  trackBase: {
    borderRadius: radii.full,
    borderWidth: 1,
    justifyContent: 'center',
  },
  thumbBase: {
    borderRadius: radii.full,
  },
  disabled: {
    opacity: 0.5,
  },
});
