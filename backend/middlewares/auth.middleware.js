require("dotenv").config();
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "authorization failed" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(500).json("error during authorizationn", error);
    }
  }
};

module.exports = { auth };
