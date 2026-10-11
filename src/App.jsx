import { lazy, Suspense } from "react";
import { MarketplaceProvider, useMarketplace } from "./context/MarketplaceContext";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { SearchConsole } from "./components/SearchConsole";
import { AssetTaxonomy } from "./components/AssetTaxonomy";
import { MachineryCatalog } from "./components/MachineryCatalog";
import { Footer } from "./components/Footer";
import { ComparisonModal } from "./components/modals/ComparisonModal";
import { InspectionAuditModal } from "./components/modals/InspectionAuditModal";
import { BookingModal } from "./components/modals/BookingModal";
import { YardCalculatorModal } from "./components/modals/YardCalculatorModal";
import { RegisterFleetModal } from "./components/modals/RegisterFleetModal";
import { QuickRfqModal } from "./components/modals/QuickRfqModal";
import { ProviderProfileModal } from "./components/modals/ProviderProfileModal";
import { AuthModal } from "./components/modals/AuthModal";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  Truck,
  Sparkles,
  Zap,
  Layers,
  Compass
} from "lucide-react";

// Safe code-splitting for heavy secondary page-level modules and dashboards
const CategoriesPage = lazy(() => import("./pages/CategoriesPage").then((m) => ({ default: m.CategoriesPage })));
const RoutesPage = lazy(() => import("./pages/RoutesPage").then((m) => ({ default: m.RoutesPage })));
const AIMatcherPage = lazy(() => import("./pages/AIMatcherPage").then((m) => ({ default: m.AIMatcherPage })));
const WhyRentPage = lazy(() => import("./pages/WhyRentPage").then((m) => ({ default: m.WhyRentPage })));
const CustomerDashboard = lazy(() => import("./components/CustomerDashboard").then((m) => ({ default: m.CustomerDashboard })));
const ProviderDashboard = lazy(() => import("./components/ProviderDashboard").then((m) => ({ default: m.ProviderDashboard })));
const AdminDashboard = lazy(() => import("./components/AdminDashboard").then((m) => ({ default: m.AdminDashboard })));

const PageLoadingFallback = () => (
  <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-[#535F70] select-none">
    <div className="w-8 h-8 border-2 border-[#D5DCE4] border-t-[#C66A20] rounded-full animate-spin mb-3" />
    <span className="text-xs font-mono uppercase tracking-wider text-[#75777E]">Loading Module...</span>
  </div>
);

const AppContent = () => {
  const {
    activeView,
    setActiveView,
    notification,
    setIsQuickRfqOpen
  } = useMarketplace();

  const handleAIMatchClick = () => {
    setActiveView("ai_matcher");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return <div className="min-h-screen flex flex-col bg-[#F7F6F2] text-[#131B26] font-sans pb-16 md:pb-0">
      {/* Toast Notification */}
      {notification && <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-50 animate-bounce duration-300 pointer-events-none">
          <div className="bg-[#111F35] text-white px-4 py-3 rounded-xl shadow-2xl border border-[#2C4A6F] flex items-center gap-2.5 text-xs font-mono max-w-md mx-auto sm:mx-0">
            {notification.type === "success" && <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />}
            {notification.type === "warning" && <AlertCircle className="w-4 h-4 text-[#F59E0B] shrink-0" />}
            {notification.type === "info" && <Info className="w-4 h-4 text-[#38BDF8] shrink-0" />}
            <span className="line-clamp-2">{notification.message}</span>
          </div>
        </div>}

      {/* Main Top Header */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        <Suspense fallback={<PageLoadingFallback />}>
          {activeView === "marketplace" && <>
              <HeroSection />
              <SearchConsole />
              <AssetTaxonomy />
              <MachineryCatalog />
            </>}

          {activeView === "categories" && <CategoriesPage />}
          {activeView === "routes" && <RoutesPage />}
          {activeView === "ai_matcher" && <AIMatcherPage />}
          {activeView === "why_rent" && <WhyRentPage />}

          {activeView === "customer_dashboard" && <CustomerDashboard />}
          {activeView === "provider_dashboard" && <ProviderDashboard />}
          {activeView === "admin_dashboard" && <AdminDashboard />}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Floating Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111F35]/95 backdrop-blur-md border-t border-[#2C4A6F] px-2 py-1.5 flex items-center justify-around shadow-2xl"
      >
        <button
          onClick={() => {
            setActiveView("marketplace");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors cursor-pointer ${
            activeView === "marketplace" ? "text-[#FF964A] font-bold" : "text-[#ABC8F4] hover:text-white"
          }`}
        >
          <Truck className="w-5 h-5" />
          <span className="text-[10px] font-mono mt-0.5">Browse</span>
        </button>

        <button
          onClick={() => {
            setActiveView("categories");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors cursor-pointer ${
            activeView === "categories" ? "text-[#FF964A] font-bold" : "text-[#ABC8F4] hover:text-white"
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-mono mt-0.5">Categories</span>
        </button>

        {/* Center CTA Button */}
        <button
          onClick={() => setIsQuickRfqOpen(true)}
          className="flex flex-col items-center justify-center -mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3.5 py-2 rounded-2xl shadow-lg shadow-amber-500/30 cursor-pointer active:scale-95 transition-transform"
          title="Instant Quote Request"
        >
          <Zap className="w-5 h-5 fill-current" />
          <span className="text-[9px] font-mono font-black uppercase tracking-tight">RFQ</span>
        </button>

        <button
          onClick={() => {
            setActiveView("routes");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors cursor-pointer ${
            activeView === "routes" ? "text-[#FF964A] font-bold" : "text-[#ABC8F4] hover:text-white"
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-mono mt-0.5">Routes</span>
        </button>

        <button
          onClick={handleAIMatchClick}
          className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors cursor-pointer ${
            activeView === "ai_matcher" ? "text-amber-400 font-bold" : "text-[#ABC8F4] hover:text-white"
          }`}
        >
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-[10px] font-mono mt-0.5">AI Match</span>
        </button>
      </nav>

      {/* Persistent Modals */}
      <ComparisonModal />
      <InspectionAuditModal />
      <BookingModal />
      <YardCalculatorModal />
      <RegisterFleetModal />
      <QuickRfqModal />
      <ProviderProfileModal />
      <AuthModal />
    </div>;
};
export default function App() {
  return <MarketplaceProvider>
      <AppContent />
    </MarketplaceProvider>;
}
