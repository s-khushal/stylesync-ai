import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />,
    info: <Info className="w-5 h-5 text-[#8C533E] shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-200 bg-[#F4F9F5] text-emerald-950',
    error: 'border-rose-200 bg-[#FDF2F2] text-rose-950',
    info: 'border-[#E2D8CC] bg-[#FAF6F0] text-[#2C241D]'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle shadow-xl max-w-sm">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${borderColors[toast.type]} shadow-lg backdrop-blur-sm`}>
        {icons[toast.type]}
        <p className="text-sm font-medium leading-snug">{toast.text}</p>
      </div>
    </div>
  );
};
