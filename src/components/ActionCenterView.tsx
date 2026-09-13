import React, { useState } from 'react';
import { 
  CheckCheck, 
  ExternalLink, 
  Share2, 
  Bookmark, 
  FileDown, 
  Map, 
  Plane, 
  Hotel, 
  Sparkles, 
  Check, 
  X, 
  Navigation,
  Compass,
  AlertCircle
} from 'lucide-react';
import { CompleteTripPlan } from '../types';

interface ActionCenterViewProps {
  plan: CompleteTripPlan;
  onSaveTrip: () => void;
  onOpenExportModal: () => void;
  isTripSaved: boolean;
}

export const ActionCenterView: React.FC<ActionCenterViewProps> = ({
  plan,
  onSaveTrip,
  onOpenExportModal,
  isTripSaved
}) => {
  const [activeModal, setActiveModal] = useState<'transport' | 'stay' | 'attraction' | 'map' | 'share' | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<string | null>(null);

  const handleShare = () => {
    const summary = `Tripora AI Trip: ${plan.requirements.durationDays}-Day ${plan.requirements.destination} from ${plan.requirements.from} for ${plan.requirements.travelers} travelers (Budget: ₹${plan.requirements.budget.toLocaleString('en-IN')}). Plan generated autonomously!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 3000);
    }
    setActiveModal('share');
  };

  return (
    <section className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm" id="action-center-section">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">
              STAGE 5: AGENT ACTION EXECUTION
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight font-display flex items-center gap-2">
            <Navigation className="w-6 h-6 text-amber-600" />
            ACTION CENTER
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Execute tangible agent actions: inspect booking options, view route maps, save, share, and export.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="btn-save-trip"
            onClick={onSaveTrip}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              isTripSaved
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800'
            }`}
          >
            {isTripSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isTripSaved ? 'Trip Saved' : 'Save Trip'}</span>
          </button>

          <button
            type="button"
            id="btn-export-itinerary"
            onClick={onOpenExportModal}
            className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Export Itinerary</span>
          </button>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Action 1: View Transport */}
        <button
          type="button"
          id="action-view-transport"
          onClick={() => setActiveModal('transport')}
          className="p-4 rounded-2xl border border-neutral-200 hover:border-amber-400 bg-neutral-50 hover:bg-white text-left transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Plane className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-extrabold text-neutral-900 mb-1 font-display">
              View Transport Option
            </h4>
            <p className="text-xs text-neutral-500 line-clamp-2">
              {plan.selectedTransport.name} • ₹{plan.selectedTransport.totalCost.toLocaleString('en-IN')}
            </p>
          </div>
          <span className="mt-3 text-xs font-bold text-amber-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            Open booking option <ExternalLink className="w-3 h-3" />
          </span>
        </button>

        {/* Action 2: View Accommodation */}
        <button
          type="button"
          id="action-view-stay"
          onClick={() => setActiveModal('stay')}
          className="p-4 rounded-2xl border border-neutral-200 hover:border-amber-400 bg-neutral-50 hover:bg-white text-left transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Hotel className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-extrabold text-neutral-900 mb-1 font-display">
              View Accommodation
            </h4>
            <p className="text-xs text-neutral-500 line-clamp-2">
              {plan.selectedAccommodation.name} • {plan.selectedAccommodation.type}
            </p>
          </div>
          <span className="mt-3 text-xs font-bold text-amber-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            Open stay option <ExternalLink className="w-3 h-3" />
          </span>
        </button>

        {/* Action 3: View Attractions */}
        <button
          type="button"
          id="action-view-attractions"
          onClick={() => setActiveModal('attraction')}
          className="p-4 rounded-2xl border border-neutral-200 hover:border-amber-400 bg-neutral-50 hover:bg-white text-left transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-extrabold text-neutral-900 mb-1 font-display">
              View Top Attractions
            </h4>
            <p className="text-xs text-neutral-500 line-clamp-2">
              {plan.selectedActivities.length} curated experiences in {plan.requirements.destination}
            </p>
          </div>
          <span className="mt-3 text-xs font-bold text-amber-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            Browse activities <ExternalLink className="w-3 h-3" />
          </span>
        </button>

        {/* Action 4: Open Interactive Map */}
        <button
          type="button"
          id="action-open-map"
          onClick={() => setActiveModal('map')}
          className="p-4 rounded-2xl border border-neutral-200 hover:border-amber-400 bg-neutral-50 hover:bg-white text-left transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Map className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-extrabold text-neutral-900 mb-1 font-display">
              Open Destination Map
            </h4>
            <p className="text-xs text-neutral-500 line-clamp-2">
              Interactive route simulation between {plan.requirements.from} & {plan.requirements.destination}
            </p>
          </div>
          <span className="mt-3 text-xs font-bold text-amber-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            View route & pins <ExternalLink className="w-3 h-3" />
          </span>
        </button>

      </div>

      {/* Modals for Action Items */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-neutral-200 relative animate-in fade-in zoom-in duration-150">
            
            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                setBookingConfirmed(null);
              }}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Transport Modal Content */}
            {activeModal === 'transport' && (
              <div>
                <div className="flex items-center gap-2 text-sky-600 mb-2">
                  <Plane className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Transport Reservation Preview</span>
                </div>
                <h3 className="text-xl font-extrabold text-neutral-900 font-display mb-1">
                  {plan.selectedTransport.name}
                </h3>
                <p className="text-xs text-neutral-500 mb-4">
                  Operator: {plan.selectedTransport.operator} • Route: {plan.requirements.from} → {plan.requirements.destination}
                </p>

                <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-2 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Duration</span>
                    <span className="font-bold text-neutral-900">{plan.selectedTransport.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Travelers</span>
                    <span className="font-bold text-neutral-900">{plan.requirements.travelers} Pax</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Total Fare</span>
                    <span className="font-bold text-neutral-900">₹{plan.selectedTransport.totalCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Verification</span>
                    <span className="text-emerald-700 font-bold">{plan.selectedTransport.verificationStatus}</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl mb-4">
                  <span className="font-semibold">Demo Booking Integration:</span> Real-world direct link is simulated for the hackathon demonstration.
                </div>

                {bookingConfirmed === 'transport' ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl font-bold flex items-center gap-2">
                    <CheckCheck className="w-4 h-4 text-emerald-600" />
                    <span>Seat reservation simulated successfully! Reference: {plan.selectedTransport.bookingRef}</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setBookingConfirmed('transport')}
                    className="w-full py-3 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Simulate Direct Transit Booking
                  </button>
                )}
              </div>
            )}

            {/* Stay Modal Content */}
            {activeModal === 'stay' && (
              <div>
                <div className="flex items-center gap-2 text-indigo-600 mb-2">
                  <Hotel className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Accommodation Preview</span>
                </div>
                <h3 className="text-xl font-extrabold text-neutral-900 font-display mb-1">
                  {plan.selectedAccommodation.name}
                </h3>
                <p className="text-xs text-neutral-500 mb-4">
                  Location: {plan.selectedAccommodation.location} • Tier: {plan.selectedAccommodation.type}
                </p>

                <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-2 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Room Type</span>
                    <span className="font-bold text-neutral-900">{plan.selectedAccommodation.roomType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Stay Duration</span>
                    <span className="font-bold text-neutral-900">{plan.requirements.durationDays - 1} Nights</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Total Price</span>
                    <span className="font-bold text-neutral-900">₹{plan.selectedAccommodation.totalCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Guest Rating</span>
                    <span className="font-bold text-amber-600">★ {plan.selectedAccommodation.rating}/5.0</span>
                  </div>
                </div>

                {bookingConfirmed === 'stay' ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl font-bold flex items-center gap-2">
                    <CheckCheck className="w-4 h-4 text-emerald-600" />
                    <span>Stay reservation held! Mock Confirmation: STAY-{Math.floor(1000 + Math.random()*9000)}</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setBookingConfirmed('stay')}
                    className="w-full py-3 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Simulate Hotel Reservation Hold
                  </button>
                )}
              </div>
            )}

            {/* Attraction Modal Content */}
            {activeModal === 'attraction' && (
              <div>
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Curated Attractions</span>
                </div>
                <h3 className="text-xl font-extrabold text-neutral-900 font-display mb-3">
                  Top Recommended Venues
                </h3>
                
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 text-xs">
                  {plan.selectedActivities.map((act) => (
                    <div key={act.id} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-neutral-900">{act.name}</div>
                        <div className="text-[11px] text-neutral-500">{act.location} • {act.category}</div>
                      </div>
                      <span className="font-extrabold font-mono text-neutral-800">
                        {act.estimatedCostPerPerson === 0 ? 'Free' : `₹${act.estimatedCostPerPerson}`}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full mt-4 py-3 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                >
                  Close Activities
                </button>
              </div>
            )}

            {/* Map Modal Content */}
            {activeModal === 'map' && (
              <div>
                <div className="flex items-center gap-2 text-amber-600 mb-2">
                  <Map className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Simulated Geographic Route</span>
                </div>
                <h3 className="text-xl font-extrabold text-neutral-900 font-display mb-2">
                  {plan.requirements.from} → {plan.requirements.destination}
                </h3>
                
                {/* Visual SVG Map Simulation */}
                <div className="w-full h-48 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 rounded-2xl border border-neutral-700 flex flex-col items-center justify-center p-4 relative overflow-hidden mb-4">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  <div className="relative z-10 flex items-center justify-between w-full max-w-xs px-4">
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-neutral-900 flex items-center justify-center font-bold text-xs mx-auto mb-1 shadow-lg shadow-amber-500/50">
                        A
                      </div>
                      <span className="text-xs font-bold text-white block">{plan.requirements.from}</span>
                      <span className="text-[10px] text-neutral-400">Origin</span>
                    </div>

                    <div className="flex-grow flex items-center justify-center px-4 relative">
                      <div className="h-0.5 w-full bg-amber-500/50 border-t border-dashed border-amber-400"></div>
                      <Plane className="w-4 h-4 text-amber-400 absolute" />
                    </div>

                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-neutral-900 flex items-center justify-center font-bold text-xs mx-auto mb-1 shadow-lg shadow-emerald-500/50">
                        B
                      </div>
                      <span className="text-xs font-bold text-white block">{plan.requirements.destination}</span>
                      <span className="text-[10px] text-neutral-400">Destination</span>
                    </div>
                  </div>

                  <div className="mt-4 text-[11px] font-mono text-neutral-400 z-10">
                    Calculated optimal corridor: {plan.selectedTransport.duration} transit
                  </div>
                </div>

                <p className="text-xs text-neutral-500 mb-4">
                  Points of interest centered around {plan.selectedAccommodation.location} and key attractions.
                </p>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full py-3 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            )}

            {/* Share Modal Content */}
            {activeModal === 'share' && (
              <div>
                <div className="flex items-center gap-2 text-amber-600 mb-2">
                  <Share2 className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Share Trip Itinerary</span>
                </div>
                <h3 className="text-xl font-extrabold text-neutral-900 font-display mb-2">
                  Share Your Plan
                </h3>
                <p className="text-xs text-neutral-500 mb-4">
                  Send this autonomous plan to your travel companions or judges.
                </p>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700 font-mono mb-4 break-words">
                  {`Tripora AI: ${plan.requirements.durationDays}-Day ${plan.requirements.destination} from ${plan.requirements.from} for ${plan.requirements.travelers} people under ₹${plan.requirements.budget.toLocaleString('en-IN')}`}
                </div>

                {shareCopied && (
                  <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Copied trip plan to clipboard!</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full py-3 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                >
                  Copy Trip Summary
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
