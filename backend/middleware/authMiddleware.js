const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Check if Authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Extract token from header
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable for secret
    const userId = decodedToken.userId;

    // Check if the userId in the request body matches the decoded userId from the token
    if (req.body.userId && req.body.userId !== userId) {
      throw new Error('Invalid user ID');
    }
    
    // Attach userId to request object for use in other routes
    req.userId = userId;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({
      error: 'Invalid request!'
    });
  }
};
