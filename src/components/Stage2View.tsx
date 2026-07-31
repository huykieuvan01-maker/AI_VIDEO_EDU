import React, { useState, useEffect, useRef } from 'react';
import { Stage1To3Data } from '../types';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, ShieldAlert, CheckCircle2, Lock, 
  ArrowRight, Sparkles, MessageSquare, MonitorPlay, HelpCircle, Presentation,
  BookOpen, List, Cpu
} from 'lucide-react';
import { exportToPPTX, isExportAvailable } from '../utils/exportServices';

interface Props {
  data: Stage1To3Data;
  onProceedToStage3: () => void;
  isStage3Unlocked: boolean;
  setIsStage3Unlocked: (unlocked: boolean) => void;
}

// Simulated SVG-based Animated Robot Teacher
const RobotTeacher: React.FC<{ isSpeaking: boolean; tab: 'lecture' | 'quiz' | 'practice'; currentStep: number }> = ({ isSpeaking, tab, currentStep }) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 bg-black/40 border border-white/10 rounded-2xl shadow-xl w-full max-w-[130px] mx-auto text-center space-y-2 animate-fadeIn shrink-0">
      <div className="relative">
        <svg className="w-16 h-16 md:w-20 md:h-20 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Antenna */}
          <rect x="47" y="10" width="6" height="15" fill="#a1a1aa" />
          <circle cx="50" cy="8" r="6" fill={isSpeaking ? '#22d3ee' : '#71717a'} className={isSpeaking ? 'animate-pulse' : ''} />
          
          {/* Ears */}
          <rect x="18" y="40" width="8" height="20" rx="3" fill="#71717a" />
          <rect x="74" y="40" width="8" height="20" rx="3" fill="#71717a" />
          
          {/* Head base */}
          <rect x="24" y="25" width="52" height="50" rx="12" fill="#3f3f46" stroke="#52525b" strokeWidth="3" />
          
          {/* Screen / Face */}
          <rect x="30" y="33" width="40" height="28" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
          
          {/* Eyes (Led cyan) */}
          <circle cx="42" cy="45" r="4" fill="#22d3ee" className={isSpeaking ? 'animate-bounce' : ''} />
          <circle cx="58" cy="45" r="4" fill="#22d3ee" className={isSpeaking ? 'animate-bounce' : ''} />
          
          {/* Mouth / LED Wave */}
          {isSpeaking ? (
            <path d="M 38 54 Q 44 58 50 54 T 62 54" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" fill="none" className="animate-pulse" />
          ) : (
            <line x1="38" y1="54" x2="62" y2="54" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" />
          )}
          
          {/* Body neck */}
          <rect x="44" y="75" width="12" height="10" fill="#27272a" />
          {/* Collar */}
          <path d="M 35 85 L 65 85 L 50 95 Z" fill="#52525b" />
        </svg>
      </div>
      <div className="space-y-0.5">
        <span className="text-[10px] font-bold text-cyan-300 block font-mono">ROBOT AI TEACHER</span>
        <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono ${isSpeaking ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-zinc-800 text-zinc-400'}`}>
          {isSpeaking ? 'ĐANG GIẢNG' : 'TẠM DỪNG'}
        </span>
      </div>
    </div>
  );
};

// Hand-drawn Chalk Illustration Sketches
const ChalkSketch: React.FC<{ type: 'house' | 'calculator' | 'chart' | 'award' }> = ({ type }) => {
  if (type === 'house') {
    return (
      <svg className="w-16 h-16 md:w-24 md:h-24 opacity-90 text-cyan-300 drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3">
        {/* Roof */}
        <path d="M 15 50 L 50 15 L 85 50" />
        {/* Walls */}
        <path d="M 23 48 L 23 85 L 77 85 L 77 48" />
        {/* Door */}
        <path d="M 43 85 L 43 62 L 57 62 L 57 85" />
        {/* Windows */}
        <rect x="30" y="38" width="10" height="10" />
        <rect x="60" y="38" width="10" height="10" />
        {/* Chimney */}
        <path d="M 68 31 L 68 22 L 74 22 L 74 38" />
        {/* Smoke */}
        <path d="M 76 18 Q 78 12 84 16" />
      </svg>
    );
  }
  
  if (type === 'calculator') {
    return (
      <svg className="w-16 h-16 md:w-24 md:h-24 opacity-90 text-amber-200 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3">
        <rect x="25" y="15" width="50" height="70" rx="8" />
        <rect x="32" y="23" width="36" height="16" rx="3" />
        <line x1="36" y1="31" x2="64" y2="31" strokeWidth="3" />
        <circle cx="37" cy="48" r="4" />
        <circle cx="50" cy="48" r="4" />
        <circle cx="63" cy="48" r="4" />
        <circle cx="37" cy="60" r="4" />
        <circle cx="50" cy="60" r="4" />
        <circle cx="63" cy="60" r="4" />
        <circle cx="37" cy="72" r="4" />
        <circle cx="50" cy="72" r="4" />
        <circle cx="63" cy="72" r="4" />
      </svg>
    );
  }
  
  if (type === 'chart') {
    return (
      <svg className="w-16 h-16 md:w-24 md:h-24 opacity-90 text-emerald-300 drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3">
        <line x1="15" y1="85" x2="85" y2="85" />
        <line x1="15" y1="15" x2="15" y2="85" />
        <rect x="23" y="55" width="10" height="30" />
        <rect x="38" y="35" width="10" height="50" />
        <rect x="53" y="45" width="10" height="40" />
        <rect x="68" y="20" width="10" height="65" />
        <path d="M 28 50 L 43 30 L 58 40 L 73 15" strokeWidth="3" strokeDasharray="none" />
      </svg>
    );
  }
  
  return (
    <svg className="w-16 h-16 md:w-24 md:h-24 opacity-90 text-yellow-300 drop-shadow-[0_0_4px_rgba(253,224,71,0.5)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3">
      <path d="M 30 20 L 70 20 L 70 45 C 70 58 58 70 50 70 C 42 70 30 58 30 45 Z" />
      <path d="M 30 28 C 22 28 22 40 30 40" />
      <path d="M 70 28 C 78 28 78 40 70 40" />
      <line x1="50" y1="70" x2="50" y2="82" strokeWidth="4" />
      <path d="M 35 82 L 65 82 L 60 90 L 40 90 Z" />
    </svg>
  );
};

export const Stage2View: React.FC<Props> = ({
  data,
  onProceedToStage3,
  isStage3Unlocked,
  setIsStage3Unlocked,
}) => {
  const [activeTab, setActiveTab] = useState<'lecture' | 'quiz' | 'practice'>('lecture');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  
  // Quiz State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Practice State
  const [selectedExerciseTier, setSelectedExerciseTier] = useState<'+10%' | '+20%' | '+30%'>('+10%');
  const [showHint, setShowHint] = useState<boolean>(false);

  const script = data.videoScript || [];
  const currentTurn = script[currentTurnIndex] || script[0];
  const logicSteps = data.logicSteps || [];

  // Typewriter effect state
  const [displayedGraphicNote, setDisplayedGraphicNote] = useState<string>('');
  
  // Speech synthesis reference
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speakTurnText = (text: string, onEndCallback: () => void) => {
    if (isMuted || !synthRef.current) {
      onEndCallback();
      return;
    }
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.9 * playbackSpeed;

    utterance.onend = () => {
      onEndCallback();
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis error or interrupted:", e);
      if (e.error !== 'interrupted') {
        onEndCallback();
      }
    };

    synthRef.current.speak(utterance);
  };

  // Playback loop
  useEffect(() => {
    let fallbackTimer: any = null;
    let isTransitioned = false;

    const transitionToNext = () => {
      if (isTransitioned) return;
      isTransitioned = true;
      
      if (currentTurnIndex < script.length - 1) {
        setCurrentTurnIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false);
        setActiveTab('quiz');
      }
    };

    if (isPlaying && activeTab === 'lecture') {
      const wordCount = currentTurn?.speakerText ? currentTurn.speakerText.split(' ').length : 15;
      const calculatedDuration = Math.max(5000, (wordCount * 380) / playbackSpeed);

      if (!isMuted && synthRef.current) {
        speakTurnText(currentTurn.speakerText, () => {
          transitionToNext();
        });

        // Safety fallback timer in case utterance.onend fails to fire in some browsers
        fallbackTimer = setTimeout(() => {
          transitionToNext();
        }, calculatedDuration + 4000);
      } else {
        // Muted or no SpeechSynthesis support: transition strictly by time
        fallbackTimer = setTimeout(() => {
          transitionToNext();
        }, calculatedDuration);
      }
    } else {
      if (synthRef.current) synthRef.current.cancel();
    }

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [isPlaying, currentTurnIndex, isMuted, activeTab, playbackSpeed]);

  // Typewriter effect trigger
  useEffect(() => {
    if (!currentTurn || activeTab !== 'lecture') return;
    
    let i = 0;
    const fullText = currentTurn.motionGraphicNote || '';
    setDisplayedGraphicNote('');
    
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedGraphicNote(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [currentTurnIndex, activeTab]);

  const handlePlay = () => {
    setIsPlaying(true);
    setActiveTab('lecture');
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTurnIndex(0);
    if (synthRef.current) synthRef.current.cancel();
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    setQuizSubmitted(true);
    const correct = selectedOption === data.popupQuiz.correctAnswerIndex;
    setIsCorrect(correct);
    if (correct) {
      setIsStage3Unlocked(true);
    }
  };

  const currentExercise = data.exercises?.find(ex => ex.tier === selectedExerciseTier) || data.exercises?.[0];

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes bounce-bar-1 { 0%, 100% { height: 4px; } 50% { height: 20px; } }
        @keyframes bounce-bar-2 { 0%, 100% { height: 8px; } 50% { height: 26px; } }
        @keyframes bounce-bar-3 { 0%, 100% { height: 3px; } 50% { height: 16px; } }
        @keyframes bounce-bar-4 { 0%, 100% { height: 6px; } 50% { height: 30px; } }
        @keyframes bounce-bar-5 { 0%, 100% { height: 4px; } 50% { height: 22px; } }
        
        .visualizer-bar-1 { animation: bounce-bar-1 0.7s ease-in-out infinite alternate; }
        .visualizer-bar-2 { animation: bounce-bar-2 0.9s ease-in-out infinite alternate; }
        .visualizer-bar-3 { animation: bounce-bar-3 0.6s ease-in-out infinite alternate; }
        .visualizer-bar-4 { animation: bounce-bar-4 0.8s ease-in-out infinite alternate; }
        .visualizer-bar-5 { animation: bounce-bar-5 0.75s ease-in-out infinite alternate; }
        
        .chalkboard-grid {
          background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 25px 25px;
        }
      `}</style>

      {/* Banner */}
      <div className="bg-gradient-to-r from-cyan-50 via-blue-50/50 to-white border border-cyan-200/80 rounded-2xl p-5 md:p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full bg-cyan-100 text-cyan-700 border border-cyan-200 text-xs font-bold uppercase tracking-wider">
                PHẦN 2: THIẾT KẾ TƯƠNG TÁC
              </span>
              <span className="text-xs text-slate-500">• Video Giảng Dạy & Luyện Tập Tương Tác</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-cyan-900">
              Video Giảng Dạy Tương Tác & Chốt Chặn Kiến Thức
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
              Giáo trình hoạt họa thông minh kết hợp lý thuyết và bài tập. Vượt qua Pop-up Quiz ngay trên bảng giảng dạy để tiếp tục.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {isExportAvailable() && (
              <button
                type="button"
                onClick={() => exportToPPTX(data, data.ocrData || 'Bài toán')}
                className="px-4 py-2 bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
              >
                <Presentation className="w-4 h-4 text-indigo-600" />
                <span>Tải Slide Bài Giảng (.pptx)</span>
              </button>
            )}

            <button
              disabled={!isStage3Unlocked}
              onClick={onProceedToStage3}
              className={`px-5 py-2.5 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all ${
                isStage3Unlocked
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 hover:scale-105'
                  : 'bg-slate-800 text-slate-500 border border-slate-700 opacity-60 cursor-not-allowed'
              }`}
            >
              {isStage3Unlocked ? (
                <>
                  <span>Tiến Sang Giai Đoạn 3 (Bảng Nháp)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-slate-400" />
                  <span>Cần Vượt Quiz Để Mở Giai Đoạn 3</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Column: Lesson Outline Syllabus */}
        <div className="xl:col-span-1 space-y-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <List className="w-4 h-4 text-cyan-600" />
              <span>Nội Dung Bài Học</span>
            </h3>
            
            <div className="space-y-2">
              {script.map((turn, idx) => {
                const isActive = activeTab === 'lecture' && currentTurnIndex === idx;
                const isCompleted = idx < currentTurnIndex;
                const step = logicSteps[idx];
                
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentTurnIndex(idx);
                      setActiveTab('lecture');
                      setIsPlaying(true);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-start gap-2.5 ${
                      isActive
                        ? 'bg-cyan-50 border-cyan-300 text-cyan-900 font-semibold shadow-sm'
                        : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${
                      isActive 
                        ? 'bg-cyan-600 text-white' 
                        : isCompleted 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold truncate">
                        {step?.title || `Phần giảng ${idx + 1}`}
                      </div>
                      <div className="text-[10px] opacity-80 mt-0.5 truncate">
                        {turn.visualCue || 'Mô tả hình ảnh'}
                      </div>
                    </div>
                  </button>
                );
              })}
              
              {/* Quiz in Outline */}
              <button
                onClick={() => {
                  setActiveTab('quiz');
                  setIsPlaying(false);
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-start gap-2.5 ${
                  activeTab === 'quiz'
                    ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold shadow-sm'
                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100 hover:border-slate-200'
                }`}
              >
                <span className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${
                  activeTab === 'quiz' 
                    ? 'bg-amber-600 text-white' 
                    : isStage3Unlocked 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  ❓
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-bold">Chốt Chặn Pop-up Quiz</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Vượt qua để mở khóa Bảng nháp</div>
                </div>
              </button>

              {/* Practice Exercises in Outline */}
              <button
                onClick={() => {
                  setActiveTab('practice');
                  setIsPlaying(false);
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-start gap-2.5 ${
                  activeTab === 'practice'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-semibold shadow-sm'
                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100 hover:border-slate-200'
                }`}
              >
                <span className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${
                  activeTab === 'practice' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  ✍️
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-bold">Bài Tập Tự Luyện</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Củng cố kiến thức theo độ khó</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right 3 Columns: Interactive Blackboard Video Player */}
        <div className="xl:col-span-3 space-y-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative">
            
            {/* Top Player Tab Bar */}
            <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <button
                  onClick={() => {
                    setActiveTab('lecture');
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'lecture'
                      ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <MonitorPlay className="w-3.5 h-3.5" />
                  <span>📺 Video bài giảng</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('quiz');
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'quiz'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>📝 Câu hỏi chốt chặn</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('practice');
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'practice'
                      ? 'bg-indigo-950 text-indigo-400 border border-indigo-800'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>✍️ Bài tập củng cố</span>
                </button>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                  {activeTab === 'lecture' ? `Scene ${currentTurnIndex + 1}/${script.length}` : activeTab === 'quiz' ? 'Quiz Mode' : 'Practice Mode'}
                </span>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                </button>
              </div>
            </div>

            {/* Blackboard Screen Container with Wooden Frame */}
            <div className="p-4 bg-zinc-950">
              <div className="border-[12px] border-amber-900 bg-[#162e26] rounded-2xl shadow-inner relative overflow-hidden min-h-[380px] md:min-h-[440px] p-6 flex flex-col justify-between chalkboard-grid">
                
                {/* Chalkboard content layout with robot split */}
                <div className="flex flex-1 gap-6 items-stretch">
                  
                  {/* Left Side: Math Content & Exercises */}
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    {activeTab === 'lecture' && (
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center justify-between border-b border-white/20 pb-2">
                          <span className="text-xs md:text-sm uppercase tracking-wider font-extrabold text-yellow-300 font-mono">
                            ✏️ {logicSteps[currentTurnIndex]?.title || 'Phân tích & Thuyết minh'}
                          </span>
                          <span className="text-[10px] text-zinc-300 font-mono">
                            Mốc: {currentTurn?.timeSeconds || 0}s
                          </span>
                        </div>

                        {/* Split layout: text left, chalk sketch right */}
                        <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
                          <div className="flex-1 space-y-3">
                            {/* Key formula display in chalk outline */}
                            {logicSteps[currentTurnIndex]?.keyFormula && (
                              <div className="p-4 bg-black/40 border border-dashed border-white/30 rounded-xl text-center space-y-1 animate-fadeIn">
                                <span className="text-[10px] uppercase font-bold text-cyan-300 font-mono block">Công thức cốt lõi:</span>
                                <span className="text-2xl md:text-3xl font-extrabold text-yellow-200 font-mono tracking-wide block filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                  {logicSteps[currentTurnIndex].keyFormula}
                                </span>
                              </div>
                            )}

                            {/* Main Math Step Explanation - Bright Bold Text */}
                            <p className="text-base md:text-lg font-bold text-zinc-50 leading-relaxed font-sans filter drop-shadow">
                              {logicSteps[currentTurnIndex]?.content}
                            </p>
                          </div>

                          {/* Chalk sketch box on the right of text */}
                          <div className="shrink-0 self-center bg-black/30 border border-white/10 p-3 rounded-2xl shadow-inner">
                            <ChalkSketch type={
                              currentTurnIndex === 0 ? 'house' :
                              currentTurnIndex === 1 ? 'calculator' :
                              currentTurnIndex === 2 ? 'chart' : 'award'
                            } />
                          </div>
                        </div>

                        {/* visual graphic notes in typewriter effect - High contrast */}
                        <div className="p-3 bg-black/30 border-l-4 border-cyan-300 rounded-r-lg space-y-1">
                          <span className="text-[10px] uppercase font-bold text-cyan-300 font-mono block">Hình ảnh mô phỏng trên bảng:</span>
                          <p className="text-sm text-cyan-100 font-extrabold font-mono leading-relaxed">
                            {displayedGraphicNote}
                            <span className="inline-block w-1.5 h-3.5 bg-cyan-300 ml-0.5 animate-pulse" />
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'quiz' && (
                      <div className="space-y-4 flex-1 flex flex-col justify-between animate-fadeIn">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-white/20 pb-2">
                            <span className="text-xs md:text-sm uppercase tracking-wider font-extrabold text-yellow-300 font-mono">
                              ❓ CÂU HỎI CHỐT CHẶN (POP-UP QUIZ)
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isStage3Unlocked ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                              {isStage3Unlocked ? 'Đã Thông Qua' : 'Chưa Khóa'}
                            </span>
                          </div>
                          
                          <p className="text-base md:text-lg font-bold text-zinc-50 leading-relaxed filter drop-shadow">
                            {data.popupQuiz.question}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                            {data.popupQuiz.options?.map((option, idx) => {
                              const isSelected = selectedOption === idx;
                              let btnStyle = 'border-white/20 bg-black/30 text-zinc-100 hover:border-amber-400 hover:bg-white/5';
                              
                              if (quizSubmitted) {
                                if (idx === data.popupQuiz.correctAnswerIndex) {
                                  btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-100 font-extrabold';
                                } else if (isSelected) {
                                  btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-100 font-bold';
                                }
                              } else if (isSelected) {
                                btnStyle = 'bg-indigo-950/70 border-indigo-400 text-indigo-100 font-extrabold ring-1 ring-indigo-400/50';
                              }

                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  disabled={quizSubmitted && isCorrect}
                                  onClick={() => {
                                    setSelectedOption(idx);
                                    setQuizSubmitted(false);
                                  }}
                                  className={`p-3 rounded-xl border text-left text-sm transition-all duration-150 flex items-center justify-between font-bold ${btnStyle}`}
                                >
                                  <span>{option}</span>
                                  {quizSubmitted && idx === data.popupQuiz.correctAnswerIndex && (
                                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 ml-2" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="pt-2">
                          {!quizSubmitted ? (
                            <button
                              type="button"
                              disabled={selectedOption === null}
                              onClick={handleQuizSubmit}
                              className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-extrabold text-xs md:text-sm rounded-xl shadow-lg transition-all disabled:opacity-50"
                            >
                              Xác Nhận Đáp Án
                            </button>
                          ) : (
                            <div className={`p-3 rounded-xl border text-xs md:text-sm space-y-1.5 ${isCorrect ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-100' : 'bg-rose-950/60 border-rose-500/50 text-rose-100'}`}>
                              <div className="font-extrabold flex items-center gap-1.5">
                                {isCorrect ? (
                                  <>
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    <span>Chính xác! Giai đoạn 3 (Bảng nháp) đã mở khóa.</span>
                                  </>
                                ) : (
                                  <>
                                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                                    <span>Chưa đúng rồi. Bạn hãy suy nghĩ và chọn lại nhé!</span>
                                  </>
                                )}
                              </div>
                              <p className="text-xs opacity-90 leading-relaxed font-mono font-bold">
                                {data.popupQuiz.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeTab === 'practice' && (
                      <div className="space-y-4 flex-1 flex flex-col justify-between animate-fadeIn">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-white/20 pb-2">
                            <span className="text-xs md:text-sm uppercase tracking-wider font-extrabold text-yellow-300 font-mono">
                              ✍️ BÀI TẬP LUYỆN TẬP CỦNG CỐ
                            </span>
                            
                            <div className="flex gap-1.5">
                              {['+10%', '+20%', '+30%'].map((tier) => (
                                <button
                                  key={tier}
                                  onClick={() => {
                                    setSelectedExerciseTier(tier as any);
                                    setShowHint(false);
                                  }}
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                                    selectedExerciseTier === tier
                                      ? 'bg-indigo-950 text-indigo-300 border-indigo-700'
                                      : 'bg-transparent text-white/50 border-white/10 hover:text-white hover:border-white/25'
                                  }`}
                                >
                                  {tier} {tier === '+10%' ? 'Cơ bản' : tier === '+20%' ? 'Khá' : 'Giỏi'}
                                </button>
                              ))}
                            </div>
                          </div>

                          {currentExercise ? (
                            <div className="space-y-3">
                              <h4 className="text-xs md:text-sm font-extrabold text-yellow-300 font-mono">
                                {currentExercise.title} ({currentExercise.difficultyLabel})
                              </h4>
                              <p className="text-base font-bold text-zinc-50 leading-relaxed filter drop-shadow">
                                {currentExercise.problemText}
                              </p>

                              {showHint && (
                                <div className="p-3 bg-teal-950/60 border border-teal-500/40 rounded-xl space-y-1">
                                  <span className="text-[10px] uppercase font-extrabold text-teal-300 font-mono block">💡 Gợi ý giải:</span>
                                  <p className="text-sm text-teal-200 font-mono font-extrabold leading-relaxed">
                                    {currentExercise.hint}
                                  </p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-xs text-white/50 italic">Không có bài tập cho mức này.</p>
                          )}
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={() => setShowHint(!showHint)}
                            className="w-full py-2 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-indigo-300 font-extrabold text-xs md:text-sm rounded-xl transition-all"
                          >
                            {showHint ? 'Ẩn Gợi Ý Giải' : '💡 Xem Gợi Ý Giải'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Vertical Dotted Divider line */}
                  <div className="w-px border-r border-dashed border-white/15 self-stretch mx-1 hidden sm:block" />

                  {/* Right Side: Simulated Robot Teacher Pedestal */}
                  <div className="flex flex-col justify-center items-center w-[130px] shrink-0 border-l border-white/5 pl-2">
                    <RobotTeacher 
                      isSpeaking={isPlaying} 
                      tab={activeTab} 
                      currentStep={currentTurnIndex} 
                    />
                    
                    {/* Tiny speech pointer bubble */}
                    <div className="mt-2 text-[9px] font-mono text-cyan-200/90 bg-black/40 border border-white/10 px-2 py-1 rounded-lg text-center leading-normal max-w-[120px] font-bold">
                      {isPlaying ? '✏️ Đang vẽ lên bảng...' : '⏸️ Đã tạm dừng'}
                    </div>
                  </div>

                </div>

                {/* Bottom Avatar speaking profile */}
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg ${isPlaying ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#162e26]' : ''}`}>
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      {isPlaying && (
                        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border border-zinc-900 rounded-full animate-ping" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-cyan-300 font-mono">
                          Giáo viên AI (Thuyết minh)
                        </span>
                        {isPlaying && (
                          <div className="flex items-center gap-0.5 h-3">
                            <div className="w-0.5 bg-emerald-400 visualizer-bar-1" />
                            <div className="w-0.5 bg-emerald-400 visualizer-bar-2" />
                            <div className="w-0.5 bg-emerald-400 visualizer-bar-3" />
                            <div className="w-0.5 bg-emerald-400 visualizer-bar-4" />
                            <div className="w-0.5 bg-emerald-400 visualizer-bar-5" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-zinc-200 font-bold truncate max-w-[280px] sm:max-w-[400px] italic">
                        {activeTab === 'lecture' ? `"${currentTurn?.speakerText}"` : activeTab === 'quiz' ? '"Chọn đáp án đúng của câu hỏi chốt chặn nhé!"' : '"Giải các bài tập củng cố để ghi nhớ bài học tốt hơn."'}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-white/30 font-mono hidden md:inline">
                    Interactive Teaching Video
                  </span>
                </div>

              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="bg-zinc-900 border-t border-zinc-800 p-3 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {activeTab === 'lecture' && (
                  isPlaying ? (
                    <button
                      onClick={handlePause}
                      className="p-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl transition-all flex items-center gap-1 text-xs font-bold"
                    >
                      <Pause className="w-3.5 h-3.5" />
                      <span>Tạm Dừng</span>
                    </button>
                  ) : (
                    <button
                      onClick={handlePlay}
                      className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl shadow-lg shadow-cyan-600/30 transition-all flex items-center gap-1 text-xs font-bold"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Phát Bài Giảng</span>
                    </button>
                  )
                )}

                {activeTab === 'lecture' && (
                  <button
                    onClick={handleReset}
                    className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors"
                    title="Phát lại từ đầu"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}

                {activeTab === 'lecture' && (
                  <select
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                    className="bg-zinc-800 text-zinc-200 border border-zinc-700 text-[10px] font-bold rounded-lg px-1.5 py-1 focus:ring-0 focus:outline-none cursor-pointer"
                  >
                    <option value="0.75">0.75x</option>
                    <option value="1.0">1.0x (Chuẩn)</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                  </select>
                )}
              </div>

              {/* Progress Seek Slider */}
              {activeTab === 'lecture' && (
                <div className="flex-1 min-w-[200px] flex items-center gap-2 text-xs">
                  <span className="text-zinc-400 font-mono">
                    {currentTurnIndex + 1}/{script.length}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={script.length - 1}
                    value={currentTurnIndex}
                    onChange={(e) => {
                      setCurrentTurnIndex(parseInt(e.target.value));
                      setIsPlaying(false);
                    }}
                    className="flex-1 accent-cyan-500 bg-zinc-700 h-1 rounded-lg cursor-pointer appearance-none"
                  />
                  <span className="text-zinc-400 font-mono">
                    {currentTurn?.timeSeconds || 0}s
                  </span>
                </div>
              )}

              {/* Proceed Action Button */}
              <div className="flex items-center gap-2">
                <button
                  disabled={!isStage3Unlocked}
                  onClick={onProceedToStage3}
                  className={`px-4 py-2 font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all ${
                    isStage3Unlocked
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                      : 'bg-zinc-800 text-zinc-500 border border-zinc-700 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {isStage3Unlocked ? (
                    <>
                      <span>Vào Bảng Nháp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Cần Vượt Quiz</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Transcript text block at the bottom */}
          <div className="bg-zinc-950/20 border border-slate-200/60 rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-cyan-600" />
              <span>Nội Dung Thuyết Minh Chi Tiết</span>
            </h4>
            <div className="p-3 bg-white/70 border border-slate-200/50 rounded-xl max-h-[120px] overflow-y-auto text-xs text-slate-600 leading-relaxed space-y-2 font-bold font-sans">
              {script.map((turn, i) => (
                <div 
                  key={i} 
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    i === currentTurnIndex && activeTab === 'lecture'
                      ? 'bg-cyan-50 text-cyan-950'
                      : 'hover:bg-slate-50'
                  }`}
                  onClick={() => {
                    setCurrentTurnIndex(i);
                    setActiveTab('lecture');
                    setIsPlaying(true);
                  }}
                >
                  <span className="font-extrabold text-cyan-700 mr-1.5">Phần {i + 1} ({turn.timeSeconds}s):</span>
                  "{turn.speakerText}"
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
