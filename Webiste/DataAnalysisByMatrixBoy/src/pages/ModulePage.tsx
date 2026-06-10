import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WebsiteLayout } from '../components/layout/GlobalLayout';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { courseModules } from '../store/courseData';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';

// Module 1 Lessons
import { XLookupLesson } from '../components/lessons/Module1/XLookupLesson';
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

// Intro Lessons
import { WhatIsDataAnalysis } from '../components/lessons/Intro/WhatIsDataAnalysis';
import { TypesOfData } from '../components/lessons/Intro/TypesOfData';
import { DataAnalysisLifecycle } from '../components/lessons/Intro/DataAnalysisLifecycle';
import { RealWorldApplications } from '../components/lessons/Intro/RealWorldApplications';

// Interactive Components
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

export const ModulePage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // Find the requested module
  const activeModule = courseModules.find((m) => m.id === moduleId);

  useEffect(() => {
    // If invalid module, redirect back to courses
    if (!activeModule) {
      navigate('/courses');
      return;
    }
    
    // Set first lesson active by default if not set
    if (!activeLessonId && activeModule.lessons.length > 0) {
      setActiveLessonId(activeModule.lessons[0].id);
    }
  }, [activeModule, activeLessonId, navigate]);

  if (!activeModule) return null;

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

  const interactiveLessonIds = ['z-score', 'sql-simulator', 'linear-regression'];
  const regularLessonIds = [
    'what-is-da', 'types-of-data', 'da-lifecycle', 'da-applications', 
    'xlookup', 'index-match', 'nested-ifs', 'sumifs-iferror', 
    'sum', 'count', 'max-min', 'round-abs', 'if', 'and-or-not', 
    'vlookup', 'hlookup', 'sumif', 'countifs', 'averageifs', 
    'text-extraction', 'text-cleaning', 'filter', 'sort-unique', 
    'sequence', 'date-basics', 'date-advanced', 'offset', 'indirect', 'choose'
  ];

  return (
    <WebsiteLayout>
      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
        {activeLessonId && (
          <Sidebar activeLessonId={activeLessonId} onSelectLesson={setActiveLessonId} />
        )}
        
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50 relative">
          <TopBar activeLessonId={activeLessonId} onGoToDashboard={() => navigate('/courses')} />
          
          <main className="flex-1 overflow-y-auto scroll-smooth">
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
              
              {interactiveLessonIds.includes(activeLessonId || '') && renderInteractiveLesson()}
              
              {!regularLessonIds.includes(activeLessonId || '') && !interactiveLessonIds.includes(activeLessonId || '') && activeLessonId && (
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
                    onClick={() => navigate('/courses')}
                    className="mt-8 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors shadow-lg relative z-10"
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </WebsiteLayout>
  );
};
