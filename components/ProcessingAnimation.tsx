"use client";

import { useEffect, useState } from "react";

const STAGES = [
  { icon: "📄", text: "Reading your document...", sub: "Extracting content" },
  { icon: "🧠", text: "Claude is thinking...", sub: "Analyzing key concepts" },
  { icon: "🔍", text: "Identifying key points...", sub: "Finding what matters most" },
  { icon: "✨", text: "Crafting your summary...", sub: "Almost there" },
  { icon: "🎯", text: "Polishing the result...", sub: "Making it perfect" },
];

const FUN_FACTS = [
  "The average student spends 17 hours per week studying...",
  "AI can read 10,000 words in under a second.",
  "Summarization improves retention by up to 40%.",
  "The best notes focus on concepts, not copying.",
  "Spaced repetition is the #1 memory technique.",
  "Active recall beats re-reading 3x over.",
];

export default function ProcessingAnimation() {
  const [stage, setStage] = useState(0);
  const [fact, setFact] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setStage((s) => (s + 1) % STAGES.length);
    }, 3000);
    return () => clearInterval(stageInterval);
  }, []);

  useEffect(() => {
    const factInterval = setInterval(() => {
      setFact((f) => (f + 1) % FUN_FACTS.length);
    }, 4500);
    return () => clearInterval(factInterval);
  }, []);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 400);
    return () => clearInterval(dotInterval);
  }, []);

  const current = STAGES[stage];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 border border-white/[0.08] p-12">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/30"
            style={{
              left: `${10 + (i * 7.5)}%`,
              top: `${20 + ((i * 13) % 60)}%`,
              animation: `float-up ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center">
          {/* Pulsing brain icon */}
          <div className="relative mb-8">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center">
              <span className="text-6xl transition-all duration-500" style={{ transform: `scale(${1 + Math.sin(stage) * 0.1})` }}>
                {current.icon}
              </span>
            </div>
            {/* Orbiting dots */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: i === 0 ? "#3b82f6" : i === 1 ? "#8b5cf6" : "#6366f1",
                  animation: `orbit ${2 + i * 0.5}s linear infinite`,
                  animationDelay: `${i * 0.7}s`,
                  top: "50%",
                  left: "50%",
                  opacity: 0.6,
                }}
              />
            ))}
          </div>

          {/* Stage text */}
          <h2 className="text-2xl font-bold text-white mb-2 transition-all duration-500">
            {current.text}
          </h2>
          <p className="text-gray-400 mb-8">{current.sub}{dots}</p>

          {/* Progress bar */}
          <div className="w-full max-w-md mb-8">
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 transition-all duration-1000"
                style={{
                  width: `${((stage + 1) / STAGES.length) * 100}%`,
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s linear infinite",
                }}
              />
            </div>
            <div className="flex justify-between mt-3">
              {STAGES.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    i <= stage ? "bg-blue-500 scale-125" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Fun fact */}
          <div className="px-6 py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] max-w-md">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">Did you know?</p>
            <p className="text-gray-400 text-sm transition-all duration-500">{FUN_FACTS[fact]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
