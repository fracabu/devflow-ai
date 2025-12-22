# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevFlow AI is a React application that transforms GitHub repositories into SEO-optimized technical articles using Google Gemini 3 Pro API. It features a bilingual interface (Italian/English) and includes Dev.to integration for direct draft publishing.

## Development Commands

```bash
# Start development server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Configuration

Create `.env.local` with:
```
GEMINI_API_KEY=your_key_here
OPENROUTER_API_KEY=your_openrouter_key_here
```

The Vite config exposes these as `process.env.GEMINI_API_KEY` and `process.env.OPENROUTER_API_KEY`.

## Architecture

This is a single-page React 19 application using Vite as the build tool.

### Key Files

- `App.tsx` - Main application component containing all views (dashboard, connect, editor, planner, settings), navigation, state management, and i18n translations
- `types.ts` - TypeScript interfaces for `GitHubRepo`, `GeneratedArticle`, `EditorialItem`, and type aliases for `View` and `Language`
- `services/geminiService.ts` - Gemini API integration with structured prompts for article generation
- `index.tsx` - React DOM entry point
- `index.html` - Uses Tailwind CDN and esm.sh import maps for browser-native ES modules

### State Management

All state is managed via React hooks in `App.tsx`:
- GitHub repos and user data fetched from GitHub API
- Generated articles stored in component state and persisted to localStorage
- Editorial plan (saved articles) persisted to localStorage with keys prefixed `devflow_`

### Styling

- Tailwind CSS loaded via CDN in `index.html`
- JetBrains Mono font for monospace elements
- Dark cyber-themed UI with cyan accent colors

### API Integrations

1. **GitHub API** - Fetches user repos and README content (unauthenticated, rate-limited)
2. **OpenRouter** - Multi-model AI gateway with FREE models available (default provider)
3. **Google Gemini** - Direct Gemini API using `@google/genai` SDK (fallback provider)
4. **Dev.to API** - Publishes drafts (requires user-provided API key stored in localStorage)

### AI Provider System

The `services/ai-providers.ts` module provides a unified interface for multiple AI providers:

**Supported Providers:**
- **OpenRouter** (default) - Access to many models including FREE ones like `google/gemini-2.0-flash-exp:free`
- **Gemini** - Direct Google AI access

**Available FREE Models via OpenRouter:**
- `google/gemini-2.0-flash-exp:free` - Gemini 2.0 Flash
- `deepseek/deepseek-r1-0528:free` - DeepSeek R1 Reasoning
- `meta-llama/llama-3.3-70b-instruct:free` - Llama 3.3 70B
- `mistralai/devstral-2512:free` - Devstral Coding
- `mistralai/mistral-small-3.1-24b-instruct:free` - Mistral Small 3.1

Provider config is stored in localStorage with key `devflow_ai_provider`.

### Article Generation

The `analyzeRepoAndGenerateArticle` function in `services/geminiService.ts`:
- Uses the selected AI provider from settings
- Includes hardcoded author profile for Francesco Capurso (@fracabu)
- Expects structured JSON response with title, content, seoTags, summary, and suggestedSlug
- Handles markdown code block stripping from responses
