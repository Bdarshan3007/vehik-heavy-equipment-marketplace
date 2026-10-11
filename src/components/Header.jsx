import { useState } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import {
  ShieldCheck,
  Layers,
  Bookmark,
  Zap,
  ChevronDown,
  Truck,
  UserCheck,
  Bell,
  CheckCircle2,
  X,
  Menu,
  Sparkles,
  Search,
  LogOut,
  Building2,
  FileText
} from "lucide-react";
export const Header = () => {
  const {
    role,
    setRole,
    activeView,
    setActiveView,
    favorites,
    compareIds,
    setIsComparisonOpen,
    setIsQuickRfqOpen,
    notifications,
    markNotificationAsRead,
    clearNotifications,
    showNotification,
    currentUser,
    openAuthModal,
    logout
  } = useMarketplace();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const roleLabels = {
    customer: {
      title: "Customer Rental",
      subtitle: "Rent heavy machinery & commercial fleet",
      short: "Customer",
      icon: UserCheck
    },
    provider: {
      title: "Fleet Owner",
      subtitle: "List equipment & accept booking orders",
      short: "Fleet Owner",
      icon: Truck
    },
    admin: {
      title: "Operations Admin",
      subtitle: "Verify equipment, load charts & escrows",
      short: "Admin",
      icon: ShieldCheck
    }
  };
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setRoleDropdownOpen(false);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    if (newRole === "customer") {
      setActiveView("marketplace");
      showNotification("Switched to Customer Rental Portal", "info");
    } else if (newRole === "provider") {
      setActiveView("provider_dashboard");
      showNotification("Switched to Fleet Owner Console", "info");
    } else {
      setActiveView("admin_dashboard");
      showNotification("Switched to Admin Portal", "info");
    }
  };
  const handleQuickSearchClick = () => {
    setActiveView("marketplace");
    const el = document.getElementById("featured-deployments");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  const getUserInitials = (name) => {
    return name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  };
  return <header className="sticky top-0 z-50 select-none bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-slate-950/50 transition-all">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {
    /* ========================================================================= */
  }
        {
    /* ZONE 1: BRAND LOGO (Minimalist, Iconic & Modern)                          */
  }
        {
    /* ========================================================================= */
  }
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveView("marketplace");
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group text-left cursor-pointer transition-transform active:scale-95 shrink-0"
          >
            {/* Glowing Monogram Emblem */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center font-black text-slate-950 text-base sm:text-lg shadow-md shadow-amber-500/25 group-hover:shadow-amber-500/50 transition-all duration-300">
              V
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                VEHIK
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
          </button>

          {
    /* Clean live status pill badge */
  }
          <div className="hidden xl:inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>14,820+ Fleet Online</span>
          </div>
        </div>

        {
    /* ========================================================================= */
  }
        {
    /* ZONE 2: CENTER FLOATING NAVIGATION CAPSULE (Clean & Sorted)               */
  }
        {
    /* ========================================================================= */
  }
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-full backdrop-blur-md shadow-inner text-xs font-medium text-slate-300">
          <button
            onClick={() => {
              setActiveView("marketplace");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeView === "marketplace"
                ? "bg-white/15 text-white font-bold shadow-sm"
                : "hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            Browse Fleet
          </button>

          <button
            onClick={() => {
              setActiveView("categories");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeView === "categories"
                ? "bg-white/15 text-white font-bold shadow-sm"
                : "hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            Categories
          </button>

          <button
            onClick={() => {
              setActiveView("routes");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeView === "routes"
                ? "bg-white/15 text-white font-bold shadow-sm"
                : "hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            Routes
          </button>

          <button
            onClick={() => {
              setActiveView("ai_matcher");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activeView === "ai_matcher"
                ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30"
                : "text-amber-400 hover:text-amber-300 hover:bg-white/[0.06]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Matcher</span>
          </button>

          <button
            onClick={() => {
              setActiveView("why_rent");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeView === "why_rent"
                ? "bg-white/15 text-white font-bold shadow-sm"
                : "hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            Why Rent
          </button>
        </nav>

        {
    /* ========================================================================= */
  }
        {
    /* ZONE 3: SORTED ACTION CONTROLS & AUTH PROFILE                             */
  }
        {
    /* ========================================================================= */
  }
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Grouped Utility Pill Container (Search, Saved, Compare, Alerts) */}
          <div className="flex items-center gap-0.5 bg-white/[0.04] border border-white/[0.08] rounded-full p-1 shadow-inner">
            
            {/* Quick Search - hidden on mobile */}
            <button
              onClick={handleQuickSearchClick}
              className="hidden sm:inline-flex p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Search Machinery Fleet"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Compare Trigger (Only visible or emphasized when items exist) */}
            {compareIds.length > 0 && (
              <button
                onClick={() => setIsComparisonOpen(true)}
                className="flex items-center gap-1 px-2 py-1 sm:px-2.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold transition-all cursor-pointer"
                title="Compare Selected Machines"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono text-[10px]">{compareIds.length}</span>
              </button>
            )}

            {/* Saved Items - hidden on mobile, accessible in drawer */}
            <button
              onClick={() => setActiveView("customer_dashboard")}
              className="hidden sm:inline-flex p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all relative cursor-pointer"
              title="Saved Fleet Items"
            >
              <Bookmark className="w-4 h-4" />
              {favorites.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />}
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-950 animate-pulse" />}
              </button>

              {/* Clean Popover Dropdown - fixed for mobile to prevent overflow */}
              {notificationsOpen && (
                <div className="fixed left-3 right-3 top-16 sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-3 sm:w-92 max-w-sm bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-3 z-50 overflow-hidden">
                  <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-white font-bold">
                      Notifications {unreadCount > 0 && `(${unreadCount})`}
                    </span>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearNotifications}
                        className="text-[11px] text-slate-400 hover:text-amber-400 cursor-pointer"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-xs text-slate-400">
                        No new notifications
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`p-3.5 text-xs transition-colors cursor-pointer hover:bg-white/5 ${!n.read ? "bg-amber-500/5" : ""}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-white truncate">{n.title}</span>
                            <span className="text-[10px] text-slate-500 shrink-0 font-mono ml-2">{n.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {n.description}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {
    /* ========================================================================= */
  }
          {
    /* USER ACCOUNT & AUTHENTICATION CONTROLS                                    */
  }
          {
    /* ========================================================================= */
  }
          {currentUser ? (
    /* Logged In User Avatar Dropdown */
    <div className="relative">
              <button
      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
      className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-full text-xs text-white transition-all cursor-pointer shadow-sm group"
    >
                {
      /* Monogram circle */
    }
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold text-[11px] flex items-center justify-center shadow-inner">
                  {getUserInitials(currentUser.name)}
                </div>

                <div className="text-left hidden sm:block">
                  <div className="font-semibold text-xs text-slate-200 group-hover:text-white flex items-center gap-1">
                    <span>{currentUser.name.split(" ")[0]}</span>
                    {currentUser.isVerified && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  </div>
                </div>

                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {
      /* User Profile Menu Popover */
    }
              {userDropdownOpen && <div
      className="absolute right-0 mt-3 w-72 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150"
      onClick={() => setUserDropdownOpen(false)}
    >
                  {
      /* Profile Header Details */
    }
                  <div className="p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl mb-2">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center">
                        {getUserInitials(currentUser.name)}
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-bold text-sm text-white truncate flex items-center gap-1">
                          <span>{currentUser.name}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {currentUser.companyName}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] pt-2 border-t border-white/5">
                      <span className="font-mono text-amber-400 uppercase tracking-wider font-semibold">
                        {currentUser.role === "customer" ? "\u{1F3D7}\uFE0F Contractor" : currentUser.role === "provider" ? "\u{1F69B} Fleet Owner" : "\u{1F6E1}\uFE0F Admin"}
                      </span>
                      {currentUser.gstin && <span className="text-slate-400 font-mono">
                          GST: {currentUser.gstin.slice(0, 8)}...
                        </span>}
                    </div>
                  </div>

                  {
      /* Menu Options */
    }
                  <div className="space-y-1 text-xs">
                    <button
      onClick={() => setActiveView("customer_dashboard")}
      className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2.5 transition-colors cursor-pointer"
    >
                      <FileText className="w-4 h-4 text-amber-400" />
                      <span>My Bookings & Quotes</span>
                    </button>

                    <button
      onClick={() => setActiveView("customer_dashboard")}
      className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors cursor-pointer"
    >
                      <div className="flex items-center gap-2.5">
                        <Bookmark className="w-4 h-4 text-emerald-400" />
                        <span>Saved Fleet</span>
                      </div>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                        {favorites.length}
                      </span>
                    </button>

                    {currentUser.role === "provider" && <button
      onClick={() => setActiveView("provider_dashboard")}
      className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2.5 transition-colors cursor-pointer"
    >
                        <Truck className="w-4 h-4 text-amber-400" />
                        <span>Fleet Console & Earnings</span>
                      </button>}

                    {currentUser.role === "admin" && <button
      onClick={() => setActiveView("admin_dashboard")}
      className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2.5 transition-colors cursor-pointer"
    >
                        <ShieldCheck className="w-4 h-4 text-blue-400" />
                        <span>Operations Command</span>
                      </button>}

                    <div className="pt-2 border-t border-white/5 mt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setRoleDropdownOpen(true);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span>Switch Role View</span>
                      </button>

                      <button
      onClick={logout}
      className="w-full text-left px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 flex items-center gap-2.5 transition-colors cursor-pointer"
    >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>}
            </div>
  ) : (
    /* Logged Out: Sign In & Create Account Buttons */
    <div className="flex items-center gap-1.5">
              <button
      onClick={() => openAuthModal("login")}
      className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
    >
                Log In
              </button>

              <button
      onClick={() => openAuthModal("signup")}
      className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-full transition-all cursor-pointer shadow-sm"
    >
                Create Account
              </button>
            </div>
  )}

          {/* Primary High-Value CTA Button - desktop and tablet only (mobile uses bottom bar RFQ) */}
          <button
            onClick={() => setIsQuickRfqOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 active:scale-95 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-amber-500/25 cursor-pointer whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 fill-current shrink-0" />
            <span>Get Quote</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE SLIDE-DOWN DRAWER & BACKDROP OVERLAY                              */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-16 bg-black/70 backdrop-blur-sm z-40 transition-opacity animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 z-50 bg-slate-950/98 backdrop-blur-2xl border-t border-white/10 px-4 sm:px-5 py-5 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto pb-28 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {
    /* User Status Bar on Mobile */
  }
          {currentUser ? <div className="p-3 bg-white/[0.04] border border-white/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                  {getUserInitials(currentUser.name)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{currentUser.name}</span>
                    {currentUser.isVerified && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  </div>
                  <div className="text-[10px] text-slate-400">{currentUser.companyName}</div>
                </div>
              </div>
              <button
    onClick={logout}
    className="text-[11px] text-rose-400 hover:underline font-semibold"
  >
                Sign Out
              </button>
            </div> : <div className="grid grid-cols-2 gap-2">
              <button
    onClick={() => {
      setMobileMenuOpen(false);
      openAuthModal("login");
    }}
    className="py-2.5 text-xs font-bold text-white bg-slate-800 rounded-xl"
  >
                Log In
              </button>
              <button
    onClick={() => {
      setMobileMenuOpen(false);
      openAuthModal("signup");
    }}
    className="py-2.5 text-xs font-bold text-slate-950 bg-amber-500 rounded-xl"
  >
                Create Account
              </button>
            </div>}

          {
    /* Mobile Role Switcher Pill Bar */
  }
          <div className="p-2.5 bg-white/[0.03] border border-white/10 rounded-2xl">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center justify-between">
              <span>Switch Portal View:</span>
              <span className="text-amber-400 font-semibold">{roleLabels[role]?.short}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-white/10 text-xs">
              <button
    onClick={() => handleRoleChange("customer")}
    className={`py-2 px-1 rounded-lg font-semibold flex flex-col items-center gap-1 transition-all ${role === "customer" ? "bg-amber-500 text-slate-950 font-bold shadow-sm" : "text-slate-400 hover:text-white"}`}
  >
                <UserCheck className="w-4 h-4" />
                <span className="text-[10px]">Customer</span>
              </button>
              <button
    onClick={() => handleRoleChange("provider")}
    className={`py-2 px-1 rounded-lg font-semibold flex flex-col items-center gap-1 transition-all ${role === "provider" ? "bg-amber-500 text-slate-950 font-bold shadow-sm" : "text-slate-400 hover:text-white"}`}
  >
                <Truck className="w-4 h-4" />
                <span className="text-[10px]">Fleet Owner</span>
              </button>
              <button
    onClick={() => handleRoleChange("admin")}
    className={`py-2 px-1 rounded-lg font-semibold flex flex-col items-center gap-1 transition-all ${role === "admin" ? "bg-amber-500 text-slate-950 font-bold shadow-sm" : "text-slate-400 hover:text-white"}`}
  >
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px]">Admin</span>
              </button>
            </div>
          </div>

          {
    /* Mobile Quick Utilities (Saved Items & Compare) */
  }
          <div className="grid grid-cols-2 gap-2">
            <button
    onClick={() => {
      setActiveView("customer_dashboard");
      setMobileMenuOpen(false);
    }}
    className="flex items-center justify-between p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-slate-300 hover:text-white"
  >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-emerald-400" />
                <span>Saved Fleet</span>
              </span>
              <span className="font-mono text-[10px] bg-slate-800 text-emerald-300 px-2 py-0.5 rounded-full">{favorites.length}</span>
            </button>
            <button
    onClick={() => {
      if (compareIds.length > 0) {
        setIsComparisonOpen(true);
      } else {
        showNotification("Select machines using the compare button on cards first", "info");
      }
      setMobileMenuOpen(false);
    }}
    className="flex items-center justify-between p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-slate-300 hover:text-white"
  >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Compare</span>
              </span>
              <span className="font-mono text-[10px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded-full">{compareIds.length}</span>
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => {
                setActiveView("marketplace");
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeView === "marketplace"
                  ? "bg-white/10 text-amber-400 font-bold border border-amber-400/20"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              Browse Fleet
            </button>

            <button
              onClick={() => {
                setActiveView("categories");
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeView === "categories"
                  ? "bg-white/10 text-amber-400 font-bold border border-amber-400/20"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              Categories
            </button>

            <button
              onClick={() => {
                setActiveView("routes");
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeView === "routes"
                  ? "bg-white/10 text-amber-400 font-bold border border-amber-400/20"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              Transport Routes
            </button>

            <button
              onClick={() => {
                setActiveView("ai_matcher");
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeView === "ai_matcher"
                  ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30"
                  : "text-amber-400 hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Matcher</span>
            </button>

            <button
              onClick={() => {
                setActiveView("why_rent");
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeView === "why_rent"
                  ? "bg-white/10 text-amber-400 font-bold border border-amber-400/20"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              Why Rent
            </button>
          </div>

          {/* Mobile Quote CTA */}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setIsQuickRfqOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Request Rapid Quote</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop / Global Role Selection Modal */}
      {roleDropdownOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setRoleDropdownOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-white animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="role-switcher-title"
          >
            {/* Ambient accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-t-2xl sm:rounded-t-3xl" />

            {/* Modal Header */}
            <div className="flex items-start justify-between mb-5 pt-1 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="role-switcher-title" className="text-base font-serif font-bold text-white">
                    Switch Role View
                  </h3>
                  <p className="text-xs text-slate-400">
                    Select a platform perspective to explore
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setRoleDropdownOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close role selector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Role Options */}
            <div className="space-y-2.5 mb-5">
              {(["customer", "provider", "admin"]).map((r) => {
                const item = roleLabels[r];
                const IconComponent = item.icon;
                const isCurrent = role === r;

                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleChange(r)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                      isCurrent
                        ? "bg-amber-500/15 border-amber-500/50 text-white shadow-sm ring-1 ring-amber-500/30"
                        : "bg-slate-800/50 border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                          isCurrent
                            ? "bg-amber-500 text-slate-950 font-bold"
                            : "bg-slate-700/60 text-slate-300 group-hover:bg-slate-700 group-hover:text-white"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{item.title}</span>
                          {isCurrent && (
                            <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-mono font-bold">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                          isCurrent
                            ? "border-amber-400 bg-amber-400 text-slate-950"
                            : "border-slate-600 text-transparent group-hover:border-slate-400"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Cancel Button */}
            <div className="flex justify-end pt-3 border-t border-white/5">
              <button
                type="button"
                onClick={() => setRoleDropdownOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
              >
                Close without changing
              </button>
            </div>
          </div>
        </div>
      )}
    </header>;
};
