import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { ChatBody } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const openai = new OpenAIApi(apiConfig);

export async function GET(req: NextRequest, res: NextResponse) {
  return new Response('OK');
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatBody = await req.json();
    const { model, messages, apiKey, maxTokens, temperature } = body;

    // Use the provided API key or default to environment variable
    const apiKeyCfg = new Configuration({
      apiKey: apiKey || process.env.OPENAI_API_KEY || '',
    });
    const openaiWithApiKey = new OpenAIApi(apiKeyCfg);

    // Validate the API key
    if (!apiKeyCfg.apiKey) {
      return new Response(
        'Missing API key. Provide it as an environment variable or in the request.',
        { status: 400 }
      );
    }

    // Create chat completion
    const response = await openaiWithApiKey.createChatCompletion({
      model: model || 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: maxTokens || 1000,
      temperature: temperature || 0.7,
      stream: true,
    });

    // Create stream response
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    console.error('Error in ChatAPI route:', error);
    return new Response('Error processing your request: ' + error.message, {
      status: 500,
    });
  }
}
