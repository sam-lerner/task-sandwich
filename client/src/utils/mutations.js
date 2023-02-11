import { gql } from '@apollo/client';

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

export const ADD_TEAM = gql`
  mutation addTeam($userId: ID!, $teamName: String!, $members: String, $projects: String) {
    addTeam(userId: $userId, teamName: $teamName, members: $members, projects: $projects) {
      _id
      teamName
      admin
      members
      project
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($userId: ID!, $projectName: String!) {
    addProject(userId: $userId, projectName: $projectName) {
      _id
      projectName
    }
  }
`;