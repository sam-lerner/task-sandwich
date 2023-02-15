import React from 'react'

import "./style.css";

const ProjectInfo = ({ projectData }) => {

  return (
    <>
      <div className="project-info">
        <div key={projectData._id} className="project-container">
          <h2 className="project-name">{projectData.project.projectName}</h2>
          <p>Project Description: {projectData.project.projectDescription} </p>
          <p>Start Date: {projectData.project.startDate}</p>
          <p>End Date: {projectData.project.endDate}</p>
          {/* <p>Team: {projectData.project.team ? projectData.project.team.teamName : "no team"}</p> */}
          <p>Team: {projectData.project.team && projectData.project.team.teamName ? projectData.project.team.teamName : "no team"}</p>

        </div>
      </div>
    </>
  )
}

export default ProjectInfo;