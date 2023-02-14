import "./style.css";

const UserInfo = ({ userData }) => {

  return (
    <>
      <div className="userInfo">
        <div key={userData.me._id}>
          <h2>{userData.me.name}</h2>
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
          <div>Tasks:
            <ul>
              {userData.me.tasks.length && userData.me.tasks.map(task => <li>{task.taskName}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfo;