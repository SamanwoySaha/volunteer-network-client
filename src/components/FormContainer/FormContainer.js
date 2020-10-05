import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import './FormContainer.css';

const FormContainer = (props) => {
    return (
        <Container fluid className="px-0 form-container d-flex flex-column align-items-center">
            <Link to="/">
                <img style={{ width: '200px' }} src="https://i.imgur.com/fZBQnjh.png" alt="logo" />
            </Link>
           {props.children}            
        </Container>
    );
};

export default FormContainer;