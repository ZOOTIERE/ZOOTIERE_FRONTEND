export interface SidebarProps {
    onLogout?: () => void;
  }

export interface AppLayoutProps {
    children: React.ReactNode;
    
}

export interface CardProps {
  titulo: string;
  subtitulo: string;
  imagenUrl: string;
}

export interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}