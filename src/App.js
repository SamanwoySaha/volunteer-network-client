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

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [userEvent, setUserEvent] = useState({});

  return (
    <UserContext.Provider value={[{ loggedInUser, setLoggedInUser }, { userEvent, setUserEvent }]} className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/login">
            <FormContainer></FormContainer>
          </Route>
          <PrivateRoute path="/registration">
            <FormContainer></FormContainer>
          </PrivateRoute>
          <Route path="/userDetail">
            <UserDetail></UserDetail>
          </Route>
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
