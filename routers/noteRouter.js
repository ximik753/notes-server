const express = require('express')
const controller = require('../controllers/noteController')
const auth = require('../middleware/auth')

const router = express()

router.get('/', auth, controller.getNotes)
router.get('/:id', auth, controller.getNoteById)
router.post('/', auth, controller.createNote)
router.patch('/:id', auth, controller.updateNote)

module.exports = router
