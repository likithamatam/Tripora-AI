import React from 'react';
import { Compass, Sparkles, Brain, Cpu, RefreshCw, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowItWorksView: React.FC<{ onPlanTrip: () => void }> = ({ onPlanTrip }) => {
  const steps = [
    {
      num: '01',
      title: 'User Goal Intake',
      desc: 'Accepts freeform natural language or structured parameters without locking into static presets or forcing personal data.'
    },
    {
      num: '02',
      title: 'Autonomous Research Strategy',
      desc: 'Formulates a search blueprint across flights, rail lines, sleeper coaches, hotels, hostels, and verified local sights.'
    },
    {
      num: '03',
      title: 'Candidate Evaluation (READ)',
      desc: 'Retrieves multi-modal candidate options with costs, duration, ratings, pros, cons, and verified operational status.'
    },
    {
      num: '04',
      title: 'Multi-Objective Trade-offs (REASON)',
      desc: 'Scores options across 6 vectors: budget fit, preference match, transit duration, convenience, comfort, and value.'
    },
    {
      num: '05',
      title: 'Decision Engine & Budget Lock',
      desc: 'Selects the highest composite pairing, guarantees non-deficit allocation, and derives day-by-day scheduled logistics.'
    },
    {
      num: '06',
      title: 'Tangible Execution (ACT)',
      desc: 'Generates booking simulations, direct carrier references, route map visualization, and exportable offline dossiers.'
    },
    {
      num: '07',
      title: 'Closed-Loop Replanning (REPLAN)',
      desc: 'When constraints shift (e.g. ₹30k → ₹20k), the agent autonomously recalibrates the plan: STATE → CHANGE → REASON → REPLAN.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="how-it-works-view">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Cpu className="w-3.5 h-3.5" />
          Agent Architecture
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
          How Tripora AI Works
        </h2>
        <p className="text-base text-neutral-600 mt-2">
          Tripora AI is not a conversational chatbot; it is an autonomous, goal-directed agent with persistent state, constraint checking, and real-time replanning.
        </p>
      </div>

      {/* Chatbot vs Agent Comparison Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="p-6 rounded-3xl bg-neutral-100/70 border border-neutral-200">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
            Traditional Chatbot (LLM Prompt-Response)
          </div>
          <ul className="space-y-2.5 text-xs text-neutral-600">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✕</span>
              <span>Outputs unstructured, hallucinated text walls without budget verification.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✕</span>
              <span>Cannot perform multi-step computational constraint arithmetic.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✕</span>
              <span>Cannot autonomously re-evaluate trade-offs when constraints change.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-300">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 font-mono flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Tripora Autonomous Agent
          </div>
          <ul className="space-y-2.5 text-xs text-neutral-800 font-medium">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Executes a visible 11-stage autonomous planning pipeline.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Mathematically balances transit, lodging, food, and local buffers.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Full closed-loop replanning: STATE → CHANGE → REASON → REPLAN.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 7 Core Pipeline Stages */}
      <div className="space-y-4 mb-12">
        {steps.map((st) => (
          <div
            key={st.num}
            className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-xs flex items-start gap-4 transition-all"
          >
            <span className="font-mono text-xl font-black text-amber-600 flex-shrink-0">
              {st.num}
            </span>
            <div>
              <h4 className="text-base font-extrabold text-neutral-900 font-display">
                {st.title}
              </h4>
              <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                {st.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <button
          type="button"
          onClick={onPlanTrip}
          className="px-8 py-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-display font-extrabold text-sm sm:text-base tracking-wide shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Experience the Agent Live</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
