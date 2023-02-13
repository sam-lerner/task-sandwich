import React, { useState } from 'react';
import { Calendar, TaskList, CreateTeam, CreateProject, UserInfo } from '../../components';
import { Button, Nav, Modal, Tab } from "react-bootstrap";

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const Profile = () => {

  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { data, loading, error } = useQuery(QUERY_ME, {
    onCompleted: (data) => {
      setUserData(data);
    }
  });
  // console.log(userData);

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

  if (error) {
    return <div>Error retrieving data</div>;
  }


  return (
    <>
      <Calendar/>
      {/* isLoggedInUser={!userId && true} */}
      <TaskList />
      <Button onClick={() => setShowModal(true)}> Create a Team or Project </Button>
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='create-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='team'>
          <Modal.Header closeButton>
            <Modal.Title id='team-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='team'>Create a Team</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='project'>Create a Project</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='team'>
                <CreateTeam handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='project'>
                <CreateProject handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
      <UserInfo userData={userData}/>
    </>
  )

};

export default Profile;