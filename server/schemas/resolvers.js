const { User, Project, Team, Task } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { getArgumentValues } = require('graphql');

const resolvers = {
    Query: {
        // Tested successfully
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
                { _id: teamId },
                { projects: 1 }
            )
            const params = projectsForTeam ? { _id } : {}

            return Project.find(params)
        },

        task: async (parent, { taskId }) => {
            return Project.findOne(
                {
                    _id: projectId
                },
                {
                    $inc: { tasks: [taskId] }
                }
            )
        },

        tasksByProject: async (parent, { projectId }) => {
            const tasksForProject = await Project.find(
                { _id: projectId },
                { tasks: 1 }
            )
            const params = tasksForProject ? { _id } : {}

            return Task.find(params)
        },

        tasksByUser: async (parent, { userId }) => {
            return Task.aggregate(
                {
                    $group: {
                        assignedTo: [userId]
                    }
                })
        },

        tasksByTeam: async (parent, { teamId }) => {
            const projectsForTeam = await Team.find(
                { _id: teamId },
                { projects: 1 }
            )
            const params = projectsForTeam ? { _id } : {}
            const teamProjects = await Project.find(
                { params },
                { tasks: 1 }
            )
            const newParams = teamProjects ? { _id } : {}
            return Task.find(newParams)
        },

        team: async (parent, { teamId }) => {
            return Team.findOne({ _id: teamId });
        },

        teamsByUser: async (parent, { userId }) => {
            return Team.aggregate(
                {
                    $group: {
                        members: [userId]
                    }
                }
            )
        },

        //check to see if a daily reset has happened and resets both sandwich count and next daily reset time in databse if necessary
        checkForSandwichReset: async (parent, { userId }, context) => {
            console.log(context.user._id)
            const checkForReset = await User.findOne(
                { _id: userId }
            );

            let currentTime = new Date()
            if (currentTime > checkForReset.nextSandwichReset) {
                let setToNextDay = new Date(currentTime.setHours(currentTime.getHours() + 24)).toISOString().split('T')[0];
                return User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $set: {
                            sandwichCount: 5,
                            nextSandwichReset: {
                                $toDate: setToNextDay + 'T09:00:00'
                            }
                        }
                    }
                )
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
            const newTeam = { teamName: args.team.teamName, admin: [context.user._id], members: [context.user._id], projects: [] }
            const team = await Team.create(newTeam);
            console.log(args)
            console.log(context.user)
            const me = context.user._id;
            await User.findOneAndUpdate(
                { _id: me },
                { $addToSet: { teams: team._id } }
            )
            // console.log(team)
            const verifyTeam = await Team.findById(team._id).populate('admin').populate('members');
            console.log(verifyTeam)
            return verifyTeam;
        },

        // Currently only deleting team, not updating anything.
        removeTeam: async (parent, args) => {
            // const projectsToBeDeleted = await Team.find(
            //     { _id: args._id },
            //     { projects: 1, _id: 0 }
            // )
            // console.log(projectsToBeDeleted)
            // await Project.deleteMany(
            //     { _id: { $in: projectsToBeDeleted } }
            // )
            // await User.findOneAndUpdate(
            //     { teams: [args.team._id] },
            //     {
            //         $pull: {
            //             teams: args.team._id
            //         }
            //     }
            // )
            return Team.findOneAndDelete({ _id: args._id })
        },

        // Need to create addUserToTeam

        // Can create a project, updating team, but not currently populating in user array correctly.
        addProject: async (parent, args) => {
            console.log(args)
            const projectData = { ...args.project };
            projectData.team = [];
            projectData.team.push(args.teamId);
            console.log(projectData);
            const project = await Project.create(projectData);
            await Team.findOneAndUpdate(
                { _id: args.teamId },
                { $addToSet: { projects: project._id } }
            )
            return project;
        },

        // Successful only at deleting the project, not updating
        removeProject: async (parent, args) => {
            // const tasksToBeDeleted = await Project.find(
            //     { _id: args.project._id },
            //     { tasks: 1 }
            // )
            // const noMoreTasks = await Task.deleteMany(
            //     { _id: tasksToBeDeleted }
            // )
            // const pullFromTeamModel = await Team.findOneAndUpdate(
            //     { projects: [args.project._id] },
            //     {
            //         $pull: {
            //             projects: args.project._id
            //         }
            //     }
            // )
            return Project.findOneAndDelete({ _id: args._id })
        },

        addTask: async (parents, args, context) => {
            const task = await Task.create(args.task)
            await Project.findOneAndUpdate(
                { _id: context.project._id },
                { $addToSet: { tasks: task._id } }
            )
            return task
        },

        removeTask: async (parent, args, context) => {
            const pullFromProjectModel = await Project.findOneAndUpdate(
                { tasks: [args.task._id] },
                {
                    $pull: {
                        tasks: args.task._id
                    }
                }
            )
            return Task.deleteOne({ _id: args.task._id })
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