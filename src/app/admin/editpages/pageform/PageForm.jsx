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
    this.props.stateHandler({new: this.new.bind(this)})
    this.props.stateHandler({watchContent: this.watchContent.bind(this)})
  }

  state = {};

  setStateFromObject(page) {
    this.setState({
      id: page.id,
      header: page.header,
      preview: page.preview,
      body: page.body,
      sequence: page.sequence
    })
  }

  getObjectFromState() {
    return {
      id: this.state.id,
      header: this.state.header,
      preview: this.state.preview,
      body: this.state.body,
      sequence: this.state.sequence
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

  watchContent(content, name) {
    this.setState({
      [name]: content
    })
  }

  new() {
    this.insert({
      header: "New Page"
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

  insert(page) {

    POST(API_V1 + 'pages/', page, (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Insert failed for Page. Cause: " + payload.getErrors());
      } else {
        Logger.info("Inserted Page. Id: " + payload.getFirst().id);

        this.props.reloadList()
      }
    })
  }

  save() {
    var page = this.getObjectFromState();

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
            name="body"
            stateHandler={this.stateHandler.bind(this)}
            onChange={this.watchContent.bind(this)} />
        </div>
      </div>
    )
  }
}