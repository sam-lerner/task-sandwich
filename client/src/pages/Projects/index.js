import React from 'react';
import { Calendar, UserTaskList, ProjectInfo } from '../../components';
import { Row, Col } from "react-bootstrap";

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROJECT } from '../../utils/queries';

import Auth from '../../utils/auth';

const Projects = ({ projectID }) => {
  console.log("projectID in Projects: ", projectID);

  const { data, loading, error } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { id: projectID },
  });
  console.log(data);

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return (
      <h4>
        You need to be logged in to see your project page. Use the navigation
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
    <>
      <Row>
        <Col sm={3}>
          <Calendar />
        </Col>
        <Col sm={9}>
          {/* <UserTaskList /> */}
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <ProjectInfo projectID={projectID} />
        </Col>
      </Row>
    </>
  )
};

export default Projects;