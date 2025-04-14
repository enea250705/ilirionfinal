'use client';
import React, { ReactNode } from 'react';
import { Box, Portal, useDisclosure } from '@chakra-ui/react';
import Footer from '@/components/footer/FooterAdmin';
import { getActiveRoute, getActiveNavbar } from '@/utils/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import '@/styles/App.css';
import '@/styles/Contact.css';
import '@/styles/Plugins.css';
import '@/styles/MiniCalendar.css';
import AppWrappers from './AppWrappers';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [apiKey, setApiKey] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const initialKey = localStorage.getItem('apiKey');
    if (initialKey?.includes('sk-') && apiKey !== initialKey) {
      setApiKey(initialKey);
    }
  }, [apiKey]);

  return (
    <html lang="sq">
      <head>
        <title>Ilirion AI - Asistenti inteligjent shqiptar me DeepSeek, xAI Grok dhe Groq Llama 3</title>
        <meta name="description" content="Ilirion AI - Asistenti i parë artificial inteligjent shqiptar i fuqizuar nga teknologjitë DeepSeek, xAI Grok dhe Groq Llama 3" />
        <meta charSet="utf-8" />
      </head>
      <body id={'root'}>
        <AppWrappers>
          {pathname?.includes('register') || pathname?.includes('sign-in') ? (
            children
          ) : (
            <Box>
              <Box
                pt={{ base: '20px', md: '30px' }}
                minHeight="100vh"
                height="100%"
                overflow="auto"
                position="relative"
                maxHeight="100%"
                w="100%"
                maxWidth="100%"
                transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
                transitionDuration=".2s, .2s, .35s"
                transitionProperty="top, bottom, width"
                transitionTimingFunction="linear, linear, ease"
              >
                <Box
                  mx="auto"
                  p={{ base: '20px', md: '30px' }}
                  pe="20px"
                  minH="100vh"
                >
                  {children}
                </Box>
                <Box>
                  <Footer />
                </Box>
              </Box>
            </Box>
          )}
        </AppWrappers>
      </body>
    </html>
  );
}
