import React from 'react'

import "./style.css";

const ProjectInfo = ({ projectData }) => {

  return (
    <>
      <div className="project-info">
        <div key={projectData._id} className="project-container">
          <h2 className="project-name project-text">{projectData.project.projectName}</h2>
          <p className="project-text">Project Description: {projectData.project.projectDescription} </p>
          <p className="project-text">Start Date: {projectData.project.startDate}</p>
          <p className="project-text">End Date: {projectData.project.endDate}</p>
          <p className="project-text">Team: {projectData.project.team && projectData.project.team.length > 0 && projectData.project.team[0].teamName ? projectData.project.team[0].teamName : "no team"}</p>

        </div>
      </div>
    </>
  )
}

export default ProjectInfo;