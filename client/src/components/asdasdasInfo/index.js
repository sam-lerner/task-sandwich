import { useState } from 'react';
// import { QUERY_ME } from '../../utils/queries';

// const { User } = require("../../../../server/models");
// import Auth from '../../utils/auth';
// const [userData, setUserData] = useState({});

import "./style.css";

// const { data, loading, error } = useQuery(QUERY_ME, {
//   onCompleted: (data) => {
//     setUserData(data);
//     console.log(userData);
//   }
// });

// const token = Auth.loggedIn() ? Auth.getToken() : null;

// if (!token) {
//   return (
//     <h4>
//       You need to be logged in to see your profile page. Use the navigation
//       links above to sign up or log in!
//     </h4>
//   );
// }

// if (loading) {
//   return <div>Loading...</div>;
// }

// const getInfo = async (parent, args, context) => {
//   if (context.user) {
//     const userData = await User.findOne({ _id: context.user._id })
//         .select('-_v -password')
//     return userData;
// }
// throw new AuthenticationError('Please log in')
// };

const UserInfo = ({ userData }) => {
  console.log(userData);
  const [info, setInfo] = useState([]);

  // useEffect(() => {
  //   const fetchInfo = async () => {
  //     const result = await getInfo();
  //     setInfo(result);
  //   }
  //   fetchInfo();
  // }, []);

  return (
    <div className="userInfo">
      {userData.map((item) => (
        <div key={item._id}>
          <h2>{item.name}</h2>
          <p>{item.teams}</p>
          <p>{item.projects}</p>
          <p>{item.sandwichCount}</p>
          <p>{item.sandwichReceived}</p>
        </div>
      ))}
    </div>
  )
}

export default UserInfo;