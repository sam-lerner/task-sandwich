import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Calendar } from '../../components';
import Auth from '../../utils/auth';

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../../utils/queries';

const Profile = () => {
  const { userId } = useParams();

  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    // userId ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { userId: userId },
    }
  );


  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const user = data?.me || data?.user || {};

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getUser().data._id === userId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.name) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <>
      <Calendar />
      {/* isLoggedInUser={!userId && true} */}
    </>
  )

};

export default Profile;