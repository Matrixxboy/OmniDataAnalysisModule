import React, { useState } from 'react';
import { WebsiteLayout } from '../components/layout/GlobalLayout';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BarChart3, Database, TrendingUp, Code2, CheckCircle2, ChevronDown } from 'lucide-react';

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-bold text-slate-900">{question}</span>
        <ChevronDown 
          size={20} 
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-4 pt-2 text-slate-600 leading-relaxed border-t border-slate-100"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Home: React.FC = () => {
  return (
    <WebsiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-10 pb-32 border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/50 via-white to-white -z-10" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 text-sm font-semibold border border-purple-100 w-fit shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Master Data Analysis in 2026
            </div> */}
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
              From Raw Data to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Actionable Insights.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              An interactive, premium learning platform designed to take you from spreadsheets to advanced analytics. Learn Excel, SQL, Statistics, and Python practically.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/courses" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 group">
                Start Learning Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-lg font-semibold transition-all">
                Meet the Instructor
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            <div className="w-full max-w-md aspect-square rounded-full bg-gradient-to-tr from-purple-100 to-indigo-50 absolute blur-3xl opacity-70"></div>
            <div className="light-glass-panel rounded-2xl p-8 w-full max-w-lg relative z-10 border border-white/50 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600"><BarChart3 size={24}/></div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">Sales Analytics</div>
                  <div className="text-sm text-slate-500">Live Dashboard</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-100 rounded-full w-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 w-[75%] rounded-full"></div>
                </div>
                <div className="h-4 bg-slate-100 rounded-full w-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-400 to-purple-500 w-[45%] rounded-full"></div>
                </div>
                <div className="h-4 bg-slate-100 rounded-full w-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 w-[85%] rounded-full"></div>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900">+24%</div>
                  <div className="text-xs text-slate-500 font-medium">Revenue Growth</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900">12.5k</div>
                  <div className="text-xs text-slate-500 font-medium">Active Users</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to succeed</h2>
            <p className="text-lg text-slate-600">Stop watching boring videos. Learn by interacting with our custom-built simulators and real-world datasets.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6"><Database size={24}/></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Interactive Engine</h3>
              <p className="text-slate-600 leading-relaxed">No more static reading. Every formula is broken down visually, step-by-step with highlighting and interactive UI.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-6"><TrendingUp size={24}/></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-world Application</h3>
              <p className="text-slate-600 leading-relaxed">Learn exactly how algorithms apply to business domains like HR, Finance, Inventory, and CRM databases.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6"><Code2 size={24}/></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Modern Stack</h3>
              <p className="text-slate-600 leading-relaxed">Transition smoothly from advanced Excel formulas directly into SQL, Python, Pandas, and NumPy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Everything you need to know about the platform.</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <FaqItem 
              question="Is this platform completely free?" 
              answer="Yes! All of our modules, from Excel basics to advanced Python analytics, are completely free to use. Our goal is to democratize data education without paywalls." 
            />
            <FaqItem 
              question="Do I need prior experience in Data Analysis?" 
              answer="Not at all. The curriculum starts from the absolute basics of Data Analysis and Excel, and progressively introduces more complex topics like SQL and Python as you advance." 
            />
            <FaqItem 
              question="How does the interactive formula engine work?" 
              answer="Unlike standard tutorials, we don't just show you syntax. Our platform provides visual step-by-step tracing of how formulas process data row by row, making abstract concepts incredibly intuitive." 
            />
            <FaqItem 
              question="What exactly will I learn?" 
              answer="You will learn the entire modern data stack: Advanced Excel functions (XLOOKUP, Dynamic Arrays), Data Cleaning, SQL Querying, Statistical Analysis, Python (NumPy, Pandas), and Data Visualization." 
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Ready to analyze your first dataset?</h2>
          <Link to="/courses" className="inline-flex bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-xl shadow-slate-900/20 items-center gap-2">
            View the Curriculum <ArrowRight size={20} />
          </Link>
          <div className="mt-8 flex justify-center gap-6 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> No sign-up required</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> 100% Free</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Interactive</span>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
};
