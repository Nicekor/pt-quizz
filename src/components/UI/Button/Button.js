import React from 'react';

import classes from './button.module.css';

const Button = ({ className, ...props }) => {
  return <button className={[className, classes.btn].join(' ')} {...props} />;
};

export default Button;
