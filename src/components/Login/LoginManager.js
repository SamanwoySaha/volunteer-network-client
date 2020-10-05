import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(res => {
            const userInfo = {
                userName: res.user.displayName,
                userEmail: res.user.email,
            };
            return userInfo;
        })
        .catch(err => {
            const userInfo = {
                userName: '',
                userEmail: '',
            };
            return userInfo;
        });
}

export const signOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const userInfo = {
                userName: '',
                userEmail: '',
            };
            return userInfo;
        }).catch(err => console.log(err));
}