import React, { Component } from 'react'

import BlockText from './blockText/BlockText.jsx'
import BlockRich from './blockRich/BlockRich.jsx'
import BlockTransition from './blockTransition/BlockTransition.jsx'

import styles from './blockForm.mod.scss'

export default class BlockForm extends Component {

  block() {
    return this.props.block || {}
  }

  getContentField() {
    if (this.block().type == 'text') {
      return <BlockText name='content'
        text={this.block().content}
        onChange={this.props.onChange} />
    } else if (this.block().type == 'rich') {
      return <BlockRich
        blockKey={this.props.blockKey}
        name={'content'}
        text={this.block().content}
        onChange={this.props.onChange} />
    } else {
      return null;
    }
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <BlockText name={'type'} text={this.block().type} onChange={this.props.onChange} />
        {this.getContentField()}
        <BlockText name={'next'} text={this.block().next} onChange={this.props.onChange} />
        <BlockTransition
          blockKey={this.props.blockKey}
          transition={this.block().transition}
          onChange={this.props.onChange} />
      </div>
    )
  }
}