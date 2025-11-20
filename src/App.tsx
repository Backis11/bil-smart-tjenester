
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/MockAuthContext";
import AuthGuard from "@/components/AuthGuard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import RegistrationConfirmation from "./pages/RegistrationConfirmation";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import WorkshopDetail from "./pages/WorkshopDetail";
import WorkshopAuth from "./pages/WorkshopAuth";
import WorkshopRegister from "./pages/WorkshopRegister";
import WorkshopDashboard from "./pages/WorkshopDashboard";
import CarValuation from "./components/CarValuation";
import ValuationSelection from "./components/ValuationSelection";
import ServiceDiscovery from "./components/ServiceDiscovery";
import ServiceRequestForm from "./components/ServiceRequestForm";
import Documents from "./pages/Documents";
import CarDetail from "./pages/CarDetail";
import ResetPassword from "./pages/ResetPassword";
import Blog from "./pages/Blog";
import AddCar from "./pages/AddCar";
import ServiceRequestThankYou from "./pages/ServiceRequestThankYou";
import AdminWorkshops from "./pages/AdminWorkshops";
import WorkshopDirectory from "./pages/WorkshopDirectory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={
              <AuthGuard requireAuth={false}>
                <Auth />
              </AuthGuard>
            } />
            <Route path="/registration-confirmation" element={<RegistrationConfirmation />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/profile" element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            } />
            <Route path="/settings" element={
              <AuthGuard>
                <Settings />
              </AuthGuard>
            } />
            <Route path="/car/:id" element={
              <AuthGuard>
                <div className="min-h-screen bg-gray-50">
                  <CarDetail />
                </div>
              </AuthGuard>
            } />
            <Route path="/valuation" element={
              <AuthGuard>
                <ValuationSelection />
              </AuthGuard>
            } />
            <Route path="/valuation/:id" element={
              <AuthGuard>
                <CarValuation />
              </AuthGuard>
            } />
            <Route path="/services" element={<ServiceDiscovery />} />
            <Route path="/workshops" element={<WorkshopDirectory />} />
            <Route path="/workshop/:id" element={<WorkshopDetail />} />
            <Route path="/get-quote" element={
              <AuthGuard>
                <div className="min-h-screen bg-gray-50">
                  <div className="p-4">
                    <ServiceRequestForm />
                  </div>
                </div>
              </AuthGuard>
            } />
            <Route path="/get-quote/thank-you" element={
              <AuthGuard>
                <ServiceRequestThankYou />
              </AuthGuard>
            } />
            <Route path="/documents" element={
              <AuthGuard>
                <Documents />
              </AuthGuard>
            } />
            <Route path="/sell-car" element={
              <AuthGuard>
                <div className="min-h-screen bg-gray-50">
                  <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Selg bil</h1>
                    <p>Salgsplattform kommer snart...</p>
                  </div>
                </div>
              </AuthGuard>
            } />
            <Route path="/add-car" element={
              <AuthGuard>
                <AddCar />
              </AuthGuard>
            } />
            <Route path="/admin/workshops" element={
              <AuthGuard>
                <AdminWorkshops />
              </AuthGuard>
            } />
            <Route path="/workshop-login" element={<WorkshopAuth />} />
            <Route path="/workshop-register" element={<WorkshopRegister />} />
            <Route path="/workshop-dashboard" element={
              <AuthGuard>
                <WorkshopDashboard />
              </AuthGuard>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
