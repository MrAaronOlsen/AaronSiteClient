import React, { Component} from "react";

import Page from './page/Page.jsx'

import Logger from 'logger';
import { GET } from 'http/get.js';
import { API_V1 } from 'http/url.js';

import styles from './pageList.mod.scss'

export default class PageList extends Component {
  state = {
    pages: []
  }

  componentDidMount() {
    this.load()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reload != this.props.reload) {
      this.load()
    }
  }

  load() {

    GET(API_V1 + 'pages?fields=id,header,sequence&sort=sequence', (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Failed to fetch pages. Cause: " + payload.getErrors())
      } else {
        Logger.info("Loading all pages.")
        this.setState({
          pages: payload.getData()
        })
      }
    })
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <div className={styles.title}>Pages</div>
        <div className={styles.list}>
          {this.state.pages.map((page, i) => {
            return <Page key={i}
              page={page}
              focus={this.props.focus}/>
          })}
        </div>
      </div>
    )
  }
}