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
        // Tested successfully
        projectsByUser: async (parent, args) => {
            const params = await User.find(
                { _id: args._id }
            ).populate('projects')
            console.log(params[0].projects)
            return params[0].projects
        },
        // Tested successfully
        projectsByTeam: async (parent, args) => {
            const params = await Team.find(
                { _id: args._id },
            ).populate('projects')
            console.log(params[0].projects)
            return params[0].projects
        },
        // Tested successfully
        task: async (parent, args) => {
            console.log(args)
            return Task.findOne(
                {
                    _id: args._id
                },
            )
        },
        // Tested successfully
        tasksByProject: async (parent, args) => {
            console.log(args)
            const params = await Project.find(
                { _id: args._id },
            ).populate('tasks')
            return params[0].tasks
        },

        tasksByUser: async (parent, args) => {
            console.log(args._id)
            const params = await User.find(
                { _id: args._id },
            ).populate('tasks')
            // return Task.aggregate(
            //     [{
            //         $group: {
            //             assignedTo: args
            //         }
            //     }])
            return params[0].tasks
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

        // Returning null but working
        addUserToTeam: async (parent, args, context) => {
            console.log(args)
            await Team.findByIdAndUpdate(args._id,
                { $addToSet: { members: args.memberId } },
                { new: true }
            );
        },

        // All working
        addProject: async (parent, args, context) => {
            const me = context.user._id;
            const projectData = { ...args.project };
            projectData.team = [];
            projectData.team.push(args.teamId);
            console.log(projectData);
            const project = await Project.create(projectData);
            await Team.findOneAndUpdate(
                { _id: args.teamId },
                { $addToSet: { projects: project._id } }
            )
            await User.findOneAndUpdate(
                { _id: me },
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
        // Successful create, update project, task
        addTask: async (parents, args, context) => {
            // console.log(args.task)
            const task = await Task.create({ ...args.task })
            // console.log(task)
            await Project.findOneAndUpdate(
                { _id: args.projectId },
                { $addToSet: { tasks: task._id } }
            )
            await Task.findOneAndUpdate(
                { _id: task._id },
                { $addToSet: { belongsToProject: args.projectId } }
            )
            return task
        },
        // Successful only at deleting the project, not updating
        removeTask: async (parent, args, context) => {
            // const pullFromProjectModel = await Project.findOneAndUpdate(
            //     { tasks: [args.task._id] },
            //     {
            //         $pull: {
            //             tasks: args.task._id
            //         }
            //     }
            // )
            return Task.findOneAndDelete({ _id: args._id })
        },
        // Tested successfully, but showing empty array 
        assignTask: async (parent, { _id, userId }, context) => {
            console.log(_id)
            console.log(userId)
            return Task.findByIdAndUpdate(
                { _id },
                { $addToSet: { assignedTo: userId } }
            )
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