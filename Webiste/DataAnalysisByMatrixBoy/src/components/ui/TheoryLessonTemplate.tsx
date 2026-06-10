import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Target, CheckCircle2 } from 'lucide-react';
import type { TheoryLessonData } from '../../types/theory';

interface Props {
  data: TheoryLessonData;
}

export const TheoryLessonTemplate: React.FC<Props> = ({ data }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-12 max-w-none pb-20"
    >
      {/* 1. Header Section */}
      <section className="text-center pb-12 border-b border-slate-200">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold mb-6 shadow-xl shadow-indigo-500/20">
          <BookOpen size={40} />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">{data.title}</h1>
        <h2 className="text-2xl text-purple-600 font-semibold mb-6">{data.subtitle}</h2>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          {data.introduction}
        </p>
      </section>

      {/* 2. Key Definitions Grid */}
      {data.definitions && data.definitions.length > 0 && (
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.definitions.map((def, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card !bg-white/80 p-8 border-indigo-100 hover:border-indigo-300 transition-all hover:-translate-y-1 shadow-lg"
            >
              <div className="text-indigo-600 mb-4 bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center border border-indigo-100">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{def.term}</h3>
              <p className="text-slate-600 leading-relaxed">{def.definition}</p>
            </motion.div>
          ))}
        </section>
      )}

      {/* 3. Main Content Sections */}
      <section className="flex flex-col gap-12">
        {data.mainSections.map((section, idx) => (
          <div key={idx} className="glass-card !bg-white/60 p-8 md:p-12 border-slate-200">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg shadow-md">{idx + 1}</span>
              {section.heading}
            </h3>
            
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="flex-1 space-y-6">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-lg text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {section.imagePlaceholder && (
                <div className="lg:w-1/3 w-full aspect-square bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border-2 border-dashed border-indigo-200 flex flex-col items-center justify-center text-indigo-400 p-8 text-center">
                  <Target size={48} className="mb-4 opacity-50" />
                  <span className="font-semibold">{section.imagePlaceholder}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* 4. Key Takeaways */}
      {data.keyTakeaways && data.keyTakeaways.length > 0 && (
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3 relative z-10">
            <CheckCircle2 size={32} className="text-emerald-400" />
            Key Takeaways
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            {data.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <h4 className="text-emerald-300 font-bold text-lg mb-2">{takeaway.point}</h4>
                <p className="text-slate-300 leading-relaxed">{takeaway.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
};
