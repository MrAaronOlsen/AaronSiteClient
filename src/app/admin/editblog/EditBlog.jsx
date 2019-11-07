import React, { Component} from "react";

import { EditorState } from 'draft-js'
import ContentEditor from 'modules/content_editor/ContentEditor.jsx';

import styles from './editBlog.mod.scss'

const initialContent = {
  body: "",
  id: null
}

export default class EditBlog extends Component {
  constructor(props) {
    super(props)

    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  render() {
    return (

      <div className={styles.editBlog}>

        <ContentEditor
          editorState = { this.state.editorState }
          onChange={ this.onChange } />

      </div>
    )
  }
}