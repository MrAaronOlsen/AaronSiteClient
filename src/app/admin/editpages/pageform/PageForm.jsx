import React, { Component} from "react";

import ContentEditor from 'modules/content_editor/ContentEditor.jsx';

import Logger from 'logger';
import { GET } from 'http/get.js';
import { API_V1 } from 'http/url.js';

import styles from './pageForm.mod.scss'

export default class PageForm extends Component {
  state = {
    page: {}
  }

  stateHandler(stateChange) {
    this.setState(stateChange)
  }

  componentDidMount() {
    this.loadPage()
  }

  componentDidUpdate(prevProps) {
    if (this.props.pageId != prevProps.pageId) {
      this.loadPage();
    }

    this.state.updateEditorContent(this.state.page.id, this.state.page.body)
  }

  // this.props.stateHandler('getEditorContent', this.getContent.bind(this))
  // this.props.stateHandler('updateEditorContent', this.updateEditor.bind(this))

  loadPage() {
    if (this.props.pageId) {
      var id = this.props.pageId

      GET(API_V1 + 'pages/' + id, (payload) => {
        if (payload.hasErrors()) {
          Logger.error("Failed to fetch page. Cause: " + payload.getErrors())
        } else {
          Logger.info("Loading page.")
          this.setState({
            page: payload.getFirst()
          })
        }
      })
    }
  }

  render() {
    return(
      <div className={styles.wrapper}>

        <div className={styles.contentWrapper}>
          <ContentEditor stateHandler={this.stateHandler.bind(this)} />
        </div>
      </div>
    )
  }
}