import React, { useState } from 'react';

import { Button, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap'

const ProjectTaskList = ({ projectData }) => {

    return (
        <>
            <ListGroup className="project-task-info">
                {projectData.project.tasks ? (projectData.project.tasks.map((task, index) => (
                    <ListGroup.Item>
                        <OverlayTrigger trigger="click" placement="right" overlay={
                            <Popover id="popover-basic">
                                <Popover.Header as="h3">{projectData.project.endDate}</Popover.Header>
                                <Popover.Body>
                                    {projectData.project.projectDescription}
                                </Popover.Body>
                            </Popover>
                        }>
                            <Button variant="light" className="project-task-text">{projectData.project.projectName}</Button>
                        </OverlayTrigger>
                    </ListGroup.Item>
                ))) : (<p>NO TASKS!</p>)}
            </ListGroup>
        </>
    );
}

export default ProjectTaskList;