import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import classes from './selectDropdown.module.css';

const SelectDropdown = (props) => {
  return (
    <label className={classes.wrapper}>
      {props.labelName}
      <select
        value={props.value}
        onChange={props.changed}
        className={classes.select}
      >
        {props.children}
      </select>
      <FontAwesomeIcon icon={faArrowDown} className={classes.selectIcon} />
    </label>
  );
};

export default SelectDropdown;
