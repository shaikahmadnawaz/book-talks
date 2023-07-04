import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extracting the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verifying the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetching the user associated with the token
      req.userId = decoded.userId;
      console.log(req.userId);
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { protect };
