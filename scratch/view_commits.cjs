const fs = require('fs');
const content = fs.readFileSync('C:/Users/admin/.gemini/antigravity/brain/3f4099af-2d79-4ee6-b57f-b1dc3c0e16e3/.system_generated/steps/657/content.md', 'utf8');
const lines = content.split('\n');
console.log('Total lines:', lines.length);
for (let i = 0; i < lines.length; i++) {
  console.log(`Line ${i}:`, lines[i].substring(0, 100));
}

// Find JSON
const line8 = lines[8];
if (line8) {
  try {
    const data = JSON.parse(line8.trim());
    console.log('Parsed JSON successfully!');
    console.log('Commit message:', data.commit.message);
  } catch (e) {
    console.error('Failed to parse line 8:', e.message);
  }
}
