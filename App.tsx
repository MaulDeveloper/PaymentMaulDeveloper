import React, { useState, useRef, useEffect } from 'react';
import { PaymentMethod } from './types';
import { DeveloperProfile } from './components/ProductSummary';
import { PaymentSelector } from './components/PaymentSelector';
import { PaymentDetails } from './components/PaymentDetails';
import { UploadForm } from './components/UploadForm';
import { 
  Files, 
  Search, 
  GitGraph, 
  Settings, 
  X, 
  ChevronRight,
  ChevronDown,
  Volume2,
  VolumeX,
  Code2,
  CheckCheck,
  AlertCircle,
  ArrowLeft,
  Bug,
  Terminal
} from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [purchasedProduct, setPurchasedProduct] = useState<string>('-');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mouse glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        const root = document.documentElement;
        root.style.setProperty('--mouse-x', `${e.clientX}px`);
        root.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Audio logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
    const playAudio = async () => { try { await audio.play(); setIsPlaying(true); } catch (e) { setIsPlaying(false); } };
    const handleInteraction = () => { if (audio.paused) playAudio(); };
    playAudio();
    ['click', 'touchstart'].forEach(e => document.addEventListener(e, handleInteraction, {once: true}));
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();
        setIsPlaying(!isPlaying);
    }
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setStep(1);
  };

  const handleBack = () => {
    if (step === 1) {
        setStep(0);
        setSelectedMethod(null);
    } else if (step === 2) {
        setStep(1);
    }
  };

  const getActiveFile = () => {
    if (step === 0) return 'profile.config.js';
    if (step === 1) return 'payment.env';
    if (step === 2) return 'deploy.sh';
    if (step === 3) return 'build.log';
    return 'untitled';
  };

  const getFileIcon = () => {
      if (step === 0) return <span className="text-[#f7e018] font-bold">JS</span>;
      if (step === 1) return <Settings size={12} className="text-vscode-comment" />;
      if (step === 2) return <span className="text-vscode-string font-bold">$_</span>;
      return <span className="text-vscode-comment">LOG</span>;
  }

  // Mock line numbers generator
  const LineNumbers = ({ count }: { count: number }) => (
    <div className="hidden sm:flex flex-col text-right pr-4 pt-4 select-none bg-vscode-bg text-vscode-comment/30 font-mono text-[13px] leading-6 border-r border-vscode-border min-h-full w-12 shrink-0">
        {Array.from({ length: count }, (_, i) => (
            <div key={i} className="hover:text-vscode-fg cursor-pointer">{i + 1}</div>
        ))}
    </div>
  );

  // Visual Minimap
  const Minimap = () => (
      <div className="w-16 bg-vscode-bg border-l border-vscode-border hidden md:flex flex-col gap-1 p-1 opacity-50 select-none">
          {Array.from({length: 40}).map((_, i) => (
              <div key={i} className={`h-1 rounded-full w-[${Math.floor(Math.random() * 80) + 20}%] ${Math.random() > 0.7 ? 'bg-vscode-comment' : 'bg-vscode-border'}`}></div>
          ))}
      </div>
  );

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center font-mono text-[13px] leading-6 overflow-hidden p-0 sm:p-4">
      <audio ref={audioRef} loop autoPlay preload="auto" src="https://files.catbox.moe/x39q2o.mp3" />
      <div className="glow-bg"></div>

      {/* VS Code Window */}
      <div className="w-full h-full max-w-[1600px] bg-vscode-bg sm:border border-vscode-border sm:rounded-lg shadow-2xl flex flex-col relative overflow-hidden text-vscode-fg ring-1 ring-white/5">
        
        {/* Title Bar */}
        <div className="h-9 bg-vscode-header flex items-center justify-between px-3 select-none shrink-0 border-b border-black/20">
            <div className="flex items-center gap-3">
               {/* Mac traffic lights */}
               <div className="flex gap-2 group">
                   <div className="w-3 h-3 rounded-full bg-[#ff5f56] group-hover:saturate-150"></div>
                   <div className="w-3 h-3 rounded-full bg-[#ffbd2e] group-hover:saturate-150"></div>
                   <div className="w-3 h-3 rounded-full bg-[#27c93f] group-hover:saturate-150"></div>
               </div>
            </div>
            <div className="text-vscode-fg/60 text-xs flex items-center gap-2 bg-vscode-bg px-6 py-1 rounded-md border border-vscode-border/50">
                <Search size={10} />
                <span>{getActiveFile()} — DevPayment</span>
            </div>
            <div className="flex items-center gap-3">
               <button onClick={toggleMusic} className={`hover:text-white transition-colors ${isPlaying ? 'text-vscode-function' : 'text-gray-500'}`}>
                  {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
               </button>
            </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
            {/* Activity Bar (Hidden on Mobile) */}
            <div className="w-12 bg-vscode-activity flex flex-col items-center py-3 gap-6 shrink-0 border-r border-vscode-border hidden sm:flex">
                <Files size={24} className="text-vscode-fg border-l-2 border-vscode-function pl-3 w-full" />
                <Search size={24} className="text-vscode-comment hover:text-vscode-fg cursor-pointer transition-colors" />
                <GitGraph size={24} className="text-vscode-comment hover:text-vscode-fg cursor-pointer transition-colors" />
                <Bug size={24} className="text-vscode-comment hover:text-vscode-fg cursor-pointer transition-colors" />
                <div className="mt-auto mb-2">
                    <Settings size={24} className="text-vscode-comment hover:text-vscode-fg cursor-pointer transition-colors" />
                </div>
            </div>

            {/* Explorer Sidebar (Hidden on Mobile) */}
            <div className="w-56 bg-vscode-sidebar border-r border-vscode-border flex flex-col shrink-0 hidden md:flex">
                <div className="h-8 px-4 flex items-center justify-between text-[11px] font-bold text-vscode-comment uppercase tracking-wider">
                    <span>Explorer</span>
                    <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-vscode-comment"></div>
                        <div className="w-1 h-1 rounded-full bg-vscode-comment"></div>
                    </div>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 text-vscode-fg font-bold cursor-pointer bg-vscode-selection/20">
                    <ChevronDown size={14} />
                    <span>PROJECT-ROOT</span>
                </div>
                <div className="flex flex-col mt-1">
                    <div className={`flex items-center gap-2 px-5 py-1 cursor-pointer hover:bg-vscode-selection/30 border-l-2 ${step === 0 ? 'bg-vscode-selection/40 border-vscode-function text-white' : 'border-transparent text-vscode-fg/80'}`} onClick={() => setStep(0)}>
                        <span className="text-[#f7e018] text-xs font-bold">JS</span>
                        <span>profile.config.js</span>
                    </div>
                    <div className={`flex items-center gap-2 px-5 py-1 cursor-pointer hover:bg-vscode-selection/30 border-l-2 ${step === 1 ? 'bg-vscode-selection/40 border-vscode-function text-white' : 'border-transparent text-vscode-fg/80'}`} onClick={() => step > 0 && setStep(1)}>
                        <Settings size={12} className="text-vscode-comment" />
                        <span>payment.env</span>
                    </div>
                    <div className={`flex items-center gap-2 px-5 py-1 cursor-pointer hover:bg-vscode-selection/30 border-l-2 ${step === 2 ? 'bg-vscode-selection/40 border-vscode-function text-white' : 'border-transparent text-vscode-fg/80'}`} onClick={() => step > 1 && setStep(2)}>
                         <span className="text-vscode-string text-xs font-bold">$_</span>
                        <span>deploy.sh</span>
                    </div>
                     <div className={`flex items-center gap-2 px-5 py-1 cursor-pointer hover:bg-vscode-selection/30 border-l-2 ${step === 3 ? 'bg-vscode-selection/40 border-vscode-function text-white' : 'border-transparent text-vscode-fg/80'}`} onClick={() => step > 2 && setStep(3)}>
                        <span className="text-vscode-comment text-xs">LOG</span>
                        <span>build.log</span>
                    </div>
                </div>
            </div>

            {/* Main Editor */}
            <div className="flex-1 flex flex-col min-w-0 bg-vscode-bg relative z-10">
                {/* Tabs */}
                <div className="h-9 bg-vscode-sidebar flex items-end shrink-0 overflow-x-auto scrollbar-hide">
                    <div className="bg-vscode-bg text-vscode-fg px-4 py-1.5 flex items-center gap-2 text-xs border-t-2 border-t-vscode-function min-w-fit border-r border-vscode-border pr-6 relative group">
                        {getFileIcon()}
                        <span className="italic">{getActiveFile()}</span>
                        <X size={12} className="absolute right-2 opacity-0 group-hover:opacity-100 hover:bg-vscode-comment/20 rounded p-0.5 cursor-pointer" />
                    </div>
                    <div className="px-3 py-1.5 text-vscode-comment text-xs border-r border-vscode-border/50 italic opacity-50 cursor-not-allowed">
                        notes.txt
                    </div>
                </div>

                {/* Breadcrumbs */}
                <div className="h-7 flex items-center px-4 text-xs text-vscode-comment/80 shrink-0 bg-vscode-bg border-b border-vscode-border/30 overflow-x-auto gap-1">
                    <span className="whitespace-nowrap">src</span>
                    <ChevronRight size={12} />
                    <span className="whitespace-nowrap">modules</span>
                    <ChevronRight size={12} />
                    <span className="text-vscode-fg whitespace-nowrap">{getActiveFile()}</span>
                </div>

                {/* Code Area with Line Numbers */}
                <div className="flex-1 flex overflow-hidden">
                    <LineNumbers count={60} />
                    
                    <div className="flex-1 overflow-y-auto p-2 sm:p-6 relative">
                        {/* Decoration Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#292e421a_1px,transparent_1px),linear-gradient(to_bottom,#292e421a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

                         {step === 0 && (
                            <div className="max-w-3xl animate-fade-in">
                                <div className="text-vscode-comment mb-4 flex items-center gap-2">
                                    <span>// Initializing developer profile configuration...</span>
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                </div>
                                <DeveloperProfile />
                                <div className="mt-8 border-t border-vscode-border pt-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-vscode-keyword">import</span> 
                                        <span className="text-vscode-operator">{'{'}</span>
                                        <span className="text-vscode-class">PaymentModule</span>
                                        <span className="text-vscode-operator">{'}'}</span>
                                        <span className="text-vscode-keyword">from</span>
                                        <span className="text-vscode-string">"@app/core"</span>
                                        <span className="text-vscode-fg">;</span>
                                    </div>
                                    <div className="text-vscode-comment text-xs mb-2">// Select a payment provider to inject:</div>
                                    <PaymentSelector selected={selectedMethod} onSelect={handleMethodSelect} />
                                </div>
                            </div>
                         )}

                         {step === 1 && selectedMethod && (
                            <div className="animate-fade-in max-w-3xl">
                                <button 
                                    onClick={handleBack}
                                    className="mb-6 flex items-center gap-2 text-vscode-comment hover:text-vscode-fg transition-colors group"
                                >
                                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-vscode-function"/>
                                    <span className="font-bold">^BACK^</span>
                                </button>

                                <div className="text-vscode-comment mb-2 flex gap-2">
                                    <span># LOADED: {selectedMethod.toUpperCase()}_CONFIG</span>
                                    <span className="text-yellow-500">[PRIVATE]</span>
                                </div>
                                <div className="bg-[#1a1b26] rounded-lg border border-vscode-border p-1">
                                    <PaymentDetails method={selectedMethod} onConfirm={() => setStep(2)} />
                                </div>
                            </div>
                         )}

                         {step === 2 && selectedMethod && (
                             <div className="animate-fade-in max-w-3xl">
                                <button 
                                    onClick={handleBack}
                                    className="mb-6 flex items-center gap-2 text-vscode-comment hover:text-vscode-fg transition-colors group"
                                >
                                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-vscode-tag"/>
                                    <span className="font-bold text-vscode-tag">^BACK^</span>
                                    <span className="text-xs">(cancel process)</span>
                                </button>

                                <div className="bg-black/30 border border-vscode-border rounded-lg p-4 font-mono">
                                    <div className="flex items-center gap-2 mb-4 border-b border-vscode-border pb-2">
                                        <Terminal size={14} className="text-vscode-fg" />
                                        <span className="text-xs font-bold">VERIFIKASI_PEMBAYARAN()</span>
                                    </div>
                                    <UploadForm 
                                        method={selectedMethod} 
                                        onSuccess={(name) => {
                                            setPurchasedProduct(name);
                                            setStep(3);
                                        }} 
                                    />
                                </div>
                             </div>
                         )}

                         {step === 3 && (
                             <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in relative">
                                <div className="absolute inset-0 bg-green-500/5 blur-3xl pointer-events-none"></div>
                                <div className="bg-vscode-sidebar p-8 rounded-xl border border-green-500/30 shadow-[0_0_50px_rgba(74,222,128,0.1)] max-w-lg w-full relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-scan"></div>
                                    
                                    <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50 group-hover:scale-110 transition-transform">
                                        <CheckCheck size={32} className="text-green-400" />
                                    </div>
                                    
                                    <h2 className="text-2xl font-bold text-white mb-2">SUCCESSFULLY</h2>
                                    <p className="text-vscode-comment mb-6 text-xs">Proof of transaction has been sent. Thank you for transacting with me!</p>
                                    
                                    <div className="bg-black/40 rounded p-4 text-left font-mono text-xs mb-8 border-l-2 border-green-500">
                                        <div className="flex gap-4"><span className="text-vscode-comment w-20">Time:</span> <span className="text-vscode-fg">{new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</span></div>
                                        <div className="flex gap-4"><span className="text-vscode-comment w-20">Product:</span> <span className="text-vscode-keyword">{purchasedProduct}</span></div>
                                        <div className="flex gap-4"><span className="text-vscode-comment w-20">Status:</span> <span className="text-green-400">Success</span></div>
                                    </div>

                                    <button onClick={() => {setStep(0); setSelectedMethod(null); setPurchasedProduct('-');}} className="w-full bg-vscode-function hover:bg-blue-600 text-white py-3 rounded font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2">
                                        <Code2 size={14} />
                                        NEW_TRANSACTION()
                                    </button>
                                </div>
                             </div>
                         )}
                    </div>

                    <Minimap />
                </div>
            </div>
        </div>

        {/* Status Bar */}
        <div className="h-6 bg-vscode-function text-[#15161e] text-[11px] flex items-center justify-between px-3 select-none font-bold shrink-0 z-20">
            <div className="flex items-center gap-3">
                <div className="bg-[#15161e]/20 px-2 h-full flex items-center gap-1 cursor-pointer hover:bg-[#15161e]/30">
                    <GitGraph size={12} />
                    <span>main</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-white">
                    <AlertCircle size={12} />
                    <span>0</span>
                    <span className="text-[#15161e]/70">0</span>
                </div>
            </div>
            <div className="flex items-center gap-4 cursor-pointer">
                <span className="hidden sm:inline">Ln {step * 24 + 12}, Col 45</span>
                <span>UTF-8</span>
                <span>JavaScript</span>
                <div className="bg-[#15161e]/20 px-2 h-full flex items-center hover:bg-[#15161e]/30">
                    <Volume2 size={12} />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default App;