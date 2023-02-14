import "./style.css";

const ProjectInfo = ({ userData }) => {

  const projectData = userData.me.projects;


  return (
    <>
      <div className="projectInfo">
        <div key={userData.me._id}>
          <h2>{userData.me.name}</h2>

          <div>Projects:
            <ul>
              {projectData.length && projectData.map(project => <li>{project.projectName}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectInfo;