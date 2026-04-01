import React from 'react';
import { PortfolioItem } from '../types';
import { ZenYoga } from './templates/ZenYoga';
import { LegalLink } from './templates/LegalLink';
import { DefaultTemplate } from './templates/DefaultTemplate';
import { UrbanFit } from './templates/UrbanFit';
import { ArtisanBakery } from './templates/ArtisanBakery';
import { ModernDental } from './templates/ModernDental';
import { SparkleClean } from './templates/SparkleClean';
import { PetParadise } from './templates/PetParadise';
import { BistroTemplate } from './templates/BistroTemplate';

export const TemplateRenderer: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  const templateId = item.templateId || '';
  const category = item.category.toLowerCase();
  const title = item.title.toLowerCase();
  
  if (templateId === 'restaurant' || templateId === 'bistro' || title.includes('bistro')) return <BistroTemplate item={item} />;
  if (templateId === 'service' || templateId === 'cleaning' || title.includes('scape') || title.includes('clean')) return <SparkleClean content={item} />;
  if (templateId === 'fitness' || category.includes('health') || title.includes('fit')) return <UrbanFit item={item} />;
  if (templateId === 'corporate' || templateId === 'legal' || category.includes('legal') || category.includes('corporate')) return <LegalLink item={item} />;
  if (templateId === 'portfolio' || templateId === 'cv') return <DefaultTemplate item={item} />;
  
  if (templateId === 'yoga' || title.includes('yoga')) return <ZenYoga item={item} />;
  if (templateId === 'bakery' || category.includes('bakery') || title.includes('market')) return <ArtisanBakery content={item} />;
  if (templateId === 'dental' || category.includes('dental')) return <ModernDental content={item} />;
  if (templateId === 'pet' || category.includes('hospitality') || title.includes('pet')) return <PetParadise content={item} />;
  
  return <DefaultTemplate item={item} />;
};

export const TemplateMiniPreview: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  return (
    <div className="w-full h-full overflow-hidden bg-white relative pointer-events-none select-none">
      <div 
        className="absolute top-0 left-0 origin-top-left"
        style={{ 
          width: '1440px', 
          height: '1080px', 
          transform: 'scale(0.28)' // 400/1440 approx 0.28
        }}
      >
        <TemplateRenderer item={item} />
      </div>
      {/* Subtle overlay to make it look more like a preview */}
      <div className="absolute inset-0 bg-black/[0.02] pointer-events-none"></div>
    </div>
  );
};
