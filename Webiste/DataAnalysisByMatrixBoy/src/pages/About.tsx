import React, { useEffect, useState } from 'react';
import { WebsiteLayout } from '../components/layout/GlobalLayout';
import { Code, Users, MessageCircle, MapPin, Building, Globe, GitFork, Star, BookOpen, GraduationCap, Briefcase, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface GithubProfile {
  name: string;
  bio: string;
  avatar_url: string;
  company: string;
  location: string;
  blog: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export const About: React.FC = () => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/matrixxboy');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch GitHub profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  return (
    <WebsiteLayout>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">About the Developer</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get to know the creator behind this interactive data analysis platform.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : profile ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-12 flex flex-col md:flex-row gap-10 items-center md:items-start relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            
            <div className="relative">
              <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-white shadow-xl rotate-3 transition-transform hover:rotate-0 duration-300">
                <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center">
                <Code className="text-purple-600" size={24} />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left relative z-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{profile.name}</h2>
              <p className="text-purple-600 font-semibold mb-6">@{profile.name ? "Matrixxboy" : "Developer"}</p>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {profile.bio}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-8">
                {profile.location && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={18} className="text-slate-400" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.company && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Building size={18} className="text-slate-400" />
                    <span>{profile.company}</span>
                  </div>
                )}
                {profile.blog && (
                  <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors">
                    <Globe size={18} className="text-slate-400" />
                    <span>Website</span>
                  </a>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-slate-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 mb-1">{profile.public_repos}</div>
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-500">Repositories</div>
                </div>
                <div className="text-center border-l border-slate-100">
                  <div className="text-2xl font-bold text-slate-900 mb-1">{profile.followers}</div>
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-500">Followers</div>
                </div>
                <div className="text-center border-l border-slate-100">
                  <div className="text-2xl font-bold text-slate-900 mb-1">{profile.following}</div>
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-500">Following</div>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-4">
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all shadow-sm hover:shadow-md flex items-center gap-2">
                  <Code size={18} />
                  View GitHub
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}

        {/* Technical Skills Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Code size={20} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Technical Skills</h2>
          </div>
          
          <div className="overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 text-sm font-semibold text-slate-700 w-1/3">Category</th>
                  <th className="p-4 text-sm font-semibold text-slate-700">Skills</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div> Frontend
                  </td>
                  <td className="p-4 text-slate-600">React, HTML, CSS, JavaScript, Tailwind CSS</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Backend
                  </td>
                  <td className="p-4 text-slate-600">Python</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div> Database
                  </td>
                  <td className="p-4 text-slate-600">MongoDB, MySQL</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div> AI/ML
                  </td>
                  <td className="p-4 text-slate-600">Python, Machine Learning, Deep Learning</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-500"></div> Tools
                  </td>
                  <td className="p-4 text-slate-600">Git, Docker, Linux</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Experience & Certifications */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                <Briefcase size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Experience</h2>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative pl-6 border-l-2 border-slate-100">
                <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[7px] top-2 ring-4 ring-white"></div>
                <h3 className="font-bold text-slate-900 text-lg">Developer In Training</h3>
                <p className="text-purple-600 font-medium text-sm mb-2">The World Of Matrix • Present</p>
                <p className="text-slate-600 text-sm">Specializing in C, C++, AI-ML, and the MERN stack. Building highly interactive platforms and expanding knowledge in modern web technologies.</p>
              </div>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Award size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Certifications</h2>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="text-slate-500" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Data Analysis Certificate</h3>
                  <p className="text-slate-500 text-sm">Completed comprehensive training in data structures, algorithms, and analytical visualization.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                  <Code className="text-slate-500" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">MERN Stack Mastery</h3>
                  <p className="text-slate-500 text-sm">Advanced proficiency in MongoDB, Express, React, and Node.js ecosystems.</p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

      </div>
    </WebsiteLayout>
  );
};
