import React from 'react';
import { WebsiteLayout } from '../components/layout/GlobalLayout';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export const Terms: React.FC = () => {
  return (
    <WebsiteLayout>
      <div className="max-w-3xl mx-auto px-6 py-16 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-8"
        >
          <div className="flex items-center gap-4 border-b border-slate-200 pb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Terms & Conditions</h1>
              <p className="text-slate-500">Last updated: June 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600">
            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-3">1. Introduction</h2>
            <p className="mb-4">
              Welcome to MatrixBoy Analytics. By accessing this website, we assume you accept these terms and conditions. Do not continue to use MatrixBoy Analytics if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-3">2. Intellectual Property Rights</h2>
            <p className="mb-4">
              Unless otherwise stated, MatrixBoy Analytics and/or its licensors own the intellectual property rights for all material on MatrixBoy Analytics. All intellectual property rights are reserved. You may access this from MatrixBoy Analytics for your own personal use subjected to restrictions set in these terms and conditions.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-3">3. User Responsibilities</h2>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>You must not republish material from MatrixBoy Analytics.</li>
              <li>You must not sell, rent or sub-license material from MatrixBoy Analytics.</li>
              <li>You must not reproduce, duplicate or copy material from MatrixBoy Analytics.</li>
              <li>The interactive coding environments are provided for educational purposes; do not attempt to compromise the server infrastructure.</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-3">4. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall MatrixBoy Analytics, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website. MatrixBoy Analytics shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-3">5. Modifications</h2>
            <p className="mb-4">
              MatrixBoy Analytics is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.
            </p>
          </div>
        </motion.div>
      </div>
    </WebsiteLayout>
  );
};
