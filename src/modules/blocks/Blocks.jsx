import React, { Component } from 'react'

import BlockIterator from './BlockIterator.jsx'

import styles from './blocks.mod.scss'

export default class Blocks extends Component {

  render() {
    return(
        <div name="blocks" className={styles.wrapper}>
          <BlockIterator
            triggerOut={this.props.triggerOut}
            triggerAction={this.props.actionOut}
            start={'start'}
            blocks={this.props.blocks || {}} />
        </div>
    )
  }
}