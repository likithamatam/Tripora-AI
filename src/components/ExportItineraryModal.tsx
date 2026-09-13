import React from 'react';
import { Printer, X, Download, Compass, IndianRupee, Calendar, MapPin, Users, CheckCircle2 } from 'lucide-react';
import { CompleteTripPlan } from '../types';

interface ExportItineraryModalProps {
  plan: CompleteTripPlan;
  onClose: () => void;
}

export const ExportItineraryModal: React.FC<ExportItineraryModalProps> = ({ plan, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-neutral-200 relative my-8 print:shadow-none print:border-none print:p-0">
        
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Trip Dossier Report
            </span>
            <span className="text-xs text-neutral-500 font-medium">Ready for offline travel & printing</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Itinerary</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div className="print:block" id="printable-trip-dossier">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-neutral-900 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Compass className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-extrabold tracking-tight text-neutral-900 uppercase">
                  Tripora AI • Autonomous Trip Dossier
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-display">
                {plan.requirements.durationDays}-Day {plan.requirements.destination} Expedition
              </h1>
              <p className="text-sm text-neutral-600 mt-1">
                Origin: {plan.requirements.from} • Travelers: {plan.requirements.travelers} • Style: {plan.requirements.travelStyle}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs uppercase font-bold text-neutral-400 block">Total Est. Cost</span>
              <span className="text-2xl font-black text-neutral-900 font-display">
                ₹{plan.budget.totalEstimatedCost.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-emerald-700 font-bold block mt-0.5">
                (Budget: ₹{plan.requirements.budget.toLocaleString('en-IN')})
              </span>
            </div>
          </div>

          {/* Core Logistics Summary */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 mb-6 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                Selected Transit Corridor
              </span>
              <span className="font-extrabold text-neutral-900 text-sm block">
                {plan.selectedTransport.name} ({plan.selectedTransport.type.toUpperCase()})
              </span>
              <span className="text-neutral-600">
                Duration: {plan.selectedTransport.duration} • Total: ₹{plan.selectedTransport.totalCost.toLocaleString('en-IN')}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                Selected Lodging Quarters
              </span>
              <span className="font-extrabold text-neutral-900 text-sm block">
                {plan.selectedAccommodation.name}
              </span>
              <span className="text-neutral-600">
                {plan.selectedAccommodation.location} • Total: ₹{plan.selectedAccommodation.totalCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Budget Line-Items */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Expense Allocation Breakdown
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
              <div className="p-2.5 rounded-xl border border-neutral-200 bg-white">
                <span className="text-[10px] text-neutral-400 block">Transit</span>
                <span className="font-bold text-neutral-900">₹{plan.budget.transport.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-2.5 rounded-xl border border-neutral-200 bg-white">
                <span className="text-[10px] text-neutral-400 block">Stay</span>
                <span className="font-bold text-neutral-900">₹{plan.budget.accommodation.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-2.5 rounded-xl border border-neutral-200 bg-white">
                <span className="text-[10px] text-neutral-400 block">Food</span>
                <span className="font-bold text-neutral-900">₹{plan.budget.food.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-2.5 rounded-xl border border-neutral-200 bg-white">
                <span className="text-[10px] text-neutral-400 block">Activities</span>
                <span className="font-bold text-neutral-900">₹{plan.budget.activities.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-2.5 rounded-xl border border-neutral-200 bg-white">
                <span className="text-[10px] text-neutral-400 block">Local Cab</span>
                <span className="font-bold text-neutral-900">₹{plan.budget.localTransport.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-2.5 rounded-xl border border-neutral-200 bg-white">
                <span className="text-[10px] text-neutral-400 block">Reserve</span>
                <span className="font-bold text-neutral-900">₹{plan.budget.miscellaneous.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Day by Day schedule */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
              Chronological Daily Schedule
            </h3>
            <div className="space-y-4">
              {plan.itinerary.map((dayPlan) => (
                <div key={dayPlan.day} className="border border-neutral-200 rounded-xl p-3.5 bg-white">
                  <div className="font-bold text-sm text-neutral-900 mb-2 flex items-center justify-between border-b border-neutral-100 pb-1.5">
                    <span>DAY {dayPlan.day}: {dayPlan.title}</span>
                    <span className="text-xs text-neutral-500 font-normal">{dayPlan.summary}</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {dayPlan.items.map((item, idx) => (
                      <div key={idx} className="flex items-baseline justify-between text-neutral-700">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-neutral-400 w-16 flex-shrink-0">{item.time}</span>
                          <span className="font-semibold text-neutral-900">{item.activity}</span>
                          <span className="text-neutral-500 text-[11px]">({item.location})</span>
                        </div>
                        <span className="font-mono text-neutral-600 font-medium">
                          {item.estimatedCost === 0 ? 'Free' : `₹${item.estimatedCost}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-4 border-t border-neutral-200 text-center text-[10px] text-neutral-400 font-mono">
            {plan.verificationNote} • Anakin Forge Hackathon 2026
          </div>

        </div>

      </div>
    </div>
  );
};
