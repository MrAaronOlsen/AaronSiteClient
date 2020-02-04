import React, { Component } from 'react'

import ContentEditor from 'modules/contenteditor/ContentEditor.jsx'

import ArrowImg from 'public/images/arrow-down.png';
import styles from './blockRichEditor.mod.scss'

export default class BlockRich extends Component {
  state = {
    expand: false
  }

  stateHandler(stateChange) {
    this.setState(stateChange)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.blockKey !== this.props.blockKey && this.props.text) {
      this.state.updateEditorContent(this.props.text)
    }
  }

  toggleExpand() {
    this.setState({
      expand: !this.state.expand
    })
  }

  getClasses() {
    if (this.state.expand) {
      return [styles.expandWrapper, styles.expand].join(" ");
    } else {
      return styles.expandWrapper
    }
  }

  getEditor() {
    if (this.state.expand) {
      return (
        <div className={styles.editorWrapper}>
          <ContentEditor
            name={this.props.name}
            text={this.props.text}
            onChange={this.props.onChange}
            stateHandler={this.stateHandler.bind(this)} />
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <div className={this.getClasses()} onClick={this.toggleExpand.bind(this)}>
          <img src={ArrowImg} />
        </div>
        {this.getEditor()}
      </div>
    )
  }
}