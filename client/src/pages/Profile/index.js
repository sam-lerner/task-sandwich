import React, { useState } from 'react';
import { Calendar, CreateTeam, CreateProject, CreateTask, TaskList, UserInfo } from '../../components';
import { Button, Nav, Modal, Tab, Container, Row, Col } from "react-bootstrap";

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

import "./style.css";

const Profile = () => {

  const [showModal, setShowModal] = useState(false);

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
  console.log("checked token")
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(JSON.parse(JSON.stringify(error)))
    return <div>Error retrieving data</div>;
  }

  return (
    <div className="profileMain">
      <Container>
        <Row>
          <Col>
            <Calendar />
          </Col>
          {/* isLoggedInUser={!userId && true} */}
          <Col>
          <TaskList />
          </Col>
        </Row>
        <UserInfo userData={userData} />
      </Container>
    </div>
  )

};

export default Profile;