"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import AuthModal from "@/components/AuthModal";

export default function Navbar() {
  const { user, logOut } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [scrolled, setScrolled] = useState(false);

  const openLogin = () => { setAuthMode("login"); setAuthOpen(true); };
  const openSignup = () => { setAuthMode("signup"); setAuthOpen(true); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = user
    ? [
        { href: "/dashboard", label: "Dashboard" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
      ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gray-950/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-lg shadow-black/20"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl blur-sm opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                  S
                </div>
              </div>
              <span className="text-lg font-semibold text-white tracking-tight">
                Summarize
              </span>
            </Link>

            {/* Desktop Center Nav — pill container */}
            <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-0.5 bg-white/[0.04] rounded-full p-1 border border-white/[0.06]">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive(link.href)
                        ? "text-white bg-white/[0.1] shadow-sm"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-2.5">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white/10">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-300 max-w-[140px] truncate">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => logOut()}
                    className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-full border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openLogin}
                    className="px-5 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-full hover:bg-white/[0.04] transition-all duration-200"
                  >
                    Log In
                  </button>
                  <button
                    onClick={openSignup}
                    className="group relative px-5 py-2 text-sm font-medium text-white rounded-full overflow-hidden transition-all duration-200"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 group-hover:from-blue-500 group-hover:to-violet-500 transition-all duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    <span className="relative">Get Started</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative p-2.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/[0.06] transition-all"
            >
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${mobileOpen ? "rotate-90" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileOpen ? "max-h-[400px] opacity-100 pb-5" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pt-3 space-y-1 border-t border-white/[0.06]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? "text-white bg-white/[0.08]"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/[0.06] mt-2 space-y-1.5">
                {user ? (
                  <>
                    <div className="flex items-center gap-2.5 px-4 py-2.5">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-gray-400 truncate">
                        {user.email}
                      </span>
                    </div>
                    <button
                      onClick={() => { logOut(); setMobileOpen(false); }}
                      className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2 px-3">
                    <button
                      onClick={() => { setMobileOpen(false); openLogin(); }}
                      className="flex-1 py-2.5 text-sm font-medium text-gray-300 border border-white/[0.08] hover:bg-white/[0.04] rounded-xl text-center transition-all"
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => { setMobileOpen(false); openSignup(); }}
                      className="flex-1 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl text-center transition-all"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultMode={authMode} />
    </>
  );
}
