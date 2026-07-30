import React from 'react';
import { Stage1To3Data } from '../types';
import { Layers, FileCode, CheckCircle2, ArrowRight, Sparkles, Volume2, Eye, Key } from 'lucide-react';

interface Props {
  data: Stage1To3Data;
  onProceedToStage2: () => void;
}

export const Stage1View: React.FC<Props> = ({ data, onProceedToStage2 }) => {
  return (
    <div className="space-y-6">
      {/* Banner Title */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50/50 to-white border border-indigo-200/80 rounded-2xl p-5 md:p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <Layers className="w-48 h-48 text-indigo-300" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold uppercase tracking-wider">
                PHẦN 1: PHÂN TÍCH HỆ THỐNG
              </span>
              <span className="text-xs text-slate-500">• OCR & Kịch Bản Sư Phạm Đa Tầng</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-indigo-950">
              Cấu Trúc Tư Duy Micro-Steps & Prompt Sư Phạm
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
              Chuyển đổi dữ liệu thô bài toán thành chuỗi bước logic siêu nhỏ, trích xuất công thức then chốt và xây dựng Prompt nền cho AI Video Avatar.
            </p>
          </div>

          <button
            onClick={onProceedToStage2}
            className="self-start md:self-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105 shrink-0"
          >
            <span>Tiến Sang Giai Đoạn 2 (Video & Quiz)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: OCR Data & Micro Logic Steps */}
        <div className="lg:col-span-2 space-y-6">
          {/* Extracted OCR Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <FileCode className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                1. Dữ Liệu Bóc Tách OCR (OCR Data)
              </h3>
            </div>
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-indigo-200 leading-relaxed overflow-x-auto">
              {data.ocrData}
            </div>
          </div>

          {/* Micro Logic Steps */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  2. Chuỗi Bước Tư Duy Logic Siêu Nhỏ (Micro-Steps)
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-semibold">
                {data.logicSteps?.length || 0} Bước Logic
              </span>
            </div>

            <div className="space-y-3">
              {data.logicSteps?.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-4 bg-slate-950/80 border border-slate-800/90 hover:border-indigo-500/50 rounded-xl transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center text-xs">
                        {step.stepNumber}
                      </span>
                      {step.title}
                    </span>

                    {step.keyFormula && (
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300">
                        {step.keyFormula}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pl-8">
                    {step.content}
                  </p>

                  {/* Keywords pill tags */}
                  {step.keywords && step.keywords.length > 0 && (
                    <div className="pl-8 pt-1 flex flex-wrap items-center gap-1.5">
                      <Key className="w-3 h-3 text-slate-500" />
                      {step.keywords.map((kw, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Layer Pedagogical Prompt */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-5 shadow-xl space-y-4 sticky top-24">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                3. Multi-Layer Pedagogical Prompt
              </h3>
            </div>

            <p className="text-xs text-slate-400">
              Prompt nền truyền tải chỉ dẫn tông giọng, nhịp độ và chỉ định hình ảnh cho AI Avatar ở Giai đoạn 2.
            </p>

            {/* Tone & Pace Card */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Volume2 className="w-4 h-4 text-indigo-400" />
                <span>Tông Giọng & Nhịp Độ (Tone & Pace):</span>
              </div>
              <p className="text-xs text-slate-300 pl-6">
                <strong>Tông giọng:</strong> {data.pedagogicalPrompt?.tone}
              </p>
              <p className="text-xs text-slate-300 pl-6">
                <strong>Nhịp độ giảng:</strong> {data.pedagogicalPrompt?.pace}
              </p>
            </div>

            {/* Slow Points / Emphasis */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Điểm Nhấn Giảng Chậm [Emphasis]:</span>
              </div>
              <ul className="space-y-1.5 pl-6">
                {data.pedagogicalPrompt?.emphasisPoints?.map((item, idx) => (
                  <li key={idx} className="text-xs text-amber-200/90 list-disc leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Visual Directives */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Chỉ Định Đồ Họa Động (Key Visuals):</span>
              </div>
              <ul className="space-y-1.5 pl-6">
                {data.pedagogicalPrompt?.keyVisuals?.map((item, idx) => (
                  <li key={idx} className="text-xs text-cyan-200/90 list-disc leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
