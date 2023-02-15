import React from 'react'

import "./style.css";

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROJECT } from '../../utils/queries';


const ProjectInfo = ({ projectID }) => {

  console.log("projectID in ProjectInfo: ", projectID)

  const { data, loading, error } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { id: projectID },
  });

  console.log(data)

  if (loading) {
    return <div>Loading Project...</div>;
  }

  if (error) {
    console.error(JSON.parse(JSON.stringify(error)))
    return <div>Error retrieving project</div>;
  }


  return (
    <>
      <div className="projectInfo">
        <div key={data._id}>
          <h2>{data.projectName}</h2>

          <div>Projects:
            <ul>
              {data.length && data.map(project => <li>{project.projectName}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectInfo;