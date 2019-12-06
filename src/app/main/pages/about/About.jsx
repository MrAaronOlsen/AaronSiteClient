import React, { Component } from 'react'

import Blocks from 'blocks/Blocks.jsx'
import ArrowBtn from 'modules/buttons/ArrowBtn.jsx'

import styles from './about.mod.scss'

export default class About extends Component {
  state = {
    triggerOut: false
  }

  onClick() {
    this.props.history.push('/pages')
  }

  triggerOut() {
    this.setState({
      triggerOut: true
    })
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <ArrowBtn classNames={styles.button} onClick={this.triggerOut.bind(this)} />
        <Blocks triggerOut={this.state.triggerOut} actionOut={this.onClick.bind(this)} query="pages?slug=about"/>
      </div>
    )
  }
}