import React, { Component } from 'react'

import styles from './element.mod.scss'

export default class Element extends Component {

  onClick() {
    this.props.onClick(this.props.name)
  }

  render() {
    return(
      <div className={styles.wrapper} onClick={this.onClick.bind(this)}>{this.props.name}</div>
    )
  }
}