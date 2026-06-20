import React, { useState, useMemo } from 'react';
import { StatisticsLessonTemplate, CSSFormula } from '../../ui/StatisticsLessonTemplate';

export const ConfidenceIntervalsLesson: React.FC = () => {
  const [sampleSize, setSampleSize] = useState<number>(30); // 10 to 1000
  const [confidenceLevel, setConfidenceLevel] = useState<number>(95); // 90, 95, 99

  // Fixed parameters
  const sampleMean = 65; // Average test score
  const popStdDev = 15; // Known standard deviation

  const { marginOfError, lowerBound, upperBound } = useMemo(() => {
    // Z-scores for common confidence levels
    let zScore = 1.96; // Default 95%
    if (confidenceLevel === 90) zScore = 1.645;
    if (confidenceLevel === 99) zScore = 2.576;

    const stdError = popStdDev / Math.sqrt(sampleSize);
    const moe = zScore * stdError;
    
    return {
      marginOfError: moe,
      lowerBound: sampleMean - moe,
      upperBound: sampleMean + moe
    };
  }, [sampleSize, confidenceLevel]);

  return (
    <StatisticsLessonTemplate
      topicName="Confidence Intervals"
      purpose="Because we rarely measure an entire population, our sample mean is just an estimate. A confidence interval gives a range of values where we are highly confident the true population mean actually lives."
      formulas={[
        {
          title: "Confidence Interval (Known σ)",
          formula: <CSSFormula leftSide="CI = x̄ ± z" numerator="σ" denominator="√n" />,
          parameters: [
            { symbol: "CI", name: "Confidence Interval", meaning: "The range (Lower Bound to Upper Bound)." },
            { symbol: "x̄", name: "Sample Mean", meaning: "The point estimate (center of the interval)." },
            { symbol: "z", name: "Z-Score", meaning: "The confidence level multiplier (e.g., 1.96 for 95% confidence)." },
            { symbol: "σ / √n", name: "Standard Error", meaning: "The standard deviation divided by the square root of the sample size. Larger samples shrink the error." }
          ]
        },
        {
          title: "Margin of Error (E)",
          formula: <CSSFormula leftSide="E = z" numerator="σ" denominator="√n" />,
          parameters: [
            { symbol: "E", name: "Margin of Error", meaning: "The '±' amount you add and subtract from the sample mean to get your bounds." },
            { symbol: "z", name: "Z-Score", meaning: "Determined by your chosen Confidence Level (e.g. 95% -> 1.96)." }
          ]
        }
      ]}
      specialCases={[
        {
          title: "Unknown Population Standard Deviation",
          description: "If you don't know the exact population standard deviation (σ), you have to use the sample standard deviation (s) instead. When you do this, you must use a T-Score instead of a Z-Score multiplier!"
        }
      ]}
      practiceProblem={{
        question: "Calculate the Margin of Error (E) for a 95% confidence interval (z=1.96) if the standard deviation is 20 and the sample size is 100.",
        correctAnswer: 3.92,
        explanation: "1) Find the standard error: 20 / √100 = 20 / 10 = 2. \n2) Multiply by z-score: 1.96 * 2 = 3.92."
      }}
      realWorldExample={{
        title: "Political Polling",
        description: "A news station reports 'Candidate A has 52% support, with a margin of error of ±3%.' They didn't ask everyone in the country, just a sample. They are stating a 95% confidence interval that the true support is between 49% and 55%."
      }}
    >
      <div className="flex flex-col gap-6 h-full font-sans">
        
        {/* Controls */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Interval Simulator</h3>
            <p className="text-xs text-slate-500">Notice what happens when you demand higher confidence, or when you gather more data (larger sample size).</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-600">Confidence Level</label>
                <span className="text-xs font-mono font-bold text-indigo-600">{confidenceLevel}%</span>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                {[90, 95, 99].map(level => (
                  <button
                    key={level}
                    onClick={() => setConfidenceLevel(level)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${confidenceLevel === level ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {level}%
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Higher confidence requires a wider interval (margin of error).</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-600">Sample Size ($n$)</label>
                <span className="text-xs font-mono font-bold text-emerald-600">{sampleSize} people</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="1000" 
                step="10"
                value={sampleSize}
                onChange={(e) => setSampleSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 mt-2"
              />
              <p className="text-[10px] text-slate-400 mt-1">More data (larger sample) shrinks the margin of error.</p>
            </div>
          </div>
        </div>

        {/* Visualizer - Error Bar */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
          
          <div className="w-full relative h-16 flex items-center justify-center">
            {/* Axis */}
            <div className="absolute w-full h-1 bg-slate-100 rounded-full top-1/2 -translate-y-1/2"></div>
            
            {/* Confidence Interval Bar */}
            <div 
              className="absolute h-8 bg-indigo-100 border border-indigo-300 rounded top-1/2 -translate-y-1/2 transition-all duration-300 ease-out flex items-center justify-between px-1"
              style={{ 
                left: `${(lowerBound / 100) * 100}%`, 
                width: `${((upperBound - lowerBound) / 100) * 100}%` 
              }}
            >
              {/* Whiskers */}
              <div className="w-0.5 h-6 bg-indigo-500 absolute left-0 -ml-0.5" />
              <div className="w-0.5 h-6 bg-indigo-500 absolute right-0 -mr-0.5" />
              
              {/* Lower Bound Label */}
              <div className="absolute -bottom-6 left-0 -translate-x-1/2 text-[10px] font-bold text-indigo-500 bg-white px-1">
                {lowerBound.toFixed(1)}
              </div>
              
              {/* Upper Bound Label */}
              <div className="absolute -bottom-6 right-0 translate-x-1/2 text-[10px] font-bold text-indigo-500 bg-white px-1">
                {upperBound.toFixed(1)}
              </div>
            </div>
            
            {/* Sample Mean (Point Estimate) */}
            <div 
              className="absolute w-3 h-10 bg-emerald-500 rounded top-1/2 -translate-y-1/2 z-20 shadow-sm transition-all duration-300"
              style={{ left: `calc(${(sampleMean / 100) * 100}% - 6px)` }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-emerald-600 bg-white px-1 whitespace-nowrap">
                Mean: {sampleMean}
              </div>
            </div>
          </div>
          
          {/* Axis Scale (Assuming range roughly 30 to 100 based on standard dev 15 and mean 65) */}
          <div className="w-full flex justify-between mt-10 text-[10px] font-bold text-slate-300">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Margin of Error</span>
            <span className="text-3xl font-extrabold text-indigo-600 font-mono block">
              ± {marginOfError.toFixed(2)}
            </span>
            <div className="mt-3 inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded">
              Z-Score Multiplier: {confidenceLevel === 90 ? '1.645' : confidenceLevel === 95 ? '1.96' : '2.576'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">The Interval</span>
            <span className="text-2xl font-extrabold text-slate-700 font-mono tracking-tight">
              [{lowerBound.toFixed(1)}, {upperBound.toFixed(1)}]
            </span>
            <p className="text-[10px] text-slate-500 mt-2 text-center max-w-[200px]">
              We are {confidenceLevel}% confident the true population mean falls exactly within this range.
            </p>
          </div>
        </div>

      </div>
    </StatisticsLessonTemplate>
  );
};
