import React, { Component } from 'react';

import Page from './page/Page.jsx';

import ArrowBtn from 'modules/buttons/ArrowBtn.jsx';
import Transition from 'modules/transition/Transition.jsx';

import Logger from 'logger';

import { API_V1 } from 'http/url.js';
import { GET } from 'http/get.js';

import styles from './pageList.mod.scss'

class PageList extends Component {
  state = {
    pages: [],
    triggerOut: false
  }

  handleClick(id) {
    this.setState({
      triggerOut: true,
      readPageId: id
    })
  }

  readPage() {
    this.props.handleState({
      page: "READ_PAGE",
      readPage: this.state.readPageId
    })
  }

  handleState(stateChange) {
    this.setState(stateChange)
  }

  componentDidMount() {
    GET(API_V1 + 'pages?fields=id,header,preview&sort=sequence', (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Failed to load pages. Cause: " + payload.getErrors());
      } else {
        this.setState({
          pages: payload.getData()
        })
      }
    })
  }

  render() {
    return(
      <div id='page-list' className={styles.wrapper}>
        {this.state.pages.map((page, i) => {
          var timing = 500 + (i * 50);

          return(
            <Transition key={i}
              setId={page.id}
              targetId={this.state.readPageId}
              transDuration={timing + 'ms'}
              outTrigger={this.state.triggerOut}
              outDelay={500}
              outCallback={this.readPage.bind(this)}>

              <div className={styles.page}>
                <Page page={page} classNames="preview"/>

                <Transition
                  setId={page.id}
                  targetId={this.state.readPageId}
                  transDuration={(timing * 1.5) + 'ms'}
                  outTrigger={this.state.triggerOut}
                  width='auto'>

                  <ArrowBtn direction='right' sendBack={page.id} onClick={this.handleClick.bind(this)} />
                </Transition>
              </div>

            </Transition>
          )
        })}
      </div>
    )
  }
}

export default PageList;