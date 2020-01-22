import React from 'react';

function Video({videoSrcUrl}) {
    if (videoSrcUrl) {
        return (
            <div className="video">
                <iframe
                    title={videoSrcUrl}
                    src={videoSrcUrl}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    frameBorder="0"
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                    allowFullScreen
                />
            </div>
        )
    }

    return null;
}

export default Video;