import React from 'react';

const YouTubeEmbed = ({ embedCode }) => {
  return (
    <div className="video-container mt-8">
      <div className="video-wrapper" dangerouslySetInnerHTML={{ __html: embedCode }}></div>

      <style jsx>{`
        .video-container {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio (height/width) */
          overflow: hidden;
          max-width: 100%;
        }

        .video-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .video-wrapper iframe {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default YouTubeEmbed;
