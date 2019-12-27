import React, { Component } from 'react'
import Interweave from 'interweave'

import styles from './blockRich.mod.scss'

export default function BlockRich(props) {
  const block = props.block;

  function getBlock() {
    return <Interweave name={"block-rich"} className={styles.wrapper} content={block.content} />
  }

  return (getBlock())
}