import React, { useState } from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../../utils/mutations';
import { useQuery } from '@apollo/client';
import { QUERY_TEAMS } from '../../../utils/queries';

const CreateTeam = () => {

    const [projectFormData, setProjectFormData] = useState({ projectName: '', projectDescription: '', endDate: '' });
    const [createProject, { error }] = useMutation(ADD_PROJECT);

    const { data: teamData, loading, error: teamError } = useQuery(QUERY_TEAMS);
    const teams = teamData?.getTeams;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProjectFormData({ ...projectFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // date input is a timstamp in milliseconds, we convert it here and pass it with the variables when creating the project
        const date = new Date(projectFormData.endDate);
        const formattedDate = date.toLocaleDateString();

        // get the selected team
        const teamId = event.target.floatingSelect.value;

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        console.log({ project: { ...projectFormData, endDate: formattedDate }, teamId })

        // teamId is same as teamId: teamId
        try {
            const { data } = await createProject({ variables: { project: { ...projectFormData, endDate: formattedDate }, teamId } });
        } catch (err) {
            console.error(JSON.parse(JSON.stringify(err)));
        }

        setProjectFormData({
            projectName: '',
            projectDescription: '',
            endDate: '',
        })
        window.location.reload();
    };

    // console.log(teamData.getTeams[0].teamName)
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
                    <Form.Label>Which team will this project be assigned to?</Form.Label>
                    <FloatingLabel controlId="floatingSelect">
                        <Form.Select aria-label="Floating label select example">
                            {teams && teams.map(team => <option value={team._id}>{team.teamName}</option>)}
                        </Form.Select>
                    </FloatingLabel>
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