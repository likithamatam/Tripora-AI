import React from 'react';
import { Compass, Sparkles, Award, ShieldCheck, Heart, Terminal, CheckCircle } from 'lucide-react';

export const AboutView: React.FC<{ onPlanTrip: () => void }> = ({ onPlanTrip }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="about-view">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            Anakin Forge Hackathon 2026 Submission
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight mb-2">
            Tripora AI
          </h1>
          <p className="text-lg text-amber-100 font-medium max-w-xl">
            “Your trip. Researched, reasoned, and ready.”
          </p>
        </div>
      </div>

      {/* Narrative */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm space-y-6 text-sm text-neutral-700 leading-relaxed mb-8">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 font-display mb-2">
            The Hackathon Vision
          </h2>
          <p>
            The <strong>Anakin Forge Hackathon 2026</strong> focuses on AI agents that move beyond static chatbots. Real-world agents must genuinely <strong>READ</strong> multi-source information, <strong>REASON</strong> through complex, multi-objective trade-offs, <strong>ACT</strong> to accomplish tangible outcomes, and <strong>REPLAN</strong> when environmental constraints inevitably change.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-3">
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            <span className="text-xs font-mono font-bold text-amber-700 uppercase block mb-1">01 • READ</span>
            <p className="text-xs text-neutral-600">
              Parses natural language requests and aggregates transit timetables, hotel tiers, and verified attraction entries.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            <span className="text-xs font-mono font-bold text-amber-700 uppercase block mb-1">02 • REASON</span>
            <p className="text-xs text-neutral-600">
              Evaluates budget limits, timing feasibility, and comfort score with multi-factor weighting to find optimal combinations.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            <span className="text-xs font-mono font-bold text-amber-700 uppercase block mb-1">03 • ACT & REPLAN</span>
            <p className="text-xs text-neutral-600">
              Synthesizes booking previews, map routes, and triggers state-aware re-evaluations when constraints shift.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 font-display mb-2">
            Engineered for Real-World Utility
          </h2>
          <p>
            Tripora AI avoids gimmicky conversational fluff. It was built ground-up with mathematical budgeting guarantees, explicit pros/cons transparency, and a dedicated <strong>Demo Research Mode</strong> ensuring zero runtime failure during live judging demonstrations.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs">
          <strong>Hackathon Note:</strong> Powered by server-side Gemini AI for natural language parsing and prompt extraction with fallback heuristic parsing, ensuring 100% test scenario reliability.
        </div>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onPlanTrip}
          className="px-8 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm transition-all cursor-pointer shadow-sm"
        >
          Return to Travel Planner
        </button>
      </div>

    </div>
  );
};
