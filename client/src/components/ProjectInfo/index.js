import React from 'react'

import "./style.css";

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROJECT } from '../../utils/queries';


const ProjectInfo = ({ projectID }) => {

  console.log("projectID in ProjectInfo: ", projectID)


  const { data, loading, error } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { id: projectID },
  });

  if (loading) {
    return <div>Loading Project...</div>;
  }

  if (error) {
    console.error(JSON.parse(JSON.stringify(error)))
    return <div>Error retrieving project</div>;
  }

  console.log(data.project.startDate)
  console.log(data.project.endDate)

  return (
    <>
      <div className="projectInfo">
        <div key={data._id}>
          <h2>{data.project.projectName}</h2>
          <p>Project Description: {data.project.projectDescription} </p>
          <p>Start Date: {data.project.startDate}</p>
          <p>End Date: {data.project.endDate}</p>
          {/* <p>Team: {data.project.team ? data.project.team.teamName : "no team"}</p> */}
          <p>Team: {data.project.team && data.project.team.teamName ? data.project.team.teamName : "no team"}</p>

        </div>
      </div>
    </>
  )
}

export default ProjectInfo;