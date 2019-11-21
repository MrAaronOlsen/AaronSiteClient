import React, { Component } from 'react';

import Post from '../post/Post.jsx';
import Transition from 'modules/transition/Transition.jsx';
import Logger from 'logger';

import { API_V1 } from 'http/url.js';
import { GET } from 'http/get.js';

import styles from './postsList.mod.scss'

class PostsList extends Component {
  state = {
    posts: []
  }

  handleClick(id) {
    this.state['unMount' + id](() => {
      this.props.handleState({
        page: "READ_POST",
        readPost: id
      })
    })
  }

  handleState(stateChange) {
    this.setState(stateChange)
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
        {this.state.posts.map((post, i) => {
          return(
            <Transition key={i}
              duration={500 + i * 50}
              unMount={this.handleState.bind(this)}
              unMountId={post.id} >

              <Post post={post} classNames="preview" onClick={this.handleClick.bind(this)}/>
            </Transition>
          )
        })}
      </div>
    )
  }
}

export default PostsList;