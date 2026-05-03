import jwt from "jsonwebtoken";

export function authRequired(req, res, next) {
  const header = req.headers.authorization;
  const token = header && header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "Server misconfiguration" });
    }
    req.user = jwt.verify(token, secret);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
