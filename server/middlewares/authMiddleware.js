import jwt from "jsonwebtoken";
// import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Fetch the user associated with the token
      // req.user = await User.findById(decoded.userId).select("-password");
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { protect };
