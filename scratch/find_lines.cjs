const fs = require('fs');
const code = fs.readFileSync('server.ts', 'utf8');
const lines = code.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('evaluate-scratchpad') || line.includes('evaluate')) {
    console.log(`Line ${idx + 1}:`, line.trim());
  }
});
