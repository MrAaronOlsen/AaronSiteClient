import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Interweave from 'interweave'

import Transition from 'modules/transition/Transition.jsx'
import BlockContext from 'blocks/BlockContext.jsx'
import NextBlock from 'blocks/NextBlock.jsx'

import styles from './blockRich.mod.scss'
import Themogrify from 'mixins/theme.js'

const StylesWrapper = styled.div(props => Themogrify(props.block.styles));

export default function BlockRich(props) {
  const blocks = React.useContext(BlockContext)
  const block = blocks[props.name];

  function getBlock() {
    return (
      <div>
        <Transition config={block.transition}>
          <StylesWrapper block={block} className={styles.wrapper}>
            <Interweave content={block.content} />
          </StylesWrapper>
        </Transition >
        <NextBlock name={block.next} />
      </div>
    )
  }

  return (getBlock())
}