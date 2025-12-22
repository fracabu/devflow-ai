
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Github, 
  FileText, 
  Calendar, 
  Settings, 
  Sparkles, 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Menu, 
  X,
  Loader2,
  ShieldAlert,
  Info, 
  CreditCard, 
  Save, 
  Trash2, 
  Eye, 
  Copy, 
  ChevronLeft, 
  Languages, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  RefreshCw, 
  Lock, 
  AlertCircle, 
  Key, 
  FileJson,
  MousePointer2
} from 'lucide-react';
import { GitHubRepo, GeneratedArticle, EditorialItem, View, Language } from './types';
import { analyzeRepoAndGenerateArticle } from './services/geminiService';
import {
  AIProvider,
  AIProviderConfig,
  AVAILABLE_MODELS,
  PROVIDER_INFO,
  DEFAULT_MODELS,
  getStoredProviderConfig,
  saveProviderConfig,
  getApiKey,
  saveApiKey,
  hasApiKey
} from './services/ai-providers';

const translations = {
  it: {
    dashboard: 'Dashboard',
    sync: 'Source Sync',
    editor: 'Laboratorio',
    planner: 'Scheduler',
    settings: 'Config',
    kernelStandby: 'Kernel_Standby',
    unitSelection: 'Seleziona un\'unità di codice per la trasformazione',
    connectSource: 'Connect_Source',
    scanningNodes: 'Scanning_Nodes...',
    noSource: 'Nessuna sorgente attiva. Collega GitHub.',
    syncGithub: 'Sync_GitHub_Target',
    pointProfile: 'Punta al profilo da analizzare',
    syncBuffer: 'Sincronizza_Buffer',
    generating: 'Gemini_Neural_Drafting...',
    encoding: 'Encoding binary to high-quality content',
    savedArchive: 'SAVED_ARCHIVE',
    liveOutput: 'LIVE_OUTPUT',
    storeArchive: 'Store_Archive',
    metadataExtract: 'METADATA_EXTRACT',
    billingRequired: 'Billing_Required',
    billingMsg: 'I modelli Gemini 3 richiedono una chiave API collegata a un progetto con fatturazione attiva.',
    authorizeKey: 'Authorize_Paid_Key',
    emptyBuffer: 'Buffer vuoto. Seleziona una repo dalla Dashboard.',
    editorialArchive: 'Editorial_Archive',
    noArchived: 'Nessun articolo archiviato.',
    startExtraction: 'Start_Extraction',
    globalConfig: 'Global_Config',
    apiModule: 'API_Billing_Module',
    authState: 'Auth_State',
    verified: 'TOKEN_VERIFIED',
    locked: 'TOKEN_LOCKED',
    updateKey: 'Update_Key',
    langSettings: 'Lingua_Sistema',
    langSelect: 'Scegli la lingua per l\'interfaccia e la generazione',
    devtoIntegration: 'Integrazione Dev.to',
    devtoKeyPlaceholder: 'Incolla qui la tua API Key di Dev.to...',
    pushDevto: 'Invia come Bozza',
    pushing: 'Invio in corso...',
    pushSuccess: 'Bozza creata (Privata)!',
    viewDraft: 'Apri Bozza',
    regenerateLang: 'Rigenera in',
    langMismatch: 'L\'articolo è in una lingua diversa dalla UI.',
    missingKey: 'Configura Chiave Dev.to',
    pushError: 'Errore CORS: Il browser ha bloccato la richiesta diretta a Dev.to.',
    devtoHelp: 'Incolla tutto nell\'area "Write your post content here..." e il Frontmatter YAML riempirà automaticamente Titolo e Tag!',
    copyDevto: 'Copy for Dev.to',
    copied: 'Copiato!',
    pasteGuide: 'Frontmatter YAML copiato!',
    autoSaved: 'DRAFT_SYNCED_LOCAL',
    aiProvider: 'Provider_AI',
    aiProviderDesc: 'Seleziona il provider e modello per la generazione',
    selectModel: 'Seleziona modello',
    freeModels: 'Modelli gratuiti disponibili!',
    apiKeys: 'API_Keys',
    apiKeysDesc: 'Inserisci le chiavi API per i provider AI',
    openrouterKey: 'OpenRouter API Key',
    openrouterKeyPlaceholder: 'sk-or-v1-...',
    geminiKey: 'Gemini API Key',
    geminiKeyPlaceholder: 'AIzaSy...',
    keyConfigured: 'Configurata',
    keyMissing: 'Mancante',
    getKeyAt: 'Ottieni chiave su'
  },
  en: {
    dashboard: 'Dashboard',
    sync: 'Source Sync',
    editor: 'Lab',
    planner: 'Planner',
    settings: 'Config',
    kernelStandby: 'Kernel_Standby',
    unitSelection: 'Select a code unit for transformation',
    connectSource: 'Connect_Source',
    scanningNodes: 'Scanning_Nodes...',
    noSource: 'No active source. Connect GitHub.',
    syncGithub: 'Sync_GitHub_Target',
    pointProfile: 'Point to the profile to analyze',
    syncBuffer: 'Sync_Buffer',
    generating: 'Gemini_Neural_Drafting...',
    encoding: 'Encoding binary to high-quality content',
    savedArchive: 'SAVED_ARCHIVE',
    liveOutput: 'LIVE_OUTPUT',
    storeArchive: 'Store_Archive',
    metadataExtract: 'METADATA_EXTRACT',
    billingRequired: 'Billing_Required',
    billingMsg: 'Gemini 3 models require an API key linked to a project with active billing.',
    authorizeKey: 'Authorize_Paid_Key',
    emptyBuffer: 'Empty buffer. Select a repo from the Dashboard.',
    editorialArchive: 'Editorial_Archive',
    noArchived: 'No archived articles.',
    startExtraction: 'Start_Extraction',
    globalConfig: 'Global_Config',
    apiModule: 'API_Billing_Module',
    authState: 'Auth_State',
    verified: 'TOKEN_VERIFIED',
    locked: 'TOKEN_LOCKED',
    updateKey: 'Update_Key',
    langSettings: 'System_Language',
    langSelect: 'Choose language for interface and generation',
    devtoIntegration: 'Dev.to Integration',
    devtoKeyPlaceholder: 'Paste your Dev.to API Key here...',
    pushDevto: 'Push as Draft',
    pushing: 'Pushing...',
    pushSuccess: 'Draft created (Private)!',
    viewDraft: 'Open Draft',
    regenerateLang: 'Regenerate in',
    langMismatch: 'Article language differs from UI language.',
    missingKey: 'Configure Dev.to Key',
    pushError: 'CORS Error: Browser blocked direct request to Dev.to.',
    devtoHelp: 'Paste everything into "Write your post content here..." and YAML Frontmatter will auto-fill Title and Tags!',
    copyDevto: 'Copy for Dev.to',
    copied: 'Copied!',
    pasteGuide: 'Frontmatter YAML copied!',
    autoSaved: 'DRAFT_SYNCED_LOCAL',
    aiProvider: 'AI_Provider',
    aiProviderDesc: 'Select provider and model for generation',
    selectModel: 'Select model',
    freeModels: 'Free models available!',
    apiKeys: 'API_Keys',
    apiKeysDesc: 'Enter API keys for AI providers',
    openrouterKey: 'OpenRouter API Key',
    openrouterKeyPlaceholder: 'sk-or-v1-...',
    geminiKey: 'Gemini API Key',
    geminiKeyPlaceholder: 'AIzaSy...',
    keyConfigured: 'Configured',
    keyMissing: 'Missing',
    getKeyAt: 'Get key at'
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [lang, setLang] = useState<Language>('it');
  const [username, setUsername] = useState<string>('');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [error, setError] = useState<{ message: string; isPermission?: boolean } | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [article, setArticle] = useState<GeneratedArticle | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasKey, setHasKey] = useState(true);
  
  const [devtoKey, setDevtoKey] = useState<string>('');
  const [isPushingToDevto, setIsPushingToDevto] = useState(false);
  const [lastPushedUrl, setLastPushedUrl] = useState<string | null>(null);
  const [pushError, setPushError] = useState<string | null>(null);

  // AI Provider state
  const [providerConfig, setProviderConfig] = useState<AIProviderConfig>(getStoredProviderConfig);
  const [openrouterKey, setOpenrouterKey] = useState<string>(() => getApiKey('openrouter'));
  const [geminiKey, setGeminiKey] = useState<string>(() => getApiKey('gemini'));
  
  const devtoInputRef = useRef<HTMLInputElement>(null);

  const [editorialPlan, setEditorialPlan] = useState<EditorialItem[]>([]);
  const [viewingSavedArticle, setViewingSavedArticle] = useState<EditorialItem | null>(null);

  const t = translations[lang];

  // Load everything on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('devflow_lang') as Language;
    if (savedLang) setLang(savedLang);

    const savedDevtoKey = localStorage.getItem('devflow_devto_key');
    if (savedDevtoKey) setDevtoKey(savedDevtoKey);

    const savedUsername = localStorage.getItem('devflow_username');
    if (savedUsername) {
      setUsername(savedUsername);
      fetchRepos(savedUsername);
    }

    const savedPlan = localStorage.getItem('devflow_editorial_plan');
    if (savedPlan) {
      setEditorialPlan(JSON.parse(savedPlan));
    }

    const savedCurrentArticle = localStorage.getItem('devflow_current_article');
    if (savedCurrentArticle) {
      setArticle(JSON.parse(savedCurrentArticle));
    }

    const savedSelectedRepo = localStorage.getItem('devflow_selected_repo');
    if (savedSelectedRepo) {
      setSelectedRepo(JSON.parse(savedSelectedRepo));
    }

    const checkKey = async () => {
      const aiStudio = (window as any).aistudio;
      if (aiStudio) {
        const selected = await aiStudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('devflow_editorial_plan', JSON.stringify(editorialPlan));
  }, [editorialPlan]);

  useEffect(() => {
    if (article) localStorage.setItem('devflow_current_article', JSON.stringify(article));
  }, [article]);

  useEffect(() => {
    if (selectedRepo) localStorage.setItem('devflow_selected_repo', JSON.stringify(selectedRepo));
  }, [selectedRepo]);

  useEffect(() => {
    localStorage.setItem('devflow_username', username);
  }, [username]);

  const toggleLang = (l: Language) => {
    setLang(l);
    localStorage.setItem('devflow_lang', l);
  };

  const saveDevtoKey = (key: string) => {
    setDevtoKey(key);
    localStorage.setItem('devflow_devto_key', key);
  };

  const updateProviderConfig = (updates: Partial<AIProviderConfig>) => {
    const newConfig = { ...providerConfig, ...updates };
    // Reset model to default when changing provider
    if (updates.provider && updates.provider !== providerConfig.provider) {
      newConfig.model = DEFAULT_MODELS[updates.provider];
    }
    setProviderConfig(newConfig);
    saveProviderConfig(newConfig);
  };

  const handleSaveOpenrouterKey = (key: string) => {
    setOpenrouterKey(key);
    saveApiKey('openrouter', key);
  };

  const handleSaveGeminiKey = (key: string) => {
    setGeminiKey(key);
    saveApiKey('gemini', key);
  };

  const handleOpenKeyPicker = async () => {
    const aiStudio = (window as any).aistudio;
    if (aiStudio) {
      await aiStudio.openSelectKey();
      setHasKey(true);
      setError(null);
    }
  };

  const fetchRepos = async (targetUsername: string) => {
    if (!targetUsername) return;
    setIsLoadingRepos(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/users/${targetUsername}/repos?sort=updated&per_page=30`);
      if (!response.ok) throw new Error('User not found or API limit reached');
      const data = await response.json();
      setRepos(data);
    } catch (err: any) {
      setError({ message: err.message });
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const handleGenerate = async (repo: GitHubRepo, targetLang?: Language) => {
    const genLang = targetLang || lang;
    setSelectedRepo(repo);
    setIsGenerating(true);
    setCurrentView('editor');
    setArticle(null);
    setLastPushedUrl(null);
    setPushError(null);
    setError(null);
    setViewingSavedArticle(null);

    try {
      const response = await fetch(`https://api.github.com/repos/${repo.full_name}/readme`, {
        headers: { 'Accept': 'application/vnd.github.raw' }
      });
      const readmeContent = response.ok ? await response.text() : "No README found.";
      
      const result = await analyzeRepoAndGenerateArticle(repo.name, readmeContent, repo.description || "No description provided.", genLang, providerConfig);
      setArticle(result);
    } catch (err: any) {
      const errorMessage = err.message || "";
      const isPerm = errorMessage.includes('403') || errorMessage.includes('permission') || errorMessage.includes('Requested entity was not found.');
      setError({ 
        message: isPerm ? "ACCESS DENIED: Active billing required for Gemini 3 Pro." : "System generation error.", 
        isPermission: isPerm 
      });
      if (isPerm) setHasKey(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePushToDevto = async () => {
    if (!article) return;
    if (!devtoKey) {
      setCurrentView('settings');
      setTimeout(() => {
        devtoInputRef.current?.focus();
        devtoInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }
    setIsPushingToDevto(true);
    setLastPushedUrl(null);
    setPushError(null);
    try {
      const sanitizedTags = article.seoTags.map(t => t.toLowerCase().replace(/[^a-z0-9]/g, '')).filter(t => t.length >= 2).slice(0, 4);
      const response = await fetch('https://dev.to/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': devtoKey },
        mode: 'cors',
        body: JSON.stringify({
          article: {
            title: article.title,
            body_markdown: article.content,
            published: false,
            tags: sanitizedTags,
          }
        })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to push to Dev.to');
      }
      const data = await response.json();
      setLastPushedUrl(data.url);
    } catch (err: any) {
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        setPushError(t.pushError);
      } else {
        setPushError(err.message || t.pushError);
      }
    } finally {
      setIsPushingToDevto(false);
    }
  };

  const handleCopyWithFrontmatter = () => {
    if (!article) return;
    const tags = article.seoTags.map(t => t.toLowerCase().replace(/[^a-z0-9]/g, '')).filter(t => t.length >= 2).slice(0, 4).join(', ');
    const frontmatter = `---
title: ${article.title}
published: false
description: ${article.summary}
tags: ${tags}
canonical_url: https://github.com/fracabu/${selectedRepo?.name || viewingSavedArticle?.repoName || ''}
---

${article.content}`;
    navigator.clipboard.writeText(frontmatter);
    setCopyStatus('copied');
    setTimeout(() => setCopyStatus(null), 4000);
  };

  const handleSaveToPlan = () => {
    if (!article || (!selectedRepo && !viewingSavedArticle)) return;

    if (viewingSavedArticle) {
      // Update existing item in the plan
      setEditorialPlan(prev => prev.map(item => 
        item.id === viewingSavedArticle.id 
          ? { ...item, title: article.title, articleData: { ...article } }
          : item
      ));
    } else {
      // Create new item
      const newItem: EditorialItem = {
        id: crypto.randomUUID(),
        title: article.title,
        repoName: selectedRepo?.name || 'Unknown',
        status: 'draft',
        date: new Date().toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US'),
        articleData: { ...article }
      };
      setEditorialPlan(prev => [newItem, ...prev]);
    }
    setCurrentView('planner');
  };

  const handleDeleteItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEditorialPlan(prev => prev.filter(item => item.id !== id));
    if (viewingSavedArticle?.id === id) {
      setViewingSavedArticle(null);
      setArticle(null);
      setCurrentView('dashboard');
    }
  };

  const openSavedArticle = (item: EditorialItem) => {
    setViewingSavedArticle(item);
    setArticle(item.articleData);
    setLastPushedUrl(null);
    setPushError(null);
    setCurrentView('editor');
  };

  const updateArticleContent = (newContent: string) => {
    if (article) {
      setArticle({ ...article, content: newContent });
    }
  };

  const NavItem = ({ icon: Icon, label, view }: { icon: any, label: string, view: View }) => (
    <button
      onClick={() => { setCurrentView(view); setMobileMenuOpen(false); if (view !== 'editor') setViewingSavedArticle(null); }}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group w-full ${currentView === view ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800'}`}
    >
      <Icon size={20} className={currentView === view ? 'animate-pulse' : ''} />
      <span className="font-medium text-sm md:text-base font-mono uppercase tracking-tighter">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black text-zinc-100 overflow-hidden font-sans">
      <header className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md z-50">
        <div className="flex items-center space-x-2 text-cyan-500"><Terminal size={20} /><span className="font-mono font-bold tracking-tighter text-base uppercase">DevFlow_AI</span></div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-zinc-400">{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </header>

      <aside className={`fixed inset-0 z-40 md:relative md:flex md:w-64 bg-zinc-950 border-r border-zinc-800 flex-col p-6 space-y-8 transition-transform duration-300 md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="hidden md:flex items-center space-x-2 text-cyan-400 mb-4"><div className="p-2 bg-cyan-400/10 rounded-lg border border-cyan-400/20"><Cpu size={28} /></div><h1 className="text-xl font-mono font-bold tracking-tighter uppercase">DevFlow_AI</h1></div>
        <nav className="flex-1 space-y-2">
          <NavItem icon={LayoutDashboard} label={t.dashboard} view="dashboard" />
          <NavItem icon={Github} label={t.sync} view="connect" />
          <NavItem icon={FileText} label={t.editor} view="editor" />
          <NavItem icon={Calendar} label={t.planner} view="planner" />
          <NavItem icon={Settings} label={t.settings} view="settings" />
        </nav>
        {!hasKey && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-[10px] font-mono text-red-500 uppercase font-bold mb-2">AUTH_ALERT</p>
            <button onClick={handleOpenKeyPicker} className="w-full bg-red-500 text-white text-[10px] font-mono font-bold py-2 rounded uppercase tracking-widest">{t.updateKey}</button>
          </div>
        )}
      </aside>

      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_#09090b_0%,_#000000_100%)]">
        <header className="hidden md:flex sticky top-0 z-30 bg-black/40 backdrop-blur-md border-b border-zinc-800/50 px-8 py-4 items-center justify-between">
          <div className="flex items-center space-x-2"><span className="text-zinc-600 font-mono text-xs uppercase tracking-widest">System_Path /</span><span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">{currentView}</span></div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 mr-4">
               <button onClick={() => toggleLang('it')} className={`px-2 py-1 text-[10px] font-mono rounded transition-all ${lang === 'it' ? 'bg-cyan-500 text-black font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}>IT</button>
               <button onClick={() => toggleLang('en')} className={`px-2 py-1 text-[10px] font-mono rounded transition-all ${lang === 'en' ? 'bg-cyan-500 text-black font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}>EN</button>
            </div>
            <div className={`px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-mono flex items-center space-x-2 ${hasKey ? 'text-emerald-500' : 'text-red-500'}`}><div className={`w-1.5 h-1.5 rounded-full ${hasKey ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></div><span>API_{hasKey ? 'STABLE' : 'LOCKED'}</span></div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {currentView === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                <div><h2 className="text-2xl md:text-3xl font-mono font-bold tracking-tight">{username ? `Repo_Core::${username.toUpperCase()}` : t.kernelStandby}</h2><p className="text-zinc-500 font-mono text-[10px] uppercase mt-1 tracking-widest">{t.unitSelection}</p></div>
                {!username && <button onClick={() => setCurrentView('connect')} className="bg-cyan-500 text-black px-5 py-2.5 rounded-xl font-bold font-mono text-xs uppercase shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 transition-transform">{t.connectSource}</button>}
              </div>
              {repos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {repos.map((repo) => (
                    <div key={repo.id} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 hover:border-cyan-500/40 transition-all group">
                      <div className="flex justify-between items-start mb-4"><div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800 group-hover:border-cyan-500/30 text-zinc-400 group-hover:text-cyan-400 transition-colors"><Github size={18} /></div><span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-zinc-950 rounded text-zinc-500 border border-zinc-800 uppercase">{repo.language || 'Data'}</span></div>
                      <h4 className="font-mono font-bold text-sm mb-2 text-zinc-200 truncate">{repo.name}</h4>
                      <p className="text-[11px] text-zinc-500 line-clamp-2 mb-4 font-medium leading-relaxed min-h-[32px]">{repo.description || 'Nessun metadato descrittivo disponibile.'}</p>
                      <button onClick={() => handleGenerate(repo)} className="w-full bg-zinc-950 text-cyan-400 border border-cyan-500/20 py-2.5 rounded-xl text-[10px] font-mono font-bold hover:bg-cyan-500 hover:text-black transition-all flex items-center justify-center space-x-2"><span>GENERATE_ARTICLE</span><ArrowRight size={12} /></button>
                    </div>
                  ))}
                </div>
              ) : !isLoadingRepos && (
                <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl"><Terminal size={40} className="mx-auto text-zinc-800 mb-4" /><p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">{t.noSource}</p></div>
              )}
              {isLoadingRepos && (
                <div className="text-center py-20"><Loader2 className="animate-spin text-cyan-500 mx-auto mb-4" size={32} /><p className="text-zinc-500 font-mono text-[10px] uppercase animate-pulse">{t.scanningNodes}</p></div>
              )}
            </div>
          )}

          {currentView === 'connect' && (
            <div className="max-w-md mx-auto py-12 animate-in zoom-in-95 duration-300">
              <div className="text-center mb-10"><div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto text-cyan-500 mb-6 shadow-[0_0_20px_rgba(34,211,238,0.05)]"><Github size={32} /></div><h3 className="text-xl font-mono font-bold uppercase tracking-tighter">{t.syncGithub}</h3><p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest mt-2">{t.pointProfile}</p></div>
              <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 backdrop-blur-sm"><div className="space-y-4"><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="USERNAME_GITHUB..." className="w-full px-5 py-3.5 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-cyan-500/50 text-zinc-100 font-mono text-xs" onKeyDown={(e) => e.key === 'Enter' && fetchRepos(username)}/><button onClick={() => fetchRepos(username)} disabled={isLoadingRepos || !username} className="w-full bg-cyan-500 text-black py-3.5 rounded-xl font-bold font-mono text-xs hover:bg-cyan-400 transition-all uppercase disabled:opacity-50">{t.syncBuffer}</button></div></div>
            </div>
          )}

          {currentView === 'editor' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {isGenerating ? (
                <div className="text-center py-24"><Loader2 className="animate-spin text-cyan-500 mx-auto mb-6" size={48} /><h3 className="text-lg font-mono font-bold mb-2 uppercase tracking-tighter">{t.generating}</h3><p className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">{t.encoding}</p></div>
              ) : article ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    {article.language !== lang && !viewingSavedArticle && (
                      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between"><div className="flex items-center space-x-2 text-amber-500"><Info size={16} /><span className="text-[10px] font-mono font-bold uppercase tracking-tight">{t.langMismatch}</span></div><button onClick={() => selectedRepo && handleGenerate(selectedRepo, lang)} className="flex items-center space-x-1.5 text-[10px] font-mono font-bold bg-amber-500 text-black px-3 py-1.5 rounded-lg"><RefreshCw size={12} /><span>{t.regenerateLang} {lang.toUpperCase()}</span></button></div>
                    )}
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-5 md:p-8 backdrop-blur-sm relative overflow-hidden">
                      {copyStatus === 'copied' && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4"><div className="bg-emerald-500 text-black px-6 py-3 rounded-2xl font-mono font-bold text-xs shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center space-x-3"><MousePointer2 size={16} className="animate-bounce" /><span>{t.pasteGuide}</span></div></div>
                      )}
                      
                      {pushError && (
                        <div className="mb-6 p-5 bg-red-500/5 border border-red-500/20 rounded-xl space-y-3 animate-in slide-in-from-top-4"><div className="flex items-center space-x-3 text-red-500"><AlertCircle size={20} /><span className="text-xs font-mono font-bold uppercase tracking-tight">{pushError}</span></div><p className="text-[10px] font-mono text-zinc-500 pl-8 leading-relaxed italic">{t.devtoHelp}</p></div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-800/50">
                        <div className="flex items-center space-x-3">
                          {viewingSavedArticle && <button onClick={() => setCurrentView('planner')} className="p-2 bg-zinc-800 rounded-lg text-zinc-400 hover:text-cyan-400 transition-colors"><ChevronLeft size={16} /></button>}
                          <span className="text-[10px] font-mono text-cyan-500 font-bold uppercase tracking-widest">{viewingSavedArticle ? t.savedArchive : t.liveOutput}</span>
                          <span className="text-[8px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 animate-pulse">{t.autoSaved}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button onClick={handlePushToDevto} disabled={isPushingToDevto} className={`text-[10px] font-mono font-bold px-3 py-2 rounded-lg transition-all uppercase flex items-center space-x-2 border shadow-lg ${!devtoKey ? 'bg-amber-500 text-black border-amber-400 hover:bg-amber-400 animate-pulse' : 'bg-zinc-800 text-white border-zinc-700 hover:border-cyan-500/50'}`}>
                            {isPushingToDevto ? <Loader2 size={12} className="animate-spin" /> : (!devtoKey ? <Key size={12} /> : <Send size={12} />)}
                            <span>{isPushingToDevto ? t.pushing : (!devtoKey ? t.missingKey : t.pushDevto)}</span>
                          </button>
                          
                          <button 
                            onClick={handleCopyWithFrontmatter} 
                            className={`text-[10px] font-mono font-bold px-4 py-2 rounded-lg transition-all uppercase flex items-center space-x-2 border shadow-[0_0_20px_rgba(34,211,238,0.1)] ${copyStatus === 'copied' ? 'bg-emerald-500 text-black border-emerald-400' : 'text-cyan-400 bg-zinc-800/50 border-cyan-500/20 hover:bg-cyan-500/10'}`}
                          >
                            {copyStatus === 'copied' ? <CheckCircle2 size={12} /> : <FileJson size={12} />}
                            <span>{copyStatus === 'copied' ? t.copied : t.copyDevto}</span>
                          </button>

                          <button onClick={handleSaveToPlan} className="text-[10px] font-mono font-bold text-black bg-cyan-400 px-3 py-2 rounded-lg hover:bg-cyan-300 uppercase flex items-center space-x-2 shadow-[0_0_15px_rgba(34,211,238,0.2)]"><Save size={12} /><span>{t.storeArchive}</span></button>
                        </div>
                      </div>
                      
                      {/* Virtual Editor Header - Emulating the screenshot */}
                      <div className="mb-6 p-6 bg-zinc-950/80 border border-zinc-800 rounded-2xl space-y-4 shadow-inner">
                        <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest flex items-center gap-2"><MousePointer2 size={10}/> Editor_Preview</span>
                          <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-zinc-900"></div><div className="w-2.5 h-2.5 rounded-full bg-zinc-900"></div></div>
                        </div>
                        <h2 className="text-2xl font-mono font-bold text-zinc-100 leading-tight">{article.title}</h2>
                        <div className="flex flex-wrap gap-2">
                           {article.seoTags.slice(0, 4).map((tag, i) => (
                             <span key={i} className="text-[11px] font-mono text-zinc-500 px-2 py-0.5 bg-zinc-900 rounded border border-zinc-800/50">#{tag.toLowerCase().replace(/[^a-z0-9]/g, '')}</span>
                           ))}
                        </div>
                      </div>

                      <div className="bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 md:p-6 overflow-hidden min-h-[400px]">
                        <textarea 
                          value={article.content}
                          onChange={(e) => updateArticleContent(e.target.value)}
                          className="w-full h-full min-h-[400px] bg-transparent border-none outline-none text-zinc-400 text-xs md:text-sm font-mono leading-relaxed resize-none scrollbar-thin scrollbar-thumb-zinc-800"
                          spellCheck={false}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-xl">
                      <h3 className="font-mono font-bold text-[10px] uppercase tracking-[0.2em] flex items-center space-x-2 mb-6 text-cyan-500"><Sparkles size={14} /><span>{t.metadataExtract}</span></h3>
                      <div className="space-y-6">
                        <div>
                          <p className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2">Social_Tags</p>
                          <div className="flex flex-wrap gap-1.5">
                            {article.seoTags.map((tag, i) => (<span key={i} className="bg-zinc-950 border border-zinc-800 text-zinc-500 text-[9px] font-mono px-2 py-0.5 rounded tracking-tighter">#{tag}</span>))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2">Meta_Description</p>
                          <p className="text-[11px] text-zinc-400 leading-relaxed italic border-l-2 border-cyan-500/20 pl-3">"{article.summary}"</p>
                        </div>
                        <div className="pt-4 border-t border-zinc-800">
                          <p className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-1">Target_Slug</p>
                          <code className="text-[10px] text-cyan-400 font-mono break-all">{article.suggestedSlug}</code>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              ) : error?.isPermission ? (
                <div className="max-w-md mx-auto py-16 text-center space-y-6 bg-red-500/5 border border-red-500/20 rounded-3xl p-8"><ShieldAlert size={40} className="mx-auto text-red-500/50" /><h2 className="text-lg font-mono font-bold text-red-400 uppercase">{t.billingRequired}</h2><p className="text-xs text-zinc-500 font-mono leading-relaxed">{t.billingMsg}</p><button onClick={handleOpenKeyPicker} className="w-full bg-cyan-500 text-black py-3 rounded-xl font-mono font-bold uppercase text-xs">{t.authorizeKey}</button></div>
              ) : (
                <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl"><FileText size={40} className="mx-auto text-zinc-800 mb-4" /><p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">{t.emptyBuffer}</p></div>
              )}
            </div>
          )}

          {currentView === 'planner' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500"><div className="flex items-center justify-between border-b border-zinc-800 pb-4"><h2 className="text-2xl font-mono font-bold uppercase tracking-tighter">{t.editorialArchive}</h2><div className="bg-zinc-900 px-3 py-1 rounded-full text-[9px] font-mono text-zinc-500 uppercase border border-zinc-800">{editorialPlan.length} Entries</div></div>{editorialPlan.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">{editorialPlan.map((item) => (<div key={item.id} onClick={() => openSavedArticle(item)} className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl hover:border-cyan-500/30 transition-all group cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4"><div className="flex-1 min-w-0"><div className="flex items-center space-x-2 mb-1"><span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{item.repoName}</span><span className="w-1 h-1 rounded-full bg-zinc-800"></span><span className="text-[9px] font-mono text-zinc-600">{item.date}</span></div><h4 className="font-mono font-bold text-sm text-zinc-200 truncate group-hover:text-cyan-400 transition-colors">{item.title}</h4></div><div className="flex items-center justify-between lg:justify-end space-x-4 border-t lg:border-none border-zinc-800/50 pt-3 lg:pt-0"><span className="bg-cyan-500/10 text-cyan-400 text-[8px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-cyan-500/10">{item.status}</span><div className="flex items-center space-x-2"><button className="p-2 text-zinc-600 hover:text-cyan-400 transition-colors"><Eye size={16} /></button><button onClick={(e) => handleDeleteItem(e, item.id)} className="p-2 text-zinc-700 hover:text-red-500 transition-colors"><Trash2 size={16} /></button></div></div></div>))}</div>) : (<div className="text-center py-20 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl"><Calendar size={40} className="mx-auto text-zinc-800 mb-4" /><p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest mb-6">{t.noArchived}</p><button onClick={() => setCurrentView('dashboard')} className="text-cyan-500 font-mono text-[10px] uppercase hover:underline">{t.startExtraction}</button></div>)}</div>
          )}

          {currentView === 'settings' && (
            <div className="max-w-xl animate-in fade-in slide-in-from-left-4 duration-500 space-y-6"><h2 className="text-2xl font-mono font-bold uppercase tracking-tighter border-b border-zinc-800 pb-4">{t.globalConfig}</h2><div className="space-y-4"><div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4"><div className="flex items-center space-x-3 text-cyan-500"><Languages size={18} /><h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">{t.langSettings}</h3></div><p className="text-[11px] text-zinc-500 font-mono">{t.langSelect}</p><div className="flex gap-2"><button onClick={() => toggleLang('it')} className={`flex-1 py-3 rounded-xl font-mono text-xs border transition-all ${lang === 'it' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 font-bold' : 'bg-zinc-950 border-zinc-800 text-zinc-500'}`}>ITALIANO</button><button onClick={() => toggleLang('en')} className={`flex-1 py-3 rounded-xl font-mono text-xs border transition-all ${lang === 'en' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 font-bold' : 'bg-zinc-950 border-zinc-800 text-zinc-500'}`}>ENGLISH</button></div></div>

              {/* AI Provider Selection */}
              <div className="bg-zinc-900 border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-cyan-500">
                    <Cpu size={18} />
                    <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">{t.aiProvider}</h3>
                  </div>
                  <span className="text-[8px] font-mono font-bold px-2 py-0.5 bg-emerald-500 text-black rounded uppercase">{t.freeModels}</span>
                </div>
                <p className="text-[11px] text-zinc-500 font-mono">{t.aiProviderDesc}</p>

                {/* Provider Selection */}
                <div className="flex gap-2">
                  {(Object.keys(PROVIDER_INFO) as AIProvider[]).map((provider) => (
                    <button
                      key={provider}
                      onClick={() => updateProviderConfig({ provider })}
                      className={`flex-1 py-3 rounded-xl font-mono text-xs border transition-all flex items-center justify-center gap-2 ${providerConfig.provider === provider ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 font-bold' : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                    >
                      <span>{PROVIDER_INFO[provider].icon}</span>
                      <span>{PROVIDER_INFO[provider].name}</span>
                    </button>
                  ))}
                </div>

                {/* Model Selection */}
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{t.selectModel}</label>
                  <select
                    value={providerConfig.model || DEFAULT_MODELS[providerConfig.provider]}
                    onChange={(e) => updateProviderConfig({ model: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs text-zinc-200 outline-none focus:border-cyan-500 appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                  >
                    {AVAILABLE_MODELS[providerConfig.provider].map((model) => (
                      <option key={model.id} value={model.id} className="bg-zinc-900">
                        {model.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Current Selection Info */}
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                  <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Active_Config</p>
                  <code className="text-[10px] text-cyan-400 font-mono break-all">{providerConfig.model || DEFAULT_MODELS[providerConfig.provider]}</code>
                </div>
              </div>

              {/* API Keys Section */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">
                <div className="flex items-center space-x-3 text-cyan-500">
                  <Key size={18} />
                  <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">{t.apiKeys}</h3>
                </div>
                <p className="text-[11px] text-zinc-500 font-mono">{t.apiKeysDesc}</p>

                {/* OpenRouter Key */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">{t.openrouterKey}</label>
                    <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded uppercase ${openrouterKey ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                      {openrouterKey ? t.keyConfigured : t.keyMissing}
                    </span>
                  </div>
                  <div className="relative">
                    <Key size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                    <input
                      type="password"
                      value={openrouterKey}
                      onChange={(e) => handleSaveOpenrouterKey(e.target.value)}
                      placeholder={t.openrouterKeyPlaceholder}
                      className="w-full pl-12 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                  <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-[9px] font-mono text-cyan-500 hover:underline flex items-center gap-1">
                    {t.getKeyAt} openrouter.ai/keys <ExternalLink size={10} />
                  </a>
                </div>

                {/* Gemini Key */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">{t.geminiKey}</label>
                    <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded uppercase ${geminiKey ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                      {geminiKey ? t.keyConfigured : t.keyMissing}
                    </span>
                  </div>
                  <div className="relative">
                    <Key size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                    <input
                      type="password"
                      value={geminiKey}
                      onChange={(e) => handleSaveGeminiKey(e.target.value)}
                      placeholder={t.geminiKeyPlaceholder}
                      className="w-full pl-12 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                  <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-[9px] font-mono text-cyan-500 hover:underline flex items-center gap-1">
                    {t.getKeyAt} aistudio.google.com/apikey <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              <div id="devto-config" className={`bg-zinc-900 border ${!devtoKey ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-zinc-800'} rounded-2xl p-6 space-y-4 transition-all`}><div className="flex items-center justify-between"><div className="flex items-center space-x-3 text-cyan-500"><Send size={18} /><h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">{t.devtoIntegration}</h3></div>{!devtoKey && <span className="text-[8px] font-mono font-bold px-2 py-0.5 bg-amber-500 text-black rounded uppercase">Missing Key</span>}</div><p className="text-[11px] text-zinc-500 font-mono">Inserisci la tua API Key per abilitare l'invio delle bozze direttamente dal Laboratorio.</p><div className="space-y-3"><div className="relative"><Key size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" /><input ref={devtoInputRef} type="password" value={devtoKey} onChange={(e) => saveDevtoKey(e.target.value)} placeholder={t.devtoKeyPlaceholder} className={`w-full pl-12 pr-4 py-3 bg-zinc-950 border ${!devtoKey ? 'border-amber-500/30 focus:border-amber-500' : 'border-zinc-800 focus:border-cyan-500'} rounded-xl font-mono text-xs outline-none transition-all`} /></div></div></div><div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-2xl"><div className="flex items-center space-x-3 text-cyan-500"><CreditCard size={18} /><h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">{t.apiModule}</h3></div><div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between"><div className="space-y-1"><p className="font-mono text-zinc-200 text-xs">{t.authState}</p><p className={`text-[9px] font-mono uppercase ${hasKey ? 'text-emerald-500' : 'text-red-500'}`}>{hasKey ? t.verified : t.locked}</p></div><button onClick={handleOpenKeyPicker} className="text-[9px] font-mono font-bold text-cyan-400 border border-cyan-400/20 px-4 py-2 rounded-lg uppercase hover:bg-cyan-400/10">{t.updateKey}</button></div><div className="bg-cyan-500/5 p-4 rounded-xl border border-cyan-500/10"><div className="flex items-center space-x-2 text-cyan-400 mb-3"><Info size={14} /><span className="text-[9px] font-mono font-bold uppercase tracking-widest">Guide</span></div><ul className="text-[10px] text-zinc-500 font-mono space-y-2 list-disc ml-4"><li>I modelli Pro richiedono billing attivo su Google AI Studio.</li><li>Senza billing, riceverai errori di autorizzazione 403.</li></ul></div></div></div></div>
          )}
        </div>
      </main>

      <nav className="md:hidden sticky bottom-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800 flex justify-around p-1">
        {[ { icon: LayoutDashboard, view: 'dashboard' as View }, { icon: Github, view: 'connect' as View }, { icon: FileText, view: 'editor' as View }, { icon: Calendar, view: 'planner' as View }, { icon: Settings, view: 'settings' as View }, ].map((item, i) => (
          <button key={i} onClick={() => { setCurrentView(item.view); if (item.view !== 'editor') setViewingSavedArticle(null); }} className={`p-3 rounded-xl transition-all ${currentView === item.view ? 'text-cyan-400 bg-cyan-500/10' : 'text-zinc-600'}`}><item.icon size={20} /></button>
        ))}
      </nav>
    </div>
  );
}
