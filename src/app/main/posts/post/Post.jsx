import React, { Component } from 'react';
import Interweave from 'interweave';

import styles from './post.mod.scss'

class Post extends Component {

  render() {
    return(
      <div className={styles.postWrapper} data-id={this.props.post.id} onClick={this.props.onClick}>
        <h4>{this.props.post.header}</h4>

        <div className={styles.textWrapper}>
          <Interweave content={this.props.post.body} />
        </div>

      </div>
    )
  }
}

export default Post;