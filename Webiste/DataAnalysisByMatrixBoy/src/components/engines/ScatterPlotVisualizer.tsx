import React, { useState, useRef, useMemo } from 'react';
import type { ScatterPlotVisualizerProps } from '../../types/schema';

export const ScatterPlotVisualizer: React.FC<ScatterPlotVisualizerProps> = ({ initialPoints }) => {
  const [points, setPoints] = useState(initialPoints);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  
  const svgRef = useRef<SVGSVGElement>(null);

  const regression = useMemo(() => {
    const n = points.length;
    if (n === 0) return { slope: 0, intercept: 0, r2: 0 };
    
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0, sumYY = 0;
    points.forEach(p => {
      sumX += p.x;
      sumY += p.y;
      sumXY += p.x * p.y;
      sumXX += p.x * p.x;
      sumYY += p.y * p.y;
    });

    const denominator = n * sumXX - sumX * sumX;
    if (denominator === 0) return { slope: 0, intercept: 0, r2: 0 };

    const slope = (n * sumXY - sumX * sumY) / denominator;
    const intercept = (sumY - slope * sumX) / n;

    const meanY = sumY / n;
    let ssTot = 0, ssRes = 0;
    points.forEach(p => {
      const predictedY = slope * p.x + intercept;
      ssTot += Math.pow(p.y - meanY, 2);
      ssRes += Math.pow(p.y - predictedY, 2);
    });
    const r2 = ssTot === 0 ? 1 : 1 - (ssRes / ssTot);

    return { slope, intercept, r2 };
  }, [points]);

  const viewBoxSize = 1000;
  const padding = 100;
  const graphSize = viewBoxSize - 2 * padding;
  const minData = 0;
  const maxData = 100;

  const dataToSvg = (val: number) => padding + ((val - minData) / (maxData - minData)) * graphSize;
  const svgToDataX = (val: number) => minData + ((val - padding) / graphSize) * (maxData - minData);
  const svgToDataY = (val: number) => maxData - ((val - padding) / graphSize) * (maxData - minData);

  const handlePointerDown = (idx: number, e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    setDraggingIdx(idx);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggingIdx === null || !svgRef.current) return;
    
    const CTM = svgRef.current.getScreenCTM();
    if (!CTM) return;
    
    const svgX = (e.clientX - CTM.e) / CTM.a;
    const svgY = (e.clientY - CTM.f) / CTM.d;

    const dataX = Math.max(minData, Math.min(maxData, svgToDataX(svgX)));
    const dataY = Math.max(minData, Math.min(maxData, svgToDataY(svgY)));

    setPoints(prev => {
      const newPts = [...prev];
      newPts[draggingIdx] = { x: dataX, y: dataY };
      return newPts;
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingIdx !== null) {
      (e.target as Element).releasePointerCapture(e.pointerId);
      setDraggingIdx(null);
    }
  };

  const gridTicks = [0, 20, 40, 60, 80, 100];

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto font-sans">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold tracking-tight text-slate-900">Scatter Plot & Regression Analysis</h3>
        <p className="text-sm text-slate-600">Drag the data points to observe how the regression line and $R^2$ dynamically adjust.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full relative touch-none">
          <svg 
            ref={svgRef}
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} 
            className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200 cursor-crosshair shadow-inner"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {gridTicks.map(tick => {
              const pos = dataToSvg(tick);
              const isZero = tick === 0;
              return (
                <g key={`grid-${tick}`}>
                  <line 
                    x1={pos} y1={padding} 
                    x2={pos} y2={viewBoxSize - padding} 
                    stroke={isZero ? "rgba(15,23,42,0.1)" : "rgba(148, 163, 184, 0.4)"}
                    strokeWidth={isZero ? 2 : 1}
                    strokeDasharray={isZero ? "none" : "10 10"}
                  />
                  <text x={pos} y={viewBoxSize - padding + 25} fill="#64748b" fontSize="18" textAnchor="middle" fontFamily="monospace">
                    {tick}
                  </text>
                  
                  <line 
                    x1={padding} y1={viewBoxSize - pos} 
                    x2={viewBoxSize - padding} y2={viewBoxSize - pos} 
                    stroke={isZero ? "rgba(15,23,42,0.1)" : "rgba(148, 163, 184, 0.4)"}
                    strokeWidth={isZero ? 2 : 1}
                    strokeDasharray={isZero ? "none" : "10 10"}
                  />
                  <text x={padding - 15} y={viewBoxSize - pos + 6} fill="#64748b" fontSize="18" textAnchor="end" fontFamily="monospace">
                    {tick}
                  </text>
                </g>
              );
            })}

            {points.length > 1 && (
              <line 
                x1={dataToSvg(minData)}
                y1={viewBoxSize - dataToSvg(regression.slope * minData + regression.intercept)}
                x2={dataToSvg(maxData)}
                y2={viewBoxSize - dataToSvg(regression.slope * maxData + regression.intercept)}
                stroke="#9333ea"
                strokeWidth="4"
                strokeLinecap="round"
                className="transition-all duration-75"
              />
            )}

            {points.map((p, idx) => (
              <circle 
                key={idx}
                cx={dataToSvg(p.x)}
                cy={viewBoxSize - dataToSvg(p.y)}
                r="12"
                fill="#ffffff"
                stroke="rgba(147,51,234,0.6)"
                strokeWidth="12"
                className="cursor-grab active:cursor-grabbing hover:stroke-[rgba(147,51,234,0.9)] transition-colors duration-150"
                onPointerDown={(e) => handlePointerDown(idx, e)}
              />
            ))}
          </svg>
        </div>

        <div className="w-full md:w-64 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">Equation</h4>
            <div className="font-mono text-purple-700 font-semibold text-lg">
              y = {regression.slope.toFixed(2)}x + {regression.intercept.toFixed(2)}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">Coefficient of Determination</h4>
            <div className="font-mono text-indigo-700 text-3xl font-bold">
              R² = {regression.r2.toFixed(3)}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex-1">
            <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">Data Points</h4>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {points.map((p, idx) => (
                <div key={idx} className="flex justify-between text-sm font-mono text-slate-600 border-b border-slate-100 pb-1 font-medium">
                  <span>P{idx+1}</span>
                  <span>({p.x.toFixed(1)}, {p.y.toFixed(1)})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
