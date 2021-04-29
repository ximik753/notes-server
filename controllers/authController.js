const User = require('../db/models/Users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
require('dotenv').config()

class AuthRouter {
  constructor() {
    this.login = this.login.bind(this)
    this.registration = this.registration.bind(this)
    this.refreshToken = this.refreshToken.bind(this)
  }

  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            code: 200,
            message: errors.errors[0].msg
          }
        })
      }
      const {login, password} = req.body

      const hashPassword = bcrypt.hashSync(password, 7)
      const [user, created] = await User.findOrCreate({
        where: {login},
        defaults: {password: hashPassword}
      })

      if (!created) {
        return res.status(400).json({
          error: {
            code: 101,
            message: 'Пользователь с таким логином уже есть'
          }
        })
      }

      res.json({
        response: {
          user_id: user.id
        }
      })
    } catch (e) {
      return res.status(400).json({
        error: {
          code: 700,
          message: `Ошибка при регистрации: ${e}`
        }
      })
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            code: 200,
            message: errors.errors[0].msg
          }
        })
      }
      const {login, password} = req.body
      const user = await User.findOne({
        where: {login}
      })

      if (!user) {
        return res.status(400).json({
          error: {
            code: 102,
            message: 'Пользователь небыл найден'
          }
        })
      }

      const match = await bcrypt.compare(password, user.password)
      if (match) {
        return res.json({
          response: {...await this._generateTokens(user.id)}
        })
      }

      return res.status(400).json({
        error: {
          code: 103,
          message: 'Неверный логин или пароль'
        }
      })
    } catch (e) {
      return res.status(400).json({
        error: {
          code: 700,
          message: `Ошибка при авторизации: ${e.message}`
        }
      })
    }
  }

  async refreshToken(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            code: 200,
            message: errors.errors[0].msg
          }
        })
      }

      const token = req.body.token
      const {userId} = jwt.verify(token, process.env.JWT_SECRET_REFRESH)
      const user = await User.findByPk(userId)
      if (user.refresh_token === token) {
        return res.json({
          response: {...await this._generateTokens(user.id)}
        })
      }

      return res.status(401).json({
        error: {
          code: 301,
          message: 'Токен устарел'
        }
      })
    } catch (e) {
      return res.status(400).json({
        error: {
          code: 700,
          message: `Ошибка при авторизации: ${e.message}`
        }
      })
    }
  }

  async _updateToken(token, userId) {
    try {
      await User.update({refresh_token: token}, {where: {id: userId}})
    } catch (e) {
      throw new Error(e)
    }
  }

  async _generateTokens(userId) {
    try {
      const refreshToken = jwt.sign({userId}, process.env.JWT_SECRET_REFRESH, {expiresIn: '15d'})
      await this._updateToken(refreshToken, userId)

      return {
        token: jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '15m'}),
        refreshToken
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = new AuthRouter()
