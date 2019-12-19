import React, { Component} from "react"

import MenuBar from '../menubar/MenuBar.jsx'
import Header from './header/Header.jsx'
import Blocks from './blocks/Blocks.jsx'
import Preview from './preview/Preview.jsx'

import { fetchPages, fetchPage, insertPage, savePage } from './PageFormOperations.js';

import styles from './pageForm.mod.scss'

export default class PageForm extends Component {
  state = {
    pages: [],
    pageId: "",
    blocks: {}
  };

  setStateFromObject(page) {
    this.setState({
      id: page.id,
      header: page.header,
      caption: page.caption,
      blocks: page.blocks,
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.pageId != prevState.pageId) {
      this.setState({
        blocks: {}
      })

      this.fetch();
    }
  }

  componentDidMount() {
    fetchPages((pages) => {
      this.setState({
        pages: pages
      })
    })
  }

  onChange(content, name) {
    this.setState({
      [name]: content
    })
  }

  focus(id) {
    this.setState({
      pageId: id
    })
  }

  new() {
    insertPage({header: "New Page"}, (id) => {})
  }

  fetch() {
    fetchPage(this.state.pageId, (page) => {
      this.setStateFromObject(page);
    })
  }

  save() {
    savePage(this.getObjectFromState(), (page) => {})
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <MenuBar
          pages={this.state.pages}
          save={this.save.bind(this)}
          new={this.new.bind(this)}
          focus={this.focus.bind(this)} />

        <Header
          header={this.state.header}
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