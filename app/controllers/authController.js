// Authentication controller
const User = require('../models/User');
const Role = require('../models/Role')
const generateToken = require('../utils/generateToken')


exports.register = async (req, res) => {
    try {
        const { name, email, password, roleName } = req.body;
        if (!name || !email || !password || !roleName) {
            return res.status(400).json({
                success: false,
                message: "Data missing from server"
            })
        }

        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const role = await Role.findOne({ name: roleName || 'Employee' })
        if (!role) {
            return res.status(400).json({
                message: "Role not found"
            })
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role._id
        })

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: role.name,
                token: generateToken(user._id)
            })
        }


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password').populate("role")

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role.name,
                token: generateToken(user._id)
            })
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }



    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
