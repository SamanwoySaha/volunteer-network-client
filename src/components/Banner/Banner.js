import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './Banner.css';

const Banner = ({handleSearch}) => {
    const searchInput = useRef();
    const handleFormSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="banner">
            <Container className="banner-content">
                <h1 className="banner-title">I grow by helping people in need.</h1>
                <Form onSubmit={handleFormSubmit} inline className="search-field mt-4 d-flex justify-content-center">
                        <Form.Control
                            ref={searchInput}
                            className="search-input"
                            placeholder="Search..."
                        />
                    <Button onClick={() => handleSearch(searchInput.current.value)} className="search-btn" type="submit">Search</Button>
                </Form>
            </Container>
        </div>
    );
};

export default Banner;