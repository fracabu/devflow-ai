
export type AIProvider = 'openrouter' | 'gemini';

export interface AIProviderConfig {
  provider: AIProvider;
  model?: string;
}

export interface AIResponse {
  content: string;
  model: string;
  provider: AIProvider;
}

// Default models for each provider
export const DEFAULT_MODELS: Record<AIProvider, string> = {
  openrouter: 'google/gemini-2.0-flash-exp:free', // FREE by default!
  gemini: 'gemini-2.5-flash',
};

// Available models for each provider
export const AVAILABLE_MODELS: Record<AIProvider, { id: string; name: string }[]> = {
  openrouter: [
    // FREE Models
    { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash (FREE)' },
    { id: 'deepseek/deepseek-r1-0528:free', name: 'DeepSeek R1 Reasoning (FREE)' },
    { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B (FREE)' },
    { id: 'mistralai/devstral-2512:free', name: 'Devstral Coding (FREE)' },
    { id: 'mistralai/mistral-small-3.1-24b-instruct:free', name: 'Mistral Small 3.1 (FREE)' },
    // Google Gemini
    { id: 'google/gemini-2.5-pro', name: 'Gemini 2.5 Pro ($1.25/$10)' },
    { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash ($0.30/$2.50)' },
    // Anthropic Claude
    { id: 'anthropic/claude-sonnet-4', name: 'Claude Sonnet 4 ($3/$15)' },
    { id: 'anthropic/claude-3.5-haiku', name: 'Claude 3.5 Haiku ($0.80/$4)' },
    { id: 'anthropic/claude-opus-4', name: 'Claude Opus 4 ($15/$75)' },
    // OpenAI
    { id: 'openai/gpt-4o', name: 'GPT-4o ($2.50/$10)' },
    { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini ($0.15/$0.60)' },
    { id: 'openai/o3-mini', name: 'o3-mini Reasoning ($1.10/$4.40)' },
    // DeepSeek
    { id: 'deepseek/deepseek-v3.2', name: 'DeepSeek V3.2 ($0.26/$0.38)' },
    { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1 ($0.30/$1.20)' },
    // Mistral
    { id: 'mistralai/mistral-large-2512', name: 'Mistral Large ($0.50/$1.50)' },
    // Meta Llama
    { id: 'meta-llama/llama-4-maverick', name: 'Llama 4 Maverick 1M ($0.15/$0.60)' },
    { id: 'meta-llama/llama-4-scout', name: 'Llama 4 Scout ($0.08/$0.30)' },
  ],
  gemini: [
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (Recommended)' },
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
    { id: 'gemini-2.0-flash-lite', name: 'Gemini 2.0 Flash-Lite' },
    { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash Preview' },
    { id: 'gemini-3-pro-preview', name: 'Gemini 3 Pro Preview' },
  ],
};

export const PROVIDER_INFO: Record<AIProvider, { name: string; icon: string }> = {
  openrouter: { name: 'OpenRouter', icon: '🔵' },
  gemini: { name: 'Google Gemini', icon: '🔴' },
};

// API Key management - priorità: localStorage > .env
export function getApiKey(provider: AIProvider): string {
  const localKey = localStorage.getItem(`devflow_${provider}_key`);
  if (localKey) return localKey;

  // Fallback to env vars (placeholder support)
  if (provider === 'openrouter') {
    const envKey = process.env.OPENROUTER_API_KEY || '';
    return envKey.startsWith('your_') ? '' : envKey;
  }
  if (provider === 'gemini') {
    const envKey = process.env.GEMINI_API_KEY || '';
    return envKey.startsWith('your_') ? '' : envKey;
  }
  return '';
}

export function saveApiKey(provider: AIProvider, key: string): void {
  if (key) {
    localStorage.setItem(`devflow_${provider}_key`, key);
  } else {
    localStorage.removeItem(`devflow_${provider}_key`);
  }
}

export function hasApiKey(provider: AIProvider): boolean {
  return !!getApiKey(provider);
}

// Dev.to API Key management
export function getDevtoApiKey(): string {
  return localStorage.getItem('devflow_devto_key') || '';
}

export function saveDevtoApiKey(key: string): void {
  if (key) {
    localStorage.setItem('devflow_devto_key', key);
  } else {
    localStorage.removeItem('devflow_devto_key');
  }
}

export function hasDevtoApiKey(): boolean {
  return !!getDevtoApiKey();
}

// OpenRouter API call (uses OpenAI-compatible API)
async function callOpenRouter(
  systemPrompt: string,
  userMessage: string,
  model: string
): Promise<AIResponse> {
  const apiKey = getApiKey('openrouter');

  if (!apiKey) {
    throw new Error('OpenRouter API Key non configurata. Vai in Config per inserirla.');
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'DevFlow AI',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 8192,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `OpenRouter error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';

  return {
    content,
    model,
    provider: 'openrouter',
  };
}

// Gemini API call using @google/genai
async function callGemini(
  systemPrompt: string,
  userMessage: string,
  model: string
): Promise<AIResponse> {
  const { GoogleGenAI } = await import('@google/genai');

  const apiKey = getApiKey('gemini');
  if (!apiKey) {
    throw new Error('Gemini API Key non configurata. Vai in Config per inserirla.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const fullPrompt = `${systemPrompt}\n\n---\n\n${userMessage}`;

  const response = await ai.models.generateContent({
    model,
    contents: fullPrompt,
    config: {
      maxOutputTokens: 8192,
    }
  });

  return {
    content: response.text || '',
    model,
    provider: 'gemini',
  };
}

// Main function to call any provider
export async function callAI(
  config: AIProviderConfig,
  systemPrompt: string,
  userMessage: string
): Promise<AIResponse> {
  const model = config.model || DEFAULT_MODELS[config.provider];

  switch (config.provider) {
    case 'openrouter':
      return callOpenRouter(systemPrompt, userMessage, model);
    case 'gemini':
      return callGemini(systemPrompt, userMessage, model);
    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }
}

// Helper to get current provider config from localStorage
export function getStoredProviderConfig(): AIProviderConfig {
  const stored = localStorage.getItem('devflow_ai_provider');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fall through to default
    }
  }
  return { provider: 'openrouter', model: DEFAULT_MODELS.openrouter };
}

// Helper to save provider config
export function saveProviderConfig(config: AIProviderConfig): void {
  localStorage.setItem('devflow_ai_provider', JSON.stringify(config));
}
