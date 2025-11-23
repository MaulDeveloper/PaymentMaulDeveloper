import React, { useState } from 'react';
import { PaymentMethod } from '../types';
import { DANA_DETAILS, QRIS_IMAGE_URL } from '../constants';
import { Copy, Check, Eye, EyeOff, Download, Activity, ShieldCheck, Cpu, Scan } from 'lucide-react';

interface Props {
  method: PaymentMethod;
  onConfirm: () => void;
}

export const PaymentDetails: React.FC<Props> = ({ method, onConfirm }) => {
  const [copied, setCopied] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(DANA_DETAILS.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = async () => {
    setIsDownloading(true);
    try {
      // Fetch the image as a blob to force download
      const response = await fetch(QRIS_IMAGE_URL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'QRIS_PAYMENT.jpg'; // Name of the downloaded file
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed, falling back to direct link", error);
      // Fallback: open in new tab if fetch fails (CORS issues etc)
      const link = document.createElement('a');
      link.href = QRIS_IMAGE_URL;
      link.download = 'QRIS_PAYMENT.jpg';
      link.target = '_blank';
      link.click();
    } finally {
      setIsDownloading(false);
    }
  };

  if (method === PaymentMethod.DANA) {
    return (
        <div className="p-4 font-mono text-xs sm:text-sm">
            <div className="text-vscode-comment mb-4 text-[10px] flex items-center gap-2">
                 <span>// .env.production - Payment Gateway Configuration</span>
            </div>

            <div className="flex flex-col gap-3 pl-4 border-l border-vscode-border ml-1">
                
                {/* Config Object Structure */}
                <div className="group flex flex-wrap sm:flex-nowrap items-center gap-x-2">
                    <span className="text-vscode-keyword">export const</span>
                    <span className="text-vscode-class">DanaConfig</span>
                    <span className="text-vscode-operator">=</span>
                    <span className="text-vscode-keyword">{'{'}</span>
                </div>

                <div className="pl-4 flex flex-col gap-2 border-l border-vscode-border/30 ml-1">
                    {/* Provider */}
                    <div className="flex items-center gap-2 hover:bg-white/5 rounded px-1 -ml-1 transition-colors">
                        <span className="text-vscode-fg min-w-[80px]">provider:</span>
                        <span className="text-vscode-string">"DANA_WALLET"</span>
                        <span className="text-vscode-fg">,</span>
                    </div>

                    {/* Number (Secret) */}
                    <div className="flex items-center gap-2 py-0.5 hover:bg-white/5 rounded px-1 -ml-1 transition-colors">
                        <span className="text-vscode-fg min-w-[80px]">account:</span>
                        <div className="flex items-center gap-2 bg-black/30 px-2 py-0.5 rounded border border-vscode-border border-dashed">
                             <span className={`text-vscode-number font-bold tracking-wider ${showNumber ? '' : 'blur-[3px]'}`}>
                                 {showNumber ? DANA_DETAILS.number : '0881••••••••'}
                             </span>
                             
                             {/* Inline Actions */}
                             <div className="flex items-center gap-3 ml-2 pl-2 border-l border-vscode-border/50">
                                 <button 
                                    onClick={() => setShowNumber(!showNumber)} 
                                    className="text-vscode-comment hover:text-vscode-fg transition-colors" 
                                    title={showNumber ? "Hide" : "Reveal"}
                                 >
                                     {showNumber ? <EyeOff size={12}/> : <Eye size={12}/>}
                                 </button>
                                 <button 
                                    onClick={handleCopy} 
                                    className={`flex items-center gap-1 transition-colors font-bold ${copied ? 'text-green-400' : 'text-vscode-comment hover:text-green-400'}`}
                                    title="Copy Value"
                                 >
                                     {copied ? <span>COPIED</span> : <span>COPY</span>}
                                 </button>
                             </div>
                        </div>
                        <span className="text-vscode-fg">,</span>
                    </div>

                    {/* Name */}
                    <div className="flex items-center gap-2 hover:bg-white/5 rounded px-1 -ml-1 transition-colors">
                        <span className="text-vscode-fg min-w-[80px]">owner:</span>
                        <span className="text-vscode-string">"{DANA_DETAILS.name}"</span>
                        <span className="text-vscode-comment">// Verified</span>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2 hover:bg-white/5 rounded px-1 -ml-1 transition-colors">
                        <span className="text-vscode-fg min-w-[80px]">status:</span>
                        <span className="text-vscode-keyword">true</span>
                        <span className="text-vscode-fg">,</span>
                    </div>
                </div>

                <div><span className="text-vscode-keyword">{'}'}</span><span className="text-vscode-fg">;</span></div>
            </div>
            
            <div className="mt-8">
                <button onClick={onConfirm} className="group bg-vscode-function text-vscode-bg font-bold px-6 py-3 rounded-sm hover:brightness-110 text-xs w-full flex items-center justify-center gap-2 transition-all shadow-[0_4px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[2px]">
                    <Cpu size={14} className="group-hover:animate-spin"/>
                    <span>VERIFY_PEMBAYARAN()</span>
                </button>
            </div>
        </div>
    )
  }

  // QRIS SECTION - CYBER SECURITY SCANNER THEME
  return (
    <div className="p-4 font-mono text-xs">
        <div className="flex items-center justify-between mb-4 border-b border-vscode-border pb-2">
            <div className="flex items-center gap-2 text-vscode-string">
                <Scan size={14} className="animate-pulse"/>
                <span className="font-bold">SCANNER_CODE_QRIS</span>
            </div>
            <div className="flex gap-2 text-[10px]">
                 <span className="text-vscode-comment">PORT: 443</span>
                 <span className="text-green-500">SECURE</span>
            </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
            {/* QR Visualization */}
            <div className="relative group mx-auto md:mx-0 shrink-0">
                {/* Corner Brackets */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-vscode-function z-20"></div>
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-vscode-function z-20"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-vscode-function z-20"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-vscode-function z-20"></div>

                <div className="relative w-48 h-48 bg-white p-2 rounded-sm overflow-hidden border border-vscode-border/50">
                    <img 
                        src={QRIS_IMAGE_URL} 
                        alt="QRIS" 
                        className="w-full h-full object-contain relative z-10 mix-blend-multiply"
                        crossOrigin="anonymous" 
                    />
                    
                    {/* Cyber Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] z-10 pointer-events-none"></div>
                    
                    {/* Laser Scan Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-500/80 shadow-[0_0_20px_rgba(34,197,94,1)] animate-scan z-30"></div>
                </div>

                {/* Hex Data Side Decoration */}
                <div className="absolute top-0 -right-6 h-full flex flex-col justify-between text-[8px] text-vscode-comment opacity-50 select-none font-mono">
                    <div>0x4F</div>
                    <div>0xA2</div>
                    <div>0x1B</div>
                    <div>0x9C</div>
                    <div>0xD4</div>
                </div>
            </div>

            {/* System Logs & Controls */}
            <div className="flex-1 flex flex-col w-full">
                <div className="bg-[#0f0f14] border border-vscode-border rounded p-3 mb-3 font-mono text-[11px] relative overflow-hidden hidden sm:block">
                    <div className="absolute top-0 left-0 w-1 h-full bg-vscode-function"></div>
                    <div className="space-y-1 opacity-90">
                        <div className="flex gap-2"><span className="text-vscode-comment">00:01</span> <span className="text-vscode-function">INITIALIZING_CAMERA_STREAM...</span></div>
                        <div className="flex gap-2"><span className="text-vscode-comment">00:02</span> <span className="text-vscode-fg">TARGET_FOUND:</span> <span className="text-vscode-string">"QR_CODE_MATRIX"</span></div>
                        <div className="flex gap-2"><span className="text-vscode-comment">00:03</span> <span className="text-vscode-keyword">DECODING_PAYLOAD...</span> <span className="animate-pulse">_</span></div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                     <div className="grid grid-cols-2 gap-2 mb-4 text-[10px]">
                         <div className="bg-vscode-bg border border-vscode-border p-2 rounded">
                             <div className="text-vscode-comment">NMID</div>
                             <div className="text-vscode-number">ID1024361924573 A01</div>
                         </div>
                         <div className="bg-vscode-bg border border-vscode-border p-2 rounded">
                             <div className="text-vscode-comment">MERCHANT</div>
                             <div className="text-vscode-string">"MAUL STORE"</div>
                         </div>
                     </div>

                    <div className="flex flex-col gap-2 mt-auto">
                        <button 
                            onClick={handleDownloadQR}
                            disabled={isDownloading}
                            className="group w-full border border-vscode-function/30 hover:bg-vscode-function/10 text-vscode-function py-2 rounded text-xs font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isDownloading ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : (
                                <Download size={14} className="group-hover:translate-y-0.5 transition-transform"/>
                            )}
                            <span>{isDownloading ? 'DOWNLOADING...' : 'download_buffer(.jpg)'}</span>
                        </button>

                        <button onClick={onConfirm} className="w-full bg-vscode-function text-vscode-bg py-2.5 rounded font-bold text-xs hover:brightness-110 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10">
                            <ShieldCheck size={14} />
                            <span>VERIFY_PEMBAYARAN()</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

// Import Loader2 locally or ensure it is available inlucide-react imports
import { Loader2 } from 'lucide-react';
