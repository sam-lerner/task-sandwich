import { gql } from '@apollo/client';

//working
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

//working
export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

//working
export const ADD_TEAM = gql`
mutation AddTeam($team: teamInput) {
  addTeam(team: $team) {
    _id
    teamName
    admin {
      name
    }
    members {
      name
    }
  }
}
`;

export const ADD_PROJECT = gql`
mutation addProject($project: projectInput, $teamId: ID) {
  addProject(project: $project, teamId: $teamId) {
    _id
    endDate
    projectName
    projectDescription
    startDate
  }
}
`;

export const ADD_TASK = gql`
mutation addTask($task: taskInput, $projectId: ID) {
  addTask(task: $task, projectId: $projectId) {
    _id
    dueDate
    taskDescription
    taskName
  }
}
`;

export const CHECK_SANDWICH_RESET = gql`
mutation CheckForSandwichReset($id: ID!) {
  checkForSandwichReset(_id: $id) {
    nextSandwichReset
    sandwichCount
  }
}
`;

export const GIVE_SANDWICH = gql`
mutation giveSandwich($receiverId:ID!) {
  giveSandwich(receiverId: $receiverId) {
    sandwichReceived
  }
}`
