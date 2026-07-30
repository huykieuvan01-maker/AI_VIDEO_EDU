const http = require('http');

const data = JSON.stringify({
  problemText: 'Giải phương trình 2x^2 - 5x + 2 = 0',
  gradeLevel: 'thpt',
  tone: 'chuyên_sâu',
  subject: 'toán'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/analyze-problem',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data), // Correct byte length
    'x-gemini-key': '' // Empty key
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    console.log('BODY:', body);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
