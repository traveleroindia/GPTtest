import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET_KEY; // Same secret used to sign the JWT

// Middleware to verify JWT
export const authenticateJWT = (req, res, next) => {
  const token = req.cookies.jwt; // Access the JWT from the cookies

  if (token) {
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user; // Save user information for future use
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};