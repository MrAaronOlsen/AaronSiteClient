import React, { Component} from "react";

import EditPostsNavBar from './editpostsnavbar/EditPostsNavBar.jsx';
import EditPostsList from './editpostslist/EditPostsList.jsx';
import ContentEditor from 'modules/content_editor/ContentEditor.jsx';

import Logger from 'logger';
import { GET } from 'http/get.js';
import { PUT } from 'http/put.js';
import { POST } from 'http/post.js';
import { DELETE } from 'http/delete.js';

import { API_V1 } from 'http/url.js';

import styles from './editPosts.mod.scss';

const getNewPost = () => {
  return {
    header: "A new post.",
    body: "",
    state: "new",
    inFocus: "inFocus"
  }
}

export default class EditPosts extends Component {
  state = {
    posts: [],
    postInFocus: {
      header: "",
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

  // Watches the post in focus. Can be sent to monitor onChange events. Text fields must have a name that matches a field in posts.
  //
  watch(event) {
    var name = event.target.name;
    var value = event.target.value;

    this.state.postInFocus[name] = value;

    this.setState({
      postInFocus: this.state.postInFocus
    })
  }

  focus(post) {
    this.state.postInFocus.inFocus = "";
    post.inFocus = "inFocus";

    this.setState({
      postInFocus: post
    })

    this.state.updateEditorContent(post.id, post.body);
  }

  new() {
    this.state.postInFocus.inFocus = "";

    var newPost = getNewPost();
    this.state.posts.push(newPost)

    this.setState({
      postInFocus: newPost,
      posts: this.state.posts
    })

    this.state.updateEditorContent("", newPost.body);
  }

  load() {

    this.setState({
      posts: []
    })

    GET(API_V1 + 'posts', (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Failed to fetch posts. Cause: " + payload.getErrors())
      } else {
        Logger.info("Loading all posts.")
        this.setState({
          posts: payload.getData()
        })
      }
    })
  }

  save() {
    if (this.state.postInFocus.state == "new") {
      this.insert();
    } else {
      this.update();
    }
  }

  insert() {
    var post = this.state.postInFocus
    post.body = this.state.getEditorContent();

    POST(API_V1 + 'posts/', post, (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Insert failed for Post. Cause: " + payload.getErrors());
      } else {
        var newPost = payload.getFirst();
        post.id = newPost.id;
        Logger.info("Inserted post. ID: " + newPost.id);
      }
    })
  }

  update() {
    const id = this.state.postInFocus.id;

    if (!id) {
      return;
    }

    var body = this.state.postInFocus
    body.body = this.state.getEditorContent();

    PUT(API_V1 + 'posts/' + id, body, (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Save failed for Post. ID: " + id + ". Cause: " + payload.getErrors());
      } else {
        Logger.info("Saved post. ID: " + id);
      }
    })
  }

  delete() {
    const id = this.state.postInFocus.id;

    if (!id) {
      return;
    }

    DELETE(API_V1 + 'posts/' + id, {}, (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Delete failed for Post. ID: " + id + ". Cause: " + payload.getErrors());
      } else {
        Logger.info("Deleted post. ID: " + id);
        this.load();
      }
    })
  }

  render() {
    return (

      <div className={styles.editPostsWrapper}>
        <EditPostsNavBar
          save={this.save.bind(this)}
          new={this.new.bind(this)}
          delete={this.delete.bind(this)}/>

        <div className={styles.editPostsContentWrapper}>
          <EditPostsList
            posts={this.state.posts}
            watch={this.watch.bind(this)}
            focus={this.focus.bind(this)}/>

          <div className={styles.contentEditorWrapper}>
            <ContentEditor
              stateHandler={this.stateHandler.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}