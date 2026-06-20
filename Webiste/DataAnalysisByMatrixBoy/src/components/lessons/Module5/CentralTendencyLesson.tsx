import React, { useState, useMemo } from 'react';
import { StatisticsLessonTemplate, CSSFormula } from '../../ui/StatisticsLessonTemplate';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, AlertCircle } from 'lucide-react';

export const CentralTendencyLesson: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<number[]>([10, 12, 12, 14, 15, 18, 20]);
  const [newValue, setNewValue] = useState<string>('');

  // Calculations
  const sortedData = useMemo(() => [...dataPoints].sort((a, b) => a - b), [dataPoints]);
  
  const mean = useMemo(() => {
    if (dataPoints.length === 0) return 0;
    return dataPoints.reduce((acc, val) => acc + val, 0) / dataPoints.length;
  }, [dataPoints]);

  const median = useMemo(() => {
    if (sortedData.length === 0) return 0;
    const mid = Math.floor(sortedData.length / 2);
    return sortedData.length % 2 !== 0
      ? sortedData[mid]
      : (sortedData[mid - 1] + sortedData[mid]) / 2;
  }, [sortedData]);

  const mode = useMemo(() => {
    if (dataPoints.length === 0) return [];
    const counts: Record<number, number> = {};
    let maxCount = 0;
    dataPoints.forEach(val => {
      counts[val] = (counts[val] || 0) + 1;
      if (counts[val] > maxCount) maxCount = counts[val];
    });
    if (maxCount === 1) return []; // No mode if all appear once
    return Object.keys(counts).filter(k => counts[Number(k)] === maxCount).map(Number);
  }, [dataPoints]);

  const handleAdd = () => {
    const num = parseFloat(newValue);
    if (!isNaN(num)) {
      setDataPoints([...dataPoints, num]);
      setNewValue('');
    }
  };

  const handleRemove = (indexToRemove: number) => {
    setDataPoints(dataPoints.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <StatisticsLessonTemplate
      topicName="Central Tendency"
      purpose="Central tendency measures (Mean, Median, Mode) identify the center or typical value of a dataset. They are the most fundamental building blocks of descriptive statistics."
      formulas={[
        {
          title: "Mean (Average)",
          formula: <CSSFormula leftSide="μ =" numerator="Σ xᵢ" denominator="n" />,
          parameters: [
            { symbol: "μ", name: "Population Mean", meaning: "The arithmetic average of all values in the population." },
            { symbol: "Σ", name: "Sigma", meaning: "Summation - add up all the following values." },
            { symbol: "xᵢ", name: "Individual Value", meaning: "Each specific data point in the dataset." },
            { symbol: "n", name: "Sample Size", meaning: "The total number of data points." }
          ]
        },
        {
          title: "Median",
          formula: <div className="text-[28px] md:text-[36px] font-serif font-medium text-center">Middle value of sorted dataset</div>,
          parameters: [
            { symbol: "Odd n", name: "Exact Middle", meaning: "The single value exactly in the center of the sorted list." },
            { symbol: "Even n", name: "Average of Middle Two", meaning: "If there is an even number of data points, average the two centermost values." }
          ]
        },
        {
          title: "Mode",
          formula: <div className="text-[28px] md:text-[36px] font-serif font-medium text-center">Most frequent value(s)</div>,
          parameters: [
            { symbol: "Unimodal", name: "One Mode", meaning: "A single value appears most often." },
            { symbol: "Bimodal", name: "Two Modes", meaning: "Two different values tie for the highest frequency." }
          ]
        }
      ]}
      specialCases={[
        {
          title: "Outlier Sensitivity",
          description: "The Mean is highly sensitive to extreme outliers (like one billionaire in a room of average earners). When data is highly skewed, the Median is a much better measure of central tendency than the Mean."
        }
      ]}
      practiceProblem={{
        question: "Calculate the exact Mean (average) of the following dataset:",
        dataList: "[ 4, 8, 15, 16, 23, 42 ]",
        correctAnswer: 18,
        explanation: "Sum the values (4 + 8 + 15 + 16 + 23 + 42 = 108). Divide by the number of values (n=6). 108 / 6 = 18."
      }}
      realWorldExample={{
        title: "Housing Market Analysis",
        description: "When analyzing real estate prices, the 'Average (Mean) Price' can be heavily skewed by one $10M mansion. Real estate analysts prefer the 'Median Price' because it gives a much more accurate picture of what a typical house costs."
      }}
    >
      <div className="flex flex-col gap-6 h-full font-sans">
        
        {/* Controls */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Dataset Manager</h3>
            <p className="text-xs text-slate-500">Add extreme values (outliers) to see how they pull the Mean but leave the Median untouched.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Enter number..."
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
              onClick={handleAdd}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 rounded-lg transition-colors flex items-center justify-center"
              title="Add data point"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Data Points Display */}
        <div className="flex flex-wrap gap-2 p-4 bg-slate-100 rounded-xl border border-slate-200 min-h-[80px] content-start">
          <AnimatePresence>
            {dataPoints.map((val, idx) => (
              <motion.div
                key={`${val}-${idx}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="bg-white border border-slate-300 px-3 py-1.5 rounded-lg text-sm font-bold text-slate-700 shadow-sm flex items-center gap-2 group cursor-pointer hover:border-rose-300 hover:bg-rose-50 transition-colors"
                onClick={() => handleRemove(idx)}
                title="Click to remove"
              >
                {val}
                <X size={14} className="text-slate-400 group-hover:text-rose-500 transition-colors" />
              </motion.div>
            ))}
            {dataPoints.length === 0 && (
              <p className="text-slate-400 text-sm flex items-center gap-2 italic w-full justify-center">
                <AlertCircle size={16} /> Dataset is empty
              </p>
            )}
          </AnimatePresence>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-auto">
          <div className="bg-white p-5 rounded-xl border-l-4 border-l-indigo-500 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-16 h-16 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Mean</span>
            <span className="text-3xl font-extrabold text-indigo-600 font-mono">
              {isNaN(mean) ? '-' : mean.toFixed(1)}
            </span>
            <p className="text-[10px] text-slate-500 mt-2 leading-tight">The sum of all values divided by the total number of values. Highly sensitive to outliers.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border-l-4 border-l-emerald-500 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-16 h-16 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Median</span>
            <span className="text-3xl font-extrabold text-emerald-600 font-mono">
              {isNaN(median) ? '-' : median.toFixed(1)}
            </span>
            <p className="text-[10px] text-slate-500 mt-2 leading-tight">The middle value when sorted. Extremely robust against extreme outliers.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border-l-4 border-l-rose-500 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-16 h-16 bg-rose-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Mode</span>
            <span className="text-3xl font-extrabold text-rose-600 font-mono">
              {mode.length === 0 ? 'None' : mode.join(', ')}
            </span>
            <p className="text-[10px] text-slate-500 mt-2 leading-tight">The most frequently occurring value(s). Useful for categorical data.</p>
          </div>
        </div>

      </div>
    </StatisticsLessonTemplate>
  );
};
