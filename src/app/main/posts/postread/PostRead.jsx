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

  handleClick() {
    this.setState({
      triggerOut: true
    })
  }


  returnToList() {
    this.props.handleState({
      page: "POST_LIST"
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
      <Transition
        startValue='-100vw'
        outValue='-100vw'
        outDelay={300}
        outTrigger={this.state.triggerOut}
        outCallback={this.returnToList.bind(this)}>

        <div id='post-read' className={styles.postReadWrapper}>

          <Transition
            startValue='-100vw'
            outValue='-100vw'
            transDuration='750ms'
            outTrigger={this.state.triggerOut}
            width='auto'>

            <ArrowBtn direction='left' onClick={this.handleClick.bind(this)} />
          </Transition>

          <Post post={this.state.post} />
        </div>
      </Transition>
    )
  }
}

export default PostsList;