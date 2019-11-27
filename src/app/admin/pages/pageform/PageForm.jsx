import React, { Component} from "react";

import Blocks from 'blocks/Blocks.jsx'
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
      caption: page.caption,
      blocks: JSON.parse(page.blocks),
      sequence: page.sequence,
      slug: page.slug
    })
  }

  getObjectFromState() {
    return {
      id: this.state.id,
      header: this.state.header,
      caption: this.state.caption,
      blocks: JSON.stringify(this.state.blocks),
      sequence: this.state.sequence,
      slug: this.state.slug
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
        <div className={styles.headerWrapper}>
          <TextInput classNames={styles.headerText}
            text={this.state.header}
            name="header"
            onChange={this.watchContent.bind(this)}>

            <span className={styles.headerLabel}>Header</span>
          </TextInput>

          <TextInput classNames={styles.sequenceText}
            text={this.state.sequence}
            name="sequence"
            onChange={this.watchContent.bind(this)}>

            <span className={styles.sequenceLabel}>Sequence</span>
          </TextInput>

          <TextInput classNames={styles.captionText}
            text={this.state.caption}
            name="caption"
            onChange={this.watchContent.bind(this)}>

            <span className={styles.captionLabel}>Caption</span>
          </TextInput>
          <TextInput classNames={styles.slugText}
            text={this.state.slug}
            name="slug"
            onChange={this.watchContent.bind(this)}>

            <span className={styles.slugLabel}>Slug</span>
          </TextInput>
        </div>
        <div className={styles.blocksWrapper}>
          <Blocks blocks={this.state.blocks}/>
        </div>
      </div>
    )
  }
}