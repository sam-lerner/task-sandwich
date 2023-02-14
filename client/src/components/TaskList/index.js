import React, { useState } from 'react';

import { Button, ListGroup, Collapse, OverlayTrigger, Popover } from 'react-bootstrap'

const TaskList = ({ userData }) => {
    const taskData = userData.me.tasks;
    console.log(taskData[0].dueDate)
    console.log(new Date(taskData[0].dueDate).toLocaleDateString());
    console.log(new Date(1738213200000).toLocaleDateString());
    console.log(new Date());
    console.log(new Date(Date.parse(taskData[0].dueDate)).toLocaleDateString());
    // const date = new Date(2025, 0, 30);
    // console.log(date.toLocaleDateString());





    const [open, setOpen] = useState({});

    function handleOpen(index) {
        setOpen({ ...open, [index]: !open[index] })
    }

    return (
        <>
            <ListGroup>
                {taskData.length && taskData.map((task, index) => (
                    <ListGroup.Item>
                        <OverlayTrigger trigger="click" placement="right" overlay={
                            <Popover id="popover-basic">
                                <Popover.Header as="h3">{new Date(task.dueDate).toLocaleDateString()}</Popover.Header>
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