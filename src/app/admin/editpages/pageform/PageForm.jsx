import React, { Component} from "react";

import ContentEditor from 'modules/contenteditor/ContentEditor.jsx';
import TextInput from 'modules/textinput/TextInput.jsx'

import Logger from 'logger';
import { GET } from 'http/get.js';
import { PUT } from 'http/put.js';
import { POST } from 'http/post.js';
import { API_V1 } from 'http/url.js';

import styles from './pageForm.mod.scss'

export default class PageForm extends Component {
  constructor(props) {
    super(props)

    this.props.stateHandler({save: this.save.bind(this)})
  }

  state = {};

  setStateFromObject(page) {
    this.setState({
      id: page.id,
      header: page.header,
      preview: page.preview,
      body: page.body
    })
  }

  getObjectFromState() {
    return {
      id: this.state.id,
      header: this.state.header,
      preview: this.state.preview,
      body: this.state.body
    }
  }

  stateHandler(stateChange) {
    this.setState(stateChange)
  }

  componentDidUpdate(prevProps) {
    if (this.props.pageId != prevProps.pageId) {
      this.loadPage();
    }
  }

  contentWatcher(content) {
    this.setState({
      body: content
    })
  }

  watchContent(content, name) {
    this.setState({
      [name]: content
    })
  }

  loadPage() {
    if (this.props.pageId) {
      var id = this.props.pageId

      GET(API_V1 + 'pages/' + id, (payload) => {
        if (payload.hasErrors()) {
          Logger.error("Failed to fetch page. Cause: " + payload.getErrors())
        } else {
          let page = payload.getFirst();

          this.setStateFromObject(page)
          this.state.updateEditorContent(page.id, page.body)
        }
      })
    }
  }

  save() {
    var page = this.getObjectFromState();

    if (page.status == "new") {
      this.insert(page);
    } else {
      this.update(page);
    }
  }

  insert(page) {

    POST(API_V1 + 'pages/', page, (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Insert failed for Page. Cause: " + payload.getErrors());
      } else {
        var newPage = payload.getFirst();
        page.id = newPage.id;
        Logger.info("Inserted Page. Id: " + newPage.id);
      }
    })
  }

  update(page) {

    PUT(API_V1 + 'pages/' + page.id, page, (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Save failed for Page. ID: " + page.id + ". Cause: " + payload.getErrors());
      } else {
        Logger.info("Saved Page. Id: " + page.id);
      }
    })
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <div className={styles.previewWrapper}>
          <TextInput classNames={styles.textWrapper}
            text={this.state.preview}
            name="preview"
            onChange={this.watchContent.bind(this)}/>

        </div>
        <div className={styles.contentWrapper}>
          <ContentEditor
            stateHandler={this.stateHandler.bind(this)}
            contentWatcher={this.contentWatcher.bind(this)} />
        </div>
      </div>
    )
  }
}