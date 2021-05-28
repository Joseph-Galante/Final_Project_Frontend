// imports
import axios from 'axios';
import env from 'react-dotenv';
import { Redirect } from 'react-router-dom';

// contexts
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { MessageContext } from '../contexts/MessageContext';

const Login = () =>
{
    // contexts
    const { userState } = useContext(UserContext);
    const { displayMessage, clearMessage } = useContext(MessageContext);
    
    // states
    const [user, setUser] = userState;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState('');

    // on component load
    useEffect(clearMessage, []);

    // functions
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        axios.post(`${env.BACKEND_URL}/users/login`, {
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
            // check for unauthorized message - wrong login info
            if (error.message === 'Request failed with status code 401')
            {
                displayMessage(false, 'Email or password is incorrect.');
            }
        })
    }

    // on component load
    useEffect(clearMessage, []);

    return (
        <div className="login-page">
            {redirect ? <Redirect to={redirect} /> : null}
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="login-form">
                    <div className="login-labels">
                        <label htmlFor="email">Email</label>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="login-inputs">
                        <input id="email" type="text" value={email} placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                        <input id="password" type="password" value={password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                </div>
                <input type="submit" value="Login" onClick={handleSubmit}/>
            </form>
            <div id="to-signup" onClick={() => {setRedirect('/signup')}}>Don't Have an Account? Signup</div>
        </div>
    )
}

export default Login;