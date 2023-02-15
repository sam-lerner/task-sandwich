import { gql } from '@apollo/client';

//working
export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      teams {
        _id
        teamName
      }
      projects {
        _id
        projectName
      }
      tasks {
        _id
        taskName
        taskDescription
        dueDate
      }
    }
  }
`;

export const QUERY_SINGLE_PROJECT = gql`
query project($id: ID!) {
  project(_id: $id) {
    projectName
    projectDescription
    startDate
    endDate
    team {
      _id
    }
  }
}
`;

export const QUERY_SINGLE_TEAM = gql`
query team($id: ID!) {
  team(_id: $id) {
    admin {
      _id
    }
    members {
      _id
    }
    projects {
      _id
    }
    teamName
  }
}
`;

export const QUERY_SINGLE_TASK = gql`
query task($id: ID!) {
  task(_id: $id) {
    _id
    assignedTo {
      _id
    }
    belongsToProject {
      _id
    }
    createdOn
    dueDate
    taskDescription
    taskName
    taskStatus
  }
}
`;

export const QUERY_PROJECTS_BY_TEAM = gql`
query ProjectsByTeam($id: ID!) {
  projectsByTeam(_id: $id) {
    endDate
    projectDescription
    projectName
    startDate
    team {
      _id
    }
  }
}
`;

export const QUERY_PROJECTS_BY_USER = gql`
query ProjectsByUser($id: ID!) {
  projectsByUser(_id: $id) {
    endDate
    projectDescription
    projectName
    startDate
    team {
      _id
    }
  }
}
`;

export const QUERY_TASKS_BY_PROJECT = gql`
query TasksByProject($id: ID) {
  tasksByProject(_id: $id) {
    assignedTo {
      _id
    }
    belongsToProject {
      _id
    }
    createdOn
    dueDate
    taskDescription
    taskName
    taskStatus
  }
}
`;

export const QUERY_TASKS_BY_TEAM = gql`
query TasksByTeam($id: ID) {
  tasksByTeam(_id: $id) {
    assignedTo {
      _id
    }
    belongsToProject {
      _id
    }
    createdOn
    dueDate
    taskDescription
    taskName
    taskStatus
  }
}
`;

export const QUERY_TASKS_BY_USER = gql`
query TasksByUser($id: ID) {
  tasksByUser(_id: $id) {
    assignedTo {
      _id
    }
    belongsToProject {
      _id
    }
    createdOn
    dueDate
    taskDescription
    taskName
    taskStatus
  }
}
`;

export const QUERY_TEAMS_BY_USER = gql`
query TeamsByUser($id: ID!) {
  teamsByUser(_id: $id) {
    admin {
      _id
    }
    members {
      _id
    }
    projects {
      _id
    }
    teamName
  }
}
`;