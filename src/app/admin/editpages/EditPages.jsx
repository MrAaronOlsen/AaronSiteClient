import React, { Component} from "react";

import MenuBar from './menubar/MenuBar.jsx';
import PageList from './pagelist/PageList.jsx';
import PageForm from './pageform/PageForm.jsx'

import Logger from 'logger';
import { GET } from 'http/get.js';
import { DELETE } from 'http/delete.js';

import { API_V1 } from 'http/url.js';

import styles from './editPages.mod.scss';

export default class EditPages extends Component {
  state = {
    pages: [],
    pageId: ""
  }

  stateHandler(stateChange) {
    this.setState(stateChange)
  }

  focus(id) {
    this.setState({
      pageId: id
    })
  }

  delete() {
    const id = this.state.pageId;

    if (!id) {
      return;
    }

    DELETE(API_V1 + 'pages/' + id, {}, (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Delete failed for Page. ID: " + id + ". Cause: " + payload.getErrors());
      } else {
        Logger.info("Deleted page. ID: " + id);
        this.load();
      }
    })
  }

  render() {
    return (

      <div className={styles.wrapper}>
        <MenuBar save={this.state.save} new={this.state.new}/>

        <div className={styles.editWrapper}>
          <PageList focus={this.focus.bind(this)}/>
          <PageForm pageId={this.state.pageId} stateHandler={this.stateHandler.bind(this)}/>
        </div>
      </div>
    )
  }
}