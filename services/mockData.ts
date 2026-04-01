import { Page } from '../types';

// Types
export interface Project {
  id: string;
  clientId: string;
  name: string;
  status: 'Lead' | 'Active' | 'Completed' | 'Review';
  progress: number;
  dueDate: string;
  budget: string;
  clientName: string;
  clientEmail: string;
  plan: string;
  maintenance: boolean;
  createdAt: string;
  liveUrl?: string;
  stagingUrl?: string;
  cmsUrl?: string;
  vibe?: string;
  sections?: string[];
}

export interface Message {
  id: string;
  sender: string;
  email: string;
  content: string;
  date: string;
  status: 'New' | 'Read' | 'Replied';
  type: 'contact' | 'support';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  projectId?: string; // Link client to a project
}

export interface WebPage {
  id: string;
  title: string;
  slug: string;
  status: 'Published' | 'Draft';
  lastUpdated: string;
}

// Initial Mock Data
const initialProjects: Project[] = [
  { 
    id: '1', 
    clientId: 'client-1',
    name: 'Local Bakery Rebrand', 
    status: 'Active', 
    progress: 65, 
    dueDate: '2024-03-15', 
    budget: '$49/mo', 
    clientName: 'Sweet Treats', 
    clientEmail: 'bakery@example.com',
    plan: 'starter',
    maintenance: true,
    createdAt: '2024-02-01',
    stagingUrl: 'https://staging.sweet-treats.localpulse.dev',
    liveUrl: 'https://sweettreats.com',
    cmsUrl: 'https://sweettreats.com/admin'
  },
  { 
    id: '2', 
    clientId: 'client-2',
    name: 'Law Firm Website', 
    status: 'Review', 
    progress: 90, 
    dueDate: '2024-03-20', 
    budget: '$100/mo', 
    clientName: 'Smith & Associates', 
    clientEmail: 'law@example.com',
    plan: 'scale',
    maintenance: false,
    createdAt: '2024-01-15',
    stagingUrl: 'https://staging.smith-law.localpulse.dev'
  }
];

const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'John Doe',
    email: 'john@example.com',
    content: 'Interested in a custom e-commerce site.',
    date: '2024-02-24',
    status: 'New',
    type: 'contact'
  }
];

const initialUsers: User[] = [
  { id: 'admin-1', name: 'Admin User', email: 'admin@localpulse.com', role: 'admin' },
  { id: 'client-1', name: 'Jane Doe', email: 'jane@example.com', role: 'client', projectId: '1' }
];

const initialPages: WebPage[] = [
    { id: '1', title: 'Home', slug: '/', status: 'Published', lastUpdated: '2024-02-15' },
    { id: '2', title: 'About Us', slug: '/about', status: 'Published', lastUpdated: '2024-01-20' },
    { id: '3', title: 'Services', slug: '/services', status: 'Draft', lastUpdated: '2024-02-10' },
    { id: '4', title: 'Portfolio', slug: '/portfolio', status: 'Published', lastUpdated: '2024-02-05' },
    { id: '5', title: 'Contact', slug: '/contact', status: 'Published', lastUpdated: '2024-01-15' },
];

// Data Manager Class
class DataManager {
  private projects: Project[] = initialProjects;
  private messages: Message[] = initialMessages;
  private users: User[] = initialUsers;
  private pages: WebPage[] = initialPages;
  private currentUser: User | null = null;

  // Projects
  getProjects() {
    return this.projects;
  }

  getProjectById(id: string) {
    return this.projects.find(p => p.id === id);
  }

  getProjectByClientId(clientId: string) {
    return this.projects.find(p => p.clientId === clientId);
  }

  addProject(project: Omit<Project, 'id' | 'createdAt'>) {
    const newProject: Project = {
      ...project,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.projects = [newProject, ...this.projects];
    return newProject;
  }

  updateProjectStatus(id: string, status: Project['status'], progress: number) {
    this.projects = this.projects.map(p => 
      p.id === id ? { ...p, status, progress } : p
    );
  }

  // Messages
  getMessages() {
    return this.messages;
  }

  addMessage(message: Omit<Message, 'id' | 'date' | 'status'>) {
    const newMessage: Message = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    this.messages = [newMessage, ...this.messages];
    return newMessage;
  }

  markMessageRead(id: string) {
    this.messages = this.messages.map(m => 
      m.id === id ? { ...m, status: 'Read' } : m
    );
  }

  // Pages
  getPages() {
    return this.pages;
  }

  addPage(page: Omit<WebPage, 'id' | 'lastUpdated'>) {
    const newPage: WebPage = {
      ...page,
      id: Math.random().toString(36).substr(2, 9),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    this.pages = [newPage, ...this.pages];
    return newPage;
  }

  deletePage(id: string) {
    this.pages = this.pages.filter(p => p.id !== id);
  }

  // Users & Auth
  login(email: string): User | null {
    const user = this.users.find(u => u.email === email);
    if (user) {
      this.currentUser = user;
      return user;
    }
    // Auto-register client if not exists (for demo flow)
    if (!email.includes('admin')) {
       const newUser: User = {
         id: Math.random().toString(36).substr(2, 9),
         name: email.split('@')[0],
         email,
         role: 'client'
       };
       this.users.push(newUser);
       this.currentUser = newUser;
       return newUser;
    }
    return null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
  }
}

export const dataManager = new DataManager();
