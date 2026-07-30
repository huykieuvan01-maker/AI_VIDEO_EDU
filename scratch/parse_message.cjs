const fs = require('fs');
const content = fs.readFileSync('C:/Users/admin/.gemini/antigravity/brain/3f4099af-2d79-4ee6-b57f-b1dc3c0e16e3/.system_generated/steps/657/content.md', 'utf8');
const match = content.match(/"message":"([^"]+)"/);
console.log('Message:', match ? match[1] : 'not found');
