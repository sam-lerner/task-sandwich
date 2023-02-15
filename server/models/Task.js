const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateHelper');

const taskSchema = new Schema({

    
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
        type: Date,
        get: (timestamp) => dateFormat(timestamp)
    },
    taskStatus: {
        type: String,
        default: "Open"
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

const Task = model('task', taskSchema);

module.exports = Task;