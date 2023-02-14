const db = require('../config/connection');
const { User, Team, Project, Task } = require('../models');

const userData = require('./userData.json');
const teamData = require('./teamData.json');
const projectData = require('./projectData.json');
const taskData = require('./taskData.json');

db.once('open', async () => {
    await User.deleteMany({});
    await Team.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});

    const users = await User.insertMany(userData);
    const teams = await Team.insertMany(teamData);
    const projects = await Project.insertMany(projectData);
    const tasks = await Task.insertMany(taskData);

    console.log(users);
    console.log(teams);
    console.log(projects);
    console.log(tasks);
    console.log('Seeding Complete')
    process.exit(0);
});