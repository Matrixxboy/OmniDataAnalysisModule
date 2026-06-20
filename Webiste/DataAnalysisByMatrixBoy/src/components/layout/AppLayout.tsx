import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface AppLayoutProps {
  children: React.ReactNode;
  activeLessonId: string;
  onSelectLesson: (id: string) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, activeLessonId, onSelectLesson }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 selection:bg-purple-500/30 selection:text-purple-200 font-sans">
      <Sidebar activeLessonId={activeLessonId} onSelectLesson={onSelectLesson} />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar activeLessonId={activeLessonId} onGoToDashboard={() => onSelectLesson('')} />
        
        <main className="flex-1 overflow-y-auto scroll-smooth relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10" />
          <div className="max-w-4xl mx-auto px-8 py-12 pb-32">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
