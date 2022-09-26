const { register, login, logout } = require('../controllers/auth')
const { getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost } = require('../controllers/posts')
const { isAuthenticated } = require('../middleware/isAuthenticated')

module.exports = app => {
    app.get('/userposts/:userId', getAllPosts)
    
	
}