import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Header from '../Header/Header';
import './UserDetail.css';
import { UserContext } from '../../App';
import moment from 'moment';

const UserDetail = () => {
    const [volunteerDetail, setVolunteerDetail] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [currentState, setCurrentState] = useState(false);

    useEffect(() => {
        fetch('https://immense-sea-30158.herokuapp.com/volunteerDetail?email=' + loggedInUser.userEmail)
            .then(res => res.json())
            .then(data => setVolunteerDetail(data))
            .catch(err => console.log(err))
    }, [currentState]);

    const handleCancelRegistration = event => {
        fetch('https://immense-sea-30158.herokuapp.com/removeEvent', {
            method: 'DELETE',
            body: JSON.stringify({ id: event._id }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                setCurrentState(!currentState);
            }
        })
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
                                <Col key={singleEvent._id} md={6} className="d-flex singleEvent bg-white">
                                    <img style={{ width: '194px', height: '173px' }} src={singleEvent.eventPic} alt="" />
                                    <div className="ml-3">
                                        <h5 className="event-name">{singleEvent.eventName}</h5>
                                        <p className="event-date">
                                            {moment(singleEvent.eventDate).format('DD MMM, YYYY')}
                                        </p>
                                        <Button onClick={() => handleCancelRegistration(singleEvent)} 
                                            className="cancel-btn">
                                            Cancel
                                        </Button>
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