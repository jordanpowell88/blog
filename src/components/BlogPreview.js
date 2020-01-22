import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const BlogPreview = ({
    title, date, preview, url
}) => (
    <div>
        <Link to={url}><h2>{title}</h2></Link>
        <p><em>{date}</em></p>
        <p>{preview}</p>
        <Link to={url} activeClassName="button primary"  className="button primary icon solid fa-chevron-right">Read More</Link>
        <hr />
    </div>
)

BlogPreview.propTypes = {
    title: PropTypes.node.isRequired,
    date: PropTypes.node.isRequired,
    preview: PropTypes.node.isRequired,
    url: PropTypes.node.isRequired
};

export default BlogPreview;