import React, { Component } from 'react';

import styles from './post.mod.scss'

class Post extends Component {

  render() {
    return(
      <div className={styles.postWrapper}>
        <h4>{this.props.post.header}</h4>
        <p>{this.props.post.body}</p>
      </div>
    )
  }
}

export default Post;