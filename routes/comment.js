
const express = require('express');

const router =express.Router();

const commentController = require('../controllers/comment');

router.get('/comments',commentController.getComment);
router.post('/add-comment',commentController.addComment);
router.delete('/delete-comment/:id',commentController.deleteComment);
router.put('/update-comment/:id',commentController.updateComment);




module.exports = router;