import React, { Component } from 'react'

import styles from './blockImg.mod.scss'

export default function BlockImg(props) {
  const block = props.block;

  function getBlock() {
    return <img name={"block-img"} className={styles.wrapper} src={block.img_url} />
  }

  return (getBlock())
}