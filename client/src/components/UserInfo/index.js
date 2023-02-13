// import { useState } from 'react';

import "./style.css";

const UserInfo = ({ userData }) => {
  // console.log(userData);
  // console.log(userData.me);
  // console.log(userData.me.teams);
  // let user;
  console.log(userData);
  // if (userData) {
  //   user = userData.me;
  // }

  // console.log(user);
  // console.log(user.name);

  // const [info, setInfo] = useState(userData);

  // useEffect(() => {
  //   const fetchInfo = async () => {
  //     const result = await getInfo();
  //     setInfo(result);
  //   }
  //   fetchInfo();
  // }, []);
  // console.log(`info: ${info}`)
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