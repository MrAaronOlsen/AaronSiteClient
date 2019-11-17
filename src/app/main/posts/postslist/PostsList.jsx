import React, { Component } from 'react';

import Post from '../post/Post.jsx';
import Logger from 'logger';

import { API_V1 } from 'http/url.js';
import { GET } from 'http/get.js';

import styles from './postsList.mod.scss'

class PostsList extends Component {
  state = {
    posts: []
  }

  handleClick(action) {
    var id = action.currentTarget.dataset.id;

    this.props.handleState({
      page: "READ_POST",
      readPost: id
    })
  }

  componentDidMount() {
    GET(API_V1 + 'posts', (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Failed to load posts. Cause: " + payload.getErrors());
      } else {
        this.setState({
          posts: payload.getData()
        })
      }
    })
  }

  render() {
    return(
      <div className={styles.postListsWrapper}>
        {this.state.posts.map((post) => {
          return <Post key={post.id}
            post={post}
            classNames="preview"
            onClick={this.handleClick.bind(this)}/>
        })}
      </div>
    )
  }
}

export default PostsList;