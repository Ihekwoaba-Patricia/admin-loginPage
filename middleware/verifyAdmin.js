import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
  // Get Authorization header
  const authHeader = req.headers.authorization;

  // Check if the header is missing or doesn't start with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token." });
  }

  // Get the token part
  const token = authHeader.split(' ')[1];

  try {
    // Verify token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user has the admin role
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied.' });
    }

    // If everything is fine, move to the next middleware or route
    next();
  } catch (error) {
    // Token is invalid or something went wrong
    return res.status(401).json({ error: 'Unauthorized access.' });
  }
};
