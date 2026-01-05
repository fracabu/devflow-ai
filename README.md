<p align="center">
  <img src="https://img.shields.io/badge/DevFlow-AI%20Content%20Generator-cyan?style=for-the-badge&logo=react" alt="DevFlow AI">
</p>

<h1 align="center">🚀 DevFlow AI</h1>

<p align="center">
  <strong>Transform GitHub Repositories into SEO-Optimized Technical Articles</strong>
</p>

<p align="center">
  <a href="https://stream.mux.com/01bHd1TJnudzhftxG1Iwsjc7aLZevXnnHdWpmdjN9RbM.m3u8">
    <img src="https://image.mux.com/01bHd1TJnudzhftxG1Iwsjc7aLZevXnnHdWpmdjN9RbM/thumbnail.png?time=5&width=640" alt="Watch Demo Video" width="640">
  </a>
  <br>
  <em>▶️ Click to watch demo video</em>
</p>

<p align="center">
  <a href="#-italiano">Italiano</a> •
  <a href="#-english">English</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-CDN-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/fracabu/devflow-ai?style=social" alt="Stars">
  <img src="https://img.shields.io/github/forks/fracabu/devflow-ai?style=social" alt="Forks">
</p>

---

## 🇮🇹 Italiano

### Panoramica

**DevFlow AI** è una piattaforma che trasforma repository GitHub in articoli tecnici di alta qualità, ottimizzati per SEO. Costruito per sviluppatori che vogliono scalare il content marketing senza sacrificare tempo di coding.

<img width="1600" height="739" alt="image" src="https://github.com/user-attachments/assets/03389569-d94c-4278-ba91-6d57319bc08d" />


### ✨ Caratteristiche

| Funzionalità | Descrizione |
|--------------|-------------|
| 🔄 **GitHub Sync** | Estrazione istantanea di metadata e README da qualsiasi repository |
| 🔑 **GitHub Token** | Supporto token per repo private e rate limit aumentato (100 repo) |
| 🧠 **Multi-Provider AI** | Supporta OpenRouter (18+ modelli) e Google Gemini |
| 🆓 **Modelli GRATUITI** | Usa Gemini 2.0 Flash, DeepSeek R1, Llama 3.3 senza costi |
| ✍️ **Storytelling Hook** | Articoli con intro personale e domanda engagement finale |
| 💬 **Primo Commento** | Genera commento da postare dopo la pubblicazione |
| 📅 **Editorial Planner** | Archivia e gestisci la pipeline di contenuti |
| 🌍 **Bilingue** | Supporto completo Italiano e Inglese |
| 📤 **Dev.to Direct** | Pubblica bozze direttamente su Dev.to con un click |
| 🎬 **Video Demo** | Landing page con video NotebookLM integrato |
| 🎨 **Cyber UI** | Interfaccia dark theme moderna con accenti cyan |

### 🔌 OpenRouter - Modelli AI

DevFlow supporta **OpenRouter** per accedere a 18+ modelli con una sola API key.

#### 🆓 Modelli GRATUITI

| Modello | Provider | Ideale per |
|---------|----------|------------|
| Gemini 2.0 Flash | Google | Uso generale (**Default**) |
| DeepSeek R1 | DeepSeek | Ragionamento |
| Llama 3.3 70B | Meta | Risposte di qualità |
| Devstral | Mistral | Coding |
| Mistral Small 3.1 | Mistral | Risposte veloci |

#### 💰 Modelli a Pagamento

| Modello | Input | Output |
|---------|-------|--------|
| Gemini 2.5 Pro | $1.25/M | $10/M |
| Claude Sonnet 4 | $3/M | $15/M |
| GPT-4o | $2.50/M | $10/M |
| DeepSeek V3.2 | $0.26/M | $0.38/M |

### 🚀 Quick Start

#### Prerequisiti

- Node.js 18+
- Account OpenRouter o Google AI Studio

#### Installazione

```bash
# Clone repository
git clone https://github.com/fracabu/devflow-ai.git
cd devflow-ai

# Installa dipendenze
npm install

# Copia e configura environment
cp .env.example .env.local
# Modifica .env.local con le tue API keys

# Avvia development server
npm run dev
```

#### Configurazione API Keys

Puoi configurare le chiavi in due modi:

1. **Via UI**: Vai in Config e inserisci le chiavi nei campi dedicati
2. **Via .env.local**: Modifica il file con le tue chiavi

```env
OPENROUTER_API_KEY=sk-or-v1-...
GEMINI_API_KEY=AIzaSy...
```

### 📁 Struttura Progetto

```
devflow-ai/
├── App.tsx              # Main component con tutte le view
├── index.tsx            # Entry point React
├── types.ts             # TypeScript interfaces
├── services/
│   ├── ai-providers.ts  # Sistema multi-provider AI
│   └── geminiService.ts # Generazione articoli
├── api/
│   └── devto.ts         # Vercel serverless function per Dev.to
├── public/
│   └── DevFlow_AI.mp4   # Video demo NotebookLM
├── vite.config.ts       # Vite configuration
└── index.html           # HTML template con Tailwind CDN
```

### 🔄 Come Funziona

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  1. GitHub  │───▶│  2. AI Gen  │───▶│  3. Review  │───▶│  4. Publish │
│  Sync Repo  │    │  18+ Models │    │  Edit/Save  │    │  to Dev.to  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

1. **Connect GitHub** → Inserisci username, seleziona repo (supporta token per repo private)
2. **Generate Article** → L'AI analizza README e genera articolo SEO-optimized
3. **Review & Edit** → Visualizza preview, modifica, salva nel planner
4. **Publish to Dev.to** → Pubblica direttamente come bozza con un click

### 📤 Dev.to Integration

La pubblicazione su Dev.to avviene tramite **Vercel Serverless Function** (`/api/devto.ts`) che bypassa le restrizioni CORS del browser.

**Setup:**
1. Ottieni la tua API Key da [dev.to/settings/extensions](https://dev.to/settings/extensions)
2. Inseriscila in **Config → Dev.to API Key**
3. Clicca "Invia come Bozza" nell'editor

L'articolo viene creato come **bozza privata** su Dev.to, pronta per la revisione finale.

### 🛠️ Tech Stack

| Tecnologia | Utilizzo |
|------------|----------|
| **React 19** | UI Framework |
| **Vite 6** | Build Tool |
| **TypeScript 5** | Type Safety |
| **Tailwind CSS** | Styling (via CDN) |
| **OpenRouter** | Multi-model AI Gateway |
| **@google/genai** | Gemini API SDK |
| **Vercel Functions** | Dev.to API Proxy |
| **Lucide React** | Icone |

---

## 🇬🇧 English

### Overview

**DevFlow AI** is a platform that transforms GitHub repositories into high-quality, SEO-optimized technical articles. Built for developers who want to scale content marketing without sacrificing coding time.

<img width="1600" height="739" alt="image" src="https://github.com/user-attachments/assets/e30e0b47-1aaf-4f8e-8f31-dcfd88a9c0e8" />

### ✨ Features

| Feature | Description |
|---------|-------------|
| 🔄 **GitHub Sync** | Instant metadata and README extraction from any repository |
| 🔑 **GitHub Token** | Token support for private repos and increased rate limit (100 repos) |
| 🧠 **Multi-Provider AI** | Supports OpenRouter (18+ models) and Google Gemini |
| 🆓 **FREE Models** | Use Gemini 2.0 Flash, DeepSeek R1, Llama 3.3 at no cost |
| ✍️ **Storytelling Hook** | Articles with personal intro and engagement question |
| 💬 **First Comment** | Auto-generates a comment to post after publishing |
| 📅 **Editorial Planner** | Archive and manage your content pipeline |
| 🌍 **Bilingual** | Full Italian and English support |
| 📤 **Dev.to Direct** | Publish drafts directly to Dev.to with one click |
| 🎬 **Video Demo** | Landing page with integrated NotebookLM video |
| 🎨 **Cyber UI** | Modern dark theme interface with cyan accents |

### 🔌 OpenRouter - AI Models

DevFlow supports **OpenRouter** to access 18+ models with a single API key.

#### 🆓 FREE Models

| Model | Provider | Best For |
|-------|----------|----------|
| Gemini 2.0 Flash | Google | General purpose (**Default**) |
| DeepSeek R1 | DeepSeek | Reasoning tasks |
| Llama 3.3 70B | Meta | High-quality responses |
| Devstral | Mistral | Coding tasks |
| Mistral Small 3.1 | Mistral | Fast responses |

#### 💰 Paid Models

| Model | Input | Output |
|-------|-------|--------|
| Gemini 2.5 Pro | $1.25/M | $10/M |
| Claude Sonnet 4 | $3/M | $15/M |
| GPT-4o | $2.50/M | $10/M |
| DeepSeek V3.2 | $0.26/M | $0.38/M |

### 🚀 Quick Start

#### Prerequisites

- Node.js 18+
- OpenRouter or Google AI Studio account

#### Installation

```bash
# Clone repository
git clone https://github.com/fracabu/devflow-ai.git
cd devflow-ai

# Install dependencies
npm install

# Copy and configure environment
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev
```

#### API Key Configuration

You can configure keys in two ways:

1. **Via UI**: Go to Config and enter keys in the dedicated fields
2. **Via .env.local**: Edit the file with your keys

```env
OPENROUTER_API_KEY=sk-or-v1-...
GEMINI_API_KEY=AIzaSy...
```

### 🔄 How It Works

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  1. GitHub  │───▶│  2. AI Gen  │───▶│  3. Review  │───▶│  4. Publish │
│  Sync Repo  │    │  18+ Models │    │  Edit/Save  │    │  to Dev.to  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

1. **Connect GitHub** → Enter username, select repo (supports token for private repos)
2. **Generate Article** → AI analyzes README and generates SEO-optimized article
3. **Review & Edit** → Preview, edit, save to planner
4. **Publish to Dev.to** → Publish directly as draft with one click

### 📤 Dev.to Integration

Publishing to Dev.to works via **Vercel Serverless Function** (`/api/devto.ts`) that bypasses browser CORS restrictions.

**Setup:**
1. Get your API Key from [dev.to/settings/extensions](https://dev.to/settings/extensions)
2. Enter it in **Config → Dev.to API Key**
3. Click "Push as Draft" in the editor

The article is created as a **private draft** on Dev.to, ready for final review.

### 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI Framework |
| **Vite 6** | Build Tool |
| **TypeScript 5** | Type Safety |
| **Tailwind CSS** | Styling (via CDN) |
| **OpenRouter** | Multi-model AI Gateway |
| **@google/genai** | Gemini API SDK |
| **Vercel Functions** | Dev.to API Proxy |
| **Lucide React** | Icons |

---

## 📈 Roadmap

- [x] Multi-provider AI system (OpenRouter + Gemini)
- [x] Free models support
- [x] API key management via UI
- [x] Bilingual interface (IT/EN)
- [x] Dev.to frontmatter export
- [x] Editorial planner with localStorage
- [x] GitHub token support (private repos + higher rate limit)
- [x] Dev.to direct publishing via API
- [x] Storytelling article structure
- [x] First comment auto-generation
- [x] Landing page with video demo
- [x] Scheduled publishing
- [ ] Analytics integration
- [ ] Custom author persona configuration

---

## 🔒 Security

- API keys stored in localStorage (browser only)
- `.env.local` excluded via `.gitignore`
- No keys committed to repository
- Keys configurable at runtime via UI

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

- GitHub: [@fracabu](https://github.com/fracabu)

---

<p align="center">
  Made with ❤️ and 🤖 Claude Code AI
</p>

<p align="center">
  <a href="https://claude.ai/code">
    <img src="https://img.shields.io/badge/Powered%20by-Claude%20Code-orange?style=for-the-badge&logo=anthropic" alt="Powered by Claude Code">
  </a>
</p>
