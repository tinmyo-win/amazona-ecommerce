const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = (user) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  }, process.env.JWT_SECRET || 'somethingsecret', {
    expiresIn: '30d',
  });
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization

  if(authorization) {
    const token = authorization.slice(7, authorization.length);
    console.log(req.headers.authorization.length)
    jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) => {
      if(err) {
        res.status(401).send({message: 'Invalid token'})
      } else {
        req.user = decode;
        next()
      }
    } )
  } else {
    res.status(401).send({message: 'No token'})
  }
}

module.exports = {generateToken, isAuth}