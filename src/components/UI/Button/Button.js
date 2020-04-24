import React from 'react';

import classes from './button.module.css';

const Button = ({ className, centered, ...props }) => {
  return (
    <button
      className={[
        className,
        classes.btn,
        centered ? classes.centered : '',
      ].join(' ')}
      {...props}
    />
  );
};

export default Button;
