export const Colors = {
  light: {
    background: '#ffffff',
    text: '#000000',
    tint: '#007AFF',
    icon: '#000000',
    tabIconDefault: '#8E8E93',
    tabIconSelected: '#007AFF',
    card: '#ffffff',
    border: '#d1d1d6',
    notification: '#ff3b30',
  },
  dark: {
    background: '#000000',
    text: '#ffffff',
    tint: '#0A84FF',
    icon: '#ffffff',
    tabIconDefault: '#8E8E93',
    tabIconSelected: '#0A84FF',
    card: '#1c1c1e',
    border: '#2c2c2e',
    notification: '#ff453a',
  },
} as const;

export type Theme = typeof Colors.light;
