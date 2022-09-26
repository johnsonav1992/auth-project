const { register, login, logout } = require('../controllers/auth')
const { getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost } = require('../controllers/posts')
const { isAuthenticated } = require('../middleware/isAuthenticated')

module.exports = app => {
    app.get('/userposts/:userId', getCurrentUserPosts)
    app.get('/posts', getAllPosts)
    app.post('/register', register)
    app.post('/login', login)
    app.post('/posts', isAuthenticated, addPost)
    app.put('/posts/postId', isAuthenticated, editPost)
    app.delete('/posts', isAuthenticated, deletePost)

}