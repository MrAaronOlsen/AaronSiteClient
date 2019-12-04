import React, { Component } from 'react'

import Element from './element/Element.jsx'

import AddButton from 'public/images/add-button.png'
import styles from './blockList.mod.scss'

export default class BlockList extends Component {
  state = {}

  focusBlock(name) {
    this.setState({
      focused: name
    })

    this.props.focusBlock(name)
  }

  unwindList() {
    var blocks = this.props.blocks;
    if (!blocks) {
      return null;
    }

    var blockKeys = Object.keys(blocks);

    return (
      blockKeys.map((name, i) => {
        return <Element key={i + "_" + blockKeys.length}
          name={name}
          focused={this.state.focused == name}
          moveBlock={this.props.moveBlock}
          deleteBlock={this.props.deleteBlock}
          onClick={this.focusBlock.bind(this)}/>
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