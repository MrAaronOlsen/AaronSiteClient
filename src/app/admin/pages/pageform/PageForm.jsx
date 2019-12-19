import React, { Component} from "react"

import Header from './header/Header.jsx'
import Blocks from './blocks/Blocks.jsx'
import Preview from './preview/Preview.jsx'

import { fetchPage, insertPage, savePage } from './PageFormOperations.js';

import styles from './pageForm.mod.scss'

export default class PageForm extends Component {
  constructor(props) {
    super(props)

    this.props.stateHandler({save: this.save.bind(this)})
    this.props.stateHandler({new: this.new.bind(this)})
    this.props.stateHandler({focus: this.focus.bind(this)})
  }

  state = {
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
    insertPage({header: "New Page"}, (id) => {
      this.props.reloadList()
    })
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