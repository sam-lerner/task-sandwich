const { User, Project, Team, taskSchema } = require('../models');

const resolvers = {
    Query: {

        // !!! example
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-_v -password')
              return userData;
            }
            throw new AuthenticationError('Please log in')
          },

        project: async (parent, { projectId }) => {
            return Project.findOne({_id: projectId});
        },

        projectsByUser: async (parent, { userId }) => {
            const projectsForUser = await User.find(
                {_id: userId },
                {projectId: 1}
            )
            //expect array of IDs
            const params = projectsForUser ? { _id } : {};

            return Project.find(params) //array of only values, no property names
        },

        // profile: async (parent, { profileId }) => {
        //   return Profile.findOne({ _id: profileId });
        // },

        task: async (parent, {taskId}) => {
            return Project.findOne(
                {
                    _id: projectId
                },
                {
                    $inc: { tasks:[ taskId ]}
                }
            )
        },

        taskByProject: async (parent, {projectId}) => {
            return Project.findOne(
                {
                    _id: projectId
                },
                {
                    tasks: 1
                }
            )
        },
        team: async (parent, {teamId}) => {
            return Team.findOne({_id: teamId});
        }

    },

    Mutation: {

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
          addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
          },

        // !!! example
        // addProfile: async (parent, { name }) => {
        //   return Profile.create({ name });
        // },
        // addSkill: async (parent, { profileId, skill }) => {
        //   return Profile.findOneAndUpdate(
        //     { _id: profileId },
        //     {
        //       $addToSet: { skills: skill },
        //     },
        //     {
        //       new: true,
        //       runValidators: true,
        //     }
        //   );
        // },
        // removeProfile: async (parent, { profileId }) => {
        //   return Profile.findOneAndDelete({ _id: profileId });
        // },
        // removeSkill: async (parent, { profileId, skill }) => {
        //   return Profile.findOneAndUpdate(
        //     { _id: profileId },
        //     { $pull: { skills: skill } },
        //     { new: true }
        //   );
        // },
    },
};

module.exports = resolvers;
