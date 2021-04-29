const express = require('express')
const cors = require('cors')
require('./db')

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3000, () => console.log('server started'))
