import React, { Component } from 'react'

import ContentEditor from 'modules/contenteditor/ContentEditor.jsx'
import styles from './blockRich.mod.scss'

export default class BlockRich extends Component {
  state = {}

  stateHandler(stateChange) {
    this.setState(stateChange)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.blockKey !== this.props.blockKey && this.props.text) {
      this.state.updateEditorContent(this.props.text)
    }
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <span>{this.props.name}: </span>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <ContentEditor
              name={this.props.name}
              text={this.props.text}
              onChange={this.props.onChange}
              stateHandler={this.stateHandler.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}