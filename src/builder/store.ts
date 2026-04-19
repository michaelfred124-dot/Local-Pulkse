import { create } from 'zustand';
import { PageSchema, PageBlock, BlockType, BlockContent, BlockStyle } from './types';

interface BuilderState {
  schema: PageSchema;
  selectedBlockId: string | null;
  history: PageSchema[];
  historyIndex: number;
  
  // Actions
  setSchema: (schema: PageSchema) => void;
  addBlock: (type: BlockType, content: BlockContent, style: BlockStyle, index?: number) => void;
  updateBlock: (id: string, updates: Partial<PageBlock>) => void;
  removeBlock: (id: string) => void;
  duplicateBlock: (id: string) => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
  selectBlock: (id: string | null) => void;
  
  // History
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
}

// Helper to generate UUID since we don't have uuid package installed, we can use a simple one
const generateId = () => Math.random().toString(36).substr(2, 9);

export const useBuilderStore = create<BuilderState>((set, get) => ({
  schema: {
    id: 'default',
    name: 'New Page',
    blocks: [],
  },
  selectedBlockId: null,
  history: [],
  historyIndex: -1,

  setSchema: (schema) => set({ schema }),

  saveToHistory: () => {
    const { schema, history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(schema)));
    set({ 
      history: newHistory, 
      historyIndex: newHistory.length - 1 
    });
  },

  addBlock: (type, content, style, index) => {
    const { schema, saveToHistory } = get();
    saveToHistory();
    
    const newBlock: PageBlock = {
      id: generateId(),
      type,
      content,
      style,
    };
    
    const newBlocks = [...schema.blocks];
    if (typeof index === 'number') {
      newBlocks.splice(index, 0, newBlock);
    } else {
      newBlocks.push(newBlock);
    }
    
    set({ 
      schema: { ...schema, blocks: newBlocks },
      selectedBlockId: newBlock.id
    });
  },

  updateBlock: (id, updates) => {
    const { schema, saveToHistory } = get();
    saveToHistory();
    
    const newBlocks = schema.blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    );
    
    set({ schema: { ...schema, blocks: newBlocks } });
  },

  removeBlock: (id) => {
    const { schema, saveToHistory } = get();
    saveToHistory();
    
    const newBlocks = schema.blocks.filter(block => block.id !== id);
    set({ 
      schema: { ...schema, blocks: newBlocks },
      selectedBlockId: null
    });
  },

  duplicateBlock: (id) => {
    const { schema, saveToHistory } = get();
    saveToHistory();
    
    const blockToDuplicate = schema.blocks.find(b => b.id === id);
    if (!blockToDuplicate) return;
    
    const newBlock = {
      ...JSON.parse(JSON.stringify(blockToDuplicate)),
      id: generateId()
    };
    
    const index = schema.blocks.findIndex(b => b.id === id);
    const newBlocks = [...schema.blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    
    set({ 
      schema: { ...schema, blocks: newBlocks },
      selectedBlockId: newBlock.id
    });
  },

  reorderBlocks: (startIndex, endIndex) => {
    const { schema, saveToHistory } = get();
    saveToHistory();
    
    const newBlocks = Array.from(schema.blocks);
    const [removed] = newBlocks.splice(startIndex, 1);
    newBlocks.splice(endIndex, 0, removed);
    
    set({ schema: { ...schema, blocks: newBlocks } });
  },

  selectBlock: (id) => set({ selectedBlockId: id }),

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      set({ 
        schema: JSON.parse(JSON.stringify(history[historyIndex - 1])),
        historyIndex: historyIndex - 1
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      set({ 
        schema: JSON.parse(JSON.stringify(history[historyIndex + 1])),
        historyIndex: historyIndex + 1
      });
    }
  },
}));
