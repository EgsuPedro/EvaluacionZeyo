const crypto = require('crypto');


function computeHash(payload) {
// payload: string
return crypto.createHash('sha256').update(payload).digest('hex');
}


module.exports = { computeHash };