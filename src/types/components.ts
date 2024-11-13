export interface SidebarProps {
    onLogout?: () => void;
  }

export interface AppLayoutProps {
    children: React.ReactNode;
    
}

export interface CardProps {
  id: number;
  titulo: string;
  subtitulo: string;
  imagenUrl: string;
  type?: string;
}

export interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}