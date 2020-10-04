import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Header from '../Header/Header';
import './UserDetail.css';
import { UserContext } from '../../App';

const UserDetail = () => {
    const [volunteerDetail, setVolunteerDetail] = useState([]);
    const [{ loggedInUser, setLoggedInUser }] = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:5000/volunteerDetail?email=' + loggedInUser.userEmail)
            .then(res => res.json())
            .then(data => setVolunteerDetail(data))
            .catch(err => console.log(err))
    }, []);

    const handleCancelRegistration = event => {
        fetch('http://localhost:5000/removeEvent', {
            method: 'DELETE',
            body: JSON.stringify({id: event._id}),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => setVolunteerDetail(data))
            .catch(err => console.log(err));
    }

    return (
        <div className="userDetail">
            <Container className="px-0">
                <Header></Header>
                <Row className="userEvent-container ">
                    {
                        volunteerDetail.map(singleEvent => {
                            return (
                                <Col Col md={6} className="d-flex singleEvent bg-white">
                                    <img style={{ width: '194px', height: '173px' }} src={singleEvent.eventPic} alt="" />
                                    <div className="ml-3">
                                        <h5>{singleEvent.eventName}</h5>
                                        <p>{(singleEvent.eventDate)}</p>
                                        <Button onClick={() => handleCancelRegistration(singleEvent)} className="cancel-btn">Cancel</Button>
                                    </div>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        </div >
    );
};

export default UserDetail;