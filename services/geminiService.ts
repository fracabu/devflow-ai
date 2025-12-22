
import { GeneratedArticle, Language } from "../types";
import { callAI, getStoredProviderConfig, AIProviderConfig } from "./ai-providers";

const AUTHOR_PROFILE = `
# AUTHOR PROFILE
## Identity
- Nome: Francesco Capurso
- Handle: @fracabu (GitHub, npm, Dev.to)
- Tagline: Self-taught dev | 7 npm packages | AI agents & Fastify plugins

## Background Story
Ex warehouse worker, self-taught developer. No CS degree, no bootcamp.
Learned to code using AI assistants. Proof that curiosity beats credentials.
`;

const STYLE_GUIDE = `
# STYLE GUIDE
- Emoji nelle intestazioni: 💡 🛠️ 🚀 ✨ 📊 ⚡
- Code blocks con linguaggio specificato
- GitHub link: github.com/fracabu/REPO_NAME
- Tono: Diretto, pratico, no-bullshit, prima persona ("I built", "I needed")
- IMPORTANTE: NON inserire il titolo dell'articolo all'inizio del content. Inizia direttamente con l'introduzione.
- Usa sempre il tag embed di GitHub: {% github fracabu/REPO_NAME %}
`;

const CONTENT_STRUCTURE = `
# ESTRUTTURA OBBLIGATORIA
1. **Hook**: Introduzione coinvolgente che spiega il problema.
2. **The Problem**: Difficoltà riscontrate prima di questo tool.
3. **The Solution**: Presentazione del tool e stack tecnologico.
4. **How It Works**: Dettagli tecnici e architettura.
5. **📊 My Results**: Inserisci SEMPRE una tabella Markdown che confronti l'approccio manuale con quello automatizzato (es. Tempo, Costo, Errori).
6. **💡 Pro Tips**: Fornisci almeno 2 consigli pratici sull'utilizzo.
7. **Conclusion & Signature**: Firma finale con link.
`;

export const analyzeRepoAndGenerateArticle = async (
  repoName: string,
  readmeContent: string,
  description: string,
  language: Language = 'it',
  providerConfig?: AIProviderConfig
): Promise<GeneratedArticle> => {
  const config = providerConfig || getStoredProviderConfig();
  const targetLang = language === 'it' ? 'Italiana' : 'Inglese (English)';

  const signature = language === 'it'
    ? `\n---\n\n👤 **Francesco Capurso** (@fracabu)\n*Self-taught dev | AI agents & Fastify plugins*\n\n🔗 [GitHub](https://github.com/fracabu) | [npm](https://npmjs.com/~fracabu)\n\n⭐ Se ti è stato utile, lascia una star al repo!`
    : `\n---\n\n👤 **Francesco Capurso** (@fracabu)\n*Self-taught dev | AI agents & Fastify plugins*\n\n🔗 [GitHub](https://github.com/fracabu) | [npm](https://npmjs.com/~fracabu)\n\n⭐ Found this useful? Star the repo!`;

  const systemPrompt = `${AUTHOR_PROFILE}
${STYLE_GUIDE}
${CONTENT_STRUCTURE}

You are a technical content writer. Generate articles in valid JSON format.
Always respond with a JSON object containing these exact fields:
- title: string (article title)
- content: string (markdown content WITHOUT the title, start with the introduction)
- seoTags: string[] (array of 4-6 relevant tags)
- summary: string (meta description, 150-160 chars)
- suggestedSlug: string (url-friendly slug)
- firstComment: string (a friendly, human first comment to post under the article - casual tone, maybe ask a question to spark discussion, 1-2 sentences max)`;

  const userMessage = `GENERA UN ARTICOLO TECNICO PER:
- REPO: ${repoName}
- DESCRIZIONE: ${description}
- README: ${readmeContent}

REGOLE AGGIUNTIVE:
- Lingua: ${targetLang}
- Non dimenticare la sezione "My Results" con la tabella e "Pro Tips".
- Inserisci obbligatoriamente questa firma alla fine del contenuto:
${signature}

RESPOND ONLY WITH VALID JSON. No markdown code blocks, just raw JSON.
Example format:
{"title":"...","content":"...","seoTags":["tag1","tag2"],"summary":"...","suggestedSlug":"...","firstComment":"..."}`;

  const response = await callAI(config, systemPrompt, userMessage);

  // Parse JSON from response, handling potential markdown code blocks
  let jsonStr = response.content.trim();

  // Remove markdown code block if present
  if (jsonStr.startsWith('```json')) {
    jsonStr = jsonStr.slice(7);
  } else if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.slice(3);
  }
  if (jsonStr.endsWith('```')) {
    jsonStr = jsonStr.slice(0, -3);
  }
  jsonStr = jsonStr.trim();

  try {
    const data = JSON.parse(jsonStr);
    return { ...data, language } as GeneratedArticle;
  } catch (parseError) {
    console.error('Failed to parse AI response as JSON:', jsonStr);
    throw new Error('Invalid JSON response from AI provider');
  }
};
