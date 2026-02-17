"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, defaultMode = "login" }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(defaultMode === "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(false);

  const { signUp, logIn } = useAuth();
  const router = useRouter();

  // Animate in
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  // Reset when mode changes from parent
  useEffect(() => {
    setIsLogin(defaultMode === "login");
  }, [defaultMode]);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await logIn(email, password);
      } else {
        await signUp(email, password);
      }
      setSuccess(true);
      setTimeout(() => {
        onClose();
        router.push("/dashboard");
        setSuccess(false);
        setEmail("");
        setPassword("");
      }, 600);
    } catch (err: unknown) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      if (err instanceof Error) {
        const errorMessage = err.message
          .replace("Firebase: ", "")
          .replace(/\(auth\/.*\)/, "")
          .trim();
        setError(errorMessage);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md mx-4 transition-all duration-300 ${
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        } ${shake ? "animate-shake" : ""} ${success ? "animate-success" : ""}`}
      >
        {/* Glow effect behind modal */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-violet-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-60" />

        <div className="relative rounded-2xl border border-white/[0.08] bg-gray-950/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
          {/* Top gradient accent */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          <div className="p-8 sm:p-10">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/25">
                S
              </div>
            </div>

            {/* Tab switcher */}
            <div className="flex bg-white/[0.04] rounded-xl p-1 mb-8">
              <button
                onClick={() => { setIsLogin(true); setError(""); }}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isLogin
                    ? "bg-white/[0.1] text-white shadow-sm"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(""); }}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  !isLogin
                    ? "bg-white/[0.1] text-white shadow-sm"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Create Account
              </button>
            </div>

            <p className="text-gray-500 text-sm text-center mb-6">
              {isLogin
                ? "Welcome back! Enter your details below."
                : "Create an account to start studying smarter."}
            </p>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm animate-fadeIn">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="modal-email" className="block text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <input
                    id="modal-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/[0.06] transition-all text-sm"
                    placeholder="you@university.edu"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="modal-password" className="block text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <input
                    id="modal-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/[0.06] transition-all text-sm"
                    placeholder="Min. 6 characters"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="relative w-full py-3 px-4 text-sm font-medium text-white rounded-xl transition-all duration-200 overflow-hidden group disabled:cursor-not-allowed"
              >
                {/* Button gradient bg */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 transition-opacity group-hover:opacity-90 group-disabled:opacity-50" />
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : success ? (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Success!
                    </>
                  ) : isLogin ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 text-center">
              <span className="text-xs text-gray-600">
                {isLogin ? "New to Summarize? " : "Already studying with us? "}
                <button
                  onClick={() => { setIsLogin(!isLogin); setError(""); }}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  {isLogin ? "Create an account" : "Sign in"}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
