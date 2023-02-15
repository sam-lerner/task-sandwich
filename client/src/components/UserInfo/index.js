import React from 'react';
import "./style.css";

const UserInfo = ({ userData }) => {

  return (
    <>
      <div className="user-info">
        <div key={userData.me._id} className="user-container">
          <h2 className="user-name">{userData.me.name}</h2>
          <div>Teams:
            <ul>
              {userData.me.teams.length && userData.me.teams.map(team => <li>{team.teamName}</li>)}
            </ul>
          </div>
          <div>Projects:
            <ul>
              {userData.me.projects.length && userData.me.projects.map(project => <li>{project.projectName}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfo;