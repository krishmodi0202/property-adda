import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, type GestureResponderEvent } from 'react-native';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

type HapticTabProps = BottomTabBarButtonProps & {
  children: React.ReactNode;
};

export function HapticTab({ children, onPress, ...props }: HapticTabProps) {
  const handlePress = (e: GestureResponderEvent) => {
    // Trigger haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Call the original onPress handler if provided
    if (onPress) {
      onPress(e);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.tab,
        pressed && styles.pressed,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});
