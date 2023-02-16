import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_TASK } from '../../../utils/mutations';

const CreateTeam = () => {

    const [taskFormData, setTaskFormData] = useState({ taskName: '', taskDescription: '', dueDate: '' });
    const [createTask, { error }] = useMutation(ADD_TASK);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTaskFormData({ ...taskFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await createTask({ variables: { task: { ...taskFormData } } });
        } catch (err) {
            console.error(JSON.parse(JSON.stringify(err)));
        }

        setTaskFormData({
            taskName: '',
            taskDescription: '',
            dueDate: '',
        });
    };

    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Task Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='What should we call the task?'
                        name='taskName'
                        onChange={handleInputChange}
                        value={taskFormData.taskName}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Describe your task.'
                        name='taskDescription'
                        onChange={handleInputChange}
                        value={taskFormData.taskDescription}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Task Due Date</Form.Label>
                    <Form.Control
                        type='date'
                        name='dueDate'
                        onChange={handleInputChange}
                        value={taskFormData.dueDate}
                    />
                </Form.Group>
                <Button
                    disabled={!(taskFormData.taskName)}
                    type='submit'
                    variant='success'>
                    Create Task
                </Button>
            </Form>
        </>
    )
}

export default CreateTeam