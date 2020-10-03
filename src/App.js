import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import UserDetail from './components/UserDetail/UserDetail';

function App() {
  return (
    <div className="app">
      <Home></Home>
      <Login></Login>
      <Registration></Registration>
      <UserDetail></UserDetail>
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
