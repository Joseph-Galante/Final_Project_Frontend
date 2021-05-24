import { useState, useEffect, useContext } from 'react';
import { MessageContext } from '../contexts/MessageContext';
import { UserContext } from '../contexts/UserContext';
import AccountInfo from '../components/AccountInfo';

const Profile = () =>
{
    // contexts
    const {userState, verifyUser } = useContext(UserContext);
    const [user, setUser] = userState;
    const { displayMessage, clearMessage } = useContext(MessageContext);

    // states
    const [display, setDisplay] = useState('account');
    
    // on component load
    useEffect(clearMessage, [display]);

    return (
        <div className="profilePage">
            <div key="profileMenu" className="profileMenu">
                <div key="account" className="menuItem">
                    <h4 onClick={() => {setDisplay('account')}}>Account</h4>
                </div>
            </div>
            {display === 'account' ? <AccountInfo /> : null}
        </div>
    )
}

export default Profile;