
const express = require('express');

const router =express.Router();

const userController = require('../controllers/user');

router.get('/users',userController.getUser);
router.post('/add-user',userController.addUser);
router.delete('/delete-user/:id',userController.deleteUser);
router.put('/update-user/:id',userController.updateUser);




module.exports = router;