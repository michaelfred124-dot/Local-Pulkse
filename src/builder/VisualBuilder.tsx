import React, { useEffect, useState } from 'react';
import { ChaiBuilderEditor, registerChaiMediaManager, registerChaiTopBar } from "@chaibuilder/sdk";
import { registerCustomBlocks } from "../chai/chai-setup";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PageSchema } from './types';
import { GoogleGenAI } from "@google/genai";
import { Smartphone, Tablet, Monitor, Rocket, Loader2 } from 'lucide-react';

interface VisualBuilderProps {
  initialSchema?: PageSchema;
  onChange?: (schema: PageSchema) => void;
}

// Global flag to ensure one-time registration
let isChaiSDKReady = false;

const VisualBuilder: React.FC<VisualBuilderProps> = ({ initialSchema, onChange }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isChaiSDKReady) {
      // Initialize Chai Setup
      registerCustomBlocks();

      // Register a custom brand logo in the top bar
      const TopBarLogo = React.forwardRef<HTMLDivElement, any>((props, ref) => (
        <div ref={ref} {...props} className="flex items-center gap-3 px-6 h-full border-r border-[#e5e5e5] mr-2 bg-[#fdfdfd]">
          <div className="w-7 h-7 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm ring-1 ring-black/5">
            <Rocket size={14} className="text-white drop-shadow-sm" />
          </div>
          <span className="text-[15px] font-bold tracking-tight text-gray-900 font-sans">CMS Builder</span>
        </div>
      ));
      TopBarLogo.displayName = "TopBarLogo";
      registerChaiTopBar(TopBarLogo);
      
      // Media Manager using Firebase
      registerChaiMediaManager(({ onSelect, close }) => {
          const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
              const storageRef = ref(storage, `builder/${Date.now()}_${file.name}`);
              await uploadBytes(storageRef, file);
              const url = await getDownloadURL(storageRef);
              onSelect({ url });
              close();
            } catch (error) {
              console.error("Upload failed", error);
              alert("Upload failed. Please try again.");
            }
          };

          return (
            <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
                <h3 className="text-2xl font-bold mb-6 tracking-tight">Upload Image</h3>
                <p className="text-gray-500 mb-8 font-medium">Select an image to add to your project. High-quality visuals make a difference.</p>
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-brand-accent/20 rounded-2xl cursor-pointer hover:bg-brand-accent/5 hover:border-brand-accent/40 transition-all group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    </div>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-brand-accent/60 font-bold uppercase tracking-widest">SVG, PNG, JPG (MAX. 5MB)</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                </label>
                <div className="mt-8 flex justify-end">
                  <button onClick={close} className="px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">Cancel</button>
                </div>
              </div>
            </div>
          );
      });
      isChaiSDKReady = true;
    }
    setMounted(true);
  }, []);

  const handleSave = async ({ blocks, autoSave }: { blocks: any[]; autoSave: boolean }) => {
    if (onChange) {
      onChange({
        ...initialSchema,
        id: initialSchema?.id || '',
        name: initialSchema?.name || '',
        chaiBlocks: blocks,
        blocks: initialSchema?.blocks || [] // keep old format just in case
      });
    }
    return true;
  };

  const handleSaveWebsiteData = async (data: any) => {
    if (onChange && initialSchema) {
      const updatedSchema = { ...initialSchema };
      if (data.type === "DESIGN_TOKENS") {
        updatedSchema.designTokens = data.data;
      } else if (data.type === "THEME") {
        updatedSchema.theme = data.data;
      }
      onChange(updatedSchema);
    }
    return true;
  };

  const askAiCallBack = async (type: string, prompt: string, blocks: any[]) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const systemInstruction = `You are a web design assistant for Chai Builder. 
      The current blocks are: ${JSON.stringify(blocks)}.
      User wants to: ${prompt}.
      Type of request: ${type}.
      Return the updated blocks as JSON. Do not include markdown. Only return the JSON array of blocks.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-latest",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json"
        }
      });

      const text = response.text;
      if (text) {
        return { blocks: JSON.parse(text) };
      }
      return { error: "Failed to generate AI response" };
    } catch (error) {
      console.error("AI Assistant Error", error);
      return { error: "AI service unavailable" };
    }
  };

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-brand-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <ChaiBuilderEditor
        blocks={initialSchema?.chaiBlocks || []}
        designTokens={initialSchema?.designTokens}
        theme={initialSchema?.theme}
        onSave={handleSave}
        onSaveWebsiteData={handleSaveWebsiteData}
        askAiCallBack={askAiCallBack}
        autoSave={true}
        loading={false}
        languages={['en', 'es', 'fr']}
        breakpoints={[
          { title: "Mobile", content: "375px", breakpoint: "xs", icon: <Smartphone size={14} />, width: 375 },
          { title: "Tablet", content: "768px", breakpoint: "md", icon: <Tablet size={14} />, width: 768 },
          { title: "Desktop", content: "1280px", breakpoint: "lg", icon: <Monitor size={14} />, width: 1280 },
        ]}
        flags={{
            ai: true,
            copyPaste: true,
            exportCode: true,
            importHtml: true,
            darkMode: true,
            dataBinding: true,
            importTheme: true,
            gotoSettings: true,
            dragAndDrop: true,
            validateStructure: true
        }}
      />
    </div>
  );
};

export default VisualBuilder;
export { VisualBuilder };
