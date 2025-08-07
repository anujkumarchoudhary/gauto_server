const jwt = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(404).json({ message: "Token not found" })
  }

  try {
    const token = authHeader.split(" ")[1]
    const decode = jwt.verify(token, process.env.SECRET_CODE)
    req.userId = decode.id;
    req.userRole = decode.role;
    next()
  }
  catch (err) {
    console.log("error", err)
    res.status(500).json({ message: "Internal server error" })
  }


}

module.exports = authMiddleware