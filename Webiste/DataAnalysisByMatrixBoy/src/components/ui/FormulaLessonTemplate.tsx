import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FormulaLessonData, TableData, EvaluationResult } from '../../types/formula';
import { AlertTriangle, Briefcase, TerminalSquare, CheckCircle2, ChevronRight, PlayCircle, RotateCcw, Star, Database, Edit3 } from 'lucide-react';

interface Props {
  data: FormulaLessonData;
}

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
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm font-sans">
      <table className="w-full text-left border-collapse min-w-[240px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="w-8 p-1.5 border-r border-slate-200 text-center text-[10px] font-bold text-slate-400"></th>
            {colLabels.map((h, i) => (
              <th key={i} className="p-1.5 border-r border-slate-200 text-center text-[10px] font-bold text-slate-400 last:border-r-0">{h}</th>
            ))}
          </tr>
          <tr className="bg-white border-b border-slate-200 text-slate-700">
            <th className="w-8 p-1.5 border-r border-slate-200 bg-slate-50/50 text-center"></th>
            {data.headers.map((h, i) => (
              <th key={i} className="p-2 font-semibold text-xs border-r border-slate-200 last:border-r-0 whitespace-nowrap bg-slate-50/30">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-600 text-xs font-medium">
          {data.rows.map((row, rIdx) => {
            const isHighlightedRow = rIdx === data.highlightRow;
            return (
              <tr key={rIdx} className={`border-b border-slate-150 last:border-b-0 transition-colors ${isHighlightedRow ? 'bg-indigo-50/40' : 'hover:bg-slate-50/50'}`}>
                <td className="w-8 p-1.5 border-r border-slate-200 bg-slate-50 text-center text-[10px] font-bold text-slate-400">{rIdx + 1}</td>
                {row.map((cell, cIdx) => {
                  const isHighlightedCol = cIdx === data.highlightCol;
                  const isSpecificCell = data.highlightRow !== undefined && data.highlightCol !== undefined;
                  const isTarget = isSpecificCell ? (isHighlightedRow && isHighlightedCol) : (isHighlightedRow || isHighlightedCol);
                  
                  return (
                    <td key={cIdx} className={`p-0 relative border-r border-slate-150 last:border-r-0 transition-colors ${isTarget ? 'bg-indigo-50 font-semibold text-indigo-700' : ''}`}>
                      {isTarget && (
                        <motion.div 
                          layoutId={`highlight-${cIdx}-${rIdx}`}
                          className="absolute inset-0 border border-indigo-400 pointer-events-none z-10" 
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      {isEditable ? (
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                          className="w-full p-2 bg-transparent outline-none focus:bg-slate-50 focus:ring-1 focus:ring-indigo-400 relative z-0 text-xs"
                        />
                      ) : (
                        <div className="p-2 relative z-0 text-xs">
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
  const [dataset, setDataset] = useState<TableData>(data.initialDataset);
  const [userInput, setUserInput] = useState<TableData>(data.initialUserInput);
  const [evalResult, setEvalResult] = useState<EvaluationResult | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  
  const totalSteps = evalResult ? evalResult.visualSteps.length + 1 : 0;

  useEffect(() => {
    try {
      const result = data.evaluate(dataset, userInput);
      setEvalResult(result);
    } catch (e) {
      console.error("Formula Evaluation Error:", e);
    }
  }, [dataset, userInput, data]);

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
    <>
    <header className="flex flex-col items-center justify-between gap-5 pb-6 border-b border-slate-200 relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 md:p-10">
  <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-70 -translate-y-1/2 translate-x-1/2" />

  <div className="relative flex-col item-center">
    {/* Top Badge */}
    <div className="flex items-center gap-3 mb-6">
      <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-md">
        <span className="text-white font-bold text-xl">fx</span>
      </div>

      <div>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wide uppercase">
          Excel Formula
        </span>
      </div>
    </div>

    {/* Main Title */}
    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
      {data.formulaName}
    </h1>

    {/* Description */}
    <p className="mt-4 text-lg text-slate-600 max-w-3xl leading-relaxed">
      {data.purpose}
    </p>

    {/* Syntax */}
    <div className="mt-8">
      <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">
        Syntax
      </p>

      <div className="inline-flex items-center rounded-2xl border border-slate-200 bg-slate-900 px-5 py-3 font-mono text-emerald-400 text-sm shadow-sm">
        {data.syntax}
      </div>
    </div>
  </div>
</header>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6 max-w-6xl mx-auto p-4 font-sans text-slate-800"
    >
      

      <section className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1 border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <Edit3 size={16} className="text-indigo-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Workspace</h2>
          </div>
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block flex items-center gap-1.5">
                <Database size={12} className="text-slate-400" /> Source Dataset
              </label>
              <EditableDataTable 
                data={dataset} 
                isEditable={true} 
                onChange={(newRows) => setDataset({ ...dataset, rows: newRows })} 
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                User Criteria Input
              </label>
              <EditableDataTable 
                data={userInput} 
                isEditable={true} 
                onChange={(newRows) => setUserInput({ ...userInput, rows: newRows })} 
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Generated Request</span>
            <code className="text-xs text-indigo-600 font-mono font-semibold block bg-indigo-50/50 p-1.5 rounded border border-indigo-100 break-all">{evalResult.formulaUsed}</code>
          </div>
        </div>

        <div className="md:col-span-2 border border-slate-200 rounded-xl overflow-hidden bg-white flex flex-col">
          <div className="bg-slate-900 p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <PlayCircle size={16} className="text-indigo-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Execution Timeline</h2>
            </div>
            
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button 
                onClick={resetSteps}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                title="Restart Engine"
              >
                <RotateCcw size={14} />
              </button>
              <div className="h-4 w-[1px] bg-slate-800 mx-1" />
              <span className="font-mono text-xs text-slate-400 min-w-[40px] text-center">{activeStep} / {totalSteps}</span>
              <button 
                onClick={advanceStep}
                disabled={activeStep === totalSteps}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-medium rounded transition-colors flex items-center gap-1"
              >
                {activeStep === totalSteps ? 'Completed' : 'Step Forward'} <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="relative w-full h-1 bg-slate-800">
            <motion.div 
              className="absolute top-0 bottom-0 left-0 bg-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${(activeStep / totalSteps) * 100}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>

          <div className="p-4 flex-1 grid sm:grid-cols-5 gap-4 min-h-[280px]">
            <div className="sm:col-span-3 flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-slate-100 pb-4 sm:pb-0 sm:pr-4">
              <AnimatePresence mode="wait">
                {activeStep === 0 && (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    <p className="text-xs text-slate-400 font-medium">Click "Step Forward" to trace the function calculation step by step.</p>
                  </motion.div>
                )}

                {activeStep > 0 && activeStep <= evalResult.visualSteps.length && (
                  <motion.div 
                    key={activeStep}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="space-y-3 w-full"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">Step {activeStep}</span>
                      <h3 className="font-bold text-slate-900 text-sm mt-0.5">{evalResult.visualSteps[activeStep - 1].title}</h3>
                      {evalResult.visualSteps[activeStep - 1].description && (
                        <p className="text-xs text-slate-500 mt-1">{evalResult.visualSteps[activeStep - 1].description}</p>
                      )}
                    </div>
                    <EditableDataTable data={evalResult.visualSteps[activeStep - 1].table} />
                  </motion.div>
                )}

                {activeStep === totalSteps && (
                  <motion.div 
                    key="final"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 flex flex-col items-center justify-center h-full space-y-3"
                  >
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 size={14} /> Final Evaluation Output
                    </div>
                    <div className="bg-slate-900 px-8 py-4 rounded-xl border border-slate-800 font-mono font-bold text-emerald-400 text-3xl shadow-sm relative group">
                      {evalResult.finalOutput.rows[0][0]}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="sm:col-span-2 flex flex-col justify-center bg-slate-50/50 rounded-lg p-3 border border-slate-100">
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block mb-3 text-center">Logic Sequence</span>
              <div className="space-y-1.5 max-w-xs mx-auto w-full">
                {evalResult.flowDiagram.map((line, idx) => {
                  const stepThreshold = Math.ceil((idx + 1) / 2);
                  const isVisible = activeStep >= stepThreshold;
                  const isFinal = idx === evalResult.flowDiagram.length - 1;
                  const isArrow = idx % 2 === 1;

                  if (isArrow) {
                    return isVisible ? (
                      <div key={idx} className="flex justify-center my-0.5">
                        <div className="h-3 w-[1px] bg-indigo-300" />
                      </div>
                    ) : null;
                  }

                  return (
                    <AnimatePresence key={idx}>
                      {isVisible && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className={`px-2.5 py-1.5 rounded text-[11px] font-mono font-medium text-center transition-all ${
                            isFinal 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold' 
                              : stepThreshold === activeStep
                                ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                                : 'bg-white text-slate-400 border border-slate-200'
                          }`}
                        >
                          {line}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  );
                })}
                {activeStep === 0 && (
                  <div className="text-slate-400 font-mono text-[11px] text-center py-4 border border-dashed border-slate-200 rounded">
                    Awaiting logic run...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-4">
        <div className="border border-slate-200 rounded-xl p-4 bg-white">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Briefcase size={14} className="text-slate-400" /> Functional Breakdown
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-medium">
                  <th className="pb-2 font-bold">Parameter</th>
                  <th className="pb-2 font-bold">Definition</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {data.parameters.map((p, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0">
                    <td className="py-2 font-mono font-bold text-indigo-600 pr-3">{p.name}</td>
                    <td className="py-2 text-slate-500 leading-relaxed">{p.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-3">
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/30 flex items-start gap-2.5">
            <div className="p-1.5 rounded bg-blue-50 text-blue-600 mt-0.5">
              <Briefcase size={14} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800">Production Use Case</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                {data.realWorldExamples[0]?.title}: {data.realWorldExamples[0]?.description}
              </p>
            </div>
          </div>

          <div className="border border-rose-100 rounded-xl p-3 bg-rose-50/20 flex items-start gap-2.5">
            <div className="p-1.5 rounded bg-rose-50 text-rose-600 mt-0.5">
              <AlertTriangle size={14} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-rose-900">Syntax Watchout</h3>
              <p className="text-[11px] text-rose-700 mt-0.5 leading-relaxed">
                {data.commonMistakes[0]}
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
    </>
  );
};