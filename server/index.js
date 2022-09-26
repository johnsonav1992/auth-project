require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { PORT } = process.env

const app = express() 
app.use(express.json())
app.use(cors())

///Routes///
require('./routes/routes')(app)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))