import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Calendar, Users, IndianRupee, Compass, Heart, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TripRequirements, TravelStyle } from '../types';
import { parseTripQueryWithAI, parseTripQueryLocally } from '../services/nlpParser';

interface TripInputSectionProps {
  initialRequirements?: TripRequirements;
  isProcessing: boolean;
  onLaunchAgent: (requirements: TripRequirements) => void;
}

const SAMPLE_QUERIES = [
  {
    label: 'Goa 4-Day (Hackathon Scenario)',
    text: 'Plan a 4-day Goa trip from Hyderabad for 2 people under ₹30,000. I like beaches, food and sightseeing.'
  },
  {
    label: 'Manali 5-Day Adventure',
    text: 'Plan a 5-day Manali mountain trip from Delhi for 2 people under ₹35,000. Interested in adventure, nature and local food.'
  },
  {
    label: 'Jaipur 3-Day Royal Heritage',
    text: 'Plan a 3-day Jaipur heritage trip from Delhi for 2 people under ₹25,000. Love culture, forts and shopping.'
  },
  {
    label: 'Kerala 4-Day Backwaters',
    text: 'Plan a 4-day Kerala backwater trip from Bangalore for 2 people under ₹32,000. Relaxation and culinary experiences.'
  }
];

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

export const TripInputSection: React.FC<TripInputSectionProps> = ({
  initialRequirements,
  isProcessing,
  onLaunchAgent
}) => {
  const [nlpQuery, setNlpQuery] = useState<string>(
    initialRequirements?.naturalLanguageQuery || ''
  );

  const [from, setFrom] = useState<string>(initialRequirements?.from || 'Hyderabad');
  const [destination, setDestination] = useState<string>(initialRequirements?.destination || 'Goa');
  const [startDate, setStartDate] = useState<string>(
    initialRequirements?.startDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  );
  const [durationDays, setDurationDays] = useState<number>(initialRequirements?.durationDays || 4);
  const [travelers, setTravelers] = useState<number>(initialRequirements?.travelers || 2);
  const [budget, setBudget] = useState<number>(initialRequirements?.budget || 30000);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(initialRequirements?.travelStyle || 'Balanced');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialRequirements?.interests || ['Beaches', 'Food', 'Sightseeing']
  );

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isParsingNlp, setIsParsingNlp] = useState<boolean>(false);
  const [lastParsedQuery, setLastParsedQuery] = useState<string>('');

  // Handle Natural Language Parse
  const handleApplyNlp = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsParsingNlp(true);
    setValidationError(null);

    // Instant local parse first
    const local = parseTripQueryLocally(queryText);
    if (local.from) setFrom(local.from);
    if (local.destination) setDestination(local.destination);
    if (local.durationDays) setDurationDays(local.durationDays);
    if (local.travelers) setTravelers(local.travelers);
    if (local.budget) setBudget(local.budget);
    if (local.travelStyle) setTravelStyle(local.travelStyle);
    if (local.interests && local.interests.length > 0) setSelectedInterests(local.interests);

    // Optional server parse enhancement
    try {
      const serverResult = await parseTripQueryWithAI(queryText);
      if (serverResult.destination) setDestination(serverResult.destination);
      if (serverResult.from) setFrom(serverResult.from);
      if (serverResult.durationDays) setDurationDays(serverResult.durationDays);
      if (serverResult.travelers) setTravelers(serverResult.travelers);
      if (serverResult.budget) setBudget(serverResult.budget);
      if (serverResult.travelStyle) setTravelStyle(serverResult.travelStyle);
      if (serverResult.interests && serverResult.interests.length > 0) setSelectedInterests(serverResult.interests);
    } catch {
      // Gracefully silent
    } finally {
      setIsParsingNlp(false);
      setLastParsedQuery(queryText);
    }
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter(i => i !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Friendly Validation
    if (!destination.trim()) {
      setValidationError('Please enter a valid destination.');
      return;
    }
    if (!from.trim()) {
      setValidationError('Please enter your starting location.');
      return;
    }
    if (!durationDays || durationDays < 1 || durationDays > 14) {
      setValidationError('Trip duration must be between 1 and 14 days.');
      return;
    }
    if (!travelers || travelers < 1 || travelers > 20) {
      setValidationError('Please specify at least 1 traveler.');
      return;
    }
    if (!budget || budget < 5000) {
      setValidationError('Please enter a realistic minimum budget (at least ₹5,000).');
      return;
    }

    const payload: TripRequirements = {
      from: from.trim(),
      destination: destination.trim(),
      startDate,
      durationDays,
      travelers,
      budget,
      travelStyle,
      interests: selectedInterests,
      naturalLanguageQuery: nlpQuery
    };

    onLaunchAgent(payload);
  };

  return (
    <section className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xl shadow-neutral-200/40 relative overflow-hidden">
      {/* Background subtle styling */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Header */}
      <div className="mb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Autonomous Travel Planning Engine
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-display">
          What kind of trip are you planning?
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          Type your journey in freeform natural language or customize the structured parameters below.
        </p>
      </div>

      {/* Natural Language Request Box */}
      <div className="mb-6 relative z-10" id="nlp-container">
        <label htmlFor="nlp-input" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
          Natural Language Prompt
        </label>
        <div className="relative">
          <textarea
            id="nlp-input"
            rows={2}
            value={nlpQuery}
            onChange={(e) => setNlpQuery(e.target.value)}
            placeholder="e.g. Plan a 4-day Goa trip from Hyderabad for 2 people under ₹30,000. I like beaches, food and sightseeing."
            className="w-full px-4 py-3 text-sm sm:text-base rounded-2xl border border-neutral-300 bg-neutral-50/70 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 outline-none transition-all resize-none font-sans placeholder:text-neutral-400"
          />
          {nlpQuery.trim() && (
            <button
              type="button"
              id="btn-parse-nlp"
              disabled={isParsingNlp}
              onClick={() => handleApplyNlp(nlpQuery)}
              className="absolute right-3 bottom-3 px-3 py-1.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isParsingNlp ? 'Parsing...' : 'Sync to Fields'}</span>
            </button>
          )}
        </div>

        {/* Quick sample prompt chips for judges */}
        <div className="mt-3 flex items-center flex-wrap gap-1.5">
          <span className="text-xs font-semibold text-neutral-400 mr-1">Demo Presets:</span>
          {SAMPLE_QUERIES.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              id={`chip-sample-${idx}`}
              onClick={() => {
                setNlpQuery(sample.text);
                handleApplyNlp(sample.text);
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-amber-100 hover:text-amber-900 text-neutral-700 font-medium transition-colors border border-neutral-200"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative my-6 flex items-center">
        <div className="flex-grow border-t border-neutral-200"></div>
        <span className="flex-shrink mx-4 text-xs uppercase font-bold text-neutral-400 tracking-wider">
          Structured Configuration
        </span>
        <div className="flex-grow border-t border-neutral-200"></div>
      </div>

      {/* Structured Form */}
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10" id="trip-parameters-form">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Starting Location */}
          <div>
            <label htmlFor="input-from" className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              From (Origin)
            </label>
            <input
              id="input-from"
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="e.g. Hyderabad"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-semibold text-neutral-900 bg-neutral-50/50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
              required
            />
          </div>

          {/* Destination */}
          <div>
            <label htmlFor="input-destination" className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              Destination
            </label>
            <input
              id="input-destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Goa, Jaipur, Manali"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-semibold text-neutral-900 bg-neutral-50/50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
              required
            />
          </div>

          {/* Start Date & Duration */}
          <div>
            <label htmlFor="input-duration" className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              Duration (Days)
            </label>
            <div className="flex items-center gap-2">
              <input
                id="input-duration"
                type="number"
                min={1}
                max={14}
                value={durationDays}
                onChange={(e) => setDurationDays(parseInt(e.target.value, 10) || 1)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-semibold text-neutral-900 bg-neutral-50/50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                required
              />
            </div>
          </div>

          {/* Travelers */}
          <div>
            <label htmlFor="input-travelers" className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-neutral-400" />
              Travelers
            </label>
            <input
              id="input-travelers"
              type="number"
              min={1}
              max={20}
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value, 10) || 1)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-semibold text-neutral-900 bg-neutral-50/50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
              required
            />
          </div>

        </div>

        {/* Second Row: Budget and Travel Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Budget */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="input-budget" className="text-xs font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                Total Budget (INR)
              </label>
              <span className="text-xs font-extrabold text-neutral-900 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                ₹{budget.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              id="input-budget"
              type="number"
              step={1000}
              min={5000}
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-semibold text-neutral-900 bg-neutral-50/50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
              required
            />
          </div>

          {/* Travel Style */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-neutral-400" />
              Travel Style
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {TRAVEL_STYLES.map((style) => (
                <button
                  key={style}
                  type="button"
                  id={`style-btn-${style.toLowerCase()}`}
                  onClick={() => setTravelStyle(style)}
                  className={`py-2 px-1 text-xs font-bold rounded-xl text-center border transition-all ${
                    travelStyle === style
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Interests */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            Interests & Preferences (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_INTERESTS.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  id={`interest-btn-${interest.toLowerCase()}`}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/20'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{interest}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Validation error display */}
        {validationError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">{validationError}</span>
          </div>
        )}

        {/* Demo Mode Notice */}
        <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="font-medium">
              <strong>Demo Research Mode</strong> — sample data used for hackathon demonstration. Live APIs can be connected seamlessly.
            </span>
          </div>
          <span className="font-mono text-[11px] text-amber-700 font-bold hidden sm:inline">Anakin Forge 2026</span>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            id="launch-trip-agent-button"
            disabled={isProcessing}
            className="w-full sm:w-auto sm:min-w-[280px] px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:via-orange-500 hover:to-amber-600 text-white font-display font-extrabold text-base sm:text-lg tracking-wide shadow-lg shadow-orange-600/25 active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-75 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
            <span>{isProcessing ? 'AGENT RESEARCHING...' : 'LAUNCH TRIP AGENT'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </form>
    </section>
  );
};
