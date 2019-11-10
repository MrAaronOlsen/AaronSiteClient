import React, { Component} from "react";

import EditPostsNavBar from './editpostsnavbar/EditPostsNavBar.jsx';
import EditPostsList from './editpostslist/EditPostsList.jsx';
import ContentEditor from 'modules/content_editor/ContentEditor.jsx';

import { API_V1 } from 'http/url.js';

import get from 'http/get.js';
import put from 'http/put.js';

import styles from './editPosts.mod.scss'

export default class EditPosts extends Component {
  state = {
    posts: [],
    postInFocus: {
      body: ""
    }
  }

  componentDidMount() {
    this.loadContent();
  }

  stateHandler(key, value) {
    this.setState({
      [key]: value
    })
  }

  focusPost(post) {
    this.setState({
      postInFocus: post
    })
  }

  loadContent() {
    get(API_V1 + 'posts', (payload) => {
      if (payload.hasErrors()) {
        console.log(payload.getErrors())
      } else {
        this.setState({
          posts: payload.getData()
        })
      }
    })
  }

  saveContent() {
    const content = this.state.getEditorContent();
    const id = this.state.postInFocus.id;

    var body = {
      body: content
    }

    console.log("Saving")

    put(API_V1 + 'posts/' + id, body, (payload) => {
      if (payload.hasErrors()) {
        console.log("[ERROR] Failed to save content for About. -> " + payload.getErrors());
      } else {
        console.log("Save Complete")

        this.loadContent();
      }
    })
  }

  render() {
    return (

      <div className={styles.editPostsWrapper}>
        <EditPostsNavBar save={this.saveContent.bind(this)}/>

        <div className={styles.editPostsContentWrapper}>
          <EditPostsList
            posts={this.state.posts}
            focusPost={this.focusPost.bind(this)}/>

          <div className={styles.contentEditorWrapper}>
            <ContentEditor
              stateHandler={this.stateHandler.bind(this)}
              id={this.state.postInFocus.id}
              content={this.state.postInFocus.body} />
          </div>
        </div>
      </div>
    )
  }
}