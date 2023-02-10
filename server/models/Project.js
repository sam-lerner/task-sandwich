const { Schema, model } = require('mongoose');

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