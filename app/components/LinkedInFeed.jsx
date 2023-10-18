import React, { useEffect } from 'react';

const LinkedInFeed = () => {
  useEffect(() => {
    // Create a new script element

    const scriptId = 'linkedin-widget-script';

    if (document.getElementById(scriptId)) {
      // If script is already present in the document, don't add again
      return;
    }
    const script = document.createElement('script');
    script.src =
      'https://widgets.sociablekit.com/linkedin-profile-posts/widget.js';
    script.async = true;
    script.defer = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Optional: Remove the script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []); // The empty array means this useEffect will run once when the component mounts

  return (
    <section>
      <div className='sk-ww-linkedin-profile-post' data-embed-id='211410'></div>
    </section>
  );
};

export default LinkedInFeed;
