// Role model schema
const mongoose = require('mongoose')

const userRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ['Admin', 'Manager', 'Employee']
    },
    permission: {
        type: [String],
        default: []
    }
}, {timestamps: true});

module.exports= mongoose.model('Role', userRoleSchema);



