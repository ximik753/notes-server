const jwt = require('jsonwebtoken')
const User = require('../db/models/User')

module.exports = async function(req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
      const {userId} = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findByPk(userId)
      next()
    } else {
      return res.status(401).json({
        error: {
          code: 300,
          message: 'Пользователь не авторизован'
        }
      })
    }
  } catch (e) {
    return res.status(401).json({
      error: {
        code: 300,
        message: 'Пользователь не авторизован'
      }
    })
  }
}
