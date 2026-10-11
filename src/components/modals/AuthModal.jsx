import { useState } from "react";
import { useMarketplace } from "../../context/MarketplaceContext";
import {
  X,
  UserCheck,
  Truck,
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  KeyRound
} from "lucide-react";
export const AuthModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    openAuthModal,
    login,
    signup
  } = useMarketplace();
  const isLogin = authModalMode === "login";
  const [loginEmailOrPhone, setLoginEmailOrPhone] = useState("darshan@patelinfra.com");
  const [loginPassword, setLoginPassword] = useState("\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022");
  const [loginRole, setLoginRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [signupRole, setSignupRole] = useState("customer");
  const [signupName, setSignupName] = useState("");
  const [signupCompany, setSignupCompany] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupGstin, setSignupGstin] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(true);
  if (!isAuthModalOpen) return null;
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login({
      emailOrPhone: loginEmailOrPhone,
      password: loginPassword,
      role: loginRole
    });
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim()) return;
    signup({
      name: signupName,
      companyName: signupCompany || `${signupName} Projects`,
      email: signupEmail,
      phone: signupPhone || "+91 98250 14820",
      role: signupRole,
      gstin: signupGstin
    });
  };
  const quickDemoLogin = (role) => {
    if (role === "customer") {
      login({ emailOrPhone: "darshan@patelinfra.com", role: "customer" });
    } else if (role === "provider") {
      login({ emailOrPhone: "rajesh@gujaratcrane.com", role: "provider" });
    } else {
      login({ emailOrPhone: "admin@vehik.in", role: "admin" });
    }
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-slate-900 border border-slate-700/90 rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[92dvh] flex flex-col overflow-hidden shadow-2xl relative text-white animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Light Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

        {/* Modal Header */}
        <div className="p-4 sm:p-7 pb-3 sm:pb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-serif font-black text-lg sm:text-xl shadow-lg shadow-amber-500/20 shrink-0">
              V
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-serif font-bold text-white tracking-tight">
                {isLogin ? "Welcome Back to VEHIK" : "Create Your VEHIK Account"}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
                {isLogin ? "Sign in to access your machinery rentals & site dispatches" : "Join 14,800+ verified fleet contractors and owners"}
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Mode Tabs (Log In vs Create Account) */}
        <div className="px-4 sm:px-7">
          <div className="grid grid-cols-2 p-1 bg-slate-950/60 rounded-2xl border border-slate-800">
            <button
              onClick={() => openAuthModal("login")}
              className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${isLogin ? "bg-amber-500 text-slate-950 font-bold shadow-sm" : "text-slate-400 hover:text-white"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => openAuthModal("signup")}
              className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${!isLogin ? "bg-amber-500 text-slate-950 font-bold shadow-sm" : "text-slate-400 hover:text-white"}`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-7 pt-4 sm:pt-5 overflow-y-auto no-scrollbar flex-1">
          {isLogin ? (
    /* ========================================================================= */
    /* LOGIN FORM                                                                */
    /* ========================================================================= */
    <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {
      /* Role selection toggle */
    }
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Sign in as
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
      type="button"
      onClick={() => {
        setLoginRole("customer");
        setLoginEmailOrPhone("darshan@patelinfra.com");
      }}
      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${loginRole === "customer" ? "bg-amber-500/15 border-amber-500 text-amber-300" : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white"}`}
    >
                    <UserCheck className="w-4 h-4" />
                    <span>Contractor</span>
                  </button>

                  <button
      type="button"
      onClick={() => {
        setLoginRole("provider");
        setLoginEmailOrPhone("rajesh@gujaratcrane.com");
      }}
      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${loginRole === "provider" ? "bg-amber-500/15 border-amber-500 text-amber-300" : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white"}`}
    >
                    <Truck className="w-4 h-4" />
                    <span>Fleet Owner</span>
                  </button>

                  <button
      type="button"
      onClick={() => {
        setLoginRole("admin");
        setLoginEmailOrPhone("admin@vehik.in");
      }}
      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${loginRole === "admin" ? "bg-amber-500/15 border-amber-500 text-amber-300" : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white"}`}
    >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Admin</span>
                  </button>
                </div>
              </div>

              {
      /* Email / Mobile Field */
    }
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Work Email or Mobile Number
                </label>
                <div className="relative">
                  <input
      type="text"
      required
      value={loginEmailOrPhone}
      onChange={(e) => setLoginEmailOrPhone(e.target.value)}
      placeholder="e.g. darshan@patelinfra.com or 9825014820"
      className="w-full h-11 pl-10 pr-4 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
    />
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {
      /* Password Field */
    }
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Password
                  </label>
                  <button
      type="button"
      onClick={() => alert("Password reset link sent to registered email & phone.")}
      className="text-[11px] text-amber-400 hover:underline cursor-pointer"
    >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
      type={showPassword ? "text" : "password"}
      required
      value={loginPassword}
      onChange={(e) => setLoginPassword(e.target.value)}
      placeholder="Enter your password"
      className="w-full h-11 pl-10 pr-10 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-mono"
    />
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
    >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {
      /* Remember me & Escrow status */
    }
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
      type="checkbox"
      checked={rememberMe}
      onChange={(e) => setRememberMe(e.target.checked)}
      className="w-4 h-4 rounded text-amber-500 accent-amber-500 cursor-pointer"
    />
                  <span>Remember this device</span>
                </label>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <Lock className="w-3 h-3" />
                  Escrow 256-bit Secure
                </span>
              </div>

              {
      /* Submit Sign In Button */
    }
              <button
      type="submit"
      className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/25 active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
    >
                <span>Sign In to Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {
      /* Quick 1-Click Demo Profiles */
    }
              <div className="pt-4 border-t border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">
                  Instant One-Click Demo Sign In:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
      type="button"
      onClick={() => quickDemoLogin("customer")}
      className="p-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-left transition-all cursor-pointer group"
    >
                    <div className="text-[10px] text-amber-400 font-bold uppercase">Contractor</div>
                    <div className="text-xs font-semibold text-white truncate">Darshan Patel</div>
                    <div className="text-[10px] text-slate-400 truncate">Patel Infra EPC</div>
                  </button>

                  <button
      type="button"
      onClick={() => quickDemoLogin("provider")}
      className="p-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-left transition-all cursor-pointer group"
    >
                    <div className="text-[10px] text-emerald-400 font-bold uppercase">Fleet Owner</div>
                    <div className="text-xs font-semibold text-white truncate">Rajesh Varma</div>
                    <div className="text-[10px] text-slate-400 truncate">28 Cranes Hub</div>
                  </button>

                  <button
      type="button"
      onClick={() => quickDemoLogin("admin")}
      className="p-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-left transition-all cursor-pointer group"
    >
                    <div className="text-[10px] text-blue-400 font-bold uppercase">Operations</div>
                    <div className="text-xs font-semibold text-white truncate">Command HQ</div>
                    <div className="text-[10px] text-slate-400 truncate">Admin Portal</div>
                  </button>
                </div>
              </div>
            </form>
  ) : (
    /* ========================================================================= */
    /* CREATE ACCOUNT (SIGNUP) FORM                                              */
    /* ========================================================================= */
    <form onSubmit={handleSignupSubmit} className="space-y-4">
              
              {
      /* Account Type Visual Cards */
    }
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Select Your Account Purpose
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
      onClick={() => setSignupRole("customer")}
      className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${signupRole === "customer" ? "bg-amber-500/15 border-amber-500 text-amber-300 ring-2 ring-amber-500/20" : "bg-slate-800/50 border-slate-700/70 text-slate-400 hover:border-slate-600"}`}
    >
                    <div className="flex items-center justify-between mb-2">
                      <UserCheck className="w-5 h-5 text-amber-400" />
                      {signupRole === "customer" && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">I Want to Rent</div>
                      <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        Contractor, builder, or site engineer renting machinery
                      </div>
                    </div>
                  </div>

                  <div
      onClick={() => setSignupRole("provider")}
      className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${signupRole === "provider" ? "bg-amber-500/15 border-amber-500 text-amber-300 ring-2 ring-amber-500/20" : "bg-slate-800/50 border-slate-700/70 text-slate-400 hover:border-slate-600"}`}
    >
                    <div className="flex items-center justify-between mb-2">
                      <Truck className="w-5 h-5 text-amber-400" />
                      {signupRole === "provider" && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">I Own Equipment</div>
                      <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        Fleet owner, transporter, or crane operator listing machines
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {
      /* Full Name & Company Name */
    }
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
      type="text"
      required
      value={signupName}
      onChange={(e) => setSignupName(e.target.value)}
      placeholder="e.g. Darshan Patel"
      className="w-full h-10 px-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
    />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Company / Firm Name
                  </label>
                  <input
      type="text"
      value={signupCompany}
      onChange={(e) => setSignupCompany(e.target.value)}
      placeholder="e.g. Patel Infra EPC Ltd."
      className="w-full h-10 px-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
    />
                </div>
              </div>

              {
      /* Email & Mobile Number */
    }
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Work Email *
                  </label>
                  <input
      type="email"
      required
      value={signupEmail}
      onChange={(e) => setSignupEmail(e.target.value)}
      placeholder="e.g. contact@patelinfra.com"
      className="w-full h-10 px-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
    />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Mobile Phone (+91)
                  </label>
                  <input
      type="tel"
      value={signupPhone}
      onChange={(e) => setSignupPhone(e.target.value)}
      placeholder="+91 98250 14820"
      className="w-full h-10 px-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
    />
                </div>
              </div>

              {
      /* Optional GSTIN for corporate billing */
    }
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-300">
                    GSTIN Number (Optional)
                  </label>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                    Fast Corporate Credit
                  </span>
                </div>
                <input
      type="text"
      value={signupGstin}
      onChange={(e) => setSignupGstin(e.target.value.toUpperCase())}
      placeholder="e.g. 24AAACP4912K1Z9"
      maxLength={15}
      className="w-full h-10 px-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono uppercase"
    />
              </div>

              {
      /* Password */
    }
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Create Password
                </label>
                <input
      type="password"
      value={signupPassword}
      onChange={(e) => setSignupPassword(e.target.value)}
      placeholder="Minimum 8 characters"
      className="w-full h-10 px-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
    />
              </div>

              {
      /* Agreement */
    }
              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer">
                  <input
      type="checkbox"
      checked={termsAgreed}
      onChange={(e) => setTermsAgreed(e.target.checked)}
      className="w-4 h-4 mt-0.5 rounded text-amber-500 accent-amber-500 cursor-pointer"
    />
                  <span>
                    I agree to VEHIK's <span className="text-amber-400 hover:underline">Equipment Rental Policy</span>, certified operator insurance standards, and escrow agreements.
                  </span>
                </label>
              </div>

              {
      /* Submit Create Account Button */
    }
              <button
      type="submit"
      disabled={!termsAgreed}
      className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/25 active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
    >
                <span>Complete Registration & Open Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
  )}
        </div>
      </div>
    </div>;
};
