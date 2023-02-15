import "./style.css";

const UserInfo = ({ userData }) => {

  console.log(userData);
  console.log(userData.me.teams);
  console.log(userData.me.projects);
  console.log(userData.me.tasks);

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
          <div>Tasks:
            <ul>
              {userData.me.tasks.length && userData.me.tasks.map(task => <li>{task.taskName}</li>)}
            </ul>
          </div>
          {/* <p>{userData.sandwichCount}</p>
           <p>{userData.sandwichReceived}</p> */}
        </div>
      </div>
    </>
  )
}

export default UserInfo;