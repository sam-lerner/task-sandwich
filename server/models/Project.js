const { Schema, model } = require('mongoose');
const taskSchema = require('./Task');

const projectSchema = new Schema({

    projectName: {
      type: String,
      required: true,
      trim: true
    },
    projectDescription: {
        type: String,
    },
    startDate: {
        type: Date,
        default: Date.now()

    },
    endDate: {
        type: Date
    },
    team: [ /* team id */],
    tasks: [taskSchema]

});

const Project = model('project', projectSchema);

module.exports= Project;