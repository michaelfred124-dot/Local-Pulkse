import React, { useState } from 'react';
import { MySites } from './MySites';
import { ProjectEditor } from './ProjectEditor';
import { Page } from '../types';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  onPreview: (projectId: string) => void;
  selectedPlanId: string;
  onPlanChange: (id: string) => void;
  hasMaintenance: boolean;
  initialProjectId?: string | null;
  onProjectSelect?: (id: string | null) => void;
}

export const Dashboard: React.FC<DashboardProps> = (props) => {
  console.log("Dashboard rendered");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(props.initialProjectId || null);

  const handleSelectProject = (id: string | null) => {
    setSelectedProjectId(id);
    if (props.onProjectSelect) {
      props.onProjectSelect(id);
    }
  };

  if (!selectedProjectId) {
    return <MySites onNavigate={props.onNavigate} onSelectProject={handleSelectProject} />;
  }

  return (
    <ProjectEditor 
      {...props} 
      projectId={selectedProjectId} 
      onBack={() => handleSelectProject(null)}
    />
  );
};
