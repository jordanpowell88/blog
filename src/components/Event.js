import React from 'react';
import { Link } from 'gatsby';

const Event = ({
    date,
    event,
    title,
    location,
    url
}) => {
    return (
        <Link to={url}>
            <li className="icon solid fa-bullhorn">
                <h4>{event}</h4>
                <p>{title}</p>
                <p>{location}</p>
                <p>{date}</p>
            </li>
        </Link>
    )
}
export default Event;