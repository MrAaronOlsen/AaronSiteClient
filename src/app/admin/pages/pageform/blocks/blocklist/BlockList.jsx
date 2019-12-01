import React, { Component } from 'react'

import Element from './element/Element.jsx'

import AddButton from 'public/images/add-button.png'
import styles from './blockList.mod.scss'

export default class BlockList extends Component {
  state = {}

  addBlock() {
    if (!this.props.blocks["new_block"]) {
      this.props.addBlock({}, "new_block")
    }
  }

  focusBlock(name) {
    this.setState({
      focused: name
    })

    this.props.focusBlock(name)
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <img src={AddButton} onClick={this.addBlock.bind(this)}/>
        </div>

        { Object.keys(this.props.blocks).map((name, i) => {
          return <Element key={i}
            name={name}
            focused={this.state.focused == name}
            moveBlock={this.props.moveBlock}
            deleteBlock={this.props.deleteBlock}
            onClick={this.focusBlock.bind(this)}/>
        })}
      </div>
    )
  }
}