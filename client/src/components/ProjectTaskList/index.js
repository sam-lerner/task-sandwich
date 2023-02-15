import React, { useState } from 'react';

import { Button, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap'

const ProjectTaskList = ({ projectData }) => {
    console.log(projectData)
    console.log(projectData.project)
    console.log(projectData.project.task)

    return (
        <>
            <ListGroup>
                {projectData.project.tasks ? (projectData.project.tasks.map((task, index) => (
                    <ListGroup.Item>
                        <OverlayTrigger trigger="click" placement="right" overlay={
                            <Popover id="popover-basic">
                                {/* <Popover.Header as="h3">{Date(task.dueDate).split(" ")[1]} {Date(task.dueDate).split(" ")[2]} {Date(task.dueDate).split(" ")[3]}</Popover.Header> */}
                                <Popover.Header as="h3">{projectData.project.endDate}</Popover.Header>
                                <Popover.Body>
                                    {projectData.project.projectDescription}
                                </Popover.Body>
                            </Popover>
                        }>
                            <Button variant="light">{projectData.project.projectName}</Button>
                        </OverlayTrigger>
                    </ListGroup.Item>
                ))) : (<p>NO TASKS!</p>)}
            </ListGroup>
        </>
    );
}

export default ProjectTaskList;