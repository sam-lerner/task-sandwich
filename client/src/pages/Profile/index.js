import React from 'react';
import { Calendar, TaskList, UserInfo } from '../../components';
import { Container, Row, Col } from "react-bootstrap";

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
      <Container>
        <Row className="m-3">
          <Col className="m-2">
            <Calendar />
          </Col>
          {/* isLoggedInUser={!userId && true} */}
          <Col className="m-2">
            <TaskList userData={userData} />
          </Col>
        </Row>
        <UserInfo userData={userData} />
      </Container>
    </div>
  )

};

export default Profile;