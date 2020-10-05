import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './RegisterList.css';
import moment from 'moment';

const RegisterList = () => {
    const [volunteerList, setVolunteerList] = useState([]);
    const [currentState, setCurrentState] = useState(false);

    useEffect(() => {
        fetch('https://immense-sea-30158.herokuapp.com/volunteerList')
            .then(res => res.json())
            .then(data => setVolunteerList(data))
            .catch(err => console.log(err));
    }, [currentState]);

    const handleRemoveVolunteer = (volunteerId) => {
        fetch('https://immense-sea-30158.herokuapp.com/removeVolunteer', {
            method: 'DELETE',
            body: JSON.stringify({ id: volunteerId }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                setCurrentState(!currentState);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <Table borderless responsive="md">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email ID</th>
                    <th>Registration Date</th>
                    <th>Volunteer List</th>
                    <th className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    volunteerList.map(volunteer => {
                        const { name, email, eventName, eventDate } = volunteer;
                        return (
                            <tr key={volunteer._id}>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{moment(eventDate).format('DD-MM-YYYY')}</td>
                                <td>{eventName}</td>
                                <td onClick={() => handleRemoveVolunteer(volunteer._id)} className="text-center">
                                    <div className="delete-btn"></div>
                                </td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </Table>
    );
};

export default RegisterList;