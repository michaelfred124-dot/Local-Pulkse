import React, { createContext, useContext, useEffect } from 'react';
import { PageSchema, PageBlock } from './types';
import { motion } from 'motion/react';
import { useBuilderStore } from './store';
import { RenderChaiBlocks } from "@chaibuilder/sdk/render";
import { registerCustomBlocks } from "../chai/chai-setup";

const EditorContext = createContext<{ isEditing: boolean, onContentChange?: (field: string, value: string) => void }>({ isEditing: false });

interface VisualRendererProps {
  schema: PageSchema;
  isEditing?: boolean;
  onBlockClick?: (id: string) => void;
  onContentChange?: (id: string, field: string, value: string) => void;
}

export const VisualRenderer: React.FC<VisualRendererProps> = ({ 
  schema, 
  isEditing = false,
  onBlockClick,
  onContentChange
}) => {
  useEffect(() => {
    registerCustomBlocks();
  }, []);

  if (schema.chaiBlocks && schema.chaiBlocks.length > 0) {
    return (
      <div 
        className="w-full min-h-screen bg-white"
        style={{ 
          fontFamily: schema.globalStyle?.fontFamily || 'Inter, sans-serif',
          '--color-brand-accent': schema.globalStyle?.primaryColor || '#0066cc'
        } as any}
      >
        <RenderChaiBlocks 
            blocks={schema.chaiBlocks} 
            lang="en" 
        />
      </div>
    );
  }

  return (
    <div 
      className="w-full min-h-screen bg-white"
      style={{ 
        fontFamily: schema.globalStyle?.fontFamily || 'Inter, sans-serif',
        '--color-brand-accent': schema.globalStyle?.primaryColor || '#0066cc'
      } as any}
    >
      {schema.blocks.map((block) => (
        <RenderBlock 
          key={block.id} 
          block={block} 
          isEditing={isEditing}
          onClick={() => onBlockClick?.(block.id)}
          onContentChange={(field, value) => onContentChange?.(block.id, field, value)}
        />
      ))}
    </div>
  );
};

const EditableText = ({ field, value, className, tag: Tag = 'div' }: any) => {
  const { isEditing, onContentChange } = useContext(EditorContext);
  
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (isEditing && onContentChange) {
      onContentChange(field, e.currentTarget.innerText);
    }
  };

  if (!isEditing) return <Tag className={className}>{value}</Tag>;
  
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`${className} ${isEditing ? 'outline-dashed outline-1 outline-gray-300 hover:outline-brand-accent' : ''}`}
    >
      {value}
    </Tag>
  );
};

const RenderBlock: React.FC<{ 
  block: PageBlock; 
  isEditing: boolean;
  onClick: () => void;
  onContentChange: (field: string, value: string) => void;
}> = ({ block, isEditing, onClick, onContentChange }) => {
  const { type, content, style } = block;
  const { selectedBlockId } = useBuilderStore();

  const sectionStyle: React.CSSProperties = {
    backgroundColor: style.backgroundColor || '#ffffff',
    backgroundImage: style.backgroundImage ? `url(${style.backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: style.textColor || 'inherit',
    textAlign: style.textAlign || 'left',
    padding: style.padding || '80px 0',
    margin: style.margin || '0',
    borderRadius: style.borderRadius || '0px'
  };

  const blockWrapper = (children: React.ReactNode) => (
    <EditorContext.Provider value={{ isEditing, onContentChange }}>
      <div 
        className={`relative ${isEditing ? 'hover:ring-2 hover:ring-brand-accent/30' : ''} ${selectedBlockId === block.id ? 'ring-2 ring-brand-accent' : ''}`}
        onClick={onClick}
      >
        {children}
      </div>
    </EditorContext.Provider>
  );

  switch (type) {
    case 'hero':
      return blockWrapper(
        <section 
          className={`relative px-6 overflow-hidden`}
          style={{ ...sectionStyle, textAlign: style.textAlign || 'center' }}
        >
          <div className="container mx-auto relative z-10">
            <EditableText 
              tag="h1" 
              field="title" 
              value={content.title} 
              className="text-5xl md:text-7xl font-black mb-6 tracking-tight" 
            />
            <EditableText 
              tag="p" 
              field="subtitle" 
              value={content.subtitle} 
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto" 
            />
            {content.buttonText && (
              <button className="px-8 py-4 bg-brand-accent text-white rounded-full font-bold hover:scale-105 transition-all">
                <EditableText tag="span" field="buttonText" value={content.buttonText} />
              </button>
            )}
          </div>
          {content.imageUrl && (
            <div className="mt-12 max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl group relative">
              <img src={content.imageUrl} alt="Hero" className="w-full h-full object-cover" />
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <EditableText tag="div" field="imageUrl" value={content.imageUrl} className="text-xs text-white break-all text-center leading-tight" />
                </div>
              )}
            </div>
          )}
        </section>
      );

    case 'features':
      return blockWrapper(
        <section 
          className={`px-6`}
          style={sectionStyle}
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <EditableText 
                tag="h2" 
                field="title" 
                value={content.title} 
                className="text-4xl font-bold mb-4" 
              />
              <EditableText 
                tag="p" 
                field="subtitle" 
                value={content.subtitle} 
                className="text-gray-500 max-w-xl mx-auto" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(content.items || []).map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <EditableText 
                    tag="h3" 
                    field={`items[${i}].title`} 
                    value={item.title} 
                    className="text-xl font-bold mb-4" 
                  />
                  <EditableText 
                    tag="p" 
                    field={`items[${i}].description`} 
                    value={item.description} 
                    className="text-gray-600" 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'about':
      return blockWrapper(
        <section 
          className={`px-6`}
          style={sectionStyle}
        >
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <EditableText 
                tag="h2" 
                field="title" 
                value={content.title} 
                className="text-4xl font-bold mb-6" 
              />
              <EditableText 
                tag="p" 
                field="description" 
                value={content.description} 
                className="text-lg text-gray-600 leading-relaxed" 
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl group relative">
              <img src={content.imageUrl || 'https://picsum.photos/seed/about/800/600'} alt="About" className="w-full h-full object-cover" />
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <EditableText tag="div" field="imageUrl" value={content.imageUrl || 'https://picsum.photos/seed/about/800/600'} className="text-xs text-white break-all text-center leading-tight" />
                </div>
              )}
            </div>
          </div>
        </section>
      );

    case 'contact':
      return blockWrapper(
        <section 
          className={`px-6`}
          style={{ ...sectionStyle, backgroundColor: style.backgroundColor || '#111827', color: style.textColor || '#ffffff' }}
        >
          <div className="container mx-auto max-w-4xl text-center">
            <EditableText 
              tag="h2" 
              field="title" 
              value={content.title} 
              className="text-4xl font-bold mb-6" 
            />
            <EditableText 
              tag="p" 
              field="subtitle" 
              value={content.subtitle} 
              className="text-gray-400 mb-12" 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <div className="font-bold text-brand-accent uppercase text-[10px] tracking-widest">Email</div>
                <EditableText 
                  tag="div" 
                  field="email" 
                  value={content.email || 'hello@example.com'} 
                  className="text-xl font-medium" 
                />
              </div>
              <div className="space-y-4">
                <div className="font-bold text-brand-accent uppercase text-[10px] tracking-widest">Phone</div>
                <EditableText 
                  tag="div" 
                  field="phone" 
                  value={content.phone || '+1 (555) 000-0000'} 
                  className="text-xl font-medium" 
                />
              </div>
            </div>
          </div>
        </section>
      );

    case 'pricing':
      return blockWrapper(
        <section 
          className={`px-6`}
          style={sectionStyle}
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <EditableText tag="h2" field="title" value={content.title} className="text-4xl font-bold mb-4" />
              <EditableText tag="p" field="subtitle" value={content.subtitle} className="text-gray-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(content.items || [
                { name: 'Starter', price: '29', features: ['Feature 1', 'Feature 2'] },
                { name: 'Pro', price: '79', features: ['All Features', 'Priority Support'], popular: true },
                { name: 'Enterprise', price: '199', features: ['Custom Solutions', 'Dedicated Manager'] }
              ]).map((plan: any, i: number) => (
                <div key={i} className={`p-8 rounded-3xl border ${plan.popular ? 'border-brand-accent ring-4 ring-brand-accent/10 scale-105' : 'border-gray-100'} bg-white shadow-xl`}>
                  <div className="text-sm font-bold text-brand-accent uppercase mb-4">
                    <EditableText tag="span" field={`items[${i}].name`} value={plan.name} />
                  </div>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-black">$
                      <EditableText tag="span" field={`items[${i}].price`} value={plan.price} />
                    </span>
                    <span className="text-gray-400">/mo</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {(plan.features || []).map((f: string, j: number) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" /> 
                        <EditableText tag="span" field={`items[${i}].features[${j}]`} value={f} />
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? 'bg-brand-accent text-white shadow-lg' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                    <EditableText tag="span" field={`items[${i}].buttonText`} value={plan.buttonText || 'Choose Plan'} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'cta':
      return blockWrapper(
        <section 
          className={`px-6`}
          style={{ 
            ...sectionStyle,
            backgroundColor: style.backgroundColor || '#FF6B00', 
            color: style.textColor || '#ffffff',
            textAlign: style.textAlign || 'center' as any,
            padding: style.padding || '60px 0'
          }}
        >
          <div className="container mx-auto max-w-4xl">
            <EditableText tag="h2" field="title" value={content.title} className="text-4xl md:text-5xl font-black mb-6" />
            <EditableText tag="p" field="subtitle" value={content.subtitle} className="text-xl opacity-90 mb-10" />
            <button className="px-10 py-4 bg-white text-brand-primary rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl">
              <EditableText tag="span" field="buttonText" value={content.buttonText || 'Get Started'} />
            </button>
          </div>
        </section>
      );

    case 'testimonials':
      return blockWrapper(
        <section 
          className={`px-6`}
          style={{ ...sectionStyle, backgroundColor: style.backgroundColor || '#f3f4f6' }}
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <EditableText tag="h2" field="title" value={content.title} className="text-4xl font-bold mb-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(content.items || [
                { name: 'John Doe', role: 'CEO', text: 'This platform changed the way we do business.' },
                { name: 'Jane Smith', role: 'Designer', text: 'The visual builder is incredibly intuitive and powerful.' }
              ]).map((t: any, i: number) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm italic text-gray-600 relative">
                  <div className="text-4xl text-brand-accent/20 absolute top-4 left-4 font-serif">"</div>
                  <EditableText tag="p" field={`items[${i}].text`} value={t.text} className="relative z-10 mb-6" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full" />
                    <div>
                      <EditableText tag="div" field={`items[${i}].name`} value={t.name} className="font-bold text-gray-900 not-italic" />
                      <EditableText tag="div" field={`items[${i}].role`} value={t.role} className="text-xs text-gray-400 not-italic" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'gallery':
      return blockWrapper(
        <section 
          className={`px-6`}
          style={sectionStyle}
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <EditableText tag="h2" field="title" value={content.title} className="text-4xl font-bold mb-4" />
              <EditableText tag="p" field="subtitle" value={content.subtitle} className="text-gray-500" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(content.items || [
                { url: 'https://picsum.photos/seed/1/800/600' },
                { url: 'https://picsum.photos/seed/2/800/600' },
                { url: 'https://picsum.photos/seed/3/800/600' },
                { url: 'https://picsum.photos/seed/4/800/600' }
              ]).map((img: any, i: number) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-100 group relative">
                  <img 
                    src={img.url} 
                    alt="" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <EditableText tag="div" field={`items[${i}].url`} value={img.url} className="text-[8px] text-white break-all text-center leading-tight" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'stats':
      return blockWrapper(
        <section 
          className={`px-6`}
          style={{ ...sectionStyle, backgroundColor: style.backgroundColor || '#111827', color: style.textColor || '#ffffff', padding: style.padding || '60px 0' }}
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {(content.items || [
                { label: 'Happy Clients', value: '500+' },
                { label: 'Projects Done', value: '1.2k' },
                { label: 'Years Experience', value: '10+' },
                { label: 'Awards Won', value: '25' }
              ]).map((stat: any, i: number) => (
                <div key={i} className="space-y-2">
                  <EditableText tag="div" field={`items[${i}].value`} value={stat.value} className="text-4xl md:text-5xl font-black text-brand-accent" />
                  <EditableText tag="div" field={`items[${i}].label`} value={stat.label} className="text-sm font-bold text-gray-400 uppercase tracking-widest" />
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'team':
      return blockWrapper(
        <section 
          className={`px-6`}
          style={sectionStyle}
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <EditableText tag="h2" field="title" value={content.title} className="text-4xl font-bold mb-4" />
              <EditableText tag="p" field="subtitle" value={content.subtitle} className="text-gray-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {(content.items || [
                { name: 'Alex Rivera', role: 'Founder & CEO', image: 'https://picsum.photos/seed/alex/400/400' },
                { name: 'Sarah Chen', role: 'Lead Designer', image: 'https://picsum.photos/seed/sarah/400/400' },
                { name: 'Marcus Thorne', role: 'CTO', image: 'https://picsum.photos/seed/marcus/400/400' }
              ]).map((member: any, i: number) => (
                <div key={i} className="text-center group">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 ring-4 ring-gray-50 group-hover:ring-brand-accent/20 transition-all">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <EditableText tag="h3" field={`items[${i}].name`} value={member.name} className="text-xl font-bold text-gray-900" />
                  <EditableText tag="p" field={`items[${i}].role`} value={member.role} className="text-brand-accent font-medium text-sm" />
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'faq':
      return blockWrapper(
        <section 
          className={`px-6`}
          style={{ ...sectionStyle, backgroundColor: style.backgroundColor || '#f9fafb' }}
        >
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <EditableText tag="h2" field="title" value={content.title} className="text-4xl font-bold mb-4" />
            </div>
            <div className="space-y-4">
              {(content.items || [
                { q: 'How does it work?', a: 'Our platform uses a schema-driven engine to render components dynamically.' },
                { q: 'Is it responsive?', a: 'Yes, every block is built with a mobile-first approach using Tailwind CSS.' },
                { q: 'Can I export my site?', a: 'Absolutely! You can export your entire page schema as a JSON file.' }
              ]).map((item: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                    <EditableText tag="span" field={`items[${i}].q`} value={item.q} />
                  </h4>
                  <EditableText tag="p" field={`items[${i}].a`} value={item.a} className="text-gray-500 text-sm leading-relaxed" />
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'caseStudies':
      return blockWrapper(
        <section className="px-6" style={sectionStyle}>
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <EditableText tag="h2" field="title" value={content.title} className="text-4xl font-bold mb-4" />
              <EditableText tag="p" field="subtitle" value={content.subtitle} className="text-xl text-gray-600" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.items?.map((item: any, idx: number) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-bold mb-6 text-brand-accent">
                    <EditableText tag="span" field={`items[${idx}].client`} value={item.client} />
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-brand-accent font-bold uppercase tracking-widest mb-1">Problem</p>
                      <EditableText tag="p" field={`items[${idx}].problem`} value={item.problem} className="text-gray-600 font-medium" />
                    </div>
                    <div>
                      <p className="text-xs text-brand-accent font-bold uppercase tracking-widest mb-1">Solution</p>
                      <EditableText tag="p" field={`items[${idx}].solution`} value={item.solution} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-brand-accent font-bold uppercase tracking-widest mb-2">Key Outcomes</p>
                      <ul className="space-y-1">
                        {item.outcomes.map((o: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                            <EditableText tag="span" field={`items[${idx}].outcomes[${i}]`} value={o} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'services':
      return blockWrapper(
        <section 
          className={`px-6`}
          style={sectionStyle}
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <EditableText tag="h2" field="title" value={content.title} className="text-4xl font-bold mb-4" />
              <EditableText tag="p" field="subtitle" value={content.subtitle} className="text-gray-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(content.items || [
                { title: 'Web Design', desc: 'Beautiful, modern interfaces that convert.' },
                { title: 'Development', desc: 'Fast, secure, and scalable applications.' },
                { title: 'Marketing', desc: 'Grow your audience with data-driven strategies.' }
              ]).map((service: any, i: number) => (
                <div key={i} className="p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
                    <div className="w-2 h-2 rounded-full bg-current" />
                  </div>
                  <EditableText tag="h3" field={`items[${i}].title`} value={service.title} className="text-xl font-bold text-gray-900 mb-4" />
                  <EditableText tag="p" field={`items[${i}].desc`} value={service.desc} className="text-gray-500 text-sm leading-relaxed" />
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'footer':
      return (
        <footer 
          onClick={onClick}
          className={`py-12 px-6 border-t border-gray-100 ${isEditing ? 'cursor-pointer hover:ring-2 hover:ring-brand-accent/30' : ''}`}
          style={{ backgroundColor: style.backgroundColor || '#ffffff' }}
        >
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xl font-black tracking-tighter">
              {content.title || 'BRAND'}
            </div>
            <div className="flex gap-8 text-sm font-medium text-gray-500">
              <a href="#">Home</a>
              <a href="#">Services</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
            <div className="text-xs text-gray-400">
              © {new Date().getFullYear()} {content.title || 'Brand'}. All rights reserved.
            </div>
          </div>
        </footer>
      );

    default:
      return (
        <div className="p-12 text-center bg-gray-100 rounded-xl border-2 border-dashed border-gray-300">
          Unknown Block Type: {type}
        </div>
      );
  }
};
