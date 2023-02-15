import React from 'react';
import { Calendar, ProjectTaskList, ProjectInfo } from '../../components';
import { Row, Col, Form, DropdownButton } from "react-bootstrap";

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROJECT } from '../../utils/queries';

import Auth from '../../utils/auth';

const Project = ({ projectID }) => {

  const { data: projectData, loading, error } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { id: projectID },
  });

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return (
      <h4>
        You need to be logged in to see your project page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(JSON.parse(JSON.stringify(error)))
    return <div>Error retrieving data</div>;
  }



  return (
    <>
      <Row>
        <Col sm={3}>
          <Calendar />
        </Col>
        <Col sm={9}>
          <ProjectTaskList projectData={projectData} />
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <ProjectInfo projectData={projectData} />
        </Col>
      </Row>
      {/* 
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        {data && teams.length && teams.map(team =>
          <Dropdown.Item href={"/team/" + team._id}>{team.teamName}</Dropdown.Item>)}
      </DropdownButton> */}

    </>
  )
};

export default Project;