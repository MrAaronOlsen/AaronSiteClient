import React, { Component } from 'react';

import Post from '../post/Post.jsx';

import ArrowBtn from 'modules/buttons/ArrowBtn.jsx';
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
      <div id='post-list' className={styles.postListsWrapper}>
        {this.state.posts.map((post, i) => {
          return(
            <Transition key={i}
              duration={500 + i * 50}
              unMount={this.handleState.bind(this)}
              unMountId={post.id} >

              <div className={styles.postWrapper}>
                <Post post={post} classNames="preview"/>
                <ArrowBtn direction='right' sendBack={post.id} onClick={this.handleClick.bind(this)} />
              </div>

            </Transition>
          )
        })}
      </div>
    )
  }
}

export default PostsList;