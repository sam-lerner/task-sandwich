import React from 'react';
import { Calendar, TaskList } from '../../components';

import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS_BY_USER } from '../../utils/queries';

const Projects = () => {

  const { projects: projectData, loading, error } = useQuery(QUERY_PROJECTS_BY_USER);

  console.log(projectData);


  // const { data: taskData } = useQuery(QUERY_TASKS_BY_PROJECT);

    if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error retrieving data</div>;
  }

return (
    <>
      <Calendar />
      {/* <TaskList taskData= {taskData}/> */}
    </>
)

};

export default Projects;