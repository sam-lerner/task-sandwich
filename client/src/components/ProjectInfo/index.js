import React from 'react'

import "./style.css";



const ProjectInfo = ({ userData }) => {

  const projectData = userData.me.projects;

  // const { data, loading, error } = useQuery(QUERY_SINGLE_PROJECT, {
  //   variables: { id: "63ec16456117b20d5e622d9e"},
  // });

// console.log(data)

//   if (loading) {
//     return <div>Loading Project...</div>;
//   }
  
//   if (error) {
//     console.error(JSON.parse(JSON.stringify(error)))
//     return <div>Error retrieving project</div>;
//   }


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