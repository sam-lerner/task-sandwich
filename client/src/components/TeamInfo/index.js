// import { useMutation } from '@apollo/client';
import React from 'react'
// import { GIVE_SANDWICH } from '../../utils/mutations';

import "./style.css";

const TeamInfo = ({ teamData }) => {
  // const [ addSandwich, { error } ] = useMutation(GIVE_SANDWICH)
  // // console.log(teamData)
  // const handleGiveSandwich = async (event) => {
  //   await addSandwich({variables: {receiverId: event.target.value}})
  //   console.log("this is the event: ", event)
  //   console.log('this is the value of event stuff: ', event.target.value)
  // }
  

  return (
    <>
      <div className="team-info">
        <div key={teamData._id} className="team-container">
          <h2 className="team-name team-text">{teamData.team.teamName}</h2>
          <div className="team-text">Admin:
            <ul>
              {teamData.team.admin.length && teamData.team.admin.map(admin => (
                <li key={admin._id}>
                  {admin.name} (🥪{admin.sandwichReceived})
                </li>
              ))}


              {/* {teamData.team.admin.length && teamData.team.admin.map(admin => <li key={admin._id}>{admin.email} </li>)} */}

            </ul>
          </div>
          <div className="team-text">Members:
            <ul>
              {teamData.team.members.length && teamData.team.members.map(member => <li value={member._id} >{member.name}(🥪{member.sandwichReceived})</li>)}
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