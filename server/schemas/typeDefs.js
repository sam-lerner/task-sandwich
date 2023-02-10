const { gql } = require('@apollo/server');

const typeDefs = gql `
type User {
    _id: ID!
    name: String
    email: String
    teams: [Team]
    projects: [Project]
    sandwichCount: Int
    sandwichReceived: Int
}
type Team {
    _id: ID!
    teamName: String!
    admin: [User]
    members: [User]
    projects: [Project]
}
type Project {
    _id: ID!
    projectName: String!
    projectDescription: String
    startDate: Date
    endDate: Date
    team: [Team]
    tasks: [Task]
}
type Task {
    _id: ID!
    taskName: String!
    taskDescription: String
    createdOn: Date
    dueDate: Date
    taskStatus: String!
    assignedTo: [User]
    belongsToProject: [Project]
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    project(_id:ID!): Project
    projectsByUser(_id:ID!): [Project]
    projectsByTeam(_id:ID!): [Project]
    task(_id:ID!): Task
    tasksByProject(_id:ID!): [Task]
    tasksByUser(_id:ID!): [Task]
    tasksByTeam(_id:ID!): [Task]
    team(_id:ID!): Team
    teamsByUser(_id:ID!): [Team]
}

type Mutation {
    login(email: String!, password: String!):Auth
    addUser(username: String!, email:String!, password: String!):Auth
    addTeam(team:teamInput, _id:ID!):Team
    removeTeam(_id:ID!):Team
    addProject(project:projectInput, _id:ID!):Project
    removeProject(_id:ID!):Project
    addTask:(task:taskInput, _id:ID!):Project
    removeTask:(_id:ID!):Project
}

input: teamInput {
    teamName: String
    members: [User]
    project: [Project]
}

input: projectInput {
    projectName: String!
    projectDescription: String
    startDate: Date
    endDate: Date
    team: [Team]
    tasks: [Task]
}

input: taskInput {
    taskName: String
    taskDescription: String
    createdOn: Date
    dueDate: Date
    taskStatus: String!
    assignedTo: [User]
    belongsToProject: [Project]
}
`;

module.exports = typeDefs;
