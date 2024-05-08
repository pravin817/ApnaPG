require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJwtToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Bearer TOKEN
  const token = authHeader ? authHeader.split(" ")[1] : null;
  // console.log(`The jwt token is: ${token}`);

  if (!token) {
    return res.send("token is not valid");
  }

  // verify the jwtToken
  try {
    let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decoded._id);
    req.user = decoded._id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send("Access denied. Invalid token.");
  }
};

module.exports = verifyJwtToken;
