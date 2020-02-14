import React, { Component } from 'react'

import styles from './line.mod.scss'

export default function Element(props) {

  function onClick() {
    props.onClick(props.name)
  }

  function getClasses() {
    var classes = [styles.line];

    if (props.selected) {
      classes.push(styles.selected)

      if (props.classNames && props.classNames.selected) {
        classes.push(props.classNames.line)
      }
    }

    if (props.classNames && props.classNames.line) {
      classes.push(props.classNames.line)
    }

    return classes.join(" ");
  }


  return( <div className={getClasses()} onClick={onClick.bind(this)}>{props.name}</div> )
}