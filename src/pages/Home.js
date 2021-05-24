import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router';
import { MessageContext } from '../contexts/MessageContext';

const Home = () =>
{
    // contexts
    const { displayMessage, clearMessage } = useContext(MessageContext);

    // states
    const [shouldRedirect, setShouldRedirect] = useState('');

    // on component load
    useEffect(clearMessage, []);

    return (
        <div className="homePage">
            {shouldRedirect !== '' ? <Redirect to={shouldRedirect}/> : null}
            <div className="welcomeSign">
                <h1 style={{ fontSize: "48px", fontWeight: "bolder" }}>Anduin</h1>
                <h3 className="about">Your last stop shop for all of your buying and selling needs. From anywhere in the world, to anywhere in the world, at any time.</h3>
                <input type="submit" value="Get Started!" onClick={() => {setShouldRedirect('/signup')}} />
            </div>
        </div>
    )
}

export default Home;