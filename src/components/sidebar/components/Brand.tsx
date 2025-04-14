'use client';
// Chakra imports
import { Flex, useColorModeValue, Text, Box } from '@chakra-ui/react';
import { HSeparator } from '@/components/separator/Separator';

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue('brand.500', 'white');
  let eagleColor = useColorModeValue('black', 'white');

  return (
    <Flex alignItems="center" flexDirection="column">
      <Flex
        alignItems="center"
        my="30px"
      >
        {/* Albanian Flag Style Logo */}
        <Flex 
          w="36px" 
          h="36px" 
          bg="brand.500" 
          mr="10px"
          borderRadius="8px"
          alignItems="center"
          justifyContent="center"
          position="relative"
          overflow="hidden"
        >
          <Box 
            position="absolute"
            w="24px"
            h="24px"
            color={eagleColor}
          >
            <Text fontSize="22px" fontWeight="bold" textAlign="center">
              🦅
            </Text>
          </Box>
        </Flex>
        
        <Text
          fontSize="26px"
          fontWeight="bold"
          color={logoColor}
        >
          Ilirion AI
        </Text>
      </Flex>
      <HSeparator mb="20px" w="284px" />
    </Flex>
  );
}

export default SidebarBrand;
