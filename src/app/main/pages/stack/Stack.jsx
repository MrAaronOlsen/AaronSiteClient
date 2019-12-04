import React, { Component } from 'react'

import Blocks from 'blocks/Blocks.jsx'
import ArrowBtn from 'modules/buttons/ArrowBtn.jsx'

import styles from './stack.mod.scss'

export default class Stack extends Component {

  onClick() {
    this.props.history.push('/pages')
  }
  
  render() {
    return(
      <div className={styles.wrapper}>
        <ArrowBtn classNames={styles.button} onClick={this.onClick.bind(this)} />
        <Blocks query="pages?slug=stack"/>
      </div>
    )
  }
}