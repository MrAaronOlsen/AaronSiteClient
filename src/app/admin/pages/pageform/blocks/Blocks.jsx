import React, { Component } from 'react';
import shortid from 'shortid';

import BlockList from './blocklist/BlockList.jsx';
import Block from './block/Block.jsx';

import styles from './blocks.mod.scss';

export default class Blocks extends Component {
  state ={
    blockKey: '',
    block: {}
  }

  componentDidUpdate(prevProps) {
    if (this.props.pageId != prevProps.pageId) {
      this.setState({
        blockKey: '',
        block: {}
      })
    }
  }

  focusBlock(blockKey) {
    this.setState({
      blockKey: blockKey,
      block: this.props.blocks[blockKey]
    })
  }

  addBlock() {
    let blocks = this.props.blocks;
    blocks['new_block'] = {
      id: shortid.generate()
    };

    this.props.onChange(blocks, "blocks");
  }

  updateBlock(block, name) {
    let blocks = this.props.blocks;
    blocks[name] = block;

    this.setState({
      blockKey: name,
      block: block
    })

    this.props.onChange(blocks, "blocks")
  }

  renameBlock(oldName, newName) {
    let block = this.props.blocks[oldName]
    delete this.props.blocks[oldName]

    this.updateBlock(block, newName)
  }

  deleteBlock(name) {
    let blocks = this.props.blocks;
    delete blocks[name]

    this.props.onChange(blocks, "blocks")
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <BlockList
          blocks={this.props.blocks}
          focused={this.state.blockKey}
          addBlock={this.addBlock.bind(this)}
          renameBlock={this.renameBlock.bind(this)}
          deleteBlock={this.deleteBlock.bind(this)}
          focusBlock={this.focusBlock.bind(this)} />

        <Block block={this.state.block}
          blockKey={this.state.blockKey}
          onChange={this.updateBlock.bind(this)} />
      </div>
    )
  }
}