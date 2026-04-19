import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Plus, 
  Settings, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Monitor, 
  Smartphone, 
  Undo2, 
  Redo2, 
  Save, 
  Eye, 
  Code,
  Type,
  Image as ImageIcon,
  Grid,
  CreditCard,
  Mail,
  Info,
  Layers,
  X,
  Copy,
  MessageSquare,
  Zap,
  Users,
  BarChart3,
  HelpCircle,
  Briefcase,
  Palette
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useBuilderStore } from './store';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// ... existing imports ...

const ImageUpload: React.FC<{ 
  onUpload: (url: string) => void, 
  currentUrl?: string 
}> = ({ onUpload, currentUrl }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `builder/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      onUpload(url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {currentUrl && (
        <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 group">
          <img src={currentUrl} alt="Current" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={() => onUpload('')}
              className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
      <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${uploading ? 'bg-gray-50 border-gray-200' : 'bg-gray-50 hover:bg-brand-accent/5 border-gray-200 hover:border-brand-accent/30'}`}>
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {uploading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-accent" />
          ) : (
            <>
              <ImageIcon size={24} className="text-gray-400 mb-2" />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Click to upload</p>
            </>
          )}
        </div>
        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" disabled={uploading} />
      </label>
    </div>
  );
};
import { VisualRenderer } from './VisualRenderer';
import { BlockType, BlockDefinition, PageSchema } from './types';
import { motion, AnimatePresence } from 'motion/react';

import { PRESET_TEMPLATES } from './templates';

const BLOCK_DEFINITIONS: BlockDefinition[] = [
  {
    type: 'hero',
    label: 'Hero Section',
    icon: Layout,
    defaultContent: {
      title: 'Design Your Future',
      subtitle: 'Build amazing websites in minutes with our professional-grade visual builder.',
      buttonText: 'Get Started',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    },
    defaultStyle: {
      backgroundColor: '#ffffff',
      textAlign: 'center',
      padding: '100px 0'
    }
  },
  {
    type: 'features',
    label: 'Features Grid',
    icon: Grid,
    defaultContent: {
      title: 'Powerful Features',
      subtitle: 'Everything you need to succeed online.',
      items: [
        { title: 'Fast Performance', description: 'Optimized for speed and SEO out of the box.' },
        { title: 'Responsive Design', description: 'Looks great on every device, from mobile to desktop.' },
        { title: 'Easy Customization', description: 'Change colors, fonts, and layouts with a few clicks.' }
      ]
    },
    defaultStyle: {
      backgroundColor: '#f9fafb',
      padding: '80px 0'
    }
  },
  {
    type: 'pricing',
    label: 'Pricing Table',
    icon: CreditCard,
    defaultContent: {
      title: 'Simple Pricing',
      subtitle: 'Choose the plan that works best for you.',
      items: [
        { name: 'Starter', price: '29', features: ['1 Project', 'Basic Support', 'Free Domain'] },
        { name: 'Pro', price: '79', features: ['Unlimited Projects', 'Priority Support', 'Custom Analytics'], popular: true },
        { name: 'Enterprise', price: '199', features: ['Dedicated Server', '24/7 Support', 'Custom SLA'] }
      ]
    },
    defaultStyle: {
      backgroundColor: '#ffffff',
      padding: '80px 0'
    }
  },
  {
    type: 'testimonials',
    label: 'Testimonials',
    icon: MessageSquare,
    defaultContent: {
      title: 'What Our Clients Say',
      items: [
        { name: 'John Doe', role: 'CEO', text: 'This platform changed the way we do business.' },
        { name: 'Jane Smith', role: 'Designer', text: 'The visual builder is incredibly intuitive and powerful.' }
      ]
    },
    defaultStyle: {
      backgroundColor: '#f3f4f6',
      padding: '80px 0'
    }
  },
  {
    type: 'cta',
    label: 'Call to Action',
    icon: Zap,
    defaultContent: {
      title: 'Ready to get started?',
      subtitle: 'Join thousands of happy customers today.',
      buttonText: 'Sign Up Now'
    },
    defaultStyle: {
      backgroundColor: '#FF6B00',
      textColor: '#ffffff',
      padding: '60px 0',
      textAlign: 'center'
    }
  },
  {
    type: 'about',
    label: 'About Section',
    icon: Info,
    defaultContent: {
      title: 'Our Story',
      description: 'We started with a simple goal: to make web design accessible to everyone. Today, we help thousands of businesses grow their online presence.',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
    },
    defaultStyle: {
      padding: '80px 0'
    }
  },
  {
    type: 'contact',
    label: 'Contact Info',
    icon: Mail,
    defaultContent: {
      title: 'Get In Touch',
      subtitle: 'Have questions? We are here to help.',
      email: 'hello@example.com',
      phone: '+1 (555) 000-0000'
    },
    defaultStyle: {
      backgroundColor: '#111827',
      padding: '80px 0'
    }
  },
  {
    type: 'services',
    label: 'Services',
    icon: Briefcase,
    defaultContent: {
      title: 'Our Services',
      subtitle: 'What we do best',
      items: [
        { title: 'Design', desc: 'Creative solutions' },
        { title: 'Dev', desc: 'Technical excellence' },
        { title: 'Growth', desc: 'Marketing strategies' }
      ]
    },
    defaultStyle: { backgroundColor: '#ffffff', padding: '80px 0' }
  },
  {
    type: 'gallery',
    label: 'Gallery',
    icon: ImageIcon,
    defaultContent: {
      title: 'Our Work',
      subtitle: 'A glimpse of our projects',
      items: [
        { url: 'https://picsum.photos/seed/1/800/600' },
        { url: 'https://picsum.photos/seed/2/800/600' },
        { url: 'https://picsum.photos/seed/3/800/600' },
        { url: 'https://picsum.photos/seed/4/800/600' }
      ]
    },
    defaultStyle: { backgroundColor: '#ffffff', padding: '80px 0' }
  },
  {
    type: 'stats',
    label: 'Statistics',
    icon: BarChart3,
    defaultContent: {
      items: [
        { label: 'Clients', value: '500+' },
        { label: 'Projects', value: '1.2k' },
        { label: 'Years', value: '10+' },
        { label: 'Awards', value: '25' }
      ]
    },
    defaultStyle: { backgroundColor: '#111827', padding: '60px 0' }
  },
  {
    type: 'team',
    label: 'Team Members',
    icon: Users,
    defaultContent: {
      title: 'Meet the Team',
      subtitle: 'The people behind the magic',
      items: [
        { name: 'Alex Rivera', role: 'CEO', image: 'https://picsum.photos/seed/alex/400/400' },
        { name: 'Sarah Chen', role: 'Designer', image: 'https://picsum.photos/seed/sarah/400/400' },
        { name: 'Marcus Thorne', role: 'CTO', image: 'https://picsum.photos/seed/marcus/400/400' }
      ]
    },
    defaultStyle: { backgroundColor: '#ffffff', padding: '80px 0' }
  },
  {
    type: 'caseStudies',
    label: 'Case Studies',
    icon: Briefcase,
    defaultContent: {
      title: 'Success Stories',
      subtitle: 'See how we helped local businesses grow.',
      items: [
        { 
          client: 'Main Street Bakery', 
          problem: 'Limited online visibility and low local foot traffic.',
          solution: 'Designed a modern, SEO-optimized website with integrated local booking and mobile-friendly menu.',
          outcomes: ['30% increase in online inquiries', 'Improved search ranking for local keywords', 'Higher weekend foot traffic']
        },
        { 
          client: 'City Auto Repair', 
          problem: 'Outdated website and no easy way for customers to schedule repairs.',
          solution: 'Implemented a clean, professional site with an easy-to-use online appointment booking system.',
          outcomes: ['Reduced phone support load by 40%', 'Streamlined scheduling process', 'Positive customer feedback on site usability']
        }
      ]
    },
    defaultStyle: {
      backgroundColor: '#ffffff',
      padding: '80px 0'
    }
  },
  {
    type: 'faq',
    label: 'FAQ Accordion',
    icon: HelpCircle,
    defaultContent: {
      title: 'Common Questions',
      items: [
        { q: 'Is it easy?', a: 'Yes, very!' },
        { q: 'Is it fast?', a: 'Blazing fast.' }
      ]
    },
    defaultStyle: { backgroundColor: '#f9fafb', padding: '80px 0' }
  },
  {
    type: 'footer',
    label: 'Site Footer',
    icon: Layout,
    defaultContent: {
      title: 'BRAND',
    },
    defaultStyle: {
      backgroundColor: '#ffffff',
      padding: '40px 0'
    }
  }
];

interface VisualBuilderProps {
  initialSchema?: PageSchema | null;
  onChange?: (schema: PageSchema) => void;
}

export const VisualBuilder: React.FC<VisualBuilderProps> = ({ initialSchema, onChange }) => {
  const { 
    schema, 
    selectedBlockId, 
    setSchema,
    addBlock, 
    updateBlock, 
    removeBlock, 
    reorderBlocks, 
    duplicateBlock,
    selectBlock,
    undo,
    redo
  } = useBuilderStore();

  const onChangeRef = React.useRef(onChange);

  const lastEmittedSchemaRef = React.useRef<string | null>(null);
  const lastReceivedInitialSchemaRef = React.useRef<string | null>(null);
  const isMounting = React.useRef(true);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (initialSchema) {
      const initialSchemaStr = JSON.stringify(initialSchema);
      
      if (lastReceivedInitialSchemaRef.current !== initialSchemaStr) {
        lastReceivedInitialSchemaRef.current = initialSchemaStr;
        
        // Also prevent echoing back the same thing parent just gave us
        lastEmittedSchemaRef.current = initialSchemaStr;
        
        setSchema(initialSchema);
      }
    }
  }, [initialSchema, setSchema]);

  useEffect(() => {
    // Skip emitting if the current schema matches what we just received from the parent
    if (onChangeRef.current) {
      const currentSchemaStr = JSON.stringify(schema);
      if (
        lastEmittedSchemaRef.current !== currentSchemaStr &&
        lastReceivedInitialSchemaRef.current !== currentSchemaStr
      ) {
        lastEmittedSchemaRef.current = currentSchemaStr;
        onChangeRef.current(schema);
      }
    }
  }, [schema]);

  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'blocks' | 'templates' | 'theme' | 'layers'>('blocks');

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderBlocks(result.source.index, result.destination.index);
  };

  const selectedBlock = schema.blocks.find(b => b.id === selectedBlockId);

  const setByPath = (obj: any, path: string, value: any) => {
    const nextObj = { ...obj };
    const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
    let current = nextObj;
    
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (Array.isArray(current[part])) {
        current[part] = [...current[part]];
      } else if (current[part] === undefined || current[part] === null) {
        current[part] = {};
      } else {
        current[part] = { ...current[part] };
      }
      current = current[part];
    }
    
    current[parts[parts.length - 1]] = value;
    return nextObj;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Left Sidebar - Block Library */}
        <div className="w-72 bg-white border-r border-gray-200 flex flex-col z-30">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <Layers size={18} className="text-brand-accent" />
            Builder
          </h2>
          <div className="flex gap-1">
            <button onClick={undo} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-gray-900">
              <Undo2 size={16} />
            </button>
            <button onClick={redo} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-gray-900">
              <Redo2 size={16} />
            </button>
          </div>
        </div>

        <div className="flex p-2 bg-gray-50 m-4 rounded-xl flex-wrap justify-center">
          <button 
            onClick={() => setActiveTab('blocks')}
            className={`flex-1 min-w-[60px] py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTab === 'blocks' ? 'bg-white shadow-sm text-brand-accent' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Blocks
          </button>
          <button 
            onClick={() => setActiveTab('layers')}
            className={`flex-1 min-w-[60px] py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTab === 'layers' ? 'bg-white shadow-sm text-brand-accent' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Layers
          </button>
          <button 
            onClick={() => setActiveTab('templates')}
            className={`flex-1 min-w-[60px] py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTab === 'templates' ? 'bg-white shadow-sm text-brand-accent' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Templates
          </button>
          <button 
            onClick={() => setActiveTab('theme')}
            className={`flex-1 min-w-[60px] py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTab === 'theme' ? 'bg-white shadow-sm text-brand-accent' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Theme
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeTab === 'layers' && (
            <div className="space-y-2 pb-10">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="sidebar-layers">
                  {(provided: any) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {schema.blocks.map((block, index) => {
                        const def = BLOCK_DEFINITIONS.find(d => d.type === block.type);
                        const Icon = def?.icon || Layers;
                        return (
                          // @ts-ignore
                          <Draggable key={`layer-${block.id}`} draggableId={`layer-${block.id}`} index={index}>
                            {(provided: any, snapshot: any) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`group flex items-center gap-3 p-3 rounded-xl border transition-all ${
                                  selectedBlockId === block.id 
                                    ? 'bg-brand-accent/5 border-brand-accent text-brand-accent shadow-sm' 
                                    : 'bg-white border-gray-100 text-gray-700 hover:border-gray-200'
                                } ${snapshot.isDragging ? 'shadow-xl z-50' : ''}`}
                                onClick={() => selectBlock(block.id)}
                              >
                                <div 
                                  {...provided.dragHandleProps} 
                                  className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing p-1 -ml-2"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Grid size={14} />
                                </div>
                                <Icon size={16} className={selectedBlockId === block.id ? 'text-brand-accent' : 'text-gray-400'} />
                                <div className="flex-1 text-sm font-medium truncate capitalize">
                                  {def?.label || block.type}
                                </div>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeBlock(block.id);
                                  }}
                                  className="text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity -mr-2"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              
              {schema.blocks.length === 0 && (
                <div className="text-center py-10 px-4 text-gray-400 text-xs font-medium border-2 border-dashed border-gray-200 rounded-xl">
                  No layers yet. Add a block to get started.
                </div>
              )}
            </div>
          )}

          {activeTab === 'blocks' && (
            BLOCK_DEFINITIONS.map((def) => (
              <button
                key={def.type}
                onClick={() => addBlock(def.type, def.defaultContent, def.defaultStyle)}
                className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-brand-accent/5 border border-gray-100 hover:border-brand-accent/30 rounded-2xl transition-all group text-left"
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-brand-accent shadow-sm transition-colors">
                  <def.icon size={20} />
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">{def.label}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">Add Block</div>
                </div>
              </button>
            ))
          )}

          {activeTab === 'templates' && (
            PRESET_TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  if (window.confirm('This will replace your current design. Continue?')) {
                    setSchema(JSON.parse(JSON.stringify(template)));
                  }
                }}
                className="w-full p-4 bg-gray-50 hover:bg-brand-accent/5 border border-gray-100 hover:border-brand-accent/30 rounded-2xl transition-all group text-left"
              >
                <div className="aspect-video bg-white rounded-lg mb-3 border border-gray-100 overflow-hidden flex items-center justify-center text-gray-300">
                  <Layout size={32} />
                </div>
                <div className="font-bold text-sm text-gray-900">{template.name}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">Load Template</div>
              </button>
            ))
          )}

          {activeTab === 'theme' && (
            <div className="space-y-8 p-2">
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Primary Color</label>
                <div className="grid grid-cols-5 gap-2">
                  {['#FF6B00', '#4DE1FF', '#111827', '#3B82F6', '#10B981'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSchema({ 
                        ...schema, 
                        globalStyle: { ...schema.globalStyle, primaryColor: color } 
                      })}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        schema.globalStyle?.primaryColor === color ? 'border-brand-accent scale-110' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Font Family</label>
                <div className="space-y-2">
                  {['Inter', 'Space Grotesk', 'Outfit', 'Playfair Display'].map((font) => (
                    <button
                      key={font}
                      onClick={() => setSchema({ 
                        ...schema, 
                        globalStyle: { ...schema.globalStyle, fontFamily: font } 
                      })}
                      className={`w-full p-3 rounded-xl text-left text-sm font-medium border transition-all ${
                        schema.globalStyle?.fontFamily === font ? 'border-brand-accent bg-brand-accent/5 text-brand-accent' : 'border-gray-100 hover:bg-gray-50'
                      }`}
                      style={{ fontFamily: font }}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full py-3 bg-brand-primary text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Toolbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setPreviewMode('desktop')}
                className={`p-1.5 rounded-lg transition-all ${previewMode === 'desktop' ? 'bg-white shadow-sm text-brand-accent' : 'text-gray-400 hover:text-gray-900'}`}
              >
                <Monitor size={18} />
              </button>
              <button 
                onClick={() => setPreviewMode('mobile')}
                className={`p-1.5 rounded-lg transition-all ${previewMode === 'mobile' ? 'bg-white shadow-sm text-brand-accent' : 'text-gray-400 hover:text-gray-900'}`}
              >
                <Smartphone size={18} />
              </button>
            </div>
            <div className="h-6 w-px bg-gray-200" />
            <div className="text-sm font-medium text-gray-500">
              Editing: <span className="text-gray-900 font-bold">{schema.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button onClick={undo} className="p-2 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-gray-900"><Undo2 size={16} /></button>
              <button onClick={redo} className="p-2 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-gray-900"><Redo2 size={16} /></button>
            </div>
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to clear the entire canvas?')) {
                  setSchema({ ...schema, blocks: [] });
                }
              }}
              className="px-4 py-2 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all flex items-center gap-2"
            >
              <Trash2 size={18} />
              Clear
            </button>
            <button 
              onClick={() => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(schema, null, 2));
                const downloadAnchorNode = document.createElement('a');
                downloadAnchorNode.setAttribute("href",     dataStr);
                downloadAnchorNode.setAttribute("download", `${schema.name.toLowerCase().replace(/\s+/g, '-')}-schema.json`);
                document.body.appendChild(downloadAnchorNode);
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
              }}
              className="px-4 py-2 bg-brand-accent text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
            >
              <Code size={18} />
              Export JSON
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-8 flex justify-center">
          <div 
            className={`bg-white shadow-2xl transition-all duration-500 overflow-hidden relative ${
              previewMode === 'mobile' ? 'w-[375px] rounded-[3rem] border-[12px] border-gray-900 h-[812px]' : 'w-full max-w-5xl rounded-2xl min-h-full'
            }`}
          >
              <Droppable droppableId="blocks">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-full">
                    {schema.blocks.length === 0 ? (
                      <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-gray-400 gap-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200">
                          <Plus size={32} />
                        </div>
                        <p className="font-medium">Drag or click components to start building</p>
                      </div>
                    ) : (
                      schema.blocks.map((block, index) => (
                        // @ts-ignore
                        <Draggable key={block.id} draggableId={block.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`relative group ${snapshot.isDragging ? 'z-50' : ''}`}
                            >
                              {/* Block Toolbar */}
                              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 p-1 bg-brand-primary rounded-full shadow-xl transition-all duration-300 ${
                                selectedBlockId === block.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none group-hover:opacity-100 group-hover:scale-100'
                              }`}>
                                <div {...provided.dragHandleProps} className="p-1.5 text-white/60 hover:text-white cursor-grab active:cursor-grabbing">
                                  <Grid size={14} />
                                </div>
                                <div className="w-px h-4 bg-white/10 mx-1" />
                                <button 
                                  onClick={() => removeBlock(block.id)}
                                  className="p-1.5 text-white/60 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                                <button 
                                  onClick={() => duplicateBlock(block.id)}
                                  className="p-1.5 text-white/60 hover:text-brand-accent transition-colors"
                                >
                                  <Copy size={14} />
                                </button>
                                <button 
                                  onClick={() => reorderBlocks(index, index - 1)}
                                  disabled={index === 0}
                                  className="p-1.5 text-white/60 hover:text-white disabled:opacity-30 transition-colors"
                                >
                                  <ChevronUp size={14} />
                                </button>
                                <button 
                                  onClick={() => reorderBlocks(index, index + 1)}
                                  disabled={index === schema.blocks.length - 1}
                                  className="p-1.5 text-white/60 hover:text-white disabled:opacity-30 transition-colors"
                                >
                                  <ChevronDown size={14} />
                                </button>
                              </div>

                              <div 
                                onClick={() => selectBlock(block.id)}
                                className={`transition-all duration-300 ${
                                  selectedBlockId === block.id ? 'ring-2 ring-brand-accent ring-inset' : ''
                                }`}
                              >
                                <VisualRenderer 
                                  schema={{ ...schema, blocks: [block] }} 
                                  isEditing={true}
                                  onContentChange={(id, field, value) => {
                                    const currentBlock = schema.blocks.find(b => b.id === id);
                                    if (currentBlock) {
                                      const newContent = setByPath(currentBlock.content, field, value);
                                      updateBlock(id, { content: newContent });
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Style Manager */}
      <AnimatePresence>
        {selectedBlock && (
          <motion.div 
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="w-80 bg-white border-l border-gray-200 flex flex-col z-30"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Settings size={18} className="text-brand-accent" />
                Styles
              </h2>
              <button onClick={() => selectBlock(null)} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Block Type */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Block Type</label>
                <select 
                  value={selectedBlock.type}
                  onChange={(e) => {
                    const type = e.target.value as BlockType;
                    const def = BLOCK_DEFINITIONS.find(d => d.type === type);
                    if (def) {
                      updateBlock(selectedBlock.id, { 
                        type, 
                        content: { ...def.defaultContent, ...selectedBlock.content } 
                      });
                    }
                  }}
                  className="w-full p-3 bg-gray-100 rounded-xl text-sm font-bold border-none focus:ring-2 focus:ring-brand-accent/20 outline-none appearance-none cursor-pointer"
                >
                  {BLOCK_DEFINITIONS.map(def => (
                    <option key={def.type} value={def.type}>{def.label}</option>
                  ))}
                </select>
              </div>

              {/* Background Color */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Background Color</label>
                <div className="grid grid-cols-5 gap-2">
                  {['#ffffff', '#f9fafb', '#f3f4f6', '#111827', '#FF6B00', '#4DE1FF'].map((color) => (
                    <button
                      key={color}
                      onClick={() => updateBlock(selectedBlock.id, { style: { ...selectedBlock.style, backgroundColor: color } })}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedBlock.style.backgroundColor === color ? 'border-brand-accent scale-110' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Background Image */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Background Image</label>
                <ImageUpload 
                  currentUrl={selectedBlock.style.backgroundImage}
                  onUpload={(url) => updateBlock(selectedBlock.id, { 
                    style: { ...selectedBlock.style, backgroundImage: url } 
                  })}
                />
                {selectedBlock.style.backgroundImage && (
                  <button 
                    onClick={() => updateBlock(selectedBlock.id, { 
                      style: { ...selectedBlock.style, backgroundImage: '' } 
                    })}
                    className="text-[10px] text-red-500 font-bold uppercase"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              {/* Text Color */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Text Color</label>
                <div className="grid grid-cols-5 gap-2">
                  {['#111827', '#4b5563', '#9ca3af', '#ffffff', '#FF6B00'].map((color) => (
                    <button
                      key={color}
                      onClick={() => updateBlock(selectedBlock.id, { style: { ...selectedBlock.style, textColor: color } })}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedBlock.style.textColor === color ? 'border-brand-accent scale-110' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Text Alignment */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Alignment</label>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  {(['left', 'center', 'right'] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => updateBlock(selectedBlock.id, { style: { ...selectedBlock.style, textAlign: align } })}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                        selectedBlock.style.textAlign === align ? 'bg-white shadow-sm text-brand-accent' : 'text-gray-400 hover:text-gray-900'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              {/* Border Radius */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Border Radius</label>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  {['0px', '12px', '24px', '999px'].map((radius) => (
                    <button
                      key={radius}
                      onClick={() => updateBlock(selectedBlock.id, { style: { ...selectedBlock.style, borderRadius: radius } })}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                        selectedBlock.style.borderRadius === radius ? 'bg-white shadow-sm text-brand-accent' : 'text-gray-400 hover:text-gray-900'
                      }`}
                    >
                      {radius === '999px' ? 'Full' : radius}
                    </button>
                  ))}
                </div>
              </div>

              {/* Padding */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vertical Padding</label>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  step="10"
                  value={parseInt(selectedBlock.style.padding?.split(' ')[0] || '80')}
                  onChange={(e) => updateBlock(selectedBlock.id, { style: { ...selectedBlock.style, padding: `${e.target.value}px 0` } })}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                  <span>0px</span>
                  <span>{selectedBlock.style.padding || '80px 0'}</span>
                  <span>200px</span>
                </div>
              </div>

              {/* Vertical Margin */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vertical Margin</label>
                <input 
                  type="range" 
                  min="-100" 
                  max="100" 
                  step="10"
                  value={parseInt(selectedBlock.style.margin?.split(' ')[0] || '0')}
                  onChange={(e) => updateBlock(selectedBlock.id, { style: { ...selectedBlock.style, margin: `${e.target.value}px 0` } })}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                  <span>-100px</span>
                  <span>{selectedBlock.style.margin || '0px 0'}</span>
                  <span>100px</span>
                </div>
              </div>

              {/* Content Editor Fallback */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Content Fields</label>
                <div className="space-y-4">
                  {Object.entries(selectedBlock.content).map(([key, value]) => {
                    if (typeof value !== 'string') return null;
                    
                    if (key.toLowerCase().includes('imageurl') || key.toLowerCase() === 'image') {
                      return (
                        <div key={key} className="space-y-1.5">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">{key}</label>
                          <ImageUpload 
                            currentUrl={value}
                            onUpload={(url) => updateBlock(selectedBlock.id, { 
                              content: { ...selectedBlock.content, [key]: url } 
                            })}
                          />
                        </div>
                      );
                    }

                    return (
                      <div key={key} className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">{key}</label>
                        <textarea
                          value={value}
                          onChange={(e) => updateBlock(selectedBlock.id, { 
                            content: { ...selectedBlock.content, [key]: e.target.value } 
                          })}
                          className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all min-h-[80px] resize-none"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </DragDropContext>
  );
};
