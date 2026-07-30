import React from 'react';
import { X, Cpu, CheckCircle, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemInstructionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl text-slate-100 p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 border border-indigo-500/40 rounded-xl text-indigo-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                System Instruction: AIEdu_Video
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                  Core AI Specification
                </span>
              </h2>
              <p className="text-xs text-slate-400">Thiết kế hệ thống điều phối hệ sinh thái học tập thích ứng 4 giai đoạn</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <div className="p-4 bg-slate-800/60 border border-slate-700/80 rounded-xl">
            <h3 className="text-base font-semibold text-indigo-400 flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              1. Vai Trò & Mụctiêu Cốt Lõi (Role & Objective)
            </h3>
            <p className="text-slate-300 text-xs md:text-sm">
              Hệ thống là "bộ não" điều phối toàn bộ hệ sinh thái học tập thích ứng. Không chỉ giải toán, AI hoạt động như chuyên gia sư phạm, kỹ sư ngôn ngữ và nhà phân tích dữ liệu học tập stroke-by-stroke.
            </p>
          </div>

          {/* 4 Stages Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/40 border border-indigo-500/30 rounded-xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] border border-indigo-500/40">1</span>
                Giai đoạn 1: OCR & Kịch Bản Đa Tầng
              </div>
              <ul className="text-xs space-y-1 text-slate-300 list-disc list-inside">
                <li>Bóc tách OCR bài toán thành các micro-steps siêu nhỏ.</li>
                <li>Liệt kê từ khóa (keywords) và công thức chủ chốt.</li>
                <li>Multi-layer Pedagogical Prompt: Tông giọng + Điểm nhấn [Slow/Emphasis].</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800/40 border border-cyan-500/30 rounded-xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-[10px] border border-cyan-500/40">2</span>
                Giai đoạn 2: Điều Phối Video & Tương Tác
              </div>
              <ul className="text-xs space-y-1 text-slate-300 list-disc list-inside">
                <li>Kịch bản AI Avatar đồng bộ khẩu hình và ngữ điệu.</li>
                <li>Motion Graphics trực quan hiển thị đúng thời điểm.</li>
                <li><strong>Pop-up Quiz Chốt Chặn:</strong> Bắt buộc trả lời đúng mới được sang Giai đoạn 3.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800/40 border border-amber-500/30 rounded-xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] border border-amber-500/40">3</span>
                Giai đoạn 3: Bài Tập & Bảng Nháp Thông Minh
              </div>
              <ul className="text-xs space-y-1 text-slate-300 list-disc list-inside">
                <li>3 bài tập Scaffolding tăng dần độ khó (+10%, +20%, +30%).</li>
                <li><strong>Giám sát Stroke-by-stroke:</strong> Phân tích nét vẽ, số lần tẩy xóa và độ ngập ngừng tư duy.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800/40 border border-emerald-500/30 rounded-xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] border border-emerald-500/40">4</span>
                Giai đoạn 4: Chấm Điểm Tiến Trình & Chẩn Đoán
              </div>
              <ul className="text-xs space-y-1 text-slate-300 list-disc list-inside">
                <li><strong>Error Heatmap:</strong> Phân vùng Đỏ (Sai logic), Vàng (Sai số), Xanh (Tư duy tốt).</li>
                <li>Phân tích nguyên nhân gốc rễ (Root Cause Analysis).</li>
                <li>Lộ trình khắc phục: Đọc lại 1 mẫu kiến thức + 1 câu Quick Fix.</li>
              </ul>
            </div>
          </div>

          {/* Tone & Persona Rules */}
          <div className="p-4 bg-indigo-950/40 border border-indigo-800/50 rounded-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Quy Tắc Ngôn Ngữ Sư Phạm Tích Cực (Pedagogical Tone Rules)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              AI đóng vai trò Mentor kiên nhẫn. Không dùng câu phủ định cộc lốc như <em>"Em đã làm sai"</em>. Thay vào đó dùng cụm từ định hướng: <em>"Bước này tư duy của em đang gặp chút nhầm lẫn về công thức X, hãy thử nhìn lại..."</em>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-slate-800 pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/30"
          >
            Đã Hiểu System Instruction
          </button>
        </div>
      </div>
    </div>
  );
};
