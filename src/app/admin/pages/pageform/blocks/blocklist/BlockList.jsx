import React, { Component } from 'react'
import shortid from 'shortid'

import Element from './element/Element.jsx'

import AddButton from 'public/images/add-button.png'
import styles from './blockList.mod.scss'

export default class BlockList extends Component {

  unwindList() {
    var blocks = this.props.blocks;
    if (!blocks) {
      return null;
    }

    var blockKeys = Object.keys(blocks).sort(function(a, b) {
      return blocks[a].sequence - blocks[b].sequence
    });

    return (
      blockKeys.map((name, i) => {
        var block = blocks[name];

        return <Element key={blockKeys.length + block.id}
          name={name}
          focused={this.props.focused == name}
          moveBlock={this.props.moveBlock}
          deleteBlock={this.props.deleteBlock}
          onClick={this.props.focusBlock} />
      })
    )
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <img src={AddButton} onClick={this.props.addBlock}/>
        </div>

        { this.unwindList() }
      </div>
    )
  }
}