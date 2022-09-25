require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { PORT } = process.env

const app = express() 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))