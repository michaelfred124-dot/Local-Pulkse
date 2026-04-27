import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { VisualBuilder } from '../src/builder/VisualBuilder';
import { PRESET_TEMPLATES } from '../src/builder/templates';
import { Page } from '../types';

interface SandboxProps {
  onNavigate: (page: Page) => void;
}

const Sandbox: React.FC<SandboxProps> = ({ onNavigate }) => {
  const [schema, setSchema] = useState(PRESET_TEMPLATES[0]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="h-14 border-b border-gray-200 bg-white flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-gray-900 border-l border-gray-200 pl-4">Sandbox Mode</h1>
        </div>
        <button 
          onClick={() => onNavigate('start-project')}
          className="px-4 py-2 bg-brand-accent text-white font-semibold rounded-lg hover:bg-brand-accent/90"
        >
          Create Real Project
        </button>
      </div>
      <div className="flex-grow relative bg-gray-50 overflow-hidden p-6 sm:p-10">
        <div className="w-full h-full bg-white relative overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
          <VisualBuilder 
            initialSchema={schema} 
            onChange={setSchema}
          />
        </div>
      </div>
    </div>
  );
};

export default Sandbox;
