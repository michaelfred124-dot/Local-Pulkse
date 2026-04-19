import React from 'react';
import { PortfolioItem } from '../../types';

export const IframeTemplate: React.FC<{ item: PortfolioItem; url: string }> = ({ item, url }) => {
  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex flex-col">
      <iframe 
        src={url} 
        className="w-full h-full flex-1 border-0 min-h-screen" 
        title={item.title}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
};
