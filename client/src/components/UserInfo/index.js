import { useState } from 'react';

import "./style.css";

const UserInfo = ({ userData }) => {
  // console.log(userData);
  // console.log(userData.me);
  // console.log(userData.me.teams);
  let user;

  if (userData) {
    user = userData.me;
  }

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
      {/* <div key={user._id}>
        <h2>{user.name}</h2>
        <p>{user.teams}</p>
        <p>{user.projects}</p> */}
        {/* <p>{info.sandwichCount}</p>
           <p>{info.sandwichReceived}</p> */}
      {/* </div> */}
    </div>
    </>
  )
}

export default UserInfo;