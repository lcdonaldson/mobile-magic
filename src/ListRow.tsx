import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { MIN_TOUCH, radii, spacing, typography as scales } from './tokens';
import { resolveSkin, useTheme } from './provider';
import type { SkinProp } from './skins';

export interface ListRowProps {
  label: string;
  sublabel?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  skin?: SkinProp;
  disabled?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}

export function ListRow({
  label,
  sublabel,
  leading,
  trailing,
  skin: skinProp = 'surface',
  disabled = false,
  style,
  onPress,
}: ListRowProps) {
  const theme = useTheme();
  const skin = resolveSkin(skinProp, theme);
  const interactive = typeof onPress === 'function' && !disabled;

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : 'none'}
      accessibilityState={{ disabled }}
      disabled={!interactive}
      onPress={onPress}
      android_ripple={{ color: skin.pressed, borderless: false }}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: Platform.OS === 'ios' && pressed && interactive ? skin.pressed : skin.bg,
          borderColor: skin.border,
        },
        disabled && styles.disabled,
        style,
      ]}
    >
      {leading ? <View style={styles.leading}>{leading}</View> : null}

      <View style={styles.content}>
        <Text style={[scales.body, styles.label, { color: skin.fg }]} numberOfLines={1}>
          {label}
        </Text>
        {sublabel ? (
          <Text style={[scales.caption, { color: theme.textMuted }]} numberOfLines={2}>
            {sublabel}
          </Text>
        ) : null}
      </View>

      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: MIN_TOUCH,
    borderWidth: 1,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  leading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  trailing: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
  },
});
