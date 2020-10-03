import React from 'react';
import EventManager from '../EventManager/EventManager';
import RegisterList from '../RegisterList/RegisterList';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div>
            <RegisterList></RegisterList>
            <EventManager></EventManager>
        </div>
    );
};

export default Dashboard;