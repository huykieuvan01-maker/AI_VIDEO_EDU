import React, { useState, useEffect, useRef } from 'react';
import { Stage1To3Data } from '../types';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, ShieldAlert, CheckCircle2, Lock, 
  ArrowRight, Sparkles, MessageSquare, MonitorPlay, HelpCircle, Presentation,
  BookOpen, List
} from 'lucide-react';
import { exportToPPTX, isExportAvailable } from '../utils/exportServices';

interface Props {
  data: Stage1To3Data;
  onProceedToStage3: () => void;
  isStage3Unlocked: boolean;
  setIsStage3Unlocked: (unlocked: boolean) => void;
}

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

  const speakTurnText = (text: string) => {
    if (isMuted || !synthRef.current) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.9 * playbackSpeed;

    synthRef.current.speak(utterance);
  };

  // Playback loop
  useEffect(() => {
    let timer: any = null;
    if (isPlaying && activeTab === 'lecture') {
      if (currentTurn) {
        speakTurnText(currentTurn.speakerText);
      }

      const wordCount = currentTurn?.speakerText ? currentTurn.speakerText.split(' ').length : 15;
      const calculatedDuration = Math.max(5000, (wordCount * 330) / playbackSpeed);

      timer = setTimeout(() => {
        if (currentTurnIndex < script.length - 1) {
          setCurrentTurnIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
          setActiveTab('quiz');
        }
      }, calculatedDuration);
    } else {
      if (synthRef.current) synthRef.current.cancel();
    }

    return () => clearTimeout(timer);
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
              <List className="w-4 h-4 text-cyan-655" />
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
              <div className="border-[12px] border-amber-900 bg-[#162e26] rounded-2xl shadow-inner relative overflow-hidden min-h-[360px] md:min-h-[420px] p-6 flex flex-col justify-between chalkboard-grid">
                
                {/* Chalkboard content based on mode */}
                {activeTab === 'lecture' && (
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs uppercase tracking-wider font-extrabold text-amber-200/90 font-mono">
                        ✏️ {logicSteps[currentTurnIndex]?.title || 'Phân tích & Thuyết minh'}
                      </span>
                      <span className="text-[10px] text-white/40 font-mono">
                        Mốc: {currentTurn?.timeSeconds || 0}s
                      </span>
                    </div>

                    <div className="space-y-3">
                      {/* Key formula display in chalk outline */}
                      {logicSteps[currentTurnIndex]?.keyFormula && (
                        <div className="p-4 bg-black/20 border border-dashed border-white/15 rounded-xl text-center space-y-1 animate-fadeIn">
                          <span className="text-[10px] uppercase font-bold text-cyan-300/80 font-mono block">Công thức cốt lõi:</span>
                          <span className="text-2xl md:text-3xl font-extrabold text-amber-200/90 font-mono tracking-wide block">
                            {logicSteps[currentTurnIndex].keyFormula}
                          </span>
                        </div>
                      )}

                      {/* Main Math Step Explanation */}
                      <p className="text-sm md:text-base font-semibold text-slate-100/95 leading-relaxed font-sans">
                        {logicSteps[currentTurnIndex]?.content}
                      </p>

                      {/* visual graphic notes in typewriter effect */}
                      <div className="p-3 bg-white/5 border-l-4 border-cyan-400/80 rounded-r-lg space-y-1">
                        <span className="text-[9px] uppercase font-bold text-cyan-300/80 font-mono block">Đồ họa mô tả:</span>
                        <p className="text-xs md:text-sm text-slate-200/90 italic font-mono leading-normal">
                          {displayedGraphicNote}
                          <span className="inline-block w-1.5 h-3 bg-cyan-400 ml-0.5 animate-pulse" />
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'quiz' && (
                  <div className="space-y-4 flex-1 flex flex-col justify-between animate-fadeIn">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-xs uppercase tracking-wider font-extrabold text-amber-200/90 font-mono">
                          ❓ CÂU HỎI CHỐT CHẶN (POP-UP QUIZ)
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isStage3Unlocked ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                          {isStage3Unlocked ? 'Đã Thông Qua' : 'Chưa Khóa'}
                        </span>
                      </div>
                      
                      <p className="text-sm md:text-base font-bold text-slate-100/95 leading-relaxed">
                        {data.popupQuiz.question}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                        {data.popupQuiz.options?.map((option, idx) => {
                          const isSelected = selectedOption === idx;
                          let btnStyle = 'border-white/15 text-slate-200 hover:border-amber-400 hover:bg-white/5';
                          
                          if (quizSubmitted) {
                            if (idx === data.popupQuiz.correctAnswerIndex) {
                              btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                            } else if (isSelected) {
                              btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                            }
                          } else if (isSelected) {
                            btnStyle = 'bg-indigo-950/70 border-indigo-400 text-indigo-200 font-bold ring-1 ring-indigo-400/50';
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
                              className={`p-3 rounded-xl border text-left text-xs transition-all duration-150 flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{option}</span>
                              {quizSubmitted && idx === data.popupQuiz.correctAnswerIndex && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
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
                          className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all disabled:opacity-50"
                        >
                          Xác Nhận Đáp Án
                        </button>
                      ) : (
                        <div className={`p-3 rounded-xl border text-xs space-y-1.5 ${isCorrect ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200' : 'bg-rose-950/60 border-rose-500/50 text-rose-200'}`}>
                          <div className="font-bold flex items-center gap-1.5">
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
                          <p className="text-[11px] opacity-90 leading-relaxed font-mono">
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
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-xs uppercase tracking-wider font-extrabold text-amber-200/90 font-mono">
                          ✍️ BÀI TẬP LUYỆN TẬP CỦNG CỐ
                        </span>
                        
                        <div className="flex gap-1">
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
                          <h4 className="text-xs font-bold text-amber-200/90 font-mono">
                            {currentExercise.title} ({currentExercise.difficultyLabel})
                          </h4>
                          <p className="text-xs md:text-sm text-slate-100/95 leading-relaxed">
                            {currentExercise.problemText}
                          </p>

                          {showHint && (
                            <div className="p-3 bg-teal-950/40 border border-teal-500/30 rounded-xl space-y-1">
                              <span className="text-[9px] uppercase font-extrabold text-teal-400 font-mono block">💡 Gợi ý giải:</span>
                              <p className="text-xs text-teal-100 font-mono leading-relaxed">
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
                        className="w-full py-2 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-indigo-300 font-bold text-xs rounded-xl transition-all"
                      >
                        {showHint ? 'Ẩn Gợi Ý Giải' : '💡 Xem Gợi Ý Giải'}
                      </button>
                    </div>
                  </div>
                )}

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
                      <p className="text-[11px] text-zinc-300 truncate max-w-[280px] sm:max-w-[400px] italic">
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
            <div className="p-3 bg-white/70 border border-slate-200/50 rounded-xl max-h-[120px] overflow-y-auto text-xs text-slate-600 leading-relaxed space-y-2">
              {script.map((turn, i) => (
                <div 
                  key={i} 
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    i === currentTurnIndex && activeTab === 'lecture'
                      ? 'bg-cyan-50 text-cyan-950 font-medium'
                      : 'hover:bg-slate-50'
                  }`}
                  onClick={() => {
                    setCurrentTurnIndex(i);
                    setActiveTab('lecture');
                    setIsPlaying(true);
                  }}
                >
                  <span className="font-bold text-cyan-700 mr-1.5">Phần {i + 1} ({turn.timeSeconds}s):</span>
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

