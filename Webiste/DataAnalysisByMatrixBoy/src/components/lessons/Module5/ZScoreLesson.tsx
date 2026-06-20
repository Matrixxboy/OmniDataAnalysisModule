import React, { useState, useMemo } from 'react';
import { StatisticsLessonTemplate, CSSFormula } from '../../ui/StatisticsLessonTemplate';

export const ZScoreLesson: React.FC = () => {
  const [rawScore, setRawScore] = useState<number>(85);
  const [mean, setMean] = useState<number>(70);
  const [stdDev, setStdDev] = useState<number>(10);

  const { zScore, pathData, percentile } = useMemo(() => {
    // Calculate Z-Score
    const z = stdDev === 0 ? 0 : (rawScore - mean) / stdDev;

    // Approximate percentile using the error function approximation
    const sign = z < 0 ? -1 : 1;
    const x = Math.abs(z) / Math.sqrt(2);
    const t = 1.0 / (1.0 + 0.3275911 * x);
    const erf = sign * (1.0 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x));
    const p = 0.5 * (1.0 + erf) * 100;

    // Generate bell curve path
    let path = "";
    // We map z from -4 to 4 across the 0-100 viewport
    for (let plotZ = -4; plotZ <= 4; plotZ += 0.1) {
      const y = Math.exp(-0.5 * Math.pow(plotZ, 2));
      const scaledX = ((plotZ + 4) / 8) * 100;
      const scaledY = 100 - (y * 90); // 10% margin at top
      
      if (plotZ === -4) path += `M ${scaledX} ${scaledY} `;
      else path += `L ${scaledX} ${scaledY} `;
    }
    path += `L 100 100 L 0 100 Z`;

    return { zScore: z, pathData: path, percentile: p };
  }, [rawScore, mean, stdDev]);

  return (
    <StatisticsLessonTemplate
      topicName="Z-Score (Standard Score)"
      purpose="A Z-Score tells you exactly how many standard deviations a value is away from the mean. It allows you to compare scores from entirely different datasets by 'standardizing' them."
      formulas={[
        {
          title: "Z-Score (Population)",
          formula: <CSSFormula leftSide="z =" numerator="x - μ" denominator="σ" />,
          parameters: [
            { symbol: "z", name: "Z-Score", meaning: "A standardized value. 0 means you are exactly average. +2 means you are 2 standard deviations above average." },
            { symbol: "x", name: "Raw Score", meaning: "The specific value you are testing." },
            { symbol: "μ", name: "Population Mean", meaning: "The average of the entire dataset." },
            { symbol: "σ", name: "Standard Deviation", meaning: "The spread of the dataset. Dividing by this standardizes the score." }
          ]
        },
        {
          title: "Z-Score (Sample)",
          formula: <CSSFormula leftSide="z =" numerator="x - x̄" denominator="s" />,
          parameters: [
            { symbol: "z", name: "Z-Score", meaning: "The standardized value." },
            { symbol: "x̄", name: "Sample Mean", meaning: "The average of the sample." },
            { symbol: "s", name: "Sample Standard Deviation", meaning: "The standard deviation of the sample." }
          ]
        }
      ]}
      specialCases={[
        {
          title: "Converting Z-Score back to Raw Score",
          description: "If you know a Z-Score and want to find the original Raw Score (x), you simply rearrange the formula using algebra: x = μ + (z * σ)."
        }
      ]}
      practiceProblem={{
        question: "A student scored an 85 on a test. The class average (μ) was a 75, and the standard deviation (σ) was 5. What is the student's Z-Score?",
        correctAnswer: 2,
        explanation: "1) Find the distance from the mean: 85 - 75 = 10. \n2) Divide by standard deviation: 10 / 5 = 2. \nThe student scored exactly 2 standard deviations above average."
      }}
      realWorldExample={{
        title: "Comparing SAT and ACT Scores",
        description: "Student A gets an 1350 on the SAT. Student B gets a 29 on the ACT. Who did better? Because they have different scales, we can't compare the raw scores. However, if we calculate their Z-Scores based on the national averages, we can see exactly who outperformed their peers more."
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6 h-full font-sans items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-600">Raw Score ($x$)</label>
            <input 
              type="number" 
              value={rawScore}
              onChange={(e) => setRawScore(Number(e.target.value))}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold text-indigo-600"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-600">Mean ($\mu$)</label>
            <input 
              type="number" 
              value={mean}
              onChange={(e) => setMean(Number(e.target.value))}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-slate-500 font-mono font-bold text-slate-700"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-600">Std Deviation ($\sigma$)</label>
            <input 
              type="number" 
              value={stdDev}
              onChange={(e) => setStdDev(Number(e.target.value))}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-slate-500 font-mono font-bold text-slate-700"
            />
          </div>
          
          {/* Metrics Cards */}
          <div className="flex flex-col gap-4">
            <div className="bg-white p-5 rounded-xl border-l-4 border-l-indigo-500 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Calculated Z-Score</span>
              <span className="text-3xl font-extrabold text-indigo-600 font-mono">
                {zScore > 0 ? '+' : ''}{zScore.toFixed(2)}
              </span>
              <p className="text-[10px] text-slate-500 mt-2 leading-tight">Your score is {Math.abs(zScore).toFixed(2)} standard deviations {zScore > 0 ? 'above' : 'below'} the average.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border-l-4 border-l-emerald-500 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Percentile Rank</span>
              <span className="text-3xl font-extrabold text-emerald-600 font-mono">
                {percentile.toFixed(1)}th
              </span>
              <p className="text-[10px] text-slate-500 mt-2 leading-tight">You scored higher than {percentile.toFixed(1)}% of the population. A Z-Score of 0 puts you exactly at the 50th percentile.</p>
            </div>
          </div>
        </div>
        </div>

        {/* Visualizer Column */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col relative min-h-[400px]">
          <h3 className="absolute top-4 left-6 font-bold text-slate-300 uppercase tracking-widest text-xs z-10">Standard Normal Distribution</h3>
          
          <div className="w-full h-full flex-1 relative mt-4">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              
              {/* The Bell Curve Path */}
              <path 
                d={pathData} 
                fill="rgba(241, 245, 249, 0.5)" 
                stroke="#cbd5e1" 
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />

              {/* Standard Deviation Lines */}
              {[-3, -2, -1, 0, 1, 2, 3].map(std => {
                const xPos = ((std + 4) / 8) * 100;
                return (
                  <line 
                    key={std}
                    x1={xPos} y1="0" x2={xPos} y2="100" 
                    stroke={std === 0 ? "#94a3b8" : "#e2e8f0"} 
                    strokeWidth="1.5" 
                    strokeDasharray={std === 0 ? "" : "4,4"} 
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}

              {/* User Score Marker SVG Line */}
              {zScore >= -4 && zScore <= 4 && (
                <g className="transition-all duration-300 ease-out" style={{ transform: `translateX(${((zScore + 4) / 8) * 100}%)` }}>
                  <line 
                    x1="0" y1="0" x2="0" y2="100" 
                    stroke="#4f46e5" 
                    strokeWidth="2.5" 
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              )}
            </svg>

            {/* User Score Marker HTML Overlays for perfect circles */}
            {zScore >= -4 && zScore <= 4 && (
              <div 
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out pointer-events-none flex items-center justify-center"
                style={{ left: `${((zScore + 4) / 8) * 100}%` }}
              >
                <div className="absolute w-4 h-4 rounded-full bg-indigo-600/20" />
                <div className="absolute w-2 h-2 rounded-full bg-indigo-600" />
              </div>
            )}
            
            {/* Warning if off chart */}
            {(zScore < -4 || zScore > 4) && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-100 text-rose-700 px-4 py-2 rounded-lg font-bold text-sm shadow-sm border border-rose-200 z-20 whitespace-nowrap">
                Warning: Z-Score ({zScore.toFixed(2)}) is completely off the standard chart.
              </div>
            )}
          </div>
          
          {/* Axis Labels (Z-Scores) */}
          <div className="w-full flex justify-between mt-2 text-[10px] font-bold text-slate-400 px-[12.5%] relative">
            <span className="absolute left-0">-4z</span>
            <span className="absolute left-[12.5%] -translate-x-1/2">-3z</span>
            <span className="absolute left-[25%] -translate-x-1/2">-2z</span>
            <span className="absolute left-[37.5%] -translate-x-1/2">-1z</span>
            <span className="absolute left-[50%] -translate-x-1/2 text-slate-600">0 (Mean)</span>
            <span className="absolute left-[62.5%] -translate-x-1/2">+1z</span>
            <span className="absolute left-[75%] -translate-x-1/2">+2z</span>
            <span className="absolute left-[87.5%] -translate-x-1/2">+3z</span>
            <span className="absolute right-0">+4z</span>
          </div>
        </div>

      </div>
    </div>
    </StatisticsLessonTemplate>
  );
};
