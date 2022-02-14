import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Comments from './components/Comments';
import { UserContext } from './components/UserContext';
import { useState } from 'react';

function App() {
  const [user,setUser]=useState({
    id:"",
    email:""
  })
  return (
    <Router>
      <UserContext.Provider
        value={{
          email:user.email,
          id:user.id,
          setUser:setUser
        }}
      >
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/comments" component={Comments} />
          <Route path="/" render={()=><Login setUser={setUser}/>} exact />
          <Redirect to='/' />
        </Switch>
      </UserContext.Provider>
    </Router>
    // <div>
    //   <Login/>
    // </div>
  );
}

export default App;
