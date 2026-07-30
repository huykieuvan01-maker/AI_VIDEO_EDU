import React from 'react';
import { Cpu, Sparkles, BookOpen, Layers, CheckCircle2, PlayCircle, Edit3, Award, Settings, AlertCircle } from 'lucide-react';

interface Props {
  activeStage: 1 | 2 | 3 | 4;
  setActiveStage: (stage: 1 | 2 | 3 | 4) => void;
  onOpenInstructionModal: () => void;
  onOpenSettings: () => void;
  isStage2Unlocked: boolean;
  isStage3Unlocked: boolean;
  isStage4Unlocked: boolean;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export const Header: React.FC<Props> = ({
  activeStage,
  setActiveStage,
  onOpenInstructionModal,
  onOpenSettings,
  isStage2Unlocked,
  isStage3Unlocked,
  isStage4Unlocked,
  isLoading = false,
  errorMessage = null,
}) => {
  const stages = [
    {
      id: 1 as const,
      name: 'Giai đoạn 1',
      title: 'OCR & Kịch bản Đa tầng',
      icon: Layers,
      unlocked: true,
      color: 'from-indigo-500 to-purple-600',
    },
    {
      id: 2 as const,
      name: 'Giai đoạn 2',
      title: 'Video & Pop-up Quiz',
      icon: PlayCircle,
      unlocked: isStage2Unlocked,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      id: 3 as const,
      name: 'Giai đoạn 3',
      title: 'Bài tập & Bảng nháp',
      icon: Edit3,
      unlocked: isStage3Unlocked,
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 4 as const,
      name: 'Giai đoạn 4',
      title: 'Chẩn đoán & Heatmap',
      icon: Award,
      unlocked: isStage4Unlocked,
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-all shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 rounded-xl shadow-lg shadow-indigo-500/20 text-white flex items-center justify-center">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-850 bg-clip-text text-transparent">
                  AIEdu_Video
                </h1>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600 border border-indigo-500/30 font-semibold hidden sm:inline-block">
                  System v4.0
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                Hệ Sinh Thái Học Tập Thích Ứng 4 Giai Đoạn (Stroke-by-Stroke & Process Grading)
              </p>
            </div>
          </div>

          {/* Action Buttons: View System Instruction & settings */}
          <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
            <button
              onClick={onOpenInstructionModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-500/20 transition-all hover:scale-105"
            >
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>Xem System Instruction</span>
            </button>

            <div className="flex flex-col items-end">
              <button
                onClick={onOpenSettings}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all hover:scale-105"
              >
                <Settings className="w-4 h-4 text-indigo-600 animate-spin-slow" />
                <span>Cấu hình API Key & Model</span>
              </button>
              <a 
                href="https://aistudio.google.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[9px] text-rose-500 hover:underline font-bold mt-1 block"
              >
                Lấy API key để sử dụng app
              </a>
            </div>
          </div>
        </div>

        {/* 4-Stage Stepper Navigation Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-2">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isActive = activeStage === stage.id;
            const isUnlocked = stage.unlocked;

            const isFailed = !!errorMessage && errorMessage !== 'null' && errorMessage !== 'undefined' && !isUnlocked;

            return (
              <button
                key={stage.id}
                disabled={!isUnlocked}
                onClick={() => isUnlocked && setActiveStage(stage.id)}
                className={`relative flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-50/80 border-indigo-500/70 shadow-md ring-1 ring-indigo-500/50'
                    : isFailed
                    ? 'bg-rose-50 border-rose-400 hover:bg-rose-100 text-rose-800'
                    : isUnlocked
                    ? 'bg-slate-900/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800/40'
                    : 'bg-slate-950/40 border-slate-800 opacity-40 cursor-not-allowed'
                }`}
              >
                <div
                  className={`p-2 rounded-lg text-white font-medium flex items-center justify-center transition-transform ${
                    isActive
                      ? `bg-gradient-to-br ${stage.color} shadow-md scale-105`
                      : isFailed
                      ? 'bg-rose-600 text-white'
                      : isUnlocked
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-slate-900 text-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className={`text-[10px] uppercase font-bold tracking-wider ${isFailed ? 'text-rose-700' : 'text-slate-400'}`}>
                      {stage.name}
                    </span>
                    {isUnlocked && stage.id < activeStage && !errorMessage && (
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-auto" />
                    )}
                    {isFailed && (
                      <AlertCircle className="w-3 h-3 text-rose-500 ml-auto animate-pulse" />
                    )}
                  </div>
                  <div className={`text-xs font-semibold truncate ${
                    isActive ? 'text-indigo-600' : isFailed ? 'text-rose-700' : 'text-slate-200'
                  }`}>
                    {isFailed ? (
                      <span className="text-rose-500 font-bold">Đã dừng do lỗi</span>
                    ) : !isUnlocked && isLoading ? (
                      <span className="text-cyan-600 animate-pulse font-medium">Đang xử lý...</span>
                    ) : (
                      stage.title
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
