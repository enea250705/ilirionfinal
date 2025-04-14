import {
  Button,
  Flex,
  Link,
  Img,
  Text,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import logoWhite from '../../../../public/img/layout/logoWhite.png';

export default function SidebarDocs() {
  const bgColor = 'linear-gradient(135deg, #E41E20 0%, #C41416 100%)';
  const borderColor = useColorModeValue('white', 'navy.800');

  return (
    <Flex
      justify="center"
      direction="column"
      align="center"
      bg={bgColor}
      borderRadius="16px"
      position="relative"
    >
      <Flex
        border="5px solid"
        borderColor={borderColor}
        bg="linear-gradient(135deg, #E41E20 0%, #000000 100%)"
        borderRadius="50%"
        w="80px"
        h="80px"
        align="center"
        justify="center"
        mx="auto"
        position="absolute"
        left="50%"
        top="-47px"
        transform="translate(-50%, 0%)"
      >
        <Text fontSize="30px" fontWeight="bold" color="white">
          🦅
        </Text>
      </Flex>
      <Flex
        direction="column"
        mb="12px"
        align="center"
        justify="center"
        px="15px"
        pt="55px"
      >
        <Text
          fontSize={{ base: 'lg', xl: '18px' }}
          color="white"
          fontWeight="bold"
          lineHeight="150%"
          textAlign="center"
          mb="14px"
        >
          Ilirion AI - Shqip
        </Text>
        <Text fontSize="14px" color={'white'} mb="14px" textAlign="center">
          Asistenti i parë artificial inteligjent shqiptar, i fuqizuar nga teknologjitë DeepSeek, xAI Grok, dhe Groq Llama 3.
        </Text>
      </Flex>
      <Button
        bg="whiteAlpha.300"
        _hover={{ bg: 'whiteAlpha.200' }}
        _active={{ bg: 'whiteAlpha.100' }}
        mb={{ sm: '16px', xl: '24px' }}
        color={'white'}
        fontWeight="regular"
        fontSize="sm"
        minW="185px"
        mx="auto"
        borderRadius="45px"
      >
        Krejtësisht Falas
      </Button>
    </Flex>
  );
}
