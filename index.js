const express = require('express')
const cors = require('cors')
const authRouter = require('./routers/authRouter')
const noteRouter = require('./routers/noteRouter')
const sequelize = require('./db')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/note', noteRouter)

async function start() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    app.listen(3000, () => console.log('server started'))
  } catch (e) {
    console.log('Error', e.message)
  }
}

start()
