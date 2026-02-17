"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadType, setUploadType] = useState<"summary" | "notes" | "video">("summary");
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const features = [
    { id: "upload", icon: "📤", title: "Upload", badge: null },
    { id: "summary", icon: "📝", title: "Text Summarizer", badge: "Soon" },
    { id: "video", icon: "🎥", title: "Video Summarizer", badge: "Soon" },
    { id: "notes", icon: "📚", title: "Auto Notes", badge: "Soon" },
    { id: "quiz", icon: "❓", title: "Quiz Generator", badge: "Soon" },
    { id: "feedback", icon: "✅", title: "Instant Feedback", badge: "Soon" },
    { id: "flashcards", icon: "🎴", title: "Flashcards", badge: "Soon" },
    { id: "plans", icon: "📅", title: "Study Plans", badge: "Soon" },
    { id: "search", icon: "🔍", title: "Search", badge: "Soon" },
    { id: "progress", icon: "📊", title: "Progress", badge: "Soon" },
    { id: "games", icon: "🎮", title: "Gamified Notes", badge: "Soon" },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop here
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="flex pt-20">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent px-6 py-8">
          <div className="sticky top-24">
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
                Tools
              </h3>
              <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
            </div>
            <nav className="space-y-1.5">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={`group w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === feature.id
                      ? "bg-gradient-to-r from-blue-500/15 to-violet-500/10 text-white shadow-lg shadow-blue-500/5 border border-blue-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 ${
                      activeTab === feature.id
                        ? "bg-gradient-to-br from-blue-500/20 to-violet-500/20 scale-110"
                        : "bg-white/[0.03] group-hover:bg-white/[0.08] group-hover:scale-105"
                    }`}>
                      <span className="text-xl">{feature.icon}</span>
                    </div>
                    <span className="font-semibold">{feature.title}</span>
                  </div>
                  {feature.badge && (
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold uppercase tracking-wide">
                      {feature.badge}
                    </span>
                  )}
                  {activeTab === feature.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-violet-500 rounded-r-full" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-8 py-8">
          {activeTab === "upload" ? (
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Upload Content</h1>
                <p className="text-gray-400">Upload your study materials to get started</p>
              </div>

              {/* Upload Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${
                  dragActive
                    ? "border-blue-500 bg-blue-500/5"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="p-16 text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-white/10 flex items-center justify-center text-4xl">
                      📄
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Drop your files here
                  </h3>
                  <p className="text-gray-400 mb-6">
                    or click to browse from your device
                  </p>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-medium rounded-xl transition-all duration-300">
                    Choose File
                  </button>
                  <p className="text-gray-500 text-sm mt-4">
                    Supports PDF, DOCX, TXT, and more
                  </p>
                </div>
              </div>

              {/* Or Divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-gray-500 text-sm">OR</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Paste Text Area */}
              <div className="mb-8">
                <textarea
                  placeholder="Paste your text here..."
                  className="w-full h-48 px-6 py-4 bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-blue-500/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                />
              </div>

              {/* Action Selection */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-400">
                  What would you like to do?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setUploadType("summary")}
                    className={`group relative p-6 rounded-xl border transition-all duration-300 ${
                      uploadType === "summary"
                        ? "border-blue-500 bg-blue-500/5"
                        : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                    }`}
                  >
                    <div className="text-3xl mb-3">📝</div>
                    <h4 className="text-white font-semibold mb-1">Summary</h4>
                    <p className="text-gray-400 text-xs">Get key takeaways</p>
                    {uploadType === "summary" && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => setUploadType("notes")}
                    className={`group relative p-6 rounded-xl border transition-all duration-300 ${
                      uploadType === "notes"
                        ? "border-violet-500 bg-violet-500/5"
                        : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                    }`}
                  >
                    <div className="text-3xl mb-3">📚</div>
                    <h4 className="text-white font-semibold mb-1">Auto Notes</h4>
                    <p className="text-gray-400 text-xs">Clean structured notes</p>
                    {uploadType === "notes" && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => setUploadType("video")}
                    className={`group relative p-6 rounded-xl border transition-all duration-300 ${
                      uploadType === "video"
                        ? "border-purple-500 bg-purple-500/5"
                        : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                    }`}
                  >
                    <div className="text-3xl mb-3">🎥</div>
                    <h4 className="text-white font-semibold mb-1">Video</h4>
                    <p className="text-gray-400 text-xs">Upload or link video</p>
                    {uploadType === "video" && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02]">
                  Process Content
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center py-20">
              <div className="text-6xl mb-6">🚧</div>
              <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
              <p className="text-gray-400">This feature is currently under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
