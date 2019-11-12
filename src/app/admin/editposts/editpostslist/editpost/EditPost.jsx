import React, { Component} from "react";

import TextInput from 'modules/textinput/TextInput.jsx'
import styles from './editPost.mod.scss'

export default class EditPost extends Component {

  focus() {
    this.props.focus(this.props.post)
  }

  getClassNames() {
    return [styles.editPostWrapper, styles[this.props.post.inFocus]].join(" ")
  }

  render() {
    return(
      <div className={this.getClassNames()}
        onClick={this.focus.bind(this)}>

        <TextInput
          classNames={styles.inputWrapper}
          text={this.props.post.header}
          name="header"
          onChange={this.props.watch} />

      </div>
    )
  }
}