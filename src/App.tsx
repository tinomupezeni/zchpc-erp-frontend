import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SalesPage from "./pages/SalesPage";
import AccountingPage from "./pages/AccountingPage";
import ProcurementPage from "./pages/ProcurementPage";
import HRPage from "./pages/HRPage";
import InventoryPage from "./pages/InventoryPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public route - redirect to dashboard if authenticated */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected routes inside MainLayout */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/sales" element={
              <ProtectedRoute requiredPermission="sales">
                <MainLayout>
                  <SalesPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/accounting" element={
              <ProtectedRoute requiredPermission="accounting">
                <MainLayout>
                  <AccountingPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/procurement" element={
              <ProtectedRoute requiredPermission="procurement">
                <MainLayout>
                  <ProcurementPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/hr" element={
              <ProtectedRoute requiredPermission="hr">
                <MainLayout>
                  <HRPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/inventory" element={
              <ProtectedRoute requiredPermission="inventory">
                <MainLayout>
                  <InventoryPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute requiredPermission="admin">
                <MainLayout>
                  <SettingsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
