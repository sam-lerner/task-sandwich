const { User, Project, Team, Task } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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

        // profile: async (parent, { profileId }) => {
        //   return Profile.findOne({ _id: profileId });
        // },

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
            return Task.findOne(
                {
                    _id: projectId
                }
            )
        },
        team: async (parent, { teamId }) => {
            return Team.findOne({ _id: teamId });
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
        // THIS NEEDS TO CHANGE TO REFLECT TEAM, NOT USER.
        addProject: async (parent, args, context) => {
            const project = await Project.create(args.project);
            const team = context.team._id;
            await User.findOneAndUpdate(
                { _id: team },
                { $addToSet: { projects: project._id } }
            )
            return project;
        }
    },
};

module.exports = resolvers;
