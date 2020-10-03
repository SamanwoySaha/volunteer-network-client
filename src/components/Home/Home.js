import React from 'react';
import Activity from '../Activity/Activity';
import Banner from '../Banner/Banner';
import Header from '../Header/Header';
import './Home.css';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            <Activity></Activity>
        </div>
    );
};

export default Home;