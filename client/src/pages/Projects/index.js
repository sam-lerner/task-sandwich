import React from 'react';
import { Calendar, TaskList, ProjectInfo } from '../../components';

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROJECT } from '../../utils/queries';

import Auth from '../../utils/auth';

const Projects = (projectID) => {

  const { data, loading, error } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { id: projectID},
  });
  console.log(data)

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return (
      <h4>
        You need to be logged in to see your project page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }
  console.log("checked token")
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(JSON.parse(JSON.stringify(error)))
    return <div>Error retrieving data</div>;
  }

return (
    <>
      <Calendar />
      {/* <TaskList /> */}
      {/* <ProjectInfo projectID={projectID} /> */}
    </>
)
};

export default Projects;