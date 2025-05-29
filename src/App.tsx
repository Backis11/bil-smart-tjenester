
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WorkshopDetail from "./pages/WorkshopDetail";
import WorkshopLogin from "./pages/WorkshopLogin";
import WorkshopDashboard from "./pages/WorkshopDashboard";
import CarValuation from "./components/CarValuation";
import ServiceDiscovery from "./components/ServiceDiscovery";
import ServiceRequestForm from "./components/ServiceRequestForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/valuation" element={
            <div className="min-h-screen bg-gray-50">
              <div className="p-4">
                <CarValuation car={{
                  id: 1,
                  brand: "Toyota",
                  model: "Corolla",
                  year: 2020,
                  mileage: 45000,
                  licensePlate: "AB12345"
                }} />
              </div>
            </div>
          } />
          <Route path="/services" element={
            <div className="min-h-screen bg-gray-50">
              <div className="p-4">
                <ServiceDiscovery />
              </div>
            </div>
          } />
          <Route path="/workshop/:id" element={<WorkshopDetail />} />
          <Route path="/get-quote" element={
            <div className="min-h-screen bg-gray-50">
              <div className="p-4">
                <ServiceRequestForm />
              </div>
            </div>
          } />
          <Route path="/workshop-login" element={<WorkshopLogin />} />
          <Route path="/workshop-dashboard" element={<WorkshopDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
