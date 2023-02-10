const db = require('../config/connection');
const { User, Team, Project, Task } = require('../models');

const userData = require('./userData.json');
const teamData = require('./teamData.json');
const projectData = require('./projectData.json');
const taskData= require('./taskData.json');

db.once('open', async () => {
    await User.deleteMany({});
    await Team.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});

    const users = await User.insertMany(userData);
    const teams = await Team.insertMany(teamData);
    const projects = await Project.insertMany(projectData);
    const tasks = await Task.insertMany(taskData);

    console.table(users);
    console.table(teams);
    console.table(projects);
    console.table(tasks);
    console.log('Seeding Complete')
    process.exit(0);
});