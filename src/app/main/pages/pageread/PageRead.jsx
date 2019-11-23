import React, { Component } from 'react';

import Page from '../page/Page.jsx';
import ArrowBtn from 'modules/buttons/ArrowBtn.jsx';
import Transition from 'modules/transition/Transition.jsx';

import Logger from 'logger';

import { API_V1 } from 'http/url.js';
import { GET } from 'http/get.js';

import styles from './pageRead.mod.scss'

class PageList extends Component {
  state = {
    page: {}
  }

  handleClick() {
    this.setState({
      triggerOut: true
    })
  }


  returnToList() {
    this.props.handleState({
      page: "LIST_PAGES"
    })
  }

  handleState(stateChange) {
    this.setState(stateChange)
  }

  componentDidMount() {
    GET(API_V1 + 'pages/' + this.props.pageId, (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Failed to load page. Cause: " + payload.getErrors());
      } else {
        this.setState({
          page: payload.getFirst()
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

        <div id='page-read' className={styles.wrapper}>

          <div className={styles.page}>
            <Transition
              startValue='-100vw'
              outValue='-100vw'
              transDuration='750ms'
              outTrigger={this.state.triggerOut}
              width='auto'>

              <ArrowBtn direction='left' onClick={this.handleClick.bind(this)} />
            </Transition>

            <Page page={this.state.page} />
          </div>
        </div>
      </Transition>
    )
  }
}

export default PageList;