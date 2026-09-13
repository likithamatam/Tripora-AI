import React, { useState } from 'react';
import { Calendar, Clock, MapPin, IndianRupee, Compass, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { DayItinerary } from '../types';

interface DayItineraryViewProps {
  itinerary: DayItinerary[];
}

export const DayItineraryView: React.FC<DayItineraryViewProps> = ({ itinerary }) => {
  const [expandedDays, setExpandedDays] = useState<number[]>(itinerary.map(d => d.day));

  const toggleDay = (dayNum: number) => {
    if (expandedDays.includes(dayNum)) {
      setExpandedDays(expandedDays.filter(d => d !== dayNum));
    } else {
      setExpandedDays([...expandedDays, dayNum]);
    }
  };

  const expandAll = () => setExpandedDays(itinerary.map(d => d.day));
  const collapseAll = () => setExpandedDays([]);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'transit': return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'stay': return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'food': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'beaches': return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'adventure': return 'bg-orange-50 text-orange-800 border-orange-200';
      case 'shopping': return 'bg-purple-50 text-purple-800 border-purple-200';
      default: return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  return (
    <section className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm" id="day-by-day-itinerary-section">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">
              STAGE 4: SYNTHESIZED TIMELINE
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight font-display flex items-center gap-2.5">
            <Calendar className="w-6 h-6 text-amber-600" />
            DAY-BY-DAY ITINERARY
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Optimized chronological schedule with timing, verified venues, cost estimates, and agent reasoning.
          </p>
        </div>

        {/* Toggle Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={expandAll}
            className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition-colors"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Days List */}
      <div className="space-y-4">
        {itinerary.map((dayPlan) => {
          const isExpanded = expandedDays.includes(dayPlan.day);
          return (
            <div
              key={dayPlan.day}
              id={`itinerary-day-${dayPlan.day}`}
              className="rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-xs transition-all"
            >
              {/* Day Accordion Header */}
              <button
                type="button"
                onClick={() => toggleDay(dayPlan.day)}
                className="w-full px-5 py-4 bg-neutral-50/80 hover:bg-neutral-100/80 flex items-center justify-between text-left transition-colors cursor-pointer border-b border-neutral-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-display font-extrabold text-base flex-shrink-0">
                    D{dayPlan.day}
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-neutral-900 font-display">
                      DAY {dayPlan.day} — {dayPlan.title}
                    </h4>
                    <p className="text-xs text-neutral-500 font-medium">
                      {dayPlan.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="text-xs font-medium hidden sm:inline">
                    {dayPlan.items.length} Activities
                  </span>
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Items Timeline */}
              {isExpanded && (
                <div className="p-5 sm:p-6 space-y-4 divide-y divide-neutral-100">
                  {dayPlan.items.map((item, index) => (
                    <div
                      key={item.id || index}
                      className={`pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4`}
                    >
                      {/* Time Badge */}
                      <div className="sm:w-28 flex-shrink-0 flex items-center sm:flex-col sm:items-start gap-1 text-xs font-mono font-bold text-neutral-600 bg-neutral-100 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-lg">
                        <span className="flex items-center gap-1 text-neutral-800">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          {item.time}
                        </span>
                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded-md border font-semibold ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-grow min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                          <h5 className="text-sm sm:text-base font-extrabold text-neutral-900 font-display">
                            {item.activity}
                          </h5>
                          <span className="text-xs font-mono font-bold text-neutral-900 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-200 self-start sm:self-auto">
                            {item.estimatedCost === 0 ? 'Included / Free' : `₹${item.estimatedCost.toLocaleString('en-IN')}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mb-1.5">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{item.location}</span>
                        </div>

                        {/* Reason / Relevance Pill */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 font-medium">
                          <Sparkles className="w-3 h-3 text-amber-600 flex-shrink-0" />
                          <span>{item.reason}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
