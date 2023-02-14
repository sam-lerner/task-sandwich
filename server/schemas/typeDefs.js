const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    name: String
    email: String
    teams: [Team]
    projects: [Project]
    tasks: [Task]
    nextSandwichReset: String
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
    startDate: String
    endDate: String
    team: [Team]
   
}
type Task {
    _id: ID!
    taskName: String!
    taskDescription: String
    createdOn: String
    dueDate: String
    taskStatus: String
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
    task(_id:ID): Task
    tasksByProject(_id:ID): [Task]
    tasksByUser(_id:ID): [Task]
    tasksByTeam(_id:ID): [Task]
    team(_id:ID!): Team
    teamsByUser(_id:ID!): [Team]
    checkForSandwichReset(_id:ID!): User
}
type Mutation {
    login(email: String!, password: String!):Auth
    addUser(name: String!, email: String!, password: String!):Auth
    addTeam(team: teamInput):Team
    addUserToTeam(_id:ID!, memberId:ID!):Team
    removeTeam(_id: ID!):Team
    addProject(project: projectInput, teamId:ID!):Project
    removeProject(_id: ID!):Project
    addTask(task: taskInput, projectId:ID!):Project
    removeTask(_id: ID!):Project
}
input teamInput {
    teamName: String
    members: [userInput]
    projects: [projectInput]
}
input projectInput {
    projectName: String!
    projectDescription: String
    startDate: String
    endDate: String
    team: [teamInput]
    tasks: [taskInput]
}
input taskInput {
    taskName: String
    taskDescription: String
    createdOn: String
    dueDate: String
    taskStatus: String
    assignedTo: userInput
    belongsToProject: projectInput
}
input userInput {
    userId: String!
    name: String!
    email: String!
    teams: [teamInput]
    projects: [projectInput]
    sandwichCount: Int
    sandwichReceived: Int
}
`;

module.exports = typeDefs;
