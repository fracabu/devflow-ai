
export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  full_name: string;
}

export interface GeneratedArticle {
  title: string;
  content: string;
  seoTags: string[];
  summary: string;
  suggestedSlug: string;
  language: Language;
}

export interface EditorialItem {
  id: string;
  title: string;
  repoName: string;
  status: 'draft' | 'scheduled' | 'published';
  date: string;
  articleData: GeneratedArticle;
}

export type View = 'dashboard' | 'connect' | 'editor' | 'planner' | 'settings';
export type Language = 'it' | 'en';
