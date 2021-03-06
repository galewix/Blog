const Auth = require('../services/Auth');
const { unauthorizeError } = require('../utils');

const extractToken = req => {
  const token = req.headers['authorization'] || req.body.token;
  const striped = token.replace('Bearer', '').trim();
  return striped || null;
};

module.exports = (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return unauthorizeError(res);
  }
  try {
    const verified = Auth.verify(token, 'secret');
    req.user = verified;
    console.log('asdasasd::::', req.user);
    next();
  } catch (err) {
    return unauthorizeError(res);
  }
};
