"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const { user, loading } = useAuth();
  const router = useRouter();

  const openSignup = () => { setAuthMode("signup"); setAuthOpen(true); };
  const openLogin = () => { setAuthMode("login"); setAuthOpen(true); };

  const featuresRef = useReveal();
  const howRef = useReveal();
  const ctaRef = useReveal();

  // Redirect to dashboard if user is logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-44 sm:pb-32 px-6 overflow-hidden">
        {/* Gradient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-blue-600/15 via-violet-600/10 to-transparent rounded-full blur-3xl pointer-events-none animate-glow" />
        {/* Secondary glow */}
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-glow-delayed" />
        {/* Third glow - right side */}
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-blue-500/8 rounded-full blur-3xl pointer-events-none animate-glow" style={{ animationDelay: '3s' }} />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="particle particle-1" />
          <div className="particle particle-2" />
          <div className="particle particle-3" />
          <div className="particle particle-4" />
          <div className="particle particle-5" />
          <div className="particle particle-6" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none mask-fade" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/[0.08] bg-white/[0.03] text-sm text-gray-400 animate-fadeInUp">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            Built for students, by students
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-fadeInUp animation-delay-100">
            Study smarter,{" "}
            <span className="gradient-text-shimmer">
              not harder.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fadeInUp animation-delay-200">
            Drop in your lecture notes and let AI summarize them, generate
            quizzes, create study games, and help you actually remember what
            you learned.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp animation-delay-300">
            <button
              onClick={openSignup}
              className="group relative w-full sm:w-auto px-8 py-3.5 text-base font-medium text-white rounded-xl transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 group-hover:from-blue-500 group-hover:to-violet-500 transition-all" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                Start studying for free
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
            <Link
              href="/about"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-gray-300 border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.03] rounded-xl transition-all"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 border-t border-white/[0.04]">
        <div ref={featuresRef} className="max-w-5xl mx-auto reveal-section">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need to ace your classes
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              One place for all your study tools. Upload your notes and we handle the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
                title: "Smart Summaries",
                desc: "Paste your lecture notes and get clean, organized summaries that highlight the key concepts.",
                color: "blue",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                ),
                title: "Auto Quizzes",
                desc: "Instantly generate quizzes from your notes to test yourself before exams. Multiple choice, true/false, and more.",
                color: "violet",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.421 48.421 0 01-4.163-.3c.186 1.613.466 3.2.836 4.752a48.046 48.046 0 016.672.002c.37-1.553.65-3.14.836-4.754a48.421 48.421 0 01-4.163.3.64.64 0 01-.657-.643v0zM15 27a6.75 6.75 0 01-6.75-6.75h13.5c0 3.728-3.022 6.75-6.75 6.75zM12 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375" />
                  </svg>
                ),
                title: "Study Games",
                desc: "Turn boring notes into interactive games like flashcard battles and matching challenges. Studying has never been this fun.",
                color: "purple",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                title: "Instant Flashcards",
                desc: "Your notes become flashcards in one click. Review them anywhere, anytime — swipe through like a pro.",
                color: "amber",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                  </svg>
                ),
                title: "AI Explanations",
                desc: "Confused by a concept? Ask AI to break it down in simple terms, with examples that actually make sense.",
                color: "emerald",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                ),
                title: "Progress Tracking",
                desc: "See how much you've studied, track quiz scores, and watch yourself improve over time.",
                color: "rose",
              },
            ].map((feature, index) => {
              const colorMap: Record<string, string> = {
                blue: "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/15",
                violet: "bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/15",
                purple: "bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/15",
                amber: "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/15",
                emerald: "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/15",
                rose: "bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/15",
              };
              return (
                <div
                  key={feature.title}
                  className={`group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20 feature-card feature-card-${index}`}
                >
                  <div
                    className={`h-11 w-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${colorMap[feature.color]}`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-100 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 px-6 border-t border-white/[0.04] overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-glow" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-glow-delayed" />
        
        <div ref={howRef} className="relative max-w-6xl mx-auto reveal-section">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400">
              How it works
            </h2>
            <p className="text-gray-400 text-xl">Three simple steps to academic success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {/* Animated connector lines (desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-violet-500/30 to-purple-500/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 animate-flow-line" />
            </div>
            
            {/* Animated dots at connection points */}
            <div className="hidden md:block absolute top-12 left-[calc(16%-4px)] w-2 h-2 rounded-full bg-blue-500 animate-pulse-dot" />
            <div className="hidden md:block absolute top-12 left-[calc(50%-4px)] w-2 h-2 rounded-full bg-violet-500 animate-pulse-dot animation-delay-200" />
            <div className="hidden md:block absolute top-12 right-[calc(16%-4px)] w-2 h-2 rounded-full bg-purple-500 animate-pulse-dot animation-delay-300" />

            {[
              {
                step: "01",
                title: "Upload your notes",
                desc: "Paste or upload your lecture notes, slides, or any study material.",
                gradient: "from-blue-500 to-blue-600",
                icon: "📝",
              },
              {
                step: "02",
                title: "AI does the work",
                desc: "We summarize, create quizzes, flashcards, and study games from your content.",
                gradient: "from-violet-500 to-violet-600",
                icon: "✨",
              },
              {
                step: "03",
                title: "Study & crush it",
                desc: "Review summaries, play games, take quizzes, and walk into your exam confident.",
                gradient: "from-purple-500 to-purple-600",
                icon: "🎯",
              },
            ].map((item, i) => (
              <div key={item.step} className={`group text-center how-step how-step-${i} relative`}>
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 rounded-3xl blur-2xl transition-opacity duration-500`} />
                
                <div className="relative">
                  {/* Animated step number */}
                  <div className="relative inline-block mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow`} />
                    <div className={`relative flex flex-col items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <div className="text-3xl mb-1 animate-float">{item.icon}</div>
                      <div className="text-xs font-bold opacity-80">{item.step}</div>
                    </div>
                  </div>
                  
                  <h3 className={`text-white font-bold text-xl mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${item.gradient.replace('to-', 'via-')} to-white transition-all duration-300`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300 max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 border-t border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/[0.04] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-violet-600/10 to-transparent rounded-full blur-3xl pointer-events-none animate-glow" />
        <div ref={ctaRef} className="relative max-w-3xl mx-auto text-center reveal-section">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stop re-reading. Start retaining.
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of students who are studying smarter with Summarize.
            It&apos;s free to get started.
          </p>
          <button
            onClick={openSignup}
            className="group relative inline-block px-10 py-4 text-base font-medium text-white rounded-xl transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 group-hover:from-blue-500 group-hover:to-violet-500 transition-all" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Create your free account</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs">
              S
            </div>
            <span className="text-sm text-gray-600">© 2026 Summarize</span>
          </div>
          <div className="flex gap-6">
            <Link href="/about" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              About
            </Link>
            <button onClick={openLogin} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              Log In
            </button>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultMode={authMode} />
    </div>
  );
}
