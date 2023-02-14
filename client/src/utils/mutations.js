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
mutation addTeam($team: teamInput) {
  addTeam(team: $team) {
    _id
  }
}
`;

export const ADD_PROJECT = gql`
mutation addProject($teamId: ID!) {
  addProject(teamId: $teamId) {
    _id
    endDate
    projectName
    projectDescription
    startDate
    team {
      _id
    }
  }
}
`;