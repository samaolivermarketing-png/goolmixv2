import React from 'react';
import {
    CheckCircle2, AlertCircle, XCircle,
    Info, Search, Share2, Globe, Eye
} from 'lucide-react';
import { SEOAnalysis } from '../../utils/seoUtils';

interface SEOSidebarProps {
    analysis: SEOAnalysis;
    metaTitle: string;
    metaDescription: string;
    slug: string;
    keyword: string;
    onUpdateField: (field: string, value: any) => void;
}

export function SEOSidebar({
    analysis,
    metaTitle,
    metaDescription,
    slug,
    keyword,
    onUpdateField
}: SEOSidebarProps) {

    const getProgressBarColor = (len: number, min: number, max: number) => {
        if (len >= min && len <= max) return 'bg-green-500';
        if (len > 0) return 'bg-yellow-500';
        return 'bg-gray-200';
    };

    return (
        <div className="flex flex-col gap-6">
            {/* SEO Score Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-navy-900 flex items-center gap-2">
                        <Search className="w-4 h-4" /> SEO Score
                    </h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${analysis.label === 'Excelente' ? 'bg-green-100 text-green-700' :
                        analysis.label === 'Bom' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {analysis.label}
                    </span>
                </div>

                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-navy-600 bg-navy-50">
                                Qualidade Global
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-navy-600">
                                {analysis.score}%
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                        <div
                            style={{ width: `${analysis.score}%` }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${analysis.score >= 80 ? 'bg-green-500' : analysis.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                        ></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Palavras</p>
                        <p className="text-lg font-bold text-navy-900">{analysis.wordCount}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Leitura</p>
                        <p className="text-lg font-bold text-navy-900">{analysis.readingTime}</p>
                    </div>
                </div>
            </div>

            {/* Metadados Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                <h3 className="font-bold text-navy-900 flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4" /> Metadados SEO
                </h3>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex justify-between">
                        Palavra-chave Foco
                        <span title="A palavra-chave que você quer ranquear no Google.">
                            <Info className="w-3 h-3 cursor-help text-gray-300" />
                        </span>
                    </label>
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => onUpdateField('focusKeyword', e.target.value)}
                        className="w-full text-sm p-2 border rounded focus:ring-1 focus:ring-navy-500 outline-none"
                        placeholder="Ex: concreto usinado"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex justify-between">
                        Meta Title
                        <span className={metaTitle.length >= 50 && metaTitle.length <= 60 ? 'text-green-600' : 'text-yellow-600'}>
                            {metaTitle.length}/60
                        </span>
                    </label>
                    <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => onUpdateField('metaTitle', e.target.value)}
                        className="w-full text-sm p-2 border rounded focus:ring-1 focus:ring-navy-500 outline-none"
                        placeholder="Título para o Google"
                    />
                    <div className="h-1 w-full bg-gray-100 rounded-full mt-1 overflow-hidden">
                        <div
                            className={`h-full transition-all ${getProgressBarColor(metaTitle.length, 50, 60)}`}
                            style={{ width: `${Math.min((metaTitle.length / 60) * 100, 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex justify-between">
                        Meta Description
                        <span className={metaDescription.length >= 140 && metaDescription.length <= 160 ? 'text-green-600' : 'text-yellow-600'}>
                            {metaDescription.length}/160
                        </span>
                    </label>
                    <textarea
                        value={metaDescription}
                        onChange={(e) => onUpdateField('metaDescription', e.target.value)}
                        rows={3}
                        className="w-full text-sm p-2 border rounded focus:ring-1 focus:ring-navy-500 outline-none"
                        placeholder="Descrição para o Google"
                    />
                    <div className="h-1 w-full bg-gray-100 rounded-full mt-1 overflow-hidden">
                        <div
                            className={`h-full transition-all ${getProgressBarColor(metaDescription.length, 140, 160)}`}
                            style={{ width: `${Math.min((metaDescription.length / 160) * 100, 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">URL Slug</label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => onUpdateField('slug', e.target.value)}
                        className="w-full text-sm p-2 border rounded font-mono bg-gray-50"
                        placeholder="url-do-artigo"
                    />
                </div>
            </div>

            {/* Checklist Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-navy-900 border-b pb-3 mb-4">Checklist de SEO</h3>
                <div className="space-y-3">
                    {analysis.checklist.map(item => (
                        <div key={item.id} className="flex gap-3 group">
                            {item.status === 'success' ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            ) : item.status === 'warning' ? (
                                <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                            ) : (
                                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                                <p className="text-xs font-medium text-navy-800">{item.label}</p>
                                <p className="text-[10px] text-gray-400 hidden group-hover:block">{item.tip}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Google Preview */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <h3 className="font-bold text-navy-900 flex items-center gap-2 mb-4">
                    <Eye className="w-4 h-4" /> Google Preview
                </h3>
                <div className="border border-gray-100 rounded-lg p-4 bg-gray-50 select-none">
                    <p className="text-[12px] text-[#202124] flex items-center gap-1 mb-1">
                        goolmixconcreto.com.br <span className="text-gray-400">› blog › {slug || '...'}</span>
                    </p>
                    <h4 className="text-[18px] text-[#1a0dab] hover:underline cursor-pointer mb-1 leading-tight">
                        {metaTitle || 'Título do Artigo Aparecerá Aqui'}
                    </h4>
                    <p className="text-[13px] text-[#4d5156] line-clamp-2 leading-relaxed">
                        <span className="text-gray-500">15 de out. de 2023 — </span>
                        {metaDescription || 'A meta descrição do seu artigo aparecerá aqui nos resultados de busca do Google...'}
                    </p>
                </div>
            </div>
        </div>
    );
}
