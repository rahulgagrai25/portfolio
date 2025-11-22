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
      { id: 1, period: '2025 - Present', role: 'Web Developer', company: 'Apparotech Innovations' }
    ],
    education: [
      { id: 1, period: '2021-2025', degree: 'B.Tech in Computer Science and Engineering', institution: 'Cambridge Institute of Technology' }
    ],
    skills: [
      { id: 1, category: 'Programming Languages', skills: ['C++', 'Java', 'Python'] },
      { id: 2, category: 'App Technologies', skills: ['Java', 'Kotlin', 'SQLite', 'Firebase'] },
      { id: 3, category: 'Database Systems', skills: ['MySQL', 'MongoDB'] },
      { id: 4, category: 'Analytics', skills: ['Python', 'Excel', 'SQL', 'Power BI', 'Jupyter'] },
      { id: 5, category: 'Version Control', skills: ['Git'] },
      { id: 6, category: 'Operating Systems', skills: ['Windows'] },
      { id: 7, category: 'UI/Web Designing', skills: ['Figma', 'Photoshop', 'HTML', 'CSS', 'Tailwind', 'React', 'NextJS'] }
    ],
    projects: [
      {
        id: 1,
        title: 'BrainTechh Engineers Pvt. Ltd.',
        description: 'A professional, fully responsive website designed for BrainTechh Engineers Pvt. Ltd.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WEB3'],
        year: '2025',
        url: 'https://braintechh.com'
      },
      {
        id: 2,
        title: 'Avenue Nails & Spa - Canada',
        description: 'A professional, fully responsive website designed for Avenue Nails & Spa.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WEB3'],
        year: '2025',
        url: 'https://avenuenailsandspa.ca'
      },
      {
        id: 3,
        title: 'Aaron S. Murray - Yoga & Wellness',
        description: 'Personal website for Aaron S. Murray, a Yoga and Wellness instructor.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        year: '2025',
        url: 'https://aaron-yoga.netlify.app'
      },
      {
        id: 4,
        title: 'Shreya Vision - Eye Care Center',
        description: 'A professional, fully responsive website designed for Shreya Vision - Eye Care Center.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WEB3'],
        year: '2025',
        url: 'https://shreya-vision.netlify.app'
      },
      {
        id: 5,
        title: 'RecruitEZ - Job Portal',
        description: 'A professional, fully responsive website designed for RecruitEZ - Job Portal.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        year: '2025',
        url: 'https://recruitez-369.netlify.app'
      },
      {
        id: 6,
        title: 'Labib Dental Clinic - Dubai',
        description: 'A professional, fully responsive website designed for Labib Dental Clinic - Dubai.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        year: '2025',
        url: 'https://labib-dental-clinic.netlify.app'
      },
      {
        id: 7,
        title: 'Garima Dhankhar - Lawyer',
        description: 'A professional, fully responsive website designed for Garima Dhankhar - Lawyer.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        year: '2025',
        url: 'https://law-advocate.netlify.app'
      },
      {
        id: 8,
        title: 'Dolled Up Dimple - Makeup Artist',
        description: 'A professional, fully responsive website designed for Dolled Up Dimple - Beautician.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        year: '2025',
        url: 'https://dolled-up-dimple.netlify.app'
      },
      {
        id: 9,
        title: 'Nikunj Byara - Lawn & Resort',
        description: 'A professional, fully responsive website designed for Nikunj Byara - Lawn & Resort.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        year: '2025',
        url: 'https://resort-website2.netlify.app'
      }
    ],
    social: [
      { id: 1, platform: 'GitHub', url: 'https://github.com/rahulgagrai25' },
      { id: 2, platform: 'LinkedIn', url: 'https://www.linkedin.com/in/rahul-gagrai-0552b824a/' }
    ],
    stats: {
      projects: '20+',
      experience: '4+'
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
  const [newSkill, setNewSkill] = useState<{ [categoryId: number]: string }>({});

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

  const addSkillCategory = () => {
    const newCategory = {
      id: Date.now(),
      category: '',
      skills: []
    };
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, newCategory]
    }));
  };

  const deleteSkillCategory = (id: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(cat => cat.id !== id)
    }));
  };

  const updateCategoryName = (categoryId: number, name: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map(cat =>
        cat.id === categoryId ? { ...cat, category: name } : cat
      )
    }));
  };

  const addSkillToCategory = (categoryId: number, skill: string) => {
    if (skill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: prev.skills.map(cat =>
          cat.id === categoryId
            ? { ...cat, skills: [...cat.skills, skill.trim()] }
            : cat
        )
      }));
    }
  };

  const deleteSkillFromCategory = (categoryId: number, skillIndex: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map(cat =>
        cat.id === categoryId
          ? { ...cat, skills: cat.skills.filter((_, i) => i !== skillIndex) }
          : cat
      )
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      period: '',
      role: '',
      company: ''
    };
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const deleteExperience = (id: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      period: '',
      degree: '',
      institution: ''
    };
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const deleteEducation = (id: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  const addSocial = () => {
    const newSocial = {
      id: Date.now(),
      platform: '',
      url: ''
    };
    setFormData(prev => ({
      ...prev,
      social: [...prev.social, newSocial]
    }));
  };

  const deleteSocial = (id: number) => {
    setFormData(prev => ({
      ...prev,
      social: prev.social.filter(s => s.id !== id)
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
    { id: 'social', label: 'SOCIAL' },
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-white"></div>
                  <span className="text-white font-mono font-bold uppercase tracking-widest">WORK EXPERIENCE</span>
                </div>
                <button
                  onClick={addExperience}
                  className="px-4 py-2 border-2 border-white text-white font-mono uppercase font-bold hover:bg-white hover:text-black transition-colors"
                >
                  + ADD
                </button>
              </div>
              
              {formData.experience.map((exp, index) => (
                <div key={exp.id} className="border-2 border-white p-4 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-mono uppercase font-bold">EXPERIENCE #{String(exp.id).padStart(2, '0')}</span>
                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="px-4 py-2 border-2 border-white text-white font-mono uppercase font-bold hover:bg-white hover:text-black transition-colors"
                    >
                      DELETE
                    </button>
                  </div>
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-white"></div>
                  <span className="text-white font-mono font-bold uppercase tracking-widest">EDUCATION</span>
                </div>
                <button
                  onClick={addEducation}
                  className="px-4 py-2 border-2 border-white text-white font-mono uppercase font-bold hover:bg-white hover:text-black transition-colors"
                >
                  + ADD
                </button>
              </div>
              
              {formData.education.map((edu, index) => (
                <div key={edu.id} className="border-2 border-white p-4 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-mono uppercase font-bold">EDUCATION #{String(edu.id).padStart(2, '0')}</span>
                    <button
                      onClick={() => deleteEducation(edu.id)}
                      className="px-4 py-2 border-2 border-white text-white font-mono uppercase font-bold hover:bg-white hover:text-black transition-colors"
                    >
                      DELETE
                    </button>
                  </div>
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-white"></div>
                  <span className="text-white font-mono font-bold uppercase tracking-widest">SKILLS BY CATEGORY</span>
                </div>
                <button
                  onClick={addSkillCategory}
                  className="px-4 py-2 border-2 border-white text-white font-mono uppercase font-bold hover:bg-white hover:text-black transition-colors"
                >
                  + ADD CATEGORY
                </button>
              </div>
              
              {formData.skills.map((category) => (
                <div key={category.id} className="border-2 border-white p-4 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">CATEGORY NAME</label>
                      <input
                        type="text"
                        value={category.category}
                        onChange={(e) => updateCategoryName(category.id, e.target.value)}
                        className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                        placeholder="e.g., Programming Languages"
                      />
                    </div>
                    <button
                      onClick={() => deleteSkillCategory(category.id)}
                      className="px-4 py-2 border-2 border-white text-white font-mono uppercase font-bold hover:bg-white hover:text-black transition-colors ml-4"
                    >
                      DELETE CATEGORY
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newSkill[category.id] || ''}
                        onChange={(e) => setNewSkill({ ...newSkill, [category.id]: e.target.value })}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && newSkill[category.id]) {
                            addSkillToCategory(category.id, newSkill[category.id]);
                            setNewSkill({ ...newSkill, [category.id]: '' });
                          }
                        }}
                        className="flex-1 bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                        placeholder="Enter skill name..."
                      />
                      <button
                        onClick={() => {
                          if (newSkill[category.id]) {
                            addSkillToCategory(category.id, newSkill[category.id]);
                            setNewSkill({ ...newSkill, [category.id]: '' });
                          }
                        }}
                        className="px-4 py-2 border-2 border-white text-white font-mono uppercase font-bold hover:bg-white hover:text-black transition-colors"
                      >
                        ADD SKILL
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/30">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center gap-2">
                          <span className="px-3 py-1 border-2 border-white text-white font-mono font-bold uppercase text-sm">
                            {skill}
                          </span>
                          <button
                            onClick={() => deleteSkillFromCategory(category.id, skillIndex)}
                            className="px-2 py-1 border-2 border-white text-white font-mono uppercase font-bold text-xs hover:bg-white hover:text-black transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {category.skills.length === 0 && (
                        <span className="text-white/40 font-mono text-xs uppercase">No skills in this category</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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

          {/* Social */}
          {activeSection === 'social' && (
            <div className="bg-black border-4 border-white p-6 space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-white"></div>
                  <span className="text-white font-mono font-bold uppercase tracking-widest">SOCIAL LINKS</span>
                </div>
                <button
                  onClick={addSocial}
                  className="px-4 py-2 border-2 border-white text-white font-mono uppercase font-bold hover:bg-white hover:text-black transition-colors"
                >
                  + ADD
                </button>
              </div>
              
              {formData.social.map((social, index) => (
                <div key={social.id} className="border-2 border-white p-4 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-mono uppercase font-bold">SOCIAL #{String(social.id).padStart(2, '0')}</span>
                    <button
                      onClick={() => deleteSocial(social.id)}
                      className="px-4 py-2 border-2 border-white text-white font-mono uppercase font-bold hover:bg-white hover:text-black transition-colors"
                    >
                      DELETE
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">PLATFORM</label>
                      <input
                        type="text"
                        value={social.platform}
                        onChange={(e) => handleArrayChange('social', index, 'platform', e.target.value)}
                        className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                        placeholder="GitHub, LinkedIn, Twitter..."
                      />
                    </div>
                    <div>
                      <label className="block text-white font-mono uppercase font-bold mb-2 text-xs">URL</label>
                      <input
                        type="text"
                        value={social.url}
                        onChange={(e) => handleArrayChange('social', index, 'url', e.target.value)}
                        className="w-full bg-black border-2 border-white p-2 text-white font-mono text-sm focus:outline-none focus:bg-white focus:text-black transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              ))}
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

