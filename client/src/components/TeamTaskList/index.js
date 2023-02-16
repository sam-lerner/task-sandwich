import React, { useState } from 'react';

import { Button, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap'

const TeamTaskList = ({ teamData }) => {

    return (
        <>
            <ListGroup className="team-task-info">
                {teamData.team.tasks ? (teamData.team.tasks.map((task, index) => (
                    <ListGroup.Item>
                        <OverlayTrigger trigger="click" placement="right" overlay={
                            <Popover id="popover-basic">
                                {/* <Popover.Header as="h3">{Date(task.dueDate).split(" ")[1]} {Date(task.dueDate).split(" ")[2]} {Date(task.dueDate).split(" ")[3]}</Popover.Header> */}
                                <Popover.Header as="h3">{teamData.team.endDate}</Popover.Header>
                                <Popover.Body>
                                    {teamData.team.teamDescription}
                                </Popover.Body>
                            </Popover>
                        }>
                            <Button variant="light" className="team-task-text">{teamData.team.teamName}</Button>
                        </OverlayTrigger>
                    </ListGroup.Item>
                ))) : (<p>NO TASKS!</p>)}
            </ListGroup>
        </>
    );
}

export default TeamTaskList;