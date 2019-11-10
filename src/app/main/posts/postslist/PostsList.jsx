import React, { Component } from 'react';
import Post from './post/Post.jsx';

import styles from './postsList.mod.scss'

class PostsList extends Component {

  render() {
    return(
      <div className={styles.postListsWrapper}>
        {this.props.posts.map((post) => {
          return <Post key={post.id} post={post} />
        })}
      </div>
    )
  }
}

export default PostsList;