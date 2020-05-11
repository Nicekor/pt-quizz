import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import classes from './snackbar.module.css';

const Snackbar = ({ message }) => {
  const [hidden, setHidden] = useState(false);

  return (
    <div className={[classes.snackbar, hidden ? classes.hide : null].join(' ')}>
      <p>{message}</p>
      <FontAwesomeIcon
        icon={faTimes}
        className={classes.closeIcon}
        cursor="pointer"
        size={'lg'}
        onClick={() => setHidden(true)}
        color="#15202B"
      />
    </div>
  );
};

export default Snackbar;
