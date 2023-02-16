import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_TEAM } from '../../../utils/mutations';

const CreateTeam = () => {

    const [teamFormData, setTeamFormData] = useState({ teamName: '' });
    const [createTeam, { error }] = useMutation(ADD_TEAM);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTeamFormData({ ...teamFormData, [name]: value });
    };
    console.log(teamFormData)

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            console.log({...teamFormData})
            const { data } = await createTeam({ variables: { team: {...teamFormData} } });
            console.log(teamFormData);
            setTeamFormData({
                teamName: '',
            });
            console.log(teamFormData);
        } catch (err) {
            console.error(JSON.parse(JSON.stringify(err)));
        }
        window.location.reload()
    };

    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='What is your team called?'
                        name='teamName'
                        onChange={handleInputChange}
                        value={teamFormData.teamName}
                        required
                    />
                </Form.Group>
                <Button
                    disabled={!(teamFormData.teamName)}
                    type='submit'
                    variant='success'>
                    Create Team
                </Button>
            </Form>
        </>
    )
}

export default CreateTeam