import React, { Component } from 'react'

import styles from './line.mod.scss'

export default function Element(props) {

  function onClick() {
    props.onClick(props.name)
  }

  function getClasses() {
    var classes = [styles.wrapper];

    if (props.selected) {
      classes.push(styles.selected)
    }

    if (props.classNames) {
      classes.push(props.classNames)
    }

    return classes.join(" ");
  }


  return( <div className={getClasses()} onClick={onClick.bind(this)}>{props.name}</div> )
}