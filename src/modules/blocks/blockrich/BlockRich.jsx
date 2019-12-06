import React, { Component } from 'react'
import styled from 'styled-components'
import Interweave from 'interweave'

import styledBlock from '../blockwrapper/BlockWrapper.jsx'
import styles from './blockRich.mod.scss'

const StylesWrapper = styled.div(props => Themogrify(props.block.styles));

function BlockRich(props) {
  const block = props.block;

  function getBlock() {
    return <Interweave className={styles.wrapper} content={block.content} />
  }

  return (getBlock())
}

const WrappedComponent = styledBlock(BlockRich)
export default WrappedComponent