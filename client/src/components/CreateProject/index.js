import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../utils/mutations';

const CreateTeam = () => {

    const [projectFormData, setProjectFormData] = useState({ projectName: '', projectDescription: '', endDate: '' });
    const [createProject, { error }] = useMutation(ADD_PROJECT);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProjectFormData({ ...projectFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // date input is a timstamp in milliseconds, we convert it here and pass it with the variables when creating the project
        const date = new Date(projectFormData.endDate);
        const formattedDate = date.toLocaleDateString();

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await createProject({ variables: { project: { ...projectFormData, endDate: formattedDate } } });
        } catch (err) {
            console.error(JSON.parse(JSON.stringify(err)));
        }

        setProjectFormData({
            projectName: '',
            projectDescription: '',
            endDate: '',
        });
    };

    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='What should we call the project?'
                        name='projectName'
                        onChange={handleInputChange}
                        value={projectFormData.projectName}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Describe your project.'
                        name='projectDescription'
                        onChange={handleInputChange}
                        value={projectFormData.projectDescription}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Project End Date</Form.Label>
                    <Form.Control
                        type='date'
                        name='endDate'
                        onChange={handleInputChange}
                        value={projectFormData.endDate}
                    />
                </Form.Group>
                <Button
                    disabled={!(projectFormData.projectName)}
                    type='submit'
                    variant='success'>
                    Create Project
                </Button>
            </Form>
        </>
    )
}

export default CreateTeam