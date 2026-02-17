"use client";

import { useEffect, useRef } from "react";

export default function AboutPage() {
  const missionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (missionRef.current) observer.observe(missionRef.current);
    if (teamRef.current) observer.observe(teamRef.current);

    return () => observer.disconnect();
  }, []);

  const team = [
    { name: "Novali Plascencia", gradient: "from-blue-400 to-cyan-400" },
    { name: "Emilia Mahmoodi", gradient: "from-violet-400 to-purple-400" },
    { name: "Andy Moughalian", gradient: "from-pink-400 to-rose-400" },
    { name: "Roee Palmon", gradient: "from-orange-400 to-amber-400" },
    { name: "Christian Rusanovsky", gradient: "from-emerald-400 to-teal-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-gray-950 to-gray-950" />
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none animate-glow" />
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none animate-glow-delayed" />
      
      <div className="relative pt-32 pb-20 px-6">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-24">
          <div className="inline-block mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Built by students, for students
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            About{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400">
              Summarize
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We&apos;re students who understand the struggle. Here&apos;s our story.
          </p>
        </div>

        {/* Mission Section */}
        <div ref={missionRef} className="max-w-4xl mx-auto mb-32 reveal-section">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-white/[0.08] rounded-3xl p-12 md:p-16">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-2xl">
                  💡
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
                </div>
              </div>
              
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  In a world where <span className="text-white font-semibold">attention spans are shrinking</span> and information overload is the norm, 
                  traditional studying methods just don&apos;t cut it anymore. We&apos;ve been there—staring at pages of notes, 
                  struggling to stay focused, and cramming the night before exams.
                </p>
                <p>
                  That&apos;s why we built <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 font-semibold">Summarize</span>. 
                  We believe we&apos;ve found a solution that makes studying not just easier, but actually <span className="text-white font-semibold">engaging</span>. 
                  By combining AI-powered summarization with interactive games, quizzes, and flashcards, 
                  we&apos;re transforming boring study sessions into productive, focused learning experiences.
                </p>
                <p>
                  Our goal is simple: <span className="text-white font-semibold">help students learn more in less time</span>, 
                  retain information better, and actually enjoy the process.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div ref={teamRef} className="max-w-5xl mx-auto reveal-section">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Meet the Team</h2>
            <p className="text-gray-400 text-lg">Five students united by a mission to revolutionize studying</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {team.map((member, i) => (
              <div
                key={member.name}
                className={`group relative team-card team-card-${i}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-all duration-500`} />
                <div className="relative h-full bg-gray-900/50 backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 hover:border-white/[0.16] transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-2">
                  <div className="flex flex-col items-center text-center h-full justify-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} mb-4 flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-300`}>
                      👤
                    </div>
                    <h3 className={`text-white font-bold mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${member.gradient} transition-all duration-300`}>
                      {member.name}
                    </h3>
                    <p className="text-gray-400 text-sm">Co-Founder</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-3xl mx-auto text-center mt-32">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <div className="relative bg-gray-900/30 backdrop-blur-sm border border-white/[0.08] rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to transform your study game?
              </h3>
              <p className="text-gray-400 text-lg mb-8">
                Join us in making studying smarter, not harder.
              </p>
              <a
                href="/"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started Free
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
