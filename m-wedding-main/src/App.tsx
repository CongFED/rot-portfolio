import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import TemplatesPage from "./pages/TemplatesPage.tsx";
import TemplateDetailPage from "./pages/TemplateDetailPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import BuilderPage from "./pages/BuilderPage.tsx";
import InvitationPage from "./pages/InvitationPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/templates/:id" element={<TemplateDetailPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/project/:id" element={<ProjectDetailPage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/invitation" element={<InvitationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
