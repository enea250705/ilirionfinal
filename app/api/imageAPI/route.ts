import { ImageGenerationBody } from '@/types/types';

export const runtime = 'edge';

export async function POST(req: Request): Promise<Response> {
  try {
    const { prompt, apiKey, size = '1024x1024' } = (await req.json()) as ImageGenerationBody;

    let apiKeyFinal;
    if (apiKey) {
      apiKeyFinal = apiKey;
    } else {
      apiKeyFinal = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    }

    if (!apiKeyFinal?.includes('sk-')) {
      return new Response(
        JSON.stringify({ error: 'Ju lutem, vendosni një çelës API të vlefshëm.' }),
        { status: 400 }
      );
    }

    // Call the OpenAI DALL-E API to generate an image
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKeyFinal}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3', // Using DALL-E 3 model
        prompt: prompt,
        n: 1, // Generate 1 image
        size: size, // Image size: 1024x1024, 1024x1792, or 1792x1024
        quality: 'standard',
        response_format: 'url',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(
        JSON.stringify({ 
          error: 'Gabim në gjenerimin e imazhit',
          details: errorData 
        }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Gabim i brendshëm serveri' }),
      { status: 500 }
    );
  }
} 