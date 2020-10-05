import React from 'react';
import { useHistory } from 'react-router-dom';
import './Event.css';

const Event = ({ event }) => {
    const history = useHistory();
    const {name, picture, _id} = event;
    const titleBgColors = ['#FFBD3E', '#FF7044', '#3F90FC', '#421FCF'];

    const shuffle = a => {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    };
    shuffle(titleBgColors);

    const handleClick = () => {
        history.push(`/registration/${_id}`);
    }

    return (
        <div className="event my-3" onClick={handleClick}>
            <img className="event-pic w-100" src={picture} alt="event-pic"/>
            <h5 className="event-title">{name}</h5>
            <div className="event-title-bg" style={{backgroundColor: `${titleBgColors[1]}`}}></div>
        </div>
    );
};

export default Event;