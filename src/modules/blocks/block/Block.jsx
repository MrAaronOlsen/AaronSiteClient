import React, { Component } from 'react'
import styled from 'styled-components'
import Interweave from 'interweave'

import Transition from 'modules/transition/Transition.jsx'
import BlockContext from 'blocks/BlockContext.jsx'

import styles from './block.mod.scss'

const Wrapper = styled.div(props => props.block.styles);

function Block(props) {
  const blocks = React.useContext(BlockContext)
  const block = blocks[props.blockName] || {}

  function getBlock() {
    if (blocks[props.blockName]) {
      return (
        <div>
          <Transition config={block.transition}>
            <Wrapper block={block} className={styles.wrapper}>{ getContent() }</Wrapper>
          </Transition >
          { getNext() }
        </div>
      )
    } else {
      return null
    }
  }

  function getContent() {
    if (block.type == 'text') {
      return block.content
    } else if (block.type == 'rich') {
      return <Interweave content={block.content} />
    }
  }

  function getNext() {
    return blocks[block.next] ? <Block blockName={block.next} /> : null
  }

  return (
    getBlock()
  )
}

export default Block;