import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import EventManager from '../EventManager/EventManager';
import RegisterList from '../RegisterList/RegisterList';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Switch } from 'react-router-dom';

const Dashboard = () => {
    const { path, url } = useRouteMatch();
    const [activeState, setActiveState] = useState(sessionStorage.getItem('dashboardState') || 'registerList');

    const handleStateChange = (stateName) => {
        setActiveState(stateName);
        sessionStorage.setItem('dashboardState', stateName);
    }

    return (
        <Container fluid className="dashboard p-0 m-0 d-flex">
            <div className="dashboard-sidebar d-flex flex-column">
                <Link to="/">
                    <img className="mb-5" style={{ width: '200px' }} src="https://i.imgur.com/fZBQnjh.png" alt="logo" />
                </Link>
                <Link onClick={() => handleStateChange('registerList')}
                    className={`sidebar-link ${activeState === 'registerList' ? '' : 'text-black-50'}`}
                    to={`${url}/registerList`}>
                    <FontAwesomeIcon className="mr-3" icon={faUserFriends} />
                        Volunteer register list
                </Link>
                <Link onClick={() => handleStateChange('eventManager')}
                    className={`sidebar-link ${activeState === 'eventManager' ? '' : 'text-black-50'}`}
                    to={`${url}/eventManager`}>
                    <FontAwesomeIcon className="mr-3 ml-1" icon={faPlus} />
                        Add Event
                </Link>
            </div>
            <div className="dashboard-container">
                <h5 className="dashboard-title">
                    {path === `${path}/registerList` ? 'Volunteer Register List' : 'Add Event'}
                </h5>
                <div className="dashboard-content">
                    <Switch>
                        <Route path={`${path}/registerList`}>
                            <RegisterList></RegisterList>
                        </Route>
                        <Route path={`${path}/eventManager`}>
                            <EventManager></EventManager>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Container>
    );
}
export default Dashboard;