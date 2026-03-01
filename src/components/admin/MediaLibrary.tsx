import React, { useState, useEffect, useRef } from 'react';
import {
    X, Upload, Trash2, Check,
    Image as ImageIcon, FileWarning, Search,
    Loader2, Link as LinkIcon
} from 'lucide-react';
import { storage, MediaFile } from '../../utils/storage';

interface MediaLibraryProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    title?: string;
}

export function MediaLibrary({ isOpen, onClose, onSelect, title = "Biblioteca de Mídia" }: MediaLibraryProps) {
    const [media, setMedia] = useState<MediaFile[]>(storage.getMedia());
    const [uploading, setUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setMedia(storage.getMedia());
            setSelectedId(null);
        }
    }, [isOpen]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const newMedia: MediaFile[] = [...media];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Validate type
            if (!file.type.startsWith('image/')) {
                alert(`O arquivo ${file.name} não é uma imagem válida.`);
                continue;
            }

            // Convert to Base64
            const reader = new FileReader();
            const promise = new Promise<string>((resolve) => {
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.readAsDataURL(file);
            });

            const base64 = await promise;

            newMedia.unshift({
                id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                url: base64,
                name: file.name,
                type: file.type,
                size: file.size,
                date: new Date().toISOString()
            });
        }

        storage.saveMedia(newMedia);
        setMedia(newMedia);
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Tem certeza que deseja excluir esta imagem da biblioteca?')) {
            const updated = media.filter(m => m.id !== id);
            storage.saveMedia(updated);
            setMedia(updated);
            if (selectedId === id) setSelectedId(null);
        }
    };

    const filteredMedia = media.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-5xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-navy-900">{title}</h2>
                        <p className="text-xs text-gray-500">{media.length} itens na biblioteca</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center bg-white">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nome do arquivo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 outline-none transition-all"
                        />
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/*"
                            multiple
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="flex items-center gap-2 bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-navy-800 transition-colors disabled:opacity-50"
                        >
                            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            Fazer Upload
                        </button>
                        <button
                            onClick={() => {
                                const url = prompt('Cole a URL da imagem externa:');
                                if (url) {
                                    const name = url.split('/').pop() || 'Imagem Externa';
                                    const newMediaItem: MediaFile = {
                                        id: `media-ext-${Date.now()}`,
                                        url: url,
                                        name: name,
                                        type: 'image/external',
                                        size: 0,
                                        date: new Date().toISOString()
                                    };
                                    const updated = [newMediaItem, ...media];
                                    storage.saveMedia(updated);
                                    setMedia(updated);
                                }
                            }}
                            className="flex items-center gap-2 bg-white border border-gray-300 text-navy-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors"
                        >
                            <LinkIcon className="w-4 h-4" /> Via URL
                        </button>
                    </div>
                </div>

                {/* Grid Content */}
                <div className="flex-grow overflow-y-auto p-6 bg-gray-50/30">
                    {filteredMedia.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {filteredMedia.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedId(item.id)}
                                    className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-white ${selectedId === item.id ? 'border-navy-900 ring-2 ring-navy-900/10' : 'border-transparent hover:border-gray-200'
                                        }`}
                                >
                                    <img
                                        src={item.url}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />

                                    {/* Overlay on hover or selected */}
                                    <div className={`absolute inset-0 bg-navy-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${selectedId === item.id ? 'opacity-100' : ''}`}>
                                        {selectedId === item.id && (
                                            <div className="bg-white rounded-full p-1 shadow-lg">
                                                <Check className="w-5 h-5 text-navy-900" />
                                            </div>
                                        )}
                                        <button
                                            onClick={(e) => handleDelete(item.id, e)}
                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-sm"
                                            title="Excluir da biblioteca"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Info Bottom */}
                                    <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                                        <p className="text-[10px] text-white font-medium truncate">{item.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12">
                            <div className="p-4 bg-gray-100 rounded-full mb-4">
                                <ImageIcon className="w-12 h-12 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Nenhuma imagem encontrada</h3>
                            <p className="text-gray-500 max-w-xs mx-auto mt-1">Sua biblioteca de mídia está vazia ou não corresponde à busca.</p>
                        </div>
                    )}
                </div>

                {/* Footer Selection */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-white">
                    <div className="flex flex-col">
                        {selectedId ? (
                            <>
                                <p className="text-sm font-bold text-navy-900 truncate max-w-[300px]">
                                    {media.find(m => m.id === selectedId)?.name}
                                </p>
                                <p className="text-[10px] text-gray-500">
                                    {formatSize(media.find(m => m.id === selectedId)?.size || 0)} • {media.find(m => m.id === selectedId)?.type}
                                </p>
                            </>
                        ) : (
                            <p className="text-sm text-gray-400 italic">Selecione uma imagem para usar</p>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            disabled={!selectedId}
                            onClick={() => {
                                const item = media.find(m => m.id === selectedId);
                                if (item) {
                                    onSelect(item.url);
                                    onClose();
                                }
                            }}
                            className="bg-navy-900 text-white px-8 py-2 rounded-lg text-sm font-bold hover:bg-navy-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-navy-900/10"
                        >
                            Confirmar Seleção
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
