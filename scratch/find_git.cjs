const fs = require('fs');
const paths = [
  'C:\\Program Files\\Git\\cmd\\git.exe',
  'C:\\Program Files (x86)\\Git\\cmd\\git.exe',
  'C:\\Users\\admin\\AppData\\Local\\Programs\\Git\\cmd\\git.exe',
  'C:\\Users\\admin\\AppData\\Local\\Programs\\Git\\bin\\git.exe',
  'C:\\Program Files\\Git\\bin\\git.exe'
];

paths.forEach(p => {
  if (fs.existsSync(p)) {
    console.log('FOUND Git at:', p);
  }
});
console.log('Done searching.');
