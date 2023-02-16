import React from 'react'

import "./style.css";

const TeamInfo = ({ teamData }) => {

  return (
    <>
      <div className="team-info">
        <div key={teamData._id} className="team-container">
          <h2 className="team-name team-text">{teamData.team.teamName}</h2>
          <div className="team-text">Admin:
            <ul>
              {teamData.team.admin.length && teamData.team.admin.map(admin => <li key={admin._id} >{admin.name}</li>)}
            </ul>
          </div>
          <div className="team-text">Members:
            <ul>
              {teamData.team.members.length && teamData.team.members.map(member => <li key={member._id} >{member.name}</li>)}
            </ul>
          </div>
          <div className="team-text">Projects:
            <ul>
              {teamData.team.projects.length && teamData.team.projects.map(project => <li key={project._id} >{project.projectName}</li>)}
            </ul>
          </div>

        </div>
      </div>
    </>
  )
}

export default TeamInfo;