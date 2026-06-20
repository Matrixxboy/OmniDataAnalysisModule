import React, { useState, useMemo } from 'react';
import { StatisticsLessonTemplate, CSSFormula } from '../../ui/StatisticsLessonTemplate';

export const ProbabilityDistributionsLesson: React.FC = () => {
  const [mean, setMean] = useState<number>(50); // 0 to 100
  const [stdDev, setStdDev] = useState<number>(15); // 5 to 40

  // Generate Normal Distribution curve points
  const { pathData } = useMemo(() => {
    const pts = [];
    let path = "";
    
    // Using a standard normal distribution formula
    // f(x) = (1 / (stdDev * sqrt(2 * PI))) * e^(-0.5 * ((x - mean) / stdDev)^2)
    
    const multiplier = 1 / (stdDev * Math.sqrt(2 * Math.PI));
    let maxHeight = 0;

    // First pass to find max height for scaling
    for (let x = 0; x <= 100; x++) {
      const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
      const y = multiplier * Math.exp(exponent);
      if (y > maxHeight) maxHeight = y;
    }

    for (let x = 0; x <= 100; x++) {
      const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
      const y = multiplier * Math.exp(exponent);
      
      // Scale y to fit in a 0-100 coordinate system (inverted for SVG)
      const scaledY = 100 - (y / maxHeight) * 90; // Leave 10% margin at top
      pts.push({ x, y: scaledY });
      
      if (x === 0) {
        path += `M ${x} ${scaledY} `;
      } else {
        path += `L ${x} ${scaledY} `;
      }
    }
    
    // Close the path for filling
    path += `L 100 100 L 0 100 Z`;

    return { pathData: path, points: pts };
  }, [mean, stdDev]);

  return (
    <StatisticsLessonTemplate
      topicName="Normal Distribution"
      purpose="The Normal Distribution (Bell Curve) is the most important probability distribution in statistics. Many natural phenomena and human characteristics naturally form a bell curve when measured."
      formulas={[
        {
          title: "Probability Density Function (PDF)",
          formula: <CSSFormula leftSide="f(x) =" numerator="1" denominator="σ√(2π)" rightSide={<div className="flex items-start text-[32px] md:text-[42px] ml-2 font-serif">e<div className="text-[18px] md:text-[22px] mt-1 ml-1">-(x-μ)²/2σ²</div></div>} />,
          parameters: [
            { symbol: "μ", name: "Mean", meaning: "Determines the center (peak) of the bell curve." },
            { symbol: "σ", name: "Standard Deviation", meaning: "Determines the width (spread) of the curve. A larger standard deviation creates a flatter, wider bell." },
            { symbol: "e", name: "Euler's Number", meaning: "A mathematical constant approximately equal to 2.71828." },
            { symbol: "π", name: "Pi", meaning: "A mathematical constant approximately equal to 3.14159." }
          ]
        },
        {
          title: "Empirical Rule (68-95-99.7)",
          formula: <div className="text-[24px] md:text-[32px] font-serif font-medium text-center leading-tight">68% within 1σ<br/>95% within 2σ<br/>99.7% within 3σ</div>,
          parameters: [
            { symbol: "1σ", name: "One Std Dev", meaning: "68% of all data points fall within one standard deviation of the mean." },
            { symbol: "2σ", name: "Two Std Dev", meaning: "95% of all data points fall within two standard deviations." },
            { symbol: "3σ", name: "Three Std Dev", meaning: "99.7% of all data points fall within three standard deviations. Anything beyond this is considered an extreme outlier." }
          ]
        }
      ]}
      specialCases={[
        {
          title: "Non-Normal Distributions",
          description: "Not everything forms a bell curve. Wealth distribution is heavily right-skewed (Pareto Distribution). Coin flips follow a Binomial Distribution. Always verify your data looks somewhat normal (e.g. using a histogram) before blindly applying normal distribution math!"
        }
      ]}
      practiceProblem={{
        question: "If the mean height of men is 70 inches with a standard deviation of 3 inches, what percentage of men are between 67 and 73 inches tall? (Enter a number without the % sign)",
        correctAnswer: 68,
        explanation: "67 inches is 1 standard deviation below the mean (70 - 3). 73 inches is 1 standard deviation above the mean (70 + 3). According to the Empirical Rule, 68% of data falls within exactly 1 standard deviation of the mean."
      }}
      realWorldExample={{
        title: "Quality Control in Manufacturing",
        description: "A machine fills bottles with exactly 500ml of water. Due to tiny mechanical variations, some bottles get 498ml, others 502ml. When you plot the volume of 10,000 bottles, they form a perfect normal distribution centered at exactly 500ml."
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6 h-full font-sans items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-5">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Distribution Shaper</h3>
            <p className="text-xs text-slate-500">Adjust the Mean ($\mu$) to shift the curve left/right. Adjust the Standard Deviation ($\sigma$) to make it tall and thin or short and wide.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center font-serif italic">μ</span>
                  Mean (Center)
                </label>
                <span className="text-xs font-mono font-bold text-indigo-600">{mean}</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="90" 
                value={mean}
                onChange={(e) => setMean(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center font-serif italic">σ</span>
                  Std Deviation (Spread)
                </label>
                <span className="text-xs font-mono font-bold text-emerald-600">{stdDev}</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="30" 
                value={stdDev}
                onChange={(e) => setStdDev(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          </div>
        </div>
        </div>

        {/* Visualizer Column */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col relative min-h-[400px]">
          <h3 className="absolute top-4 left-6 font-bold text-slate-300 uppercase tracking-widest text-xs z-10">Probability Density</h3>
          
          <div className="w-full h-full flex-1 relative mt-4">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              
              {/* Grid Lines */}
              <line x1="0" y1="25" x2="100" y2="25" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              
              {/* X Axis */}
              <line x1="0" y1="100" x2="100" y2="100" stroke="#cbd5e1" strokeWidth="1" vectorEffect="non-scaling-stroke" />

              {/* The Bell Curve Path */}
              <path 
                d={pathData} 
                fill="rgba(99, 102, 241, 0.15)" 
                stroke="#6366f1" 
                strokeWidth="2.5"
                strokeLinejoin="round"
                className="transition-all duration-300 ease-out"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Mean Line */}
              <line 
                x1={mean} y1="0" x2={mean} y2="100" 
                stroke="#4f46e5" 
                strokeWidth="1.5" 
                strokeDasharray="4,4" 
                className="transition-all duration-300 ease-out"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* +1 Std Dev Line */}
              <line 
                x1={mean + stdDev} y1="0" x2={mean + stdDev} y2="100" 
                stroke="#10b981" 
                strokeWidth="1.5" 
                strokeDasharray="4,4" 
                className="transition-all duration-300 ease-out"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* -1 Std Dev Line */}
              <line 
                x1={mean - stdDev} y1="0" x2={mean - stdDev} y2="100" 
                stroke="#10b981" 
                strokeWidth="1.5" 
                strokeDasharray="4,4" 
                className="transition-all duration-300 ease-out"
                vectorEffect="non-scaling-stroke"
              />
              
            </svg>
            
            {/* Legend / Annotations */}
            <div className="absolute top-0 right-0 bg-white/80 backdrop-blur border border-slate-200 rounded-lg p-2 text-[10px] font-bold text-slate-500 shadow-sm flex flex-col gap-1">
              <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-indigo-600 border border-dashed"></div> Mean ($\mu$)</div>
              <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-emerald-500 border border-dashed"></div> $\pm 1\sigma$ (68% of data)</div>
            </div>
          </div>
          
          {/* Axis Labels */}
          <div className="w-full flex justify-between mt-2 text-[10px] font-bold text-slate-400">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
      </div>
      </div>
    </StatisticsLessonTemplate>
  );
};
