<p align="center">
  <img src="https://img.shields.io/badge/DevFlow-AI%20Content%20Generator-cyan?style=for-the-badge&logo=react" alt="DevFlow AI">
</p>

<h1 align="center">🚀 DevFlow AI</h1>

<p align="center">
  <strong>Transform GitHub Repositories into SEO-Optimized Technical Articles</strong>
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

### ✨ Caratteristiche

| Funzionalità | Descrizione |
|--------------|-------------|
| 🔄 **GitHub Sync** | Estrazione istantanea di metadata e README da qualsiasi repository pubblico |
| 🧠 **Multi-Provider AI** | Supporta OpenRouter (18+ modelli) e Google Gemini |
| 🆓 **Modelli GRATUITI** | Usa Gemini 2.0 Flash, DeepSeek R1, Llama 3.3 senza costi |
| ✍️ **Author Persona** | Genera contenuti nel tuo stile personale |
| 📅 **Editorial Planner** | Archivia e gestisci la pipeline di contenuti |
| 🌍 **Bilingue** | Supporto completo Italiano e Inglese |
| 📤 **Dev.to Ready** | Output Markdown con frontmatter YAML pronto per pubblicazione |
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
├── vite.config.ts       # Vite configuration
└── index.html           # HTML template con Tailwind CDN
```

### 🛠️ Tech Stack

| Tecnologia | Utilizzo |
|------------|----------|
| **React 19** | UI Framework |
| **Vite 6** | Build Tool |
| **TypeScript 5** | Type Safety |
| **Tailwind CSS** | Styling (via CDN) |
| **OpenRouter** | Multi-model AI Gateway |
| **@google/genai** | Gemini API SDK |
| **Lucide React** | Icone |

---

## 🇬🇧 English

### Overview

**DevFlow AI** is a platform that transforms GitHub repositories into high-quality, SEO-optimized technical articles. Built for developers who want to scale content marketing without sacrificing coding time.

### ✨ Features

| Feature | Description |
|---------|-------------|
| 🔄 **GitHub Sync** | Instant metadata and README extraction from any public repo |
| 🧠 **Multi-Provider AI** | Supports OpenRouter (18+ models) and Google Gemini |
| 🆓 **FREE Models** | Use Gemini 2.0 Flash, DeepSeek R1, Llama 3.3 at no cost |
| ✍️ **Author Persona** | Generates content in your personal style |
| 📅 **Editorial Planner** | Archive and manage your content pipeline |
| 🌍 **Bilingual** | Full Italian and English support |
| 📤 **Dev.to Ready** | Markdown output with YAML frontmatter ready to publish |
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

### 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI Framework |
| **Vite 6** | Build Tool |
| **TypeScript 5** | Type Safety |
| **Tailwind CSS** | Styling (via CDN) |
| **OpenRouter** | Multi-model AI Gateway |
| **@google/genai** | Gemini API SDK |
| **Lucide React** | Icons |

---

## 📈 Roadmap

- [x] Multi-provider AI system (OpenRouter + Gemini)
- [x] Free models support
- [x] API key management via UI
- [x] Bilingual interface (IT/EN)
- [x] Dev.to frontmatter export
- [x] Editorial planner with localStorage
- [ ] Custom author persona configuration
- [ ] Scheduled publishing
- [ ] Analytics integration

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
