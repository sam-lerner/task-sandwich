import React from 'react';
import { Calendar, UserTaskList, UserInfo } from '../../components';
import { Row, Col } from "react-bootstrap";

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

import "./style.css";

const Profile = () => {

  const { data: userData, loading, error } = useQuery(QUERY_ME);

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
    return <div>Loading User...</div>;
  }

  if (error) {
    console.error(JSON.parse(JSON.stringify(error)))
    return <div>Error retrieving user data</div>;
  }

  return (
    <div className="profile-main">
      <Row>
        <Col sm={3}>
          <Calendar />
        </Col>
        {/* isLoggedInUser={!userId && true} */}
        <Col sm={9}>
          <UserTaskList userData={userData} />
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <UserInfo userData={userData} />
        </Col>
      </Row>

    </div>
  )

};

export default Profile;