import React from 'react';
import { Link } from 'gatsby';

const Event = ({
    date,
    event,
    title,
    location,
    url
}) => {
    const newDate = new Date(date).toLocaleString('en-us', { month: 'long', day: '2-digit', year: 'numeric'})
    return (
        <Link to={url}>
            <li className="icon solid fa-bullhorn">
                <h4>{event}</h4>
                <p>{title}</p>
                <p>{location}</p>
                <p>{newDate}</p>
            </li>
        </Link>
    )
}
export default Event;