'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, Button, Flex, Icon, Input, Text, useColorModeValue } from '@chakra-ui/react';
import { MdAutoAwesome, MdPerson } from 'react-icons/md';

// Define message type for TypeScript
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Simple page that doesn't use ReactMarkdown
export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Fix the type of messagesEndRef
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Colors
  const textColor = useColorModeValue('navy.700', 'white');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500' },
    { color: 'whiteAlpha.600' }
  );
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const inputColor = useColorModeValue('gray.800', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const gray = useColorModeValue('gray.500', 'gray.500');
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle message submission
  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const newMessages = [
      ...messages,
      { role: 'user', content: inputValue }
    ];
    
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { 
          role: 'assistant', 
          content: `Përshëndetje! Kjo është një përgjigje e thjeshtë për kërkesën tuaj: "${inputValue}".` 
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Flex
      direction="column"
      h="100vh"
      maxH="100vh"
      overflow="hidden"
      p={4}
    >
      <Flex
        direction="column"
        flex="1"
        overflowY="auto"
        mb={4}
        p={2}
      >
        {messages.length === 0 ? (
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            h="100%"
          >
            <Text
              color={textColor}
              fontSize="xl"
              fontWeight="600"
              mb="10px"
            >
              Bisedë e re
            </Text>
            <Text
              color={gray}
              fontSize="md"
              maxW="600px"
            >
              Filloni një bisedë duke shkruar mesazhin tuaj më poshtë.
            </Text>
          </Flex>
        ) : (
          messages.map((message, index) => (
            <Flex 
              key={index}
              w="100%" 
              mb={2} 
              align="flex-start"
            >
              <Flex
                borderRadius="full"
                justify="center"
                align="center"
                bg={message.role === 'assistant' ? 'purple.500' : 'transparent'}
                border={message.role === 'user' ? '1px solid' : 'none'}
                borderColor={borderColor}
                me={2}
                h="24px"
                minH="24px"
                minW="24px"
                mt={1}
              >
                <Icon
                  as={message.role === 'assistant' ? MdAutoAwesome : MdPerson}
                  width="14px"
                  height="14px"
                  color={message.role === 'assistant' ? 'white' : brandColor}
                />
              </Flex>
              <Box 
                bg={message.role === 'assistant' ? 'purple.50' : 'gray.50'}
                color={textColor}
                p={3}
                borderRadius="md"
                maxW="80%"
              >
                <Text whiteSpace="pre-wrap">{message.content}</Text>
              </Box>
            </Flex>
          ))
        )}
        <div ref={messagesEndRef} />
      </Flex>
      
      <Flex>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSubmit()}
          placeholder="Shkruaj mesazhin tënd..."
          size="lg"
          borderRadius="full"
          mr={2}
          disabled={isLoading}
        />
        <Button
          colorScheme="purple"
          size="lg"
          borderRadius="full"
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={isLoading}
        >
          Dërgo
        </Button>
      </Flex>
    </Flex>
  );
} 