const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateHelper');

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
        default: Date.now(),
        get: (timestamp) => dateFormat(timestamp)

    },
    endDate: {
        type: Date,
        get: (timestamp) => dateFormat(timestamp)
    },
    team: [{
        type: Schema.Types.ObjectId,
        ref: 'team'
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'task'
    }]

});

const Project = model('project', projectSchema);

module.exports= Project;