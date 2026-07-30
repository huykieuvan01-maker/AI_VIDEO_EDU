var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json({ limit: "15mb" }));
function getAIClient(userKey) {
  const apiKey = userKey || process.env.GEMINI_API_KEY || "";
  if (!apiKey) {
    throw new Error("Kh\xF4ng t\xECm th\u1EA5y API Key. Vui l\xF2ng c\u1EA5u h\xECnh API Key trong m\u1EE5c C\xE0i \u0111\u1EB7t tr\xEAn \u1EE9ng d\u1EE5ng.");
  }
  return new import_genai.GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}
var MODEL_FALLBACK_LIST = [
  "gemini-3-flash-preview",
  "gemini-3-pro-preview",
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-2.0-flash"
];
async function generateContentWithFallback(aiClient, preferredModel, contents, config) {
  const modelsToTry = [preferredModel, ...MODEL_FALLBACK_LIST.filter((m) => m !== preferredModel)];
  let lastError = null;
  for (const modelName of modelsToTry) {
    try {
      console.log(`[AI Server] Attempting generateContent with model: ${modelName}`);
      const response = await aiClient.models.generateContent({
        model: modelName,
        contents,
        config
      });
      console.log(`[AI Server] GenerateContent successful with model: ${modelName}`);
      return response;
    } catch (err) {
      console.warn(`[AI Server] Model ${modelName} failed:`, err?.message || err);
      lastError = err;
    }
  }
  throw lastError || new Error("T\u1EA5t c\u1EA3 c\xE1c model AI \u0111\u01B0\u1EE3c th\u1EED nghi\u1EC7m \u0111\u1EC1u th\u1EA5t b\u1EA1i.");
}
var ARCHITECT_SYSTEM_INSTRUCTION = `
B\u1EA1n l\xE0 m\u1ED9t H\u1EC7 th\u1ED1ng Tr\xED tu\u1EC7 Nh\xE2n t\u1EA1o Gi\xE1o d\u1EE5c C\u1EA5p cao (Advanced AI Education Architect), \u0111\xF3ng vai tr\xF2 l\xE0 "b\u1ED9 n\xE0o" \u0111i\u1EC1u ph\u1ED1i to\xE0n b\u1ED9 h\u1EC7 sinh th\xE1i h\u1ECDc t\u1EADp th\xEDch \u1EE9ng (Adaptive Learning Ecosystem).
Nhi\u1EC7m v\u1EE5 c\u1EE7a b\u1EA1n l\xE0 k\u1EBFt n\u1ED1i d\u1EEF li\u1EC7u h\xECnh \u1EA3nh/file (OCR) ho\u1EB7c c\xE2u h\u1ECFi v\u0103n b\u1EA3n \u0111\u1EC3 t\u1EA1o k\u1ECBch b\u1EA3n gi\u1EA3ng d\u1EA1y \u0111a t\u1EA7ng, \u0111i\u1EC1u ph\u1ED1i video t\u01B0\u01A1ng t\xE1c (Pop-up Quiz gatekeeper), b\xE0i t\u1EADp d\xE0n gi\xE1o (Scaffolding), v\xE0 th\u1EF1c hi\u1EC7n ch\u1EA5m \u0111i\u1EC3m ti\u1EBFn tr\xECnh (Process-based Grading), Error Heatmap, Root Cause Analysis, c\xF9ng Remedial Roadmap.

Phong c\xE1ch: Uy\xEAn b\xE1c nh\u01B0ng d\u1EC5 hi\u1EC3u, truy\u1EC1n c\u1EA3m h\u1EE9ng, ki\xEAn nh\u1EABn.
Ng\xF4n ng\u1EEF: Ti\u1EBFng Vi\u1EC7t s\u01B0 ph\u1EA1m t\xEDch c\u1EF1c. Thay v\xEC "Em \u0111\xE3 sai", h\xE3y d\xF9ng "B\u01B0\u1EDBc n\xE0y t\u01B0 duy c\u1EE7a em \u0111ang g\u1EB7p ch\xFAt nh\u1EA7m l\u1EABn v\u1EC1 c\xF4ng th\u1EE9c X, h\xE3y th\u1EED nh\xECn l\u1EA1i...".
`;
app.post("/api/analyze-problem", async (req, res) => {
  try {
    const userKey = req.headers["x-gemini-key"];
    const preferredModel = req.headers["x-gemini-model"] || "gemini-3-pro-preview";
    const aiClient = getAIClient(userKey);
    const { problemText, imageBase64, gradeLevel, tone, subject } = req.body;
    if (!problemText && !imageBase64) {
      return res.status(400).json({ error: "Vui l\xF2ng cung c\u1EA5p v\u0103n b\u1EA3n b\xE0i to\xE1n ho\u1EB7c h\xECnh \u1EA3nh OCR." });
    }
    const contents = [];
    if (imageBase64) {
      let mimeType = "image/png";
      const mimeMatch = imageBase64.match(/^data:([^;]+);base64,/);
      if (mimeMatch) {
        mimeType = mimeMatch[1];
      }
      const base64Clean = imageBase64.replace(/^data:[^;]+;base64,/, "");
      contents.push({
        inlineData: {
          mimeType,
          data: base64Clean
        }
      });
    }
    const promptText = `
H\xE3y th\u1EF1c hi\u1EC7n vai tr\xF2 Adaptive AI Education Architect v\xE0 ph\xE2n t\xEDch b\xE0i to\xE1n sau:
V\u0103n b\u1EA3n b\xE0i to\xE1n: "${problemText || "Ph\xE2n t\xEDch t\u1EEB h\xECnh \u1EA3nh \u0111\u01B0\u1EE3c \u0111\xEDnh k\xE8m"}"
Tr\xECnh \u0111\u1ED9 h\u1ECDc sinh: ${gradeLevel || "THPT"}
T\xF4ng gi\u1ECDng gi\u1EA3ng d\u1EA1y: ${tone || "chuy\xEAn_s\xE2u"}
M\xF4n h\u1ECDc: ${subject || "to\xE1n"}

H\xE3y xu\u1EA5t ra k\u1EBFt qu\u1EA3 c\u1EA5u tr\xFAc JSON tu\xE2n th\u1EE7 \u0111\u1EA7y \u0111\u1EE7 3 Giai \u0111o\u1EA1n:
Giai \u0111o\u1EA1n 1: OCR Data, Micro-logic steps (B\u01B0\u1EDBc 1, 2, 3), Pedagogical Prompt (Ch\u1EC9 d\u1EABn cho AI Video: T\xF4ng gi\u1ECDng, T\u1ED1c \u0111\u1ED9, Key visual, \u0110i\u1EC3m nh\u1EA5n [Slow / Emphasis]).
Giai \u0111o\u1EA1n 2: Video Script (N\u1ED9i dung Avatar n\xF3i t\u1EEBng m\u1ED1c th\u1EDDi gian) v\xE0 Pop-up Quiz (C\xE2u h\u1ECFi ki\u1EC3m tra ch\u1ED1t ch\u1EB7n gi\u1EEFa b\xE0i v\u1EDBi gi\u1EA3i th\xEDch).
Giai \u0111o\u1EA1n 3: Kho b\xE0i t\u1EADp d\xE0n gi\xE1o (Scaffolding 3 b\xE0i t\u1EADp v\u1EDBi \u0111\u1ED9 kh\xF3 t\u0103ng d\u1EA7n +10%, +20%, +30%).
`;
    contents.push({ text: promptText });
    const response = await generateContentWithFallback(
      aiClient,
      preferredModel,
      contents,
      {
        systemInstruction: ARCHITECT_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            ocrData: { type: import_genai.Type.STRING, description: "V\u0103n b\u1EA3n b\xE0i to\xE1n \u0111\xE3 b\xF3c t\xE1ch OCR" },
            logicSteps: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  stepNumber: { type: import_genai.Type.INTEGER },
                  title: { type: import_genai.Type.STRING },
                  content: { type: import_genai.Type.STRING },
                  keyFormula: { type: import_genai.Type.STRING },
                  keywords: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } }
                },
                required: ["stepNumber", "title", "content", "keywords"]
              }
            },
            pedagogicalPrompt: {
              type: import_genai.Type.OBJECT,
              properties: {
                tone: { type: import_genai.Type.STRING },
                pace: { type: import_genai.Type.STRING },
                emphasisPoints: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
                keyVisuals: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } }
              },
              required: ["tone", "pace", "emphasisPoints", "keyVisuals"]
            },
            videoScript: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  timeSeconds: { type: import_genai.Type.INTEGER },
                  speakerText: { type: import_genai.Type.STRING },
                  motionGraphicNote: { type: import_genai.Type.STRING },
                  visualCue: { type: import_genai.Type.STRING }
                },
                required: ["timeSeconds", "speakerText", "motionGraphicNote", "visualCue"]
              }
            },
            popupQuiz: {
              type: import_genai.Type.OBJECT,
              properties: {
                question: { type: import_genai.Type.STRING },
                options: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
                correctAnswerIndex: { type: import_genai.Type.INTEGER },
                explanation: { type: import_genai.Type.STRING },
                gatekeeperMessage: { type: import_genai.Type.STRING }
              },
              required: ["question", "options", "correctAnswerIndex", "explanation", "gatekeeperMessage"]
            },
            exercises: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  tier: { type: import_genai.Type.STRING, description: "+10%, +20%, or +30%" },
                  difficultyLabel: { type: import_genai.Type.STRING },
                  title: { type: import_genai.Type.STRING },
                  problemText: { type: import_genai.Type.STRING },
                  hint: { type: import_genai.Type.STRING }
                },
                required: ["tier", "difficultyLabel", "title", "problemText", "hint"]
              }
            }
          },
          required: ["ocrData", "logicSteps", "pedagogicalPrompt", "videoScript", "popupQuiz", "exercises"]
        }
      }
    );
    const responseText = response.text || "{}";
    const parsedData = JSON.parse(responseText);
    res.json({ success: true, data: parsedData });
  } catch (error) {
    console.error("Error analyzing problem with Gemini:", error);
    res.status(500).json({ error: error?.message || "Kh\xF4ng th\u1EC3 ph\xE2n t\xEDch b\xE0i to\xE1n v\u1EDBi Gemini API." });
  }
});
app.post("/api/evaluate-scratchpad", async (req, res) => {
  try {
    const userKey = req.headers["x-gemini-key"];
    const preferredModel = req.headers["x-gemini-model"] || "gemini-3-pro-preview";
    const aiClient = getAIClient(userKey);
    const { problemText, scratchpadImageBase64, typedSolution, telemetry } = req.body;
    const contents = [];
    if (scratchpadImageBase64) {
      let mimeType = "image/png";
      const mimeMatch = scratchpadImageBase64.match(/^data:([^;]+);base64,/);
      if (mimeMatch) {
        mimeType = mimeMatch[1];
      }
      const base64Clean = scratchpadImageBase64.replace(/^data:[^;]+;base64,/, "");
      contents.push({
        inlineData: {
          mimeType,
          data: base64Clean
        }
      });
    }
    const telemetryPrompt = `
H\xE3y \u0111\xF3ng vai Adaptive AI Education Architect th\u1EF1c hi\u1EC7n [PH\u1EA6N 4: B\xC1O C\xC1O CH\u1EA8N \u0110O\xC1N] - Ch\u1EA5m \u0111i\u1EC3m d\u1EF1a tr\xEAn ti\u1EBFn tr\xECnh (Process-based Grading).

\u0110\u1EC1 b\xE0i g\u1ED1c: "${problemText}"
L\u1EDDi gi\u1EA3i h\u1ECDc sinh g\xF5 ch\u1EEF: "${typedSolution || "N/A (H\u1ECDc sinh v\u1EBD/vi\u1EBFt tr\xEAn b\u1EA3ng nh\xE1p)"}"

D\u1EEF li\u1EC7u Stroke-by-stroke t\u1EEB B\u1EA3ng nh\xE1p Th\xF4ng minh:
- S\u1ED1 n\xE9t v\u1EBD (Stroke count): ${telemetry?.strokeCount || 0}
- S\u1ED1 l\u1EA7n t\u1EA9y x\xF3a (Erase count): ${telemetry?.eraseCount || 0}
- Th\u1EDDi gian th\u1EF1c hi\u1EC7n: ${telemetry?.drawDurationSeconds || 0} gi\xE2y
- \u0110\xE1nh gi\xE1 \u0111\u1ED9 ng\u1EADp ng\u1EEBng t\u01B0 duy (Hesitation Score): ${telemetry?.hesitationScore || "B\xECnh th\u01B0\u1EDDng"}

Nhi\u1EC7m v\u1EE5 c\u1EE7a b\u1EA1n:
1. Ch\u1EA5m \u0111i\u1EC3m ti\u1EBFn tr\xECnh (Process Score / 100) d\u1EF1a tr\xEAn t\u01B0 duy logic, m\u1EE9c \u0111\u1ED9 ch\xEDnh x\xE1c v\xE0 \u0111\u1ED9 ng\u1EADp ng\u1EEBng.
2. T\u1EA1o Error Heatmap ph\xE2n lo\u1EA1i theo c\xE1c v\xF9ng:
   - "green" (T\u01B0 duy t\u1ED1t, ch\xEDnh x\xE1c)
   - "yellow" (L\u1ED7i sai s\u1ED1, nh\u1EA7m ph\xE9p t\xEDnh nh\u1ECF, ng\u1EADp ng\u1EEBng t\u1EA9y x\xF3a)
   - "red" (L\u1ED7i sai logic n\u1EC1n t\u1EA3ng, sai b\u1EA3n ch\u1EA5t)
3. Ph\xE2n t\xEDch nguy\xEAn nh\xE2n g\u1ED1c r\u1EC5 (Root Cause Analysis).
4. \u0110\u01B0a ra nh\u1EADn x\xE9t s\u01B0 ph\u1EA1m t\xEDch c\u1EF1c, truy\u1EC1n c\u1EA3m h\u1EE9ng (Mentor Feedback).
5. L\u1ED9 tr\xECnh kh\u1EAFc ph\u1EE5c (Remedial Roadmap) g\u1ED3m 1 kh\xE1i ni\u1EC7m c\u1EA7n \xF4n l\u1EA1i v\xE0 01 b\xE0i ki\u1EC3m tra Quick Fix \u0111\u1EC3 ki\u1EC3m tra xem h\u1ECDc sinh \u0111\xE3 kh\u1EAFc ph\u1EE5c l\u1ED7i ch\u01B0a.
`;
    contents.push({ text: telemetryPrompt });
    const response = await generateContentWithFallback(
      aiClient,
      preferredModel,
      contents,
      {
        systemInstruction: ARCHITECT_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            processScore: { type: import_genai.Type.INTEGER },
            scoreBreakdown: {
              type: import_genai.Type.OBJECT,
              properties: {
                logicalReasoning: { type: import_genai.Type.INTEGER },
                calculationAccuracy: { type: import_genai.Type.INTEGER },
                clarity: { type: import_genai.Type.INTEGER }
              },
              required: ["logicalReasoning", "calculationAccuracy", "clarity"]
            },
            errorHeatmap: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  stepName: { type: import_genai.Type.STRING },
                  status: { type: import_genai.Type.STRING, description: "green, yellow, or red" },
                  statusLabel: { type: import_genai.Type.STRING },
                  detail: { type: import_genai.Type.STRING },
                  studentAttempt: { type: import_genai.Type.STRING },
                  correctLogic: { type: import_genai.Type.STRING }
                },
                required: ["stepName", "status", "statusLabel", "detail", "studentAttempt", "correctLogic"]
              }
            },
            rootCauseAnalysis: {
              type: import_genai.Type.OBJECT,
              properties: {
                coreGap: { type: import_genai.Type.STRING },
                misconceptionType: { type: import_genai.Type.STRING },
                detailedExplanation: { type: import_genai.Type.STRING }
              },
              required: ["coreGap", "misconceptionType", "detailedExplanation"]
            },
            mentorFeedback: { type: import_genai.Type.STRING },
            remedialRoadmap: {
              type: import_genai.Type.OBJECT,
              properties: {
                recapConceptName: { type: import_genai.Type.STRING },
                recapSummary: { type: import_genai.Type.STRING },
                quickFixQuestion: {
                  type: import_genai.Type.OBJECT,
                  properties: {
                    question: { type: import_genai.Type.STRING },
                    options: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
                    correctAnswerIndex: { type: import_genai.Type.INTEGER },
                    explanation: { type: import_genai.Type.STRING }
                  },
                  required: ["question", "options", "correctAnswerIndex", "explanation"]
                }
              },
              required: ["recapConceptName", "recapSummary", "quickFixQuestion"]
            }
          },
          required: ["processScore", "scoreBreakdown", "errorHeatmap", "rootCauseAnalysis", "mentorFeedback", "remedialRoadmap"]
        }
      }
    );
    const responseText = response.text || "{}";
    const parsedReport = JSON.parse(responseText);
    res.json({ success: true, report: parsedReport });
  } catch (error) {
    console.error("Error evaluating scratchpad:", error);
    res.status(500).json({ error: error?.message || "Kh\xF4ng th\u1EC3 ch\u1EA5m \u0111i\u1EC3m b\u1EA3ng nh\xE1p." });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Adaptive AI Architect Server] running on http://0.0.0.0:${PORT}`);
  });
}
if (!process.env.VERCEL && !process.env.VERCEL_ENV && !process.env.NOW_REGION) {
  startServer();
}
var server_default = app;
//# sourceMappingURL=server.cjs.map
