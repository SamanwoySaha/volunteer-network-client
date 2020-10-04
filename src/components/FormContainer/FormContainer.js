import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link, useRouteMatch } from 'react-router-dom';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import './FormContainer.css';

const FormContainer = () => {
    const {path} = useRouteMatch();

    return (
        <Container fluid className="px-0 form-container d-flex flex-column align-items-center">
            <Link to="/">
                <img style={{ width: '200px' }} src="https://i.imgur.com/fZBQnjh.png" alt="logo" />
            </Link>
            { path === '/login' && <Login></Login> }
            { path === '/registration' && <Registration></Registration> }
        </Container>
    );
};

export default FormContainer;