// Check for jwt token
module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
    }
  },
  ensureQuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard');
    } else {
      return next();
    }
  },
};

// Import...
// const { ensureAuth, ensureGuests } = require('../middleware/auth');
