import React, { Component } from 'react'

import styles from './line.mod.scss'

export default class Element extends Component {

  onClick() {
    this.props.onClick(this.props.name)
  }

  getClasses() {
    var classes = styles.wrapper;

    if (this.props.selected) {
      classes = classes + " " + styles.selected
    }

    return classes;
  }

  render() {
    return(
      <div className={this.getClasses()} onClick={this.onClick.bind(this)}>{this.props.name}</div>
    )
  }
}