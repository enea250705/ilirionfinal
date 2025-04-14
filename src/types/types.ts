export type OpenAIModel = 'gpt-4o' | 'gpt-3.5-turbo' | 'deepseek-chat' | 'deepseek-coder' | 'groq-llama3' | 'xai-grok';

export interface ChatBody {
  inputCode: string;
  model: OpenAIModel;
  apiKey?: string | undefined;
  systemMessage?: { role: string, content: string };
  conversationHistory?: Array<{ role: string, content: string }>;
}

export interface ImageGenerationBody {
  prompt: string;
  apiKey?: string;
  size?: '1024x1024' | '1024x1792' | '1792x1024';
}

export interface TrendingTopic {
  title: string;
  query: string;
  description?: string;
  source?: string;
}
