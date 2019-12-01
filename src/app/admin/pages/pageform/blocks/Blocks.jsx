import React, { Component } from 'react'

import BlockList from './blockList/BlockList.jsx'
import Block from './block/Block.jsx'

import styles from './blocks.mod.scss'

export default class Blocks extends Component {
  state ={
    blockKey: '',
    block: {}
  }

  focusBlock(blockKey) {
    this.setState({
      blockKey: blockKey,
      block: this.props.blocks[blockKey]
    })
  }

  onChange(block, name) {
    let blocks = this.props.blocks;
    blocks[name] = block;

    this.setState({
      block: block
    })

    this.props.onChange(blocks, "blocks")
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <BlockList blocks={this.props.blocks}
          onClick={this.focusBlock.bind(this)}/>

        <Block block={this.state.block}
          blockKey={this.state.blockKey}
          onChange={this.onChange.bind(this)}/>
      </div>
    )
  }
}