import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { EditorState } from 'draft-js';

import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';

import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

import HeadlinesButton from './headlinesbutton/HeadlinesButton.jsx'

import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import styles from './contentEditor.mod.scss';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin];
const defaultText = '';

const htmlOptions = { defaultBlockTag: 'div' };

class ContentEditor extends Component {
  constructor(props) {
    super(props)

    this.props.stateHandler('getEditorContent', this.getContent.bind(this))
  }

  state = {
    contentId: null,
    editorState: EditorState.createEmpty()
  };

  componentDidUpdate() {
    const id = this.props.id;
    const content = this.props.content;

    if (id != null && id != this.state.contentId) {
      const editorContent = stateFromHTML(content)

      this.setState({
        contentId: id,
        editorState: EditorState.createWithContent(editorContent)
      })
    }
  }

  onChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  focus = () => {
    this.editor.focus();
  };

  getContent() {
    return stateToHTML(this.state.editorState.getCurrentContent(), htmlOptions)
  }

  render() {
    return (
      <div className={styles.contentEditor} onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />

        <InlineToolbar>
          {
            externalProps => (
              <div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <CodeButton {...externalProps} />
                <Separator {...externalProps} />
                <HeadlinesButton {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
              </div>
            )
          }
        </InlineToolbar>
      </div>
    );
  }
}

export default ContentEditor;