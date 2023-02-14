import React, { useState } from 'react';
import { Calendar, CreateTeam, CreateProject, CreateTask, TaskList, UserInfo } from '../../components';
import { Button, Nav, Modal, Tab, Container, Row, Col } from "react-bootstrap";

import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_TASKS_BY_USER } from '../../utils/queries';

import Auth from '../../utils/auth';

import "./style.css";

const Profile = () => {

  const { data: userData, loading: meLoading, error: meError } = useQuery(QUERY_ME);
  // const { data: taskData, loading: taskLoading, error: taskError } = useQuery(QUERY_TASKS_BY_USER);

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
  if (meLoading) {
    return <div>Loading User...</div>;
  } 
  // else if (taskLoading) {
  //   return <div>Loading Tasks...</div>;
  // }

  if (meError) {
    console.error(JSON.parse(JSON.stringify(meError)))
    return <div>Error retrieving user data</div>;
  } 
  // else if (taskError) {
  //   console.error(JSON.parse(JSON.stringify(taskError)))
  //   return <div>Error retrieving task data</div>;
  // }

  return (
    <div className="profileMain">
      <Container>
        <Row>
          <Col>
            <Calendar />
          </Col>
          {/* isLoggedInUser={!userId && true} */}
          <Col>
            <TaskList userData={userData} />
          </Col>
        </Row>
        <UserInfo userData={userData} />
      </Container>
    </div>
  )

};

export default Profile;