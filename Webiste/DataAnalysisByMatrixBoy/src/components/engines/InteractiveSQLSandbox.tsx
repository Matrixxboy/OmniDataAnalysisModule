import React, { useState, useEffect, useRef } from 'react';
import { Database, Play, CheckCircle2, AlertCircle, Table } from 'lucide-react';
import alasql from 'alasql';
import { SAMPLE_DATABASE_SQL } from './sqlData';

interface SQLExplanation {
  concept: string;
  description: string;
  syntax?: string;
}

interface InteractiveSQLSandboxProps {
  initialQuery?: string;
  lessonTitle: string;
  lessonDescription: string;
  explanations?: SQLExplanation[];
  expectedResultCheck?: (data: any[]) => boolean;
}

const TABLES = ['customers', 'products', 'orders', 'order_items', 'employees', 'departments'];

export const InteractiveSQLSandbox: React.FC<InteractiveSQLSandboxProps> = ({ 
  initialQuery = 'SELECT * FROM customers;',
  lessonTitle,
  lessonDescription,
  explanations = []
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Array<Record<string, any>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTableTab, setActiveTableTab] = useState<string>(TABLES[0]);
  const [tablePreviewData, setTablePreviewData] = useState<Array<Record<string, any>>>([]);
  
  const dbRef = useRef<any>(null);

  // Initialize Database
  useEffect(() => {
    try {
      // Create a fresh isolated database instance
      const db = new alasql.Database('sandbox');
      alasql.use('sandbox');
      
      // Execute the setup script
      const statements = SAMPLE_DATABASE_SQL.split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);
        
      statements.forEach(stmt => {
        db.exec(stmt);
      });
      
      dbRef.current = db;
      
      // Load initial preview data for the first tab
      loadTablePreview(TABLES[0], db);
      
    } catch (err: any) {
      console.error("Database initialization failed:", err);
      setError("Failed to initialize database: " + err.message);
    }
    
    return () => {
      // Cleanup database on unmount if possible
      try {
        alasql('DROP DATABASE IF EXISTS sandbox');
      } catch (e) {}
    };
  }, []);

  const loadTablePreview = (tableName: string, dbInstance = dbRef.current) => {
    if (!dbInstance) return;
    try {
      const data = dbInstance.exec(`SELECT * FROM ${tableName} LIMIT 5`);
      setTablePreviewData(data);
    } catch (err: any) {
      console.error("Failed to load table preview:", err);
    }
  };

  const handleTabChange = (tableName: string) => {
    setActiveTableTab(tableName);
    loadTablePreview(tableName);
  };

  const handleExecute = () => {
    if (!dbRef.current) return;
    
    setIsExecuting(true);
    setResults(null);
    setError(null);
    
    // Slight timeout for UX visual feedback
    setTimeout(() => {
      try {
        // Run the query inside the specific database instance
        const res = dbRef.current.exec(query);
        setResults(Array.isArray(res) ? res : [res]);
      } catch (err: any) {
        setError(err.message || "An error occurred executing the query.");
      } finally {
        setIsExecuting(false);
      }
    }, 400);
  };

  // Helper to get columns from result set
  const getColumns = (data: Array<Record<string, any>>) => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Lesson Header */}
      <div className="mb-2">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">{lessonTitle}</h2>
        <p className="text-lg text-slate-600 mb-8">{lessonDescription}</p>

        {/* Explanations Section */}
        {explanations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {explanations.map((exp, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-indigo-700 mb-2 flex items-center gap-2">
                  <Database size={18} />
                  {exp.concept}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  {exp.description}
                </p>
                {exp.syntax && (
                  <div className="bg-slate-900 text-emerald-400 font-mono text-xs p-3 rounded-lg overflow-x-auto">
                    {exp.syntax}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Section: Database Explorer */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
          <Database size={18} className="text-indigo-600" />
          <h3 className="font-bold text-slate-700">Database Explorer</h3>
        </div>
        
        {/* Table Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-white">
          {TABLES.map(table => (
            <button
              key={table}
              onClick={() => handleTabChange(table)}
              className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                activeTableTab === table 
                  ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Table size={14} />
              {table}
            </button>
          ))}
        </div>
        
        {/* Table Preview Area */}
        <div className="p-0 overflow-x-auto">
          {tablePreviewData.length > 0 ? (
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="text-xs uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  {getColumns(tablePreviewData).map((col) => (
                    <th key={col} className="px-4 py-2 font-semibold text-slate-600 border-r border-slate-200 last:border-0">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tablePreviewData.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-100 last:border-0">
                    {getColumns(tablePreviewData).map((col) => (
                      <td key={col} className="px-4 py-2 border-r border-slate-100 last:border-0 truncate max-w-[200px]">
                        {String(row[col])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-4 text-sm text-slate-500">No data in this table.</div>
          )}
          <div className="bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500 border-t border-slate-200">
            Showing top 5 rows preview.
          </div>
        </div>
      </div>

      {/* Bottom Section: Editor & Results Split */}
      <div className="flex flex-col lg:flex-row gap-6 h-[500px]">
        
        {/* Editor (Left) */}
        <div className="flex-1 flex flex-col bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-slate-800 relative">
          <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <span className="text-xs font-mono text-slate-400 font-semibold tracking-widest uppercase">Query Builder</span>
            <div className="w-16"></div>
          </div>
          
          <div className="flex-1 relative p-4">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="absolute inset-0 bg-transparent text-emerald-400 font-mono text-sm leading-relaxed p-6 resize-none focus:outline-none w-full h-full"
              spellCheck="false"
              placeholder="Type your SQL query here..."
            />
          </div>
          
          <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-end">
            <button 
              onClick={handleExecute}
              disabled={isExecuting || !query.trim()}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 shadow-sm shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExecuting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Play size={16} className="fill-white" />
              )}
              Run Query
            </button>
          </div>
        </div>

        {/* Results (Right) */}
        <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Table size={14} /> Output Console
            </span>
            {results && !error && (
              <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-100 px-2 py-1 rounded text-[10px] uppercase tracking-wider font-bold border border-emerald-200">
                <CheckCircle2 size={12} /> Success ({results.length} rows)
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-auto relative bg-slate-50/30">
            {/* Empty State */}
            {!results && !error && !isExecuting && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <Play size={32} className="mb-3 opacity-30 text-slate-400" />
                <p className="text-sm font-medium">Hit "Run Query" to see output</p>
              </div>
            )}

            {/* Loading State */}
            {isExecuting && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10">
                <div className="flex gap-2 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <p className="text-sm font-mono tracking-wider font-semibold text-indigo-600">Executing Query...</p>
              </div>
            )}

            {/* Error State */}
            {error && !isExecuting && (
              <div className="m-4 p-4 bg-rose-50 border border-rose-200 rounded-lg flex gap-3 text-rose-700">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm mb-1">SQL Syntax Error</h4>
                  <p className="text-sm font-mono whitespace-pre-wrap">{error}</p>
                </div>
              </div>
            )}

            {/* Results Table */}
            {results && !error && !isExecuting && results.length > 0 && (
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="text-xs uppercase bg-white border-b-2 border-slate-200 sticky top-0 shadow-sm z-10">
                  <tr>
                    {getColumns(results).map((col) => (
                      <th key={col} className="px-4 py-3 font-semibold text-slate-700 border-r border-slate-200 last:border-0">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, idx) => (
                    <tr 
                      key={idx} 
                      className="border-b border-slate-100 hover:bg-indigo-50 hover:border-l-2 hover:border-l-indigo-500 transition-all duration-150 last:border-0 bg-white"
                    >
                      {getColumns(results).map((col) => {
                        const val = row[col];
                        const isNumber = typeof val === 'number';
                        return (
                          <td key={col} className={`px-4 py-2 border-r border-slate-100 last:border-0 ${isNumber ? 'font-mono text-slate-600' : ''}`}>
                            {val !== null && val !== undefined ? String(val) : <span className="text-slate-300 italic">NULL</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Empty Results Tabular */}
            {results && !error && !isExecuting && results.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                <Database size={32} className="mb-3 opacity-30" />
                <p className="text-sm font-medium">Query executed successfully but returned 0 rows.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
