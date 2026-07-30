import React, { useState } from 'react';
import { ProblemInput, GradeLevel, PedagogicalTone, SubjectCategory, Stage1To3Data, DiagnosticReport } from '../types';
import { SAMPLE_PROBLEMS, SampleProblemItem } from '../data/sampleProblems';
import { Sparkles, Upload, FileText, Image as ImageIcon, Send, RefreshCw, Layers, GraduationCap, Volume2, BookOpen } from 'lucide-react';

interface Props {
  onAnalyze: (input: ProblemInput, presetData?: Stage1To3Data, presetReport?: DiagnosticReport) => void;
  isLoading: boolean;
}

export const ProblemInputSection: React.FC<Props> = ({ onAnalyze, isLoading }) => {
  const [problemText, setProblemText] = useState<string>(SAMPLE_PROBLEMS[0].input.problemText);
  const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('thpt');
  const [tone, setTone] = useState<PedagogicalTone>('chuyên_sâu');
  const [subject, setSubject] = useState<SubjectCategory>('toán');
  const [selectedSampleId, setSelectedSampleId] = useState<string>(SAMPLE_PROBLEMS[0].id);

  const handleSelectSample = (sample: SampleProblemItem) => {
    setSelectedSampleId(sample.id);
    setProblemText(sample.input.problemText);
    setImageBase64(undefined);
    setImagePreview(null);
    setGradeLevel(sample.input.gradeLevel);
    setTone(sample.input.tone);
    setSubject(sample.input.subject);

    // Trigger analysis with preset data for instant smooth demo or customizable regeneration
    onAnalyze(sample.input, sample.presetData, sample.presetReport);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setImageBase64(result);
      setSelectedSampleId('');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemText && !imageBase64) return;

    // Check if matching current preset
    const matchedSample = SAMPLE_PROBLEMS.find((s) => s.id === selectedSampleId);
    if (matchedSample && problemText === matchedSample.input.problemText && !imageBase64) {
      onAnalyze(matchedSample.input, matchedSample.presetData, matchedSample.presetReport);
    } else {
      onAnalyze({
        problemText,
        imageBase64,
        gradeLevel,
        tone,
        subject,
      });
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Nhập Đề Bài / Bài Toán Đa Tầng (Input & OCR)
          </h2>
          <p className="text-xs text-slate-400">
            Tải ảnh chụp bài viết tay, nhập văn bản hoặc chọn bài tập mẫu để khởi chạy Hệ sinh thái Thích ứng.
          </p>
        </div>

        {/* Grade level badges */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <GraduationCap className="w-4 h-4 text-indigo-400 hidden md:inline" />
          <span className="text-xs text-slate-400 font-medium">Trình độ:</span>
          <span className="text-xs font-bold text-indigo-300 px-2.5 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
            {gradeLevel === 'tiểu_học' ? 'Tiểu Học' : gradeLevel === 'thcs' ? 'THCS' : gradeLevel === 'thpt' ? 'THPT' : 'Đại Học'}
          </span>
        </div>
      </div>

      {/* Preset Samples Selector Pills */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2.5 uppercase tracking-wider">
          Kho bài tập mẫu thử nghiệm nhanh (Quick Presets):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_PROBLEMS.map((sample) => {
            const isSelected = selectedSampleId === sample.id;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500/80 ring-1 ring-indigo-500/50 shadow-md'
                    : 'bg-slate-800/50 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-indigo-300 truncate">{sample.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">{sample.grade}</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{sample.previewText}</p>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Text / Image Input */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-400" />
              Nội dung bài toán hoặc yêu cầu (Math / Physics / Chemistry / STEM):
            </label>
            <textarea
              rows={4}
              value={problemText}
              onChange={(e) => {
                setProblemText(e.target.value);
                setSelectedSampleId('');
              }}
              placeholder="Nhập đề bài toán, lý, hóa... Hoặc mô tả bài tập cần AI giảng dạy..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
            />
          </div>

          {/* OCR Image Upload Card */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-indigo-400" />
              Tải ảnh bài viết tay / PDF (OCR Extraction):
            </label>

            <div className="relative h-[110px] border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl bg-slate-950/60 flex flex-col items-center justify-center p-3 text-center transition-all cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />

              {imagePreview ? (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
                  <img src={imagePreview} alt="OCR Preview" className="max-h-full object-contain rounded-lg" />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-medium text-white transition-opacity">
                    Thay đổi ảnh
                  </div>
                </div>
              ) : (
                <div className="space-y-1 text-slate-400 group-hover:text-indigo-400 transition-colors">
                  <Upload className="w-6 h-6 mx-auto mb-1 text-slate-500 group-hover:text-indigo-400" />
                  <p className="text-xs font-medium">Kéo thả hoặc bấm chọn ảnh</p>
                  <p className="text-[10px] text-slate-500">PNG, JPG, WebP - Tự động bóc tách OCR</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Configurations: Grade level, Tone, Subject */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/60 p-3.5 border border-slate-800 rounded-xl">
          {/* Grade Level */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" /> Cấp Học
            </label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="tiểu_học">Tiểu Học (Lớp 1 - 5)</option>
              <option value="thcs">THCS (Lớp 6 - 9)</option>
              <option value="thpt">THPT (Lớp 10 - 12)</option>
              <option value="đại_học">Đại Học / Chuyên Sâu</option>
            </select>
          </div>

          {/* Pedagogical Tone */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" /> Tông Giọng Sư Phạm
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as PedagogicalTone)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="gần_gũi">Gần Gũi & Khích Lệ (Ấm Áp)</option>
              <option value="chuyên_sâu">Chuyên Sâu & Chặt Chẽ (Mạch Lạc)</option>
              <option value="socratic">Socratic (Hỏi Mở Gợi Mở Tư Duy)</option>
            </select>
          </div>

          {/* Subject Category */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Môn Học
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value as SubjectCategory)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="toán">Toán Học (Đại số / Hình học)</option>
              <option value="vật_lý">Vật Lý Học</option>
              <option value="hóa_học">Hóa Học</option>
              <option value="stem">Kỹ Thuật STEM</option>
            </select>
          </div>
        </div>

        {/* Submit CTA */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isLoading || (!problemText && !imageBase64)}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI Đang Phân Tích & Khởi Tạo 4 Giai Đoạn...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Kích Hoạt AI Architect Điều Phối (Giai Đoạn 1 - 4)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
