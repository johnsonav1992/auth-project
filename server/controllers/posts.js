const { User } = require('../models/user')
const { Post } = require('../models/post')

module.exports = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                where: {privateStatus: false},
                include: [{
                    model: User,
                    required: true,
                    attributes: ['username']
                }]
            })
            res.status(200).send(posts)
        } catch (err) {
            console.error('Error getting posts', err)
            res.sendStatus(400)
        }
    },

    getCurrentUserPosts: async (req, res) => {
        try {
            const { userId } = req.params
            const userPosts = await Post.findAll({
                where: {userId: userId},
                include: [{
                    model: User,
                    required: true,
                    attributes: ['username']
                }]
            })
            res.status(200).send(userPosts)
        } catch (err) {
            console.error('Error getting user posts', err)
            res.sendStatus(400)
        }
    },

    addPost: async (req, res) => {
        try {
            const { title, content, status, userId } = req.body
            await Post.create({title, content, privateStatus: status, userId})
            res.sendStatus(200)
        } catch (err) {
            res.status(400).send('Error creating post', err)
        }
    },

    editPost: (req, res) => {
        console.log('hi')
    },

    deletePost: (req, res) => {
        console.log('hi')
    }

}