import React from 'react';
import { IndianRupee, CheckCircle2, AlertTriangle, Lightbulb, TrendingDown, PiggyBank, ArrowDownRight } from 'lucide-react';
import { BudgetBreakdown } from '../types';

interface BudgetOptimizerViewProps {
  budget: BudgetBreakdown;
}

export const BudgetOptimizerView: React.FC<BudgetOptimizerViewProps> = ({ budget }) => {
  const categories = [
    { label: 'Transport', amount: budget.transport, color: 'bg-sky-500' },
    { label: 'Accommodation', amount: budget.accommodation, color: 'bg-indigo-500' },
    { label: 'Food & Dining', amount: budget.food, color: 'bg-amber-500' },
    { label: 'Activities & Entry', amount: budget.activities, color: 'bg-emerald-500' },
    { label: 'Local Transportation', amount: budget.localTransport, color: 'bg-orange-500' },
    { label: 'Miscellaneous & Buffer', amount: budget.miscellaneous, color: 'bg-neutral-400' },
  ];

  return (
    <section className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm" id="budget-optimizer-section">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
              STAGE 3: FINANCIAL REASONING
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight font-display flex items-center gap-2.5">
            <PiggyBank className="w-6 h-6 text-emerald-600" />
            BUDGET OPTIMIZER
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Synthesized expense breakdown against your total budget constraint.
          </p>
        </div>

        {/* Status Badge */}
        <div>
          {budget.isWithinBudget ? (
            <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>✓ Within Budget (₹{budget.remainingDifference.toLocaleString('en-IN')} buffer)</span>
            </div>
          ) : (
            <div className="px-4 py-2 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>⚠ Over Budget by ₹{Math.abs(budget.remainingDifference).toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Primary Comparison Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        
        {/* User Budget */}
        <div className="p-4.5 rounded-2xl bg-neutral-50 border border-neutral-200">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            User Budget
          </span>
          <div className="text-2xl font-extrabold text-neutral-900 font-display flex items-center gap-1">
            <IndianRupee className="w-5 h-5 text-neutral-400" />
            ₹{budget.userBudget.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-neutral-500 mt-1 block">Specified target ceiling</span>
        </div>

        {/* Total Estimated Cost */}
        <div className="p-4.5 rounded-2xl bg-amber-50/50 border border-amber-200/80">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
            Total Estimated Cost
          </span>
          <div className="text-2xl font-extrabold text-neutral-900 font-display flex items-center gap-1">
            <IndianRupee className="w-5 h-5 text-amber-600" />
            ₹{budget.totalEstimatedCost.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-neutral-600 mt-1 block">Includes transit, stays, food & activities</span>
        </div>

        {/* Remaining Difference */}
        <div className={`p-4.5 rounded-2xl border ${
          budget.isWithinBudget ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${
            budget.isWithinBudget ? 'text-emerald-800' : 'text-rose-800'
          }`}>
            {budget.isWithinBudget ? 'Remaining Savings Buffer' : 'Deficit Amount'}
          </span>
          <div className={`text-2xl font-extrabold font-display flex items-center gap-1 ${
            budget.isWithinBudget ? 'text-emerald-700' : 'text-rose-700'
          }`}>
            <IndianRupee className="w-5 h-5" />
            ₹{Math.abs(budget.remainingDifference).toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-neutral-600 mt-1 block">
            {budget.isWithinBudget ? 'Available for spontaneous treats' : 'Exceeds target budget constraint'}
          </span>
        </div>

      </div>

      {/* Visual Proportion Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-neutral-600 font-semibold mb-2">
          <span>Expense Distribution</span>
          <span>{Math.round((budget.totalEstimatedCost / budget.userBudget) * 100)}% of budget utilized</span>
        </div>
        <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden flex">
          {categories.map((cat, i) => {
            const pct = (cat.amount / budget.totalEstimatedCost) * 100;
            return (
              <div
                key={i}
                title={`${cat.label}: ₹${cat.amount.toLocaleString('en-IN')} (${pct.toFixed(0)}%)`}
                style={{ width: `${pct}%` }}
                className={`${cat.color} h-full transition-all duration-300`}
              />
            );
          })}
        </div>
      </div>

      {/* Category Breakdown Table / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {categories.map((cat, i) => (
          <div key={i} className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs">
            <div className="flex items-center gap-1.5 mb-1 text-neutral-500 font-semibold">
              <span className={`w-2 h-2 rounded-full ${cat.color}`}></span>
              <span className="truncate">{cat.label}</span>
            </div>
            <div className="text-sm font-extrabold text-neutral-900 font-display">
              ₹{cat.amount.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-neutral-400">
              {((cat.amount / budget.totalEstimatedCost) * 100).toFixed(0)}% of total
            </span>
          </div>
        ))}
      </div>

      {/* Automated Cost Reduction Insights */}
      {budget.savingOpportunities.length > 0 && (
        <div className="p-4.5 rounded-2xl bg-neutral-900 text-white border border-neutral-800">
          <div className="flex items-center gap-2 mb-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            Automated Cost Optimization Opportunities
          </div>
          <ul className="space-y-2 text-xs text-neutral-300">
            {budget.savingOpportunities.map((opp, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <ArrowDownRight className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{opp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </section>
  );
};
