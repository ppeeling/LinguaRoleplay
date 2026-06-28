import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: ReactNode;
  title: string;
  onBack?: () => void;
  className?: string;
}

export function Layout({ children, title, onBack, className }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] flex flex-col font-sans">
      <header className="border-b border-[#222] bg-[#0F0F0F] sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center gap-4">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 text-[#888] hover:text-[#D4AF37] hover:bg-[#1a1a1a] rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          {!onBack && (
            <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center text-black font-bold text-lg">L</div>
          )}
          <h1 className="text-xl font-serif italic tracking-wide text-[#D4AF37]">{title}</h1>
          <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-[#1a1a1a] rounded text-xs border border-[#333]">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-emerald-500 font-mono hidden sm:inline">OFFLINE READY</span>
          </div>
        </div>
      </header>
      <main className={cn("flex-1 max-w-md w-full mx-auto p-4 flex flex-col", className)}>
        {children}
      </main>
    </div>
  );
}
