export type GradeLevel = 'tiểu_học' | 'thcs' | 'thpt' | 'đại_học';
export type PedagogicalTone = 'gần_gũi' | 'chuyên_sâu' | 'socratic';
export type SubjectCategory = 'toán' | 'vật_lý' | 'hóa_học' | 'stem';

export interface ProblemInput {
  title?: string;
  problemText: string;
  imageBase64?: string;
  gradeLevel: GradeLevel;
  tone: PedagogicalTone;
  subject: SubjectCategory;
}

export interface LogicStep {
  stepNumber: number;
  title: string;
  content: string;
  keyFormula?: string;
  keywords: string[];
}

export interface PedagogicalPrompt {
  tone: string;
  pace: string;
  emphasisPoints: string[];
  keyVisuals: string[];
}

export interface VideoScriptTurn {
  timeSeconds: number;
  speakerText: string;
  motionGraphicNote: string;
  visualCue: string;
}

export interface PopupQuiz {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  gatekeeperMessage: string;
}

export interface ScaffoldingExercise {
  tier: '+10%' | '+20%' | '+30%';
  difficultyLabel: string;
  title: string;
  problemText: string;
  hint: string;
}

export interface Stage1To3Data {
  // Part 1
  ocrData: string;
  logicSteps: LogicStep[];
  pedagogicalPrompt: PedagogicalPrompt;
  
  // Part 2
  videoScript: VideoScriptTurn[];
  popupQuiz: PopupQuiz;
  
  // Part 3
  exercises: ScaffoldingExercise[];
}

export interface StrokePoint {
  x: number;
  y: number;
  t: number;
}

export interface StrokeData {
  points: StrokePoint[];
  isEraser: boolean;
  color: string;
  width: number;
}

export interface ScratchpadTelemetry {
  strokeCount: number;
  eraseCount: number;
  drawDurationSeconds: number;
  hesitationScore: 'Rất tự tin' | 'Bình thường' | 'Ngập ngừng nhẹ' | 'Rất ngập ngừng (Cần hỗ trợ)';
  hesitationDetail: string;
  typedSolution: string;
}

export interface HeatmapStep {
  stepName: string;
  status: 'green' | 'yellow' | 'red';
  statusLabel: string; // 'Tư duy tốt' | 'Sai số / Nhầm lẫn nhỏ' | 'Lỗi sai logic nền tảng'
  detail: string;
  studentAttempt: string;
  correctLogic: string;
}

export interface DiagnosticReport {
  // Part 4
  processScore: number;
  scoreBreakdown: {
    logicalReasoning: number;
    calculationAccuracy: number;
    clarity: number;
  };
  errorHeatmap: HeatmapStep[];
  rootCauseAnalysis: {
    coreGap: string;
    misconceptionType: string;
    detailedExplanation: string;
  };
  mentorFeedback: string;
  remedialRoadmap: {
    recapConceptName: string;
    recapSummary: string;
    quickFixQuestion: {
      question: string;
      options: string[];
      correctAnswerIndex: number;
      explanation: string;
    };
  };
}
