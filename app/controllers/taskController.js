// Task controller
const Task = require('../models/Task');
const AssignmentHistory = require('../models/AssignmentHistory');
const cloudinary = require('../config/cloudinary')


exports.createTask = async (req, res) => {

  // console.log("body received: ", req.body)
    // console.log("user found", req.user)


  try {
    const { title, description, assignedTo, priority, dueDate } = req.body;
    let attachmentUrl = '';

    if(req.file){
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'tasks'
      })
      attachmentUrl = result.secure_url
    }



    const task = await Task.create({
      title,
      description,
      assignedBy: req.user._id, // The logged-in user
      assignedTo,
      priority,
      dueDate,
      attachments: attachmentUrl ? [attachmentUrl] : []
    });

    await AssignmentHistory.create({
      task: task._id,
      action: 'Task Created',
      newStatus: 'Pending',
      newAssignee: assignedTo,
      performedBy: req.user._id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getTasks = async (req, res) => {
  try {
    let query;


    if (req.user.role.name === 'Employee') {
      query = Task.find({ assignedTo: req.user._id });
    } else {

      query = Task.find();
    }

    const tasks = await query.populate('assignedBy', 'name email').populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.id)

    //console.log("task assigned to: ", task.assignedTo)
    //console.log("logged in user: ", req.user._id)

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      })
    }

    if (task.assignedTo.toString() !== req.user._id.toString() && req.user.role.name === "Employee") {
      return res.status(403).json({ message: 'Not authorized to update this task' })
    }

    const previousStatus = task.status;
    task.status = status;
    await task.save();
    
    //change in History
    await AssignmentHistory.create({
      task: task._id,
      action: 'Status Updated',
      previousStatus,
      newStatus: status,
      performedBy: req.user._id
    });
    res.json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


exports.reassignTask = async (req, res) => {
  try {
    const { newAssigneeId } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    const previousAssignee = task.assignedTo;
    task.assignedTo = newAssigneeId;
    await task.save();


    // the reassignment
    await AssignmentHistory.create({
      task: task._id,
      action: 'Task Reassigned',
      previousAssignee,
      newAssignee: newAssigneeId,
      performedBy: req.user._id
    });
    res.json({ message: 'Task reassigned successfully', task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




//task status(get /api/tasks/stats)
exports.getTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      
      {
        $match: req.user.role.name === 'Employee' 
          ? { assignedTo: req.user._id } 
          : {} 
      },
      
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);


    const formattedStats = stats.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    res.json({
      totalTasks: stats.reduce((sum, item) => sum + item.count, 0),
      stats: formattedStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


