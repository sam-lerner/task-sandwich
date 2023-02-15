import React from 'react'

import "./style.css";

const TeamInfo = ({ teamData }) => {

  console.log(teamData)
  // console.log(teamData.team.endDate)

  return (
    <>
      <div className="team-info">
        <div key={teamData._id} className="team-container">
          <h2 className="team-name">{teamData.team.teamName}</h2>
          <div>Admin:
            <ul>
              {teamData.team.admin.length && teamData.team.admin.map(admin => <li>{admin._id}</li>)}
            </ul>
          </div>
          <div>Members:
            <ul>
              {teamData.team.members.length && teamData.team.members.map(member => <li>{member._id}</li>)}
            </ul>
          </div>
          <div>Projects:
            <ul>
              <li>projects</li>
            </ul>
          </div>

        </div>
      </div>
    </>
  )
}

export default TeamInfo;