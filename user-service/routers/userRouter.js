const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.get('/email/:emailAddress', userController.getUserByEmail);
// validate required payload properties
// validate extra properties
router.post('/',
  userController.validateRequestRequiredPayload,
  userController.validateRequestExtraPayload,
  userController.insertUser
);

router.put('/user/:userName', userController.updateUserByUserName);
router.delete('/user/:userName', userController.deleteUserByUserName);

module.exports = router;
