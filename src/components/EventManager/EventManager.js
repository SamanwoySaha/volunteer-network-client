import React, { useRef, useState } from 'react';
import './EventManager.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';

const EventManager = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [showMessage, setShowMessage] = useState(false);
    const toggleMessage = () => setShowMessage(!showMessage);
    const [spinnerState, setSpinnerState] = useState(false);
    const eventTitle = useRef();
    const description = useRef();

    const handleSubmit = (e) => {
        setSpinnerState(!spinnerState);
        const clientId = `${process.env.REACT_APP_IMGUR_API_ID}`;
        let data = new FormData();
        data.append('image', document.getElementById('eventBanner').files[0]);

        fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            body: data,
            headers: { 'Authorization': `Client-ID ${clientId}` }
        })
        .then(res => res.json())
        .then(data => {
            addEvent(data.data.link);
        })
        .catch(err => console.log(err))

        e.preventDefault();
    }

    const addEvent = (eventPictureLink) => {
        const eventDetails = {
            name: eventTitle.current.value,
            description: description.current.value,
            date: startDate,
            picture: eventPictureLink
        }

        fetch('https://immense-sea-30158.herokuapp.com/addEvent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setSpinnerState(!spinnerState);
                    toggleMessage();
                }
            })
    }

    return (
        <Form onSubmit={handleSubmit} className="eventManager d-flex justify-content-between">
            <div className="d-flex flex-column">
                <label>Event Title</label>
                <Form.Control className="form-control event-form-input" type="text"
                    name="eventTitle" placeholder="Enter Title" ref={eventTitle} required>
                </Form.Control>
                <label>Description</label>
                <textarea name="description" id="description"
                    className="form-control event-form-input"
                    style={{ resize: 'none' }} ref={description}
                    placeholder="Enter Description" required>
                </textarea>
            </div>
            <div className="d-flex flex-column">
                <label>Date</label>
                <DatePicker className="form-control event-form-input" name="date" selected={startDate}
                    onChange={date => setStartDate(date)} placeholderText="Date" required />
                <label>Banner</label>
                <label className="file-input-btn" htmlFor="eventBanner">
                    <img className="mr-1" style={{ width: '17%' }} src="https://i.imgur.com/0EKqSum.png" alt="" />
                    Upload Image
                </label>
                <Form.Control className="file-input" type="file"
                    name="eventBanner" id="eventBanner" title="Upload Image" required>
                </Form.Control>
                <Toast id="message" show={showMessage} onClose={toggleMessage}>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded mr-2"
                            alt=""
                        />
                        <strong className="mr-auto">Event Manager</strong>
                        <small>1 mins ago</small>
                    </Toast.Header>
                    <Toast.Body><strong>New Event</strong> is added on the <strong>Homepage</strong></Toast.Body>
                </Toast>
                <Button className="align-self-end mt-auto" type="submit"
                    variant="primary" style={{ width: '130px' }}>
                    {
                        spinnerState && 
                        <Spinner className="mr-2" size="sm" animation="border" variant="warning" />
                    }                    
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default EventManager;