import React, { Component } from 'react'

import BlockForm from './blockform/BlockForm.jsx'
import styles from './block.mod.scss'

export default class Block extends Component {

  onChange(line, name) {
    let block = this.props.block;
    block[name] = line;

    this.props.onChange(block, this.props.blockKey)
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <BlockForm block={this.props.block} blockKey={this.props.blockKey} onChange={this.onChange.bind(this)}/>
      </div>
    )
  }
}