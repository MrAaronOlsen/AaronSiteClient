import React, { Component } from 'react'

import Transition from 'modules/transition/Transition.jsx'
import BlockContext from 'blocks/BlockContext.jsx'

import styles from './block.mod.scss'

function Block(props) {
  const blocks = React.useContext(BlockContext)
  const block = blocks[props.blockName] || {}

  function getBlock() {
    if (blocks[props.blockName]) {
      return (
        <div>
          <Transition
            config={block.transition}>

            <div className={styles.wrapper}>
              { block.content }
            </div>
          </Transition >

          { getNext() }
        </div>
      )
    } else {
      return null
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