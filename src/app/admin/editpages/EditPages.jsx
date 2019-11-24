import React, { Component} from "react";

import MenuBar from './menubar/MenuBar.jsx';
import PageList from './pagelist/PageList.jsx';
import PageForm from './pageForm/PageForm.jsx'

import Logger from 'logger';
import { GET } from 'http/get.js';
import { PUT } from 'http/put.js';
import { POST } from 'http/post.js';
import { DELETE } from 'http/delete.js';

import { API_V1 } from 'http/url.js';

import styles from './editPages.mod.scss';

export default class EditPages extends Component {
  state = {
    pages: [],
    pageId: ""
  }

  focus(id) {
    this.setState({
      pageId: id
    })
  }

  save() {
    if (this.state.pageId.state == "new") {
      this.insert();
    } else {
      this.update();
    }
  }

  insert() {
    var page = this.state.pageId
    page.body = this.state.getEditorContent();

    POST(API_V1 + 'pages/', page, (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Insert failed for Page. Cause: " + payload.getErrors());
      } else {
        var newPage = payload.getFirst();
        page.id = newPage.id;
        Logger.info("Inserted page. ID: " + newPage.id);
      }
    })
  }

  update() {
    const id = this.state.pageId;

    if (!id) {
      return;
    }

    var body = this.state.pageId
    body.body = this.state.getEditorContent();

    PUT(API_V1 + 'pages/' + id, body, (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Save failed for Page. ID: " + id + ". Cause: " + payload.getErrors());
      } else {
        Logger.info("Saved page. ID: " + id);
      }
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
        <MenuBar />

        <div className={styles.editWrapper}>
          <PageList focus={this.focus.bind(this)}/>
          <PageForm pageId={this.state.pageId}/>
        </div>
      </div>
    )
  }
}