// Assignment history model schema
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    action: {
        type: String,
        required: true
    },
    previousStatus: {
        type: String
    },
    newStatus: {
        type: String
    },
    previousAssignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    newAssignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('AssignmentHistory', historySchema);
