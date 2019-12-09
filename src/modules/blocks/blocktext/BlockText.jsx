import React, { Component } from 'react'
import styled from 'styled-components'

import styledBlock from '../styledBlock/StyledBlock.jsx'
import styles from './blockText.mod.scss'

function BlockText(props) {
  const block = props.block;

  function getBlock() {
    return <div className={styles.wrapper}>{ block.content }</div>
  }

  return ( getBlock() )
}

const WrappedComponent = styledBlock(BlockText)
export default WrappedComponent