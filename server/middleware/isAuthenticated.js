require('dotenv').config()
const jwt = require('jsonwebtoken')
const { SECRET } = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let verifiedToken

        try {
            verifiedToken = jwt.verify(headerToken, SECRET)
            //TOKEN:  { username: 'test', id: 4, iat: 1664398565, exp: 1664571365 }
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!verifiedToken) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}