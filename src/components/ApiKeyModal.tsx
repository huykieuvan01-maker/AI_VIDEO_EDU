import React, { useState, useEffect } from 'react';
import { Key, Cpu, ExternalLink, Save, X, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isForced?: boolean;
}

export const ApiKeyModal: React.FC<Props> = ({ isOpen, onClose, isForced = false }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3-flash-preview');

  useEffect(() => {
    if (isOpen) {
      const savedKey = localStorage.getItem('gemini_api_key') || '';
      const savedModel = localStorage.getItem('gemini_model') || 'gemini-3-flash-preview';
      setApiKey(savedKey);
      setSelectedModel(savedModel);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('gemini_api_key', apiKey.trim());
    localStorage.setItem('gemini_model', selectedModel);
    onClose();
    // Dispatch custom event to notify App.tsx that settings changed
    window.dispatchEvent(new Event('gemini_settings_changed'));
  };

  const models = [
    {
      id: 'gemini-3-flash-preview',
      name: 'Gemini 3 Flash Preview',
      badge: 'Default / Nhanh & Tối ưu',
      description: 'Phù hợp nhất cho OCR nhanh và phân tích đề toán cơ bản, phản hồi nhanh chóng.',
    },
    {
      id: 'gemini-3-pro-preview',
      name: 'Gemini 3 Pro Preview',
      badge: 'Chuyên sâu & Thông minh',
      description: 'Khuyên dùng cho các bài toán phức tạp, hình học, vẽ bảng nháp và chẩn đoán sâu sắc.',
    },
    {
      id: 'gemini-2.5-flash',
      name: 'Gemini 2.5 Flash',
      badge: 'Hiệu năng cao',
      description: 'Model hiệu năng cao cho xử lý tác vụ thông thường ổn định.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl text-slate-100 p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Cấu Hình API Key & Model AI</h2>
          </div>
          {!isForced && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-100 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs md:text-sm text-slate-300">
          <div className="space-y-2">
            <label className="block font-semibold text-slate-200 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-indigo-400" />
              Nhập Google Gemini API Key:
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Nhập AIzaSy..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-all font-mono"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <span>API key được lưu trữ an toàn tại máy cục bộ (localStorage).</span>
              <a
                href="https://aistudio.google.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline flex items-center gap-0.5 font-medium"
              >
                Lấy API key miễn phí <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="block font-semibold text-slate-200 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-400" />
              Chọn Model AI chạy ứng dụng:
            </label>
            <div className="grid grid-cols-1 gap-2">
              {models.map((model) => {
                const isSelected = selectedModel === model.id;
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setSelectedModel(model.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-100 text-indigo-950 border-indigo-500 ring-1 ring-indigo-500/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs font-bold ${isSelected ? 'text-indigo-950' : 'text-slate-200'}`}>
                        {model.name}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {model.badge}
                      </span>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-indigo-900/80' : 'text-slate-450'}`}>
                      {model.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
          {!isForced && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition-all"
            >
              Hủy
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={isForced && !apiKey.trim()}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>Lưu cấu hình</span>
          </button>
        </div>

      </div>
    </div>
  );
};
