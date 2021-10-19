import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App'

import Footer from '../Footer/Footer';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({

        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    })
    const handelSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    photo: '',
                    email: '',
                    error: '',
                    success: false
                }
                setUser(signedOutUser);
            })
            .catch(err => {

            })
    }
    const handelBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            // console.log(isFormValid);
        }
        if (e.target.name === 'password') {

            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handelSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                })
                .catch((error) => {

                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    console.log(res.user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault()
    }
    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('user name update')
        }).catch(function (error) {
            console.log(error)
        });
    }


    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [signInUser, setSignInUser] = useContext(UserContext);
    var provider = new firebase.auth.GoogleAuthProvider();
    var ghProvider = new firebase.auth.GithubAuthProvider();

    const handleGoogle = () => {

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var { displayName, email } = result.user;
                const signedWithGoogle = { displayName, email }
                setSignInUser(signedWithGoogle);
                history.replace(from);

            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }
    // signInUser.email(() => {
    //   history.replace(from);
    // });

    const handleGitHub = () => {
        firebase
            .auth()
            .signInWithPopup(ghProvider)
            .then((result) => {
                var { displayName, email } = result.user;
                const signedWithGitHub = { displayName, email };
                setSignInUser(signedWithGitHub);
                history.replace(from);

            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);

            });
    }
    // signInUser.email(() => {
    //   history.replace(from);
    // });

    return (
        <div >
            <div className="register-form">
                <h4>Create an account</h4>
                <form onSubmit={handelSubmit}>
                    <p>{newUser && <input onBlur={handelBlur} type="text" name="name" placeholder="Name" required></input>}</p>
                    <p><input onBlur={handelBlur} type="text" name="email" placeholder="User Name or E-mail" required /></p>
                    <p><input onBlur={handelBlur} type="password" name="password" id="" placeholder="your password" required /></p>
                    <p><input type="password" placeholder="Confirm password" /></p>
                    {/* <p><input className="d-grid col-8 mx-auto btn btn-primary" type="submit" value="Create an account"/></p> */}
                    <p><input className="d-grid col-8 mx-auto btn btn-primary" type="submit" value={newUser ? 'Sign Up' : 'Sign In'} /></p>
                </form>
                <p style={{ color: 'red' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged in'} successfully</p>}
                <p>Already have an account? <Link to="/signin">Login</Link></p>
            </div>
            <div className="register-google">
                <p>----------or----------</p>
                <button className="google-btn" onClick={handleGoogle}>Continue with google</button><br />
                <button className="google-btn mt-2" onClick={handleGitHub}>Continue with GitHub</button>
                <p>{signInUser.displayName}</p>
                <p>{signInUser.email}</p>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Login;