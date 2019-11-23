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
    posts: [],
    triggerOut: false
  }

  handleClick(id) {
    this.setState({
      triggerOut: true,
      readPostId: id
    })
  }

  readPost() {
    this.props.handleState({
      page: "READ_POST",
      readPost: this.state.readPostId
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
          var timing = 500 + (i * 50);

          return(
            <Transition key={i}
              setId={post.id}
              targetId={this.state.readPostId}
              transDuration={timing + 'ms'}
              outTrigger={this.state.triggerOut}
              outDelay={500}
              outCallback={this.readPost.bind(this)}>

              <div className={styles.postWrapper}>
                <Post post={post} classNames="preview"/>

                <Transition
                  setId={post.id}
                  targetId={this.state.readPostId}
                  transDuration={(timing * 1.5) + 'ms'}
                  outTrigger={this.state.triggerOut}
                  width='auto'>

                  <ArrowBtn direction='right' sendBack={post.id} onClick={this.handleClick.bind(this)} />
                </Transition>
              </div>

            </Transition>
          )
        })}
      </div>
    )
  }
}

export default PostsList;