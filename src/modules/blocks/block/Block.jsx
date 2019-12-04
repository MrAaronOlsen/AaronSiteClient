import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Interweave from 'interweave'

import Transition from 'modules/transition/Transition.jsx'
import BlockContext from 'blocks/BlockContext.jsx'

import styles from './block.mod.scss'
import theme, { themosize } from 'mixins/theme.js'

const StylesWrapper = styled.div(props => themosize(props.block.styles));

function Block(props) {
  const blocks = React.useContext(BlockContext)
  const block = blocks[props.blockName] || {}

  function getBlock() {
    if (blocks[props.blockName]) {
      return (
        <div>
          <Transition config={block.transition}>
            <StylesWrapper block={block} className={styles.wrapper}>{ getContent() }</StylesWrapper>
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
    <ThemeProvider theme={theme}>
      { getBlock() }
    </ThemeProvider>
  )
}

export default Block;