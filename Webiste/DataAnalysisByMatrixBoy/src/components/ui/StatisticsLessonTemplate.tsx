import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export interface StatParameter {
  symbol: string | React.ReactNode;
  name: string;
  meaning: string;
}

export interface StatisticsLessonProps {
  topicName: string;
  purpose: string;
  formula?: React.ReactNode; // Deprecated, use formulas
  parameters?: StatParameter[]; // Deprecated, use formulas
  formulas?: {
    title: string;
    formula: React.ReactNode;
    parameters: StatParameter[];
  }[];
  specialCases?: { title: string; description: string }[];
  practiceProblem?: {
    question: string;
    dataList?: string | React.ReactNode;
    correctAnswer: number;
    tolerance?: number;
    explanation: string;
  };
  realWorldExample: { title: string; description: string };
  children: React.ReactNode;
}

export const CSSFormula: React.FC<{
  leftSide?: React.ReactNode;
  numerator?: React.ReactNode;
  denominator?: React.ReactNode;
  rightSide?: React.ReactNode;
}> = ({ leftSide, numerator, denominator, rightSide }) => {
  return (
    <div className="flex items-center justify-center gap-[18px] font-serif text-slate-900">
      {leftSide && <div className="text-[38px] md:text-[48px] font-medium">{leftSide}</div>}
      
      {numerator && denominator ? (
        <div className="flex flex-col items-center">
          <div className="text-[30px] md:text-[42px] px-5 pb-2.5 border-b-[3px] border-slate-900">
            {numerator}
          </div>
          <div className="text-[30px] md:text-[42px] pt-2.5">
            {denominator}
          </div>
        </div>
      ) : numerator ? (
        <div className="text-[38px] md:text-[48px] font-medium">{numerator}</div>
      ) : null}

      {rightSide && <div className="text-[38px] md:text-[48px] font-medium">{rightSide}</div>}
    </div>
  );
};

export const StatisticsLessonTemplate: React.FC<StatisticsLessonProps> = ({
  topicName,
  purpose,
  formula,
  parameters,
  formulas,
  specialCases,
  practiceProblem,
  realWorldExample,
  children
}) => {
  const [activeFormulaIdx, setActiveFormulaIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answerStatus, setAnswerStatus] = useState<'idle'|'correct'|'incorrect'>('idle');

  // Fallback to old props if formulas array isn't provided
  const displayFormulas = formulas || [{ title: 'Core Formula', formula, parameters: parameters || [] }];
  const activeFormula = displayFormulas[activeFormulaIdx];

  const handleCheckAnswer = () => {
    if (!practiceProblem) return;
    const num = parseFloat(userAnswer);
    if (isNaN(num)) return;
    
    const tolerance = practiceProblem.tolerance || 0.01;
    if (Math.abs(num - practiceProblem.correctAnswer) <= tolerance) {
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('incorrect');
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-none">
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[900px] w-full mx-auto bg-white rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
      >
        {/* Header */}
        <div className="px-8 py-7 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white">
          <h1 className="text-[28px] font-bold mb-2">{topicName}</h1>
          <p className="opacity-90 leading-[1.6] text-lg">{purpose}</p>
        </div>

        {/* Formula Section */}
        <div className="bg-[#fafcff] border-b border-[#e5e7eb]">
          {displayFormulas.length > 1 && (
            <div className="flex border-b border-[#e5e7eb] px-4 pt-4 gap-2 overflow-x-auto hide-scrollbar">
              {displayFormulas.map((f, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFormulaIdx(idx)}
                  className={`px-6 py-3 font-bold text-sm rounded-t-xl transition-colors whitespace-nowrap ${
                    activeFormulaIdx === idx 
                      ? 'bg-white text-[#2563eb] border-t border-l border-r border-[#e5e7eb] -mb-[1px]' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {f.title}
                </button>
              ))}
            </div>
          )}
          
          <div className="px-5 py-[50px]">
            <div className="flex justify-center mb-[30px]">
              {activeFormula.formula}
            </div>
            <div className="text-center text-[#6b7280] text-[15px] font-medium">
              {displayFormulas.length > 1 ? activeFormula.title : 'Core Formula'}
            </div>
          </div>
        </div>

        {/* Parameters */}
        <div className="px-8 pt-7 pb-2.5 text-[22px] font-bold text-slate-900">
          Parameters
        </div>
        
        <div className="px-8 pb-8 grid gap-4">
          {activeFormula.parameters.map((p, idx) => (
            <div 
              key={idx} 
              className="flex flex-col sm:flex-row gap-[18px] p-[18px] border border-[#e5e7eb] rounded-[14px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
            >
              <div className="min-w-[90px] h-[60px] w-full sm:w-auto flex items-center justify-center rounded-xl bg-[#eff6ff] text-[#2563eb] font-serif text-[28px] font-bold">
                {p.symbol}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-[18px] font-bold text-slate-900 mb-1.5">{p.name}</h3>
                <p className="text-[#6b7280] leading-[1.6]">{p.meaning}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Special Cases */}
        {specialCases && specialCases.length > 0 && (
          <div className="px-8 pb-8 flex flex-col gap-4">
             <div className="text-[22px] font-bold text-slate-900 mb-2">Special Cases & Exceptions</div>
             {specialCases.map((sc, idx) => (
                <div key={idx} className="flex gap-4 p-5 bg-amber-50 border border-amber-200 rounded-[14px]">
                  <AlertTriangle className="text-amber-500 shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-amber-900 mb-1">{sc.title}</h3>
                    <p className="text-amber-800 leading-[1.6] text-sm">{sc.description}</p>
                  </div>
                </div>
             ))}
          </div>
        )}

        {/* Practice Problem */}
        {practiceProblem && (
          <div className="px-8 pb-8">
            <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-[16px]">
              <div className="flex items-center gap-2 mb-4">
                <Target className="text-indigo-600" size={20} />
                <h3 className="font-bold text-indigo-900 text-lg">Test Your Knowledge</h3>
              </div>
              <p className="text-indigo-950 mb-4 leading-[1.6] text-[15px]">{practiceProblem.question}</p>
              
              {practiceProblem.dataList && (
                <div className="bg-white p-4 rounded-xl border border-indigo-100 font-mono text-indigo-800 text-center text-lg mb-4 shadow-sm">
                  {practiceProblem.dataList}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <input 
                  type="number" 
                  value={userAnswer}
                  onChange={(e) => {
                    setUserAnswer(e.target.value);
                    setAnswerStatus('idle');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCheckAnswer();
                  }}
                  placeholder="Enter your answer..."
                  className="flex-1 px-4 py-3 rounded-xl border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-800 font-medium"
                />
                <button 
                  onClick={handleCheckAnswer}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition-colors active:scale-95"
                >
                  Check Answer
                </button>
              </div>

              {answerStatus !== 'idle' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 overflow-hidden"
                >
                  <div className={`p-4 rounded-xl border flex gap-3 ${answerStatus === 'correct' ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                    {answerStatus === 'correct' ? (
                      <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                    ) : (
                      <XCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
                    )}
                    <div>
                      <h4 className={`font-bold mb-1 ${answerStatus === 'correct' ? 'text-emerald-900' : 'text-rose-900'}`}>
                        {answerStatus === 'correct' ? 'Correct!' : 'Not quite right. Try again!'}
                      </h4>
                      {answerStatus === 'correct' && (
                        <p className="text-emerald-800 text-[13px] leading-[1.6] mt-2">{practiceProblem.explanation}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Interpretation / Real World Example */}
        <div className="border-t border-[#e5e7eb] p-8 bg-[#fafafa]">
          <h2 className="text-[22px] font-bold text-slate-900 mb-3.5">Production Use Case</h2>
          <h3 className="font-bold text-slate-800 text-lg mb-2">{realWorldExample.title}</h3>
          <p className="leading-[1.8] text-[#374151]">
            {realWorldExample.description}
          </p>
        </div>
      </motion.div>

      {/* Interactive Visual Simulator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col w-full min-h-[500px]"
      >
        <div className="bg-white rounded-[20px] border border-[#e5e7eb] shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col h-full overflow-hidden">
          <div className="bg-slate-900 px-6 py-4 flex items-center gap-3 border-b border-slate-800">
            <Activity className="text-emerald-400" size={18} />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Interactive Simulator</h2>
          </div>
          <div className="p-6 flex-1 bg-slate-50/50 flex flex-col">
            {children}
          </div>
        </div>
      </motion.div>

    </div>
  );
};
