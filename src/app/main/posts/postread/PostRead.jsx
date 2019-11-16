import React, { Component } from 'react';

import Post from '../post/Post.jsx';
import ActionBtn from 'modules/buttons/ActionBtn.jsx';
import Logger from 'logger';

import { API_V1 } from 'http/url.js';
import { GET } from 'http/get.js';

import styles from './postRead.mod.scss'

class PostsList extends Component {
  state = {
    post: {}
  }

  returnToList() {
    this.props.handleState({
      page: "POST_LIST"
    })
  }

  componentDidMount() {
    GET(API_V1 + 'posts/' + this.props.postId, (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Failed to load post. Cause: " + payload.getErrors());
      } else {
        this.setState({
          post: payload.getFirst()
        })
      }
    })
  }

  render() {
    return(
      <div className={styles.postReadWrapper}>
        <Post post={this.state.post} />
        <ActionBtn text="Go Back" onClick={this.returnToList.bind(this)} />
      </div>
    )
  }
}

export default PostsList;