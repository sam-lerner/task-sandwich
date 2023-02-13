import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      teams {
        _id
      }
      projects {
        _id
      }
    }
  }
`;

export const QUERY_SINGLE_PROJECT = gql `
  query project($projectId: ID!) {
    project(projectId: $projectId) {
        _id
        projectName
        projectDescription
        startDate
        endDate
        team
    }
  }
`;