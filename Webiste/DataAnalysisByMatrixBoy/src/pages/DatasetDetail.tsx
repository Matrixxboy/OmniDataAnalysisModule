import React from 'react';
import { WebsiteLayout } from '../components/layout/GlobalLayout';
import { useParams, Link } from 'react-router-dom';
import { datasets } from '../data/datasets';
import { ArrowLeft, Download, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { NotFound } from './NotFound';

export const DatasetDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dataset = datasets.find(d => d.slug === slug);

  if (!dataset) {
    return <NotFound />;
  }

  return (
    <WebsiteLayout>
      {/* Header section */}
      <div className="bg-slate-900 py-16 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <Link to="/datasets" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to Datasets
          </Link>
          
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <span className="font-semibold tracking-wider uppercase text-sm border border-slate-700 bg-slate-800 px-3 py-1 rounded-full">
              {dataset.industry}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {dataset.title}
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed mb-10">
            {dataset.description}
          </p>

          <a 
            href={dataset.downloadUrl} 
            download 
            className="inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:-translate-y-1"
          >
            <Download size={24} />
            Download Project Files (.zip)
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <FileSpreadsheet className="text-purple-600" />
            Business Scenario
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            {dataset.scenario}
          </p>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-8">Analytical Tasks</h2>
        <div className="space-y-8">
          {dataset.analyticalTasks.map((task, index) => (
            <div key={index} className="bg-slate-50 rounded-xl border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">
                {task.category}
              </h3>
              <ul className="space-y-4">
                {task.questions.map((q, qIndex) => (
                  <li key={qIndex} className="flex items-start gap-4 text-slate-700 text-lg">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={24} />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </WebsiteLayout>
  );
};
