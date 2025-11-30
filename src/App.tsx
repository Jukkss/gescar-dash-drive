import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ClientLayout } from "@/layouts/ClientLayout";

// Lazy loaded pages
const Landing = lazy(() => import('./pages/Landing/Landing').then(m => ({ default: m.Landing })));
const Login = lazy(() => import('./pages/Login/Login').then(m => ({ default: m.Login })));
const Cadastro = lazy(() => import('./pages/Cadastro/Cadastro').then(m => ({ default: m.Cadastro })));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard').then(m => ({ default: m.Dashboard })));
const Estoque = lazy(() => import('./pages/Estoque/Estoque').then(m => ({ default: m.Estoque })));
const Vendas = lazy(() => import('./pages/Vendas/Vendas').then(m => ({ default: m.Vendas })));
const Reparos = lazy(() => import('./pages/Reparos/Reparos').then(m => ({ default: m.Reparos })));
const NotFound = lazy(() => import('./pages/NotFound'));

// Client pages
const Catalogo = lazy(() => import('./pages/Cliente/Catalogo').then(m => ({ default: m.Catalogo })));
const Perfil = lazy(() => import('./pages/Cliente/Perfil').then(m => ({ default: m.Perfil })));
const Propostas = lazy(() => import('./pages/Cliente/Propostas').then(m => ({ default: m.Propostas })));
const Agendamentos = lazy(() => import('./pages/Cliente/Agendamentos').then(m => ({ default: m.Agendamentos })));

const queryClient = new QueryClient();

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              
              {/* Dashboard Routes - Concessionária */}
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/estoque" element={<Estoque />} />
                <Route path="/vendas" element={<Vendas />} />
                <Route path="/reparos" element={<Reparos />} />
                <Route path="/clientes" element={<Dashboard />} />
                <Route path="/configuracoes" element={<Dashboard />} />
              </Route>

              {/* Client Routes - Cliente */}
              <Route element={<ClientLayout />}>
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/propostas" element={<Propostas />} />
                <Route path="/agendamentos" element={<Agendamentos />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
