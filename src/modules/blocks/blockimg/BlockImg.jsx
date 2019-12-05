import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Transition from 'modules/transition/Transition.jsx'
import BlockContext from 'blocks/BlockContext.jsx'
import NextBlock from 'blocks/NextBlock.jsx'

import styles from './blockImg.mod.scss'
import Themogrify from 'mixins/theme.js'

const StylesWrapper = styled.div(props => Themogrify(props.block.styles));

export default function BlockImg(props) {
  const blocks = React.useContext(BlockContext)
  const block = blocks[props.name];

  function getBlock() {
    return (
      <div>
        <Transition config={block.transition}>
            <StylesWrapper block={block} className={styles.wrapper}>
                <img src={block.img_url} />
            </StylesWrapper>
          </Transition >
        <NextBlock name={block.next} />
      </div>
    )
  }

  return (getBlock())
}