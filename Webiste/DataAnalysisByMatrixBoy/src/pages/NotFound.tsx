import React from 'react';
import { Link } from 'react-router-dom';
import { WebsiteLayout } from '../components/layout/GlobalLayout';
import { Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const NotFound: React.FC = () => {
  return (
    <WebsiteLayout>
      <div className="flex-1 flex items-center justify-center py-24 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center flex flex-col items-center gap-6"
        >
          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
            <Search size={40} />
          </div>
          <h1 className="text-6xl font-bold text-slate-900 tracking-tight">404</h1>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-800">Page not found</h2>
            <p className="text-slate-500">
              Oops! The page you're looking for doesn't exist, has been moved, or is currently undergoing maintenance.
            </p>
          </div>
          <Link 
            to="/" 
            className="mt-4 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm shadow-purple-600/20"
          >
            <ArrowLeft size={18} />
            Return Home
          </Link>
        </motion.div>
      </div>
    </WebsiteLayout>
  );
};
