import React, { useEffect, useRef } from 'react';
import { Check, Loader2, Sparkles, Terminal, Cpu } from 'lucide-react';
import { AgentWorkflowStep } from '../types';

interface AgentWorkflowTimelineProps {
  steps: AgentWorkflowStep[];
  currentStepIndex: number;
  isReplanning?: boolean;
  agentLogs: string[];
}

export const AgentWorkflowTimeline: React.FC<AgentWorkflowTimelineProps> = ({
  steps,
  currentStepIndex,
  isReplanning = false,
  agentLogs
}) => {
  const logScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs as new steps stream in
  useEffect(() => {
    if (logScrollRef.current) {
      logScrollRef.current.scrollTop = logScrollRef.current.scrollHeight;
    }
  }, [agentLogs]);

  const completedCount = steps.filter(s => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <section className="bg-neutral-900 text-white rounded-3xl border border-neutral-800 p-6 sm:p-8 shadow-2xl overflow-hidden relative" id="agent-workflow-section">
      {/* Glow aesthetic */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              {isReplanning ? 'AUTONOMOUS REPLANNING CYCLE' : 'AUTONOMOUS AGENT ORCHESTRATION'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display text-white">
            {isReplanning ? 'Re-Evaluating Plan Constraints' : 'Tripora Autonomous Agent Workflow'}
          </h3>
        </div>

        {/* Progress Metric */}
        <div className="flex items-center gap-4 self-start sm:self-auto bg-neutral-800/80 px-4 py-2 rounded-2xl border border-neutral-700/60">
          <div className="text-right">
            <div className="text-xs text-neutral-400 font-medium">Agent Progress</div>
            <div className="text-base font-extrabold text-amber-400 font-mono">
              {completedCount} / {steps.length} Steps ({progressPercent}%)
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-neutral-950 flex items-center justify-center border border-neutral-700">
            {completedCount === steps.length ? (
              <Check className="w-5 h-5 text-emerald-400" />
            ) : (
              <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
            )}
          </div>
        </div>
      </div>

      {/* Two-column layout: Left is Steps Timeline, Right is Agent Telemetry Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Step Items Timeline */}
        <div className="lg:col-span-7 space-y-2.5">
          {steps.map((step, idx) => {
            const isDone = step.status === 'completed';
            const isCurrent = step.status === 'working';
            const isPending = step.status === 'pending';

            return (
              <div
                key={step.id}
                id={`workflow-step-${step.id}`}
                className={`p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 ${
                  isCurrent
                    ? 'bg-amber-950/30 border-amber-500/50 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/30'
                    : isDone
                    ? 'bg-neutral-950/60 border-neutral-800/90 text-neutral-200'
                    : 'bg-neutral-950/20 border-neutral-800/30 opacity-50 text-neutral-500'
                }`}
              >
                {/* Step indicator circle */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : isCurrent
                      ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/30 animate-pulse'
                      : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : step.id}
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-sm font-bold tracking-tight ${isCurrent ? 'text-amber-400' : isDone ? 'text-white' : 'text-neutral-400'}`}>
                      {step.title}
                    </h4>
                    <span
                      className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full font-bold ${
                        isDone
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                          : isCurrent
                          ? 'bg-amber-950 text-amber-300 border border-amber-700/80'
                          : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Agent Reasoning & Log Stream */}
        <div className="lg:col-span-5 flex flex-col h-full min-h-[280px]">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>Agent Execution Stream</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            <div
              ref={logScrollRef}
              className="flex-grow space-y-2 overflow-y-auto max-h-[320px] font-mono text-[11px] leading-relaxed pr-1 scrollbar-thin scrollbar-thumb-neutral-800"
            >
              {agentLogs.length === 0 ? (
                <div className="text-neutral-600 italic py-4 text-center">
                  Agent initialized. Awaiting pipeline start...
                </div>
              ) : (
                agentLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2 text-neutral-300">
                    <span className="text-amber-500 select-none">›</span>
                    <span>{log}</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
              <span>Model: gemini-3.8-flash</span>
              <span>READ • REASON • ACT • REPLAN</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
