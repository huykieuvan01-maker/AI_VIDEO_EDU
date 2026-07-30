import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SystemInstructionModal } from './components/SystemInstructionModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { ProblemInputSection } from './components/ProblemInputSection';
import { Stage1View } from './components/Stage1View';
import { Stage2View } from './components/Stage2View';
import { Stage3View } from './components/Stage3View';
import { Stage4View } from './components/Stage4View';
import { ProblemInput, Stage1To3Data, DiagnosticReport, ScratchpadTelemetry } from './types';
import { SAMPLE_PROBLEMS } from './data/sampleProblems';
import { Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4>(1);
  const [isStage2Unlocked, setIsStage2Unlocked] = useState<boolean>(true);
  const [isStage3Unlocked, setIsStage3Unlocked] = useState<boolean>(true); // Pre-unlocked for demo flow or controlled by quiz
  const [isStage4Unlocked, setIsStage4Unlocked] = useState<boolean>(true);

  const [stage1To3Data, setStage1To3Data] = useState<Stage1To3Data | null>(SAMPLE_PROBLEMS[0].presetData);
  const [diagnosticReport, setDiagnosticReport] = useState<DiagnosticReport | null>(SAMPLE_PROBLEMS[0].presetReport);
  const [submittedTelemetry, setSubmittedTelemetry] = useState<ScratchpadTelemetry | null>(SAMPLE_PROBLEMS[0].presetReport ? {
    strokeCount: 12,
    eraseCount: 1,
    drawDurationSeconds: 78,
    hesitationScore: 'Bình thường',
    hesitationDetail: 'Nét vẽ mượt mà, ổn định.',
    typedSolution: ''
  } : null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmittingScratchpad, setIsSubmittingScratchpad] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isInstructionModalOpen, setIsInstructionModalOpen] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [isForcedApiKey, setIsForcedApiKey] = useState<boolean>(false);

  useEffect(() => {
    const checkApiKey = () => {
      const savedKey = localStorage.getItem('gemini_api_key') || '';
      if (!savedKey) {
        setIsForcedApiKey(true);
        setIsApiKeyModalOpen(true);
      } else {
        setIsForcedApiKey(false);
      }
    };
    checkApiKey();
    window.addEventListener('gemini_settings_changed', checkApiKey);
    return () => window.removeEventListener('gemini_settings_changed', checkApiKey);
  }, []);

  // Trigger analysis for custom problem or sample preset
  const handleAnalyzeProblem = async (
    input: ProblemInput,
    presetData?: Stage1To3Data,
    presetReport?: DiagnosticReport
  ) => {
    setErrorMessage(null);

    // If preset provided, load immediately for fast smooth user experience
    if (presetData) {
      setStage1To3Data(presetData);
      if (presetReport) setDiagnosticReport(presetReport);
      setActiveStage(1);
      setIsStage2Unlocked(true);
      setIsStage3Unlocked(true);
      setIsStage4Unlocked(true);
      return;
    }

    // Call Gemini API server backend endpoint
    setIsLoading(true);
    try {
      const savedKey = localStorage.getItem('gemini_api_key') || '';
      const savedModel = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';

      const response = await fetch('/api/analyze-problem', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-gemini-key': savedKey,
          'x-gemini-model': savedModel
        },
        body: JSON.stringify(input),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.error || 'Không thể kết nối với hệ thống Gemini AI Architect.');
      }

      setStage1To3Data(resData.data);
      setActiveStage(1);
      setIsStage2Unlocked(true);
      setIsStage3Unlocked(false); // Gatekeeper quiz locks Stage 3 until answered!
      setIsStage4Unlocked(false);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(err?.message || 'Có lỗi xảy ra trong quá trình phân tích bài toán.');
      setIsStage2Unlocked(false);
      setIsStage3Unlocked(false);
      setIsStage4Unlocked(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Scratchpad solution to Stage 4 Process-based Grading
  const handleSubmitScratchpad = async (
    telemetry: ScratchpadTelemetry,
    scratchpadImageBase64: string,
    typedSolution: string
  ) => {
    setIsSubmittingScratchpad(true);
    setErrorMessage(null);
    setSubmittedTelemetry(telemetry);

    try {
      const savedKey = localStorage.getItem('gemini_api_key') || '';
      const savedModel = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';

      const response = await fetch('/api/evaluate-scratchpad', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-gemini-key': savedKey,
          'x-gemini-model': savedModel
        },
        body: JSON.stringify({
          problemText: stage1To3Data?.ocrData || 'Bài toán',
          scratchpadImageBase64,
          typedSolution,
          telemetry,
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.report) {
        throw new Error(resData.error || 'Không thể tạo Báo cáo Chẩn đoán.');
      }

      setDiagnosticReport(resData.report);
      setIsStage4Unlocked(true);
      setActiveStage(4);
    } catch (err: any) {
      console.error('Scratchpad evaluation error:', err);
      // Fallback to current preset or show error
      if (diagnosticReport) {
        setIsStage4Unlocked(true);
        setActiveStage(4);
      } else {
        setErrorMessage(err?.message || 'Có lỗi khi chấm điểm tiến trình.');
        setIsStage4Unlocked(false);
      }
    } finally {
      setIsSubmittingScratchpad(false);
    }
  };

  const handleResetAll = () => {
    setActiveStage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      {/* App Header & Navigation */}
      <Header
        activeStage={activeStage}
        setActiveStage={setActiveStage}
        onOpenInstructionModal={() => setIsInstructionModalOpen(true)}
        onOpenSettings={() => {
          setIsForcedApiKey(false);
          setIsApiKeyModalOpen(true);
        }}
        isStage2Unlocked={isStage2Unlocked}
        isStage3Unlocked={isStage3Unlocked}
        isStage4Unlocked={isStage4Unlocked}
        isLoading={isLoading || isSubmittingScratchpad}
        errorMessage={errorMessage}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs font-medium flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 rounded-lg text-rose-800 font-bold transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        )}

        {/* Problem Input & Preset Selection Panel */}
        <ProblemInputSection onAnalyze={handleAnalyzeProblem} isLoading={isLoading} />

        {/* Stage Content Renderer */}
        {stage1To3Data && (
          <div className="transition-all duration-300">
            {activeStage === 1 && (
              <Stage1View
                data={stage1To3Data}
                onProceedToStage2={() => {
                  setIsStage2Unlocked(true);
                  setActiveStage(2);
                }}
              />
            )}

            {activeStage === 2 && (
              <Stage2View
                data={stage1To3Data}
                onProceedToStage3={() => {
                  setIsStage3Unlocked(true);
                  setActiveStage(3);
                }}
                isStage3Unlocked={isStage3Unlocked}
                setIsStage3Unlocked={setIsStage3Unlocked}
              />
            )}

            {activeStage === 3 && (
              <Stage3View
                data={stage1To3Data}
                onSubmitForGrading={handleSubmitScratchpad}
                isSubmitting={isSubmittingScratchpad}
              />
            )}

            {activeStage === 4 && diagnosticReport && stage1To3Data && (
              <Stage4View 
                report={diagnosticReport} 
                data={stage1To3Data} 
                telemetry={submittedTelemetry} 
                onResetAll={handleResetAll} 
              />
            )}
          </div>
        )}
      </main>

      {/* System Instruction Modal */}
      <SystemInstructionModal
        isOpen={isInstructionModalOpen}
        onClose={() => setIsInstructionModalOpen(false)}
      />

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        isForced={isForcedApiKey}
      />
    </div>
  );
}
