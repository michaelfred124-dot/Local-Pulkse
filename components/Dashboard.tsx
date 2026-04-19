import React, { useState, useEffect } from 'react';
import { MySites } from './MySites';
import { ProjectEditor } from './ProjectEditor';
import { Page } from '../types';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  onPreview: (projectId: string) => void;
  selectedPlanId: string;
  onPlanChange: (id: string) => void;
  hasMaintenance: boolean;
  initialProjectId?: string | null;
  onProjectSelect?: (id: string | null) => void;
  initialTab?: string;
}

export const Dashboard: React.FC<DashboardProps> = (props) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(props.initialProjectId || null);
  const [projectStatus, setProjectStatus] = useState<string | null>(null);

  useEffect(() => {
    if (selectedProjectId) {
      const fetchStatus = async () => {
        const docRef = doc(db, 'projects', selectedProjectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProjectStatus(docSnap.data().status);
        }
      };
      fetchStatus();
    } else {
      setProjectStatus(null);
    }
  }, [selectedProjectId]);

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
      initialTab={props.initialTab}
    />
  );
};
