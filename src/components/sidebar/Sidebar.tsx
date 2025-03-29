import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useTheme } from 'next-themes';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard' },
    { name: 'AI Agents', icon: 'agents' },
    { name: 'Blockchain', icon: 'blockchain' },
    { name: 'Templates', icon: 'templates' },
    { name: 'History', icon: 'history' },
    { name: 'Settings', icon: 'settings' }
  ];
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
    navigate('/');
  };
  
  return (
    <div className="h-full flex flex-col bg-card border-r border-input">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flow-node-ai to-flow-node-blockchain flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <line x1="22" x2="2" y1="12" y2="12"></line>
              <polyline points="5.45 5.11 2 12 5.45 18.89"></polyline>
              <polyline points="18.55 5.11 22 12 18.55 18.89"></polyline>
            </svg>
          </div>
          <span className="font-bold text-lg">FlowChain AI</span>
        </div>
        
        <ScrollArea className="flex-1 h-[calc(100vh-13rem)]">
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start hover:bg-secondary/80"
              >
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </div>
      
      <div className="mt-auto p-4">
        <Separator className="my-4" />
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-flow-node-ai flex items-center justify-center text-white font-semibold">
            U
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">User Name</p>
            <p className="text-xs text-muted-foreground">user@example.com</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleLogout}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Log Out
        </Button>
      </div>
    </div>
  );
};

function getIcon(iconName: string) {
  switch (iconName) {
    case 'dashboard':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <rect width="7" height="9" x="3" y="3" rx="1"></rect>
          <rect width="7" height="5" x="14" y="3" rx="1"></rect>
          <rect width="7" height="9" x="14" y="12" rx="1"></rect>
          <rect width="7" height="5" x="3" y="16" rx="1"></rect>
        </svg>
      );
    case 'agents':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <path d="M12 2a4 4 0 0 1 4 4c0 1.95-.76 3.54-1.89 4.48A4 4 0 0 1 12 14a4 4 0 0 1-2.11-3.52C8.76 9.54 8 7.95 8 6a4 4 0 0 1 4-4Z"></path>
          <path d="M10 9a6 6 0 0 0-6 6c0 1.86.5 3.48 1.38 4.82a22.5 22.5 0 0 0 5.31 5.18c.4.28.8.51 1.19.69a1.9 1.9 0 0 0 2.24 0c.39-.18.79-.41 1.19-.69a22.5 22.5 0 0 0 5.31-5.18A10.43 10.43 0 0 0 22 15a6 6 0 0 0-6-6"></path>
        </svg>
      );
    case 'blockchain':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <path d="M12 8v8"></path>
          <path d="m8.5 14 7-4"></path>
          <path d="m8.5 10 7 4"></path>
        </svg>
      );
    case 'templates':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <rect width="8" height="8" x="3" y="3" rx="2"></rect>
          <rect width="8" height="8" x="13" y="3" rx="2"></rect>
          <rect width="8" height="8" x="3" y="13" rx="2"></rect>
          <rect width="8" height="8" x="13" y="13" rx="2"></rect>
        </svg>
      );
    case 'history':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
          <path d="M3 3v5h5"></path>
          <path d="M12 7v5l4 2"></path>
        </svg>
      );
    case 'settings':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      );
    default:
      return null;
  }
}

export default Sidebar;
