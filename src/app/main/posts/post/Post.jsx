import React, { Component } from 'react';
import Interweave from 'interweave';

import styles from './post.mod.scss'

class Post extends Component {
  id = this.props.post.id;

  getClasses() {
    return [styles.postWrapper, styles[this.props.classNames]].join(" ")
  }

  onClick(action) {
    this.props.onClick(this.id)
  }

  render() {
    return(
      <div id={this.id}
        className={this.getClasses()}
        data-id={this.id}
        onClick={this.onClick.bind(this)}>

        <h4>{this.props.post.header}</h4>

        <div className={styles.textWrapper}>
          <Interweave content={this.props.post.body} />
        </div>

      </div>
    )
  }
}

export default Post;