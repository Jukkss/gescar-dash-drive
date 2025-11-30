import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  LayoutGrid,
  User,
  FileText,
  Calendar,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const clientLinks = [
  { name: 'Catálogo', href: '/catalogo', icon: LayoutGrid },
  { name: 'Meu Perfil', href: '/perfil', icon: User },
  { name: 'Minhas Propostas', href: '/propostas', icon: FileText },
  { name: 'Agendamentos', href: '/agendamentos', icon: Calendar },
];

export function ClientLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 z-40',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-border">
          <Link to="/catalogo" className="flex items-center gap-2">
            <Car className="w-8 h-8 text-primary" />
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold"
              >
                Ges<span className="text-gradient">CAR</span>
              </motion.span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-muted-foreground"
          >
            <ChevronRight
              className={cn(
                'w-5 h-5 transition-transform',
                !sidebarOpen && 'rotate-180'
              )}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2">
          {clientLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <link.icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && (
                  <span className="font-medium">{link.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <div className={cn('flex items-center gap-3', !sidebarOpen && 'justify-center')}>
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent font-semibold">
                {user?.name?.charAt(0) || 'C'}
              </span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name || 'Cliente'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || 'email@exemplo.com'}
                </p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className={cn(
              'w-full mt-4 text-muted-foreground hover:text-destructive',
              !sidebarOpen && 'px-0'
            )}
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="ml-2">Sair</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-4 z-40">
        <Link to="/catalogo" className="flex items-center gap-2">
          <Car className="w-7 h-7 text-primary" />
          <span className="text-lg font-bold">
            Ges<span className="text-gradient">CAR</span>
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="lg:hidden fixed inset-0 z-50 bg-background"
          >
            <div className="h-16 flex items-center justify-between px-4 border-b border-border">
              <Link to="/catalogo" className="flex items-center gap-2">
                <Car className="w-7 h-7 text-primary" />
                <span className="text-lg font-bold">
                  Ges<span className="text-gradient">CAR</span>
                </span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <nav className="p-4 space-y-2">
              {clientLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                      isActive
                        ? 'bg-primary/20 text-primary'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    )}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                );
              })}
              <Button
                variant="ghost"
                className="w-full mt-8 text-muted-foreground hover:text-destructive justify-start"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sair
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={cn(
          'flex-1 transition-all duration-300',
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20',
          'pt-16 lg:pt-0'
        )}
      >
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
