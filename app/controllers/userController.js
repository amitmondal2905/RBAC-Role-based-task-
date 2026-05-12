// User controller
const User = require('../models/User');

//all users(admin)(get /api/users)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false }).populate('role', 'name');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update user details or role(admin)(put /api/users/:id)
exports.updateUser = async (req, res) => {
  try {
    const { name, email, roleId, status } = req.body;
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = roleId || user.role;
      user.status = status || user.status;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//soft delete user(admin)(Delete /api/users/:id)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.isDeleted = true;
      await user.save();
      res.json({ message: 'User removed (Soft Delete)' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
