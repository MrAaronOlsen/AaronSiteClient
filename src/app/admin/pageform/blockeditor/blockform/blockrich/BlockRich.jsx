import React, { Component } from 'react'

import BlockRichEditor from './editor/BlockRichEditor.jsx'
import styles from './blockRich.mod.scss'

export default class BlockRich extends Component {

  render() {
    return(
      <div className={styles.wrapper}>
        <span>{this.props.name}: </span>

        <div className={styles.contentWrapper}>
          <BlockRichEditor
            name={this.props.name}
            text={this.props.text}
            onChange={this.props.onChange} />
        </div>
      </div>
    )
  }
}