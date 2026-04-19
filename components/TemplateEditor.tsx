import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Loader2, Sparkles, MousePointer2, Menu } from 'lucide-react';
import { PortfolioItem } from '../types';
import { TemplateRenderer } from './TemplateRenderer';
import { uploadToFirebase } from '../src/services/imageService';

interface TemplateEditorProps {
  item: PortfolioItem;
  onUpdate: (updatedItem: Partial<PortfolioItem>) => void;
  onMenuClick?: () => void;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({ item, onUpdate, onMenuClick }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = (field: string) => {
    setEditingField(field);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingField) return;

    setIsUploading(true);
    try {
      const url = await uploadToFirebase(file, (progress) => console.log(`Upload progress: ${progress}%`));
      onUpdate({ [editingField]: url });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
      setEditingField(null);
    }
  };

  // This is a "wrapper" that injects edit buttons into the template
  // We'll use a toolbar for mobile optimization
  
  return (
    <div className="relative group/editor h-full flex flex-col">
      <div className="absolute top-4 right-4 z-[60] flex items-center gap-2 px-4 py-2 bg-brand-primary/80 backdrop-blur-md text-white rounded-full text-[10px] font-bold shadow-xl border border-white/10">
        <Sparkles size={12} className="text-brand-accent" />
        LIVE EDITOR
      </div>

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* The Template with Inline Editing */}
      <div className="flex-1 relative overflow-y-auto no-scrollbar pb-32 md:pb-0">
        <TemplateRenderer 
          item={item} 
          isEditing={true}
          onUpdate={onUpdate}
          onImageClick={handleImageClick}
        />
      </div>

      {/* Mobile Toolbar - Fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 p-4 z-[70] flex items-center justify-around shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <button 
          onClick={onMenuClick}
          className="flex flex-col items-center gap-1 text-brand-secondary/60 hover:text-brand-accent transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Menu size={20} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Menu</span>
        </button>
        <div className="w-px h-8 bg-gray-200 mx-2" />
        <button 
          onClick={() => handleImageClick('imageUrl')}
          className="flex flex-col items-center gap-1 text-brand-secondary/60 hover:text-brand-accent transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <ImageIcon size={20} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Photo</span>
        </button>
        <div className="w-px h-8 bg-gray-200 mx-2" />
        <div className="flex flex-col items-center gap-1 text-brand-accent">
          <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center">
            <MousePointer2 size={20} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Active</span>
        </div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isUploading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-brand-primary/60 backdrop-blur-md"
          >
            <div className="text-center text-white">
              <Loader2 size={48} className="animate-spin mx-auto mb-6 text-brand-accent" />
              <h3 className="text-2xl font-bold mb-2">Uploading Image...</h3>
              <p className="text-white/60">This will only take a moment.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
