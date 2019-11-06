import React from 'react';

import { EditorState } from 'draft-js'
import ContentEditor from 'modules/content_editor/ContentEditor.jsx';

import './edit_blog_main.scss'

const initialContent = {
  body: "",
  id: null
}

export default class EditBlog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  render() {
    return (

      <div className="edit-blog-main">

        <ContentEditor
          editorState = { this.state.editorState }
          onChange={ this.onChange } />

      </div>
    )
  }
}