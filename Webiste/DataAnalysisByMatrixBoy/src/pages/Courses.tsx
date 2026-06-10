import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WebsiteLayout } from '../components/layout/GlobalLayout';
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

export const Courses: React.FC = () => {
  const navigate = useNavigate();

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

  return (
    <WebsiteLayout>
      <div className="flex flex-1 min-h-[calc(100vh-64px)] bg-slate-50">
        <main className="flex-1 overflow-y-auto scroll-smooth">
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
                    onClick={() => navigate(`/courses/${module.id}`)}
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
        </main>
      </div>
    </WebsiteLayout>
  );
};
