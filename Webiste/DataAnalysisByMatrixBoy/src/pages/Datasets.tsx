import React from 'react';
import { WebsiteLayout } from '../components/layout/GlobalLayout';
import { Link } from 'react-router-dom';
import { Database, ArrowRight, FileSpreadsheet, Building2, ShoppingCart, HeartPulse } from 'lucide-react';
import { datasets } from '../data/datasets';

export const Datasets: React.FC = () => {
  const getIcon = (id: string) => {
    switch(id) {
      case 'ecommerce': return <ShoppingCart size={24} />;
      case 'hr-analytics': return <Building2 size={24} />;
      case 'healthcare': return <HeartPulse size={24} />;
      default: return <Database size={24} />;
    }
  };

  return (
    <WebsiteLayout>
      <div className="bg-slate-900 py-16 px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4 text-purple-400">
            <Database size={24} />
            <span className="font-semibold tracking-wider uppercase text-sm">Real-Life Data</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Excel Statistics Datasets</h1>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            Stop practicing on generic, perfectly clean data. Download our massive, real-world datasets from various industries to truly master Advanced Formulas, Power Query, and Statistical Analysis.
          </p>
          
          <div className="mt-8 flex gap-4">
            <a href="/datasets/Master_Projects_Data_Dictionary.xlsx" download className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-colors border border-slate-700">
              <FileSpreadsheet size={20} />
              Download Master Data Dictionary
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {datasets.map((dataset) => (
            <div key={dataset.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="p-8 flex-1">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                  {getIcon(dataset.id)}
                </div>
                <div className="text-xs font-bold tracking-wider text-purple-600 uppercase mb-2">
                  {dataset.industry}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{dataset.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {dataset.description}
                </p>
              </div>
              
              <div className="p-8 pt-0 mt-auto border-t border-slate-100 bg-slate-50">
                <Link 
                  to={`/datasets/${dataset.slug}`}
                  className="flex items-center justify-between mt-6 text-purple-600 font-medium group"
                >
                  View Details & Download
                  <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WebsiteLayout>
  );
};
