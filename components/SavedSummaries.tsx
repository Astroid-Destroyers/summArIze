"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface Summary {
  id: string;
  title: string;
  content: string;
  mode: string;
  createdAt: Date;
}

export default function SavedSummaries() {
  const { user } = useAuth();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSummary, setSelectedSummary] = useState<Summary | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "summaries"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        mode: doc.data().mode,
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      }));
      setSummaries(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleting(id);
    try {
      await deleteDoc(doc(db, "summaries", id));
      if (selectedSummary?.id === id) {
        setSelectedSummary(null);
      }
    } catch {
      // silently fail
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getPreview = (content: string) => {
    const clean = content.replace(/[#*_\->`]/g, "").trim();
    return clean.length > 120 ? clean.slice(0, 120) + "..." : clean;
  };

  const getModeColor = (mode: string) => {
    return mode === "notes"
      ? { bg: "from-violet-500/20 to-purple-500/20", border: "border-violet-500/30", tag: "bg-violet-500/15 text-violet-400 border-violet-500/30" }
      : { bg: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/30", tag: "bg-blue-500/15 text-blue-400 border-blue-500/30" };
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Full summary view
  if (selectedSummary) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedSummary(null)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to summaries
        </button>

        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-white/[0.06] bg-gradient-to-r from-white/[0.02] to-transparent">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedSummary.title}</h2>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold uppercase tracking-wide ${getModeColor(selectedSummary.mode).tag}`}>
                    {selectedSummary.mode === "notes" ? "Notes" : "Summary"}
                  </span>
                  <span className="text-gray-500 text-sm">{formatDate(selectedSummary.createdAt)}</span>
                </div>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(selectedSummary.content)}
                className="px-4 py-2 text-sm bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 rounded-lg transition-all border border-white/10"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed">
              {selectedSummary.content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Summaries</h1>
        <p className="text-gray-400">All your saved summaries and notes in one place</p>
      </div>

      {summaries.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-white/[0.08] flex items-center justify-center text-5xl mb-6">
            📝
          </div>
          <h2 className="text-xl font-semibold text-white mb-3">No summaries yet</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Upload a document or paste text in the Upload tab, then save the result to see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summaries.map((summary, i) => {
            const colors = getModeColor(summary.mode);
            return (
              <div
                key={summary.id}
                onClick={() => setSelectedSummary(summary)}
                className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] p-6 cursor-pointer transition-all duration-300 hover:bg-white/[0.04] hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/5"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity`} />

                {/* Tag + date row */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold uppercase tracking-wide ${colors.tag}`}>
                    {summary.mode === "notes" ? "Notes" : "Summary"}
                  </span>
                  <span className="text-gray-500 text-xs">{formatDate(summary.createdAt)}</span>
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-300 transition-colors line-clamp-1">
                  {summary.title}
                </h3>

                {/* Preview */}
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {getPreview(summary.content)}
                </p>

                {/* Bottom row */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06]">
                  <span className="text-gray-500 text-xs flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {summary.createdAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDelete(summary.id, e)}
                      disabled={deleting === summary.id}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      {deleting === summary.id ? (
                        <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
