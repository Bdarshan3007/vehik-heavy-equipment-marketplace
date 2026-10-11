import { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_LISTINGS,
  INITIAL_PROVIDERS,
  INITIAL_REQUESTS,
  INITIAL_AUDIT_REPORTS,
  INITIAL_REVIEWS
} from "../data/mockData";
const MarketplaceContext = createContext(void 0);
export const MarketplaceProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    try {
      const saved = localStorage.getItem("vehik_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.role) return parsed.role;
      }
    } catch (e) {
      console.warn("Error reading role from vehik_user:", e);
    }
    return "customer";
  });
  const [activeView, setActiveView] = useState("marketplace");
  const [listings, setListings] = useState(() => {
    try {
      const saved = localStorage.getItem("vehik_listings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasTippers = parsed.some((l) => l.category === "tippers");
          const hasPrimeMovers = parsed.some((l) => l.category === "prime_movers");
          if (hasTippers && hasPrimeMovers && parsed.length >= 12) {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_LISTINGS;
  });
  const [providers, setProviders] = useState(() => {
    try {
      const saved = localStorage.getItem("vehik_providers");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Error parsing vehik_providers:", e);
    }
    return INITIAL_PROVIDERS;
  });
  const [requests, setRequests] = useState(() => {
    try {
      const saved = localStorage.getItem("vehik_requests");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Error parsing vehik_requests:", e);
    }
    return INITIAL_REQUESTS;
  });
  const [auditReports] = useState(INITIAL_AUDIT_REPORTS);
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem("vehik_reviews");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Error parsing vehik_reviews:", e);
    }
    return INITIAL_REVIEWS;
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("vehik_favorites");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Error parsing vehik_favorites:", e);
    }
    return ["eq-01"];
  });
  const [compareIds, setCompareIds] = useState(["eq-01", "eq-02"]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCorridor, setSelectedCorridor] = useState("all");
  const [capacityFilter, setCapacityFilter] = useState(0);
  const [riggerFilter, setRiggerFilter] = useState(false);
  const [loadChartFilter, setLoadChartFilter] = useState(false);
  const [turnkeyFuelFilter, setTurnkeyFuelFilter] = useState(false);
  const [geofenceFilter, setGeofenceFilter] = useState(false);
  const [projectShifts, setProjectShifts] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedCorridor("all");
    setCapacityFilter(0);
    setSearchQuery("");
    setRiggerFilter(false);
    setTurnkeyFuelFilter(false);
    setLoadChartFilter(false);
    setGeofenceFilter(false);
  };
  const [activeAuditListing, setActiveAuditListing] = useState(null);
  const [activeBookingListing, setActiveBookingListing] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isYardCalcOpen, setIsYardCalcOpen] = useState(false);
  const [isRegisterFleetOpen, setIsRegisterFleetOpen] = useState(false);
  const [isQuickRfqOpen, setIsQuickRfqOpen] = useState(false);
  const DEMO_USERS = {
    customer: {
      id: "usr-cust-01",
      name: "Darshan Patel",
      email: "darshan@patelinfra.com",
      phone: "+91 98250 14820",
      role: "customer",
      companyName: "Patel Infrastructure & EPC Ltd.",
      gstin: "24AAACP4912K1Z9",
      location: "Ahmedabad & Sanand GIDC",
      isVerified: true,
      memberSince: "March 2024",
      totalBookings: 14,
      avatarUrl: ""
    },
    provider: {
      id: "usr-prov-01",
      providerId: "prov-01",
      name: "Rajesh Varma",
      email: "rajesh@gujaratcrane.com",
      phone: "+91 97129 88320",
      role: "provider",
      companyName: "Gujarat Heavy Lifting & Cranes",
      gstin: "24AACCG1290P1ZQ",
      location: "Sanand Industrial GIDC",
      isVerified: true,
      memberSince: "January 2023",
      activeFleetCount: 28,
      avatarUrl: ""
    },
    admin: {
      id: "usr-admin-01",
      name: "Operations Command",
      email: "admin@vehik.in",
      phone: "1800-419-VEHIK",
      role: "admin",
      companyName: "VEHIK Platform HQ",
      location: "Mumbai & Ahmedabad Hub",
      isVerified: true,
      memberSince: "Launch 2022",
      avatarUrl: ""
    }
  };
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("vehik_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && parsed.id) return parsed;
      }
    } catch (e) {
      console.warn("Error parsing vehik_user from localStorage:", e);
    }
    return DEMO_USERS["customer"];
  });

  const handleSetRole = (newRole) => {
    setRole(newRole);
    // When switching role, sync currentUser to corresponding demo user if currently on a demo user or role mismatch
    if (!currentUser || currentUser.id === "usr-cust-01" || currentUser.id === "usr-prov-01" || currentUser.id === "usr-admin-01" || currentUser.role !== newRole) {
      const demoUser = DEMO_USERS[newRole];
      if (demoUser) {
        setCurrentUser(demoUser);
        localStorage.setItem("vehik_user", JSON.stringify(demoUser));
      }
    }
  };

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");
  const openAuthModal = (mode = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };
  const login = (credentials) => {
    const targetRole = credentials.role || (credentials.emailOrPhone.toLowerCase().includes("fleet") ? "provider" : credentials.emailOrPhone.toLowerCase().includes("admin") ? "admin" : "customer");
    const baseUser = DEMO_USERS[targetRole];
    const isEmail = credentials.emailOrPhone.includes("@");
    const matchedUser = {
      ...baseUser,
      email: isEmail ? credentials.emailOrPhone : baseUser.email,
      phone: !isEmail ? credentials.emailOrPhone : baseUser.phone
    };
    setCurrentUser(matchedUser);
    localStorage.setItem("vehik_user", JSON.stringify(matchedUser));
    setRole(matchedUser.role);
    setIsAuthModalOpen(false);
    showNotification(`Welcome back, ${matchedUser.name}! Signed in as ${targetRole === "customer" ? "Contractor" : targetRole === "provider" ? "Fleet Owner" : "Operations Admin"}.`, "success");
    return true;
  };
  const signup = (data) => {
    const newUser = {
      id: `usr-${Date.now().toString(36)}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      companyName: data.companyName,
      gstin: data.gstin || "",
      location: "Ahmedabad & Western Hub",
      isVerified: true,
      memberSince: "Just now",
      totalBookings: 0,
      activeFleetCount: data.role === "provider" ? 1 : 0
    };
    setCurrentUser(newUser);
    localStorage.setItem("vehik_user", JSON.stringify(newUser));
    setRole(data.role);
    setIsAuthModalOpen(false);
    showNotification(`Account created successfully! Welcome to VEHIK, ${data.name}.`, "success");
  };
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("vehik_user");
    showNotification("You have logged out of your account.", "info");
  };
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "Booking Request Confirmed",
      description: "RFQ-2026-904 (Liebherr 50T Mobile Crane) scheduled for site delivery in Sanand.",
      timestamp: "10 mins ago",
      type: "rfq",
      read: false
    },
    {
      id: "notif-2",
      title: "Safety Inspection Passed",
      description: "CAT 320D3 Hydraulic Excavator certified ready for operation after 48-point safety check.",
      timestamp: "1 hour ago",
      type: "audit",
      read: false
    },
    {
      id: "notif-3",
      title: "Escrow Milestone Secured",
      description: "Institutional trust escrow funded for Western DFC Bridge 24 rock trenching project.",
      timestamp: "3 hours ago",
      type: "escrow",
      read: true
    }
  ]);
  const markNotificationAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };
  const clearNotifications = () => {
    setNotifications([]);
  };
  const [notification, setNotification] = useState(null);
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4e3);
  };
  useEffect(() => {
    localStorage.setItem("vehik_listings", JSON.stringify(listings));
  }, [listings]);
  useEffect(() => {
    localStorage.setItem("vehik_providers", JSON.stringify(providers));
  }, [providers]);
  useEffect(() => {
    localStorage.setItem("vehik_requests", JSON.stringify(requests));
  }, [requests]);
  useEffect(() => {
    localStorage.setItem("vehik_favorites", JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    localStorage.setItem("vehik_reviews", JSON.stringify(reviews));
  }, [reviews]);

  const toggleProviderVerification = (providerId) => {
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === providerId) {
          const nextState = !p.verifiedStatus;
          showNotification(
            nextState ? `${p.name} verified by operations admin` : `${p.name} placed under verification audit`,
            nextState ? "success" : "info"
          );
          return { ...p, verifiedStatus: nextState };
        }
        return p;
      })
    );
  };
  const toggleFavorite = (listingId) => {
    setFavorites((prev) => {
      const exists = prev.includes(listingId);
      const updated = exists ? prev.filter((id) => id !== listingId) : [...prev, listingId];
      showNotification(exists ? "Removed from saved fleet" : "Saved to fleet favorites");
      return updated;
    });
  };
  const toggleCompare = (listingId) => {
    setCompareIds((prev) => {
      if (prev.includes(listingId)) {
        return prev.filter((id) => id !== listingId);
      }
      if (prev.length >= 4) {
        showNotification("Maximum 4 machines can be compared simultaneously", "warning");
        return prev;
      }
      showNotification("Added to comparison deck");
      return [...prev, listingId];
    });
  };
  const clearCompare = () => {
    setCompareIds([]);
  };
  const addListing = (listingData) => {
    const randomNum = Math.floor(1e3 + Math.random() * 9e3);
    const prefix = listingData.category === "cranes" ? "CR" : listingData.category === "trailers" ? "TR" : "EX";
    const newListing = {
      ...listingData,
      id: `eq-${Date.now()}`,
      registrationCode: `VK-${prefix}-${randomNum}`,
      partnerVerified: true,
      rating: 5,
      reviewCount: 0,
      isFeatured: false
    };
    setListings((prev) => [newListing, ...prev]);
    showNotification(`New unit ${newListing.registrationCode} published to active corridor registry!`);
  };
  const updateListing = (id, updates) => {
    setListings((prev) => prev.map((item) => item.id === id ? { ...item, ...updates } : item));
    showNotification("Fleet listing updated successfully");
  };
  const deleteListing = (id) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
    showNotification("Listing removed from registry", "info");
  };
  const togglePauseListing = (id) => {
    setListings((prev) => prev.map((item) => {
      if (item.id === id) {
        const nextState = !item.isPaused;
        showNotification(nextState ? "Listing temporarily paused" : "Listing reactivated on registry");
        return { ...item, isPaused: nextState };
      }
      return item;
    }));
  };
  const submitRequest = (reqData) => {
    const reqNum = `RFQ-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newReq = {
      ...reqData,
      id: `req-${Date.now()}`,
      requestNumber: reqNum,
      createdAt: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 16),
      escrowStatus: "ESCROW_HOLD"
    };
    setRequests((prev) => [newReq, ...prev]);
    showNotification(`Rental request ${reqNum} submitted! Equipment owner notified.`);
  };
  const updateRequestStatus = (id, status, quote) => {
    setRequests((prev) => prev.map((req) => {
      if (req.id === id) {
        return {
          ...req,
          status,
          ...quote !== void 0 ? { quotedAmount: quote } : {}
        };
      }
      return req;
    }));
    showNotification(`Request status updated: ${status}`);
  };
  const updateEscrowStatus = (id, status) => {
    setRequests((prev) => prev.map((req) => req.id === id ? { ...req, escrowStatus: status } : req));
    showNotification(`Payment status updated: ${status.replace("_", " ")}`);
  };
  const addReview = (reviewData) => {
    const newReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    };
    setReviews((prev) => [newReview, ...prev]);
    showNotification("Inspection & service rating posted to equipment ledger!");
  };
  return <MarketplaceContext.Provider value={{
    role,
    setRole: handleSetRole,
    activeView,
    setActiveView,
    listings,
    providers,
    setProviders,
    toggleProviderVerification,
    requests,
    auditReports,
    reviews,
    favorites,
    compareIds,
    selectedCategory,
    setSelectedCategory,
    selectedCorridor,
    setSelectedCorridor,
    capacityFilter,
    setCapacityFilter,
    riggerFilter,
    setRiggerFilter,
    loadChartFilter,
    setLoadChartFilter,
    turnkeyFuelFilter,
    setTurnkeyFuelFilter,
    geofenceFilter,
    setGeofenceFilter,
    projectShifts,
    setProjectShifts,
    searchQuery,
    setSearchQuery,
    resetFilters,
    toggleFavorite,
    toggleCompare,
    clearCompare,
    addListing,
    updateListing,
    deleteListing,
    togglePauseListing,
    submitRequest,
    updateRequestStatus,
    updateEscrowStatus,
    addReview,
    activeAuditListing,
    setActiveAuditListing,
    activeBookingListing,
    setActiveBookingListing,
    selectedProvider,
    setSelectedProvider,
    isComparisonOpen,
    setIsComparisonOpen,
    isYardCalcOpen,
    setIsYardCalcOpen,
    isRegisterFleetOpen,
    setIsRegisterFleetOpen,
    isQuickRfqOpen,
    setIsQuickRfqOpen,
    currentUser,
    setCurrentUser,
    DEMO_USERS,
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    login,
    signup,
    logout,
    notifications,
    markNotificationAsRead,
    clearNotifications,
    notification,
    showNotification
  }}>
      {children}
    </MarketplaceContext.Provider>;
};
export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within MarketplaceProvider");
  }
  return context;
};
