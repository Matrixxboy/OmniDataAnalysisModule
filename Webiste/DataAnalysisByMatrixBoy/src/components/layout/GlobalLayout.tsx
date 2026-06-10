import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Code, MessageCircle, Users, BookOpen, User, Shield, FileText } from 'lucide-react';

export const GlobalHeader: React.FC = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
            <BarChart3 size={18} />
          </div>
          <span className="font-bold text-slate-900 tracking-tight text-lg">MatrixBoy<span className="text-purple-600">Analytics</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))
                  ? 'text-purple-600' 
                  : 'text-slate-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/courses" className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm shadow-purple-600/20">
            Start Learning
          </Link>
        </nav>
      </div>
    </header>
  );
};

export const GlobalFooter: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <BarChart3 size={18} />
            </div>
            <span className="font-bold text-white tracking-tight text-lg">MatrixBoyAnalytics</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-sm">
            Empowering the next generation of data professionals with interactive, modern, and comprehensive learning resources.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-white transition-colors"><MessageCircle size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Code size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Users size={20} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2"><BookOpen size={16}/> Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/courses" className="hover:text-purple-400 transition-colors">All Courses</Link></li>
            <li><Link to="/about" className="hover:text-purple-400 transition-colors">About the Instructor</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2"><Shield size={16}/> Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/terms" className="hover:text-purple-400 transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} MatrixBoy Analytics. All rights reserved.</p>
        <p className="flex items-center gap-1">Designed with <span className="text-red-500">♥</span> for Data</p>
      </div>
    </footer>
  );
};

export const WebsiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-purple-200 selection:text-purple-900">
      <GlobalHeader />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <GlobalFooter />
    </div>
  );
};
