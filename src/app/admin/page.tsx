'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function DecryptedText({ text, className = '' }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [mounted, setMounted] = useState<boolean>(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    setMounted(true);
    let currentIndex = 0;
    const initialRandom = Array.from({ length: text.length }, () => 
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    setDisplayText(initialRandom);

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        const randomChars = Array.from({ length: text.length - currentIndex }, () => 
          chars[Math.floor(Math.random() * chars.length)]
        ).join('');
        setDisplayText(text.slice(0, currentIndex) + randomChars);
        currentIndex++;
      } else {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{mounted ? displayText : text}</span>;
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [formData, setFormData] = useState({
    personal: {
      name: 'Rahul Gagrai',
      email: 'rahulgagrai250703@gmail.com',
      title: 'Full Stack Developer & UI/UX Designer',
      dayOfBirthTimestamp: '1059156000',
      bio: 'I can, because I did.\nMy vast variety of skills is continuously expanding.'
    },
    experience: [
      { id: 1, period: '2021-now', role: 'Senior Developer', company: 'Tech Corp' },
      { id: 2, period: '2019-2021', role: 'Full-stack Developer', company: 'Startup Inc.' }
    ],
    education: [
      { id: 1, period: '2021-2025', degree: 'B.Tech in Computer Science and Engineering', institution: 'University Name' }
    ],
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Git', 'Docker', 'AWS'],
    projects: [
      {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
        year: '2024',
        url: 'https://github.com/rahulgagrai25/ecommerce-platform'
      },
      {
        id: 2,
        title: 'Task Management App',
        description: 'Collaborative task management with real-time updates',
        technologies: ['React', 'Firebase', 'Tailwind CSS', 'TypeScript'],
        year: '2023',
        url: 'https://github.com/rahulgagrai25/task-manager'
      }
    ],
    stats: {
      projects: '50+',
      experience: '5+'
    }
  });

  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    year: '',
    url: ''
  });

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section: string, index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: (prev[section as keyof typeof prev] as any[]).map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSkillsChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: value.split(',').map(s => s.trim()).filter(s => s)
    }));
  };

  const addProject = () => {
    if (newProject.title && newProject.description) {
      const techArray = newProject.technologies.split(',').map(t => t.trim()).filter(t => t);
      const project = {
        id: Date.now(),
        ...newProject,
        technologies: techArray
      };
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, project]
      }));
      setNewProject({ title: '', description: '', technologies: '', year: '', url: '' });
    }
  };

  const deleteProject = (id: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const saveData = () => {
    // Here you would typically save to a database or API
    console.log('Saving data:', formData);
    alert('Data saved! (Check console for output)');
  };

  const sections = [
    { id: 'personal', label: 'PERSONAL' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'stats', label: 'STATS' }
  ];

  return (
    <div className="min-h-screen bg-black p-6 relative">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>
      
      {/* Corner accent lines */}
      <div className="absolute top-0 left-0 w-32 h-1 bg-white"></div>
      <div className="absolute top-0 left-0 w-1 h-32 bg-white"></div>
      <div className="absolute top-0 right-0 w-32 h-1 bg-white"></div>
      <div className="absolute top-0 right-0 w-1 h-32 bg-white"></div>
      <div className="absolute bottom-0 left-0 w-32 h-1 bg-white"></div>
      <div className="absolute bottom-0 left-0 w-1 h-32 bg-white"></div>
      <div className="absolute bottom-0 right-0 w-32 h-1 bg-white"></div>
      <div className="absolute bottom-0 right-0 w-1 h-32 bg-white"></div>
      
      <div className="max-w-6xl mx-auto flex flex-col relative z-10">
        {/* Header */}
        <div className="mb-8 flex-shrink-0 border-b-4 border-white pb-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="text-white font-mono uppercase font-bold border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition-colors">
              ← Home
            </Link>
            <button
              onClick={saveData}
              className="text-white font-mono uppercase font-bold border-4 border-white px-6 py-3 hover:bg-white hover:text-black transition-colors"
            >
              SAVE ALL
            </button>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase font-mono">
            <DecryptedText text="ADMIN PANEL" />
          </h1>
          <div className="flex items-center gap-4">
            <div className="h-1 w-16 bg-white"></div>
            <p className="text-white font-mono uppercase tracking-widest text-sm">
              <DecryptedText text="EDIT PORTFOLIO DATA" />
            </p>
            <div className="h-1 flex-1 bg-white"></div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 flex flex-wrap gap-2 border-b-4 border-white pb-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-6 py-3 font-mono font-bold uppercase border-4 transition-all ${
                activeSection === section.id
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white border-white hover:bg-white hover:text-black'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {/* Personal Information */}
          {activeSection === 'personal' && (
            <div className="bg-black border-4 border-white p-6 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-white"></div>
                <span className="text-white font-mono font-bold uppercase tracking-widest">PERSONAL INFO</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-mono uppercase font-bold mb-2">NAME</label>
                  <input
                    type="text"
                    value={formData.personal.name}
                    onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
                    className="w-full bg-black border-4 border-white p-4 text-white font-mono focus:outline-none focus:bg-white focus:text-black transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-mono uppercase font-bold mb-2">EMAIL</label>
                  <input
                    type="email"
                    value={formData.personal.email}
                    onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                    className="w-full bg-black border-4 border-white p-4 text-white font-mono focus:outline-none focus:bg-white focus:text-black transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-mono uppercase font-bold mb-2">TITLE</label>
                  <input
                    type="text"
                    value={formData.personal.title}
                    onChange={(e) => handleInputChange('personal', 'title', e.target.value)}
                    className="w-full bg-black border-4 border-white p-4 text-white font-mono focus:outline-none focus:bg-white focus:text-black transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-mono uppercase font-bold mb-2">BIRTH TIMESTAMP</label>
                  <input
                    type="text"
                    value={formData.personal.dayOfBirthTimestamp}
                    onChange={(e) => handleInputChange('personal', 'dayOfBirthTimestamp', e.target.value)}
                    className="w-full bg-black border-4 border-white p-4 text-white font-mono focus:outline-none focus:bg-white focus:text-black transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-mono uppercase font-bold mb-2">BIO (ONE LINE PER COMMENT)</label>
                  <textarea
                    value={formData.personal.bio}
                    onChange={(e) => handleInputChange('personal', 'bio', e.target.value)}
                    rows={3}
                    className="w-full bg-black border-4 border-white p-4 text-white font-mono focus:outline-none focus:bg-white focus:text-black transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Experience */}
          {activeSection === 'experience' && (
            <div className="bg-black border-4 border-white p-6 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-white"></div>
                <span className="text-white font-mono font-bold uppercase tracking-widest">WORK EXPERIENCE</span>
              </div>
              
              {formData.experience.map((exp, index) => (
                <div key={exp.id} className="border-2 border-white p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">PERIOD</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => handleArrayChange('experience', index, 'period', e.target.value)}
                        className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">ROLE</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleArrayChange('experience', index, 'role', e.target.value)}
                        className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">COMPANY</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                        className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {activeSection === 'education' && (
            <div className="bg-black border-4 border-white p-6 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-white"></div>
                <span className="text-white font-mono font-bold uppercase tracking-widest">EDUCATION</span>
              </div>
              
              {formData.education.map((edu, index) => (
                <div key={edu.id} className="border-2 border-white p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">PERIOD</label>
                      <input
                        type="text"
                        value={edu.period}
                        onChange={(e) => handleArrayChange('education', index, 'period', e.target.value)}
                        className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">DEGREE</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                        className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">INSTITUTION</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                        className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {activeSection === 'skills' && (
            <div className="bg-black border-4 border-white p-6 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-white"></div>
                <span className="text-white font-mono font-bold uppercase tracking-widest">SKILLS</span>
              </div>
              
              <div>
                <label className="block text-white font-mono uppercase font-bold mb-2">SKILLS (COMMA SEPARATED)</label>
                <textarea
                  value={formData.skills.join(', ')}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  rows={4}
                  className="w-full bg-black border-4 border-white p-4 text-white font-mono focus:outline-none focus:bg-white focus:text-black transition-colors resize-none"
                  placeholder="JavaScript, TypeScript, React, Next.js..."
                />
                <p className="text-white/60 font-mono text-xs mt-2 uppercase">Separate skills with commas</p>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-white">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 border-2 border-white text-white font-mono font-bold uppercase text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {activeSection === 'projects' && (
            <div className="bg-black border-4 border-white p-6 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-white"></div>
                <span className="text-white font-mono font-bold uppercase tracking-widest">PROJECTS</span>
              </div>
              
              {/* Existing Projects */}
              {formData.projects.map((project, index) => (
                <div key={project.id} className="border-2 border-white p-4 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-mono uppercase font-bold">PROJECT #{String(project.id).padStart(2, '0')}</span>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="px-4 py-2 border-2 border-white text-white font-mono uppercase font-bold hover:bg-white hover:text-black transition-colors"
                    >
                      DELETE
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">TITLE</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                        className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">YEAR</label>
                      <input
                        type="text"
                        value={project.year}
                        onChange={(e) => handleArrayChange('projects', index, 'year', e.target.value)}
                        className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                      />
                    </div>
                  </div>
                
                <div>
                  <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">URL</label>
                  <input
                    type="text"
                    value={project.url ?? ''}
                    onChange={(e) => handleArrayChange('projects', index, 'url', e.target.value)}
                    className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                    placeholder="https://..."
                  />
                </div>
                  
                  <div>
                    <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">DESCRIPTION</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                      rows={2}
                      className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">TECHNOLOGIES (COMMA SEPARATED)</label>
                    <input
                      type="text"
                      value={project.technologies.join(', ')}
                      onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                      className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                    />
                  </div>
                </div>
              ))}
              
              {/* Add New Project */}
              <div className="border-4 border-white p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-1 w-12 bg-white"></div>
                  <span className="text-white font-mono font-bold uppercase tracking-widest">ADD NEW PROJECT</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">TITLE</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">YEAR</label>
                    <input
                      type="text"
                      value={newProject.year}
                      onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                      className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">URL</label>
                  <input
                    type="text"
                    value={newProject.url}
                    onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                    className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                    placeholder="https://..."
                  />
                </div>
                
                <div>
                  <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">DESCRIPTION</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    rows={2}
                    className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">TECHNOLOGIES (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                  />
                </div>
                
                <button
                  onClick={addProject}
                  className="px-6 py-3 border-4 border-white text-white font-mono uppercase font-bold hover:bg-white hover:text-black transition-colors"
                >
                  ADD PROJECT
                </button>
              </div>
            </div>
          )}

          {/* Stats */}
          {activeSection === 'stats' && (
            <div className="bg-black border-4 border-white p-6 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-white"></div>
                <span className="text-white font-mono font-bold uppercase tracking-widest">STATISTICS</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-mono uppercase font-bold mb-2">PROJECTS COUNT</label>
                  <input
                    type="text"
                    value={formData.stats.projects}
                    onChange={(e) => handleInputChange('stats', 'projects', e.target.value)}
                    className="w-full bg-black border-4 border-white p-4 text-white font-mono focus:outline-none focus:bg-white focus:text-black transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-mono uppercase font-bold mb-2">EXPERIENCE YEARS</label>
                  <input
                    type="text"
                    value={formData.stats.experience}
                    onChange={(e) => handleInputChange('stats', 'experience', e.target.value)}
                    className="w-full bg-black border-4 border-white p-4 text-white font-mono focus:outline-none focus:bg-white focus:text-black transition-colors"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Save Button */}
        <div className="mt-12 pt-6 border-t-4 border-white">
          <div className="flex items-center justify-center">
            <button
              onClick={saveData}
              className="px-12 py-4 border-4 border-white text-white font-mono uppercase font-bold text-xl hover:bg-white hover:text-black transition-colors"
            >
              SAVE ALL CHANGES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

