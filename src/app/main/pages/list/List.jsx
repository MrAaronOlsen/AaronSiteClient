import React, { Component } from 'react'

import Element from './element/Element.jsx'

import Transition from 'modules/transition/Transition.jsx';
import Logger from 'logger';

import { API_V1 } from 'http/url.js';
import { GET } from 'http/get.js';

import styles from './list.mod.scss'

export default class List extends Component {
  state = {
    elements: [],
  }

  componentDidMount() {
    GET(API_V1 + 'pages?mode=published&fields=id,header,caption,slug&sort=sequence', (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Failed to load pages. Cause: " + payload.getErrors());
      } else {
        this.setState({
          elements: payload.getData()
        })
      }
    })
  }

  render() {
    return(
      <div className={styles.wrapper}>
        {this.state.elements.map((element, i) => {
          return(
            <Element key={i}
              element={element}
              index={i}
              history={this.props.history} /> )
        })}
      </div>
    )
  }
}