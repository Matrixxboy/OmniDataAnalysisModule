import React, { useState, useMemo } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import type { FormulaExplainerProps } from '../../types/schema';

export const FormulaExplainer: React.FC<FormulaExplainerProps> = ({ formula, variables, calculateResult }) => {
  const [varValues, setVarValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    variables.forEach(v => initial[v.id] = v.value);
    return initial;
  });

  const [hoveredVar, setHoveredVar] = useState<string | null>(null);

  const result = useMemo(() => calculateResult(varValues), [varValues, calculateResult]);

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto font-sans">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold tracking-tight text-slate-900">Interactive Formula</h3>
        <p className="text-sm text-slate-600">Drag the sliders below to see how each variable impacts the calculation.</p>
      </div>

      <div className="rounded-xl bg-slate-50 p-8 flex items-center justify-center border border-slate-200 relative shadow-inner">
        <div className="text-3xl text-purple-700 font-mono transition-all duration-200">
          <BlockMath math={formula} />
        </div>
        <div className="absolute top-4 right-4 text-emerald-700 font-mono text-lg font-bold bg-emerald-100 px-3 py-1 rounded-md border border-emerald-200 shadow-sm">
          Result: {Number.isInteger(result) ? result : result.toFixed(2)}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {variables.map(variable => (
          <div 
            key={variable.id} 
            className={`flex flex-col gap-3 p-4 rounded-xl transition-colors duration-200 ${hoveredVar === variable.id ? 'bg-slate-50 border border-slate-200 shadow-sm' : 'bg-transparent border border-transparent'}`}
            onMouseEnter={() => setHoveredVar(variable.id)}
            onMouseLeave={() => setHoveredVar(null)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`font-mono text-lg font-bold ${variable.color}`}><InlineMath math={variable.id} /></span>
                <span className="text-sm font-medium text-slate-600">{variable.label}</span>
              </div>
              <div className="font-mono font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                {varValues[variable.id]}
              </div>
            </div>
            <input 
              type="range"
              min={variable.min}
              max={variable.max}
              step={variable.step}
              value={varValues[variable.id]}
              onChange={(e) => setVarValues(prev => ({ ...prev, [variable.id]: parseFloat(e.target.value) }))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
