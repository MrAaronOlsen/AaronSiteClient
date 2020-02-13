import React, { Component } from 'react';
import shortid from 'shortid';

import BlockList from './blocklist/BlockList.jsx';
import BlockForm from './blockform/BlockForm.jsx';
import Preview from './preview/Preview.jsx'

import styles from './blockEditor.mod.scss';

export default class BlockEditor extends Component {
  state ={
    parent: '',
    block: {}
  }

  componentDidUpdate(prevProps) {
    if (this.props.pageId != prevProps.pageId) {
      this.setState({
        parent: '',
        block: {}
      })
    }
  }

  focusBlock(parent) {
    this.setState({
      parent: parent,
      block: this.props.blocks[parent]
    })
  }

  addBlock() {
    const blocks = this.props.blocks;
    blocks['new_block'] = {
      id: shortid.generate()
    };

    this.props.onChange(blocks, "blocks");
  }

  updateBlock(block, name) {
    const blocks = this.props.blocks;
    blocks[name] = block;

    this.setState({
      parent: name,
      block: block
    })

    this.props.onChange(blocks, "blocks")
  }

  renameBlock(oldName, newName) {
    const blocks = this.props.blocks;

    if (blocks[newName]) {
      return
    }

    const block = blocks[oldName]
    delete blocks[oldName]

    this.updateBlock(block, newName)
  }

  deleteBlock(name) {
    const blocks = this.props.blocks;
    delete blocks[name]

    this.props.onChange(blocks, "blocks")
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <div className={styles.editorWrapper}>
          <BlockList
            start={"start"}
            blocks={this.props.blocks}
            focused={this.state.parent}
            addBlock={this.addBlock.bind(this)}
            renameBlock={this.renameBlock.bind(this)}
            deleteBlock={this.deleteBlock.bind(this)}
            focusBlock={this.focusBlock.bind(this)} />

          <BlockForm
            block={this.state.block}
            parent={this.state.parent}
            blocks={this.props.blocks}
            onChange={this.updateBlock.bind(this)} />
        </div>
        <div className={styles.previewWrapper}>
          <Preview blocks={this.props.blocks}/>
        </div>
      </div>
    )
  }
}