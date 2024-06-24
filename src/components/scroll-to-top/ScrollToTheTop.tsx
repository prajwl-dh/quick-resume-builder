'use client';
import React from 'react';

export default function ScrollToTheTop() {
  const [scrollButton, setScrollButton] = React.useState<Boolean>(false);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 50) {
        setScrollButton(true);
      } else {
        setScrollButton(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
  });

  return (
    <div
      onClick={() => handleClick()}
      className={`fixed z-40 cursor-pointer ${
        !scrollButton ? 'hidden' : null
      } right-2 md:right-5 bottom-2`}
    >
      <svg
        className={`text text-dark-text-primary bg-light-button-primary-background dark:text-light-text-primary dark:bg-dark-button-primary-background rounded-md hover:scale-105`}
        xmlns='http://www.w3.org/2000/svg'
        width='38'
        height='38'
        viewBox='0 0 24 24'
      >
        <path
          fill='currentColor'
          d='m12 10.8l-4.6 4.6L6 14l6-6l6 6l-1.4 1.4z'
        />
      </svg>
    </div>
  );
}
