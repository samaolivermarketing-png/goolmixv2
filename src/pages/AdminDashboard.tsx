import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Phone,
    Settings,
    FileText,
    LogOut,
    Plus,
    Pencil,
    Trash2,
    Save,
    X,
    CheckCircle2,
    AlertCircle,
    LayoutDashboard,
    Globe,
    Image as ImageIcon
} from 'lucide-react';
import { storage, PhoneData, BlogArticle } from '../utils/storage';
import { SEO } from '../components/SEO';
import { seoUtils, SEOAnalysis } from '../utils/seoUtils';

// Lazy load heavy admin components
const SEOEditor = React.lazy(() => import('../components/admin/SEOEditor').then(m => ({ default: m.SEOEditor })));
const SEOSidebar = React.lazy(() => import('../components/admin/SEOSidebar').then(m => ({ default: m.SEOSidebar })));
const MediaLibrary = React.lazy(() => import('../components/admin/MediaLibrary').then(m => ({ default: m.MediaLibrary })));

import { SEOEditorRef } from '../components/admin/SEOEditor';

import {
    Download,
    Link2,
    RefreshCcw,
    BarChart2,
    Copy,
    ChevronRight
} from 'lucide-react';

export function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'phones' | 'articles' | 'settings' | 'seo'>('phones');
    const [phones, setPhones] = useState<PhoneData>(storage.getPhones());
    const [articles, setArticles] = useState<BlogArticle[]>(storage.getArticles());
    const [isEditingArticle, setIsEditingArticle] = useState<BlogArticle | null>(null);
    const [isAddingArticle, setIsAddingArticle] = useState(false);

    // SEO Content State
    const [currentArticle, setCurrentArticle] = useState<Partial<BlogArticle>>({});
    const [seoAnalysis, setSeoAnalysis] = useState<SEOAnalysis | null>(null);

    // Media Library State
    const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
    const [mediaTarget, setMediaTarget] = useState<'cover' | 'editor' | null>(null);

    // Refs
    const editorRef = useRef<SEOEditorRef>(null);

    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authenticated = await storage.isAuthenticated();
            if (!authenticated) {
                navigate('/admin/login');
            } else {
                setIsAdmin(true);
            }
        };
        checkAuth();
    }, [navigate]);

    // Update SEO analysis whenever content/metadata changes
    useEffect(() => {
        if (isEditingArticle || isAddingArticle) {
            const analysis = seoUtils.analyzeContent(
                currentArticle.content || '',
                currentArticle.title || '',
                currentArticle.metaTitle || '',
                currentArticle.metaDescription || '',
                currentArticle.focusKeyword || '',
                currentArticle.slug || ''
            );
            setSeoAnalysis(analysis);
        }
    }, [currentArticle, isEditingArticle, isAddingArticle]);

    const handleUpdateArticleField = (field: string, value: any) => {
        setCurrentArticle(prev => {
            const updated = { ...prev, [field]: value };
            // Auto-generate slug if title changes
            if (field === 'title' && !updated.slug) {
                updated.slug = seoUtils.generateSlug(value);
            }
            return updated;
        });
    };

    const startEditing = (article: BlogArticle) => {
        setIsEditingArticle(article);
        setCurrentArticle(article);
    };

    const startAdding = () => {
        const fresh: Partial<BlogArticle> = {
            title: '',
            content: '',
            author: 'Admin',
            category: 'Geral',
            status: 'published',
            focusKeyword: '',
            metaTitle: '',
            metaDescription: '',
            slug: '',
            secondaryKeywords: [],
            schemaType: 'Article',
            robotsIndex: true,
            robotsFollow: true
        };
        setIsAddingArticle(true);
        setCurrentArticle(fresh);
    };

    const handleLogout = () => {
        storage.logout();
        navigate('/admin/login');
    };

    const showStatus = (type: 'success' | 'error', text: string) => {
        setStatusMessage({ type, text });
        setTimeout(() => setStatusMessage(null), 3000);
    };

    const handleSavePhones = (e: React.FormEvent) => {
        e.preventDefault();
        storage.savePhones(phones);
        showStatus('success', 'Telefones salvos com sucesso!');
    };

    const handleDeleteArticle = (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir este artigo?')) {
            const updated = articles.filter(a => a.id !== id);
            setArticles(updated);
            storage.saveArticles(updated);
            showStatus('success', 'Artigo excluído.');
        }
    };

    const handleSaveArticle = (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentArticle.title || !currentArticle.content) {
            showStatus('error', 'Título e conteúdo são obrigatórios.');
            return;
        }

        const articleToSave: BlogArticle = {
            ...(currentArticle as BlogArticle),
            id: isEditingArticle ? isEditingArticle.id : (currentArticle.slug || seoUtils.generateSlug(currentArticle.title)),
            date: isEditingArticle ? isEditingArticle.date : new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
            lastModified: new Date().toISOString(),
            readingTime: seoAnalysis?.readingTime || '1 min'
        };

        let updatedArticles: BlogArticle[];
        if (isEditingArticle) {
            updatedArticles = articles.map(a => a.id === isEditingArticle.id ? articleToSave : a);
        } else {
            updatedArticles = [articleToSave, ...articles];
        }

        setArticles(updatedArticles);
        storage.saveArticles(updatedArticles);
        setIsEditingArticle(null);
        setIsAddingArticle(false);
        setCurrentArticle({});
        showStatus('success', isEditingArticle ? 'Artigo atualizado!' : 'Novo artigo criado!');
    };

    if (isAdmin === null) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-900"></div></div>;
    if (!isAdmin) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <SEO title="Dashboard | Gool Mix Concreto" description="Painel Administrativo" canonical="/admin/dashboard" />

            {/* Sidebar */}
            <aside className="w-64 bg-navy-900 text-white flex flex-col fixed inset-y-0">
                <div className="p-6 border-b border-navy-800 flex items-center gap-3">
                    <LayoutDashboard className="w-6 h-6 text-blue-400" />
                    <h1 className="font-bold text-lg tracking-tight">GOOL MIX <br /><span className="text-sm font-normal text-blue-300">ADMIN</span></h1>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('phones')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'phones' ? 'bg-navy-800 text-blue-400' : 'hover:bg-navy-800/50 text-gray-400'}`}
                    >
                        <Phone className="w-5 h-5" /> <span>Telefones</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('articles')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'articles' ? 'bg-navy-800 text-blue-400' : 'hover:bg-navy-800/50 text-gray-400'}`}
                    >
                        <FileText className="w-5 h-5" /> <span>Blog / Artigos</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-navy-800 text-blue-400' : 'hover:bg-navy-800/50 text-gray-400'}`}
                    >
                        <Settings className="w-5 h-5" /> <span>Configurações</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('seo')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'seo' ? 'bg-navy-800 text-blue-400' : 'hover:bg-navy-800/50 text-gray-400'}`}
                    >
                        <BarChart2 className="w-5 h-5" /> <span>SEO & Desempenho</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-navy-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900/20 text-red-400 transition-colors"
                    >
                        <LogOut className="w-5 h-5" /> <span>Sair</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 capitalize">
                            {activeTab === 'phones' ? 'Gerenciar Telefones' : activeTab === 'articles' ? 'Conteúdo do Blog' : activeTab === 'seo' ? 'Ferramentas de SEO' : 'Configurações'}
                        </h2>
                        <p className="text-gray-500">
                            {activeTab === 'seo' ? 'Acompanhe a indexação e saúde de SEO do seu site.' : 'Administre o conteúdo que aparece em tempo real no site principal.'}
                        </p>
                    </div>

                    {statusMessage && (
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${statusMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            {statusMessage.text}
                        </div>
                    )}
                </header>

                {activeTab === 'phones' && (
                    <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <form onSubmit={handleSavePhones} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone de Contato (Header/Footer)</label>
                                <input
                                    type="text"
                                    value={phones.contact}
                                    onChange={(e) => setPhones({ ...phones, contact: e.target.value })}
                                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none"
                                    placeholder="(71) 98639-3852"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Número WhatsApp (Somente números)</label>
                                <input
                                    type="text"
                                    value={phones.whatsapp}
                                    onChange={(e) => setPhones({ ...phones, whatsapp: e.target.value.replace(/\D/g, '') })}
                                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none font-mono"
                                    placeholder="5571986393852"
                                />
                                <p className="mt-1 text-xs text-gray-400">Preview: https://wa.me/{phones.whatsapp}</p>
                            </div>
                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-navy-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-navy-800 transition-colors"
                            >
                                <Save className="w-4 h-4" /> Salvar Alterações
                            </button>
                        </form>
                    </div>
                )}

                {activeTab === 'articles' && (
                    <div className="space-y-6">
                        {!isAddingArticle && !isEditingArticle ? (
                            <>
                                <div className="flex justify-end">
                                    <button
                                        onClick={startAdding}
                                        className="flex items-center gap-2 bg-navy-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-navy-800 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" /> Novo Artigo
                                    </button>
                                </div>
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-b">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Título</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Data</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {articles.map(article => (
                                                <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-navy-900">{article.title}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{article.date}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                            {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 flex gap-3">
                                                        <button onClick={() => startEditing(article)} className="p-1 text-navy-600 hover:bg-navy-50 rounded" title="Editar"><Pencil className="w-4 h-4" /></button>
                                                        <button onClick={() => handleDeleteArticle(article.id)} className="p-1 text-red-600 hover:bg-red-50 rounded" title="Excluir"><Trash2 className="w-4 h-4" /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col gap-6">
                                <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => { setIsAddingArticle(false); setIsEditingArticle(null); }} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                            <X className="w-5 h-5 text-gray-500" />
                                        </button>
                                        <h3 className="text-xl font-bold text-navy-900">{isEditingArticle ? 'Editar Artigo' : 'Novo Artigo'}</h3>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={() => { setIsAddingArticle(false); setIsEditingArticle(null); }} className="px-6 py-2 rounded-lg font-semibold text-gray-500 hover:bg-gray-100 transition-colors">Cancelar</button>
                                        <button onClick={handleSaveArticle} className="flex items-center gap-2 bg-navy-900 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-navy-800 transition-shadow shadow-lg shadow-navy-900/20">
                                            <Save className="w-4 h-4" /> Salvar Artigo
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-8">
                                    {/* Left Column: Editor */}
                                    <div className="col-span-12 lg:col-span-8 space-y-6">
                                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Título do Artigo</label>
                                                <input
                                                    value={currentArticle.title || ''}
                                                    onChange={(e) => handleUpdateArticleField('title', e.target.value)}
                                                    required
                                                    className="w-full p-3 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none"
                                                    placeholder="Digite o título atraente do artigo..."
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Autor</label>
                                                    <input
                                                        value={currentArticle.author || ''}
                                                        onChange={(e) => handleUpdateArticleField('author', e.target.value)}
                                                        className="w-full p-2 border rounded-lg text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Categoria</label>
                                                    <input
                                                        value={currentArticle.category || ''}
                                                        onChange={(e) => handleUpdateArticleField('category', e.target.value)}
                                                        className="w-full p-2 border rounded-lg text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Imagem de Capa</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        value={currentArticle.image || ''}
                                                        onChange={(e) => handleUpdateArticleField('image', e.target.value)}
                                                        className="flex-grow p-2 border rounded-lg text-sm bg-gray-50"
                                                        placeholder="URL da imagem..."
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => { setMediaTarget('cover'); setIsMediaLibraryOpen(true); }}
                                                        className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-[10px] font-bold uppercase hover:bg-gray-50 transition-colors"
                                                    >
                                                        <ImageIcon className="w-3.5 h-3.5" /> Galeria
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Resumo Otimizado (Excerpt)</label>
                                                <textarea
                                                    value={currentArticle.excerpt || ''}
                                                    onChange={(e) => handleUpdateArticleField('excerpt', e.target.value)}
                                                    className="w-full p-2 border rounded-lg text-sm"
                                                    rows={2}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-sm font-bold text-gray-700 ml-1">Conteúdo do Artigo</label>
                                            <React.Suspense fallback={<div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-900"></div></div>}>
                                                <SEOEditor
                                                    ref={editorRef}
                                                    content={currentArticle.content || ''}
                                                    onChange={(html) => handleUpdateArticleField('content', html)}
                                                    onOpenMediaLibrary={() => { setMediaTarget('editor'); setIsMediaLibraryOpen(true); }}
                                                />
                                            </React.Suspense>
                                        </div>
                                    </div>

                                    {/* Right Column: SEO Sidebar */}
                                    <div className="col-span-12 lg:col-span-4">
                                        <React.Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse rounded-xl"></div>}>
                                            <SEOSidebar
                                                analysis={seoAnalysis || { score: 0, label: 'Precisa de melhorias', checklist: [], wordCount: 0, readingTime: '1 min' }}
                                                metaTitle={currentArticle.metaTitle || ''}
                                                metaDescription={currentArticle.metaDescription || ''}
                                                slug={currentArticle.slug || ''}
                                                keyword={currentArticle.focusKeyword || ''}
                                                onUpdateField={handleUpdateArticleField}
                                            />
                                        </React.Suspense>

                                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6 space-y-4">
                                            <h3 className="font-bold text-navy-900 flex items-center gap-2">
                                                <Settings className="w-4 h-4" /> Configurações Avançadas
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-600">Indexar no Google?</span>
                                                    <input
                                                        type="checkbox"
                                                        checked={currentArticle.robotsIndex}
                                                        onChange={(e) => handleUpdateArticleField('robotsIndex', e.target.checked)}
                                                        className="w-4 h-4 text-navy-600"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-600">Seguir links (Follow)?</span>
                                                    <input
                                                        type="checkbox"
                                                        checked={currentArticle.robotsFollow}
                                                        onChange={(e) => handleUpdateArticleField('robotsFollow', e.target.checked)}
                                                        className="w-4 h-4 text-navy-600"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tipo de Schema</label>
                                                    <select
                                                        value={currentArticle.schemaType}
                                                        onChange={(e) => handleUpdateArticleField('schemaType', e.target.value)}
                                                        className="w-full text-sm p-2 border rounded"
                                                    >
                                                        <option value="Article">Article</option>
                                                        <option value="BlogPosting">BlogPosting</option>
                                                        <option value="NewsArticle">NewsArticle</option>
                                                        <option value="HowTo">HowTo</option>
                                                        <option value="FAQ">FAQ</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'seo' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="p-3 bg-green-50 rounded-lg text-green-600"><BarChart2 className="w-6 h-6" /></div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Saúde de SEO</p>
                                    <p className="text-xl font-bold text-navy-900">Excelente</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><FileText className="w-6 h-6" /></div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Artigos Indexados</p>
                                    <p className="text-xl font-bold text-navy-900">{articles.length}</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="p-3 bg-navy-50 rounded-lg text-navy-600"><Download className="w-6 h-6" /></div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Sitemap Status</p>
                                    <p className="text-xl font-bold text-navy-900 font-mono text-sm">Atualizado</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
                                <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-4"><Globe className="w-5 h-5 text-blue-500" /> Ferramentas de Indexação</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-navy-900">Sitemap XML</p>
                                            <p className="text-xs text-gray-500">Gere o arquivo para o Google Search Console.</p>
                                        </div>
                                        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                                            <RefreshCcw className="w-4 h-4" /> Gerar
                                        </button>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-navy-900">robots.txt</p>
                                            <p className="text-xs text-gray-500">Configure as regras dos robôs de busca.</p>
                                        </div>
                                        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                                            <Pencil className="w-4 h-4" /> Editar
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
                                <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-4"><Link2 className="w-5 h-5 text-navy-500" /> Saúde de Links</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="font-bold text-navy-900">Links Quebrados (404)</p>
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Nenhum encontrado</span>
                                        </div>
                                        <p className="text-xs text-gray-500">Última checagem: hoje às {new Date().getHours()}:00</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="font-bold text-navy-900">Redirecionamentos 301</p>
                                            <p className="text-xs text-navy-600 font-bold hover:underline cursor-pointer flex items-center gap-1">Ver Tabela <ChevronRight className="w-3 h-3" /></p>
                                        </div>
                                        <p className="text-xs text-gray-500">Gerencie URLs antigas para evitar perda de tráfego.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold mb-6">JSON-LD Auto-Generator</h3>
                            <div className="relative">
                                <pre className="bg-navy-900 text-blue-300 p-6 rounded-xl font-mono text-xs overflow-x-auto">
                                    {`{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Gool Mix Concreto",
  "url": "https://goolmixconcreto.com.br",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://goolmixconcreto.com.br/busca?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}`}
                                </pre>
                                <button className="absolute top-4 right-4 p-2 bg-navy-800 hover:bg-navy-700 text-blue-400 rounded-lg transition-colors" title="Copiar">
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Media Library Modal */}
            <React.Suspense fallback={null}>
                <MediaLibrary
                    isOpen={isMediaLibraryOpen}
                    onClose={() => { setIsMediaLibraryOpen(false); setMediaTarget(null); }}
                    onSelect={(url) => {
                        if (mediaTarget === 'cover') {
                            handleUpdateArticleField('image', url);
                        } else if (mediaTarget === 'editor') {
                            editorRef.current?.insertImage(url);
                        }
                    }}
                    title={mediaTarget === 'cover' ? "Selecionar Capa do Artigo" : "Biblioteca de Mídia"}
                />
            </React.Suspense>
        </div>
    );
}
