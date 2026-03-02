/**
 * Storage utility for managing site data in localStorage.
 */

export interface PhoneData {
    contact: string;
    whatsapp: string;
}

export interface BlogArticle {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    image: string;
    category: string;
    status: 'published' | 'draft';
    // SEO Fields
    slug: string;
    metaTitle: string;
    metaDescription: string;
    focusKeyword: string;
    secondaryKeywords: string[];
    canonicalUrl?: string;
    ogImage?: string;
    schemaType: 'Article' | 'BlogPosting' | 'NewsArticle' | 'HowTo' | 'FAQ';
    robotsIndex: boolean;
    robotsFollow: boolean;
    lastModified?: string;
    readingTime?: string;
}

export interface MediaFile {
    id: string;
    url: string; // Base64 or external URL
    name: string;
    type: string;
    size: number;
    date: string;
}

const STORAGE_KEYS = {
    PHONES: 'goolmix_phones',
    ARTICLES: 'goolmix_articles',
    MEDIA: 'goolmix_media',
    ADMIN_AUTH: 'isAdminAuthenticated',
    ADMIN_CREDENTIALS: 'goolmix_admin_creds'
};

const DEFAULT_PHONES: PhoneData = {
    contact: '(71) 98639-3852',
    whatsapp: '5571986393852'
};

import { DEFAULT_ARTICLES, DEFAULT_MEDIA } from './defaultData';


export const storage = {
    getPhones: (): PhoneData => {
        const saved = localStorage.getItem(STORAGE_KEYS.PHONES);
        return saved ? JSON.parse(saved) : DEFAULT_PHONES;
    },
    savePhones: (phones: PhoneData) => {
        localStorage.setItem(STORAGE_KEYS.PHONES, JSON.stringify(phones));
        window.dispatchEvent(new Event('storage-update'));
    },
    getArticles: (): BlogArticle[] => {
        const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
        return saved ? JSON.parse(saved) : DEFAULT_ARTICLES;
    },
    saveArticles: (articles: BlogArticle[]) => {
        localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
        window.dispatchEvent(new Event('storage-update'));
    },
    getMedia: (): MediaFile[] => {
        const saved = localStorage.getItem(STORAGE_KEYS.MEDIA);
        return saved ? JSON.parse(saved) : DEFAULT_MEDIA;
    },
    saveMedia: (media: MediaFile[]) => {
        localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
        window.dispatchEvent(new Event('storage-update'));
    },
    isAuthenticated: async () => {
        const { data: { session } } = await (await import('./supabase')).supabase.auth.getSession();
        return !!session;
    },
    login: () => {
        // Redundant with Supabase, but keeping for local state if needed
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    },
    logout: async () => {
        await (await import('./supabase')).supabase.auth.signOut();
        localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
};
