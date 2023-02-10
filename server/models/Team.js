const { Schema, model } = require('mongoose');

const teamSchema = new Schema({

  teamName: {
    type: String,
    required: true,
    trim: true
  },
  admin: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],

  members: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],

  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'project'
  }],
});

const Team = model('team', teamSchema);

module.exports = Team;