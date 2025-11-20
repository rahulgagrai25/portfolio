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

export default function Home() {
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
      
      <div className="max-w-7xl mx-auto flex flex-col relative z-10">
        <div className="mb-6 flex-shrink-0 border-b-2 border-white pb-4">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tight uppercase font-mono">
            <DecryptedText text="RAHUL GAGRAI" />
          </h1>
          <div className="flex items-center gap-4">
            <div className="h-1 w-16 bg-white"></div>
            <p className="text-white font-mono uppercase tracking-widest text-sm">
              <DecryptedText text="FULL STACK DEVELOPER & UI/UX DESIGNER" />
            </p>
            <div className="h-1 flex-1 bg-white"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* About/Code Section - Large card */}
          <div className="md:col-span-2 md:row-span-2 bg-black border-4 border-white p-6 flex flex-col hover:bg-white hover:text-black transition-all duration-200 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-white group-hover:border-t-black transition-colors"></div>
            <div className="mb-4 flex items-center gap-3 relative z-10">
              <div className="h-1 w-12 bg-white group-hover:bg-black transition-colors"></div>
              <span className="text-white group-hover:text-black font-mono font-bold uppercase tracking-widest">About</span>
            </div>
            <div className="flex-1 overflow-y-auto relative z-10">
              <pre className="text-sm font-mono text-left leading-relaxed whitespace-pre text-white group-hover:text-black">
                <span className="group-hover:text-black">class</span> <span className="group-hover:text-black font-bold">RahulGagrai</span> <span className="group-hover:text-black">{'{'}</span>{'\n'}
                <span className="text-white/60 group-hover:text-black/60">  // I can, because I did.</span>{'\n'}
                <span className="text-white/60 group-hover:text-black/60">  // My vast variety of skills is continuously expanding.</span>{'\n'}
                <span className="group-hover:text-black">  constructor</span><span className="group-hover:text-black">()</span> <span className="group-hover:text-black">{'{'}</span>{'\n'}
                <span className="group-hover:text-black">    </span><span className="group-hover:text-black">this</span><span className="group-hover:text-black">.</span><span className="group-hover:text-black font-bold">name</span> <span className="group-hover:text-black">=</span> <span className="group-hover:text-black">'Rahul Gagrai'</span>{'\n'}
                <span className="group-hover:text-black">    </span><span className="group-hover:text-black">this</span><span className="group-hover:text-black">.</span><span className="group-hover:text-black font-bold">dayOfBirthTimestamp</span> <span className="group-hover:text-black">=</span> <span className="group-hover:text-black">1059156000</span>{'\n'}
                <span className="group-hover:text-black">    </span><span className="group-hover:text-black">this</span><span className="group-hover:text-black">.</span><span className="group-hover:text-black font-bold">email</span> <span className="group-hover:text-black">=</span> <span className="group-hover:text-black">'rahulgagrai250703@gmail.com'</span>{'\n'}
                <span className="group-hover:text-black">  {'}'}</span>{'\n'}
                <span className="group-hover:text-black">  workExperience</span><span className="group-hover:text-black">()</span> <span className="group-hover:text-black">{'{'}</span>{'\n'}
                <span className="group-hover:text-black">    return</span> <span className="group-hover:text-black">[</span>{'\n'}
                <span className="group-hover:text-black">      {'{'}</span> <span className="group-hover:text-black">'2021-now'</span> <span className="group-hover:text-black">:</span> <span className="group-hover:text-black">'Senior Developer at Tech Corp'</span> <span className="group-hover:text-black">{'}'}</span> <span className="group-hover:text-black">{'\n'}
                </span><span className="group-hover:text-black">      {'{'}</span> <span className="group-hover:text-black">'2019-2021'</span> <span className="group-hover:text-black">:</span> <span className="group-hover:text-black">'Full-stack Developer at Startup Inc.'</span> <span className="group-hover:text-black">{'}'}</span> <span className="group-hover:text-black">{'\n'}
                </span><span className="group-hover:text-black">      {'{'}</span> <span className="group-hover:text-black">'2017-2019'</span><span className="group-hover:text-black">:</span> <span className="group-hover:text-black">'Frontend Developer at Web Agency'</span> <span className="group-hover:text-black">{'}'}</span> <span className="group-hover:text-black">{'\n'}
                </span><span className="group-hover:text-black">    ]</span>{'\n'}
                <span className="group-hover:text-black">  {'}'}</span>{'\n'}
                <span className="group-hover:text-black">  education</span><span className="group-hover:text-black">()</span> <span className="group-hover:text-black">{'{'}</span>{'\n'}
                <span className="group-hover:text-black">    return</span> <span className="group-hover:text-black">[</span>{'\n'}
                <span className="group-hover:text-black">      {'{'}</span> <span className="group-hover:text-black">'2021-2025'</span><span className="group-hover:text-black">:</span> <span className="group-hover:text-black">'B.Tech in Computer Science and Engineering'</span> <span className="group-hover:text-black">{'}'}</span> <span className="group-hover:text-black">{'\n'}
                </span><span className="group-hover:text-black">    ]</span>{'\n'}
                <span className="group-hover:text-black">  {'}'}</span>{'\n'}
                <span className="group-hover:text-black">  skills</span><span className="group-hover:text-black">()</span> <span className="group-hover:text-black">{'{'}</span>{'\n'}
                <span className="group-hover:text-black">    return</span> <span className="group-hover:text-black">[</span> <span className="group-hover:text-black">'JavaScript'</span><span className="group-hover:text-black">,</span> <span className="group-hover:text-black">'TypeScript'</span><span className="group-hover:text-black">,</span> <span className="group-hover:text-black">'React'</span><span className="group-hover:text-black">,</span> <span className="group-hover:text-black">'Next.js'</span><span className="group-hover:text-black">,</span> <span className="group-hover:text-black">'Node.js'</span><span className="group-hover:text-black">,</span> <span className="group-hover:text-black">'MongoDB'</span><span className="group-hover:text-black">,</span> <span className="group-hover:text-black">'Tailwind CSS'</span><span className="group-hover:text-black">,</span> <span className="group-hover:text-black">'Git'</span><span className="group-hover:text-black">,</span> <span className="group-hover:text-black">'Docker'</span><span className="group-hover:text-black">,</span> <span className="group-hover:text-black">'AWS'</span> <span className="group-hover:text-black">]</span>{'\n'}
                <span className="group-hover:text-black">  {'}'}</span>{'\n'}
                <span className="group-hover:text-black">{'}'}</span>{'\n'}
                <span className="group-hover:text-black">{'\n'}</span>
              </pre>
            </div>
          </div>

          {/* Featured Project */}
          <div className="md:col-span-2 bg-black border-4 border-white p-6 flex flex-col justify-between hover:bg-white hover:text-black transition-all duration-200 relative group">
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-white group-hover:border-t-black transition-colors"></div>
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-8 bg-white group-hover:bg-black transition-colors"></div>
                <span className="text-white group-hover:text-black font-mono uppercase font-bold">Project</span>
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-black mb-3 uppercase tracking-tight">E-Commerce Platform</h3>
              <p className="text-white/80 group-hover:text-black/80 mb-4 font-mono leading-relaxed">Full-stack e-commerce solution with React, Node.js, and MongoDB</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white text-black font-mono font-bold uppercase border-2 border-white group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">React</span>
                <span className="px-3 py-1 bg-white text-black font-mono font-bold uppercase border-2 border-white group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">Node.js</span>
                <span className="px-3 py-1 bg-white text-black font-mono font-bold uppercase border-2 border-white group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">MongoDB</span>
              </div>
            </div>
            <a href="#" className="text-white group-hover:text-black font-black uppercase mt-4 relative z-10 flex items-center gap-2 group/link font-mono border-2 border-white group-hover:border-black px-4 py-2 hover:bg-white hover:text-black transition-colors">
              View <span className="group-hover/link:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Skills */}
          <div className="bg-black border-4 border-white p-6 flex flex-col justify-between hover:bg-white hover:text-black transition-all duration-200 relative group">
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-white group-hover:border-t-black transition-colors"></div>
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-8 bg-white group-hover:bg-black transition-colors"></div>
                <span className="text-white group-hover:text-black font-mono uppercase font-bold">Skills</span>
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-black mb-4 uppercase">Skills</h3>
              <div className="space-y-2">
                <div className="text-white group-hover:text-black font-mono font-bold uppercase">JavaScript</div>
                <div className="text-white group-hover:text-black font-mono font-bold uppercase">TypeScript</div>
                <div className="text-white group-hover:text-black font-mono font-bold uppercase">React</div>
                <div className="text-white group-hover:text-black font-mono font-bold uppercase">Next.js</div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-black border-4 border-white p-6 flex flex-col justify-between hover:bg-white hover:text-black transition-all duration-200 relative group">
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-white group-hover:border-t-black transition-colors"></div>
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-8 bg-white group-hover:bg-black transition-colors"></div>
                <span className="text-white group-hover:text-black font-mono uppercase font-bold">Exp</span>
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-black mb-2 uppercase">Experience</h3>
              <p className="text-white/90 group-hover:text-black/90 mb-2 font-mono font-bold">Senior Developer</p>
              <p className="text-white/70 group-hover:text-black/70 font-mono">Tech Corp • 2021 - Present</p>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="md:col-span-2 bg-black border-4 border-white p-6 flex flex-col justify-between hover:bg-white hover:text-black transition-all duration-200 relative group">
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-white group-hover:border-t-black transition-colors"></div>
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-8 bg-white group-hover:bg-black transition-colors"></div>
                <span className="text-white group-hover:text-black font-mono uppercase font-bold">Projects</span>
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-black mb-4 uppercase tracking-tight">Projects</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-white group-hover:border-black pl-4 transition-colors">
                  <h4 className="text-white group-hover:text-black font-black uppercase mb-1">Task Management App</h4>
                  <p className="text-white/80 group-hover:text-black/80 font-mono">React, Firebase, Tailwind CSS</p>
                </div>
                <div className="border-l-4 border-white group-hover:border-black pl-4 transition-colors">
                  <h4 className="text-white group-hover:text-black font-black uppercase mb-1">Weather Dashboard</h4>
                  <p className="text-white/80 group-hover:text-black/80 font-mono">Next.js, TypeScript, API Integration</p>
                </div>
              </div>
            </div>
            <Link href="/projects" className="text-white group-hover:text-black font-black uppercase mt-4 relative z-10 flex items-center gap-2 group/link font-mono border-2 border-white group-hover:border-black px-4 py-2 hover:bg-white hover:text-black transition-colors">
              View All <span className="group-hover/link:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Education */}
          <div className="bg-black border-4 border-white p-6 flex flex-col justify-between hover:bg-white hover:text-black transition-all duration-200 relative group">
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-white group-hover:border-t-black transition-colors"></div>
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-8 bg-white group-hover:bg-black transition-colors"></div>
                <span className="text-white group-hover:text-black font-mono uppercase font-bold">Edu</span>
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-black mb-2 uppercase">Education</h3>
              <p className="text-white/90 group-hover:text-black/90 mb-2 font-mono font-bold">BS Computer Science</p>
              <p className="text-white/70 group-hover:text-black/70 font-mono">University Name • 2019</p>
            </div>
          </div>

          {/* Stats/Achievements */}
          <div className="bg-black border-4 border-white p-6 flex flex-col justify-between hover:bg-white hover:text-black transition-all duration-200 relative group">
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-white group-hover:border-t-black transition-colors"></div>
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-8 bg-white group-hover:bg-black transition-colors"></div>
                <span className="text-white group-hover:text-black font-mono uppercase font-bold">Stats</span>
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-black mb-4 uppercase">Stats</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-4xl font-black text-white group-hover:text-black">50+</div>
                  <div className="text-white/80 group-hover:text-black/80 font-mono uppercase">Projects</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-white group-hover:text-black">5+</div>
                  <div className="text-white/80 group-hover:text-black/80 font-mono uppercase">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 border-t-4 border-white pt-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-1 w-12 bg-white"></div>
            <span className="text-white font-mono font-bold uppercase tracking-widest text-xl">
              <DecryptedText text="CONTACT" />
            </span>
            <div className="h-1 flex-1 bg-white"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div className="bg-black border-4 border-white p-6 hover:bg-white hover:text-black transition-all duration-200 relative group">
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-white group-hover:border-t-black transition-colors"></div>
              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-1 w-8 bg-white group-hover:bg-black transition-colors"></div>
                  <span className="text-white group-hover:text-black font-mono uppercase font-bold">Info</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-white/60 group-hover:text-black/60 font-mono uppercase text-xs mb-1">EMAIL</div>
                    <a 
                      href="mailto:rahulgagrai250703@gmail.com" 
                      className="text-white group-hover:text-black font-mono font-bold hover:underline"
                    >
                      rahulgagrai250703@gmail.com
                    </a>
                  </div>
                  <div>
                    <div className="text-white/60 group-hover:text-black/60 font-mono uppercase text-xs mb-1">AVAILABILITY</div>
                    <div className="text-white group-hover:text-black font-mono font-bold">Open to Opportunities</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-black border-4 border-white p-6 hover:bg-white hover:text-black transition-all duration-200 relative group">
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-white group-hover:border-t-black transition-colors"></div>
              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-1 w-8 bg-white group-hover:bg-black transition-colors"></div>
                  <span className="text-white group-hover:text-black font-mono uppercase font-bold">Social</span>
                </div>
                <div className="space-y-3">
                  <a 
                    href="https://github.com/rahulgagrai25" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 text-white group-hover:text-black font-mono font-bold uppercase border-2 border-white group-hover:border-black px-4 py-3 hover:bg-white hover:text-black transition-all duration-200 group/button"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-white group-hover:bg-black transition-colors"></div>
                      <span>GitHub</span>
                    </div>
                    <span className="group-hover/button:translate-x-1 transition-transform">→</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/rahul-gagrai-0552b824a/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 text-white group-hover:text-black font-mono font-bold uppercase border-2 border-white group-hover:border-black px-4 py-3 hover:bg-white hover:text-black transition-all duration-200 group/button"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-white group-hover:bg-black transition-colors"></div>
                      <span>LinkedIn</span>
                    </div>
                    <span className="group-hover/button:translate-x-1 transition-transform">→</span>
                  </a>
                  {/* <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 text-white group-hover:text-black font-mono font-bold uppercase border-2 border-white group-hover:border-black px-4 py-3 hover:bg-white hover:text-black transition-all duration-200 group/button"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-white group-hover:bg-black transition-colors"></div>
                      <span>Twitter</span>
                    </div>
                    <span className="group-hover/button:translate-x-1 transition-transform">→</span>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
