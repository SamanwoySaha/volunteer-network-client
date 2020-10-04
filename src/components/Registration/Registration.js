import React, { useContext, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../../App';
import './Registration.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';

const Registration = () => {
    const [{loggedInUser, setLoggedInUser }, { userEvent, setUserEvent }] = useContext(UserContext);
    const {userName, userEmail} = loggedInUser;
    const [startDate, setStartDate] = useState(null);
    const name = useRef();
    const email = useRef();
    const eventDate = useRef();
    const eventName = useRef();
    const eventDescription = useRef();
    const history = useHistory();

    const handleSubmit = (e) => {
        const volunteerDetails = {
            name: name.current.value,
            email: email.current.value,
            eventName: eventName.current.value,
            eventDate: startDate,
            eventInfo: eventDescription.current.value,
            eventPic: userEvent.picture
        }
        fetch('http://localhost:5000/addVolunteer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(volunteerDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
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
                value={userName} placeholder="Full Name" required/>
            <Form.Control 
                className="form-control reg-input" ref={email} type="email" name="email" 
                value={userEmail} placeholder="Username or Email" required/>
            <DatePicker 
                className="form-control reg-input" ref={eventDate} selected={startDate} 
                onChange={date => setStartDate(date)} placeholderText="Date" required/>
            <Form.Control 
                className="form-control reg-input" ref={eventDescription} type="text" 
                name="description" placeholder="Description" required/>
            <Form.Control 
                className="form-control reg-input" ref={eventName} type="text" name="eventName" 
                value={userEvent.name} placeholder="Event Name" required/>
            <Button type="submit" className="primary">Registration</Button>
        </Form>
    );
};

export default Registration;