require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { PORT } = process.env

const sequelize = require('./util/database')
const { User } = require('./models/user')
const { Post } = require('./models/post')

const app = express()
app.use(express.json())
app.use(cors())

User.hasMany(Post)
Post.belongsTo(User)

///Routes///
require('./routes/routes')(app)

sequelize.sync().then(() => {
	app.listen(PORT, () =>
		console.log(`DB sync successful and server running on port ${PORT}`)
	)
})
.catch(err => console.error(err))
