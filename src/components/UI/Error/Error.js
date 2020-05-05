import React, { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import classes from './error.module.css';

const Error = ({ err }) => {
  useEffect(() => {
    console.error(err);
  }, [err]);

  return (
    <div className={classes.errorContainer}>
      <FontAwesomeIcon
        icon={faTimesCircle}
        color="salmon"
        size="4x"
        className={classes.icon}
      />
      <div className={classes.messageContainer}>
        <p>
          Something went wrong! Please try again later.
          <span role="img" aria-label="Sad Face Emoji" className={classes.emoji}>
            😞
          </span>
        </p>
        <p>Error message: {err?.message}</p>
      </div>
    </div>
  );
};

export default Error;
