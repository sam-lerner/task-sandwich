const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateHelper');

const taskSchema = new Schema({

    taskId:{ 
        type: String,
        required: true,
    },
    taskName: {
      type: String,
      required: true,
      trim: true
    },
    taskDescription: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now(),
        get: (timestamp) => dateFormat(timestamp)
    },
    dueDate: {
        type: Date
    },
    taskStatus: {
        type: String,
        required: true
    },
    assignedTo: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    belongsToProject: [
        {
            type: Schema.Types.ObjectId,
            ref: 'project'
        }
    ],
});

module.exports = taskSchema;