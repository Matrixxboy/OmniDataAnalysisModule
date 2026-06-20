import React, { useState, useMemo } from 'react';
import { StatisticsLessonTemplate, CSSFormula } from '../../ui/StatisticsLessonTemplate';

export const HypothesisTestingLesson: React.FC = () => {
  const [sampleMean, setSampleMean] = useState<number>(55); // 30 to 70

  // Fixed parameters for the Null Hypothesis
  const nullMean = 50;
  const stdError = 3; // Standard error of the mean (sigma / sqrt(n))

  // Calculate t-statistic and approximate p-value (using empirical rule for simplicity in UI)
  const { tStat, pValue, pathDataNull, pathDataSample } = useMemo(() => {
    const t = (sampleMean - nullMean) / stdError;
    
    // Very rough approximation of two-tailed p-value for normal dist
    // accurate enough for visual educational purposes
    let p = 1;
    const absT = Math.abs(t);
    if (absT > 3.9) p = 0.0001;
    else if (absT > 3) p = 0.003;
    else if (absT > 2.58) p = 0.01;
    else if (absT > 1.96) p = 0.05;
    else if (absT > 1.64) p = 0.10;
    else if (absT > 1) p = 0.32;
    else if (absT > 0.5) p = 0.62;
    else p = 0.8;

    // Generate bell curve paths
    const generateCurve = (meanVal: number) => {
      let path = "";
      const multiplier = 1 / (stdError * Math.sqrt(2 * Math.PI));
      let maxHeight = 0;
      for (let x = 20; x <= 80; x++) {
        const y = multiplier * Math.exp(-0.5 * Math.pow((x - nullMean) / stdError, 2));
        if (y > maxHeight) maxHeight = y;
      }
      for (let x = 20; x <= 80; x++) {
        const exponent = -0.5 * Math.pow((x - meanVal) / stdError, 2);
        const y = multiplier * Math.exp(exponent);
        const scaledX = ((x - 20) / 60) * 100; // Map 20-80 to 0-100 viewport
        const scaledY = 100 - (y / maxHeight) * 90;
        if (x === 20) path += `M ${scaledX} ${scaledY} `;
        else path += `L ${scaledX} ${scaledY} `;
      }
      path += `L 100 100 L 0 100 Z`;
      return path;
    };

    return { 
      tStat: t, 
      pValue: p,
      pathDataNull: generateCurve(nullMean),
      pathDataSample: generateCurve(sampleMean)
    };
  }, [sampleMean]);

  const isSignificant = Math.abs(tStat) >= 1.96;

  return (
    <StatisticsLessonTemplate
      topicName="Hypothesis Testing (T-Test)"
      purpose="Hypothesis testing evaluates two mutually exclusive statements about a population to determine which statement is best supported by the sample data. We test if a sample result is 'statistically significant' or just due to random chance."
      formulas={[
        {
          title: "One-Sample T-Test",
          formula: <CSSFormula leftSide="t =" numerator="x̄ - μ" denominator="s / √n" />,
          parameters: [
            { symbol: "t", name: "T-Statistic", meaning: "How many standard errors our sample mean is away from the null hypothesis mean." },
            { symbol: "x̄", name: "Sample Mean", meaning: "The average we actually measured in our experiment." },
            { symbol: "μ", name: "Null Mean", meaning: "The assumed population average if our experiment had no effect." },
            { symbol: "s / √n", name: "Standard Error", meaning: "The expected variation due to random sampling." }
          ]
        },
        {
          title: "Two-Sample T-Test",
          formula: <CSSFormula leftSide="t =" numerator="(x̄₁ - x̄₂)" denominator="√(s₁²/n₁ + s₂²/n₂)" />,
          parameters: [
            { symbol: "x̄₁ - x̄₂", name: "Difference in Means", meaning: "The measured difference between Group 1 and Group 2." },
            { symbol: "s², n", name: "Variance & Sample Size", meaning: "We must pool the variance of both groups to calculate the standard error of the difference." }
          ]
        }
      ]}
      specialCases={[
        {
          title: "Type I vs Type II Errors",
          description: "A Type I error (False Positive) is rejecting the null hypothesis when it's actually true (convicting an innocent person). A Type II error (False Negative) is failing to reject the null hypothesis when it's actually false (letting a guilty person go free)."
        },
        {
          title: "P-Hacking",
          description: "Running a test over and over again until you get a significant p-value by chance. If you run 20 random tests with an alpha of 0.05, you are statistically guaranteed to get at least one 'significant' result just by pure luck!"
        }
      ]}
      practiceProblem={{
        question: "You run a One-Sample T-Test. Your sample mean (x̄) is 12, the null mean (μ) is 10, the standard deviation (s) is 4, and your sample size (n) is 16. Calculate the t-statistic.",
        correctAnswer: 2,
        explanation: "1) Find the difference in means: x̄ - μ = 12 - 10 = 2. \n2) Find the standard error: s / √n = 4 / √16 = 4 / 4 = 1. \n3) Calculate t: 2 / 1 = 2."
      }}
      realWorldExample={{
        title: "A/B Testing a Landing Page",
        description: "Your website currently converts at 50% (Null Hypothesis). You change the button to red, and your sample converts at 55%. Is this a real improvement, or did you just get lucky with today's visitors? A t-test gives you a p-value to decide if you can confidently reject the null hypothesis."
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6 h-full font-sans items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Experiment Simulator</h3>
              <p className="text-xs text-slate-500">The grey curve is the Null Hypothesis (expected random results). Slide your new Sample Mean to see if it breaks away from the noise.</p>
            </div>
            <div className={`px-3 py-1 rounded-lg text-sm font-bold font-mono text-white ${isSignificant ? 'bg-emerald-500' : 'bg-slate-400'}`}>
              {isSignificant ? 'Significant Result!' : 'Not Significant'}
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-2">
            <span className="text-xs font-bold text-slate-400 w-24 text-right">Lower Conversion</span>
            <input 
              type="range" 
              min="40" 
              max="60" 
              step="0.1"
              value={sampleMean}
              onChange={(e) => setSampleMean(Number(e.target.value))}
              className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer ${isSignificant ? 'bg-emerald-200 accent-emerald-600' : 'bg-slate-200 accent-indigo-600'}`}
            />
            <span className="text-xs font-bold text-slate-400 w-24">Higher Conversion</span>
          </div>
          
          {/* Metrics Cards */}
          <div className="flex flex-col gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">T-Statistic</span>
              <span className={`text-3xl font-extrabold font-mono ${Math.abs(tStat) >= 1.96 ? 'text-emerald-600' : 'text-slate-700'}`}>
                {tStat > 0 ? '+' : ''}{tStat.toFixed(2)}
              </span>
              <p className="text-[10px] text-slate-500 mt-2 leading-tight">The distance in standard errors. Generally, values &gt; 1.96 or &lt; -1.96 indicate significance (at 95% confidence).</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">P-Value (Approx)</span>
              <span className={`text-3xl font-extrabold font-mono ${pValue <= 0.05 ? 'text-emerald-600' : 'text-rose-500'}`}>
                {pValue <= 0.05 ? '≤ 0.05' : '> 0.05'}
              </span>
              <p className="text-[10px] text-slate-500 mt-2 leading-tight">The probability of seeing this result if the Null Hypothesis was true. We want this to be very small (usually &lt; 0.05).</p>
            </div>
          </div>
          </div>
        </div>

        {/* Visualizer Column */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col relative min-h-[400px]">
          
          <div className="w-full h-full flex-1 relative">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              {/* Null Hypothesis Curve (Grey) */}
              <path 
                d={pathDataNull} 
                fill="rgba(148, 163, 184, 0.2)" 
                stroke="#94a3b8" 
                strokeWidth="2.5"
                strokeDasharray="4,4"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Sample Curve (Dynamic Color) */}
              <path 
                d={pathDataSample} 
                fill={isSignificant ? "rgba(16, 185, 129, 0.2)" : "rgba(99, 102, 241, 0.2)"} 
                stroke={isSignificant ? "#10b981" : "#6366f1"} 
                strokeWidth="2.5"
                className="transition-all duration-300 ease-out"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Critical Region Lines (alpha = 0.05 approx) */}
              <line x1="33.3" y1="0" x2="33.3" y2="100" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,4" vectorEffect="non-scaling-stroke" />
              <line x1="66.6" y1="0" x2="66.6" y2="100" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,4" vectorEffect="non-scaling-stroke" />
            </svg>

            {/* Labels */}
            <div className="absolute top-2 left-2 flex flex-col gap-1 text-[10px] font-bold">
              <span className="text-slate-500">Null Mean ($\mu$): {nullMean}</span>
              <span className={isSignificant ? "text-emerald-600" : "text-indigo-600"}>Sample Mean ({String.raw`$\bar{x}$`}): {sampleMean.toFixed(1)}</span>
            </div>
            
            <div className="absolute bottom-1/4 right-2 flex flex-col gap-1 bg-white/90 p-2 rounded border border-rose-100 shadow-sm text-[10px] font-bold">
              <span className="text-rose-500">Critical Boundaries</span>
              <span className="text-slate-400">If Sample moves past</span>
              <span className="text-slate-400">these lines, we reject Null.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </StatisticsLessonTemplate>
  );
};
