import React, { Component } from 'react'
import Interweave from 'interweave'

import styles from './blockRich.mod.scss'

export default function BlockRich(props) {
  const block = props.block;

  function getBlock() {
    return (
      <div onClick={props.onClick} className={styles.wrapper}>
        <Interweave name={"block-rich"} content={block.content} />
      </div>
    )
  }

  return (getBlock())
}