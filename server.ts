import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// Helper function to initialize GoogleGenAI SDK dynamically
function getAIClient(userKey?: string) {
  const apiKey = userKey || process.env.GEMINI_API_KEY || '';
  if (!apiKey) {
    throw new Error('Không tìm thấy API Key. Vui lòng cấu hình API Key trong mục Cài đặt trên ứng dụng.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback models to try in case of errors
const MODEL_FALLBACK_LIST = [
  'gemini-3-flash-preview',
  'gemini-3-pro-preview',
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-2.0-flash'
];

// Helper to generate content with fallback list
async function generateContentWithFallback(
  aiClient: GoogleGenAI,
  preferredModel: string,
  contents: any,
  config: any
) {
  const modelsToTry = [preferredModel, ...MODEL_FALLBACK_LIST.filter(m => m !== preferredModel)];
  let lastError: any = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`[AI Server] Attempting generateContent with model: ${modelName}`);
      const response = await aiClient.models.generateContent({
        model: modelName,
        contents,
        config,
      });
      console.log(`[AI Server] GenerateContent successful with model: ${modelName}`);
      return response;
    } catch (err: any) {
      console.warn(`[AI Server] Model ${modelName} failed:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error('Tất cả các model AI được thử nghiệm đều thất bại.');
}

// SYSTEM INSTRUCTION FOR GEMINI
const ARCHITECT_SYSTEM_INSTRUCTION = `
Bạn là một Hệ thống Trí tuệ Nhân tạo Giáo dục Cấp cao (Advanced AI Education Architect), đóng vai trò là "bộ nào" điều phối toàn bộ hệ sinh thái học tập thích ứng (Adaptive Learning Ecosystem).
Nhiệm vụ của bạn là kết nối dữ liệu hình ảnh/file (OCR) hoặc câu hỏi văn bản để tạo kịch bản giảng dạy đa tầng, điều phối video tương tác (Pop-up Quiz gatekeeper), bài tập dàn giáo (Scaffolding), và thực hiện chấm điểm tiến trình (Process-based Grading), Error Heatmap, Root Cause Analysis, cùng Remedial Roadmap.

Phong cách: Uyên bác nhưng dễ hiểu, truyền cảm hứng, kiên nhẫn.
Ngôn ngữ: Tiếng Việt sư phạm tích cực. Thay vì "Em đã sai", hãy dùng "Bước này tư duy của em đang gặp chút nhầm lẫn về công thức X, hãy thử nhìn lại...".
`;

// API 1: Analyze problem & build Stage 1, Stage 2, Stage 3 data
app.post('/api/analyze-problem', async (req, res) => {
  try {
    const userKey = req.headers['x-gemini-key'] as string;
    const preferredModel = (req.headers['x-gemini-model'] as string) || 'gemini-3-pro-preview';
    const aiClient = getAIClient(userKey);

    const { problemText, imageBase64, gradeLevel, tone, subject } = req.body;

    if (!problemText && !imageBase64) {
      return res.status(400).json({ error: 'Vui lòng cung cấp văn bản bài toán hoặc hình ảnh OCR.' });
    }

    const contents: any[] = [];
    
    if (imageBase64) {
      let mimeType = 'image/png';
      const mimeMatch = imageBase64.match(/^data:([^;]+);base64,/);
      if (mimeMatch) {
        mimeType = mimeMatch[1];
      }
      const base64Clean = imageBase64.replace(/^data:[^;]+;base64,/, '');
      contents.push({
        inlineData: {
          mimeType,
          data: base64Clean,
        },
      });
    }

    const promptText = `
Hãy thực hiện vai trò Adaptive AI Education Architect và phân tích bài toán sau:
Văn bản bài toán: "${problemText || 'Phân tích từ hình ảnh được đính kèm'}"
Trình độ học sinh: ${gradeLevel || 'THPT'}
Tông giọng giảng dạy: ${tone || 'chuyên_sâu'}
Môn học: ${subject || 'toán'}

Hãy xuất ra kết quả cấu trúc JSON tuân thủ đầy đủ 3 Giai đoạn:
Giai đoạn 1: OCR Data, Micro-logic steps (Bước 1, 2, 3), Pedagogical Prompt (Chỉ dẫn cho AI Video: Tông giọng, Tốc độ, Key visual, Điểm nhấn [Slow / Emphasis]).
Giai đoạn 2: Video Script (Nội dung Avatar nói từng mốc thời gian) và Pop-up Quiz (Câu hỏi kiểm tra chốt chặn giữa bài với giải thích).
Giai đoạn 3: Kho bài tập dàn giáo (Scaffolding 3 bài tập với độ khó tăng dần +10%, +20%, +30%).
`;

    contents.push({ text: promptText });

    const response = await generateContentWithFallback(
      aiClient,
      preferredModel,
      contents,
      {
        systemInstruction: ARCHITECT_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ocrData: { type: Type.STRING, description: 'Văn bản bài toán đã bóc tách OCR' },
            logicSteps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stepNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  content: { type: Type.STRING },
                  keyFormula: { type: Type.STRING },
                  keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['stepNumber', 'title', 'content', 'keywords'],
              },
            },
            pedagogicalPrompt: {
              type: Type.OBJECT,
              properties: {
                tone: { type: Type.STRING },
                pace: { type: Type.STRING },
                emphasisPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                keyVisuals: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['tone', 'pace', 'emphasisPoints', 'keyVisuals'],
            },
            videoScript: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  timeSeconds: { type: Type.INTEGER },
                  speakerText: { type: Type.STRING },
                  motionGraphicNote: { type: Type.STRING },
                  visualCue: { type: Type.STRING },
                },
                required: ['timeSeconds', 'speakerText', 'motionGraphicNote', 'visualCue'],
              },
            },
            popupQuiz: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswerIndex: { type: Type.INTEGER },
                explanation: { type: Type.STRING },
                gatekeeperMessage: { type: Type.STRING },
              },
              required: ['question', 'options', 'correctAnswerIndex', 'explanation', 'gatekeeperMessage'],
            },
            exercises: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  tier: { type: Type.STRING, description: '+10%, +20%, or +30%' },
                  difficultyLabel: { type: Type.STRING },
                  title: { type: Type.STRING },
                  problemText: { type: Type.STRING },
                  hint: { type: Type.STRING },
                },
                required: ['tier', 'difficultyLabel', 'title', 'problemText', 'hint'],
              },
            },
          },
          required: ['ocrData', 'logicSteps', 'pedagogicalPrompt', 'videoScript', 'popupQuiz', 'exercises'],
        },
      },
    );

    const responseText = response.text || '{}';
    const parsedData = JSON.parse(responseText);

    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error analyzing problem with Gemini:', error);
    res.status(500).json({ error: error?.message || 'Không thể phân tích bài toán với Gemini API.' });
  }
});

// API 2: Evaluate Student Scratchpad & Generate Stage 4 Diagnostic Report
app.post('/api/evaluate-scratchpad', async (req, res) => {
  try {
    const userKey = req.headers['x-gemini-key'] as string;
    const preferredModel = (req.headers['x-gemini-model'] as string) || 'gemini-3-pro-preview';
    const aiClient = getAIClient(userKey);

    const { problemText, scratchpadImageBase64, typedSolution, telemetry } = req.body;

    const contents: any[] = [];

    if (scratchpadImageBase64) {
      let mimeType = 'image/png';
      const mimeMatch = scratchpadImageBase64.match(/^data:([^;]+);base64,/);
      if (mimeMatch) {
        mimeType = mimeMatch[1];
      }
      const base64Clean = scratchpadImageBase64.replace(/^data:[^;]+;base64,/, '');
      contents.push({
        inlineData: {
          mimeType,
          data: base64Clean,
        },
      });
    }

    const telemetryPrompt = `
Hãy đóng vai Adaptive AI Education Architect thực hiện [PHẦN 4: BÁO CÁO CHẨN ĐOÁN] - Chấm điểm dựa trên tiến trình (Process-based Grading).

Đề bài gốc: "${problemText}"
Lời giải học sinh gõ chữ: "${typedSolution || 'N/A (Học sinh vẽ/viết trên bảng nháp)'}"

Dữ liệu Stroke-by-stroke từ Bảng nháp Thông minh:
- Số nét vẽ (Stroke count): ${telemetry?.strokeCount || 0}
- Số lần tẩy xóa (Erase count): ${telemetry?.eraseCount || 0}
- Thời gian thực hiện: ${telemetry?.drawDurationSeconds || 0} giây
- Đánh giá độ ngập ngừng tư duy (Hesitation Score): ${telemetry?.hesitationScore || 'Bình thường'}

Nhiệm vụ của bạn:
1. Chấm điểm tiến trình (Process Score / 100) dựa trên tư duy logic, mức độ chính xác và độ ngập ngừng.
2. Tạo Error Heatmap phân loại theo các vùng:
   - "green" (Tư duy tốt, chính xác)
   - "yellow" (Lỗi sai số, nhầm phép tính nhỏ, ngập ngừng tẩy xóa)
   - "red" (Lỗi sai logic nền tảng, sai bản chất)
3. Phân tích nguyên nhân gốc rễ (Root Cause Analysis).
4. Đưa ra nhận xét sư phạm tích cực, truyền cảm hứng (Mentor Feedback).
5. Lộ trình khắc phục (Remedial Roadmap) gồm 1 khái niệm cần ôn lại và 01 bài kiểm tra Quick Fix để kiểm tra xem học sinh đã khắc phục lỗi chưa.
`;

    contents.push({ text: telemetryPrompt });

    const response = await generateContentWithFallback(
      aiClient,
      preferredModel,
      contents,
      {
        systemInstruction: ARCHITECT_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            processScore: { type: Type.INTEGER },
            scoreBreakdown: {
              type: Type.OBJECT,
              properties: {
                logicalReasoning: { type: Type.INTEGER },
                calculationAccuracy: { type: Type.INTEGER },
                clarity: { type: Type.INTEGER },
              },
              required: ['logicalReasoning', 'calculationAccuracy', 'clarity'],
            },
            errorHeatmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stepName: { type: Type.STRING },
                  status: { type: Type.STRING, description: 'green, yellow, or red' },
                  statusLabel: { type: Type.STRING },
                  detail: { type: Type.STRING },
                  studentAttempt: { type: Type.STRING },
                  correctLogic: { type: Type.STRING },
                },
                required: ['stepName', 'status', 'statusLabel', 'detail', 'studentAttempt', 'correctLogic'],
              },
            },
            rootCauseAnalysis: {
              type: Type.OBJECT,
              properties: {
                coreGap: { type: Type.STRING },
                misconceptionType: { type: Type.STRING },
                detailedExplanation: { type: Type.STRING },
              },
              required: ['coreGap', 'misconceptionType', 'detailedExplanation'],
            },
            mentorFeedback: { type: Type.STRING },
            remedialRoadmap: {
              type: Type.OBJECT,
              properties: {
                recapConceptName: { type: Type.STRING },
                recapSummary: { type: Type.STRING },
                quickFixQuestion: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctAnswerIndex: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                  },
                  required: ['question', 'options', 'correctAnswerIndex', 'explanation'],
                },
              },
              required: ['recapConceptName', 'recapSummary', 'quickFixQuestion'],
            },
          },
          required: ['processScore', 'scoreBreakdown', 'errorHeatmap', 'rootCauseAnalysis', 'mentorFeedback', 'remedialRoadmap'],
        },
      },
    );

    const responseText = response.text || '{}';
    const parsedReport = JSON.parse(responseText);

    res.json({ success: true, report: parsedReport });
  } catch (error: any) {
    console.error('Error evaluating scratchpad:', error);
    res.status(500).json({ error: error?.message || 'Không thể chấm điểm bảng nháp.' });
  }
});

// Vite & Static file setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Adaptive AI Architect Server] running on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL && !process.env.VERCEL_ENV && !process.env.NOW_REGION) {
  startServer();
}

export default app;
