import React, { Component} from "react"

import MenuBar from './menubar/MenuBar.jsx'
import Header from './header/Header.jsx'
import BlockEditor from './blockeditor/BlockEditor.jsx'

import {
  fetchPages, fetchPage,
  insertPage, savePage, deletePage,
  executeAction } from './PageFormOperations.js';

import styles from './pageForm.mod.scss'

const newPage = {
  header: "New Page",
  blocks: JSON.stringify({"start": {}})
}

const emptyPage = {
  pageId: "",
  id: "",
  header: "",
  caption: "",
  blocks: {},
  sequence: "",
  slug: "",
  mode: ""
}

export default class PageForm extends Component {
  state = {
    pages: [],
    pageId: "",
    blocks: {}
  };

  componentDidMount() {
    this.fetchAll()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.pageId != prevState.pageId) {
      this.fetch();

      this.setState({
        blocks: {}
      })
    }
  }

  setStateFromObject(page) {
    this.setState({
      id: page.id,
      header: page.header,
      caption: page.caption,
      blocks: page.blocks,
      sequence: page.sequence,
      slug: page.slug,
      mode: page.mode
    })
  }

  getObjectFromState() {
    return {
      id: this.state.id,
      header: this.state.header,
      caption: this.state.caption,
      blocks: JSON.stringify(this.state.blocks),
      sequence: this.state.sequence,
      slug: this.state.slug,
      mode: this.state.mode
    }
  }

  onChange(content, name) {
    this.setState({
      [name]: content
    })
  }

  fetch() {
    fetchPage(this.state.pageId, (page) => {
      this.setStateFromObject(page);
    })
  }

  fetchAll() {
    fetchPages((pages) => {
      this.setState({pages: pages})
    })
  }

  focus(id) {
    this.setState({
      pageId: id
    })
  }

  new() {
    insertPage(newPage, (id) => {
      this.setState(emptyPage)
      this.fetchAll()
      this.setState({
        pageId: id
      })
    })
  }

  save() {
    savePage(this.getObjectFromState(), (page) => {
      this.fetchAll();
      this.fetch();
    })
  }

  delete() {
    deletePage(this.state.pageId, (id) => {
      this.fetchAll();
      this.setState(emptyPage)
    })
  }

  checkIn() {
    const action = {
      action: 'check_in',
      id: this.state.pageId
    }

    executeAction(action, (id) => {
      this.fetchAll();
      this.setState({
        pageId: "",
      })

      this.setStateFromObject({})
    })
  }

  checkOut() {
    const action = {
      action: 'check_out',
      id: this.state.pageId
    }

    executeAction(action, (id) => {
      this.fetchAll();
      this.fetch();
    })
  }

  publish() {
    const action = {
      action: 'publish',
      id: this.state.pageId,
      slug: this.state.slug
    }

    executeAction(action, (id) => {
      this.fetchAll();
      this.fetch();
    })
  }

  unpublish() {
    const action = {
      action: 'unpublish',
      id: this.state.pageId,
    }

    executeAction(action, (id) => {
      this.fetchAll();
      this.fetch();
    })
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <MenuBar
          pages={this.state.pages}
          pageId={this.state.pageId}
          mode={this.state.mode}
          focus={this.focus.bind(this)}
          new={this.new.bind(this)}
          save={this.save.bind(this)}
          delete={this.delete.bind(this)}
          publish={this.publish.bind(this)}
          unpublish={this.unpublish.bind(this)}
          checkOut={this.checkOut.bind(this)}
          checkIn={this.checkIn.bind(this)} />

        <Header
          header={this.state.header}
          sequence={this.state.sequence}
          caption={this.state.caption}
          slug={this.state.slug}
          onChange={this.onChange.bind(this)}/>

        <BlockEditor
          blocks={this.state.blocks}
          pageId={this.state.pageId}
          onChange={this.onChange.bind(this)}/>
      </div>
    )
  }
}