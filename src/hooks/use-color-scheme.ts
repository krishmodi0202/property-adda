import { useState, useEffect } from 'react';
import { ColorSchemeName, useColorScheme as useDeviceColorScheme } from 'react-native';

/**
 * A custom hook that returns the current color scheme, with a default of 'light'.
 * It uses the device's color scheme if available, otherwise falls back to 'light'.
 * @returns 'light' | 'dark' - The current color scheme
 */
export function useColorScheme(): NonNullable<ColorSchemeName> {
  // Get the device's color scheme (light/dark)
  const deviceColorScheme = useDeviceColorScheme();
  
  // State to hold the current color scheme
  const [colorScheme, setColorScheme] = useState<NonNullable<ColorSchemeName>>(
    deviceColorScheme || 'light'
  );

  // Update color scheme when device color scheme changes
  useEffect(() => {
    if (deviceColorScheme) {
      setColorScheme(deviceColorScheme);
    }
  }, [deviceColorScheme]);

  return colorScheme;
}
