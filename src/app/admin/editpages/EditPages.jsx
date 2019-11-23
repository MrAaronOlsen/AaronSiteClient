import React, { Component} from "react";

import EditPagesNavBar from './editpagesnavbar/EditPagesNavBar.jsx';
import EditPagesList from './editpageslist/EditPagesList.jsx';
import ContentEditor from 'modules/content_editor/ContentEditor.jsx';

import Logger from 'logger';
import { GET } from 'http/get.js';
import { PUT } from 'http/put.js';
import { POST } from 'http/post.js';
import { DELETE } from 'http/delete.js';

import { API_V1 } from 'http/url.js';

import styles from './editPages.mod.scss';

const getNewPage = () => {
  return {
    header: "Page name...",
    preview: 'Preview...',
    body: "",
    state: "new",
    inFocus: "inFocus"
  }
}

export default class EditPages extends Component {
  state = {
    pages: [],
    pageInFocus: {
      header: "",
      preview: "",
      body: ""
    }
  }

  componentDidMount() {
    this.load();
  }

  // Used by ContentEditor to set state entries
  // - getEditorContent()
  // - updateEditorContent()
  stateHandler(key, value) {
    this.setState({
      [key]: value
    })
  }

  // Watches the page in focus. Can be sent to monitor onChange events. Text fields must have a name that matches a field in pages.
  //
  watch(event) {
    var name = event.target.name;
    var value = event.target.value;

    this.state.pageInFocus[name] = value;

    this.setState({
      pageInFocus: this.state.pageInFocus
    })
  }

  focus(page) {
    this.state.pageInFocus.inFocus = "";
    page.inFocus = "inFocus";

    this.setState({
      pageInFocus: page
    })

    this.state.updateEditorContent(page.id, page.body);
  }

  new() {
    this.state.pageInFocus.inFocus = "";

    var newPage = getNewPage();
    this.state.pages.push(newPage)

    this.setState({
      pageInFocus: newPage,
      pages: this.state.pages
    })

    this.state.updateEditorContent("", newPage.body);
  }

  load() {

    this.setState({
      pages: []
    })

    GET(API_V1 + 'pages', (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Failed to fetch pages. Cause: " + payload.getErrors())
      } else {
        Logger.info("Loading all pages.")
        this.setState({
          pages: payload.getData()
        })
      }
    })
  }

  save() {
    if (this.state.pageInFocus.state == "new") {
      this.insert();
    } else {
      this.update();
    }
  }

  insert() {
    var page = this.state.pageInFocus
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
    const id = this.state.pageInFocus.id;

    if (!id) {
      return;
    }

    var body = this.state.pageInFocus
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
    const id = this.state.pageInFocus.id;

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
        <EditPagesNavBar
          save={this.save.bind(this)}
          new={this.new.bind(this)}
          delete={this.delete.bind(this)}/>

        <div className={styles.editWrapper}>
          <EditPagesList
            pages={this.state.pages}
            watch={this.watch.bind(this)}
            focus={this.focus.bind(this)}/>

          <div className={styles.contentWrapper}>
            <ContentEditor
              stateHandler={this.stateHandler.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}