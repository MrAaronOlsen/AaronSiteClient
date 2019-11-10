import React, { Component} from "react";

import styles from './editPost.mod.scss'

export default class EditPost extends Component {

  send() {
    this.props.focusPost(this.props.post)
  }

  render() {
    return(
      <div className={styles.editPostWrapper}
        onClick={this.send.bind(this)}>
        {this.props.post.header}
      </div>
    )
  }
}