import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './Header.css';
import { Link, useRouteMatch } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const {path} = useRouteMatch();
    const [{ loggedInUser, setLoggedInUser}] = useContext(UserContext);

    return (
        <Navbar bg="none" variant="light" className="header" fixed="top">
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                        <img style={{ width: '200px' }} src="https://i.imgur.com/fZBQnjh.png" alt="logo" />
                    </Link>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Link className="mx-3 nav-link" to="/">Home</Link>
                    <Link className="mx-3 nav-link" to="#">Donation</Link>
                    <Link className="mx-3 nav-link" to="/userDetail">Events</Link>
                    <Link className="mx-3 nav-link" to="#">Blog</Link>
                    {
                        path === '/userDetail'
                            ? <Nav.Link className="ml-3 nav-link">{loggedInUser.userName}</Nav.Link>
                            : <>
                                <Link className="ml-3" to="/registration">
                                    <Button className="px-4" variant="primary">Register</Button>
                                </Link>
                                <Link className="ml-3" to="/dashboard/registerList">
                                    <Button className="px-4 admin-btn" variant="secondary">Admin</Button>
                                </Link>
                            </>
                    }
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;