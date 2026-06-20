import React, { useState, useMemo } from 'react';
import { StatisticsLessonTemplate, CSSFormula } from '../../ui/StatisticsLessonTemplate';

export const CorrelationLesson: React.FC = () => {
  const [r, setR] = useState<number>(0.8); // -1.0 to 1.0

  // Generate 50 points based on the correlation coefficient r
  const points = useMemo(() => {
    const pts = [];
    // Box-Muller transform for standard normal variables
    const randn_bm = () => {
      let u = 0, v = 0;
      while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
      while (v === 0) v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };

    for (let i = 0; i < 50; i++) {
      // Generate two independent standard normal variables
      const x_norm = randn_bm();
      const z_norm = randn_bm();
      
      // Correlate the second variable based on r
      const y_norm = r * x_norm + Math.sqrt(1 - r * r) * z_norm;
      
      // Scale and shift to fit the 0-100 SVG viewbox nicely
      // Assuming std dev of ~1.5 to keep most within 0-100 after *15 + 50
      const x = Math.min(95, Math.max(5, x_norm * 15 + 50));
      // Invert Y for SVG (0 is top)
      const y = Math.min(95, Math.max(5, 100 - (y_norm * 15 + 50)));
      
      pts.push({ x, y });
    }
    return pts;
  }, [r]);

  return (
    <StatisticsLessonTemplate
      topicName="Correlation (r)"
      purpose="Correlation measures the strength and direction of the linear relationship between two variables. It ranges from -1 (perfect negative) to 1 (perfect positive)."
      formulas={[
        {
          title: "Pearson Correlation (r)",
          formula: <CSSFormula leftSide="r =" numerator="Σ(xᵢ - x̄)(yᵢ - ȳ)" denominator="√[Σ(xᵢ - x̄)² Σ(yᵢ - ȳ)²]" />,
          parameters: [
            { symbol: "r", name: "Pearson Coefficient", meaning: "A unitless number between -1 and +1 indicating linear strength." },
            { symbol: "xᵢ - x̄", name: "X Deviation", meaning: "How far an individual X value is from the X mean." },
            { symbol: "yᵢ - ȳ", name: "Y Deviation", meaning: "How far an individual Y value is from the Y mean." },
            { symbol: "Σ", name: "Sum of Products", meaning: "If both X and Y tend to be above their means together, the product is positive, increasing r." }
          ]
        },
        {
          title: "Coefficient of Determination (R²)",
          formula: <div className="text-[38px] md:text-[48px] font-serif text-slate-900 font-medium">R² = (r)²</div>,
          parameters: [
            { symbol: "R²", name: "R-Squared", meaning: "The proportion of the variance in the dependent variable that is predictable from the independent variable." },
            { symbol: "r", name: "Pearson Coefficient", meaning: "Simply square the Pearson correlation to get R²." }
          ]
        }
      ]}
      specialCases={[
        {
          title: "Non-Linear Relationships",
          description: "Pearson correlation only measures linear relationships. If your data forms a perfect U-shape (like a quadratic equation), the Pearson correlation (r) will be 0, even though there is a perfect relationship!"
        },
        {
          title: "Spearman's Rank Correlation",
          description: "If your data is ordinal (ranked, like a race finish order 1st, 2nd, 3rd) or non-linear but monotonic (always increasing, just not in a straight line), use Spearman's rho (ρ) instead of Pearson's r."
        }
      ]}
      practiceProblem={{
        question: "If the Pearson Correlation (r) between a student's study time and test score is 0.8, what is the Coefficient of Determination (R²)?",
        correctAnswer: 0.64,
        explanation: "Simply square the correlation coefficient. 0.8 * 0.8 = 0.64. This means 64% of the variation in test scores can be explained by study time!"
      }}
      realWorldExample={{
        title: "Marketing Spend vs Revenue",
        description: "A business analyzes its monthly marketing spend (X) against its monthly revenue (Y). A correlation of r=0.85 indicates a strong positive relationship—when marketing spend goes up, revenue tends to go up significantly."
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6 h-full font-sans items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Relationship Simulator</h3>
              <p className="text-xs text-slate-500">Slide to change the correlation coefficient (r). Notice how the scatter plot clusters tightly or spreads randomly.</p>
            </div>
            <div className={`px-3 py-1 rounded-lg text-sm font-bold font-mono text-white ${r > 0.5 ? 'bg-emerald-500' : r < -0.5 ? 'bg-rose-500' : 'bg-slate-400'}`}>
              r = {r.toFixed(2)}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-rose-500 w-16 text-right">Negative<br/>(-1.0)</span>
            <input 
              type="range" 
              min="-1" 
              max="1" 
              step="0.01"
              value={r}
              onChange={(e) => setR(Number(e.target.value))}
              className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="text-xs font-bold text-emerald-500 w-16">Positive<br/>(+1.0)</span>
          </div>
        </div>
        </div>

        {/* Visualizer Column */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col relative min-h-[400px]">
          
          <div className="w-full h-full flex-1 relative border-l-2 border-b-2 border-slate-300 ml-4 mb-4">
            {/* Axis Labels */}
            <span className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Variable Y</span>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Variable X</span>

            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              
              {/* Grid Lines */}
              <line x1="0" y1="25" x2="100" y2="25" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="25" y1="0" x2="25" y2="100" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="75" y1="0" x2="75" y2="100" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              
              {/* Trend Line (Best Fit) */}
              <line 
                x1="10" 
                y1={100 - (r * -40 + 50)} 
                x2="90" 
                y2={100 - (r * 40 + 50)} 
                stroke={r > 0 ? '#10b981' : r < 0 ? '#f43f5e' : '#94a3b8'}
                strokeWidth="2.5" 
                strokeDasharray="4,4"
                className="transition-all duration-300 ease-out opacity-50"
                vectorEffect="non-scaling-stroke"
              />
              
            </svg>

            {/* Data Points rendered as divs to prevent aspect ratio distortion */}
            {points.map((pt, idx) => (
              <div 
                key={idx}
                className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-[800ms] ease-out opacity-80 pointer-events-none"
                style={{ 
                  left: `${pt.x}%`, 
                  top: `${pt.y}%`,
                  backgroundColor: r > 0.5 ? '#10b981' : r < -0.5 ? '#f43f5e' : '#6366f1' 
                }}
              />
            ))}
            
            {/* Correlation Interpretation */}
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur border border-slate-200 rounded-lg p-3 text-xs shadow-sm max-w-[160px]">
              <span className="font-bold text-slate-800 block mb-1">Interpretation:</span>
              <span className="text-slate-600">
                {r > 0.8 ? "Strong Positive: Variables increase together closely." : 
                 r > 0.3 ? "Weak Positive: Variables loosely increase together." : 
                 r > -0.3 ? "No Correlation: Variables are independent." : 
                 r > -0.8 ? "Weak Negative: As X increases, Y loosely decreases." : 
                 "Strong Negative: As X increases, Y closely decreases."}
              </span>
            </div>
          </div>
        </div>

        </div>      
      </div>
    </StatisticsLessonTemplate>
  );
};
