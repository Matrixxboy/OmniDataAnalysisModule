import React, { useState, useEffect } from 'react';
import { Timer, LayoutDashboard, Play, Pause, RotateCcw } from 'lucide-react';
import { courseModules } from '../../store/courseData';

interface TopBarProps {
  activeLessonId: string | null;
  onGoToDashboard: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ activeLessonId, onGoToDashboard }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  let activeModuleName = "";
  let activeLessonTitle = "";
  
  if (activeLessonId) {
    courseModules.forEach(m => {
      const lesson = m.lessons.find(l => l.id === activeLessonId);
      if (lesson) {
        activeModuleName = m.title;
        activeLessonTitle = lesson.title;
      }
    });
  }

  return (
    <header className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-2 text-sm">
        {activeLessonId ? (
          <>
            <span className="text-slate-500 font-medium cursor-pointer hover:text-purple-600 transition-colors" onClick={onGoToDashboard}>
              {activeModuleName}
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">{activeLessonTitle}</span>
          </>
        ) : (
          <span className="text-slate-800 font-semibold">Course Dashboard</span>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Advanced Timer */}
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-700 px-3 py-1 font-medium min-w-[80px] justify-center">
            <Timer size={14} className={isRunning ? "text-emerald-500 animate-pulse" : "text-slate-400"} />
            {formatTime(seconds)}
          </div>
          <div className="h-4 w-px bg-slate-200 mx-1"></div>
          <button onClick={toggleTimer} className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors" title={isRunning ? "Pause Session" : "Resume Session"}>
            {isRunning ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button onClick={resetTimer} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Reset Session">
            <RotateCcw size={14} />
          </button>
        </div>

        <button 
          onClick={onGoToDashboard}
          className={`transition-colors p-2 rounded-lg border ${
            !activeLessonId 
              ? 'text-purple-600 bg-purple-50 border-purple-100' 
              : 'text-slate-400 hover:text-purple-600 hover:bg-purple-50 border-transparent hover:border-purple-100'
          }`}
          title="Course Dashboard"
        >
          <LayoutDashboard size={18} />
        </button>
      </div>
    </header>
  );
};
