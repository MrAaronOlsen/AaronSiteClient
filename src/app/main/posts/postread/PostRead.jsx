import React, { Component } from 'react';

import Post from '../post/Post.jsx';
import ArrowBtn from 'modules/buttons/ArrowBtn.jsx';
import Transition from 'modules/transition/Transition.jsx';

import Logger from 'logger';

import { API_V1 } from 'http/url.js';
import { GET } from 'http/get.js';

import styles from './postRead.mod.scss'

class PostsList extends Component {
  state = {
    post: {}
  }

  returnToList() {
    this.state.unMount(() => {
      this.props.handleState({
        page: "POST_LIST"
      })
    })
  }

  handleState(stateChange) {
    this.setState(stateChange)
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
      <Transition startPos={'-100vw'} endPos='-100vw' unMount={this.handleState.bind(this)}>
        <div id='post-read' className={styles.postReadWrapper}>
          <ArrowBtn direction='left' onClick={this.returnToList.bind(this)} />
          <Post post={this.state.post} />
        </div>
      </Transition>
    )
  }
}

export default PostsList;