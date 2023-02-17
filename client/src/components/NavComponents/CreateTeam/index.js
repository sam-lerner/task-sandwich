import React, { useState, useEffect } from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

import { useMutation } from '@apollo/client';
import { ADD_TEAM } from '../../../utils/mutations';
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../../utils/queries";

const CreateTeam = () => {
    const [teamFormData, setTeamFormData] = useState({ teamName: '' });
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    const [createTeam, { error }] = useMutation(ADD_TEAM);

    const { data: usersData, loading: usersLoading, error: usersError } = useQuery(QUERY_USERS);
    const allUsersData = usersData?.getUsers

    if (usersLoading) {
        return <div>Loading Users...</div>;
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTeamFormData({ ...teamFormData, [name]: value });

    };

    const handleUserSelect = (selectedItems) => {
        // console.log(selectedItems)

        // const ids = selectedItems.map((item) => item.key);
        // console.log('ids:', ids);
        // setSelectedUserIds(ids);
        console.log(selectedItems)
        
        setSelectedUserIds(selectedItems);
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

            const members = selectedUserIds.map((userId) =>  ({ userId }) )
            console.log(members)
            const { data } = await createTeam(
                { variables: { team: { teamName: teamFormData.teamName, members: members } } });
            //clears form input after submit (after mutation is complete)
            setTeamFormData({
                teamName: '',
            });
        } catch (err) {
            console.error(JSON.parse(JSON.stringify(err)));
        }

        // window.location.reload()
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
                <Form.Group>
                    <Form.Label>Who will be assigned to this team?</Form.Label>
                    {/* <FloatingLabel controlId="floatingSelect">
                        <Form.Select aria-label="Floating label select example" onChange={handleInputChange}>
                            {allUsersData.length && allUsersData.map((user, index) => <option key={index} value={user._id}>{user.name}</option>)}
                        </Form.Select>
                    </FloatingLabel> */}
                    <DropdownMultiselect
                        options={allUsersData.length && allUsersData.map((user) => ({ key: user._id, label: user.name }))}
                        name="users"
                        placeholder="choose a user"
                        handleOnChange={handleUserSelect}
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