const crypto = require('crypto');

const cryptoHash = () => {
  const hash = crypto.createHash('sha256');

  hash.update;

  return hash.digest('hex');
};

module.exports = cryptoHash;
