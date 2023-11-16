import React, { useEffect, useRef } from 'react';

const LinkedInFeed = () => {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      const script = document.createElement('script');
      script.src =
        'https://widgets.sociablekit.com/linkedin-profile-posts/widget.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      initializedRef.current = true;

      return () => {
        document.body.removeChild(script);
      };
    }
  });

  return (
    <div
      className='sk-ww-linkedin-profile-post flex flex-col items-center justify-center mb-4'
      data-embed-id='226999'
    ></div>
  );
};

export default LinkedInFeed;
