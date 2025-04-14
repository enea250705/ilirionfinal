import endent from 'endent';
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';

const createPrompt = (inputCode: string) => {
  const data = (inputCode: string) => {
    return endent`${inputCode}`;
  };

  if (inputCode) {
    return data(inputCode);
  }
};

// Hidden API keys
const DEEPSEEK_API_KEY = "sk-6d3467cbdc874eb39278740aa74eacb7";
const XAI_API_KEY = "xai-SRtW0dbJAfGornnFLFPnCJj5BuDDzrKzxAO5dlSqXAOygqKWlujfNX54bdOIEt2N6cimiGGdg8y8B6aV"; 
const GROQ_API_KEY = "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";

export const OpenAIStream = async (
  inputCode: string,
  model: string,
  key: string | undefined,
  systemMessage?: { role: string, content: string },
  conversationHistory?: Array<{ role: string, content: string }>
) => {
  const prompt = createPrompt(inputCode);
  
  // Default system message if none provided
  const defaultSystemMessage = { 
    role: 'system', 
    content: 'Ti je Ilirion AI, një asistent inteligjent shqiptar. Komuniko vetëm në gjuhën shqipe.' 
  };
  
  // Prepare messages array for the API
  let messages = [];
  
  // Add system message
  messages.push(systemMessage || defaultSystemMessage);
  
  // Add conversation history if available (limiting to last 10 messages to avoid token limits)
  if (conversationHistory && conversationHistory.length > 0) {
    const recentHistory = conversationHistory.slice(-10);
    messages = [...messages, ...recentHistory];
  } else {
    // If no history, just add the current message
    messages.push({ role: 'user', content: prompt });
  }

  // Define model configurations to try in order (fallback strategy)
  const modelConfigs = [
    // Primary model - always try first
    {
      name: 'deepseek-chat',
      endpoint: 'https://api.deepseek.com/v1/chat/completions',
      apiKey: DEEPSEEK_API_KEY,
      modelName: 'deepseek-chat'
    },
    // First fallback
    {
      name: 'groq-llama3',
      endpoint: 'https://api.groq.com/openai/v1/chat/completions',
      apiKey: GROQ_API_KEY,
      modelName: 'llama3-70b-8192'
    },
    // Second fallback
    {
      name: 'xai-grok',
      endpoint: 'https://api.xai.com/v1/chat/completions',
      apiKey: XAI_API_KEY,
      modelName: 'grok-1'
    }
  ];
  
  // Track errors for debugging
  const errors = [];
  
  // Try each model in sequence until one works
  for (const config of modelConfigs) {
    try {
      console.log(`Attempting to use ${config.name}...`);
      
      const res = await fetch(config.endpoint, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.apiKey}`,
        },
        method: 'POST',
        body: JSON.stringify({
          model: config.modelName,
          messages,
          temperature: 0.7, // Slightly more creative for conversational responses
          stream: true,
        }),
      });
      
      if (res.status === 200) {
        console.log(`Successfully using ${config.name}`);
        
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        
        const stream = new ReadableStream({
          async start(controller) {
            const onParse = (event: ParsedEvent | ReconnectInterval) => {
              if (event.type === 'event') {
                const data = event.data;

                if (data === '[DONE]') {
                  controller.close();
                  return;
                }

                try {
                  const json = JSON.parse(data);
                  const text = json.choices[0].delta.content;
                  const queue = encoder.encode(text);
                  controller.enqueue(queue);
                } catch (e) {
                  controller.error(e);
                }
              }
            };

            const parser = createParser(onParse);

            for await (const chunk of res.body as any) {
              parser.feed(decoder.decode(chunk));
            }
          },
        });
        
        return stream;
      }
      
      // If we get here, this model failed
      const statusText = res.statusText;
      const result = await res.body?.getReader().read();
      let errorMessage = statusText;
      
      try {
        if (result?.value) {
          const decodedError = decoder.decode(result.value);
          
          // Try to parse as JSON if possible
          try {
            const jsonError = JSON.parse(decodedError);
            if (jsonError.error) {
              errorMessage = jsonError.error.message || jsonError.error;
            }
          } catch (e) {
            // Not JSON, use as is
            errorMessage = decodedError;
          }
        }
      } catch (decodeError) {
        console.error('Error decoding API response:', decodeError);
      }
      
      // Record error and try next model
      errors.push(`${config.name}: ${errorMessage}`);
      console.error(`Error with ${config.name}: ${errorMessage}`);
      
    } catch (error) {
      // Record error and try next model
      errors.push(`${config.name}: ${error.message}`);
      console.error(`Exception with ${config.name}:`, error);
    }
  }
  
  // If we get here, all models failed
  throw new Error(`All models failed. Errors: ${errors.join(' | ')}`);
};
