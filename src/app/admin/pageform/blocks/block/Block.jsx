import React, { Component } from 'react'

import BlockForm from './blockform/BlockForm.jsx'
import styles from './block.mod.scss'

export default function Block(props) {

  function onChange(line, name) {
    let block = props.block;
    block[name] = line;

    props.onChange(block, props.blockKey)
  }

  return(
    <div className={styles.wrapper}>
      <BlockForm block={props.block} blockKey={props.blockKey} onChange={onChange}/>
    </div>
  )
}