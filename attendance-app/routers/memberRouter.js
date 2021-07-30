const express = require('express');
const { memberController } = require('../controllers');

const memberRouter = express.Router();

// GET methods
memberRouter.get('/', memberController.getAllMembers);
memberRouter.get('/member/:id', memberController.getMemberById);
memberRouter.get('/search', memberController.searchByNameAndStatus);

// POST methods
memberRouter.post('/',
  memberController.validateMemberRequestRequiredPayload,
  memberController.validateMemberRequestExtraPayload,
  memberController.insertMember
);

memberRouter.use((err, req, res, next) => {
  next(err);
});

// PUT methods
memberRouter.put('/member/:id', memberController.updateMemberById);

// DELETE methods
memberRouter.delete('/member/:id', memberController.deleteMemberById);

module.exports = memberRouter;
