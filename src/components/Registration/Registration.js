import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../../App';
import './Registration.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useParams } from 'react-router-dom';

const Registration = () => {
    const {id} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { userName, userEmail } = loggedInUser;
    const [eventInfo, setEventInfo] = useState({});
    const [startDate, setStartDate] = useState(null);
    const name = useRef('');
    const email = useRef('');
    const eventDate = useRef('');
    const eventName = useRef('');
    const eventDescription = useRef('');
    const history = useHistory();

    useEffect(() => {
        fetch(`https://immense-sea-30158.herokuapp.com/eventById/${id}`)
        .then(res => res.json())
        .then(data => setEventInfo(data[0]))
        .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        const volunteerDetails = {
            name: name.current.value,
            email: email.current.value,
            eventName: eventName.current.value,
            eventDate: startDate,
            eventInfo: eventDescription.current.value,
            eventPic: eventInfo.picture
        }

        fetch('https://immense-sea-30158.herokuapp.com/addVolunteer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(volunteerDetails)
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                history.push("/userDetail");
            }
        })
        
        e.preventDefault();
    }

    return (
        <Form
            onSubmit={handleSubmit}
            className="registration-container d-flex flex-column justify-content-between"
        >
            <h4 style={{ fontWeight: '700', marginRight: 'auto' }}>Register as a Volunteer</h4>
            <Form.Control
                className="form-control reg-input" ref={name} type="text" name="username"
                value={userName} placeholder="Full Name" required />
            <Form.Control
                className="form-control reg-input" ref={email} type="email" name="email"
                value={userEmail} placeholder="Username or Email" required />
            <DatePicker
                className="form-control reg-input" ref={eventDate} selected={startDate}
                onChange={date => setStartDate(date)} placeholderText="Date" required />
            <Form.Control
                className="form-control reg-input" ref={eventDescription} type="text"
                name="description" placeholder="Description" required />
            <Form.Control
                className="form-control reg-input" ref={eventName} type="text" name="eventName"
                value={eventInfo.name} placeholder="Event Name" required />
            <Button type="submit" className="primary">Registration</Button>
        </Form>
    );
};

export default Registration;