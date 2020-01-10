import React, { Component } from 'react'

import styles from './blockText.mod.scss'

export default function BlockText(props) {
  const block = props.block;

  function getBlock() {
    return (
      <div name={"block-text"} className={styles.wrapper} onClick={props.onClick}>
        { block.content }
      </div>
    )
  }

  return ( getBlock() )
}