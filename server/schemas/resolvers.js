const { User, Project, Team, Task } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { getArgumentValues } = require('graphql');

const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-_v -password')
                return userData;
            }
            throw new AuthenticationError('Please log in')
        },
        // Tested successfully
        project: async (parent, { _id }) => {
            console.log(_id)
            return Project.findOne({ _id: _id });
        },

        projectsByUser: async (parent, { userId }) => {
            const projectsForUser = await User.find(
                { _id: userId },
                { projectId: 1 }
            )
            //expect array of IDs
            const params = projectsForUser ? { _id } : {};

            return Project.find(params) //array of only values, no property names
        },

        projectsByTeam: async (parent, { teamId }) => {
            const projectsForTeam = await Team.find(
                {_id: teamId},
                {projects: 1}
            )
            const params = projectsForTeam ? {_id} : {}

            return Project.find(params)
       },

        task: async (parent, { taskId }) => {
            return Project.findOne({_id: taskId})
        },

        tasksByProject: async (parent, { projectId }) => {
           const tasksForProject = await Project.find(
            {_id: projectId},
            {tasks: 1}
           )
           const params = tasksForProject ? {_id} : {}

           return Task.find(params)
        },

        tasksByUser: async (parent, {userId}) => {
            return Task.aggregate(
                {
                    $group: {
                        assignedTo: [userId]
                    }
                }
            )
        },

        tasksByTeam: async (parent, {teamId}) => {
            const projectsForTeam = await Team.find(
                {_id: teamId},
                {projects: 1}
            )
            const params = projectsForTeam ? {_id} : {}
            const teamProjects = await Project.find(
                {params},
                {tasks: 1}
            )
            const newParams = teamProjects ? {_id} : {}
            return Task.find(newParams)
        },

        team: async (parent, { teamId }) => {
            return Team.findOne({ _id: teamId });
        },

        //check to see if a daily reset has happened and resets both sandwich count and next daily reset time in databse if necessary
        checkForSandwichReset: async (parent, { userId }) => {
            const checkForReset = await User.findOne(
                { _id: userId },
                { nextSandwichReset }
            );

            let currentTime = new Date()
            if (currentTime > checkForReset) {
                let setToNextDay = new Date(currentTime.setHours(currentTime.getHours() + 24)).toISOString().split('T')[0];
                return User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $set: {
                            sandwichCount: 5,
                            nextSandwichReset: {
                                $toDate: setToNextDay
                            }
                        }
                    }
                );
            } else {
                return User.findOne({ _id: userId })
            }


        }

    },

    Mutation: {
        // Tested successfully
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        // Tested successfully
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        // Tested successfully
        addTeam: async (parent, args, context) => {
            const team = await Team.create(args.team);
            console.log(args.team)
            const me = context.user._id;
            await User.findOneAndUpdate(
                { _id: me },
                { $addToSet: { teams: team._id } }
            )
            return team;
        },

        removeTeam: async (parent, args, context) => {
            const projectsToBeDeleted = await Team.find(
                {_id: args.team._id},
                {projects: 1}
                )
            const noMoreProjects = await Project.deleteMany(
                {_id: projectsToBeDeleted}
            )
            const pullTeamFromUserModel = await User.findOneAndUpdate(
                {teams: [args.team._id]},
                {$pull: {
                    teams: args.team._id
                }}
            )
            return Team.deleteOne({_id: args.team._id})
        },
        
        addProject: async (parent, args, context) => {
            const project = await Project.create(args.project);
            const team = context.team._id;
            await Team.findOneAndUpdate(
                { _id: team },
                { $addToSet: { projects: project._id } }
            )
            return project;
        },

        removeProject: async (parent, args, context) => {
            const tasksToBeDeleted = await Project.find(
                {_id: args.project._id},
                {tasks: 1}
            )
            const noMoreTasks = await Task.deleteMany(
                {_id: tasksToBeDeleted}
            )
            const pullFromTeamModel = await Team.findOneAndUpdate(
                {projects: [args.project._id]},
                {$pull: {
                    projects: args.project._id
                }}
            )
            return Project.deleteOne({_id: args.project._id})
        },

        addTask: async (parents, args, context) => {
            const task = await Task.create(args.task)
            await Project.findOneAndUpdate(
                {_id: context.project._id},
                {$addToSet: {tasks: task._id}}
            )
            return task
        },

        removeTask: async (parent, args, context) => {
            const pullFromProjectModel = await Project.findOneAndUpdate(
                {tasks: [args.task._id]},
                {$pull: {
                    tasks: args.task._id
                }}
            )
            return Task.deleteOne({_id: args.task._id})
        }
    },
};

module.exports = resolvers;


// Sam notes

// sandiwchCount: async (parent, oldDate, context) => {
//     let currentSandwiches = GET FROM USER context
//     let setDate = GET OLD DATE FROM LAST CHECK
//     const currentDate = Date.now

//     if currentDate > setDate {
//         THIS WILL ACTUALLY NEED TO BE FINDANDUPDATE
//         currentSanwiches++5
//         setDate FIND AND UPDATE TO currentDate
//         return
//     } else {
//         return
//     }
// }