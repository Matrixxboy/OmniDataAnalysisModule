import React, { useState, useMemo } from 'react';
import { StatisticsLessonTemplate, CSSFormula } from '../../ui/StatisticsLessonTemplate';

export const LinearRegressionLesson: React.FC = () => {
  const [slope, setSlope] = useState<number>(0.5); // 0 to 2
  const [intercept, setIntercept] = useState<number>(20); // 0 to 50

  // Fixed dataset of points
  const points = useMemo(() => [
    { x: 10, y: 25 },
    { x: 20, y: 35 },
    { x: 30, y: 30 },
    { x: 40, y: 48 },
    { x: 50, y: 45 },
    { x: 60, y: 55 },
    { x: 70, y: 65 },
    { x: 80, y: 75 },
    { x: 90, y: 80 }
  ], []);

  // Calculate Mean Squared Error (MSE)
  const mse = useMemo(() => {
    let sumSquaredError = 0;
    points.forEach(p => {
      const predictedY = slope * p.x + intercept;
      const error = p.y - predictedY;
      sumSquaredError += (error * error);
    });
    return sumSquaredError / points.length;
  }, [slope, intercept, points]);

  // Find the mathematical line of best fit (Ordinary Least Squares)
  const ols = useMemo(() => {
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    points.forEach(p => {
      sumX += p.x;
      sumY += p.y;
      sumXY += p.x * p.y;
      sumXX += p.x * p.x;
    });
    const n = points.length;
    const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const b = (sumY - m * sumX) / n;
    
    // Calculate best MSE
    let bestSse = 0;
    points.forEach(p => {
      const pred = m * p.x + b;
      bestSse += Math.pow(p.y - pred, 2);
    });
    
    return { slope: m, intercept: b, mse: bestSse / n };
  }, [points]);

  const mseColor = mse <= ols.mse * 1.1 ? 'bg-emerald-500' : mse > 500 ? 'bg-rose-500' : 'bg-slate-400';

  return (
    <StatisticsLessonTemplate
      topicName="Linear Regression"
      purpose="Linear regression models the relationship between an independent variable (X) and a dependent variable (Y) by fitting a linear equation to observed data. It's the foundation of predictive modeling and machine learning."
      formulas={[
        {
          title: "Simple Linear Regression",
          formula: <div className="text-[38px] md:text-[48px] font-serif text-slate-900 font-medium">ŷ = β₀ + β₁x + ε</div>,
          parameters: [
            { symbol: "ŷ", name: "Predicted Value (Y-hat)", meaning: "The estimated value of the dependent variable." },
            { symbol: "β₀", name: "Y-Intercept", meaning: "The expected value of Y when X is exactly zero." },
            { symbol: "β₁", name: "Slope", meaning: "How much we expect Y to change when X increases by one unit." },
            { symbol: "x", name: "Independent Variable", meaning: "The predictor or feature we are using to make the prediction." },
            { symbol: "ε", name: "Error Term (Epsilon)", meaning: "The random variation or unpredicted variance not captured by the model." }
          ]
        },
        {
          title: "Multiple Linear Regression",
          formula: <div className="text-[28px] md:text-[36px] font-serif text-slate-900 font-medium tracking-tight">ŷ = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ</div>,
          parameters: [
            { symbol: "x₁, x₂...", name: "Multiple Features", meaning: "Using more than one independent variable to predict Y (e.g. predicting house price using both Square Footage AND Number of Bedrooms)." },
            { symbol: "β₁, β₂...", name: "Partial Slopes", meaning: "The effect of one specific feature on Y, assuming all other features are held constant." }
          ]
        }
      ]}
      specialCases={[
        {
          title: "Correlation Does Not Imply Causation",
          description: "Just because two variables have a strong linear relationship (e.g., Ice cream sales and shark attacks both go up in summer), it does not mean one causes the other. They might both be driven by a third 'confounding' variable (like temperature)."
        },
        {
          title: "Extrapolation Dangers",
          description: "A linear model is only reliable within the range of the training data. If you train a model on houses between 1,000 and 3,000 sq ft, using it to predict the price of a 100,000 sq ft mega-mansion will likely produce absurd results."
        }
      ]}
      practiceProblem={{
        question: "You trained a model to predict a student's Test Score (Y) based on Hours Studied (X). The model is: ŷ = 50 + 5x. If a student studies for 4 hours, what is their predicted test score?",
        correctAnswer: 70,
        explanation: "Plug x = 4 into the equation: ŷ = 50 + 5(4). ŷ = 50 + 20. The predicted score is 70."
      }}
      realWorldExample={{
        title: "Predicting House Prices",
        description: "If X is the square footage of a house, and Y is the price, a linear regression model finds the 'line of best fit' through historical sales data. You can then plug in a new house's square footage into the equation to predict its selling price."
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6 h-full font-sans items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-5">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Line Fitting Simulator</h3>
              <p className="text-xs text-slate-500 max-w-sm">Adjust the Slope and Intercept to minimize the Error (MSE). The mathematically perfect OLS fit has an MSE of {ols.mse.toFixed(1)}.</p>
            </div>
            <div className={`px-3 py-1 rounded-lg text-xs font-bold font-mono text-white ${mseColor}`}>
              MSE = {mse.toFixed(1)}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center font-serif italic font-bold">m</span>
                  Slope ($\beta_1$)
                </label>
                <span className="text-xs font-mono font-bold text-indigo-600">{slope.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="-1" 
                max="2" 
                step="0.05"
                value={slope}
                onChange={(e) => setSlope(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center font-serif italic font-bold">b</span>
                  Intercept ($\beta_0$)
                </label>
                <span className="text-xs font-mono font-bold text-emerald-600">{intercept.toFixed(1)}</span>
              </div>
              <input 
                type="range" 
                min="-20" 
                max="60" 
                step="1"
                value={intercept}
                onChange={(e) => setIntercept(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          </div>
        </div>
        </div>

        {/* Visualizer Column */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col relative min-h-[400px]">
          
          <div className="w-full h-full flex-1 relative border-l-2 border-b-2 border-slate-300 ml-4 mb-4">
            {/* Axis Labels */}
            <span className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Dependent (Y)</span>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Independent (X)</span>

            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              
              {/* Grid Lines */}
              <line x1="0" y1="25" x2="100" y2="25" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="25" y1="0" x2="25" y2="100" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="75" y1="0" x2="75" y2="100" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              
              {/* OLS Best Fit Line (Faded) */}
              <line 
                x1="0" 
                y1={100 - ols.intercept} 
                x2="100" 
                y2={100 - (ols.slope * 100 + ols.intercept)} 
                stroke="#94a3b8"
                strokeWidth="1.5" 
                strokeDasharray="4,4"
                vectorEffect="non-scaling-stroke"
              />

              {/* User Adjustable Line */}
              <line 
                x1="0" 
                y1={100 - intercept} 
                x2="100" 
                y2={100 - (slope * 100 + intercept)} 
                stroke="#6366f1"
                strokeWidth="2.5" 
                className="transition-all duration-75 ease-linear"
                vectorEffect="non-scaling-stroke"
              />

              {/* Data Points and Error Lines */}
              {points.map((pt, idx) => {
                const predictedY = slope * pt.x + intercept;
                const svgY = 100 - pt.y;
                const svgPredY = 100 - predictedY;
                
                return (
                  <g key={idx}>
                    {/* Error Residual Line */}
                    <line 
                      x1={pt.x} y1={svgY} 
                      x2={pt.x} y2={svgPredY} 
                      stroke="#f43f5e" 
                      strokeWidth="1.5" 
                      opacity="0.6"
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                );
              })}
              
            </svg>

            {/* Data Point Circles rendered over SVG to prevent distortion */}
            {points.map((pt, idx) => {
              const svgY = 100 - pt.y;
              return (
                <div 
                  key={`pt-${idx}`}
                  className="absolute w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-sm -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ left: `${pt.x}%`, top: `${svgY}%` }}
                ></div>
              );
            })}
            
            {/* Legend */}
            <div className="absolute top-2 right-2 flex flex-col gap-1.5 bg-white/90 backdrop-blur border border-slate-200 rounded-lg p-3 text-[10px] font-bold text-slate-500 shadow-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-indigo-500"></div> Your Model: $\hat y = {slope.toFixed(2)}x + {intercept.toFixed(1)}$</div>
              <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-slate-400 border border-dashed"></div> Math Best Fit</div>
              <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-rose-500 opacity-50"></div> Residuals (Errors)</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </StatisticsLessonTemplate>
  );
};
