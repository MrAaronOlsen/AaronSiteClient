import React, { Component} from "react";

import MenuBar from './menubar/MenuBar.jsx';
import PageForm from './pageform/PageForm.jsx'

import Logger from 'logger';
import { GET } from 'http/get.js';
import { DELETE } from 'http/delete.js';

import { API_V1 } from 'http/url.js';

import styles from './pages.mod.scss';

export default class EditPages extends Component {
  state = {
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

  reloadList() {
    this.setState({
      reload: !this.state.reload
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
        <MenuBar save={this.state.save}
          new={this.state.new}
          reload={this.state.reload}
          focus={this.focus.bind(this)}/>

        <PageForm pageId={this.state.pageId}
          reloadList={this.reloadList.bind(this)}
          stateHandler={this.stateHandler.bind(this)}/>
      </div>
    )
  }
}