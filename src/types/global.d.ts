// This file contains type declarations for your project
// It helps TypeScript understand the types of different modules and global variables

declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

// Global type declarations
declare global {
  // Add any global type declarations here
  namespace React {
    interface FunctionComponent<P = {}> {
      navigationOptions?: any;
    }
  }
}

// This makes the file a module
export {};
