// User routes
const express = require('express')
const router = express.Router()
const {getUsers, updateUser, deleteUser} = require("../controllers/userController")
const {protect} = require('../middlewares/authMiddleware')
const {authorizeRoles} = require('../middlewares/roleMiddleware')


router.use(protect);
router.use(authorizeRoles('Admin'));
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports=router