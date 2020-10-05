import React, { useEffect, useState } from 'react';
import Event from '../Event/Event';
import Banner from '../Banner/Banner';
import Header from '../Header/Header';
import './Home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

const Home = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('https://immense-sea-30158.herokuapp.com/events')
            .then(res => res.json())
            .then(data => setEvents(data));
    }, []);

    const handleSearch = (searchInput) => {
        fetch('https://immense-sea-30158.herokuapp.com/specificEvents/?search=' + searchInput)
            .then(res => res.json())
            .then(data => setEvents(data))
    }

    return (
        <div>
            <Header></Header>
            <Banner handleSearch={handleSearch}></Banner>
            <Container className="px-0 event-container">
                <Row>
                    {
                        events.map(event =>
                            <Col key={event._id} md={3}>
                                <Event event={event}></Event>
                            </Col>
                        )
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Home;