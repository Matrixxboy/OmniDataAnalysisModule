import React, { useState } from 'react';
import { Copy, Terminal, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

export const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'excel' }) => {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 font-semibold">
          <Terminal size={14} className="text-slate-400" />
          {language.toUpperCase()}
        </div>
        <button 
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors p-1.5 rounded-md"
          title="Copy code"
        >
          <Copy size={14} />
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-slate-800 bg-[#f8fafc]">
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
};

export const LessonHeader: React.FC<{ title: string; description?: string; module: string }> = ({ title, description, module }) => {
  return (
    <div className="mb-12 flex flex-col gap-3">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-bold tracking-widest uppercase text-purple-600"
      >
        {module}
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-600 leading-relaxed max-w-3xl mt-4"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export const ProTip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="my-8 p-6 rounded-2xl bg-indigo-50 border border-indigo-100 flex gap-4 items-start shadow-sm">
      <div className="p-2.5 rounded-xl bg-white text-indigo-600 shadow-sm border border-indigo-50 flex-shrink-0">
        <Lightbulb size={24} />
      </div>
      <div className="flex-1 text-slate-700 leading-relaxed text-base pt-1">
        {children}
      </div>
    </div>
  );
};

export interface FormulaVariable {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  color: string;
}

export const FormulaExplainer: React.FC<{
  formula: string;
  variables: FormulaVariable[];
  calculateResult: (vars: Record<string, number>) => number;
}> = ({ formula, variables, calculateResult }) => {
  const [vars, setVars] = useState<Record<string, number>>(
    variables.reduce((acc, v) => ({ ...acc, [v.id]: v.value }), {})
  );

  const handleSliderChange = (id: string, value: string) => {
    setVars((prev) => ({ ...prev, [id]: parseFloat(value) }));
  };

  const result = calculateResult(vars);

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-slate-900 p-8 rounded-2xl text-center shadow-inner overflow-x-auto">
        <div className="text-4xl md:text-5xl font-serif text-white tracking-widest mb-6">
          {formula}
        </div>
        <div className="text-2xl font-mono text-emerald-400 font-bold bg-emerald-500/10 py-3 px-6 rounded-xl inline-block border border-emerald-500/20">
          Result: {result.toFixed(4)}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {variables.map((v) => (
          <div key={v.id} className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <label className={`font-bold text-sm uppercase tracking-wider ${v.color}`}>
                {v.label} ({v.id})
              </label>
              <span className="font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-700 font-semibold shadow-sm">
                {vars[v.id]}
              </span>
            </div>
            <input
              type="range"
              min={v.min}
              max={v.max}
              step={v.step}
              value={vars[v.id]}
              onChange={(e) => handleSliderChange(v.id, e.target.value)}
              className="w-full accent-slate-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
