const jwt = require('jsonwebtoken')

const middleware = (req, res, next) => {
  const authHeader = req.headers['authorization']
  let token = authHeader && authHeader.split(' ')[1]

  token == null ?
    res.status(401).json({
      'message': 'not authorized'
    }) :

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user)=>{
      err ?
      res.status(401).json({
        'message': 'token not valid'
      }):
      req.user = user
      next()
    })
}

module.exports = middleware