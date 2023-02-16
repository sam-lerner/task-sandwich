import React from 'react';
import "./style.css";

const UserInfo = ({ userData }) => {

  return (
    <>
      <div className="user-info">
        <div key={userData.me._id} className="user-container">
          <h2 className="user-name user-text">{userData.me.name}</h2>
          <div className="user-teams user-text">Teams:
            <ul>
              {userData.me.teams.length && userData.me.teams.map((team, index) => <li key={index}>{team.teamName}</li>)}
            </ul>
          </div>
          <div className="user-projects user-text">Projects:
            <ul>
              {userData.me.projects.length && userData.me.projects.map((project, index) => <li key={index}>{project.projectName}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfo;