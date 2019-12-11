import React, { Component} from "react"

import Header from './header/Header.jsx'
import Blocks from './blocks/Blocks.jsx'
import Preview from './preview/Preview.jsx'

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
  }

  state = {
    blocks: {}
  };

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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.pageId != prevProps.pageId) {
      this.setState({
        blocks: {}
      })

      this.loadPage();
    }
  }

  onChange(content, name) {
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
        <Header header={this.state.header}
          sequence={this.state.sequence}
          caption={this.state.caption}
          slug={this.state.slug}
          onChange={this.onChange.bind(this)}/>

        <div className={styles.blockWrapper}>
          <Blocks blocks={this.state.blocks} onChange={this.onChange.bind(this)}/>
          <Preview blocks={this.state.blocks}/>
        </div>

      </div>
    )
  }
}