import React from 'react';
import { Calendar, TaskList } from '../../components';

import { useQuery } from '@apollo/client';
import { QUERY_TASKS_BY_PROJECT } from '../../utils/queries';


const Projects = () => {

  const { data: taskData, loading, error } = useQuery(QUERY_TASKS_BY_PROJECT);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error retrieving data</div>;
  }

  return (
      <>
        <Calendar />
        <TaskList taskData={taskData} />
      </>
  )

};

export default Projects;