import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { REMOVE_TASK } from '../../utils/mutations';

import { Button, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap';

import { BsTrash } from "react-icons/bs";
import "./style.css";

const UserTaskList = ({ userData }) => {
    const [tasks, setTasks] = useState(userData?.me?.tasks || []);


    const [removeTask, { error }] = useMutation(REMOVE_TASK);

    const handleRemoveTask = async (taskId) => {
        try {
            console.log(taskId)
            await removeTask({ variables: { taskId: taskId } });
            console.log('Task removed successfully');
            const updatedTasks = tasks.filter(task => task._id !== taskId);
            setTasks(updatedTasks);
        } catch (err) {
            console.error(JSON.parse(JSON.stringify(err)));
        }
    };
    

    return (
        <>
            <ListGroup className="user-task-info">
                {tasks.length && tasks.map((task, index) => (
                    <ListGroup.Item key={index}>
                        <OverlayTrigger trigger="click" placement="right" overlay={
                            <Popover id="popover-basic">
                                <Popover.Header as="h3">{task.dueDate}</Popover.Header>
                                <Popover.Body>
                                    {task.taskDescription}
                                </Popover.Body>
                            </Popover>
                        }>
                            <Button variant="light" className="user-task-text">{task.taskName}</Button>
                        </OverlayTrigger>
                        <Button onClick={() => handleRemoveTask(task._id)} className="usertask-delete-btn"><BsTrash /></Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}

export default UserTaskList;