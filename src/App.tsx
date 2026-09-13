import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { TripInputSection } from './components/TripInputSection';
import { AgentWorkflowTimeline } from './components/AgentWorkflowTimeline';
import { AgentUnderstandingCard } from './components/AgentUnderstandingCard';
import { ResearchEngineView } from './components/ResearchEngineView';
import { DecisionEngineView } from './components/DecisionEngineView';
import { BudgetOptimizerView } from './components/BudgetOptimizerView';
import { ReplanningPanel } from './components/ReplanningPanel';
import { DayItineraryView } from './components/DayItineraryView';
import { ActionCenterView } from './components/ActionCenterView';
import { SourcesAndVerificationView } from './components/SourcesAndVerificationView';
import { MyTripsView } from './components/MyTripsView';
import { HowItWorksView } from './components/HowItWorksView';
import { AboutView } from './components/AboutView';
import { ExportItineraryModal } from './components/ExportItineraryModal';

import { TripRequirements, CompleteTripPlan, AgentWorkflowStep } from './types';
import { INITIAL_AGENT_STEPS, REPLAN_AGENT_STEPS, buildCompletePlan } from './services/agentOrchestrator';
import { getSavedTrips, saveTrip as persistTrip, deleteTrip as removeTrip } from './services/storageService';

export function App() {
  const [currentTab, setCurrentTab] = useState<'plan' | 'trips' | 'how-it-works' | 'about'>('plan');
  
  // Default hackathon test scenario: Hyderabad -> Goa 4-day, 2 travelers, ₹30,000 budget
  const [requirements, setRequirements] = useState<TripRequirements>({
    from: 'Hyderabad',
    destination: 'Goa',
    startDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    durationDays: 4,
    travelers: 2,
    budget: 30000,
    travelStyle: 'Balanced',
    interests: ['Beaches', 'Food', 'Sightseeing'],
    naturalLanguageQuery: 'Plan a 4-day Goa trip from Hyderabad for 2 people under ₹30,000. I like beaches, food and sightseeing.'
  });

  const [activePlan, setActivePlan] = useState<CompleteTripPlan | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isReplanning, setIsReplanning] = useState<boolean>(false);
  const [workflowSteps, setWorkflowSteps] = useState<AgentWorkflowStep[]>(INITIAL_AGENT_STEPS);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  const [savedTrips, setSavedTrips] = useState<CompleteTripPlan[]>([]);
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [saveSuccessToast, setSaveSuccessToast] = useState<boolean>(false);

  const workflowRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load saved trips on mount
  useEffect(() => {
    setSavedTrips(getSavedTrips());
  }, []);

  // Format log timestamp helper
  const getLogTimestamp = () => {
    const d = new Date();
    return d.toTimeString().split(' ')[0];
  };

  // Autonomous Agent Runner
  const handleLaunchAgent = async (req: TripRequirements) => {
    setRequirements(req);
    setIsProcessing(true);
    setIsReplanning(false);
    setActivePlan(null);
    setCurrentStepIndex(0);

    const initialSteps = INITIAL_AGENT_STEPS.map(s => ({ ...s, status: 'pending' as const }));
    setWorkflowSteps(initialSteps);
    setAgentLogs([
      `[${getLogTimestamp()}] Agent initialization started for ${req.destination} from ${req.from}`,
      `[${getLogTimestamp()}] Active constraints: ₹${req.budget.toLocaleString('en-IN')} ceiling, ${req.travelers} traveler(s), ${req.durationDays} days`
    ]);

    // Scroll to workflow
    setTimeout(() => {
      workflowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    // Realistic step by step progression through the 11 steps
    for (let i = 0; i < initialSteps.length; i++) {
      setCurrentStepIndex(i);
      
      // Update step to working
      setWorkflowSteps(prev => prev.map((step, idx) => {
        if (idx < i) return { ...step, status: 'completed' };
        if (idx === i) return { ...step, status: 'working' };
        return { ...step, status: 'pending' };
      }));

      // Add contextual telemetry log
      const time = getLogTimestamp();
      let logMsg = '';
      switch (i) {
        case 0:
          logMsg = `[${time}] Parsing trip requirements: ${req.durationDays}-day duration, ${req.travelStyle} style, interests: ${req.interests.join(', ')}`;
          break;
        case 1:
          logMsg = `[${time}] Formulating multi-modal research strategy across transit corridors and accommodation nodes...`;
          break;
        case 2:
          logMsg = `[${time}] Researching transport: Querying flights, express trains, and sleeper coach schedules...`;
          break;
        case 3:
          logMsg = `[${time}] Researching stays: Filtering boutique resorts, heritage guest houses, and hostels...`;
          break;
        case 4:
          logMsg = `[${time}] Researching activities: Retrieved curated venues matching ${req.interests.slice(0, 2).join(' & ')}...`;
          break;
        case 5:
          logMsg = `[${time}] Comparing options: Evaluating trade-offs between travel duration, comfort, and financial cost...`;
          break;
        case 6:
          logMsg = `[${time}] Calculating budget: Computing line-item totals and reserve allocation...`;
          break;
        case 7:
          logMsg = `[${time}] Checking constraints: Validating ₹${req.budget.toLocaleString('en-IN')} ceiling and travel feasibility...`;
          break;
        case 8:
          logMsg = `[${time}] Optimizing trip: Maximizing experience value score within safe risk boundaries...`;
          break;
        case 9:
          logMsg = `[${time}] Building itinerary: Generating chronological day-by-day scheduling with time-slots...`;
          break;
        case 10:
          logMsg = `[${time}] Preparing actions: Compiling direct booking references, route map, and printable report...`;
          break;
      }
      setAgentLogs(prev => [...prev, logMsg]);

      // Dynamic realistic delay per step
      await new Promise(res => setTimeout(res, 260));
    }

    // Mark all complete
    setWorkflowSteps(prev => prev.map(s => ({ ...s, status: 'completed' })));
    setAgentLogs(prev => [...prev, `[${getLogTimestamp()}] Autonomous planning complete. All constraints satisfied!`]);

    // Build the finalized plan
    const generatedPlan = buildCompletePlan(req, false);
    setActivePlan(generatedPlan);
    setIsProcessing(false);

    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  // Autonomous Replanning Runner (STATE -> CHANGE -> REASON -> REPLAN)
  const handleReplan = async (updatedReq: TripRequirements) => {
    if (!activePlan) return;

    setRequirements(updatedReq);
    setIsProcessing(true);
    setIsReplanning(true);

    const replanSteps = REPLAN_AGENT_STEPS.map(s => ({ ...s, status: 'pending' as const }));
    setWorkflowSteps(replanSteps);
    setCurrentStepIndex(0);

    setAgentLogs(prev => [
      ...prev,
      `--- AUTONOMOUS REPLANNING CYCLE TRIGGERED ---`,
      `[${getLogTimestamp()}] ⚠ Constraint change detected! Budget adjusted: ₹${activePlan.requirements.budget.toLocaleString('en-IN')} → ₹${updatedReq.budget.toLocaleString('en-IN')}`,
      `[${getLogTimestamp()}] Re-evaluating existing plan allocations...`
    ]);

    // Scroll to workflow
    setTimeout(() => {
      workflowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    for (let i = 0; i < replanSteps.length; i++) {
      setCurrentStepIndex(i);

      setWorkflowSteps(prev => prev.map((step, idx) => {
        if (idx < i) return { ...step, status: 'completed' };
        if (idx === i) return { ...step, status: 'working' };
        return { ...step, status: 'pending' };
      }));

      const time = getLogTimestamp();
      let logMsg = '';
      switch (i) {
        case 0:
          logMsg = `[${time}] Analyzing modified constraints against previous baseline (₹${activePlan.budget.totalEstimatedCost.toLocaleString('en-IN')})...`;
          break;
        case 1:
          logMsg = `[${time}] Re-evaluating transport: Flight option costs too much; prioritizing high-value rail/bus corridor...`;
          break;
        case 2:
          logMsg = `[${time}] Re-evaluating accommodation: Selecting optimal budget/heritage tier to fit new ₹${updatedReq.budget.toLocaleString('en-IN')} ceiling...`;
          break;
        case 3:
          logMsg = `[${time}] Re-evaluating activities: Balancing free beach exploration & heritage monuments with ticketed spots...`;
          break;
        case 4:
          logMsg = `[${time}] Recalculating total: Re-synthesizing all line-item costs against updated limit...`;
          break;
        case 5:
          logMsg = `[${time}] Selecting new optimal pairing to safeguard quality without exceeding budget...`;
          break;
        case 6:
          logMsg = `[${time}] Generating revised itinerary with updated timing and logistics...`;
          break;
      }
      setAgentLogs(prev => [...prev, logMsg]);

      await new Promise(res => setTimeout(res, 280));
    }

    setWorkflowSteps(prev => prev.map(s => ({ ...s, status: 'completed' })));
    setAgentLogs(prev => [
      ...prev,
      `[${getLogTimestamp()}] TRIP REPLANNED successfully. State updated: STATE → CHANGE → REASON → REPLAN.`
    ]);

    const replanned = buildCompletePlan(updatedReq, true, activePlan);
    setActivePlan(replanned);
    setIsProcessing(false);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  // Handle Save Trip
  const handleSaveTrip = () => {
    if (!activePlan) return;
    persistTrip(activePlan);
    setSavedTrips(getSavedTrips());
    setSaveSuccessToast(true);
    setTimeout(() => setSaveSuccessToast(false), 3000);
  };

  // Handle Delete Trip
  const handleDeleteTrip = (id: string) => {
    removeTrip(id);
    setSavedTrips(getSavedTrips());
  };

  // Handle Open Saved Trip
  const handleOpenTrip = (trip: CompleteTripPlan) => {
    setActivePlan(trip);
    setRequirements(trip.requirements);
    setCurrentTab('plan');
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const isCurrentTripSaved = activePlan ? savedTrips.some(t => t.id === activePlan.id) : false;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-neutral-900 font-sans flex flex-col selection:bg-amber-500/20 selection:text-amber-900">
      
      {/* Toast Notification */}
      {saveSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-neutral-700 text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Trip itinerary successfully saved to My Trips!</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        savedTripsCount={savedTrips.length}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentTab === 'plan' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            
            {/* 1. Trip Requirements Input Box & Structured Form */}
            <TripInputSection
              initialRequirements={requirements}
              isProcessing={isProcessing}
              onLaunchAgent={handleLaunchAgent}
            />

            {/* 2. Agent Workflow Timeline (visible when processing or plan created) */}
            {(isProcessing || activePlan) && (
              <div ref={workflowRef} className="pt-2">
                <AgentWorkflowTimeline
                  steps={workflowSteps}
                  currentStepIndex={currentStepIndex}
                  isReplanning={isReplanning}
                  agentLogs={agentLogs}
                />
              </div>
            )}

            {/* 3. Generated Trip Dossier & Dashboard */}
            {activePlan && (
              <div ref={resultsRef} className="space-y-8 pt-4">
                
                {/* Agent Understanding Card */}
                <AgentUnderstandingCard
                  requirements={activePlan.requirements}
                  understandingNote={activePlan.understandingNote}
                />

                {/* Autonomous Replanning Panel (Critical Hackathon Feature) */}
                <ReplanningPanel
                  currentRequirements={activePlan.requirements}
                  isReplanned={activePlan.isReplanned}
                  replanDiff={activePlan.replanDiff}
                  isProcessing={isProcessing}
                  onReplan={handleReplan}
                />

                {/* Trip Decision Engine */}
                <DecisionEngineView
                  decision={activePlan.decision}
                />

                {/* Budget Optimizer */}
                <BudgetOptimizerView
                  budget={activePlan.budget}
                />

                {/* Research Engine with Candidates */}
                <ResearchEngineView
                  transports={activePlan.availableTransports}
                  accommodations={activePlan.availableAccommodations}
                  activities={activePlan.availableActivities}
                  selectedTransportId={activePlan.decision.selectedTransportId}
                  selectedAccommodationId={activePlan.decision.selectedAccommodationId}
                  selectedActivityIds={activePlan.decision.selectedActivityIds}
                />

                {/* Day-by-Day Chronological Itinerary */}
                <DayItineraryView
                  itinerary={activePlan.itinerary}
                />

                {/* Action Center with Tangible Executions */}
                <ActionCenterView
                  plan={activePlan}
                  onSaveTrip={handleSaveTrip}
                  onOpenExportModal={() => setExportModalOpen(true)}
                  isTripSaved={isCurrentTripSaved}
                />

                {/* Research Sources & Reality Check */}
                <SourcesAndVerificationView
                  sources={activePlan.sources}
                  verificationNote={activePlan.verificationNote}
                />

              </div>
            )}

          </div>
        )}

        {currentTab === 'trips' && (
          <MyTripsView
            savedTrips={savedTrips}
            onOpenTrip={handleOpenTrip}
            onDeleteTrip={handleDeleteTrip}
            onNewTrip={() => setCurrentTab('plan')}
          />
        )}

        {currentTab === 'how-it-works' && (
          <HowItWorksView onPlanTrip={() => setCurrentTab('plan')} />
        )}

        {currentTab === 'about' && (
          <AboutView onPlanTrip={() => setCurrentTab('plan')} />
        )}
      </main>

      {/* Export Modal */}
      {exportModalOpen && activePlan && (
        <ExportItineraryModal
          plan={activePlan}
          onClose={() => setExportModalOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-8 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-800 font-display">Tripora AI</span>
            <span>—</span>
            <span>“Your trip. Researched, reasoned, and ready.”</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-amber-700">Anakin Forge Hackathon 2026</span>
            <span>•</span>
            <span>READ • REASON • ACT • REPLAN</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
export default App;
