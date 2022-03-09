
const express = require('express');

const router =express.Router();

const postController = require('../controllers/post');

router.get('/posts',postController.getPost);
router.post('/add-post',postController.addPost);
router.delete('/delete-post/:id',postController.deletePost);
router.put('/update-post/:id',postController.updatePost);




module.exports = router;