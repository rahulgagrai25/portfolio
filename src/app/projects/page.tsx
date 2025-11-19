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

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    year: '2024'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'TypeScript'],
    year: '2023'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Real-time weather data visualization with interactive charts',
    technologies: ['Next.js', 'TypeScript', 'API Integration', 'Chart.js'],
    year: '2023'
  },
  {
    id: 4,
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for social media metrics and insights',
    technologies: ['Vue.js', 'Python', 'Django', 'PostgreSQL'],
    year: '2022'
  },
  {
    id: 5,
    title: 'Portfolio Website',
    description: 'Modern portfolio website with animations and 3D effects',
    technologies: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    year: '2024'
  },
  {
    id: 6,
    title: 'Chat Application',
    description: 'Real-time messaging app with WebSocket integration',
    technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    year: '2023'
  }
];

export default function ProjectsPage() {
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
        <div className="mb-12 flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="text-white font-mono uppercase font-bold border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition-colors">
              ← Back
            </Link>
            <div className="text-white font-mono text-sm uppercase border-2 border-white px-4 py-2">
              {projects.length} PROJECTS
            </div>
          </div>
          <div className="border-t-4 border-white pt-6">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase font-mono">
              <DecryptedText text="PROJECTS" />
            </h1>
            <div className="flex items-center gap-4">
              <div className="h-1 w-16 bg-white"></div>
              <p className="text-white font-mono uppercase tracking-widest text-sm">
                <DecryptedText text="ALL PROJECTS & WORKS" />
              </p>
              <div className="h-1 flex-1 bg-white"></div>
            </div>
          </div>
        </div>
        
        {/* Vertical Timeline/List Layout */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="border-l-4 border-white pl-0 relative group hover:bg-white hover:text-black transition-all duration-200"
            >
              {/* Vertical line connector */}
              {index < projects.length - 1 && (
                <div className="absolute left-0 top-0 w-1 h-full bg-white group-hover:bg-black transition-colors" style={{ left: '-2px' }}></div>
              )}
              
              <div className="flex flex-col md:flex-row gap-6 p-6 border-b-4 border-white">
                {/* Left side - Number and Year */}
                <div className="flex-shrink-0 md:w-32 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 border-4 border-white group-hover:border-black bg-black group-hover:bg-white flex items-center justify-center font-mono font-black text-white group-hover:text-black transition-all">
                      {String(project.id).padStart(2, '0')}
                    </div>
                    <div className="h-1 flex-1 bg-white group-hover:bg-black transition-colors"></div>
                  </div>
                  <div className="text-white group-hover:text-black font-mono font-bold uppercase text-sm">
                    {project.year}
                  </div>
                </div>
                
                {/* Middle - Content */}
                <div className="flex-1 flex flex-col gap-4">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-black mb-2 uppercase tracking-tight font-mono">
                      {project.title}
                    </h3>
                    <p className="text-white/80 group-hover:text-black/80 font-mono leading-relaxed text-sm md:text-base">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 border-2 border-white group-hover:border-black text-white group-hover:text-black font-mono font-bold uppercase text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Right side - Action */}
                <div className="flex-shrink-0 flex items-start">
                  <a
                    href="#"
                    className="text-white group-hover:text-black font-black uppercase flex items-center gap-2 group/link font-mono border-2 border-white group-hover:border-black px-6 py-3 hover:bg-white hover:text-black transition-colors"
                  >
                    VIEW
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="mt-12 pt-6 border-t-4 border-white">
          <div className="flex items-center justify-between">
            <div className="h-1 w-32 bg-white"></div>
            <p className="text-white font-mono uppercase text-sm">END OF LIST</p>
            <div className="h-1 flex-1 bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

