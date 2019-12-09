import React, { Component } from 'react'
import styled from 'styled-components'

import styledBlock from '../styledBlock/StyledBlock.jsx'
import styles from './blockImg.mod.scss'

function BlockImg(props) {
  const block = props.block;

  function getBlock() {
    return <img className={styles.wrapper} src={block.img_url} />
  }

  return (getBlock())
}

const WrappedComponent = styledBlock(BlockImg)
export default WrappedComponent