import "./style.css";

const UserInfo = ({ userData }) => {

  console.log(userData);
 
  return (
    <>
    <div className="userInfo">
      <div key={userData.me._id}>
        <h2>{userData.me.name}</h2>
        <p>{userData.me.teams}</p>
        <p>{userData.me.projects}</p>
        {/* <p>{userData.sandwichCount}</p>
           <p>{userData.sandwichReceived}</p> */}
      </div>
    </div>
    </>
  )
}

export default UserInfo;