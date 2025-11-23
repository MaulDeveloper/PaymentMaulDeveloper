import React from 'react';
import { DEV_PROFILE } from '../constants';
import { Terminal } from 'lucide-react';

export const DeveloperProfile: React.FC = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-6 items-start w-full">
        
        {/* Code Block with Typewriter Animation */}
        <div className="w-full flex-1 font-mono text-xs sm:text-sm bg-[#16161e] p-4 rounded-lg border border-vscode-border relative group overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-vscode-function to-vscode-keyword opacity-50"></div>
            <div className="mb-3 text-vscode-comment italic text-[10px] sm:text-xs flex items-center gap-2">
                <span>// config/user_profile.js</span>
                <span className="text-vscode-fg/20"> — Read Only</span>
            </div>
            
            <div className="overflow-hidden">
                <div>
                    <span className="text-vscode-keyword">const</span> 
                    <span className="text-vscode-class"> Developer</span> 
                    <span className="text-vscode-operator"> = </span> 
                    <span className="text-vscode-keyword">{'{'}</span>
                </div>
                
                <div className="pl-4 flex flex-col gap-1 py-1 animate-typewriter overflow-hidden whitespace-nowrap">
                    <div>
                        <span className="text-vscode-fg">name: </span>
                        <span className="text-vscode-string">"{DEV_PROFILE.name}"</span>
                        <span className="text-vscode-fg">,</span>
                    </div>
                    <div>
                        <span className="text-vscode-fg">role: </span>
                        <span className="text-vscode-string">"{DEV_PROFILE.role}"</span>
                        <span className="text-vscode-fg">,</span>
                    </div>
                    <div>
                        <span className="text-vscode-fg">is_online: </span>
                        <span className="text-vscode-keyword">true</span>
                        <span className="text-vscode-fg">,</span>
                    </div>
                     <div className="flex flex-wrap items-center">
                        <span className="text-vscode-fg whitespace-nowrap">stack: </span>
                        <span className="text-vscode-keyword">[</span>
                        {DEV_PROFILE.skills.slice(0, 4).map((s, i) => (
                             <span key={i} className="text-vscode-string">"{s}"<span className="text-vscode-fg">, </span></span>
                        ))}
                        <span className="text-vscode-keyword">]</span>
                    </div>
                </div>
                
                <div><span className="text-vscode-keyword">{'}'}</span><span className="text-vscode-fg">;</span></div>
                <div>
                    <span className="text-vscode-keyword">export default</span> <span className="text-vscode-class">Developer</span><span className="text-vscode-fg">;</span>
                </div>
            </div>
        </div>

        {/* Visual Preview Card */}
        <div className="w-full xl:w-64 bg-[#16161e] p-1 rounded-lg border border-vscode-border flex flex-col items-center text-center shadow-xl relative shrink-0 group">
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between px-3 py-2 border-b border-vscode-border mb-2">
                 <div className="flex gap-1.5">
                     <div className="w-2 h-2 rounded-full bg-vscode-comment"></div>
                     <div className="w-2 h-2 rounded-full bg-vscode-comment"></div>
                 </div>
                 <span className="text-[10px] text-vscode-comment">PROFIL DEVELOPER</span>
            </div>

            <div className="p-4 flex flex-col items-center w-full">
                <div className="relative mb-3">
                    <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-vscode-function to-vscode-keyword">
                        <div className="w-full h-full rounded-full bg-[#16161e] p-0.5">
                            <img 
                                src={DEV_PROFILE.avatar} 
                                alt="Profile" 
                                className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </div>
                    <div className="absolute bottom-1 right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-[#16161e] animate-pulse"></div>
                </div>

                <h2 className="text-sm font-bold text-vscode-fg mb-1">{DEV_PROFILE.name}</h2>
                <p className="text-vscode-comment text-[10px] flex items-center gap-1 mb-4">
                    <Terminal size={10}/> {DEV_PROFILE.role}
                </p>

                {/* Bio Section */}
                <div className="w-full bg-black/20 border border-vscode-border rounded p-2 text-left relative mt-1">
                    <div className="absolute -top-2 left-2 bg-[#16161e] px-1 text-[9px] text-vscode-function font-bold">BIO</div>
                    <p className="text-[10px] text-vscode-string italic leading-relaxed pt-1">
                        "{DEV_PROFILE.bio}"
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};