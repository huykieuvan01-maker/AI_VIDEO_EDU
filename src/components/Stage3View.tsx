import React, { useState, useRef, useEffect } from 'react';
import { Stage1To3Data, ScaffoldingExercise, ScratchpadTelemetry, StrokeData, StrokePoint } from '../types';
import { Edit3, Eraser, RotateCcw, Play, CheckCircle, ArrowRight, Activity, Clock, ShieldAlert, Sparkles, HelpCircle, Send, RefreshCw, Type } from 'lucide-react';

interface Props {
  data: Stage1To3Data;
  onSubmitForGrading: (telemetry: ScratchpadTelemetry, canvasImageBase64: string, typedSolution: string) => void;
  isSubmitting: boolean;
}

export const Stage3View: React.FC<Props> = ({ data, onSubmitForGrading, isSubmitting }) => {
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number>(0);
  const [activeTool, setActiveTool] = useState<'pen' | 'eraser'>('pen');
  const [penColor, setPenColor] = useState<string>('#2563eb');
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const [typedSolution, setTypedSolution] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);

  // Stroke Telemetry tracking
  const [strokes, setStrokes] = useState<StrokeData[]>([]);
  const [eraseCount, setEraseCount] = useState<number>(0);
  const [drawDuration, setDrawDuration] = useState<number>(0);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isReplaying, setIsReplaying] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentStrokeRef = useRef<StrokePoint[]>([]);
  const timerRef = useRef<any>(null);

  const exercises = data.exercises || [];
  const currentExercise: ScaffoldingExercise = exercises[selectedExerciseIndex] || exercises[0];

  // Timer counter
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDrawDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high DPI canvas resolution
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.fillStyle = '#ffffff'; // white background
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Draw subtle grid lines on scratchpad
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let x = 0; x < rect.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, rect.height);
      ctx.stroke();
    }
    for (let y = 0; y < rect.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }
  }, []);

  // Redraw canvas from strokes state
  const redrawCanvas = (strokeList: StrokeData[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let x = 0; x < rect.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, rect.height);
      ctx.stroke();
    }
    for (let y = 0; y < rect.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }

    // Draw strokes
    strokeList.forEach((st) => {
      if (st.points.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = st.isEraser ? '#ffffff' : st.color;
      ctx.lineWidth = st.isEraser ? st.width * 4 : st.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.moveTo(st.points[0].x, st.points[0].y);
      for (let i = 1; i < st.points.length; i++) {
        ctx.lineTo(st.points[i].x, st.points[i].y);
      }
      ctx.stroke();
    });
  };

  // Drawing event handlers
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const { x, y } = getCanvasCoords(e);
    currentStrokeRef.current = [{ x, y, t: Date.now() }];

    if (activeTool === 'eraser') {
      setEraseCount((prev) => prev + 1);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { x, y } = getCanvasCoords(e);
    currentStrokeRef.current.push({ x, y, t: Date.now() });

    const updatedStrokes = [
      ...strokes,
      {
        points: currentStrokeRef.current,
        isEraser: activeTool === 'eraser',
        color: penColor,
        width: strokeWidth,
      },
    ];

    redrawCanvas(updatedStrokes);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentStrokeRef.current.length > 0) {
      const newStroke: StrokeData = {
        points: currentStrokeRef.current,
        isEraser: activeTool === 'eraser',
        color: penColor,
        width: strokeWidth,
      };
      setStrokes((prev) => [...prev, newStroke]);
      currentStrokeRef.current = [];
    }
  };

  const handleClearCanvas = () => {
    setStrokes([]);
    redrawCanvas([]);
  };

  const handleUndo = () => {
    if (strokes.length === 0) return;
    const newStrokes = strokes.slice(0, -1);
    setStrokes(newStrokes);
    redrawCanvas(newStrokes);
  };

  // Replay animation stroke-by-stroke
  const handleReplayStrokes = () => {
    if (strokes.length === 0 || isReplaying) return;
    setIsReplaying(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let strokeIdx = 0;
    const interval = setInterval(() => {
      if (strokeIdx <= strokes.length) {
        redrawCanvas(strokes.slice(0, strokeIdx));
        strokeIdx++;
      } else {
        clearInterval(interval);
        setIsReplaying(false);
      }
    }, 250);
  };

  // Calculate Hesitation Score heuristics
  const strokeCount = strokes.length;
  let hesitationScore: ScratchpadTelemetry['hesitationScore'] = 'Bình thường';
  let hesitationDetail = 'Nét vẽ mượt mà, phân bố nhịp nhàng.';

  if (eraseCount >= 4 || (strokeCount > 15 && drawDuration > 120)) {
    hesitationScore = 'Rất ngập ngừng (Cần hỗ trợ)';
    hesitationDetail = `Phát hiện ${eraseCount} lần tẩy xóa & ngập ngừng dừng nét lâu. Học sinh đang phân vân ở các bước chuyển công thức.`;
  } else if (eraseCount >= 2 || strokeCount > 10) {
    hesitationScore = 'Ngập ngừng nhẹ';
    hesitationDetail = `Có ${eraseCount} lần điều chỉnh nét vẽ. Tư duy ổn định nhưng có đôi chút chưa chắc chắn.`;
  } else if (strokeCount > 0 && eraseCount === 0) {
    hesitationScore = 'Rất tự tin';
    hesitationDetail = 'Không có vết tẩy xóa. Nét viết dứt khoát, mạch tư duy trôi chảy.';
  }

  const handleSubmit = () => {
    const canvas = canvasRef.current;
    const imageBase64 = canvas ? canvas.toDataURL('image/png') : '';

    const telemetry: ScratchpadTelemetry = {
      strokeCount,
      eraseCount,
      drawDurationSeconds: drawDuration,
      hesitationScore,
      hesitationDetail,
      typedSolution,
    };

    onSubmitForGrading(telemetry, imageBase64, typedSolution);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50/50 to-white border border-amber-200/80 rounded-2xl p-5 md:p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold uppercase tracking-wider">
                PHẦN 3: BÀI TẬP THÍCH ỨNG & BẢNG NHÁP
              </span>
              <span className="text-xs text-slate-500">• Stroke-by-Stroke & Scaffolding Tăng Độ Khó</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-amber-950">
              Bảng Nháp Thông Minh & Giám Sát Nét Vẽ
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
              Hệ thống theo dõi luồng suy nghĩ thực tế qua nét viết tay, số lần tẩy xóa và đo lường độ ngập ngừng tư duy.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || (strokeCount === 0 && !typedSolution)}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all disabled:opacity-50 hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI Đang Chẩn Đoán Tiến Trình...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Nộp Bài Nháp & Chẩn Đoán (Giai Đoạn 4)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scaffolding Exercise Selection Tabs */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Chọn bài tập Dàn Giáo (Scaffolding Tăng Độ Khó 10% - 20% - 30%):
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {exercises.map((ex, idx) => {
            const isSelected = selectedExerciseIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedExerciseIndex(idx);
                  setShowHint(false);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-50 border-amber-500 text-amber-950 ring-1 ring-amber-500/30 shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-400">{ex.tier}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">{ex.difficultyLabel}</span>
                </div>
                <h4 className="text-xs font-semibold text-slate-200 truncate">{ex.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Active Exercise Detail Box */}
        {currentExercise && (
          <div className="mt-3 p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-amber-400" /> Đề bài đang thực hành: {currentExercise.title}
              </span>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-[11px] font-semibold text-amber-400 hover:underline flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý scaffolding'}
              </button>
            </div>
            <p className="text-xs font-medium text-slate-100 leading-relaxed font-mono">
              {currentExercise.problemText}
            </p>
            {showHint && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                <strong>Gợi ý sư phạm:</strong> {currentExercise.hint}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Smart Scratchpad + Telemetry Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Smart Canvas Scratchpad */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            {/* Canvas Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              {/* Tool selector */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTool('pen')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeTool === 'pen' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" /> Bút Vẽ
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTool('eraser')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeTool === 'eraser' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Eraser className="w-3.5 h-3.5" /> Tẩy Xóa
                </button>
              </div>

              {/* Pen Color Palette */}
              {activeTool === 'pen' && (
                <div className="flex items-center gap-1.5">
                  {['#2563eb', '#d97706', '#059669', '#dc2626', '#7c3aed', '#0f172a'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setPenColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-6 h-6 rounded-full transition-transform ${penColor === color ? 'ring-2 ring-slate-850 scale-110' : 'opacity-80 hover:opacity-100'}`}
                    />
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleUndo}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                  title="Hoàn tác nét vẽ"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleClearCanvas}
                  className="px-2.5 py-1 bg-rose-950/80 border border-rose-500/40 text-rose-300 hover:bg-rose-900 rounded-lg text-xs font-semibold"
                >
                  Xóa Bảng
                </button>
                <button
                  type="button"
                  onClick={handleReplayStrokes}
                  disabled={strokes.length === 0 || isReplaying}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Phát Lại Stroke</span>
                </button>
              </div>
            </div>

            {/* Drawing Canvas Board */}
            <div className="relative w-full h-[320px] md:h-[380px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 touch-none shadow-inner">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full cursor-crosshair"
              />

              {strokes.length === 0 && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-slate-600 text-xs font-medium">
                  Hãy dùng bút viết lời giải hoặc vẽ sơ đồ trên bảng nháp tại đây...
                </div>
              )}
            </div>

            {/* Typed Solution Editor (Alternative or Complementary) */}
            <div className="space-y-1.5 pt-2">
              <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Type className="w-4 h-4 text-amber-400" />
                Hoặc nhập bổ sung biến đổi công thức bằng chữ/số:
              </label>
              <textarea
                rows={2}
                value={typedSolution}
                onChange={(e) => setTypedSolution(e.target.value)}
                placeholder="Ví dụ: Bước 1: Nửa chu vi = 48/2 = 24. Bước 2: Dài + Rộng = 24..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-600 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Right Col: Stroke-by-Stroke Telemetry Monitor */}
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Activity className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Giám Sát Stroke-by-Stroke
              </h3>
            </div>

            <p className="text-xs text-slate-400">
              Đo lường thời thực hành vi viết tay, phát hiện độ ngập ngừng tư duy và lỗi tẩy xóa.
            </p>

            {/* Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Số Nét Vẽ (Strokes)</span>
                <p className="text-lg font-mono font-bold text-amber-400">{strokeCount}</p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Lần Tẩy Xóa (Erasures)</span>
                <p className={`text-lg font-mono font-bold ${eraseCount > 3 ? 'text-rose-400' : 'text-amber-400'}`}>
                  {eraseCount}
                </p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1 col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Thời Gian Viết Bảng Nháp
                </span>
                <p className="text-lg font-mono font-bold text-cyan-400">
                  {Math.floor(drawDuration / 60)} phút {drawDuration % 60} giây
                </p>
              </div>
            </div>

            {/* Hesitation Detector Gauge */}
            <div className="p-4 bg-slate-950 border border-amber-500/30 rounded-xl space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Chỉ Số Ngập Ngừng Tư Duy (Hesitation Metric):
              </span>

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{hesitationScore}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${hesitationScore === 'Rất tự tin' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : hesitationScore === 'Rất ngập ngừng (Cần hỗ trợ)' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                  {hesitationScore === 'Rất tự tin' ? 'Cao' : hesitationScore === 'Rất ngập ngừng (Cần hỗ trợ)' ? 'Nguy Cơ' : 'Trung Bình'}
                </span>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed italic">
                "{hesitationDetail}"
              </p>
            </div>

            {/* CTA Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || (strokeCount === 0 && !typedSolution)}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI Đang Phân Tích Lời Giải...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Hoàn Thành Bài Nháp & Xem Báo Cáo</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
