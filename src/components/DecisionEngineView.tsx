import React from 'react';
import { Brain, CheckCircle2, Award, Scale, Zap, Clock, ShieldAlert } from 'lucide-react';
import { DecisionEngineOutput } from '../types';

interface DecisionEngineViewProps {
  decision: DecisionEngineOutput;
}

export const DecisionEngineView: React.FC<DecisionEngineViewProps> = ({ decision }) => {
  return (
    <section className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm" id="trip-decision-engine-section">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">
              STAGE 2: MULTI-OBJECTIVE REASONING
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight font-display flex items-center gap-2.5">
            <Brain className="w-6 h-6 text-amber-600" />
            TRIP DECISION ENGINE
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Evaluating candidate alternatives against financial, logistical, and preference trade-offs.
          </p>
        </div>

        {/* Overall Match Highlight Card */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white px-5 py-3.5 rounded-2xl flex items-center gap-4 self-start sm:self-auto shadow-md">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-mono text-xl font-black">
            {decision.overallMatchScore}
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Overall Match Score
            </div>
            <div className="text-sm font-extrabold text-white">
              {decision.overallMatchScore >= 9.0 ? 'Optimal Solution' : 'Balanced Alternative'}
            </div>
          </div>
        </div>
      </div>

      {/* Multi-factor Score Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        
        {/* Budget Fit */}
        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
          <div className="flex items-center justify-between mb-1.5 text-xs text-neutral-500 font-semibold">
            <span>Budget Fit</span>
            <span className="font-mono font-bold text-neutral-900">{decision.budgetFitScore}/10</span>
          </div>
          <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${decision.budgetFitScore * 10}%` }}
            ></div>
          </div>
        </div>

        {/* Preference Match */}
        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
          <div className="flex items-center justify-between mb-1.5 text-xs text-neutral-500 font-semibold">
            <span>Preference Match</span>
            <span className="font-mono font-bold text-neutral-900">{decision.preferenceMatchScore}/10</span>
          </div>
          <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${decision.preferenceMatchScore * 10}%` }}
            ></div>
          </div>
        </div>

        {/* Convenience */}
        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
          <div className="flex items-center justify-between mb-1.5 text-xs text-neutral-500 font-semibold">
            <span>Convenience</span>
            <span className="font-mono font-bold text-neutral-900">{decision.convenienceScore}/10</span>
          </div>
          <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-sky-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${decision.convenienceScore * 10}%` }}
            ></div>
          </div>
        </div>

        {/* Travel Time */}
        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
          <div className="flex items-center justify-between mb-1.5 text-xs text-neutral-500 font-semibold">
            <span>Travel Time</span>
            <span className="font-mono font-bold text-neutral-900">{decision.travelTimeScore}/10</span>
          </div>
          <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${decision.travelTimeScore * 10}%` }}
            ></div>
          </div>
        </div>

        {/* Comfort */}
        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
          <div className="flex items-center justify-between mb-1.5 text-xs text-neutral-500 font-semibold">
            <span>Comfort</span>
            <span className="font-mono font-bold text-neutral-900">{decision.comfortScore}/10</span>
          </div>
          <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-purple-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${decision.comfortScore * 10}%` }}
            ></div>
          </div>
        </div>

        {/* Overall Value */}
        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
          <div className="flex items-center justify-between mb-1.5 text-xs text-neutral-500 font-semibold">
            <span>Overall Value</span>
            <span className="font-mono font-bold text-neutral-900">{decision.overallValueScore}/10</span>
          </div>
          <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-orange-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${decision.overallValueScore * 10}%` }}
            ></div>
          </div>
        </div>

      </div>

      {/* AGENT RECOMMENDATION Section */}
      <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/90 relative overflow-hidden" id="agent-recommendation-card">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-5 h-5 text-amber-700" />
          <h4 className="text-base font-extrabold text-amber-950 font-display">
            AGENT RECOMMENDATION
          </h4>
        </div>
        
        <p className="text-sm font-semibold text-neutral-800 mb-4 leading-relaxed">
          {decision.recommendationSummary}
        </p>

        {/* Decision Factors Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-amber-200/60">
          {decision.decisionFactors.map((factor, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-amber-100/90 text-xs">
              <div className="flex items-center justify-between mb-1 font-bold text-neutral-900">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {factor.name}
                </span>
                <span className="text-amber-800 font-mono">{factor.score}/10</span>
              </div>
              <p className="text-neutral-600 text-[11px] leading-snug">
                {factor.explanation}
              </p>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
