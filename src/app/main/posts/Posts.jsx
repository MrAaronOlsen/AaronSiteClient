import React, { Component} from "react";

import PostsList from './postslist/PostsList.jsx';
import { API_V1 } from 'http/url.js';

import get from 'http/get.js';
import styles from './posts.mod.scss';

class Posts extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    get(API_V1 + 'posts', (payload) => {
      if (payload.hasErrors()) {
        console.log(payload.getErrors())
      } else {
        this.setState({
          posts: payload.getData()
        })
      }
    })
  }

  render() {
    return(
      <div className={styles.postsWrapper}>
        <PostsList posts={this.state.posts} />
      </div>
    )
  }
}

export default Posts