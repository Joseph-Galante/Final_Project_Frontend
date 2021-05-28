// imports
import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import env from 'react-dotenv';

// contexts
import { UserContext } from '../contexts/UserContext';
import { MessageContext } from '../contexts/MessageContext';

const Signup = () =>
{
    // contexts
    const { userState } = useContext(UserContext);
    const [user, setUser] = userState;
    const { displayMessage, clearMessage } = useContext(MessageContext);

    // states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [redirect, setRedirect] = useState('');

    // on component load
    useEffect(clearMessage, []);

    // functions
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        // check for mismatched passwords
        if (password !== passwordConfirm)
        {
            // console.log('passwords do not match');
            displayMessage(false, 'Passwords must match to be able to sign up.');
            return;
        }
        axios.post(`${env.BACKEND_URL}/users`, {
            name: name,
            email: email,
            password: password
        }).then((res) =>
        {
            // console.log(res);
            setUser(res.data.user);
            localStorage.setItem('userId', res.data.user.id);
        }).catch((error) =>
        {
            console.log(error.message);
            if (error.message === 'Request failed with status code 409')
            {
                displayMessage(false, 'Email already taken. Enter a different one or login with your password.')
            }
        })
    }

    // on component load
    useEffect(clearMessage, []);

    return (
        <div className="signup-page">
            {redirect ? <Redirect to={redirect} /> : null}
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="signup-form">
                    <div className="signup-labels">
                        <label htmlFor="name">Name</label>
                        <label htmlFor="email">Email</label>
                        <label htmlFor="password">Password</label>
                        <label htmlFor="passwordConfirm">Confirm Password</label>
                    </div>
                    <div className="signup-inputs">
                        <input id="name" type="text" value={name} placeholder="Name" onChange={(e) => {setName(e.target.value)}}/>
                        <input id="email" type="text" value={email} placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                        <input id="password" type="password" value={password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                        <input id="passwordConfirm" type="password" value={passwordConfirm} placeholder="Confirm Password" onChange={(e) => {setPasswordConfirm(e.target.value)}}/>
                    </div>
                </div>
                <input type="submit" value="Signup" onClick={handleSubmit}/>
            </form>
            <div id="to-login" onClick={() => {setRedirect('/login')}}>Already Have an Account? Login</div>
        </div>
    )
}

export default Signup;