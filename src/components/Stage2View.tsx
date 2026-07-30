import React, { useState, useEffect, useRef } from 'react';
import { Stage1To3Data } from '../types';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ShieldAlert, CheckCircle2, Lock, ArrowRight, Sparkles, MessageSquare, MonitorPlay, HelpCircle, Presentation } from 'lucide-react';
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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);

  const script = data.videoScript || [];
  const currentTurn = script[currentTurnIndex] || script[0];

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
    utterance.rate = 0.95;

    synthRef.current.speak(utterance);
  };

  // Playback timer loop
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      if (currentTurn) {
        speakTurnText(currentTurn.speakerText);
      }

      timer = setTimeout(() => {
        if (currentTurnIndex < script.length - 1) {
          setCurrentTurnIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
          // Trigger quiz modal at end of lesson if not unlocked yet
          if (!isStage3Unlocked) {
            setShowQuizModal(true);
          }
        }
      }, 5000);
    } else {
      if (synthRef.current) synthRef.current.cancel();
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentTurnIndex, isMuted]);

  const handlePlay = () => {
    setIsPlaying(true);
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

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-cyan-50 via-blue-50/50 to-white border border-cyan-200/80 rounded-2xl p-5 md:p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full bg-cyan-100 text-cyan-700 border border-cyan-200 text-xs font-bold uppercase tracking-wider">
                PHẦN 2: THIẾT KẾ TƯƠNG TÁC
              </span>
              <span className="text-xs text-slate-500">• Video AI Avatar & Pop-up Quiz Gatekeeper</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-cyan-900">
              Video Giảng Dạy Tương Tác & Chốt Chặn Kiến Thức
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
              Giáo viên AI Avatar thuyết minh kết hợp đồ họa động. Học sinh bắt buộc vượt qua Pop-up Quiz để mở khóa Giai đoạn 3 (Bảng nháp).
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
              onClick={() => setShowQuizModal(true)}
              className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-200/60 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Mở Pop-up Quiz Chốt Chặn</span>
            </button>

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

      {/* Main Video & Whiteboard Canvas Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Simulated Avatar Video Screen */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative">
            {/* Top Video Header Bar */}
            <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-bold text-zinc-200">
                <MonitorPlay className="w-4 h-4 text-cyan-400" />
                <span>AI Teacher Avatar & Motion Whiteboard</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                  Mốc thời gian: {currentTurn?.timeSeconds || 0}s
                </span>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors"
                  title={isMuted ? 'Mở âm thanh' : 'Tắt âm thanh'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                </button>
              </div>
            </div>

            {/* Simulated Avatar Player Content */}
            <div className="relative min-h-[320px] md:min-h-[380px] bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950/20 p-6 flex flex-col justify-between">
              {/* Virtual Whiteboard Content Display */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-800/60 text-indigo-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Đồ họa động thị giác (Motion Graphics):
                </div>

                {/* Whiteboard Graphic Note Box */}
                <div className="p-4 bg-zinc-900/80 border border-cyan-500/30 rounded-2xl backdrop-blur-sm shadow-xl space-y-2 animate-fadeIn">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-400">
                    Visual Cue: {currentTurn?.visualCue}
                  </span>
                  <p className="text-sm md:text-base font-medium text-white leading-relaxed">
                    {currentTurn?.motionGraphicNote}
                  </p>
                </div>
              </div>

              {/* Bottom Avatar Speaking Box */}
              <div className="mt-6 flex items-start gap-4 p-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl shadow-2xl">
                {/* Avatar Animated Graphic Face */}
                <div className="relative shrink-0">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg ${isPlaying ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-zinc-900 animate-pulse' : ''}`}>
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  {isPlaying && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-zinc-900 rounded-full animate-ping" />
                  )}
                </div>

                {/* Speaker Speech Text */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-300">
                      AI Teacher Mentor (Khẩu hình & Thuyết minh)
                    </span>
                    {isPlaying && (
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Đang giảng bài...
                      </span>
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-zinc-200 leading-relaxed font-sans">
                    "{currentTurn?.speakerText}"
                  </p>
                </div>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="bg-zinc-900 border-t border-zinc-800 p-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {isPlaying ? (
                  <button
                    onClick={handlePause}
                    className="p-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Tạm Dừng</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePlay}
                    className="p-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl shadow-lg shadow-cyan-600/30 transition-all flex items-center gap-1.5 text-xs font-bold"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Phát Bài Giảng</span>
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors text-xs font-medium"
                  title="Phát lại từ đầu"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Steps Indicator */}
              <div className="flex items-center gap-1 overflow-x-auto">
                {script.map((turn, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentTurnIndex(i);
                      setIsPlaying(false);
                    }}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      i === currentTurnIndex
                        ? 'bg-cyan-500 text-slate-950 font-extrabold ring-1 ring-cyan-300'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Pop-up Quiz Gatekeeper Card */}
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Chốt Chặn Pop-up Quiz
                </h3>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isStage3Unlocked ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                {isStage3Unlocked ? 'Đã Thông Qua' : 'Cần Khóa Chốt'}
              </span>
            </div>

            <p className="text-xs text-slate-300">
              {data.popupQuiz.gatekeeperMessage}
            </p>

            {/* Quiz Question Box */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide block">
                Câu hỏi chốt chặn giữa bài:
              </span>
              <p className="text-xs font-semibold text-slate-100 leading-relaxed">
                {data.popupQuiz.question}
              </p>

              {/* Quiz Options */}
              <div className="space-y-2 pt-1">
                {data.popupQuiz.options?.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  let optionStyle = 'bg-slate-900 border-slate-700/80 text-slate-300 hover:bg-slate-850 hover:border-slate-600';

                  if (quizSubmitted) {
                    if (idx === data.popupQuiz.correctAnswerIndex) {
                      optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isSelected) {
                      optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-indigo-950/90 border-indigo-500 text-indigo-200 font-semibold ring-1 ring-indigo-500/50';
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
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all duration-200 flex items-center justify-between ${optionStyle}`}
                    >
                      <span>{option}</span>
                      {quizSubmitted && idx === data.popupQuiz.correctAnswerIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit Quiz Action */}
              {!quizSubmitted && (
                <button
                  type="button"
                  disabled={selectedOption === null}
                  onClick={handleQuizSubmit}
                  className="w-full mt-2 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all"
                >
                  Xác Nhận Đáp Án
                </button>
              )}

              {/* Result & Explanation Feedback */}
              {quizSubmitted && (
                <div className={`p-3 rounded-xl border text-xs space-y-1.5 ${isCorrect ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200' : 'bg-rose-950/60 border-rose-500/50 text-rose-200'}`}>
                  <div className="font-bold flex items-center gap-1.5">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Chính xác! Đã mở khóa Giai đoạn 3.</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-4 h-4 text-rose-400" />
                        <span>Chưa chính xác. Hãy thử chọn lại!</span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] opacity-90 leading-relaxed">
                    {data.popupQuiz.explanation}
                  </p>

                  {isCorrect && (
                    <button
                      onClick={onProceedToStage3}
                      className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Chuyển Sang Giai Đoạn 3 (Bảng Nháp)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Quiz Dedicated Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/50 rounded-2xl shadow-2xl p-6 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Chốt Chặn Pop-up Quiz Kiến Thức</h3>
              </div>
              <button
                onClick={() => setShowQuizModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">{data.popupQuiz.gatekeeperMessage}</p>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-slate-100">{data.popupQuiz.question}</p>

              <div className="space-y-2">
                {data.popupQuiz.options?.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(i)}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedOption === i
                        ? 'bg-amber-950/80 border-amber-500 text-amber-200 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    handleQuizSubmit();
                    if (selectedOption === data.popupQuiz.correctAnswerIndex) {
                      setTimeout(() => setShowQuizModal(false), 1500);
                    }
                  }}
                  disabled={selectedOption === null}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all disabled:opacity-50"
                >
                  Gửi Đáp Án Chốt Chặn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
