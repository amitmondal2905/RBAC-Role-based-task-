// Role controller
const Role = require('../models/Role')

exports.createRole = async (req, res) => {
    try {
        const { name, permissions } = req.body
        if (!name || !permissions) {
            return res.status(400).json({
                success: false,
                message: "Server error"
            })
        }

        const roleExists = await Role.findOne({ name })
        if (roleExists) {
            return res.status(400).json({
                success: false,
                message: "Role already exists"
            })
        }

        const role = await Role.create({ name, permissions });
        res.status(201).json(role);


    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
