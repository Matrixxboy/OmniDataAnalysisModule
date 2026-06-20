import React, { useState, useMemo } from 'react';
import { StatisticsLessonTemplate, CSSFormula } from '../../ui/StatisticsLessonTemplate';

export const VarianceStdLesson: React.FC = () => {
  const [spread, setSpread] = useState<number>(50); // 0 to 100

  const { dataPoints, mean, variance, stdDev } = useMemo(() => {
    // Generate 5 points around a central mean (50) based on spread
    const centralMean = 50;
    const offset1 = spread * 0.4;
    const offset2 = spread * 0.9;
    
    // Create points: Mean, Mean ± offset1, Mean ± offset2
    const pts = [
      Math.max(0, centralMean - offset2),
      Math.max(0, centralMean - offset1),
      centralMean,
      Math.min(100, centralMean + offset1),
      Math.min(100, centralMean + offset2)
    ].sort((a, b) => a - b);
    
    const m = pts.reduce((a, b) => a + b, 0) / pts.length;
    const squaredDiffs = pts.map(p => Math.pow(p - m, 2));
    const v = squaredDiffs.reduce((a, b) => a + b, 0) / pts.length;
    const sd = Math.sqrt(v);

    return { dataPoints: pts, mean: m, variance: v, stdDev: sd };
  }, [spread]);

  return (
    <StatisticsLessonTemplate
      topicName="Variance & Standard Deviation"
      purpose="Variance and Standard Deviation measure how spread out your data is from the mean. Standard deviation is in the same units as your data, making it the most commonly used metric for volatility or uncertainty."
      formulas={[
        {
          title: "Population Standard Deviation (σ)",
          formula: <CSSFormula leftSide="σ =" numerator="√Σ(xᵢ - μ)²" denominator="N" />,
          parameters: [
            { symbol: "σ", name: "Population Std Dev", meaning: "Used when you have data for the entire population." },
            { symbol: "xᵢ - μ", name: "Deviation from Mean", meaning: "How far a specific data point is from the average." },
            { symbol: "N", name: "Population Size", meaning: "The total number of data points in the population." }
          ]
        },
        {
          title: "Sample Standard Deviation (s)",
          formula: <CSSFormula leftSide="s =" numerator="√Σ(xᵢ - x̄)²" denominator="n - 1" />,
          parameters: [
            { symbol: "s", name: "Sample Std Dev", meaning: "Used when you only have a sample of the population." },
            { symbol: "xᵢ - x̄", name: "Deviation from Sample Mean", meaning: "Distance from the sample average." },
            { symbol: "n - 1", name: "Bessel's Correction", meaning: "Dividing by n-1 instead of n corrects the bias in the estimation of the population variance." }
          ]
        },
        {
          title: "Population Variance (σ²)",
          formula: <CSSFormula leftSide="σ² =" numerator="Σ(xᵢ - μ)²" denominator="N" />,
          parameters: [
            { symbol: "σ²", name: "Population Variance", meaning: "The average of the squared differences from the Mean." },
            { symbol: "xᵢ - μ", name: "Deviation from Mean", meaning: "Distance from the population average." },
            { symbol: "N", name: "Population Size", meaning: "The total number of data points in the population." }
          ]
        },
        {
          title: "Sample Variance (s²)",
          formula: <CSSFormula leftSide="s² =" numerator="Σ(xᵢ - x̄)²" denominator="n - 1" />,
          parameters: [
            { symbol: "s²", name: "Sample Variance", meaning: "The average of the squared differences from the Sample Mean. The units are squared." },
            { symbol: "Σ(xᵢ - x̄)²", name: "Sum of Squares", meaning: "Squaring prevents negative differences from canceling out positive ones." }
          ]
        }
      ]}
      specialCases={[
        {
          title: "Bessel's Correction (n-1)",
          description: "When calculating the standard deviation of a sample (not the entire population), you must divide by n-1 instead of n. This is called Bessel's Correction, and it artificially inflates the standard deviation slightly to account for the uncertainty of not having the full population data."
        }
      ]}
      practiceProblem={{
        question: "Calculate the Population Variance (σ²) of the dataset: [ 2, 4, 4, 4, 5, 5, 7, 9 ]",
        dataList: "Mean (μ) = 5",
        correctAnswer: 4,
        explanation: "1) Find squared differences from mean: (-3)²=9, (-1)²=1, (-1)²=1, (-1)²=1, 0²=0, 0²=0, 2²=4, 4²=16. 2) Sum them: 9+1+1+1+0+0+4+16 = 32. 3) Divide by N (8): 32 / 8 = 4."
      }}
      realWorldExample={{
        title: "Investment Risk Analysis",
        description: "Two stocks might both have an average return of 8% per year. However, Stock A fluctuates between 6% and 10% (Low Standard Deviation), while Stock B fluctuates between -20% and +36% (High Standard Deviation). Standard deviation represents the actual risk (volatility) of the investment."
      }}
    >
      <div className="flex flex-col gap-8 h-full font-sans">
        
        {/* Controls */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Data Spread Controller</h3>
            <p className="text-xs text-slate-500 mb-4">Adjust the slider to pull the data points away from the center (mean) or push them tightly together.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-400">Tightly Clustered</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={spread}
              onChange={(e) => setSpread(Number(e.target.value))}
              className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="text-xs font-bold text-slate-400">Widely Spread</span>
          </div>
        </div>

        {/* Visualizer */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
          {/* Mean Line */}
          <div className="absolute top-10 bottom-10 left-1/2 w-0.5 bg-indigo-300 border-l border-dashed border-indigo-400 z-0"></div>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold z-10">Mean: {mean.toFixed(1)}</div>
          
          <div className="w-full relative h-12 flex items-center">
            {/* Number line axis */}
            <div className="absolute w-full h-1 bg-slate-200 rounded-full top-1/2 -translate-y-1/2"></div>
            
            {/* Data Points */}
            {dataPoints.map((pt, idx) => (
              <div 
                key={idx}
                className="absolute w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-md top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-300 ease-out hover:scale-125"
                style={{ left: `calc(${pt}% - 12px)` }}
                title={`Value: ${pt.toFixed(1)}`}
              >
                <div className="absolute -top-6 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 hover:opacity-100 transition-opacity">
                  {pt.toFixed(1)}
                </div>
              </div>
            ))}
            
            {/* Standard Deviation Indicators */}
            {stdDev > 0 && (
              <>
                <div 
                  className="absolute h-8 border-x-2 border-t-2 border-rose-300 rounded-t-lg top-1/2 -translate-y-[calc(100%+8px)] transition-all duration-300 ease-out z-10"
                  style={{ 
                    left: `calc(${Math.max(0, mean - stdDev)}%)`, 
                    width: `${Math.min(100 - Math.max(0, mean - stdDev), stdDev * 2)}%` 
                  }}
                >
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-rose-500 whitespace-nowrap bg-white px-1">
                    ± 1 Std Dev ({stdDev.toFixed(1)})
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Axis Labels */}
          <div className="w-full flex justify-between mt-8 text-[10px] font-bold text-slate-400">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
          <div className="bg-white p-5 rounded-xl border-l-4 border-l-orange-500 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-16 h-16 bg-orange-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Variance ($\sigma^2$)</span>
            <span className="text-3xl font-extrabold text-orange-600 font-mono">
              {variance.toFixed(1)}
            </span>
            <p className="text-[10px] text-slate-500 mt-2 leading-tight">The average of the squared differences from the Mean. Hard to interpret practically due to squared units.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border-l-4 border-l-rose-500 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-16 h-16 bg-rose-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Standard Deviation ($\sigma$)</span>
            <span className="text-3xl font-extrabold text-rose-600 font-mono">
              {stdDev.toFixed(1)}
            </span>
            <p className="text-[10px] text-slate-500 mt-2 leading-tight">The square root of the Variance. Highly interpretable as the typical distance from the Mean.</p>
          </div>
        </div>

      </div>
    </StatisticsLessonTemplate>
  );
};
