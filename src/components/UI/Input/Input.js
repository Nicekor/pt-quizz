import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './input.module.css';

const Input = ({ id, labelName, Component = 'input', icon, ...props }) => {
  return (
    <div className={classes.wrapper}>
      <label htmlFor={id}>{labelName}</label>
      <div className={classes.inputContainer}>
        <Component id={id} {...props} className={classes.input} />
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
