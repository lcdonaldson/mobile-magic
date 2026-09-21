import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { motion, radii, spacing } from './tokens';
import { resolveSkin, useTheme } from './provider';
import type { SkinProp } from './skins';
import { useReduceMotion } from './hooks/useReduceMotion';

export interface ProgressBarProps {
  /** Progress from 0 to 1 */
  value: number;
  size?: 'sm' | 'md' | 'lg';
  skin?: SkinProp;
  style?: ViewStyle;
}

function clampProgress(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }
  if (value < 0) {
    return 0;
  }
  if (value > 1) {
    return 1;
  }
  return value;
}

export function ProgressBar({
  value,
  size = 'md',
  skin: skinProp = 'primary',
  style,
}: ProgressBarProps) {
  const theme = useTheme();
  const skin = resolveSkin(skinProp, theme);
  const reduceMotion = useReduceMotion();
  const progress = clampProgress(value);
  const animatedValue = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: reduceMotion ? 0 : motion.fast,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, progress, reduceMotion]);

  const width = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(progress * 100) }}
      style={[
        styles.track,
        sizeStyles[size],
        {
          // Use neutral track color for stronger visual separation from fill.
          backgroundColor: theme.border,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          {
            width,
            backgroundColor: skin.bg,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    borderRadius: radii.full,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
    borderRadius: radii.full,
  },
});

const sizeStyles = StyleSheet.create({
  sm: { height: spacing.xs + spacing.xs / 2 },
  md: { height: spacing.sm },
  lg: { height: spacing.md - spacing.xs },
});
