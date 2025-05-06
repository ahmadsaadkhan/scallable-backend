const express = require('express');
const router = express.Router();

// Controllers
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

// Post Routes
router.get('/posts', postController.getAllPosts);
router.post('/posts', postController.createPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

// Comment Routes
router.post('/comments', commentController.createComment);
router.put('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
