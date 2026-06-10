import React from 'react';
import { WebsiteLayout } from '../components/layout/GlobalLayout';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const Privacy: React.FC = () => {
  return (
    <WebsiteLayout>
      <div className="max-w-3xl mx-auto px-6 py-16 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-8"
        >
          <div className="flex items-center gap-4 border-b border-slate-200 pb-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
              <p className="text-slate-500">Last updated: June 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600">
            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-3">1. Information We Collect</h2>
            <p className="mb-4">
              We only collect information about you if we have a reason to do so—for example, to provide our Services, to communicate with you, or to make our Services better.
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li><strong>Basic Account Information:</strong> To track your learning progress, we store your learning session times locally in your browser.</li>
              <li><strong>Usage Information:</strong> We track interactive simulator usage to improve our platform's educational efficiency.</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-3">2. How We Use Information</h2>
            <p className="mb-4">
              We use the information we collect to operate our platform, maintain the quality of the service, and provide general statistics regarding use of the MatrixBoy Analytics website.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-3">3. Cookies</h2>
            <p className="mb-4">
              We use "cookies" to store your preferences, record session information, and customize web page content based on visitors' browser type or other information that the visitor sends. The primary cookies we use are LocalStorage keys to keep track of your active session timer and completed courses.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-3">4. Third-Party Services</h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-3">5. User Rights</h2>
            <p className="mb-4">
              You have the right to request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes. You can clear your course progress and session timers at any time by clearing your browser's local storage.
            </p>
          </div>
        </motion.div>
      </div>
    </WebsiteLayout>
  );
};
