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
  skin?: SkinProp;
  disabled?: boolean;
  style?: ViewStyle;
  onValueChange?: (next: boolean) => void;
}

const TRACK_WIDTH = spacing.xl + spacing.lg;
const TRACK_HEIGHT = spacing.lg;
const TRACK_PADDING = spacing.xs / 2;
const THUMB_SIZE = spacing.md;
const THUMB_TRANSLATE_X = TRACK_WIDTH - THUMB_SIZE - TRACK_PADDING * 2;

export function Switch({
  value: valueProp,
  defaultValue = false,
  skin: skinProp = 'primary',
  disabled = false,
  style,
  onValueChange,
}: SwitchProps) {
  const theme = useTheme();
  const skin = resolveSkin(skinProp, theme);
  const reduceMotion = useReduceMotion();

  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? valueProp : internalValue;
  const thumbTranslate = useRef(new Animated.Value(value ? THUMB_TRANSLATE_X : 0)).current;

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    Animated.timing(thumbTranslate, {
      toValue: value ? THUMB_TRANSLATE_X : 0,
      duration: reduceMotion ? 0 : motion.fast,
      useNativeDriver: true,
    }).start();
  }, [thumbTranslate, value, reduceMotion]);

  function setValue(next: boolean) {
    if (!isControlled) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  }

  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.hitArea, disabled && styles.disabled, style]}>
        <RNSwitch
          accessibilityRole="switch"
          accessibilityState={{ disabled, checked: value }}
          disabled={disabled}
          value={value}
          onValueChange={setValue}
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
          styles.track,
          {
            backgroundColor: value ? skin.bg : theme.border,
            borderColor: value ? skin.border : theme.border,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
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
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: radii.full,
    borderWidth: 1,
    padding: TRACK_PADDING,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: radii.full,
  },
  disabled: {
    opacity: 0.5,
  },
});
