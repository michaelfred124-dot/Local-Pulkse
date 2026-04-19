import React from 'react';
import { PortfolioItem } from '../types';
import { DefaultTemplate } from './templates/DefaultTemplate';
import { IframeTemplate } from './templates/IframeTemplate';
import { ServiceTemplate } from './templates/ServiceTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { WellnessTemplate } from './templates/WellnessTemplate';
import { ArtisanTemplate } from './templates/ArtisanTemplate';
import { ConstructionTemplate } from './templates/ConstructionTemplate';
import { BakeryTemplate } from './templates/BakeryTemplate';
import { DentistTemplate } from './templates/DentistTemplate';
import { LawnCareTemplate } from './templates/LawnCareTemplate';
import { RestaurantTemplate } from './templates/RestaurantTemplate';
import { PlumberTemplate } from './templates/PlumberTemplate';
import { ElectricianTemplate } from './templates/ElectricianTemplate';
import { CleaningTemplate } from './templates/CleaningTemplate';
import { RealEstateTemplate } from './templates/RealEstateTemplate';
import { FitnessTemplate } from './templates/FitnessTemplate';
import { ArtistMinimalTemplate } from './templates/ArtistMinimalTemplate';
import { ArtistCreativeTemplate } from './templates/ArtistCreativeTemplate';
import { HeritageTemplate } from './templates/HeritageTemplate';
import { LocalBusinessTemplate1 } from './templates/LocalBusinessTemplate1';
import { AutoDetailingTemplate } from './templates/AutoDetailingTemplate';

export const TemplateRenderer: React.FC<{ 
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const templateId = item.templateId || '';
  const category = item.category.toLowerCase();
  const title = item.title.toLowerCase();
  
  if (templateId === 'auto-detailing') return <AutoDetailingTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'local-1') return <LocalBusinessTemplate1 item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'construction') return <ConstructionTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'bakery') return <BakeryTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'dentist') return <DentistTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'lawncare') return <LawnCareTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'restaurant') return <RestaurantTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'wellness') return <WellnessTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'artisan') return <ArtisanTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  
  if (templateId === 'plumber') return <PlumberTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'electrician') return <ElectricianTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'cleaning') return <CleaningTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'realestate') return <RealEstateTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'fitness') return <FitnessTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'artist-minimal') return <ArtistMinimalTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'artist-creative') return <ArtistCreativeTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'heritage') return <HeritageTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;

  if (templateId === 'mindbody') return <IframeTemplate item={item} url="https://mind-body-reeducation-1091501855275.us-west1.run.app" />;
  if (templateId === 'forge') return <IframeTemplate item={item} url="https://forge-spark-metal-figurines-1091501855275.us-west1.run.app" />;

  if (templateId === 'service') return <ServiceTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
  if (templateId === 'modern' || templateId === 'corporate') return <ModernTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;

  return <DefaultTemplate item={item} isEditing={isEditing} onUpdate={onUpdate} onImageClick={onImageClick} />;
};

export const TemplateMiniPreview: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(0.28);

  React.useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setScale(width / 1440);
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden bg-white relative pointer-events-none select-none">
      <div 
        className="absolute top-0 left-0 origin-top-left"
        style={{ 
          width: '1440px', 
          height: '1080px', 
          transform: `scale(${scale})`
        }}
      >
        <TemplateRenderer item={item} />
      </div>
      <div className="absolute inset-0 bg-black/[0.02] pointer-events-none"></div>
    </div>
  );
};
