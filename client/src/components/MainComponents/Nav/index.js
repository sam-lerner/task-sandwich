import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab, Dropdown, DropdownButton, NavDropdown } from "react-bootstrap";
import { SignupForm, LoginForm, CreateTeam, CreateProject, CreateTask } from "../../../components"

import { useQuery } from '@apollo/client';
import { QUERY_TEAMS_BY_USER, QUERY_PROJECTS_BY_USER, QUERY_ME } from '../../../utils/queries';

import Auth from "../../../utils/auth";

import "./style.css";

const AppNavbar = () => {

  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  //   const { data: teamData, loading: teamLoading, error:teamError } = useQuery(QUERY_TEAMS_BY_USER);
  // console.log(teamData)

  const { data, loading, error } = useQuery(QUERY_ME);
  // checking whether data is truthy because the results will be undefined until the query finishes loading
  const teams = data?.me?.teams;
  const projects = data?.me?.projects;

  if (loading) {
    return <div>Loading Teams and Projects...</div>;
  }
  
  if (error) {
    console.error(JSON.parse(JSON.stringify(error)))
    return <div>Error retrieving teams and projects</div>;
  }


  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              {/* if user is logged in show all of these */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/profile'>Your Profile</Nav.Link>
                  <Nav.Link as={Link} to='/projects'>Your Projects</Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                  <Nav.Link onClick={() => setShowCreateModal(true)}>Create</Nav.Link>
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title="My Teams"
                    menuVariant="dark"
                  >
                    {teams.length && teams.map(team =>
                      <NavDropdown.Item href="#action/3.1">{team.teamName}</NavDropdown.Item>)}
                  </NavDropdown>
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title="My Projects"
                    menuVariant="dark"
                  >
                    {projects.length && projects.map(project =>
                      <NavDropdown.Item href="#action/3.1">{project.projectName}</NavDropdown.Item>)}
                  </NavDropdown>

                </>
              ) : (
                // if user is not logged in, only show this
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignupForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
      <Modal
        size='lg'
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
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
                <Nav.Item>
                  <Nav.Link eventKey='task'>Create a Task</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='team'>
                <CreateTeam handleModalClose={() => setShowCreateModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='project'>
                <CreateProject handleModalClose={() => setShowCreateModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='task'>
                <CreateTask handleModalClose={() => setShowCreateModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;