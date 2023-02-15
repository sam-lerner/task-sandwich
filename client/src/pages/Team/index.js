import React from 'react';
import { Calendar, TeamTaskList, TeamInfo } from '../../components';
import { Row, Col } from "react-bootstrap";

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_TEAM } from '../../utils/queries';

import Auth from '../../utils/auth';

const Team = ({ teamID }) => {
  console.log(teamID)

  const { data: teamData, loading, error } = useQuery(QUERY_SINGLE_TEAM, {
    variables: { id: teamID },
  });
  console.log(teamData)

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return (
      <h4>
        You need to be logged in to see your team page. Use the navigation
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
console.log(teamData)
  return (
    <>
      <Row>
        <Col sm={3}>
          <Calendar />
        </Col>
        <Col sm={9}>
          <TeamTaskList teamData={teamData} />
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <TeamInfo teamData={teamData} />
        </Col>
      </Row>
    </>
  )
};

export default Team;