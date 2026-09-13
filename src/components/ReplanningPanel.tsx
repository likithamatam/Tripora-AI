import React, { useState } from 'react';
import { RefreshCw, IndianRupee, Users, Calendar, Compass, Heart, AlertCircle, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { TripRequirements, TravelStyle, ReplanDiff } from '../types';

interface ReplanningPanelProps {
  currentRequirements: TripRequirements;
  isReplanned?: boolean;
  replanDiff?: ReplanDiff;
  isProcessing: boolean;
  onReplan: (updatedReq: TripRequirements) => void;
}

const TRAVEL_STYLES: TravelStyle[] = ['Budget', 'Balanced', 'Comfort', 'Luxury', 'Adventure', 'Backpacker'];

const AVAILABLE_INTERESTS = [
  'Beaches',
  'Food',
  'Sightseeing',
  'Culture',
  'Adventure',
  'Shopping',
  'Relaxation'
];

export const ReplanningPanel: React.FC<ReplanningPanelProps> = ({
  currentRequirements,
  isReplanned = false,
  replanDiff,
  isProcessing,
  onReplan
}) => {
  const [budget, setBudget] = useState<number>(currentRequirements.budget);
  const [travelers, setTravelers] = useState<number>(currentRequirements.travelers);
  const [durationDays, setDurationDays] = useState<number>(currentRequirements.durationDays);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(currentRequirements.travelStyle);
  const [interests, setInterests] = useState<string[]>(currentRequirements.interests);

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      if (interests.length > 1) {
        setInterests(interests.filter(i => i !== interest));
      }
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleTriggerReplan = (newBudget?: number, newStyle?: TravelStyle) => {
    const updated: TripRequirements = {
      ...currentRequirements,
      budget: newBudget !== undefined ? newBudget : budget,
      travelers,
      durationDays,
      travelStyle: newStyle !== undefined ? newStyle : travelStyle,
      interests
    };
    onReplan(updated);
  };

  return (
    <section className="bg-white rounded-3xl border-2 border-amber-400/80 p-6 sm:p-8 shadow-lg shadow-amber-500/5 relative overflow-hidden" id="autonomous-replanning-section">
      
      {/* Top Banner if already replanned */}
      {isReplanned && replanDiff && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-display font-extrabold text-lg text-emerald-900">
                TRIP REPLANNED
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-200/80 text-emerald-800 text-[10px] font-bold font-mono">
                STATE → CHANGE → REASON → REPLAN
              </span>
            </div>
            <p className="text-xs text-emerald-800 font-medium leading-relaxed">
              {replanDiff.reasonSummary}
            </p>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Cost Delta</span>
            <span className={`text-base font-extrabold font-mono ${replanDiff.costDelta <= 0 ? 'text-emerald-700' : 'text-neutral-800'}`}>
              {replanDiff.costDelta <= 0 ? `-₹${Math.abs(replanDiff.costDelta).toLocaleString('en-IN')}` : `+₹${replanDiff.costDelta.toLocaleString('en-IN')}`}
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              CORE HACKATHON FEATURE
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight font-display">
            AUTONOMOUS REPLANNING & CONSTRAINT ADAPTATION
          </h3>
          <p className="text-xs text-neutral-600 mt-0.5">
            Modify any constraint below. The agent will re-evaluate alternatives and regenerate the trip.
          </p>
        </div>

        {/* 1-Click Demo Shortcut for Judges */}
        <button
          type="button"
          id="btn-quick-replan-20k"
          disabled={isProcessing}
          onClick={() => {
            setBudget(20000);
            setTravelStyle('Budget');
            handleTriggerReplan(20000, 'Budget');
          }}
          className="px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold transition-all border border-amber-300 flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-amber-800 ${isProcessing ? 'animate-spin' : ''}`} />
          <span>Quick Scenario: Replan at ₹20,000 (Goa)</span>
        </button>
      </div>

      {/* CHANGE REQUIREMENTS Form */}
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Budget Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="replan-budget" className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                New Budget
              </label>
              <span className="text-xs font-extrabold text-neutral-900 font-mono">
                ₹{budget.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              id="replan-budget"
              type="number"
              step={1000}
              min={5000}
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value, 10) || 5000)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-bold text-neutral-900 bg-neutral-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
            />
          </div>

          {/* Travelers Field */}
          <div>
            <label htmlFor="replan-travelers" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-neutral-500" />
              Travelers
            </label>
            <input
              id="replan-travelers"
              type="number"
              min={1}
              max={20}
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value, 10) || 1)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-bold text-neutral-900 bg-neutral-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
            />
          </div>

          {/* Duration Field */}
          <div>
            <label htmlFor="replan-duration" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              Duration (Days)
            </label>
            <input
              id="replan-duration"
              type="number"
              min={1}
              max={14}
              value={durationDays}
              onChange={(e) => setDurationDays(parseInt(e.target.value, 10) || 1)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-bold text-neutral-900 bg-neutral-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
            />
          </div>

          {/* Travel Style Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-neutral-500" />
              Travel Style
            </label>
            <select
              id="replan-travel-style"
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value as TravelStyle)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-bold text-neutral-900 bg-neutral-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
            >
              {TRAVEL_STYLES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Interests Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            Active Preferences
          </label>
          <div className="flex flex-wrap gap-1.5">
            {AVAILABLE_INTERESTS.map((interest) => {
              const isSelected = interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  id={`replan-interest-${interest.toLowerCase()}`}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button: RE-OPTIMIZE TRIP */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            id="re-optimize-trip-button"
            disabled={isProcessing}
            onClick={() => handleTriggerReplan()}
            className="px-6 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-display font-extrabold text-sm sm:text-base tracking-wide shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 text-amber-400 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>{isProcessing ? 'AGENT RE-OPTIMIZING...' : 'RE-OPTIMIZE TRIP'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <span className="text-xs text-neutral-500 font-medium">
            Agent will re-evaluate transport, stays, and activities to fit updated parameters.
          </span>
        </div>

      </div>

    </section>
  );
};
