import React, { useMemo, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { ImageSourcePropType, ViewStyle } from 'react-native';
import { radii, spacing, typography as scales } from './tokens';
import { resolveSkin, useTheme } from './provider';
import type { SkinProp } from './skins';

export interface AvatarProps {
  name?: string;
  source?: ImageSourcePropType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  skin?: SkinProp;
  style?: ViewStyle;
}

function getInitials(name?: string): string {
  if (!name) {
    return '?';
  }

  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return '?';
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function Avatar({
  name,
  source,
  size = 'md',
  skin: skinProp = 'secondary',
  style,
}: AvatarProps) {
  const theme = useTheme();
  const skin = resolveSkin(skinProp, theme);
  const [imageFailed, setImageFailed] = useState(false);

  const initials = useMemo(() => getInitials(name), [name]);
  const showImage = Boolean(source) && !imageFailed;

  return (
    <View
      accessibilityRole="image"
      style={[
        styles.base,
        sizeStyles[size],
        {
          backgroundColor: skin.bg,
          borderColor: skin.border,
        },
        style,
      ]}
    >
      {showImage ? (
        <Image
          accessibilityLabel={name ? `${name} avatar` : 'User avatar'}
          source={source}
          onError={() => setImageFailed(true)}
          style={styles.image}
        />
      ) : (
        <Text style={[labelStyles[size], { color: skin.fg }]}>
          {initials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.full,
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

const sizeStyles = StyleSheet.create({
  sm: { width: spacing.lg, height: spacing.lg },
  md: { width: spacing.xl + spacing.xs, height: spacing.xl + spacing.xs },
  lg: { width: spacing.xl + spacing.md, height: spacing.xl + spacing.md },
  xl: { width: spacing.xl + spacing.lg, height: spacing.xl + spacing.lg },
});

const labelStyles = StyleSheet.create({
  sm: { ...scales.caption, fontWeight: '600' },
  md: { ...scales.label, fontWeight: '600' },
  lg: { ...scales.body, fontWeight: '600' },
  xl: { ...scales.h3, fontWeight: '600' },
});
