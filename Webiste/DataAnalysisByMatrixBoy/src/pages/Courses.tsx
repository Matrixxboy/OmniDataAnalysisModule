import React, { useState } from 'react';
import { WebsiteLayout } from '../components/layout/GlobalLayout';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { courseModules } from '../store/courseData';
import { motion } from 'framer-motion';
import { 
  PlayCircle, 
  BookOpen, 
  Database, 
  LineChart, 
  Terminal, 
  PieChart, 
  TrendingUp, 
  FileSpreadsheet,
  Wrench,
  Award
} from 'lucide-react';
import { XLookupLesson } from '../components/lessons/Module1/XLookupLesson';
import { WhatIsDataAnalysis } from '../components/lessons/Intro/WhatIsDataAnalysis';
import { TypesOfData } from '../components/lessons/Intro/TypesOfData';
import { DataAnalysisLifecycle } from '../components/lessons/Intro/DataAnalysisLifecycle';
import { RealWorldApplications } from '../components/lessons/Intro/RealWorldApplications';

import { SumLesson } from '../components/lessons/Module1/SumLesson';
import { CountLesson } from '../components/lessons/Module1/CountLesson';
import { MaxMinLesson } from '../components/lessons/Module1/MaxMinLesson';
import { RoundAbsLesson } from '../components/lessons/Module1/RoundAbsLesson';
import { IfLesson } from '../components/lessons/Module1/IfLesson';
import { AndOrNotLesson } from '../components/lessons/Module1/AndOrNotLesson';
import { VlookupLesson } from '../components/lessons/Module1/VlookupLesson';
import { HlookupLesson } from '../components/lessons/Module1/HlookupLesson';
import { SumifLesson } from '../components/lessons/Module1/SumifLesson';
import { CountifsLesson } from '../components/lessons/Module1/CountifsLesson';
import { AverageifsLesson } from '../components/lessons/Module1/AverageifsLesson';
import { TextExtractionLesson } from '../components/lessons/Module1/TextExtractionLesson';
import { TextCleaningLesson } from '../components/lessons/Module1/TextCleaningLesson';
import { FilterLesson } from '../components/lessons/Module1/FilterLesson';
import { SortUniqueLesson } from '../components/lessons/Module1/SortUniqueLesson';
import { SequenceLesson } from '../components/lessons/Module1/SequenceLesson';
import { DateBasicsLesson } from '../components/lessons/Module1/DateBasicsLesson';
import { DateAdvancedLesson } from '../components/lessons/Module1/DateAdvancedLesson';
import { OffsetLesson } from '../components/lessons/Module1/OffsetLesson';
import { IndirectLesson } from '../components/lessons/Module1/IndirectLesson';
import { ChooseLesson } from '../components/lessons/Module1/ChooseLesson';
import { IndexMatchLesson } from '../components/lessons/Module1/IndexMatchLesson';
import { NestedIfsLesson } from '../components/lessons/Module1/NestedIfsLesson';
import { SumifsLesson } from '../components/lessons/Module1/SumifsLesson';
import { FormulaExplainer } from '../components/ui/LessonComponents';
import { SQLSimulator } from '../components/engines/SQLSimulator';
import { ScatterPlotVisualizer } from '../components/engines/ScatterPlotVisualizer';

const LessonHeader = ({ module, title, description }: { module: string, title: string, description: string }) => (
  <div className="mb-8 border-b border-slate-200 pb-8">
    <div className="text-purple-600 font-semibold text-sm mb-2 uppercase tracking-wider">{module}</div>
    <h1 className="text-4xl font-bold text-slate-900 mb-4">{title}</h1>
    <p className="text-xl text-slate-600">{description}</p>
  </div>
);

// Map module IDs to specific icons and gradient themes
const getModuleStyle = (id: string) => {
  switch (id) {
    case 'mod1': return { icon: BookOpen, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-600' };
    case 'mod2': return { icon: FileSpreadsheet, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', text: 'text-emerald-600' };
    case 'mod3': return { icon: Database, color: 'from-purple-500 to-indigo-500', bg: 'bg-purple-50', text: 'text-purple-600' };
    case 'mod4': return { icon: Wrench, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', text: 'text-amber-600' };
    case 'mod5': return { icon: LineChart, color: 'from-pink-500 to-rose-500', bg: 'bg-pink-50', text: 'text-pink-600' };
    case 'mod6': return { icon: Terminal, color: 'from-indigo-500 to-blue-600', bg: 'bg-indigo-50', text: 'text-indigo-600' };
    case 'mod7': return { icon: PieChart, color: 'from-fuchsia-500 to-purple-600', bg: 'bg-fuchsia-50', text: 'text-fuchsia-600' };
    case 'mod8': return { icon: TrendingUp, color: 'from-teal-500 to-emerald-600', bg: 'bg-teal-50', text: 'text-teal-600' };
    case 'mod9': return { icon: Award, color: 'from-yellow-400 to-amber-500', bg: 'bg-yellow-50', text: 'text-yellow-600' };
    default: return { icon: BookOpen, color: 'from-slate-500 to-slate-600', bg: 'bg-slate-50', text: 'text-slate-600' };
  }
};

export const Courses: React.FC = () => {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case 'mod1': return { icon: BookOpen, style: 'bg-indigo-100 text-indigo-600 border-indigo-200', gradient: 'from-indigo-500/20 to-blue-500/5' };
      case 'mod2': return { icon: FileSpreadsheet, style: 'bg-emerald-100 text-emerald-600 border-emerald-200', gradient: 'from-emerald-500/20 to-teal-500/5' };
      case 'mod3': return { icon: Database, style: 'bg-blue-100 text-blue-600 border-blue-200', gradient: 'from-blue-500/20 to-cyan-500/5' };
      case 'mod4': return { icon: Wrench, style: 'bg-amber-100 text-amber-600 border-amber-200', gradient: 'from-amber-500/20 to-orange-500/5' };
      case 'mod5': return { icon: LineChart, style: 'bg-purple-100 text-purple-600 border-purple-200', gradient: 'from-purple-500/20 to-fuchsia-500/5' };
      case 'mod6': return { icon: Terminal, style: 'bg-sky-100 text-sky-600 border-sky-200', gradient: 'from-sky-500/20 to-blue-500/5' };
      case 'mod7': return { icon: PieChart, style: 'bg-rose-100 text-rose-600 border-rose-200', gradient: 'from-rose-500/20 to-pink-500/5' };
      case 'mod8': return { icon: TrendingUp, style: 'bg-violet-100 text-violet-600 border-violet-200', gradient: 'from-violet-500/20 to-purple-500/5' };
      case 'mod9': return { icon: Award, style: 'bg-yellow-100 text-yellow-600 border-yellow-200', gradient: 'from-yellow-500/20 to-amber-500/5' };
      default: return { icon: BookOpen, style: 'bg-slate-100 text-slate-600 border-slate-200', gradient: 'from-slate-500/20 to-gray-500/5' };
    }
  };

  const renderDashboard = () => (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Curriculum</h1>
        <p className="text-xl text-slate-600 max-w-3xl">Master data analysis from absolute beginner to advanced python scripting. Select a module to begin.</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courseModules.map((module, idx) => {
          const { icon: Icon, style, gradient } = getModuleIcon(module.id);
          const totalLessons = module.lessons.length;
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={module.id}
              onClick={() => setActiveLessonId(module.lessons[0].id)}
              className="group bg-white rounded-3xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col overflow-hidden"
            >
              <div
                className={`relative h-36 bg-gradient-to-br ${gradient} border-b border-slate-100 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/[0.03]" />
                <Icon
                  size={90}
                  className="absolute -bottom-4 -right-4 text-white/20 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-5 left-5 w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center">
                  <Icon size={24} className="text-slate-800" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2 transition-colors group-hover:text-slate-700">
                  {module.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  {module.description}
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <div
                      className={`w-8 h-8 rounded-full ${style} flex items-center justify-center`}
                    >
                      <PlayCircle size={15} />
                    </div>
                    <span>{totalLessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    Start
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderInteractiveLesson = () => {
    switch (activeLessonId) {
      case 'z-score':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8 max-w-none">
            <LessonHeader 
              module="Module 5: Statistics for Data Analysis" 
              title="Understanding Z-Scores" 
              description="A Z-score describes a value's relationship to the mean of a group of values." 
            />
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <FormulaExplainer 
                formula={String.raw`Z = \frac{x - \mu}{\sigma}`} 
                variables={[
                  { id: "x", label: "Raw Score", value: 85, min: 0, max: 100, step: 1, color: "text-purple-600" },
                  { id: String.raw`\mu`, label: "Population Mean", value: 70, min: 0, max: 100, step: 1, color: "text-indigo-600" },
                  { id: String.raw`\sigma`, label: "Standard Deviation", value: 10, min: 1, max: 30, step: 1, color: "text-emerald-600" }
                ]} 
                calculateResult={(vars) => (vars["x"] - vars[String.raw`\mu`]) / vars[String.raw`\sigma`]} 
              />
            </div>
          </motion.div>
        );
      case 'sql-simulator':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8 max-w-none">
            <LessonHeader 
              module="Module 3: SQL Fundamentals" 
              title="Interactive Query Simulator" 
              description="Write and execute SQL queries directly in the browser to master database concepts." 
            />
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <SQLSimulator 
                initialQuery={"SELECT name, salary \nFROM employees \nWHERE department = 'Engineering' \nORDER BY salary DESC;"}
                schema={{
                  tableName: 'employees',
                  columns: [
                    { name: 'id', type: 'number' },
                    { name: 'name', type: 'string' },
                    { name: 'department', type: 'string' },
                    { name: 'salary', type: 'number' }
                  ]
                }}
                initialData={[
                  { id: 1, name: 'Alice Smith', department: 'Engineering', salary: 120000 },
                  { id: 2, name: 'Bob Jones', department: 'Sales', salary: 85000 },
                  { id: 3, name: 'Charlie Davis', department: 'Engineering', salary: 135000 },
                  { id: 4, name: 'Diana Evans', department: 'Marketing', salary: 90000 }
                ]}
              />
            </div>
          </motion.div>
        );
      case 'linear-regression':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8 max-w-none">
            <LessonHeader 
              module="Module 5: Statistics for Data Analysis" 
              title="Linear Regression Simulator" 
              description="Drag the points to see how outliers affect the regression line." 
            />
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <ScatterPlotVisualizer initialPoints={[
                { x: 10, y: 20 }, { x: 20, y: 35 }, { x: 30, y: 30 },
                { x: 40, y: 50 }, { x: 50, y: 45 }, { x: 60, y: 70 },
                { x: 70, y: 65 }, { x: 80, y: 85 }, { x: 90, y: 90 }
              ]} />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <WebsiteLayout>
      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
        {activeLessonId && (
          <Sidebar activeLessonId={activeLessonId} onSelectLesson={setActiveLessonId} />
        )}
        
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50 relative">
          <TopBar activeLessonId={activeLessonId} onGoToDashboard={() => setActiveLessonId(null)} />
          
          <main className="flex-1 overflow-y-auto scroll-smooth">
            {!activeLessonId ? (
              renderDashboard()
            ) : (
              <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 pb-32">
                {activeLessonId === 'what-is-da' && <WhatIsDataAnalysis />}
                {activeLessonId === 'types-of-data' && <TypesOfData />}
                {activeLessonId === 'da-lifecycle' && <DataAnalysisLifecycle />}
                {activeLessonId === 'da-applications' && <RealWorldApplications />}

                {activeLessonId === 'xlookup' && <XLookupLesson />}
                {activeLessonId === 'index-match' && <IndexMatchLesson />}
                {activeLessonId === 'nested-ifs' && <NestedIfsLesson />}
                {activeLessonId === 'sumifs-iferror' && <SumifsLesson />}

                {activeLessonId === 'sum' && <SumLesson />}
                {activeLessonId === 'count' && <CountLesson />}
                {activeLessonId === 'max-min' && <MaxMinLesson />}
                {activeLessonId === 'round-abs' && <RoundAbsLesson />}
                {activeLessonId === 'if' && <IfLesson />}
                {activeLessonId === 'and-or-not' && <AndOrNotLesson />}
                {activeLessonId === 'vlookup' && <VlookupLesson />}
                {activeLessonId === 'hlookup' && <HlookupLesson />}
                {activeLessonId === 'sumif' && <SumifLesson />}
                {activeLessonId === 'countifs' && <CountifsLesson />}
                {activeLessonId === 'averageifs' && <AverageifsLesson />}
                {activeLessonId === 'text-extraction' && <TextExtractionLesson />}
                {activeLessonId === 'text-cleaning' && <TextCleaningLesson />}
                {activeLessonId === 'filter' && <FilterLesson />}
                {activeLessonId === 'sort-unique' && <SortUniqueLesson />}
                {activeLessonId === 'sequence' && <SequenceLesson />}
                {activeLessonId === 'date-basics' && <DateBasicsLesson />}
                {activeLessonId === 'date-advanced' && <DateAdvancedLesson />}
                {activeLessonId === 'offset' && <OffsetLesson />}
                {activeLessonId === 'indirect' && <IndirectLesson />}
                {activeLessonId === 'choose' && <ChooseLesson />}
                
                {['z-score', 'sql-simulator', 'linear-regression'].includes(activeLessonId) && renderInteractiveLesson()}
                
                {!['what-is-da', 'types-of-data', 'da-lifecycle', 'da-applications', 'xlookup', 'index-match', 'nested-ifs', 'sumifs-iferror', 'sum', 'count', 'max-min', 'round-abs', 'if', 'and-or-not', 'vlookup', 'hlookup', 'sumif', 'countifs', 'averageifs', 'text-extraction', 'text-cleaning', 'filter', 'sort-unique', 'sequence', 'date-basics', 'date-advanced', 'offset', 'indirect', 'choose', 'z-score', 'sql-simulator', 'linear-regression'].includes(activeLessonId) && (
                  <div className="flex flex-col items-center justify-center h-[70vh] text-center border-4 border-dashed border-slate-200 rounded-[3rem] p-12 bg-white shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="w-24 h-24 mb-8 rounded-3xl bg-slate-100 flex items-center justify-center shadow-inner relative z-10">
                      <Wrench size={40} className="text-slate-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 relative z-10">Lesson Under Construction</h2>
                    <p className="text-xl text-slate-500 max-w-lg relative z-10">
                      We are currently building this highly interactive lesson module. Check back soon!
                    </p>
                    <button 
                      onClick={() => setActiveLessonId(null)}
                      className="mt-8 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors shadow-lg relative z-10"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </WebsiteLayout>
  );
};
