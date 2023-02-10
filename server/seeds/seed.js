const db = require('../config/connection');
const { User, Team, Project } = require('../models');

const userData = require('./userData.json');
const teamData = require('./teamData.json');
const projectData = require('./projectData.json');

db.once('open', async () => {
    await User.deleteMany({});
    await Team.deleteMany({});
    await Project.deleteMany({});

    const users = await User.insertMany(userData);
    const teams = await Team.insertMany(teamData);
    const projects = await Project.insertMany(projectData);

    console.table(users);
    console.table(teams);
    console.table(projects);
    console.log('Seeding Complete')
    process.exit(0);
});