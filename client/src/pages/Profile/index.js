import React, { useState } from 'react';
import { Calendar, TaskList, CreateTeam } from '../../components';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const Profile = () => {

  const [userData, setUserData] = useState({});

  const { data, loading, error } = useQuery(QUERY_ME, {
    onCompleted: (data) => {
      setUserData(data);
    }
  });

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Calendar />
      {/* isLoggedInUser={!userId && true} */}
      <TaskList />
      <CreateTeam />
    </>
  )

};

export default Profile;