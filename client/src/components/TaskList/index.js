import React, { useState } from 'react';

import { Button, ListGroup, Collapse, OverlayTrigger, Popover } from 'react-bootstrap'

const TaskList = ({ userData }) => {
    const taskData = userData.me.tasks;

    const [open, setOpen] = useState({});

    return (
        <>
            <ListGroup>
                {taskData.length && taskData.map((task, index) => (
                    <ListGroup.Item>
                        <OverlayTrigger trigger="click" placement="right" overlay={
                            <Popover id="popover-basic">
                                <Popover.Header as="h3">{Date(task.dueDate).split(" ")[1]} {Date(task.dueDate).split(" ")[2]} {Date(task.dueDate).split(" ")[3]}</Popover.Header>
                                <Popover.Body>
                                    {task.taskDescription}
                                </Popover.Body>
                            </Popover>
                        }>
                            <Button variant="light">{task.taskName}</Button>
                        </OverlayTrigger>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}

export default TaskList;