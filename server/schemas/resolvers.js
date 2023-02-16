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
                    .populate({
                        path: 'teams',
                        select: "teamName",
                    }).populate({
                        path: 'projects',
                        select: 'projectName'
                    }).populate({
                        path: 'tasks',
                        select: { taskName: 1, taskDescription: 1, dueDate: 1 }
                        // select: { taskName: 1, taskDescription: 1, createdOn: 1, taskStatus: 1, assignedTo: 1, belongsToProject: 1 }

                    })
                console.log(`---userdata from resolvers:`, userData)
                return userData;
            }
            throw new AuthenticationError('Please log in')
        },

        mePlus: async (parent, { _id }) => {

            const userData = await User.findById({ _id })

            return userData;

        },
        // Tested successfully
        getUsers: async () => {
            try {
                const users = await User.find();
                return users;
            } catch (error) {
                throw new Error(error);
            }
        },

        getProjects: async () => {
            try {
                const projects = await Project.find();
                return projects;
            } catch (error) {
                throw new Error(error);
            }
        },
        getTeams: async () => {
            try {
                const teams = await Team.find();
                return teams;
            } catch (error) {
                throw new Error(error);
            }
        },


        // Tested successfully
        project: async (parent, { _id }) => {
            console.log(_id)
            return Project.findOne({ _id: _id })
                .populate({
                    path: 'team',
                    select: "teamName",
                });
        },
        // Tested successfully
        projectsByUser: async (parent, args) => {
            const params = await User.find(
                { _id: args._id }
            )
                .populate('projects')
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

        // Tested successfully
        team: async (parent, { _id }) => {
            return Team.findOne({ _id: _id })
            .populate("admin")
            .populate("members")
            .populate("projects");
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
        // checkForSandwichReset: async (parent, { userId }, context) => {
        //     console.log(context.user._id)
        //     const checkForReset = await User.findOne(
        //         { _id: userId }
        //     );

        //     let currentTime = new Date()
        //     if (currentTime > checkForReset.nextSandwichReset) {
        //         let setToNextDay = new Date(currentTime.setHours(currentTime.getHours() + 24)).toISOString().split('T')[0];
        //         return User.findOneAndUpdate(
        //             { _id: userId },
        //             {
        //                 $set: {
        //                     sandwichCount: 5,
        //                     nextSandwichReset: {
        //                         $toDate: setToNextDay + 'T09:00:00'
        //                     }
        //                 }
        //             }
        //         )
        //     } else {
        //         return User.findOne({ _id: userId })
        //     }
        // }

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
            await User.findOneAndUpdate(
                { teams: [args.team._id] },
                {
                    $pull: {
                        teams: args.team._id
                    }
                }
            )
            return Team.findOneAndDelete({ _id: args._id })
        },

        //   Successfully tested
        addUserToTeam: async (parent, { teamId, memberName }, context) => {
            console.log(teamId, memberName);
            const user = await User.findOne({ name: memberName });
            if (!user) {
                throw new Error(`User ${memberName} not found`);
            }
            await Team.findByIdAndUpdate(
                teamId,
                { $addToSet: { members: user._id } },
                { new: true }
            );
            await User.findByIdAndUpdate(
                user._id,
                { $addToSet: { teams: teamId } }
            );
            return await Team.findById(teamId).populate('members');
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

        // Success! Removes project and all associated tasks
        removeProject: async (parent, { projectId, userId }, context) => {
            const user = await User.findOne({ _id: userId });
            user.projects = user.projects.filter((project) => project._id.toString() !== projectId.toString());
            await user.save();
            await Task.deleteMany({ belongsToProject: projectId })
            return Project.findOneAndDelete({ _id: projectId });
        },
        // Successful create, update project, task
        addTask: async (parents, args, context) => {
            // console.log(args.task)
            const task = await Task.create({ ...args.task, assignedTo: [context.user._id] })
            // console.log(task)
            await Project.findOneAndUpdate(
                { _id: args.projectId },
                { $addToSet: { tasks: task._id } }
            )
            await Task.findOneAndUpdate(
                { _id: task._id },
                { $addToSet: { belongsToProject: args.projectId } }
            )
            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { tasks: task._id } }
            )
            return task
        },
        // Successful!
        removeTask: async (parent, { taskId, projectId, userId }, context) => {
            const user = await User.findOne({ _id: userId });
            user.tasks = user.tasks.filter((task) => task._id.toString() !== taskId.toString());
            await user.save();

            const project = await Project.findOne({ _id: projectId });
            project.tasks = project.tasks.filter((task) => task._id.toString() !== taskId.toString());
            await project.save();

            return Task.findOneAndDelete({ _id: taskId });
        },

        // Tested successfully, but showing empty array 
        assignTask: async (parent, { _id, userId }, context) => {
            console.log(_id)
            console.log(userId)
            return Task.findByIdAndUpdate(
                { _id },
                { $addToSet: { assignedTo: userId } }
            )
        },

        checkForSandwichReset: async (parent, args, context) => {
            const user = await User.findById(args._id);
            if (!user) {
                throw new Error(`User ${args._id} not found`);
            }
            const nextResetDate = user.nextSandwichReset;
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (currentDate > nextResetDate) {
                const updatedUser = await User.findByIdAndUpdate(
                    args._id,
                    { sandwichCount: 5, nextSandwichReset: currentDate },
                    { new: true } // Return the updated user object
                );
                return updatedUser; // Return the updated user object
            }
            return user; // Return the original user object
        },
        giveSandwich: async (parent, { receiverId }, context) => {
            let test = await User.findById(context.user._id)
            console.log(context.user)
            const me = await User.findByIdAndUpdate(context.user._id,
                { $inc: { sandwichCount: -1 } })
            console.log(me.sandwichCount)
            if (!me) {
                throw new Error(`User ${context._id} not found`);
            }
            const receiver = await User.findByIdAndUpdate(receiverId,
                { $inc: { sandwichReceived: 1 } })
            if (!receiver) {
                throw new Error('No user found to receive your sandwich')
            }
            console.log(receiver.sandwichReceived)
            return receiver
        }

    }
};


module.exports = resolvers;