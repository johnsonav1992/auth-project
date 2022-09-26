require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../models/user')
const { SECRET } = process.env

const createToken = (username, id) => {
	return jwt.sign({ username, id }, SECRET, { expiresIn: '2d' })
}

module.exports = {
	register: async (req, res) => {
		try {
			const { username, password } = req.body
			const foundUser = await User.findOne({
				where: { username: username },
			})

			if (foundUser) {
				res.status(400).send('User already exists')
			} else {
				const salt = bcrypt.genSaltSync(10)
				const hash = bcrypt.hashSync(password, salt)

                const newUser = await User.create({username: username, hashedPass: hash})
                const token = createToken(newUser.dataValues.username, newUser.dataValues.id)
                const exp = Date.now() + 1000 * 60 * 60 * 48
                console.log(newUser)

                res.status(200).send({
                    username: newUser.dataValues.username,
                    userId: newUser.dataValues.id,
                    token,
                    exp
                })
			}
		} catch (err) {
            console.error('ERROR in register', err)
            res.sendStatus(400)
        }
	},

	login: (req, res) => {
		console.log('login')
	},

	logout: (req, res) => {
		console.log('logout')
	},
}
