const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: 'test_key' });
console.log('ai keys:', Object.keys(ai));
if (ai.models) {
  console.log('ai.models keys:', Object.keys(ai.models));
  console.log('generateContent type:', typeof ai.models.generateContent);
} else {
  console.log('ai.models is undefined!');
}
