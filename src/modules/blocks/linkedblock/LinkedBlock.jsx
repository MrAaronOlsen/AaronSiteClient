import React, { Component } from 'react'

import styles from './LinkedBlock.mod.scss'

export default function linkedBlock(Block) {

  class Wrapper extends Component {

    render() {
      const block = this.props.block;

      return (
        <a href={block.link} className={styles.wrapper} target='_blank'>
           <Block {...this.props} />
        </a>
      )
    }
  }

  return Wrapper;
}