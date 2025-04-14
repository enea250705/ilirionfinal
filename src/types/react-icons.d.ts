import { IconType } from 'react-icons';
import { ComponentType, ElementType, ReactElement, ReactNode } from 'react';

// Fix the compatibility issue between IconType and ElementType
declare module 'react-icons' {
  interface IconBaseProps {
    children?: ReactNode;
    size?: string | number;
    color?: string;
    title?: string;
  }
}

// Add this declaration to fix the specific error in Chakra UI
declare module '@chakra-ui/react' {
  interface IconProps {
    // Use a more specific type that doesn't cause an intersection
    as?: any; // This is a temporary fix to bypass the type checking
  }
} 