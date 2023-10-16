'use client';
import React, { useState, useEffect } from 'react';
import GithubIcon from 'public/github-icon.svg';
import LinkedInIcon from 'public/linkedin-icon.svg';
import Link from 'next/link';
import Image from 'next/image';

const EmailSection = () => {
  const [sending, setSending] = useState(false);
  const [spamDelay, setSpamDelay] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    let timeout;

    if (spamDelay > 0) {
      timeout = setTimeout(() => {
        setSpamDelay((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setShowWarning(false);
    }

    return () => clearTimeout(timeout);
  }, [spamDelay]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/send';

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const resData = await response.json();

    if (response.status === 200) {
      console.log('Message sent.');
      setSpamDelay(60);
      setSending(false);
    }
  };

  return (
    <section
      className='grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative'
      id='contact'
    >
      <div className='bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2'></div>
      <div className='z-10'>
        <h2 className='text-4xl font-bold text-white my-2'>
          Let&apos;s Connect
        </h2>
        <p className='text-[#ADB7BE] mb-4 max-w-md'>
          {' '}
          I&apos;m currently looking for new internship opportunities, my inbox
          is always open. Whether you have a question or just want to say hi,
          I&apos;ll get back to you!
        </p>
        <div className='socials flex flex-row gap-2'>
          <Link href='https://github.com/jcamp50'>
            <Image src={GithubIcon} alt='github icon' />
          </Link>
          <Link href='https://www.linkedin.com/in/campbell-jordan/'>
            <Image src={LinkedInIcon} alt='linkedin icon' />
          </Link>
        </div>
      </div>
      <div>
        <form
          className='flex flex-col '
          onSubmit={(e) => {
            if (spamDelay > 0) {
              e.preventDefault();
              setShowWarning(true);
            } else {
              handleSubmit(e);
            }
          }}
        >
          <div className='mb-6'>
            <label
              htmlFor='name'
              type='text'
              className='text-white block  text-sm mb-2 font-medium'
            >
              Your Name
            </label>
            <input
              name='name'
              type='text'
              id='name'
              required
              className='bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
              placeholder='John Smith'
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='text-white block text-sm mb-2 font-medium'
            >
              Your Email
            </label>
            <input
              name='email'
              type='email'
              id='email'
              required
              className='bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
              placeholder='john@email.com'
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='message'
              className='text-white block text-sm mb-2 font-medium'
            >
              Your Message
            </label>
            <textarea
              name='message'
              id='message'
              className='bg-[#18191E] z-10 border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
              placeholder="Let's talk about..."
            />
          </div>
          <button
            type='submit'
            className='bg-teal-500 shadow-md shadow-teal-700 hover:bg-teal-600 text-white font-medium py-2.5 px-5 rounded-lg w-full z-10'
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
          <p
            className={`text-red-500 text-semibold text-sm mt-2 ${
              showWarning
                ? 'opacity-100 transition-opacity duration-1000'
                : 'opacity-0 transition-opacity duration-1000'
            }`}
          >
            Please wait {spamDelay} seconds before sending another message.
          </p>
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
