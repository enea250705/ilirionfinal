'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  Image,
  Select,
  useToast,
  Spinner,
} from '@chakra-ui/react';

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [size, setSize] = useState<'1024x1024' | '1024x1792' | '1792x1024'>('1024x1024');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const textColor = useColorModeValue('navy.700', 'white');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500' },
    { color: 'whiteAlpha.600' },
  );
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const brandColor = useColorModeValue('brand.500', 'white');

  const handleImageGeneration = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Vëmendje!',
        description: 'Ju lutem, shkruani një përshkrim për imazhin që dëshironi të gjeneroni.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Check if input is Albanian
    if (!isAlbanian(prompt)) {
      toast({
        title: "Vetëm Shqip!",
        description: "Ilirion AI komunikon vetëm në gjuhën shqipe. Ju lutem, shkruani përshkrimin tuaj në shqip.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      let apiKey = localStorage.getItem('apiKey');
      const response = await fetch('/api/imageAPI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          apiKey,
          size,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gabim në gjenerimin e imazhit');
      }

      const data = await response.json();
      setGeneratedImage(data.data[0].url);
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: 'Gabim!',
        description: error instanceof Error ? error.message : 'Gabim në gjenerimin e imazhit',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to detect if text is in Albanian
  const isAlbanian = (text: string): boolean => {
    // Albanian specific characters and common words
    const albanianChars = /[ëçÇË]/;
    const albanianWords = /\b(dhe|është|për|nga|me|në|unë|ti|ai|ajo|ne|ju|ata|ato|si|çfarë|kush|ku|kur|pse)\b/i;
    
    // Check if text contains Albanian characters or common Albanian words
    return albanianChars.test(text) || albanianWords.test(text);
  };

  return (
    <Box w="100%">
      <Text
        color={brandColor}
        fontWeight="bold"
        fontSize={{ base: '24px', md: '34px' }}
        textAlign="center"
        mb="20px"
      >
        Gjenerimi i Imazheve
      </Text>
      
      <Text
        color={textColor}
        fontSize={{ base: '14px', md: '16px' }}
        textAlign="center"
        maxW="600px"
        mx="auto"
        mb="30px"
      >
        Përshkruani në shqip çfarë imazhi dëshironi të krijoni dhe Ilirion AI do ta gjenerojë për ju.
      </Text>

      <Flex 
        direction="column" 
        maxW="900px" 
        mx="auto"
        bg={useColorModeValue('white', 'navy.700')} 
        borderRadius="20px"
        py="30px" 
        px={{ base: '20px', md: '30px' }}
        boxShadow="0px 18px 40px rgba(112, 144, 176, 0.12)"
      >
        <FormControl mb="20px">
          <FormLabel color={textColor} fontWeight="bold">
            Përshkrimi i Imazhit
          </FormLabel>
          <Textarea
            color={textColor}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="15px"
            h="140px"
            placeholder="Përshkruani imazhin që dëshironi të gjeneroni..."
            _placeholder={placeholderColor}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </FormControl>

        <FormControl mb="20px">
          <FormLabel color={textColor} fontWeight="bold">
            Përmasa e Imazhit
          </FormLabel>
          <Select
            color={textColor}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="15px"
            value={size}
            onChange={(e) => setSize(e.target.value as any)}
          >
            <option value="1024x1024">Katrore (1024x1024)</option>
            <option value="1024x1792">Vertikale (1024x1792)</option>
            <option value="1792x1024">Horizontale (1792x1024)</option>
          </Select>
        </FormControl>

        <Button
          bg="brand.500"
          color="white"
          fontWeight="bold"
          borderRadius="16px"
          h="50px"
          onClick={handleImageGeneration}
          isLoading={loading}
          loadingText="Duke gjeneruar..."
          _hover={{ bg: 'brand.600' }}
          _active={{ bg: 'brand.700' }}
          mb="30px"
        >
          Gjenero Imazhin
        </Button>

        {generatedImage && (
          <Box mt="20px">
            <Text color={textColor} fontWeight="bold" mb="10px">
              Imazhi i Gjeneruar:
            </Text>
            <Box
              borderRadius="20px"
              overflow="hidden"
              boxShadow="0px 18px 40px rgba(112, 144, 176, 0.12)"
            >
              <Image 
                src={generatedImage} 
                alt="Imazhi i gjeneruar"
                w="100%" 
              />
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default ImageGeneration; 