import React from 'react';
import { Calendar, ProjectTaskList, ProjectInfo } from '../../components';
import { Row, Col } from "react-bootstrap";

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROJECT } from '../../utils/queries';

import Auth from '../../utils/auth';

const Projects = ({ projectID }) => {

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
console.log(projectData)
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
    </>
  )
};

export default Projects;