import React, { Component } from 'react'

import BlockList from './blocklist/BlockList.jsx'
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

  changeBlock(block, name) {
    let blocks = this.props.blocks;
    blocks[name] = block;

    this.setState({
      blockKey: name,
      block: block
    })

    this.props.onChange(blocks, "blocks")
  }

  addBlock() {
    let blocks = this.props.blocks;
    blocks['new_block'] = {};

    this.props.onChange(blocks, "blocks");
  }

  moveBlock(oldName, newName) {
    let block = this.props.blocks[oldName]
    delete this.props.blocks[oldName]

    this.onChange(block, newName)
  }

  deleteBlock(name) {
    let blocks = this.props.blocks;
    delete blocks[name]

    this.props.onChange(blocks, "blocks")
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <BlockList blocks={this.props.blocks}
          addBlock={this.addBlock.bind(this)}
          moveBlock={this.moveBlock.bind(this)}
          deleteBlock={this.deleteBlock.bind(this)}
          focusBlock={this.focusBlock.bind(this)}/>

        <Block block={this.state.block}
          blockKey={this.state.blockKey}
          onChange={this.changeBlock.bind(this)}/>
      </div>
    )
  }
}