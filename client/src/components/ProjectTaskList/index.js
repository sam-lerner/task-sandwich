import React, { useState } from 'react';

import { Button, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap'

const ProjectTaskList = ({ projectData }) => {
    console.log(projectData)
    console.log(projectData.project.tasks)

    return (
        <>
            <ListGroup className="project-task-info">
                {projectData.project.tasks ? (projectData.project.tasks.map((task, index) => (
                    <ListGroup.Item key={index}>
                        <OverlayTrigger trigger="click" placement="right" overlay={
                            <Popover id="popover-basic">
                                <Popover.Header as="h3">{task.dueDate}</Popover.Header>
                                <Popover.Body>
                                    {task.taskDescription}
                                </Popover.Body>
                            </Popover>
                        }>
                            <Button variant="light" className="project-task-text">{task.taskName}</Button>
                        </OverlayTrigger>
                    </ListGroup.Item>
                ))) : (<p>NO TASKS!</p>)}
            </ListGroup>
        </>
    );
}

export default ProjectTaskList;