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

    editPost: async (req, res) => {
        try {
            const { id } = req.params
            const { status } = req.body
            await Post.update({privateStatus: status}, {
                where: {id: +id}
            })
            res.sendStatus(200)
        } catch (err) {
            res.status(400).send('Error editing post', err)
        }
    },

    deletePost: async (req, res) => {
        try {
            const { id } = req.params
            await Post.destroy({ where: {id: +id}})
            res.sendStatus(200)

        } catch (err) {
            res.status(400).send('Error deleting post', err)
        }
    }

}