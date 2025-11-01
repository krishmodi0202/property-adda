import React from 'react';
import { View } from 'react-native';

type IconSymbolProps = {
  name: string;
  size?: number;
  color?: string;
};

export function IconSymbol({ name, size = 24, color = '#000' }: IconSymbolProps) {
  // This is a placeholder. You can replace it with your actual icon component
  // For example, if you're using @expo/vector-icons, you can use it here
  return (
    <View 
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        opacity: 0.3, // Just for visibility
        borderRadius: size / 2,
      }} 
    />
  );
}
