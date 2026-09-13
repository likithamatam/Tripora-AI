import React from 'react';
import { BookmarkCheck, MapPin, Calendar, Users, IndianRupee, Trash2, ArrowRight, FileDown, Plus } from 'lucide-react';
import { CompleteTripPlan } from '../types';

interface MyTripsViewProps {
  savedTrips: CompleteTripPlan[];
  onOpenTrip: (trip: CompleteTripPlan) => void;
  onDeleteTrip: (tripId: string) => void;
  onNewTrip: () => void;
}

export const MyTripsView: React.FC<MyTripsViewProps> = ({
  savedTrips,
  onOpenTrip,
  onDeleteTrip,
  onNewTrip
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="my-trips-view">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <BookmarkCheck className="w-3.5 h-3.5" />
            Local Persistence
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-display">
            My Saved Trips
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            Revisit, open, or manage autonomously planned itineraries saved on this device.
          </p>
        </div>

        <button
          type="button"
          onClick={onNewTrip}
          className="px-5 py-2.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Plan New Trip</span>
        </button>
      </div>

      {savedTrips.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <BookmarkCheck className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 mb-1 font-display">
            No saved trips yet
          </h3>
          <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
            Launch the Tripora AI agent for any destination, then click “Save Trip” in the Action Center to store it here.
          </p>
          <button
            type="button"
            onClick={onNewTrip}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            Launch First Trip Agent
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTrips.map((trip) => (
            <div
              key={trip.id}
              id={`saved-trip-card-${trip.id}`}
              className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    {trip.requirements.travelStyle} Style
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {new Date(trip.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-neutral-900 font-display mb-1">
                  {trip.requirements.destination}
                </h3>
                <p className="text-xs text-neutral-500 font-medium flex items-center gap-1 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  Departing from {trip.requirements.from}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs mb-4">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Duration & Pax</span>
                    <span className="font-bold text-neutral-800">
                      {trip.requirements.durationDays} Days • {trip.requirements.travelers} Pax
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Est. Trip Cost</span>
                    <span className="font-extrabold text-neutral-900 font-mono">
                      ₹{trip.budget.totalEstimatedCost.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Selected options preview */}
                <div className="text-xs text-neutral-600 space-y-1 mb-4">
                  <div className="truncate">
                    <strong className="text-neutral-700">Transit:</strong> {trip.selectedTransport.name}
                  </div>
                  <div className="truncate">
                    <strong className="text-neutral-700">Stay:</strong> {trip.selectedAccommodation.name}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onDeleteTrip(trip.id)}
                  title="Delete saved trip"
                  className="p-2.5 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenTrip(trip)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Open Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
