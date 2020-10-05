import React, { createContext, useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import UserDetail from './components/UserDetail/UserDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NoMatch from './components/NoMatch/NoMatch';
import FormContainer from './components/FormContainer/FormContainer';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/login">
            <FormContainer>
              <Login></Login>
            </FormContainer>
          </Route>
          <PrivateRoute path="/registration/:id">
            <FormContainer>
              <Registration></Registration>
            </FormContainer>
          </PrivateRoute>
          <PrivateRoute path="/userDetail">
            <UserDetail></UserDetail>
          </PrivateRoute>
          <Route path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route path="*">
            <NoMatch></NoMatch>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
