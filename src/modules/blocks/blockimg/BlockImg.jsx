import React, { Component } from 'react'
import styled from 'styled-components'

import styledBlock from '../blockwrapper/BlockWrapper.jsx'
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