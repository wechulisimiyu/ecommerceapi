const jwt = require("jsonwebtoken")

// to verify the token provided in the header matches the one stored
// in the db
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token
  if (authHeader) {
    const token = authHeader.split(" ")[1] // Bearer `token` from docs
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user
      next()
    })
  } else {
    return res.status(401).json("You are not authenticated!")
  }
}

// authorize access if userId matches db userId
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      res.status(403).json("You are not allowed to do that!")
    }
  })
}

//verify admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if ( req.user.isAdmin) {
      next()
    } else {
      res.status(403).json("You are not allowed to do that!")
    }
  })
}


module.exports = { 
  verifyToken, 
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin 
}