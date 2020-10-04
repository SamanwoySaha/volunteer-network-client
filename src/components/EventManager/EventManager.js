import React, { useRef, useState } from 'react';
import './EventManager.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EventManager = () => {
    const [startDate, setStartDate] = useState(new Date());
    const eventTitle = useRef();
    const description = useRef();

    const handleSubmit = (e) => {
        const clientId = 'edf209702cb7a9f';
        let data = new FormData();
        data.append('image', document.getElementById('eventBanner').files[0]);

        fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            body: data,
            headers: {'Authorization' : `Client-ID ${clientId}`}
        })
        .then(res => res.json())
        .then(data => addEvent(data.data.link))
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

        fetch('http://localhost:5000/addEvent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventDetails)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    //edf209702cb7a9f
    //f88f0ee42176b03
    //bbed270ac82eb7b

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
                    style={{resize: 'none'}} ref={description}
                    placeholder="Enter Description" required>
                </textarea>
            </div>
            <div className="d-flex flex-column">
                <label>Date</label>
                <DatePicker className="form-control event-form-input" name="date" selected={startDate} 
                    onChange={date => setStartDate(date)} placeholderText="Date" required/>
                <label>Banner</label>
                <Form.Control className="event-form-input file-input-btn" type="file" 
                    name="eventBanner" id="eventBanner" title="Upload Image" required>
                </Form.Control>             
                <Button className="align-self-end mt-auto" type="submit"
                    variant="primary" style={{width: '110px'}}>
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default EventManager;