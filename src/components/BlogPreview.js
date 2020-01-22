import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

class BlogPreview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            date: '',
            preview: '',
            url: ''
        };
    }

    render() {
        const { title, date, preview, url } = this.props;
        return (
            <div>
                <h2>{title}</h2>
                <p><em>{date}</em></p>
                <p>{preview}</p>
                <Link to={url} activeClassName="button primary"  className="button primary icon solid fa-chevron-right">Read More</Link>
            <hr />
        </div>
        )
    }
}

BlogPreview.propTypes = {
    title: PropTypes.node.isRequired,
    date: PropTypes.node.isRequired,
    preview: PropTypes.node.isRequired,
    url: PropTypes.node.isRequired
};

export default BlogPreview;