# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevFlow AI is a React 19 application that transforms GitHub repositories into SEO-optimized technical articles for Dev.to. It features a bilingual interface (Italian/English), multi-provider AI support (OpenRouter + Gemini), and direct Dev.to publishing including scheduled posts.

## Development Commands

```bash
npm run dev      # Start dev server on port 3000
npm run build    # Build for production
npm run preview  # Preview production build
```

No test framework is configured. No linting tools are set up.

## Environment Configuration

Create `.env.local` with:
```
GEMINI_API_KEY=your_key_here
OPENROUTER_API_KEY=your_openrouter_key_here
```

Vite exposes these as `process.env.GEMINI_API_KEY` and `process.env.OPENROUTER_API_KEY` via `vite.config.ts` define option. Keys can also be entered via the Config UI and are stored in localStorage (taking priority over env vars).

## Architecture

Single-page React 19 app using Vite. No routing library - view state managed via `currentView` in `App.tsx`.

### Key Files

- `App.tsx` - Monolithic component (~1700 lines) containing all 6 views (home, dashboard, connect, editor, planner, settings), navigation, state, and the `translations` object for i18n
- `types.ts` - Core interfaces: `GitHubRepo`, `GeneratedArticle`, `EditorialItem`, `View`, `Language`
- `services/ai-providers.ts` - Unified AI provider abstraction with `callAI()` function, model lists, and API key management
- `services/geminiService.ts` - Article generation with detailed prompts (author profile, style guide, content structure)
- `api/devto.ts` - Vercel serverless function that proxies Dev.to API calls to bypass CORS
- `index.html` - Uses Tailwind CDN and esm.sh import maps for browser-native ES modules (no bundling of React/lucide-react in dev)

### localStorage Keys

All persistent data uses `devflow_` prefix:
- `devflow_ai_provider` - Provider config JSON (provider + model)
- `devflow_openrouter_key`, `devflow_gemini_key` - API keys
- `devflow_devto_key` - Dev.to API key
- `devflow_github_token` - Optional GitHub token for private repos
- `devflow_editorial_plan` - Saved articles array
- `devflow_current_article`, `devflow_selected_repo` - Editor state
- `devflow_username`, `devflow_lang` - User preferences

### AI Provider System

`services/ai-providers.ts` exports:
- `callAI(config, systemPrompt, userMessage)` - Main generation function
- `getStoredProviderConfig()` / `saveProviderConfig()` - Provider selection
- `getApiKey()` / `saveApiKey()` - Key management with localStorage priority over env
- `AVAILABLE_MODELS` - Model lists per provider with pricing info
- `DEFAULT_MODELS` - Defaults to OpenRouter's free Gemini 2.0 Flash

### Article Generation Prompts

`services/geminiService.ts` contains detailed prompt engineering:
- `AUTHOR_PROFILE` - Hardcoded author identity (Francesco Capurso @fracabu)
- `STYLE_GUIDE` - Formatting rules: numbered titles, hook structure, tag constraints
- `CONTENT_STRUCTURE` - Mandatory sections: hook, problem, solution, how-it-works, results table, tips, engagement question, signature

The AI must return valid JSON with: title, content, seoTags (exactly 4), summary, suggestedSlug, firstComment.

### Dev.to Integration

Publishing requires deployment to Vercel. The `/api/devto.ts` serverless function:
- Receives article data + API key via `X-API-Key` header
- Proxies to `https://dev.to/api/articles`
- Supports scheduled publishing via `published_at` ISO timestamp
- Returns `{ success, url, id, slug }` on success

For local development, Dev.to API calls will fail due to CORS - deploy to Vercel or use the "Copy for Dev.to" button which exports markdown with YAML frontmatter for manual paste.

### Styling

- Tailwind CSS via CDN (not installed locally)
- JetBrains Mono for monospace, Inter for body
- Dark theme with cyan (#22d3ee) accent, zinc backgrounds
