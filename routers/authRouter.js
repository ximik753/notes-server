const express = require('express')
const {check} = require('express-validator')
const controller = require('../controllers/authController')

const router = express()

const validator = [
  check('login')
    .notEmpty()
    .withMessage('Логин не может быть пустым')
    .bail()
    .isLength({min: 5, max: 10})
    .withMessage(value => {
      if (value.length < 5) {
        return 'Логин должен быть больше 5 символов'
      }
      return 'Логин должен быть меньше 10 символов'
    }),
  check('password')
    .notEmpty()
    .withMessage('Пароль не может быть пустым')
    .bail()
    .isLength({min: 6, max: 50})
    .withMessage(value => {
      if (value.length < 5) {
        return 'Пароль должен быть больше 6 символов'
      }
      return 'Пароль должен быть меньше 50 символов'
    })
]

router.post('/register',
  validator,
  controller.registration
)
router.post('/login',
  validator,
  controller.login)
router.post('/token-refresh',
  [check('token', 'Токен не может быть пустым').exists()],
  controller.refreshToken)

module.exports = router
