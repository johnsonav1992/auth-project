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
			
			if (username === '' || password === '') {
				throw 'Please provide a username and password'
			}

			const foundUser = await User.findOne({
				where: { username: username },
			})

			if (foundUser) {
				throw 'User already exists'
			} else {
				const salt = bcrypt.genSaltSync(10)
				const hash = bcrypt.hashSync(password, salt)

				const newUser = await User.create({
					username: username,
					hashedPass: hash,
				})
				const token = createToken(
					newUser.dataValues.username,
					newUser.dataValues.id
				)
				const verifiedToken = jwt.verify(token, SECRET)
					const sessionStart = verifiedToken.iat
					
					const sessionExp = Date.now() + 1000 * 60 * 60 * 48

					res.status(200).send({
                        username: newUser.dataValues.username,
                        userId: newUser.dataValues.id,
						token,
						sessionStart,
						sessionExp
					})
			}
		} catch (err) {
			console.error(err)
			res.status(400).send(err)
		}
	},

	login: async (req, res) => {
		try {
			const { username, password } = req.body
			let foundUser = await User.findOne({where: { username }})

			if (foundUser) {
				const isAuthenticated = bcrypt.compareSync(
					password,
					foundUser.hashedPass
				)

				if (isAuthenticated) {
					const token = createToken(
						foundUser.dataValues.username,
						foundUser.dataValues.id
					)
					const verifiedToken = jwt.verify(token, SECRET)
					const sessionStart = verifiedToken.iat
					
					const sessionExp = Date.now() + 1000 * 60 * 60 * 48

					res.status(200).send({
                        username: foundUser.dataValues.username,
                        userId: foundUser.dataValues.id,
						token,
						sessionStart,
						sessionExp
					})
				} else {
                    throw 'Cannot login. Please try again.'
                }
			} else {
                throw 'Cannot log in. User not found.'
			}
		} catch (err) {
			console.error(err)
			res.status(400).send(err)
        }
	}
}
