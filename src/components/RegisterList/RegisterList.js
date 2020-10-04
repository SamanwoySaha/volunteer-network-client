import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './RegisterList.css';

const RegisterList = () => {
    const [volunteerList, setVolunteerList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/volunteerList')
            .then(res => res.json())
            .then(data => setVolunteerList(data))
            .catch(err => console.log(err));
    });

    const handleRemoveVolunteer = (volunteerId) => {
        fetch('http://localhost:5000/removeVolunteer', {
            method: 'DELETE',
            body: JSON.stringify({ id: volunteerId }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => setVolunteerList(data))
        .catch(err => console.log(err));
    }

    return (
        <Table borderless responsive="md">
            <thead className="table-header">
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
                        const {name, email, eventName, eventDate} = volunteer;
                        return (
                            <tr>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{(eventDate)}</td>
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