import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './Banner.css';

const Banner = () => {
    return (
        <div className="banner">
            <Container className="banner-content">
                <h1 className="banner-title">I grow by helping people in need.</h1>
                <Form inline className="search-field mt-4 d-flex justify-content-center">
                        <Form.Control
                            className="search-input"
                            placeholder="Search..."
                        />
                    <Button className="search-btn" type="submit">Search</Button>
                </Form>
            </Container>
        </div>
    );
};

export default Banner;