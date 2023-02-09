const { Schema, model } = require('mongoose');

const teamSchema = new Schema({

    teamName: {
      type: String,
      required: true,
      trim: true
    },
    admin: [/* user id */],

    members: [/* user ids */],

    project: [/* project ids */]
});

const Team = model('Team', teamSchema);

module.exports = Team;