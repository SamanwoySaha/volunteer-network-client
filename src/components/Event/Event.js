import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import './Event.css';

const Event = ({ event }) => {
    const history = useHistory();
    const {name, picture} = event;
    const [ , {userEvent, setUserEvent}] = useContext(UserContext);
    const titleBgColors = ['#FFBD3E', '#FF7044', '#3F90FC', '#421FCF'];

    const shuffle = a => {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    };
    shuffle(titleBgColors);

    const handleClick = () => {
        setUserEvent(event);
        history.push('/registration');
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