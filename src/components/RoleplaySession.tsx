import React, { useState, useEffect, useRef } from 'react';
import { Play, Volume2, Eye, EyeOff, Send, CheckCircle2, XCircle } from 'lucide-react';
import { RoleplayScenario } from '../types';
import { useTTS } from '../hooks/useTTS';
import { db } from '../db/db';
import { calculateNextReview } from '../lib/srs';

interface RoleplaySessionProps {
  scenario: RoleplayScenario;
  onClose: () => void;
}

export function RoleplaySession({ scenario, onClose }: RoleplaySessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [userDraft, setUserDraft] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  
  const { play, stop, isPlaying } = useTTS(scenario.language);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentLine = scenario.lines[currentIndex];

  useEffect(() => {
    // Scroll to bottom when index changes
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Auto-play bot audio (might be blocked by browser without user interaction initially)
    if (!isFinished && currentLine && currentLine.speaker === 'bot') {
      setShowTranscript(false);
      // Slight delay to ensure smooth transition
      const timer = setTimeout(() => {
        play(currentLine.text);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isFinished, currentLine, play]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => stop();
  }, [stop]);

  const handleNext = () => {
    stop();
    if (currentIndex < scenario.lines.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserDraft('');
    } else {
      setIsFinished(true);
    }
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userDraft.trim() === '') return;
    handleNext();
  };

  const handleScore = async (score: 'pass' | 'fail') => {
    const existing = await db.progress.get(scenario.id);
    const updated = calculateNextReview(existing || {}, score);
    
    await db.progress.put({
      ...updated,
      scenarioId: scenario.id,
      language: scenario.language
    });
    
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-[#050505]">
      <div className="mb-8 flex-shrink-0">
        <span className="text-[#D4AF37] text-[10px] font-mono tracking-wider uppercase">SCENARIO: {scenario.level}</span>
        <h2 className="font-serif italic text-2xl sm:text-3xl text-[#EEE] mt-1">{scenario.title}</h2>
        <p className="text-sm text-[#666] mt-2">{scenario.context}</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-4 space-y-4">
        {scenario.lines.slice(0, currentIndex).map((line, idx) => (
          <div 
            key={line.id} 
            className={`flex flex-col w-full ${line.speaker === 'user' ? 'items-end' : 'items-start'}`}
          >
            {line.speaker === 'user' ? (
              <div className="flex flex-col items-end w-full max-w-[90%]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] text-[#888] font-mono">YOU (USER)</span>
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[10px] text-black font-bold">U</div>
                </div>
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-4 sm:p-6 rounded-2xl rounded-tr-none relative group w-full text-right">
                  <p className="text-lg sm:text-2xl font-serif text-[#EEE]">{line.text}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start w-full max-w-[90%]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[10px] text-[#D4AF37]">A1</div>
                  <span className="text-[10px] text-[#888] font-mono">VENDOR</span>
                </div>
                <div className="bg-[#111] border border-[#222] p-4 sm:p-6 rounded-2xl rounded-tl-none relative group w-full">
                  <p className="text-lg sm:text-2xl font-serif text-[#EEE]">{line.text}</p>
                  <p className="text-sm text-[#666] italic mt-2 font-serif">"{line.translation}"</p>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {!isFinished && currentLine && (
          <div className={`flex flex-col w-full ${currentLine.speaker === 'user' ? 'items-end' : 'items-start'}`}>
            {currentLine.speaker === 'user' ? (
              <div className="flex flex-col items-end w-full max-w-[90%]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] text-[#888] font-mono">YOU (USER)</span>
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[10px] text-black font-bold">U</div>
                </div>
                <div className="w-full mt-2">
                  <div className="text-right mb-4">
                    <p className="text-[10px] font-mono uppercase text-[#666] tracking-wider mb-1">Target Response</p>
                    <p className="text-sm text-[#888] italic font-serif">"{currentLine.translation}"</p>
                    {currentLine.hint && (
                      <p className="text-xs text-[#555] mt-1 font-mono">Hint: {currentLine.hint}</p>
                    )}
                  </div>
                  
                  <form onSubmit={handleUserSubmit} className="flex flex-col items-end w-full gap-4">
                    <input
                      type="text"
                      autoFocus
                      value={userDraft}
                      onChange={e => setUserDraft(e.target.value)}
                      placeholder={`Type in ${scenario.language}...`}
                      className="w-full bg-transparent border-b-2 border-[#333] focus:border-[#D4AF37] outline-none text-lg py-2 text-right font-serif text-[#EEE] placeholder:text-[#444]"
                    />
                    <button
                      type="submit"
                      disabled={!userDraft.trim()}
                      className="px-6 py-2 bg-[#D4AF37] text-black rounded text-sm font-mono uppercase tracking-wider font-bold hover:bg-[#b5952f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send size={16} /> Send
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start w-full max-w-[90%]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[10px] text-[#D4AF37]">A1</div>
                  <span className="text-[10px] text-[#888] font-mono">VENDOR</span>
                </div>
                <div className="bg-[#111] border border-[#222] p-4 sm:p-6 rounded-2xl rounded-tl-none relative group w-full">
                  <div className="flex items-center gap-3 cursor-pointer text-[#888] hover:text-[#D4AF37] mb-3" onClick={() => play(currentLine.text)}>
                    {isPlaying ? <Volume2 size={24} className="animate-pulse text-[#D4AF37]" /> : <Play size={24} />}
                    <span className="text-sm font-mono">{isPlaying ? '[ Audio Playing... ]' : '[ Play Audio ]'}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <button 
                      onClick={() => setShowTranscript(!showTranscript)}
                      className="text-xs font-mono text-[#555] hover:text-[#888] transition-colors uppercase tracking-wider"
                    >
                      {showTranscript ? '[ Hide transcript ]' : '[ Show transcript ]'}
                    </button>
                  </div>

                  {showTranscript && (
                    <div className="pt-4 border-t border-[#222]">
                      <p className="text-lg sm:text-2xl font-serif text-[#EEE] mb-1">{currentLine.text}</p>
                      <p className="text-sm text-[#666] italic font-serif">"{currentLine.translation}"</p>
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t border-[#222] flex justify-end">
                    <button 
                      onClick={handleNext}
                      className="px-6 py-2 bg-[#1a1a1a] text-[#888] border border-[#333] rounded hover:bg-[#222] hover:text-[#EEE] text-sm font-mono uppercase tracking-wider transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {isFinished && (
          <footer className="mt-8 pt-6 border-t border-[#1a1a1a] flex flex-col items-center gap-4">
            <h3 className="text-xl font-serif italic text-[#EEE] mb-2">Scenario Complete!</h3>
            <p className="text-[10px] uppercase text-[#444] tracking-[0.3em]">Self-Score Result</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 bg-[#111] p-1 rounded-lg border border-[#222]">
              <button 
                onClick={() => handleScore('fail')}
                className="px-10 py-3 rounded text-red-500 font-bold font-mono text-sm uppercase tracking-wider hover:bg-red-500/10 transition-colors flex items-center gap-2 justify-center"
              >
                <XCircle size={16} /> Fail
              </button>
              <button 
                onClick={() => handleScore('pass')}
                className="px-10 py-3 rounded bg-[#D4AF37] text-black font-bold font-mono text-sm uppercase tracking-wider hover:bg-[#b5952f] transition-colors flex items-center gap-2 justify-center"
              >
                <CheckCircle2 size={16} /> Pass / Next
              </button>
            </div>
          </footer>
        )}
        
        <div ref={chatEndRef} className="h-4" />
      </div>
    </div>
  );
}
