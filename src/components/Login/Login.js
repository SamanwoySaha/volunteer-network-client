import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import './Login.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);


const Login = () => {
    const [{ loggedInUser, setLoggedInUser }, { userEvent, setUserEvent }] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const userInfo = {
                    userName: res.user.displayName,
                    userEmail: res.user.email,
                };
                setLoggedInUser(userInfo);
                history.replace(from);
            })
            .catch(err => console.log(err.message));
    }

    return (
        <div className="login-form d-flex flex-column justify-content-center align-items-center">
            <h4 style={{ fontWeight: '700' }}>Login With</h4>
            <Button onClick={handleGoogleSignIn} className="primary login-btn">
                <img className="google-img" src="https://img.icons8.com/color/48/000000/google-logo.png" alt="" />
                    Continue with Google
                </Button>
            <p>
                <span className="mr-1">Don't have an account?</span>
                <span style={{ color: 'blue', cursor: 'pointer' }}>Create an account</span>
            </p>
        </div>
    );
};

export default Login;