import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './input.mod.scss'

export default function Input(props) {

  function onChange(element) {
    var content = element.currentTarget.value;

    if (props.name) {
      props.onChange(content, props.name)
    } else {
      props.onChange(content)
    }
  }

  function onClick(event) {
    if (event && event.target) {
      props.onChange(event.target.checked, props.name)
    }
  }

  function prepare(Comp) {
    if (props.type === 'checkbox') {
      return <Comp.type {...Comp.props} defaultChecked={props.checked} onClick={onClick} />
    } else {
      return <Comp.type {...Comp.props} defaultValue={props.text} onChange={onChange} />
    }
  }

  return(
    <div className={props.classNames}>
      { props.children }

      {
        prepare(
          <input className={styles.textAreaWrapper}
            name={props.name}
            type={props.type}/>
        )
      }
    </div>
  )
}

Input.defaultProps = {
  type: 'text'
}