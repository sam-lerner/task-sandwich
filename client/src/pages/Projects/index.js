import React from 'react';
import { Calendar, TaskList, ProjectInfo } from '../../components';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const Projects = () => {

  const { data: userData, loading, error } = useQuery(QUERY_ME);

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
      <TaskList />
      <ProjectInfo userData={userData} />
    </>
)
};

export default Projects;