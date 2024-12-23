// generateKeys.js
const crypto = require('crypto');

const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log('JWT Secret:', jwtSecret);

const refreshTokenSecret = crypto.randomBytes(32).toString('hex');
console.log('Refresh Token Secret:', refreshTokenSecret);
