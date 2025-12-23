import { GeneratedArticle, Language } from "../types";
import { callAI, getStoredProviderConfig, AIProviderConfig } from "./ai-providers";

const AUTHOR_PROFILE = `
# AUTHOR PROFILE
## Identity
- Name: Francesco Capurso
- Handle: @fracabu (GitHub, npm, Dev.to)
- Tagline: Self-taught dev | 7 npm packages | AI agents & Fastify plugins

## Background Story
Ex warehouse worker, self-taught developer. No CS degree, no bootcamp.
Learned to code using AI assistants. Proof that curiosity beats credentials.
`;

const STYLE_GUIDE = `
# STYLE GUIDE
- Emoji in headings: max 1 per heading
- Code blocks: ALWAYS specify language
- GitHub embed: {% github fracabu/REPO_NAME %}
- Tone: Direct, practical, first person ("I built", "I needed")
- IMPORTANT: Do NOT include the title in the content. Start directly with the hook.

# TITLE RULES (MANDATORY)
The title MUST contain concrete numbers.
- If the README contains time/effort metrics → use them
- If the README does NOT contain metrics → ESTIMATE realistic numbers based on the tool type
Formula: "From [X time/effort] to [Y time/effort]: How I Built [tool name]"
Examples:
- "From 2 Days to 5 Minutes: How I Built an AI Architect for Multi-Agent Systems"
- "From 500 Lines to 50: How I Built a Fastify Auth Plugin"
- "I Automated 10 Hours of Manual Work with 200 Lines of Code"
NEVER write vague titles without numbers.

# HOOK RULES (MANDATORY)
The first 2 sentences MUST start with a specific number.
If the README has no numbers, INVENT a realistic estimate.
Format: "[Number]. [Short sentence about context]. [Frustration moment]. [Transition]."
Example: "14 hours. That's how long my last multi-agent design took. After the fifth flowchart revision, I snapped and built this."
NEVER use: "Last month I was struggling/wrestling/dealing with..."
NEVER start without a number.

# TAG RULES (MANDATORY)
Exactly 4 tags.
- 2 tags MUST be from this list: ai, opensource, webdev, javascript, typescript, python, showdev, productivity, tutorial, beginners
- For tools/projects: ALWAYS use "showdev" (it's the #buildinpublic of Dev.to)
- 2 tags specific to the domain (but must exist on Dev.to)
NEVER use: AI model names (gemini3pro, gpt4), invented compound words (multiagentsystems, workflowautomation, contentmarketing)

# VISUAL RULES (MANDATORY)
ALWAYS insert after "The Solution" section:
![Tool Screenshot](URL_SCREENSHOT)
The author will replace this with the actual image.

# FORMATTING RULES (MANDATORY)
- Each section MUST have a ## heading
- Bullet points MUST be on separate lines with blank line before the list
- "How It Works" MUST have at least 3 ### subsections with 2-3 sentences each
- Minimum article length: 800 words
- The content field must contain proper markdown with line breaks (use \\n for newlines in JSON)
- NEVER compress content - each paragraph must be properly separated
`;

const CONTENT_STRUCTURE = `
# MANDATORY STRUCTURE

1. **Hook** (first 2-3 sentences): Start with a NUMBER. Then frustration moment. Then transition.

2. **The Problem**: Describe the pain point with bullet points. Make the reader think "I have this problem too!"

3. **The Solution**: Present the tool + {% github fracabu/REPO_NAME %} + ![Tool Screenshot](URL_SCREENSHOT)

4. **How It Works**: Technical details with ### subheadings for each main feature. Include code snippets and a Tech Stack table:
| Category | Technologies |
|:---------|:-------------|
| Frontend | React, TypeScript, etc. |
| Backend | Node.js, Fastify, etc. |
| AI | Gemini, OpenRouter, etc. |

5. **My Results**: MANDATORY Before/After table in Markdown. If README has no metrics, ESTIMATE realistic ones.
| Metric | Before | After |
|:-------|:-------|:------|
| **Time** | X hours/days | Y minutes |
| **Errors** | Frequent | Minimal |
| **Output** | Basic | Professional |

6. **Pro Tips**: 2 practical tips about using the tool.

7. **Engagement Question**: A SPECIFIC question related to the problem. NOT "What do you think?" but "What's YOUR most tedious [problem domain] task?"

8. **Signature**: Final signature with links.
`;

export const analyzeRepoAndGenerateArticle = async (
  repoName: string,
  readmeContent: string,
  description: string,
  language: Language = 'it',
  providerConfig?: AIProviderConfig
): Promise<GeneratedArticle> => {
  const config = providerConfig || getStoredProviderConfig();
  const targetLang = language === 'it' ? 'Italian' : 'English';

  const signature = language === 'it'
    ? `\n---\n\n👤 **Francesco Capurso** (@fracabu)\n*Self-taught dev | AI agents & Fastify plugins*\n\n🔗 [GitHub](https://github.com/fracabu) | [npm](https://npmjs.com/~fracabu)\n\n⭐ Se ti è stato utile, lascia una star al repo!`
    : `\n---\n\n👤 **Francesco Capurso** (@fracabu)\n*Self-taught dev | AI agents & Fastify plugins*\n\n🔗 [GitHub](https://github.com/fracabu) | [npm](https://npmjs.com/~fracabu)\n\n⭐ Found this useful? Star the repo!`;

  const systemPrompt = `${AUTHOR_PROFILE}
${STYLE_GUIDE}
${CONTENT_STRUCTURE}

You are a technical content writer for Dev.to.
Generate articles in valid JSON format.

CRITICAL RULES - DO NOT IGNORE:
1. Title MUST contain numbers (estimate if not in README)
2. First sentence MUST start with a number
3. Tags: 2 from [ai, opensource, webdev, showdev, javascript, productivity] + 2 specific
4. Include ![Tool Screenshot](URL_SCREENSHOT) after The Solution
5. Include Before/After table with numbers (estimate if not in README)
6. Content MUST have ## headings for each section
7. "How It Works" MUST have at least 3 ### subsections
8. Minimum 800 words - do NOT compress content
9. Use proper \\n line breaks in JSON string

Respond with JSON:
{
  "title": "string - MUST contain numbers",
  "content": "string - markdown WITHOUT title, starts with number",
  "seoTags": ["exactly 4 tags following the rules"],
  "summary": "string - 150-160 chars with key benefit",
  "suggestedSlug": "string - url-friendly",
  "firstComment": "string - casual behind-the-scenes insight or question, 1-2 sentences, NOT self-promotional"
}`;

  const userMessage = `GENERATE A DEV.TO ARTICLE FOR:
- REPO: ${repoName}
- DESCRIPTION: ${description}
- README: ${readmeContent}

LANGUAGE: ${targetLang}

MANDATORY - CHECK BEFORE RESPONDING:
- Title has numbers (from README or estimated)
- First sentence starts with a number
- Exactly 4 tags (2 popular + 2 specific, NO AI model names)
- Screenshot placeholder included
- Before/After table with numbers included
- Content has ## headings for each section
- "How It Works" has at least 3 ### subsections
- Minimum 800 words total
- Signature is included at the end

Add this signature at the end:
${signature}

RESPOND ONLY WITH VALID JSON. No markdown code blocks.`;

  const response = await callAI(config, systemPrompt, userMessage);

  let jsonStr = response.content.trim();

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

    // Post-processing validation
    if (!/\d/.test(data.title)) {
      console.warn('WARNING: Generated title does not contain numbers. Consider regenerating.');
    }

    if (data.seoTags && data.seoTags.length > 4) {
      console.warn('WARNING: More than 4 tags generated. Dev.to accepts max 4.');
      data.seoTags = data.seoTags.slice(0, 4);
    }

    return { ...data, language } as GeneratedArticle;
  } catch (parseError) {
    console.error('Failed to parse AI response as JSON:', jsonStr);
    throw new Error('Invalid JSON response from AI provider');
  }
};
