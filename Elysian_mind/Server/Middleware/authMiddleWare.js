// middleware/authMiddleware.js

const ensureAuthenticated = (req, res, next) => {
    if (req.session.user) {
      next(); // Proceed to the next middleware or route handler
    } else {
      res.status(401).json({ message: 'Unauthorized: Please log in first' });
    }
  };
  
  module.exports = ensureAuthenticated;
  