import React, { useState, useRef } from 'react';
import { PaymentMethod } from '../types';
import { sendProofToTelegram } from '../services/telegramService';
import { Loader2, FileCode, Terminal } from 'lucide-react';

interface Props {
  method: PaymentMethod;
  onSuccess: (productName: string) => void;
}

// Input component to prevent re-render focus loss
const CliInput = ({ 
  arg, 
  value, 
  onChange, 
  placeholder, 
  type = "text", 
  autoFocus = false,
  required = false
}: any) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 group">
      <div className="min-w-[120px] shrink-0 flex items-center gap-2">
        <span className="text-vscode-comment hidden sm:inline">$</span>
        <span className="text-vscode-keyword">{arg}</span>
      </div>
      <div className="flex items-center flex-1 relative">
         <span className="text-vscode-operator mr-2">=</span>
         <span className="text-vscode-string">"</span>
         <input 
            className="bg-transparent border-none outline-none text-vscode-string w-full placeholder-vscode-comment/30 p-0 text-sm font-mono h-6 focus:bg-white/5 transition-colors rounded px-1"
            placeholder={placeholder}
            value={value}
            type={type}
            onChange={onChange}
            autoFocus={autoFocus}
            autoComplete="off"
         />
         <span className="text-vscode-string">"</span>
         {/* Blinking Cursor effect when active (simulated by CSS on focus ideally, but simple here) */}
      </div>
  </div>
);

export const UploadForm: React.FC<Props> = ({ method, onSuccess }) => {
  const [productName, setProductName] = useState('');
  const [nominal, setNominal] = useState('');
  const [note, setNote] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!file || !productName || !nominal) {
        // Shake effect or alert
        alert("[ERROR] Missing required arguments.");
        return;
    }
    setIsSubmitting(true);
    try {
      await sendProofToTelegram(file, note, productName, nominal, method);
      onSuccess(productName);
    } catch (e) {
      alert("[FATAL] Network request failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-vscode-fg font-mono text-xs sm:text-sm">
        <div className="mb-4 pb-2 border-b border-vscode-border flex items-center gap-2 text-vscode-comment">
            <Terminal size={12} />
            <span>User Input Stream</span>
        </div>
        
        <div className="flex flex-col gap-3 mb-6">
            <CliInput 
                arg="--product" 
                value={productName} 
                onChange={(e: any) => setProductName(e.target.value)}
                placeholder="Contoh ( SCRIPT BUG )"
                autoFocus={true}
            />

            <CliInput 
                arg="--amount" 
                value={nominal} 
                onChange={(e: any) => setNominal(e.target.value)}
                placeholder="Contoh ( 20.000 )"
                type="number"
            />

            <CliInput 
                arg="--name" 
                value={note} 
                onChange={(e: any) => setNote(e.target.value)}
                placeholder="Contoh ( MAUL GANTENG )"
            />

            {/* File Input */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 group mt-2">
                <div className="min-w-[120px] shrink-0 flex items-center gap-2">
                    <span className="text-vscode-comment hidden sm:inline">$</span>
                    <span className="text-vscode-keyword">--attachment</span>
                </div>
                <div className="flex items-center flex-1 relative">
                    <span className="text-vscode-operator mr-2">=</span>
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded border border-dashed hover:border-solid transition-all w-full sm:w-auto
                        ${file ? 'border-green-500/50 bg-green-500/10 text-green-400' : 'border-vscode-comment text-vscode-comment hover:text-vscode-fg hover:border-vscode-fg'}`}
                    >
                        <FileCode size={14} />
                        <span>{file ? file.name : "Select_File.jpg/png"}</span>
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => e.target.files && setFile(e.target.files[0])} accept="image/*" />
                </div>
            </div>
        </div>

        <div className="flex items-center gap-2">
            <span className="text-green-500">➜</span>
            <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`group relative px-6 py-2 bg-vscode-function text-vscode-bg font-bold hover:bg-blue-400 transition-all flex items-center gap-2 rounded-sm
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isSubmitting && <Loader2 size={14} className="animate-spin"/>}
                <span>{isSubmitting ? 'EXECUTING...' : 'KIRIM BUKTI TRANSAKSI'}</span>
                
                {/* Glitch effect overlay could go here */}
            </button>
        </div>
    </div>
  );
};