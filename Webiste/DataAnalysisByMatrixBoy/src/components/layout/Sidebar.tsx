import React from 'react';
import { courseModules } from '../../store/courseData';
import { BookOpen, CheckCircle2, Circle, GraduationCap } from 'lucide-react';

interface SidebarProps {
  activeLessonId: string | null;
  onSelectLesson: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeLessonId, onSelectLesson }) => {
  // Find the active module based on the activeLessonId
  const activeModule = courseModules.find(m => m.lessons.some(l => l.id === activeLessonId));

  if (!activeModule) return null;

  // Calculate completion percentage for the current module (mocked)
  const completedLessons = activeModule.lessons.filter(l => l.isCompleted).length;
  const totalLessons = activeModule.lessons.length;
  const completionPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <aside className="w-80 h-full flex-shrink-0 border-r border-slate-200 bg-white sticky top-0 overflow-y-auto hidden md:flex flex-col shadow-sm">
      <div className="p-6 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <h2 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <GraduationCap size={20} className="text-purple-600" />
          {activeModule.title}
        </h2>
        <div className="mt-4 bg-slate-50 rounded-full h-2 w-full overflow-hidden border border-slate-100">
          <div 
            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-500" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-500 font-medium mt-2">{completionPercentage}% Completed</p>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold tracking-widest uppercase text-slate-500 px-3 flex items-center gap-2 mb-1">
            <BookOpen size={14} className="text-slate-400" />
            Module Lessons
          </h3>
          <div className="flex flex-col gap-0.5">
            {activeModule.lessons.map((lesson) => {
              const isActive = activeLessonId === lesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson.id)}
                  className={`text-left px-3 py-2.5 rounded-xl transition-all duration-200 flex items-start gap-3 group relative ${
                    isActive 
                      ? 'bg-purple-50 text-purple-900 shadow-sm border border-purple-100' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-600 rounded-r-full shadow-[0_0_8px_rgba(147,51,234,0.5)]" />
                  )}
                  <div className="mt-0.5 flex-shrink-0">
                    {lesson.isCompleted ? (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : isActive ? (
                      <Circle size={16} className="text-purple-600 fill-purple-200" />
                    ) : (
                      <Circle size={16} className="text-slate-300 group-hover:text-slate-400" />
                    )}
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>{lesson.title}</span>
                    {lesson.duration && (
                      <span className={`text-xs ${isActive ? 'text-purple-600/80 font-medium' : 'text-slate-400'}`}>
                        {lesson.duration}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};
