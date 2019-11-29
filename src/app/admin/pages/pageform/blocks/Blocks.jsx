import React, { Component } from 'react'

import BlockList from './blockList/BlockList.jsx'
import Block from './block/Block.jsx'

import styles from './blocks.mod.scss'

export default class Blocks extends Component {
  state ={
    name: '',
    block: {}
  }

  focusBlock(name) {
    this.setState({
      name: name,
      block: this.props.blocks[name]
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
          name={this.state.name}
          onChange={this.onChange.bind(this)}/>
      </div>
    )
  }
}