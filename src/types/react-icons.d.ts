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

// This declaration overrides Chakra UI's Icon component typings 
// to accept react-icons without type issues
declare module '@chakra-ui/react' {
  interface IconProps {
    as: any; // Using any to bypass the type checking
  }
} 