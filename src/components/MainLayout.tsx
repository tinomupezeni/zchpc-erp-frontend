import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart3, 
  LayoutDashboard, 
  LogOut, 
  Settings, 
  Users,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  path: string;
  permission: string;
}

// Navigation items with permissions
const navItems: SidebarItem[] = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', permission: 'admin' },
  { title: 'HR', icon: Users, path: '/hr', permission: 'hr' },
  // { title: 'Sales', icon: ShoppingCart, path: '/sales', permission: 'sales' },
  // { title: 'Accounting', icon: CreditCard, path: '/accounting', permission: 'accounting' },
  // { title: 'Procurement', icon: FileText, path: '/procurement', permission: 'procurement' },
  // { title: 'Inventory', icon: Package, path: '/inventory', permission: 'inventory' },
  { title: 'Settings', icon: Settings, path: '/settings', permission: 'admin' },
];

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, checkPermission } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 z-20 flex h-full flex-col border-r bg-card transition-all duration-300 ease-in-out",
          collapsed ? "w-[70px]" : "w-[240px]",
          "hidden md:flex"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 py-4">
          <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">ZCHPC ERP</span>
              </div>
            )}
            {collapsed && (
              <BarChart3 className="h-6 w-6 text-primary" />
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className={cn("h-8 w-8", collapsed && "hidden")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {collapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="absolute -right-4 top-9 h-8 w-8 rounded-full border bg-background shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            {navItems.map((item) => 
              // Only show menu items the user has permission to see
              checkPermission(item.permission) && (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  className={cn(
                    "justify-start h-10",
                    collapsed && "justify-center px-2"
                  )}
                  onClick={() => handleNavigation(item.path)}
                >
                  <item.icon className={cn("h-4 w-4 mr-2", collapsed && "mr-0")} />
                  {!collapsed && <span>{item.title}</span>}
                </Button>
              )
            )}
          </nav>
        </div>
        <div className="mt-auto border-t p-4">
          <div className={cn("flex items-center", collapsed && "justify-center")}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="ml-2">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.role}</p>
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            className={cn(
              "mt-2 w-full justify-start text-muted-foreground",
              collapsed && "justify-center px-0"
            )}
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center h-16 px-4 border-b bg-card w-full justify-between">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">ZCHPC ERP</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 z-50 w-3/4 bg-card shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">ZCHPC ERP</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="grid gap-1 p-4">
              {navItems.map((item) => 
                checkPermission(item.permission) && (
                  <Button
                    key={item.path}
                    variant={location.pathname === item.path ? "secondary" : "ghost"}
                    className="justify-start h-10 w-full"
                    onClick={() => handleNavigation(item.path)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.title}</span>
                  </Button>
                )
              )}
              <Separator className="my-2" />
              <div className="flex items-center p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.role}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-muted-foreground"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        "md:ml-[240px]",
        collapsed && "md:ml-[70px]",
      )}>
        <div className="container py-6 md:py-8 px-4 md:px-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
