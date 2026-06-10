import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FormulaLessonData, TableData, EvaluationResult } from '../../types/formula';
import { AlertTriangle, Briefcase, TerminalSquare, CheckCircle2, ChevronRight, PlayCircle, RotateCcw, Star, Database, Edit3 } from 'lucide-react';

interface Props {
  data: FormulaLessonData;
}

// Editable Table Component
const EditableDataTable: React.FC<{ 
  data: TableData; 
  onChange?: (newRows: string[][]) => void;
  isEditable?: boolean;
}> = ({ data, onChange, isEditable = false }) => {
  const handleCellChange = (rIdx: number, cIdx: number, value: string) => {
    if (!onChange) return;
    const newRows = data.rows.map(row => [...row]);
    newRows[rIdx][cIdx] = value;
    onChange(newRows);
  };

  const colLabels = Array.from({ length: data.headers.length }, (_, i) => String.fromCharCode(65 + i));

  return (
    <div className="overflow-x-auto rounded-xl shadow-2xl border border-slate-700 bg-slate-900 overflow-hidden font-sans">
      <table className="w-full text-left border-collapse min-w-[300px]">
        <thead>
          {/* Excel Column Letters */}
          <tr className="bg-slate-950 border-b border-slate-800 shadow-sm">
            <th className="w-10 p-2 border-r border-slate-800 text-center text-xs font-bold text-slate-600"></th>
            {colLabels.map((h, i) => (
              <th key={i} className="p-2 border-r border-slate-800 text-center text-xs font-bold text-slate-500">{h}</th>
            ))}
          </tr>
          {/* Data Headers */}
          <tr className="bg-slate-900 border-b border-slate-700 text-slate-300">
            <th className="w-10 p-2 border-r border-slate-800 bg-slate-950 text-center"></th>
            {data.headers.map((h, i) => (
              <th key={i} className="p-3 font-semibold text-sm border-r border-slate-700 last:border-r-0 whitespace-nowrap bg-slate-800/30">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-300 text-sm font-medium">
          {data.rows.map((row, rIdx) => {
            const isHighlightedRow = rIdx === data.highlightRow;
            return (
              <tr key={rIdx} className={`border-b border-slate-800/80 transition-all duration-300 ${isHighlightedRow ? 'bg-indigo-900/20' : 'hover:bg-slate-800/40'}`}>
                {/* Excel Row Number */}
                <td className="w-10 p-2 border-r border-slate-800 bg-slate-950 text-center text-xs font-bold text-slate-600">{rIdx + 1}</td>
                {row.map((cell, cIdx) => {
                  const isHighlightedCol = cIdx === data.highlightCol;
                  const isSpecificCell = data.highlightRow !== undefined && data.highlightCol !== undefined;
                  const isTarget = isSpecificCell ? (isHighlightedRow && isHighlightedCol) : (isHighlightedRow || isHighlightedCol);
                  
                  return (
                    <td key={cIdx} className={`p-0 relative border-r border-slate-800/50 last:border-r-0 transition-all duration-300 ${isTarget ? 'bg-indigo-500/20' : ''}`}>
                      {isTarget && (
                         <motion.div 
                           layoutId={`highlight-${cIdx}-${rIdx}`}
                           className="absolute inset-0 border-2 border-indigo-400/80 shadow-[0_0_15px_rgba(99,102,241,0.4)] z-0 rounded pointer-events-none" 
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={{ opacity: 1, scale: 1 }}
                         />
                      )}
                      {isEditable ? (
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                          className={`w-full p-3.5 bg-transparent outline-none focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500 transition-all relative z-10 ${isTarget ? 'font-bold text-indigo-300' : ''}`}
                        />
                      ) : (
                        <div className={`p-3.5 relative z-10 ${isTarget ? 'font-bold text-indigo-300' : ''}`}>
                          {cell}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const FormulaLessonTemplate: React.FC<Props> = ({ data }) => {
  // Local state for editable tables
  const [dataset, setDataset] = useState<TableData>(data.initialDataset);
  const [userInput, setUserInput] = useState<TableData>(data.initialUserInput);
  
  // State for the engine output
  const [evalResult, setEvalResult] = useState<EvaluationResult | null>(null);

  // Stepper state
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = evalResult ? evalResult.visualSteps.length + 1 : 0; // +1 for the final output step

  // Recalculate formula whenever dataset or user input changes
  useEffect(() => {
    try {
      const result = data.evaluate(dataset, userInput);
      setEvalResult(result);
    } catch (e) {
      console.error("Formula Evaluation Error:", e);
    }
  }, [dataset, userInput, data]);

  // Reset steps when formula changes (or data changes)
  useEffect(() => {
    setActiveStep(0);
  }, [evalResult?.formulaUsed]);

  const advanceStep = () => {
    if (activeStep < totalSteps) {
      setActiveStep(prev => prev + 1);
    }
  };

  const resetSteps = () => setActiveStep(0);

  if (!evalResult) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-12 max-w-none pb-20"
    >
      {/* 1. Formula Name & Purpose */}
      <section className="text-center pb-8 border-b border-slate-200">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold text-3xl mb-6 shadow-xl shadow-purple-500/20">
          fx
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">{data.formulaName}</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {data.purpose}
        </p>
      </section>

      {/* 2. Syntax & 3. Parameters Explanation */}
      <section className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <TerminalSquare size={24} className="text-purple-600" />
            Syntax
          </h2>
          <div className="glass-card p-8 h-full flex flex-col justify-center bg-slate-900/90 border-slate-700">
            <code className="text-xl md:text-2xl text-emerald-400 font-mono block text-center leading-relaxed">
              {data.syntax}
            </code>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-slate-900">Parameter Breakdown</h2>
          <div className="glass-card overflow-x-auto h-full p-2">
            <table className="w-full text-left border-collapse h-full">
              <thead>
                <tr className="border-b border-slate-200/50 text-slate-500">
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Parameter</th>
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Meaning</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 text-sm">
                {data.parameters.map((p, i) => (
                  <tr key={i} className="border-b border-slate-100/50 hover:bg-white/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-purple-700">{p.name}</td>
                    <td className="p-4 leading-relaxed">{p.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Editable Dataset & User Input */}
      <section className="glass-card !bg-white/60 p-8 md:p-12 border-purple-200/50">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-purple-100 text-purple-600 animate-pulse">
            <Edit3 size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Live Editor</h2>
            <p className="text-slate-600">Change any value in the tables below to see the formula instantly recalculate.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Database size={20} className="text-blue-500" />
              Source Dataset
            </h3>
            <EditableDataTable 
              data={dataset} 
              isEditable={true} 
              onChange={(newRows) => setDataset({ ...dataset, rows: newRows })} 
            />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded flex items-center justify-center bg-amber-500 text-white text-xs font-bold">?</span>
                User Input (Criteria)
              </h3>
              <EditableDataTable 
                data={userInput} 
                isEditable={true} 
                onChange={(newRows) => setUserInput({ ...userInput, rows: newRows })} 
              />
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-800">Dynamic Formula Generated</h3>
              <div className="glass-card !bg-purple-900/5 p-6 border-purple-200 shadow-inner">
                <code className="text-xl text-purple-700 font-mono font-bold block">{evalResult.formulaUsed}</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive Visual Search Process */}
      <section className="glass-card !bg-white/80 p-0 overflow-hidden relative border-purple-200">
        <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-8 flex flex-col items-center justify-center relative z-10 overflow-hidden">
          {/* Progress Bar Background */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-400 via-pink-500 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${(activeStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <PlayCircle size={32} className="text-purple-300" />
                Formula Execution Engine
              </h2>
              <p className="text-purple-200 text-lg">Watch Excel process your dynamically generated formula step-by-step.</p>
            </div>
            
            <div className="flex items-center gap-4 bg-black/40 p-2.5 rounded-2xl backdrop-blur-md border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
              <button 
                onClick={resetSteps}
                className="p-3 hover:bg-white/10 rounded-xl text-white transition-all hover:rotate-180 duration-500"
                title="Restart"
              >
                <RotateCcw size={20} />
              </button>
              <div className="px-6 font-mono font-bold text-white border-l border-white/20 flex flex-col items-center justify-center">
                <span className="text-xs text-purple-300 tracking-widest uppercase mb-0.5">Progress</span>
                <span className="text-lg">{activeStep} / {totalSteps}</span>
              </div>
              <button 
                onClick={advanceStep}
                disabled={activeStep === totalSteps}
                className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-30 disabled:hover:from-emerald-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-2"
              >
                {activeStep === totalSteps ? 'Finished' : 'Next Step'} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-8 grid xl:grid-cols-2 gap-12 min-h-[500px]">
          {/* Left: Table Steps */}
          <div className="flex flex-col gap-6">
            {activeStep === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center bg-white/50">
                <PlayCircle size={64} className="mb-4 opacity-30 text-purple-500" />
                <h3 className="text-2xl font-bold text-slate-600 mb-2">Engine Ready</h3>
                <p className="text-lg">Click "Next Step" to run the algorithm.</p>
              </div>
            ) : (
              <div className="space-y-10 relative">
                <AnimatePresence mode="wait">
                  {activeStep > 0 && activeStep <= evalResult.visualSteps.length && (
                    <motion.div 
                      key={activeStep}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                      className="relative z-10"
                    >
                      <div className="glass-card !bg-white/95 p-8 border-indigo-200/50 shadow-[0_10px_40px_-10px_rgba(99,102,241,0.2)] min-h-[300px] flex flex-col justify-center rounded-3xl backdrop-blur-xl">
                        <div className="flex items-center gap-5 mb-8 border-b border-slate-100 pb-6">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black shadow-[0_0_20px_rgba(99,102,241,0.4)] text-2xl flex-shrink-0">
                            {activeStep}
                          </div>
                          <div>
                            <h3 className="font-extrabold text-slate-800 text-2xl tracking-tight">{evalResult.visualSteps[activeStep - 1].title}</h3>
                            {evalResult.visualSteps[activeStep - 1].description && <p className="text-slate-500 mt-1.5 text-lg font-medium">{evalResult.visualSteps[activeStep - 1].description}</p>}
                          </div>
                        </div>
                        <div className="relative">
                           <EditableDataTable data={evalResult.visualSteps[activeStep - 1].table} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeStep === totalSteps && (
                    <motion.div 
                      key="final"
                      initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                      className="relative z-10 perspective-[1000px]"
                    >
                      <div className="bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-3xl p-1 shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)] overflow-hidden min-h-[300px] flex flex-col justify-center">
                        <div className="bg-white/95 backdrop-blur-2xl rounded-[22px] p-10 text-center relative h-full flex flex-col items-center justify-center">
                          
                          {/* Celebrate animation */}
                          <motion.div 
                            animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="absolute top-6 right-6"
                          >
                             <Star className="text-yellow-400 fill-yellow-400" size={32} />
                          </motion.div>

                          <h3 className="font-black text-slate-800 mb-8 flex items-center justify-center gap-3 text-3xl uppercase tracking-widest">
                            <CheckCircle2 size={40} className="text-emerald-500" /> Final Output
                          </h3>
                          
                          <div className="inline-block bg-slate-900 px-16 py-10 rounded-3xl border-2 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] font-mono font-black text-emerald-400 text-6xl relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                            {evalResult.finalOutput.rows[0][0]}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Right: Flow Diagram */}
          <div className="glass-card !bg-slate-900 p-10 flex flex-col justify-center border-slate-700 relative h-full min-h-[500px]">
            <h3 className="text-white/80 font-bold tracking-[0.2em] uppercase text-sm border-b border-slate-700 pb-6 mb-10 w-full text-center flex items-center justify-center gap-3">
              <TerminalSquare size={20} className="text-purple-400" />
              Algorithm Flow
            </h3>
            
            <div className="flex flex-col items-center justify-center flex-1 relative z-10 w-full max-w-sm mx-auto">
              {evalResult.flowDiagram.map((line, idx) => {
                const stepThreshold = Math.ceil((idx + 1) / 2);
                const isVisible = activeStep >= stepThreshold;
                const isFinal = idx === evalResult.flowDiagram.length - 1;
                const isArrow = idx % 2 === 1;

                if (!isVisible) return null;

                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, height: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
                    transition={{ duration: 0.4 }}
                    className="w-full flex flex-col items-center origin-top"
                  >
                    {isArrow ? (
                      <div className="h-16 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 relative my-2 rounded-full overflow-hidden">
                        <motion.div 
                          className="absolute inset-0 bg-white/50 w-full"
                          initial={{ top: '-100%' }}
                          animate={{ top: '100%' }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-b-2 border-r-2 border-purple-500"></div>
                      </div>
                    ) : (
                      <div className={`px-8 py-5 rounded-2xl font-mono text-base font-bold w-full text-center shadow-xl transition-all duration-500 relative overflow-hidden backdrop-blur-md ${
                        isFinal 
                          ? 'bg-emerald-500/10 text-emerald-400 border-2 border-emerald-500/50 scale-105 shadow-[0_0_30px_rgba(16,185,129,0.2)]' 
                          : stepThreshold === activeStep
                            ? 'bg-indigo-600 text-white border-2 border-indigo-400 scale-105 shadow-[0_0_30px_rgba(99,102,241,0.5)] z-10'
                            : 'bg-slate-800 text-slate-300 border border-slate-700 opacity-80'
                      }`}>
                        {stepThreshold === activeStep && !isFinal && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] -skew-x-12 translate-x-[-100%]"></div>
                        )}
                        {line}
                      </div>
                    )}
                  </motion.div>
                );
              })}
              
              {activeStep === 0 && (
                <div className="text-slate-500 font-mono text-lg border-2 border-slate-800 border-dashed rounded-2xl px-8 py-12 w-full text-center bg-slate-800/20">
                  Waiting for execution...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Real World Examples & Common Mistakes */}
      <section className="grid lg:grid-cols-2 gap-8 mt-4">
        <div className="glass-card !bg-blue-50/50 p-8 border-blue-200/50">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Briefcase size={28} className="text-blue-600" />
            Business Scenarios
          </h2>
          <div className="space-y-4">
            {data.realWorldExamples.map((ex, i) => (
              <div key={i} className="bg-white/80 p-5 rounded-2xl shadow-sm border-l-4 border-l-blue-500">
                <h3 className="font-bold text-slate-900 mb-2">{ex.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{ex.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card !bg-rose-50/50 p-8 border-rose-200/50">
          <h2 className="text-2xl font-bold text-rose-900 mb-6 flex items-center gap-2">
            <AlertTriangle size={28} className="text-rose-600" />
            Common Mistakes
          </h2>
          <ul className="space-y-3 text-rose-800">
            {data.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-3 bg-white/60 p-4 rounded-xl shadow-sm">
                <span className="mt-0.5 bg-rose-200 text-rose-700 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">!</span>
                <span className="text-sm font-medium leading-relaxed">{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </motion.div>
  );
};
