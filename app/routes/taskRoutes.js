// Task routes
const express = require('express')
const router = express.Router()
// const {createTask, getTasks} = require('../controllers/taskController')
const {protect} = require('../middlewares/authMiddleware')
const {authorizeRoles} = require('../middlewares/roleMiddleware')
const { createTask, getTasks, updateTaskStatus, reassignTask,getTaskStats } = require('../controllers/taskController');
const upload = require('../middlewares/multerMiddleware')


router.use(protect);

router.get('/', getTasks)
router.get('/stats', getTaskStats)
router.patch('/:id/status', updateTaskStatus)

// router.post('/', authorizeRoles('Admin', 'Manager'), createTask)
router.post('/', authorizeRoles('Admin', 'Manager'), upload.single('attachment'), createTask)
router.patch('/:id/reassign', authorizeRoles('Admin', 'Manager'), reassignTask);




module.exports=router



