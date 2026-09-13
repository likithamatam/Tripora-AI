import React from 'react';
import { Compass, Sparkles, MapPin, Users, Calendar, IndianRupee, Heart, CheckCircle } from 'lucide-react';
import { TripRequirements } from '../types';

interface AgentUnderstandingCardProps {
  requirements: TripRequirements;
  understandingNote: string;
}

export const AgentUnderstandingCard: React.FC<AgentUnderstandingCardProps> = ({
  requirements,
  understandingNote
}) => {
  return (
    <section className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-3xl border border-amber-200/90 p-6 sm:p-7 shadow-sm relative overflow-hidden" id="agent-understanding-section">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 font-mono">
            Synthesized Parameters
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-display">
            AGENT UNDERSTANDING
          </h3>
        </div>
      </div>

      {/* Grid of parsed constraints */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 my-4">
        
        {/* Destination */}
        <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-100 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-600" />
            Destination
          </div>
          <div className="text-sm sm:text-base font-extrabold text-neutral-900 font-display truncate">
            {requirements.destination}
          </div>
        </div>

        {/* Starting Point */}
        <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-100 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1">
            <Compass className="w-3 h-3 text-neutral-400" />
            Starting Point
          </div>
          <div className="text-sm sm:text-base font-extrabold text-neutral-900 font-display truncate">
            {requirements.from}
          </div>
        </div>

        {/* Travelers */}
        <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-100 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1">
            <Users className="w-3 h-3 text-neutral-400" />
            Travelers
          </div>
          <div className="text-sm sm:text-base font-extrabold text-neutral-900 font-display">
            {requirements.travelers} {requirements.travelers === 1 ? 'person' : 'people'}
          </div>
        </div>

        {/* Duration */}
        <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-100 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-neutral-400" />
            Duration
          </div>
          <div className="text-sm sm:text-base font-extrabold text-neutral-900 font-display">
            {requirements.durationDays} Days
          </div>
        </div>

        {/* Budget */}
        <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-100 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1">
            <IndianRupee className="w-3 h-3 text-emerald-600" />
            Budget
          </div>
          <div className="text-sm sm:text-base font-extrabold text-emerald-700 font-display">
            ₹{requirements.budget.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Travel Style */}
        <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-100 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
            Travel Style
          </div>
          <div className="text-sm sm:text-base font-extrabold text-neutral-900 font-display">
            {requirements.travelStyle}
          </div>
        </div>

        {/* Interests */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-1 bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-100 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1">
            <Heart className="w-3 h-3 text-rose-500" />
            Interests
          </div>
          <div className="text-xs font-bold text-neutral-800 truncate" title={requirements.interests.join(', ')}>
            {requirements.interests.join(', ')}
          </div>
        </div>

      </div>

      {/* Autonomous Promise Statement */}
      <div className="mt-4 p-3 rounded-2xl bg-amber-100/60 border border-amber-200/80 flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-amber-700 flex-shrink-0" />
        <p className="text-sm font-semibold text-amber-900 italic font-sans">
          “{understandingNote}”
        </p>
      </div>
    </section>
  );
};
