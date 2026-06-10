import React, { useState } from 'react';
import type { SQLSimulatorProps } from '../../types/schema';
import { Database, Play, CheckCircle2 } from 'lucide-react';

export const SQLSimulator: React.FC<SQLSimulatorProps> = ({ initialQuery, schema, initialData }) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Array<Record<string, any>> | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = () => {
    setIsExecuting(true);
    setResults(null);
    
    setTimeout(() => {
      const mockFiltered = initialData.slice(0, Math.max(1, Math.floor(initialData.length * 0.8)));
      setResults(mockFiltered);
      setIsExecuting(false);
    }, 600);
  };

  return (
    <div className="rounded-xl flex flex-col w-full max-w-5xl mx-auto overflow-hidden font-sans border border-slate-200 bg-white shadow-sm">
      {/* Window Header */}
      <div className="h-10 bg-slate-50 flex items-center px-4 border-b border-slate-200 justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
        </div>
        <div className="text-xs text-slate-600 font-mono tracking-wider flex items-center gap-2 font-medium">
          <Database size={14} className="text-indigo-600" />
          {schema.tableName}.db
        </div>
        <div className="w-16"></div>
      </div>

      <div className="flex flex-col md:flex-row h-full min-h-[400px]">
        {/* Left Side: Schema & Editor */}
        <div className="flex-1 flex flex-col border-r border-slate-200 bg-white">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50">
            <h4 className="text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Schema Reference</h4>
            <div className="flex flex-wrap gap-2">
              {schema.columns.map(col => (
                <div key={col.name} className="flex text-xs font-mono bg-white rounded px-2 py-1 border border-slate-200 shadow-sm">
                  <span className="text-indigo-600 font-semibold">{col.name}</span>
                  <span className="text-slate-500 ml-2">{col.type}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 p-4 relative flex flex-col">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-slate-800 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-0 w-full"
              spellCheck="false"
            />
            
            <div className="flex justify-end mt-4">
              <button 
                onClick={handleExecute}
                disabled={isExecuting}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExecuting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Play size={16} />
                )}
                Run Query
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="flex-1 bg-slate-50/50 flex flex-col">
          <div className="h-10 bg-slate-100 flex items-center px-4 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Result Pane</span>
            {results && (
              <div className="ml-auto flex items-center gap-1.5 text-emerald-700 bg-emerald-100 px-2 py-1 rounded text-[10px] uppercase tracking-wider font-semibold border border-emerald-200">
                <CheckCircle2 size={12} /> Executed Successfully
              </div>
            )}
          </div>
          
          <div className="flex-1 p-4 overflow-auto">
            {!results && !isExecuting && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <Database size={32} className="mb-3 opacity-50 text-slate-300" />
                <p className="text-sm">Run a query to see results.</p>
              </div>
            )}
            
            {isExecuting && (
              <div className="h-full flex flex-col items-center justify-center text-amber-500 gap-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <p className="text-sm font-mono tracking-wider font-medium">Processing...</p>
              </div>
            )}

            {results && !isExecuting && (
              <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm text-slate-700">
                  <thead className="text-xs uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                      {schema.columns.map((col) => (
                        <th key={col.name} className="px-4 py-3 font-semibold text-slate-600">
                          {col.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, idx) => (
                      <tr 
                        key={idx} 
                        className="border-b border-slate-100 hover:bg-purple-50 hover:border-l-2 hover:border-l-purple-500 transition-all duration-150 last:border-0"
                      >
                        {schema.columns.map((col) => (
                          <td key={col.name} className={`px-4 py-3 ${col.type === 'number' ? 'font-mono text-right text-slate-600' : ''}`}>
                            {row[col.name]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
