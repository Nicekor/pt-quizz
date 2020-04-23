import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './input.module.css';

const Input = ({ id, labelName, Component = 'input', icon, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={classes.wrapper}>
      <label htmlFor={id}>{labelName}</label>
      <div
        className={classes.inputContainer}
        style={isFocused ? { borderBottomColor: '#dcdcdc' } : null}
      >
        <Component
          id={id}
          {...props}
          className={classes.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {icon && (
          <div className={classes.iconContainer}>
            <FontAwesomeIcon icon={icon} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
