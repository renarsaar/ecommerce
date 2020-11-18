const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // Check for jwt token
  if (!token) return res.status(401).send('Unauthorized');

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};