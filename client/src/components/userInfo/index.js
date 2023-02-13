import { useState, useEffect } from 'react';

const { User } = require("../../../../server/models");

import "./style.css";

const getInfo = async () => {
  const info = await User.findById();
  return info;
};

const userInfo = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      const result = await getInfo();
      setInfo(result);
    }
    fetchInfo();
  }, []);

  return (
    <div className="userInfo">
      {info.map((user) => (
        <div key={user._id}>
          <h2>{user.name}</h2>
          <p>{user.teams}</p>
          <p>{user.projects}</p>
          <p>{user.sandwichCount}</p>
          <p>{user.sandwichReceived}</p>
        </div>
      ))}
    </div>
  )
}

export default userInfo;