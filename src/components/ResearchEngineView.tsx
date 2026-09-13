import React, { useState } from 'react';
import { Plane, Train, Bus, Hotel, Sparkles, Star, ThumbsUp, ThumbsDown, CheckCircle2, DollarSign, Clock, ShieldCheck } from 'lucide-react';
import { TransportOption, AccommodationOption, ActivityOption } from '../types';

interface ResearchEngineViewProps {
  transports: TransportOption[];
  accommodations: AccommodationOption[];
  activities: ActivityOption[];
  selectedTransportId: string;
  selectedAccommodationId: string;
  selectedActivityIds: string[];
}

export const ResearchEngineView: React.FC<ResearchEngineViewProps> = ({
  transports,
  accommodations,
  activities,
  selectedTransportId,
  selectedAccommodationId,
  selectedActivityIds
}) => {
  const [activeTab, setActiveTab] = useState<'transport' | 'accommodation' | 'activities'>('transport');

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'flight': return <Plane className="w-4 h-4 text-sky-600" />;
      case 'train': return <Train className="w-4 h-4 text-emerald-600" />;
      case 'bus': return <Bus className="w-4 h-4 text-amber-600" />;
      default: return <Plane className="w-4 h-4 text-sky-600" />;
    }
  };

  return (
    <section className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm" id="research-engine-section">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">
              STAGE 1: KNOWLEDGE RETRIEVAL
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[11px] font-semibold border border-neutral-200">
              Demo Research Mode
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight font-display">
            RESEARCH ENGINE
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Real-world structured candidate alternatives analyzed across timing, costs, and travel trade-offs.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200 self-start sm:self-auto">
          <button
            id="tab-transport"
            onClick={() => setActiveTab('transport')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'transport'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Transport ({transports.length})</span>
          </button>

          <button
            id="tab-accommodation"
            onClick={() => setActiveTab('accommodation')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'accommodation'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Hotel className="w-3.5 h-3.5" />
            <span>Stays ({accommodations.length})</span>
          </button>

          <button
            id="tab-activities"
            onClick={() => setActiveTab('activities')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'activities'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Activities ({activities.length})</span>
          </button>
        </div>
      </div>

      {/* Demo Notice Banner */}
      <div className="mb-6 p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between text-xs text-neutral-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Demo Research Mode — sample data used for hackathon demonstration. Verified data points.</span>
        </div>
        <span className="font-mono text-[11px] text-neutral-400">READ phase complete</span>
      </div>

      {/* Tab 1: Transport Candidates */}
      {activeTab === 'transport' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="transport-options-grid">
          {transports.map((t) => {
            const isSelected = t.id === selectedTransportId;
            return (
              <div
                key={t.id}
                id={`transport-card-${t.id}`}
                className={`rounded-2xl border p-5 transition-all flex flex-col justify-between relative ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/20 shadow-md ring-2 ring-amber-500/20'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                {/* Agent Selected Badge */}
                {isSelected && (
                  <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3" />
                    Agent Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-lg">
                      {getTransportIcon(t.type)}
                      {t.type}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-700">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{t.rating}</span>
                    </div>
                  </div>

                  <h4 className="text-base font-extrabold text-neutral-900 mb-0.5 font-display">
                    {t.name}
                  </h4>
                  <p className="text-xs text-neutral-500 font-medium mb-3">
                    Operator: {t.operator}
                  </p>

                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 mb-4 text-xs">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Transit Duration</span>
                      <span className="font-bold text-neutral-800 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        {t.duration}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Total Cost</span>
                      <span className="font-extrabold text-neutral-900">
                        ₹{t.totalCost.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Advantages & Disadvantages */}
                  <div className="space-y-2 text-xs mb-4">
                    <div>
                      <span className="font-bold text-emerald-800 flex items-center gap-1 mb-1 text-[11px]">
                        <ThumbsUp className="w-3 h-3 text-emerald-600" /> Advantages
                      </span>
                      <ul className="space-y-1 pl-1">
                        {t.advantages.map((adv, i) => (
                          <li key={i} className="text-neutral-600 flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-bold text-rose-800 flex items-center gap-1 mb-1 text-[11px]">
                        <ThumbsDown className="w-3 h-3 text-rose-600" /> Disadvantages
                      </span>
                      <ul className="space-y-1 pl-1">
                        {t.disadvantages.map((dis, i) => (
                          <li key={i} className="text-neutral-500 flex items-start gap-1.5">
                            <span className="text-rose-400 font-bold">•</span>
                            <span>{dis}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-medium">
                    Budget Impact: <strong className={`capitalize ${t.budgetImpact === 'high' ? 'text-rose-600' : 'text-emerald-600'}`}>{t.budgetImpact}</strong>
                  </span>
                  <span className="text-neutral-400 text-[11px]">
                    Status: {t.verificationStatus}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Accommodation Candidates */}
      {activeTab === 'accommodation' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="accommodation-options-grid">
          {accommodations.map((a) => {
            const isSelected = a.id === selectedAccommodationId;
            return (
              <div
                key={a.id}
                id={`stay-card-${a.id}`}
                className={`rounded-2xl border p-4.5 transition-all flex flex-col justify-between relative ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/20 shadow-md ring-2 ring-amber-500/20'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3" />
                    Agent Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md">
                      {a.type} Tier
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-700">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{a.rating}</span>
                    </div>
                  </div>

                  <h4 className="text-sm font-extrabold text-neutral-900 mb-1 font-display line-clamp-2">
                    {a.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 mb-3 line-clamp-1">
                    {a.location}
                  </p>

                  <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-100 mb-3 text-xs">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] text-neutral-400">Per Night</span>
                      <span className="font-bold text-neutral-800">₹{a.pricePerNight.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-neutral-400">Total Stay</span>
                      <span className="font-extrabold text-neutral-900">₹{a.totalCost.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs mb-3">
                    <div className="text-[11px] text-emerald-800">
                      <strong className="block text-[10px] uppercase font-bold text-emerald-700">Pros</strong>
                      <span className="text-neutral-600 line-clamp-2">{a.advantages.join('; ')}</span>
                    </div>
                    <div className="text-[11px] text-rose-800">
                      <strong className="block text-[10px] uppercase font-bold text-rose-700">Cons</strong>
                      <span className="text-neutral-500 line-clamp-2">{a.disadvantages.join('; ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-500 flex items-center justify-between">
                  <span>Match: {a.preferenceMatchScore}/10</span>
                  <span className="capitalize">{a.budgetImpact} Impact</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Activity Candidates */}
      {activeTab === 'activities' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="activities-options-grid">
          {activities.map((act) => {
            const isIncluded = selectedActivityIds.includes(act.id);
            return (
              <div
                key={act.id}
                id={`activity-card-${act.id}`}
                className={`rounded-2xl border p-4.5 transition-all flex flex-col justify-between ${
                  isIncluded
                    ? 'border-neutral-300 bg-neutral-50/50'
                    : 'border-neutral-200 bg-white opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {act.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-neutral-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{act.rating}</span>
                    </div>
                  </div>

                  <h4 className="text-sm font-extrabold text-neutral-900 mb-1 font-display">
                    {act.name}
                  </h4>
                  <p className="text-xs text-neutral-500 mb-2">
                    {act.location} • ~{act.durationHours} hrs
                  </p>

                  <div className="text-xs text-neutral-600 space-y-1 mb-3">
                    <div className="text-[11px]">
                      <strong className="text-neutral-700">Highlights:</strong> {act.advantages[0]}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-neutral-900">
                    {act.estimatedCostPerPerson === 0 ? 'Free Entry' : `₹${act.estimatedCostPerPerson.toLocaleString('en-IN')} / person`}
                  </span>
                  <span className="text-emerald-700 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Included in Itinerary
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
