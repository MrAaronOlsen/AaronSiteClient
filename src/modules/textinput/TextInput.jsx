import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './textInput.mod.scss'

export default function TextInput(props) {

  function onChange(element) {
    var content = element.currentTarget.value;

    if (props.name) {
      props.onChange(content, props.name)
    } else {
      props.onChange(content)
    }

  }

  return(
    <div className={props.classNames}>
      { props.children }

      <input className={styles.textAreaWrapper}
        checked={props.checked}
        onChange={onChange}
        name={props.name}
        type={props.type}
        defaultValue={props.text}/>
    </div>
  )
}

TextInput.defaultProps = {
  type: 'text'
}