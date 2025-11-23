import React from 'react';
import { SUPPORT_TIERS } from '../constants';
import { SupportTier } from '../types';

interface Props {
  selected: SupportTier | null;
  onSelect: (tier: SupportTier) => void;
}

export const SupportTierSelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-1 gap-3 mb-8">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block text-center">
        Pilih Dukungan
      </label>
      <div className="grid grid-cols-3 gap-2">
        {SUPPORT_TIERS.map((tier) => {
            const isSelected = selected?.id === tier.id;
            return (
                <button
                    key={tier.id}
                    onClick={() => onSelect(tier)}
                    className={`relative p-3 rounded-xl border transition-all duration-300 flex flex-col items-center text-center group overflow-hidden
                    ${isSelected 
                        ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]' 
                        : 'bg-slate-800/40 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                >
                    <span className="text-2xl mb-1 filter drop-shadow-lg transition-transform group-hover:scale-110 duration-300 block">{tier.emoji}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isSelected ? 'text-indigo-300' : 'text-slate-400'}`}>
                        {tier.label}
                    </span>
                    <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(tier.price)}
                    </span>
                    
                    {isSelected && (
                        <div className="absolute inset-0 border-2 border-indigo-500 rounded-xl animate-pulse"></div>
                    )}
                </button>
            )
        })}
      </div>
      {selected && (
        <div className="text-center text-xs text-indigo-300 bg-indigo-950/30 py-2 rounded-lg border border-indigo-500/20 animate-fade-in-up">
            "{selected.description}"
        </div>
      )}
    </div>
  );
};