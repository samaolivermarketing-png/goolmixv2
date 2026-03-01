import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import {
    Bold, Italic, Underline, List, ListOrdered,
    Type, AlignLeft, AlignCenter, AlignRight,
    Link as LinkIcon, Image as ImageIcon, Video,
    Code, Quote
} from 'lucide-react';

interface SEOEditorProps {
    content: string;
    onChange: (html: string) => void;
    onOpenMediaLibrary?: () => void;
}

export interface SEOEditorRef {
    insertImage: (url: string, alt?: string) => void;
}

export const SEOEditor = forwardRef<SEOEditorRef, SEOEditorProps>(({ content, onChange, onOpenMediaLibrary }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const lastSelection = useRef<Range | null>(null);
    const [activeStates, setActiveStates] = useState({
        bold: false,
        italic: false,
        underline: false,
        unorderedList: false,
        orderedList: false,
        h1: false,
        h2: false,
        h3: false,
        p: false,
        blockquote: false,
        pre: false,
        justifyLeft: false,
        justifyCenter: false,
        justifyRight: false
    });

    useImperativeHandle(ref, () => ({
        insertImage: (url: string, alt: string = '') => {
            if (lastSelection.current) {
                const selection = window.getSelection();
                selection?.removeAllRanges();
                selection?.addRange(lastSelection.current);
            }

            const imgHtml = `<img src="${url}" alt="${alt}" title="${alt}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" />`;
            execCommand('insertHTML', imgHtml);
        }
    }));

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== content) {
            editorRef.current.innerHTML = content;
        }
    }, []);

    const saveSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            lastSelection.current = selection.getRangeAt(0).cloneRange();
        }
    };

    const updateActiveStates = () => {
        if (!editorRef.current) return;

        let formatValue = '';
        try {
            formatValue = (document.queryCommandValue('formatBlock') || '').toLowerCase();
        } catch (e) {
            // Command might not be supported in some contexts
        }

        // Robust check for lists and blockquotes by traversing up the DOM
        let isList = false;
        let isOrderedList = false;
        let isBlockquote = false;

        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            let container = selection.getRangeAt(0).startContainer;
            let node: Node | null = container.nodeType === 3 ? container.parentNode : container;

            while (node && node !== editorRef.current) {
                if (node.nodeName === 'UL') isList = true;
                if (node.nodeName === 'OL') isOrderedList = true;
                if (node.nodeName === 'BLOCKQUOTE') isBlockquote = true;
                node = node.parentNode;
            }
        }

        setActiveStates({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
            unorderedList: isList || document.queryCommandState('insertUnorderedList'),
            orderedList: isOrderedList || document.queryCommandState('insertOrderedList'),
            h1: formatValue === 'h1',
            h2: formatValue === 'h2',
            h3: formatValue === 'h3',
            p: (formatValue === 'p' || formatValue === 'div' || formatValue === '' || formatValue === 'normal') && !isBlockquote && !isList && !isOrderedList,
            blockquote: isBlockquote || formatValue === 'blockquote',
            pre: formatValue === 'pre',
            justifyLeft: document.queryCommandState('justifyLeft'),
            justifyCenter: document.queryCommandState('justifyCenter'),
            justifyRight: document.queryCommandState('justifyRight')
        });
    };

    const execCommand = (command: string, value: string = '') => {
        try {
            document.execCommand(command, false, value);
            updateActiveStates();
            if (editorRef.current) {
                onChange(editorRef.current.innerHTML);
            }
        } catch (e) {
            console.error('Error executing editor command:', e);
        }
    };

    const handleInput = () => {
        saveSelection();
        updateActiveStates();
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const addLink = () => {
        saveSelection();
        const url = prompt('Cole a URL:');
        if (url) execCommand('createLink', url);
    };

    const addImage = () => {
        saveSelection();
        if (onOpenMediaLibrary) {
            onOpenMediaLibrary();
        } else {
            const url = prompt('Cole a URL da imagem:');
            const alt = prompt('Texto alternativo (Alt Text):');
            if (url) {
                const imgHtml = `<img src="${url}" alt="${alt || ''}" title="${alt || ''}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" />`;
                execCommand('insertHTML', imgHtml);
            }
        }
    };

    const addVideo = () => {
        saveSelection();
        const url = prompt('Cole a URL do vídeo do YouTube (Ex: https://www.youtube.com/watch?v=... ou https://youtu.be/...):');
        if (!url) return;

        let videoId = '';
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            videoId = match[2];
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            const videoHtml = `
                <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 24px 0; border-radius: 12px; background: #000; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
                    <iframe 
                        src="${embedUrl}" 
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                    ></iframe>
                </div>
                <p><br></p>
            `;
            execCommand('insertHTML', videoHtml);
        } else {
            alert('URL do YouTube inválida. Por favor, cole uma URL válida.');
        }
    };

    return (
        <div className="flex flex-col border rounded-xl overflow-hidden bg-white shadow-sm border-gray-200">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-1 border-r pr-2 mr-1">
                    <button
                        type="button"
                        onClick={() => execCommand('formatBlock', 'H1')}
                        title="H1 (Título Principal)"
                        className={`p-1.5 rounded transition-colors ${activeStates.h1 ? 'bg-blue-100 text-blue-700' : 'hover:bg-white'}`}
                    >
                        <span className="font-bold text-xs">H1</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('formatBlock', 'H2')}
                        title="H2 (Subtítulo)"
                        className={`p-1.5 rounded transition-colors ${activeStates.h2 ? 'bg-blue-100 text-blue-700' : 'hover:bg-white'}`}
                    >
                        <span className="font-bold text-xs text-gray-600">H2</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('formatBlock', 'H3')}
                        title="H3 (Seção)"
                        className={`p-1.5 rounded transition-colors ${activeStates.h3 ? 'bg-blue-100 text-blue-700' : 'hover:bg-white'}`}
                    >
                        <span className="font-bold text-xs text-gray-500">H3</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('formatBlock', 'P')}
                        title="Parágrafo"
                        className={`p-1.5 rounded transition-colors ${activeStates.p ? 'bg-blue-100 text-blue-700' : 'hover:bg-white'}`}
                    >
                        <Type className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-1 border-r pr-2 mr-1">
                    <button
                        type="button"
                        onClick={() => execCommand('bold')}
                        title="Negrito"
                        className={`p-1.5 rounded transition-colors ${activeStates.bold ? 'bg-blue-100 text-blue-700' : 'hover:bg-white'}`}
                    >
                        <Bold className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('italic')}
                        title="Itálico"
                        className={`p-1.5 rounded transition-colors ${activeStates.italic ? 'bg-blue-100 text-blue-700' : 'hover:bg-white'}`}
                    >
                        <Italic className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('underline')}
                        title="Sublinhado"
                        className={`p-1.5 rounded transition-colors ${activeStates.underline ? 'bg-blue-100 text-blue-700' : 'hover:bg-white'}`}
                    >
                        <Underline className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-1 border-r pr-2 mr-1">
                    <button
                        type="button"
                        onClick={() => execCommand('insertUnorderedList')}
                        title="Lista com marcadores"
                        className={`p-1.5 rounded transition-colors ${activeStates.unorderedList ? 'bg-blue-100 text-blue-700' : 'hover:bg-white'}`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('insertOrderedList')}
                        title="Lista numerada"
                        className={`p-1.5 rounded transition-colors ${activeStates.orderedList ? 'bg-blue-100 text-blue-700' : 'hover:bg-white'}`}
                    >
                        <ListOrdered className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('formatBlock', 'BLOCKQUOTE')}
                        title="Citação"
                        className={`p-1.5 rounded transition-colors ${activeStates.blockquote ? 'bg-blue-100 text-blue-700' : 'hover:bg-white'}`}
                    >
                        <Quote className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-1 border-r pr-2 mr-1">
                    <button
                        type="button"
                        onClick={() => execCommand('justifyLeft')}
                        title="Alinhar à esquerda"
                        className={`p-1.5 rounded transition-colors ${activeStates.justifyLeft ? 'bg-blue-100 text-blue-700' : 'hover:bg-white'}`}
                    >
                        <AlignLeft className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('justifyCenter')}
                        title="Centralizar"
                        className={`p-1.5 rounded transition-colors ${activeStates.justifyCenter ? 'bg-blue-100 text-blue-700' : 'hover:bg-white'}`}
                    >
                        <AlignCenter className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('justifyRight')}
                        title="Alinhar à direita"
                        className={`p-1.5 rounded transition-colors ${activeStates.justifyRight ? 'bg-blue-100 text-blue-700' : 'hover:bg-white'}`}
                    >
                        <AlignRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-1">
                    <button type="button" onClick={addLink} title="Adicionar Link" className="p-1.5 hover:bg-white rounded transition-colors"><LinkIcon className="w-4 h-4" /></button>
                    <button type="button" onClick={addImage} title="Adicionar Imagem" className="p-1.5 hover:bg-white rounded transition-colors text-blue-600"><ImageIcon className="w-4 h-4" /></button>
                    <button type="button" onClick={addVideo} title="Adicionar Vídeo" className="p-1.5 hover:bg-white rounded transition-colors text-red-600"><Video className="w-4 h-4" /></button>
                    <button
                        type="button"
                        onClick={() => execCommand('formatBlock', 'PRE')}
                        title="Código"
                        className={`p-1.5 rounded transition-colors ${activeStates.pre ? 'bg-blue-100 text-blue-700' : 'hover:bg-white'}`}
                    >
                        <Code className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Editable Area */}
            <style>{`
                .editor-content ul {
                    list-style-type: disc;
                    margin-left: 1.5rem;
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }
                .editor-content ol {
                    list-style-type: decimal;
                    margin-left: 1.5rem;
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }
                .editor-content li {
                    display: list-item;
                    margin-bottom: 0.25rem;
                }
                .editor-content blockquote {
                    border-left: 4px solid #073e83;
                    padding-left: 1rem;
                    margin: 1.5rem 0;
                    font-style: italic;
                    color: #4a5568;
                    background-color: #f7fafc;
                    padding-top: 0.5rem;
                    padding-bottom: 0.5rem;
                }
                .editor-content h1 { font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; }
                .editor-content h2 { font-size: 1.875rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; }
                .editor-content h3 { font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; }
                .editor-content pre { 
                    background-color: #1e293b; 
                    color: #e2e8f0; 
                    padding: 1.25rem; 
                    border-radius: 0.75rem; 
                    overflow-x: auto; 
                    margin: 1.5rem 0; 
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                    font-size: 0.875rem;
                    line-height: 1.7;
                    border: 1px solid #334155;
                }
                .editor-content a { color: #073e83; text-decoration: underline; }
                .editor-content img { display: block; max-width: 100%; border-radius: 8px; margin: 1.5rem auto; }
            `}</style>

            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onMouseUp={() => { saveSelection(); updateActiveStates(); }}
                onKeyUp={() => { saveSelection(); updateActiveStates(); }}
                className="p-6 min-h-[500px] outline-none editor-content prose prose-navy max-w-none bg-white"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            ></div>

            {/* Footer / Info */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-medium">
                <span>DICA: Use H1 apenas uma vez por artigo para melhor SEO.</span>
                <span>Modo: WYSIWYG Editor</span>
            </div>
        </div>
    );
});
