import React from 'react';
import { ExternalLink, ShieldCheck, Database, CheckCircle, AlertCircle, Info, Link2 } from 'lucide-react';
import { ResearchSource } from '../types';

interface SourcesAndVerificationViewProps {
  sources: ResearchSource[];
  verificationNote: string;
}

export const SourcesAndVerificationView: React.FC<SourcesAndVerificationViewProps> = ({
  sources,
  verificationNote
}) => {
  return (
    <section className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm" id="sources-verification-section">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">
              STAGE 6: AUDIT & SOURCE CITATIONS
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight font-display flex items-center gap-2">
            <Database className="w-6 h-6 text-amber-600" />
            RESEARCH SOURCES & DATA VERIFICATION
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Transparency on data inputs, citation domains, and live calibration status.
          </p>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 text-amber-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Demo Data Calibration Active</span>
        </div>
      </div>

      {/* Verification & Reality Check Box */}
      <div className="mb-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-0.5">
              Verification / Reality Check
            </div>
            <p className="text-xs font-medium text-amber-900">
              {verificationNote}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-[11px] font-bold">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-100/90 text-emerald-800 border border-emerald-300">
            ✓ Verified Sights
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-sky-100/90 text-sky-800 border border-sky-300">
            ★ Partially Verified Transit
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-100/90 text-amber-900 border border-amber-300">
            • Demo Data Rates
          </span>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="research-sources-grid">
        {sources.map((src) => (
          <div
            key={src.id}
            id={`source-card-${src.id}`}
            className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-neutral-800 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-neutral-400" />
                  {src.domain}
                </span>
                <span className="text-[10px] uppercase font-bold text-neutral-500 bg-neutral-200/80 px-2 py-0.5 rounded">
                  {src.category}
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-neutral-900 font-display mb-1">
                {src.name}
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {src.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between">
              <span className="text-[10px] font-mono text-neutral-400">
                Data Tier: Demo Indexed
              </span>
              <button
                type="button"
                onClick={() => window.open(`https://${src.domain}`, '_blank', 'noopener,noreferrer')}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Open source</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
