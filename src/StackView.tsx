import React from 'react';
import { View } from 'react-native';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { spacing } from './tokens';

type StackGap = keyof typeof spacing | number;

export interface StackViewProps extends Omit<ViewProps, 'style'> {
  children?: React.ReactNode;
  /**
   * Space between direct children.
   * Accepts spacing token keys (`xs`..`xl`) or a raw number.
   */
  gap?: StackGap;
  /** Main axis direction for stacking children. */
  direction?: 'vertical' | 'horizontal';
  style?: StyleProp<ViewStyle>;
}

function resolveGap(gap: StackGap): number {
  if (typeof gap === 'number') {
    return gap;
  }
  return spacing[gap];
}

export function StackView({
  children,
  gap = 'md',
  direction = 'vertical',
  style,
  ...props
}: StackViewProps) {
  const resolvedGap = resolveGap(gap);

  return (
    <View
      style={[
        {
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          gap: resolvedGap,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
