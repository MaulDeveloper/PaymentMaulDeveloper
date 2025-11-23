import React from 'react';
import { PaymentMethod } from '../types';
import { Download, Box, ArrowRight } from 'lucide-react';

interface Props {
  selected: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
}

export const PaymentSelector: React.FC<Props> = ({ selected, onSelect }) => {
  
  const MethodButton = ({ method, label, title, description }: { method: PaymentMethod, label: string, title: string, description: string }) => (
      <div 
        onClick={() => onSelect(method)}
        className={`cursor-pointer group relative p-3 rounded border transition-all duration-200 overflow-hidden
        ${selected === method 
            ? 'bg-vscode-selection/40 border-vscode-function shadow-[0_0_15px_rgba(122,162,247,0.1)]' 
            : 'bg-[#16161e] border-vscode-border hover:border-vscode-comment'
        }`}
      >
         {/* Loading Bar Animation on Hover */}
         <div className="absolute bottom-0 left-0 h-0.5 bg-vscode-function transition-all duration-1000 w-0 group-hover:w-full"></div>

         <div className="flex items-start justify-between mb-1">
             <div className="flex items-center gap-2">
                 <Box size={14} className={`${selected === method ? 'text-vscode-function' : 'text-vscode-keyword'}`} />
                 <span className="font-bold text-sm text-vscode-fg">{label}</span>
             </div>
             <span className="text-[10px] text-vscode-comment bg-vscode-bg px-1.5 rounded border border-vscode-border">{title}</span>
         </div>
         
         <div className="text-[11px] text-vscode-comment mb-3 pl-6">{description}</div>

         <div className="flex items-center gap-2 pl-6">
             <div className="text-[10px] font-mono bg-black/30 px-2 py-1 rounded text-vscode-string flex items-center gap-2">
                 <span className="text-vscode-fg">$</span> npm install <span className="text-vscode-function">{method}</span>
             </div>
             {selected === method && <ArrowRight size={12} className="text-vscode-function animate-pulse"/>}
         </div>
      </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
      <MethodButton 
        method={PaymentMethod.DANA} 
        label="@wallet/dana" 
        title="DANA" 
        description="Seamless digital wallet integration for instant transfers."
      />
      <MethodButton 
        method={PaymentMethod.QRIS} 
        label="@scan/qris" 
        title="QRIS" 
        description="Universal QR code standard for standardized payments."
      />
    </div>
  );
};