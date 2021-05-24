// imports
import { useContext, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ProductDetails from './pages/ProductDetails'

// components
import NavBar from './components/NavBar';
import Messages from './components/Messages';

// contexts
import { UserContext } from './contexts/UserContext';
import { MessageContext } from './contexts/MessageContext';


function App() {
  // contexts
  const { userState, verifyUser } = useContext(UserContext);
  const [ user, setUser ] = userState;
  const { messageState, clearMessage } = useContext(MessageContext);
  const [ message, setMessage ] = messageState;

  // functions
  useEffect(verifyUser, []);
  useEffect(clearMessage, []);

  return (
    <div className="App">
      <NavBar />

      <Messages />

      <Route exact path="/" render={() => <Home />} />

      <Route exact path="/signup" render={() => {if (user.id) {return <Redirect to="/profile"/>} else {return <Signup />}}}/>

      <Route exact path="/login" render={() => {if (user.id) {return <Redirect to="/profile"/>} else {return <Login />}}}/>

      <Route exact path="/profile" render={() => {if (user.id) {return <Profile />} else {return <Redirect to="/login"/>}}}/>

      <Route exact path="/products/:id" render={(props) => {if (user.id) {return <ProductDetails productId={props.match.params.id} />} else {return <Redirect to="/login"/>}}}/>
    </div>
  );
}

export default App;
