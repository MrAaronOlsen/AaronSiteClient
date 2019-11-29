import React, { Component } from 'react'

import BlockText from './blockText/BlockText.jsx'
import styles from './blockForm.mod.scss'

export default class BlockForm extends Component {

  block() {
    return this.props.block || {}
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <BlockText name={'type'} text={this.block().type} onChange={this.props.onChange} />
        <BlockText name={'content'} text={this.block().content} onChange={this.props.onChange} />
        <BlockText name={'next'} text={this.block().next} onChange={this.props.onChange} />
        <BlockText name={'transition'} text={this.block().transition} onChange={this.props.onChange} />
      </div>
    )
  }
}