import React, { useState } from 'react';
import { DiagnosticReport, Stage1To3Data } from '../types';
import { Award, CheckCircle2, AlertTriangle, XCircle, HeartHandshake, BookOpen, Sparkles, Check, RotateCcw, ArrowRight, FileText } from 'lucide-react';
import { exportToDOCX, isExportAvailable } from '../utils/exportServices';
import { TelemetryChart } from './TelemetryChart';
import { KnowledgeGraph } from './KnowledgeGraph';

interface Props {
  report: DiagnosticReport;
  data: Stage1To3Data;
  telemetry?: any;
  onResetAll: () => void;
}

export const Stage4View: React.FC<Props> = ({ report, data, telemetry = null, onResetAll }) => {
  const [quickFixAnswer, setQuickFixAnswer] = useState<number | null>(null);
  const [quickFixSubmitted, setQuickFixSubmitted] = useState<boolean>(false);

  const quickFix = report.remedialRoadmap?.quickFixQuestion;
  const isQuickFixCorrect = quickFix && quickFixAnswer === quickFix.correctAnswerIndex;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white border border-emerald-200/80 rounded-2xl p-5 md:p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                PHẦN 4: BÁO CÁO CHẨN ĐOÁN TIẾN TRÌNH
              </span>
              <span className="text-xs text-slate-500">• Error Heatmap & Remedial Roadmap</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-emerald-950">
              Chấm Điểm Tiến Trình & Bản Đồ Nhiệt Lỗi Sai
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
              Chẩn đoán chi tiết tư duy logic, xác định nguyên nhân gốc rễ và đề xuất lộ trình khắc phục lỗ hổng kiến thức.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isExportAvailable() && (
              <button
                type="button"
                onClick={() => exportToDOCX(data, report, telemetry, data.ocrData ? data.ocrData.substring(0, 30) + '...' : 'Bài toán')}
                className="px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-750 border border-indigo-200 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all hover:scale-105"
              >
                <FileText className="w-4 h-4 text-indigo-500" />
                <span>Tải Phiếu Học Tập Word (.docx)</span>
              </button>
            )}

            <button
              onClick={onResetAll}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all hover:scale-105"
            >
              <RotateCcw className="w-4 h-4 text-emerald-400" />
              <span>Giải Bài Toán Khác</span>
            </button>
          </div>
        </div>
      </div>

      {/* Process Score & Breakdown Header Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Big Radial Score Card */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center text-center space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Điểm Số Tiến Trình (Process Score)
          </span>

          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Outer score circle */}
            <div className="w-28 h-28 rounded-full border-4 border-emerald-500/30 flex items-center justify-center bg-slate-950 shadow-inner">
              <span className="text-4xl font-extrabold font-mono text-emerald-400">
                {report.processScore}
              </span>
              <span className="text-xs font-bold text-slate-500 text-bottom">/100</span>
            </div>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
            {report.processScore >= 85 ? 'Tư Duy Rất Tốt' : report.processScore >= 70 ? 'Khá - Cần Chỉnh Lỗi Nhỏ' : 'Cần Ôn Lại Khái Niệm Nền'}
          </span>
        </div>

        {/* Score Breakdown Bars */}
        <div className="md:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <Award className="w-4 h-4 text-emerald-400" />
            Phân Tích Cấu Trúc Điểm Thành Phần
          </h3>

          <div className="space-y-3">
            {/* Logical Reasoning */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">Tư Duy Logic (Logical Reasoning)</span>
                <span className="font-bold text-emerald-400">{report.scoreBreakdown?.logicalReasoning}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${report.scoreBreakdown?.logicalReasoning || 0}%` }}
                />
              </div>
            </div>

            {/* Calculation Accuracy */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">Độ Chính Xác Tính Toán (Calculation Accuracy)</span>
                <span className="font-bold text-amber-400">{report.scoreBreakdown?.calculationAccuracy}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-500"
                  style={{ width: `${report.scoreBreakdown?.calculationAccuracy || 0}%` }}
                />
              </div>
            </div>

            {/* Clarity */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">Độ Mạch Lạc & Trình Bày (Clarity)</span>
                <span className="font-bold text-cyan-400">{report.scoreBreakdown?.clarity}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${report.scoreBreakdown?.clarity || 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive D3.js Visualizations */}
      {telemetry && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TelemetryChart 
            strokeCount={telemetry.strokeCount}
            eraseCount={telemetry.eraseCount}
            durationSeconds={telemetry.drawDurationSeconds}
          />
          <KnowledgeGraph
            subject={data.subject || 'toán'}
            recapConcept={report.remedialRoadmap?.recapConceptName || 'Khái niệm'}
            coreGap={report.rootCauseAnalysis?.coreGap || 'Lỗ hổng'}
          />
        </div>
      )}

      {/* Error Heatmap Visual Breakdown Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Bản Đồ Nhiệt Lỗi Sai Trực Quan (Error Heatmap)
            </h3>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-semibold">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Vùng Xanh (Đúng)
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Vùng Vàng (Sai số)
            </span>
            <span className="flex items-center gap-1 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Vùng Đỏ (Sai logic)
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {report.errorHeatmap?.map((item, idx) => {
            const isGreen = item.status === 'green';
            const isYellow = item.status === 'yellow';
            const isRed = item.status === 'red';

            const cardBorder = isGreen
              ? 'border-emerald-200 bg-emerald-50/60'
              : isYellow
              ? 'border-amber-200 bg-amber-50/60'
              : 'border-rose-200 bg-rose-50/60';

            const badgeStyle = isGreen
              ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
              : isYellow
              ? 'bg-amber-100 text-amber-800 border-amber-200'
              : 'bg-rose-100 text-rose-700 border-rose-200';

            const Icon = isGreen ? CheckCircle2 : isYellow ? AlertTriangle : XCircle;

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${cardBorder} transition-all space-y-2`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${isGreen ? 'text-emerald-400' : isYellow ? 'text-amber-400' : 'text-rose-400'}`} />
                    <span className="text-xs font-bold text-slate-900">{item.stepName}</span>
                  </div>

                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold ${badgeStyle}`}>
                    {item.statusLabel || (isGreen ? 'Tư duy tốt' : isYellow ? 'Sai số nhỏ' : 'Sai logic nền')}
                  </span>
                </div>

                <p className="text-xs text-slate-750 leading-relaxed pl-7">
                  {item.detail}
                </p>

                <div className="pl-7 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                  <div className="p-2 bg-slate-950/80 rounded border border-slate-800 text-slate-300">
                    <span className="text-slate-500 font-sans block">Lời giải học sinh:</span>
                    {item.studentAttempt}
                  </div>
                  <div className="p-2 bg-slate-950/80 rounded border border-slate-800 text-emerald-300">
                    <span className="text-slate-500 font-sans block">Logic đúng:</span>
                    {item.correctLogic}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Root Cause Analysis & Mentor Positive Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Root Cause Analysis */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Phân Tích Nguyên Nhân Gốc Rễ (Root Cause)
            </h3>
          </div>

          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
            <div>
              <span className="text-slate-450 font-medium">Lỗ hổng cốt lõi:</span>
              <p className="font-bold text-amber-800">{report.rootCauseAnalysis?.coreGap}</p>
            </div>
            <div>
              <span className="text-slate-455 font-medium">Dạng nhầm lẫn:</span>
              <p className="font-semibold text-slate-900">{report.rootCauseAnalysis?.misconceptionType}</p>
            </div>
            <div>
              <span className="text-slate-460 font-medium">Giải thích chi tiết:</span>
              <p className="text-slate-700 leading-relaxed mt-0.5">{report.rootCauseAnalysis?.detailedExplanation}</p>
            </div>
          </div>
        </div>

        {/* Mentor Positive Feedback */}
        <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <HeartHandshake className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Nhận Xét Sư Phạm Tích Cực (Mentor Feedback)
            </h3>
          </div>

          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-2">
            <p className="text-xs md:text-sm text-indigo-900 leading-relaxed font-sans italic">
              "{report.mentorFeedback}"
            </p>
          </div>
        </div>
      </div>

      {/* Remedial Roadmap & Interactive Quick Fix Validation Question */}
      <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Lộ Trình Khắc Phục (Remedial Roadmap) & Quick Fix
          </h3>
        </div>

        {/* Concept Recap Card */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            1. Kiến thức bổ trợ cần đọc lại: {report.remedialRoadmap?.recapConceptName}
          </span>
          <p className="text-xs text-slate-200 leading-relaxed">
            {report.remedialRoadmap?.recapSummary}
          </p>
        </div>

        {/* Interactive Quick Fix Validation Question */}
        {quickFix && (
          <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-3">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
              2. Bài kiểm tra xác nhận sửa lỗi tức thì (Quick Fix):
            </span>
            <p className="text-xs font-semibold text-slate-100">{quickFix.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickFix.options?.map((opt, i) => {
                const isSelected = quickFixAnswer === i;
                let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850';

                if (quickFixSubmitted) {
                  if (i === quickFix.correctAnswerIndex) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 border-rose-500 text-rose-900';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-amber-50 border-amber-500 text-amber-900 font-semibold';
                }

                return (
                  <button
                    key={i}
                    onClick={() => {
                      setQuickFixAnswer(i);
                      setQuickFixSubmitted(false);
                    }}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {!quickFixSubmitted && (
              <button
                type="button"
                disabled={quickFixAnswer === null}
                onClick={() => setQuickFixSubmitted(true)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all disabled:opacity-50"
              >
                Xác Nhận Quick Fix
              </button>
            )}

            {quickFixSubmitted && (
              <div className={`p-3 rounded-xl border text-xs space-y-1 ${isQuickFixCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'}`}>
                <div className="font-bold flex items-center gap-1.5">
                  {isQuickFixCorrect ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Chúc mừng! Bạn đã khắc phục hoàn toàn lỗi sai!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>Chưa chính xác. Hãy đọc lại gợi ý ở Bước 1.</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] opacity-90">{quickFix.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
