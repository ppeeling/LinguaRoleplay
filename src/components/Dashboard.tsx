import { useLiveQuery } from 'dexie-react-hooks';
import { Play } from 'lucide-react';
import { db } from '../db/db';
import { allScenarios } from '../data/scenarios';
import { RoleplayScenario, ScenarioProgress } from '../types';

interface DashboardProps {
  onStartScenario: (scenario: RoleplayScenario) => void;
}

export function Dashboard({ onStartScenario }: DashboardProps) {
  const progressList = useLiveQuery(() => db.progress.toArray());
  
  const now = Date.now();

  const progressMap = new Map<string, ScenarioProgress>();
  if (progressList) {
    for (const p of progressList) {
      progressMap.set(p.scenarioId, p);
    }
  }

  // Separate scenarios into "due for review" and "others"
  const dueScenarios: RoleplayScenario[] = [];
  const otherScenarios: RoleplayScenario[] = [];

  for (const scenario of allScenarios) {
    const p = progressMap.get(scenario.id);
    if (p && p.nextReviewDate <= now) {
      dueScenarios.push(scenario);
    } else {
      otherScenarios.push(scenario);
    }
  }

  const renderScenarioCard = (scenario: RoleplayScenario, isDue: boolean) => {
    const p = progressMap.get(scenario.id);
    
    return (
      <button
        key={scenario.id}
        onClick={() => onStartScenario(scenario)}
        className={`w-full text-left p-4 flex items-center justify-between transition-colors focus:outline-none mb-3 ${
          isDue 
            ? 'bg-[#161616] border-l-2 border-[#D4AF37] rounded-r hover:bg-[#1a1a1a]' 
            : 'bg-[#121212] border-l-2 border-[#444] rounded-r opacity-80 hover:opacity-100 hover:bg-[#161616]'
        }`}
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37] bg-[#D4AF3715] px-2 py-0.5 rounded-full">
              {scenario.language}
            </span>
            <span className="text-[10px] text-[#888] border border-[#444] px-2 py-0.5 rounded-full uppercase tracking-wider">
              {scenario.level}
            </span>
            {isDue && (
              <span className="text-[10px] text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2 py-0.5 rounded-full uppercase tracking-wider font-medium">
                Review Due
              </span>
            )}
          </div>
          <h3 className="font-serif italic text-lg text-[#EEE]">{scenario.title}</h3>
          {p ? (
            <p className="text-xs text-[#555] mt-1 font-mono">
              Repetition: {p.repetition} • Last: {p.lastScore === 'pass' ? 'PASS' : 'FAIL'}
            </p>
          ) : (
            <p className="text-xs text-[#555] mt-1 font-mono">Not started</p>
          )}
        </div>
        <div className="w-10 h-10 rounded-full border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shrink-0 ml-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/20 transition-colors">
          <Play size={18} className="ml-1" />
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-8 pb-8">
      {dueScenarios.length > 0 && (
        <section>
          <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#666] mb-4">Next Practice</h2>
          <div className="space-y-3">
            {dueScenarios.map(s => renderScenarioCard(s, true))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#666] mb-4">
          {dueScenarios.length > 0 ? 'All Scenarios' : 'Available Scenarios'}
        </h2>
        <div className="space-y-3">
          {otherScenarios.map(s => renderScenarioCard(s, false))}
        </div>
      </section>
    </div>
  );
}
