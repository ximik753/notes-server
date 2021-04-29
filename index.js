const express = require('express')
const cors = require('cors')
const authRouter = require('./routers/authRouter')
require('./db')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)

app.listen(3000, () => console.log('server started'))
