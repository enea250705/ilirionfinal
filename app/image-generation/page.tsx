'use client';

import ImageGeneration from '@/components/ImageGeneration';
import { Box } from '@chakra-ui/react';

export default function ImageGenerationPage() {
  return (
    <Box pt={{ base: '20px', md: '20px', xl: '20px' }}>
      <ImageGeneration />
    </Box>
  );
} 