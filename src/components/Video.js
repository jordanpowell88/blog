import React from 'react';

const Video = ({ videoSrcUrl, ...props }) => (
    <div className="video">
        <iframe
            src={videoSrcUrl}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowFullScreen
        />
    </div>
);

export default Video;