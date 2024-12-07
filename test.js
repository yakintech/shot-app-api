const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('AuthKey_A6J8TST7VN.p8');

const token = jwt.sign(
  {
    iss: '5WJ6D6989G', 
    iat: Math.floor(Date.now() / 1000), // Başlangıç zamanı (şimdi)
    exp: Math.floor(Date.now() / 1000) + 15777000, // 6 ay (yaklaşık)
    aud: 'https://appleid.apple.com',
    sub: 'com.cagatayyildiz.shotapp', // Apple Service ID'nizi buraya yazın
  },
  privateKey,
  {
    algorithm: 'ES256',
    keyid: 'A6J8TST7VN', // Apple Signing Key ID'niz
  }
);
//eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZGQTRVTDlVN1QifQ.eyJpc3MiOiI1V0o2RDY5ODlHIiwiaWF0IjoxNzMyOTc3MzE0LCJleHAiOjE3MzI5ODA5MTQsImF1ZCI6Imh0dHBzOi8vYXBwbGVpZC5hcHBsZS5jb20iLCJzdWIiOiJjb20uY2FnYXRheXlpbGRpei5zaG90YXBwIn0.U1Hp2cnIPSvlaNGP3LaEHTwRZBg4Mll8ogZbzRLeb3dRR1zcgiMmsDN1iVUGG5CXilUGvLqs2QfPt9iHjI3bIw
console.log('Client Secret:', token);
