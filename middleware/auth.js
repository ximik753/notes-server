const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
      req.user = jwt.verify(token, process.env.JWT_SECRET)
      next()
    }
    return res.status(401).json({
      error: {
        code: 300,
        message: 'Пользователь не авторизован'
      }
    })
  } catch (e) {
    return res.status(401).json({
      error: {
        code: 300,
        message: 'Пользователь не авторизован'
      }
    })
  }
}
